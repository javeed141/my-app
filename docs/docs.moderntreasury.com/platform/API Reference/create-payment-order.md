# Create Payment Order

Create a new Payment Order

See [Payment Orders](https://docs.moderntreasury.com/platform/reference/payment-order-object)  for detailed information on each field.

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
    "/payment_orders": {
      "post": {
        "summary": "Create Payment Order",
        "description": "Create a new Payment Order",
        "operationId": "create-payment-order",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "type",
                  "amount",
                  "direction",
                  "originating_account_id"
                ],
                "properties": {
                  "type": {
                    "type": "string",
                    "description": "Select type from the list at [Payment Orders](https://docs.moderntreasury.com/platform/reference/payment-order-object)"
                  },
                  "fallback_type": {
                    "type": "string",
                    "description": "The payment type used to create the payment order if the original `type` is not valid for the receiving account. Currently, this only supports falling back from RTP to ACH (`type=rtp` and `fallback_type=ach`)"
                  },
                  "subtype": {
                    "type": "string",
                    "description": "An additional layer of classification for the type of payment order you are doing. This field is only used for ach and cross_border payment orders currently. Select subtype from the list at [Payment Orders](https://docs.moderntreasury.com/platform/reference/payment-order-object)"
                  },
                  "amount": {
                    "type": "integer",
                    "description": "Value in specified currency's smallest unit. e.g. $10 would be represented as `1000` (cents), and ¥10 would be represented as `10`. Network and bank limits may apply.",
                    "format": "int64"
                  },
                  "direction": {
                    "type": "string",
                    "description": "Describes the direction money is flowing in the transaction. A `credit` moves money from your account to someone else's. A `debit` pulls money from someone else's account to your own."
                  },
                  "originating_account_id": {
                    "type": "string",
                    "description": "The ID of one of your organization's [internal accounts](https://docs.moderntreasury.com/platform/reference/internal-account-object)"
                  },
                  "receiving_account_id": {
                    "type": "string",
                    "description": "Either `receiving_account` or `receiving_account_id` must be present. When using `receiving_account_id`, you may pass the id of an external account or an internal account."
                  },
                  "receiving_account": {
                    "type": "object",
                    "description": "Either `receiving_account` or `receiving_account_id` must be present. When using `receiving_account_id`, you may pass the id of an external account or an internal account.",
                    "properties": {
                      "account_type": {
                        "type": "string"
                      },
                      "party_name": {
                        "type": "string"
                      },
                      "party_type": {
                        "type": "string"
                      },
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
                      "account_details": {
                        "type": "array",
                        "items": {
                          "properties": {
                            "account_number": {
                              "type": "string"
                            },
                            "account_number_type": {
                              "type": "string"
                            }
                          },
                          "required": [
                            "account_number"
                          ],
                          "type": "object"
                        }
                      },
                      "routing_details": {
                        "type": "array",
                        "items": {
                          "properties": {
                            "routing_number": {
                              "type": "string"
                            },
                            "routing_number_type": {
                              "type": "string"
                            },
                            "payment_type": {
                              "type": "string"
                            }
                          },
                          "required": [
                            "routing_number",
                            "routing_number_type"
                          ],
                          "type": "object"
                        }
                      },
                      "plaid_processor_token": {
                        "type": "string",
                        "description": "If you've enabled the Modern Treasury + Plaid integration in your Plaid account, you can pass the processor token in this field."
                      }
                    }
                  },
                  "ledger_transaction": {
                    "type": "object",
                    "description": "Specifies a [ledger transaction](https://docs.moderntreasury.com/platform/reference/ledger-transaction-object) object that will be created with the payment order. If the ledger transaction cannot be created, then the payment order creation will fail. The resulting ledger transaction will mirror the status of the payment order. See [Linking to other Modern Treasury objects](https://docs.moderntreasury.com/platform/docs/linking-to-other-modern-treasury-objects).",
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
                  "ledger_transaction_id": {
                    "type": "string",
                    "description": "Specifies the ID of a [ledger transaction](https://docs.moderntreasury.com/platform/reference/ledger-transaction-object) that will be linked to the payment order. If the payment order status and ledger transaction status do not match, the payment order creation will fail. The resulting ledger transaction will mirror the status of the payment order. See [Linking to other Modern Treasury objects](https://docs.moderntreasury.com/platform/docs/linking-to-other-modern-treasury-objects)."
                  },
                  "currency": {
                    "type": "string",
                    "description": "Must conform to ISO 4217. Defaults to the currency of the originating account. For currency conversions, this must be the target currency."
                  },
                  "process_after": {
                    "type": "string",
                    "description": "If present, Modern Treasury will not [process](https://docs.moderntreasury.com/platform/reference/payment-orders) the payment until after this time. If `process_after` is past the [cutoff](https://docs.moderntreasury.com/platform/reference/ach-timings) for `effective_date`, `process_after` will take precedence and `effective_date` will automatically update to reflect the earliest possible sending date after `process_after`. Format is [ISO8601 timestamp](https://docs.moderntreasury.com/platform/reference/timestamps). Please reach out to your Customer Success team to determine if your bank connections support this feature.  ",
                    "format": "date"
                  },
                  "effective_date": {
                    "type": "string",
                    "description": "Date transactions are to be posted to the participants’ account. Defaults to the current business day or the next business day if the current day is a bank holiday or weekend.  Format: yyyy-mm-dd",
                    "format": "date"
                  },
                  "priority": {
                    "type": "string",
                    "description": "Either `normal` or `high`.  `high` priority is only available for `ach`, `eft`, and `check` payment types.  For ACH and EFT payments, `high` represents a same-day transfer. For check payments, `high` can mean an overnight check rather than standard mail. For all other payment types, `high` priority payments are treated the same as `normal` priority payments."
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
                    "description": "For `ach`, this field will be passed through on an addenda record. For `wire` payments, this field will be passed through as the \"Originator to Beneficiary Information\", also known as OBI or Fedwire tag 6000. For `rtp` payments, this field will be included on the recipient's transaction."
                  },
                  "purpose": {
                    "type": "string",
                    "description": "For `wire`, this is usually the purpose which is transmitted via the \"InstrForDbtrAgt\" field in the ISO20022 file. If you are using Currencycloud, this is the `payment.purpose_code` field. For `eft`, this field is required and is the 3 digit [CPA Code](https://www.tdcommercialbanking.com/wbb/help/English/wbwEFTCPACodes.html) that will be attached to the payment."
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
                  "metadata": {
                    "type": "string",
                    "description": "Additional data represented as key-value pairs. Both the key and value must be strings. See [Metadata](https://docs.moderntreasury.com/platform/reference/metadata).",
                    "format": "json"
                  },
                  "charge_bearer": {
                    "type": "string",
                    "description": "The party that will pay the fees for the payment order. Read [Charge Bearer](https://docs.moderntreasury.com/payments/docs/charge-bearer) to learn more about possible values and how they get serialized"
                  },
                  "foreign_exchange_indicator": {
                    "type": "string",
                    "description": "Indicates the type of FX transfer to initiate, can be either `variable_to_fixed`, `fixed_to_variable`, or `null` if the payment order currency matches the originating account currency."
                  },
                  "foreign_exchange_contract": {
                    "type": "string",
                    "description": "If present, indicates a specific foreign exchange contract number that has been generated by your financial institution."
                  },
                  "nsf_protected": {
                    "type": "boolean",
                    "description": "**Default:** `false`<br /> <br />A boolean to determine if NSF Protection is enabled for this payment order.<br /><br />**Note:** This setting must also be turned on in your organization settings page and enabled per payment order.",
                    "default": false
                  },
                  "originating_party_name": {
                    "type": "string",
                    "description": "If present, this will replace your default company name on receiver's bank statement. Banks may institute maximum character lengths for different payment types. Characters above this limit may be truncated."
                  },
                  "ultimate_originating_account_id": {
                    "type": "string",
                    "description": "The id of the account to which the origination of this payment should be attributed to. You may pass the id of a virtual account or an internal account."
                  },
                  "ultimate_originating_party_name": {
                    "type": "string",
                    "description": "Name of the ultimate originator of the payment order."
                  },
                  "ultimate_originating_party_identifier": {
                    "type": "string",
                    "description": "Identifier of the ultimate originator of the payment order."
                  },
                  "ultimate_originating_party_address": {
                    "type": "object",
                    "description": "Address of the ultimate originator of the payment order.",
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
                  "ultimate_receiving_party_name": {
                    "type": "string",
                    "description": "Name of the ultimate funds recipient."
                  },
                  "ultimate_receiving_party_identifier": {
                    "type": "string",
                    "description": "Identifier of the ultimate funds recipient."
                  },
                  "documents": {
                    "type": "array",
                    "description": "An array of documents to be attached to the payment order. Note that if you attach documents, the request's content type must be `multipart/form-data`",
                    "items": {
                      "properties": {
                        "file": {
                          "type": "string",
                          "format": "binary"
                        },
                        "document_type": {
                          "type": "string"
                        }
                      },
                      "required": [
                        "file"
                      ],
                      "type": "object"
                    }
                  },
                  "send_remittance_advice": {
                    "type": "boolean",
                    "description": "If `true`, an email will be sent to the counterparty when the payment order is sent to the bank. If `false`, the email will not be sent. If `null`, `send_remittance_advice` on the [Counterparty](https://docs.moderntreasury.com/platform/reference/counterparty-object) will be used to determine whether the email is sent.."
                  },
                  "expires_at": {
                    "type": "string",
                    "description": "RFP payments require an expires_at. This value must be past the effective_date.",
                    "format": "date-time"
                  },
                  "vendor_attributes": {
                    "type": "string",
                    "description": "Additional vendor specific fields for this payment. Data must be represented as key-value pairs. Please contact our support team (help@moderntreasury.com) for a list of supported attributes.",
                    "format": "json"
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
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n  \"id\": \"c5f4009c-bdd6-4cc1-84b2-17974ac9e77a\",\n  \"type\": \"ach\",\n  \"amount\": 20000,\n  \"direction\": \"credit\",\n  \"originating_account_id\": \"0f8e3719-3dfd-4613-9bbf-c0333781b59f\",\n  \"receiving_account\": {\n    \"id\": \"5acec2ef-987b-4260-aa97-b719eeb0a8d5\",\n    \"account_type\": \"checking\",\n    \"party_name\": \"John Smith\",\n    \"party_type\": \"business\",\n    \"party_address\": null,\n    \"account_details\": [\n      {\n        \"id\": \"81a7cd32-39f5-4f0c-873f-4d9137ec9cd9\",\n        \"account_number_safe\": \"1291\",\n        \"account_number_type\": null\n      }\n    ],\n    \"routing_details\": [\n      {\n        \"id\": \"5ceb251f-0235-48a2-81cb-0c668f5ee81b\",\n        \"payment_type\": null,\n        \"routing_number\": \"121141822\",\n        \"routing_number_type\": \"aba\"\n      }\n    ]\n  },\n  \"receiving_account_id\": \"5acec2ef-987b-4260-aa97-b719eeb0a8d5\",\n  \"receiving_account_type\": \"external_account\",\n  \"accounting_category_id\": \"45ac4565-2302-41c9-962a-1a9d7e85db99\",\n  \"accounting_ledger_class_id\": \"d59c3d5c-bcf9-4efb-8a0a-46a5f4394028\",\n  \"currency\": \"USD\",\n  \"ledger_transaction_id\": null,\n  \"effective_date\": \"2018-11-08\",\n  \"priority\": \"normal\",\n  \"description\": \"Repellendus deleniti atque quod.\",\n  \"statement_descriptor\": \"Rerum del.\",\n  \"remittance_information\": \"Accusamus tempore molestiae laboriosam.\",\n  \"metadata\": {},\n  \"status\": \"approved\",\n  \"counterparty_id\": \"37ba4454-dd33-4aa0-8906-0e2e4103e45c\",\n  \"transaction_ids\": [],\n  \"current_return\": null,\n  \"charge_bearer\": null,\n  \"foreign_exchange_indicator\": null,\n  \"foreign_exchange_contract\": null,\n  \"send_remittance_advice\": true,\n  \"nsf_protected\": false,\n  \"transaction_monitoring_enabled\": false,\n  \"originating_party_name\": \"Acme Company\",\n  \"ultimate_originating_party_name\": \"Jane Doe\",\n  \"ultimate_originating_party_identifier\": \"A1823N\",\n  \"ultimate_receiving_party_name\": \"John Smith\",\n  \"ultimate_receiving_party_identifier\": \"A8738N\",\n  \"live_mode\": \"true\",\n  \"created_at\": \"2019-11-09T00:11:07Z\",\n  \"updated_at\": \"2019-11-09T00:11:07Z\"\n}\n"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "example": "c5f4009c-bdd6-4cc1-84b2-17974ac9e77a"
                    },
                    "type": {
                      "type": "string",
                      "example": "ach"
                    },
                    "amount": {
                      "type": "integer",
                      "example": 20000,
                      "default": 0
                    },
                    "direction": {
                      "type": "string",
                      "example": "credit"
                    },
                    "originating_account_id": {
                      "type": "string",
                      "example": "0f8e3719-3dfd-4613-9bbf-c0333781b59f"
                    },
                    "receiving_account": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "string",
                          "example": "5acec2ef-987b-4260-aa97-b719eeb0a8d5"
                        },
                        "account_type": {
                          "type": "string",
                          "example": "checking"
                        },
                        "party_name": {
                          "type": "string",
                          "example": "John Smith"
                        },
                        "party_type": {
                          "type": "string",
                          "example": "business"
                        },
                        "party_address": {},
                        "account_details": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "id": {
                                "type": "string",
                                "example": "81a7cd32-39f5-4f0c-873f-4d9137ec9cd9"
                              },
                              "account_number_safe": {
                                "type": "string",
                                "example": "1291"
                              },
                              "account_number_type": {}
                            }
                          }
                        },
                        "routing_details": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "id": {
                                "type": "string",
                                "example": "5ceb251f-0235-48a2-81cb-0c668f5ee81b"
                              },
                              "payment_type": {},
                              "routing_number": {
                                "type": "string",
                                "example": "121141822"
                              },
                              "routing_number_type": {
                                "type": "string",
                                "example": "aba"
                              }
                            }
                          }
                        }
                      }
                    },
                    "receiving_account_id": {
                      "type": "string",
                      "example": "5acec2ef-987b-4260-aa97-b719eeb0a8d5"
                    },
                    "receiving_account_type": {
                      "type": "string",
                      "example": "external_account"
                    },
                    "accounting_category_id": {
                      "type": "string",
                      "example": "45ac4565-2302-41c9-962a-1a9d7e85db99"
                    },
                    "accounting_ledger_class_id": {
                      "type": "string",
                      "example": "d59c3d5c-bcf9-4efb-8a0a-46a5f4394028"
                    },
                    "currency": {
                      "type": "string",
                      "example": "USD"
                    },
                    "ledger_transaction_id": {},
                    "effective_date": {
                      "type": "string",
                      "example": "2018-11-08"
                    },
                    "priority": {
                      "type": "string",
                      "example": "normal"
                    },
                    "description": {
                      "type": "string",
                      "example": "Repellendus deleniti atque quod."
                    },
                    "statement_descriptor": {
                      "type": "string",
                      "example": "Rerum del."
                    },
                    "remittance_information": {
                      "type": "string",
                      "example": "Accusamus tempore molestiae laboriosam."
                    },
                    "metadata": {
                      "type": "object",
                      "properties": {}
                    },
                    "status": {
                      "type": "string",
                      "example": "approved"
                    },
                    "counterparty_id": {
                      "type": "string",
                      "example": "37ba4454-dd33-4aa0-8906-0e2e4103e45c"
                    },
                    "transaction_ids": {
                      "type": "array"
                    },
                    "current_return": {},
                    "charge_bearer": {},
                    "foreign_exchange_indicator": {},
                    "foreign_exchange_contract": {},
                    "send_remittance_advice": {
                      "type": "boolean",
                      "example": true,
                      "default": true
                    },
                    "nsf_protected": {
                      "type": "boolean",
                      "example": false,
                      "default": true
                    },
                    "transaction_monitoring_enabled": {
                      "type": "boolean",
                      "example": false,
                      "default": true
                    },
                    "originating_party_name": {
                      "type": "string",
                      "example": "Acme Company"
                    },
                    "ultimate_originating_party_name": {
                      "type": "string",
                      "example": "Jane Doe"
                    },
                    "ultimate_originating_party_identifier": {
                      "type": "string",
                      "example": "A1823N"
                    },
                    "ultimate_receiving_party_name": {
                      "type": "string",
                      "example": "John Smith"
                    },
                    "ultimate_receiving_party_identifier": {
                      "type": "string",
                      "example": "A8738N"
                    },
                    "live_mode": {
                      "type": "string",
                      "example": "true"
                    },
                    "created_at": {
                      "type": "string",
                      "example": "2019-11-09T00:11:07Z"
                    },
                    "updated_at": {
                      "type": "string",
                      "example": "2019-11-09T00:11:07Z"
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