import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { transform } from "lightningcss";

const limit = 8192;
const themes = ["minimal", "zed"];
let failed = false;

mkdirSync("dist", { recursive: true });

for (const theme of themes) {
  const source = readFileSync(`themes/${theme}.css`, "utf8");
  const counts = {};
  for (const name of source.match(/--vx-[a-z-]+/g)) counts[name] = (counts[name] ?? 0) + 1;
  const names = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
  const short = Object.fromEntries(names.map((name, i) => [name, `--vx${i.toString(36)}`]));
  const renamed = source.replace(/--vx-[a-z-]+/g, (name) => short[name]);
  const { code } = transform({
    filename: `${theme}.css`,
    code: Buffer.from(renamed),
    minify: true,
  });
  writeFileSync(`dist/${theme}.css`, code);

  const size = Buffer.byteLength(
    JSON.stringify("userDefinedLinkHintCss") + JSON.stringify(code.toString()),
  );
  console.log(`dist/${theme}.css: ${size} / ${limit} bytes`);
  if (size > limit) failed = true;
}

if (failed) {
  console.error(`A theme is over the ${limit} byte limit of a Vimium setting.`);
  process.exit(1);
}
