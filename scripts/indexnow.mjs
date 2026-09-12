#!/usr/bin/env node
/**
 * Submit this site's URLs to IndexNow.
 *
 * IndexNow tells Bing (and Yandex, Seznam, Naver) that pages changed, instead
 * of waiting to be re-crawled. Google does not participate — the reason to run
 * it anyway is that ChatGPT and Copilot both answer from Bing's index, so this
 * is the shortest path between publishing something and an AI engine being
 * able to quote it.
 *
 *   npm run indexnow              # submit every URL in the live sitemap
 *   npm run indexnow -- --dry-run # show what would be sent, send nothing
 *
 * There is no key to configure. The key IS the file in public/ — IndexNow
 * verifies ownership by fetching https://<host>/<key>.txt and checking it
 * contains that same key, so the filename and the contents are the whole
 * credential. It is public by design; committing it is correct.
 */

import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const PUBLIC_DIR = new URL("../public/", import.meta.url).pathname;
const ENDPOINT = "https://api.indexnow.org/indexnow";
const KEY_FILE = /^[0-9a-f]{32}\.txt$/;

const dryRun = process.argv.includes("--dry-run");

const die = (msg) => {
  console.error(`\n  ✗ ${msg}\n`);
  process.exit(1);
};

/** The key file in public/, which is both the credential and its own proof. */
async function readKey() {
  const names = (await readdir(PUBLIC_DIR)).filter((n) => KEY_FILE.test(n));
  if (names.length === 0) {
    die(
      "No IndexNow key file in public/.\n" +
        "    Create one:  node -e \"console.log(require('crypto').randomBytes(16).toString('hex'))\"\n" +
        "    then save it as public/<key>.txt containing exactly that key."
    );
  }
  if (names.length > 1) die(`More than one key file in public/: ${names.join(", ")}`);

  const key = names[0].replace(/\.txt$/, "");
  const body = (await readFile(join(PUBLIC_DIR, names[0]), "utf8")).trim();
  // IndexNow rejects the submission if these disagree, with a 403 that does
  // not say why — so check it here, where the message can be useful.
  if (body !== key) {
    die(`public/${names[0]} must contain exactly "${key}" — it currently contains "${body}".`);
  }
  return key;
}

async function sitemapUrls(origin) {
  const res = await fetch(`${origin}/sitemap.xml`);
  if (!res.ok) die(`Could not read ${origin}/sitemap.xml (HTTP ${res.status}).`);
  const urls = [...(await res.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  if (urls.length === 0) die(`No <loc> entries in ${origin}/sitemap.xml.`);
  return urls;
}

/**
 * Confirms the key is actually reachable on the deployed site. This is the
 * failure that costs people days: the key exists in the repo but the deploy
 * hasn't shipped it, so every submission is silently rejected.
 */
async function keyIsLive(origin, key) {
  try {
    const res = await fetch(`${origin}/${key}.txt`);
    return res.ok && (await res.text()).trim() === key;
  } catch {
    return false;
  }
}

const key = await readKey();

// The sitemap is generated from site.ts, so taking the URL list from it means
// this script can never drift out of step with what the site actually exposes.
const urls = await sitemapUrls("https://www.infinityspace4u.com");
const { origin, host } = new URL(urls[0]);

console.log(`\n  key    ${key}`);
console.log(`  host   ${host}`);
console.log(`  urls   ${urls.length}`);
urls.forEach((u) => console.log(`         ${u}`));

if (dryRun) {
  console.log("\n  — dry run, nothing submitted\n");
  process.exit(0);
}

if (!(await keyIsLive(origin, key))) {
  die(
    `${origin}/${key}.txt is not reachable yet.\n` +
      "    Deploy first — IndexNow fetches that file to verify you own the domain."
  );
}

const res = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation: `${origin}/${key}.txt`, urlList: urls }),
});

// 200 accepted, 202 accepted but the key is still being verified. Everything
// else is worth reading: 403 is a key mismatch, 422 a URL that isn't on host.
if (res.status === 200 || res.status === 202) {
  console.log(`\n  ✓ submitted ${urls.length} URLs (HTTP ${res.status})\n`);
} else {
  die(`IndexNow returned HTTP ${res.status}. ${(await res.text()).trim()}`);
}
