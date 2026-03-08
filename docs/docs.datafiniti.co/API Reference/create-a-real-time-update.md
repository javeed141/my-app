# Create a Real-time Update

Refresh the data you need in real-time

[block:textarea]
{
  "text": "Guide: [Real-time Data Requests](https://docs.datafiniti.co/reference/real-time-data-requests) ",
  "sidebar": true
}
[/block]

# OpenAPI definition

```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "Datafiniti API v4",
    "version": "4"
  },
  "servers": [
    {
      "url": "https://api.datafiniti.co/v4"
    }
  ],
  "components": {
    "securitySchemes": {
      "sec0": {
        "type": "apiKey",
        "in": "query",
        "name": "api_key"
      }
    }
  },
  "security": [
    {
      "sec0": []
    }
  ],
  "paths": {
    "/targeted-updates": {
      "post": {
        "summary": "Create a Real-time Update",
        "description": "Refresh the data you need in real-time",
        "operationId": "create-a-real-time-update",
        "parameters": [
          {
            "name": "Authorization",
            "in": "header",
            "description": "Your DF token",
            "schema": {
              "type": "string",
              "default": "Bearer <Token>"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "query"
                ],
                "properties": {
                  "query": {
                    "type": "string",
                    "description": "The query whose matching records you want updated."
                  },
                  "num_records_requested": {
                    "type": "integer",
                    "description": "The number or records to update. If no number specified all matching records will be updated.",
                    "format": "int32"
                  },
                  "data_type": {
                    "type": "string",
                    "description": "The type of data that you want updated. Accepted values are Business, Product, and Property"
                  },
                  "domains": {
                    "type": "array",
                    "description": "The list of domains you want to pull the updates from.",
                    "items": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n    \"stats\": {\n        \"num_urls_matched\": 0,\n        \"num_urls_resulting_in_updates\": 0,\n        \"num_crawl_results_processed\": 0,\n        \"num_crawl_results_submitted\": 0\n    },\n    \"domains\": [\n        \"www.amazon.com\"\n    ],\n    \"status\": \"STARTED\",\n    \"query\": \"keys:*\",\n    \"num_records_requested\": 1,\n    \"data_type\": \"product\",\n    \"user\": 5,\n    \"crawl\": 3566860,\n    \"date_created\": \"2021-09-08T15:09:28.328Z\",\n    \"date_updated\": \"2021-09-08T15:09:28.328Z\",\n    \"_id\": 27,\n    \"id\": \"27\"\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "stats": {
                      "type": "object",
                      "properties": {
                        "num_urls_matched": {
                          "type": "integer",
                          "example": 0,
                          "default": 0
                        },
                        "num_urls_resulting_in_updates": {
                          "type": "integer",
                          "example": 0,
                          "default": 0
                        },
                        "num_crawl_results_processed": {
                          "type": "integer",
                          "example": 0,
                          "default": 0
                        },
                        "num_crawl_results_submitted": {
                          "type": "integer",
                          "example": 0,
                          "default": 0
                        }
                      }
                    },
                    "domains": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "example": "www.amazon.com"
                      }
                    },
                    "status": {
                      "type": "string",
                      "example": "STARTED"
                    },
                    "query": {
                      "type": "string",
                      "example": "keys:*"
                    },
                    "num_records_requested": {
                      "type": "integer",
                      "example": 1,
                      "default": 0
                    },
                    "data_type": {
                      "type": "string",
                      "example": "product"
                    },
                    "user": {
                      "type": "integer",
                      "example": 5,
                      "default": 0
                    },
                    "crawl": {
                      "type": "integer",
                      "example": 3566860,
                      "default": 0
                    },
                    "date_created": {
                      "type": "string",
                      "example": "2021-09-08T15:09:28.328Z"
                    },
                    "date_updated": {
                      "type": "string",
                      "example": "2021-09-08T15:09:28.328Z"
                    },
                    "_id": {
                      "type": "integer",
                      "example": 27,
                      "default": 0
                    },
                    "id": {
                      "type": "string",
                      "example": "27"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "400",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n    \"errors\": [\n        \"urls should be array\"\n    ]\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "errors": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "example": "urls should be array"
                      }
                    }
                  }
                }
              }
            }
          },
          "402": {
            "description": "402",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n    \"errors\": [\n        \"You do not have enough scrape credits to cover the urls provided\"\n    ]\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "errors": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "example": "You do not have enough scrape credits to cover the urls provided"
                      }
                    }
                  }
                }
              }
            }
          },
          "422": {
            "description": "422",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n    \"errors\": [\n        \"Unexpected token 2 in JSON at position 0\"\n    ]\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "errors": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "example": "Unexpected token 2 in JSON at position 0"
                      }
                    }
                  }
                }
              }
            }
          },
          "429": {
            "description": "429",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{ \"errors\": [\"You have exceeded the maximum concurrent requests.\"]  }"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "errors": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "example": "You have exceeded the maximum concurrent requests."
                      }
                    }
                  }
                }
              }
            }
          },
          "500": {
            "description": "500",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n\t\"errors\": [\"This is an issue on our end. please contact customer support.\"]\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "errors": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "example": "This is an issue on our end. please contact customer support."
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "deprecated": false,
        "x-readme": {
          "code-samples": [
            {
              "language": "javascript",
              "code": "const axios = require('axios');\nconst DF_TOKEN = \"INPUT YOUR DF TOKEN HERE\";\n\n(async () => {\n    const dfAPI = axios.create({\n        baseURL: 'https://api.datafiniti.co/v4',\n        headers: {\n            'Authorization': `Bearer ${DF_TOKEN}`,\n            'Content-type': 'application/json'\n        }\n    })\n    \n    try {\n        const resp = await dfAPI.post('/targeted-updates', {\n                query: 'keys:*',\n   \t\t\t\t\t\t\tnum_records_requested: 1,\n    \t\t\t\t\t\tdata_type: 'product',\n    \t\t\t\t\t\tdomains: ['www.amazon.com']\n        });\n\n        console.log(JSON.stringify(resp.data, null, 4));\n    } catch (error) {\n        const { response } = error;\n        \n        if (response) {\n            console.log(`Error ${(response.status)} Error: ${JSON.stringify(response.data, null, 4)}`);\n        } else {\n            console.log(`Error: ${error.stack}`);\n        }\n    }\n})();",
              "name": "JavaScript"
            },
            {
              "language": "shell",
              "code": "curl -L -X POST 'https://api.datafiniti.co/v4/targeted-updates' \\\n-H 'Authorization: Bearer YOUR_DF_TOKEN' \\\n-H 'Content-Type: application/json' \\\n--data-raw '{\n    \"query\": \"keys:*\",\n    \"num_records_requested\": 1,\n    \"data_type\": \"product\",\n    \"domains\": [\"www.amazon.com\"]\n}'",
              "name": "cURL"
            },
            {
              "language": "python",
              "code": "import requests\n\nurl = \"https://api.datafiniti.co/v4/targeted-updates\"\ndf_token = 'YOUR_DF_TOKEN'\n\npayload='{\"query\": \"keys:*\",\"num_records_requested\": 1,\"data_type\": \"product\",\"domains\": [\"www.amazon.com\"]}'\nheaders = {\n  'Authorization': f\"Bearer {df_token}\",\n  'Content-Type': 'application/json'\n}\n\nresponse = requests.request(\"POST\", url, headers=headers, data=payload)\n\nprint(response.text)"
            },
            {
              "language": "ruby",
              "code": "require 'uri'\nrequire 'net/http'\nrequire 'openssl'\n\nurl = URI(\"https://api.datafiniti.co/v4/targeted-updates\")\n\nhttp = Net::HTTP.new(url.host, url.port)\nhttp.use_ssl = true\nhttp.verify_mode = OpenSSL::SSL::VERIFY_NONE\n\nrequest = Net::HTTP::Post.new(url)\nrequest[\"Authorization\"] = 'Bearer <token>'\nrequest[\"Content-Type\"] = 'application/json'\nrequest.body = {\n    'query' => \"keys:*\",\n    'num_records_requested' => 1,\n    'data_type' => \"product\",\n    'domains' => [\n        \"www.amazon.com\"\n    ]\n}.to_json\n\nresponse = http.request(request)\nputs response.read_body"
            }
          ],
          "samples-languages": [
            "javascript",
            "shell",
            "python",
            "ruby"
          ]
        }
      }
    }
  },
  "x-readme": {
    "headers": [],
    "explorer-enabled": true,
    "proxy-enabled": true
  },
  "x-readme-fauxas": true,
  "_id": "65ce4e31ceb42f0060898b87:65ce4e32ceb42f0060898c99"
}
```