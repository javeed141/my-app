# Update Incoming Payment Detail

Update a single Incoming Payment Detail's metadata.

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
      "patch": {
        "summary": "Update Incoming Payment Detail",
        "description": "Update a single Incoming Payment Detail's metadata.",
        "operationId": "update-incoming-payment-detail",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "The ID of the Incoming Payment Detail.",
            "schema": {
              "type": "string"
            },
            "required": true
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "metadata": {
                    "type": "string",
                    "format": "json"
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
                    "value": "{\n  \"id\": \"20952b6f-1a4e-45bb-b071-f4cf698861a9\",\n  \"object\": \"incoming_payment_detail\",\n  \"live_mode\": true,\n  \"internal_account_id\": \"0186a991-809a-4696-a47a-fe7db5013eee\",\n  \"virtual_account_id\": null,\n  \"virtual_account\": null,\n  \"transaction_line_item_id\": null,\n  \"transaction_id\": null,\n  \"type\": \"ach\",\n  \"data\": {},\n  \"amount\": 10000,\n  \"currency\": \"USD\",\n  \"direction\": \"debit\",\n  \"status\": \"pending\",\n  \"metadata\": {\n    \"foo\": \"bar\"\n  },\n  \"as_of_date\": \"2021-11-05\",\n  \"vendor_id\": null,\n  \"created_at\": \"2021-11-05T03:21:59Z\",\n  \"updated_at\": \"2021-11-05T16:27:48Z\"\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "example": "20952b6f-1a4e-45bb-b071-f4cf698861a9"
                    },
                    "object": {
                      "type": "string",
                      "example": "incoming_payment_detail"
                    },
                    "live_mode": {
                      "type": "boolean",
                      "example": true,
                      "default": true
                    },
                    "internal_account_id": {
                      "type": "string",
                      "example": "0186a991-809a-4696-a47a-fe7db5013eee"
                    },
                    "virtual_account_id": {},
                    "virtual_account": {},
                    "transaction_line_item_id": {},
                    "transaction_id": {},
                    "type": {
                      "type": "string",
                      "example": "ach"
                    },
                    "data": {
                      "type": "object",
                      "properties": {}
                    },
                    "amount": {
                      "type": "integer",
                      "example": 10000,
                      "default": 0
                    },
                    "currency": {
                      "type": "string",
                      "example": "USD"
                    },
                    "direction": {
                      "type": "string",
                      "example": "debit"
                    },
                    "status": {
                      "type": "string",
                      "example": "pending"
                    },
                    "metadata": {
                      "type": "object",
                      "properties": {
                        "foo": {
                          "type": "string",
                          "example": "bar"
                        }
                      }
                    },
                    "as_of_date": {
                      "type": "string",
                      "example": "2021-11-05"
                    },
                    "vendor_id": {},
                    "created_at": {
                      "type": "string",
                      "example": "2021-11-05T03:21:59Z"
                    },
                    "updated_at": {
                      "type": "string",
                      "example": "2021-11-05T16:27:48Z"
                    }
                  }
                }
              }
            }
          },
          "422": {
            "description": "422",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n  \"errors\": {\n    \"code\": \"parameter_invalid\",\n    \"message\": \"Metadata may only be Key-Value pairs of UTF Strings\",\n    \"parameter\": \"metadata\"\n  }\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "errors": {
                      "type": "object",
                      "properties": {
                        "code": {
                          "type": "string",
                          "example": "parameter_invalid"
                        },
                        "message": {
                          "type": "string",
                          "example": "Metadata may only be Key-Value pairs of UTF Strings"
                        },
                        "parameter": {
                          "type": "string",
                          "example": "metadata"
                        }
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