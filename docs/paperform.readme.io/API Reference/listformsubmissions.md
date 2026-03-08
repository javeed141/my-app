# /forms/{slug_or_id}/submissions

This endpoint returns a list of submissions for a form matching the requested parameters. This feature is available as part of the [Standard API](https://paperform.co/pricing/).

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
      "Submission": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid",
            "description": "The unique identifier of the Submission.",
            "example": "5d40fdaf174b4c0007043072",
            "readOnly": true
          },
          "form_id": {
            "type": "string",
            "format": "uuid",
            "description": "The id of the Form for the Submission.",
            "example": "5d40fdaf174b4c0007043072",
            "readOnly": true
          },
          "data": {
            "$ref": "#/components/schemas/SubmissionData"
          },
          "device": {
            "$ref": "#/components/schemas/Device"
          },
          "charge": {
            "$ref": "#/components/schemas/Charge"
          },
          "pdfs": {
            "type": "object",
            "nullable": true,
            "additionalProperties": {
              "$ref": "#/components/schemas/Pdf"
            },
            "description": "The PDFs generated for the Submission."
          },
          "created_at": {
            "type": "string",
            "description": "A formatted date-time string in your account timezone indicating the time the form was created.",
            "readOnly": true,
            "example": "2019-04-14T09:00:00.000Z"
          },
          "account_timezone": {
            "type": "string",
            "description": "The configured timezone for your account.",
            "example": "America/Los_Angeles",
            "readOnly": true
          },
          "created_at_utc": {
            "type": "string",
            "format": "date-time",
            "description": "A formatted date-time string in UTC indicating the time the form was created.",
            "readOnly": true,
            "example": "2019-04-14T09:00:00.000Z"
          }
        }
      },
      "SubmissionData": {
        "type": "object",
        "description": "The `data` object stores the answers from the form. Each value is stored against it's key. Note that custom keys are not used here.",
        "properties": {
          "KEY": {
            "oneOf": [
              {
                "type": "string"
              },
              {
                "type": "number"
              },
              {
                "type": "array",
                "items": {
                  "oneOf": [
                    {
                      "type": "string"
                    },
                    {
                      "type": "object"
                    }
                  ]
                }
              },
              {
                "type": "object"
              },
              {
                "type": "boolean"
              }
            ]
          }
        }
      },
      "Device": {
        "description": "Information about the device which made the submission.",
        "type": "object",
        "properties": {
          "type": {
            "type": "string"
          },
          "device": {
            "type": "string"
          },
          "platform": {
            "type": "string"
          },
          "browser": {
            "type": "string"
          },
          "embedded": {
            "type": "boolean"
          },
          "url": {
            "type": "string",
            "format": "uri"
          },
          "user_agent": {
            "type": "string"
          },
          "utm_source": {
            "type": "string"
          },
          "utm_medium": {
            "type": "string"
          },
          "utm_campaign": {
            "type": "string"
          },
          "utm_term": {
            "type": "string"
          },
          "utm_content": {
            "type": "string"
          },
          "ip_address": {
            "type": "string"
          }
        }
      },
      "Charge": {
        "description": "Information about payments relating to the submission.",
        "type": "object",
        "properties": {
          "products": {
            "description": "The products included in the charge.",
            "type": "object",
            "additionalProperties": {
              "$ref": "#/components/schemas/Product"
            }
          },
          "summary": {
            "description": "A summary of the charge.",
            "type": "string"
          },
          "discount": {
            "description": "The total discount applied to the charge.",
            "type": "integer"
          },
          "discounted_subscriptions": {
            "description": "The IDs of discounted subscriptions in the charge.",
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "coupon": {
            "description": "If a coupon was applied to the charge.",
            "type": "boolean"
          },
          "total": {
            "description": "The total of the charge.",
            "type": "integer"
          },
          "tax": {
            "description": "The fixed tax amounts on the charge.",
            "type": "integer"
          },
          "tax_percentage": {
            "description": "The percentage tax amounts on the charge.",
            "type": "integer"
          },
          "processing_fee": {
            "description": "The processing fee on the charge.",
            "type": "integer"
          },
          "authorize": {
            "description": "If the charge was only authorized for later capture.",
            "type": "boolean"
          },
          "receipt_email": {
            "description": "The receipt email given in the checkout.",
            "type": "string",
            "format": "email",
            "nullable": true
          },
          "customer": {
            "$ref": "#/components/schemas/Customer"
          },
          "charge": {
            "type": "string"
          },
          "payment_source_id": {
            "description": "The id of the payment source used to make the charge.",
            "type": "integer"
          },
          "payment_source_service": {
            "description": "The payment service from the payment source used to make the charge.",
            "type": "string"
          },
          "live": {
            "description": "If the charge was made in 'live' mode.",
            "type": "boolean"
          }
        }
      },
      "Customer": {
        "description": "The customer attached to the charge.",
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          }
        }
      },
      "Pdf": {
        "type": "object",
        "description": "The PDFs generated for the submission.",
        "properties": {
          "url": {
            "type": "string",
            "format": "uri"
          },
          "filename": {
            "type": "string"
          }
        }
      },
      "Product": {
        "description": "A product included in a charge.",
        "type": "object",
        "properties": {
          "price": {
            "type": "integer"
          },
          "total": {
            "type": "integer"
          },
          "quantity": {
            "type": "integer"
          },
          "summary": {
            "type": "string"
          }
        }
      },
      "Pagination": {
        "type": "object",
        "properties": {
          "total": {
            "type": "integer",
            "description": "The total number of items.",
            "readOnly": true,
            "example": 57
          },
          "has_more": {
            "description": "Whether there are more items.",
            "type": "boolean",
            "example": true,
            "readOnly": true
          },
          "limit": {
            "description": "The limit of items per page.",
            "type": "integer",
            "example": 20,
            "default": 20
          },
          "skip": {
            "description": "The number of items to skip.",
            "type": "integer",
            "default": 0,
            "example": 0
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
      "afterId": {
        "in": "query",
        "name": "after_id",
        "schema": {
          "type": "string"
        },
        "description": "Return results after the provided ID.",
        "example": "5d40fdaf174b4c0007043072"
      },
      "beforeId": {
        "in": "query",
        "name": "before_id",
        "schema": {
          "type": "string"
        },
        "description": "Return results before the provided ID.",
        "example": "5d40fdaf174b4c0007043072"
      },
      "skip": {
        "in": "query",
        "name": "skip",
        "schema": {
          "type": "integer",
          "default": 0
        },
        "description": "Number of results to skip in the result set."
      },
      "limit": {
        "in": "query",
        "name": "limit",
        "schema": {
          "type": "integer",
          "maximum": 100,
          "default": 20
        },
        "description": "The number or results to return."
      },
      "sort": {
        "in": "query",
        "name": "sort",
        "schema": {
          "type": "string",
          "enum": [
            "ASC",
            "DESC"
          ],
          "default": "DESC"
        },
        "description": "The direction to sort in. Results are sorted by `created_at`, and defaults to `\"DESC\"`.",
        "example": "ASC"
      },
      "beforeDate": {
        "in": "query",
        "name": "before_date",
        "schema": {
          "type": "string",
          "format": "date-time"
        },
        "description": "Return results created on or after this date-time (UTC). Overwritten by `before_id`.",
        "example": "2019-06-11T20:36:29.000Z"
      },
      "afterDate": {
        "in": "query",
        "name": "after_date",
        "schema": {
          "type": "string",
          "format": "date-time"
        },
        "description": "Return results created before this date (UTC). Overwritten by `after_id`.",
        "example": "2019-06-11T20:36:29.000Z"
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
    "/forms/{slug_or_id}/submissions": {
      "get": {
        "parameters": [
          {
            "$ref": "#/components/parameters/slugOrID"
          },
          {
            "$ref": "#/components/parameters/limit"
          },
          {
            "$ref": "#/components/parameters/skip"
          },
          {
            "$ref": "#/components/parameters/afterId"
          },
          {
            "$ref": "#/components/parameters/beforeId"
          },
          {
            "$ref": "#/components/parameters/beforeDate"
          },
          {
            "$ref": "#/components/parameters/afterDate"
          },
          {
            "$ref": "#/components/parameters/sort"
          }
        ],
        "description": "This endpoint returns a list of submissions for a form matching the requested parameters. This feature is available as part of the [Standard API](https://paperform.co/pricing/).\n",
        "operationId": "listFormSubmissions",
        "tags": [
          "Submissions"
        ],
        "responses": {
          "200": {
            "description": "Successfully returned a list of submissions",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "allOf": [
                    {
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
                            "submissions": {
                              "type": "array",
                              "items": {
                                "$ref": "#/components/schemas/Submission"
                              }
                            }
                          }
                        }
                      }
                    },
                    {
                      "$ref": "#/components/schemas/Pagination"
                    }
                  ]
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