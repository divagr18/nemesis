"""Shareable situations: every attack gets a link with a preview card, and a vertical clip for phones.

GET /api/attack/<id>   the public record of one attack (no θ)
GET /a/<id>            the web app's index.html with Open Graph / Twitter tags for link previews
GET /og/<id>.png       1200×630 preview card: a frame at the moment of the fall, the sentence, the outcome
GET /v/<id>.mp4        1080×1920 clip: the sentence on top, the original robot above the live version

Cards and clips are rendered once and cached under <serve dir>/share/.

The sentence is visitor text and is treated as untrusted everywhere: HTML-escaped in the page, drawn
with Pillow into PNGs that ffmpeg overlays (it never reaches a shell or an ffmpeg filter string), and
ids are checked against a hex pattern before any path is built from them.
"""

import html
import io
import json
import os
import re
import shutil
import subprocess
import threading
import unicodedata
from functools import lru_cache
from pathlib import Path

from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse, HTMLResponse, Response

router = APIRouter()

PUBLIC_URL = os.environ.get("NEMESIS_PUBLIC_URL", "https://nemesis.divagr.com").rstrip("/")
INDEX = Path("web/dist/index.html")
RENDER_REV = "1"  # bump to re-render every cached card and clip after a design change
ID = re.compile(r"[0-9a-f]{6,32}")
SEEDS = 4  # tries per robot per attack (server.app.SEEDS)

BG, INK, MUTE, FAINT = (10, 10, 10), (237, 237, 235), (163, 161, 156), (117, 115, 111)
EMBER, ACID = (255, 91, 53), (215, 242, 93)
EXTRA_KEYS = ("fall_rate_baseline", "fall_rate_trained", "broke_baseline", "broke_trained", "robot", "survivable",
              "reading", "media")


def _app():
    from server import app as A  # lazily: server.app imports this module
    return A


def _attack(attack_id: str) -> dict:
    if not ID.fullmatch(attack_id):
        raise HTTPException(404, "unknown attack")
    return _app()._find(attack_id)


def _host() -> str:
    return PUBLIC_URL.split("://", 1)[-1]


# ---- the outcome in plain words ------------------------------------------------------------------

def _fixed_in(r: dict) -> str | None:
    """The version that was retrained on this attack, if any (Go1 lineage only)."""
    if r.get("robot", "go1") != "go1":
        return None
    for v in _app().versions.all():
        if r["id"] in v.get("attacks", []):
            return v["name"]
    return None


def _verdict(rate: float | None) -> list[tuple[str, tuple]]:
    n = round((rate or 0) * SEEDS)
    if n <= 0:
        return [("held", ACID)]
    return [("fell", EMBER), (" on every try" if n >= SEEDS else f" on {n} of {SEEDS} tries", MUTE)]


def outcome(r: dict, fixed_in: str | None = None) -> list[tuple[str, tuple]]:
    """One line as colored segments: 'The original robot fell on 3 of 4 tries; v7 held.'"""
    base, live = r.get("fall_rate_baseline"), r.get("fall_rate_trained")
    ver = r.get("version") or "the live version"
    nb, nl = round((base or 0) * SEEDS), round((live or 0) * SEEDS)
    if ver == "v1":  # the live robot was still the original: one policy, one verdict
        segs = [("The robot ", MUTE), *_verdict(base), (".", MUTE)]
    elif nb == 0 and nl == 0:
        segs = [(f"The original robot and {ver} both ", MUTE), ("held", ACID), (".", MUTE)]
    elif nb >= SEEDS and nl >= SEEDS:
        segs = [(f"The original robot and {ver} both ", MUTE), ("fell", EMBER), (" on every try.", MUTE)]
    else:
        segs = [("The original robot ", MUTE), *_verdict(base), (f"; {ver} ", MUTE), *_verdict(live), (".", MUTE)]
    if fixed_in and fixed_in != ver and nl > 0:
        segs.append((f" {fixed_in} learned it.", MUTE))
    elif r.get("survivable") is False:
        segs.append((" Even our toughest robot falls here.", MUTE))
    return segs


def _plain(segs) -> str:
    return "".join(s for s, _ in segs)


def _sentence(r: dict) -> str:
    """Visitor text, made printable: control characters dropped, whitespace collapsed."""
    t = "".join(c for c in str(r.get("text") or "") if unicodedata.category(c)[0] != "C" or c in "\t\n")
    return " ".join(t.split()) or "An untitled situation"


def _truncate(s: str, n: int) -> str:
    if len(s) <= n:
        return s
    cut = s[: n - 1].rsplit(" ", 1)[0] if " " in s[: n - 1] else s[: n - 1]
    return cut.rstrip(" ,.;:") + "…"


# ---- public record ---------------------------------------------------------------------------------

def public(r: dict) -> dict:
    A = _app()
    out = {k: r.get(k) for k in A.HOF_KEYS}
    out.update({k: r[k] for k in EXTRA_KEYS if k in r})
    out["status"] = A.versions.status().get(r["id"], {}) if r.get("robot", "go1") == "go1" else {}
    out["fixed_in"] = _fixed_in(r)
    out["outcome"] = _plain(outcome(r, out["fixed_in"]))
    out["share"] = {"page": f"{PUBLIC_URL}/a/{r['id']}", "image": f"{PUBLIC_URL}/og/{r['id']}.png",
                    "video": f"/v/{r['id']}.mp4"}
    return out


@router.get("/api/attack/{attack_id}")
def get_attack(attack_id: str):
    return public(_attack(attack_id))


# ---- link preview page -----------------------------------------------------------------------------

_STRIP = re.compile(r'\s*(<title>.*?</title>|<meta\s+(?:property="og:[^"]*"|name="(?:twitter:[^"]*|description)")[^>]*>)',
                    re.S | re.I)


def _template() -> str:
    try:
        return INDEX.read_text(encoding="utf-8")
    except OSError:
        return ('<!doctype html><html lang="en"><head><meta charset="utf-8">'
                '<meta name="viewport" content="width=device-width, initial-scale=1"></head>'
                '<body><div id="root"></div></body></html>')


def page(r: dict | None) -> str:
    doc = _template()
    if r is None:
        return doc
    e = lambda s: html.escape(s, quote=True)  # noqa: E731
    title = _truncate(_sentence(r), 110)
    desc = _plain(outcome(r, _fixed_in(r)))
    url, img = f"{PUBLIC_URL}/a/{r['id']}", f"{PUBLIC_URL}/og/{r['id']}.png"
    tags = [f"<title>{e(title)} · Nemesis</title>",
            f'<meta name="description" content="{e(desc)}">',
            '<meta property="og:type" content="website">',
            '<meta property="og:site_name" content="Nemesis">',
            f'<meta property="og:title" content="{e(title)}">',
            f'<meta property="og:description" content="{e(desc)}">',
            f'<meta property="og:url" content="{e(url)}">',
            f'<meta property="og:image" content="{e(img)}">',
            '<meta property="og:image:width" content="1200">',
            '<meta property="og:image:height" content="630">',
            f'<meta property="og:image:alt" content="{e(desc)}">',
            '<meta name="twitter:card" content="summary_large_image">',
            f'<meta name="twitter:title" content="{e(title)}">',
            f'<meta name="twitter:description" content="{e(desc)}">',
            f'<meta name="twitter:image" content="{e(img)}">',
            f'<meta name="twitter:image:alt" content="{e(desc)}">',
            f'<link rel="canonical" href="{e(url)}">']
    doc = _STRIP.sub("", doc)
    block = "\n  " + "\n  ".join(tags) + "\n"
    return doc.replace("</head>", block + "</head>", 1) if "</head>" in doc else block + doc


@router.get("/a/{attack_id}")
def share_page(attack_id: str):
    try:
        r = _attack(attack_id)
    except HTTPException:
        return HTMLResponse(page(None), status_code=404)  # the app still boots and says it's not found
    return HTMLResponse(page(r), headers={"Cache-Control": "public, max-age=300"})


# ---- rendering helpers -------------------------------------------------------------------------------

_locks: dict[str, threading.Lock] = {}
_locks_guard = threading.Lock()
_draw = threading.Lock()  # the cached Pillow fonts are shared, so text drawing is one card at a time


def _lock(key: str) -> threading.Lock:
    with _locks_guard:
        return _locks.setdefault(key, threading.Lock())


def _cache_dir() -> Path:
    d = _app().ROOT / "share"
    d.mkdir(parents=True, exist_ok=True)
    return d


def _ffmpeg() -> str:
    exe = shutil.which("ffmpeg")
    if exe:
        return exe
    try:
        import imageio_ffmpeg
        return imageio_ffmpeg.get_ffmpeg_exe()
    except Exception:  # noqa: BLE001
        raise HTTPException(503, "ffmpeg is not available on this server")


FONT_DIRS = ("/usr/share/fonts", "/usr/local/share/fonts", str(Path.home() / ".fonts"),
             str(Path.home() / ".local/share/fonts"))


@lru_cache(maxsize=None)
def _font_file(weight: str) -> tuple[str, str | None] | None:
    """(path, variation name) for Inter at `weight` (Regular/Medium), else a clean fallback sans."""
    env = os.environ.get("NEMESIS_FONT_MEDIUM" if weight == "Medium" else "NEMESIS_FONT")
    if env and Path(env).exists():
        return env, None
    dirs = [_app().ROOT / "share" / "fonts", *map(Path, FONT_DIRS)]
    files = [p for d in dirs if d.exists() for p in d.rglob("*") if p.suffix.lower() in (".ttf", ".otf")]
    by_name = {p.name: p for p in files}
    for name in (f"Inter-{weight}.ttf", f"Inter-{weight}.otf", f"Inter{weight}.ttf"):
        if name in by_name:
            return str(by_name[name]), None
    for name in ("InterVariable.ttf", "Inter[opsz,wght].ttf", "Inter-VariableFont_opsz,wght.ttf"):
        if name in by_name:
            return str(by_name[name]), weight
    fallback = {"Medium": ("Ubuntu-M.ttf", "DejaVuSans-Bold.ttf"), "Regular": ("Ubuntu-R.ttf", "DejaVuSans.ttf")}
    for name in fallback[weight]:
        if name in by_name:
            return str(by_name[name]), None
    try:
        import matplotlib
        p = Path(matplotlib.__file__).parent / "mpl-data/fonts/ttf" / fallback[weight][1]
        if p.exists():
            return str(p), None
    except Exception:  # noqa: BLE001
        pass
    return None


@lru_cache(maxsize=64)
def font(size: int, weight: str = "Regular"):
    from PIL import ImageFont

    spec = _font_file(weight)
    if spec is None:
        return ImageFont.load_default(size)
    f = ImageFont.truetype(spec[0], size)
    if spec[1]:
        try:
            f.set_variation_by_name(spec[1])
        except Exception:  # noqa: BLE001  (named instance missing: keep the default weight)
            pass
    return f


_glyphs: dict[tuple, bool] = {}


def _has_glyph(f, ch: str) -> bool:
    """False when the font would draw its 'missing glyph' box (emoji etc.): such characters are dropped."""
    key = (id(f), ch)
    if key not in _glyphs:
        if ch.isspace() or ch.isascii():
            _glyphs[key] = True
        else:
            def sig(c):
                m = f.getmask(c)
                return m.size, bytes(m)
            _glyphs[key] = sig(ch) != sig("\U0010fffd")
    return _glyphs[key]


def _drawable(f, s: str) -> str:
    return " ".join("".join(c for c in s if _has_glyph(f, c)).split())


def wrap(f, text: str, width: int, max_lines: int) -> list[str]:
    """Greedy word wrap; the last line ends in an ellipsis if the text doesn't fit."""
    words, lines, cur = text.split(), [], ""
    i = 0
    while i < len(words):
        w = words[i]
        trial = f"{cur} {w}".strip()
        if f.getlength(trial) <= width:
            cur, i = trial, i + 1
            continue
        if not cur:  # one word wider than the line: break it
            k = max(1, next((j for j in range(len(w), 0, -1) if f.getlength(w[:j]) <= width), 1))
            cur, words[i] = w[:k], w[k:]
            if not words[i]:
                i += 1
        lines.append(cur)
        cur = ""
        if len(lines) == max_lines:
            break
    if cur and len(lines) < max_lines:
        lines.append(cur)
    if i < len(words) or (len(lines) == max_lines and cur and lines[-1] != cur):
        last = lines[-1]
        while last and f.getlength(last + "…") > width:
            last = last[:-1]
        lines[-1] = last.rstrip(" ,.;:") + "…"
    return lines


def _segments(draw, xy, segs, f):
    x, y = xy
    for s, color in segs:
        draw.text((x, y), s, font=f, fill=color)
        x += f.getlength(s)
    return x


def _traj(r: dict, i: int) -> dict | None:
    trajs = r.get("trajs") or []
    if i >= len(trajs):
        return None
    try:
        return json.loads((_app().CLIPS / Path(trajs[i]["url"]).name).read_text())
    except (OSError, ValueError, KeyError):
        return None


def _labels(r: dict) -> list[tuple[str, bool | None]]:
    """(name, fell on the recorded seed) for the left and right robot in the clip."""
    out = []
    for i, name in ((0, "original"), (1, r.get("version") or "live")):
        tr = _traj(r, i)
        out.append((name, None if tr is None else bool(tr.get("fall_time"))))
    return out


def _fall_moment(r: dict) -> float:
    """A time in the clip where the fall is visible: just after the later fall (both robots in frame)."""
    trs = [t for t in (_traj(r, 0), _traj(r, 1)) if t]
    dur = max((t.get("duration") or 0 for t in trs), default=0) or 5.0
    falls = [t["fall_time"] for t in trs if t.get("fall_time")]
    t = (max(falls) + 0.45) if falls else dur * 0.6
    return max(0.0, min(t, dur - 0.1))


def _clip(r: dict) -> Path | None:
    """The tiled side-by-side mp4 (waits for a render still in progress)."""
    A = _app()
    try:
        p = A.clip_ready(r.get("clip") or r["id"], timeout=180)
    except Exception:  # noqa: BLE001  (a failed or slow render: no clip)
        return None
    return p if p.exists() and p.stat().st_size > 0 else None


def _frame(clip: Path, t: float):
    from PIL import Image

    cmd = [_ffmpeg(), "-v", "error", "-ss", f"{t:.3f}", "-i", str(clip), "-frames:v", "1",
           "-f", "image2pipe", "-c:v", "png", "-"]
    out = subprocess.run(cmd, capture_output=True, timeout=60, check=False).stdout
    if not out:  # past the end: take the last frame
        cmd[3:5] = ["-sseof", "-0.1"]
        out = subprocess.run(cmd, capture_output=True, timeout=60, check=False).stdout
    return Image.open(io.BytesIO(out)).convert("RGB") if out else None


def _pill(draw, xy, name: str, fell: bool | None, f, pad=(14, 8), dot=8):
    """A small dark pill: 'original · fell' with the verdict in ember/acid."""
    x, y = xy
    verdict = [] if fell is None else [(" · ", FAINT), ("fell" if fell else "held", EMBER if fell else ACID)]
    segs = [(name, INK), *verdict]
    w = sum(f.getlength(s) for s, _ in segs)
    asc, desc = f.getmetrics()
    h = asc + desc
    draw.rounded_rectangle((x, y, x + w + 2 * pad[0] + dot + 10, y + h + 2 * pad[1]), radius=(h + 2 * pad[1]) // 2,
                           fill=(10, 10, 10, 190))
    cy = y + pad[1] + h / 2
    color = FAINT if fell is None else EMBER if fell else ACID
    draw.ellipse((x + pad[0], cy - dot / 2, x + pad[0] + dot, cy + dot / 2), fill=color)
    _segments(draw, (x + pad[0] + dot + 10, y + pad[1]), segs, f)


def _save_atomic(write, path: Path):
    tmp = path.with_name(f".{path.name}.{os.getpid()}.{threading.get_ident()}.tmp")
    try:
        write(tmp)
        os.replace(tmp, path)
    finally:
        tmp.unlink(missing_ok=True)


# ---- 1200×630 preview card ---------------------------------------------------------------------------

def card(r: dict):
    """The card as a PIL image, and whether it includes a frame of the clip."""
    clip = _clip(r)
    frame = _frame(clip, _fall_moment(r)) if clip else None
    with _draw:
        return _card(r, frame), frame is not None


def _card(r: dict, frame):
    from PIL import Image, ImageDraw

    W, H, M = 1200, 630, 56
    img = Image.new("RGB", (W, H), BG)
    fh = 0
    if frame is not None:
        fh = round(W * frame.height / frame.width)  # the tiled clip, full width (960×360 → 1200×450)
        img.paste(frame.resize((W, fh), Image.LANCZOS), (0, 0))
        fade = Image.new("L", (1, 160))
        for y in range(160):
            fade.putpixel((0, y), int(255 * (y / 159) ** 1.6))
        img.paste(Image.new("RGB", (W, 160), BG), (0, fh - 160), fade.resize((W, 160)))
        img.paste(BG, (0, fh, W, H))
    d = ImageDraw.Draw(img, "RGBA")
    if frame is not None:
        lf = font(20, "Medium")
        for (name, fell), x in zip(_labels(r), (24, W // 2 + 24)):
            _pill(d, (x, 22), name, fell, lf)

    # Bottom-anchored text: outcome line, and the sentence above it.
    of, uf = font(24), font(20)
    segs = outcome(r, _fixed_in(r))
    asc, desc = of.getmetrics()
    oy = H - 44 - asc
    url_w = uf.getlength(_host())
    d.text((W - M - url_w, oy + asc - uf.getmetrics()[0]), _host(), font=uf, fill=FAINT)
    room = W - 2 * M - url_w - 32
    while len(segs) > 1 and sum(of.getlength(s) for s, _ in segs) > room:
        segs = segs[:-1]  # drop the trailing note if it doesn't fit
    _segments(d, (M, oy), segs, of)

    size = 40 if frame is not None else 60
    sf = font(size, "Medium")
    text = _drawable(sf, f"“{_sentence(r)}”")
    lines = wrap(sf, text, W - 2 * M, 2 if frame is not None else 4)
    lh = round(size * 1.24)
    y = oy - 22 - lh * len(lines)
    if frame is None:
        y = min(y, (H - lh * len(lines)) // 2 - 20)
    for line in lines:
        d.text((M, y), line, font=sf, fill=INK)
        y += lh
    return img


@router.get("/og/{attack_id}.png")
def og_image(attack_id: str):
    r = _attack(attack_id)
    path = _cache_dir() / f"{attack_id}.card{RENDER_REV}.png"
    headers = {"Cache-Control": "public, max-age=86400"}
    with _lock(f"card:{attack_id}"):
        if not path.exists():
            img, complete = card(r)
            if not complete:  # no clip (yet): serve a text-only card without caching it
                buf = io.BytesIO()
                img.save(buf, "PNG", optimize=True)
                return Response(buf.getvalue(), media_type="image/png", headers={"Cache-Control": "public, max-age=60"})
            _save_atomic(lambda p: img.save(p, "PNG", optimize=True), path)
    return FileResponse(path, media_type="image/png", headers=headers)


# ---- 1080×1920 vertical clip ------------------------------------------------------------------------

VW, VH, VM = 1080, 1920, 60
PANE_W, PANE_H = VW - 2 * VM, round((VW - 2 * VM) * 3 / 4)  # each half of the tile is 480×360 (4:3)
PANE_GAP, PANE_TOP = 20, 340


def _vertical_layers(r: dict, half_aspect: float):
    """Two full-canvas PNG layers: the background (caption, URL) and a top layer (labels, rounded corners)."""
    from PIL import Image, ImageDraw

    ph = round(PANE_W / half_aspect)
    panes = [(VM, PANE_TOP), (VM, PANE_TOP + ph + PANE_GAP)]
    bg = Image.new("RGB", (VW, VH), BG)
    d = ImageDraw.Draw(bg)
    raw = f"“{_sentence(r)}”"
    for size in (58, 50, 44):  # the largest size that fits in three lines
        sf = font(size, "Medium")
        lines = wrap(sf, _drawable(sf, raw), VW - 2 * VM, 3)
        if not lines[-1].endswith("…"):
            break
    lh = round(size * 1.22)
    y = PANE_TOP - 44 - lh * len(lines)
    for line in lines:
        d.text((VM, y), line, font=sf, fill=INK)
        y += lh
    uf = font(30)
    bottom = panes[1][1] + ph
    d.text(((VW - uf.getlength(_host())) / 2, bottom + (VH - bottom) / 2 - 18), _host(), font=uf, fill=FAINT)

    top = Image.new("RGBA", (VW, VH), (0, 0, 0, 0))
    td = ImageDraw.Draw(top)
    corners = Image.new("L", (VW, VH), 0)  # background color just outside each pane's rounded corners
    cd = ImageDraw.Draw(corners)
    for x, y0 in panes:
        cd.rectangle((x, y0, x + PANE_W - 1, y0 + ph - 1), fill=255)
        cd.rounded_rectangle((x, y0, x + PANE_W - 1, y0 + ph - 1), radius=22, fill=0)
    top.paste(Image.new("RGBA", (VW, VH), (*BG, 255)), (0, 0), corners)
    lf = font(30, "Medium")
    for (name, fell), (x, y0) in zip(_labels(r), panes):
        _pill(td, (x + 22, y0 + 22), name, fell, lf, pad=(20, 11), dot=11)
    return bg, top, panes, ph


def _probe(clip: Path) -> tuple[int, int, str]:
    out = subprocess.run([_ffmpeg(), "-hide_banner", "-i", str(clip)], capture_output=True, text=True,
                         timeout=30, check=False).stderr
    m = re.search(r"Video:.*?, (\d{2,5})x(\d{2,5})", out)
    fps = re.search(r"(\d+(?:\.\d+)?) fps", out)
    if not m:
        raise HTTPException(500, "could not read the clip")
    return int(m.group(1)), int(m.group(2)), fps.group(1) if fps else "25"


def vertical(r: dict, clip: Path, path: Path):
    w, h, fps = _probe(clip)
    with _draw:
        bg, top, panes, ph = _vertical_layers(r, (w / 2) / h)
    work = path.with_name(f".{path.stem}.{os.getpid()}.{threading.get_ident()}")
    work.mkdir(exist_ok=True)
    try:
        bg.save(work / "bg.png")
        top.save(work / "top.png")
        (x0, y0), (x1, y1) = panes
        graph = (f"[1:v]split=2[l][r];"
                 f"[l]crop=iw/2:ih:0:0,scale={PANE_W}:{ph}:flags=lanczos,setsar=1[a];"
                 f"[r]crop=iw/2:ih:iw/2:0,scale={PANE_W}:{ph}:flags=lanczos,setsar=1[b];"
                 f"[0:v][a]overlay={x0}:{y0}:shortest=1[t];[t][b]overlay={x1}:{y1}:shortest=1[u];"
                 f"[u][2:v]overlay=0:0:shortest=1,tpad=stop_mode=clone:stop_duration=1.2,format=yuv420p[out]")
        cmd = [_ffmpeg(), "-v", "error", "-y",
               "-loop", "1", "-framerate", fps, "-i", str(work / "bg.png"),
               "-i", str(clip),
               "-loop", "1", "-framerate", fps, "-i", str(work / "top.png"),
               "-filter_complex", graph, "-map", "[out]", "-an",
               "-c:v", "libx264", "-preset", "veryfast", "-crf", "20", "-pix_fmt", "yuv420p",
               "-movflags", "+faststart", "-f", "mp4"]

        def write(tmp: Path):
            res = subprocess.run([*cmd, str(tmp)], capture_output=True, text=True, timeout=300, check=False)
            if res.returncode != 0 or not tmp.exists():
                raise RuntimeError(f"ffmpeg failed: {res.stderr[-400:]}")
        _save_atomic(write, path)
    finally:
        shutil.rmtree(work, ignore_errors=True)


@router.get("/v/{attack_id}.mp4")
def vertical_clip(attack_id: str):
    r = _attack(attack_id)
    path = _cache_dir() / f"{attack_id}.vertical{RENDER_REV}.mp4"
    with _lock(f"vertical:{attack_id}"):
        if not path.exists():
            clip = _clip(r)
            if clip is None:
                raise HTTPException(404, "This clip isn't ready (or couldn't be rendered).")
            vertical(r, clip, path)
    return FileResponse(path, media_type="video/mp4",
                        headers={"Cache-Control": "public, max-age=86400",
                                 "Content-Disposition": f'inline; filename="nemesis-{attack_id}.mp4"'})
