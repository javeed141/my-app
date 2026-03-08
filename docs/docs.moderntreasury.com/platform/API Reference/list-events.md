# List Events

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
    "/events": {
      "get": {
        "summary": "List Events",
        "description": "",
        "operationId": "list-events",
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
            "name": "event_time_start",
            "in": "query",
            "description": "An inclusive lower bound for when the event occurred",
            "schema": {
              "type": "string",
              "format": "date"
            }
          },
          {
            "name": "event_time_end",
            "in": "query",
            "description": "An inclusive lower bound for when the event occurred",
            "schema": {
              "type": "string",
              "format": "date"
            }
          },
          {
            "name": "resource",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "entity_id",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "event_name",
            "in": "query",
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