# Create Foreign Exchange Quote

<br />

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
      "post": {
        "summary": "Create Foreign Exchange Quote",
        "description": "",
        "operationId": "create-foreign-exchange-quote",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "internal_account_id",
                  "target_currency"
                ],
                "properties": {
                  "effective_at": {
                    "type": "string",
                    "description": "The timestamp until when the quoted rate is valid.",
                    "format": "date"
                  },
                  "base_amount": {
                    "type": "integer",
                    "description": "Amount in the lowest denomination of the `base_currency` to convert, often called the \"sell\" amount.",
                    "format": "int32"
                  },
                  "base_currency": {
                    "type": "string",
                    "description": "Currency to convert, often called the \"sell\" currency. Defaults to the `internal_account` currency."
                  },
                  "internal_account_id": {
                    "type": "string",
                    "description": "The ID for the `InternalAccount` this quote is associated with. See [Internal Accounts](https://docs.moderntreasury.com/platform/reference/internal-account-object)."
                  },
                  "target_amount": {
                    "type": "integer",
                    "description": "Amount in the lowest denomination of the `target_currency`, often called the \"buy\" amount.",
                    "format": "int32"
                  },
                  "target_currency": {
                    "type": "string",
                    "description": "Currency to convert the `base_currency` to, often called the \"buy\" currency."
                  },
                  "metadata": {
                    "type": "object",
                    "properties": {}
                  }
                }
              }
            }
          }
        },
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