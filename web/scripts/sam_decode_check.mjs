// Decode saved SAM outlines with Meta's parser: node scripts/sam_decode_check.mjs <outline.json>...
import { readFileSync } from "node:fs";
import { decodeMaskToRaster, decodeMaskToSVGPath } from "@meta-sam/parser";
for (const f of process.argv.slice(2))
  for (const it of JSON.parse(readFileSync(f, "utf8")).items) {
    const r = decodeMaskToRaster(it.mask); let on = 0; for (const x of r) on += x;
    console.log(it.kind, `${it.mask.width}x${it.mask.height}`, "filled", (on / r.length).toFixed(2), "path", decodeMaskToSVGPath(it.mask).length);
  }
