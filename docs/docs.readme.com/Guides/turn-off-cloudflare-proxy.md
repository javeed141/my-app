# Turn Off Cloudflare Proxy

For customers that use Cloudflare

In order for the custom domain feature to work in ReadMe, you must disable the proxy in your Cloudflare settings. You will not lose the benefits of a proxy because we will have the proxy enabled in our Cloudflare settings. This action allows ReadMe to issue the SSL certificate for your custom domain successfully.

## 1. Locate Custom Domain of Your ReadMe Project

Your Cloudflare account may host multiple domains, locate the one that your ReadMe project uses. In this example, we're selecting the searching and selecting the hoot.at domain.

<Image title="Screenshot 2019-12-10 21.17.10.png" alt={2028} align="center" border={true} src="https://files.readme.io/a0c2e02-Screenshot_2019-12-10_21.17.10.png">
  Your domain is likely docs.company.com or developers.company.com
</Image>

## 2. Find CNAME Pointing to readmessl.com

Select the DNS tab and search for readmessl.com. In most cases, there will only be a single CNAME record, but it's okay if there's more than one!

<Image title="Screenshot 2019-12-10 21.15.22.png" alt={2030} align="center" border={true} src="https://files.readme.io/2a3de4e-Screenshot_2019-12-10_21.15.22.png">
  Notice the Proxy status is a "Proxied" orange cloud.
</Image>

## 3. Turn Proxy Off

Toggle the orange cloud icon to change the **Proxy status** to **DNS only**.

<Image align="center" className="border" border={true} src="https://files.readme.io/82a3a80-Screenshot_2019-12-10_21.16.31.png" />

And that's it! This action allows ReadMe to take control of this domain at the SSL Layer on our CloudFlare account so you can be upgraded without an interruption in service. Our Engineers will be scanning programmatically to confirm but please notify your ReadMe support person too. 😊