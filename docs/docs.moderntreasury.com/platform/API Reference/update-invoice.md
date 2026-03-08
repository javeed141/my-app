# Update Invoice

Attributes of an invoice other than `status` and `metadata` can only be updated when the invoice is in the `draft` state.

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
    "/invoices/{id}": {
      "patch": {
        "summary": "Update Invoice",
        "description": "",
        "operationId": "update-invoice",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "The ID of the invoice.",
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
                  "counterparty_id": {
                    "type": "string"
                  },
                  "counterparty_billing_address": {
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
                  "counterparty_shipping_address": {
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
                  "currency": {
                    "type": "string"
                  },
                  "description": {
                    "type": "string"
                  },
                  "due_date": {
                    "type": "string",
                    "format": "date"
                  },
                  "invoicer_name": {
                    "type": "string",
                    "description": "Will update the issuer name if included. Passing in a null or empty string will default the value to the Organization name in Modern Treasury."
                  },
                  "invoicer_address": {
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
                  "originating_account_id": {
                    "type": "string"
                  },
                  "payment_method": {
                    "type": "string",
                    "description": "When opening an invoice, whether to show the embedded payment UI, automatically create a payment or rely on manual payment from the recipient.",
                    "enum": [
                      "ui",
                      "automatic",
                      "manual"
                    ]
                  },
                  "status": {
                    "type": "string",
                    "description": "Invoice status must be updated in an individual PATCH request that does not modify any other invoice attributes. Valid state transitions are `draft` to `unpaid`,  `draft` or `unpaid` to `void` and `unpaid` to `paid`",
                    "enum": [
                      "unpaid",
                      "void"
                    ]
                  },
                  "payment_effective_date": {
                    "type": "string",
                    "description": "When payment_method is automatic: the date that the transaction resulting from the automatically created payment order is to be posted to the participants’ account.",
                    "format": "date"
                  },
                  "receiving_account_id": {
                    "type": "string",
                    "description": "When payment_method is automatic: receiving_account_id on the automatically created payment order"
                  },
                  "payment_type": {
                    "type": "string",
                    "description": "When payment_method is automatic:  payment_type on the automatically created payment order",
                    "enum": [
                      "ach",
                      "eft"
                    ]
                  },
                  "fallback_payment_method": {
                    "type": "string",
                    "description": "When payment_method is automatic:  fallback payment method to use when an automatic payment fails.",
                    "enum": [
                      "ui",
                      "manual"
                    ]
                  },
                  "notifications_enabled": {
                    "type": "boolean",
                    "description": "If true, the invoice will send email notifications to the invoice recipients about invoice status changes."
                  },
                  "notification_email_addresses": {
                    "type": "array",
                    "description": "Emails in addition to the counterparty email to send invoice status notifications to. At least one email is required if notifications are enabled and the counterparty doesn't have an email.",
                    "items": {
                      "type": "string"
                    }
                  },
                  "virtual_account_id": {
                    "type": "string",
                    "description": "The virtual account associated with an invoice. The virtual account routing and accounts numbers will be shown on the invoice in place of the internal account information."
                  },
                  "recipient_name": {
                    "type": "string",
                    "description": "The name of the recipient of the invoice. Leaving this value as null will fallback to using the counterparty's name."
                  },
                  "recipient_email": {
                    "type": "string",
                    "description": "The email of the recipient of the invoice. Leaving this value as null will fallback to using the counterparty's email."
                  },
                  "remind_after_overdue_days": {
                    "type": "array",
                    "description": "A list of days after the due date on which overdue reminder emails should be sent. Maximum length of 3, and maximum value of 365, email notifications must be enabled",
                    "items": {
                      "type": "integer",
                      "format": "int32"
                    }
                  },
                  "metadata": {
                    "type": "string",
                    "format": "json"
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