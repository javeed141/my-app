# Example Requests

These are sample payloads that can be used when creating a payment order. Use the table of contents to the side to quickly jump to a specific payment type.

## Initiating an ACH payment

### ACH credit

The following request will push $10 from the originating account to the receiving account.

```json
{
  "type": "ach",
  "amount": 1000,
  "direction": "credit",
  "currency": "USD",
  "originating_account_id": "<Internal Account ID>",
  "receiving_account_id": "<External Account ID>"
}
```

### ACH debit

The following request will pull $10 from the receiving account and place it into the originating account.

```json
{
  "type": "ach",
  "amount": 1000,
  "direction": "debit",
  "currency": "USD",
  "originating_account_id": "<Internal Account ID>",
  "receiving_account_id": "<External Account ID>"
}
```

## Initiating a Real-Time Payment (RTP)

<Callout icon="🚧" theme="warn">
  In order to originate an RTP payment from an internal account, you'll need a bank account at an [institution that supports RTP](https://docs.moderntreasury.com/reference#supported-banks).
</Callout>

### RTP credit

The following request will initiate an RTP payment of $50.00 from the originating internal account and send it to the receiving account.

```json
{
  "type": "rtp",
  "amount": 5000,
  "direction": "credit",
  "currency": "USD",
  "originating_account_id": "<Internal Account ID>",
  "receiving_account_id": "<External Account ID>"
}
```

### RTP debit (Request for Payment)

To initiate a Request for Payment (RFP) over the RTP network, switch the `direction` to `debit`. The following API request will request a payment of $50.00 from the receiving account to be sent to the originating account.

```json
{
  "type": "rtp",
  "amount": 5000,
  "direction": "debit",
  "currency": "USD",
  "originating_account_id": "<Internal Account ID>",
  "receiving_account_id": "<External Account ID>",
  "expires_at": "2022-05-20T14:49:07Z"
}
```

<Callout icon="🚧" theme="warn">
  Note that RFP payments require an `expires_at`. This value must be past the `effective_date`.
</Callout>

## Initiating an EFT payment

<Callout icon="🚧" theme="warn">
  Note that the `purpose` field is mandatory for all EFT payments.
</Callout>

### EFT credit

The following will initiate an EFT payment of $50.00 CAD from the originating internal account and send it to the receiving account.

```json
{
  "type": "eft",
  "amount": 5000,
  "direction": "credit",
  "currency": "CAD",
  "purpose": "371",
  "originating_account_id": "<Internal Account ID>",
  "receiving_account_id": "<External Account ID>"
}
```

### EFT debit

The following will pull $50.00 CAD from the receiving account and send it to the originating internal account

```json
{
  "type": "eft",
  "amount": 5000,
  "direction": "debit",
  "currency": "CAD",
  "purpose": "371",
  "originating_account_id": "<Internal Account ID>",
  "receiving_account_id": "<External Account ID>"
}
```

## Initiating a Book transfer

### Book credit

You may want to do a transfer between two internal accounts. This is called a book transfer. In this case, the `receiving_account_id` will be one of your internal account IDs.

```json
{
  "type": "book",
  "amount": 1000,
  "direction": "credit",
  "currency": "USD",
  "originating_account_id": "<Internal Account #1 ID>",
  "receiving_account_id": "<Internal Account #2 ID>",
  "remittance_information": "Some helpful information to include"
}
```

## Initiating a Check payment

```json
{
  "type": "check",
  "amount": 1000,
  "direction": "credit",
  "currency": "USD",
  "statement_descriptor": "invoice 4",
  "originating_account_id": "<Internal Account #1 ID>",
  "receiving_account": {
    "party_name": "Sesame Inc.",
    "party_address": {
      "line1": "1234 Ingredients Lane",
      "line2": "Office 7",
      "locality": "City of Industry",
      "region": "CA",
      "postal_code": "94714",
      "country": "US"
  }
}
```

## Initiating an Interac e-Transfer payment

<Callout icon="🚧" theme="warn">
  Interac e-Transfer payments require either an email or phone number associated with the receiving account. This may be passed inline to the Payment Order request as part of the receiving account's `contact_details`.
</Callout>

### Interac e-Transfer credit

The following request will initiate an Interac e-Transfer payment of $50.00 from the originating internal account and send it to the account associated with the email address.

```json Email
{
  "type": "interac",
  "amount": 5000,
  "direction": "credit",
  "currency": "CAD",
  "originating_account_id": "<Internal Account ID>",
  "receiving_account": {
    "party_name": "Harry Potter",
    "contact_details": [
      {
        "contact_identifier": "harry@hogwarts.edu",
        "contact_identifier_type": "email"
      }
    ]
  }
}
```

```json Phone number
{
  "type": "interac",
  "amount": 5000,
  "direction": "credit",
  "currency": "CAD",
  "originating_account_id": "<Internal Account ID>",
  "receiving_account": {
    "party_name": "Harry Potter",
    "contact_details": [
      {
        "contact_identifier": "1234567890",
        "contact_identifier_type": "phone_number"
      }
    ]
  }
}
```

<Callout icon="📘" theme="info">
  Note that unlike most other payments, Interac e-Transfer payments do not require the receiving account to have `account_details` or `routing_details`.
</Callout>

## Initiating a Global ACH Payment

### NEFT Credit (India)

The following request will initiate a Global ACH payment of ₹1000 from the originating internal account and send it to the following account representing an Indian external account with a IFSC code and account number.

```json
{
  "type": "cross_border",
  "subtype": "neft",
  "currency": "INR",
  "amount": 100000,
  "direction": "credit",
  "originating_account_id": "<Internal Account ID>",
  "receiving_account": {
    "party_name": "Harry Potter",
    "party_type": "individual",
    "party_address": {
      "line1": "Main Ave",
      "line2": "3RGJ+RVV",
      "locality": "Mumbai",
      "region": "Maharashtra",
      "postal_code": "400054",
      "country": "IN"
    },
    "routing_details": [{
        "routing_number": "BKID0002743",
        "routing_number_type": "in_ifsc"
    }],
    "account_details": [{
        "account_number": "123456789",
        "account_number_type": "other",
        "account_type": "non_resident"
    }]
  },
  "purpose": "P0123", 
}
```

### EFT Credit (Canada)

The following request will initiate a Global ACH payment of C$20 from the originating internal account and send it to the following account representing an Canadian external account with a CPA routing number and account number.

```json
{
  "type": "cross_border",
  "subtype": "eft",
  "currency": "cad",
  "amount": 2000,
  "direction": "credit",
  "description": "Internal description of a cross border payment",
  "originating_account_id": "<Internal Account ID>",
  "receiving_account": {
    "party_name": "Harry Potter",
    "party_type": "individual",
    "party_address": {
      "line1": "200 University Ave W",
      "locality": "Waterloo",
      "region": "Ontario",
      "postal_code": "N2L3G1",
      "country": "CA"
    },
    "routing_details": [{
        "routing_number": "027000012",
        "routing_number_type": "ca_cpa"
    }],
    "account_details": [{
        "account_number": "1234567890",
        "account_number_type": "other"
    }]
  },
  "purpose": "350", 
}
```

## Working with Line Items

Line items allow you to save a detailed breakdown of the individual amounts contained in a Payment Order. For Example, the following $10 transfer is actually composed of 2 individual $5 payments, each with their own description and/or metadata.

```json
{
  "type": "ach",
  "amount": 1000,
  "direction": "credit",
  "currency": "USD",
  "originating_account_id": "<Internal Account ID>",
  "receiving_account_id": "<External Account ID>",
  "line_items": [
    {
      "amount": 500,
      "description": "Payment #1",
      "metadata": {
        "Payment Type": "One time fee"
      }
    },
    {
      "amount": 500,
      "description": "Payment #2",
      "metadata": {
        "Payment Type": "Recurring Fee"
      }
    }
  ]
}
```

## Working with Ledger Transactions

The following request will atomically create a Ledger Transaction with the Payment Order. This is one of multiple ways that Payments and Ledgers can [interoperate](https://docs.moderntreasury.com/docs/linking-to-other-modern-treasury-objects).

```json
{
  "type": "ach",
  "amount": 1000,
  "direction": "credit",
  "currency": "USD",
  "originating_account_id": "<Internal Account ID>",
  "receiving_account_id": "<External Account ID>",
  "ledger_transaction": {
    "description": "Example description",
    "effective_at": "2023-03-03",
    "ledger_entries": [
      {
        "amount": 1000,
        "direction": "debit",
        "ledger_account_id": "<Ledger Account ID>"
      },
      {
        "amount": 1000,
        "direction": "credit",
        "ledger_account_id": "<Ledger Account ID>"
      }
    ]
  }
}
```

## Working with Metadata

Metadata are key/value pairs that can be assigned to a Payment Order. For example, the following $10 transfer is for a specific User that we have keep track of using the "User ID" metadata key.

```json
{
  "type": "ach",
  "amount": 1000,
  "direction": "credit",
  "currency": "USD",
  "originating_account_id": "<Internal Account ID>",
  "receiving_account_id": "<External Account ID>",
  "metadata": {
    "User ID": "123"
  }
}
```