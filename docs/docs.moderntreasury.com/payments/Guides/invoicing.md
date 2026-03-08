# Hosted Invoicing

## Prerequisites

Before you create an invoice, you will need some information handy.

### Get your Organization ID and API Key

Log into the app and go to your [API Keys page](https://app.moderntreasury.com/developers/api_keys). There you will find your organization ID and API keys.

### Create or get your Counterparty

Before you can create an invoice, you need to have a counterparty in Modern Treasury.

You can get an existing counterparty's ID from your counterparties page [here](https://app.moderntreasury.com/counterparties). If you do not have the counterparty in Modern Treasury, you can create a counterparty either via the web app or the API.

Here is an example API request to create a counterparty:

```curl Create Counterparty cURL
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/counterparties \
  --header 'content-type: application/json' \
  --data '{
    "name": "Jane Smith",
    "email": "jane@marquardtschuppe.net"
  }'
```

Once the counterparty is successfully created, save the counterparty ID from the response body, which in this case is `342b0006-97b9-4b59-bd3d-5dfb220ff18b`:

```json Create Counterparty Response
{
    "id": "342b0006-97b9-4b59-bd3d-5dfb220ff18b",
    "object": "counterparty",
    "live_mode": true,
    "name": "Jane Smith",
    "email": "jane@marquardtschuppe.net",
    "send_remittance_advice": false,
    "metadata": {},
    "accounts": [],
    "discarded_at": null,
    "created_at": "2023-04-13T16:14:41Z",
    "updated_at": "2023-04-13T16:14:41Z"
}
```

For more details, see our [API reference for counterparties](/platform/reference/counterparty-object).

### Get your Originating Account ID

When you send a counterparty an invoice, you must designate one of your [internal accounts](/platform/reference/internal-account-object) as the account that money will deposited into when the invoice is paid. If the invoice is paid via ACH debit, then the internal account will originate an ACH debit against the counterparty's bank account.

To get an internal account ID, you can pick one from your accounts page [here](https://app.moderntreasury.com/accounts).

## Create an Invoice

Next, you will create an invoice using our API. You must include the following fields:

* Invoice counterparty ID
* Originating account ID
* Due date

You can only set the invoice's [contact details](/platform/reference/contact-detail-object) (your email, phone number, and website) when creating the invoice; you will not be able to update these. When creating an invoice, you are able to create [invoice line items](/platform/reference/invoice-line-items) in the same request.

If you set `auto_advance` to true, the invoice will automatically be marked as ready-to-collect and will automatically progress the invoice to the status `unpaid`. An invoice in the `unpaid` status cannot be modified afterwards.

If you set `payment_method` to automatic, the `receiving_account_id`, `payment_effective_date`, and `payment_type` fields must be set.

See our invoice [API reference docs](/platform/reference/invoices) for more invoice fields that you can set.

```curl Create Invoice cURL
curl --request POST \
	-u 'ORGANIZATION_ID:API_KEY' \
	--url https://app.moderntreasury.com/api/invoices \
	--header 'content-type: application/json' \
	--data '{
    "auto_advance": false,
    "currency": "USD",
    "counterparty_id": "342b0006-97b9-4b59-bd3d-5dfb220ff18b",
    "originating_account_id": "0f8e3719-3dfd-4613-9bbf-c0333781b59f",
    "due_date": "2023-04-30T20:36:28Z",
    "contact_details": [
    	{
        "contact_identifier": "my-email@example.com",
        "contact_identifier_type": "email"
    	},
    	{
        "contact_identifier": "example.com",
        "contact_identifier_type": "website"
    	}
    ],
    "invoice_line_items": [
      { 
        "name": "implementation fee",
        "description": "Fee for August 2023",
        "direction": "debit",
        "quantity": 1,
        "unit_amount": 2050	
      }
    ]
	}'
```

The response will look like the following:

```json Create Invoice Response
{
    "id": "4470104e-0921-4054-a0bc-98531262ea83",
    "object": "invoice",
    "live_mode": true,
    "currency": "USD",
    "description": null,
    "total_amount": 0,
    "number": "2023-00013",
    "status": "draft",
    "counterparty_id": "342b0006-97b9-4b59-bd3d-5dfb220ff18b",
    "originating_account_id": "0f8e3719-3dfd-4613-9bbf-c0333781b59f",
    "due_date": "2023-04-30T20:36:28Z",
    "hosted_url": "https://payments.moderntreasury.com/invoices/4470104e-0921-4054-a0bc-98531262ea8?organization_id=61ef5b0-bb58-4113-a162-b5e3d5952fc7",
    "pdf_url": null,
    "contact_details": [
      {
        "contact_identifier": "my-email@example.com",
        "contact_identifier_type": "email"
      },
      {
      	"contact_identifier": "example.com",
        "contact_identifier_type": "website"
      },
    ],
    "invoicer_address": null,
    "counterparty_billing_address": null,
    "counterparty_shipping_address": null,
    "payment_orders": [],
    "created_at": "2023-03-27T20:36:28Z",
    "updated_at": "2023-03-27T20:36:28Z"
}
```

You can view the invoice at the hosted URL in the response body.

#### **(*Optional*) Adding your company logo to invoices**

The invoice will include your company logo automatically. To change or add a logo for your organization, navigate to your organization's [settings](https://app.moderntreasury.com/settings/organization) page and click the **Logo** tab.

## Update a Draft Invoice

If you want to update the invoice's details, you can do so through the API:

```curl Update Invoice cURL
curl --request PATCH \
	-u 'ORGANIZATION_ID:API_KEY' \
	--url https://app.moderntreasury.com/api/invoices/4470104e-0921-4054-a0bc-98531262ea83 \
	--header 'content-type: application/json' \
	--data '{
	  "description": "This invoice is due at the end of the month.",
	  "invoicer_address": {
		"line1": "8480 Jerde Harbors",
		"line2": "Suite 579",
		"locality": "Carrollshire",
		"region": "MD",
		"postal_code": "21144",
		"country": "US"
	  }
	}'
```

To see the complete list of invoice fields you can update, visit our [API reference docs](/platform/reference/invoices).

### Add additional line items to an invoice

When adding invoice line items to an existing invoice, you can use the invoice ID to add additional line items. Each line item requires a separate API request.

```curl Create Invoice Line Item cURL
curl --request POST \
	-u 'ORGANIZATION_ID:API_KEY' \
	--url https://app.moderntreasury.com/api/invoices/4470104e-0921-4054-a0bc-98531262ea83/invoice_line_items \
	--header 'content-type: application/json' \
	--data '{
      "direction": "debit",
      "name": "Croissant",
      "quantity": 5,
      "unit_amount": 600
	}'
```

See our API reference for invoice line items [here](/platform/reference/invoice-line-items).

## Share an Invoice with a Counterparty

To mark the invoice as ready-to-collect, update the invoice, indicating if you want to include the embedded payment UI and updating the invoice status to `unpaid`.

```curl Update Invoice cURL
curl --request PATCH \
	-u 'ORGANIZATION_ID:API_KEY' \
	--url https://app.moderntreasury.com/api/invoices/4470104e-0921-4054-a0bc-98531262ea83 \
	--header 'content-type: application/json' \
	--data '{
      "status": "unpaid",
      "include_payment_flow": true
	}'
```

Now, the invoice is ready-to-collect and you can send the invoice's counterparty the hosted URL.