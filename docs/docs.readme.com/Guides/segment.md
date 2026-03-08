# Segment

Adding your segment write key will send in page view data to Segment. For each page viewed in the documentation, we will call Segment's `analytics.page` function with the information of the page that was viewed.

## Using a Custom Domain with Segment

Segment has the ability to proxy requests through a custom domain. You can learn more about setting up that feature in Segment [here](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/custom-proxy).

If you are using this feature with your Segment account, you will need to add the custom domain you are using to the config in ReadMe. To do this, just set the custom domain you are using in the Segment config in the ReadMe dashboard.

<Image title="segment.png" alt={1912} src="https://files.readme.io/16d91c5-segment.png">
  Set your custom domain in the ReadMe Segment configuration on the integrations page.
</Image>