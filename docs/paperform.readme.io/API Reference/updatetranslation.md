# /translations/{id}

This endpoint updates a translation.
Please note that this feature is exclusively available as part of the [Business API](https://paperform.co/pricing/).

# OpenAPI definition

```json
{
  "openapi": "3.0.2",
  "info": {
    "version": "1.0.0",
    "title": "Paperform API",
    "contact": {
      "name": "Paperform API Support",
      "url": "https://paperform.co",
      "email": "support@paperform.co"
    }
  },
  "servers": [
    {
      "url": "https://api.paperform.co/v1"
    }
  ],
  "components": {
    "schemas": {
      "Translation": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid",
            "description": "The unique identifier of the translation.",
            "example": "5d40fdaf174b4c0007043072",
            "readOnly": true
          },
          "title": {
            "type": "string",
            "description": "The title of the translation.",
            "example": "My German Translation"
          },
          "language": {
            "$ref": "#/components/schemas/Language"
          },
          "mapping": {
            "type": "object",
            "description": "The mapping for translations.",
            "example": {
              "submitting": "Submitting..."
            }
          },
          "subsets": {
            "type": "object",
            "description": "The subsets for the translation."
          },
          "rtl": {
            "type": "boolean",
            "default": false,
            "description": "Whether the translation is right-to-left.",
            "example": false
          },
          "created_at": {
            "type": "string",
            "format": "date-time",
            "description": "A formatted date-time string in your account timezone indicating the time the translation was created.",
            "readOnly": true,
            "example": "2019-04-14T09:00:00.000Z"
          },
          "updated_at": {
            "type": "string",
            "format": "date-time",
            "description": "A formatted date-time string in your account timezone indicating the time the translation was last updated.",
            "readOnly": true,
            "example": "2019-04-14T09:00:00.000Z"
          },
          "account_timezone": {
            "type": "string",
            "description": "The timezone of your account.",
            "readOnly": true,
            "example": "America/Los_Angeles"
          },
          "created_at_utc": {
            "type": "string",
            "format": "date-time",
            "description": "A formatted date-time string in UTC timezone indicating the time the translation was created.",
            "readOnly": true,
            "example": "2019-04-14T09:00:00.000Z"
          },
          "updated_at_utc": {
            "type": "string",
            "format": "date-time",
            "description": "A formatted date-time string in UTC timezone indicating the time the translation was last updated.",
            "readOnly": true,
            "example": "2019-04-14T09:00:00.000Z"
          }
        }
      },
      "Language": {
        "type": "string",
        "example": "German",
        "enum": [
          "Abkhazian",
          "Afar",
          "Afrikaans",
          "Akan",
          "Albanian",
          "Amharic",
          "Arabic",
          "Aragonese",
          "Armenian",
          "Assamese",
          "Avaric",
          "Avestan",
          "Aymara",
          "Azerbaijani",
          "Bambara",
          "Bashkir",
          "Basque",
          "Belarusian",
          "Bengali",
          "Bihari languages",
          "Bislama",
          "Bosnian",
          "Breton",
          "Bulgarian",
          "Burmese",
          "Catalan, Valencian",
          "Central Khmer",
          "Chamorro",
          "Chechen",
          "Chichewa, Chewa, Nyanja",
          "Chinese",
          "Church Slavonic, Old Bulgarian, Old Church Slavonic",
          "Chuvash",
          "Cornish",
          "Corsican",
          "Cree",
          "Croatian",
          "Czech",
          "Danish",
          "Divehi, Dhivehi, Maldivian",
          "Dutch, Flemish",
          "Dzongkha",
          "English",
          "Esperanto",
          "Estonian",
          "Ewe",
          "Faroese",
          "Fijian",
          "Finnish",
          "French",
          "Fulah",
          "Gaelic, Scottish Gaelic",
          "Galician",
          "Ganda",
          "Georgian",
          "German",
          "Gikuyu, Kikuyu",
          "Greek (Modern)",
          "Greenlandic, Kalaallisut",
          "Guarani",
          "Gujarati",
          "Haitian, Haitian Creole",
          "Hausa",
          "Hebrew",
          "Herero",
          "Hindi",
          "Hiri Motu",
          "Hungarian",
          "Icelandic",
          "Ido",
          "Igbo",
          "Indonesian",
          "Interlingua (International Auxiliary Language Association)",
          "Interlingue",
          "Inuktitut",
          "Inupiaq",
          "Irish",
          "Italian",
          "Japanese",
          "Javanese",
          "Kannada",
          "Kanuri",
          "Kashmiri",
          "Kazakh",
          "Kinyarwanda",
          "Komi",
          "Kongo",
          "Korean",
          "Kwanyama, Kuanyama",
          "Kurdish",
          "Kyrgyz",
          "Lao",
          "Latin",
          "Latvian",
          "Letzeburgesch, Luxembourgish",
          "Limburgish, Limburgan, Limburger",
          "Lingala",
          "Lithuanian",
          "Luba-Katanga",
          "Macedonian",
          "Malagasy",
          "Malay",
          "Malayalam",
          "Maltese",
          "Manx",
          "Maori",
          "Marathi",
          "Marshallese",
          "Moldovan, Moldavian, Romanian",
          "Mongolian",
          "Nauru",
          "Navajo, Navaho",
          "Northern Ndebele",
          "Ndonga",
          "Nepali",
          "Northern Sami",
          "Norwegian",
          "Norwegian Bokmål",
          "Norwegian Nynorsk",
          "Nuosu, Sichuan Yi",
          "Occitan (post 1500)",
          "Ojibwa",
          "Oriya",
          "Oromo",
          "Ossetian, Ossetic",
          "Pali",
          "Panjabi, Punjabi",
          "Pashto, Pushto",
          "Persian",
          "Polish",
          "Portuguese",
          "Quechua",
          "Romansh",
          "Rundi",
          "Russian",
          "Samoan",
          "Sango",
          "Sanskrit",
          "Sardinian",
          "Serbian",
          "Shona",
          "Sindhi",
          "Sinhala, Sinhalese",
          "Slovak",
          "Slovenian",
          "Somali",
          "Sotho, Southern",
          "South Ndebele",
          "Spanish, Castilian",
          "Sundanese",
          "Swahili",
          "Swati",
          "Swedish",
          "Tagalog",
          "Tahitian",
          "Tajik",
          "Tamil",
          "Tatar",
          "Telugu",
          "Thai",
          "Tibetan",
          "Tigrinya",
          "Tonga (Tonga Islands)",
          "Tsonga",
          "Tswana",
          "Turkish",
          "Turkmen",
          "Twi",
          "Uighur, Uyghur",
          "Ukrainian",
          "Urdu",
          "Uzbek",
          "Venda",
          "Vietnamese",
          "Volap_k",
          "Walloon",
          "Welsh",
          "Western Frisian",
          "Wolof",
          "Xhosa",
          "Yiddish",
          "Yoruba",
          "Zhuang, Chuang",
          "Zulu"
        ]
      },
      "Error": {
        "type": "object",
        "properties": {
          "status": {
            "type": "string",
            "enum": [
              "error"
            ],
            "example": "error"
          },
          "message": {
            "type": "string",
            "description": "An error message.",
            "example": "Invalid request"
          },
          "details": {
            "type": "array",
            "description": "Suggested actions to resolve the error.",
            "items": {
              "type": "string"
            }
          }
        }
      }
    },
    "parameters": {
      "translationID": {
        "in": "path",
        "required": true,
        "name": "id",
        "schema": {
          "type": "string"
        },
        "description": "The ID of the translation to get results for.",
        "example": "5d40fdaf174b4c0007043072"
      }
    },
    "responses": {
      "NotFound": {
        "description": "Not Found",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "allOf": [
                {
                  "$ref": "#/components/schemas/Error"
                },
                {
                  "properties": {
                    "error_type": {
                      "type": "string",
                      "enum": [
                        "not_found"
                      ],
                      "description": "The requested resource was not found."
                    }
                  }
                }
              ]
            }
          }
        }
      },
      "Unauthorized": {
        "description": "Unauthorized",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "allOf": [
                {
                  "$ref": "#/components/schemas/Error"
                },
                {
                  "properties": {
                    "error_type": {
                      "type": "string",
                      "enum": [
                        "authentication"
                      ],
                      "description": "Token not provided for not valid."
                    }
                  }
                }
              ]
            }
          }
        }
      },
      "BadRequest": {
        "description": "Invalid Request",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "allOf": [
                {
                  "$ref": "#/components/schemas/Error"
                },
                {
                  "properties": {
                    "error_type": {
                      "type": "string",
                      "enum": [
                        "validation"
                      ],
                      "description": "Invalid parameters provided."
                    }
                  }
                }
              ]
            }
          }
        }
      },
      "Forbidden": {
        "description": "Not Permitted",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "allOf": [
                {
                  "$ref": "#/components/schemas/Error"
                },
                {
                  "properties": {
                    "error_type": {
                      "type": "string",
                      "enum": [
                        "permission"
                      ],
                      "description": "Not permitted to access requested resource."
                    }
                  }
                }
              ]
            }
          }
        }
      },
      "Unexpected": {
        "description": "Unexpected Error",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "allOf": [
                {
                  "$ref": "#/components/schemas/Error"
                },
                {
                  "properties": {
                    "error_type": {
                      "type": "string",
                      "enum": [
                        "server_error"
                      ],
                      "description": "An unexpected error."
                    }
                  }
                }
              ]
            }
          }
        }
      },
      "Validation": {
        "description": "Validation Error",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "allOf": [
                {
                  "$ref": "#/components/schemas/Error"
                },
                {
                  "properties": {
                    "error_type": {
                      "type": "string",
                      "enum": [
                        "validation"
                      ],
                      "description": "Invalid parameters provided."
                    }
                  }
                }
              ]
            }
          }
        }
      },
      "Throttled": {
        "description": "Too Many Requests",
        "content": {
          "text/html": {
            "schema": {
              "type": "string",
              "enum": [
                "Too many requests."
              ]
            }
          }
        }
      }
    },
    "securitySchemes": {
      "bearerAuth": {
        "type": "http",
        "scheme": "bearer"
      }
    }
  },
  "security": [
    {
      "bearerAuth": []
    }
  ],
  "paths": {
    "/translations/{id}": {
      "put": {
        "parameters": [
          {
            "$ref": "#/components/parameters/translationID"
          }
        ],
        "description": "This endpoint updates a translation.\nPlease note that this feature is exclusively available as part of the [Business API](https://paperform.co/pricing/).\n",
        "operationId": "updateTranslation",
        "tags": [
          "Translations"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Translation"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successfully updated a translation with the provided values\n",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string",
                      "enum": [
                        "ok"
                      ]
                    },
                    "results": {
                      "type": "object",
                      "properties": {
                        "translation": {
                          "$ref": "#/components/schemas/Translation"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "$ref": "#/components/responses/BadRequest"
          },
          "401": {
            "$ref": "#/components/responses/Unauthorized"
          },
          "403": {
            "$ref": "#/components/responses/Forbidden"
          },
          "404": {
            "$ref": "#/components/responses/NotFound"
          },
          "422": {
            "$ref": "#/components/responses/Validation"
          },
          "429": {
            "$ref": "#/components/responses/Throttled"
          },
          "5XX": {
            "$ref": "#/components/responses/Unexpected"
          }
        }
      }
    }
  },
  "x-readme": {
    "explorer-enabled": true,
    "proxy-enabled": true
  },
  "_id": {
    "buffer": {
      "0": 98,
      "1": 143,
      "2": 16,
      "3": 66,
      "4": 9,
      "5": 226,
      "6": 33,
      "7": 0,
      "8": 110,
      "9": 108,
      "10": 82,
      "11": 252
    }
  }
}
```