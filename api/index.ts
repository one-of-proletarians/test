import * as cheerio from "cheerio";
import fs from "fs";
import path from "path";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";

const uri = `mongodb+srv://0x1d46:bLzoTnDSDzRPTJ64@cluster0.u2jfb2m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const getCLient = () =>
  new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

const description = (
  messages: { role: string; content: string; title: string }[]
) => {
  const message = messages.find((item) => item.role === "assistant");
  const content = message?.content || "";
  const title = message?.title || "";
  return [
    title,
    content.length > 100 ? content.slice(0, 100) + "..." : content,
  ];
};

export async function GET(request: Request) {
  const html = fs.readFileSync(
    path.join(process.cwd(), "dist/index.html"),
    "utf8"
  );

  try {
    const client = getCLient();
    await client.connect();
    const share = client.db("shareDb").collection("share");
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id)
      return new Response(html, {
        headers: { "Content-Type": "text/html" },
      });
    const $ = cheerio.load(html);
    const findResult = await share.findOne({ _id: new ObjectId(id) });

    if (!findResult)
      return new Response(html, {
        headers: { "Content-Type": "text/html" },
      });

    const [title, desc] = description(findResult.data.messages);

    $(`meta[property="og:title"]`).attr("content", title);
    $(`meta[property="og:description"]`).attr("content", desc);

    return new Response($.html(), {
      headers: { "Content-Type": "text/html" },
    });
  } catch (e) {
    console.log(e);
  }
}
