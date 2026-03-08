# Submit your application!

This endpoint will let you apply to a job at ReadMe programatically, without having to go through our UI!

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
      "post": {
        "operationId": "applyToReadMe",
        "summary": "Submit your application!",
        "tags": [
          "Apply to ReadMe"
        ],
        "description": "This endpoint will let you apply to a job at ReadMe programatically, without having to go through our UI!",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string",
                    "minLength": 1,
                    "description": "Your full name"
                  },
                  "email": {
                    "type": "string",
                    "format": "email",
                    "default": "you@example.com",
                    "description": "A valid email we can reach you at."
                  },
                  "job": {
                    "type": "string",
                    "description": "The job you're looking to apply for (https://readme.com/careers)."
                  },
                  "pronouns": {
                    "type": "string",
                    "description": "Learn more at https://lgbtlifecenter.org/pronouns/"
                  },
                  "linkedin": {
                    "type": "string",
                    "format": "uri",
                    "description": "What have you been up to the past few years?"
                  },
                  "github": {
                    "type": "string",
                    "format": "uri",
                    "description": "Or Bitbucket, GitLab or anywhere else your code is hosted!"
                  },
                  "coverLetter": {
                    "type": "string",
                    "description": "What should we know about you?"
                  },
                  "dont_really_apply": {
                    "type": "boolean",
                    "default": false,
                    "description": "If you set this to true, we will not actually apply you to the job."
                  }
                },
                "required": [
                  "name",
                  "job"
                ],
                "additionalProperties": false
              }
            }
          },
          "required": true
        },
        "security": [],
        "responses": {
          "201": {
            "description": "Created",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string"
                    },
                    "keyvalues": {
                      "type": "string"
                    },
                    "careers": {
                      "type": "string"
                    },
                    "questions?": {
                      "type": "string"
                    },
                    "poem": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    }
                  },
                  "required": [
                    "message",
                    "keyvalues",
                    "careers",
                    "questions?",
                    "poem"
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