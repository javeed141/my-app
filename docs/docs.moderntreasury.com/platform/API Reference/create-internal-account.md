# Create Internal Account

This endpoint enables you to create a new internal account, which can represent a bank account or a wallet. Internal Accounts can be used to originate payment orders and receive inbound payments. Please note that if you are bringing your own bank, this endpoint may not be supported for your bank.

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
    "/internal_accounts": {
      "post": {
        "summary": "Create Internal Account",
        "description": "We currently support creating internal accounts within the sandbox environment and at a limited number of banks. Please check to see if you have permissions to do so.",
        "operationId": "create-internal-account",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "name",
                  "party_name",
                  "currency"
                ],
                "properties": {
                  "connection_id": {
                    "type": "string",
                    "description": "The UUID of the `Connection` this account should be associated with. If you only have 1 connection, you do not need to supply this field. "
                  },
                  "name": {
                    "type": "string",
                    "description": "The name of the account."
                  },
                  "party_name": {
                    "type": "string",
                    "description": "The legal name on the account."
                  },
                  "currency": {
                    "type": "string",
                    "description": "Follow ISO 4217 currency codes"
                  },
                  "parent_account_id": {
                    "type": "string",
                    "description": "The UUID of the parent `InternalAccount` this account should be a child of. This field should only be set if you are creating balance-holding virtual accounts at your bank. **Currently not available in sandbox.**"
                  },
                  "counterparty_id": {
                    "type": "string",
                    "description": "The UUID of the `Counterparty` that this account refers to. This field should only be set for nested internal accounts that have a `parent_account_id` specified."
                  },
                  "metadata": {
                    "type": "string",
                    "description": "Set of key-value pairs that will be attached to the object and can be used to store additional data.",
                    "format": "json"
                  },
                  "party_address": {
                    "type": "object",
                    "description": "The address associated with the owner or null.",
                    "required": [
                      "line1",
                      "locality",
                      "region",
                      "postal_code",
                      "country"
                    ],
                    "properties": {
                      "line1": {
                        "type": "string"
                      },
                      "line2": {
                        "type": "string"
                      },
                      "locality": {
                        "type": "string",
                        "description": "Locality or City."
                      },
                      "region": {
                        "type": "string",
                        "description": "Region or State."
                      },
                      "postal_code": {
                        "type": "string",
                        "description": "The postal code of the address."
                      },
                      "country": {
                        "type": "string",
                        "description": "Country code conforms to [ISO 3166-1 alpha-2]"
                      }
                    }
                  },
                  "legal_entity_id": {
                    "type": "string",
                    "description": "The Legal Entity associated to this account."
                  },
                  "account_capabilities": {
                    "type": "array",
                    "description": "An array of objects containing payment originator identifiers tied to the payment type and direction for the account.",
                    "items": {
                      "properties": {
                        "direction": {
                          "type": "string",
                          "description": "The direction of the capability",
                          "enum": [
                            "\"debit\"",
                            "\"credit\""
                          ]
                        },
                        "identifier": {
                          "type": "string",
                          "description": "A unique reference assigned by your bank for tracking and recognizing payment files. It is important this is formatted exactly how the bank assigned it."
                        },
                        "payment_type": {
                          "type": "string",
                          "description": "Select type from the list at [Payment Orders](https://docs.moderntreasury.com/platform/reference/payment-order-object)"
                        }
                      },
                      "type": "object"
                    }
                  },
                  "vendor_attributes": {
                    "type": "string",
                    "description": "Vendor specific attributes. Required for a limited number of banks.",
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
                  "Created": {
                    "value": "{\n    \"id\": \"3389fcaa-78ad-4656-988a-e3b6f2b05529\",\n    \"object\": \"internal_account\",\n    \"live_mode\": false,\n    \"account_type\": null,\n    \"party_name\": \"Modern Treasury\",\n    \"party_type\": null,\n    \"party_address\": {\n        \"id\": \"d71521e9-6c54-41e3-97fb-5e43bdba7e5a\",\n        \"object\": \"address\",\n        \"live_mode\": false,\n        \"line1\": \"3450 Tremblay Shoal\",\n        \"line2\": \"Suite 155\",\n        \"locality\": \"North Shantae\",\n        \"region\": \"OR\",\n        \"postal_code\": \"13671\",\n        \"country\": \"US\",\n        \"created_at\": \"2021-12-21T15:06:39Z\",\n        \"updated_at\": \"2021-12-21T15:06:39Z\"\n    },\n    \"account_details\": [\n        {\n            \"id\": \"14758ea7-4082-4760-8c82-ad88964869e2\",\n            \"object\": \"account_detail\",\n            \"live_mode\": false,\n            \"account_number_safe\": \"6418\",\n            \"account_number_type\": \"other\",\n            \"discarded_at\": null,\n            \"created_at\": \"2021-12-21T15:06:39Z\",\n            \"updated_at\": \"2021-12-21T15:06:39Z\"\n        }\n    ],\n    \"routing_details\": [\n        {\n            \"id\": \"4860c76a-752d-43ac-ae4f-a1cdb5e8078f\",\n            \"object\": \"routing_detail\",\n            \"live_mode\": false,\n            \"payment_type\": null,\n            \"routing_number\": \"021000021\",\n            \"routing_number_type\": \"aba\",\n            \"bank_name\": \"JPMorgan Chase Bank, National Association\",\n            \"bank_address\": {\n                \"id\": \"8fd2389e-0678-4a42-8ec0-27919c894a85\",\n                \"object\": \"address\",\n                \"live_mode\": false,\n                \"line1\": \"1111 Polaris Pkwy\",\n                \"line2\": null,\n                \"locality\": \"Columbus\",\n                \"region\": \"OH\",\n                \"postal_code\": \"43240\",\n                \"country\": \"US\",\n                \"created_at\": \"2021-12-21T15:06:39Z\",\n                \"updated_at\": \"2021-12-21T15:06:39Z\"\n            },\n            \"discarded_at\": null,\n            \"created_at\": \"2021-12-21T15:06:39Z\",\n            \"updated_at\": \"2021-12-21T15:06:39Z\"\n        }\n    ],\n    \"name\": \"Bookings\",\n    \"metadata\": {},\n    \"connection\": {\n        \"id\": \"dac94e63-9f4a-46b9-ba6b-412acfbf4cc1\",\n        \"object\": \"connection\",\n        \"live_mode\": false,\n        \"vendor_id\": \"example1\",\n        \"vendor_name\": \"Gringotts Wizarding Bank\",\n        \"vendor_customer_id\": null,\n        \"discarded_at\": null,\n        \"created_at\": \"2018-07-24T23:43:49Z\",\n        \"updated_at\": \"2018-07-24T23:43:49Z\"\n    },\n    \"currency\": \"USD\",\n    \"parent_account_id\": \"2bb73f51-7ca2-4710-94f8-938f26c096a9\",\n    \"counterparty_id\": \"8646ad4a-f582-454f-9928-148dcb445995\",\n    \"created_at\": \"2021-12-21T15:06:39Z\",\n    \"updated_at\": \"2021-12-21T15:06:39Z\"\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "example": "3389fcaa-78ad-4656-988a-e3b6f2b05529"
                    },
                    "object": {
                      "type": "string",
                      "example": "internal_account"
                    },
                    "live_mode": {
                      "type": "boolean",
                      "example": false,
                      "default": true
                    },
                    "account_type": {},
                    "party_name": {
                      "type": "string",
                      "example": "Modern Treasury"
                    },
                    "party_type": {},
                    "party_address": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "string",
                          "example": "d71521e9-6c54-41e3-97fb-5e43bdba7e5a"
                        },
                        "object": {
                          "type": "string",
                          "example": "address"
                        },
                        "live_mode": {
                          "type": "boolean",
                          "example": false,
                          "default": true
                        },
                        "line1": {
                          "type": "string",
                          "example": "3450 Tremblay Shoal"
                        },
                        "line2": {
                          "type": "string",
                          "example": "Suite 155"
                        },
                        "locality": {
                          "type": "string",
                          "example": "North Shantae"
                        },
                        "region": {
                          "type": "string",
                          "example": "OR"
                        },
                        "postal_code": {
                          "type": "string",
                          "example": "13671"
                        },
                        "country": {
                          "type": "string",
                          "example": "US"
                        },
                        "created_at": {
                          "type": "string",
                          "example": "2021-12-21T15:06:39Z"
                        },
                        "updated_at": {
                          "type": "string",
                          "example": "2021-12-21T15:06:39Z"
                        }
                      }
                    },
                    "account_details": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "string",
                            "example": "14758ea7-4082-4760-8c82-ad88964869e2"
                          },
                          "object": {
                            "type": "string",
                            "example": "account_detail"
                          },
                          "live_mode": {
                            "type": "boolean",
                            "example": false,
                            "default": true
                          },
                          "account_number_safe": {
                            "type": "string",
                            "example": "6418"
                          },
                          "account_number_type": {
                            "type": "string",
                            "example": "other"
                          },
                          "discarded_at": {},
                          "created_at": {
                            "type": "string",
                            "example": "2021-12-21T15:06:39Z"
                          },
                          "updated_at": {
                            "type": "string",
                            "example": "2021-12-21T15:06:39Z"
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
                            "example": "4860c76a-752d-43ac-ae4f-a1cdb5e8078f"
                          },
                          "object": {
                            "type": "string",
                            "example": "routing_detail"
                          },
                          "live_mode": {
                            "type": "boolean",
                            "example": false,
                            "default": true
                          },
                          "payment_type": {},
                          "routing_number": {
                            "type": "string",
                            "example": "021000021"
                          },
                          "routing_number_type": {
                            "type": "string",
                            "example": "aba"
                          },
                          "bank_name": {
                            "type": "string",
                            "example": "JPMorgan Chase Bank, National Association"
                          },
                          "bank_address": {
                            "type": "object",
                            "properties": {
                              "id": {
                                "type": "string",
                                "example": "8fd2389e-0678-4a42-8ec0-27919c894a85"
                              },
                              "object": {
                                "type": "string",
                                "example": "address"
                              },
                              "live_mode": {
                                "type": "boolean",
                                "example": false,
                                "default": true
                              },
                              "line1": {
                                "type": "string",
                                "example": "1111 Polaris Pkwy"
                              },
                              "line2": {},
                              "locality": {
                                "type": "string",
                                "example": "Columbus"
                              },
                              "region": {
                                "type": "string",
                                "example": "OH"
                              },
                              "postal_code": {
                                "type": "string",
                                "example": "43240"
                              },
                              "country": {
                                "type": "string",
                                "example": "US"
                              },
                              "created_at": {
                                "type": "string",
                                "example": "2021-12-21T15:06:39Z"
                              },
                              "updated_at": {
                                "type": "string",
                                "example": "2021-12-21T15:06:39Z"
                              }
                            }
                          },
                          "discarded_at": {},
                          "created_at": {
                            "type": "string",
                            "example": "2021-12-21T15:06:39Z"
                          },
                          "updated_at": {
                            "type": "string",
                            "example": "2021-12-21T15:06:39Z"
                          }
                        }
                      }
                    },
                    "name": {
                      "type": "string",
                      "example": "Bookings"
                    },
                    "metadata": {
                      "type": "object",
                      "properties": {}
                    },
                    "connection": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "string",
                          "example": "dac94e63-9f4a-46b9-ba6b-412acfbf4cc1"
                        },
                        "object": {
                          "type": "string",
                          "example": "connection"
                        },
                        "live_mode": {
                          "type": "boolean",
                          "example": false,
                          "default": true
                        },
                        "vendor_id": {
                          "type": "string",
                          "example": "example1"
                        },
                        "vendor_name": {
                          "type": "string",
                          "example": "Gringotts Wizarding Bank"
                        },
                        "vendor_customer_id": {},
                        "discarded_at": {},
                        "created_at": {
                          "type": "string",
                          "example": "2018-07-24T23:43:49Z"
                        },
                        "updated_at": {
                          "type": "string",
                          "example": "2018-07-24T23:43:49Z"
                        }
                      }
                    },
                    "currency": {
                      "type": "string",
                      "example": "USD"
                    },
                    "parent_account_id": {
                      "type": "string",
                      "example": "2bb73f51-7ca2-4710-94f8-938f26c096a9"
                    },
                    "counterparty_id": {
                      "type": "string",
                      "example": "8646ad4a-f582-454f-9928-148dcb445995"
                    },
                    "created_at": {
                      "type": "string",
                      "example": "2021-12-21T15:06:39Z"
                    },
                    "updated_at": {
                      "type": "string",
                      "example": "2021-12-21T15:06:39Z"
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