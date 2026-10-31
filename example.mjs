import { ApifyClient } from "apify-client";

const client = new ApifyClient({ token: process.env.APIFY_TOKEN });
const run = await client.actor("swissalpinedata/swiss-jobs-scraper").call({
  "query": "python",
  "location": "Zürich",
  "maxItems": 20
});
const { items } = await client.dataset(run.defaultDatasetId).listItems();
console.log(JSON.stringify(items, null, 2));
console.log(`${items.length} records`);
