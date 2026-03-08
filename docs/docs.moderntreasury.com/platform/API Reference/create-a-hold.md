# Create a Hold

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
      "post": {
        "description": "",
        "operationId": "post_holds",
        "responses": {
          "200": {
            "description": "",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string"
                    },
                    "target_id": {
                      "type": "string"
                    },
                    "target_type": {
                      "type": "string"
                    },
                    "reason": {
                      "type": "string"
                    },
                    "resolution": {
                      "type": "string"
                    },
                    "resolved_at": {
                      "type": "string",
                      "format": "date-time"
                    },
                    "created_at": {
                      "type": "string",
                      "format": "date-time"
                    },
                    "updated_at": {
                      "type": "string",
                      "format": "date-time"
                    },
                    "metadata": {
                      "type": "string",
                      "format": "json"
                    }
                  }
                }
              }
            }
          }
        },
        "parameters": [],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "target_id": {
                    "type": "string",
                    "description": "The ID of the Payment Order"
                  },
                  "target_type": {
                    "type": "string",
                    "description": "Must be `payment_order`",
                    "enum": [
                      "payment_order"
                    ]
                  },
                  "reason": {
                    "type": "string",
                    "description": "Free-form contextual information about the hold"
                  },
                  "metadata": {
                    "type": "string",
                    "format": "json"
                  }
                },
                "required": [
                  "target_id",
                  "target_type"
                ]
              }
            }
          }
        },
        "x-readme": {
          "samples-languages": [
            "shell"
          ]
        }
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