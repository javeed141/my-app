# List External Accounts

Get a list of all external accounts

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
    "/external_accounts": {
      "get": {
        "summary": "List External Accounts",
        "description": "Get a list of all external accounts",
        "operationId": "list-external-accounts",
        "parameters": [
          {
            "name": "party_name",
            "in": "query",
            "description": "Searches the ExternalAccount's `party_name` AND the Counterparty's `party_name`",
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
          },
          {
            "name": "counterparty_id",
            "in": "query",
            "description": "`Counterparty` id",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "metadata",
            "in": "query",
            "description": "Metadata key/values to search for. Keys and values must be `string`s.",
            "schema": {
              "properties": {},
              "type": "object"
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