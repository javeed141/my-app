# Update Your Account

This allows you to update your account information, including your email and password. If you update your email or password, we'll send you an email to your original email address to tell you about it.

Example Request Body:

```json
{"first_name": "Shawn"}
```

# OpenAPI definition

```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "Datafiniti API v4",
    "version": "4"
  },
  "servers": [
    {
      "url": "https://api.datafiniti.co/v4"
    }
  ],
  "components": {
    "securitySchemes": {
      "sec0": {
        "type": "apiKey",
        "in": "query",
        "name": "api_key"
      }
    }
  },
  "security": [
    {
      "sec0": []
    }
  ],
  "paths": {
    "/account": {
      "put": {
        "summary": "Update Your Account",
        "description": "",
        "operationId": "update-your-account",
        "parameters": [
          {
            "name": "Authorization",
            "in": "header",
            "required": true,
            "schema": {
              "type": "string",
              "default": "Bearer <token>"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "email": {
                    "type": "string",
                    "description": "A new email address to associate with your account."
                  },
                  "first_name": {
                    "type": "string",
                    "description": "Your first, or given, name"
                  },
                  "last_name": {
                    "type": "string",
                    "description": "Your last, or family, name."
                  },
                  "organization": {
                    "type": "string",
                    "description": "Typically your employer"
                  },
                  "password": {
                    "type": "string",
                    "description": "The password for your account. Keep it secret. Keep it safe."
                  },
                  "phone_number": {
                    "type": "string",
                    "description": "A good number for us to reach you at in case there is a problem with your account."
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
                    "value": "// {\"first_name\": \"Shawn\"}\n\n{\n    \"active\": true,\n    \"date_created\": \"2017-10-13 21:49:53.0\",\n    \"date_updated\": \"2017-10-26 21:18:29.0\",\n    \"email\": \"user@datafiniti.co\",\n    \"id\": 7,\n    \"first_name\": \"Shawn\",\n    \"last_name\": \"User\",\n    \"num_credits_used\": 7,\n    \"is_admin\": true\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "active": {
                      "type": "boolean",
                      "example": true,
                      "default": true
                    },
                    "date_created": {
                      "type": "string",
                      "example": "2017-10-13 21:49:53.0"
                    },
                    "date_updated": {
                      "type": "string",
                      "example": "2017-10-26 21:18:29.0"
                    },
                    "email": {
                      "type": "string",
                      "example": "user@datafiniti.co"
                    },
                    "id": {
                      "type": "integer",
                      "example": 7,
                      "default": 0
                    },
                    "first_name": {
                      "type": "string",
                      "example": "Shawn"
                    },
                    "last_name": {
                      "type": "string",
                      "example": "User"
                    },
                    "num_credits_used": {
                      "type": "integer",
                      "example": 7,
                      "default": 0
                    },
                    "is_admin": {
                      "type": "boolean",
                      "example": true,
                      "default": true
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
                    "value": "{\n  \"errors\": [\n    \"An invalid user token was provided.\",\n    \"An inactive user token was provided.\",\n    \"Please provide fields to update\",\n    \"Invalid request body. Expected an object with the following fields: email, first_name, last_name, organization, password, phone_number\"\n\t]\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "errors": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "example": "An invalid user token was provided."
                      }
                    }
                  }
                }
              }
            }
          },
          "401": {
            "description": "401",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n  \"errors\": [\n    \"Please provide your token in the Authorization header using the following format: Bearer << replace all of this with your token >>\",\n    \"Invalid token.\"\n  ]\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "errors": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "example": "Please provide your token in the Authorization header using the following format: Bearer << replace all of this with your token >>"
                      }
                    }
                  }
                }
              }
            }
          },
          "403": {
            "description": "403",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n  \"errors\": [\n    \"There was a problem with this customer's payment information.\"\n  ]\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "errors": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "example": "There was a problem with this customer's payment information."
                      }
                    }
                  }
                }
              }
            }
          },
          "404": {
            "description": "404",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n  \"errors\": [\"User doesn't exist\"]\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "errors": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "example": "User doesn't exist"
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
  "x-readme-fauxas": true,
  "_id": "65ce4e31ceb42f0060898b87:65ce4e32ceb42f0060898c33"
}
```