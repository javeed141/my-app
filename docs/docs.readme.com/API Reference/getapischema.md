# Get our OpenAPI Definition

Returns a copy of our OpenAPI Definition.

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
      "name": "API Specification"
    }
  ],
  "paths": {
    "/schema": {
      "get": {
        "operationId": "getAPISchema",
        "summary": "Get our OpenAPI Definition",
        "description": "Returns a copy of our OpenAPI Definition.",
        "tags": [
          "API Specification"
        ],
        "responses": {
          "200": {
            "description": "OpenAPI Definition data",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "additionalProperties": true
                }
              }
            }
          }
        }
      }
    }
  }
}
```