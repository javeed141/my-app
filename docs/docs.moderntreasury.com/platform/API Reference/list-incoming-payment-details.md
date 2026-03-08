# List Incoming Payment Details

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
    "/incoming_payment_details": {
      "get": {
        "summary": "List Incoming Payment Details",
        "description": "",
        "operationId": "list-incoming-payment-details",
        "parameters": [
          {
            "name": "direction",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "status",
            "in": "query",
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
          },
          {
            "name": "as_of_date_start",
            "in": "query",
            "description": "Filters incoming payment details with a `as_of_date` starting on or after the specified date (YYYY-MM-DD).",
            "schema": {
              "type": "string",
              "format": "date"
            }
          },
          {
            "name": "as_of_date_end",
            "in": "query",
            "description": "Filters incoming payment details with a `as_of_date` starting on or before the specified date (YYYY-MM-DD).",
            "schema": {
              "type": "string",
              "format": "date"
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
            "name": "virtual_account_id",
            "in": "query",
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