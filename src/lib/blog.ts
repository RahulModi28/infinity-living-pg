import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { Marked, type Tokens } from "marked";
import { site } from "./site";

/**
 * The blog is a folder of Markdown files — content/blog/<slug>.md — read at
 * build time. Publishing a post is adding a file; the filename is the URL.
 *
 * Each file opens with a front-matter block:
 *
 *   ---
 *   title: How far is the PG from campus?
 *   seoTitle: PG near campus | Infinity Space   (optional, used as-is in
 *             the <title> — for when the headline is too long for Google,
 *             which cuts titles at roughly 60 characters)
 *   description: One or two sentences. Used in search results and link previews.
 *   date: 2026-09-16
 *   updated: 2026-10-01          (optional)
 *   cover: /images/entrance.jpg   (optional, a file in public/)
 *   coverAlt: The entrance at …   (required if cover is set)
 *   author: Infinity Space        (optional)
 *   draft: true                   (optional — kept off the site until removed)
 *   ---
 *
 * A hand-rolled parser rather than a YAML library: the block is flat
 * key: value pairs, and a bad file should fail the build with its own name
 * in the message rather than publish a post with a missing title.
 *
 * The HTML is not sanitised. Posts are written by the people who run the
 * site and committed to the repo, the same trust as any component.
 */

const DIR = join(process.cwd(), "content", "blog");
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

export type Post = {
  slug: string;
  title: string;
  seoTitle?: string;
  description: string;
  /** YYYY-MM-DD */
  date: string;
  updated?: string;
  cover?: string;
  coverAlt?: string;
  author: string;
  readingMinutes: number;
  html: string;
};

function frontMatter(file: string, raw: string) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) throw new Error(`content/blog/${file}: missing the --- front-matter block at the top.`);
  const data: Record<string, string> = {};
  for (const line of m[1].split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const i = line.indexOf(":");
    if (i === -1) throw new Error(`content/blog/${file}: "${line}" is not a key: value line.`);
    data[line.slice(0, i).trim()] = line
      .slice(i + 1)
      .trim()
      .replace(/^(["'])(.*)\1$/, "$2");
  }
  return { data, body: m[2] };
}

/**
 * External links open in a new tab; internal ones stay put. Headings get ids
 * so a section of a post can be linked to directly.
 */
const md = new Marked({
  gfm: true,
  renderer: {
    link({ href, title, tokens }: Tokens.Link) {
      const text = this.parser.parseInline(tokens);
      const external = /^https?:\/\//.test(href) && !href.startsWith(site.url);
      return `<a href="${href}"${title ? ` title="${title}"` : ""}${
        external ? ' target="_blank" rel="noopener noreferrer"' : ""
      }>${text}</a>`;
    },
    heading({ tokens, depth, text }: Tokens.Heading) {
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
      return `<h${depth} id="${id}">${this.parser.parseInline(tokens)}</h${depth}>\n`;
    },
  },
});

function load(file: string): Post & { draft: boolean } {
  const slug = file.replace(/\.md$/, "");
  if (!SLUG.test(slug)) {
    throw new Error(
      `content/blog/${file}: the filename is the URL, so use lowercase letters, digits and hyphens only.`
    );
  }
  const { data, body } = frontMatter(file, readFileSync(join(DIR, file), "utf8"));

  for (const key of ["title", "description", "date"]) {
    if (!data[key]) throw new Error(`content/blog/${file}: "${key}" is required.`);
  }
  for (const key of ["date", "updated"]) {
    if (data[key] && !DATE.test(data[key])) {
      throw new Error(`content/blog/${file}: "${key}" must be YYYY-MM-DD, got "${data[key]}".`);
    }
  }
  if (data.cover && !data.coverAlt) {
    throw new Error(`content/blog/${file}: a cover image needs coverAlt describing it.`);
  }

  const words = body.split(/\s+/).filter(Boolean).length;
  return {
    slug,
    title: data.title,
    seoTitle: data.seoTitle || undefined,
    description: data.description,
    date: data.date,
    updated: data.updated || undefined,
    cover: data.cover || undefined,
    coverAlt: data.coverAlt || undefined,
    author: data.author || site.name,
    readingMinutes: Math.max(1, Math.round(words / 220)),
    html: md.parse(body, { async: false }),
    draft: data.draft === "true",
  };
}

/**
 * Published posts, newest first. Drafts are left out everywhere — the index,
 * the sitemap and the static routes — so a draft has no URL at all, rather
 * than a URL nobody links to.
 */
export function getPosts(): Post[] {
  let files: string[];
  try {
    files = readdirSync(DIR).filter((f) => f.endsWith(".md"));
  } catch {
    return [];
  }
  return files
    .map(load)
    .filter((p) => !p.draft)
    .map(({ draft: _draft, ...p }) => p)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}

/** "16 September 2026". Parsed as UTC so the day never shifts by timezone. */
export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
