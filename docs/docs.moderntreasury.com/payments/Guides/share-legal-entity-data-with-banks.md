# Sharing Legal Entity Data with Banks

Send Legal Entity information to banks for KYC / KYB

You can share data about Legal Entities with banks. Today, Modern Treasury supports creating Legal Entities at Cross River, Column, and Increase. In the future, additional banking partners will be added.

**Note: This is not supported in our sandbox environment**

# Get a Connection ID

First, you will need to get the ID of a bank [Connection](https://docs.moderntreasury.com/payments/reference/connections). You can do this by using the List Connections API and filtering for a specific entity.

```curl Cross River Request
curl --request GET \
  -u ORG_ID:API_KEY \
  --url 'https://app.moderntreasury.com/api/connections?entity=cross_river' \
  -H 'Content-Type: application/json' \
```

```curl Column Request
curl --request GET \
  -u ORG_ID:API_KEY \
  --url 'https://app.moderntreasury.com/api/connections?entity=column' \
  -H 'Content-Type: application/json' \
```

The response will contain an array, with each item having an ID.

```json Cross River Response
[
  {
    "id": "73140ffe-fbde-4514-b985-f96c0e336192",
    "object": "connection",
    "live_mode": true,
    "vendor_id": "cross_river",
    "vendor_name": "Cross River",
    "vendor_customer_id": null,
    "discarded_at": null,
    "created_at": "2023-08-18T18:49:40Z",
    "updated_at": "2023-11-21T23:20:29Z"
  }
]
```

```Text Column Response
[
  {
    "id": "73140ffe-fbde-4514-b985-f96c0e336192",
    "object": "connection",
    "live_mode": true,
    "vendor_id": "column",
    "vendor_name": "Column",
    "vendor_customer_id": null,
    "discarded_at": null,
    "created_at": "2023-08-18T18:49:40Z",
    "updated_at": "2023-11-21T23:20:29Z"
  }
]
```

Alternatively, an Administrator can find a list of Connections in the web application in the Connections section of [Settings](https://app.moderntreasury.com/settings/organization?section=Connections).

# Create a Connection Legal Entity

Create a Connection Legal Entity with the Connection ID. You also need information about a Legal Entity. You can use the ID of a Legal Entity, which you receive when you [create a Legal Entity](https://docs.moderntreasury.com/payments/docs/create-a-legal-entity). Alternatively, you can create a Legal Entity inline.

```curl Request with Legal Entity ID
curl --request POST \
  -u ORG_ID:API_KEY \
  --url https://app.moderntreasury.com/api/connection_legal_entities \
  -H 'content-type: application/json' \
  -d '{
    "connection_id": "73140ffe-fbde-4514-b985-f96c0e336192",
    "legal_entity_id": "5d95643d-1127-4a7c-9ef5-ad21a1d007c6"
  }'
```

```curl Request with Individual Legal Entity inline
curl --request POST \
		 -u ORG_ID:API_KEY \
     --url https://app.moderntreasury.com/api/connection_legal_entities \
     -H 'content-type: application/json' \
     -d '{
      "connection_id": "73140ffe-fbde-4514-b985-f96c0e336192",
      "legal_entity": {
        "legal_entity_type": "individual",
        "first_name": "John",
        "last_name": "Smith",
        "date_of_birth": "1980-01-01",
        "addresses": [
          {
            "primary": true,
            "line1": "77 Geary St",
            "locality": "San Francisco",
            "region": "CA",
            "postal_code": "94110",
            "country": "US",
            "address_types": ["residential"]
          }
        ],
        "identifications": [
          {
            "id_type": "us_ssn",
            "id_number": "123456789",
            "issuing_country": "US"
          }
        ]
      }
    }'
```

```curl Request with Business Legal Entity inline
curl --request POST \
		 -u ORG_ID:API_KEY \
     --url https://app.moderntreasury.com/api/connection_legal_entities \
     -H 'content-type: application/json' \
     -d '{
      "connection_id": "73140ffe-fbde-4514-b985-f96c0e336192",
      "legal_entity": {
          "legal_entity_type": "business",
          "date_formed": "2000-01-01",
          "business_name": "Business Name",
          "doing_business_as_names": [
            "Doing Business As Name"
          ],
          "legal_structure": "corporation",
          "phone_numbers": [
            {
              "phone_number": "+11111111111"
            }
          ],
          "email": "example@business.com",
          "website": "http://www.example.com",
          "addresses": [
            {
              "primary": true,
              "line1": "119 5th Ave",
              "line2": "Suite 600",
              "locality": "New York",
              "region": "NY",
              "postal_code": "10011",
              "country": "US"
            }
          ],
          "identifications": [
            {
              "id_type": "us_ein",
              "issuing_country": "US",
              "id_number": "123456789"
            }
          ],
          "legal_entity_associations": [
            {
              "relationship_types": [
                  "beneficial_owner"
              ],
              "child_legal_entity": {
                "legal_entity_type": "individual",
                "first_name": "John",
                "last_name": "Smith",
                "date_of_birth": "1980-01-01",
                "phone_numbers": [
                  {
                    "phone_number": "+11111111111"
                  }
                ],
                "email": "john@business.com",
                "addresses": [
                  {
                    "primary": true,
                    "line1": "119 5th Ave",
                    "line2": "Suite 600",
                    "locality": "New York",
                    "region": "NY",
                    "postal_code": "10011",
                    "country": "US"
                  }
                ],
                "identifications": [
                  {
                    "id_number": "123456789",
                    "id_type": "us_ssn",
                    "issuing_country": "US"
                  }
                ]
              },
              "title": "CEO",
              "ownership_percentage": 25
            }
          ]
        }
      }'
```

Modern Treasury will synchronously create a Legal Entity at the bank and return a response.

```json Response
{
  "id": "8425ab9c-725f-4ef1-8102-a582926e753b",
  "object": "connection_legal_entity",
  "live_mode": true,
  "status": "completed",
  "legal_entity_id": "6a33a4df-48ee-4a44-9ebf-66f00c6a2333",
  "connection_id": "8abeaf42-2159-413d-99e9-1e7bf059bc71",
  "vendor_id": "775608ac-1035-429a-923a-dd57f8202517",
  "discarded_at": null,
  "created_at": "2024-02-05T17:42:33Z",
  "updated_at": "2024-02-05T17:42:33Z"
}
```

You can monitor the status field to see if the request is processing, completed, denied, or failed. In the future, Modern Treasury will look to support passing back more information from the bank. For example, a bank may put an entity in review and ask for additional documentation, or Modern Treasury can return information about the entity created at the bank.

Today, Modern Treasury currently only supports the creation of a Legal Entity at a bank. In the future, Modern Treasury will support updates. This is important, for example, if an individual entity changes address, or if a business entity has beneficial owner changes.

For more details about supported functionality at various banks, see the guides linked below.