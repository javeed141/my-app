# Create Contact Details

Create an account detail for an external account

> 🚧 Country codes
>
> When creating a `phone_number` contact detail, ensure you include the country calling code as a prefix to the phone number.

# OpenAPI definition

```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "modern-treasury-api",
    "version": "1.0"
  },
  "servers": [
    {
      "url": "https://app.moderntreasury.com/api"
    }
  ],
  "components": {
    "securitySchemes": {
      "sec0": {
        "type": "http",
        "scheme": "basic"
      }
    }
  },
  "security": [
    {
      "sec0": []
    }
  ],
  "paths": {
    "/external_accounts/{external_account_id}/contact_details": {
      "post": {
        "summary": "Create Contact Details",
        "description": "Create an account detail for an external account",
        "operationId": "create-contact-details",
        "parameters": [
          {
            "name": "external_account_id",
            "in": "path",
            "description": "The ID of the external account.",
            "schema": {
              "type": "string"
            },
            "required": true
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "contact_identifier",
                  "contact_identifier_type"
                ],
                "properties": {
                  "contact_identifier": {
                    "type": "string",
                    "description": "The actual contact information."
                  },
                  "contact_identifier_type": {
                    "type": "string",
                    "description": "See available types at [Contact Details](https://docs.moderntreasury.com/platform/reference/contact-detail-object)"
                  }
                }
              }
            }
          }
        },
        "deprecated": false
      }
    }
  },
  "x-readme": {
    "headers": [],
    "explorer-enabled": true,
    "proxy-enabled": true
  },
  "x-readme-fauxas": true
}
```