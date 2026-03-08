# Update Payment Order

Update a payment order

> 🚧 Cancellations
>
> Note that cancellations will only work if `status` is one of `needs_approval` or `approved`. Payment orders can not be deleted through the API after they've been `sent` to the bank. Please contact Modern Treasury support for more information.

> 🚧 Updates
>
> Certain attributes on the payment order are protected. They may only be updated when the payment order's status is `needs_approval`. This is because these attributes affect the mechanics of the payment itself. If you want to update an already approved payment order, our recommendation would be to cancel it and create a new one.
> If you attempt to update a protected attribute when it may not be updated, the request will still respond with a `200` status code, but the response body will contain the original data. This indicates that the attribute was not updated.
> The following are the protected attributes: `type`, `direction`, `originating_account`, `receiving_account_id`, `counterparty_id`, `amount`, `currency`, `effective_date`, `process_after`, `statement_descriptor`, `remittance_information`,  `purpose`, `priority`, `nsf_protected`.

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
    "/payment_orders/{id}": {
      "patch": {
        "summary": "Update Payment Order",
        "description": "Update a payment order",
        "operationId": "update-payment-order",
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
                  "status": {
                    "type": "string",
                    "description": "To cancel a payment order, use `cancelled`. To redraft a returned payment order, use `needs_approval`. To undo approval on a denied or approved payment order, use `needs_approval`."
                  },
                  "metadata": {
                    "type": "string",
                    "description": "Additional data in the form of key-value pairs. Pairs can be removed by passing an empty string or null as the value.",
                    "format": "json"
                  },
                  "receiving_account_id": {
                    "type": "string",
                    "description": "When using receiving_account_id, you may pass the id of an external account or an internal account. If an external account is passed, you must pass a value for counterparty_id."
                  },
                  "counterparty_id": {
                    "type": "string",
                    "description": "Required when receiving_account_id is passed the ID of an external account."
                  },
                  "type": {
                    "type": "string",
                    "description": "One of `ach`, `eft`, `wire`, `check`, `book`, `rtp`, `sepa`, `bacs`, `au_becs`, `interac`, `signet`, `provexchange`."
                  },
                  "subtype": {
                    "type": "string",
                    "description": "An additional layer of classification for the type of payment order you are doing. This field is only used for ach payment orders currently. For ach payment orders, the subtype represents the SEC code. We currently support CCD, PPD, IAT, CTX, WEB, CIE, and TEL."
                  },
                  "amount": {
                    "type": "integer",
                    "description": "Value in specified currency's smallest unit. e.g. $10 would be represented as `1000` (cents). For RTP, the maximum amount allowed by the network is $100,000",
                    "format": "int64"
                  },
                  "direction": {
                    "type": "string",
                    "description": "Describes the direction money is flowing in the transaction. A credit moves money from your account to someone else's. A debit pulls money from someone else's account to your own."
                  },
                  "originating_account": {
                    "type": "string"
                  },
                  "currency": {
                    "type": "string",
                    "description": "Must conform to ISO 4217. Defaults to the currency of the originating account."
                  },
                  "process_after": {
                    "type": "string",
                    "description": "If present, Modern Treasury will not [process](https://docs.moderntreasury.com/platform/reference/payment-orders) the payment until after this time. If `process_after` is past the [cutoff](https://docs.moderntreasury.com/platform/reference/ach-timings) for `effective_date`, `process_after` will take precedence and `effective_date` will automatically update to reflect the earliest possible sending date after `process_after`. Format is [ISO8601 timestamp](https://docs.moderntreasury.com/platform/reference/timestamps).",
                    "format": "date"
                  },
                  "effective_date": {
                    "type": "string",
                    "description": "Format is YYYY-MM-DD",
                    "format": "date"
                  },
                  "priority": {
                    "type": "string",
                    "description": "Either `normal` or `high`. For ACH and EFT payments, `high` represents a same-day ACH or EFT transfer, respectively. For check payments, `high` can mean an overnight check rather than standard mail."
                  },
                  "description": {
                    "type": "string",
                    "description": "An optional description for internal use."
                  },
                  "statement_descriptor": {
                    "type": "string",
                    "description": "An optional descriptor which will appear in the receiver's statement. For `check` payments this field will be used as the memo line. For `ach` the maximum length is 10 characters. Note that for ACH payments, the name on your bank account will be included automatically by the bank, so you can use the characters for other useful information. For `eft` the maximum length is 15 characters."
                  },
                  "remittance_information": {
                    "type": "string",
                    "description": "For `ach`, this field will be passed through on an addenda record. For `wire` payments the field will be passed through as the \"Originator to Beneficiary Information\", also known as OBI or Fedwire tag 6000."
                  },
                  "purpose": {
                    "type": "string",
                    "description": "For `wire`, this is usually the purpose which is transmitted via the \"InstrForDbtrAgt\" field in the ISO20022 file. If you are using Currencycloud, this is the `payment.purpose_code` field. For `eft`, this field is the 3 digit [CPA Code](https://www.tdcommercialbanking.com/wbb/help/English/wbwEFTCPACodes.html) that will be attached to the payment."
                  },
                  "line_items": {
                    "type": "array",
                    "description": "An array of line items that must sum up to the `amount` of the payment order. For more information see [Line Items](https://docs.moderntreasury.com/platform/reference/line-item-object)",
                    "items": {
                      "properties": {
                        "amount": {
                          "type": "integer",
                          "format": "int64"
                        },
                        "metadata": {
                          "type": "string",
                          "format": "json"
                        },
                        "description": {
                          "type": "string"
                        },
                        "accounting_category_id": {
                          "type": "string"
                        }
                      },
                      "type": "object"
                    }
                  },
                  "originating_party_name": {
                    "type": "string",
                    "description": "If present, this will replace your default company name on receiver's bank statement. This field can only be used for ACH payments currently.  For ACH, only the first 16 characters of this string will be used. Any additional characters will be truncated."
                  },
                  "ultimate_originating_party_name": {
                    "type": "string",
                    "description": "This represents the name of the person that the payment is on behalf of when using the CIE subtype for ACH payments.  Only the first 15 characters of this string will be used. Any additional characters will be truncated."
                  },
                  "ultimate_originating_party_identifier": {
                    "type": "string",
                    "description": "This represents the identifier by which the person is known to the receiver when using the CIE subtype for ACH payments.  Only the first 22 characters of this string will be used. Any additional characters will be truncated."
                  },
                  "charge_bearer": {
                    "type": "string",
                    "description": "The party that will pay the fees for the payment order. Read [Charge Bearer](https://docs.moderntreasury.com/payments/docs/charge-bearer) to learn more about possible values and how they get serialized"
                  },
                  "nsf_protected": {
                    "type": "boolean",
                    "description": "A boolean to determine if NSF Protection is enabled for this payment order. Note that this setting must also be turned on in your organization settings page."
                  },
                  "ledger_transaction": {
                    "type": "object",
                    "description": "The ledger transaction object which will be either created on the success of this API call if a ledger_transaction_id does not yet exist with this PO, or updated if it does. An update will happen atomically with the update on the PO.",
                    "properties": {
                      "description": {
                        "type": "string",
                        "description": "An optional free-form description for internal use. Maximum of 1000 characters allowed."
                      },
                      "metadata": {
                        "type": "string",
                        "description": "Metadata to be added to the ledger transaction. Must be a JSON object.",
                        "format": "json"
                      },
                      "effective_at": {
                        "type": "string",
                        "description": "Format: ISO8601 to 6 decimal places. Defaults to time of insertion in the DB if not provided",
                        "format": "date-time"
                      },
                      "ledger_entries": {
                        "type": "array",
                        "items": {
                          "properties": {
                            "amount": {
                              "type": "integer",
                              "description": "Supports any int value up to 10³⁶.",
                              "format": "int64"
                            },
                            "direction": {
                              "type": "string",
                              "description": "One of `credit` or `debit`."
                            },
                            "ledger_account_id": {
                              "type": "string"
                            },
                            "lock_version": {
                              "type": "integer",
                              "description": "Lock version of the ledger account. This can be passed when creating a ledger transaction to only succeed if no ledger transactions have posted since the given version. See [this guide](https://docs.moderntreasury.com/docs/handling-concurrency#using-the-lock_version-field) for more details.  This will trigger synchronous processing, which imposes an additional rate limit on the API.  See [Synchronous Ledger Entry Rate Limiting](https://docs.moderntreasury.com/docs/synchronous-ledger-entry-rate-limiting) for details.",
                              "format": "int64"
                            },
                            "pending_balance_amount": {
                              "type": "object",
                              "description": "Use \"gt\" (>), \"gte\" (>=), \"'lt\" (<), \"lte\" (<=), or \"eq\" (=) to lock on the account’s pending balance. If any of these conditions would be false after the transaction is created, the entire call will fail with error code 422. See [this guide](https://docs.moderntreasury.com/docs/handling-concurrency#locking-on-account-balance) for more details.  This will trigger synchronous processing, which imposes an additional rate limit on the API.  See [Synchronous Ledger Entry Rate Limiting](https://docs.moderntreasury.com/docs/synchronous-ledger-entry-rate-limiting) for details.",
                              "properties": {
                                "lt": {
                                  "type": "integer",
                                  "format": "int64"
                                },
                                "lte": {
                                  "type": "integer",
                                  "format": "int64"
                                },
                                "eq": {
                                  "type": "integer",
                                  "format": "int64"
                                },
                                "gte": {
                                  "type": "integer",
                                  "format": "int64"
                                },
                                "gt": {
                                  "type": "integer",
                                  "format": "int64"
                                },
                                "not_eq": {
                                  "type": "integer",
                                  "format": "int64"
                                }
                              }
                            },
                            "posted_balance_amount": {
                              "type": "object",
                              "description": "Use \"gt\" (>), \"gte\" (>=), \"'lt\" (<), \"lte\" (<=), or \"eq\" (=) to lock on the account’s posted balance. If any of these conditions would be false after the transaction is created, the entire call will fail with error code 422. See [this guide](https://docs.moderntreasury.com/docs/handling-concurrency#locking-on-account-balance) for more details.  This will trigger synchronous processing, which imposes an additional rate limit on the API.  See [Synchronous Ledger Entry Rate Limiting](https://docs.moderntreasury.com/docs/synchronous-ledger-entry-rate-limiting) for details.",
                              "properties": {
                                "lt": {
                                  "type": "integer",
                                  "format": "int64"
                                },
                                "lte": {
                                  "type": "integer",
                                  "format": "int64"
                                },
                                "eq": {
                                  "type": "integer",
                                  "format": "int64"
                                },
                                "gte": {
                                  "type": "integer",
                                  "format": "int64"
                                },
                                "gt": {
                                  "type": "integer",
                                  "format": "int64"
                                },
                                "not_eq": {
                                  "type": "integer",
                                  "format": "int64"
                                }
                              }
                            },
                            "available_balance_amount": {
                              "type": "object",
                              "description": "Use \"gt\" (>), \"gte\" (>=), \"'lt\" (<), \"lte\" (<=), or \"eq\" (=) to lock on the account’s available balance. If any of these conditions would be false after the transaction is created, the entire call will fail with error code 422. See [this guide](https://docs.moderntreasury.com/docs/handling-concurrency#locking-on-account-balance) for more details.  This will trigger synchronous processing, which imposes an additional rate limit on the API.  See [Synchronous Ledger Entry Rate Limiting](https://docs.moderntreasury.com/docs/synchronous-ledger-entry-rate-limiting) for details.",
                              "properties": {
                                "lt": {
                                  "type": "integer",
                                  "format": "int64"
                                },
                                "lte": {
                                  "type": "integer",
                                  "format": "int64"
                                },
                                "eq": {
                                  "type": "integer",
                                  "format": "int64"
                                },
                                "gte": {
                                  "type": "integer",
                                  "format": "int64"
                                },
                                "gt": {
                                  "type": "integer",
                                  "format": "int64"
                                },
                                "not_eq": {
                                  "type": "integer",
                                  "format": "int64"
                                }
                              }
                            },
                            "show_resulting_ledger_account_balances": {
                              "type": "boolean",
                              "description": "If true, response will include the balance of the associated ledger account for the entry and will trigger synchronous processing, which imposes an additional rate limit on the API.  See [Synchronous Ledger Entry Rate Limiting](https://docs.moderntreasury.com/docs/synchronous-ledger-entry-rate-limiting) for details."
                            },
                            "metadata": {
                              "type": "string",
                              "format": "json"
                            }
                          },
                          "required": [
                            "amount",
                            "direction",
                            "ledger_account_id"
                          ],
                          "type": "object"
                        }
                      }
                    }
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