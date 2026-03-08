# Invoices

An `invoice` represents a list of goods sent or services provided by a business along with a statement of the amount due for these goods and services. Typically, a business's accounts receivable (AR) refer to the outstanding invoices that a company has or the money that counterparties owe the company.

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th style={{ textAlign: "left" }}>
        Attribute
      </th>

      <th style={{ textAlign: "left" }}>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td style={{ textAlign: "left" }}>
        **id**
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        Unique identifier for the invoice.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **contact\_details**\
        *array of objects*
      </td>

      <td style={{ textAlign: "left" }}>
        The business [contact details](https://docs.moderntreasury.com/platform/reference/contact-detail-object) (email, phone number, and/or website) of the entity creating the invoice.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **counterparty\_id**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        The ID of the [counterparty](https://docs.moderntreasury.com/platform/reference/counterparty-object) receiving the invoice.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **counterparty\_billing\_address**\
        *object*
      </td>

      <td style={{ textAlign: "left" }}>
        The [billing address](https://docs.moderntreasury.com/platform/reference/address-object) of the counterparty or null.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **counterparty\_shipping\_address**\
        *object*
      </td>

      <td style={{ textAlign: "left" }}>
        The [shipping address](https://docs.moderntreasury.com/platform/reference/address-object) of the counterparty where physical goods should be delivered or null.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **currency**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        Currency that the invoice is denominated in.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **description**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        An optional free-form description of the invoice.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **due\_date**\
        *datetime*
      </td>

      <td style={{ textAlign: "left" }}>
        A date by when the invoice needs to be paid.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **hosted\_url**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        The URL of the hosted web UI where the invoice can be viewed.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **invoicer\_name**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        The name of the issuer on the invoice. Defaults to the name of the Organization in Modern Treasury.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **invoicer\_address**\
        *object*
      </td>

      <td style={{ textAlign: "left" }}>
        [Business address](https://docs.moderntreasury.com/platform/reference/address-object) of the entity creating the invoice or null.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **number**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        A unique record number assigned to each invoice that is issued.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **originating\_account\_id**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        The ID of the [internal account](https://docs.moderntreasury.com/platform/reference/internal-account-object) the invoice should be paid to.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **virtual\_account\_id**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        The ID of the [virtual account](https://docs.moderntreasury.com/platform/reference/virtual-account-object) the invoice should be paid to. The virtual account routing and accounts numbers will be shown on the invoice in place of the internal account information.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **payment\_orders**\
        *array of objects*
      </td>

      <td style={{ textAlign: "left" }}>
        The [payment orders](https://docs.moderntreasury.com/platform/reference/payment-order-object) created for paying the invoice through the invoice payment UI.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **expected\_payments**\
        *array of objects*
      </td>

      <td style={{ textAlign: "left" }}>
        The [Expected Payments](https://docs.moderntreasury.com/platform/reference/expected-payment-object) created for the invoice upon entering the unpaid state.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **pdf\_url**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        The URL where the invoice PDF can be downloaded.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **status**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        One of `draft`, `unpaid`, `payment_pending`, `paid`, or `voided`.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **total\_amount**\
        *int32*
      </td>

      <td style={{ textAlign: "left" }}>
        Total amount due in specified currency's smallest unit, e.g. $10 USD would be represented as 1000.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **payment\_method**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        When opening an invoice, whether to show the embedded payment UI, automatically create a payment or rely on manual payment from the recipient. One of `ui`,`automatic`, or `manual`
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **payment\_effective\_date**\
        *date*
      </td>

      <td style={{ textAlign: "left" }}>
        When payment method is `automatic`:\
        Date transactions are to be posted to the participants’ account. Defaults to the current business day or the next business day if the current day is a bank holiday or weekend.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **remind\_after\_overdue\_days**\
        *array of ints*
      </td>

      <td style={{ textAlign: "left" }}>
        A list of days after the due date on which overdue reminder emails should be sent. Maximum length of 3, and maximum value of 365, email notifications must be enabled
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **receiving\_account\_id**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        When payment method is `automatic`:\
        The receiving account ID for automatic payments. Can be an [external account](https://docs.moderntreasury.com/reference/external-account-object).
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **payment\_type**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        When payment method is `automatic`:\
        Payment type for generated automatic payment. One of `ach` or `eft`
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **metadata**\
        *object*
      </td>

      <td style={{ textAlign: "left" }}>
        Additional data represented as key-value pairs. Both the key and the value must be strings. See [Metadata](https://docs.moderntreasury.com/platform/reference/metadata).
      </td>
    </tr>
  </tbody>
</Table>

```json Invoice Example
{
  "id": "e120c37a-83eb-4b31-bf49-868d0110cdaf",
  "object": "invoice",
  "live_mode": true,
  "currency": "USD",
  "payment_method": "automatic",
  "payment_effective_date": "2023-03-23",
  "payment_type": "ach",
  "description": "Invoice for goods and services provided",
  "total_amount": 0,
  "number": "2023-00001",
  "status": "draft",
  "counterparty_id": "60df9366-c98e-4be9-a1af-163e792331cd",
  "due_date": "2023-02-19T16:25:12Z",
  "hosted_url": "http://payments.moderntreasury.com/invoices/e120c37a-83eb-4b31-bf49-868d0110cdaf",
  "pdf_url": null,
  "remind_after_overdue_days": null,
  "invoicer_name": "Initech",
  "invoicer_address": {
    "id": "32fdb378-2a26-4b3c-8fe0-037932e07b4c",
    "object": "address",
    "live_mode": true,
    "line1": "680 Darron Flats",
    "line2": null,
    "locality": "Lake Boville",
    "region": "WV",
    "postal_code": "36045-2227",
    "country": "US",
    "created_at": "2023-01-20T16:25:12Z",
    "updated_at": "2023-01-20T16:25:12Z"
  },
  "contact_details": [
    {
      "contact_identifier": "abby@marquardtschuppe.net",
      "contact_identifier_type": "email",
    },
    {
      "contact_identifier": "www.example.com",
      "contact_identifier_type": "website",
    },
  ],
  "metadata": {},
  "counterparty_billing_address": null,
  "counterparty_shipping_address": null,
  "originating_account_id": "071f206e-4f79-424c-9e53-0c6a3366277d",
  "payment_orders": [],
  "created_at": "2023-01-20T16:25:12Z",
  "updated_at": "2023-01-20T16:25:12Z"
}
```