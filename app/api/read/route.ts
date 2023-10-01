import { indexName } from "@/config";
import client from "@/lib/pinecone/initializePinecone";
import { queryPineconeVectorStoreAndQueryLLM } from "@/lib/pinecone/querryPinecone";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const text = await queryPineconeVectorStoreAndQueryLLM({
      client,
      indexName,
      question: body.prompt,
    });

    return NextResponse.json({
      response: text,
    });
  } catch (error) {
    console.log("something went wrong: ", error);
    return new Response("Could not create Index and Embeddings", {
      status: 500,
    });
  }
}
