# List Journal Entries

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
    "/journal_entries": {
      "get": {
        "description": "",
        "operationId": "get_journal_entries",
        "responses": {
          "200": {
            "description": ""
          }
        },
        "parameters": [
          {
            "in": "query",
            "name": "id",
            "schema": {
              "type": "string"
            }
          },
          {
            "in": "query",
            "name": "memo",
            "schema": {
              "type": "string"
            }
          },
          {
            "in": "query",
            "name": "date",
            "schema": {
              "type": "string",
              "format": "date"
            }
          },
          {
            "in": "query",
            "name": "created_at",
            "schema": {
              "type": "string"
            },
            "description": "Use \"gt\" (>), \"gte\" (>=), \"'lt\" (<), \"lte\" (<=), or \"eq\" (=) to filter by the created at timestamp. For example, for all times after Jan 1 2000 12:00 UTC, use created_at%5Bgt%5D=2000-01-01T12:00:00Z."
          },
          {
            "in": "query",
            "name": "after_cursor",
            "schema": {
              "type": "string"
            }
          },
          {
            "in": "query",
            "name": "per_page",
            "schema": {
              "type": "integer",
              "default": "25",
              "format": "int32"
            }
          }
        ]
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