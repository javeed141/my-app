# Create Routing Detail

Create a routing detail for a single external account

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
    "/external_accounts/{external_account_id}/routing_details": {
      "post": {
        "summary": "Create Routing Detail",
        "description": "Create a routing detail for a single external account",
        "operationId": "create-routing-detail",
        "parameters": [
          {
            "name": "external_account_id",
            "in": "path",
            "description": "The ID for the external account.",
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
                  "routing_number",
                  "routing_number_type"
                ],
                "properties": {
                  "routing_number": {
                    "type": "string"
                  },
                  "routing_number_type": {
                    "type": "string"
                  },
                  "payment_type": {
                    "type": "string"
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