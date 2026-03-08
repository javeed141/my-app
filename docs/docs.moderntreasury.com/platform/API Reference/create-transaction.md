# Create Transaction

Create transactions in Modern Treasury to represent financial transactions from financial institutions (e.g., bank, payment processor), or 3rd party.

Create transactions in Modern Treasury to represent financial transactions from financial institutions (e.g., bank, payment processor), or 3rd party.

For replicating bank transactions, [see this guide](https://docs.moderntreasury.com/reconciliation/docs/import-data-via-api#bank-transaction-codes) to replicate transaction codes from the `bai2` file.

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
    "/transactions": {
      "post": {
        "summary": "Create Transaction",
        "description": "Create transactions in Modern Treasury to represent financial transactions from financial institutions (e.g., bank, payment processor), or 3rd party.",
        "operationId": "create-transaction",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "internal_account_id",
                  "as_of_date",
                  "direction",
                  "amount",
                  "posted",
                  "vendor_code",
                  "vendor_code_type"
                ],
                "properties": {
                  "internal_account_id": {
                    "type": "string",
                    "description": "The ID of one of your internal accounts"
                  },
                  "as_of_date": {
                    "type": "string",
                    "description": "Format is YYYY-MM-DD. The date on which the transaction occurred.",
                    "format": "date"
                  },
                  "direction": {
                    "type": "string",
                    "description": "One of `credit`, `debit`"
                  },
                  "amount": {
                    "type": "integer",
                    "format": "int64"
                  },
                  "posted": {
                    "type": "boolean",
                    "description": "If the transaction has posted to the account."
                  },
                  "type": {
                    "type": "string",
                    "description": "See [Payment Orders](https://docs.moderntreasury.com/platform/reference/payment-order-object) for a list of possible payment types. This field is required if no vendor_code/vendor_code_type is provided"
                  },
                  "vendor_description": {
                    "type": "string",
                    "description": "The transaction detailed text that often contains unstructured remittance information, and appears in the statements or online portal. The specific format will vary by bank, payment processor, or other vendor."
                  },
                  "vendor_code": {
                    "type": "string",
                    "description": "The code related to this transaction. For bank transactions, the bank provided code that determines the transaction type. This field is required if type is not provided"
                  },
                  "vendor_code_type": {
                    "type": "string",
                    "description": "The type of `vendor_code` being reported. This field is required if type is not provided"
                  },
                  "metadata": {
                    "type": "string",
                    "format": "json"
                  },
                  "custom_identifiers": {
                    "type": "string",
                    "description": "Matching data used in Reconciliation Rules to automatically reconcile this Transaction. See [Defining your Reconciliation Rules](https://docs.moderntreasury.com/reconciliation/docs/defining-your-reconciliation-rules). Up to 50 string key-value pairs allowed.",
                    "format": "json"
                  },
                  "vendor_customer_id": {
                    "type": "string",
                    "description": "An identifier given to this transaction by the bank, often `null`"
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