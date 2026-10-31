# Swiss Jobs API: jobs.ch, jobup.ch, JobScout24 and job-room.ch in Python and Node

Get Swiss job listings from **jobs.ch, jobup.ch, JobScout24.ch and job-room.ch (arbeit.swiss)** as clean JSON with a few lines of code. There is no official public jobs.ch API, so this repo uses the hosted [Swiss Jobs Scraper](https://apify.com/swissalpinedata/swiss-jobs-scraper) on Apify, which reads the public search endpoints of all four boards and returns one schema.

Pay per result, no subscription, no login and no proxy setup. New Apify accounts get free monthly credit, which covers a few thousand results.

## Quick start

1. Create a free account on [Apify](https://apify.com) and copy your API token from Settings, Integrations.
2. `export APIFY_TOKEN=your_token`
3. Run one of the examples below.

### Python

```bash
pip install apify-client
python example.py
```

```python
import os
from apify_client import ApifyClient

client = ApifyClient(os.environ["APIFY_TOKEN"])
run = client.actor("swissalpinedata/swiss-jobs-scraper").call(run_input={
    "query": "python",
    "location": "Zürich",
    "maxItems": 20
})

for item in client.dataset(run.default_dataset_id).iterate_items():
    print(item)
```

### Node.js

```bash
npm install apify-client
node example.mjs
```

```js
import { ApifyClient } from "apify-client";

const client = new ApifyClient({ token: process.env.APIFY_TOKEN });
const run = await client.actor("swissalpinedata/swiss-jobs-scraper").call({
  "query": "python",
  "location": "Zürich",
  "maxItems": 20
});
const { items } = await client.dataset(run.defaultDatasetId).listItems();
console.log(items);
```

### curl

```bash
curl -X POST "https://api.apify.com/v2/acts/swissalpinedata~swiss-jobs-scraper/run-sync-get-dataset-items" \
  -H "Authorization: Bearer $APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"query": "python", "location": "Zürich", "maxItems": 20}'
```

## Example output

One record looks like this:

```json
{
  "source": "jobs.ch",
  "job_id": "384bbefd-1193-4545-b36f-72cdbd1ffa94",
  "url": "https://www.jobs.ch/de/stellenangebote/detail/384bbefd-1193-4545-b36f-72cdbd1ffa94/",
  "title": "Senior Fullstack Engineer (C#, Angular, Python) (a)",
  "company": "ERNI Schweiz AG",
  "location": "Zürich",
  "canton": "ZH",
  "workload": "100%",
  "employment_type": "permanent",
  "published_at": "2026-06-25T15:20:58+02:00",
  "description": "Wir sind ERNI. Seit 1994 beraten und unterstützen wir Unternehmen in den Bereichen Innovation und Technologie mit dem Ziel, ihre Leistungsfähigkeit nachhaltig zu steigern und den Weg in eine digitale Zukunft zu ebnen.\n\nWas Dich erwartet:\n\nEntwicklung moderner Fullstack-Anwendungen mit C# im Backend und Angular im Frontend ...",
  "language": null,
  "scraped_at": "2026-09-22T20:33:55.857353+00:00"
}
```

## What you can build

* Track hiring at Swiss companies or competitors
* Build a niche Swiss job board or newsletter
* Salary and workload research by canton
* Recruiting agency lead lists

## Schedules and integrations

On Apify you can save this input as a task, run it on a schedule (for example every morning) and send new results to Google Sheets, Slack, a webhook, Make, n8n or Zapier without writing code. All input fields are documented on the [actor page](https://apify.com/swissalpinedata/swiss-jobs-scraper).

## More Swiss and DACH data APIs

* [arbeitsagentur-jobs-api](https://github.com/swissalpinedata/arbeitsagentur-jobs-api): Arbeitsagentur Jobsuche API
* [zefix-api-python](https://github.com/swissalpinedata/zefix-api-python): Zefix API in Python
* [austria-jobs-api](https://github.com/swissalpinedata/austria-jobs-api): Austria Jobs API
* [flatfox-api-python](https://github.com/swissalpinedata/flatfox-api-python): Flatfox API
* [personio-jobs-api](https://github.com/swissalpinedata/personio-jobs-api): Personio, Workable, Recruitee, SmartRecruiters and Teamtailor jobs API in Python and Node

## No code: n8n and Make

Ready to import n8n workflows and Make guides for these actors: [n8n-swiss-data-templates](https://github.com/swissalpinedata/n8n-swiss-data-templates).

## License

The example code in this repo is MIT licensed. The data comes from public sources; you are responsible for using it in line with the GDPR and the terms of the source sites.
