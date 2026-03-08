# List Line Items

Get a list of line items

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
    "/{itemizable_type}/{itemizable_id}/line_items": {
      "get": {
        "summary": "List Line Items",
        "description": "Get a list of line items",
        "operationId": "list-line-items",
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
            "name": "itemizable_id",
            "in": "path",
            "description": "The ID of the payment order or expected payment",
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
                    "value": [
                      {
                        "id": "ca12b3ec-884f-41f7-bde8-43e813dab5fa",
                        "amount": 20000,
                        "description": "Principal For Loan #123",
                        "metadata": {
                          "Type": "Principal"
                        }
                      },
                      {
                        "id": "79517340-38bc-4bca-bd43-156c1333bb6b",
                        "amount": 200,
                        "description": "Interest For Loan #123",
                        "metadata": {
                          "Type": "Interest"
                        }
                      }
                    ]
                  }
                },
                "schema": {
                  "type": "array",
                  "items": {
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
                        "example": "5164efac-33ba-43f7-9589-1dfeb1f8c654"
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