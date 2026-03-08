# /forms/{slug_or_id}/products/{product_sku}

This endpoint returns the product available for a specific form by SKU. This feature is available as part of the [Standard API](https://paperform.co/pricing/).

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
      "productSKU": {
        "in": "path",
        "name": "product_sku",
        "required": true,
        "schema": {
          "type": "string"
        },
        "description": "The SKU of the product.",
        "example": "SKU-123"
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
    "/forms/{slug_or_id}/products/{product_sku}": {
      "get": {
        "parameters": [
          {
            "$ref": "#/components/parameters/slugOrID"
          },
          {
            "$ref": "#/components/parameters/productSKU"
          }
        ],
        "description": "This endpoint returns the product available for a specific form by SKU. This feature is available as part of the [Standard API](https://paperform.co/pricing/).\n",
        "operationId": "getFormProduct",
        "tags": [
          "Products"
        ],
        "responses": {
          "200": {
            "description": "Successfully returned product for a single form that matched the provided SKU\n",
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
                        "products": {
                          "type": "array",
                          "items": {
                            "allOf": [
                              {
                                "$ref": "#/components/schemas/ProductItem"
                              },
                              {
                                "type": "object",
                                "properties": {
                                  "sold": {
                                    "type": "number",
                                    "format": "int32",
                                    "example": 10,
                                    "readOnly": true,
                                    "description": "The quantity sold."
                                  }
                                }
                              }
                            ]
                          }
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