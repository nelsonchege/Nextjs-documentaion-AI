import { timeout } from "@/config";

export const createPineconeIndex = async ({
  client,
  indexName,
  vectorDimension,
}: any) => {
  // 1. Initiate index existence check
  console.log(`Checking "${indexName}"...`);
  const existingIndexes = await client.listIndexes();

  // 2. If index doesn't exist, create it
  if (!existingIndexes.includes(indexName)) {
    // 3. Log index creation initiation
    console.log(`Creating "${indexName}"...`);
    console.log(
      `dependancies: indexname -> ${indexName}, vectorDimension -> ${vectorDimension}`
    );
    const createClient = await client.createIndex({
      createRequest: {
        name: indexName,
        dimension: vectorDimension,
        metric: "cosine",
      },
    });
    // 4. Log successful creation
    console.log(`Created with client:`, createClient);
    // 5. Wait 60 seconds for index initialization
    console.log(`wait afew seconds for processing ......`);
    await new Promise((resolve) => setTimeout(resolve, timeout));
  } else {
    // Log if index already exists
    console.log(`"${indexName}" already exists.`);
  }
};
