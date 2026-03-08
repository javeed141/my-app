# Complete Verification

> 🚧 Limit on failed verification completions
>
> This endpoint can only be called with incorrect amounts 5 times. After that, this verification attempt will fail and a new verification process must be started.

> 🚧 Expiration Window
>
> If the verification attempt is not verified within 2 months of the micro-deposits, it will be considered expired. The field `external_account.verification_status` will become `unverified`. An `expired` webhook event will be sent.

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
    "/external_accounts/{id}/complete_verification": {
      "post": {
        "summary": "Complete Verification",
        "description": "",
        "operationId": "complete-external-account-verification",
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
                  "amounts": {
                    "type": "array",
                    "description": "Two integer amounts",
                    "items": {
                      "type": "integer",
                      "format": "int32"
                    }
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
                    "value": "{\n  \"id\": \"0f8e3719-3dfd-4613-9bbf-c0333781b59f\",\n  \"account_type\": null,\n  \"party_name\": \"Modern Treasury\",\n  \"party_type\": null,\n  \"party_address\": null,\n  \"account_details\": [\n    {\n      \"id\": \"aaf74f7e-d697-4a73-95a3-05bede2edce6\",\n      \"account_number\": \"1293291291\",\n      \"account_number_type\": null\n    }\n  ],\n  \"routing_details\": [\n    {\n      \"id\": \"a3649136-f8d2-46e8-8b41-327bd7da3110\",\n      \"payment_type\": null,\n      \"routing_number\": \"121141822\",\n      \"routing_number_type\": \"aba\"\n    }\n  ],\n  \"verification_status\": \"verified\",\n  \"created_at\": \"2019-11-09T00:11:07Z\",\n  \"updated_at\": \"2019-11-09T00:11:07Z\"\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "example": "0f8e3719-3dfd-4613-9bbf-c0333781b59f"
                    },
                    "account_type": {},
                    "party_name": {
                      "type": "string",
                      "example": "Modern Treasury"
                    },
                    "party_type": {},
                    "party_address": {},
                    "account_details": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "string",
                            "example": "aaf74f7e-d697-4a73-95a3-05bede2edce6"
                          },
                          "account_number": {
                            "type": "string",
                            "example": "1293291291"
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
                            "example": "a3649136-f8d2-46e8-8b41-327bd7da3110"
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
                    },
                    "verification_status": {
                      "type": "string",
                      "example": "verified"
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
          },
          "422": {
            "description": "422",
            "content": {
              "application/json": {
                "examples": {
                  "Invalid Amounts": {
                    "value": "{\n  \"errors\": {\n    \"code\": \"parameter_invalid\",\n    \"message\": \"The entered amounts are invalid\",\n    \"parameter\": \"amounts\"\n  }\n}"
                  },
                  "Too many failures": {
                    "value": "{\n  \"errors\": {\n    \"code\": \"parameter_invalid\",\n    \"message\": \"The verification has had too many failures. In order to verify this account, begin a new verification.\",\n    \"parameter\": \"amounts\"\n  }\n}"
                  },
                  "No Pending Verification": {
                    "value": "{\n  \"errors\": {\n    \"code\": \"parameter_invalid\",\n    \"message\": \"There is no verification attempt for this account.\",\n    \"parameter\": \"external_account\"\n  }\n}"
                  }
                },
                "schema": {
                  "oneOf": [
                    {
                      "title": "Invalid Amounts",
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
                              "example": "The entered amounts are invalid"
                            },
                            "parameter": {
                              "type": "string",
                              "example": "amounts"
                            }
                          }
                        }
                      }
                    },
                    {
                      "title": "Too many failures",
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
                              "example": "The verification has had too many failures. In order to verify this account, begin a new verification."
                            },
                            "parameter": {
                              "type": "string",
                              "example": "amounts"
                            }
                          }
                        }
                      }
                    },
                    {
                      "title": "No Pending Verification",
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
                              "example": "There is no verification attempt for this account."
                            },
                            "parameter": {
                              "type": "string",
                              "example": "external_account"
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