# View Real-time Updates

View created real-time updates

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
      "get": {
        "summary": "View Real-time Updates",
        "description": "View created real-time updates",
        "operationId": "view-all-real-time-updates",
        "parameters": [
          {
            "name": "Authorization",
            "in": "header",
            "description": "Your DF token",
            "schema": {
              "type": "string",
              "default": "Bearer <Token>"
            }
          },
          {
            "name": "id",
            "in": "path",
            "description": "The real-time update ID returned in the response body when creating a real-time update. If no ID is supplied it will return all updates created.",
            "schema": {
              "type": "string"
            },
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n    \"num_found\": 3,\n    \"records\": [\n        {\n            \"stats\": {\n                \"num_urls_matched\": 0,\n                \"num_urls_resulting_in_updates\": 0,\n                \"num_crawl_results_processed\": 0,\n                \"num_crawl_results_submitted\": 0\n            },\n            \"domains\": [\n                \"www.amazon.com\"\n            ],\n            \"status\": \"STARTED\",\n            \"_id\": 1,\n            \"query\": \"keys:*\",\n            \"num_records_requested\": 10,\n            \"data_type\": \"product\",\n            \"user\": 5,\n            \"crawl\": 3561258,\n            \"date_created\": \"2021-08-26T17:03:04.180Z\",\n            \"date_updated\": \"2021-08-27T19:06:25.929Z\",\n            \"id\": \"1\"\n        },\n        {\n            \"stats\": {\n                \"num_urls_matched\": 0,\n                \"num_urls_resulting_in_updates\": 0,\n                \"num_crawl_results_processed\": 0,\n                \"num_crawl_results_submitted\": 0\n            },\n            \"domains\": [\n                \"www.amazon.com\"\n            ],\n            \"status\": \"STARTED\",\n            \"_id\": 2,\n            \"query\": \"keys:*\",\n            \"num_records_requested\": 10,\n            \"data_type\": \"product\",\n            \"user\": 5,\n            \"crawl\": 3561600,\n            \"date_created\": \"2021-08-27T15:38:31.521Z\",\n            \"date_updated\": \"2021-08-27T19:06:26.065Z\",\n            \"id\": \"2\"\n        },\n        {\n            \"stats\": {\n                \"num_urls_matched\": 0,\n                \"num_urls_resulting_in_updates\": 0,\n                \"num_crawl_results_processed\": 0,\n                \"num_crawl_results_submitted\": 0\n            },\n            \"domains\": [\n                \"www.amazon.com\"\n            ],\n            \"status\": \"STARTED\",\n            \"_id\": 3,\n            \"query\": \"keys:*\",\n            \"num_records_requested\": 10,\n            \"data_type\": \"product\",\n            \"user\": 5,\n            \"crawl\": 3561661,\n            \"date_created\": \"2021-08-27T19:25:50.875Z\",\n            \"date_updated\": \"2021-08-27T19:25:57.134Z\",\n            \"id\": \"3\"\n        }\n      ]\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "num_found": {
                      "type": "integer",
                      "example": 3,
                      "default": 0
                    },
                    "records": {
                      "type": "array",
                      "items": {
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
                          "_id": {
                            "type": "integer",
                            "example": 1,
                            "default": 0
                          },
                          "query": {
                            "type": "string",
                            "example": "keys:*"
                          },
                          "num_records_requested": {
                            "type": "integer",
                            "example": 10,
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
                            "example": 3561258,
                            "default": 0
                          },
                          "date_created": {
                            "type": "string",
                            "example": "2021-08-26T17:03:04.180Z"
                          },
                          "date_updated": {
                            "type": "string",
                            "example": "2021-08-27T19:06:25.929Z"
                          },
                          "id": {
                            "type": "string",
                            "example": "1"
                          }
                        }
                      }
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
              "code": "const axios = require('axios');\nconst DF_TOKEN = \"INPUT YOUR DF TOKEN HERE\";\n\n(async () => {\n    const dfAPI = axios.create({\n        baseURL: 'https://api.datafiniti.co/v4',\n        headers: {\n            'Authorization': `Bearer ${DF_TOKEN}`,\n            'Content-type': 'application/json'\n        }\n    })\n    \n    try {\n        const resp = await dfAPI.get('/targeted-updates');\n\n        console.log(JSON.stringify(resp.data, null, 4));\n    } catch (error) {\n        const { response } = error;\n        \n        if (response) {\n            console.log(`Error ${(response.status)} Error: ${JSON.stringify(response.data, null, 4)}`);\n        } else {\n            console.log(`Error: ${error.stack}`);\n        }\n    }\n})();",
              "name": "JavaScript"
            },
            {
              "language": "shell",
              "code": "curl -L -X GET 'https://api.datafiniti.co/v4/targeted-updates' \\\n-H 'Authorization: Bearer YOUR_DF_TOKEN' \\\n-H 'Content-Type: application/json'",
              "name": "cURL"
            },
            {
              "language": "python",
              "code": "import requests\n\nurl = \"https://api.datafiniti.co/v4/targeted-updates\"\ndf_token = 'YOUR_DF_TOKEN'\n\nheaders = {\n  'Authorization': f\"Bearer {df_token}\",\n  'Content-Type': 'application/json'\n}\n\nresponse = requests.request(\"GET\", url, headers=headers)\n\nprint(response.text)"
            },
            {
              "language": "ruby",
              "code": "require 'uri'\nrequire 'net/http'\nrequire 'openssl'\n\nurl = URI(\"https://api.datafiniti.co/v4/targeted-updates\")\n\nhttp = Net::HTTP.new(url.host, url.port)\nhttp.use_ssl = true\nhttp.verify_mode = OpenSSL::SSL::VERIFY_NONE\n\nrequest = Net::HTTP::Get.new(url)\nrequest[\"Authorization\"] = 'Bearer <token>'\nrequest[\"Content-Type\"] = 'application/json'\n\nresponse = http.request(request)\nputs response.read_body"
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
  "_id": "65ce4e31ceb42f0060898b87:65ce4e32ceb42f0060898c9a"
}
```