import { useEffect, useRef, useState } from "react";
import { Check, Download, Link2, Loader2, Share } from "lucide-react";

const chip =
  "inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[.04] px-3 py-1.5 text-[13px] leading-none text-ink/85 transition-colors hover:border-white/30 hover:bg-white/[.09] hover:text-ink active:scale-[.98] disabled:opacity-40";

/** Share one situation: copy its link (/a/<id>, which unfurls with a preview card), post it on X,
 *  or download the vertical clip (/v/<id>.mp4, rendered on first request). */
export default function ShareButton({ id, text }: { id: string; text: string }) {
  const [copied, setCopied] = useState(false);
  const [clip, setClip] = useState<"idle" | "busy" | "error">("idle");
  const timer = useRef<number>();
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const link = `${location.origin}/a/${id}`;

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

  const post = () => {
    const quote = text.length > 200 ? `${text.slice(0, 199).trimEnd()}…` : text;
    const msg = `“${quote}” Every robot needs a nemesis.`;
    window.open(`https://x.com/intent/post?text=${encodeURIComponent(msg)}&url=${encodeURIComponent(link)}`, "_blank", "noopener");
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
      {clip === "error" && <span className="text-[13px] text-faint">The clip isn't ready yet. Try again in a moment.</span>}
    </div>
  );
}
