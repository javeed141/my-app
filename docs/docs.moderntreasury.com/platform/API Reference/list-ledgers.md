# List Ledgers

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
    "/ledgers": {
      "get": {
        "summary": "List Ledgers",
        "description": "",
        "operationId": "list-ledgers",
        "parameters": [
          {
            "name": "id[]",
            "in": "query",
            "description": "If you have specific IDs to retrieve in bulk, you can pass them as query parameters delimited with `id[]=`, for example `?id[]=123&id[]=abc`.",
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          {
            "name": "metadata",
            "in": "query",
            "description": "For example, if you want to query for ledgers with metadata key `Type` and value `Loan`, the query would be `metadata%5BType%5D=Loan`. This encodes the query parameters.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "updated_at",
            "in": "query",
            "description": "Use \"gt\" (>), \"gte\" (>=), \"'lt\" (<), \"lte\" (<=), or \"eq\" (=) to filter by the posted at timestamp. For example, for all times after Jan 1 2000 12:00 UTC, use `updated_at%5Bgt%5D=2000-01-01T12:00:00Z`.",
            "schema": {
              "type": "string",
              "format": "date-time"
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
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "[\n  {\n    \"id\": \"641e15b7-a326-44b1-9ed2-536cd327101b\",\n    \"object\": \"ledger\",\n    \"live_mode\": false,\n    \"name\": \"Business Ledger\",\n    \"description\": null,\n    \"metadata\": {},\n    \"discarded_at\": null,\n    \"created_at\": \"2022-11-01T20:50:56Z\",\n    \"updated_at\": \"2022-11-01T20:50:56Z\"\n  },\n  {\n    \"id\": \"bd3a6a69-0070-4e65-9b45-dbd159f531da\",\n    \"object\": \"ledger\",\n    \"live_mode\": false,\n    \"name\": \"Customer Ledger\",\n    \"description\": \"\",\n    \"metadata\": {},\n    \"discarded_at\": null,\n    \"created_at\": \"2022-10-14T05:57:39Z\",\n    \"updated_at\": \"2022-10-14T05:57:39Z\"\n  }\n]"
                  }
                },
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "string",
                        "example": "641e15b7-a326-44b1-9ed2-536cd327101b"
                      },
                      "object": {
                        "type": "string",
                        "example": "ledger"
                      },
                      "live_mode": {
                        "type": "boolean",
                        "example": false,
                        "default": true
                      },
                      "name": {
                        "type": "string",
                        "example": "Business Ledger"
                      },
                      "description": {},
                      "metadata": {
                        "type": "object",
                        "properties": {}
                      },
                      "discarded_at": {},
                      "created_at": {
                        "type": "string",
                        "example": "2022-11-01T20:50:56Z"
                      },
                      "updated_at": {
                        "type": "string",
                        "example": "2022-11-01T20:50:56Z"
                      }
                    }
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