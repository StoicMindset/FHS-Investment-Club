var cosmos = require('@azure/cosmos');

const CosmosClient = cosmos.CosmosClient;
const client = new CosmosClient({
  endpoint: process.env.COSMOS_ENDPOINT,
  key: process.env.COSMOS_KEY,
});

module.exports = client;
