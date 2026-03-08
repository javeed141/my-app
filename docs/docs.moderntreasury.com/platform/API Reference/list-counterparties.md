# List Counterparties

Get a paginated list of all counterparties.

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
    "/counterparties": {
      "get": {
        "summary": "List Counterparties",
        "description": "Get a paginated list of all counterparties.",
        "operationId": "list-counterparties",
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
            "name": "name",
            "in": "query",
            "description": "Performs a partial string match of the name field. This is also case insensitive",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "email",
            "in": "query",
            "description": "Performs a partial string match of the email field. This is also case insensitive",
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
            "name": "created_at_lower_bound",
            "in": "query",
            "description": "Used to return counterparties created after some datetime",
            "schema": {
              "type": "string",
              "format": "date-time"
            }
          },
          {
            "name": "created_at_upper_bound",
            "in": "query",
            "description": "Used to return counterparties created before some datetime",
            "schema": {
              "type": "string",
              "format": "date-time"
            }
          },
          {
            "name": "legal_entity_id",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "external_id",
            "in": "query",
            "description": "An optional user-defined 180 character unique identifier",
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