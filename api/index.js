export async function GET() {
  return new Response(JSON.stringify(process.versions), {
    // headers: { "Content-Type": "text/html" },
  });
}
