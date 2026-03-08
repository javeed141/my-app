# /forms/{slug_or_id}/webhooks

This endpoint returns a list of webhooks for a form that are accessible by the authorized user.
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
      "Webhook": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid",
            "description": "The id of the webhook.",
            "readOnly": true
          },
          "target_url": {
            "type": "string",
            "format": "url",
            "example": "https://example.com/webhook",
            "description": "The url for the webhook."
          },
          "triggers": {
            "type": "array",
            "description": "The triggers for the webhook.",
            "example": [
              "submission"
            ],
            "items": {
              "type": "string",
              "enum": [
                "submission",
                "partial_submission"
              ]
            }
          },
          "created_at": {
            "type": "string",
            "format": "date-time",
            "description": "A formatted date-time string in your account timezone indicating the time the webhook was created.",
            "example": "2018-01-01T12:00:00.000Z",
            "readOnly": true
          },
          "updated_at": {
            "type": "string",
            "format": "date-time",
            "description": "A formatted date-time string in your account timezone indicating the time the webhook was last updated.",
            "example": "2018-01-01T12:00:00.000Z",
            "readOnly": true
          },
          "account_timezone": {
            "type": "string",
            "description": "The timezone of your account.",
            "example": "America/Los_Angeles",
            "readOnly": true
          },
          "created_at_utc": {
            "type": "string",
            "format": "date-time",
            "description": "A formatted date-time string in UTC timezone indicating the time the webhook was created.",
            "example": "2018-01-01T12:00:00.000Z",
            "readOnly": true
          },
          "updated_at_utc": {
            "type": "string",
            "format": "date-time",
            "description": "A formatted date-time string in UTC timezone indicating the time the webhook was last updated.",
            "example": "2018-01-01T12:00:00.000Z",
            "readOnly": true
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
    "/forms/{slug_or_id}/webhooks": {
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
        "description": "This endpoint returns a list of webhooks for a form that are accessible by the authorized user.\nPlease note that this feature is exclusively available as part of the [Business API](https://paperform.co/pricing/).\n",
        "operationId": "listFormWebhooks",
        "tags": [
          "Webhooks"
        ],
        "responses": {
          "200": {
            "description": "Successfully returned a list of webhooks for a form",
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
                            "webhooks": {
                              "type": "array",
                              "items": {
                                "$ref": "#/components/schemas/Webhook"
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