# Hosted Invoice Links

Invoices have two external facing links that can be shared with end users. One is the hosted invoice url which displays the hosted invoice page and the other is the invoice pdf url. Examples of what these links lead to can be seen [here](https://docs.moderntreasury.com/payments/docs/remove-modern-treasury-branding#invoice). They provide a way to collect payments in a hosted portal and share payment details with customers.

# How to access Links

There are 3 ways to access hosted invoice links:

1. They are serialized in all invoice API responses
2. They are available in the UI via clicking "View invoice" which brings the user to a hosted view which is shareable, the link for download pdf in this view is also shareable
3. They can be sent directly to users via [notification emails ](https://docs.moderntreasury.com/payments/docs/invoice-notifications).

### Link Expiration

All links expire at the latter of 30 days after the Invoice due date, or 10 days after the link was generated.

# Getting a new valid link

After link expiration each flow has a way to access a new link that is valid for 10 days.

#### Notification Email Flow

Users accessing expired links are brought to a page prompting them to submit their email if they would like new link. If the email entered matches where the link was originally sent a new link will be emailed to it.

#### UI Flow

Any link that is copied from the UI is freshly generated on the page load. If a new link is required simply copy  the hosted or pdf link from the UI.

#### API/Developer Flow

Any hosted link or pdf link returned in a response by the API is guaranteed to be valid for 10 days.