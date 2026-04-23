# Upload an image

Upload an image to your ReadMe project.

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
      "post": {
        "operationId": "uploadImage",
        "summary": "Upload an image",
        "tags": [
          "Images"
        ],
        "description": "Upload an image to your ReadMe project.",
        "requestBody": {
          "content": {
            "multipart/form-data": {
              "schema": {
                "type": "object",
                "properties": {
                  "file": {}
                },
                "additionalProperties": false
              }
            }
          }
        },
        "parameters": [
          {
            "schema": {
              "type": "string"
            },
            "in": "query",
            "name": "resize_height",
            "required": false,
            "description": "If you wish to resize this image, supply a new height in pixels. Please note that GIFs are exempt and cannot be resized."
          }
        ],
        "responses": {
          "201": {
            "description": "Created",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "data": {
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
                  },
                  "required": [
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