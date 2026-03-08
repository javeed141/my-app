# Create a Counterparty

This guide will walk you through how to create a counterparty via API. You can also create counterparties manually in our dashboard [here](https://app.moderntreasury.com/counterparties).

# Pre-Requisites

**Organization ID:** and **API Key**: Found in your [developer settings](https://app.moderntreasury.com/developers/api_keys).

# 1. Collect Counterparty details

You may already have the Counterparty details, having collected them perhaps in your own UI or other means. Once these details are collected, you will create a Counterparty using the API.

# 2. Create Counterparty

## Creating a Counterparty without an account

If you do not know your Counterparty's account information, you can still create a Counterparty record and add an account later.

```json Create Counterparty Request
{
  "name": "Kenner, Bach & Ledeen",
  "email": "kbl@example.com"
}
```

```c Create Counterparty Response
{
  "id": "74a11899-d0fc-42d2-8a53-0c382d1ec74b",
  "object": "counterparty",
  "live_mode": false,
  "name": "Kenner, Bach & Ledeen",
  "email": "kbl@example.com",
  "send_remittance_advice": false,
  "verification_status": "unverified",
  "legal_entity_id": null,
  "metadata": {},
  "accounts": [],
  "discarded_at": null,
  "created_at": "2024-04-25T23:59:44Z",
  "updated_at": "2024-04-25T23:59:44Z"
}
```

## Creating a Counterparty with an account

The following request will create a Counterparty with just a name and a single account.

```json Create Counterparty Request
{
  "name": "Kenner, Bach & Ledeen",
  "accounts": [
    {
      "account_details": [
        {
          "account_number": "123456789"
        }
      ],
      "routing_details": [
        {
          "routing_number": "026009593",
          "routing_number_type": "aba"
        }
      ]
    }
  ]
}
```

```c Create Counterparty Response
{
  "id": "37ab9632-642b-40cc-8771-80b38b8ede83",
  "object": "counterparty",
  "live_mode": false,
  "name": "Kenner, Bach & Ledeen",
  "email": null,
  "send_remittance_advice": false,
  "verification_status": "unverified",
  "legal_entity_id": null,
  "metadata": {},
  "accounts": [
    {
      "id": "b99b3d43-a431-4f2f-838f-92d6b289fdfa",
      "object": "external_account",
      "live_mode": false,
      "account_type": "other",
      "party_name": "Kenner, Bach & Ledeen",
      "party_type": null,
      "party_address": null,
      "account_details": [
        {
          "id": "3ca53c69-e06d-4a6a-818a-0c680744dd3f",
          "object": "account_detail",
          "live_mode": false,
          "account_number": "123456789",
          "account_number_safe": "6789",
          "account_number_type": "other",
          "discarded_at": null,
          "created_at": "2024-04-26T00:11:02Z",
          "updated_at": "2024-04-26T00:11:02Z"
        }
      ],
      "routing_details": [
        {
          "id": "32e17572-cb4a-49d0-8631-c6542fcc203a",
          "object": "routing_detail",
          "live_mode": false,
          "payment_type": null,
          "routing_number": "026009593",
          "routing_number_type": "aba",
          "bank_name": "Bank of America National Association",
          "bank_address": {
            "id": "882bb03d-dd51-4a97-92cc-032d7326e3f8",
            "object": "address",
            "live_mode": false,
            "line1": "115 W 42nd St",
            "line2": "One Bryant Park",
            "locality": "New York",
            "region": "NY",
            "postal_code": "10036",
            "country": "US",
            "created_at": "2024-04-26T00:11:02Z",
            "updated_at": "2024-04-26T00:11:02Z"
          },
          "discarded_at": null,
          "created_at": "2024-04-26T00:11:02Z",
          "updated_at": "2024-04-26T00:11:02Z"
        }
      ],
      "name": null,
      "metadata": {},
      "verification_status": "unverified",
      "contact_details": [],
      "ledger_account_id": null,
      "discarded_at": null,
      "created_at": "2024-04-26T00:11:02Z",
      "updated_at": "2024-04-26T00:11:02Z"
    }
  ],
  "discarded_at": null,
  "created_at": "2024-04-26T00:11:02Z",
  "updated_at": "2024-04-26T00:11:02Z"
}
```

```Text Create Counterparty Request [Stablecoin]
{
 "name": "Acme Fireblocks Wallet",
 "accounts": [
        {
            "account_details": [
                {
                "account_number": "0x9bE868839163E128971Bb6AE045e172Fa806E805",
                "account_number_type": "ethereum_address"
                }
            ]
        }
    ]
}
```

```Text Create Counterparty Response [Stablecoin]
{
    "id": "fb9d6c24-da0b-4b43-81ef-e84440d928c0",
    "object": "counterparty",
    "live_mode": true,
    "name": "Acme Fireblocks Wallet",
    "email": null,
    "send_remittance_advice": false,
    "verification_status": "verified",
    "external_id": null,
    "legal_entity_id": null,
    "metadata": {},
    "accounts": [
        {
            "id": "dca61c52-f215-4449-bba8-b7b1efc3c5a4",
            "object": "external_account",
            "live_mode": true,
            "account_type": "other",
            "party_name": "Acme Fireblocks Wallet",
            "party_type": null,
            "party_address": null,
            "account_details": [
                {
                    "id": "ba9eb4d1-2423-4c05-a65b-e69ad78fe489",
                    "object": "account_detail",
                    "live_mode": true,
                    "account_number": "0x9bE868839163E128971Bb6AE045e172Fa806E805",
                    "account_number_safe": "E805",
                    "account_number_type": "ethereum_address",
                    "discarded_at": null,
                    "created_at": "2026-01-22T00:30:18Z",
                    "updated_at": "2026-01-22T00:30:18Z"
                }
            ],
            "routing_details": [],
            "name": null,
            "metadata": {},
            "verification_status": "unverified",
            "verification_source": null,
            "external_id": null,
            "contact_details": [],
            "ledger_account_id": null,
            "discarded_at": null,
            "created_at": "2026-01-22T00:30:18Z",
            "updated_at": "2026-01-22T00:30:18Z"
        }
    ],
    "discarded_at": null,
    "created_at": "2026-01-22T00:30:18Z",
    "updated_at": "2026-01-22T00:30:18Z"
}
```

For more examples, see the section on [Counterparty Example Requests](/platform/reference/create-counterparty-examples) .

<br />