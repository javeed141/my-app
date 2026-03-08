# List Payment References

Get a list of payment references.

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
    "/payment_references": {
      "get": {
        "summary": "List Payment References",
        "description": "Get a list of payment references.",
        "operationId": "list-payment-references",
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
            "name": "referenceable_id",
            "in": "query",
            "description": "The id of the referenced object the payment_reference is for. Must be present when referenceable_type is also used.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "referenceable_type",
            "in": "query",
            "description": "The type of the referenceable object. Must be present when referenceable_id is used.",
            "schema": {
              "type": "string",
              "enum": [
                "payment_order",
                "return",
                "reversal",
                "transaction",
                "incoming_payment_detail"
              ]
            }
          },
          {
            "name": "reference_number",
            "in": "query",
            "description": "The actual reference number assigned by the bank.",
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