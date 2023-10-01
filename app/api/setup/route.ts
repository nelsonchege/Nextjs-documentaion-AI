import { TextLoader } from "langchain/document_loaders/fs/text";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { indexName, vectorDimension } from "@/config";
import { updatePinecone } from "@/lib/pinecone/addEmbeddings";
import { createPineconeIndex } from "@/lib/pinecone/createIndex";
import client from "@/lib/pinecone/initializePinecone";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const loader = new DirectoryLoader("./docs", {
    ".txt": (path) => new TextLoader(path),
    ".mdx": (path) => new TextLoader(path),
    ".pdf": (path) => new PDFLoader(path),
  });

  const docs = await loader.load();

  try {
    await createPineconeIndex({ client, indexName, vectorDimension });
    await updatePinecone({ client, indexName, docs });

    return NextResponse.json({ message: "Index and Embeddings created" });
  } catch (error) {
    console.log("something went wrong: ", error);
    return new Response("Could not create Index and Embeddings", {
      status: 500,
    });
  }
}
