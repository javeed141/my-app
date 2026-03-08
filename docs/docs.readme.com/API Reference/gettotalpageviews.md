# Get total page views

Get total page views for a project.

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
    "/v2/pageview/total": {
      "get": {
        "description": "Get total page views for a project.",
        "summary": "Get total page views",
        "operationId": "getTotalPageViews",
        "tags": [
          "Page Views"
        ],
        "parameters": [
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
          }
        ],
        "responses": {
          "200": {
            "description": "Total page views",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "total": {
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
      }
    },
    "schemas": {
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