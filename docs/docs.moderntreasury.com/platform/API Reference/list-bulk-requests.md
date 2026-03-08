# List Bulk Requests

Read a list of bulk requests

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
    "/bulk_requests": {
      "get": {
        "summary": "List Bulk Requests",
        "description": "Read a list of bulk requests",
        "operationId": "list-bulk-requests",
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
            "name": "status",
            "in": "query",
            "description": "Filter by the status of the bulk request",
            "schema": {
              "type": "string",
              "enum": [
                "pending",
                "processing",
                "completed"
              ]
            }
          },
          {
            "name": "resource_type",
            "in": "query",
            "description": "Filter by the resource_type of the bulk request",
            "schema": {
              "type": "string",
              "enum": [
                "payment_order",
                "expected_payment",
                "ledger_transaction",
                "transaction"
              ]
            }
          },
          {
            "name": "action_type",
            "in": "query",
            "description": "Filter by the action_type of the bulk request",
            "schema": {
              "type": "string",
              "enum": [
                "create",
                "update",
                "delete"
              ]
            }
          },
          {
            "name": "metadata",
            "in": "query",
            "description": "For example, if you want to query for records with metadata key Type and value Loan, the query would be metadata%5BType%5D=Loan. This encodes the query parameters.",
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