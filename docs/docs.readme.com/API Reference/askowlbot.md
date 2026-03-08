# Ask Owlbot AI a question

Ask Owlbot a question about the content of your docs.

>❗
> API v1 and this route are not available to projects that are using [ReadMe Refactored](https://docs.readme.com/main/docs/welcome-to-readme-refactored). [Check out our API migration guide](https://docs.readme.com/main/reference/api-migration-guide) for information on how to migrate to the new API.

> ⚠️ Enterprise Only
>
> Asking a question to Owlbot AI via the API is only available to projects on our Enterprise plan. Contact [growth@readme.io](mailto:growth@readme.io) to learn more!

#### Streaming Response

By passing in `stream: true` to the POST request this endpoint will send back data as it is generated instead of waiting for the entire response to be complete. This will make UI elements rendering this content feel much more responsive, cause it can take several seconds to get the entire response otherwise.

For streaming responses we always return the sources used as the first chunk in the following format, followed by two newline characters.

```
sources: [{ title: "Page Title" url: "https://docs.example.com/docs/source" }]
```

# OpenAPI definition

```json
{
  "openapi": "3.0.2",
  "info": {
    "description": "Create beautiful product and API documentation with our developer friendly platform.",
    "version": "5.549.0",
    "title": "Legacy API",
    "contact": {
      "name": "API Support",
      "url": "https://docs.readme.com/main/docs/need-more-support",
      "email": "support@readme.io"
    }
  },
  "servers": [
    {
      "url": "https://dash.readme.com/api/v1"
    }
  ],
  "tags": [
    {
      "name": "Owlbot AI"
    }
  ],
  "paths": {
    "/owlbot/ask": {
      "post": {
        "operationId": "askOwlbot",
        "summary": "Ask Owlbot AI a question",
        "description": "Ask Owlbot a question about the content of your docs.\n\n>❗\n> API v1 and this route are not available to projects that are using [ReadMe Refactored](https://docs.readme.com/main/docs/welcome-to-readme-refactored). [Check out our API migration guide](https://docs.readme.com/main/reference/api-migration-guide) for information on how to migrate to the new API.",
        "tags": [
          "Owlbot AI"
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "question"
                ],
                "properties": {
                  "question": {
                    "type": "string",
                    "description": "The question being asked to Owlbot."
                  },
                  "stream": {
                    "type": "boolean",
                    "description": "If true the response will be streamed as it is generated."
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "The answer to the question that was asked.",
            "content": {
              "text/event-stream": {
                "examples": {
                  "streaming response": {
                    "value": "sources: [{ title: \"Page Title\", url: \"https://docs.example.com/docs/owl-facts\"}]\\n\\nOwls have extremely flexible necks and can rotate their heads up to 270 degrees in each direction, giving them a 540-degree range in total."
                  }
                }
              },
              "application/json": {
                "schema": {
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
                        }
                      }
                    }
                  }
                },
                "examples": {
                  "non-streaming response": {
                    "value": {
                      "answer": "Owls have extremely flexible necks and can rotate their heads up to 270 degrees in each direction, giving them a 540-degree range in total.",
                      "sources": [
                        {
                          "title": "Page Title",
                          "url": "https://docs.example.com/docs/owl-facts"
                        }
                      ]
                    }
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "apiKey": []
          }
        ]
      }
    }
  },
  "components": {
    "securitySchemes": {
      "apiKey": {
        "type": "http",
        "scheme": "basic"
      }
    }
  }
}
```