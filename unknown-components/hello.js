// Run this in your browser console (F12 > Console) while on java.documentationai.com
// Or run with Node.js 18+: node check_urls.js

const urls = [
"https://java.documentationai.com/docs/how-credits-work-api",
"https://java.documentationai.com/docs/api-status-check-1",
"https://java.documentationai.com/docs/property-data-with-postman",
"https://java.documentationai.com/docs/property-data-with-curl",
"https://java.documentationai.com/docs/property-data-with-nodejs",
"https://java.documentationai.com/docs/property-data-with-php",
"https://java.documentationai.com/docs/property-data-with-python",
"https://java.documentationai.com/docs/property-data-with-wpgetapi",
"https://java.documentationai.com/docs/property-field-type-breakdown",
"https://java.documentationai.com/docs/possible-values-for-property-fields",
"https://java.documentationai.com/docs/normalized-address-data",
"https://java.documentationai.com/docs/normalized-countries-provinces",
"https://java.documentationai.com/docs/how-property-records-are-merged",
"https://java.documentationai.com/docs/available-views-for-property-data",
"https://java.documentationai.com/docs/using-a-custom-property-view",
"https://java.documentationai.com/docs/create-save-a-custom-property-view",
"https://java.documentationai.com/docs/search-for-mls-property-data",
"https://java.documentationai.com/docs/determine-home-values",
"https://java.documentationai.com/docs/search-for-properties-around-a-latlong",
"https://java.documentationai.com/docs/select-sites-for-commercial-development",
"https://java.documentationai.com/docs/contact-home-owners-that-need-roofing-work",
"https://java.documentationai.com/docs/contact-new-home-owners",
"https://java.documentationai.com/docs/search-property-status",
"https://java.documentationai.com/docs/search-via-street-address",
"https://java.documentationai.com/docs/discover-when-clients-sell-their-homes",
"https://java.documentationai.com/docs/find-investment-properties",
"https://java.documentationai.com/docs/identify-e-commerce-orders-shipping-to-vacant-houses",
"https://java.documentationai.com/docs/collect-hoa-fee-data-for-a-property",
"https://java.documentationai.com/docs/find-rental-rates-for-properties",
"https://java.documentationai.com/docs/find-property-comps-from-transaction-data",
"https://java.documentationai.com/docs/find-prices-of-sold-properties",
"https://java.documentationai.com/docs/track-property-status-changes",
"https://java.documentationai.com/docs/search-broker-license-numbers",
"https://java.documentationai.com/docs/generate-a-list-of-recent-broker-contacts",
"https://java.documentationai.com/docs/find-property-refinance-data",
"https://java.documentationai.com/docs/find-days-on-market-from-commercial-property",
"https://java.documentationai.com/docs/find-property-with-liens",
"https://java.documentationai.com/docs/find-mortgage-lender-from-transactions",
"https://java.documentationai.com/docs/accessing-owners-brokers-and-other-people",
"https://java.documentationai.com/docs/building-rental-property-data-market-reports",
"https://java.documentationai.com/docs/advanced-queries-of-property-postman",
"https://java.documentationai.com/docs/autotrace-property",
"https://java.documentationai.com/docs/count-property",
"https://java.documentationai.com/docs/geolocation-property",
"https://java.documentationai.com/docs/pagination-property",
"https://java.documentationai.com/docs/people-data-with-postman",
"https://java.documentationai.com/docs/people-data-with-curl",
"https://java.documentationai.com/docs/people-data-with-nodejs",
"https://java.documentationai.com/docs/people-data-with-php",
"https://java.documentationai.com/docs/people-data-with-python",
"https://java.documentationai.com/docs/people-field-type-breakdown",
"https://java.documentationai.com/docs/possible-values-for-people-fields",
"https://java.documentationai.com/docs/people_all",
"https://java.documentationai.com/docs/creating-a-custom-people-view-on-the-fly",
"https://java.documentationai.com/docs/create-save-a-custom-people-view",
"https://java.documentationai.com/docs/find-leads-for-a-saas-business",
"https://java.documentationai.com/docs/identifying-companies-with-employees-targeted-by-cyberattacks",
"https://java.documentationai.com/docs/gather-people-contact-information",
"https://java.documentationai.com/docs/accessing-property-linked-people-records",
"https://java.documentationai.com/docs/find-brokers-in-your-area",
"https://java.documentationai.com/docs/constructing-people-queries",
"https://java.documentationai.com/docs/people-count",
"https://java.documentationai.com/docs/people-pagination",
"https://java.documentationai.com/docs/product-data-with-postman",
"https://java.documentationai.com/docs/product-data-with-python",
"https://java.documentationai.com/docs/product-data-with-nodejs",
"https://java.documentationai.com/docs/product-data-with-curl",
"https://java.documentationai.com/docs/product-data-with-php",
"https://java.documentationai.com/docs/product-field-type-breakdown",
"https://java.documentationai.com/docs/product-brand-normalization",
"https://java.documentationai.com/docs/possible-values-for-product-fields",
"https://java.documentationai.com/docs/dimensions-normalization",
"https://java.documentationai.com/docs/taxonomy-1-level",
"https://java.documentationai.com/docs/taxonomy-2-levels",
"https://java.documentationai.com/docs/taxonomy-3-levels",
"https://java.documentationai.com/docs/taxonomy-4-levels",
"https://java.documentationai.com/docs/taxonomy-5-levels",
"https://java.documentationai.com/docs/taxonomy-6-levels",
"https://java.documentationai.com/docs/taxonomy-7-levels",
"https://java.documentationai.com/docs/taxonomy-8-levels",
"https://java.documentationai.com/docs/taxonomy-9-levels",
"https://java.documentationai.com/docs/product_all",
"https://java.documentationai.com/docs/creating-a-custom-product-view-on-the-fly",
"https://java.documentationai.com/docs/create-save-a-custom-product-view",
"https://java.documentationai.com/docs/constructing-advanced-product-data-queries-in-postman",
"https://java.documentationai.com/docs/how-product-records-are-merged",
"https://java.documentationai.com/docs/searching-by-gtin",
"https://java.documentationai.com/docs/lookup-products-by-brand-and-model-number",
"https://java.documentationai.com/docs/train-llms-with-product-descriptions-and-review",
"https://java.documentationai.com/docs/pricing-analytics-for-pet-food",
"https://java.documentationai.com/docs/cleanup-product-data-entered-by-customers",
"https://java.documentationai.com/docs/build-a-database-of-wines",
"https://java.documentationai.com/docs/provide-personalized-pricing-recommendations",
"https://java.documentationai.com/docs/match-products-against-a-competitor",
"https://java.documentationai.com/docs/search-for-smart-phones",
"https://java.documentationai.com/docs/finding-product-material-info",
"https://java.documentationai.com/docs/product-count",
"https://java.documentationai.com/docs/product-pagination",
"https://java.documentationai.com/docs/business-data-with-postman",
"https://java.documentationai.com/docs/business-data-with-php",
"https://java.documentationai.com/docs/business-data-with-python",
"https://java.documentationai.com/docs/business-data-with-nodejs",
"https://java.documentationai.com/docs/business-data-with-curl",
"https://java.documentationai.com/docs/how-business-records-are-merged",
"https://java.documentationai.com/docs/business-field-type-breakdown",
"https://java.documentationai.com/docs/possible-values-for-business-fields",
"https://java.documentationai.com/docs/available-views-for-business-data-1",
"https://java.documentationai.com/docs/constructing-advanced-business-data-queries-in-postman",
"https://java.documentationai.com/docs/discover-business-revenue",
"https://java.documentationai.com/docs/search-via-street-address-business",
"https://java.documentationai.com/docs/search-for-specific-restaurants",
"https://java.documentationai.com/docs/find-local-restaurants-using-geolocation",
"https://java.documentationai.com/docs/business-count",
"https://java.documentationai.com/docs/business-geolocation",
"https://java.documentationai.com/docs/business-pagination",
"https://java.documentationai.com/docs/product-data-enrichment",
"https://java.documentationai.com/docs/property-data-with-postman-and-json",
"https://java.documentationai.com/docs/property-data-enrichment-with-csv",
"https://java.documentationai.com/docs/property-data-enrichment-with-json",
"https://java.documentationai.com/docs/property-data-suppression-with-postman",
"https://java.documentationai.com/docs/realtime-data-requests",
"https://java.documentationai.com/docs/getting-started-with-realtime-updates",
"https://java.documentationai.com/docs/how-credits-work-portal",
"https://java.documentationai.com/docs/billing",
"https://java.documentationai.com/docs/downloading-result-files",
"https://java.documentationai.com/docs/postman-endpoint-overview",
"https://java.documentationai.com/docs/postman-downloading-result-files",
"https://java.documentationai.com/docs/advanced-querying",
"https://java.documentationai.com/docs/property-data-features",
"https://java.documentationai.com/docs/searching-by-address-in-property",
"https://java.documentationai.com/docs/determine-home-values-portal",
"https://java.documentationai.com/docs/find-recently-sold-property",
"https://java.documentationai.com/docs/search-sites-for-commercial-development",
"https://java.documentationai.com/docs/discover-when-clients-sell-their-homes-portal",
"https://java.documentationai.com/docs/portal-property-data-views",
"https://java.documentationai.com/docs/generate-leads-for-a-saas-business",
"https://java.documentationai.com/docs/identifying-employees-targeted-by-cyberattacks",
"https://java.documentationai.com/docs/searching-by-upc-in-product-data",
"https://java.documentationai.com/docs/searching-by-sku-in-product-data",
"https://java.documentationai.com/docs/finding-compliance-features-in-product-data",
"https://java.documentationai.com/docs/finding-highly-rated-products",
"https://java.documentationai.com/docs/searching-restaurants",
"https://java.documentationai.com/docs/find-chain-restaurants-in-your-state",
"https://java.documentationai.com/docs/v3-get-started",
"https://java.documentationai.com/docs/v3-business-data-with-web-browser-csv",
"https://java.documentationai.com/docs/v3-business-data-with-postman-and-csv",
"https://java.documentationai.com/docs/v3-business-data-with-curl-and-csv",
"https://java.documentationai.com/docs/v3-business-data-with-php-and-csv",
"https://java.documentationai.com/docs/v3-business-data-with-nodejs-and-csv",
"https://java.documentationai.com/docs/v3-business-data-with-python-and-csv",
"https://java.documentationai.com/docs/v3-business-data-with-web-browser-and-json",
"https://java.documentationai.com/docs/v3-business-data-with-postman-and-json",
"https://java.documentationai.com/docs/v3-business-data-with-curl-and-json",
"https://java.documentationai.com/docs/v3-business-data-with-php-and-json",
"https://java.documentationai.com/docs/v3-business-data-with-nodejs-and-json",
"https://java.documentationai.com/docs/v3-business-data-with-python-and-json",
"https://java.documentationai.com/docs/v3-business-data-schema",
"https://java.documentationai.com/docs/v3-businesses_all",
"https://java.documentationai.com/docs/v3-businesses_all_menusflat",
"https://java.documentationai.com/docs/v3-businesses_all_nested",
"https://java.documentationai.com/docs/v3-businesses_all_nested_no_reviews",
"https://java.documentationai.com/docs/v3-businesses_basic",
"https://java.documentationai.com/docs/v3-businesses_all_reviewsflat",
"https://java.documentationai.com/docs/v3-constructing-business-queries",
"https://java.documentationai.com/docs/v3-getting-started-with-people-data-1",
"https://java.documentationai.com/docs/v3-product-data-with-web-browser-csv",
"https://java.documentationai.com/docs/v3-product-data-with-postman-csv",
"https://java.documentationai.com/docs/v3-product-data-with-curl-csv",
"https://java.documentationai.com/docs/v3-product-data-with-php-csv",
"https://java.documentationai.com/docs/v3-product-data-with-nodejs-csv",
"https://java.documentationai.com/docs/v3-product-data-with-python-csv",
"https://java.documentationai.com/docs/v3-product-data-with-web-browser-and-json",
"https://java.documentationai.com/docs/v3-product-data-with-postman-and-json",
"https://java.documentationai.com/docs/v3-product-data-with-curl-and-json",
"https://java.documentationai.com/docs/v3-product-data-with-php-and-json",
"https://java.documentationai.com/docs/v3-product-data-with-nodejs-json",
"https://java.documentationai.com/docs/v3-product-data-with-python-and-json",
"https://java.documentationai.com/docs/v3-product-data-schema",
"https://java.documentationai.com/docs/v3-products_all",
"https://java.documentationai.com/docs/v3-products_basicfields",
"https://java.documentationai.com/docs/v3-products_keyssourceurls",
"https://java.documentationai.com/docs/v3-products_all_nested",
"https://java.documentationai.com/docs/v3-products_pricesflat",
"https://java.documentationai.com/docs/v3-products_reviewsflat",
"https://java.documentationai.com/docs/v3-constructing-product-queries",
"https://java.documentationai.com/docs/v3-property-data-with-web-browser-and-csv",
"https://java.documentationai.com/docs/v3-property-data-with-postman-and-csv",
"https://java.documentationai.com/docs/v3-property-data-with-curl-and-csv",
"https://java.documentationai.com/docs/v3-property-data-with-php-and-csv",
"https://java.documentationai.com/docs/v3-property-data-with-nodejs-and-csv",
"https://java.documentationai.com/docs/v3-property-data-with-python-and-csv",
"https://java.documentationai.com/docs/v3-property-data-with-web-browser-and-json",
"https://java.documentationai.com/docs/v3-property-data-with-postman-and-json",
"https://java.documentationai.com/docs/v3-property-data-with-curl-and-json",
"https://java.documentationai.com/docs/v3-property-data-with-php-and-json",
"https://java.documentationai.com/docs/v3-property-data-with-nodejs-and-json",
"https://java.documentationai.com/docs/v3-property-data-with-python-and-json",
"https://java.documentationai.com/docs/v3-possible-values-for-property-fields",
"https://java.documentationai.com/docs/v3-properties_all",
"https://java.documentationai.com/docs/v3-properties_all_nested",
"https://java.documentationai.com/docs/v3-constructing-property-queries",
"https://java.documentationai.com/docs/v3-reference-values-for-property-schema",
"https://java.documentationai.com/docs/v3-using-postman",
"https://java.documentationai.com/docs/v3-migrating-from-v3-to-v4",
"https://java.documentationai.com/llms.txt"
];

async function checkAllUrls() {
  const failed = [];
  const passed = [];
  let checked = 0;

  console.log(`🔍 Checking ${urls.length} URLs...\n`);

  for (let i = 0; i < urls.length; i += 5) {
    const batch = urls.slice(i, i + 5);
    const results = await Promise.all(
      batch.map(async (url) => {
        try {
          const res = await fetch(url, { method: "GET", redirect: "follow" });
          return { url, status: res.status, ok: res.ok };
        } catch (err) {
          return { url, status: "ERR", ok: false, error: err.message };
        }
      })
    );

    for (const r of results) {
      checked++;
      if (r.ok) {
        passed.push(r);
      } else {
        failed.push(r);
        console.log(`❌ ${r.status} | ${r.url}`);
      }
    }
    console.log(`Progress: ${checked}/${urls.length}`);
  }

  console.log(`\n========================================`);
  console.log(`✅ Passed: ${passed.length}`);
  console.log(`❌ Failed: ${failed.length}`);
  console.log(`========================================\n`);

  if (failed.length > 0) {
    console.log("FAILED URLs:");
    console.table(failed.map(f => ({ status: f.status, url: f.url })));
  }

  return { passed, failed };
}

checkAllUrls();