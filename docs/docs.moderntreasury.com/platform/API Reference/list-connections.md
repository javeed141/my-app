# List Connections

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
    "/connections": {
      "get": {
        "summary": "List Connections",
        "description": "",
        "operationId": "list-connections",
        "parameters": [
          {
            "name": "vendor_customer_id",
            "in": "query",
            "description": "An identifier assigned by the vendor to your organization.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "entity",
            "in": "query",
            "description": "A string code representing the vendor (i.e. bank).",
            "schema": {
              "type": "string"
            }
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
          }
        ],
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "[\n    {\n        \"id\": \"dac94e63-9f4a-46b9-ba6b-412acfbf4cc1\",\n        \"object\": \"connection\",\n        \"live_mode\": false,\n        \"vendor_id\": \"example1\",\n        \"vendor_name\": \"Gringotts Wizarding Bank\",\n        \"vendor_customer_id\": null,\n        \"discarded_at\": null,\n        \"created_at\": \"2018-07-24T23:43:49Z\",\n        \"updated_at\": \"2018-07-24T23:43:49Z\"\n    }\n]"
                  }
                },
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "string",
                        "example": "dac94e63-9f4a-46b9-ba6b-412acfbf4cc1"
                      },
                      "object": {
                        "type": "string",
                        "example": "connection"
                      },
                      "live_mode": {
                        "type": "boolean",
                        "example": false,
                        "default": true
                      },
                      "vendor_id": {
                        "type": "string",
                        "example": "example1"
                      },
                      "vendor_name": {
                        "type": "string",
                        "example": "Gringotts Wizarding Bank"
                      },
                      "vendor_customer_id": {},
                      "discarded_at": {},
                      "created_at": {
                        "type": "string",
                        "example": "2018-07-24T23:43:49Z"
                      },
                      "updated_at": {
                        "type": "string",
                        "example": "2018-07-24T23:43:49Z"
                      }
                    }
                  }
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