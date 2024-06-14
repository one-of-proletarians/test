import * as cheerio from "cheerio";
import fs from "fs";
import path from "path";

const LEN = 100;

export async function GET() {
  const html = fs.readFileSync(
    path.join(process.cwd(), "dist/index.html"),
    "utf8"
  );

  const text =
    "Чтобы отрендерить страницу с динамическим путем и закешировать её в Next.js, можно воспользоваться функцией статической генерации с динамическими роутами (getStaticPaths и getStaticProps). Вот пошаговое руководство:";
  const desc = text.length > LEN ? text.slice(0, LEN - 3) + "..." : text;
  const $ = cheerio.load(html);

  $(`meta[property="og:title"]`).attr("content", desc);

  return new Response($.html(), {
    headers: { "Content-Type": "text/html" },
  });
}
