# Get ReadMe's outbound IP addresses

Get all of ReadMe's IP addresses used for outbound webhook requests and the "Try It!" button on the API Explorer.

Although ReadMe's outbound IP addresses may change, the IPs in this API response will be valid for at least 7 days. If you configure your API or webhooks to limit access based on these IPs, you should refresh the IP list from this endpoint weekly.

# OpenAPI definition

```json
{
  "openapi": "3.1.0",
  "info": {
    "description": "Create beautiful product and API documentation with our developer friendly platform.",
    "version": "2.0.0",
    "title": "ReadMe API",
    "x-readme-deploy": "5.549.0",
    "termsOfService": "https://readme.com/tos",
    "contact": {
      "name": "API Support",
      "url": "https://docs.readme.com/main/docs/need-more-support",
      "email": "support@readme.io"
    }
  },
  "components": {
    "securitySchemes": {
      "bearer": {
        "type": "http",
        "scheme": "bearer",
        "description": "A bearer token that will be supplied within an `Authentication` header as `bearer <token>`."
      }
    }
  },
  "paths": {
    "/outbound_ips": {
      "get": {
        "operationId": "getOutboundIPs",
        "summary": "Get ReadMe's outbound IP addresses",
        "tags": [
          "IP Addresses"
        ],
        "description": "Get all of ReadMe's IP addresses used for outbound webhook requests and the \"Try It!\" button on the API Explorer.\n\nAlthough ReadMe's outbound IP addresses may change, the IPs in this API response will be valid for at least 7 days. If you configure your API or webhooks to limit access based on these IPs, you should refresh the IP list from this endpoint weekly.",
        "security": [],
        "responses": {
          "200": {
            "description": "List of current IP addresses used for webhook and \"Try It!\" proxy requests.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "ip_address": {
                            "type": "string",
                            "description": "The IP address."
                          }
                        },
                        "required": [
                          "ip_address"
                        ],
                        "additionalProperties": false
                      }
                    }
                  },
                  "required": [
                    "data"
                  ],
                  "additionalProperties": false,
                  "description": "List of current IP addresses used for webhook and \"Try It!\" proxy requests."
                }
              }
            }
          }
        }
      }
    }
  },
  "servers": [
    {
      "url": "https://api.readme.com/v2",
      "description": "The ReadMe API"
    }
  ],
  "security": [
    {
      "bearer": []
    }
  ],
  "x-readme": {
    "proxy-enabled": true
  },
  "tags": [
    {
      "name": "IP Addresses"
    }
  ]
}
```