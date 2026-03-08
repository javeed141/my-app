# List Returns

Get a list of returns

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
    "/returns": {
      "get": {
        "summary": "List Returns",
        "description": "Get a list of returns",
        "operationId": "list-returns",
        "parameters": [
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
            "name": "internal_account_id",
            "in": "query",
            "description": "Specify `internal_account_id` if you wish to see returns to/from a specific account.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "counterparty_id",
            "in": "query",
            "description": "Specify `counterparty_id` if you wish to see returns that occurred with a specific counterparty",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "returnable_id",
            "in": "query",
            "description": "The ID of a valid returnable. Must be accompanied by `returnable_type`",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "returnable_type",
            "in": "query",
            "description": "One of  `payment_order` ,  `paper_item` or `incoming_payment_detail`. Must be accompanied by `returnable_id`.",
            "schema": {
              "type": "string"
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
            "name": "type",
            "in": "query",
            "schema": {
              "type": "string"
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