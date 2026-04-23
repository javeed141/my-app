# Get top pages

Retrieve top pages associated with a project and their respective counts.

# OpenAPI definition

```json
{
  "openapi": "3.0.2",
  "x-api-id": "readme-metrics-api",
  "info": {
    "description": "Developer Metrics API",
    "version": "2.77.0",
    "title": "Developer Metrics API",
    "contact": {
      "name": "Developer Metrics API Support",
      "url": "https://docs.readme.com/main/docs/need-more-support",
      "email": "support@readme.io"
    }
  },
  "servers": [
    {
      "url": "https://metrics.readme.io"
    }
  ],
  "tags": [
    {
      "name": "Page Views"
    }
  ],
  "security": [
    {
      "apiKey": []
    }
  ],
  "paths": {
    "/v2/pageview/top": {
      "get": {
        "description": "Retrieve top pages associated with a project and their respective counts.",
        "summary": "Get top pages",
        "operationId": "getTopPages",
        "tags": [
          "Page Views"
        ],
        "parameters": [
          {
            "$ref": "#/components/parameters/email"
          },
          {
            "$ref": "#/components/parameters/rangeLength"
          },
          {
            "$ref": "#/components/parameters/resolution"
          },
          {
            "$ref": "#/components/parameters/rangeStart"
          },
          {
            "$ref": "#/components/parameters/rangeEnd"
          },
          {
            "$ref": "#/components/parameters/timezone"
          },
          {
            "$ref": "#/components/parameters/limit"
          },
          {
            "$ref": "#/components/parameters/page"
          },
          {
            "$ref": "#/components/parameters/pageSize"
          }
        ],
        "responses": {
          "200": {
            "description": "Top pages viewed with associated counts.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "topPageviews": {
                      "type": "object",
                      "additionalProperties": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "path": {
                              "type": "string"
                            },
                            "count": {
                              "type": "number"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "securitySchemes": {
      "apiKey": {
        "type": "http",
        "scheme": "basic"
      }
    },
    "parameters": {
      "timezone": {
        "name": "x-timezone",
        "in": "header",
        "required": false,
        "schema": {
          "$ref": "#/components/schemas/TimeZone"
        }
      },
      "rangeStart": {
        "name": "rangeStart",
        "description": "Starting date",
        "in": "query",
        "required": false,
        "schema": {
          "$ref": "#/components/schemas/RangeStart"
        }
      },
      "rangeEnd": {
        "name": "rangeEnd",
        "in": "query",
        "required": false,
        "schema": {
          "$ref": "#/components/schemas/RangeEnd"
        }
      },
      "rangeLength": {
        "name": "rangeLength",
        "in": "query",
        "required": false,
        "schema": {
          "$ref": "#/components/schemas/RangeLength"
        }
      },
      "resolution": {
        "name": "resolution",
        "in": "query",
        "required": false,
        "schema": {
          "$ref": "#/components/schemas/Resolution"
        }
      },
      "email": {
        "name": "email",
        "in": "query",
        "description": "Authenticated user's email.",
        "required": false,
        "schema": {
          "anyOf": [
            {
              "$ref": "#/components/schemas/Email"
            },
            {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/Email"
              }
            }
          ]
        }
      },
      "limit": {
        "name": "limit",
        "in": "query",
        "description": "The number of results to retrieve.",
        "schema": {
          "type": "number",
          "default": 30,
          "maximum": 500,
          "minimum": 1
        },
        "required": false
      },
      "page": {
        "name": "page",
        "in": "query",
        "description": "The current page of the result list.",
        "schema": {
          "type": "number",
          "default": 0
        }
      },
      "pageSize": {
        "name": "pageSize",
        "in": "query",
        "description": "Number of items per page.",
        "schema": {
          "type": "number",
          "default": 30,
          "maximum": 100,
          "minimum": 1
        }
      }
    },
    "schemas": {
      "Email": {
        "type": "string"
      },
      "RangeEnd": {
        "description": "Ending date",
        "type": "string",
        "format": "date",
        "example": "2021-01-01"
      },
      "RangeLength": {
        "description": "Length of the date range.",
        "type": "number",
        "default": 30,
        "minimum": 1,
        "maximum": 720
      },
      "RangeStart": {
        "description": "Starting date",
        "type": "string",
        "format": "date",
        "example": "2021-01-01"
      },
      "Resolution": {
        "description": "Relative time interval of data buckets.",
        "type": "string",
        "default": "day",
        "enum": [
          "hour",
          "day",
          "week",
          "month",
          "year"
        ]
      },
      "TimeZone": {
        "description": "Locale timezone in IANA format.",
        "type": "string",
        "default": "UTC",
        "pattern": "^[A-Za-z0-9/_+-]+$"
      }
    }
  },
  "x-readme": {
    "explorer-enabled": true,
    "proxy-enabled": true
  }
}
```