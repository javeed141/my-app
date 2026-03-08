# View Card PANs & CVVs - Quick Start Guide

In order to make purchases with a card, you will need to know the card's expiration, CVV, and PAN.

Lithic provides an easy-to-set-up UI for securely displaying this data to your users without the overhead of implementing PCI DSS compliance. With this UI, sensitive card data never touches your servers and goes directly to your users' browsers.

<Image alt="Examples of our customizable card UI" align="center" src="https://d1jvjlrimvr0n9.cloudfront.net/stable/866ca0c6efe70b66_c96db52a2a09a90c4ff0fd79700bd24264f54e44f9b36c45e6c2924e00d9dff6-view-card-pans-and-cvvs.png">
  Examples of our customizable card UI
</Image>

### Step 1: Add an iframe to your webpage to display sensitive card data

Add the below `<iframe>` to your webpage. The `<iframe>` will retrieve a card's sensitive data via an API request and then render the card data in the browser. The rendering is interactive – clicking on the expiration, CVV, or PAN will copy the value to the browser's clipboard. The card UI can be customized to match your branding.

```html
<body>
  <!-- Your webpage content -->
  ...
  <iframe
    id="card-iframe"
    allow="clipboard-write"
    width="600"
    height="300"
    src="{Signed URL}"
  >
  </iframe>
  ...
  <!-- Your webpage content -->
</body>
```

### Step 2: Generate a signed URL to load via the iframe

Since the API request comes from an `<iframe>` in the users' browser, attaching your API key as a header or parameter would leak your API key.

Instead Lithic provides a simple way to generate a signed URL on your server that you can pass to the browser. Loading the signed URL from your `<iframe>` will render an HTML document in the frame that contains a card's expiration, CVV, and PAN.

*Note: If you are not using a Lithic library you will need to implement the signing process yourself.*

```typescript Typescript (Lithic Library)
/*
const lithic = new Lithic({
  apiKey: "{Sandbox API key}", // or "Production API key"
  environment: "sandbox", // or "production". Defaults to "production"
});
*/

// Pass this URL to the browser and load via iframe
const url = lithic.cards.getEmbedURL({ token: "{Card Token}" });
```

```python Python (Lithic Library)
'''
lithic = Lithic(
  api_key="{Sandbox API key}",  # or "Production API key"
  environment="sandbox",  # or "production". Defaults to "production"
)
'''

# Pass this URL to the browser and load via iframe
url = lithic.cards.get_embed_url({
  "token": "{Card Token}"
})
```

```text cURL (N/A)
Generating the signed URL does not require making a call to the Lithic API
and thus cannot be done using cURL.

The Lithic libraries implement the signing process for you so that
you do not need to write it from scratch. Visit the in-depth Embedded Card UI
guide for information on implementing the signing process yourself.
```