# Update External Account

> 📘 Partial Updates
>
> Only top-level fields that are passed will be updated. If you wish to keep a value unchanged, simply omit the information from the body of your request.

> 🚧 Counterparties
>
> You may only add counterparties to external accounts which do not already have an assigned counterparty. You may not update the counterparty of an external account that has a pre-existing counterparty.

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
    "/external_accounts/{id}": {
      "patch": {
        "summary": "Update External Account",
        "description": "",
        "operationId": "update-external-account",
        "parameters": [
          {
            "name": "id",
            "in": "path",
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
                  "party_address": {
                    "type": "object",
                    "properties": {
                      "line1": {
                        "type": "string"
                      },
                      "line2": {
                        "type": "string"
                      },
                      "locality": {
                        "type": "string"
                      },
                      "region": {
                        "type": "string"
                      },
                      "postal_code": {
                        "type": "string"
                      },
                      "country": {
                        "type": "string"
                      }
                    }
                  },
                  "party_name": {
                    "type": "string"
                  },
                  "party_type": {
                    "type": "string"
                  },
                  "account_type": {
                    "type": "string"
                  },
                  "counterparty_id": {
                    "type": "string"
                  },
                  "name": {
                    "type": "string",
                    "description": "A nickname for the external account. This is only for internal usage and won't affect any payments"
                  },
                  "metadata": {
                    "type": "string",
                    "description": "Additional data in the form of key-value pairs. Pairs can be removed by passing an empty string or null as the value.",
                    "format": "json"
                  },
                  "ledger_account_id": {
                    "type": "string",
                    "description": "The Ledger Account you want associated to the external account."
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