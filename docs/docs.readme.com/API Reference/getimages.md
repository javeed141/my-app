# Get uploaded images

Get a collection of images that were uploaded to your ReadMe project.

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
    "/images": {
      "get": {
        "operationId": "getImages",
        "summary": "Get uploaded images",
        "tags": [
          "Images"
        ],
        "description": "Get a collection of images that were uploaded to your ReadMe project.",
        "parameters": [
          {
            "schema": {
              "type": "number",
              "minimum": 1,
              "default": 1
            },
            "in": "query",
            "name": "page",
            "required": false,
            "description": "Used to specify further pages (starts at 1)."
          },
          {
            "schema": {
              "type": "number",
              "minimum": 1,
              "maximum": 100,
              "default": 10
            },
            "in": "query",
            "name": "per_page",
            "required": false,
            "description": "Number of items to include in pagination (up to 100, defaults to 10)."
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "total": {
                      "type": "number"
                    },
                    "page": {
                      "type": "number"
                    },
                    "per_page": {
                      "type": "number"
                    },
                    "paging": {
                      "type": "object",
                      "properties": {
                        "next": {
                          "type": "string",
                          "nullable": true
                        },
                        "previous": {
                          "type": "string",
                          "nullable": true
                        },
                        "first": {
                          "type": "string",
                          "nullable": true
                        },
                        "last": {
                          "type": "string",
                          "nullable": true
                        }
                      },
                      "required": [
                        "next",
                        "previous",
                        "first",
                        "last"
                      ],
                      "additionalProperties": false
                    },
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "name": {
                            "type": "string",
                            "nullable": true
                          },
                          "width": {
                            "type": "number",
                            "nullable": true,
                            "description": "The pixel width of the image. This is not present for SVGs."
                          },
                          "height": {
                            "type": "number",
                            "nullable": true,
                            "description": "The pixel height of the image. This is not present for SVGs."
                          },
                          "color": {
                            "type": "string",
                            "pattern": "^(?:#[0-9a-fA-F]{3}|#[0-9a-fA-F]{4}|#[0-9a-fA-F]{6}|#[0-9a-fA-F]{8})$",
                            "nullable": true,
                            "description": "The primary color contained within your image."
                          },
                          "links": {
                            "type": "object",
                            "properties": {
                              "original_url": {
                                "type": "string",
                                "format": "uri",
                                "nullable": true,
                                "description": "If your image was resized upon upload this will be a URL to the original file."
                              }
                            },
                            "required": [
                              "original_url"
                            ],
                            "additionalProperties": false
                          },
                          "uri": {
                            "type": "string",
                            "pattern": "\\/images\\/([a-f\\d]{24})",
                            "nullable": true,
                            "description": "A URI to the `getImages` endpoint for this image. If the is a legacy image then this `uri` will be `null`. And if you wish to delete this image then you should set this to `null`."
                          },
                          "url": {
                            "type": "string",
                            "format": "uri",
                            "nullable": true
                          }
                        },
                        "required": [
                          "name",
                          "width",
                          "height",
                          "color",
                          "links",
                          "uri",
                          "url"
                        ],
                        "additionalProperties": false
                      }
                    }
                  },
                  "required": [
                    "total",
                    "page",
                    "per_page",
                    "paging",
                    "data"
                  ],
                  "additionalProperties": false
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
      "name": "Images"
    }
  ]
}
```