# Send an API Log to ReadMe

Send an API Log to ReadMe, so that you can view developer usage metrics about your API. For more information see https://docs.readme.com/main/docs/sending-api-logs.

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
      "name": "API Logs"
    }
  ],
  "security": [
    {
      "apiKey": []
    }
  ],
  "paths": {
    "/request": {
      "post": {
        "description": "Send an API Log to ReadMe, so that you can view developer usage metrics about your API. For more information see https://docs.readme.com/main/docs/sending-api-logs.",
        "summary": "Send an API Log to ReadMe",
        "operationId": "post_request",
        "tags": [
          "API Logs"
        ],
        "requestBody": {
          "description": "Request object",
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Requests"
              }
            }
          }
        },
        "responses": {
          "202": {
            "description": "API log was accepted into our queue."
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
    "schemas": {
      "Requests": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/Request"
        }
      },
      "HAR_Headers": {
        "type": "array",
        "items": {
          "required": [
            "name",
            "value"
          ],
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "description": "The header name"
            },
            "value": {
              "oneOf": [
                {
                  "type": "string"
                },
                {
                  "type": "integer"
                }
              ],
              "description": "The value of the header."
            }
          }
        }
      },
      "Request": {
        "type": "object",
        "required": [
          "clientIPAddress",
          "group",
          "request"
        ],
        "properties": {
          "_id": {
            "type": "string",
            "description": "A uuidv4 identifier for this log. If not provided we will generate one for you. This ID can be used to view the logged request and response information at `{your url}/logs/{id}`."
          },
          "clientIPAddress": {
            "type": "string",
            "description": "The IP Address making the request."
          },
          "development": {
            "type": "boolean",
            "default": true
          },
          "group": {
            "type": "object",
            "description": "Data about the user or project making the API call.",
            "required": [
              "id"
            ],
            "properties": {
              "email": {
                "type": "string",
                "description": "Email associated with the API call."
              },
              "label": {
                "type": "string",
                "description": "Human-readable description of user or project making the API call. For example this could be the company, user, or name of the project."
              },
              "id": {
                "oneOf": [
                  {
                    "type": "string"
                  },
                  {
                    "type": "number"
                  }
                ],
                "description": "The API key for your user. Note: This field is called `apiKey` in the official SDKs and in the future we will accept this parameter as `apiKey`."
              }
            }
          },
          "request": {
            "type": "object",
            "description": "Information about the request. This data herein generally abides by the [HAR specification](http://www.softwareishard.com/blog/har-12-spec/).",
            "properties": {
              "log": {
                "type": "object",
                "properties": {
                  "creator": {
                    "type": "object",
                    "description": "Information about the package or HTTP module used to log the request.",
                    "properties": {
                      "name": {
                        "type": "string",
                        "description": "Name of the package or HTTP module used.",
                        "example": "readmeio"
                      },
                      "version": {
                        "type": "string",
                        "description": "Version of the package or HTTP module.",
                        "example": "1.2.1"
                      },
                      "comment": {
                        "type": "string",
                        "description": "This should architecture, platform, release, and the version of the language recording the API log and it should match the following format: `{OS architecture}-{OS platform}{OS release}/{language version}`. Our [NodeJS SDK](https://npm.im/readmeio), for example, creates `x64-darwin21.3.0/14.19.3` for Node 14.19.3 on OSX 12.",
                        "example": "x64-darwin21.3.0/14.19.3"
                      }
                    },
                    "required": [
                      "name",
                      "version"
                    ]
                  },
                  "entries": {
                    "type": "array",
                    "description": "HTTP Requests made",
                    "items": {
                      "required": [
                        "request",
                        "response",
                        "startedDateTime",
                        "time"
                      ],
                      "type": "object",
                      "properties": {
                        "pageref": {
                          "type": "string",
                          "description": "The API endpoint or page that was accessed. If you would like to group similar endpoints together you can use your route with a variable instead, e.g. the literal string `/users/{user_id}`.",
                          "example": "https://api.example.com/v1/pets"
                        },
                        "startedDateTime": {
                          "type": "string",
                          "format": "date-time",
                          "description": "HTTP request start time. This should be the moment the server receives the request.",
                          "example": "2020-09-09T18:54:02.797Z"
                        },
                        "time": {
                          "oneOf": [
                            {
                              "type": "integer"
                            },
                            {
                              "type": "string",
                              "deprecated": true
                            }
                          ],
                          "description": "Total elapsed time in milliseconds between the `startedDateTime` and the completion of sending the response."
                        },
                        "request": {
                          "required": [
                            "headers",
                            "httpVersion",
                            "method",
                            "queryString",
                            "url"
                          ],
                          "type": "object",
                          "properties": {
                            "method": {
                              "type": "string",
                              "description": "HTTP Method"
                            },
                            "url": {
                              "type": "string",
                              "description": "Full URL of the request."
                            },
                            "httpVersion": {
                              "type": "string",
                              "description": "Name and revision of the information protocol via which the page was requested."
                            },
                            "headers": {
                              "$ref": "#/components/schemas/HAR_Headers"
                            },
                            "queryString": {
                              "type": "array",
                              "items": {
                                "required": [
                                  "name",
                                  "value"
                                ],
                                "type": "object",
                                "properties": {
                                  "name": {
                                    "type": "string",
                                    "description": "The query string parameter name."
                                  },
                                  "value": {
                                    "type": "string",
                                    "description": "The query string parameter value."
                                  }
                                }
                              }
                            },
                            "postData": {
                              "type": "object",
                              "properties": {
                                "mimeType": {
                                  "type": "string"
                                },
                                "params": {
                                  "type": "array",
                                  "items": {
                                    "required": [
                                      "name",
                                      "value"
                                    ],
                                    "type": "object",
                                    "properties": {
                                      "name": {
                                        "type": "string",
                                        "description": "The request body parameter name."
                                      },
                                      "value": {
                                        "type": "string",
                                        "description": "The request body parameter value."
                                      },
                                      "fileName": {
                                        "type": "string"
                                      },
                                      "contentType": {
                                        "type": "string",
                                        "description": "Content type of posted file."
                                      },
                                      "comment": {
                                        "type": "string"
                                      }
                                    }
                                  },
                                  "description": "If the request body is url encoded (e.g. `a=b&c=d`) then those parameters are provided via the `params` array, otherwise see `text`."
                                },
                                "text": {
                                  "type": "string",
                                  "description": "The string representation of the request body. Used for all cases except for a `form-encoded` body."
                                },
                                "comment": {
                                  "type": "string"
                                }
                              }
                            }
                          }
                        },
                        "response": {
                          "required": [
                            "headers",
                            "status",
                            "statusText",
                            "content"
                          ],
                          "type": "object",
                          "properties": {
                            "status": {
                              "type": "number",
                              "description": "HTTP Status Code"
                            },
                            "statusText": {
                              "type": "string",
                              "description": "Description of the HTTP status code."
                            },
                            "headers": {
                              "$ref": "#/components/schemas/HAR_Headers"
                            },
                            "content": {
                              "type": "object",
                              "description": "Details about the response body.",
                              "properties": {
                                "size": {
                                  "oneOf": [
                                    {
                                      "type": "integer"
                                    },
                                    {
                                      "type": "string"
                                    }
                                  ],
                                  "description": "Length of the returned content in bytes."
                                },
                                "mimeType": {
                                  "type": "string"
                                },
                                "text": {
                                  "type": "string",
                                  "description": "Response body sent from the server. This field is populated with textual content only. The text field is either HTTP decoded text or an encoded (e.g. \"base64\") representation of the response body. Leave out this field if the information is not available."
                                },
                                "encoding": {
                                  "type": "string",
                                  "description": "Encoding used for response text field. Leave out this field if the text field is HTTP decoded (decompressed and unchunked), then transcoded from its original character set into UTF-8.",
                                  "example": "base64"
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
      }
    }
  },
  "x-readme": {
    "explorer-enabled": true,
    "proxy-enabled": true
  }
}
```