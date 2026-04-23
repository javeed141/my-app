# Get project metadata

Returns data about your project.

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
    "/projects/me": {
      "get": {
        "operationId": "getProject",
        "summary": "Get project metadata",
        "tags": [
          "Projects"
        ],
        "description": "Returns data about your project.",
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
                        "ai": {
                          "type": "object",
                          "properties": {
                            "chat": {
                              "type": "object",
                              "properties": {
                                "knowledge": {
                                  "type": "object",
                                  "properties": {
                                    "custom_knowledge": {
                                      "type": "string",
                                      "nullable": true,
                                      "default": null,
                                      "description": "Custom knowledge content for AI chat."
                                    },
                                    "use_project_knowledge": {
                                      "type": "boolean",
                                      "default": false,
                                      "description": "Whether to use project indexing for AI chat."
                                    }
                                  },
                                  "additionalProperties": false
                                },
                                "models": {
                                  "type": "array",
                                  "items": {
                                    "type": "object",
                                    "properties": {
                                      "enabled": {
                                        "type": "boolean",
                                        "default": true
                                      },
                                      "id": {
                                        "type": "string",
                                        "default": "claude-sonnet-4"
                                      },
                                      "provider": {
                                        "type": "string",
                                        "enum": [
                                          "anthropic",
                                          "custom",
                                          "google",
                                          "openai"
                                        ],
                                        "default": "anthropic"
                                      },
                                      "name": {
                                        "type": "string",
                                        "default": "Claude Sonnet 4"
                                      }
                                    },
                                    "additionalProperties": false
                                  },
                                  "default": [],
                                  "description": "AI models configuration for chat."
                                }
                              },
                              "required": [
                                "knowledge"
                              ],
                              "additionalProperties": false,
                              "description": "AI chat configuration for the project."
                            },
                            "owlbot": {
                              "type": "object",
                              "properties": {
                                "enabled": {
                                  "type": "boolean",
                                  "default": false,
                                  "description": "Whether the Owlbot AI add-on is enabled."
                                }
                              },
                              "additionalProperties": false,
                              "description": "AI Owlbot configuration for the project."
                            }
                          },
                          "required": [
                            "chat",
                            "owlbot"
                          ],
                          "additionalProperties": false,
                          "description": "AI configuration for the project."
                        },
                        "allow_crawlers": {
                          "type": "string",
                          "enum": [
                            "enabled",
                            "disabled"
                          ],
                          "default": "enabled",
                          "description": "Allow indexing by robots."
                        },
                        "api_designer": {
                          "type": "object",
                          "properties": {
                            "allow_editing": {
                              "type": "string",
                              "enum": [
                                "enabled",
                                "disabled"
                              ],
                              "default": "enabled",
                              "description": "API Designer is enabled for this project."
                            }
                          },
                          "additionalProperties": false
                        },
                        "appearance": {
                          "type": "object",
                          "properties": {
                            "brand": {
                              "type": "object",
                              "properties": {
                                "primary_color": {
                                  "type": "string",
                                  "nullable": true
                                },
                                "link_color": {
                                  "type": "string",
                                  "nullable": true
                                },
                                "theme": {
                                  "type": "string",
                                  "enum": [
                                    "system",
                                    "light",
                                    "dark"
                                  ],
                                  "default": "light"
                                }
                              },
                              "required": [
                                "primary_color",
                                "link_color"
                              ],
                              "additionalProperties": false
                            },
                            "changelog": {
                              "type": "object",
                              "properties": {
                                "layout": {
                                  "type": "string",
                                  "enum": [
                                    "collapsed",
                                    "continuous"
                                  ],
                                  "default": "collapsed"
                                },
                                "show_author": {
                                  "type": "boolean",
                                  "default": true,
                                  "description": "Should the changelog author be shown?"
                                },
                                "show_exact_date": {
                                  "type": "boolean",
                                  "default": false,
                                  "description": "Should the exact date of the changelog entry be shown, or should it be relative?"
                                }
                              },
                              "additionalProperties": false
                            },
                            "custom_code": {
                              "type": "object",
                              "properties": {
                                "css": {
                                  "type": "string",
                                  "nullable": true,
                                  "description": "A chunk of custom CSS that you can use to override default CSS that we provide."
                                },
                                "js": {
                                  "type": "string",
                                  "nullable": true,
                                  "description": "A chunk of custom JS that you can use to override or add new behaviors to your documentation. Please note that we do not do any validation on the code that goes in here so you have the potential to negatively impact your users with broken code."
                                },
                                "html": {
                                  "type": "object",
                                  "properties": {
                                    "header": {
                                      "type": "string",
                                      "nullable": true,
                                      "description": "A block of custom HTML that will be added to your `<head>` tag. Good for things like `<meta>` tags or loading external CSS."
                                    },
                                    "home_footer": {
                                      "type": "string",
                                      "nullable": true,
                                      "description": "A block of custom HTML that will appear in a `<footer>` element on all of your pages"
                                    },
                                    "page_footer": {
                                      "type": "string",
                                      "nullable": true,
                                      "description": "A block of custom HTML that will be added before the closing `</body>` tag of your pages."
                                    }
                                  },
                                  "required": [
                                    "header",
                                    "home_footer",
                                    "page_footer"
                                  ],
                                  "additionalProperties": false
                                }
                              },
                              "required": [
                                "css",
                                "js",
                                "html"
                              ],
                              "additionalProperties": false
                            },
                            "footer": {
                              "type": "object",
                              "properties": {
                                "readme_logo": {
                                  "type": "string",
                                  "enum": [
                                    "hide",
                                    "show"
                                  ],
                                  "default": "show"
                                }
                              },
                              "additionalProperties": false
                            },
                            "header": {
                              "type": "object",
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "enum": [
                                    "solid",
                                    "gradient",
                                    "line",
                                    "overlay"
                                  ],
                                  "default": "solid"
                                },
                                "gradient_color": {
                                  "type": "string",
                                  "nullable": true
                                },
                                "link_style": {
                                  "type": "string",
                                  "enum": [
                                    "buttons",
                                    "tabs"
                                  ],
                                  "default": "buttons",
                                  "description": "The styling setting of the subnav links. This value is only used if `appearance.header.type` is `line`."
                                },
                                "overlay": {
                                  "type": "object",
                                  "properties": {
                                    "image": {
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
                                    },
                                    "type": {
                                      "type": "string",
                                      "enum": [
                                        "triangles",
                                        "blueprint",
                                        "grain",
                                        "map",
                                        "circuits",
                                        "custom"
                                      ],
                                      "default": "triangles",
                                      "description": "The header overlay type. This value is only used if `appearance.header.type` is `overlay`."
                                    },
                                    "fill": {
                                      "type": "string",
                                      "enum": [
                                        "auto",
                                        "tile",
                                        "tile-x",
                                        "tile-y",
                                        "cover",
                                        "contain"
                                      ],
                                      "default": "auto",
                                      "description": "The header fill type. This is only used if `appearance.header.overlay.type` is `custom`."
                                    },
                                    "position": {
                                      "type": "string",
                                      "enum": [
                                        "top-left",
                                        "top-center",
                                        "top-right",
                                        "center-left",
                                        "center-center",
                                        "center-right",
                                        "bottom-left",
                                        "bottom-center",
                                        "bottom-right"
                                      ],
                                      "default": "top-left",
                                      "description": "The positioning of the header. This is only used if `appearance.header.overlay.type` is `custom`."
                                    }
                                  },
                                  "required": [
                                    "image"
                                  ],
                                  "additionalProperties": false
                                }
                              },
                              "required": [
                                "gradient_color",
                                "overlay"
                              ],
                              "additionalProperties": false
                            },
                            "layout": {
                              "type": "object",
                              "properties": {
                                "full_width": {
                                  "type": "string",
                                  "enum": [
                                    "enabled",
                                    "disabled"
                                  ],
                                  "default": "disabled",
                                  "description": "Should the page layout stretch to use the full page width?"
                                },
                                "style": {
                                  "type": "string",
                                  "enum": [
                                    "classic",
                                    "modern",
                                    "compact",
                                    "sidebar"
                                  ],
                                  "default": "classic",
                                  "description": "The shape and style of your documentation hub pages."
                                }
                              },
                              "additionalProperties": false
                            },
                            "logo": {
                              "type": "object",
                              "properties": {
                                "dark_mode": {
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
                                },
                                "main": {
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
                                },
                                "favicon": {
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
                                },
                                "size": {
                                  "type": "string",
                                  "enum": [
                                    "default",
                                    "large"
                                  ],
                                  "default": "default"
                                }
                              },
                              "required": [
                                "dark_mode",
                                "main",
                                "favicon"
                              ],
                              "additionalProperties": false
                            },
                            "markdown": {
                              "type": "object",
                              "properties": {
                                "callouts": {
                                  "type": "object",
                                  "properties": {
                                    "icon_font": {
                                      "type": "string",
                                      "enum": [
                                        "emojis",
                                        "fontawesome"
                                      ],
                                      "default": "emojis",
                                      "description": "Handles the types of icons that are shown in Markdown callouts."
                                    }
                                  },
                                  "additionalProperties": false
                                }
                              },
                              "required": [
                                "callouts"
                              ],
                              "additionalProperties": false
                            },
                            "navigation": {
                              "type": "object",
                              "properties": {
                                "breadcrumbs": {
                                  "type": "string",
                                  "enum": [
                                    "enabled",
                                    "disabled"
                                  ],
                                  "default": "disabled",
                                  "description": "Should navigation breadcrumbs appear on your guides and API reference pages?"
                                },
                                "first_page": {
                                  "type": "string",
                                  "enum": [
                                    "documentation",
                                    "reference",
                                    "landing_page"
                                  ],
                                  "default": "landing_page",
                                  "description": "The page that users will first see when they access your documentation hub."
                                },
                                "left": {
                                  "type": "array",
                                  "items": {
                                    "type": "object",
                                    "properties": {
                                      "type": {
                                        "type": "string",
                                        "enum": [
                                          "home",
                                          "guides",
                                          "discussions",
                                          "changelog",
                                          "search_box",
                                          "link_url",
                                          "custom_page",
                                          "user_controls",
                                          "reference",
                                          "recipes"
                                        ]
                                      },
                                      "title": {
                                        "type": "string",
                                        "nullable": true
                                      },
                                      "url": {
                                        "type": "string",
                                        "nullable": true
                                      },
                                      "custom_page": {
                                        "type": "string",
                                        "nullable": true
                                      }
                                    },
                                    "required": [
                                      "type",
                                      "title",
                                      "url",
                                      "custom_page"
                                    ],
                                    "additionalProperties": false
                                  },
                                  "description": "The navigation settings for the left side of your projects navigation bar."
                                },
                                "links": {
                                  "type": "object",
                                  "properties": {
                                    "changelog": {
                                      "type": "object",
                                      "properties": {
                                        "label": {
                                          "type": "string",
                                          "enum": [
                                            "Changelog"
                                          ]
                                        },
                                        "alias": {
                                          "type": "string",
                                          "nullable": true
                                        },
                                        "visibility": {
                                          "type": "string",
                                          "enum": [
                                            "enabled",
                                            "disabled"
                                          ],
                                          "default": "enabled"
                                        }
                                      },
                                      "required": [
                                        "label",
                                        "alias"
                                      ],
                                      "additionalProperties": false
                                    },
                                    "discussions": {
                                      "type": "object",
                                      "properties": {
                                        "label": {
                                          "type": "string",
                                          "enum": [
                                            "Discussions"
                                          ]
                                        },
                                        "alias": {
                                          "type": "string",
                                          "nullable": true
                                        },
                                        "visibility": {
                                          "type": "string",
                                          "enum": [
                                            "enabled",
                                            "disabled"
                                          ],
                                          "default": "enabled"
                                        }
                                      },
                                      "required": [
                                        "label",
                                        "alias"
                                      ],
                                      "additionalProperties": false
                                    },
                                    "home": {
                                      "type": "object",
                                      "properties": {
                                        "label": {
                                          "type": "string",
                                          "enum": [
                                            "Home"
                                          ]
                                        },
                                        "visibility": {
                                          "type": "string",
                                          "enum": [
                                            "enabled",
                                            "disabled"
                                          ],
                                          "default": "enabled"
                                        }
                                      },
                                      "required": [
                                        "label"
                                      ],
                                      "additionalProperties": false
                                    },
                                    "graphql": {
                                      "type": "object",
                                      "properties": {
                                        "label": {
                                          "type": "string",
                                          "enum": [
                                            "GraphQL"
                                          ]
                                        },
                                        "visibility": {
                                          "type": "string",
                                          "enum": [
                                            "enabled",
                                            "disabled"
                                          ],
                                          "default": "disabled",
                                          "nullable": true
                                        }
                                      },
                                      "required": [
                                        "label"
                                      ],
                                      "additionalProperties": false
                                    },
                                    "guides": {
                                      "type": "object",
                                      "properties": {
                                        "label": {
                                          "type": "string",
                                          "enum": [
                                            "Guides"
                                          ]
                                        },
                                        "alias": {
                                          "type": "string",
                                          "nullable": true
                                        },
                                        "visibility": {
                                          "type": "string",
                                          "enum": [
                                            "enabled",
                                            "disabled"
                                          ],
                                          "default": "enabled"
                                        }
                                      },
                                      "required": [
                                        "label",
                                        "alias"
                                      ],
                                      "additionalProperties": false
                                    },
                                    "recipes": {
                                      "type": "object",
                                      "properties": {
                                        "label": {
                                          "type": "string",
                                          "enum": [
                                            "Recipes"
                                          ]
                                        },
                                        "alias": {
                                          "type": "string",
                                          "nullable": true
                                        },
                                        "visibility": {
                                          "type": "string",
                                          "enum": [
                                            "enabled",
                                            "disabled"
                                          ],
                                          "default": "disabled"
                                        }
                                      },
                                      "required": [
                                        "label",
                                        "alias"
                                      ],
                                      "additionalProperties": false
                                    },
                                    "reference": {
                                      "type": "object",
                                      "properties": {
                                        "label": {
                                          "type": "string",
                                          "enum": [
                                            "API Reference"
                                          ]
                                        },
                                        "alias": {
                                          "type": "string",
                                          "nullable": true
                                        },
                                        "visibility": {
                                          "type": "string",
                                          "enum": [
                                            "enabled",
                                            "disabled"
                                          ],
                                          "default": "enabled"
                                        }
                                      },
                                      "required": [
                                        "label",
                                        "alias"
                                      ],
                                      "additionalProperties": false
                                    }
                                  },
                                  "required": [
                                    "changelog",
                                    "discussions",
                                    "home",
                                    "graphql",
                                    "guides",
                                    "recipes",
                                    "reference"
                                  ],
                                  "additionalProperties": false
                                },
                                "logo_link": {
                                  "type": "string",
                                  "enum": [
                                    "landing_page",
                                    "homepage"
                                  ],
                                  "default": "homepage",
                                  "description": "Where users will be directed to when they click on your logo in the navigation bar."
                                },
                                "page_icons": {
                                  "type": "string",
                                  "enum": [
                                    "enabled",
                                    "disabled"
                                  ],
                                  "default": "enabled",
                                  "description": "Should the links in your project navigation bar include icons?"
                                },
                                "right": {
                                  "type": "array",
                                  "items": {
                                    "type": "object",
                                    "properties": {
                                      "type": {
                                        "type": "string",
                                        "enum": [
                                          "home",
                                          "guides",
                                          "discussions",
                                          "changelog",
                                          "search_box",
                                          "link_url",
                                          "custom_page",
                                          "user_controls",
                                          "reference",
                                          "recipes"
                                        ]
                                      },
                                      "title": {
                                        "type": "string",
                                        "nullable": true
                                      },
                                      "url": {
                                        "type": "string",
                                        "nullable": true
                                      },
                                      "custom_page": {
                                        "type": "string",
                                        "nullable": true
                                      }
                                    },
                                    "required": [
                                      "type",
                                      "title",
                                      "url",
                                      "custom_page"
                                    ],
                                    "additionalProperties": false
                                  },
                                  "description": "The navigation settings for the right side of your projects navigation bar."
                                },
                                "sub_nav": {
                                  "type": "array",
                                  "items": {
                                    "type": "object",
                                    "properties": {
                                      "type": {
                                        "type": "string",
                                        "enum": [
                                          "home",
                                          "guides",
                                          "discussions",
                                          "changelog",
                                          "search_box",
                                          "link_url",
                                          "custom_page",
                                          "user_controls",
                                          "reference",
                                          "recipes"
                                        ]
                                      },
                                      "title": {
                                        "type": "string",
                                        "nullable": true
                                      },
                                      "url": {
                                        "type": "string",
                                        "nullable": true
                                      },
                                      "custom_page": {
                                        "type": "string",
                                        "nullable": true
                                      }
                                    },
                                    "required": [
                                      "type",
                                      "title",
                                      "url",
                                      "custom_page"
                                    ],
                                    "additionalProperties": false
                                  },
                                  "description": "The navigation settings for your projects subnavigation bar."
                                },
                                "subheader_layout": {
                                  "type": "string",
                                  "enum": [
                                    "links",
                                    "dropdown"
                                  ],
                                  "default": "links"
                                },
                                "version": {
                                  "type": "string",
                                  "enum": [
                                    "enabled",
                                    "disabled"
                                  ],
                                  "default": "enabled",
                                  "description": "Should your current documentation version be shown in the navigation bar?"
                                }
                              },
                              "required": [
                                "left",
                                "links",
                                "right",
                                "sub_nav"
                              ],
                              "additionalProperties": false
                            },
                            "table_of_contents": {
                              "type": "string",
                              "enum": [
                                "enabled",
                                "disabled"
                              ],
                              "default": "enabled",
                              "description": "Should your guides show a table of contents?"
                            },
                            "ai": {
                              "type": "object",
                              "properties": {
                                "dropdown": {
                                  "type": "string",
                                  "enum": [
                                    "enabled",
                                    "disabled"
                                  ],
                                  "default": "disabled",
                                  "description": "Should your pages show a share with AI dropdown?"
                                },
                                "options": {
                                  "type": "object",
                                  "properties": {
                                    "ask_ai": {
                                      "type": "string",
                                      "enum": [
                                        "enabled",
                                        "disabled"
                                      ],
                                      "default": "disabled",
                                      "description": "Enable \"Ask AI\" in the AI dropdown."
                                    },
                                    "chatgpt": {
                                      "type": "string",
                                      "enum": [
                                        "enabled",
                                        "disabled"
                                      ],
                                      "default": "enabled",
                                      "description": "Enable ChatGPT in the AI dropdown."
                                    },
                                    "claude": {
                                      "type": "string",
                                      "enum": [
                                        "enabled",
                                        "disabled"
                                      ],
                                      "default": "enabled",
                                      "description": "Enable Claude in the AI dropdown."
                                    },
                                    "clipboard": {
                                      "type": "string",
                                      "enum": [
                                        "enabled",
                                        "disabled"
                                      ],
                                      "default": "enabled",
                                      "description": "Enable \"Copy to Clipboard\" within in the AI dropdown."
                                    },
                                    "view_as_markdown": {
                                      "type": "string",
                                      "enum": [
                                        "enabled",
                                        "disabled"
                                      ],
                                      "default": "enabled",
                                      "description": "Enable \"View as Markdown\" in the AI dropdown."
                                    }
                                  },
                                  "additionalProperties": false
                                }
                              },
                              "required": [
                                "options"
                              ],
                              "additionalProperties": false
                            },
                            "whats_next_label": {
                              "type": "string",
                              "nullable": true,
                              "description": "What should we call the next steps section of your guides? Defaults to \"What's Next\"."
                            }
                          },
                          "required": [
                            "brand",
                            "changelog",
                            "custom_code",
                            "footer",
                            "header",
                            "layout",
                            "logo",
                            "markdown",
                            "navigation",
                            "ai",
                            "whats_next_label"
                          ],
                          "additionalProperties": false
                        },
                        "canonical_url": {
                          "type": "string",
                          "format": "uri",
                          "nullable": true,
                          "description": "The canonical base URL for your project defaults to your project's base URL, but you can override the canonical base URL with this field."
                        },
                        "custom_login": {
                          "type": "object",
                          "properties": {
                            "jwt_secret": {
                              "type": "string"
                            },
                            "jwt_expiration_time": {
                              "type": "number"
                            },
                            "login_url": {
                              "type": "string",
                              "nullable": true
                            },
                            "logout_url": {
                              "type": "string",
                              "nullable": true
                            }
                          },
                          "required": [
                            "jwt_secret",
                            "jwt_expiration_time",
                            "login_url",
                            "logout_url"
                          ],
                          "additionalProperties": false
                        },
                        "default_version": {
                          "type": "object",
                          "properties": {
                            "name": {
                              "type": "string",
                              "pattern": "stable|([0-9]+)(?:\\.([0-9]+))?(?:\\.([0-9]+))?(-.*)?",
                              "description": "The version of your project that users are directed to by default."
                            }
                          },
                          "required": [
                            "name"
                          ],
                          "additionalProperties": false
                        },
                        "description": {
                          "type": "string",
                          "nullable": true,
                          "description": "The description of your project. This is used in the page meta description and is seen by search engines and sites like Facebook."
                        },
                        "glossary": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "term": {
                                "type": "string",
                                "description": "Glossary term is what gets displayed in your documentation when embedded."
                              },
                              "definition": {
                                "type": "string",
                                "description": "Glossary definition is revealed to users when they mouse over the glossary term."
                              }
                            },
                            "required": [
                              "term",
                              "definition"
                            ],
                            "additionalProperties": false
                          },
                          "default": [],
                          "description": "List of glossary terms in your project that can be used within your documentation."
                        },
                        "health_check": {
                          "type": "object",
                          "properties": {
                            "provider": {
                              "type": "string",
                              "enum": [
                                "manual",
                                "statuspage",
                                "none"
                              ],
                              "default": "none",
                              "description": "The type of provider you wish to use for for managing your APIs health: manually or through [Atlassian Statuspage](https://www.atlassian.com/software/statuspage)."
                            },
                            "settings": {
                              "type": "object",
                              "properties": {
                                "manual": {
                                  "type": "object",
                                  "properties": {
                                    "status": {
                                      "type": "string",
                                      "enum": [
                                        "up",
                                        "down"
                                      ],
                                      "default": "up",
                                      "description": "If you are manually managing your APIs health this is a status boolean indicating if your API is up or down."
                                    },
                                    "url": {
                                      "type": "string",
                                      "nullable": true,
                                      "description": "The URL that we will show to your users when your API is down. This is only used when `health_check.provider` is set to `manual`."
                                    }
                                  },
                                  "required": [
                                    "url"
                                  ],
                                  "additionalProperties": false
                                },
                                "statuspage": {
                                  "type": "object",
                                  "properties": {
                                    "id": {
                                      "type": "string",
                                      "nullable": true,
                                      "description": "If managing your APIs health through [Statuspage](https://www.atlassian.com/software/statuspage) this is your Statuspage ID."
                                    }
                                  },
                                  "required": [
                                    "id"
                                  ],
                                  "additionalProperties": false
                                }
                              },
                              "required": [
                                "manual",
                                "statuspage"
                              ],
                              "additionalProperties": false
                            }
                          },
                          "required": [
                            "settings"
                          ],
                          "additionalProperties": false
                        },
                        "homepage_url": {
                          "type": "string",
                          "nullable": true,
                          "description": "The URL for your company's main website. We'll link to it in various places so people can \"Go Home\"."
                        },
                        "i18n": {
                          "type": "object",
                          "properties": {
                            "defaultLanguage": {
                              "type": "string",
                              "enum": [
                                "en",
                                "de",
                                "es",
                                "fr",
                                "it",
                                "ja",
                                "pt",
                                "zh"
                              ],
                              "description": "The primary language used for this project."
                            },
                            "languages": {
                              "type": "array",
                              "items": {
                                "type": "string",
                                "enum": [
                                  "en",
                                  "de",
                                  "es",
                                  "fr",
                                  "it",
                                  "ja",
                                  "pt",
                                  "zh"
                                ]
                              },
                              "description": "The list of languages this project supports."
                            },
                            "state": {
                              "type": "string",
                              "enum": [
                                "disabled",
                                "enabled"
                              ],
                              "description": "If internationalization support is enabled or disabled."
                            }
                          },
                          "required": [
                            "defaultLanguage",
                            "languages",
                            "state"
                          ],
                          "additionalProperties": false,
                          "description": "Internationalization settings for the project."
                        },
                        "integrations": {
                          "type": "object",
                          "properties": {
                            "aws": {
                              "type": "object",
                              "properties": {
                                "readme_webhook_login": {
                                  "type": "object",
                                  "properties": {
                                    "external_id": {
                                      "type": "string",
                                      "nullable": true
                                    },
                                    "region": {
                                      "type": "string",
                                      "enum": [
                                        "af-south-1",
                                        "ap-east-1",
                                        "ap-northeast-1",
                                        "ap-northeast-2",
                                        "ap-northeast-3",
                                        "ap-south-1",
                                        "ap-south-2",
                                        "ap-southeast-1",
                                        "ap-southeast-2",
                                        "ap-southeast-3",
                                        "ap-southeast-4",
                                        "ap-southeast-5",
                                        "ca-central-1",
                                        "ca-west-1",
                                        "cn-north-1",
                                        "cn-northwest-1",
                                        "eu-central-1",
                                        "eu-central-2",
                                        "eu-north-1",
                                        "eu-south-1",
                                        "eu-south-2",
                                        "eu-west-1",
                                        "eu-west-2",
                                        "eu-west-3",
                                        "il-central-1",
                                        "me-central-1",
                                        "me-south-1",
                                        "sa-east-1",
                                        "us-east-1",
                                        "us-east-2",
                                        "us-west-1",
                                        "us-west-2"
                                      ],
                                      "nullable": true
                                    },
                                    "role_arn": {
                                      "type": "string",
                                      "nullable": true
                                    },
                                    "usage_plan_id": {
                                      "type": "string",
                                      "nullable": true
                                    }
                                  },
                                  "required": [
                                    "external_id",
                                    "region",
                                    "role_arn",
                                    "usage_plan_id"
                                  ],
                                  "additionalProperties": false
                                }
                              },
                              "required": [
                                "readme_webhook_login"
                              ],
                              "additionalProperties": false
                            },
                            "bing": {
                              "type": "object",
                              "properties": {
                                "verify": {
                                  "type": "string",
                                  "nullable": true
                                }
                              },
                              "required": [
                                "verify"
                              ],
                              "additionalProperties": false
                            },
                            "google": {
                              "type": "object",
                              "properties": {
                                "analytics": {
                                  "type": "string",
                                  "nullable": true,
                                  "description": "Your Google Analytics ID. If it starts with UA-, we'll use Universal Analytics otherwise Google Analytics 4."
                                },
                                "site_verification": {
                                  "type": "string",
                                  "nullable": true
                                }
                              },
                              "required": [
                                "analytics",
                                "site_verification"
                              ],
                              "additionalProperties": false
                            },
                            "heap": {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "string",
                                  "nullable": true
                                }
                              },
                              "required": [
                                "id"
                              ],
                              "additionalProperties": false
                            },
                            "intercom": {
                              "type": "object",
                              "properties": {
                                "app_id": {
                                  "type": "string",
                                  "nullable": true
                                },
                                "secure_mode": {
                                  "type": "object",
                                  "properties": {
                                    "key": {
                                      "type": "string",
                                      "nullable": true,
                                      "description": "By supplying a secure mode key you will opt into [Intercoms Identity Verification](https://docs.intercom.io/configuring-intercom/enable-secure-mode) system."
                                    },
                                    "email_only": {
                                      "type": "boolean",
                                      "default": false,
                                      "description": "Should ReadMe only identify users by their email addresses? This integrates better with your existing Intercom but is possibly less secure."
                                    }
                                  },
                                  "required": [
                                    "key"
                                  ],
                                  "additionalProperties": false
                                }
                              },
                              "required": [
                                "app_id",
                                "secure_mode"
                              ],
                              "additionalProperties": false
                            },
                            "postman": {
                              "type": "object",
                              "properties": {
                                "key": {
                                  "type": "string",
                                  "nullable": true
                                },
                                "client_id": {
                                  "type": "string",
                                  "nullable": true
                                },
                                "client_secret": {
                                  "type": "string",
                                  "nullable": true
                                },
                                "is_connected": {
                                  "type": "boolean"
                                }
                              },
                              "required": [
                                "key",
                                "client_id",
                                "client_secret",
                                "is_connected"
                              ],
                              "additionalProperties": false
                            },
                            "koala": {
                              "type": "object",
                              "properties": {
                                "key": {
                                  "type": "string",
                                  "nullable": true
                                }
                              },
                              "required": [
                                "key"
                              ],
                              "additionalProperties": false
                            },
                            "localize": {
                              "type": "object",
                              "properties": {
                                "key": {
                                  "type": "string",
                                  "nullable": true
                                }
                              },
                              "required": [
                                "key"
                              ],
                              "additionalProperties": false
                            },
                            "recaptcha": {
                              "type": "object",
                              "properties": {
                                "site_key": {
                                  "type": "string",
                                  "nullable": true
                                },
                                "secret_key": {
                                  "type": "string",
                                  "nullable": true
                                }
                              },
                              "required": [
                                "site_key",
                                "secret_key"
                              ],
                              "additionalProperties": false,
                              "description": "https://docs.readme.com/main/docs/recaptcha"
                            },
                            "segment": {
                              "type": "object",
                              "properties": {
                                "key": {
                                  "type": "string",
                                  "nullable": true
                                },
                                "domain": {
                                  "type": "string",
                                  "nullable": true,
                                  "description": "If you are proxying [Segment](https://segment.com/) requests through a custom domain this is that domain. More information about this configuration can be found [here](https://docs.readme.com/main/docs/segment#using-a-custom-domain-with-segment)."
                                }
                              },
                              "required": [
                                "key",
                                "domain"
                              ],
                              "additionalProperties": false
                            },
                            "speakeasy": {
                              "type": "object",
                              "properties": {
                                "key": {
                                  "type": "string",
                                  "nullable": true,
                                  "description": "The API key for Speakeasy."
                                },
                                "spec_url": {
                                  "type": "string",
                                  "nullable": true,
                                  "description": "The URL to the Speakeasy spec file."
                                }
                              },
                              "required": [
                                "key",
                                "spec_url"
                              ],
                              "additionalProperties": false
                            },
                            "stainless": {
                              "type": "object",
                              "properties": {
                                "key": {
                                  "type": "string",
                                  "nullable": true,
                                  "description": "The API key for Stainless."
                                },
                                "name": {
                                  "type": "string",
                                  "nullable": true,
                                  "description": "The name of the Stainless project."
                                }
                              },
                              "required": [
                                "key",
                                "name"
                              ],
                              "additionalProperties": false
                            },
                            "typekit": {
                              "type": "object",
                              "properties": {
                                "key": {
                                  "type": "string",
                                  "nullable": true
                                }
                              },
                              "required": [
                                "key"
                              ],
                              "additionalProperties": false
                            },
                            "zendesk": {
                              "type": "object",
                              "properties": {
                                "subdomain": {
                                  "type": "string",
                                  "nullable": true
                                }
                              },
                              "required": [
                                "subdomain"
                              ],
                              "additionalProperties": false
                            }
                          },
                          "required": [
                            "aws",
                            "bing",
                            "google",
                            "heap",
                            "intercom",
                            "postman",
                            "koala",
                            "localize",
                            "recaptcha",
                            "segment",
                            "speakeasy",
                            "stainless",
                            "typekit",
                            "zendesk"
                          ],
                          "additionalProperties": false
                        },
                        "mcp": {
                          "type": "object",
                          "properties": {
                            "state": {
                              "type": "string",
                              "enum": [
                                "enabled",
                                "disabled"
                              ],
                              "default": "disabled",
                              "description": "The availability of the project's MCP server."
                            },
                            "custom_tools": {
                              "type": "array",
                              "items": {
                                "type": "object",
                                "properties": {
                                  "title": {
                                    "type": "string",
                                    "description": "The title of the tool."
                                  },
                                  "description": {
                                    "type": "string",
                                    "description": "The description of the tool."
                                  },
                                  "body": {
                                    "type": "string",
                                    "description": "The body of the tool."
                                  }
                                },
                                "required": [
                                  "title",
                                  "description",
                                  "body"
                                ],
                                "additionalProperties": false
                              },
                              "default": [],
                              "description": "Custom tools that the user can add to the MCP server."
                            },
                            "disabled_routes": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              },
                              "default": [],
                              "description": "Array of route paths that are disabled in the MCP server."
                            },
                            "disabled_tools": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              },
                              "default": [],
                              "description": "Array of tool names that will be prevented from being added to the MCP server."
                            }
                          },
                          "additionalProperties": false,
                          "description": "Configuration for the project's Model Context Protocol (MCP) server."
                        },
                        "name": {
                          "type": "string",
                          "description": "The name of the project."
                        },
                        "onboarding_completed": {
                          "type": "object",
                          "properties": {
                            "api": {
                              "type": "boolean",
                              "default": false
                            },
                            "appearance": {
                              "type": "boolean",
                              "default": false
                            },
                            "documentation": {
                              "type": "boolean",
                              "default": false
                            },
                            "domain": {
                              "type": "boolean",
                              "default": false
                            },
                            "jwt": {
                              "type": "boolean",
                              "default": false
                            },
                            "logs": {
                              "type": "boolean",
                              "default": false
                            },
                            "metricsSDK": {
                              "type": "boolean",
                              "default": false
                            }
                          },
                          "additionalProperties": false
                        },
                        "pages": {
                          "type": "object",
                          "properties": {
                            "not_found": {
                              "type": "string",
                              "pattern": "\\/(versions|branches)\\/((v{0,1})(stable|([0-9]+)(?:\\.([0-9]+))?(?:\\.([0-9]+))?(-.*)?)(_(.*))?)\\/custom_pages\\/([a-f\\d]{24}|([a-z0-9-_ ]|[^\\\\x00-\\\\x7F])+)",
                              "nullable": true,
                              "description": "The page you wish to be served to your users when they encounter a 404. This can either map to the `uri` of a Custom Page on your project or be set to `null`. If `null` then the default ReadMe 404 page will be served. The version within the `uri` must be mapped to your stable version."
                            }
                          },
                          "required": [
                            "not_found"
                          ],
                          "additionalProperties": false
                        },
                        "parent": {
                          "type": "string",
                          "nullable": true,
                          "description": "Does the project have a parent project (enterprise)? If so, this resolves to the parent's subdomain."
                        },
                        "plan": {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "enum": [
                                "business",
                                "business2018",
                                "business-annual-2024",
                                "enterprise",
                                "free",
                                "freelaunch",
                                "opensource",
                                "startup",
                                "startup2018",
                                "startup-annual-2024"
                              ],
                              "default": "free"
                            },
                            "grace_period": {
                              "type": "object",
                              "properties": {
                                "enabled": {
                                  "type": "boolean",
                                  "default": false
                                },
                                "end_date": {
                                  "type": "string",
                                  "format": "date-time",
                                  "nullable": true,
                                  "default": null
                                }
                              },
                              "additionalProperties": false
                            },
                            "trial": {
                              "type": "object",
                              "properties": {
                                "expired": {
                                  "type": "boolean",
                                  "default": false
                                },
                                "end_date": {
                                  "type": "string",
                                  "format": "date-time",
                                  "description": "The end date for your two week trial."
                                }
                              },
                              "required": [
                                "end_date"
                              ],
                              "additionalProperties": false
                            }
                          },
                          "required": [
                            "grace_period",
                            "trial"
                          ],
                          "additionalProperties": false
                        },
                        "metrics": {
                          "type": "object",
                          "properties": {
                            "monthly_purchase_limit": {
                              "type": "number",
                              "default": 0,
                              "description": "The monthly purchase limit for the Developer Dashboard add-on."
                            }
                          },
                          "additionalProperties": false
                        },
                        "privacy": {
                          "type": "object",
                          "properties": {
                            "openapi": {
                              "type": "string",
                              "enum": [
                                "public",
                                "admin",
                                "teammates"
                              ],
                              "default": "admin",
                              "description": "The visibility your OpenAPI definitions on your project's `/openapi` page."
                            },
                            "password": {
                              "type": "string",
                              "nullable": true,
                              "description": "The project's password for when `privacy.view` is `password`. This field can be set, but it will not be returned by the API."
                            },
                            "view": {
                              "type": "string",
                              "enum": [
                                "public",
                                "admin",
                                "password",
                                "custom_login"
                              ],
                              "default": "public",
                              "description": "* `public` - Site is available to the public.\n* `admin` - Site is only available to users that have project permissions.\n* `password` - Site is gated behind a password authentication system.\n* `custom_login` - Users who view your site will be forwarded to a URL of your choice, having them login there and be forwarded back to your ReadMe site."
                            }
                          },
                          "required": [
                            "password"
                          ],
                          "additionalProperties": false
                        },
                        "redirects": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "from": {
                                "type": "string"
                              },
                              "to": {
                                "type": "string"
                              }
                            },
                            "required": [
                              "from",
                              "to"
                            ],
                            "additionalProperties": false
                          },
                          "description": "A collection of page redirects that ReadMe will permanently redirect users to when attempting to render a 404. Check out our [redirect docs](https://docs.readme.com/main/docs/error-pages#section-redirects) for more information on how they are handled."
                        },
                        "reference": {
                          "type": "object",
                          "properties": {
                            "api_sdk_snippets": {
                              "type": "string",
                              "enum": [
                                "enabled",
                                "disabled"
                              ],
                              "default": "enabled",
                              "description": "Enable SDK-generated request code snippets."
                            },
                            "sdk_snippets": {
                              "type": "object",
                              "properties": {
                                "external": {
                                  "type": "string",
                                  "enum": [
                                    "active",
                                    "disabled",
                                    "enabled"
                                  ],
                                  "default": "disabled",
                                  "description": "State of external SDK snippets feature."
                                }
                              },
                              "additionalProperties": false
                            },
                            "defaults": {
                              "type": "string",
                              "enum": [
                                "always_use",
                                "use_only_if_required"
                              ],
                              "default": "use_only_if_required",
                              "description": "When `always_use`, any `default` values defined in your API definition are used to populate your request data in the API Explorer, even if the parameter is not marked as `required`."
                            },
                            "json_editor": {
                              "type": "string",
                              "enum": [
                                "enabled",
                                "disabled"
                              ],
                              "default": "disabled",
                              "description": "When `enabled`, allows editing the request body with a JSON editor."
                            },
                            "method_badge_style": {
                              "type": "string",
                              "enum": [
                                "classic",
                                "modern"
                              ],
                              "default": "classic",
                              "description": "The style of the HTTP method badges used in the API Reference."
                            },
                            "request_history": {
                              "type": "string",
                              "enum": [
                                "enabled",
                                "disabled"
                              ],
                              "default": "enabled",
                              "description": "When `enabled`, request history for API endpoints are shown."
                            },
                            "oauth_flows": {
                              "type": "string",
                              "enum": [
                                "enabled",
                                "disabled"
                              ],
                              "default": "disabled",
                              "description": "When `enabled`, enable the new OAuth Flows experience in the API Reference section."
                            },
                            "response_examples": {
                              "type": "string",
                              "enum": [
                                "expanded",
                                "collapsed"
                              ],
                              "default": "collapsed",
                              "description": "When `expanded`, response examples will be expanded by default if a 200 level response exists."
                            },
                            "response_schemas": {
                              "type": "string",
                              "enum": [
                                "expanded",
                                "collapsed"
                              ],
                              "default": "collapsed",
                              "description": "When `expanded`, response schemas will be expanded by default if a 200 level response schema exists."
                            },
                            "show_method_in_sidebar": {
                              "type": "string",
                              "enum": [
                                "enabled",
                                "disabled"
                              ],
                              "default": "enabled",
                              "description": "When `enabled`, the HTTP method badge will be shown in the sidebar."
                            }
                          },
                          "required": [
                            "sdk_snippets"
                          ],
                          "additionalProperties": false,
                          "description": "Contains options to configure interactive sections on your API Reference pages."
                        },
                        "seo": {
                          "type": "object",
                          "properties": {
                            "overwrite_title_tag": {
                              "type": "string",
                              "enum": [
                                "enabled",
                                "disabled"
                              ],
                              "default": "disabled",
                              "description": "Overwrite pages' <title> tag with their custom metadata title (if present)."
                            }
                          },
                          "additionalProperties": false
                        },
                        "sitemap": {
                          "type": "string",
                          "enum": [
                            "enabled",
                            "disabled"
                          ],
                          "default": "disabled",
                          "description": "Expose a `sitemap.xml` directory on your project."
                        },
                        "llms_txt": {
                          "type": "string",
                          "enum": [
                            "enabled",
                            "disabled"
                          ],
                          "default": "enabled",
                          "description": "Expose an `llms.txt` file to help AI assistants understand your documentation structure."
                        },
                        "subdomain": {
                          "type": "string",
                          "pattern": "[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*",
                          "maxLength": 30,
                          "description": "The subdomain of your project."
                        },
                        "suggested_edits": {
                          "type": "string",
                          "enum": [
                            "enabled",
                            "disabled"
                          ],
                          "default": "enabled",
                          "description": "Allow users to suggest edits to your documentation."
                        },
                        "variable_defaults": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "id": {
                                "type": "string",
                                "description": "Variable Identifier"
                              },
                              "name": {
                                "type": "string",
                                "description": "The key name of the variable."
                              },
                              "default": {
                                "type": "string",
                                "description": "The default value of the variable."
                              },
                              "source": {
                                "type": "string",
                                "enum": [
                                  "server",
                                  "security",
                                  "custom",
                                  ""
                                ],
                                "default": "",
                                "description": "The variables source. This can come from a user input or from syncing an OpenAPI definition."
                              },
                              "type": {
                                "type": "string",
                                "enum": [
                                  "http",
                                  "apiKey",
                                  "openIdConnect",
                                  "oauth2",
                                  ""
                                ],
                                "description": "If variable `source` is `security`, include the OpenAPI security auth type."
                              },
                              "scheme": {
                                "type": "string",
                                "description": "If variable `source` is `security`, include the OpenAPI security auth scheme."
                              }
                            },
                            "required": [
                              "id",
                              "name"
                            ],
                            "additionalProperties": false
                          },
                          "default": []
                        },
                        "webhooks": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "action": {
                                "type": "string",
                                "enum": [
                                  "login"
                                ],
                                "default": "login"
                              },
                              "timeout": {
                                "type": "number",
                                "default": 5000
                              },
                              "url": {
                                "type": "string",
                                "format": "uri"
                              }
                            },
                            "required": [
                              "url"
                            ],
                            "additionalProperties": false
                          },
                          "default": []
                        },
                        "id": {
                          "type": "string",
                          "pattern": "^[a-f\\d]{24}$",
                          "description": "The unique, immutable, identifier for the project."
                        },
                        "features": {
                          "type": "object",
                          "properties": {
                            "mdx": {
                              "type": "string",
                              "enum": [
                                "enabled",
                                "disabled"
                              ],
                              "default": "disabled",
                              "description": "If this project supports MDX."
                            }
                          },
                          "additionalProperties": false
                        },
                        "feature_rules": {
                          "type": "object",
                          "properties": {
                            "merge": {
                              "type": "object",
                              "properties": {
                                "requirements": {
                                  "type": "array",
                                  "items": {
                                    "type": "string",
                                    "enum": [
                                      "approval",
                                      "lint"
                                    ]
                                  },
                                  "default": [],
                                  "description": "Any states that will block the ability to merge a branch."
                                },
                                "allow_override": {
                                  "type": "array",
                                  "items": {
                                    "type": "string",
                                    "enum": [
                                      "editor"
                                    ]
                                  },
                                  "default": [],
                                  "description": "All permission levels lower than Admin that are able to override a merge that is blocked. Admins can always override."
                                }
                              },
                              "additionalProperties": false
                            }
                          },
                          "required": [
                            "merge"
                          ],
                          "additionalProperties": false
                        },
                        "git": {
                          "type": "object",
                          "properties": {
                            "connection": {
                              "type": "object",
                              "properties": {
                                "repository": {
                                  "type": "object",
                                  "properties": {
                                    "provider_type": {
                                      "type": "string",
                                      "enum": [
                                        "github",
                                        "github_enterprise_server",
                                        "bitbucket",
                                        "gitlab"
                                      ],
                                      "description": "The type of provider for the repository."
                                    },
                                    "name": {
                                      "type": "string",
                                      "description": "The name of the repository (e.g., `repo-with-content`)."
                                    },
                                    "full_name": {
                                      "type": "string",
                                      "description": "The full name of the repository (e.g., `owner-org/repo-with-content`)."
                                    },
                                    "privacy": {
                                      "type": "object",
                                      "properties": {
                                        "private": {
                                          "type": "boolean"
                                        },
                                        "visibility": {
                                          "type": "string",
                                          "enum": [
                                            "public",
                                            "private",
                                            "internal"
                                          ],
                                          "description": "Whether this repo is private, public, or internal."
                                        }
                                      },
                                      "required": [
                                        "private",
                                        "visibility"
                                      ],
                                      "additionalProperties": false
                                    },
                                    "url": {
                                      "type": "string",
                                      "format": "uri",
                                      "description": "The URL of the repository (e.g., `https://github.com/owner-org/repo-with-content`)."
                                    }
                                  },
                                  "required": [
                                    "provider_type",
                                    "name",
                                    "full_name",
                                    "privacy",
                                    "url"
                                  ],
                                  "additionalProperties": false,
                                  "nullable": true
                                },
                                "organization": {
                                  "type": "object",
                                  "properties": {
                                    "name": {
                                      "type": "string",
                                      "description": "The name of the organization the linked repository is a part of (e.g., `owner-org`)."
                                    },
                                    "provider_type": {
                                      "type": "string",
                                      "enum": [
                                        "github",
                                        "github_enterprise_server",
                                        "bitbucket",
                                        "gitlab"
                                      ],
                                      "description": "The type of provider for the organization."
                                    }
                                  },
                                  "required": [
                                    "name",
                                    "provider_type"
                                  ],
                                  "additionalProperties": false,
                                  "nullable": true
                                },
                                "status": {
                                  "type": "string",
                                  "enum": [
                                    "active",
                                    "inactive",
                                    "none"
                                  ],
                                  "default": "none",
                                  "description": "Indicates if the project has a bi-directional sync connection set up. Below is the meaning of each possible value:\n- `active` - the project has an external repository connected and the connection to the repository is active.\n- `inactive` - the project has an external repository connected but the connection to the repository is inactive.\n- `none` - the project is not connected to an external repository."
                                }
                              },
                              "required": [
                                "repository",
                                "organization"
                              ],
                              "additionalProperties": false
                            }
                          },
                          "required": [
                            "connection"
                          ],
                          "additionalProperties": false
                        },
                        "permissions": {
                          "type": "object",
                          "properties": {
                            "appearance": {
                              "type": "object",
                              "properties": {
                                "private_label": {
                                  "type": "string",
                                  "enum": [
                                    "enabled",
                                    "disabled"
                                  ],
                                  "default": "disabled",
                                  "description": "If this project is allowed to private label their Hub and remove all ReadMe branding."
                                },
                                "custom_code": {
                                  "type": "object",
                                  "properties": {
                                    "css": {
                                      "type": "string",
                                      "enum": [
                                        "enabled",
                                        "disabled"
                                      ],
                                      "default": "disabled",
                                      "description": "If this project is allowed to utilize custom CSS."
                                    },
                                    "html": {
                                      "type": "string",
                                      "enum": [
                                        "enabled",
                                        "disabled"
                                      ],
                                      "default": "disabled",
                                      "description": "If this project is allowed to utilize custom HTML."
                                    },
                                    "js": {
                                      "type": "string",
                                      "enum": [
                                        "enabled",
                                        "disabled"
                                      ],
                                      "default": "disabled",
                                      "description": "If this project is allowed to utilize custom JS."
                                    }
                                  },
                                  "additionalProperties": false
                                }
                              },
                              "required": [
                                "custom_code"
                              ],
                              "additionalProperties": false
                            },
                            "branches": {
                              "type": "object",
                              "properties": {
                                "merge": {
                                  "type": "object",
                                  "properties": {
                                    "admin": {
                                      "type": "boolean",
                                      "description": "Whether admin role can perform merges."
                                    },
                                    "editor": {
                                      "type": "boolean",
                                      "description": "Whether editor role can perform merges."
                                    }
                                  },
                                  "required": [
                                    "admin",
                                    "editor"
                                  ],
                                  "additionalProperties": false,
                                  "description": "Role-based access control for merging branches"
                                },
                                "approve": {
                                  "type": "object",
                                  "properties": {
                                    "admin": {
                                      "type": "boolean",
                                      "description": "Whether admin role can approve changes."
                                    },
                                    "editor": {
                                      "type": "boolean",
                                      "description": "Whether editor role can approve changes"
                                    }
                                  },
                                  "required": [
                                    "admin",
                                    "editor"
                                  ],
                                  "additionalProperties": false,
                                  "description": "Role-based access control for approving changes"
                                }
                              },
                              "required": [
                                "merge",
                                "approve"
                              ],
                              "additionalProperties": false
                            }
                          },
                          "required": [
                            "appearance",
                            "branches"
                          ],
                          "additionalProperties": false
                        },
                        "refactored": {
                          "type": "object",
                          "properties": {
                            "status": {
                              "type": "string",
                              "enum": [
                                "enabled",
                                "disabled"
                              ],
                              "default": "disabled",
                              "description": "Indicates if the project has our new Unified UI experience."
                            },
                            "migrated": {
                              "type": "string",
                              "enum": [
                                "failed",
                                "processing",
                                "successful",
                                "unknown"
                              ],
                              "default": "unknown",
                              "description": "Indicates if the project has been migrated from Dash to Superhub."
                            }
                          },
                          "additionalProperties": false
                        },
                        "uri": {
                          "type": "string",
                          "pattern": "\\/projects\\/(me|[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)",
                          "description": "A URI to the project resource."
                        }
                      },
                      "required": [
                        "ai",
                        "api_designer",
                        "appearance",
                        "canonical_url",
                        "custom_login",
                        "default_version",
                        "description",
                        "health_check",
                        "homepage_url",
                        "i18n",
                        "integrations",
                        "mcp",
                        "name",
                        "onboarding_completed",
                        "pages",
                        "parent",
                        "plan",
                        "metrics",
                        "privacy",
                        "redirects",
                        "reference",
                        "seo",
                        "subdomain",
                        "id",
                        "features",
                        "feature_rules",
                        "git",
                        "permissions",
                        "refactored",
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
      "name": "Projects"
    }
  ]
}
```