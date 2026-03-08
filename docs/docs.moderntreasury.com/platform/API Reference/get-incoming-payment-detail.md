# Get Incoming Payment Detail

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
    "/incoming_payment_details/{id}": {
      "get": {
        "summary": "Get Incoming Payment Detail",
        "description": "",
        "operationId": "get-incoming-payment-detail",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "schema": {
              "type": "string"
            },
            "required": true
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