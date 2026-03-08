# Remove Ledger Entries from Settlement

This API allows removing Ledger Entries from a `drafting` Ledger Account Settlement.

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
    "/ledger_account_settlements/{id}/ledger_entries": {
      "delete": {
        "summary": "Remove Ledger Entries from Settlement",
        "description": "This API allows removing Ledger Entries from a `drafting` Ledger Account Settlement.",
        "operationId": "remove-ledger-entries-from-settlement",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "The ID of the ledger account settlement.",
            "schema": {
              "type": "string"
            },
            "required": true
          },
          {
            "name": "ledger_entry_ids[]",
            "in": "query",
            "description": "Array of ledger entry ids. The API supports a maximum of 500 ledger entry ids per request. You can pass them as query parameters delimited with ledger_entry_ids[]=, for example ?ledger_entry_ids[]=abc&ledger_entry_ids[]=cde",
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          {
            "name": "Content-Type",
            "in": "header",
            "schema": {
              "type": "string",
              "default": "application/json"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {}
                }
              }
            }
          },
          "422": {
            "description": "422",
            "content": {
              "application/json": {
                "examples": {
                  "Invalid ledger entry ids": {
                    "value": "{\n    \"errors\": {\n        \"code\": \"parameter_invalid\",\n        \"message\": \"Invalid ledger entry ids provided for the ledger account settlement.\",\n        \"parameter\": \"ledger_entries\"\n    }\n}"
                  },
                  "Settlement not draft": {
                    "value": "{\n    \"errors\": {\n        \"code\": \"parameter_invalid\",\n        \"message\": \"The ledger account settlement must be in a draft state to add or remove ledger entries to it, but is in a 'posted' state.\",\n        \"parameter\": \"ledger_account_settlement\"\n    }\n}"
                  },
                  "Too many ledger entry ids": {
                    "value": "{\n    \"errors\": {\n        \"code\": \"parameter_invalid\",\n        \"message\": \"The number of ledger entry ids exceeds the maximum allowed in a single request of 500.\",\n        \"parameter\": \"ledger_account_settlement\"\n    }\n}"
                  },
                  "Discarded ledger entry": {
                    "value": "{\n    \"errors\": {\n        \"code\": \"parameter_invalid\",\n        \"message\": \"Ledger entry '0baa5574-11c8-46e2-9fd3-bc1265c72004' is discarded. Only posted ledger entries are allowed.\",\n        \"parameter\": \"ledger_entries\"\n    }\n}"
                  },
                  "Non posted ledger entry": {
                    "value": "{\n    \"errors\": {\n        \"code\": \"parameter_invalid\",\n        \"message\": \"Ledger entry 'fd95cbf2-a3e8-43d9-b1b4-c2bbe2a593cc' is not posted.\",\n        \"parameter\": \"ledger_entries\"\n    }\n}"
                  },
                  "Ledger entry in different ledger": {
                    "value": "{\n    \"errors\": {\n        \"code\": \"parameter_invalid\",\n        \"message\": \"Ledger entry '0baa5574-11c8-46e2-9fd3-bc1265c72004' is in a different ledger than the ledger account settlement.\",\n        \"parameter\": \"ledger_entries\"\n    }\n}"
                  },
                  "Different settled account ledger entry": {
                    "value": "{\n    \"errors\": {\n        \"code\": \"parameter_invalid\",\n        \"message\": \"Ledger entry '0baa5574-11c8-46e2-9fd3-bc1265c72004' does not belong to the settled ledger account.\",\n        \"parameter\": \"ledger_entries\"\n    }\n}"
                  }
                },
                "schema": {
                  "oneOf": [
                    {
                      "title": "Invalid ledger entry ids",
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
                              "example": "Invalid ledger entry ids provided for the ledger account settlement."
                            },
                            "parameter": {
                              "type": "string",
                              "example": "ledger_entries"
                            }
                          }
                        }
                      }
                    },
                    {
                      "title": "Settlement not draft",
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
                              "example": "The ledger account settlement must be in a draft state to add or remove ledger entries to it, but is in a 'posted' state."
                            },
                            "parameter": {
                              "type": "string",
                              "example": "ledger_account_settlement"
                            }
                          }
                        }
                      }
                    },
                    {
                      "title": "Too many ledger entry ids",
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
                              "example": "The number of ledger entry ids exceeds the maximum allowed in a single request of 500."
                            },
                            "parameter": {
                              "type": "string",
                              "example": "ledger_account_settlement"
                            }
                          }
                        }
                      }
                    },
                    {
                      "title": "Discarded ledger entry",
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
                              "example": "Ledger entry '0baa5574-11c8-46e2-9fd3-bc1265c72004' is discarded. Only posted ledger entries are allowed."
                            },
                            "parameter": {
                              "type": "string",
                              "example": "ledger_entries"
                            }
                          }
                        }
                      }
                    },
                    {
                      "title": "Non posted ledger entry",
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
                              "example": "Ledger entry 'fd95cbf2-a3e8-43d9-b1b4-c2bbe2a593cc' is not posted."
                            },
                            "parameter": {
                              "type": "string",
                              "example": "ledger_entries"
                            }
                          }
                        }
                      }
                    },
                    {
                      "title": "Ledger entry in different ledger",
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
                              "example": "Ledger entry '0baa5574-11c8-46e2-9fd3-bc1265c72004' is in a different ledger than the ledger account settlement."
                            },
                            "parameter": {
                              "type": "string",
                              "example": "ledger_entries"
                            }
                          }
                        }
                      }
                    },
                    {
                      "title": "Different settled account ledger entry",
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
                              "example": "Ledger entry '0baa5574-11c8-46e2-9fd3-bc1265c72004' does not belong to the settled ledger account."
                            },
                            "parameter": {
                              "type": "string",
                              "example": "ledger_entries"
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