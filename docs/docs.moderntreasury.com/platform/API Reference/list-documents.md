# List Documents

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
    "/documents": {
      "get": {
        "summary": "List Documents",
        "description": "",
        "operationId": "list-documents",
        "parameters": [
          {
            "name": "source",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "documentable_id",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "documentable_type",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "document_type",
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