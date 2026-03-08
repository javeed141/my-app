# API Status Check

You can view our API status check page here:\
[status.datafiniti.co](https://status.datafiniti.co/)

Current API Status:

[block:embed]
{
  "html": false,
  "url": "https://api.datafiniti.co/v4/health",
  "title": "iframe",
  "provider": "api.datafiniti.co",
  "href": "https://api.datafiniti.co/v4/health",
  "typeOfEmbed": "iframe",
  "iframe": true
}
[/block]

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
    "/health": {
      "get": {
        "summary": "API Status Check",
        "description": "",
        "operationId": "api-status-check",
        "parameters": [
          {
            "name": "Authorization",
            "in": "header",
            "description": "You API token from your setting page",
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
                    "value": "OK"
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
                    "value": "{\n  Unauthorized\n}"
                  }
                }
              }
            }
          },
          "500": {
            "description": "500",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n\tError - This is an issue on our end. please contact customer support.\n}"
                  }
                }
              }
            }
          }
        },
        "deprecated": false,
        "x-readme": {
          "code-samples": [
            {
              "language": "curl",
              "code": "curl --silent --location 'https://api.datafiniti.co/v4/health' \\\n--header 'Authorization: Bearer <API_KEY>'"
            }
          ],
          "samples-languages": [
            "curl"
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
  "x-readme-fauxas": true,
  "_id": "65ce4e31ceb42f0060898b87:686bf041fd5ae9002169ac17"
}
```