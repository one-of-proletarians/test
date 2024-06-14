import fs from "fs";
export async function GET() {
  const html = fs.readFileSync("/dist/index.html", "utf8");
  return new Response(html, {
    // headers: { "Content-Type": "text/html" },
  });
}
