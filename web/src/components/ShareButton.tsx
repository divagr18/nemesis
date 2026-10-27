import { useEffect, useRef, useState } from "react";
import { Check, Download, Link2, Loader2, Share } from "lucide-react";

const chip =
  "inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[.04] px-3 py-1.5 text-[13px] leading-none text-ink/85 transition-colors hover:border-white/30 hover:bg-white/[.09] hover:text-ink active:scale-[.98] disabled:opacity-40";

// Phones can hand the GIF itself to the X app through the share sheet; desktops can't attach files
// to an X post from a web page, so there the GIF is saved and the composer opens with the text.
const phone = typeof matchMedia !== "undefined" && matchMedia("(pointer: coarse)").matches && !!navigator.canShare;

/** Share one situation: copy its link (/a/<id>, which unfurls with a preview card), post it on X with a
 *  GIF of the fall (/g/<id>.gif), or download the vertical clip (/v/<id>.mp4, rendered on first request). */
export default function ShareButton({ id, text }: { id: string; text: string }) {
  const [copied, setCopied] = useState(false);
  const [clip, setClip] = useState<"idle" | "busy" | "error">("idle");
  const [hint, setHint] = useState("");
  const [postText, setPostText] = useState("");
  const gif = useRef<File | null>(null);
  const timer = useRef<number>();
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const link = `${location.origin}/a/${id}`;

  useEffect(() => {  // the server writes the post (sentence, outcome, credit) to fit X's limit
    fetch(`/api/attack/${id}`).then((r) => (r.ok ? r.json() : null)).then((a) => a?.post && setPostText(a.post)).catch(() => {});
    if (phone) {  // ready before the tap: the share sheet must open within the tap's user activation
      fetch(`/g/${id}.gif`).then((r) => (r.ok ? r.blob() : null))
        .then((b) => { if (b) gif.current = new File([b], `nemesis-${id}.gif`, { type: "image/gif" }); }).catch(() => {});
    }
  }, [id]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link);
    } catch {
      const ta = Object.assign(document.createElement("textarea"), { value: link });
      ta.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1800);
  };

  const post = async () => {
    const quote = text.length > 140 ? `${text.slice(0, 139).trimEnd()}…` : text;
    const msg = postText || `I threw “${quote}” at a simulated robot.\n\nNemesis (divagr.com) turns a sentence into physics, then retrains the robot until it holds. Try one:`;
    const file = gif.current;
    if (phone && file && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({ files: [file], text: `${msg} ${link}` });
        return;
      } catch (e: any) {
        if (e?.name === "AbortError") return;  // closed the sheet
      }
    }
    window.open(`https://x.com/intent/post?text=${encodeURIComponent(msg)}&url=${encodeURIComponent(link)}`, "_blank", "noopener");
    const a = Object.assign(document.createElement("a"), { href: `/g/${id}.gif`, download: `nemesis-${id}.gif` });
    document.body.appendChild(a);
    a.click();
    a.remove();
    setHint("GIF saved. Drop it into your post.");
  };

  // The clip is rendered on first request (a few seconds), so fetch it and show progress rather
  // than leaving a download link that seems to do nothing.
  const download = async () => {
    setClip("busy");
    try {
      const r = await fetch(`/v/${id}.mp4`);
      if (!r.ok) throw new Error(String(r.status));
      const url = URL.createObjectURL(await r.blob());
      const a = Object.assign(document.createElement("a"), { href: url, download: `nemesis-${id}.mp4` });
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 10_000);
      setClip("idle");
    } catch {
      setClip("error");
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button onClick={copy} className={chip}>
        {copied ? <Check size={13} className="text-acid" /> : <Link2 size={13} />} {copied ? "Copied" : "Copy link"}
      </button>
      <button onClick={post} className={chip}>
        <Share size={13} /> Post on X
      </button>
      <button onClick={download} disabled={clip === "busy"} className={chip}>
        {clip === "busy" ? <Loader2 size={13} className="animate-spin" /> : <Download size={13} />}
        {clip === "busy" ? "Preparing clip" : "Download clip"}
      </button>
      {hint && <span className="text-[13px] text-faint">{hint}</span>}
      {clip === "error" && <span className="text-[13px] text-faint">The clip isn't ready yet. Try again in a moment.</span>}
    </div>
  );
}
