# Create Account Collection Flow

Create a new Account Collection Flow

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
    "/account_collection_flows": {
      "post": {
        "summary": "Create Account Collection Flow",
        "description": "Create a new Account Collection Flow",
        "operationId": "create-account-collection-flow",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "counterparty_id",
                  "payment_types"
                ],
                "properties": {
                  "counterparty_id": {
                    "type": "string",
                    "description": "The ID of a [counterparty](https://docs.moderntreasury.com/platform/reference/counterparty-object). An external account created with this flow will be associated with this counterparty."
                  },
                  "payment_types": {
                    "type": "array",
                    "description": "An array of payment types.  An [external account](https://docs.moderntreasury.com/platform/reference/external-account-object) created with this flow will support all of these payment types. Note this is currently restricted to domestic US rails (`ach`, `wire` or `check`).",
                    "items": {
                      "type": "string"
                    }
                  },
                  "receiving_countries": {
                    "type": "array",
                    "description": "An array of [ISO 3166-1 alpha-3](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3) country codes. This field is required for international wire transfers. Usage is currently limited to one receiving country.",
                    "default": [
                      "USA"
                    ],
                    "items": {
                      "type": "string"
                    }
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
                    "value": "{\n  \"id\": \"6e294fe8-10b2-4047-8d09-01cbb5ad85c2\",\n  \"object\": \"account_collection_flow\",\n  \"live_mode\": true,\n  \"client_token\": \"ac-live-1odHAQgJTMEom27Pe5MJe8vpwb6wyn2zFYE51DtGkCjqeyU87PvJhMaMYSVuH\",\n  \"payment_types\": [\n    \"ach\"\n  ],\n  \"counterparty_id\": \"48373199-caec-48e5-82f1-a17329354357\",\n  \"external_account_id\": null,\n  \"created_at\": \"2023-01-30T23:51:30Z\",\n  \"updated_at\": \"2023-01-30T23:51:30Z\"\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "example": "6e294fe8-10b2-4047-8d09-01cbb5ad85c2"
                    },
                    "object": {
                      "type": "string",
                      "example": "account_collection_flow"
                    },
                    "live_mode": {
                      "type": "boolean",
                      "example": true,
                      "default": true
                    },
                    "client_token": {
                      "type": "string",
                      "example": "ac-live-1odHAQgJTMEom27Pe5MJe8vpwb6wyn2zFYE51DtGkCjqeyU87PvJhMaMYSVuH"
                    },
                    "payment_types": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "example": "ach"
                      }
                    },
                    "counterparty_id": {
                      "type": "string",
                      "example": "48373199-caec-48e5-82f1-a17329354357"
                    },
                    "external_account_id": {},
                    "created_at": {
                      "type": "string",
                      "example": "2023-01-30T23:51:30Z"
                    },
                    "updated_at": {
                      "type": "string",
                      "example": "2023-01-30T23:51:30Z"
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
                    "value": "{\n  \"errors\": {\n    \"code\": \"parameter_missing\",\n    \"message\": \"Payment types is required\",\n    \"parameter\": \"payment_types\"\n  }\n}"
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
                          "example": "parameter_missing"
                        },
                        "message": {
                          "type": "string",
                          "example": "Payment types is required"
                        },
                        "parameter": {
                          "type": "string",
                          "example": "payment_types"
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