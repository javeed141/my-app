# Create a branch

Create a new branch in your ReadMe project.

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
    "/branches": {
      "post": {
        "operationId": "createBranch",
        "summary": "Create a branch",
        "tags": [
          "Branches"
        ],
        "description": "Create a new branch in your ReadMe project.\n\n>📘\n> This route is only available to projects that are using [ReadMe Refactored](https://docs.readme.com/main/docs/welcome-to-readme-refactored).",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "anyOf": [
                  {
                    "type": "object",
                    "properties": {
                      "base": {
                        "type": "string",
                        "description": "The clean string of version we are basing off of. Defaults to the stable version."
                      },
                      "display_name": {
                        "type": "string",
                        "description": "A non-semver display name for the version."
                      },
                      "name": {
                        "type": "string",
                        "pattern": "stable|([0-9]+)(?:\\.([0-9]+))?(?:\\.([0-9]+))?(-.*)?",
                        "description": "The semver name for the version."
                      },
                      "privacy": {
                        "type": "object",
                        "properties": {
                          "view": {
                            "type": "string",
                            "enum": [
                              "default",
                              "hidden",
                              "public"
                            ],
                            "default": "hidden",
                            "description": "Whether the version is public, hidden, or the stable version that's visible by default."
                          }
                        },
                        "additionalProperties": false
                      },
                      "release_stage": {
                        "type": "string",
                        "enum": [
                          "beta",
                          "release"
                        ],
                        "default": "release",
                        "description": "Whether the version is released or in beta."
                      },
                      "state": {
                        "type": "string",
                        "enum": [
                          "current",
                          "deprecated"
                        ],
                        "default": "current",
                        "description": "Whether the version is current or deprecated."
                      }
                    },
                    "required": [
                      "name"
                    ],
                    "additionalProperties": false
                  },
                  {
                    "type": "object",
                    "properties": {
                      "name": {
                        "type": "string",
                        "pattern": "(v{0,1})(stable|([0-9]+)(?:\\.([0-9]+))?(?:\\.([0-9]+))?(-.*)?)(_(.*))?",
                        "description": "The name of the branch."
                      }
                    },
                    "required": [
                      "name"
                    ],
                    "additionalProperties": false
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Created",
            "content": {
              "application/json": {
                "schema": {
                  "anyOf": [
                    {
                      "type": "object",
                      "properties": {
                        "data": {
                          "type": "object",
                          "properties": {
                            "base": {
                              "type": "string",
                              "nullable": true,
                              "description": "The name of the version this version was based off of."
                            },
                            "display_name": {
                              "type": "string",
                              "nullable": true,
                              "description": "A non-semver display name for the version."
                            },
                            "i18n": {
                              "type": "object",
                              "properties": {
                                "lang": {
                                  "type": "string",
                                  "nullable": true,
                                  "description": "The language of the version."
                                },
                                "parsed_version": {
                                  "type": "string",
                                  "nullable": true,
                                  "description": "The parsed version without the language code."
                                }
                              },
                              "required": [
                                "lang",
                                "parsed_version"
                              ],
                              "additionalProperties": false,
                              "description": "Internationalization information for the version. This feature is gated and still in active development, so the values in this object will generally be set to `null`."
                            },
                            "name": {
                              "type": "string",
                              "pattern": "stable|([0-9]+)(?:\\.([0-9]+))?(?:\\.([0-9]+))?(-.*)?",
                              "description": "The semver name for the version."
                            },
                            "privacy": {
                              "type": "object",
                              "properties": {
                                "view": {
                                  "type": "string",
                                  "enum": [
                                    "default",
                                    "hidden",
                                    "public"
                                  ],
                                  "description": "Whether the version is public, hidden, or the stable version that's visible by default."
                                }
                              },
                              "required": [
                                "view"
                              ],
                              "additionalProperties": false
                            },
                            "release_stage": {
                              "type": "string",
                              "enum": [
                                "beta",
                                "release"
                              ],
                              "description": "Whether the version is released or in beta."
                            },
                            "source": {
                              "type": "string",
                              "enum": [
                                "readme",
                                "bidi"
                              ],
                              "description": "Whether the version was created in ReadMe or via Bi-Directional Sync."
                            },
                            "state": {
                              "type": "string",
                              "enum": [
                                "current",
                                "deprecated"
                              ],
                              "description": "Whether the version is current or deprecated."
                            },
                            "updated_at": {
                              "type": "string",
                              "format": "date-time",
                              "description": "An ISO 8601 formatted date for when the version was last updated."
                            },
                            "uri": {
                              "type": "string",
                              "pattern": "\\/branches\\/((v{0,1})(stable|([0-9]+)(?:\\.([0-9]+))?(?:\\.([0-9]+))?(-.*)?)(_(.*))?)",
                              "description": "A URI to the version resource."
                            }
                          },
                          "required": [
                            "base",
                            "display_name",
                            "i18n",
                            "name",
                            "privacy",
                            "release_stage",
                            "source",
                            "state",
                            "updated_at",
                            "uri"
                          ],
                          "additionalProperties": false
                        },
                        "type": {
                          "type": "string",
                          "enum": [
                            "version"
                          ]
                        }
                      },
                      "required": [
                        "data",
                        "type"
                      ],
                      "additionalProperties": false
                    },
                    {
                      "type": "object",
                      "properties": {
                        "data": {
                          "type": "object",
                          "properties": {
                            "base": {
                              "type": "object",
                              "properties": {
                                "base": {
                                  "type": "string",
                                  "nullable": true,
                                  "description": "The name of the version this version was based off of."
                                },
                                "display_name": {
                                  "type": "string",
                                  "nullable": true,
                                  "description": "A non-semver display name for the version."
                                },
                                "i18n": {
                                  "type": "object",
                                  "properties": {
                                    "lang": {
                                      "type": "string",
                                      "nullable": true,
                                      "description": "The language of the version."
                                    },
                                    "parsed_version": {
                                      "type": "string",
                                      "nullable": true,
                                      "description": "The parsed version without the language code."
                                    }
                                  },
                                  "required": [
                                    "lang",
                                    "parsed_version"
                                  ],
                                  "additionalProperties": false,
                                  "description": "Internationalization information for the version. This feature is gated and still in active development, so the values in this object will generally be set to `null`."
                                },
                                "name": {
                                  "type": "string",
                                  "pattern": "stable|([0-9]+)(?:\\.([0-9]+))?(?:\\.([0-9]+))?(-.*)?",
                                  "description": "The semver name for the version."
                                },
                                "privacy": {
                                  "type": "object",
                                  "properties": {
                                    "view": {
                                      "type": "string",
                                      "enum": [
                                        "default",
                                        "hidden",
                                        "public"
                                      ],
                                      "description": "Whether the version is public, hidden, or the stable version that's visible by default."
                                    }
                                  },
                                  "required": [
                                    "view"
                                  ],
                                  "additionalProperties": false
                                },
                                "release_stage": {
                                  "type": "string",
                                  "enum": [
                                    "beta",
                                    "release"
                                  ],
                                  "description": "Whether the version is released or in beta."
                                },
                                "source": {
                                  "type": "string",
                                  "enum": [
                                    "readme",
                                    "bidi"
                                  ],
                                  "description": "Whether the version was created in ReadMe or via Bi-Directional Sync."
                                },
                                "state": {
                                  "type": "string",
                                  "enum": [
                                    "current",
                                    "deprecated"
                                  ],
                                  "description": "Whether the version is current or deprecated."
                                },
                                "updated_at": {
                                  "type": "string",
                                  "format": "date-time",
                                  "description": "An ISO 8601 formatted date for when the version was last updated."
                                },
                                "uri": {
                                  "type": "string",
                                  "pattern": "\\/branches\\/((v{0,1})(stable|([0-9]+)(?:\\.([0-9]+))?(?:\\.([0-9]+))?(-.*)?)(_(.*))?)",
                                  "description": "A URI to the version resource."
                                }
                              },
                              "required": [
                                "base",
                                "display_name",
                                "i18n",
                                "name",
                                "privacy",
                                "release_stage",
                                "source",
                                "state",
                                "updated_at",
                                "uri"
                              ],
                              "additionalProperties": false,
                              "description": "The representation of the version the branch was created from or the stable version."
                            },
                            "href": {
                              "type": "object",
                              "properties": {
                                "external": {
                                  "type": "object",
                                  "properties": {
                                    "diff": {
                                      "type": "string",
                                      "nullable": true,
                                      "description": "A link to the external branch diff on bi-directionally synced projects."
                                    },
                                    "view": {
                                      "type": "string",
                                      "nullable": true,
                                      "description": "A link to view the external branch on bi-directionally synced projects."
                                    }
                                  },
                                  "required": [
                                    "diff",
                                    "view"
                                  ],
                                  "additionalProperties": false
                                }
                              },
                              "required": [
                                "external"
                              ],
                              "additionalProperties": false
                            },
                            "name": {
                              "type": "string",
                              "pattern": "(v{0,1})(stable|([0-9]+)(?:\\.([0-9]+))?(?:\\.([0-9]+))?(-.*)?)(_(.*))?",
                              "description": "The name of the branch and its version prefix."
                            },
                            "updated_at": {
                              "type": "string",
                              "format": "date-time",
                              "description": "An ISO 8601 formatted date for when the branch was last updated."
                            },
                            "uri": {
                              "type": "string",
                              "pattern": "\\/branches\\/((v{0,1})(stable|([0-9]+)(?:\\.([0-9]+))?(?:\\.([0-9]+))?(-.*)?)(_(.*))?)",
                              "description": "A URI to the branch resource."
                            },
                            "review": {
                              "type": "object",
                              "properties": {
                                "branch": {
                                  "type": "object",
                                  "properties": {
                                    "uri": {
                                      "type": "string",
                                      "description": "A URI to the version or branch resource that this custom block belongs to."
                                    },
                                    "name": {
                                      "type": "string",
                                      "description": "A friendly name automatically generated from your internal version number or branch name."
                                    }
                                  },
                                  "required": [
                                    "uri",
                                    "name"
                                  ],
                                  "additionalProperties": false
                                },
                                "status": {
                                  "type": "string",
                                  "enum": [
                                    "draft",
                                    "ready",
                                    "approved"
                                  ],
                                  "default": "draft",
                                  "description": "The current review status."
                                },
                                "reviewers": {
                                  "type": "array",
                                  "items": {
                                    "type": "object",
                                    "properties": {
                                      "user": {
                                        "type": "object",
                                        "properties": {
                                          "email": {
                                            "type": "string",
                                            "nullable": true,
                                            "default": null,
                                            "description": "The email address of the user who approved the branch."
                                          },
                                          "name": {
                                            "type": "string",
                                            "nullable": true,
                                            "default": null,
                                            "description": "The name of the user who approved the branch."
                                          }
                                        },
                                        "additionalProperties": false,
                                        "description": "Information about the user who approved the branch."
                                      },
                                      "action": {
                                        "type": "string",
                                        "enum": [
                                          "approve",
                                          "revoke"
                                        ],
                                        "description": "The action taken by the user when the review was made."
                                      },
                                      "created_at": {
                                        "type": "string",
                                        "format": "date-time",
                                        "description": "An ISO 8601 formatted date for when the reviewer was created."
                                      },
                                      "updated_at": {
                                        "type": "string",
                                        "format": "date-time",
                                        "nullable": true,
                                        "default": null,
                                        "description": "An ISO 8601 formatted date for when the reviewer was last updated."
                                      }
                                    },
                                    "required": [
                                      "user",
                                      "action",
                                      "created_at"
                                    ],
                                    "additionalProperties": false
                                  },
                                  "default": [],
                                  "description": "A list of reviewers."
                                },
                                "ready_at": {
                                  "type": "string",
                                  "nullable": true,
                                  "default": null,
                                  "description": "An ISO 8601 formatted date for when the review was set to ready."
                                },
                                "ready_by": {
                                  "type": "object",
                                  "properties": {
                                    "email": {
                                      "type": "string",
                                      "nullable": true,
                                      "default": null,
                                      "description": "User email who set the review to ready."
                                    },
                                    "name": {
                                      "type": "string",
                                      "nullable": true,
                                      "default": null,
                                      "description": "User name who set the review to ready."
                                    }
                                  },
                                  "additionalProperties": false,
                                  "description": "User who set the review to ready"
                                },
                                "merged_at": {
                                  "type": "string",
                                  "nullable": true,
                                  "default": null,
                                  "description": "An ISO 8601 formatted date for when the branch was last merged."
                                },
                                "contributors": {
                                  "type": "array",
                                  "items": {
                                    "type": "object",
                                    "properties": {
                                      "user": {
                                        "type": "object",
                                        "properties": {
                                          "email": {
                                            "type": "string",
                                            "nullable": true,
                                            "default": null,
                                            "description": "The email address of the user who contributed to the branch."
                                          },
                                          "name": {
                                            "type": "string",
                                            "nullable": true,
                                            "default": null,
                                            "description": "The email address of the user who contributed to the branch."
                                          }
                                        },
                                        "additionalProperties": false,
                                        "description": "Information about the user who contributed to the branch."
                                      },
                                      "updated_at": {
                                        "type": "string",
                                        "format": "date-time",
                                        "nullable": true,
                                        "default": null,
                                        "description": "An ISO 8601 formatted date for when the contributor last updated."
                                      }
                                    },
                                    "required": [
                                      "user"
                                    ],
                                    "additionalProperties": false
                                  },
                                  "default": [],
                                  "description": "A list of contributors to the branch."
                                },
                                "updated_at": {
                                  "type": "string",
                                  "format": "date-time",
                                  "description": "An ISO 8601 formatted date for when the review was last updated."
                                },
                                "report": {
                                  "type": "object",
                                  "properties": {
                                    "id": {
                                      "type": "string",
                                      "nullable": true,
                                      "default": null,
                                      "description": "A report id or matching job id."
                                    }
                                  },
                                  "additionalProperties": false,
                                  "description": "Information about the reporting job"
                                }
                              },
                              "required": [
                                "branch",
                                "ready_by",
                                "updated_at",
                                "report"
                              ],
                              "additionalProperties": false,
                              "description": "The review status to the branch resource."
                            }
                          },
                          "required": [
                            "base",
                            "href",
                            "name",
                            "updated_at",
                            "uri",
                            "review"
                          ],
                          "additionalProperties": false
                        },
                        "type": {
                          "type": "string",
                          "enum": [
                            "branch"
                          ]
                        }
                      },
                      "required": [
                        "data",
                        "type"
                      ],
                      "additionalProperties": false
                    }
                  ]
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
      "name": "Branches"
    }
  ]
}
```