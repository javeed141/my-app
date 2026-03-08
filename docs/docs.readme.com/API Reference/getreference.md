# Get a reference page

Get a page from the API Reference section of your ReadMe project.

>📘
> This route is only available to projects that are using [ReadMe Refactored](https://docs.readme.com/main/docs/welcome-to-readme-refactored).

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
    "/branches/{branch}/reference/{slug}": {
      "get": {
        "operationId": "getReference",
        "summary": "Get a reference page",
        "tags": [
          "API Reference"
        ],
        "description": "Get a page from the API Reference section of your ReadMe project.\n\n>📘\n> This route is only available to projects that are using [ReadMe Refactored](https://docs.readme.com/main/docs/welcome-to-readme-refactored).",
        "parameters": [
          {
            "schema": {
              "type": "string",
              "enum": [
                "true",
                "false"
              ],
              "default": "false"
            },
            "in": "query",
            "name": "dereference",
            "required": false,
            "description": "Whether or not to dereference the attached API definition. Defaults to `false` if not specified (subject to change while API v2 is still in beta)."
          },
          {
            "schema": {
              "type": "string",
              "enum": [
                "true",
                "false"
              ],
              "default": "true"
            },
            "in": "query",
            "name": "reduce",
            "required": false,
            "description": "Whether or not to reduce the attached API definition. Defaults to `true` if not specified (subject to change while API v2 is still in beta)."
          },
          {
            "schema": {
              "type": "string",
              "pattern": "(v{0,1})(stable|([0-9]+)(?:\\.([0-9]+))?(?:\\.([0-9]+))?(-.*)?)(_(.*))?"
            },
            "in": "path",
            "name": "branch",
            "required": true,
            "description": "Project version number, `stable` for your project's stable version, or a valid branch name."
          },
          {
            "schema": {
              "type": "string",
              "pattern": "([a-z0-9-_ ]|[^\\\\x00-\\\\x7F])+"
            },
            "in": "path",
            "name": "slug",
            "required": true,
            "description": "A URL-safe representation of the resource."
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
                    "data": {
                      "type": "object",
                      "properties": {
                        "allow_crawlers": {
                          "type": "string",
                          "enum": [
                            "enabled",
                            "disabled"
                          ],
                          "default": "enabled",
                          "description": "Allow indexing by robots."
                        },
                        "appearance": {
                          "type": "object",
                          "properties": {
                            "icon": {
                              "type": "object",
                              "properties": {
                                "name": {
                                  "type": "string",
                                  "nullable": true
                                },
                                "type": {
                                  "type": "string",
                                  "enum": [
                                    "icon",
                                    "emoji"
                                  ],
                                  "nullable": true
                                }
                              },
                              "required": [
                                "name",
                                "type"
                              ],
                              "additionalProperties": false
                            }
                          },
                          "required": [
                            "icon"
                          ],
                          "additionalProperties": false
                        },
                        "category": {
                          "type": "object",
                          "properties": {
                            "uri": {
                              "type": "string",
                              "pattern": "\\/(versions|branches)\\/((v{0,1})(stable|([0-9]+)(?:\\.([0-9]+))?(?:\\.([0-9]+))?(-.*)?)(_(.*))?)\\/categories\\/(guides|reference)\\/((.*))",
                              "description": "A URI to the category resource."
                            }
                          },
                          "required": [
                            "uri"
                          ],
                          "additionalProperties": false
                        },
                        "content": {
                          "type": "object",
                          "properties": {
                            "body": {
                              "type": "string",
                              "nullable": true
                            },
                            "excerpt": {
                              "type": "string",
                              "nullable": true
                            },
                            "link": {
                              "type": "object",
                              "properties": {
                                "url": {
                                  "type": "string",
                                  "nullable": true
                                },
                                "new_tab": {
                                  "type": "boolean",
                                  "nullable": true,
                                  "description": "Should this URL be opened up in a new tab?"
                                }
                              },
                              "required": [
                                "url",
                                "new_tab"
                              ],
                              "additionalProperties": false,
                              "description": "Information about where this page should redirect to; only available when `type` is `link`."
                            },
                            "next": {
                              "type": "object",
                              "properties": {
                                "description": {
                                  "type": "string",
                                  "nullable": true
                                },
                                "pages": {
                                  "type": "array",
                                  "items": {
                                    "anyOf": [
                                      {
                                        "type": "object",
                                        "properties": {
                                          "slug": {
                                            "type": "string"
                                          },
                                          "title": {
                                            "type": "string",
                                            "nullable": true
                                          },
                                          "type": {
                                            "type": "string",
                                            "enum": [
                                              "basic",
                                              "endpoint",
                                              "changelog",
                                              "custom_page"
                                            ]
                                          }
                                        },
                                        "required": [
                                          "slug",
                                          "title",
                                          "type"
                                        ],
                                        "additionalProperties": false
                                      },
                                      {
                                        "type": "object",
                                        "properties": {
                                          "title": {
                                            "type": "string",
                                            "nullable": true
                                          },
                                          "type": {
                                            "type": "string",
                                            "enum": [
                                              "link"
                                            ]
                                          },
                                          "url": {
                                            "type": "string"
                                          }
                                        },
                                        "required": [
                                          "title",
                                          "type",
                                          "url"
                                        ],
                                        "additionalProperties": false
                                      }
                                    ]
                                  }
                                }
                              },
                              "required": [
                                "description",
                                "pages"
                              ],
                              "additionalProperties": false
                            }
                          },
                          "required": [
                            "body",
                            "excerpt",
                            "link",
                            "next"
                          ],
                          "additionalProperties": false
                        },
                        "metadata": {
                          "type": "object",
                          "properties": {
                            "description": {
                              "type": "string",
                              "nullable": true
                            },
                            "image": {
                              "type": "object",
                              "properties": {
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
                                "uri",
                                "url"
                              ],
                              "additionalProperties": false
                            },
                            "keywords": {
                              "type": "string",
                              "nullable": true,
                              "description": "A comma-separated list of keywords to place into your page metadata."
                            },
                            "title": {
                              "type": "string",
                              "nullable": true
                            }
                          },
                          "required": [
                            "description",
                            "image",
                            "keywords",
                            "title"
                          ],
                          "additionalProperties": false
                        },
                        "parent": {
                          "type": "object",
                          "properties": {
                            "uri": {
                              "type": "string",
                              "pattern": "\\/(versions|branches)\\/((v{0,1})(stable|([0-9]+)(?:\\.([0-9]+))?(?:\\.([0-9]+))?(-.*)?)(_(.*))?)\\/(guides|reference)\\/(([a-z0-9-_ ]|[^\\\\x00-\\\\x7F])+)",
                              "nullable": true,
                              "description": "A URI to the parent page resource including the page ID or slug."
                            }
                          },
                          "required": [
                            "uri"
                          ],
                          "additionalProperties": false
                        },
                        "privacy": {
                          "type": "object",
                          "properties": {
                            "view": {
                              "type": "string",
                              "enum": [
                                "public",
                                "anyone_with_link"
                              ],
                              "default": "anyone_with_link"
                            }
                          },
                          "additionalProperties": false
                        },
                        "slug": {
                          "allOf": [
                            {
                              "type": "string"
                            },
                            {
                              "type": "string",
                              "minLength": 1
                            }
                          ],
                          "description": "The accessible URL slug for the page."
                        },
                        "state": {
                          "type": "string",
                          "enum": [
                            "current",
                            "deprecated"
                          ],
                          "default": "current"
                        },
                        "title": {
                          "type": "string"
                        },
                        "type": {
                          "type": "string",
                          "enum": [
                            "api_config",
                            "basic",
                            "endpoint",
                            "link",
                            "webhook"
                          ],
                          "default": "basic"
                        },
                        "api_config": {
                          "type": "string",
                          "enum": [
                            "authentication",
                            "getting-started",
                            "my-requests"
                          ],
                          "nullable": true
                        },
                        "api": {
                          "type": "object",
                          "properties": {
                            "method": {
                              "type": "string",
                              "enum": [
                                "get",
                                "put",
                                "post",
                                "delete",
                                "options",
                                "head",
                                "patch",
                                "trace"
                              ],
                              "description": "The endpoint HTTP method."
                            },
                            "path": {
                              "type": "string",
                              "description": "The endpoint path."
                            },
                            "schema": {
                              "nullable": true,
                              "description": "The API schema for this reference endpoint. This schema may be a reduced (i.e., only contains the necessary information for this endpoint) and/or dereferenced version of the full API definition, depending upon the query parameters used for this request."
                            },
                            "stats": {
                              "type": "object",
                              "properties": {
                                "additional_properties": {
                                  "type": "boolean",
                                  "default": false,
                                  "description": "This API operation uses `additionalProperties` for handling extra schema properties."
                                },
                                "callbacks": {
                                  "type": "boolean",
                                  "default": false,
                                  "description": "This API operation has `callbacks` documented."
                                },
                                "circular_references": {
                                  "type": "boolean",
                                  "default": false,
                                  "description": "This API operation contains `$ref` schema pointers that resolve to itself."
                                },
                                "common_parameters": {
                                  "type": "boolean",
                                  "default": false,
                                  "description": "This API operation utilizes common parameters set at the path level."
                                },
                                "discriminators": {
                                  "type": "boolean",
                                  "default": false,
                                  "description": "This API operation utilizes `discriminator` for discriminating between different parts in a polymorphic schema."
                                },
                                "links": {
                                  "type": "boolean",
                                  "default": false,
                                  "description": "This API operation has `links` documented."
                                },
                                "polymorphism": {
                                  "type": "boolean",
                                  "default": false,
                                  "description": "This API operation contains polymorphic schemas."
                                },
                                "references": {
                                  "type": "boolean",
                                  "default": false,
                                  "description": "This API operation, after being dereferenced, has `x-readme-ref-name` entries defining what the original `$ref` schema pointers were named."
                                },
                                "server_variables": {
                                  "type": "boolean",
                                  "default": false,
                                  "description": "This API operation has composable variables configured for its server definition."
                                },
                                "style": {
                                  "type": "boolean",
                                  "default": false,
                                  "description": "This API operation has parameters that have specific `style` serializations."
                                },
                                "webhooks": {
                                  "type": "boolean",
                                  "default": false,
                                  "description": "This API definition has `webhooks` documented."
                                },
                                "xml_requests": {
                                  "type": "boolean",
                                  "default": false,
                                  "description": "This API operation has request bodies that accept XML."
                                },
                                "xml_responses": {
                                  "type": "boolean",
                                  "default": false,
                                  "description": "This API operation has response payloads that return XML."
                                },
                                "xml_schemas": {
                                  "type": "boolean",
                                  "default": false,
                                  "description": "This API operation has parameters or schemas that can serialize to XML."
                                }
                              },
                              "additionalProperties": false,
                              "description": "OpenAPI features that are utilized within this API operation."
                            },
                            "source": {
                              "type": "string",
                              "enum": [
                                "api",
                                "apidesigner",
                                "apieditor",
                                "bidi",
                                "form",
                                "postman",
                                "rdme",
                                "rdme_github",
                                "url"
                              ],
                              "nullable": true,
                              "description": "The source by which this API definition was ingested."
                            },
                            "uri": {
                              "type": "string",
                              "pattern": "\\/(versions|branches)\\/((v{0,1})(stable|([0-9]+)(?:\\.([0-9]+))?(?:\\.([0-9]+))?(-.*)?)(_(.*))?)\\/apis\\/((([a-z0-9-_ ]|[^\\\\x00-\\\\x7F])+.(json|yaml|yml)))",
                              "nullable": true,
                              "description": "A URI to the API resource."
                            }
                          },
                          "required": [
                            "method",
                            "path",
                            "stats",
                            "source",
                            "uri"
                          ],
                          "additionalProperties": false,
                          "description": "Information about the API that this reference page is attached to."
                        },
                        "connections": {
                          "type": "object",
                          "properties": {
                            "recipes": {
                              "type": "array",
                              "items": {
                                "type": "object",
                                "properties": {
                                  "uri": {
                                    "type": "string",
                                    "pattern": "\\/(versions|branches)\\/((v{0,1})(stable|([0-9]+)(?:\\.([0-9]+))?(?:\\.([0-9]+))?(-.*)?)(_(.*))?)\\/recipes\\/(([a-z0-9-_ ]|[^\\\\x00-\\\\x7F])+)",
                                    "description": "URI of the recipe that this API reference is connected to. The recipe and API reference must exist within the same version."
                                  }
                                },
                                "required": [
                                  "uri"
                                ],
                                "additionalProperties": false
                              },
                              "nullable": true,
                              "description": "A collection of recipes that are displayed on this API reference."
                            }
                          },
                          "required": [
                            "recipes"
                          ],
                          "additionalProperties": false
                        },
                        "href": {
                          "type": "object",
                          "properties": {
                            "dash": {
                              "type": "string",
                              "format": "uri",
                              "description": "A URL to this page in your ReadMe Dash."
                            },
                            "hub": {
                              "type": "string",
                              "format": "uri",
                              "description": "A URL to this page on your ReadMe hub."
                            },
                            "github_url": {
                              "type": "string",
                              "nullable": true,
                              "description": "link to the github of this page"
                            }
                          },
                          "required": [
                            "dash",
                            "hub",
                            "github_url"
                          ],
                          "additionalProperties": false
                        },
                        "links": {
                          "type": "object",
                          "properties": {
                            "project": {
                              "type": "string",
                              "pattern": "\\/projects\\/(me|[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)",
                              "description": "A URI to the project resource."
                            }
                          },
                          "required": [
                            "project"
                          ],
                          "additionalProperties": false
                        },
                        "project": {
                          "type": "object",
                          "properties": {
                            "name": {
                              "type": "string",
                              "description": "The name of the project."
                            },
                            "subdomain": {
                              "type": "string",
                              "pattern": "[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*",
                              "maxLength": 30,
                              "description": "The subdomain of the project."
                            },
                            "uri": {
                              "type": "string",
                              "pattern": "\\/projects\\/(me|[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)",
                              "description": "A URI to the project that this page belongs to."
                            }
                          },
                          "required": [
                            "name",
                            "subdomain",
                            "uri"
                          ],
                          "additionalProperties": false
                        },
                        "renderable": {
                          "type": "object",
                          "properties": {
                            "status": {
                              "type": "boolean",
                              "default": true,
                              "description": "A flag for if the resource is renderable or not."
                            },
                            "error": {
                              "type": "string",
                              "nullable": true,
                              "description": "The rendering error."
                            },
                            "message": {
                              "type": "string",
                              "nullable": true,
                              "description": "Additional details about the rendering error."
                            }
                          },
                          "additionalProperties": false
                        },
                        "updated_at": {
                          "type": "string",
                          "format": "date-time",
                          "description": "An ISO 8601 formatted date for when the page was updated."
                        },
                        "uri": {
                          "type": "string",
                          "pattern": "\\/(versions|branches)\\/((v{0,1})(stable|([0-9]+)(?:\\.([0-9]+))?(?:\\.([0-9]+))?(-.*)?)(_(.*))?)\\/(guides|reference)\\/(([a-z0-9-_ ]|[^\\\\x00-\\\\x7F])+)",
                          "description": "A URI to the page resource."
                        }
                      },
                      "required": [
                        "appearance",
                        "category",
                        "content",
                        "metadata",
                        "parent",
                        "privacy",
                        "slug",
                        "title",
                        "api_config",
                        "api",
                        "connections",
                        "href",
                        "links",
                        "project",
                        "renderable",
                        "updated_at",
                        "uri"
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
      "name": "API Reference"
    }
  ]
}
```