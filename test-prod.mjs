import { readFileSync } from "fs";
import { join } from "path";

let slowAES: any = null;

async function getSlowAES() {
  if (slowAES) return slowAES;
  try {
    const res = await fetch("https://swa.42web.io/aes.js");
    if (res.ok) {
      const src = await res.text();
      eval(src);
      slowAES = (global as any).slowAES;
      console.log("slowAES loaded from remote:", !!slowAES, !!slowAES?.decrypt);
      return slowAES;
    }
  } catch {}
  try {
    const src = readFileSync(join(__dirname, "lib", "aes.js"), "utf8");
    eval(src);
    slowAES = (global as any).slowAES;
    console.log("slowAES loaded from local:", !!slowAES, !!slowAES?.decrypt);
    return slowAES;
  } catch {
    return null;
  }
}

function toNumbers(d: string) {
  const e: number[] = [];
  d.replace(/(..)/g, (_, d) => { e.push(parseInt(d, 16)); return ""; });
  return e;
}

function toHex(d: number[]) {
  return d.length > 0 ? d.map((n) => (16 > n ? "0" : "") + n.toString(16)).join("") : "";
}

async function solveCloudflareChallenge(html: string): Promise<string | null> {
  const aMatch = html.match(/var a=toNumbers\("([0-9a-f]+)"\)/);
  const bMatch = html.match(/,b=toNumbers\("([0-9a-f]+)"\)/);
  const cMatch = html.match(/,c=toNumbers\("([0-9a-f]+)"\)/);
  console.log("matches:", !aMatch, !bMatch, !cMatch);
  if (!aMatch || !bMatch || !cMatch) return null;
  try {
    const aes = await getSlowAES();
    if (!aes) return null;
    const a = toNumbers(aMatch![1]);
    const b = toNumbers(bMatch![1]);
    const c = toNumbers(cMatch![1]);
    const decrypted = aes.decrypt(c, 2, a, b);
    return toHex(decrypted);
  } catch (e) {
    console.error("decrypt error", e);
    return null;
  }
}

(async () => {
  const res = await fetch("https://swa.42web.io/wp-json/wp/v2/posts?_embed=1&per_page=1");
  const text = await res.text();
  console.log("content-type:", res.headers.get("content-type"));
  console.log("isChallenge:", text.includes("slowAES") && text.includes("aes.js"));
  const answer = await solveCloudflareChallenge(text);
  console.log("answer:", answer);
})();
