export async function GET(req, res) {
  res.setHeader("Content-Type", "text/html");
  return res.status(200).send("<h1>Hello from the server-side script!</h1>");
}
