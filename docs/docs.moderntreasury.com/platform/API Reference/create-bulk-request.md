# Create Bulk Request

Create a bulk request

> 🚧 Request Size Limits
>
> Additional rate limits may apply, please contact [support](mailto:help@moderntreasury.com) for more information.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th style={{ textAlign: "left" }}>
        `resource_type`
      </th>

      <th style={{ textAlign: "left" }}>
        `action_type`
      </th>

      <th style={{ textAlign: "left" }}>
        max

        `resources.length`
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td style={{ textAlign: "left" }}>
        `payment_order`
      </td>

      <td style={{ textAlign: "left" }}>
        `create`\
        `update`
      </td>

      <td style={{ textAlign: "left" }}>
        * \*10,000\*\* in live-mode
        * \*100\*\*  in sandbox
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `expected_payment`
      </td>

      <td style={{ textAlign: "left" }}>
        `create`\
        `update`\
        `delete`
      </td>

      <td style={{ textAlign: "left" }}>
        * \*10,000\*\* in live-mode
        * \*100\*\* in sandbox
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `ledger_account`
      </td>

      <td style={{ textAlign: "left" }}>
        `create`
      </td>

      <td style={{ textAlign: "left" }}>
        * \*10,000\*\* in live-mode
        * \*100\*\* in sandbox
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `ledger_transaction`
      </td>

      <td style={{ textAlign: "left" }}>
        `create`\
        `update`
      </td>

      <td style={{ textAlign: "left" }}>
        * \*10,000\*\* in live-mode
        * \*100\*\* in sandbox
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `transaction`
      </td>

      <td style={{ textAlign: "left" }}>
        `create`\
        `update`\
        `delete`
      </td>

      <td style={{ textAlign: "left" }}>
        * \*10,000\*\* in live-mode
        * \*100\*\* in sandbox
      </td>
    </tr>
  </tbody>
</Table>

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
    "/bulk_requests": {
      "post": {
        "summary": "Create Bulk Request",
        "description": "Create a bulk request",
        "operationId": "create-bulk-request",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "action_type",
                  "resource_type",
                  "resources"
                ],
                "properties": {
                  "action_type": {
                    "type": "string",
                    "description": "The action to perform in bulk",
                    "enum": [
                      "create",
                      "update",
                      "delete"
                    ]
                  },
                  "resource_type": {
                    "type": "string",
                    "description": "The type of resource being operated on",
                    "enum": [
                      "payment_order",
                      "expected_payment",
                      "ledger_transaction",
                      "transaction_line_item",
                      "transaction",
                      "ledger_account"
                    ]
                  },
                  "resources": {
                    "type": "array",
                    "description": "An array of objects where each object contains the input params for a single `action_type` request on a `resource_type` resource"
                  },
                  "metadata": {
                    "type": "string",
                    "description": "Additional data represented as key-value pairs. Both the key and value must be strings. See [Metadata](https://docs.moderntreasury.com/platform/reference/metadata).",
                    "format": "json"
                  }
                }
              }
            }
          }
        },
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