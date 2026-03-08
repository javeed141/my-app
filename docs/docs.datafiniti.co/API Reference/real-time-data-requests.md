# Real-time Data Requests

Get the web data you need in real-time

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
    "/scrape": {
      "post": {
        "summary": "Real-time Data Requests",
        "description": "Get the web data you need in real-time",
        "operationId": "real-time-data-requests",
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
                  "urls"
                ],
                "properties": {
                  "urls": {
                    "type": "array",
                    "description": "An array of urls represented as strings or objects",
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
                    "value": "{\n    \"data\": [\n        {\n            \"input\": {\n                \"domain\": \"amazon.com\",\n                \"identifier\": \"B07ZMGJCC4\"\n            },\n            \"final_url\": \"https://www.amazon.com/dp/B07ZMGJCC4?productDetails&th=1&psc=1\",\n            \"results\": [\n                {\n                    \"dataType\": \"product\",\n                    \"asins\": \"B07ZMGJCC4\",\n                    \"brand\": \"CornBorn\",\n                    \"name\": \"CornBorn Choose Your Design - ISU Long Sleeve T-Shirt\",\n                    \"prices\": [\n                        {\n                            \"availability\": \"true\",\n                            \"color\": \"Black\",\n                            \"size\": \"X-Large\",\n                            \"merchant\": \"amazon.com\",\n                            \"shipping\": \"+ 6.99 shipping\",\n                            \"dateSeen\": [\n                                \"2021-01-13T16:48:00.000Z\"\n                            ],\n                            \"currency\": \"USD\",\n                            \"amountMin\": 19.99,\n                            \"amountMax\": 19.99\n                        }\n                    ]\n                }\n            ],\n            \"errors\": []\n        }\n    ]\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "input": {
                            "type": "object",
                            "properties": {
                              "domain": {
                                "type": "string",
                                "example": "amazon.com"
                              },
                              "identifier": {
                                "type": "string",
                                "example": "B07ZMGJCC4"
                              }
                            }
                          },
                          "final_url": {
                            "type": "string",
                            "example": "https://www.amazon.com/dp/B07ZMGJCC4?productDetails&th=1&psc=1"
                          },
                          "results": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "dataType": {
                                  "type": "string",
                                  "example": "product"
                                },
                                "asins": {
                                  "type": "string",
                                  "example": "B07ZMGJCC4"
                                },
                                "brand": {
                                  "type": "string",
                                  "example": "CornBorn"
                                },
                                "name": {
                                  "type": "string",
                                  "example": "CornBorn Choose Your Design - ISU Long Sleeve T-Shirt"
                                },
                                "prices": {
                                  "type": "array",
                                  "items": {
                                    "type": "object",
                                    "properties": {
                                      "availability": {
                                        "type": "string",
                                        "example": "true"
                                      },
                                      "color": {
                                        "type": "string",
                                        "example": "Black"
                                      },
                                      "size": {
                                        "type": "string",
                                        "example": "X-Large"
                                      },
                                      "merchant": {
                                        "type": "string",
                                        "example": "amazon.com"
                                      },
                                      "shipping": {
                                        "type": "string",
                                        "example": "+ 6.99 shipping"
                                      },
                                      "dateSeen": {
                                        "type": "array",
                                        "items": {
                                          "type": "string",
                                          "example": "2021-01-13T16:48:00.000Z"
                                        }
                                      },
                                      "currency": {
                                        "type": "string",
                                        "example": "USD"
                                      },
                                      "amountMin": {
                                        "type": "number",
                                        "example": 19.99,
                                        "default": 0
                                      },
                                      "amountMax": {
                                        "type": "number",
                                        "example": 19.99,
                                        "default": 0
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          },
                          "errors": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {}
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
              "code": "const axios = require('axios');\nconst DF_TOKEN = \"INPUT YOUR DF TOKEN HERE\";\n\n(async () => {\n    const dfAPI = axios.create({\n        baseURL: 'https://api.datafiniti.co/v4',\n        headers: {\n            'Authorization': `Bearer ${DF_TOKEN}`,\n            'Content-type': 'application/json'\n        }\n    })\n    \n    try {\n        const resp = await dfAPI.post('/scrape', {\n            urls: ['https://www.amazon.com/dp/B07ZMGJCC4?productDetails&th=1&psc=1']\n        });\n\n        console.log(JSON.stringify(resp.data, null, 4));\n    } catch (error) {\n        const { response } = error;\n        \n        if (response) {\n            console.log(`Error ${(response.status)} Error: ${JSON.stringify(response.data, null, 4)}`);\n        } else {\n            console.log(`Error: ${error.stack}`);\n        }\n    }\n})();",
              "name": "JavaScript"
            },
            {
              "language": "shell",
              "code": "curl -L -X POST 'https://api.datafiniti.co/v4/scrape' \\\n-H 'Authorization: Bearer YOUR_DF_TOKEN' \\\n-H 'Content-Type: application/json' \\\n--data-raw '{\n    \"urls\": [\"https://www.amazon.com/dp/B07ZMGJCC4?productDetails&th=1&psc=1\"]\n}'",
              "name": "cURL"
            },
            {
              "language": "python",
              "code": "import requests\n\nurl = \"https://api.datafiniti.co/v4/scrape\"\ndf_token = 'YOUR_DF_TOKEN'\n\npayload='{\"urls\": [\"https://www.amazon.com/dp/B07ZMGJCC4?productDetails&th=1&psc=1]}'\nheaders = {\n  'Authorization': f\"Bearer {df_token}\",\n  'Content-Type': 'application/json'\n}\n\nresponse = requests.request(\"POST\", url, headers=headers, data=payload)\n\nprint(response.text)"
            },
            {
              "language": "ruby",
              "code": "require 'uri'\nrequire 'net/http'\nrequire 'openssl'\n\nurl = URI(\"https://api.datafiniti.co/v4/scrape\")\n\nhttp = Net::HTTP.new(url.host, url.port)\nhttp.use_ssl = true\nhttp.verify_mode = OpenSSL::SSL::VERIFY_NONE\n\nrequest = Net::HTTP::Post.new(url)\nrequest[\"Authorization\"] = 'Bearer <token>'\nrequest[\"Content-Type\"] = 'application/json'\nrequest.body = {\n    'urls' => [\n        \"https://www.amazon.com/dp/B07ZMGJCC4?productDetails&th=1&psc=1\"\n    ]\n}.to_json\n\nresponse = http.request(request)\nputs response.read_body"
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
  "_id": "65ce4e31ceb42f0060898b87:65ce4e32ceb42f0060898c98"
}
```