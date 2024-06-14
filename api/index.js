import fs from "fs";
import path from "path";
export async function GET() {
  const html = fs.readFileSync(
    path.join(process.cwd(), "dist/index.html"),
    "utf8"
  );
  return new Response(html, {
    // headers: { "Content-Type": "text/html" },
  });
}
