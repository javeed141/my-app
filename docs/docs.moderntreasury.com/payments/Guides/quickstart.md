# Payments Quickstart

This guide demonstrates how to use Modern Treasury's API to open an account and create your first payment.

# 1. Retrieve your API Key

Once you have access to Modern Treasury, log in and go to your [API Keys page](https://app.moderntreasury.com/developers/api_keys). There you will find your Organization ID and API keys.

Authentication with the Modern Treasury API is done by using [HTTP Basic authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication), with your Organization ID as the username and the API Key as the password. When using curl, you can use the `-u` option to pass these values directly.

If using one of our [server side SDKs](https://docs.moderntreasury.com/platform/docs/sdks-libraries#/), you can either pass these values in directly, or the library will pull from defined environment variables.

Start with a simple ping request to test your credentials:

```curl cURL
curl --user $ORGANIZATION_ID:$API_KEY https://app.moderntreasury.com/api/ping
```

```python
from modern_treasury import ModernTreasury

modern_treasury = ModernTreasury(
  # defaults to os.environ.get("MODERN_TREASURY_API_KEY")
  api_key="your-api-key",
  organization_id="your-organization-id",
)

pong = modern_treasury.ping()
print(pong)
```

```typescript
import ModernTreasury from 'modern-treasury';

const modernTreasury = new ModernTreasury({
  apiKey: 'your-api-key', // defaults to process.env["MODERN_TREASURY_API_KEY"]
  organizationId: 'your-organization-id',
});

async function main() {
  const pong = await modernTreasury.ping()
  console.log(pong);
}

main().catch(console.error);
```

# 2. Open an Account

In order to move money with Modern Treasury you must open an Internal Account linked to the entity that is operating the account and on whose behalf the funds are held. Refer to our [guide on opening accounts](https://docs.moderntreasury.com/payments/docs/open-accounts) for detailed instructions over onboarding users and opening accounts. See below for instructions on creating the required Legal Entity and opening your first account.

## Create a Legal Entity

The first step to opening an account is to create a [Legal Entity](https://docs.moderntreasury.com/payments/reference/legal-entities) representing the business or individual that is tied to the account. For a business, the following call will create a Legal Entity with Modern Treasury and submit the entity for review:

```curl
curl https://app.moderntreasury.com/api/legal_entities \
  --header 'content-type: application/json' \
  --user $ORGANIZATION_ID:$API_KEY \
  --data '{
    "legal_entity_type": "business",
    "date_formed": "1800-01-01",
    "business_name": "Hogwarts",
    "legal_structure": "corporation",
    "phone_numbers": [
      {
        "phone_number": "+14185438090"
      }
    ],
    "email": "hogwarts@wizardy.com",
    "website": "http://www.hogwarts.com",
    "intended_use": "Payment operations and treasury management",
    "expected_activity_volume": 1000000000,
    "country_of_incorporation": "US",
    "operating_jurisdictions": [
        "US"
    ],
    "wealth_and_employment_details":
    {
        "source_of_funds": "business_revenue"
    },
    "documents":[
      {
        "document_type": "articles_of_incorporation",
        "file_data": "dGVzdA==\n",
        "filename": "articles_of_incorporation.pdf"
      },
      {
        "document_type": "proof_of_address",
        "file_data": "dGVzdA==\n",
        "filename": "proof_of_address.pdf"
      }
    ],
    "addresses": [
      {
        "primary": true,
        "line1": "119 5th Ave",
        "line2": "Suite 600",
        "locality": "New York",
        "region": "NY",
        "postal_code": "10011",
        "country": "US",
        "address_types": ["residential"]
      }
    ],
    "identifications": [
      {
        "id_type": "us_ein",
        "issuing_country": "US",
        "id_number": "123456789",
        "documents": []
      }
      ],
      "legal_entity_associations": [{
          "relationship_types": ["control_person"],
          "child_legal_entity": {
            "legal_entity_type": "individual",
            "first_name": "Harry",
            "middle_name": "James",
            "last_name": "Potter",
            "date_of_birth": "1990-02-06",
            "email": "harry.potter@hogwarts.com",
            "phone_numbers": [
                { "phone_number": "+14185438090"}
                ],
            "addresses": [
            {
                "line1": "119 5th Ave",
                "line2": "Suite 600",
                "locality": "New York",
                "region": "NY",
                "postal_code": "10003",
                "country": "US",
                "address_types": ["residential"],
                "primary": true
            }
            ],
            "identifications": [
            {
                "id_number": "111111111",
                "id_type": "passport",
                "issuing_country": "US",
                "documents": [
                {
                    "document_type": "identification_front",
                    "file_data": "dGVzdA==\n",
                    "filename": "passport.pdf"
                  }
                  ]
            },
            {
                "id_number": "111222334",
                "id_type": "us_ssn",
                "issuing_country": "US"
            }]}},
            {
            "relationship_types": ["beneficial_owner"],
            "child_legal_entity": {
            "legal_entity_type": "individual",
            "first_name": "Albus",
            "middle_name": "Percival",
            "last_name": "Dumbledore",
            "date_of_birth": "1881-07-01",
            "email": "dumbledore@hogwarts.com",
            "phone_numbers": [
                { "phone_number": "+14185438090"}
                ],
            "addresses": [
            {
                "line1": "119 5th Ave",
                "line2": "Suite 600",
                "locality": "New York",
                "region": "NY",
                "postal_code": "10003",
                "country": "US",
                "address_types": ["residential"],
                "primary": true
            }
            ],
            "identifications": [
            {
                "id_number": "111222333",
                "id_type": "us_ssn",
                "issuing_country": "US"
            },
            {
                "id_number": "DL123456789",
                "id_type": "drivers_license",
                "issuing_country": "US",
                "documents":[
                {
                    "document_type": "identification_front",
                    "file_data": "dGVzdA==\n",
                    "filename": "license_front.pdf"
                },
                {
                    "document_type": "identification_back",
                    "file_data": "dGVzdA==\n",
                    "filename": "license_back.pdf"
                }
                ]  
            }
          ]
        }
      }
    ]
  }'
```

In response, you will receive the following information (note that the above request creates a `child_legal_entity` as well - you only need to grab the `id` for the `business` legal entity):

```json
{
  "id": "<Legal Entity ID>",
  "object": "legal_entity",
  "legal_entity_type":"business",
  "status": "pending"
}
```

In the Sandbox environment, Legal Entities will automatically transition to `"status": "active"`, signaling that the Legal Entity has been approved and can be used to open an Internal Account. In Production, this state transition will occur after Modern Treasury has completed KYC/KYB verification on the entity. Refer to our detailed onboarding guides for more information on [monitoring legal entity status](https://docs.moderntreasury.com/payments/docs/onboard-a-business#monitor-the-legal-entitys-status).

## Create an Internal Account

After the Legal Entity has been activated, you can open an Internal Account for the given entity. The below request will open a USD account:

```curl
curl https://app.moderntreasury.com/api/internal_accounts \
  --header 'content-type: application/json' \
  --user $ORGANIZATION_ID:$API_KEY \
  --data '{
    "currency": "USD",
    "legal_entity_id": "<Legal Entity ID>"
  }'
```

In response, you will receive the following information:

```json
{
  "id": "<Internal Account ID>",
  "object": "internal_account",
  "routing_details": [
    {
      "routing_number_type": "aba",
      "routing_number": "021214891"
    }
  ],
  "account_details": [
    {
      "account_number": "<Unique Account Number>"
    }
  ]
}
```

# 3. Create a Counterparty

Now that the account has been opened, you may fund the account with an ACH Debit Payment Order. In order to initiate the payment, you must first create a Counterparty with corresponding account details:

```curl
curl https://app.moderntreasury.com/api/counterparties \
  --header 'content-type: application/json' \
  --user $ORGANIZATION_ID:$API_KEY \
  --data '{
    "legal_entity_id": $legal_entity_id,
    "accounts": [
      {
        "account_type": "checking",
        "routing_details": [
          {
            "routing_number_type": "aba",
            "routing_number": "121141822"
          }
        ],
        "account_details": [
          {
            "account_number": "123456789"
          }
        ]
      }
    ]
  }'
```

In response you will receive the following information:

```json
{
  "id": "<Counterparty ID>",
  "object": "counterparty",
  "accounts": [
    {
      "id": "<External Account ID>",
      "object": "external_account"
    }
  ]
}
```

# 4. Fund the Account

Now that all necessary objects have been created, you are able to execute your first ACH Debit to fund the account. You will create a Payment Order. Note that amounts are given in the smallest unit of the currency, so for $100.00, the `amount` field would be `10000`.

```curl
curl https://app.moderntreasury.com/api/payment_orders \
  --header 'content-type: application/json' \
  --user $ORGANIZATION_ID:$API_KEY \
  --data '{
    "type": "ach",
    "amount": 10000,
    "direction": "debit",
    "currency": "USD",
    "originating_account_id": "<Internal Account ID>",
    "receiving_account_id": "<External Account ID>"
  }'
```

In response you will get the following information:

```json
{
  "id": "<Payment Order ID>",
  "object": "payment_order",
  "status": "approved"
}
```

In the Sandbox, payment orders will complete quickly. You can subscribe to [webhooks](https://docs.moderntreasury.com/platform/reference/payment-orders) to receive [status](https://docs.moderntreasury.com/platform/reference/payment-order-object#payment-order-statuses) changes such as the following:

```json
{
  "event": "completed",
  "data": {
    "id": "<Payment Order ID>",
    "object": "payment_order",
    "status": "completed"
  }
}
```

When the payment order has reached a `completed` state, your account has been successfully funded. You will now be able to [originate](https://docs.moderntreasury.com/payments/docs/making-payments) outbound payments. Note that this can take up to 5 minutes for an ACH payment in the Sandbox.