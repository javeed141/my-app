# Get Your Account

This allows you to retrieve your account information, which is useful for checking how many credits you have remaining for the period. This information can also be accessed through the Datafiniti Web Portal, but of course it's nice to be able to access it programmatically as well, in order to prevent your applications from consuming too much data.

> 📘 Credit per data type
>
> Please note that your credits used are based on the data plan you are using. These credits are split between business, people, products, and property. Each having their own separate limits for credit usage. Using this Get request will verify how many credits you have used.

> 🚧 Legacy plans
>
> Legacy plan users will still use `num_credits_used` to verify their overall credits used. This will typically pool all other data type credits used together. Please check your plan's `credits_allotted` for the total limit

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
      "get": {
        "summary": "Get Your Account",
        "description": "",
        "operationId": "get-your-account",
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
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n    \"active\": true,\n    \"date_created\": \"2017-10-13 21:49:53.0\",\n    \"date_updated\": \"2017-10-26 20:58:34.0\",\n    \"email\": \"info@datafiniti.co\",\n    \"id\": 7,\n    \"first_name\": \"Datafiniti\",\n    \"last_name\": \"User\",\n    \"num_credits_used\": 7,\n    \"is_admin\": true\n}"
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
                      "example": "2017-10-26 20:58:34.0"
                    },
                    "email": {
                      "type": "string",
                      "example": "info@datafiniti.co"
                    },
                    "id": {
                      "type": "integer",
                      "example": 7,
                      "default": 0
                    },
                    "first_name": {
                      "type": "string",
                      "example": "Datafiniti"
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
                    "value": "{\n  \"errors\": [\n    \"An invalid user token was provided.\",\n    \"An inactive user token was provided.\"\n\t]\n}"
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
  "_id": "65ce4e31ceb42f0060898b87:65ce4e32ceb42f0060898c32"
}
```