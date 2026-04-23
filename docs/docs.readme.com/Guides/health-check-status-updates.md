# Health Check Status Updates

Communicate real-time status to your users

<Callout icon="💁‍♂️">
  ### Keep in Mind!

  This feature is only available on Business and Enterprise plans.
</Callout>

It's important to let your users know when your API or product is having stability issues or downtime. ReadMe allows you to show a notification to your users if that's the case. This can be accessed in your dash by going to **General Settings > Health Check**.

There are two different types of health check that we currently support:

1. Manual Update
2. Statuspage.io Sync

## Manual Update

You manually tell us whether your API is healthy or not, optionally providing a status URL which we'll link to your users to get further details. You let your users know of your API status by logging into your ReadMe account and updating the toggle.

<Image align="center" alt="Screenshot showing manual health check provider." border={true} caption="Find Health Check in Admin Settings > Health Check" title="Screen Shot 2018-01-24 at 10.46.19.png" src="https://files.readme.io/10a2e88a1513ec080ab45842c7adf9b041f64f855e16e8d14a712b20e420ba73-health_check.png" />

## Statuspage.io Sync

If you already have a status page setup at [https://www.statuspage.io/](https://www.statuspage.io/), you can select this and give us your "page ID." You can grab your page ID from the URL when you're administering your status page. It is the part at the end of the URL: [https://manage.statuspage.io/pages/xxxxxxxxxxxx](https://manage.statuspage.io/pages/xxxxxxxxxxxx)

Once you give us that, we'll periodically check Statuspage's API to make sure your page isn't reporting any issues.

<Image alt="Screenshot showing statuspage.io health check provider." border={true} caption="Screenshot showing statuspage.io health check provider." title="Screen Shot 2018-01-24 at 11.06.34.png" src="https://files.readme.io/bba4df5-Screen_Shot_2018-01-24_at_11.06.34.png" />

## What it Looks Like On the Hub

We display an alert to your issues when we detect that your API is having issues. If you provided us with a URL (for manual) we link to it. If you're using statuspage.io, we automatically fetch your URL from the API.

<Image alt="Screenshot showing unhealthy alert on the front end." border={true} caption="Screenshot showing unhealthy alert on the front end." title="Screen Shot 2018-01-23 at 14.54.46.png" src="https://files.readme.io/9d8e6c8-Screen_Shot_2018-01-23_at_14.54.46.png" width="smart" />