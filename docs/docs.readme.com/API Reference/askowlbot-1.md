# Ask Owlbot AI a question

Ask Owlbot a question about the content of your docs.

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
    "/owlbot/ask": {
      "post": {
        "operationId": "askOwlbot",
        "summary": "Ask Owlbot AI a question",
        "tags": [
          "Owlbot AI"
        ],
        "description": "Ask Owlbot a question about the content of your docs.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "question": {
                    "type": "string",
                    "description": "The question being asked to Owlbot."
                  }
                },
                "required": [
                  "question"
                ],
                "additionalProperties": false
              }
            }
          },
          "required": true
        },
        "parameters": [
          {
            "schema": {
              "type": "string",
              "enum": [
                "application/json",
                "text/event-stream"
              ],
              "default": "application/json"
            },
            "in": "header",
            "name": "accept",
            "required": false,
            "description": "The format the response should be returned in. If `text/event-stream` then the response will be streamed as it is generated."
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "data": {
                      "type": "object",
                      "properties": {
                        "answer": {
                          "type": "string"
                        },
                        "sources": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "title": {
                                "type": "string",
                                "description": "The page title for the given source."
                              },
                              "url": {
                                "type": "string",
                                "description": "A link to the source."
                              }
                            },
                            "required": [
                              "title",
                              "url"
                            ],
                            "additionalProperties": false
                          }
                        }
                      },
                      "required": [
                        "answer",
                        "sources"
                      ],
                      "additionalProperties": false
                    }
                  },
                  "required": [
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
      "name": "Owlbot AI"
    }
  ]
}
```