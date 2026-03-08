# List Foreign Exchange Quotes

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
    "/foreign_exchange_quotes": {
      "get": {
        "summary": "List Foreign Exchange Quotes",
        "description": "",
        "operationId": "list-foreign-exchange-quotes",
        "parameters": [
          {
            "name": "base_currency",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "effective_at",
            "in": "query",
            "schema": {
              "type": "string",
              "format": "date"
            }
          },
          {
            "name": "expires_at",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "internal_account_id",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "target_currency",
            "in": "query",
            "schema": {
              "type": "string"
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
                    "value": "{}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {}
                }
              }
            }
          },
          "400": {
            "description": "400",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {}
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