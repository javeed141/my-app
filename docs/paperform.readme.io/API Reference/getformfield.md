# /forms/{slug_or_id}/fields/{field_key}

This endpoint returns a fields for a specific form by field key.
This feature is available as part of the [Standard API](https://paperform.co/pricing/).

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
      "ProductItem": {
        "type": "object",
        "allOf": [
          {
            "$ref": "#/components/schemas/ProductUpdate"
          },
          {
            "type": "object",
            "properties": {
              "SKU": {
                "type": "string",
                "description": "Product SKU.",
                "example": "PRODUCT-1"
              }
            }
          }
        ],
        "required": [
          "SKU",
          "name",
          "price"
        ]
      },
      "ProductUpdate": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "Product name.",
            "example": "Product 1",
            "nullable": true
          },
          "quantity": {
            "type": "number",
            "format": "int32",
            "description": "Product quantity.",
            "example": 5,
            "nullable": true
          },
          "price": {
            "type": "number",
            "format": "double",
            "description": "Product price.",
            "example": 10,
            "nullable": true
          },
          "minimum": {
            "type": "number",
            "format": "int32",
            "description": "Minimum number of products to be selected.",
            "example": 1,
            "nullable": true
          },
          "maximum": {
            "type": "number",
            "format": "int32",
            "description": "Maximum number of products to be selected.",
            "example": 10,
            "nullable": true
          },
          "discountable": {
            "type": "boolean",
            "description": "Whether the product can be discounted.",
            "example": false,
            "nullable": true
          },
          "images": {
            "type": "array",
            "description": "List of product images.",
            "items": {
              "type": "object",
              "properties": {
                "url": {
                  "type": "string",
                  "description": "Image URL.",
                  "example": "https://example.com/image.jpg"
                },
                "width": {
                  "type": "number",
                  "format": "int32",
                  "description": "Image width.",
                  "example": 100
                },
                "height": {
                  "type": "number",
                  "format": "int32",
                  "description": "Image height.",
                  "example": 100
                }
              },
              "required": [
                "url",
                "width"
              ]
            }
          }
        }
      },
      "Field": {
        "discriminator": {
          "propertyName": "type"
        },
        "oneOf": [
          {
            "$ref": "#/components/schemas/address"
          },
          {
            "$ref": "#/components/schemas/appointment"
          },
          {
            "$ref": "#/components/schemas/calculations"
          },
          {
            "$ref": "#/components/schemas/choices"
          },
          {
            "$ref": "#/components/schemas/color"
          },
          {
            "$ref": "#/components/schemas/country"
          },
          {
            "$ref": "#/components/schemas/date"
          },
          {
            "$ref": "#/components/schemas/dropdown"
          },
          {
            "$ref": "#/components/schemas/email"
          },
          {
            "$ref": "#/components/schemas/file"
          },
          {
            "$ref": "#/components/schemas/hidden"
          },
          {
            "$ref": "#/components/schemas/image"
          },
          {
            "$ref": "#/components/schemas/matrix"
          },
          {
            "$ref": "#/components/schemas/number"
          },
          {
            "$ref": "#/components/schemas/phone"
          },
          {
            "$ref": "#/components/schemas/price"
          },
          {
            "$ref": "#/components/schemas/products"
          },
          {
            "$ref": "#/components/schemas/rank"
          },
          {
            "$ref": "#/components/schemas/rating"
          },
          {
            "$ref": "#/components/schemas/scale"
          },
          {
            "$ref": "#/components/schemas/signature"
          },
          {
            "$ref": "#/components/schemas/slider"
          },
          {
            "$ref": "#/components/schemas/subscriptions"
          },
          {
            "$ref": "#/components/schemas/text"
          },
          {
            "$ref": "#/components/schemas/time"
          },
          {
            "$ref": "#/components/schemas/url"
          },
          {
            "$ref": "#/components/schemas/yesNo"
          }
        ]
      },
      "FieldOptions": {
        "type": "object",
        "properties": {
          "options": {
            "description": "A list of options.",
            "type": "array",
            "example": [
              "Option 1",
              "Option 2",
              "Option 3",
              "etc."
            ],
            "items": {
              "type": "string"
            }
          }
        }
      },
      "FormFieldStandardProperties": {
        "type": "object",
        "description": "Other type of form field.",
        "properties": {
          "key": {
            "type": "string",
            "example": "3jbh8",
            "readOnly": true,
            "description": "The unique key for this field."
          },
          "title": {
            "type": "string",
            "nullable": true,
            "description": "The title of this field."
          },
          "description": {
            "type": "string",
            "nullable": true,
            "description": "The description of this field."
          },
          "required": {
            "type": "boolean",
            "example": true,
            "nullable": true,
            "description": "Whether this field is required."
          },
          "custom_key": {
            "type": "string",
            "nullable": true,
            "description": "The custom key of this field."
          },
          "placeholder": {
            "type": "string",
            "nullable": true,
            "description": "The placeholder for this field."
          }
        }
      },
      "text": {
        "type": "object",
        "description": "Other field type",
        "allOf": [
          {
            "$ref": "#/components/schemas/FormFieldStandardProperties"
          },
          {
            "type": "object",
            "properties": {
              "type": {
                "type": "string",
                "example": "text",
                "readOnly": true,
                "description": "The type of field (Text).",
                "enum": [
                  "text"
                ]
              }
            }
          }
        ]
      },
      "email": {
        "type": "object",
        "description": "Other field type",
        "allOf": [
          {
            "$ref": "#/components/schemas/FormFieldStandardProperties"
          },
          {
            "type": "object",
            "properties": {
              "type": {
                "type": "string",
                "example": "email",
                "readOnly": true,
                "description": "The type of field (Email).",
                "enum": [
                  "email"
                ]
              }
            }
          }
        ]
      },
      "url": {
        "type": "object",
        "description": "Other field type",
        "allOf": [
          {
            "$ref": "#/components/schemas/FormFieldStandardProperties"
          },
          {
            "type": "object",
            "properties": {
              "type": {
                "type": "string",
                "example": "url",
                "readOnly": true,
                "description": "The type of field (Url).",
                "enum": [
                  "url"
                ]
              }
            }
          }
        ]
      },
      "yesNo": {
        "type": "object",
        "description": "Other field type",
        "allOf": [
          {
            "$ref": "#/components/schemas/FormFieldStandardProperties"
          },
          {
            "type": "object",
            "properties": {
              "type": {
                "type": "string",
                "example": "yesNo",
                "readOnly": true,
                "description": "The type of field (Yes/No).",
                "enum": [
                  "yesNo"
                ]
              }
            }
          }
        ]
      },
      "color": {
        "type": "object",
        "description": "Other field type",
        "allOf": [
          {
            "$ref": "#/components/schemas/FormFieldStandardProperties"
          },
          {
            "type": "object",
            "properties": {
              "type": {
                "type": "string",
                "example": "color",
                "readOnly": true,
                "description": "The type of field (Color Picker).",
                "enum": [
                  "color"
                ]
              }
            }
          }
        ]
      },
      "number": {
        "type": "object",
        "description": "Other field type",
        "allOf": [
          {
            "$ref": "#/components/schemas/FormFieldStandardProperties"
          },
          {
            "type": "object",
            "properties": {
              "type": {
                "type": "string",
                "example": "number",
                "readOnly": true,
                "description": "The type of field (Number).",
                "enum": [
                  "number"
                ]
              }
            }
          }
        ]
      },
      "phone": {
        "type": "object",
        "description": "Other field type",
        "allOf": [
          {
            "$ref": "#/components/schemas/FormFieldStandardProperties"
          },
          {
            "type": "object",
            "properties": {
              "type": {
                "type": "string",
                "example": "phone",
                "readOnly": true,
                "description": "The type of field (Phone Number).",
                "enum": [
                  "phone"
                ]
              }
            }
          }
        ]
      },
      "address": {
        "type": "object",
        "description": "Other field type",
        "allOf": [
          {
            "$ref": "#/components/schemas/FormFieldStandardProperties"
          },
          {
            "type": "object",
            "properties": {
              "type": {
                "type": "string",
                "example": "address",
                "readOnly": true,
                "description": "The type of field (Address).",
                "enum": [
                  "address"
                ]
              }
            }
          }
        ]
      },
      "country": {
        "type": "object",
        "description": "Other field type",
        "allOf": [
          {
            "$ref": "#/components/schemas/FormFieldStandardProperties"
          },
          {
            "type": "object",
            "properties": {
              "type": {
                "type": "string",
                "example": "country",
                "readOnly": true,
                "description": "The type of field (Country).",
                "enum": [
                  "country"
                ]
              }
            }
          }
        ]
      },
      "appointment": {
        "type": "object",
        "description": "Other field type",
        "allOf": [
          {
            "$ref": "#/components/schemas/FormFieldStandardProperties"
          },
          {
            "type": "object",
            "properties": {
              "type": {
                "type": "string",
                "example": "appointment",
                "readOnly": true,
                "description": "The type of field (Appointment).",
                "enum": [
                  "appointment"
                ]
              }
            }
          }
        ]
      },
      "date": {
        "type": "object",
        "description": "Other field type",
        "allOf": [
          {
            "$ref": "#/components/schemas/FormFieldStandardProperties"
          },
          {
            "type": "object",
            "properties": {
              "type": {
                "type": "string",
                "example": "date",
                "readOnly": true,
                "description": "The type of field (Date).",
                "enum": [
                  "date"
                ]
              }
            }
          }
        ]
      },
      "time": {
        "type": "object",
        "description": "Other field type",
        "allOf": [
          {
            "$ref": "#/components/schemas/FormFieldStandardProperties"
          },
          {
            "type": "object",
            "properties": {
              "type": {
                "type": "string",
                "example": "time",
                "readOnly": true,
                "description": "The type of field (Time).",
                "enum": [
                  "time"
                ]
              }
            }
          }
        ]
      },
      "slider": {
        "type": "object",
        "description": "Other field type",
        "allOf": [
          {
            "$ref": "#/components/schemas/FormFieldStandardProperties"
          },
          {
            "type": "object",
            "properties": {
              "type": {
                "type": "string",
                "example": "slider",
                "readOnly": true,
                "description": "The type of field (Slider).",
                "enum": [
                  "slider"
                ]
              }
            }
          }
        ]
      },
      "image": {
        "type": "object",
        "description": "Other field type",
        "allOf": [
          {
            "$ref": "#/components/schemas/FormFieldStandardProperties"
          },
          {
            "type": "object",
            "properties": {
              "type": {
                "type": "string",
                "example": "image",
                "readOnly": true,
                "description": "The type of field (Image).",
                "enum": [
                  "image"
                ]
              }
            }
          }
        ]
      },
      "file": {
        "type": "object",
        "description": "Other field type",
        "allOf": [
          {
            "$ref": "#/components/schemas/FormFieldStandardProperties"
          },
          {
            "type": "object",
            "properties": {
              "type": {
                "type": "string",
                "example": "file",
                "readOnly": true,
                "description": "The type of field (File).",
                "enum": [
                  "file"
                ]
              }
            }
          }
        ]
      },
      "signature": {
        "type": "object",
        "description": "Other field type",
        "allOf": [
          {
            "$ref": "#/components/schemas/FormFieldStandardProperties"
          },
          {
            "type": "object",
            "properties": {
              "type": {
                "type": "string",
                "example": "signature",
                "readOnly": true,
                "description": "The type of field (Signature).",
                "enum": [
                  "signature"
                ]
              }
            }
          }
        ]
      },
      "price": {
        "type": "object",
        "description": "Other field type",
        "allOf": [
          {
            "$ref": "#/components/schemas/FormFieldStandardProperties"
          },
          {
            "type": "object",
            "properties": {
              "type": {
                "type": "string",
                "example": "price",
                "readOnly": true,
                "description": "The type of field (Price).",
                "enum": [
                  "price"
                ]
              }
            }
          }
        ]
      },
      "subscriptions": {
        "type": "object",
        "description": "Other field type",
        "allOf": [
          {
            "$ref": "#/components/schemas/FormFieldStandardProperties"
          },
          {
            "type": "object",
            "properties": {
              "type": {
                "type": "string",
                "example": "subscriptions",
                "readOnly": true,
                "description": "The type of field (Subscriptions).",
                "enum": [
                  "subscriptions"
                ]
              }
            }
          }
        ]
      },
      "hidden": {
        "type": "object",
        "description": "Other field type",
        "allOf": [
          {
            "$ref": "#/components/schemas/FormFieldStandardProperties"
          },
          {
            "type": "object",
            "properties": {
              "type": {
                "type": "string",
                "example": "hidden",
                "readOnly": true,
                "description": "The type of field (Hidden).",
                "enum": [
                  "hidden"
                ]
              }
            }
          }
        ]
      },
      "rating": {
        "type": "object",
        "description": "Other field type",
        "allOf": [
          {
            "$ref": "#/components/schemas/FormFieldStandardProperties"
          },
          {
            "type": "object",
            "properties": {
              "type": {
                "type": "string",
                "example": "rating",
                "readOnly": true,
                "description": "The type of field (Rating).",
                "enum": [
                  "rating"
                ]
              }
            }
          }
        ]
      },
      "matrix": {
        "type": "object",
        "description": "Other field type",
        "allOf": [
          {
            "$ref": "#/components/schemas/FormFieldStandardProperties"
          },
          {
            "type": "object",
            "properties": {
              "type": {
                "type": "string",
                "example": "matrix",
                "readOnly": true,
                "description": "The type of field (Matrix).",
                "enum": [
                  "matrix"
                ]
              }
            }
          }
        ]
      },
      "dropdown": {
        "type": "object",
        "description": "Dropdown field type.",
        "allOf": [
          {
            "$ref": "#/components/schemas/FormFieldStandardProperties"
          },
          {
            "type": "object",
            "properties": {
              "dropdown": {
                "$ref": "#/components/schemas/FieldOptions"
              },
              "type": {
                "type": "string",
                "example": "dropdown",
                "readOnly": true,
                "description": "The type of field (Dropdown).",
                "enum": [
                  "dropdown"
                ]
              }
            }
          }
        ]
      },
      "choices": {
        "type": "object",
        "description": "Choices field type.",
        "allOf": [
          {
            "$ref": "#/components/schemas/FormFieldStandardProperties"
          },
          {
            "type": "object",
            "properties": {
              "choices": {
                "$ref": "#/components/schemas/FieldOptions"
              },
              "type": {
                "type": "string",
                "example": "choices",
                "description": "The type of field (Multiple Choice).",
                "readOnly": true,
                "enum": [
                  "choices"
                ]
              }
            }
          }
        ]
      },
      "scale": {
        "type": "object",
        "description": "Scale field type.",
        "allOf": [
          {
            "$ref": "#/components/schemas/FormFieldStandardProperties"
          },
          {
            "type": "object",
            "properties": {
              "scale": {
                "$ref": "#/components/schemas/FieldOptions"
              },
              "type": {
                "type": "string",
                "example": "scale",
                "description": "The type of field (Scale).",
                "readOnly": true,
                "enum": [
                  "scale"
                ]
              }
            }
          }
        ]
      },
      "rank": {
        "type": "object",
        "description": "Rank field type.",
        "allOf": [
          {
            "$ref": "#/components/schemas/FormFieldStandardProperties"
          },
          {
            "type": "object",
            "properties": {
              "rank": {
                "$ref": "#/components/schemas/FieldOptions"
              },
              "type": {
                "type": "string",
                "example": "rank",
                "description": "The type of field (Rank).",
                "readOnly": true,
                "enum": [
                  "rank"
                ]
              }
            }
          }
        ]
      },
      "products": {
        "type": "object",
        "description": "Products field type.",
        "allOf": [
          {
            "$ref": "#/components/schemas/FormFieldStandardProperties"
          },
          {
            "type": "object",
            "properties": {
              "type": {
                "type": "string",
                "example": "products",
                "readOnly": true,
                "description": "The type of field (Product).",
                "enum": [
                  "products"
                ]
              },
              "products": {
                "type": "object",
                "properties": {
                  "products": {
                    "type": "array",
                    "description": "List of products.",
                    "items": {
                      "$ref": "#/components/schemas/ProductItem"
                    }
                  }
                }
              }
            }
          }
        ]
      },
      "calculations": {
        "type": "object",
        "description": "Calculations field type.",
        "allOf": [
          {
            "$ref": "#/components/schemas/FormFieldStandardProperties"
          },
          {
            "type": "object",
            "properties": {
              "type": {
                "type": "string",
                "example": "calculations",
                "readOnly": true,
                "description": "The type of field (Calculation).",
                "enum": [
                  "calculations"
                ]
              },
              "calculations": {
                "type": "object",
                "properties": {
                  "calculation": {
                    "type": "string",
                    "description": "The calculation to perform.",
                    "example": "1 + 1"
                  }
                }
              }
            }
          }
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
      "slugOrID": {
        "in": "path",
        "name": "slug_or_id",
        "required": true,
        "schema": {
          "type": "string"
        },
        "description": "The form's slug, custom slug or ID.",
        "example": "my-form-slug"
      },
      "fieldKey": {
        "in": "path",
        "name": "field_key",
        "required": true,
        "schema": {
          "type": "string"
        },
        "description": "The key of the field on the form.",
        "example": "a1b2c3d4e5"
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
    "/forms/{slug_or_id}/fields/{field_key}": {
      "get": {
        "parameters": [
          {
            "$ref": "#/components/parameters/slugOrID"
          },
          {
            "$ref": "#/components/parameters/fieldKey"
          }
        ],
        "description": "This endpoint returns a fields for a specific form by field key.\nThis feature is available as part of the [Standard API](https://paperform.co/pricing/).\n",
        "operationId": "getFormField",
        "tags": [
          "Form Fields"
        ],
        "responses": {
          "200": {
            "description": "Successfully returned a field for a single form that matched the provided field key.\n",
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
                        "field": {
                          "type": "object",
                          "oneOf": [
                            {
                              "$ref": "#/components/schemas/Field"
                            }
                          ]
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