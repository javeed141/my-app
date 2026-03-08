# Outbound IP Addresses

Once you have an API reference section set up with ReadMe, your API will likely start receiving requests from ReadMe's servers. This may be happening because:

* Your users are making API requests within your reference section (i.e., **“Try It!”**) and by default, all API requests are proxied through ReadMe.
  * For more information on our CORS proxy and how to configure it, see the [**OpenAPI Extensions page**](https://docs.readme.com/main/docs/openapi-extensions#/cors-proxy-enabled).
* You're consuming a ReadMe webhook (e.g., pre-populating your users' API keys and other info in their API reference via [the Personalized Docs Webhook](https://docs.readme.com/main/docs/personalized-docs-webhook)).

For customers that lock down their systems to a limited set of IP addresses, ReadMe's servers has a list of fixed outbound IP addresses that you can add to your allow list. You can retrieve this list of IP addresses from [this endpoint](https://docs.readme.com/main/reference/getoutboundips-1).

**ReadMe's outbound IP addresses may change periodically**, so we recommend fetching this list from the IP as opposed to hardcoding it in your system. The IPs in the API response will be valid for at least 7 days. If you configure your API or webhooks to limit access based on these IPs, you should refresh the IP list from this endpoint on a weekly basis at the least.