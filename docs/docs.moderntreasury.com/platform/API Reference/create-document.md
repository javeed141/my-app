# Create Document

To test this endpoint, we recommend using an API tool like Postman.

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
    "/documents": {
      "post": {
        "summary": "Create Document",
        "description": "To test this endpoint, we recommend using an API tool like Postman.",
        "operationId": "create-document",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "file",
                  "documentable_id",
                  "documentable_type"
                ],
                "properties": {
                  "documentable_id": {
                    "type": "string"
                  },
                  "documentable_type": {
                    "type": "string"
                  },
                  "file": {
                    "type": "string",
                    "format": "binary"
                  },
                  "document_type": {
                    "type": "string",
                    "description": "A category given to the document, can be `null`.",
                    "enum": [
                      "articles_of_incorporation",
                      "certificate_of_good_standing",
                      "identification_back",
                      "identification_front"
                    ]
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
              "code": "curl --request POST \\\n     --url https://app.moderntreasury.com/api/documents \\\n     --header 'Content-Type: multipart/form-data'"
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
  "x-readme-fauxas": true
}
```