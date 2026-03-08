# List Connection Legal Entities

**Connection Legal Entities cannot be created or managed in our sandbox environment by default. Please contact support to enable this functionality in Sandbox.**

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
    "/connection_legal_entities": {
      "get": {
        "summary": "List Connection Legal Entities",
        "description": "**Note: This is not supported in our sandbox environment**",
        "operationId": "list-connection-legal-entities",
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
            "name": "connection_id",
            "in": "query",
            "schema": {
              "type": "string"
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
            "name": "status",
            "in": "query",
            "description": "One of: `completed`, `denied`, `failed`, `processing`.",
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