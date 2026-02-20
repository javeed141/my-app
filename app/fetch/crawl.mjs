// import Firecrawl from '@mendable/firecrawl-js';

// const app = new Firecrawl({ apiKey: "fc-14a41ca32c9746a5bcdb5d53b7febeb3"  });

// // Scrape a website:
// app.scrape('firecrawl.dev')


import Firecrawl from '@mendable/firecrawl-js';

const firecrawl = new Firecrawl({apiKey: "fc-14a41ca32c9746a5bcdb5d53b7febeb3"});

// Scrape a website
const scrapeResponse = await firecrawl.scrape('https://firecrawl.dev', {
  formats: ['markdown', 'html'],
});

console.log(scrapeResponse)

// Crawl a website
const crawlResponse = await firecrawl.crawl('https://firecrawl.dev', {
  limit: 100,
  scrapeOptions: {
    formats: ['markdown', 'html'],
  }
});

console.log(crawlResponse)