# Request To Close Internal Account

Request to close an Internal Account. The Internal Account status will move to `pending_closure` while the request processes. When the account is closed, the status will move to `closed`. We support programmatic closure requests at a limited number of banks. Please check to see if you have permissions to do so.

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
    "/internal_accounts/{id}/request_closure": {
      "post": {
        "description": "",
        "operationId": "post_internal_accounts:idrequest_closure",
        "responses": {
          "200": {
            "description": "",
            "content": {
              "application/json": {
                "examples": {
                  "OK": {
                    "summary": "OK",
                    "value": {
                      "id": "3389fcaa-78ad-4656-988a-e3b6f2b05529",
                      "object": "internal_account",
                      "live_mode": false,
                      "account_type": null,
                      "party_name": "Modern Treasury",
                      "party_type": null,
                      "party_address": {
                        "id": "d71521e9-6c54-41e3-97fb-5e43bdba7e5a",
                        "object": "address",
                        "live_mode": false,
                        "line1": "3450 Tremblay Shoal",
                        "line2": "Suite 155",
                        "locality": "North Shantae",
                        "region": "OR",
                        "postal_code": "13671",
                        "country": "US",
                        "created_at": "2021-12-21T15:06:39Z",
                        "updated_at": "2021-12-21T15:06:39Z"
                      },
                      "account_details": [
                        {
                          "id": "14758ea7-4082-4760-8c82-ad88964869e2",
                          "object": "account_detail",
                          "live_mode": false,
                          "account_number_safe": "6418",
                          "account_number_type": "other",
                          "discarded_at": null,
                          "created_at": "2021-12-21T15:06:39Z",
                          "updated_at": "2021-12-21T15:06:39Z"
                        }
                      ],
                      "routing_details": [
                        {
                          "id": "4860c76a-752d-43ac-ae4f-a1cdb5e8078f",
                          "object": "routing_detail",
                          "live_mode": false,
                          "payment_type": null,
                          "routing_number": "021000021",
                          "routing_number_type": "aba",
                          "bank_name": "JPMorgan Chase Bank, National Association",
                          "bank_address": {
                            "id": "8fd2389e-0678-4a42-8ec0-27919c894a85",
                            "object": "address",
                            "live_mode": false,
                            "line1": "1111 Polaris Pkwy",
                            "line2": null,
                            "locality": "Columbus",
                            "region": "OH",
                            "postal_code": "43240",
                            "country": "US",
                            "created_at": "2021-12-21T15:06:39Z",
                            "updated_at": "2021-12-21T15:06:39Z"
                          },
                          "discarded_at": null,
                          "created_at": "2021-12-21T15:06:39Z",
                          "updated_at": "2021-12-21T15:06:39Z"
                        }
                      ],
                      "name": "Bookings",
                      "metadata": {},
                      "connection": {
                        "id": "dac94e63-9f4a-46b9-ba6b-412acfbf4cc1",
                        "object": "connection",
                        "live_mode": false,
                        "vendor_id": "example1",
                        "vendor_name": "Gringotts Wizarding Bank",
                        "vendor_customer_id": null,
                        "discarded_at": null,
                        "created_at": "2018-07-24T23:43:49Z",
                        "updated_at": "2018-07-24T23:43:49Z"
                      },
                      "currency": "USD",
                      "parent_account_id": "2bb73f51-7ca2-4710-94f8-938f26c096a9",
                      "counterparty_id": "8646ad4a-f582-454f-9928-148dcb445995",
                      "created_at": "2021-12-21T15:06:39Z",
                      "updated_at": "2021-12-21T15:06:39Z"
                    }
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
        "parameters": [
          {
            "in": "path",
            "name": "id",
            "schema": {
              "type": "string"
            },
            "required": true,
            "description": "Internal Account id"
          }
        ]
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