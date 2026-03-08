# List Holds

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
    "/holds": {
      "get": {
        "description": "",
        "operationId": "get_holds",
        "responses": {
          "200": {
            "description": ""
          }
        },
        "parameters": [
          {
            "in": "query",
            "name": "status",
            "schema": {
              "type": "string",
              "enum": [
                "resolved",
                "active"
              ]
            },
            "description": ""
          },
          {
            "in": "query",
            "name": "target_type",
            "schema": {
              "type": "string",
              "enum": [
                "payment_order"
              ]
            }
          },
          {
            "in": "query",
            "name": "metadata",
            "schema": {
              "type": "string"
            },
            "description": "For example, if you want to query for records with metadata key `Type` and value `Loan`, the query would be `metadata%5BType%5D=Loan`. This encodes the query parameters."
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