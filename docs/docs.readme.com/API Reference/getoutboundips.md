# Get ReadMe’s outbound IP addresses

Returns all of ReadMe’s IP addresses used for outbound webhook requests and the “Try It!” button on the API Explorer.

Although ReadMe’s outbound IP addresses may change, the IPs in this API response will be valid for at least 7 days. If you configure your API or webhooks to limit access based on these IPs, you should refresh the IP list from this endpoint weekly.


# OpenAPI definition

```json
{
  "openapi": "3.0.2",
  "info": {
    "description": "Create beautiful product and API documentation with our developer friendly platform.",
    "version": "5.549.0",
    "title": "Legacy API",
    "contact": {
      "name": "API Support",
      "url": "https://docs.readme.com/main/docs/need-more-support",
      "email": "support@readme.io"
    }
  },
  "servers": [
    {
      "url": "https://dash.readme.com/api/v1"
    }
  ],
  "tags": [
    {
      "name": "IP Addresses"
    }
  ],
  "paths": {
    "/outbound-ips": {
      "get": {
        "operationId": "getOutboundIPs",
        "summary": "Get ReadMe’s outbound IP addresses",
        "description": "Returns all of ReadMe’s IP addresses used for outbound webhook requests and the “Try It!” button on the API Explorer.\n\nAlthough ReadMe’s outbound IP addresses may change, the IPs in this API response will be valid for at least 7 days. If you configure your API or webhooks to limit access based on these IPs, you should refresh the IP list from this endpoint weekly.\n",
        "tags": [
          "IP Addresses"
        ],
        "responses": {
          "200": {
            "description": "List of current IP addresses used for webhook and “Try It!” proxy requests.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/ipListEntry"
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
    "schemas": {
      "ipListEntry": {
        "type": "object",
        "properties": {
          "ipAddress": {
            "type": "string",
            "description": "The IP address.",
            "example": "127.0.0.1"
          }
        }
      }
    }
  }
}
```