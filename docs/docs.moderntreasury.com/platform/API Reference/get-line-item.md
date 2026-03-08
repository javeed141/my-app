# Get Line Item

Get a single line item

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
    "/{itemizable_type}/{itemizable_id}/line_items/{id}": {
      "get": {
        "summary": "Get Line Item",
        "description": "Get a single line item",
        "operationId": "get-line-item",
        "parameters": [
          {
            "name": "itemizable_type",
            "in": "path",
            "description": "One of `payment_orders` or `expected_payments`",
            "schema": {
              "type": "string"
            },
            "required": true
          },
          {
            "name": "itemizable_id",
            "in": "path",
            "description": "The ID of the payment order or expected payment",
            "schema": {
              "type": "string"
            },
            "required": true
          },
          {
            "name": "id",
            "in": "path",
            "description": "The ID of the line item.",
            "schema": {
              "type": "string"
            },
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": {
                      "id": "ca12b3ec-884f-41f7-bde8-43e813dab5fa",
                      "amount": 20000,
                      "description": "Principal For Loan #123",
                      "metadata": {
                        "Type": "Principal"
                      }
                    }
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "example": "ca12b3ec-884f-41f7-bde8-43e813dab5fa"
                    },
                    "amount": {
                      "type": "integer",
                      "example": 20000,
                      "default": 0
                    },
                    "description": {
                      "type": "string",
                      "example": "Principal For Loan #123"
                    },
                    "metadata": {
                      "type": "object",
                      "properties": {
                        "Type": {
                          "type": "string",
                          "example": "Principal"
                        }
                      }
                    },
                    "accounting_category_id": {
                      "type": "string",
                      "example": "5285cb7f-46d3-44e7-9acd-2cc04ee131f5"
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