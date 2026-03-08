# Create Legal Entity

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
    "/legal_entities": {
      "post": {
        "summary": "Create Legal Entity",
        "description": "",
        "operationId": "create-legal-entity",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "legal_entity_type"
                ],
                "properties": {
                  "legal_entity_type": {
                    "type": "string",
                    "description": "The type of legal entity.",
                    "enum": [
                      "individual",
                      "business"
                    ]
                  },
                  "risk_rating": {
                    "type": "string",
                    "description": "The risk rating of legal entity.",
                    "enum": [
                      "low",
                      "medium",
                      "high"
                    ]
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
                    "description": "A list of \"Doing Business As\" (DBA) / trade names for a business, different than their legal business name.",
                    "items": {
                      "type": "string"
                    }
                  },
                  "legal_structure": {
                    "type": "string",
                    "description": "The business's legal structure. One of: `corporation`, `llc`, `non_profit`, `partnership`, `sole_proprietorship`, `trust`."
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
                        },
                        "documents": {
                          "type": "object",
                          "description": "A list of Documents to be created and associated with a given identification.\nIndividuals require identification documents:\n- Driver's license: both `identification_front` and `identification_back`\n- Passport: only `identification_front`\n\nBusinesses require an `ein_letter` identification document.",
                          "properties": {
                            "document_type": {
                              "type": "string",
                              "enum": [
                                "ein_letter",
                                "identification_front",
                                "identification_back"
                              ]
                            },
                            "file_data": {
                              "type": "string",
                              "description": "Base64-encoded bytes of the file to be uploaded."
                            },
                            "filename": {
                              "type": "string"
                            }
                          },
                          "required": [
                            "filename",
                            "file_data"
                          ]
                        }
                      },
                      "required": [
                        "id_number",
                        "id_type"
                      ],
                      "type": "object"
                    }
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
                    "description": "Wealth and employment details for an individual. Source of funds can be submitted for a business.",
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
                        "description": "The source of the business or individual's funds.",
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
                          "\"trust_income\"",
                          "business_revenue",
                          "debt_financing",
                          "intercompany_loan",
                          "investor_funding",
                          "retained_earnings_or_savings",
                          "sale_of_business_assets",
                          "sale_of_real_estate"
                        ]
                      },
                      "wealth_source": {
                        "type": "string",
                        "description": "The source of the business or individual's wealth.",
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
                        "description": "The annual income of the individual in USD.",
                        "format": "int32"
                      }
                    }
                  },
                  "compliance_details": {
                    "type": "object",
                    "description": "The compliance details for this corresponding legal entity managed through a 3rd party compliance provider.",
                    "required": [
                      "issuer",
                      "token"
                    ],
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
                        "description": "The timestamp when the legal entity was validated. (Only allowed when `validated: true`)",
                        "format": "date-time"
                      }
                    }
                  },
                  "industry_classifications": {
                    "type": "array",
                    "description": "A list of industry classifications for the business.",
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
                  "email": {
                    "type": "string",
                    "description": "The entity's primary email."
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
                  "website": {
                    "type": "string",
                    "description": "The entity's primary website URL."
                  },
                  "metadata": {
                    "type": "string",
                    "description": "Additional data represented as key-value pairs. Both the key and value must be strings.",
                    "format": "json"
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
                  },
                  "business_description": {
                    "type": "string",
                    "description": "A description of the business."
                  },
                  "intended_use": {
                    "type": "string",
                    "description": "A description of the intended use of the business."
                  },
                  "expected_activity_volume": {
                    "type": "number",
                    "description": "Monthly expected transaction volume in USD dollars."
                  },
                  "country_of_incorporation": {
                    "type": "string",
                    "description": "The country code where the business is incorporated in the ISO 3166-1 alpha-2 or alpha-3 formats."
                  },
                  "operating_jurisdictions": {
                    "type": "array",
                    "description": "A list of countries where the business operates in the ISO 3166 1 alpha-2 or alpha-3 country code formats.",
                    "items": {
                      "type": "string"
                    }
                  },
                  "primary_social_media_sites": {
                    "type": "array",
                    "description": "A list of primary social media URLs for the business.",
                    "items": {
                      "type": "string"
                    }
                  },
                  "regulators": {
                    "type": "array",
                    "items": {
                      "properties": {
                        "name": {
                          "type": "string",
                          "description": "Full name of the regulatory body, e.g. \"SEC\""
                        },
                        "jurisdiction": {
                          "type": "string",
                          "description": "The country code where the regulator operates in the ISO 3166-1 alpha-2 or alpha-3 formats."
                        },
                        "register_number": {
                          "type": "string",
                          "description": "Registration or identification number with the regulator."
                        }
                      },
                      "type": "object"
                    },
                    "description": "Array of regulatory bodies overseeing the business."
                  },
                  "ticker_symbol": {
                    "type": "string",
                    "description": "Stock ticker symbol for a publicly traded business."
                  },
                  "listed_exchange": {
                    "type": "string",
                    "description": "The ISO 10383 market identifier code of the business (e.g., XNAS for NASDAQ, XNYS for NYSE)."
                  },
                  "connection_id": {
                    "type": "string",
                    "description": "Defaults to the `id` of the connection designated with an `is_default` value of `true`, or the id of an existing, operational connection if only one is available.\n\nDefining the `connection_id` will associate this legal entity with the identified bank or external connection through the creation of a Connection Legal Entity, if the connection is a valid, operational connection for which downstream connection functionality is supported.\n\nPass in a value of `null` to prevent the `connection_id` from being used."
                  },
                  "documents": {
                    "type": "object",
                    "description": "A list of Documents to be created and associated with the legal entity.",
                    "properties": {
                      "document_type": {
                        "type": "string",
                        "description": "Type of document.",
                        "enum": [
                          "articles_of_incorporation",
                          "certificate_of_good_standing"
                        ]
                      },
                      "file_data": {
                        "type": "string",
                        "description": "Base64-encoded bytes of the file to upload."
                      },
                      "filename": {
                        "type": "string",
                        "description": "Name of the file to be uploaded."
                      }
                    }
                  },
                  "external_id": {
                    "type": "string",
                    "description": "An optional user-defined unique identifier. "
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