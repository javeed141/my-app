# List Bulk Results

Read a list of bulk results

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
    "/bulk_results": {
      "get": {
        "summary": "List Bulk Results",
        "description": "Read a list of bulk results",
        "operationId": "list-bulk-results",
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
              "type": "string",
              "default": "25"
            }
          },
          {
            "name": "status",
            "in": "query",
            "description": "Filter by the status of the bulk result",
            "schema": {
              "type": "string",
              "enum": [
                "successful",
                "failed"
              ]
            }
          },
          {
            "name": "request_id",
            "in": "query",
            "description": "Filter by the ID of the request that created the bulk result",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "request_type",
            "in": "query",
            "description": "Filter by the type of request that created the bulk result",
            "schema": {
              "type": "string",
              "enum": [
                "bulk_request"
              ]
            }
          },
          {
            "name": "entity_id",
            "in": "query",
            "description": "Filter by the ID of the result entity for the bulk result",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "entity_type",
            "in": "query",
            "description": "Filter by the type of the result entity of the bulk result",
            "schema": {
              "type": "string",
              "enum": [
                "payment_order",
                "expected_payment",
                "ledger_transaction",
                "transaction",
                "bulk_error"
              ]
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