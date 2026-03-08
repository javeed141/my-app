# Create Virtual Account

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
    "/virtual_accounts": {
      "post": {
        "summary": "Create Virtual Account",
        "description": "",
        "operationId": "create-virtual-account",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "name",
                  "internal_account_id"
                ],
                "properties": {
                  "name": {
                    "type": "string"
                  },
                  "internal_account_id": {
                    "type": "string"
                  },
                  "credit_ledger_account_id": {
                    "type": "string",
                    "description": "This field is deprecated and replaced by `ledger_account_id`."
                  },
                  "debit_ledger_account_id": {
                    "type": "string",
                    "description": "This field has been deprecated and replaced by the `ledger_account_id` of the [Internal Account](https://docs.moderntreasury.com/platform/reference/internal-account-object)."
                  },
                  "ledger_account": {
                    "type": "object",
                    "required": [
                      "name",
                      "currency",
                      "normal_balance",
                      "ledger_id"
                    ],
                    "properties": {
                      "name": {
                        "type": "string",
                        "description": "The name of the ledger account. Maximum of 1000 characters allowed."
                      },
                      "description": {
                        "type": "string",
                        "description": "An optional free-form description for internal use. Maximum of 1000 characters allowed."
                      },
                      "currency": {
                        "type": "string"
                      },
                      "currency_exponent": {
                        "type": "integer",
                        "description": "Must be included if currency is a custom currency. The currency_exponent cannot exceed 30.",
                        "format": "int32"
                      },
                      "normal_balance": {
                        "type": "string",
                        "description": "One of `credit`, `debit`"
                      },
                      "ledger_id": {
                        "type": "string"
                      },
                      "metadata": {
                        "type": "string",
                        "description": "Metadata to be added to the ledger account. Must be a JSON object.",
                        "format": "json"
                      }
                    }
                  },
                  "counterparty_id": {
                    "type": "string"
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
                  "description": {
                    "type": "string"
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
        "responses": {
          "201": {
            "description": "201",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n  \"id\": \"2e0296c1-1daf-4b3e-954d-fb9ec7be56f6\",\n  \"object\": \"virtual_account\",\n  \"name\": \"Funds on behalf of Alice Jones\",\n  \"description\": null,\n  \"active\": true,\n  \"counterparty_id\": null,\n  \"internal_account_id\": \"c743edb7-4059-496a-94b8-06fc081156fd\",\n  \"debit_ledger_account_id\": \"f5cc945c-ac46-4f05-b96b-f13f9c6a1cdd\",\n  \"credit_ledger_account_id\": \"c39d893d-4944-419e-816e-1266387f2ec5\",\n  \"account_details\": [\n    {\n      \"id\": \"5668c0cf-972d-49c6-970f-b32591f3e8a6\",\n      \"object\": \"account_detail\",\n      \"account_number_safe\": \"0001\",\n      \"account_number_type\": \"other\"\n    }\n  ],\n    \"routing_details\": [\n    {\n      \"id\":\"5ceb251f-0235-48a2-81cb-0c668f5ee81b\",\n      \"object\": \"routing_detail\",\n      \"payment_type\": null,\n      \"routing_number\": \"121141822\",\n      \"routing_number_type\": \"aba\",\n      \"bank_name\": \"BANK OF AMERICA CALIFORNIA, NA\",\n      \"bank_address\": {\n        \"id\": \"2f1e12dd-de80-44aa-92cd-f0e4101b8e54\",\n        \"object\": \"address\",\n        \"line1\": \"PO BOX 27025\",\n        \"line2\": null,\n        \"locality\": \"RICHMOND\",\n        \"region\": \"VA\",\n        \"postal_code\": \"23261-7025\",\n        \"country\": \"US\",\n        \"live_mode\": true,\n        \"created_at\": \"2019-11-09T00:11:07Z\",\n        \"updated_at\": \"2019-11-09T00:11:07Z\"\n      },\n      \"live_mode\": true,      \n      \"created_at\": \"2019-11-09T00:11:07Z\",\n      \"updated_at\": \"2019-11-09T00:11:07Z\"\n    }\n  ],\n  \"metadata\": {},\n  \"live_mode\": true,\n  \"created_at\": \"2020-11-09T00:11:07Z\",\n  \"updated_at\": \"2020-11-09T00:11:07Z\"\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "example": "2e0296c1-1daf-4b3e-954d-fb9ec7be56f6"
                    },
                    "object": {
                      "type": "string",
                      "example": "virtual_account"
                    },
                    "name": {
                      "type": "string",
                      "example": "Funds on behalf of Alice Jones"
                    },
                    "description": {},
                    "active": {
                      "type": "boolean",
                      "example": true,
                      "default": true
                    },
                    "counterparty_id": {},
                    "internal_account_id": {
                      "type": "string",
                      "example": "c743edb7-4059-496a-94b8-06fc081156fd"
                    },
                    "debit_ledger_account_id": {
                      "type": "string",
                      "example": "f5cc945c-ac46-4f05-b96b-f13f9c6a1cdd"
                    },
                    "credit_ledger_account_id": {
                      "type": "string",
                      "example": "c39d893d-4944-419e-816e-1266387f2ec5"
                    },
                    "account_details": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "string",
                            "example": "5668c0cf-972d-49c6-970f-b32591f3e8a6"
                          },
                          "object": {
                            "type": "string",
                            "example": "account_detail"
                          },
                          "account_number_safe": {
                            "type": "string",
                            "example": "0001"
                          },
                          "account_number_type": {
                            "type": "string",
                            "example": "other"
                          }
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
                          "object": {
                            "type": "string",
                            "example": "routing_detail"
                          },
                          "payment_type": {},
                          "routing_number": {
                            "type": "string",
                            "example": "121141822"
                          },
                          "routing_number_type": {
                            "type": "string",
                            "example": "aba"
                          },
                          "bank_name": {
                            "type": "string",
                            "example": "BANK OF AMERICA CALIFORNIA, NA"
                          },
                          "bank_address": {
                            "type": "object",
                            "properties": {
                              "id": {
                                "type": "string",
                                "example": "2f1e12dd-de80-44aa-92cd-f0e4101b8e54"
                              },
                              "object": {
                                "type": "string",
                                "example": "address"
                              },
                              "line1": {
                                "type": "string",
                                "example": "PO BOX 27025"
                              },
                              "line2": {},
                              "locality": {
                                "type": "string",
                                "example": "RICHMOND"
                              },
                              "region": {
                                "type": "string",
                                "example": "VA"
                              },
                              "postal_code": {
                                "type": "string",
                                "example": "23261-7025"
                              },
                              "country": {
                                "type": "string",
                                "example": "US"
                              },
                              "live_mode": {
                                "type": "boolean",
                                "example": true,
                                "default": true
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
                          },
                          "live_mode": {
                            "type": "boolean",
                            "example": true,
                            "default": true
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
                    },
                    "metadata": {
                      "type": "object",
                      "properties": {}
                    },
                    "live_mode": {
                      "type": "boolean",
                      "example": true,
                      "default": true
                    },
                    "created_at": {
                      "type": "string",
                      "example": "2020-11-09T00:11:07Z"
                    },
                    "updated_at": {
                      "type": "string",
                      "example": "2020-11-09T00:11:07Z"
                    }
                  }
                }
              }
            }
          },
          "422": {
            "description": "422",
            "content": {
              "application/json": {
                "examples": {
                  "Virtual account number already used": {
                    "value": "{\n    \"errors\": {\n        \"code\": \"parameter_invalid\",\n        \"message\": \"The virtual account cannot be created because one or more account numbers has already been allocated to an existing virtual account.\",\n        \"parameter\": \"account_details\"\n    }\n}\n"
                  },
                  "Missing credit ledger account": {
                    "value": "{\n    \"errors\": {\n        \"code\": \"parameter_invalid\",\n        \"message\": \"The virtual account cannot be created without a corresponding ledger account to credit. You can also choose to not provide any ledger accounts.\",\n        \"parameter\": \"credit_ledger_account\"\n    }\n}\n"
                  },
                  "Missing debit ledger account": {
                    "value": "{\n    \"errors\": {\n        \"code\": \"parameter_invalid\",\n        \"message\": \"The virtual account cannot be created without a corresponding ledger account to debit. You can also choose to not provide any ledger accounts.\",\n        \"parameter\": \"debit_ledger_account\"\n    }\n}\n"
                  },
                  "Missing virtual account number": {
                    "value": "{\n    \"errors\": {\n        \"code\": \"parameter_invalid\",\n        \"message\": \" virtual account cannot be created because it requires at least one account detail of type `other`.\",\n        \"parameter\": \"account_details\"\n    }\n}\n"
                  }
                },
                "schema": {
                  "oneOf": [
                    {
                      "title": "Virtual account number already used",
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
                              "example": "The virtual account cannot be created because one or more account numbers has already been allocated to an existing virtual account."
                            },
                            "parameter": {
                              "type": "string",
                              "example": "account_details"
                            }
                          }
                        }
                      }
                    },
                    {
                      "title": "Missing credit ledger account",
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
                              "example": "The virtual account cannot be created without a corresponding ledger account to credit. You can also choose to not provide any ledger accounts."
                            },
                            "parameter": {
                              "type": "string",
                              "example": "credit_ledger_account"
                            }
                          }
                        }
                      }
                    },
                    {
                      "title": "Missing debit ledger account",
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
                              "example": "The virtual account cannot be created without a corresponding ledger account to debit. You can also choose to not provide any ledger accounts."
                            },
                            "parameter": {
                              "type": "string",
                              "example": "debit_ledger_account"
                            }
                          }
                        }
                      }
                    },
                    {
                      "title": "Missing virtual account number",
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
                              "example": " virtual account cannot be created because it requires at least one account detail of type `other`."
                            },
                            "parameter": {
                              "type": "string",
                              "example": "account_details"
                            }
                          }
                        }
                      }
                    }
                  ]
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