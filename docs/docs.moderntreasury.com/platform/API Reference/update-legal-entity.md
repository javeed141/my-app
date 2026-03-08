# Update Legal Entity

Updates a given LegalEntity with new information. If the given LegalEntity has any operational ConnectionLegalEntities at Cross River Bank or Column Bank, the representations at each downstream vendor will also be automatically updated with the new information.

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
    "/legal_entities/{id}": {
      "patch": {
        "summary": "Update Legal Entity",
        "description": "Updates a given LegalEntity with new information.\n\n_Available under early access: if the given LegalEntity has any operational ConnectionLegalEntities, the representations at each downstream vendor will also be automatically updated with the new information. Please contact Customer Support if interested in this feature._",
        "operationId": "update-legal-entity",
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
                    "description": "An individual's date of birth (YYYY-MM-DD).",
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
                    "description": "A list of \"Doing Business As\" (DBA) / trade names for a business, different than their legal business name. Note: This will replace the existing DBAs.",
                    "items": {
                      "type": "string"
                    }
                  },
                  "legal_structure": {
                    "type": "string",
                    "description": "The business's legal structure. One of: `corporation`, `llc`, `non_profit`, `partnership`, `sole_proprietorship`, `trust`."
                  },
                  "email": {
                    "type": "string",
                    "description": "The entity's primary email."
                  },
                  "website": {
                    "type": "string",
                    "description": "The entity's primary website URL."
                  },
                  "phone_numbers": {
                    "type": "array",
                    "description": "A list of phone numbers in E.164 format. Note: This will replace the existing phone numbers.",
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
                    "description": "Additional bank-specific settings for a legal entity. Note: This will replace the existing bank settings.",
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
                    "description": "Wealth and employment details for an individual. Note: This will replace the existing wealth and employment details.",
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
                        "description": "The annual income of the individual in USD",
                        "format": "int32"
                      }
                    }
                  },
                  "compliance_details": {
                    "type": "object",
                    "description": "The compliance details for this legal entity managed by a 3rd party compliance provider.",
                    "properties": {
                      "issuer": {
                        "type": "string",
                        "description": "The issuer of the compliance token."
                      },
                      "token": {
                        "type": "string",
                        "description": "The compliance token value"
                      },
                      "token_url": {
                        "type": "string",
                        "description": "The URL to the compliance token. (ex. provider portal URL)"
                      },
                      "token_issued_at": {
                        "type": "string",
                        "description": "The timestamp when the compliance token was issued.",
                        "format": "date"
                      },
                      "token_expires_at": {
                        "type": "string",
                        "description": "The timestamp when the compliance token expires.",
                        "format": "date"
                      },
                      "validated": {
                        "type": "boolean",
                        "description": "Whether the legal entity corresponding to the compliance token has been validated."
                      },
                      "validated_at": {
                        "type": "string",
                        "description": "The timestamp when the entity was validated. (Only allowed when `validated: true`",
                        "format": "date"
                      }
                    }
                  },
                  "industry_classifications": {
                    "type": "array",
                    "description": "A list of industry classifications for the legal entity. Note: This will replace the existing identifications.",
                    "items": {
                      "properties": {
                        "classification_type": {
                          "type": "string",
                          "description": "The classification system of the classification codes. One of `anzsic`, `bics`, `gics`, `hsics`, `icb`, `isic`, `mgecs`, `nace`, `naics`, `rbics`, `sic`, `sni`, `trbc`, `uksic`, `unspsc`"
                        },
                        "classification_codes": {
                          "type": "array",
                          "description": "The list of industry classification codes for this legal entity of type `classification_type`.",
                          "default": [],
                          "items": {
                            "type": "string"
                          }
                        }
                      },
                      "required": [
                        "classification_type",
                        "classification_codes"
                      ],
                      "type": "object"
                    }
                  },
                  "addresses": {
                    "type": "array",
                    "description": "A list of addresses for the entity. Note: This will replace the existing addresses.",
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
                  "legal_entity_associations": {
                    "type": "array",
                    "description": "A list of associations for the legal entity. Note: This will replace the existing associations..",
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
                  },
                  "identifications": {
                    "type": "array",
                    "description": "A list of identifications for the legal entity. Note: This will replace the existing identifications.",
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
                  "metadata": {
                    "type": "string",
                    "description": "Additional data represented as key-value pairs. Both the key and value must be strings.",
                    "format": "json"
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