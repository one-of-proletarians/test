import { readFile } from "node:fs/promises";

export async function GET() {
  const html = await readFile("../index.html", "utf8");
  return new Response(html);
}
