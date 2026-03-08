# List Internal Accounts

Get a list of all internal accounts

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
    "/internal_accounts": {
      "get": {
        "summary": "List Internal Accounts",
        "description": "Get a list of all internal accounts",
        "operationId": "list-internal-accounts",
        "parameters": [
          {
            "name": "currency",
            "in": "query",
            "description": "The currency associated with the internal account.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "payment_type",
            "in": "query",
            "description": "The type of payment that can be made by the internal account.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "payment_direction",
            "in": "query",
            "description": "The direction of payments that can be made by internal account.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "after_cursor",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "per_page",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 25
            }
          },
          {
            "name": "metadata",
            "in": "query",
            "description": "For example, if you want to query for records with metadata key `Type` and value `Loan`, the query would be `metadata%5BType%5D=Loan`. This encodes the query parameters.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "counterparty_id",
            "in": "query",
            "description": "The counterparty that the internal account belongs to.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "legal_entity_id",
            "in": "query",
            "description": "Only return internal accounts associated with this legal entity.",
            "schema": {
              "type": "string"
            }
          },
          {
            "in": "query",
            "name": "status",
            "schema": {
              "type": "string",
              "enum": [
                "active",
                "closed",
                "pending_closure",
                "pending_activation",
                "suspended"
              ],
              "default": "active"
            }
          }
        ],
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