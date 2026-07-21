import { readFileSync } from "fs";
import { join } from "path";

let slowAES: any = null;

async function getSlowAES() {
  if (slowAES) return slowAES;

  try {
    const res = await fetch("https://swa.42web.io/aes.js");
    if (res.ok) {
      const src = await res.text();
      // tslint:disable-next-line:no-eval
      (0, eval)(src);
      slowAES = (global as any).slowAES;
      return slowAES;
    }
  } catch {
    // fallback to local file
  }

  try {
    const src = readFileSync(join(__dirname, "aes.js"), "utf8");
    // tslint:disable-next-line:no-eval
    (0, eval)(src);
    slowAES = (global as any).slowAES;
    return slowAES;
  } catch {
    return null;
  }
}

function toNumbers(d: string) {
  const e: number[] = [];
  d.replace(/(..)/g, (_, d) => {
    e.push(parseInt(d, 16));
    return "";
  });
  return e;
}

function toHex(d: number[]) {
  if (d.length > 0)
    return d.map((n) => (16 > n ? "0" : "") + n.toString(16)).join("");
  return "";
}

export async function solveCloudflareChallenge(html: string): Promise<string | null> {
  const aMatch = html.match(/var a=toNumbers\("([0-9a-f]+)"\)/);
  const bMatch = html.match(/,b=toNumbers\("([0-9a-f]+)"\)/);
  const cMatch = html.match(/,c=toNumbers\("([0-9a-f]+)"\)/);

  if (!aMatch || !bMatch || !cMatch) return null;

  try {
    const aes = await getSlowAES();
    if (!aes) return null;
    const a = toNumbers(aMatch[1]);
    const b = toNumbers(bMatch[1]);
    const c = toNumbers(cMatch[1]);
    const decrypted = aes.decrypt(c, 2, a, b);
    return toHex(decrypted);
  } catch {
    return null;
  }
}
