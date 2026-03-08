# List Expected Payments

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
    "/expected_payments": {
      "get": {
        "parameters": [
          {
            "name": "after_cursor",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "in": "query",
            "name": "per_page",
            "schema": {
              "type": "integer",
              "default": 25,
              "format": "int32"
            }
          },
          {
            "schema": {
              "type": "string"
            },
            "name": "status",
            "in": "query",
            "description": "One of `unreconciled`, `reconciled`, or `archived`."
          },
          {
            "name": "internal_account_id",
            "in": "query",
            "schema": {
              "type": "string"
            },
            "description": "Specify `internal_account_id` to see expected_payments for a specific account."
          },
          {
            "name": "direction",
            "in": "query",
            "schema": {
              "type": "string"
            },
            "description": "One of `credit`, `debit`"
          },
          {
            "schema": {
              "type": "string"
            },
            "description": "One of the Payment Types from [Payment Orders](https://docs.moderntreasury.com/platform/reference/payment-order-object)",
            "in": "query",
            "name": "type"
          },
          {
            "description": "Specify `counterparty_id` to see expected_payments for a specific account.",
            "in": "query",
            "name": "counterparty_id",
            "schema": {
              "type": "string"
            }
          },
          {
            "description": "Specify `external_id` to see expected_payments matching a specific identifier.",
            "name": "external_id",
            "schema": {
              "type": "string"
            },
            "in": "query"
          },
          {
            "in": "query",
            "name": "amount",
            "schema": {
              "type": "integer",
              "format": "int32"
            },
            "description": "Specify an `amount` to see expected_payments whose upper and lower bounds contain the value.\n\nYou can also use `gte` (>=), `lte` (<=) or `eq` (=) to filter by amount. For example, to see expected_payments whose bounds include amounts greater than or equal to $100, use amount%5Bgte%5D=10000.",
            "required": false
          },
          {
            "in": "query",
            "name": "metadata",
            "description": "For example, if you want to query for records with metadata key `Type` and value `Loan`, the query would be `metadata%5BType%5D=Loan`. This encodes the query parameters.",
            "schema": {
              "type": "string"
            }
          },
          {
            "description": "Filter expected payments created after the timestamp",
            "in": "query",
            "schema": {
              "type": "string",
              "format": "date-time"
            },
            "name": "created_at_lower_bound"
          },
          {
            "in": "query",
            "schema": {
              "type": "string",
              "format": "date-time"
            },
            "name": "created_at_upper_bound",
            "description": "Filter expected payments created before the timestamp"
          },
          {
            "description": "Filter expected payments was last updated after the timestamp",
            "in": "query",
            "name": "updated_at_lower_bound",
            "schema": {
              "type": "string",
              "format": "date-time"
            }
          },
          {
            "name": "updated_at_upper_bound",
            "schema": {
              "format": "date-time",
              "type": "string"
            },
            "description": "Filter expected payments was last updated before the timestamp",
            "in": "query"
          },
          {
            "description": "Use gt (>), gte (>=), lt (<), lte (<=), or eq (=) to filter by entity_link_count. For example, for entity_link_count greater than 3, use entity_link_count%5Bgt%5D=3.",
            "schema": {
              "type": "string"
            },
            "name": "entity_link_count",
            "in": "query"
          }
        ],
        "summary": "List Expected Payments",
        "operationId": "list-expected-payments",
        "description": "",
        "responses": {
          "200": {
            "description": "OK"
          }
        }
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