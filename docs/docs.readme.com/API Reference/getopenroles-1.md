# Get open roles

Returns all the roles we're hiring for at ReadMe!

# OpenAPI definition

```json
{
  "openapi": "3.1.0",
  "info": {
    "description": "Create beautiful product and API documentation with our developer friendly platform.",
    "version": "2.0.0",
    "title": "ReadMe API",
    "x-readme-deploy": "5.549.0",
    "termsOfService": "https://readme.com/tos",
    "contact": {
      "name": "API Support",
      "url": "https://docs.readme.com/main/docs/need-more-support",
      "email": "support@readme.io"
    }
  },
  "components": {
    "securitySchemes": {
      "bearer": {
        "type": "http",
        "scheme": "bearer",
        "description": "A bearer token that will be supplied within an `Authentication` header as `bearer <token>`."
      }
    }
  },
  "paths": {
    "/apply": {
      "get": {
        "operationId": "getOpenRoles",
        "summary": "Get open roles",
        "tags": [
          "Apply to ReadMe"
        ],
        "description": "Returns all the roles we're hiring for at ReadMe!",
        "security": [],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "total": {
                      "type": "number"
                    },
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "slug": {
                            "type": "string"
                          },
                          "title": {
                            "type": "string"
                          },
                          "description": {
                            "type": "string",
                            "description": "The description for this open position. This content is formatted as HTML."
                          },
                          "pullquote": {
                            "type": "string",
                            "description": "A short pullquote for the open position."
                          },
                          "location": {
                            "type": "string",
                            "description": "Where this position is located at."
                          },
                          "department": {
                            "type": "string",
                            "description": "The internal organization you'll be working in."
                          },
                          "url": {
                            "type": "string",
                            "format": "uri",
                            "description": "The place where you can apply for the position!"
                          }
                        },
                        "required": [
                          "slug",
                          "title",
                          "description",
                          "pullquote",
                          "location",
                          "department",
                          "url"
                        ],
                        "additionalProperties": false
                      }
                    }
                  },
                  "required": [
                    "total",
                    "data"
                  ],
                  "additionalProperties": false
                }
              }
            }
          }
        }
      }
    }
  },
  "servers": [
    {
      "url": "https://api.readme.com/v2",
      "description": "The ReadMe API"
    }
  ],
  "security": [
    {
      "bearer": []
    }
  ],
  "x-readme": {
    "proxy-enabled": true
  },
  "tags": [
    {
      "name": "Apply to ReadMe"
    }
  ]
}
```