# Create Invoice

Create a new invoice

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
    "/invoices": {
      "post": {
        "summary": "Create Invoice",
        "description": "Create a new invoice",
        "operationId": "create-invoice",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "counterparty_id",
                  "due_date",
                  "originating_account_id"
                ],
                "properties": {
                  "auto_advance": {
                    "type": "boolean",
                    "description": "When `true`, the invoice will progress to `unpaid` automatically and cannot be edited after entering that state. If the invoice fails to progress to `unpaid`, the errors will be returned and the invoice will not be created.",
                    "default": false
                  },
                  "contact_details": {
                    "type": "array",
                    "description": "The invoicer's contact details displayed at the top of the invoice.",
                    "items": {
                      "properties": {
                        "contact_identifier": {
                          "type": "string",
                          "description": "The contact detail itself."
                        },
                        "contact_identifier_type": {
                          "type": "string",
                          "description": "The type of contact detail, either `email`, `phone_number`, or `website`."
                        }
                      },
                      "type": "object"
                    }
                  },
                  "counterparty_id": {
                    "type": "string"
                  },
                  "counterparty_billing_address": {
                    "type": "object",
                    "description": "The counterparty's billing address.",
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
                    "description": "The counterparty's shipping address where physical goods should be delivered.",
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
                    "type": "string",
                    "description": "Defaults to `USD` if not provided.",
                    "default": "USD"
                  },
                  "description": {
                    "type": "string"
                  },
                  "due_date": {
                    "type": "string",
                    "description": "A date",
                    "format": "date"
                  },
                  "fallback_payment_method": {
                    "type": "string",
                    "description": "When payment_method is automatic:  fallback payment method to use when an automatic payment fails.",
                    "default": "manual",
                    "enum": [
                      "ui",
                      "manual"
                    ]
                  },
                  "invoice_line_items": {
                    "type": "array",
                    "description": "An array of invoice line items. The API supports a maximum of 50 invoice line items per invoice. If a greater number of invoice line items is required, please contact support.",
                    "items": {
                      "properties": {
                        "name": {
                          "type": "string",
                          "description": "Name of the line item, typically a product or SKU name."
                        },
                        "description": {
                          "type": "string",
                          "description": "An optional free-form description of the line item."
                        },
                        "quantity": {
                          "type": "integer",
                          "description": "The number of units of a product or service that this line item is for. Must be a whole number. Defaults to 1 if not provided.",
                          "default": 1,
                          "format": "int32"
                        },
                        "unit_amount": {
                          "type": "integer",
                          "description": "The cost per unit of the product or service that this line item is for, specified in the invoice currency's smallest unit.",
                          "format": "int32"
                        },
                        "unit_amount_decimal": {
                          "type": "string",
                          "description": "The cost per unit of the product or service that this line item is for, specified in the invoice currency's smallest unit. Accepts decimal strings with up to 12 decimals."
                        },
                        "direction": {
                          "type": "string",
                          "description": "`debit` indicates that the counterparty owes the business money and increases the invoice's `total_amount` due. `credit` has the opposite intention and effect.",
                          "default": "debit"
                        },
                        "metadata": {
                          "type": "string",
                          "description": "Additional data represented as key-value pairs. Both the key and value must be strings. See [Metadata](https://docs.moderntreasury.com/platform/reference/metadata).",
                          "format": "json"
                        }
                      },
                      "required": [
                        "name"
                      ],
                      "type": "object"
                    }
                  },
                  "invoicer_name": {
                    "type": "string",
                    "description": "Name of the issuer for the invoice. Defaults to the Organization name in Modern Treasury."
                  },
                  "invoicer_address": {
                    "type": "object",
                    "description": "The invoice issuer's business address.",
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
                    "type": "string",
                    "description": "The internal account the invoice should be paid to."
                  },
                  "payment_method": {
                    "type": "string",
                    "description": "When opening an invoice, whether to show the embedded payment UI, automatically create a payment or rely on manual payment from the recipient.",
                    "default": "manual",
                    "enum": [
                      "ui",
                      "automatic",
                      "manual"
                    ]
                  },
                  "payment_effective_date": {
                    "type": "string",
                    "description": "When payment_method is automatic: the date that the transaction resulting from the automatically created payment order is to be posted to the participants’ account.",
                    "format": "date"
                  },
                  "payment_type": {
                    "type": "string",
                    "description": "When payment_method is automatic:  payment_type on the automatically created payment order",
                    "enum": [
                      "ach",
                      "eft"
                    ]
                  },
                  "receiving_account_id": {
                    "type": "string",
                    "description": "When payment_method is automatic: receiving_account_id on the automatically created payment order"
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
                    "description": "Additional data represented as key-value pairs. Both the key and value must be strings. See [Metadata](https://docs.moderntreasury.com/platform/reference/metadata).",
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