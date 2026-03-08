# Create Counterparty

Create a new counterparty.

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
    "/counterparties": {
      "post": {
        "summary": "Create Counterparty",
        "description": "Create a new counterparty.",
        "operationId": "create-counterparty",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "name"
                ],
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "A human friendly name for this counterparty."
                  },
                  "accounts": {
                    "type": "array",
                    "description": "The accounts for this counterparty.",
                    "items": {
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
                      },
                      "type": "object"
                    }
                  },
                  "email": {
                    "type": "string",
                    "description": "An optional email to assign to the counterparty."
                  },
                  "metadata": {
                    "type": "string",
                    "description": "Metadata to be added to the counterparty. Must be a JSON object.",
                    "format": "json"
                  },
                  "send_remittance_advice": {
                    "type": "boolean"
                  },
                  "taxpayer_identifier": {
                    "type": "string",
                    "description": "Valid tax payer ID for counterparty's region."
                  },
                  "accounting": {
                    "type": "object",
                    "description": "An object of references to auto-sync the counterparty to your accounting system. Can send `type` which is either `customer` or `vendor`.",
                    "properties": {}
                  },
                  "legal_entity": {
                    "type": "object",
                    "required": [
                      "legal_entity_type"
                    ],
                    "properties": {
                      "legal_entity_type": {
                        "type": "string",
                        "description": "The type of legal entity. One of: `individual`, `business`"
                      },
                      "risk_rating": {
                        "type": "string",
                        "description": "The risk rating of legal entity. One of: `low`, `medium`, `high`."
                      },
                      "prefix": {
                        "type": "string",
                        "description": "An individual's prefix."
                      },
                      "first_name": {
                        "type": "string",
                        "description": "An individual's first name."
                      },
                      "middle_name": {
                        "type": "string",
                        "description": "An individual's middle name."
                      },
                      "last_name": {
                        "type": "string",
                        "description": "An individual's last name."
                      },
                      "suffix": {
                        "type": "string",
                        "description": "An individual's suffix."
                      },
                      "preferred_name": {
                        "type": "string",
                        "description": "An individual's preferred name."
                      },
                      "citizenship_country": {
                        "type": "string",
                        "description": "The ISO 3166-1 alpha-2 country code of the individual's citizenship country."
                      },
                      "politically_exposed_person": {
                        "type": "boolean",
                        "description": "Whether the individual is a politically exposed person."
                      },
                      "date_of_birth": {
                        "type": "string",
                        "description": "An individual's data of birth (YYYY-MM-DD).",
                        "format": "date"
                      },
                      "date_formed": {
                        "type": "string",
                        "description": "The business's formation date (YYYY-MM-DD).",
                        "format": "date"
                      },
                      "business_name": {
                        "type": "string",
                        "description": "The business's legal business name."
                      },
                      "doing_business_as_names": {
                        "type": "array",
                        "description": "A list of \"Doing Business As\" (DBA) / trade names for a business, different than their legal business name.",
                        "items": {
                          "type": "string"
                        }
                      },
                      "legal_structure": {
                        "type": "string",
                        "description": "The business's legal structure. One of: `corporation`, `llc`, `non_profit`, `partnership`, `sole_proprietorship`, `trust`."
                      },
                      "phone_numbers": {
                        "type": "array",
                        "description": "A list of phone numbers in E.164 format.",
                        "items": {
                          "properties": {
                            "phone_number": {
                              "type": "string",
                              "description": "A phone numbers in E.164 format."
                            }
                          },
                          "type": "object"
                        }
                      },
                      "bank_settings": {
                        "type": "object",
                        "description": "Additional bank-specific settings for a legal entity.",
                        "properties": {
                          "enable_backup_withholding": {
                            "type": "boolean",
                            "description": "Whether backup withholding is enabled. See more here - https://www.irs.gov/businesses/small-businesses-self-employed/backup-withholding"
                          },
                          "backup_withholding_percentage": {
                            "type": "integer",
                            "description": "The percentage of backup withholding to apply to the legal entity.",
                            "format": "int32"
                          },
                          "privacy_opt_out": {
                            "type": "boolean",
                            "description": "Cross River Bank specific setting to opt out of privacy policy."
                          },
                          "regulation_o": {
                            "type": "boolean",
                            "description": "It covers, among other types of insider loans, extensions of credit by a member bank to an executive officer, director, or principal shareholder of the member bank; a bank holding company of which the member bank is a subsidiary; and any other subsidiary of that bank holding company."
                          }
                        }
                      },
                      "wealth_and_employment_details": {
                        "type": "object",
                        "description": "Wealth and employment details for an individual.",
                        "properties": {
                          "employment_status": {
                            "type": "string",
                            "description": "The employment status of the individual.",
                            "enum": [
                              "\"employed\"",
                              "\"retired\"",
                              "\"self_employed\"",
                              "\"student\"",
                              "\"unemployed\""
                            ]
                          },
                          "occupation": {
                            "type": "string",
                            "description": "The occupation of the individual's employment.",
                            "enum": [
                              "\"consulting\"",
                              "\"executive\"",
                              "\"finance_accounting\"",
                              "\"food_services\"",
                              "\"government\"",
                              "\"healthcare\"",
                              "\"legal_services\"",
                              "\"manufacturing\"",
                              "\"other\"",
                              "\"sales\"",
                              "\"science_engineering\"",
                              "\"technology\""
                            ]
                          },
                          "industry": {
                            "type": "string",
                            "description": "The industry of the individual's employment.",
                            "enum": [
                              "\"accounting\"",
                              "\"agriculture\"",
                              "\"automotive\"",
                              "\"chemical_manufacturing\"",
                              "\"construction\"",
                              "\"educational_medical\"",
                              "\"food_service\"",
                              "\"finance\"",
                              "\"gasoline\"",
                              "\"health_stores\"",
                              "\"laundry\"",
                              "\"maintenance\"",
                              "\"manufacturing\"",
                              "\"merchant_wholesale\"",
                              "\"mining\"",
                              "\"performing_arts\"",
                              "\"professional_non_legal\"",
                              "\"public_administration\"",
                              "\"publishing\"",
                              "\"real_estate\"",
                              "\"recreation_gambling\"",
                              "\"religious_charity\"",
                              "\"rental_services\"",
                              "\"retail_clothing\"",
                              "\"retail_electronics\"",
                              "\"retail_food\"",
                              "\"retail_furnishing\"",
                              "\"retail_home\"",
                              "\"retail_non_store\"",
                              "\"retail_sporting\"",
                              "\"transportation\"",
                              "\"travel\"",
                              "\"utilities\""
                            ]
                          },
                          "income_source": {
                            "type": "string",
                            "description": "The source of the individual's income.",
                            "enum": [
                              "\"family_support\"",
                              "\"government_benefits\"",
                              "\"inheritance\"",
                              "\"investments\"",
                              "\"rental_income\"",
                              "\"retirement\"",
                              "\"salary\"",
                              "\"self_employed\""
                            ]
                          },
                          "income_state": {
                            "type": "string",
                            "description": "The state in which the individual's income is earned."
                          },
                          "income_country": {
                            "type": "string",
                            "description": "The ISO 3166-1 alpha-2 country code in which the individual's income is earned."
                          },
                          "employer_name": {
                            "type": "string",
                            "description": "The name of the employer."
                          },
                          "employer_state": {
                            "type": "string",
                            "description": "The state in which the employer is located."
                          },
                          "employer_country": {
                            "type": "string",
                            "description": "The ISO 3166-1 alpha-2 country code in which the employer is located."
                          },
                          "source_of_funds": {
                            "type": "string",
                            "description": "The source of the individual's funds.",
                            "enum": [
                              "\"alimony\"",
                              "\"annuity\"",
                              "\"business_owner\"",
                              "\"general_employee\"",
                              "\"government_benefits\"",
                              "\"homemaker\"",
                              "\"inheritance_gift\"",
                              "\"investment\"",
                              "\"legal_settlement\"",
                              "\"lottery\"",
                              "\"real_estate\"",
                              "\"retired\"",
                              "\"retirement\"",
                              "\"salary\"",
                              "\"self_employed\"",
                              "\"senior_executive\"",
                              "\"trust_income\""
                            ]
                          },
                          "wealth_source": {
                            "type": "string",
                            "description": "The source of the individual's wealth.",
                            "enum": [
                              "\"business_sale\"",
                              "\"family_support\"",
                              "\"government_benefits\"",
                              "\"inheritance\"",
                              "\"investments\"",
                              "\"other\"",
                              "\"rental_income\"",
                              "\"retirement\"",
                              "\"salary\"",
                              "\"self_employed\""
                            ]
                          },
                          "annual_income": {
                            "type": "integer",
                            "description": "The annual income of the individual.",
                            "format": "int32"
                          }
                        }
                      },
                      "email": {
                        "type": "string",
                        "description": "The entity's primary email."
                      },
                      "website": {
                        "type": "string",
                        "description": "The entity's primary website URL."
                      },
                      "metadata": {
                        "type": "string",
                        "description": "Additional data represented as key-value pairs. Both the key and value must be strings.",
                        "format": "json"
                      },
                      "addresses": {
                        "type": "array",
                        "description": "A list of addresses for the entity.",
                        "items": {
                          "properties": {
                            "address_types": {
                              "type": "array",
                              "description": "The types of this address. Possible values: `business`, `mailing`, `other`, `po_box`, `residential`.",
                              "default": [],
                              "items": {
                                "type": "string"
                              }
                            },
                            "line1": {
                              "type": "string",
                              "description": "Address line 1"
                            },
                            "line2": {
                              "type": "string",
                              "description": "Address line 2"
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
                            },
                            "primary": {
                              "type": "boolean",
                              "description": "Designates if this is the primary address for the LegalEntity",
                              "default": true
                            }
                          },
                          "required": [
                            "line1",
                            "locality",
                            "region",
                            "postal_code",
                            "country"
                          ],
                          "type": "object"
                        }
                      },
                      "identifications": {
                        "type": "array",
                        "description": "A list of identifications for the legal entity.",
                        "items": {
                          "properties": {
                            "id_number": {
                              "type": "string",
                              "description": "The ID number of identification document."
                            },
                            "id_type": {
                              "type": "string",
                              "description": "The type of ID number.  See list of [Identifications](https://docs.moderntreasury.com/platform/reference/identifications)"
                            },
                            "issuing_country": {
                              "type": "string",
                              "description": "The ISO 3166-1 alpha-2 country code of the country that issued the identification."
                            },
                            "issuing_region": {
                              "type": "string",
                              "description": "The region in which the identification was issued."
                            },
                            "expiration_date": {
                              "type": "string",
                              "description": "The date when the Identification is no longer considered valid by the issuing authority",
                              "format": "date"
                            }
                          },
                          "required": [
                            "id_number",
                            "id_type"
                          ],
                          "type": "object"
                        }
                      },
                      "legal_entity_associations": {
                        "type": "array",
                        "description": "The legal entity associations and its child legal entities.",
                        "items": {
                          "properties": {
                            "relationship_types": {
                              "type": "array",
                              "description": "A list of relationship types for how the child entity relates to parent entity.",
                              "default": [],
                              "items": {
                                "type": "string"
                              }
                            },
                            "title": {
                              "type": "string",
                              "description": "The job title of the child entity at the parent entity."
                            },
                            "ownership_percentage": {
                              "type": "integer",
                              "description": "The child entity's ownership percentage if they are a beneficial owner.",
                              "format": "int32"
                            },
                            "child_legal_entity": {
                              "type": "object",
                              "description": "The child legal entity object.",
                              "required": [
                                "legal_entity_type"
                              ],
                              "properties": {
                                "legal_entity_type": {
                                  "type": "string",
                                  "description": "The type of legal entity. One of: `individual`, `business`"
                                },
                                "risk_rating": {
                                  "type": "string",
                                  "description": "The risk rating of legal entity. One of: `low`, `medium`, `high`."
                                },
                                "prefix": {
                                  "type": "string",
                                  "description": "An individual's prefix."
                                },
                                "first_name": {
                                  "type": "string",
                                  "description": "An individual's first name."
                                },
                                "middle_name": {
                                  "type": "string",
                                  "description": "An individual's middle name."
                                },
                                "last_name": {
                                  "type": "string",
                                  "description": "An individual's last name."
                                },
                                "suffix": {
                                  "type": "string",
                                  "description": "An individual's suffix."
                                },
                                "preferred_name": {
                                  "type": "string",
                                  "description": "An individual's preferred name"
                                },
                                "citizenship_country": {
                                  "type": "string",
                                  "description": "The ISO 3166-1 alpha-2 country code of the individual's citizenship country."
                                },
                                "politically_exposed_person": {
                                  "type": "boolean",
                                  "description": "Whether the individual is a politically exposed person."
                                },
                                "date_of_birth": {
                                  "type": "string",
                                  "description": "An individual's data of birth (YYYY-MM-DD).",
                                  "format": "date"
                                },
                                "date_formed": {
                                  "type": "string",
                                  "description": "The business's formation date (YYYY-MM-DD).",
                                  "format": "date"
                                },
                                "business_name": {
                                  "type": "string",
                                  "description": "The business's legal business name."
                                },
                                "doing_business_as_names": {
                                  "type": "array",
                                  "description": "A list of \"Doing Business As\" (DBA) / trade names for a business, different than their legal business name.",
                                  "items": {
                                    "type": "string"
                                  }
                                },
                                "legal_structure": {
                                  "type": "string",
                                  "description": "The business's legal structure. One of: `corporation`, `llc`, `non_profit`, `partnership`, `sole_proprietorship`, `trust`."
                                },
                                "phone_numbers": {
                                  "type": "array",
                                  "description": "A list of phone numbers in E.164 format.",
                                  "items": {
                                    "properties": {
                                      "phone_number": {
                                        "type": "string",
                                        "description": "A phone numbers in E.164 format."
                                      }
                                    },
                                    "type": "object"
                                  }
                                },
                                "bank_settings": {
                                  "type": "object",
                                  "description": "Additional bank-specific settings for a legal entity.",
                                  "properties": {
                                    "enable_backup_withholding": {
                                      "type": "boolean",
                                      "description": "Whether backup withholding is enabled. See more here - https://www.irs.gov/businesses/small-businesses-self-employed/backup-withholding"
                                    },
                                    "backup_withholding_percentage": {
                                      "type": "integer",
                                      "description": "The percentage of backup withholding to apply to the legal entity.",
                                      "format": "int32"
                                    },
                                    "privacy_opt_out": {
                                      "type": "boolean",
                                      "description": "Cross River Bank specific setting to opt out of privacy policy."
                                    },
                                    "regulation_o": {
                                      "type": "boolean",
                                      "description": "It covers, among other types of insider loans, extensions of credit by a member bank to an executive officer, director, or principal shareholder of the member bank; a bank holding company of which the member bank is a subsidiary; and any other subsidiary of that bank holding company."
                                    }
                                  }
                                },
                                "wealth_and_employment_details": {
                                  "type": "object",
                                  "description": "Wealth and employment details for an individual.",
                                  "properties": {
                                    "employment_status": {
                                      "type": "string",
                                      "description": "The employment status of the individual.",
                                      "enum": [
                                        "\"employed\"",
                                        "\"retired\"",
                                        "\"self_employed\"",
                                        "\"student\"",
                                        "\"unemployed\""
                                      ]
                                    },
                                    "occupation": {
                                      "type": "string",
                                      "description": "The occupation of the individual's employment.",
                                      "enum": [
                                        "\"consulting\"",
                                        "\"executive\"",
                                        "\"finance_accounting\"",
                                        "\"food_services\"",
                                        "\"government\"",
                                        "\"healthcare\"",
                                        "\"legal_services\"",
                                        "\"manufacturing\"",
                                        "\"other\"",
                                        "\"sales\"",
                                        "\"science_engineering\"",
                                        "\"technology\""
                                      ]
                                    },
                                    "industry": {
                                      "type": "string",
                                      "description": "The industry of the individual's employment.",
                                      "enum": [
                                        "\"accounting\"",
                                        "\"agriculture\"",
                                        "\"automotive\"",
                                        "\"chemical_manufacturing\"",
                                        "\"construction\"",
                                        "\"educational_medical\"",
                                        "\"food_service\"",
                                        "\"finance\"",
                                        "\"gasoline\"",
                                        "\"health_stores\"",
                                        "\"laundry\"",
                                        "\"maintenance\"",
                                        "\"manufacturing\"",
                                        "\"merchant_wholesale\"",
                                        "\"mining\"",
                                        "\"performing_arts\"",
                                        "\"professional_non_legal\"",
                                        "\"public_administration\"",
                                        "\"publishing\"",
                                        "\"real_estate\"",
                                        "\"recreation_gambling\"",
                                        "\"religious_charity\"",
                                        "\"rental_services\"",
                                        "\"retail_clothing\"",
                                        "\"retail_electronics\"",
                                        "\"retail_food\"",
                                        "\"retail_furnishing\"",
                                        "\"retail_home\"",
                                        "\"retail_non_store\"",
                                        "\"retail_sporting\"",
                                        "\"transportation\"",
                                        "\"travel\"",
                                        "\"utilities\""
                                      ]
                                    },
                                    "income_source": {
                                      "type": "string",
                                      "description": "The source of the individual's income.",
                                      "enum": [
                                        "\"family_support\"",
                                        "\"government_benefits\"",
                                        "\"inheritance\"",
                                        "\"investments\"",
                                        "\"rental_income\"",
                                        "\"retirement\"",
                                        "\"salary\"",
                                        "\"self_employed\""
                                      ]
                                    },
                                    "income_state": {
                                      "type": "string",
                                      "description": "The state in which the individual's income is earned."
                                    },
                                    "income_country": {
                                      "type": "string",
                                      "description": "The ISO 3166-1 alpha-2 country code in which the individual's income is earned."
                                    },
                                    "employer_name": {
                                      "type": "string",
                                      "description": "The name of the employer."
                                    },
                                    "employer_state": {
                                      "type": "string",
                                      "description": "The state in which the employer is located."
                                    },
                                    "employer_country": {
                                      "type": "string",
                                      "description": "The ISO 3166-1 alpha-2 country code in which the employer is located."
                                    },
                                    "source_of_funds": {
                                      "type": "string",
                                      "description": "The source of the individual's funds.",
                                      "enum": [
                                        "\"alimony\"",
                                        "\"annuity\"",
                                        "\"business_owner\"",
                                        "\"general_employee\"",
                                        "\"government_benefits\"",
                                        "\"homemaker\"",
                                        "\"inheritance_gift\"",
                                        "\"investment\"",
                                        "\"legal_settlement\"",
                                        "\"lottery\"",
                                        "\"real_estate\"",
                                        "\"retired\"",
                                        "\"retirement\"",
                                        "\"salary\"",
                                        "\"self_employed\"",
                                        "\"senior_executive\"",
                                        "\"trust_income\""
                                      ]
                                    },
                                    "wealth_source": {
                                      "type": "string",
                                      "description": "The source of the individual's wealth.",
                                      "enum": [
                                        "\"business_sale\"",
                                        "\"family_support\"",
                                        "\"government_benefits\"",
                                        "\"inheritance\"",
                                        "\"investments\"",
                                        "\"other\"",
                                        "\"rental_income\"",
                                        "\"retirement\"",
                                        "\"salary\"",
                                        "\"self_employed\""
                                      ]
                                    },
                                    "annual_income": {
                                      "type": "integer",
                                      "description": "The annual income of the individual.",
                                      "format": "int32"
                                    }
                                  }
                                },
                                "email": {
                                  "type": "string",
                                  "description": "The entity's primary email."
                                },
                                "website": {
                                  "type": "string",
                                  "description": "The entity's primary website URL."
                                },
                                "metadata": {
                                  "type": "string",
                                  "description": "Additional data represented as key-value pairs. Both the key and value must be strings.",
                                  "format": "json"
                                },
                                "addresses": {
                                  "type": "array",
                                  "description": "A list of addresses for the entity.",
                                  "items": {
                                    "properties": {
                                      "address_types": {
                                        "type": "array",
                                        "description": "The types of this address. Possible values: `business`, `mailing`, `other`, `po_box`, `residential`.",
                                        "default": [],
                                        "items": {
                                          "type": "string"
                                        }
                                      },
                                      "line1": {
                                        "type": "string",
                                        "description": "Address line 1"
                                      },
                                      "line2": {
                                        "type": "string",
                                        "description": "Address line 2"
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
                                      },
                                      "primary": {
                                        "type": "boolean",
                                        "description": "Designates if this is the primary address for the LegalEntity",
                                        "default": true
                                      }
                                    },
                                    "required": [
                                      "line1",
                                      "locality",
                                      "region",
                                      "postal_code",
                                      "country"
                                    ],
                                    "type": "object"
                                  }
                                },
                                "identifications": {
                                  "type": "array",
                                  "description": "A list of identifications for the legal entity.",
                                  "items": {
                                    "properties": {
                                      "id_number": {
                                        "type": "string",
                                        "description": "The ID number of identification document."
                                      },
                                      "id_type": {
                                        "type": "string",
                                        "description": "The type of ID number.  See list of [Identifications](https://docs.moderntreasury.com/platform/reference/identifications)"
                                      },
                                      "issuing_country": {
                                        "type": "string",
                                        "description": "The ISO 3166-1 alpha-2 country code of the country that issued the identification."
                                      },
                                      "issuing_region": {
                                        "type": "string",
                                        "description": "The region in which the identification was issued."
                                      },
                                      "expiration_date": {
                                        "type": "string",
                                        "description": "The date when the Identification is no longer considered valid by the issuing authority",
                                        "format": "date"
                                      }
                                    },
                                    "required": [
                                      "id_number",
                                      "id_type"
                                    ],
                                    "type": "object"
                                  }
                                }
                              }
                            },
                            "child_legal_entity_id": {
                              "type": "string",
                              "description": "The ID of the child legal entity."
                            }
                          },
                          "required": [
                            "relationship_types"
                          ],
                          "type": "object"
                        }
                      }
                    }
                  },
                  "legal_entity_id": {
                    "type": "string"
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
          "201": {
            "description": "201",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n  \"id\": \"928db55e-6552-4aaf-96d7-10c693922b1f\",\n  \"object\": \"counterparty\",\n  \"name\": \"John Smith\",\n  \"email\": \"abby@marquardtschuppe.net\",\n  \"metadata\": {},\n  \"accounts\": [\n    {\n      \"id\": \"c8d059bc-e781-4528-9359-d46eaaa7f953\",\n      \"account_type\": null,\n      \"party_name\": \"John Smith\",\n      \"party_type\": \"business\",\n      \"party_address\": null,\n      \"account_details\": [\n        {\n          \"id\": \"3036a533-53ad-4e58-ba30-33c4d75c0c57\",\n          \"account_number_safe\": \"1291\",\n          \"account_number_type\": null\n        }\n      ],\n      \"routing_details\": [\n        {\n          \"id\": \"e8626e0b-2687-4b0d-9f2c-68a4c29ee5f1\",\n          \"payment_type\": null,\n          \"routing_number\": \"121141822\",\n          \"routing_number_type\": \"aba\"\n        }\n      ]\n    }\n  ],\n  \"created_at\": \"2019-11-09T00:11:07Z\",\n  \"updated_at\": \"2019-11-09T00:11:07Z\"\n}\n"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "example": "928db55e-6552-4aaf-96d7-10c693922b1f"
                    },
                    "object": {
                      "type": "string",
                      "example": "counterparty"
                    },
                    "name": {
                      "type": "string",
                      "example": "John Smith"
                    },
                    "email": {
                      "type": "string",
                      "example": "abby@marquardtschuppe.net"
                    },
                    "metadata": {
                      "type": "object",
                      "properties": {}
                    },
                    "accounts": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "string",
                            "example": "c8d059bc-e781-4528-9359-d46eaaa7f953"
                          },
                          "account_type": {},
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
                                  "example": "3036a533-53ad-4e58-ba30-33c4d75c0c57"
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
                                  "example": "e8626e0b-2687-4b0d-9f2c-68a4c29ee5f1"
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
                      }
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