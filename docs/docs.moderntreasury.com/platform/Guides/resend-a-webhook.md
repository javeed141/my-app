# Resend a webhook

Occasionally, you may need to retrigger a webhook. This could be due to a failed delivery attempt, changes made to your API, or the webhook being overlooked. This guide outlines the steps to take to resend a webhook.

### To resend a webhook

1. Login to [Modern Treasury](https://app.moderntreasury.com/)
2. Access the Event object page. There are two ways to search for and view the associated Event object:
   1. Navigate to the [Developers](https://app.moderntreasury.com/developers/events) tab listed on the left panel, click on the “Events” tab, and filter by Resource, Event, and/or Entity ID (the ID of the Payment Order, Counterparty, Transaction, etc.). Click the desired Event to access the Event details page.
   2. Navigate to the relevant Modern Treasury object (e.g. the page of a Payment Order). Under the Timeline section, click into the desired Event to view the Event details page.
3. Once you've accessed the Event page, scroll down to Webhook Delivery Attempts
4. Identify the webhook you wish to resend and click "View Details"
5. Click "Resend"
6. Refresh the page and you will see the resent webhook