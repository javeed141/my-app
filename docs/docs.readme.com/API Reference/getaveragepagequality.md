# Get average page quality

Get the total number of project page quality votes, broken down into positive and overall votes.

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
      "name": "Page Quality"
    }
  ],
  "security": [
    {
      "apiKey": []
    }
  ],
  "paths": {
    "/v2/thumb/average": {
      "get": {
        "description": "Get the total number of project page quality votes, broken down into positive and overall votes.",
        "summary": "Get average page quality",
        "operationId": "getAveragePageQuality",
        "tags": [
          "Page Quality"
        ],
        "parameters": [
          {
            "$ref": "#/components/parameters/path"
          },
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
          }
        ],
        "responses": {
          "200": {
            "description": "Total and postitive votes per month for the last 6 months.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "period": {
                        "type": "string",
                        "format": "date-time"
                      },
                      "total": {
                        "type": "number"
                      },
                      "positive": {
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
  },
  "components": {
    "securitySchemes": {
      "apiKey": {
        "type": "http",
        "scheme": "basic"
      }
    },
    "parameters": {
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
      "path": {
        "name": "path",
        "in": "query",
        "description": "Project documentation or normalized API URL path.",
        "schema": {
          "anyOf": [
            {
              "type": "string",
              "example": "/docs/getting-started"
            },
            {
              "type": "array",
              "items": {
                "type": "string",
                "example": "/docs/getting-started"
              }
            }
          ]
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
      }
    }
  },
  "x-readme": {
    "explorer-enabled": true,
    "proxy-enabled": true
  }
}
```