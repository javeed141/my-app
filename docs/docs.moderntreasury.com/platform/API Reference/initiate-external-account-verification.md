# Initiate Verification

> 🚧 Valid Statuses
>
> A new verification may only be started when the external account's `verification_status` is `unverified`. If a verification is in progress or has already been completed, a 422 response will be returned.

> 📘 Debit and credit capabilities must be enabled to attempt the verification
>
> In order to perform micro-deposit verification, the internal account that is used must have **both** credit and debit capabilities enabled. This is because the micro-deposits are sent and then immediately retrieved.  If the internal account is missing any one of the debit and credit capabilities, the verification will not be attempted and the micro-deposits will not be sent.

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
    "/external_accounts/{id}/verify": {
      "post": {
        "summary": "Initiate Verification",
        "description": "",
        "operationId": "initiate-external-account-verification",
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
                "required": [
                  "originating_account_id",
                  "payment_type"
                ],
                "properties": {
                  "originating_account_id": {
                    "type": "string",
                    "description": "The ID of the internal account where the micro-deposits originate from. Both credit and debit capabilities must be enabled."
                  },
                  "payment_type": {
                    "type": "string",
                    "description": "`ach`, `eft`, and `rtp` are supported payment types. **Note that `rtp` micro-deposits will collected via ACH debit.**"
                  },
                  "currency": {
                    "type": "string",
                    "description": "Defaults to the currency of the originating account."
                  },
                  "fallback_type": {
                    "type": "string",
                    "description": "The payment type used to create the micro-deposit if the original payment type is not valid for the receiving account. Currently, this only supports falling back from RTP to ACH (`payment_type=rtp` and `fallback_type=ach`)."
                  },
                  "priority": {
                    "type": "string",
                    "description": "Controls the speed of ACH transfers used in the verification flow. Either `normal` or `high`. For ACH payments, `high` represents a same-day ACH. Default value is `normal` if left blank. **Note: This field applies even when** `payment_type` **is** `rtp`**, as the debit/callback still uses ACH to recover the funds.**"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "422": {
            "description": "422",
            "content": {
              "application/json": {
                "examples": {
                  "Already verified account": {
                    "value": "{\n  \"errors\": {\n    \"code\": \"parameter_invalid\",\n    \"message\": \"The external account is already verified\",\n    \"parameter\": \"external_account\"\n  }\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "errors": {
                      "type": "object",
                      "properties": {
                        "code": {
                          "type": "string",
                          "example": "parameter_invalid"
                        },
                        "message": {
                          "type": "string",
                          "example": "The external account is already verified"
                        },
                        "parameter": {
                          "type": "string",
                          "example": "external_account"
                        }
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
  "x-readme-fauxas": true
}
```