# Get Internal Account

Get details on a single internal account

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
    "/internal_accounts/{id}": {
      "get": {
        "summary": "Get Internal Account",
        "description": "Get details on a single internal account",
        "operationId": "get-internal-account",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "The ID of the internal account.",
            "schema": {
              "type": "string"
            },
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n\t\"id\": \"7355aaa7-1be9-4b6a-b0f7-2d67eeae0666\",\n\t\"object\": \"internal_account\",\n\t\"live_mode\": false,\n\t\"account_type\": null,\n\t\"party_name\": \"Your Company\",\n\t\"party_type\": null,\n\t\"party_address\": {\n\t\t\"id\": \"1655db64-7c75-4f91-bf9d-6ff5af8a8f14\",\n\t\t\"object\": \"address\",\n\t\t\"live_mode\": false,\n\t\t\"line1\": \"1994 Wyman Islands\",\n\t\t\"line2\": \"Suite 337\",\n\t\t\"locality\": \"North Marianoland\",\n\t\t\"region\": \"SC\",\n\t\t\"postal_code\": \"24640-3149\",\n\t\t\"country\": \"US\",\n\t\t\"created_at\": \"2022-08-30T21:47:29Z\",\n\t\t\"updated_at\": \"2022-08-30T21:47:29Z\"\n\t},\n\t\"account_details\": [\n\t\t{\n\t\t\t\"id\": \"d1029673-e5ef-489d-aeba-c4bdf71e1e53\",\n\t\t\t\"object\": \"account_detail\",\n\t\t\t\"live_mode\": false,\n\t\t\t\"account_number\": \"9080669990\",\n\t\t\t\"account_number_type\": \"other\",\n\t\t\t\"discarded_at\": null,\n\t\t\t\"created_at\": \"2022-08-30T21:47:29Z\",\n\t\t\t\"updated_at\": \"2022-08-30T21:47:29Z\"\n\t\t}\n\t],\n\t\"routing_details\": [\n\t\t{\n\t\t\t\"id\": \"d04ff7bd-9c41-4d3f-b396-068107997e73\",\n\t\t\t\"object\": \"routing_detail\",\n\t\t\t\"live_mode\": false,\n\t\t\t\"payment_type\": null,\n\t\t\t\"routing_number\": \"021000021\",\n\t\t\t\"routing_number_type\": \"aba\",\n\t\t\t\"bank_name\": \"JPMorgan Chase Bank National Association\",\n\t\t\t\"bank_address\": {\n\t\t\t\t\"id\": \"28d54680-7b1c-45da-949d-5f322701241d\",\n\t\t\t\t\"object\": \"address\",\n\t\t\t\t\"live_mode\": false,\n\t\t\t\t\"line1\": \"1111 Polaris Parkway\",\n\t\t\t\t\"line2\": null,\n\t\t\t\t\"locality\": \"Columbus\",\n\t\t\t\t\"region\": \"OH\",\n\t\t\t\t\"postal_code\": \"43240\",\n\t\t\t\t\"country\": \"US\",\n\t\t\t\t\"created_at\": \"2022-08-30T21:47:29Z\",\n\t\t\t\t\"updated_at\": \"2022-08-30T21:47:29Z\"\n\t\t\t},\n\t\t\t\"discarded_at\": null,\n\t\t\t\"created_at\": \"2022-08-30T21:47:29Z\",\n\t\t\t\"updated_at\": \"2022-08-30T21:47:29Z\"\n\t\t}\n\t],\n\t\"name\": \"Expenses\",\n\t\"metadata\": {},\n\t\"connection\": {\n\t\t\"id\": \"d44f7ff2-9899-4331-84de-2e4e7cdb8fb3\",\n\t\t\"object\": \"connection\",\n\t\t\"live_mode\": false,\n\t\t\"vendor_id\": \"example1\",\n\t\t\"vendor_name\": \"Gringotts Wizarding Bank\",\n\t\t\"vendor_customer_id\": null,\n\t\t\"discarded_at\": null,\n\t\t\"created_at\": \"2022-08-30T21:47:29Z\",\n\t\t\"updated_at\": \"2022-08-30T21:47:29Z\"\n\t},\n\t\"currency\": \"USD\",\n\t\"parent_account_id\": null,\n\t\"counterparty_id\": null,\n\t\"created_at\": \"2022-08-30T21:47:29Z\",\n\t\"updated_at\": \"2022-08-30T21:47:29Z\"\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "example": "7355aaa7-1be9-4b6a-b0f7-2d67eeae0666"
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
                      "example": "Your Company"
                    },
                    "party_type": {},
                    "party_address": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "string",
                          "example": "1655db64-7c75-4f91-bf9d-6ff5af8a8f14"
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
                          "example": "1994 Wyman Islands"
                        },
                        "line2": {
                          "type": "string",
                          "example": "Suite 337"
                        },
                        "locality": {
                          "type": "string",
                          "example": "North Marianoland"
                        },
                        "region": {
                          "type": "string",
                          "example": "SC"
                        },
                        "postal_code": {
                          "type": "string",
                          "example": "24640-3149"
                        },
                        "country": {
                          "type": "string",
                          "example": "US"
                        },
                        "created_at": {
                          "type": "string",
                          "example": "2022-08-30T21:47:29Z"
                        },
                        "updated_at": {
                          "type": "string",
                          "example": "2022-08-30T21:47:29Z"
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
                            "example": "d1029673-e5ef-489d-aeba-c4bdf71e1e53"
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
                          "account_number": {
                            "type": "string",
                            "example": "9080669990"
                          },
                          "account_number_type": {
                            "type": "string",
                            "example": "other"
                          },
                          "discarded_at": {},
                          "created_at": {
                            "type": "string",
                            "example": "2022-08-30T21:47:29Z"
                          },
                          "updated_at": {
                            "type": "string",
                            "example": "2022-08-30T21:47:29Z"
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
                            "example": "d04ff7bd-9c41-4d3f-b396-068107997e73"
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
                            "example": "JPMorgan Chase Bank National Association"
                          },
                          "bank_address": {
                            "type": "object",
                            "properties": {
                              "id": {
                                "type": "string",
                                "example": "28d54680-7b1c-45da-949d-5f322701241d"
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
                                "example": "1111 Polaris Parkway"
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
                                "example": "2022-08-30T21:47:29Z"
                              },
                              "updated_at": {
                                "type": "string",
                                "example": "2022-08-30T21:47:29Z"
                              }
                            }
                          },
                          "discarded_at": {},
                          "created_at": {
                            "type": "string",
                            "example": "2022-08-30T21:47:29Z"
                          },
                          "updated_at": {
                            "type": "string",
                            "example": "2022-08-30T21:47:29Z"
                          }
                        }
                      }
                    },
                    "name": {
                      "type": "string",
                      "example": "Expenses"
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
                          "example": "d44f7ff2-9899-4331-84de-2e4e7cdb8fb3"
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
                          "example": "2022-08-30T21:47:29Z"
                        },
                        "updated_at": {
                          "type": "string",
                          "example": "2022-08-30T21:47:29Z"
                        }
                      }
                    },
                    "currency": {
                      "type": "string",
                      "example": "USD"
                    },
                    "parent_account_id": {},
                    "counterparty_id": {},
                    "created_at": {
                      "type": "string",
                      "example": "2022-08-30T21:47:29Z"
                    },
                    "updated_at": {
                      "type": "string",
                      "example": "2022-08-30T21:47:29Z"
                    },
                    "status": {
                      "type": "string",
                      "enum": [
                        "active",
                        "closed"
                      ]
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