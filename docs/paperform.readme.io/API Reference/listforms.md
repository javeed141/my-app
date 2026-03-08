# /forms

This endpoint returns a list of forms that are accessible by the authorized user. This feature is available as part of the [Standard API](https://paperform.co/pricing/).

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
      "Form": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid",
            "readOnly": true,
            "description": "The unique identifier of the form.",
            "example": "5d40fdaf174b4c0007043072"
          },
          "slug": {
            "type": "string",
            "description": "The default generated slug for the form.",
            "readOnly": true,
            "example": "67fqxwkp"
          },
          "custom_slug": {
            "type": "string",
            "nullable": true,
            "description": "The custom slug for the form if set.",
            "example": "my-form-slug"
          },
          "space_id": {
            "type": "integer",
            "description": "The id of the Space which contains the form.",
            "example": "5d40fdaf174b4c0007043072"
          },
          "title": {
            "type": "string",
            "description": "The title of the form.",
            "example": "My Form Title",
            "nullable": true
          },
          "description": {
            "type": "string",
            "description": "The description of the form.",
            "example": "This is a description for my form",
            "nullable": true
          },
          "cover_image_url": {
            "type": "string",
            "nullable": true,
            "format": "uri",
            "example": "https://s3-ap-southeast-2.amazonaws.com/paperform/u-22714/1/2019-04-14/58p3u6p/cabinet-clothes-clothes-hanger-996329.jpg",
            "description": "The cover image for the form."
          },
          "url": {
            "type": "string",
            "format": "uri",
            "example": "https://lffa4fxo.paperform.co",
            "description": "The main sharing URL for the form."
          },
          "additional_urls": {
            "type": "array",
            "items": {
              "type": "string",
              "format": "uri"
            },
            "description": "Additional URLs for the form"
          },
          "live": {
            "type": "boolean",
            "description": "Indicates if the form is currently accepting submissions.",
            "readOnly": true,
            "example": true
          },
          "tags": {
            "type": "array",
            "nullable": true,
            "items": {
              "type": "string"
            },
            "description": "The tags assigned to the form."
          },
          "submission_count": {
            "type": "integer",
            "description": "The number of submissions the form has received.",
            "readOnly": true,
            "example": 50
          },
          "created_at": {
            "type": "string",
            "description": "A formatted date-time string in your account timezone indicating the time the form was created.",
            "readOnly": true,
            "example": "2019-04-14T09:00:00.000Z"
          },
          "updated_at": {
            "type": "string",
            "description": "A formatted date-time string in your account timezone indicating the time the form was created.",
            "readOnly": true,
            "example": "2019-04-14T09:00:00.000Z"
          },
          "account_timezone": {
            "type": "string",
            "description": "The configured timezone for your account.",
            "readOnly": true,
            "example": "Australia/Sydney"
          },
          "created_at_utc": {
            "type": "string",
            "format": "date-time",
            "description": "A formatted date-time string in UTC indicating the time the form was created.",
            "readOnly": true,
            "example": "2019-04-14T09:00:00.000Z"
          },
          "updated_at_utc": {
            "type": "string",
            "format": "date-time",
            "description": "A formatted date-time string in UTC indicating the time the form was created.",
            "readOnly": true,
            "example": "2019-04-14T09:00:00.000Z"
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
      "formSearch": {
        "in": "query",
        "name": "search",
        "schema": {
          "type": "string"
        },
        "description": "Search forms by title.",
        "example": "John Doe"
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
    "/forms": {
      "get": {
        "parameters": [
          {
            "$ref": "#/components/parameters/formSearch"
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
        "description": "This endpoint returns a list of forms that are accessible by the authorized user. This feature is available as part of the [Standard API](https://paperform.co/pricing/).\n",
        "operationId": "listForms",
        "tags": [
          "Forms"
        ],
        "responses": {
          "200": {
            "description": "Successfully returned a list of forms",
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
                            "forms": {
                              "type": "array",
                              "items": {
                                "$ref": "#/components/schemas/Form"
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