# Collect Account Details

Send an email requesting account details.

```json Example request body to customize the form
{
  "direction": "credit",
  "fields": ["nameOnAccount", "accountType", "accountNumber", "routingNumber", "address", "ibanNumber", "swiftCode"],
  "custom_redirect": "https://google.com"
}
```

> 📘 Setting a custom email domain
>
> Modern Treasury by default will send emails from moderntreasury-mail.com. You can set up a custom email domain [here](https://docs.moderntreasury.com/docs/custom-email-domains).

> 📘 Resending the collect email
>
> If you are still waiting on the counterparty's account information, you may resend them the email by calling this endpoint again. If you do that, the `is_resend` field will be true.

> 🚧 Available only if organization is live
>
> You will not be able to collect counterparty information via automated email unless your organization has gone live. If it has, you can execute this endpoint in both sandbox and live (production) environments.

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
    "/counterparties/{id}/collect_account": {
      "post": {
        "summary": "Collect Account Details",
        "description": "Send an email requesting account details.",
        "operationId": "collect-account-details",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "The id of the counterparty",
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
                  "direction"
                ],
                "properties": {
                  "direction": {
                    "type": "string",
                    "description": "One of `credit` or `debit`. Use `credit` when you want to pay a counterparty. Use `debit` when you need to charge a counterparty. This field helps us send a more tailored email to your counterparties."
                  },
                  "send_email": {
                    "type": "boolean",
                    "description": "By default, Modern Treasury will send an email to your counterparty that includes a link to the form they must fill out. However, if you would like to send the counterparty the link, you can set this parameter to `false`. The JSON body will include the link to the secure Modern Treasury form.",
                    "default": true
                  },
                  "fields": {
                    "type": "array",
                    "description": "The list of fields you want on the form. This field is optional and if it is not set, will default to `[\"nameOnAccount\", \"accountType\", \"accountNumber\", \"routingNumber\", \"address\"]`. The full list of supported options is  `[        \"name\",       \"nameOnAccount\",      \"taxpayerIdentifier\",       \"accountType\",       \"accountNumber\",       \"ibanNumber\",       \"clabeNumber\",       \"walletAddress\",       \"panNumber\",       \"routingNumber\",       \"abaWireRoutingNumber\",       \"swiftCode\",       \"auBsb\",       \"caCpa\",       \"cnaps\",       \"gbSortCode\",       \"inIfsc\",       \"myBranchCode\",       \"brCodigo\",       \"routingNumberType\",       \"address\",       \"jpZenginCode\",       \"seBankgiroClearingCode\",       \"nzNationalClearingCode\",       \"hkInterbankClearingCode\",       \"huInterbankClearingCode\",       \"dkInterbankClearingCode\",       \"idSknbiCode\" ]`. Field names must be camel-cased.",
                    "items": {
                      "type": "string"
                    }
                  },
                  "custom_redirect": {
                    "type": "string",
                    "description": "The URL you want your customer to visit upon filling out the form. By default, they will be sent to a Modern Treasury landing page. This must be a valid HTTPS URL if  set."
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
                    "value": "{\n  \"id\": \"928db55e-6552-4aaf-96d7-10c693922b1f\",\n  \"is_resend\": false,\n  \"form_link\": \"https://app.moderntreasury.com/public/counterparties/f6a4feae-3c66-46d1-80f4-ca10efdf6gec/account_details?token=NBa9B7HVNRFTa2ocaXFq46FqmFLuGm19w5BiRB5zgikkw5mjrRkBx5f9JprgixUh\"\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "example": "928db55e-6552-4aaf-96d7-10c693922b1f"
                    },
                    "is_resend": {
                      "type": "boolean",
                      "example": false,
                      "default": true
                    },
                    "form_link": {
                      "type": "string",
                      "example": "https://app.moderntreasury.com/public/counterparties/f6a4feae-3c66-46d1-80f4-ca10efdf6gec/account_details?token=NBa9B7HVNRFTa2ocaXFq46FqmFLuGm19w5BiRB5zgikkw5mjrRkBx5f9JprgixUh"
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