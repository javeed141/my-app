# Update Counterparty

Updates a given counterparty with new information.

> 📘 Partial Updates
>
> Only top-level fields that are passed will be updated, if you wish to keep a value unchanged, simply omit the information from the body of your request.

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
    "/counterparties/{id}": {
      "patch": {
        "summary": "Update Counterparty",
        "description": "Updates a given counterparty with new information.",
        "operationId": "update-counterparty",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "The ID of the counterparty.",
            "schema": {
              "type": "string"
            },
            "required": true
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "A new name for the counterparty. Will only update if passed."
                  },
                  "email": {
                    "type": "string",
                    "description": "A new email for the counterparty"
                  },
                  "metadata": {
                    "type": "string",
                    "description": "Additional data in the form of key-value pairs. Pairs can be removed by passing an empty string or null as the value",
                    "format": "json"
                  },
                  "send_remittance_advice": {
                    "type": "boolean"
                  },
                  "taxpayer_identifier": {
                    "type": "string",
                    "description": "Either a valid SSN or EIN"
                  },
                  "legal_entity_id": {
                    "type": "string"
                  },
                  "external_id": {
                    "type": "string",
                    "description": "An optional user-defined 180 character unique identifier"
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
  "x-readme-fauxas": true
}
```