# List Balance Reports

Get all balance reports for a given internal account

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
    "/internal_accounts/{internal_account_id}/balance_reports": {
      "get": {
        "summary": "List Balance Reports",
        "description": "Get all balance reports for a given internal account",
        "operationId": "list-balance-reports",
        "parameters": [
          {
            "name": "internal_account_id",
            "in": "path",
            "schema": {
              "type": "string"
            },
            "required": true
          },
          {
            "name": "as_of_date",
            "in": "query",
            "description": "The date of the balance report",
            "schema": {
              "type": "string",
              "format": "date"
            }
          },
          {
            "name": "balance_report_type",
            "in": "query",
            "description": "See possible types at [Balance Reports](https://docs.moderntreasury.com/platform/reference/balance-report-object)",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "after_cursor",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "per_page",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 25
            }
          }
        ],
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