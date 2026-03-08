# Create Entity Link

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
    "/entity_links": {
      "post": {
        "summary": "Create Entity Link",
        "description": "",
        "operationId": "create-entity-link",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "entity_a_id",
                  "entity_a_type",
                  "entity_b_id",
                  "entity_b_type"
                ],
                "properties": {
                  "entity_a_id": {
                    "type": "string",
                    "description": "ID of object being linked"
                  },
                  "entity_a_type": {
                    "type": "string",
                    "description": "Type of linked object, can be \"expected_payment\", \"return\" or \"payment_order\""
                  },
                  "entity_b_id": {
                    "type": "string",
                    "description": "ID of object being linked"
                  },
                  "entity_b_type": {
                    "type": "string",
                    "description": "Type of linked object, can be \"expected_payment\", \"return\" or \"payment_order\""
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
          "201": {
            "description": "201",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n    \"id\": \"67fca7e9-af82-4af7-84b2-594f591359bc\",\n    \"object\": \"entity_link\",\n    \"live_mode\": true,\n    \"created_by_actor_name\": \"Production API Key\",\n    \"created_by_actor_id\": \"b836e9f2-551e-4f5c-9d00-3e491ea234bc\",\n    \"created_by_actor_type\": \"APIKey\",\n    \"discarded_by_actor_id\": null,\n    \"discarded_by_actor_type\": null,\n    \"entity_a_id\": \"23b67040-e80c-45a2-a462-5381c47700bb\",\n    \"entity_a_type\": \"payment_order\",\n    \"entity_b_id\": \"b5d4bdb3-3a1f-4097-9e83-05f3d214f0fd\",\n    \"entity_b_type\": \"payment_order\",\n    \"metadata\": {},\n    \"discarded_at\": null,\n    \"created_at\": \"2024-09-04T19:42:39Z\",\n    \"updated_at\": \"2024-09-04T19:42:39Z\"\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "example": "67fca7e9-af82-4af7-84b2-594f591359bc"
                    },
                    "object": {
                      "type": "string",
                      "example": "entity_link"
                    },
                    "live_mode": {
                      "type": "boolean",
                      "example": true,
                      "default": true
                    },
                    "created_by_actor_name": {
                      "type": "string",
                      "example": "Production API Key"
                    },
                    "created_by_actor_id": {
                      "type": "string",
                      "example": "b836e9f2-551e-4f5c-9d00-3e491ea234bc"
                    },
                    "created_by_actor_type": {
                      "type": "string",
                      "example": "APIKey"
                    },
                    "discarded_by_actor_id": {},
                    "discarded_by_actor_type": {},
                    "entity_a_id": {
                      "type": "string",
                      "example": "23b67040-e80c-45a2-a462-5381c47700bb"
                    },
                    "entity_a_type": {
                      "type": "string",
                      "example": "payment_order"
                    },
                    "entity_b_id": {
                      "type": "string",
                      "example": "b5d4bdb3-3a1f-4097-9e83-05f3d214f0fd"
                    },
                    "entity_b_type": {
                      "type": "string",
                      "example": "payment_order"
                    },
                    "metadata": {
                      "type": "object",
                      "properties": {}
                    },
                    "discarded_at": {},
                    "created_at": {
                      "type": "string",
                      "example": "2024-09-04T19:42:39Z"
                    },
                    "updated_at": {
                      "type": "string",
                      "example": "2024-09-04T19:42:39Z"
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