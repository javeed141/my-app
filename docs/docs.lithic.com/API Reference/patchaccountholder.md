# Update account holder information and possibly resubmit for evaluation

Update the information associated with a particular account holder (including business owners and control persons associated to a business account).
If Lithic is performing KYB or KYC and additional verification is required we will run the individual's or business's updated information again and return whether the status is accepted or pending (i.e., further action required).
All calls to this endpoint will return a synchronous response. The response time will depend on the workflow. In some cases, the response may indicate the workflow is under review or further action will be needed to complete the account creation process.
This endpoint can only be used on existing accounts that are part of the program that the calling API key manages.

# OpenAPI definition

```json
{
  "openapi": "3.1.0",
  "info": {
    "contact": {
      "email": "support@lithic.com"
    },
    "description": "The Lithic Developer API is designed to provide a predictable programmatic interface for accessing your Lithic account through an API and transaction webhooks.\nNote that your API key is a secret and should be treated as such. Don't share it with anyone, including us. We will never ask you for it.\n",
    "termsOfService": "https://lithic.com/legal/terms",
    "license": {
      "name": "Apache 2.0",
      "url": "https://www.apache.org/licenses/LICENSE-2.0.txt"
    },
    "title": "Lithic Developer API",
    "version": "1.0.0"
  },
  "servers": [
    {
      "description": "Sandbox environment that provides key functionality mirroring production",
      "url": "https://sandbox.lithic.com"
    }
  ],
  "tags": [
    {
      "name": "3DS"
    },
    {
      "name": "Account Holder"
    },
    {
      "name": "Auth Stream Access (ASA)"
    },
    {
      "name": "Tokenization"
    }
  ],
  "paths": {
    "/v1/account_holders/{account_holder_token}": {
      "patch": {
        "description": "Update the information associated with a particular account holder (including business owners and control persons associated to a business account).\nIf Lithic is performing KYB or KYC and additional verification is required we will run the individual's or business's updated information again and return whether the status is accepted or pending (i.e., further action required).\nAll calls to this endpoint will return a synchronous response. The response time will depend on the workflow. In some cases, the response may indicate the workflow is under review or further action will be needed to complete the account creation process.\nThis endpoint can only be used on existing accounts that are part of the program that the calling API key manages.",
        "operationId": "patchAccountHolder",
        "parameters": [
          {
            "$ref": "#/components/parameters/accountHolderToken"
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "examples": {
                "kybRequest": {
                  "summary": "Update a business account holder with KYB workflow",
                  "value": {
                    "business_entity": {
                      "entity_token": "83cf25ae-c14f-4d10-9fa2-0119f36c7286",
                      "address": {
                        "postal_code": "61023"
                      }
                    },
                    "control_person": {
                      "entity_token": "fd771a07-c5c2-42f3-a53c-a6c79c6c0d07",
                      "address": {
                        "postal_code": "68023"
                      }
                    },
                    "naics_code": "541512",
                    "website_url": "https://www.mynewbusiness.com"
                  }
                },
                "kycExemptRequest": {
                  "summary": "Update an individual account holder with KYC workflow",
                  "value": {
                    "individual": {
                      "entity_token": "fd771a07-c5c2-42f3-a53c-a6c79c6c0d07",
                      "address": {
                        "postal_code": "68023"
                      },
                      "phone_number": "+15555555555"
                    }
                  }
                },
                "kycRequest": {
                  "summary": "Update an individual account holder with KYC workflow",
                  "value": {
                    "individual": {
                      "entity_token": "fd771a07-c5c2-42f3-a53c-a6c79c6c0d07",
                      "address": {
                        "postal_code": "68023"
                      },
                      "government_id": "111-23-1413"
                    }
                  }
                }
              },
              "schema": {
                "anyOf": [
                  {
                    "$ref": "#/components/schemas/kyb-patch-request"
                  },
                  {
                    "$ref": "#/components/schemas/kyc-patch-request"
                  },
                  {
                    "$ref": "#/components/schemas/patch-request"
                  }
                ]
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "content": {
              "application/json": {
                "schema": {
                  "oneOf": [
                    {
                      "$ref": "#/components/schemas/kyb-kyc-patch-response"
                    },
                    {
                      "$ref": "#/components/schemas/patch-response"
                    }
                  ]
                }
              }
            },
            "description": "OK"
          },
          "404": {
            "$ref": "#/components/responses/NotFound"
          }
        },
        "summary": "Update account holder information and possibly resubmit for evaluation",
        "tags": [
          "Account Holder"
        ],
        "x-readme": {
          "code-samples": [
            {
              "language": "node",
              "code": "import Lithic from 'lithic';\n\nconst client = new Lithic({\n  apiKey: process.env['LITHIC_API_KEY'], // This is the default and can be omitted\n});\n\nconst accountHolder = await client.accountHolders.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {\n  business_entity: {\n    entity_token: '83cf25ae-c14f-4d10-9fa2-0119f36c7286',\n    address: { postal_code: '61023' },\n  },\n  control_person: {\n    entity_token: 'fd771a07-c5c2-42f3-a53c-a6c79c6c0d07',\n    address: { postal_code: '68023' },\n  },\n  naics_code: '541512',\n  website_url: 'https://www.mynewbusiness.com',\n});\n\nconsole.log(accountHolder);"
            },
            {
              "language": "python",
              "code": "import os\nfrom lithic import Lithic\n\nclient = Lithic(\n    api_key=os.environ.get(\"LITHIC_API_KEY\"),  # This is the default and can be omitted\n)\naccount_holder = client.account_holders.update(\n    account_holder_token=\"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e\",\n    business_entity={\n        \"entity_token\": \"83cf25ae-c14f-4d10-9fa2-0119f36c7286\",\n        \"address\": {\n            \"postal_code\": \"61023\"\n        },\n    },\n    control_person={\n        \"entity_token\": \"fd771a07-c5c2-42f3-a53c-a6c79c6c0d07\",\n        \"address\": {\n            \"postal_code\": \"68023\"\n        },\n    },\n    naics_code=\"541512\",\n    website_url=\"https://www.mynewbusiness.com\",\n)\nprint(account_holder)"
            },
            {
              "language": "go",
              "code": "package main\n\nimport (\n\t\"context\"\n\t\"fmt\"\n\n\t\"github.com/lithic-com/lithic-go\"\n\t\"github.com/lithic-com/lithic-go/option\"\n)\n\nfunc main() {\n\tclient := lithic.NewClient(\n\t\toption.WithAPIKey(\"My Lithic API Key\"),\n\t)\n\taccountHolder, err := client.AccountHolders.Update(\n\t\tcontext.TODO(),\n\t\t\"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e\",\n\t\tlithic.AccountHolderUpdateParams{\n\t\t\tBody: lithic.AccountHolderUpdateParamsBodyKYBPatchRequest{},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf(\"%+v\\n\", accountHolder)\n}\n"
            },
            {
              "language": "java",
              "code": "package com.lithic.api.example;\n\nimport com.lithic.api.client.LithicClient;\nimport com.lithic.api.client.okhttp.LithicOkHttpClient;\nimport com.lithic.api.models.AccountHolderUpdateParams;\nimport com.lithic.api.models.AccountHolderUpdateResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        LithicClient client = LithicOkHttpClient.fromEnv();\n\n        AccountHolderUpdateParams params = AccountHolderUpdateParams.builder()\n            .accountHolderToken(\"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e\")\n            .body(AccountHolderUpdateParams.Body.KybPatchRequest.builder().build())\n            .build();\n        AccountHolderUpdateResponse accountHolder = client.accountHolders().update(params);\n    }\n}"
            },
            {
              "language": "kotlin",
              "code": "package com.lithic.api.example\n\nimport com.lithic.api.client.LithicClient\nimport com.lithic.api.client.okhttp.LithicOkHttpClient\nimport com.lithic.api.models.AccountHolderUpdateParams\nimport com.lithic.api.models.AccountHolderUpdateResponse\n\nfun main() {\n    val client: LithicClient = LithicOkHttpClient.fromEnv()\n\n    val params: AccountHolderUpdateParams = AccountHolderUpdateParams.builder()\n        .accountHolderToken(\"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e\")\n        .body(AccountHolderUpdateParams.Body.KybPatchRequest.builder().build())\n        .build()\n    val accountHolder: AccountHolderUpdateResponse = client.accountHolders().update(params)\n}"
            },
            {
              "language": "ruby",
              "code": "require \"lithic\"\n\nlithic = Lithic::Client.new(\n  api_key: \"My Lithic API Key\",\n  environment: \"sandbox\" # defaults to \"production\"\n)\n\naccount_holder = lithic.account_holders.update(\"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e\", body: {})\n\nputs(account_holder)"
            }
          ]
        }
      }
    }
  },
  "components": {
    "parameters": {
      "webhookId": {
        "in": "header",
        "name": "webhook-id",
        "description": "Webhook ID",
        "schema": {
          "type": "string",
          "format": "uuid"
        },
        "example": "65a9dad4-1b60-4686-83fd-65b25078a4b4"
      },
      "webhookTimestamp": {
        "in": "header",
        "name": "webhook-timestamp",
        "description": "Unix timestamp used for HMAC verification",
        "schema": {
          "type": "integer"
        },
        "example": 1698031907
      },
      "webhookSignature": {
        "in": "header",
        "name": "webhook-signature",
        "description": "A list of HMAC signatures encoded in Base64 and separated by spaces. Can contain multiple HMAC signatures as a result of key rotation.",
        "schema": {
          "type": "string"
        },
        "example": "v1,g0hM9SsE+OTPJTGt/tmIKtSyZlE3uFJELVlNIOLJ1OE= v1,bm9ldHUjKzFob2VudXRob2VodWUzMjRvdWVvdW9ldQo="
      },
      "accountHolderToken": {
        "description": "Globally unique identifier for the account holder.",
        "examples": {
          "accountHolderTokenExample": {
            "summary": "A sample account holder token",
            "value": "65db64b2-ae89-491a-97d9-f64788f8b2ab"
          }
        },
        "in": "path",
        "name": "account_holder_token",
        "required": true,
        "schema": {
          "format": "uuid",
          "type": "string"
        }
      }
    },
    "securitySchemes": {
      "ApiKeyAuth": {
        "in": "header",
        "name": "Authorization",
        "type": "apiKey"
      }
    },
    "schemas": {
      "required-document": {
        "title": "Account Holder Required Document",
        "type": "object",
        "properties": {
          "entity_token": {
            "type": "string",
            "format": "uuid",
            "description": "Globally unique identifier for an entity."
          },
          "valid_documents": {
            "type": "array",
            "description": "A list of valid documents that will satisfy the KYC requirements for the specified entity.",
            "items": {
              "type": "string",
              "description": "The name of a required document."
            }
          },
          "status_reasons": {
            "type": "array",
            "description": "Provides the status reasons that will be satisfied by providing one of the valid documents.",
            "items": {
              "type": "string",
              "description": "An account holder's status reason"
            }
          }
        },
        "required": [
          "entity_token",
          "valid_documents",
          "status_reasons"
        ]
      },
      "error": {
        "type": "object",
        "properties": {
          "debugging_request_id": {
            "type": "string",
            "format": "uuid",
            "description": "Identifier to help debug an error."
          },
          "message": {
            "type": "string",
            "description": "Explanation of error response."
          }
        },
        "required": [
          "debugging_request_id",
          "message"
        ]
      },
      "status-reasons": {
        "title": "KYC/KYB Status Reasons",
        "description": "Status Reasons for KYC/KYB enrollment states",
        "type": "string",
        "enum": [
          "ADDRESS_VERIFICATION_FAILURE",
          "AGE_THRESHOLD_FAILURE",
          "COMPLETE_VERIFICATION_FAILURE",
          "DOB_VERIFICATION_FAILURE",
          "ID_VERIFICATION_FAILURE",
          "MAX_DOCUMENT_ATTEMPTS",
          "MAX_RESUBMISSION_ATTEMPTS",
          "NAME_VERIFICATION_FAILURE",
          "OTHER_VERIFICATION_FAILURE",
          "RISK_THRESHOLD_FAILURE",
          "WATCHLIST_ALERT_FAILURE",
          "PRIMARY_BUSINESS_ENTITY_ID_VERIFICATION_FAILURE",
          "PRIMARY_BUSINESS_ENTITY_ADDRESS_VERIFICATION_FAILURE",
          "PRIMARY_BUSINESS_ENTITY_NAME_VERIFICATION_FAILURE",
          "PRIMARY_BUSINESS_ENTITY_BUSINESS_OFFICERS_NOT_MATCHED",
          "PRIMARY_BUSINESS_ENTITY_SOS_FILING_INACTIVE",
          "PRIMARY_BUSINESS_ENTITY_SOS_NOT_MATCHED",
          "PRIMARY_BUSINESS_ENTITY_CMRA_FAILURE",
          "PRIMARY_BUSINESS_ENTITY_WATCHLIST_FAILURE",
          "PRIMARY_BUSINESS_ENTITY_REGISTERED_AGENT_FAILURE",
          "CONTROL_PERSON_BLOCKLIST_ALERT_FAILURE",
          "CONTROL_PERSON_ID_VERIFICATION_FAILURE",
          "CONTROL_PERSON_DOB_VERIFICATION_FAILURE",
          "CONTROL_PERSON_NAME_VERIFICATION_FAILURE"
        ]
      },
      "address-patch": {
        "title": "Address",
        "type": "object",
        "properties": {
          "address1": {
            "description": "Valid deliverable address (no PO boxes).",
            "example": "123 Old Forest Way",
            "type": "string"
          },
          "address2": {
            "description": "Unit or apartment number (if applicable).",
            "type": "string"
          },
          "city": {
            "description": "Name of city.",
            "example": "Omaha",
            "type": "string"
          },
          "country": {
            "description": "Valid country code. Only USA is currently supported, entered in uppercase ISO 3166-1 alpha-3 three-character format.",
            "example": "USA",
            "type": "string"
          },
          "postal_code": {
            "description": "Valid postal code. Only USA ZIP codes are currently supported, entered as a five-digit ZIP or nine-digit ZIP+4.",
            "example": "68022",
            "type": "string"
          },
          "state": {
            "description": "Valid state code. Only USA state codes are currently supported, entered in uppercase ISO 3166-2 two-character format.",
            "example": "NE",
            "type": "string"
          }
        }
      },
      "individual-patch": {
        "title": "Individual",
        "type": "object",
        "properties": {
          "entity_token": {
            "type": "string",
            "format": "uuid",
            "description": "Globally unique identifier for an entity."
          },
          "address": {
            "$ref": "#/components/schemas/address-patch",
            "description": "Individual's current address - PO boxes, UPS drops, and FedEx drops are not acceptable; APO/FPO are acceptable. Only USA addresses are currently supported."
          },
          "dob": {
            "type": "string",
            "example": "1991-03-08 08:00:00",
            "description": "Individual's date of birth, as an RFC 3339 date."
          },
          "email": {
            "type": "string",
            "example": "tom@middle-earth.com",
            "description": "Individual's email address. If utilizing Lithic for chargeback processing, this customer email address may be used to communicate dispute status and resolution."
          },
          "first_name": {
            "type": "string",
            "example": "Tom",
            "description": "Individual's first name, as it appears on government-issued identity documents."
          },
          "last_name": {
            "type": "string",
            "example": "Bombadil",
            "description": "Individual's last name, as it appears on government-issued identity documents."
          },
          "phone_number": {
            "type": "string",
            "example": "+15555555555",
            "description": "Individual's phone number, entered in E.164 format."
          },
          "government_id": {
            "type": "string",
            "example": "111-23-1412",
            "description": "Government-issued identification number (required for identity verification and compliance with banking regulations). Social Security Numbers (SSN) and Individual Taxpayer Identification Numbers (ITIN) are currently supported, entered as full nine-digits, with or without hyphens",
            "writeOnly": true
          }
        }
      },
      "kyb-individual-patch": {
        "title": "KYB Individual",
        "type": "object",
        "description": "Individuals associated with a KYB application. Phone number is optional.",
        "allOf": [
          {
            "$ref": "#/components/schemas/individual-patch"
          },
          {
            "required": [
              "entity_token"
            ]
          }
        ]
      },
      "kyb-business-entity-patch": {
        "title": "KYB Business Entity",
        "type": "object",
        "properties": {
          "entity_token": {
            "type": "string",
            "format": "uuid",
            "description": "Globally unique identifier for an entity."
          },
          "address": {
            "$ref": "#/components/schemas/address-patch",
            "description": "Business''s physical address - PO boxes, UPS drops, and FedEx drops are not acceptable; APO/FPO are acceptable."
          },
          "dba_business_name": {
            "description": "Any name that the business operates under that is not its legal business name (if applicable).",
            "type": "string"
          },
          "government_id": {
            "description": "Government-issued identification number. US Federal Employer Identification Numbers (EIN) are currently supported, entered as full nine-digits, with or without hyphens.",
            "example": "114-123-1513",
            "type": "string"
          },
          "legal_business_name": {
            "description": "Legal (formal) business name.",
            "example": "Acme, Inc.",
            "type": "string"
          },
          "parent_company": {
            "description": "Parent company name (if applicable).",
            "type": "string"
          },
          "phone_numbers": {
            "description": "One or more of the business's phone number(s), entered as a list in E.164 format.",
            "items": {
              "description": "Business phone number, entered in E.164 format.",
              "example": "+15555555555",
              "type": "string"
            },
            "minItems": 1,
            "type": "array"
          }
        },
        "required": [
          "entity_token"
        ]
      },
      "kyb-patch-request": {
        "title": "Business Patch Request",
        "type": "object",
        "description": "The KYB request payload for updating a business.",
        "properties": {
          "beneficial_owner_individuals": {
            "description": "You must submit a list of all direct and indirect individuals with 25% or more ownership in the company. A maximum of 4 beneficial owners can be submitted. If no individual owns 25% of the company you do not need to send beneficial owner information. See [FinCEN requirements](https://www.fincen.gov/sites/default/files/shared/CDD_Rev6.7_Sept_2017_Certificate.pdf) (Section I) for more background on individuals that should be included.",
            "items": {
              "$ref": "#/components/schemas/kyb-individual-patch"
            },
            "minItems": 0,
            "type": "array"
          },
          "business_entity": {
            "description": "Information for business for which the account is being opened and KYB is being run.",
            "$ref": "#/components/schemas/kyb-business-entity-patch"
          },
          "control_person": {
            "description": "An individual with significant responsibility for managing the legal entity (e.g., a Chief Executive Officer, Chief Financial Officer, Chief Operating Officer, Managing Member, General Partner, President, Vice President, or Treasurer). This can be an executive, or someone who will have program-wide access to the cards that Lithic will provide. In some cases, this individual could also be a beneficial owner listed above. See [FinCEN requirements](https://www.fincen.gov/sites/default/files/shared/CDD_Rev6.7_Sept_2017_Certificate.pdf) (Section II) for more background.",
            "$ref": "#/components/schemas/kyb-individual-patch"
          },
          "external_id": {
            "description": "A user provided id that can be used to link an account holder with an external system",
            "type": "string"
          },
          "naics_code": {
            "description": "6-digit North American Industry Classification System (NAICS) code for the business.",
            "example": "541512",
            "type": "string"
          },
          "nature_of_business": {
            "description": "Short description of the company's line of business (i.e., what does the company do?).",
            "example": "Software company selling solutions to the restaurant industry",
            "type": "string"
          },
          "website_url": {
            "description": "Company website URL.",
            "example": "www.mybusiness.com",
            "type": "string"
          }
        }
      },
      "kyc-individual-patch": {
        "title": "Individuals associated with a KYC application.",
        "type": "object",
        "allOf": [
          {
            "$ref": "#/components/schemas/individual-patch"
          },
          {
            "required": [
              "entity_token"
            ]
          }
        ]
      },
      "kyc-patch-request": {
        "title": "Individual Patch Request",
        "type": "object",
        "description": "The KYC request payload for updating an account holder.",
        "properties": {
          "individual": {
            "$ref": "#/components/schemas/kyc-individual-patch",
            "description": "Information on the individual for whom the account is being opened and KYC is being run."
          },
          "external_id": {
            "description": "A user provided id that can be used to link an account holder with an external system",
            "type": "string"
          }
        }
      },
      "patch-request": {
        "title": "Legacy Patch Request",
        "type": "object",
        "description": "The legacy request for updating an account holder.",
        "properties": {
          "email": {
            "description": "Allowed for all Account Holders. Account holder's email address. The primary purpose of this field is for cardholder identification and verification during the digital wallet tokenization process.",
            "type": "string"
          },
          "phone_number": {
            "description": "Allowed for all Account Holders. Account holder's phone number, entered in E.164 format. The primary purpose of this field is for cardholder identification and verification during the digital wallet tokenization process.",
            "type": "string"
          },
          "address": {
            "description": "Allowed for: KYC-Exempt, BYO-KYC, BYO-KYB.",
            "$ref": "#/components/schemas/address-patch"
          },
          "business_account_token": {
            "description": "Allowed for: KYC-Exempt, BYO-KYC. The token of the business account to which the account holder is associated.",
            "type": "string"
          },
          "first_name": {
            "description": "Allowed for KYC-Exempt, BYO-KYC. Account holder's first name.",
            "type": "string"
          },
          "last_name": {
            "description": "Allowed for KYC-Exempt, BYO-KYC. Account holder's last name.",
            "type": "string"
          },
          "legal_business_name": {
            "description": "Allowed for BYO-KYB. Legal business name of the account holder.",
            "type": "string"
          }
        }
      },
      "status": {
        "title": "KYC/KYB Status",
        "description": "Enrollment status for KYC/KYB",
        "type": "string",
        "enum": [
          "ACCEPTED",
          "PENDING_DOCUMENT",
          "PENDING_RESUBMIT",
          "REJECTED"
        ]
      },
      "verification-application": {
        "title": "Verification Application",
        "type": "object",
        "description": "Represents the status of an identity verification application for an account holder",
        "properties": {
          "created": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp of when the application was created."
          },
          "status": {
            "description": "KYC and KYB evaluation states.\n\nNote: `PENDING_RESUBMIT` and `PENDING_DOCUMENT` are only applicable for the `ADVANCED` workflow.",
            "$ref": "#/components/schemas/status"
          },
          "status_reasons": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/status-reasons"
            },
            "description": "Reason for the evaluation status."
          },
          "updated": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp of when the application was last updated."
          },
          "ky_passed_at": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp of when the application passed the verification process. Only present if `status` is `ACCEPTED`"
          }
        },
        "required": [
          "created",
          "status",
          "status_reasons",
          "updated"
        ]
      },
      "address": {
        "title": "Address",
        "type": "object",
        "properties": {
          "address1": {
            "description": "Valid deliverable address (no PO boxes).",
            "example": "123 Old Forest Way",
            "type": "string"
          },
          "address2": {
            "description": "Unit or apartment number (if applicable).",
            "type": "string"
          },
          "city": {
            "description": "Name of city.",
            "example": "Omaha",
            "type": "string"
          },
          "country": {
            "description": "Valid country code. Only USA is currently supported, entered in uppercase ISO 3166-1 alpha-3 three-character format.",
            "example": "USA",
            "type": "string"
          },
          "postal_code": {
            "description": "Valid postal code. Only USA ZIP codes are currently supported, entered as a five-digit ZIP or nine-digit ZIP+4.",
            "example": "68022",
            "type": "string"
          },
          "state": {
            "description": "Valid state code. Only USA state codes are currently supported, entered in uppercase ISO 3166-2 two-character format.",
            "example": "NE",
            "type": "string"
          }
        },
        "required": [
          "address1",
          "city",
          "country",
          "postal_code",
          "state"
        ]
      },
      "individual": {
        "title": "Individual",
        "type": "object",
        "properties": {
          "address": {
            "$ref": "#/components/schemas/address",
            "description": "Individual's current address - PO boxes, UPS drops, and FedEx drops are not acceptable; APO/FPO are acceptable. Only USA addresses are currently supported."
          },
          "dob": {
            "type": "string",
            "example": "1991-03-08 08:00:00",
            "description": "Individual's date of birth, as an RFC 3339 date."
          },
          "email": {
            "type": "string",
            "example": "tom@middle-earth.com",
            "description": "Individual's email address. If utilizing Lithic for chargeback processing, this customer email address may be used to communicate dispute status and resolution."
          },
          "first_name": {
            "type": "string",
            "example": "Tom",
            "description": "Individual's first name, as it appears on government-issued identity documents."
          },
          "last_name": {
            "type": "string",
            "example": "Bombadil",
            "description": "Individual's last name, as it appears on government-issued identity documents."
          },
          "phone_number": {
            "type": "string",
            "example": "+15555555555",
            "description": "Individual's phone number, entered in E.164 format."
          },
          "government_id": {
            "type": "string",
            "example": "111-23-1412",
            "description": "Government-issued identification number (required for identity verification and compliance with banking regulations). Social Security Numbers (SSN) and Individual Taxpayer Identification Numbers (ITIN) are currently supported, entered as full nine-digits, with or without hyphens",
            "writeOnly": true
          }
        }
      },
      "kyb-business-entity": {
        "title": "KYB Business Entity",
        "type": "object",
        "properties": {
          "address": {
            "$ref": "#/components/schemas/address",
            "description": "Business''s physical address - PO boxes, UPS drops, and FedEx drops are not acceptable; APO/FPO are acceptable."
          },
          "dba_business_name": {
            "description": "Any name that the business operates under that is not its legal business name (if applicable).",
            "type": "string"
          },
          "government_id": {
            "description": "Government-issued identification number. US Federal Employer Identification Numbers (EIN) are currently supported, entered as full nine-digits, with or without hyphens.",
            "example": "114-123-1513",
            "type": "string"
          },
          "legal_business_name": {
            "description": "Legal (formal) business name.",
            "example": "Acme, Inc.",
            "type": "string"
          },
          "parent_company": {
            "description": "Parent company name (if applicable).",
            "type": "string"
          },
          "phone_numbers": {
            "description": "One or more of the business's phone number(s), entered as a list in E.164 format.",
            "items": {
              "description": "Business phone number, entered in E.164 format.",
              "example": "+15555555555",
              "type": "string"
            },
            "minItems": 1,
            "type": "array"
          }
        },
        "required": [
          "address",
          "government_id",
          "legal_business_name",
          "phone_numbers"
        ]
      },
      "kyb-kyc-patch-response": {
        "title": "Business/Individual Patch Response",
        "type": "object",
        "properties": {
          "token": {
            "description": "Globally unique identifier for the account holder.",
            "type": "string",
            "format": "uuid"
          },
          "account_token": {
            "description": "Globally unique identifier for the account.",
            "type": "string",
            "format": "uuid"
          },
          "business_account_token": {
            "description": "Only applicable for customers using the KYC-Exempt workflow to enroll authorized users of businesses. Pass the account_token of the enrolled business associated with the AUTHORIZED_USER in this field.",
            "type": [
              "string",
              "null"
            ],
            "format": "uuid"
          },
          "created": {
            "description": "Timestamp of when the account holder was created.",
            "type": "string",
            "format": "date-time"
          },
          "exemption_type": {
            "description": "The type of KYC exemption for a KYC-Exempt Account Holder. \"None\" if the account holder is not KYC-Exempt.",
            "type": "string",
            "enum": [
              "AUTHORIZED_USER",
              "PREPAID_CARD_USER"
            ]
          },
          "external_id": {
            "description": "Customer-provided token that indicates a relationship with an object outside of the Lithic ecosystem.",
            "type": "string"
          },
          "user_type": {
            "description": "The type of Account Holder. If the type is \"INDIVIDUAL\", the \"individual\" attribute will be present.\n\nIf the type is \"BUSINESS\" then the \"business_entity\", \"control_person\", \"beneficial_owner_individuals\",\n\"naics_code\", \"nature_of_business\", and \"website_url\" attributes will be present.",
            "type": "string",
            "enum": [
              "BUSINESS",
              "INDIVIDUAL"
            ]
          },
          "verification_application": {
            "$ref": "#/components/schemas/verification-application",
            "description": "Information about the most recent identity verification attempt"
          },
          "individual": {
            "$ref": "#/components/schemas/individual",
            "description": "Only present when user_type == \"INDIVIDUAL\". Information about the individual for which the account is being opened and KYC is being run."
          },
          "business_entity": {
            "$ref": "#/components/schemas/kyb-business-entity",
            "description": "Only present when user_type == \"BUSINESS\". Information about the business for which the account is being opened and KYB is being run."
          },
          "beneficial_owner_individuals": {
            "description": "Only present when user_type == \"BUSINESS\". You must submit a list of all direct and indirect individuals with 25% or more ownership in the company. A maximum of 4 beneficial owners can be submitted. If no individual owns 25% of the company you do not need to send beneficial owner information. See [FinCEN requirements](https://www.fincen.gov/sites/default/files/shared/CDD_Rev6.7_Sept_2017_Certificate.pdf) (Section I) for more background on individuals that should be included.",
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/individual"
            },
            "minItems": 0
          },
          "control_person": {
            "$ref": "#/components/schemas/individual",
            "description": "Only present when user_type == \"BUSINESS\".\n\nAn individual with significant responsibility for managing the legal entity (e.g., a Chief Executive Officer, Chief Financial Officer, Chief Operating Officer,\n\nManaging Member, General Partner, President, Vice President, or Treasurer). This can be an executive, or someone who will have program-wide access\n\nto the cards that Lithic will provide. In some cases, this individual could also be a beneficial owner listed above."
          },
          "naics_code": {
            "description": "Only present when user_type == \"BUSINESS\". 6-digit North American Industry Classification System (NAICS) code for the business.",
            "type": "string"
          },
          "nature_of_business": {
            "description": "Only present when user_type == \"BUSINESS\". User-submitted description of the business.",
            "type": "string"
          },
          "website_url": {
            "description": "Only present when user_type == \"BUSINESS\". Business's primary website.",
            "type": "string"
          },
          "email": {
            "description": "(Deprecated. Use control_person.email when user_type == \"BUSINESS\".\nUse individual.phone_number when user_type == \"INDIVIDUAL\".)\nPrimary email of Account Holder.\n",
            "type": "string"
          },
          "phone_number": {
            "description": "(Deprecated. Use control_person.phone_number when user_type == \"BUSINESS\".\nUse individual.phone_number when user_type == \"INDIVIDUAL\".)\nPrimary phone of Account Holder, entered in E.164 format.\n",
            "type": "string"
          },
          "status": {
            "description": "(Deprecated. Use verification_application.status instead)\nKYC and KYB evaluation states.\n\nNote: `PENDING_RESUBMIT` and `PENDING_DOCUMENT` are only applicable for the `ADVANCED` workflow.\n\n",
            "$ref": "#/components/schemas/status"
          },
          "status_reasons": {
            "description": "(Deprecated. Use verification_application.status_reasons)\n Reason for the evaluation status.",
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/status-reasons"
            }
          },
          "required_documents": {
            "description": "Only present for \"KYB_BASIC\" and \"KYC_ADVANCED\" workflows. A list of documents required for the account holder to be approved.",
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/required-document"
            }
          }
        }
      },
      "patch-response": {
        "title": "Legacy Patch Response",
        "type": "object",
        "properties": {
          "token": {
            "description": "The token for the account holder that was updated",
            "type": "string"
          },
          "email": {
            "description": "The email for the account holder",
            "type": "string"
          },
          "phone_number": {
            "description": "The phone_number for the account holder",
            "type": "string"
          },
          "business_account_token": {
            "description": "The token for the business account that the account holder is associated with",
            "type": [
              "string",
              "null"
            ]
          },
          "address": {
            "description": "The address for the account holder",
            "$ref": "#/components/schemas/address"
          },
          "first_name": {
            "description": "The first name for the account holder",
            "type": "string"
          },
          "last_name": {
            "description": "The last name for the account holder",
            "type": "string"
          },
          "legal_business_name": {
            "description": "The legal business name for the account holder",
            "type": "string"
          }
        }
      },
      "document-type": {
        "title": "Account Holder document types",
        "description": "Type of documentation to be submitted for verification of an account holder",
        "type": "string",
        "enum": [
          "DRIVERS_LICENSE",
          "PASSPORT",
          "PASSPORT_CARD",
          "EIN_LETTER",
          "TAX_RETURN",
          "OPERATING_AGREEMENT",
          "CERTIFICATE_OF_FORMATION",
          "CERTIFICATE_OF_GOOD_STANDING",
          "ARTICLES_OF_INCORPORATION",
          "ARTICLES_OF_ORGANIZATION",
          "BYLAWS",
          "GOVERNMENT_BUSINESS_LICENSE",
          "PARTNERSHIP_AGREEMENT",
          "SS4_FORM",
          "BANK_STATEMENT",
          "UTILITY_BILL_STATEMENT",
          "SSN_CARD",
          "ITIN_LETTER",
          "FINCEN_BOI_REPORT"
        ]
      },
      "document-upload-status": {
        "title": "Account holder document upload status",
        "description": "Status of an account holder's document upload.",
        "type": "string",
        "enum": [
          "ACCEPTED",
          "REJECTED",
          "PENDING_UPLOAD",
          "UPLOADED",
          "PARTIAL_APPROVAL"
        ]
      },
      "auth-rule-token": {
        "title": "Auth Rule Token",
        "description": "Auth Rule Token",
        "type": "string",
        "format": "uuid"
      },
      "auth-rule-version": {
        "title": "Auth Rule Version",
        "type": "integer",
        "description": "The version of the rule, this is incremented whenever the rule's parameters change.",
        "readOnly": true
      },
      "detailed_result": {
        "example": "APPROVED",
        "title": "Detailed Result",
        "type": "string",
        "enum": [
          "ACCOUNT_DAILY_SPEND_LIMIT_EXCEEDED",
          "ACCOUNT_DELINQUENT",
          "ACCOUNT_INACTIVE",
          "ACCOUNT_LIFETIME_SPEND_LIMIT_EXCEEDED",
          "ACCOUNT_MONTHLY_SPEND_LIMIT_EXCEEDED",
          "ACCOUNT_PAUSED",
          "ACCOUNT_UNDER_REVIEW",
          "ADDRESS_INCORRECT",
          "APPROVED",
          "AUTH_RULE_ALLOWED_COUNTRY",
          "AUTH_RULE_ALLOWED_MCC",
          "AUTH_RULE_BLOCKED_COUNTRY",
          "AUTH_RULE_BLOCKED_MCC",
          "AUTH_RULE",
          "CARD_CLOSED",
          "CARD_CRYPTOGRAM_VALIDATION_FAILURE",
          "CARD_EXPIRED",
          "CARD_EXPIRY_DATE_INCORRECT",
          "CARD_INVALID",
          "CARD_NOT_ACTIVATED",
          "CARD_PAUSED",
          "CARD_PIN_INCORRECT",
          "CARD_RESTRICTED",
          "CARD_SECURITY_CODE_INCORRECT",
          "CARD_SPEND_LIMIT_EXCEEDED",
          "CONTACT_CARD_ISSUER",
          "CUSTOMER_ASA_TIMEOUT",
          "CUSTOM_ASA_RESULT",
          "DECLINED",
          "DO_NOT_HONOR",
          "DRIVER_NUMBER_INVALID",
          "FORMAT_ERROR",
          "INSUFFICIENT_FUNDING_SOURCE_BALANCE",
          "INSUFFICIENT_FUNDS",
          "LITHIC_SYSTEM_ERROR",
          "LITHIC_SYSTEM_RATE_LIMIT",
          "MALFORMED_ASA_RESPONSE",
          "MERCHANT_INVALID",
          "MERCHANT_LOCKED_CARD_ATTEMPTED_ELSEWHERE",
          "MERCHANT_NOT_PERMITTED",
          "OVER_REVERSAL_ATTEMPTED",
          "PIN_BLOCKED",
          "PROGRAM_CARD_SPEND_LIMIT_EXCEEDED",
          "PROGRAM_SUSPENDED",
          "PROGRAM_USAGE_RESTRICTION",
          "REVERSAL_UNMATCHED",
          "SECURITY_VIOLATION",
          "SINGLE_USE_CARD_REATTEMPTED",
          "SUSPECTED_FRAUD",
          "TRANSACTION_INVALID",
          "TRANSACTION_NOT_PERMITTED_TO_ACQUIRER_OR_TERMINAL",
          "TRANSACTION_NOT_PERMITTED_TO_ISSUER_OR_CARDHOLDER",
          "TRANSACTION_PREVIOUSLY_COMPLETED",
          "UNAUTHORIZED_MERCHANT",
          "VEHICLE_NUMBER_INVALID",
          "CARDHOLDER_CHALLENGED",
          "CARDHOLDER_CHALLENGE_FAILED"
        ]
      },
      "backtest-token": {
        "title": "Auth Rule Backtest Token",
        "description": "Auth Rule Backtest Token",
        "type": "string",
        "format": "uuid"
      },
      "backtest-stats": {
        "title": "Auth Rule Backtest Statistics",
        "type": "object",
        "properties": {
          "version": {
            "$ref": "#/components/schemas/auth-rule-version"
          },
          "approved": {
            "type": "integer",
            "description": "The total number of historical transactions approved by this rule during the backtest period, or the number of transactions that would have been approved if the rule was evaluated in shadow mode."
          },
          "declined": {
            "type": "integer",
            "description": "The total number of historical transactions declined by this rule during the backtest period, or the number of transactions that would have been declined if the rule was evaluated in shadow mode."
          },
          "challenged": {
            "type": "integer",
            "description": "The total number of historical transactions challenged by this rule during the backtest period, or the number of transactions that would have been challenged if the rule was evaluated in shadow mode. Currently applicable only for 3DS Auth Rules."
          },
          "examples": {
            "type": "array",
            "description": "Example events and their outcomes.",
            "items": {
              "type": "object",
              "properties": {
                "event_token": {
                  "type": "string",
                  "format": "uuid",
                  "description": "The event token."
                },
                "timestamp": {
                  "type": "string",
                  "format": "date-time",
                  "description": "The timestamp of the event."
                },
                "decision": {
                  "type": "string",
                  "enum": [
                    "APPROVED",
                    "DECLINED",
                    "CHALLENGED"
                  ],
                  "description": "The decision made by the rule for this event."
                }
              }
            }
          }
        }
      },
      "backtest-results": {
        "title": "Auth Rules Backtest Results",
        "type": "object",
        "properties": {
          "backtest_token": {
            "$ref": "#/components/schemas/backtest-token"
          },
          "simulation_parameters": {
            "type": "object",
            "properties": {
              "auth_rule_token": {
                "$ref": "#/components/schemas/auth-rule-token"
              },
              "start": {
                "type": "string",
                "format": "date-time",
                "description": "The start time of the simulation."
              },
              "end": {
                "type": "string",
                "format": "date-time",
                "description": "The end time of the simulation."
              }
            }
          },
          "results": {
            "type": "object",
            "properties": {
              "current_version": {
                "anyOf": [
                  {
                    "type": "null",
                    "description": "No results available for the current version."
                  },
                  {
                    "$ref": "#/components/schemas/backtest-stats"
                  }
                ]
              },
              "draft_version": {
                "anyOf": [
                  {
                    "type": "null",
                    "description": "No results available for the draft version."
                  },
                  {
                    "$ref": "#/components/schemas/backtest-stats"
                  }
                ]
              }
            }
          }
        },
        "required": [
          "backtest_token",
          "simulation_parameters",
          "results"
        ]
      },
      "financial-account-balance": {
        "title": "Financial Account Balance",
        "description": "Balance of a Financial Account",
        "properties": {
          "available_amount": {
            "description": "Funds available for spend in the currency's smallest unit (e.g., cents for USD)",
            "type": "integer"
          },
          "created": {
            "description": "Date and time for when the balance was first created.",
            "format": "date-time",
            "type": "string"
          },
          "currency": {
            "description": "3-character alphabetic ISO 4217 code for the local currency of the balance.",
            "type": "string"
          },
          "token": {
            "description": "Globally unique identifier for the financial account that holds this balance.",
            "example": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "format": "uuid",
            "type": "string"
          },
          "type": {
            "description": "Type of financial account.",
            "enum": [
              "ISSUING",
              "OPERATING",
              "RESERVE",
              "SECURITY"
            ],
            "type": "string"
          },
          "last_transaction_event_token": {
            "description": "Globally unique identifier for the last financial transaction event that impacted this balance.",
            "format": "uuid",
            "type": "string"
          },
          "last_transaction_token": {
            "description": "Globally unique identifier for the last financial transaction that impacted this balance.",
            "format": "uuid",
            "type": "string"
          },
          "pending_amount": {
            "description": "Funds not available for spend due to card authorizations or pending ACH release. Shown in the currency's smallest unit (e.g., cents for USD).",
            "type": "integer"
          },
          "total_amount": {
            "description": "The sum of available and pending balance in the currency's smallest unit (e.g., cents for USD).",
            "type": "integer"
          },
          "updated": {
            "description": "Date and time for when the balance was last updated.",
            "format": "date-time",
            "type": "string"
          }
        },
        "required": [
          "available_amount",
          "created",
          "currency",
          "token",
          "type",
          "last_transaction_event_token",
          "last_transaction_token",
          "pending_amount",
          "total_amount",
          "updated"
        ],
        "type": "object"
      },
      "dispute-v1": {
        "title": "Dispute",
        "description": "Dispute.",
        "properties": {
          "amount": {
            "description": "Amount under dispute. May be different from the original transaction amount.",
            "type": "integer"
          },
          "arbitration_date": {
            "description": "Date dispute entered arbitration.",
            "format": "date-time",
            "type": [
              "string",
              "null"
            ]
          },
          "created": {
            "description": "Timestamp of when first Dispute was reported.",
            "format": "date-time",
            "type": "string"
          },
          "customer_filed_date": {
            "description": "Date that the dispute was filed by the customer making the dispute.",
            "format": "date-time",
            "type": [
              "string",
              "null"
            ]
          },
          "customer_note": {
            "description": "End customer description of the reason for the dispute.",
            "maxLength": 10000,
            "type": [
              "string",
              "null"
            ]
          },
          "network_claim_ids": {
            "description": "Unique identifiers for the dispute from the network.",
            "oneOf": [
              {
                "type": "array",
                "items": {
                  "type": "string"
                }
              },
              {
                "type": "null"
              }
            ]
          },
          "network_filed_date": {
            "description": "Date that the dispute was submitted to the network.",
            "format": "date-time",
            "type": [
              "string",
              "null"
            ]
          },
          "network_reason_code": {
            "description": "Network reason code used to file the dispute.",
            "type": [
              "string",
              "null"
            ]
          },
          "prearbitration_date": {
            "description": "Date dispute entered pre-arbitration.",
            "format": "date-time",
            "type": [
              "string",
              "null"
            ]
          },
          "primary_claim_id": {
            "description": "Unique identifier for the dispute from the network. If there are multiple, this will be the first claim id set by the network",
            "type": [
              "string",
              "null"
            ]
          },
          "reason": {
            "description": "Dispute reason:\n* `ATM_CASH_MISDISPENSE`: ATM cash misdispense.\n* `CANCELLED`: Transaction was cancelled by the customer.\n* `DUPLICATED`: The transaction was a duplicate.\n* `FRAUD_CARD_NOT_PRESENT`: Fraudulent transaction, card not present.\n* `FRAUD_CARD_PRESENT`: Fraudulent transaction, card present.\n* `FRAUD_OTHER`: Fraudulent transaction, other types such as questionable merchant activity.\n* `GOODS_SERVICES_NOT_AS_DESCRIBED`: The goods or services were not as described.\n* `GOODS_SERVICES_NOT_RECEIVED`: The goods or services were not received.\n* `INCORRECT_AMOUNT`: The transaction amount was incorrect.\n* `MISSING_AUTH`: The transaction was missing authorization.\n* `OTHER`: Other reason.\n* `PROCESSING_ERROR`: Processing error.\n* `REFUND_NOT_PROCESSED`: The refund was not processed.\n* `RECURRING_TRANSACTION_NOT_CANCELLED`: The recurring transaction was not cancelled.\n",
            "enum": [
              "ATM_CASH_MISDISPENSE",
              "CANCELLED",
              "DUPLICATED",
              "FRAUD_CARD_NOT_PRESENT",
              "FRAUD_CARD_PRESENT",
              "FRAUD_OTHER",
              "GOODS_SERVICES_NOT_AS_DESCRIBED",
              "GOODS_SERVICES_NOT_RECEIVED",
              "INCORRECT_AMOUNT",
              "MISSING_AUTH",
              "OTHER",
              "PROCESSING_ERROR",
              "RECURRING_TRANSACTION_NOT_CANCELLED",
              "REFUND_NOT_PROCESSED"
            ],
            "type": "string"
          },
          "representment_date": {
            "description": "Date the representment was received.",
            "format": "date-time",
            "type": [
              "string",
              "null"
            ]
          },
          "resolution_date": {
            "description": "Date that the dispute was resolved.",
            "format": "date-time",
            "type": [
              "string",
              "null"
            ]
          },
          "resolution_note": {
            "description": "Note by Dispute team on the case resolution.",
            "maxLength": 10000,
            "type": [
              "string",
              "null"
            ]
          },
          "resolution_reason": {
            "description": "Reason for the dispute resolution:\n* `CASE_LOST`: This case was lost at final arbitration.\n* `NETWORK_REJECTED`: Network rejected.\n* `NO_DISPUTE_RIGHTS_3DS`: No dispute rights, 3DS.\n* `NO_DISPUTE_RIGHTS_BELOW_THRESHOLD`: No dispute rights, below threshold.\n* `NO_DISPUTE_RIGHTS_CONTACTLESS`: No dispute rights, contactless.\n* `NO_DISPUTE_RIGHTS_HYBRID`: No dispute rights, hybrid.\n* `NO_DISPUTE_RIGHTS_MAX_CHARGEBACKS`: No dispute rights, max chargebacks.\n* `NO_DISPUTE_RIGHTS_OTHER`: No dispute rights, other.\n* `PAST_FILING_DATE`: Past filing date.\n* `PREARBITRATION_REJECTED`: Prearbitration rejected.\n* `PROCESSOR_REJECTED_OTHER`: Processor rejected, other.\n* `REFUNDED`: Refunded.\n* `REFUNDED_AFTER_CHARGEBACK`: Refunded after chargeback.\n* `WITHDRAWN`: Withdrawn.\n* `WON_ARBITRATION`: Won arbitration.\n* `WON_FIRST_CHARGEBACK`: Won first chargeback.\n* `WON_PREARBITRATION`: Won prearbitration.\n",
            "enum": [
              "CASE_LOST",
              "NETWORK_REJECTED",
              "NO_DISPUTE_RIGHTS_3DS",
              "NO_DISPUTE_RIGHTS_BELOW_THRESHOLD",
              "NO_DISPUTE_RIGHTS_CONTACTLESS",
              "NO_DISPUTE_RIGHTS_HYBRID",
              "NO_DISPUTE_RIGHTS_MAX_CHARGEBACKS",
              "NO_DISPUTE_RIGHTS_OTHER",
              "PAST_FILING_DATE",
              "PREARBITRATION_REJECTED",
              "PROCESSOR_REJECTED_OTHER",
              "REFUNDED",
              "REFUNDED_AFTER_CHARGEBACK",
              "WITHDRAWN",
              "WON_ARBITRATION",
              "WON_FIRST_CHARGEBACK",
              "WON_PREARBITRATION",
              null
            ],
            "type": [
              "string",
              "null"
            ]
          },
          "status": {
            "description": "Status types:\n* `NEW` - New dispute case is opened.\n* `PENDING_CUSTOMER` - Lithic is waiting for customer to provide more information.\n* `SUBMITTED` - Dispute is submitted to the card network.\n* `REPRESENTMENT` - Case has entered second presentment.\n* `PREARBITRATION` - Case has entered prearbitration.\n* `ARBITRATION` - Case has entered arbitration.\n* `CASE_WON` - Case was won and credit will be issued.\n* `CASE_CLOSED` - Case was lost or withdrawn.\n",
            "enum": [
              "ARBITRATION",
              "CASE_CLOSED",
              "CASE_WON",
              "NEW",
              "PENDING_CUSTOMER",
              "PREARBITRATION",
              "REPRESENTMENT",
              "SUBMITTED"
            ],
            "type": "string"
          },
          "token": {
            "description": "Globally unique identifier.",
            "format": "uuid",
            "type": "string"
          },
          "transaction_token": {
            "description": "The transaction that is being disputed. A transaction can only be disputed once but may have multiple dispute cases.",
            "format": "uuid",
            "type": "string"
          }
        },
        "required": [
          "amount",
          "arbitration_date",
          "created",
          "customer_filed_date",
          "customer_note",
          "network_claim_ids",
          "network_filed_date",
          "network_reason_code",
          "prearbitration_date",
          "primary_claim_id",
          "reason",
          "representment_date",
          "resolution_date",
          "resolution_note",
          "resolution_reason",
          "status",
          "token",
          "transaction_token"
        ],
        "type": "object"
      },
      "dispute-evidence": {
        "title": "Dispute Evidence",
        "description": "Dispute evidence.",
        "properties": {
          "created": {
            "description": "Timestamp of when dispute evidence was created.",
            "format": "date-time",
            "type": "string"
          },
          "dispute_token": {
            "description": "Dispute token evidence is attached to.",
            "format": "uuid",
            "type": "string"
          },
          "download_url": {
            "description": "URL to download evidence. Only shown when `upload_status` is `UPLOADED`.",
            "type": "string"
          },
          "filename": {
            "description": "File name of evidence. Recommended to give the dispute evidence a human-readable identifier.",
            "type": "string"
          },
          "token": {
            "description": "Globally unique identifier.",
            "format": "uuid",
            "type": "string"
          },
          "upload_status": {
            "description": "Upload status types:\n* `DELETED` - Evidence was deleted.\n* `ERROR` - Evidence upload failed.\n* `PENDING` - Evidence is pending upload.\n* `REJECTED` - Evidence was rejected.\n* `UPLOADED` - Evidence was uploaded.\n",
            "enum": [
              "DELETED",
              "ERROR",
              "PENDING",
              "REJECTED",
              "UPLOADED"
            ],
            "type": "string"
          },
          "upload_url": {
            "description": "URL to upload evidence. Only shown when `upload_status` is `PENDING`.",
            "type": "string"
          }
        },
        "required": [
          "created",
          "dispute_token",
          "token",
          "upload_status"
        ],
        "type": "object"
      },
      "tax-exempt-indicator": {
        "title": "TaxExemptIndicator",
        "description": "A flag indicating whether the transaction is tax exempt or not.",
        "type": [
          "string",
          "null"
        ],
        "enum": [
          "TAX_INCLUDED",
          "TAX_NOT_INCLUDED",
          "NOT_SUPPORTED",
          null
        ]
      },
      "tax-data": {
        "title": "TaxData",
        "type": "object",
        "properties": {
          "amount": {
            "title": "Amount",
            "description": "The amount of tax collected.",
            "type": [
              "integer",
              "null"
            ]
          },
          "exempt": {
            "title": "Exempt",
            "$ref": "#/components/schemas/tax-exempt-indicator"
          },
          "merchant_tax_id": {
            "title": "Merchant Tax ID",
            "description": "The tax ID of the merchant.",
            "type": [
              "string",
              "null"
            ]
          }
        }
      },
      "line-item": {
        "title": "LineItem",
        "description": "An L2/L3 enhanced commercial data line item.",
        "type": "object",
        "properties": {
          "product_code": {
            "title": "Product Code",
            "description": "An identifier for the item purchased.",
            "type": [
              "string",
              "null"
            ]
          },
          "description": {
            "title": "Description",
            "description": "A human-readable description of the item.",
            "type": [
              "string",
              "null"
            ]
          },
          "quantity": {
            "title": "Quantity",
            "description": "The quantity of the item purchased.",
            "type": [
              "string",
              "null"
            ]
          },
          "amount": {
            "title": "Amount",
            "description": "The price of the item purchased in merchant currency.",
            "type": [
              "string",
              "null"
            ]
          }
        }
      },
      "common-data": {
        "title": "CommonData",
        "required": [
          "tax",
          "line_items"
        ],
        "type": "object",
        "properties": {
          "customer_reference_number": {
            "title": "Customer Reference Number",
            "description": "A customer identifier.",
            "type": [
              "string",
              "null"
            ]
          },
          "merchant_reference_number": {
            "title": "Merchant Reference Number",
            "description": "A merchant identifier.",
            "type": [
              "string",
              "null"
            ]
          },
          "order_date": {
            "title": "Order Date",
            "description": "The date of the order.",
            "type": [
              "string",
              "null"
            ],
            "format": "date"
          },
          "tax": {
            "$ref": "#/components/schemas/tax-data"
          },
          "line_items": {
            "title": "Line Items",
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/line-item"
            }
          }
        }
      },
      "service-type": {
        "title": "FuelServiceType",
        "description": "The type of fuel service procured in a fleet transaction.",
        "enum": [
          "UNKNOWN",
          "UNDEFINED",
          "SELF_SERVICE",
          "FULL_SERVICE",
          "NON_FUEL_ONLY"
        ]
      },
      "fuel-type": {
        "title": "FuelType",
        "description": "The type of fuel purchased.",
        "type": [
          "string",
          "null"
        ],
        "enum": [
          "UNKNOWN",
          "REGULAR",
          "MID_PLUS",
          "PREMIUM_SUPER",
          "MID_PLUS_2",
          "PREMIUM_SUPER_2",
          "ETHANOL_5_7_BLEND",
          "MID_PLUS_ETHANOL_5_7_PERCENT_BLEND",
          "PREMIUM_SUPER_ETHANOL_5_7_PERCENT_BLEND",
          "ETHANOL_7_7_PERCENT_BLEND",
          "MID_PLUS_ETHANOL_7_7_PERCENT_BLEND",
          "GREEN_GASOLINE_REGULAR",
          "GREEN_GASOLINE_MID_PLUS",
          "GREEN_GASOLINE_PREMIUM_SUPER",
          "REGULAR_DIESEL_2",
          "PREMIUM_DIESEL_2",
          "REGULAR_DIESEL_1",
          "COMPRESSED_NATURAL_GAS",
          "LIQUID_PROPANE_GAS",
          "LIQUID_NATURAL_GAS",
          "E_85",
          "REFORMULATED_1",
          "REFORMULATED_2",
          "REFORMULATED_3",
          "REFORMULATED_4",
          "REFORMULATED_5",
          "DIESEL_OFF_ROAD_1_AND_2_NON_TAXABLE",
          "DIESEL_OFF_ROAD_NON_TAXABLE",
          "BIODIESEL_BLEND_OFF_ROAD_NON_TAXABLE",
          "UNDEFINED_FUEL",
          "RACING_FUEL",
          "MID_PLUS_2_10_PERCENT_BLEND",
          "PREMIUM_SUPER_2_10_PERCENT_BLEND",
          "MID_PLUS_ETHANOL_2_15_PERCENT_BLEND",
          "PREMIUM_SUPER_ETHANOL_2_15_PERCENT_BLEND",
          "PREMIUM_SUPER_ETHANOL_7_7_PERCENT_BLEND",
          "REGULAR_ETHANOL_10_PERCENT_BLEND",
          "MID_PLUS_ETHANOL_10_PERCENT_BLEND",
          "PREMIUM_SUPER_ETHANOL_10_PERCENT_BLEND",
          "B2_DIESEL_BLEND_2_PERCENT_BIODIESEL",
          "B5_DIESEL_BLEND_5_PERCENT_BIODIESEL",
          "B10_DIESEL_BLEND_10_PERCENT_BIODIESEL",
          "B11_DIESEL_BLEND_11_PERCENT_BIODIESEL",
          "B15_DIESEL_BLEND_15_PERCENT_BIODIESEL",
          "B20_DIESEL_BLEND_20_PERCENT_BIODIESEL",
          "B100_DIESEL_BLEND_100_PERCENT_BIODIESEL",
          "B1_DIESEL_BLEND_1_PERCENT_BIODIESEL",
          "ADDITIZED_DIESEL_2",
          "ADDITIZED_DIESEL_3",
          "RENEWABLE_DIESEL_R95",
          "RENEWABLE_DIESEL_BIODIESEL_6_20_PERCENT",
          "DIESEL_EXHAUST_FLUID",
          "PREMIUM_DIESEL_1",
          "REGULAR_ETHANOL_15_PERCENT_BLEND",
          "MID_PLUS_ETHANOL_15_PERCENT_BLEND",
          "PREMIUM_SUPER_ETHANOL_15_PERCENT_BLEND",
          "PREMIUM_DIESEL_BLEND_LESS_THAN_20_PERCENT_BIODIESEL",
          "PREMIUM_DIESEL_BLEND_GREATER_THAN_20_PERCENT_BIODIESEL",
          "B75_DIESEL_BLEND_75_PERCENT_BIODIESEL",
          "B99_DIESEL_BLEND_99_PERCENT_BIODIESEL",
          "MISCELLANEOUS_FUEL",
          "JET_FUEL",
          "AVIATION_FUEL_REGULAR",
          "AVIATION_FUEL_PREMIUM",
          "AVIATION_FUEL_JP8",
          "AVIATION_FUEL_4",
          "AVIATION_FUEL_5",
          "BIOJET_DIESEL",
          "AVIATION_BIOFUEL_GASOLINE",
          "MISCELLANEOUS_AVIATION_FUEL",
          "MARINE_FUEL_1",
          "MARINE_FUEL_2",
          "MARINE_FUEL_3",
          "MARINE_FUEL_4",
          "MARINE_FUEL_5",
          "MARINE_OTHER",
          "MARINE_DIESEL",
          "MISCELLANEOUS_MARINE_FUEL",
          "KEROSENE_LOW_SULFUR",
          "WHITE_GAS",
          "HEATING_OIL",
          "OTHER_FUEL_NON_TAXABLE",
          "KEROSENE_ULTRA_LOW_SULFUR",
          "KEROSENE_LOW_SULFUR_NON_TAXABLE",
          "KEROSENE_ULTRA_LOW_SULFUR_NON_TAXABLE",
          "EVC_1_LEVEL_1_CHARGE_110V_15_AMP",
          "EVC_2_LEVEL_2_CHARGE_240V_15_40_AMP",
          "EVC_3_LEVEL_3_CHARGE_480V_3_PHASE_CHARGE",
          "BIODIESEL_BLEND_2_PERCENT_OFF_ROAD_NON_TAXABLE",
          "BIODIESEL_BLEND_5_PERCENT_OFF_ROAD_NON_TAXABLE",
          "BIODIESEL_BLEND_10_PERCENT_OFF_ROAD_NON_TAXABLE",
          "BIODIESEL_BLEND_11_PERCENT_OFF_ROAD_NON_TAXABLE",
          "BIODIESEL_BLEND_15_PERCENT_OFF_ROAD_NON_TAXABLE",
          "BIODIESEL_BLEND_20_PERCENT_OFF_ROAD_NON_TAXABLE",
          "DIESEL_1_OFF_ROAD_NON_TAXABLE",
          "DIESEL_2_OFF_ROAD_NON_TAXABLE",
          "DIESEL_1_PREMIUM_OFF_ROAD_NON_TAXABLE",
          "DIESEL_2_PREMIUM_OFF_ROAD_NON_TAXABLE",
          "ADDITIVE_DOSAGE",
          "ETHANOL_BLENDS_E16_E84",
          "LOW_OCTANE_UNL",
          "BLENDED_DIESEL_1_AND_2",
          "OFF_ROAD_REGULAR_NON_TAXABLE",
          "OFF_ROAD_MID_PLUS_NON_TAXABLE",
          "OFF_ROAD_PREMIUM_SUPER_NON_TAXABLE",
          "OFF_ROAD_MID_PLUS_2_NON_TAXABLE",
          "OFF_ROAD_PREMIUM_SUPER_2_NON_TAXABLE",
          "RECREATIONAL_FUEL_90_OCTANE",
          "HYDROGEN_H35",
          "HYDROGEN_H70",
          "RENEWABLE_DIESEL_R95_OFF_ROAD_NON_TAXABLE",
          "BIODIESEL_BLEND_1_PERCENT_OFF_ROAD_NON_TAXABLE",
          "BIODIESEL_BLEND_75_PERCENT_OFF_ROAD_NON_TAXABLE",
          "BIODIESEL_BLEND_99_PERCENT_OFF_ROAD_NON_TAXABLE",
          "BIODIESEL_BLEND_100_PERCENT_OFF_ROAD_NON_TAXABLE",
          "RENEWABLE_DIESEL_BIODIESEL_6_20_PERCENT_OFF_ROAD_NON_TAXABLE",
          "MISCELLANEOUS_OTHER_FUEL",
          null
        ]
      },
      "fuel-unit-of-measure": {
        "title": "FuelUnitOfMeasure",
        "description": "Unit of measure for fuel disbursement.",
        "type": [
          "string",
          "null"
        ],
        "enum": [
          "GALLONS",
          "LITERS",
          "POUNDS",
          "KILOGRAMS",
          "IMPERIAL_GALLONS",
          "NOT_APPLICABLE",
          "UNKNOWN",
          null
        ]
      },
      "fuel-data": {
        "title": "FuelData",
        "type": "object",
        "properties": {
          "type": {
            "$ref": "#/components/schemas/fuel-type"
          },
          "quantity": {
            "title": "Quantity",
            "description": "The quantity of fuel purchased.",
            "type": [
              "string",
              "null"
            ]
          },
          "unit_price": {
            "title": "Unit Price",
            "description": "The price per unit of fuel.",
            "type": [
              "integer",
              "null"
            ]
          },
          "unit_of_measure": {
            "$ref": "#/components/schemas/fuel-unit-of-measure"
          }
        }
      },
      "amount-totals": {
        "title": "AmountTotals",
        "type": "object",
        "properties": {
          "gross_sale": {
            "title": "Gross Sale",
            "description": "The gross sale amount.",
            "type": [
              "integer",
              "null"
            ]
          },
          "discount": {
            "title": "Discount",
            "description": "The discount applied to the gross sale amount.",
            "type": [
              "integer",
              "null"
            ]
          },
          "net_sale": {
            "title": "Net Sale",
            "description": "The amount after discount.",
            "type": [
              "integer",
              "null"
            ]
          }
        }
      },
      "fleet": {
        "title": "Fleet",
        "required": [
          "fuel",
          "amount_totals"
        ],
        "type": "object",
        "properties": {
          "service_type": {
            "description": "The type of fuel service.",
            "$ref": "#/components/schemas/service-type"
          },
          "odometer": {
            "title": "Odometer",
            "description": "The odometer reading entered into the terminal at the time of sale.",
            "type": [
              "integer",
              "null"
            ]
          },
          "vehicle_number": {
            "title": "Vehicle Number",
            "description": "The vehicle number entered into the terminal at the time of sale, with leading zeros stripped.",
            "type": [
              "string",
              "null"
            ]
          },
          "driver_number": {
            "title": "Driver Number",
            "description": "The driver number entered into the terminal at the time of sale, with leading zeros stripped.",
            "type": [
              "string",
              "null"
            ]
          },
          "fuel": {
            "$ref": "#/components/schemas/fuel-data"
          },
          "amount_totals": {
            "$ref": "#/components/schemas/amount-totals"
          }
        }
      },
      "enhanced-data": {
        "title": "EnhancedData",
        "required": [
          "token",
          "transaction_token",
          "event_token",
          "common",
          "fleet"
        ],
        "type": "object",
        "properties": {
          "token": {
            "title": "Token",
            "description": "A unique identifier for the enhanced commercial data.",
            "type": "string",
            "format": "uuid"
          },
          "transaction_token": {
            "title": "Transaction Token",
            "description": "The token of the transaction that the enhanced data is associated with.",
            "type": "string",
            "format": "uuid"
          },
          "event_token": {
            "title": "Event Token",
            "description": "The token of the event that the enhanced data is associated with.",
            "type": "string",
            "format": "uuid"
          },
          "common": {
            "$ref": "#/components/schemas/common-data"
          },
          "fleet": {
            "title": "Fleet",
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/fleet"
            }
          }
        }
      },
      "searchable_account_types": {
        "type": "string",
        "enum": [
          "CHECKING",
          "SAVINGS"
        ],
        "title": "Searchable Account Type"
      },
      "owner_type": {
        "type": "string",
        "enum": [
          "INDIVIDUAL",
          "BUSINESS"
        ],
        "title": "Owner Type"
      },
      "account_state": {
        "type": "string",
        "enum": [
          "ENABLED",
          "CLOSED",
          "PAUSED"
        ],
        "title": "Account State"
      },
      "verification_state": {
        "type": "string",
        "enum": [
          "PENDING",
          "ENABLED",
          "FAILED_VERIFICATION",
          "INSUFFICIENT_FUNDS"
        ],
        "title": "Verification State"
      },
      "verification_method": {
        "type": "string",
        "enum": [
          "MANUAL",
          "MICRO_DEPOSIT",
          "PRENOTE",
          "EXTERNALLY_VERIFIED",
          "UNVERIFIED"
        ],
        "title": "Verification Method"
      },
      "external_bank_account_address": {
        "title": "External Bank Account Address",
        "type": "object",
        "properties": {
          "address1": {
            "type": "string",
            "minLength": 1,
            "maxLength": 40
          },
          "address2": {
            "type": [
              "string",
              "null"
            ],
            "minLength": 1,
            "maxLength": 40
          },
          "city": {
            "type": "string",
            "minLength": 1,
            "maxLength": 40
          },
          "state": {
            "type": "string",
            "minLength": 2,
            "maxLength": 2
          },
          "postal_code": {
            "type": "string",
            "minLength": 5,
            "maxLength": 10,
            "pattern": "^[0-9]{5}(-[0-9]{4})?$"
          },
          "country": {
            "type": "string",
            "minLength": 3,
            "maxLength": 3,
            "pattern": "^[A-Z]{3}$"
          }
        },
        "required": [
          "address1",
          "city",
          "state",
          "postal_code",
          "country"
        ]
      },
      "bank_account_api_response": {
        "title": "Bank Account Api Response",
        "type": "object",
        "properties": {
          "token": {
            "description": "A globally unique identifier for this record of an external bank account association. If a program links an external bank account to more than one end-user or to both the program and the end-user, then Lithic will return each record of the association",
            "type": "string",
            "format": "uuid"
          },
          "owner": {
            "description": "Legal Name of the business or individual who owns the external account. This will appear in statements",
            "type": "string"
          },
          "routing_number": {
            "description": "Routing Number",
            "type": "string"
          },
          "last_four": {
            "description": "The last 4 digits of the bank account. Derived by Lithic from the account number passed",
            "type": "string"
          },
          "name": {
            "description": "The nickname for this External Bank Account",
            "type": [
              "string",
              "null"
            ]
          },
          "currency": {
            "description": "currency of the external account 3-character alphabetic ISO 4217 code",
            "type": "string"
          },
          "country": {
            "description": "The country that the bank account is located in using ISO 3166-1. We will only accept USA bank accounts e.g., USA",
            "type": "string"
          },
          "account_token": {
            "description": "Indicates which Lithic account the external account is associated with. For external accounts that are associated with the program, account_token field returned will be null",
            "type": [
              "string",
              "null"
            ],
            "format": "uuid"
          },
          "created": {
            "description": "An ISO 8601 string representing when this funding source was added to the Lithic account.",
            "type": "string",
            "format": "date-time"
          },
          "company_id": {
            "description": "Optional field that helps identify bank accounts in receipts",
            "type": [
              "string",
              "null"
            ]
          },
          "dob": {
            "description": "Date of Birth of the Individual that owns the external bank account",
            "title": "Date of Birth",
            "type": [
              "string",
              "null"
            ],
            "format": "date"
          },
          "doing_business_as": {
            "description": "Doing Business As",
            "type": [
              "string",
              "null"
            ]
          },
          "user_defined_id": {
            "description": "User Defined ID",
            "title": "User Defined ID",
            "type": [
              "string",
              "null"
            ]
          },
          "verification_failed_reason": {
            "description": "Optional free text description of the reason for the failed verification. For ACH micro-deposits returned, this field will display the reason return code sent by the ACH network",
            "type": [
              "string",
              "null"
            ]
          },
          "verification_attempts": {
            "description": "The number of attempts at verification",
            "type": "integer"
          },
          "financial_account_token": {
            "description": "The financial account token of the operating account to fund the micro deposits",
            "type": [
              "string",
              "null"
            ],
            "format": "uuid"
          },
          "type": {
            "description": "Account Type",
            "$ref": "#/components/schemas/searchable_account_types"
          },
          "verification_method": {
            "description": "Verification Method",
            "$ref": "#/components/schemas/verification_method"
          },
          "owner_type": {
            "description": "Owner Type",
            "$ref": "#/components/schemas/owner_type"
          },
          "state": {
            "description": "Account State",
            "$ref": "#/components/schemas/account_state"
          },
          "verification_state": {
            "description": "Verification State",
            "$ref": "#/components/schemas/verification_state"
          },
          "address": {
            "description": "Address",
            "oneOf": [
              {
                "type": "null"
              },
              {
                "$ref": "#/components/schemas/external_bank_account_address"
              }
            ]
          }
        },
        "required": [
          "token",
          "type",
          "verification_method",
          "owner_type",
          "owner",
          "state",
          "verification_state",
          "routing_number",
          "last_four",
          "currency",
          "country",
          "created",
          "verification_attempts"
        ]
      },
      "instance-financial-account-type": {
        "title": "Instance Financial Account Type",
        "description": "Type of instance financial account",
        "type": "string",
        "enum": [
          "ISSUING",
          "RESERVE",
          "OPERATING",
          "CHARGED_OFF_FEES",
          "CHARGED_OFF_INTEREST",
          "CHARGED_OFF_PRINCIPAL",
          "SECURITY",
          "PROGRAM_RECEIVABLES",
          "COLLECTION",
          "PROGRAM_BANK_ACCOUNTS_PAYABLE",
          "EARLY_DIRECT_DEPOSIT_FLOAT"
        ]
      },
      "account-financial-account-type": {
        "title": "Account Financial Account Type",
        "description": "Type of account financial account",
        "type": "string",
        "enum": [
          "ISSUING",
          "OPERATING"
        ]
      },
      "financial-account-status": {
        "title": "Financial Account Status",
        "description": "Status of the financial account",
        "type": "string",
        "enum": [
          "OPEN",
          "CLOSED",
          "SUSPENDED",
          "PENDING"
        ]
      },
      "financial-account-substatus": {
        "title": "Financial Account Substatus",
        "description": "Substatus for the financial account",
        "type": "string",
        "enum": [
          "CHARGED_OFF_DELINQUENT",
          "CHARGED_OFF_FRAUD",
          "END_USER_REQUEST",
          "BANK_REQUEST",
          "DELINQUENT",
          "INTEREST_AND_FEES_PAUSED"
        ]
      },
      "auto-collection-configuration-response": {
        "title": "Auto Collection Configuration Response",
        "type": "object",
        "properties": {
          "auto_collection_enabled": {
            "type": "boolean",
            "description": "If auto collection is enabled for this account"
          }
        },
        "required": [
          "auto_collection_enabled"
        ]
      },
      "financial-account-credit-config": {
        "title": "Financial Account Credit Config",
        "type": [
          "object",
          "null"
        ],
        "properties": {
          "credit_limit": {
            "type": [
              "integer",
              "null"
            ]
          },
          "external_bank_account_token": {
            "type": [
              "string",
              "null"
            ],
            "format": "uuid"
          },
          "credit_product_token": {
            "type": [
              "string",
              "null"
            ],
            "description": "Globally unique identifier for the credit product"
          },
          "tier": {
            "type": [
              "string",
              "null"
            ],
            "description": "Tier assigned to the financial account"
          },
          "auto_collection_configuration": {
            "oneOf": [
              {
                "type": "null"
              },
              {
                "$ref": "#/components/schemas/auto-collection-configuration-response"
              }
            ]
          }
        },
        "required": [
          "credit_limit",
          "external_bank_account_token",
          "credit_product_token",
          "tier",
          "auto_collection_configuration"
        ]
      },
      "financial-account-response": {
        "title": "Financial Account Response",
        "type": "object",
        "properties": {
          "token": {
            "type": "string",
            "description": "Globally unique identifier for the account",
            "example": "b68b7424-aa69-4cbc-a946-30d90181b621",
            "format": "uuid"
          },
          "created": {
            "type": "string",
            "format": "date-time"
          },
          "updated": {
            "type": "string",
            "format": "date-time"
          },
          "type": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/instance-financial-account-type"
              },
              {
                "$ref": "#/components/schemas/account-financial-account-type"
              }
            ]
          },
          "routing_number": {
            "type": [
              "string",
              "null"
            ]
          },
          "account_number": {
            "type": [
              "string",
              "null"
            ]
          },
          "nickname": {
            "type": [
              "string",
              "null"
            ]
          },
          "account_token": {
            "type": [
              "string",
              "null"
            ],
            "format": "uuid"
          },
          "status": {
            "$ref": "#/components/schemas/financial-account-status"
          },
          "substatus": {
            "oneOf": [
              {
                "type": "null"
              },
              {
                "$ref": "#/components/schemas/financial-account-substatus"
              }
            ]
          },
          "user_defined_status": {
            "type": [
              "string",
              "null"
            ],
            "description": "User-defined status for the financial account"
          },
          "is_for_benefit_of": {
            "type": "boolean",
            "description": "Whether financial account is for the benefit of another entity"
          },
          "credit_configuration": {
            "$ref": "#/components/schemas/financial-account-credit-config"
          }
        },
        "required": [
          "token",
          "created",
          "updated",
          "type",
          "nickname",
          "is_for_benefit_of",
          "account_token",
          "credit_configuration",
          "status",
          "substatus",
          "user_defined_status"
        ]
      },
      "transaction_status": {
        "title": "Transaction Status",
        "type": "string",
        "enum": [
          "PENDING",
          "SETTLED",
          "DECLINED",
          "REVERSED",
          "CANCELED",
          "RETURNED"
        ]
      },
      "base_transaction": {
        "title": "base_transaction",
        "description": "Base class for all transaction types in the ledger service",
        "type": "object",
        "properties": {
          "status": {
            "$ref": "#/components/schemas/transaction_status",
            "description": "The status of the transaction"
          },
          "token": {
            "type": "string",
            "description": "Unique identifier for the transaction",
            "format": "uuid"
          },
          "created": {
            "type": "string",
            "description": "ISO 8601 timestamp of when the transaction was created",
            "format": "date-time"
          },
          "updated": {
            "type": "string",
            "description": "ISO 8601 timestamp of when the transaction was last updated",
            "format": "date-time"
          }
        },
        "required": [
          "status",
          "token",
          "created",
          "updated"
        ]
      },
      "transaction_result": {
        "title": "Transaction Result",
        "type": "string",
        "enum": [
          "APPROVED",
          "DECLINED"
        ]
      },
      "detailed_results": {
        "title": "Detailed Results",
        "type": "string",
        "enum": [
          "APPROVED",
          "INSUFFICIENT_FUNDS"
        ]
      },
      "payment_details": {
        "title": "Payment Details",
        "description": "Breakdown of payments",
        "type": "object",
        "patternProperties": {
          "^.*$": {
            "type": "object",
            "patternProperties": {
              "^.*$": {
                "type": "integer",
                "description": "Amount in cents for this payment category and event type combination"
              }
            },
            "additionalProperties": false
          }
        },
        "additionalProperties": false
      },
      "debit_details": {
        "title": "Debit Details",
        "description": "Breakdown of debits",
        "type": "object",
        "patternProperties": {
          "^.*$": {
            "type": "object",
            "patternProperties": {
              "^.*$": {
                "type": "integer",
                "description": "Amount in cents for this debit category and event type combination"
              }
            },
            "additionalProperties": false
          }
        },
        "additionalProperties": false
      },
      "credit_details": {
        "title": "Credit Details",
        "description": "Breakdown of credits",
        "type": "object",
        "patternProperties": {
          "^.*$": {
            "type": "object",
            "patternProperties": {
              "^.*$": {
                "type": "integer",
                "description": "Amount in cents for this credit category and event type combination"
              }
            },
            "additionalProperties": false
          }
        },
        "additionalProperties": false
      },
      "statement_totals": {
        "title": "Statement Totals",
        "type": "object",
        "properties": {
          "payments": {
            "type": "integer",
            "description": "Any funds transfers which affective the balance in cents"
          },
          "payment_details": {
            "$ref": "#/components/schemas/payment_details"
          },
          "purchases": {
            "type": "integer",
            "description": "Net card transaction volume less any cash advances in cents"
          },
          "fees": {
            "type": "integer",
            "description": "Volume of debit management operation transactions less any interest in cents"
          },
          "debits": {
            "type": "integer",
            "description": "Volume of debit management operation transactions less any interest in cents"
          },
          "debit_details": {
            "$ref": "#/components/schemas/debit_details"
          },
          "credits": {
            "type": "integer",
            "description": "Volume of credit management operation transactions less any balance transfers in cents"
          },
          "credit_details": {
            "$ref": "#/components/schemas/credit_details"
          },
          "interest": {
            "type": "integer",
            "description": "Interest accrued in cents"
          },
          "cash_advances": {
            "type": "integer",
            "description": "ATM and cashback transactions in cents"
          },
          "balance_transfers": {
            "type": "integer",
            "description": "Opening balance transferred from previous account in cents"
          }
        },
        "required": [
          "payments",
          "purchases",
          "fees",
          "debits",
          "credits",
          "interest",
          "cash_advances",
          "balance_transfers"
        ]
      },
      "period_state": {
        "type": "string",
        "enum": [
          "STANDARD",
          "PROMO",
          "PENALTY"
        ],
        "title": "Period State"
      },
      "financial_account_state": {
        "title": "Financial Account State",
        "description": "Information about the financial account state",
        "type": "object",
        "properties": {
          "status": {
            "$ref": "#/components/schemas/financial-account-status"
          },
          "substatus": {
            "oneOf": [
              {
                "$ref": "#/components/schemas/financial-account-substatus"
              },
              {
                "type": "null"
              }
            ]
          }
        },
        "required": [
          "status"
        ]
      },
      "account_standing": {
        "title": "Account Standing",
        "type": "object",
        "properties": {
          "period_state": {
            "$ref": "#/components/schemas/period_state"
          },
          "period_number": {
            "description": "Current overall period number",
            "type": "integer"
          },
          "consecutive_minimum_payments_made": {
            "description": "Number of consecutive minimum payments made",
            "type": "integer"
          },
          "consecutive_minimum_payments_missed": {
            "description": "Number of consecutive minimum payments missed",
            "type": "integer"
          },
          "consecutive_full_payments_made": {
            "description": "Number of consecutive full payments made",
            "type": "integer"
          },
          "days_past_due": {
            "description": "Number of days past due",
            "type": "integer"
          },
          "has_grace": {
            "description": "Whether the account currently has grace or not",
            "type": "boolean"
          },
          "financial_account_state": {
            "$ref": "#/components/schemas/financial_account_state"
          }
        },
        "required": [
          "period_state",
          "period_number",
          "consecutive_minimum_payments_made",
          "consecutive_minimum_payments_missed",
          "consecutive_full_payments_made",
          "days_past_due",
          "has_grace",
          "financial_account_state"
        ]
      },
      "amount_due": {
        "title": "Amount Due",
        "type": "object",
        "properties": {
          "amount": {
            "description": "Payment due at the end of the billing period in cents. Negative amount indicates something is owed. If the amount owed is positive there was a net credit. If auto-collections are enabled this is the amount that will be requested on the payment due date",
            "type": "integer"
          },
          "past_due": {
            "description": "Amount past due for statement in cents",
            "type": "integer"
          }
        },
        "required": [
          "amount",
          "past_due"
        ]
      },
      "payoff_details": {
        "title": "Payoff Details",
        "description": "Details on number and size of payments to pay off balance",
        "type": "object",
        "properties": {
          "minimum_payment_months": {
            "description": "The number of months it would take to pay off the balance in full by only paying the minimum payment. \"NA\" will signal negative or zero amortization",
            "type": "string"
          },
          "minimum_payment_total": {
            "description": "The sum of all interest and principal paid, in cents, when only paying minimum monthly payment. \"NA\" will signal negative or zero amortization",
            "type": "string"
          },
          "payoff_period_length_months": {
            "description": "Number of months to full pay off",
            "type": [
              "integer",
              "null"
            ]
          },
          "payoff_period_monthly_payment_amount": {
            "description": "The amount needed to be paid, in cents, each month in order to pay off current balance in the payoff period",
            "type": [
              "integer",
              "null"
            ]
          },
          "payoff_period_payment_total": {
            "description": "The sum of all interest and principal paid, in cents, when paying off in the payoff period",
            "type": [
              "integer",
              "null"
            ]
          }
        },
        "required": [
          "minimum_payment_months",
          "minimum_payment_total",
          "payoff_period_length_months",
          "payoff_period_monthly_payment_amount",
          "payoff_period_payment_total"
        ]
      },
      "interest_calculation_method": {
        "type": "string",
        "enum": [
          "DAILY",
          "AVERAGE_DAILY"
        ],
        "title": "Interest Calculation method"
      },
      "category_details": {
        "title": "Category Details",
        "type": "object",
        "properties": {
          "purchases": {
            "type": "string"
          },
          "cash_advances": {
            "type": "string"
          },
          "balance_transfers": {
            "type": "string"
          }
        },
        "required": [
          "purchases",
          "cash_advances",
          "balance_transfers"
        ]
      },
      "interest_details": {
        "title": "Interest Details",
        "type": "object",
        "properties": {
          "prime_rate": {
            "type": [
              "string",
              "null"
            ]
          },
          "interest_calculation_method": {
            "$ref": "#/components/schemas/interest_calculation_method"
          },
          "effective_apr": {
            "$ref": "#/components/schemas/category_details"
          },
          "interest_for_period": {
            "$ref": "#/components/schemas/category_details"
          },
          "daily_balance_amounts": {
            "$ref": "#/components/schemas/category_details"
          },
          "minimum_interest_charged": {
            "type": [
              "integer",
              "null"
            ]
          },
          "actual_interest_charged": {
            "type": [
              "integer",
              "null"
            ]
          }
        },
        "required": [
          "prime_rate",
          "interest_calculation_method",
          "effective_apr",
          "interest_for_period",
          "actual_interest_charged",
          "daily_balance_amounts"
        ]
      },
      "statement_type": {
        "type": "string",
        "enum": [
          "INITIAL",
          "PERIOD_END",
          "FINAL"
        ],
        "title": "Statement Type"
      },
      "statement_response": {
        "title": "Statement Response",
        "type": "object",
        "properties": {
          "token": {
            "type": "string",
            "description": "Globally unique identifier for a statement",
            "title": "Statement Token"
          },
          "financial_account_token": {
            "description": "Globally unique identifier for a financial account",
            "type": "string",
            "format": "uuid"
          },
          "statement_start_date": {
            "description": "Date when the billing period began",
            "type": "string",
            "format": "date"
          },
          "statement_end_date": {
            "description": "Date when the billing period ended",
            "type": "string",
            "format": "date"
          },
          "next_statement_end_date": {
            "description": "Date when the next billing period will end",
            "type": "string",
            "format": "date"
          },
          "payment_due_date": {
            "oneOf": [
              {
                "type": "null"
              },
              {
                "description": "Date when the payment is due",
                "type": "string",
                "format": "date"
              }
            ]
          },
          "next_payment_due_date": {
            "description": "Date when the next payment is due",
            "type": "string",
            "format": "date"
          },
          "days_in_billing_cycle": {
            "description": "Number of days in the billing cycle",
            "type": "integer"
          },
          "credit_limit": {
            "description": "This is the maximum credit balance extended by the lender in cents",
            "type": "integer"
          },
          "available_credit": {
            "description": "Amount of credit available to spend in cents",
            "type": "integer"
          },
          "starting_balance": {
            "description": "Balance at the start of the billing period",
            "type": "integer"
          },
          "ending_balance": {
            "description": "Balance at the end of the billing period. For charge cards, this should be the same at the statement amount due in cents",
            "type": "integer"
          },
          "period_totals": {
            "$ref": "#/components/schemas/statement_totals"
          },
          "ytd_totals": {
            "$ref": "#/components/schemas/statement_totals"
          },
          "created": {
            "description": "Timestamp of when the statement was created",
            "type": "string",
            "format": "date-time"
          },
          "updated": {
            "description": "Timestamp of when the statement was updated",
            "type": "string",
            "format": "date-time"
          },
          "credit_product_token": {
            "description": "Globally unique identifier for a credit product",
            "type": "string"
          },
          "account_standing": {
            "$ref": "#/components/schemas/account_standing"
          },
          "amount_due": {
            "$ref": "#/components/schemas/amount_due"
          },
          "payoff_details": {
            "oneOf": [
              {
                "type": "null"
              },
              {
                "$ref": "#/components/schemas/payoff_details"
              }
            ]
          },
          "interest_details": {
            "anyOf": [
              {
                "type": "null"
              },
              {
                "$ref": "#/components/schemas/interest_details"
              }
            ]
          },
          "statement_type": {
            "$ref": "#/components/schemas/statement_type"
          }
        },
        "required": [
          "token",
          "financial_account_token",
          "statement_start_date",
          "statement_end_date",
          "payment_due_date",
          "days_in_billing_cycle",
          "credit_limit",
          "available_credit",
          "starting_balance",
          "ending_balance",
          "amount_due",
          "period_totals",
          "ytd_totals",
          "created",
          "updated",
          "credit_product_token",
          "account_standing",
          "statement_type"
        ]
      },
      "transaction_category": {
        "title": "Transaction Category",
        "type": "string",
        "enum": [
          "ACH",
          "BALANCE_OR_FUNDING",
          "FEE",
          "REWARD",
          "ADJUSTMENT",
          "DERECOGNITION",
          "DISPUTE",
          "CARD",
          "EXTERNAL_ACH",
          "EXTERNAL_CHECK",
          "EXTERNAL_FEDNOW",
          "EXTERNAL_RTP",
          "EXTERNAL_TRANSFER",
          "EXTERNAL_WIRE",
          "MANAGEMENT_ADJUSTMENT",
          "MANAGEMENT_DISPUTE",
          "MANAGEMENT_FEE",
          "MANAGEMENT_REWARD",
          "MANAGEMENT_DISBURSEMENT",
          "HOLD",
          "PROGRAM_FUNDING"
        ]
      },
      "category_balances": {
        "title": "Category Balances",
        "type": "object",
        "properties": {
          "interest": {
            "type": "integer"
          },
          "principal": {
            "type": "integer"
          },
          "fees": {
            "type": "integer"
          }
        },
        "required": [
          "interest",
          "principal",
          "fees"
        ]
      },
      "balances": {
        "title": "Balances",
        "type": "object",
        "properties": {
          "past_due": {
            "description": "Amount not paid off on previous due dates",
            "$ref": "#/components/schemas/category_balances"
          },
          "due": {
            "description": "Amount due for the prior billing cycle. Any amounts not fully paid off on this due date will be considered past due the next day",
            "$ref": "#/components/schemas/category_balances"
          },
          "past_statements_due": {
            "description": "Amount due for the past billing cycles.",
            "$ref": "#/components/schemas/category_balances"
          },
          "next_statement_due": {
            "description": "Amount due for the current billing cycle. Any amounts not paid off by early payments or credits will be considered due at the end of the current billing period",
            "$ref": "#/components/schemas/category_balances"
          }
        },
        "required": [
          "past_due",
          "due",
          "past_statements_due",
          "next_statement_due"
        ]
      },
      "payment_allocation": {
        "title": "Payment Allocation",
        "type": "object",
        "properties": {
          "interest": {
            "type": "integer",
            "description": "Amount allocated to interest in cents"
          },
          "principal": {
            "type": "integer",
            "description": "Amount allocated to principal in cents"
          },
          "fees": {
            "type": "integer",
            "description": "Amount allocated to fees in cents"
          },
          "interest_details": {
            "anyOf": [
              {
                "type": "null"
              },
              {
                "$ref": "#/components/schemas/category_details"
              }
            ]
          },
          "principal_details": {
            "anyOf": [
              {
                "type": "null"
              },
              {
                "$ref": "#/components/schemas/category_details"
              }
            ]
          },
          "fee_details": {
            "anyOf": [
              {
                "type": "null"
              },
              {
                "$ref": "#/components/schemas/category_details"
              }
            ]
          }
        },
        "required": [
          "interest",
          "principal",
          "fees",
          "interest_details",
          "principal_details",
          "fee_details"
        ]
      },
      "balance_details": {
        "title": "Balance Details",
        "type": "object",
        "properties": {
          "amount": {
            "type": "integer"
          },
          "remaining": {
            "type": "integer"
          }
        },
        "required": [
          "amount",
          "remaining"
        ]
      },
      "loan_tape_response": {
        "title": "Loan Tape Response",
        "type": "object",
        "properties": {
          "token": {
            "type": "string",
            "description": "Globally unique identifier for a loan tape",
            "title": "Loan Tape Token"
          },
          "financial_account_token": {
            "description": "Globally unique identifier for a financial account",
            "type": "string",
            "format": "uuid"
          },
          "date": {
            "description": "Date of transactions that this loan tape covers",
            "type": "string",
            "format": "date"
          },
          "created": {
            "description": "Timestamp of when the loan tape was created",
            "type": "string",
            "format": "date-time"
          },
          "updated": {
            "description": "Timestamp of when the loan tape was updated",
            "type": "string",
            "format": "date-time"
          },
          "version": {
            "description": "Version number of the loan tape. This starts at 1",
            "type": "integer"
          },
          "ytd_totals": {
            "$ref": "#/components/schemas/statement_totals"
          },
          "period_totals": {
            "$ref": "#/components/schemas/statement_totals"
          },
          "day_totals": {
            "$ref": "#/components/schemas/statement_totals"
          },
          "balances": {
            "$ref": "#/components/schemas/balances"
          },
          "starting_balance": {
            "description": "Balance at the start of the day",
            "type": "integer"
          },
          "ending_balance": {
            "description": "Balance at the end of the day",
            "type": "integer"
          },
          "credit_limit": {
            "description": "For prepay accounts, this is the minimum prepay balance that must be maintained. For charge card accounts, this is the maximum credit balance extended by a lender",
            "type": "integer"
          },
          "available_credit": {
            "description": "Amount of credit available to spend in cents",
            "type": "integer"
          },
          "excess_credits": {
            "description": "Excess credits in the form of provisional credits, payments, or purchase refunds. If positive, the account is in net credit state with no outstanding balances. An overpayment could land an account in this state",
            "type": "integer"
          },
          "account_standing": {
            "$ref": "#/components/schemas/account_standing"
          },
          "credit_product_token": {
            "description": "Globally unique identifier for a credit product",
            "type": "string"
          },
          "tier": {
            "description": "Interest tier to which this account belongs to",
            "type": [
              "string",
              "null"
            ]
          },
          "payment_allocation": {
            "$ref": "#/components/schemas/payment_allocation"
          },
          "minimum_payment_balance": {
            "$ref": "#/components/schemas/balance_details"
          },
          "previous_statement_balance": {
            "$ref": "#/components/schemas/balance_details"
          },
          "interest_details": {
            "anyOf": [
              {
                "type": "null"
              },
              {
                "$ref": "#/components/schemas/interest_details"
              }
            ]
          }
        },
        "required": [
          "token",
          "financial_account_token",
          "date",
          "created",
          "updated",
          "version",
          "ytd_totals",
          "period_totals",
          "day_totals",
          "credit_limit",
          "excess_credits",
          "account_standing",
          "credit_product_token",
          "payment_allocation",
          "balances",
          "minimum_payment_balance",
          "previous_statement_balance",
          "starting_balance",
          "ending_balance",
          "available_credit",
          "interest_details"
        ]
      },
      "book_transfer_category": {
        "title": "Book Transfer Category",
        "type": "string",
        "enum": [
          "ADJUSTMENT",
          "BALANCE_OR_FUNDING",
          "DERECOGNITION",
          "DISPUTE",
          "FEE",
          "INTERNAL",
          "REWARD",
          "PROGRAM_FUNDING",
          "TRANSFER"
        ]
      },
      "book_transfer_type": {
        "type": "string",
        "enum": [
          "ATM_BALANCE_INQUIRY",
          "ATM_WITHDRAWAL",
          "ATM_DECLINE",
          "INTERNATIONAL_ATM_WITHDRAWAL",
          "INACTIVITY",
          "STATEMENT",
          "MONTHLY",
          "QUARTERLY",
          "ANNUAL",
          "CUSTOMER_SERVICE",
          "ACCOUNT_MAINTENANCE",
          "ACCOUNT_ACTIVATION",
          "ACCOUNT_CLOSURE",
          "CARD_REPLACEMENT",
          "CARD_DELIVERY",
          "CARD_CREATE",
          "CURRENCY_CONVERSION",
          "INTEREST",
          "LATE_PAYMENT",
          "BILL_PAYMENT",
          "CASH_BACK",
          "ACCOUNT_TO_ACCOUNT",
          "CARD_TO_CARD",
          "DISBURSE",
          "BILLING_ERROR",
          "LOSS_WRITE_OFF",
          "EXPIRED_CARD",
          "EARLY_DERECOGNITION",
          "ESCHEATMENT",
          "INACTIVITY_FEE_DOWN",
          "PROVISIONAL_CREDIT",
          "DISPUTE_WON",
          "SERVICE",
          "TRANSFER",
          "COLLECTION"
        ],
        "description": "Type of the book transfer",
        "title": "Book Transfer Type"
      },
      "book_transfer_detailed_results": {
        "title": "Book Transfer Detailed Results",
        "type": "string",
        "enum": [
          "APPROVED",
          "FUNDS_INSUFFICIENT"
        ]
      },
      "book_transfer_event": {
        "title": "Book Transfer Event",
        "description": "Book transfer Event",
        "type": "object",
        "properties": {
          "amount": {
            "description": "Amount of the financial event that has been settled in the currency's smallest unit (e.g., cents).",
            "type": "integer"
          },
          "type": {
            "$ref": "#/components/schemas/book_transfer_type"
          },
          "result": {
            "description": "APPROVED financial events were successful while DECLINED financial events were declined by user, Lithic, or the network.",
            "type": "string",
            "enum": [
              "APPROVED",
              "DECLINED"
            ]
          },
          "created": {
            "description": "Date and time when the financial event occurred. UTC time zone.",
            "type": "string",
            "format": "date-time"
          },
          "token": {
            "description": "Globally unique identifier.",
            "type": "string",
            "format": "uuid"
          },
          "subtype": {
            "description": "The program specific subtype code for the specified category/type.",
            "type": "string"
          },
          "memo": {
            "description": "Memo for the transfer.",
            "type": "string"
          },
          "detailed_results": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/book_transfer_detailed_results"
            }
          }
        },
        "required": [
          "amount",
          "type",
          "result",
          "created",
          "token",
          "subtype",
          "memo",
          "detailed_results"
        ]
      },
      "transaction_series": {
        "title": "Transaction Series",
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "example": "FEE"
          },
          "related_transaction_token": {
            "oneOf": [
              {
                "type": "string",
                "format": "uuid",
                "example": "123e4567-e89b-12d3-a456-426614174000"
              },
              {
                "type": "null"
              }
            ]
          },
          "related_transaction_event_token": {
            "oneOf": [
              {
                "type": "string",
                "format": "uuid",
                "example": "123e4567-e89b-12d3-a456-426614174000"
              },
              {
                "type": "null"
              }
            ]
          }
        },
        "required": [
          "type",
          "related_transaction_token",
          "related_transaction_event_token"
        ]
      },
      "external_resource_type": {
        "title": "ExternalResourceType",
        "type": "string",
        "enum": [
          "STATEMENT",
          "COLLECTION",
          "DISPUTE",
          "UNKNOWN"
        ],
        "description": "Type of external resource associated with the management operation"
      },
      "external_resource": {
        "title": "ExternalResource",
        "type": "object",
        "required": [
          "external_resource_type",
          "external_resource_token"
        ],
        "properties": {
          "external_resource_type": {
            "$ref": "#/components/schemas/external_resource_type"
          },
          "external_resource_token": {
            "type": "string",
            "description": "Token identifying the external resource"
          },
          "external_resource_sub_token": {
            "type": "string",
            "description": "Token identifying the external resource sub-resource"
          }
        },
        "description": "External resource associated with the management operation",
        "additionalProperties": false
      },
      "book-transfer-transaction": {
        "title": "Book Transfer Transaction",
        "description": "Book transfer transaction",
        "allOf": [
          {
            "$ref": "#/components/schemas/base_transaction"
          },
          {
            "type": "object",
            "properties": {
              "family": {
                "type": "string",
                "const": "TRANSFER",
                "description": "TRANSFER - Book Transfer Transaction"
              },
              "result": {
                "$ref": "#/components/schemas/transaction_result"
              },
              "category": {
                "$ref": "#/components/schemas/book_transfer_category"
              },
              "currency": {
                "type": "string",
                "description": "3-character alphabetic ISO 4217 code for the settling currency of the transaction",
                "example": "USD"
              },
              "settled_amount": {
                "type": "integer",
                "description": "Amount of the transaction that has been settled in the currency's smallest unit (e.g., cents)",
                "example": 500
              },
              "pending_amount": {
                "type": "integer",
                "description": "Pending amount of the transaction in the currency's smallest unit (e.g., cents), including any acquirer fees.\n\nThe value of this field will go to zero over time once the financial transaction is settled.\n",
                "example": 1000
              },
              "events": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/book_transfer_event"
                },
                "description": "A list of all financial events that have modified this transfer"
              },
              "from_financial_account_token": {
                "type": "string",
                "format": "uuid",
                "description": "Globally unique identifier for the financial account or card that will send the funds. Accepted type dependent on the program's use case"
              },
              "to_financial_account_token": {
                "type": "string",
                "format": "uuid",
                "description": "Globally unique identifier for the financial account or card that will receive the funds. Accepted type dependent on the program's use case"
              },
              "external_id": {
                "description": "External ID defined by the customer",
                "oneOf": [
                  {
                    "type": "string"
                  },
                  {
                    "type": "null"
                  }
                ]
              },
              "transaction_series": {
                "description": "A series of transactions that are grouped together",
                "oneOf": [
                  {
                    "$ref": "#/components/schemas/transaction_series"
                  },
                  {
                    "type": "null"
                  }
                ]
              },
              "external_resource": {
                "description": "An external resource associated with the transfer",
                "oneOf": [
                  {
                    "$ref": "#/components/schemas/external_resource"
                  },
                  {
                    "type": "null"
                  }
                ]
              }
            },
            "required": [
              "family",
              "result",
              "category",
              "currency",
              "settled_amount",
              "pending_amount",
              "events",
              "from_financial_account_token",
              "to_financial_account_token"
            ]
          }
        ]
      },
      "currency": {
        "description": "3-character alphabetic ISO 4217 currency",
        "example": "USD",
        "title": "Currency",
        "type": "string"
      },
      "transaction_amounts": {
        "title": "Transaction Amounts",
        "type": "object",
        "properties": {
          "cardholder": {
            "properties": {
              "amount": {
                "description": "The estimated settled amount of the transaction in the cardholder billing currency.",
                "type": "integer",
                "example": -1000
              },
              "conversion_rate": {
                "description": "The exchange rate used to convert the merchant amount to the cardholder billing amount.",
                "type": "string",
                "example": "1.000000"
              },
              "currency": {
                "$ref": "#/components/schemas/currency"
              }
            },
            "type": "object",
            "required": [
              "amount",
              "conversion_rate",
              "currency"
            ]
          },
          "hold": {
            "properties": {
              "amount": {
                "description": "The pending amount of the transaction in the anticipated settlement currency.",
                "type": "integer",
                "example": 0
              },
              "currency": {
                "$ref": "#/components/schemas/currency"
              }
            },
            "type": "object",
            "required": [
              "amount",
              "currency"
            ]
          },
          "merchant": {
            "properties": {
              "amount": {
                "description": "The settled amount of the transaction in the merchant currency.",
                "type": "integer",
                "example": -1000
              },
              "currency": {
                "$ref": "#/components/schemas/currency"
              }
            },
            "type": "object",
            "required": [
              "amount",
              "currency"
            ]
          },
          "settlement": {
            "properties": {
              "amount": {
                "description": "The settled amount of the transaction in the settlement currency.",
                "type": "integer",
                "example": -1000
              },
              "currency": {
                "$ref": "#/components/schemas/currency"
              }
            },
            "type": "object",
            "required": [
              "amount",
              "currency"
            ]
          }
        },
        "required": [
          "cardholder",
          "hold",
          "merchant",
          "settlement"
        ]
      },
      "avs": {
        "title": "Address Verification Service",
        "type": "object",
        "properties": {
          "address": {
            "description": "Cardholder address",
            "type": "string"
          },
          "zipcode": {
            "description": "Cardholder ZIP code",
            "type": "string"
          }
        },
        "required": [
          "address",
          "zipcode"
        ]
      },
      "cardholder_authentication": {
        "title": "Cardholder Authentication",
        "type": "object",
        "properties": {
          "authentication_result": {
            "description": "Indicates the outcome of the 3DS authentication process.",
            "enum": [
              "ATTEMPTS",
              "DECLINE",
              "NONE",
              "SUCCESS"
            ],
            "example": "SUCCESS",
            "type": "string"
          },
          "authentication_method": {
            "description": "Indicates the method used to authenticate the cardholder.",
            "enum": [
              "FRICTIONLESS",
              "CHALLENGE",
              "NONE"
            ],
            "example": "FRICTIONLESS",
            "type": "string"
          },
          "decision_made_by": {
            "description": "Indicates which party made the 3DS authentication decision.",
            "enum": [
              "CUSTOMER_RULES",
              "CUSTOMER_ENDPOINT",
              "LITHIC_DEFAULT",
              "LITHIC_RULES",
              "NETWORK",
              "UNKNOWN"
            ],
            "example": "LITHIC_RULES",
            "type": "string"
          },
          "liability_shift": {
            "description": "Indicates whether chargeback liability shift applies to the transaction. Possible enum values:\n  * `3DS_AUTHENTICATED`: The transaction was fully authenticated through a 3-D Secure flow, chargeback liability shift applies.\n  * `NONE`: Chargeback liability shift has not shifted to the issuer, i.e. the merchant is liable.\n  * `TOKEN_AUTHENTICATED`: The transaction was a tokenized payment with validated cryptography, possibly recurring. Chargeback liability shift to the issuer applies.\n",
            "example": "3DS_AUTHENTICATED",
            "enum": [
              "3DS_AUTHENTICATED",
              "TOKEN_AUTHENTICATED",
              "NONE"
            ],
            "type": "string"
          },
          "three_ds_authentication_token": {
            "oneOf": [
              {
                "type": "null",
                "description": "3DS authentication token not available."
              },
              {
                "type": "string",
                "example": "a6e372d0-b40a-43eb-b0d1-4e1aebef5875",
                "format": "uuid",
                "description": "Unique identifier you can use to match a given 3DS authentication (available via the three_ds_authentication.created event webhook) and the transaction. Note that in cases where liability shift does not occur, this token is matched to the transaction on a best-effort basis."
              }
            ]
          }
        },
        "required": [
          "authentication_result",
          "authentication_method",
          "decision_made_by",
          "liability_shift",
          "three_ds_authentication_token"
        ]
      },
      "account_type": {
        "title": "Account Type",
        "type": [
          "string",
          "null"
        ],
        "description": "The selected account type for applicable ATM transactions such as cash withdrawals, deposits, or balance inquiries.",
        "enum": [
          "DEFAULT",
          "CHECKING",
          "SAVINGS",
          "CREDIT_CARD",
          null
        ]
      },
      "transaction_event_amounts": {
        "title": "Transaction Event Amounts",
        "type": "object",
        "properties": {
          "cardholder": {
            "type": "object",
            "properties": {
              "amount": {
                "description": "Amount of the event in the cardholder billing currency.",
                "type": "integer",
                "example": 1000
              },
              "conversion_rate": {
                "description": "Exchange rate used to convert the merchant amount to the cardholder billing amount.",
                "type": "string",
                "example": "1.000000"
              },
              "currency": {
                "$ref": "#/components/schemas/currency"
              }
            },
            "required": [
              "amount",
              "conversion_rate",
              "currency"
            ]
          },
          "merchant": {
            "type": "object",
            "properties": {
              "amount": {
                "description": "Amount of the event in the merchant currency.",
                "type": "integer",
                "example": 1000
              },
              "currency": {
                "$ref": "#/components/schemas/currency"
              }
            },
            "required": [
              "amount",
              "currency"
            ]
          },
          "settlement": {
            "type": [
              "object",
              "null"
            ],
            "properties": {
              "amount": {
                "description": "Amount of the event, if it is financial, in the settlement currency. Non-financial events do not contain this amount because they do not move funds.",
                "type": "integer",
                "example": 1000
              },
              "conversion_rate": {
                "description": "Exchange rate used to convert the merchant amount to the settlement amount.",
                "type": "string",
                "example": "1.000000"
              },
              "currency": {
                "$ref": "#/components/schemas/currency"
              }
            },
            "required": [
              "amount",
              "conversion_rate",
              "currency"
            ]
          }
        },
        "required": [
          "cardholder",
          "merchant",
          "settlement"
        ]
      },
      "network_info": {
        "title": "Network Information",
        "oneOf": [
          {
            "type": "null"
          },
          {
            "type": "object"
          }
        ],
        "description": "Information provided by the card network in each event. This includes common identifiers shared between you, Lithic, the card network and in some cases the acquirer. These identifiers often link together events within the same transaction lifecycle and can be used to locate a particular transaction, such as during processing of disputes. Not all fields are available in all events, and the presence of these fields is dependent on the card network and the event type. If the field is populated by the network, we will pass it through as is unless otherwise specified. Please consult the official network documentation for more details about these fields and how to use them.",
        "properties": {
          "acquirer": {
            "properties": {
              "acquirer_reference_number": {
                "description": "Identifier assigned by the acquirer, applicable to dual-message transactions only. The acquirer reference number (ARN) is only populated once a transaction has been cleared, and it is not available in all transactions (such as automated fuel dispenser transactions). A single transaction can contain multiple ARNs if the merchant sends multiple clearings.",
                "oneOf": [
                  {
                    "type": "null"
                  },
                  {
                    "type": "string"
                  }
                ]
              },
              "retrieval_reference_number": {
                "description": "Identifier assigned by the acquirer.",
                "oneOf": [
                  {
                    "type": "null"
                  },
                  {
                    "type": "string"
                  }
                ]
              }
            },
            "oneOf": [
              {
                "type": "null"
              },
              {
                "type": "object"
              }
            ],
            "required": [
              "acquirer_reference_number",
              "retrieval_reference_number"
            ]
          },
          "amex": {
            "properties": {
              "transaction_id": {
                "description": "Identifier assigned by American Express to link original messages to subsequent messages. Guaranteed by American Express to be unique for each original authorization and financial authorization.",
                "oneOf": [
                  {
                    "type": "null"
                  },
                  {
                    "type": "string"
                  }
                ]
              },
              "original_transaction_id": {
                "description": "Identifier assigned by American Express. Matches the `transaction_id` of a prior related event. May be populated in incremental authorizations (authorization requests that augment a previously authorized amount), authorization advices, financial authorizations, and clearings.",
                "oneOf": [
                  {
                    "type": "null"
                  },
                  {
                    "type": "string"
                  }
                ]
              }
            },
            "oneOf": [
              {
                "type": "null"
              },
              {
                "type": "object"
              }
            ],
            "required": [
              "transaction_id",
              "original_transaction_id"
            ]
          },
          "mastercard": {
            "properties": {
              "banknet_reference_number": {
                "description": "Identifier assigned by Mastercard. Guaranteed by Mastercard to be unique for any transaction within a specific financial network on any processing day.",
                "oneOf": [
                  {
                    "type": "null"
                  },
                  {
                    "type": "string"
                  }
                ]
              },
              "switch_serial_number": {
                "description": "Identifier assigned by Mastercard, applicable to single-message transactions only.",
                "oneOf": [
                  {
                    "type": "null"
                  },
                  {
                    "type": "string"
                  }
                ]
              },
              "original_banknet_reference_number": {
                "description": "Identifier assigned by Mastercard. Matches the `banknet_reference_number` of a prior related event. May be populated in authorization reversals, incremental authorizations (authorization requests that augment a previously authorized amount), automated fuel dispenser authorization advices and clearings, and financial authorizations. If the original banknet reference number contains all zeroes, then no actual reference number could be found by the network or acquirer. If Mastercard converts a transaction from dual-message to single-message, such as for certain ATM transactions, it will populate the original banknet reference number in the resulting financial authorization with the banknet reference number of the initial authorization, which Lithic does not receive.",
                "oneOf": [
                  {
                    "type": "null"
                  },
                  {
                    "type": "string"
                  }
                ]
              },
              "original_switch_serial_number": {
                "description": "Identifier assigned by Mastercard. Matches the `switch_serial_number` of a prior related event. May be populated in returns and return reversals. Applicable to single-message transactions only.",
                "oneOf": [
                  {
                    "type": "null"
                  },
                  {
                    "type": "string"
                  }
                ]
              }
            },
            "oneOf": [
              {
                "type": "null"
              },
              {
                "type": "object"
              }
            ],
            "required": [
              "banknet_reference_number",
              "switch_serial_number",
              "original_banknet_reference_number",
              "original_switch_serial_number"
            ]
          },
          "visa": {
            "properties": {
              "transaction_id": {
                "description": "Identifier assigned by Visa to link original messages to subsequent messages. Guaranteed by Visa to be unique for each original authorization and financial authorization.",
                "oneOf": [
                  {
                    "type": "null"
                  },
                  {
                    "type": "string"
                  }
                ]
              },
              "original_transaction_id": {
                "description": "Identifier assigned by Visa. Matches the `transaction_id` of a prior related event. May be populated in incremental authorizations (authorization requests that augment a previously authorized amount), authorization advices, financial authorizations, and clearings.",
                "oneOf": [
                  {
                    "type": "null"
                  },
                  {
                    "type": "string"
                  }
                ]
              }
            },
            "oneOf": [
              {
                "type": "null"
              },
              {
                "type": "object"
              }
            ],
            "required": [
              "transaction_id",
              "original_transaction_id"
            ]
          }
        },
        "required": [
          "acquirer",
          "amex",
          "mastercard",
          "visa"
        ]
      },
      "mastercard_network_specific_data": {
        "title": "Mastercard Network Specific Data",
        "type": "object",
        "properties": {
          "transaction_type_identifier": {
            "oneOf": [
              {
                "type": "null",
                "description": "Transaction type identifier not available."
              },
              {
                "type": "string",
                "description": "Indicates the type of additional transaction purpose.",
                "minLength": 3,
                "maxLength": 3
              }
            ]
          },
          "ecommerce_security_level_indicator": {
            "oneOf": [
              {
                "type": "null",
                "description": "Electronic commerce security level indicator not available."
              },
              {
                "type": "string",
                "description": "Indicates the electronic commerce security level and UCAF collection.",
                "minLength": 3,
                "maxLength": 3
              }
            ]
          },
          "on_behalf_service_result": {
            "oneOf": [
              {
                "type": "null",
                "description": "On-behalf service result not available."
              },
              {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "service": {
                      "type": "string",
                      "description": "Indicates the service performed on the transaction.",
                      "minLength": 2,
                      "maxLength": 2
                    },
                    "result_1": {
                      "type": "string",
                      "description": "Indicates the results of the service processing.",
                      "minLength": 1,
                      "maxLength": 1
                    },
                    "result_2": {
                      "type": "string",
                      "description": "Identifies the results of the service processing.",
                      "minLength": 1,
                      "maxLength": 1
                    }
                  },
                  "required": [
                    "service",
                    "result_1",
                    "result_2"
                  ]
                },
                "description": "The On-behalf Service performed on the transaction and the results. Contains all applicable, on-behalf service results that were performed on a given transaction.",
                "maxItems": 10
              }
            ]
          }
        },
        "required": [
          "transaction_type_identifier",
          "ecommerce_security_level_indicator",
          "on_behalf_service_result"
        ]
      },
      "visa_network_specific_data": {
        "title": "Visa Network Specific Data",
        "type": "object",
        "properties": {
          "business_application_identifier": {
            "oneOf": [
              {
                "type": "null",
                "description": "Business application identifier not available."
              },
              {
                "type": "string",
                "description": "Identifies the purpose or category of a transaction, used to classify and process transactions according to Visa’s rules.",
                "minLength": 2,
                "maxLength": 2
              }
            ]
          }
        },
        "required": [
          "business_application_identifier"
        ]
      },
      "network_specific_data": {
        "title": "Network Specific Data",
        "type": "object",
        "properties": {
          "mastercard": {
            "$ref": "#/components/schemas/mastercard_network_specific_data"
          },
          "visa": {
            "$ref": "#/components/schemas/visa_network_specific_data"
          }
        },
        "required": [
          "mastercard",
          "visa"
        ]
      },
      "rule_result": {
        "title": "Detailed Rule Result",
        "type": "object",
        "properties": {
          "auth_rule_token": {
            "description": "The Auth Rule Token associated with the rule from which the decline originated. If this is set to null, then the decline was not associated with a customer-configured Auth Rule. This may happen in cases where a transaction is declined due to a Lithic-configured security or compliance rule, for example.",
            "oneOf": [
              {
                "type": "null"
              },
              {
                "type": "string",
                "format": "uuid"
              }
            ]
          },
          "result": {
            "description": "The detailed_result associated with this rule's decline.",
            "$ref": "#/components/schemas/detailed_result"
          },
          "name": {
            "description": "The name for the rule, if any was configured.",
            "oneOf": [
              {
                "type": "null"
              },
              {
                "type": "string"
              }
            ]
          },
          "explanation": {
            "description": "A human-readable explanation outlining the motivation for the rule's decline.",
            "oneOf": [
              {
                "type": "null"
              },
              {
                "type": "string"
              }
            ]
          }
        },
        "required": [
          "auth_rule_token",
          "explanation",
          "name",
          "result"
        ]
      },
      "decline_result": {
        "example": "APPROVED",
        "title": "Result of the transaction",
        "type": "string",
        "enum": [
          "ACCOUNT_PAUSED",
          "ACCOUNT_STATE_TRANSACTION_FAIL",
          "APPROVED",
          "BANK_CONNECTION_ERROR",
          "BANK_NOT_VERIFIED",
          "CARD_CLOSED",
          "CARD_PAUSED",
          "DECLINED",
          "FRAUD_ADVICE",
          "IGNORED_TTL_EXPIRY",
          "SUSPECTED_FRAUD",
          "INACTIVE_ACCOUNT",
          "INCORRECT_PIN",
          "INVALID_CARD_DETAILS",
          "INSUFFICIENT_FUNDS",
          "INSUFFICIENT_FUNDS_PRELOAD",
          "INVALID_TRANSACTION",
          "MERCHANT_BLACKLIST",
          "ORIGINAL_NOT_FOUND",
          "PREVIOUSLY_COMPLETED",
          "SINGLE_USE_RECHARGED",
          "SWITCH_INOPERATIVE_ADVICE",
          "UNAUTHORIZED_MERCHANT",
          "UNKNOWN_HOST_TIMEOUT",
          "USER_TRANSACTION_LIMIT"
        ]
      },
      "transaction_event": {
        "title": "Transaction Event",
        "type": "object",
        "properties": {
          "account_type": {
            "$ref": "#/components/schemas/account_type"
          },
          "amount": {
            "description": "Amount of the event in the settlement currency.",
            "example": 1000,
            "type": "integer",
            "deprecated": true
          },
          "amounts": {
            "$ref": "#/components/schemas/transaction_event_amounts"
          },
          "created": {
            "description": "RFC 3339 date and time this event entered the system. UTC time zone.",
            "example": "2023-09-26T21:14:28.637Z",
            "format": "date-time",
            "type": "string"
          },
          "network_info": {
            "$ref": "#/components/schemas/network_info"
          },
          "network_specific_data": {
            "$ref": "#/components/schemas/network_specific_data"
          },
          "detailed_results": {
            "items": {
              "$ref": "#/components/schemas/detailed_result"
            },
            "type": "array"
          },
          "rule_results": {
            "items": {
              "$ref": "#/components/schemas/rule_result"
            },
            "type": "array"
          },
          "effective_polarity": {
            "description": "Indicates whether the transaction event is a credit or debit to the account.",
            "example": "DEBIT",
            "enum": [
              "CREDIT",
              "DEBIT"
            ],
            "type": "string"
          },
          "result": {
            "$ref": "#/components/schemas/decline_result"
          },
          "token": {
            "description": "Transaction event identifier.",
            "example": "0c2adae9-f535-4505-8c35-421dad9bd0b6",
            "format": "uuid",
            "type": "string"
          },
          "type": {
            "description": "Type of transaction event",
            "example": "CLEARING",
            "enum": [
              "AUTHORIZATION",
              "AUTHORIZATION_ADVICE",
              "AUTHORIZATION_EXPIRY",
              "AUTHORIZATION_REVERSAL",
              "BALANCE_INQUIRY",
              "CLEARING",
              "CORRECTION_CREDIT",
              "CORRECTION_DEBIT",
              "CREDIT_AUTHORIZATION",
              "CREDIT_AUTHORIZATION_ADVICE",
              "FINANCIAL_AUTHORIZATION",
              "FINANCIAL_CREDIT_AUTHORIZATION",
              "RETURN",
              "RETURN_REVERSAL"
            ],
            "type": "string"
          }
        },
        "required": [
          "amount",
          "amounts",
          "created",
          "detailed_results",
          "effective_polarity",
          "result",
          "token",
          "type",
          "rule_results",
          "network_info"
        ]
      },
      "merchant": {
        "title": "Merchant",
        "type": "object",
        "properties": {
          "acceptor_id": {
            "description": "Unique alphanumeric identifier for the payment card acceptor (merchant).",
            "example": "333301802529120",
            "type": "string"
          },
          "acquiring_institution_id": {
            "description": "Unique numeric identifier of the acquiring institution.",
            "example": "191231",
            "type": "string"
          },
          "city": {
            "description": "City of card acceptor. Note that in many cases, particularly in card-not-present transactions, merchants may send through a phone number or URL in this field.",
            "example": "NEW YORK",
            "type": "string"
          },
          "country": {
            "description": "Country or entity of card acceptor. Possible values are: (1) all ISO 3166-1 alpha-3 country codes, (2) QZZ for Kosovo, and (3) ANT for Netherlands Antilles.",
            "example": "USA",
            "type": "string"
          },
          "descriptor": {
            "description": "Short description of card acceptor.",
            "example": "COFFEE SHOP",
            "type": "string"
          },
          "mcc": {
            "description": "Merchant category code (MCC). A four-digit number listed in ISO 18245. An MCC is used to classify a business by the types of goods or services it provides.",
            "example": "5812",
            "type": "string"
          },
          "state": {
            "description": "Geographic state of card acceptor.",
            "example": "NY",
            "type": "string"
          }
        },
        "required": [
          "acceptor_id",
          "acquiring_institution_id",
          "city",
          "country",
          "descriptor",
          "mcc",
          "state"
        ]
      },
      "merchant_currency": {
        "title": "Merchant Currency",
        "description": "3-character alphabetic ISO 4217 code for the local currency of the transaction.",
        "example": "USD",
        "type": "string"
      },
      "network_risk_score": {
        "title": "Network Risk Score",
        "type": [
          "integer",
          "null"
        ],
        "description": "Network-provided score assessing risk level associated with a given authorization. Scores are on a range of 0-999, with 0 representing the lowest risk and 999 representing the highest risk. For Visa transactions, where the raw score has a range of 0-99, Lithic will normalize the score by multiplying the raw score by 10x."
      },
      "pos_entry_mode": {
        "title": "Point of Sale Entry Mode",
        "type": "object",
        "properties": {
          "card": {
            "type": "string",
            "enum": [
              "NOT_PRESENT",
              "PREAUTHORIZED",
              "PRESENT",
              "UNKNOWN"
            ],
            "description": "Card presence indicator"
          },
          "cardholder": {
            "type": "string",
            "enum": [
              "DEFERRED_BILLING",
              "ELECTRONIC_ORDER",
              "INSTALLMENT",
              "MAIL_ORDER",
              "NOT_PRESENT",
              "PREAUTHORIZED",
              "PRESENT",
              "REOCCURRING",
              "TELEPHONE_ORDER",
              "UNKNOWN"
            ],
            "description": "Cardholder presence indicator"
          },
          "pan": {
            "type": "string",
            "enum": [
              "AUTO_ENTRY",
              "BAR_CODE",
              "CONTACTLESS",
              "CREDENTIAL_ON_FILE",
              "ECOMMERCE",
              "ERROR_KEYED",
              "ERROR_MAGNETIC_STRIPE",
              "ICC",
              "KEY_ENTERED",
              "MAGNETIC_STRIPE",
              "MANUAL",
              "OCR",
              "SECURE_CARDLESS",
              "UNKNOWN",
              "UNSPECIFIED"
            ],
            "description": "Method of entry for the PAN"
          },
          "pin_entered": {
            "type": "boolean",
            "description": "Indicates whether the cardholder entered the PIN. True if the PIN was entered."
          }
        },
        "required": [
          "card",
          "cardholder",
          "pan",
          "pin_entered"
        ]
      },
      "pos_terminal": {
        "title": "Point of Sale Terminal",
        "type": "object",
        "properties": {
          "attended": {
            "description": "True if a clerk is present at the sale.",
            "type": "boolean"
          },
          "card_retention_capable": {
            "description": "True if the terminal is capable of retaining the card.",
            "type": "boolean"
          },
          "on_premise": {
            "description": "True if the sale was made at the place of business (vs. mobile).",
            "type": "boolean"
          },
          "operator": {
            "description": "The person that is designated to swipe the card",
            "enum": [
              "ADMINISTRATIVE",
              "CARDHOLDER",
              "CARD_ACCEPTOR",
              "UNKNOWN"
            ],
            "type": "string"
          },
          "partial_approval_capable": {
            "type": "boolean",
            "description": "True if the terminal is capable of partial approval. Partial approval is when part of a transaction is approved and another payment must be used for the remainder. Example scenario: A $40 transaction is attempted on a prepaid card with a $25 balance. If partial approval is enabled, $25 can be authorized, at which point the POS will prompt the user for an additional payment of $15."
          },
          "pin_capability": {
            "description": "Status of whether the POS is able to accept PINs",
            "enum": [
              "CAPABLE",
              "INOPERATIVE",
              "NOT_CAPABLE",
              "UNSPECIFIED"
            ],
            "type": "string"
          },
          "acceptor_terminal_id": {
            "description": "Uniquely identifies a terminal at the card acceptor location of acquiring institutions or merchant POS Systems",
            "type": [
              "string",
              "null"
            ]
          },
          "type": {
            "description": "POS Type",
            "enum": [
              "ADMINISTRATIVE",
              "ATM",
              "AUTHORIZATION",
              "COUPON_MACHINE",
              "DIAL_TERMINAL",
              "ECOMMERCE",
              "ECR",
              "FUEL_MACHINE",
              "HOME_TERMINAL",
              "MICR",
              "OFF_PREMISE",
              "PAYMENT",
              "PDA",
              "PHONE",
              "POINT",
              "POS_TERMINAL",
              "PUBLIC_UTILITY",
              "SELF_SERVICE",
              "TELEVISION",
              "TELLER",
              "TRAVELERS_CHECK_MACHINE",
              "VENDING",
              "VOICE",
              "UNKNOWN"
            ],
            "type": "string"
          }
        },
        "required": [
          "attended",
          "card_retention_capable",
          "on_premise",
          "operator",
          "partial_approval_capable",
          "pin_capability",
          "type"
        ]
      },
      "pos": {
        "title": "Point of Sale",
        "type": "object",
        "properties": {
          "entry_mode": {
            "$ref": "#/components/schemas/pos_entry_mode"
          },
          "terminal": {
            "$ref": "#/components/schemas/pos_terminal"
          }
        },
        "required": [
          "entry_mode",
          "terminal"
        ]
      },
      "token_info": {
        "title": "Token Info",
        "type": [
          "object",
          "null"
        ],
        "properties": {
          "wallet_type": {
            "description": "The wallet_type field will indicate the source of the token. Possible token sources include digital wallets (Apple, Google, or Samsung Pay), merchant tokenization, and “other” sources like in-flight commerce. Masterpass is not currently supported and is included for future use.",
            "enum": [
              "APPLE_PAY",
              "GOOGLE_PAY",
              "MASTERPASS",
              "MERCHANT",
              "OTHER",
              "SAMSUNG_PAY"
            ],
            "type": "string"
          }
        },
        "required": [
          "wallet_type"
        ]
      },
      "tags": {
        "title": "Tags",
        "description": "Key-value pairs for tagging resources. Tags allow you to associate arbitrary metadata with a resource for your own purposes.",
        "type": "object",
        "additionalProperties": {
          "type": "string"
        },
        "example": {
          "risk-level": "high"
        }
      },
      "card_transaction": {
        "title": "Card Transaction",
        "type": "object",
        "properties": {
          "acquirer_fee": {
            "description": "Fee assessed by the merchant and paid for by the cardholder in the smallest unit of the currency. Will be zero if no fee is assessed. Rebates may be transmitted as a negative value to indicate credited fees.",
            "example": 0,
            "type": [
              "integer",
              "null"
            ]
          },
          "acquirer_reference_number": {
            "description": "Unique identifier assigned to a transaction by the acquirer that can be used in dispute and chargeback filing. This field has been deprecated in favor of the `acquirer_reference_number` that resides in the event-level `network_info`.",
            "example": "12345678987654321234567",
            "maxLength": 23,
            "minLength": 23,
            "type": [
              "string",
              "null"
            ],
            "deprecated": true
          },
          "account_token": {
            "description": "The token for the account associated with this transaction.",
            "example": "bd5e5649-1be8-4117-9bc5-3268258d1417",
            "format": "uuid",
            "type": "string"
          },
          "amount": {
            "description": "When the transaction is pending, this represents the authorization amount of the transaction in the anticipated settlement currency. Once the transaction has settled, this field represents the settled amount in the settlement currency.",
            "example": 1000,
            "type": "integer",
            "deprecated": true
          },
          "amounts": {
            "$ref": "#/components/schemas/transaction_amounts"
          },
          "authorization_amount": {
            "description": "The authorization amount of the transaction in the anticipated settlement currency.",
            "example": 1000,
            "type": [
              "integer",
              "null"
            ],
            "deprecated": true
          },
          "authorization_code": {
            "description": "A fixed-width 6-digit numeric identifier that can be used to identify a transaction with networks.",
            "example": "123456",
            "maxLength": 6,
            "minLength": 6,
            "type": [
              "string",
              "null"
            ]
          },
          "avs": {
            "oneOf": [
              {
                "type": "null"
              },
              {
                "$ref": "#/components/schemas/avs"
              }
            ]
          },
          "card_token": {
            "description": "Token for the card used in this transaction.",
            "example": "19c22c47-7a75-43ee-9891-595419830f7e",
            "format": "uuid",
            "type": "string"
          },
          "cardholder_authentication": {
            "oneOf": [
              {
                "type": "null"
              },
              {
                "$ref": "#/components/schemas/cardholder_authentication"
              }
            ]
          },
          "created": {
            "description": "Date and time when the transaction first occurred. UTC time zone.",
            "example": "2023-09-26T21:14:28.637Z",
            "format": "date-time",
            "type": "string"
          },
          "events": {
            "items": {
              "$ref": "#/components/schemas/transaction_event"
            },
            "type": "array"
          },
          "financial_account_token": {
            "oneOf": [
              {
                "type": "null"
              },
              {
                "format": "uuid",
                "type": "string"
              }
            ]
          },
          "merchant": {
            "$ref": "#/components/schemas/merchant"
          },
          "merchant_amount": {
            "description": "Analogous to the 'amount', but in the merchant currency.",
            "example": 1000,
            "type": [
              "integer",
              "null"
            ],
            "deprecated": true
          },
          "merchant_authorization_amount": {
            "description": "Analogous to the 'authorization_amount', but in the merchant currency.",
            "example": 1000,
            "type": [
              "integer",
              "null"
            ],
            "deprecated": true
          },
          "merchant_currency": {
            "deprecated": true,
            "$ref": "#/components/schemas/merchant_currency"
          },
          "network": {
            "description": "Card network of the authorization. Value is `UNKNOWN` when Lithic cannot determine the network code from the upstream provider.",
            "enum": [
              "AMEX",
              "INTERLINK",
              "MAESTRO",
              "MASTERCARD",
              "UNKNOWN",
              "VISA"
            ],
            "example": "MASTERCARD",
            "type": [
              "string",
              "null"
            ]
          },
          "network_risk_score": {
            "$ref": "#/components/schemas/network_risk_score"
          },
          "result": {
            "$ref": "#/components/schemas/decline_result"
          },
          "pos": {
            "$ref": "#/components/schemas/pos"
          },
          "settled_amount": {
            "title": "Settled Amount",
            "description": "The settled amount of the transaction in the settlement currency.",
            "type": "integer",
            "example": 1000,
            "deprecated": true
          },
          "status": {
            "description": "Status of the transaction.",
            "enum": [
              "DECLINED",
              "EXPIRED",
              "PENDING",
              "SETTLED",
              "VOIDED"
            ],
            "example": "SETTLED",
            "type": "string"
          },
          "token": {
            "description": "Globally unique identifier.",
            "format": "uuid",
            "type": "string"
          },
          "token_info": {
            "oneOf": [
              {
                "type": "null"
              },
              {
                "$ref": "#/components/schemas/token_info"
              }
            ]
          },
          "tags": {
            "$ref": "#/components/schemas/tags"
          },
          "updated": {
            "description": "Date and time when the transaction last updated. UTC time zone.",
            "example": "2023-09-26T21:14:28.637Z",
            "format": "date-time",
            "type": "string"
          }
        },
        "required": [
          "acquirer_fee",
          "acquirer_reference_number",
          "account_token",
          "amount",
          "amounts",
          "authorization_amount",
          "authorization_code",
          "avs",
          "card_token",
          "cardholder_authentication",
          "created",
          "financial_account_token",
          "merchant_amount",
          "merchant_authorization_amount",
          "merchant_currency",
          "merchant",
          "network",
          "network_risk_score",
          "result",
          "pos",
          "settled_amount",
          "status",
          "tags",
          "token",
          "token_info",
          "updated"
        ],
        "examples": [
          {
            "account_token": "db3942f0-0627-4887-a190-1ea83b46d091",
            "acquirer_fee": 0,
            "acquirer_reference_number": null,
            "amount": 1800,
            "amounts": {
              "cardholder": {
                "amount": 0,
                "conversion_rate": "1.000000",
                "currency": "USD"
              },
              "hold": {
                "amount": -1800,
                "currency": "USD"
              },
              "merchant": {
                "amount": 0,
                "currency": "USD"
              },
              "settlement": {
                "amount": 0,
                "currency": "USD"
              }
            },
            "authorization_amount": 1800,
            "authorization_code": "071471",
            "avs": {
              "zipcode": "95006",
              "address": "123 Evergreen Terrace"
            },
            "card_token": "aac502f9-aecc-458a-954e-4bcf6edb6123",
            "cardholder_authentication": {
              "liability_shift": "3DS_AUTHENTICATED",
              "authentication_result": "SUCCESS",
              "authentication_method": "FRICTIONLESS",
              "three_ds_authentication_token": "fc60d37d-95f7-419c-b628-dd9fbf9d80d0",
              "decision_made_by": "NETWORK"
            },
            "created": "2023-08-03T18:42:30Z",
            "events": [
              {
                "amount": 1800,
                "amounts": {
                  "cardholder": {
                    "amount": 1800,
                    "conversion_rate": "1.000000",
                    "currency": "USD"
                  },
                  "merchant": {
                    "amount": 1800,
                    "currency": "USD"
                  },
                  "settlement": null
                },
                "created": "2023-08-03T18:42:30Z",
                "detailed_results": [
                  "APPROVED"
                ],
                "effective_polarity": "DEBIT",
                "network_info": {
                  "acquirer": {
                    "acquirer_reference_number": null,
                    "retrieval_reference_number": "064386558597"
                  },
                  "amex": null,
                  "mastercard": {
                    "banknet_reference_number": "U1HSCJ",
                    "switch_serial_number": null,
                    "original_banknet_reference_number": null,
                    "original_switch_serial_number": null
                  },
                  "visa": null
                },
                "result": "APPROVED",
                "rule_results": [],
                "token": "bbbf1e86-322d-11ee-9779-00505685a123",
                "type": "AUTHORIZATION"
              }
            ],
            "financial_account_token": "a3b113e8-01fe-42d3-b900-b9adf3f15496",
            "merchant": {
              "acceptor_id": "452322000053360",
              "acquiring_institution_id": "333301802529120",
              "city": "gosq.com",
              "country": "USA",
              "descriptor": "SQ *SOMA EATS",
              "mcc": "5812",
              "state": "CA"
            },
            "merchant_amount": 1800,
            "merchant_authorization_amount": 1800,
            "merchant_currency": "USD",
            "network": "MASTERCARD",
            "network_risk_score": 5,
            "pos": {
              "entry_mode": {
                "card": "NOT_PRESENT",
                "cardholder": "NOT_PRESENT",
                "pan": "ECOMMERCE",
                "pin_entered": false
              },
              "terminal": {
                "attended": false,
                "card_retention_capable": false,
                "on_premise": false,
                "operator": "UNKNOWN",
                "partial_approval_capable": false,
                "pin_capability": "NOT_CAPABLE",
                "type": "UNKNOWN"
              }
            },
            "result": "APPROVED",
            "settled_amount": 0,
            "status": "PENDING",
            "tags": {
              "risk-level": "high"
            },
            "token": "c30c2182-1e69-4e0d-b40f-eec0d2a19123",
            "token_info": {
              "wallet_type": "APPLE_PAY"
            },
            "updated": "2023-08-03T18:42:30Z"
          }
        ]
      },
      "wire_party_details": {
        "title": "Wire Party Details",
        "type": "object",
        "properties": {
          "name": {
            "type": [
              "string",
              "null"
            ],
            "description": "Name of the person or company"
          },
          "account_number": {
            "type": [
              "string",
              "null"
            ],
            "description": "Account number"
          },
          "agent_name": {
            "type": [
              "string",
              "null"
            ],
            "description": "Name of the financial institution"
          },
          "agent_id": {
            "type": [
              "string",
              "null"
            ],
            "description": "Routing number or BIC of the financial institution"
          }
        },
        "required": []
      },
      "AchMethodAttributes": {
        "type": "object",
        "properties": {
          "sec_code": {
            "type": "string",
            "enum": [
              "CCD",
              "PPD",
              "WEB",
              "TEL",
              "CIE",
              "CTX"
            ],
            "description": "SEC code for ACH transaction"
          },
          "return_reason_code": {
            "type": [
              "string",
              "null"
            ],
            "description": "Return reason code if the transaction was returned"
          },
          "ach_hold_period": {
            "type": [
              "integer",
              "null"
            ],
            "minimum": 0,
            "description": "Number of days the ACH transaction is on hold"
          },
          "retries": {
            "type": [
              "integer",
              "null"
            ],
            "minimum": 0,
            "description": "Number of retries attempted"
          },
          "company_id": {
            "type": [
              "string",
              "null"
            ],
            "description": "Company ID for the ACH transaction"
          },
          "receipt_routing_number": {
            "type": [
              "string",
              "null"
            ],
            "description": "Receipt routing number"
          },
          "trace_numbers": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "default": [],
            "description": "Trace numbers for the ACH transaction"
          },
          "addenda": {
            "type": [
              "string",
              "null"
            ],
            "description": "Addenda information"
          }
        },
        "required": [
          "sec_code"
        ]
      },
      "WireMethodAttributes": {
        "type": "object",
        "properties": {
          "wire_network": {
            "type": "string",
            "enum": [
              "FEDWIRE",
              "SWIFT"
            ],
            "description": "Type of wire transfer"
          },
          "wire_message_type": {
            "type": [
              "string",
              "null"
            ],
            "description": "Type of wire message"
          },
          "debtor": {
            "$ref": "#/components/schemas/wire_party_details"
          },
          "creditor": {
            "$ref": "#/components/schemas/wire_party_details"
          },
          "message_id": {
            "type": [
              "string",
              "null"
            ],
            "description": "Point to point reference identifier, as assigned by the instructing party, used for tracking the message through the Fedwire system"
          },
          "remittance_information": {
            "type": [
              "string",
              "null"
            ],
            "description": "Payment details or invoice reference"
          }
        },
        "required": [
          "wire_network",
          "wire_message_type"
        ]
      },
      "payment_event_type": {
        "title": "Payment Event Type",
        "description": "Event types:\n* `ACH_ORIGINATION_INITIATED` - ACH origination received and pending approval/release from an ACH hold.\n* `ACH_ORIGINATION_REVIEWED` - ACH origination has completed the review process.\n* `ACH_ORIGINATION_CANCELLED` - ACH origination has been cancelled.\n* `ACH_ORIGINATION_PROCESSED` - ACH origination has been processed and sent to the Federal Reserve.\n* `ACH_ORIGINATION_SETTLED` - ACH origination has settled.\n* `ACH_ORIGINATION_RELEASED` - ACH origination released from pending to available balance.\n* `ACH_ORIGINATION_REJECTED` - ACH origination was rejected and not sent to the Federal Reserve.\n* `ACH_RECEIPT_PROCESSED` - ACH receipt pending release from an ACH holder.\n* `ACH_RECEIPT_SETTLED` - ACH receipt funds have settled.\n* `ACH_RECEIPT_RELEASED` - ACH receipt released from pending to available balance.\n* `ACH_RETURN_INITIATED` - ACH initiated return for an ACH receipt.\n* `ACH_RETURN_PROCESSED` - ACH receipt returned by the Receiving Depository Financial Institution.\n* `ACH_RETURN_SETTLED` - ACH return settled by the Receiving Depository Financial Institution.\n* `ACH_RETURN_REJECTED` - ACH return was rejected by the Receiving Depository Financial Institution.",
        "type": "string",
        "enum": [
          "ACH_ORIGINATION_CANCELLED",
          "ACH_ORIGINATION_INITIATED",
          "ACH_ORIGINATION_PROCESSED",
          "ACH_ORIGINATION_REJECTED",
          "ACH_ORIGINATION_RELEASED",
          "ACH_ORIGINATION_REVIEWED",
          "ACH_ORIGINATION_SETTLED",
          "ACH_RECEIPT_PROCESSED",
          "ACH_RECEIPT_RELEASED",
          "ACH_RECEIPT_SETTLED",
          "ACH_RETURN_INITIATED",
          "ACH_RETURN_PROCESSED",
          "ACH_RETURN_REJECTED",
          "ACH_RETURN_SETTLED"
        ]
      },
      "payment_event": {
        "title": "Payment Event",
        "description": "Payment Event",
        "type": "object",
        "properties": {
          "amount": {
            "description": "Amount of the financial event that has been settled in the currency's smallest unit (e.g., cents).",
            "type": "integer"
          },
          "created": {
            "description": "Date and time when the financial event occurred. UTC time zone.",
            "type": "string",
            "format": "date-time"
          },
          "detailed_results": {
            "description": "More detailed reasons for the event",
            "type": "array",
            "items": {
              "type": "string",
              "enum": [
                "APPROVED",
                "DECLINED",
                "FUNDS_INSUFFICIENT",
                "ACCOUNT_INVALID",
                "PROGRAM_TRANSACTION_LIMIT_EXCEEDED",
                "PROGRAM_DAILY_LIMIT_EXCEEDED",
                "PROGRAM_MONTHLY_LIMIT_EXCEEDED"
              ]
            }
          },
          "result": {
            "description": "APPROVED financial events were successful while DECLINED financial events were declined by user, Lithic, or the network.",
            "type": "string",
            "enum": [
              "APPROVED",
              "DECLINED"
            ]
          },
          "token": {
            "description": "Globally unique identifier.",
            "type": "string",
            "format": "uuid"
          },
          "type": {
            "$ref": "#/components/schemas/payment_event_type"
          },
          "external_id": {
            "description": "Payment event external ID, for example, ACH trace number.",
            "type": [
              "string",
              "null"
            ]
          }
        },
        "required": [
          "amount",
          "created",
          "result",
          "token",
          "type"
        ]
      },
      "related_account_tokens": {
        "title": "Related Account Tokens",
        "description": "Account tokens related to a payment transaction",
        "type": "object",
        "properties": {
          "business_account_token": {
            "type": [
              "string",
              "null"
            ],
            "format": "uuid",
            "title": "Business Account Token",
            "description": "Globally unique identifier for the business account"
          },
          "account_token": {
            "type": [
              "string",
              "null"
            ],
            "format": "uuid",
            "title": "Account Token",
            "description": "Globally unique identifier for the account"
          }
        },
        "required": [
          "business_account_token",
          "account_token"
        ]
      },
      "transfer_type": {
        "type": "string",
        "enum": [
          "ORIGINATION_CREDIT",
          "ORIGINATION_DEBIT",
          "RECEIPT_CREDIT",
          "RECEIPT_DEBIT",
          "WIRE_INBOUND_PAYMENT",
          "WIRE_INBOUND_ADMIN",
          "WIRE_OUTBOUND_PAYMENT",
          "WIRE_OUTBOUND_ADMIN",
          "WIRE_INBOUND_DRAWDOWN_REQUEST"
        ],
        "title": "Transfer Type"
      },
      "payment-transaction": {
        "title": "Payment Transaction",
        "description": "Payment transaction",
        "definitions": {
          "AchMethodAttributes": {
            "type": "object",
            "properties": {
              "sec_code": {
                "type": "string",
                "enum": [
                  "CCD",
                  "PPD",
                  "WEB",
                  "TEL",
                  "CIE",
                  "CTX"
                ],
                "description": "SEC code for ACH transaction"
              },
              "return_reason_code": {
                "type": [
                  "string",
                  "null"
                ],
                "description": "Return reason code if the transaction was returned"
              },
              "ach_hold_period": {
                "type": [
                  "integer",
                  "null"
                ],
                "minimum": 0,
                "description": "Number of days the ACH transaction is on hold"
              },
              "retries": {
                "type": [
                  "integer",
                  "null"
                ],
                "minimum": 0,
                "description": "Number of retries attempted"
              },
              "company_id": {
                "type": [
                  "string",
                  "null"
                ],
                "description": "Company ID for the ACH transaction"
              },
              "receipt_routing_number": {
                "type": [
                  "string",
                  "null"
                ],
                "description": "Receipt routing number"
              },
              "trace_numbers": {
                "type": "array",
                "items": {
                  "type": "string"
                },
                "default": [],
                "description": "Trace numbers for the ACH transaction"
              },
              "addenda": {
                "type": [
                  "string",
                  "null"
                ],
                "description": "Addenda information"
              }
            },
            "required": [
              "sec_code"
            ]
          },
          "WireMethodAttributes": {
            "type": "object",
            "properties": {
              "wire_network": {
                "type": "string",
                "enum": [
                  "FEDWIRE",
                  "SWIFT"
                ],
                "description": "Type of wire transfer"
              },
              "wire_message_type": {
                "type": [
                  "string",
                  "null"
                ],
                "description": "Type of wire message"
              },
              "debtor": {
                "$ref": "#/components/schemas/wire_party_details"
              },
              "creditor": {
                "$ref": "#/components/schemas/wire_party_details"
              },
              "message_id": {
                "type": [
                  "string",
                  "null"
                ],
                "description": "Point to point reference identifier, as assigned by the instructing party, used for tracking the message through the Fedwire system"
              },
              "remittance_information": {
                "type": [
                  "string",
                  "null"
                ],
                "description": "Payment details or invoice reference"
              }
            },
            "required": [
              "wire_network",
              "wire_message_type"
            ]
          }
        },
        "allOf": [
          {
            "$ref": "#/components/schemas/base_transaction"
          },
          {
            "type": "object",
            "properties": {
              "family": {
                "type": "string",
                "const": "PAYMENT",
                "description": "PAYMENT - Payment Transaction"
              },
              "category": {
                "$ref": "#/components/schemas/transaction_category",
                "description": "Transaction category"
              },
              "currency": {
                "type": "string",
                "description": "Currency of the transaction in ISO 4217 format",
                "example": "USD"
              },
              "result": {
                "$ref": "#/components/schemas/transaction_result",
                "description": "Transaction result"
              },
              "method_attributes": {
                "oneOf": [
                  {
                    "$ref": "#/components/schemas/AchMethodAttributes"
                  },
                  {
                    "$ref": "#/components/schemas/WireMethodAttributes"
                  }
                ],
                "description": "Method-specific attributes"
              },
              "financial_account_token": {
                "type": "string",
                "format": "uuid",
                "description": "Financial account token"
              },
              "external_bank_account_token": {
                "type": [
                  "string",
                  "null"
                ],
                "format": "uuid",
                "description": "External bank account token"
              },
              "direction": {
                "type": "string",
                "enum": [
                  "CREDIT",
                  "DEBIT"
                ],
                "description": "Transfer direction"
              },
              "source": {
                "type": "string",
                "enum": [
                  "LITHIC",
                  "EXTERNAL",
                  "CUSTOMER"
                ],
                "description": "Transaction source"
              },
              "method": {
                "type": "string",
                "enum": [
                  "ACH_NEXT_DAY",
                  "ACH_SAME_DAY",
                  "WIRE"
                ],
                "description": "Transfer method"
              },
              "settled_amount": {
                "type": "integer",
                "description": "Settled amount in cents",
                "example": 500
              },
              "pending_amount": {
                "type": "integer",
                "description": "Pending amount in cents",
                "example": 200
              },
              "events": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/payment_event"
                },
                "description": "List of transaction events"
              },
              "descriptor": {
                "type": "string",
                "description": "Transaction descriptor"
              },
              "user_defined_id": {
                "type": [
                  "string",
                  "null"
                ],
                "description": "User-defined identifier"
              },
              "expected_release_date": {
                "type": [
                  "string",
                  "null"
                ],
                "format": "date",
                "description": "Expected release date for the transaction"
              },
              "related_account_tokens": {
                "oneOf": [
                  {
                    "$ref": "#/components/schemas/related_account_tokens"
                  },
                  {
                    "type": "null"
                  }
                ],
                "description": "Related account tokens for the transaction"
              },
              "type": {
                "$ref": "#/components/schemas/transfer_type"
              }
            },
            "required": [
              "category",
              "result",
              "method_attributes",
              "family",
              "financial_account_token",
              "direction",
              "source",
              "method",
              "settled_amount",
              "pending_amount",
              "events",
              "descriptor",
              "related_account_tokens"
            ]
          }
        ],
        "examples": [
          {
            "family": "PAYMENT",
            "status": "PENDING",
            "token": "bd4efddb-771b-49e3-9af9-49b077ab5eb8",
            "created": "2025-10-27T20:12:22Z",
            "updated": "2025-10-27T20:12:25Z",
            "category": "ACH",
            "result": "APPROVED",
            "method_attributes": {
              "sec_code": "CCD",
              "return_reason_code": null,
              "ach_hold_period": 1,
              "retries": 0,
              "company_id": "1111111111",
              "receipt_routing_number": null,
              "trace_numbers": [],
              "addenda": null
            },
            "financial_account_token": "35b0c466-a3e3-519a-9549-ead6a6a2277d",
            "external_bank_account_token": "feb4fee1-2414-4c38-a5f6-9deac293c8f4",
            "direction": "CREDIT",
            "source": "LITHIC",
            "method": "ACH_NEXT_DAY",
            "settled_amount": 0,
            "pending_amount": -1588,
            "currency": "USD",
            "events": [
              {
                "amount": -1588,
                "type": "ACH_ORIGINATION_INITIATED",
                "result": "APPROVED",
                "created": "2025-10-27T20:12:22Z",
                "token": "327dccc3-fe42-54d2-962c-7f8135805464",
                "detailed_results": [
                  "APPROVED"
                ]
              },
              {
                "amount": -1588,
                "type": "ACH_ORIGINATION_REVIEWED",
                "result": "APPROVED",
                "created": "2025-10-27T20:12:25Z",
                "token": "f9165477-7cfc-53c6-98f1-84e9ec856a60",
                "detailed_results": [
                  "APPROVED"
                ]
              }
            ],
            "descriptor": "ach_origination_credit",
            "user_defined_id": null,
            "expected_release_date": null,
            "related_account_tokens": null,
            "type": "ORIGINATION_CREDIT"
          },
          {
            "family": "PAYMENT",
            "status": "PENDING",
            "token": "cb35759d-8c18-4b7f-bb91-7c37936662c2",
            "created": "2025-10-27T20:12:15Z",
            "updated": "2025-10-27T20:12:18Z",
            "category": "ACH",
            "result": "APPROVED",
            "method_attributes": {
              "sec_code": "CCD",
              "return_reason_code": null,
              "ach_hold_period": 2,
              "retries": 0,
              "company_id": "1111111111",
              "receipt_routing_number": null,
              "trace_numbers": [],
              "addenda": null
            },
            "financial_account_token": "f012262b-d18f-5c26-ad63-a09a11e633a6",
            "external_bank_account_token": "feb4fee1-2414-4c38-a5f6-9deac293c8f4",
            "direction": "DEBIT",
            "source": "LITHIC",
            "method": "ACH_NEXT_DAY",
            "settled_amount": 0,
            "pending_amount": 1588,
            "currency": "USD",
            "events": [
              {
                "amount": 1588,
                "type": "ACH_ORIGINATION_INITIATED",
                "result": "APPROVED",
                "created": "2025-10-27T20:12:15Z",
                "token": "38dc6bc5-d18f-594e-9ab9-ef1cfdcfbf82",
                "detailed_results": [
                  "APPROVED"
                ]
              },
              {
                "amount": 1588,
                "type": "ACH_ORIGINATION_REVIEWED",
                "result": "APPROVED",
                "created": "2025-10-27T20:12:18Z",
                "token": "e466f34a-d648-5a8f-8bc7-1d4d1e703db3",
                "detailed_results": [
                  "APPROVED"
                ]
              }
            ],
            "descriptor": "ach_origination_debit",
            "user_defined_id": null,
            "expected_release_date": null,
            "related_account_tokens": {
              "business_account_token": null,
              "account_token": "d11bca22-39e2-475c-bbb3-6ba21e38b0d3"
            },
            "type": "ORIGINATION_DEBIT"
          },
          {
            "family": "PAYMENT",
            "status": "SETTLED",
            "token": "dd72f435-9633-46f3-b871-47d4af684654",
            "created": "2024-10-08T21:39:27Z",
            "updated": "2024-10-08T21:39:28Z",
            "category": "ACH",
            "result": "APPROVED",
            "method_attributes": {
              "sec_code": "CCD",
              "return_reason_code": null,
              "ach_hold_period": 2,
              "retries": 0,
              "company_id": "1111111111",
              "receipt_routing_number": "1234567890",
              "trace_numbers": [
                "316779406684861"
              ],
              "addenda": null
            },
            "financial_account_token": "0d6b1b9f-b90f-5f03-9c45-8930d5a6aac0",
            "external_bank_account_token": null,
            "direction": "DEBIT",
            "source": "LITHIC",
            "method": "ACH_SAME_DAY",
            "settled_amount": 1000,
            "pending_amount": 0,
            "currency": "USD",
            "events": [
              {
                "amount": 1000,
                "type": "ACH_RECEIPT_PROCESSED",
                "result": "APPROVED",
                "created": "2024-10-08T21:39:27Z",
                "token": "99ff8ea0-2355-57fc-aa9d-0e953f64ba4f",
                "detailed_results": [
                  "APPROVED"
                ]
              },
              {
                "amount": 1000,
                "type": "ACH_RECEIPT_SETTLED",
                "result": "APPROVED",
                "created": "2024-10-08T21:39:28Z",
                "token": "33d0ae98-310c-5b50-a012-1bcd8edb9254",
                "detailed_results": [
                  "APPROVED"
                ]
              }
            ],
            "descriptor": "ach_receipt_credit",
            "user_defined_id": null,
            "expected_release_date": null,
            "related_account_tokens": null,
            "type": "RECEIPT_CREDIT"
          }
        ]
      },
      "external_payment_category": {
        "title": "External Payment Category",
        "type": "string",
        "enum": [
          "EXTERNAL_WIRE",
          "EXTERNAL_ACH",
          "EXTERNAL_CHECK",
          "EXTERNAL_FEDNOW",
          "EXTERNAL_RTP",
          "EXTERNAL_TRANSFER"
        ]
      },
      "external_payment_event_type": {
        "title": "External Payment Event Type",
        "type": "string",
        "enum": [
          "EXTERNAL_WIRE_INITIATED",
          "EXTERNAL_WIRE_CANCELED",
          "EXTERNAL_WIRE_SETTLED",
          "EXTERNAL_WIRE_REVERSED",
          "EXTERNAL_WIRE_RELEASED",
          "EXTERNAL_ACH_INITIATED",
          "EXTERNAL_ACH_CANCELED",
          "EXTERNAL_ACH_SETTLED",
          "EXTERNAL_ACH_REVERSED",
          "EXTERNAL_ACH_RELEASED",
          "EXTERNAL_TRANSFER_INITIATED",
          "EXTERNAL_TRANSFER_CANCELED",
          "EXTERNAL_TRANSFER_SETTLED",
          "EXTERNAL_TRANSFER_REVERSED",
          "EXTERNAL_TRANSFER_RELEASED",
          "EXTERNAL_CHECK_INITIATED",
          "EXTERNAL_CHECK_CANCELED",
          "EXTERNAL_CHECK_SETTLED",
          "EXTERNAL_CHECK_REVERSED",
          "EXTERNAL_CHECK_RELEASED",
          "EXTERNAL_FEDNOW_INITIATED",
          "EXTERNAL_FEDNOW_CANCELED",
          "EXTERNAL_FEDNOW_SETTLED",
          "EXTERNAL_FEDNOW_REVERSED",
          "EXTERNAL_FEDNOW_RELEASED",
          "EXTERNAL_RTP_INITIATED",
          "EXTERNAL_RTP_CANCELED",
          "EXTERNAL_RTP_SETTLED",
          "EXTERNAL_RTP_REVERSED",
          "EXTERNAL_RTP_RELEASED"
        ]
      },
      "external_payment_event": {
        "title": "External Payment Event",
        "type": "object",
        "properties": {
          "amount": {
            "type": "integer"
          },
          "type": {
            "$ref": "#/components/schemas/external_payment_event_type"
          },
          "result": {
            "$ref": "#/components/schemas/transaction_result"
          },
          "detailed_results": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/detailed_results"
            }
          },
          "created": {
            "type": "string",
            "format": "date-time"
          },
          "token": {
            "type": "string",
            "format": "uuid"
          },
          "memo": {
            "type": "string"
          },
          "effective_date": {
            "type": "string",
            "format": "date"
          }
        },
        "required": [
          "amount",
          "type",
          "result",
          "detailed_results",
          "created",
          "token",
          "memo",
          "effective_date"
        ]
      },
      "external_payment_direction": {
        "title": "External Payment Direction",
        "type": "string",
        "enum": [
          "DEPOSIT",
          "WITHDRAWAL"
        ]
      },
      "external_payment_response": {
        "title": "External Payment Response",
        "allOf": [
          {
            "$ref": "#/components/schemas/base_transaction"
          },
          {
            "type": "object",
            "properties": {
              "family": {
                "type": "string",
                "const": "EXTERNAL_PAYMENT",
                "description": "EXTERNAL_PAYMENT - External Payment Response"
              },
              "result": {
                "$ref": "#/components/schemas/transaction_result"
              },
              "category": {
                "$ref": "#/components/schemas/external_payment_category"
              },
              "settled_amount": {
                "type": "integer"
              },
              "pending_amount": {
                "type": "integer"
              },
              "currency": {
                "type": "string"
              },
              "events": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/external_payment_event"
                }
              },
              "user_defined_id": {
                "type": [
                  "string",
                  "null"
                ]
              },
              "financial_account_token": {
                "type": "string",
                "format": "uuid"
              },
              "payment_type": {
                "$ref": "#/components/schemas/external_payment_direction"
              }
            }
          }
        ],
        "required": [
          "result",
          "category",
          "family",
          "settled_amount",
          "pending_amount",
          "currency",
          "events",
          "financial_account_token",
          "payment_type"
        ]
      },
      "management_operation_category": {
        "title": "Management Operation Category",
        "type": "string",
        "enum": [
          "MANAGEMENT_FEE",
          "MANAGEMENT_DISPUTE",
          "MANAGEMENT_REWARD",
          "MANAGEMENT_ADJUSTMENT",
          "MANAGEMENT_DISBURSEMENT"
        ]
      },
      "management_operation_event_type": {
        "title": "Management Operation Event Type",
        "type": "string",
        "enum": [
          "LOSS_WRITE_OFF",
          "CASH_BACK",
          "CASH_BACK_REVERSAL",
          "CURRENCY_CONVERSION",
          "CURRENCY_CONVERSION_REVERSAL",
          "INTEREST",
          "INTEREST_REVERSAL",
          "LATE_PAYMENT",
          "LATE_PAYMENT_REVERSAL",
          "BILLING_ERROR",
          "BILLING_ERROR_REVERSAL",
          "PROVISIONAL_CREDIT",
          "PROVISIONAL_CREDIT_REVERSAL",
          "RETURNED_PAYMENT",
          "RETURNED_PAYMENT_REVERSAL",
          "DISPUTE_WON",
          "DISPUTE_WON_REVERSAL",
          "DISBURSE",
          "DISBURSE_REVERSAL",
          "ANNUAL",
          "ANNUAL_REVERSAL",
          "QUARTERLY",
          "QUARTERLY_REVERSAL",
          "MONTHLY",
          "MONTHLY_REVERSAL"
        ]
      },
      "management_operation_event": {
        "title": "Management Operation Event",
        "type": "object",
        "properties": {
          "amount": {
            "type": "integer"
          },
          "type": {
            "$ref": "#/components/schemas/management_operation_event_type"
          },
          "subtype": {
            "type": [
              "string",
              "null"
            ]
          },
          "result": {
            "$ref": "#/components/schemas/transaction_result"
          },
          "detailed_results": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/detailed_results"
            }
          },
          "created": {
            "type": "string",
            "format": "date-time"
          },
          "token": {
            "type": "string",
            "format": "uuid"
          },
          "memo": {
            "type": "string"
          },
          "effective_date": {
            "type": "string",
            "format": "date"
          }
        },
        "required": [
          "amount",
          "type",
          "result",
          "detailed_results",
          "created",
          "token",
          "memo",
          "effective_date"
        ]
      },
      "management_operation_direction": {
        "title": "Management Operation Direction",
        "type": "string",
        "enum": [
          "CREDIT",
          "DEBIT"
        ]
      },
      "management_operation_transaction": {
        "title": "Management Operation Transaction",
        "allOf": [
          {
            "$ref": "#/components/schemas/base_transaction"
          },
          {
            "type": "object",
            "properties": {
              "family": {
                "type": "string",
                "const": "MANAGEMENT_OPERATION",
                "description": "MANAGEMENT_OPERATION - Management Operation Transaction"
              },
              "result": {
                "$ref": "#/components/schemas/transaction_result"
              },
              "category": {
                "$ref": "#/components/schemas/management_operation_category"
              },
              "settled_amount": {
                "type": "integer"
              },
              "pending_amount": {
                "type": "integer"
              },
              "currency": {
                "type": "string"
              },
              "events": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/management_operation_event"
                }
              },
              "user_defined_id": {
                "type": [
                  "string",
                  "null"
                ]
              },
              "financial_account_token": {
                "type": "string",
                "format": "uuid"
              },
              "direction": {
                "$ref": "#/components/schemas/management_operation_direction"
              },
              "transaction_series": {
                "oneOf": [
                  {
                    "$ref": "#/components/schemas/transaction_series"
                  },
                  {
                    "type": "null"
                  }
                ]
              },
              "external_resource": {
                "oneOf": [
                  {
                    "$ref": "#/components/schemas/external_resource"
                  },
                  {
                    "type": "null"
                  }
                ]
              }
            }
          }
        ],
        "required": [
          "result",
          "category",
          "family",
          "settled_amount",
          "pending_amount",
          "currency",
          "events",
          "financial_account_token",
          "direction",
          "transaction_series"
        ]
      },
      "settlement-summary-details": {
        "title": "settlement Summary Details",
        "properties": {
          "currency": {
            "description": "3-character alphabetic ISO 4217 code.",
            "example": "USD",
            "maxLength": 3,
            "minLength": 3,
            "type": "string"
          },
          "disputes_gross_amount": {
            "description": "The total gross amount of disputes settlements.",
            "example": 0,
            "type": "integer"
          },
          "institution": {
            "description": "The most granular ID the network settles with (e.g., ICA for Mastercard, FTSRE for Visa).",
            "example": "00001",
            "type": "string"
          },
          "interchange_gross_amount": {
            "description": "The total amount of interchange.",
            "example": -7,
            "type": "integer"
          },
          "network": {
            "description": "Card network where the transaction took place",
            "enum": [
              "INTERLINK",
              "MAESTRO",
              "MASTERCARD",
              "UNKNOWN",
              "VISA"
            ],
            "example": "MASTERCARD",
            "type": "string"
          },
          "other_fees_gross_amount": {
            "description": "Total amount of gross other fees outside of interchange.",
            "example": 0,
            "type": "integer"
          },
          "settled_net_amount": {
            "description": "The total net amount of cash moved. (net value of settled_gross_amount, interchange, fees).",
            "example": 1893,
            "type": "integer"
          },
          "transactions_gross_amount": {
            "description": "The total amount of settlement impacting transactions (excluding interchange, fees, and disputes).",
            "example": 1900,
            "type": "integer"
          }
        },
        "type": "object"
      },
      "settlement-report": {
        "title": "Settlement Report",
        "properties": {
          "created": {
            "description": "Date and time when the transaction first occurred. UTC time zone.",
            "example": "2023-06-01T00:00:00",
            "format": "date-time",
            "type": "string"
          },
          "currency": {
            "description": "3-character alphabetic ISO 4217 code. (This field is deprecated and will be removed in a future version of the API.)",
            "example": "USD",
            "maxLength": 3,
            "minLength": 3,
            "type": "string",
            "deprecated": true
          },
          "details": {
            "items": {
              "$ref": "#/components/schemas/settlement-summary-details"
            },
            "type": "array"
          },
          "disputes_gross_amount": {
            "description": "The total gross amount of disputes settlements. (This field is deprecated and will be removed in a future version of the API. To compute total amounts, Lithic recommends that customers sum the relevant settlement amounts found within `details`.)",
            "example": 0,
            "type": "integer",
            "deprecated": true
          },
          "interchange_gross_amount": {
            "description": "The total amount of interchange. (This field is deprecated and will be removed in a future version of the API. To compute total amounts, Lithic recommends that customers sum the relevant settlement amounts found within `details`.)",
            "example": -7,
            "type": "integer",
            "deprecated": true
          },
          "is_complete": {
            "description": "Indicates that all data expected on the given report date is available.",
            "type": "boolean"
          },
          "other_fees_gross_amount": {
            "description": "Total amount of gross other fees outside of interchange. (This field is deprecated and will be removed in a future version of the API. To compute total amounts, Lithic recommends that customers sum the relevant settlement amounts found within `details`.)",
            "example": 0,
            "type": "integer",
            "deprecated": true
          },
          "report_date": {
            "description": "Date of when the report was first generated.",
            "example": "2023-06-01",
            "type": "string"
          },
          "settled_net_amount": {
            "description": "The total net amount of cash moved. (net value of settled_gross_amount, interchange, fees). (This field is deprecated and will be removed in a future version of the API. To compute total amounts, Lithic recommends that customers sum the relevant settlement amounts found within `details`.)",
            "example": 1893,
            "type": "integer",
            "deprecated": true
          },
          "transactions_gross_amount": {
            "description": "The total amount of settlement impacting transactions (excluding interchange, fees, and disputes). (This field is deprecated and will be removed in a future version of the API. To compute total amounts, Lithic recommends that customers sum the relevant settlement amounts found within `details`.)",
            "example": 1900,
            "type": "integer",
            "deprecated": true
          },
          "updated": {
            "description": "Date and time when the transaction first occurred. UTC time zone.",
            "example": "2023-06-01T00:00:00",
            "format": "date-time",
            "type": "string"
          }
        },
        "required": [
          "created",
          "currency",
          "details",
          "disputes_gross_amount",
          "interchange_gross_amount",
          "is_complete",
          "other_fees_gross_amount",
          "report_date",
          "settled_net_amount",
          "transactions_gross_amount",
          "updated"
        ],
        "type": "object"
      },
      "network_total": {
        "title": "Network Total",
        "type": "object",
        "required": [
          "token",
          "network",
          "institution_id",
          "settlement_institution_id",
          "settlement_service",
          "report_date",
          "currency",
          "is_complete",
          "amounts",
          "created",
          "updated"
        ],
        "properties": {
          "token": {
            "type": "string",
            "format": "uuid",
            "description": "Globally unique identifier."
          },
          "network": {
            "type": "string",
            "enum": [
              "AMEX",
              "VISA",
              "MASTERCARD",
              "MAESTRO",
              "INTERLINK"
            ],
            "description": "Card network where the transaction took place. AMEX, VISA, MASTERCARD, MAESTRO, or INTERLINK."
          },
          "institution_id": {
            "type": "string",
            "description": "The institution that activity occurred on. For Mastercard: ICA (Interbank Card Association). For Maestro: institution ID. For Visa: lowest level SRE (Settlement Reporting Entity)."
          },
          "settlement_institution_id": {
            "type": "string",
            "description": "The institution responsible for settlement. For Mastercard: same as `institution_id`. For Maestro: billing ICA. For Visa: Funds Transfer SRE (FTSRE)."
          },
          "settlement_service": {
            "type": "string",
            "description": "Settlement service."
          },
          "report_date": {
            "type": "string",
            "format": "date",
            "description": "Date that the network total record applies to. YYYY-MM-DD format."
          },
          "cycle": {
            "type": "integer",
            "description": "The clearing cycle that the network total record applies to. Mastercard only."
          },
          "currency": {
            "type": "string",
            "description": "3-character alphabetic ISO 4217 code."
          },
          "is_complete": {
            "type": "boolean",
            "description": "Indicates that all settlement records related to this Network Total are available in the details endpoint."
          },
          "amounts": {
            "type": "object",
            "required": [
              "gross_settlement",
              "interchange_fees",
              "net_settlement"
            ],
            "properties": {
              "gross_settlement": {
                "type": "integer",
                "description": "Total settlement amount excluding interchange, in currency's smallest unit."
              },
              "interchange_fees": {
                "type": "integer",
                "description": "Interchange amount, in currency's smallest unit."
              },
              "visa_charges": {
                "type": "integer",
                "description": "Charges specific to Visa/Interlink, in currency's smallest unit."
              },
              "net_settlement": {
                "type": "integer",
                "description": "`gross_settlement` net of `interchange_fees` and `visa_charges` (if applicable), in currency's smallest unit."
              }
            }
          },
          "created": {
            "type": "string",
            "format": "date-time",
            "description": "RFC 3339 timestamp for when the record was created. UTC time zone."
          },
          "updated": {
            "type": "string",
            "format": "date-time",
            "description": "RFC 3339 timestamp for when the record was last updated. UTC time zone."
          }
        },
        "examples": [
          {
            "token": "12cf7505-06a8-435e-b1c7-4c430d02f6c3",
            "network": "VISA",
            "institution_id": "1000000000",
            "settlement_institution_id": "1000000001",
            "settlement_service": "015",
            "report_date": "2025-02-25",
            "currency": "CAD",
            "is_complete": true,
            "amounts": {
              "gross_settlement": 100,
              "interchange_fees": -25,
              "visa_charges": 10,
              "net_settlement": 85
            },
            "created": "2025-02-25T13:07:31.419631Z",
            "updated": "2025-02-25T13:07:31.419631Z"
          }
        ]
      },
      "tokenization-event-outcome": {
        "title": "Tokenization Event Outcome",
        "description": "Enum representing the result of the tokenization event",
        "type": "string",
        "enum": [
          "APPROVED",
          "DECLINED",
          "NOTIFICATION_DELIVERED",
          "REQUIRE_ADDITIONAL_AUTHENTICATION",
          "TOKEN_ACTIVATED",
          "TOKEN_CREATED",
          "TOKEN_DEACTIVATED",
          "TOKEN_DELETED_FROM_CONSUMER_APP",
          "TOKEN_INACTIVE",
          "TOKEN_STATE_UNKNOWN",
          "TOKEN_SUSPENDED",
          "TOKEN_UPDATED"
        ]
      },
      "tokenization-decline-reason": {
        "title": "Tokenization Decline Reason",
        "description": "Reason code for why a tokenization was declined",
        "type": "string",
        "enum": [
          "ACCOUNT_SCORE_1",
          "DEVICE_SCORE_1",
          "ALL_WALLET_DECLINE_REASONS_PRESENT",
          "WALLET_RECOMMENDED_DECISION_RED",
          "CVC_MISMATCH",
          "CARD_EXPIRY_MONTH_MISMATCH",
          "CARD_EXPIRY_YEAR_MISMATCH",
          "CARD_INVALID_STATE",
          "CUSTOMER_RED_PATH",
          "INVALID_CUSTOMER_RESPONSE",
          "NETWORK_FAILURE",
          "GENERIC_DECLINE",
          "DIGITAL_CARD_ART_REQUIRED"
        ]
      },
      "tokenization-tfa-reason": {
        "title": "Tokenization TFA Reason",
        "description": "Reason code for why a tokenization required two-factor authentication",
        "type": "string",
        "enum": [
          "WALLET_RECOMMENDED_TFA",
          "SUSPICIOUS_ACTIVITY",
          "DEVICE_RECENTLY_LOST",
          "TOO_MANY_RECENT_ATTEMPTS",
          "TOO_MANY_RECENT_TOKENS",
          "TOO_MANY_DIFFERENT_CARDHOLDERS",
          "OUTSIDE_HOME_TERRITORY",
          "HAS_SUSPENDED_TOKENS",
          "HIGH_RISK",
          "ACCOUNT_SCORE_LOW",
          "DEVICE_SCORE_LOW",
          "CARD_STATE_TFA",
          "HARDCODED_TFA",
          "CUSTOMER_RULE_TFA",
          "DEVICE_HOST_CARD_EMULATION"
        ]
      },
      "tokenization-rule-result": {
        "title": "Tokenization Rule Result",
        "type": "object",
        "properties": {
          "auth_rule_token": {
            "description": "The Auth Rule Token associated with the rule. If this is set to null, then the result was not associated with a customer-configured rule. This may happen in cases where a tokenization is declined or requires TFA due to a Lithic-configured security or compliance rule, for example.",
            "oneOf": [
              {
                "type": "null"
              },
              {
                "type": "string",
                "format": "uuid"
              }
            ]
          },
          "result": {
            "description": "The result associated with this rule",
            "type": "string",
            "enum": [
              "APPROVED",
              "DECLINED",
              "REQUIRE_TFA",
              "ERROR"
            ]
          },
          "name": {
            "description": "The name for the rule, if any was configured",
            "oneOf": [
              {
                "type": "null"
              },
              {
                "type": "string"
              }
            ]
          },
          "explanation": {
            "description": "A human-readable explanation outlining the motivation for the rule's result",
            "oneOf": [
              {
                "type": "null"
              },
              {
                "type": "string"
              }
            ]
          }
        },
        "required": [
          "auth_rule_token",
          "result",
          "name",
          "explanation"
        ]
      },
      "tokenization-event": {
        "title": "Tokenization Event",
        "properties": {
          "created_at": {
            "description": "Date and time when the tokenization event first occurred. UTC time zone.",
            "format": "date-time",
            "type": "string"
          },
          "result": {
            "$ref": "#/components/schemas/tokenization-event-outcome"
          },
          "token": {
            "description": "Globally unique identifier for a Tokenization Event",
            "format": "uuid",
            "type": "string"
          },
          "type": {
            "description": "Enum representing the type of tokenization event that occurred",
            "enum": [
              "TOKENIZATION_2FA",
              "TOKENIZATION_AUTHORIZATION",
              "TOKENIZATION_DECISIONING",
              "TOKENIZATION_ELIGIBILITY_CHECK",
              "TOKENIZATION_UPDATED"
            ],
            "type": "string"
          },
          "tokenization_decline_reasons": {
            "description": "List of reasons why the tokenization was declined",
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/tokenization-decline-reason"
            }
          },
          "tokenization_tfa_reasons": {
            "description": "List of reasons why two-factor authentication was required",
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/tokenization-tfa-reason"
            }
          },
          "rule_results": {
            "description": "Results from rules that were evaluated for this tokenization",
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/tokenization-rule-result"
            }
          }
        }
      },
      "tokenization": {
        "title": "Tokenization",
        "properties": {
          "account_token": {
            "description": "The account token associated with the card being tokenized.",
            "format": "uuid",
            "type": "string"
          },
          "card_token": {
            "description": "The card token associated with the card being tokenized.",
            "format": "uuid",
            "type": "string"
          },
          "created_at": {
            "description": "Date and time when the tokenization first occurred. UTC time zone.",
            "format": "date-time",
            "type": "string"
          },
          "device_id": {
            "description": "The device identifier associated with the tokenization.",
            "type": [
              "string",
              "null"
            ]
          },
          "digital_card_art_token": {
            "description": "Specifies the digital card art displayed in the user's digital wallet after tokenization. This will be null if the tokenization was created without an associated digital card art. See [Flexible Card Art Guide](https://docs.lithic.com/docs/about-digital-wallets#flexible-card-art).",
            "format": "uuid",
            "type": [
              "string",
              "null"
            ]
          },
          "events": {
            "description": "A list of events related to the tokenization.",
            "items": {
              "$ref": "#/components/schemas/tokenization-event"
            },
            "type": "array"
          },
          "status": {
            "description": "The status of the tokenization request",
            "enum": [
              "ACTIVE",
              "DEACTIVATED",
              "INACTIVE",
              "PAUSED",
              "PENDING_2FA",
              "PENDING_ACTIVATION",
              "UNKNOWN"
            ],
            "type": "string"
          },
          "token": {
            "description": "Globally unique identifier for a Tokenization",
            "format": "uuid",
            "type": "string"
          },
          "token_requestor_name": {
            "description": "The entity that requested the tokenization. For digital wallets, this will be one of the defined wallet types. For merchant tokenizations, this will be a free-form merchant name string.",
            "anyOf": [
              {
                "title": "Digital wallet type",
                "description": "Digital wallet type",
                "enum": [
                  "AMAZON_ONE",
                  "ANDROID_PAY",
                  "APPLE_PAY",
                  "FACEBOOK",
                  "FITBIT_PAY",
                  "GARMIN_PAY",
                  "GOOGLE_PAY",
                  "MICROSOFT_PAY",
                  "NETFLIX",
                  "SAMSUNG_PAY",
                  "UNKNOWN",
                  "VISA_CHECKOUT"
                ],
                "type": "string"
              },
              {
                "title": "Merchant name",
                "description": "Merchant name for merchant tokenizations",
                "type": "string"
              }
            ]
          },
          "token_unique_reference": {
            "description": "The network's unique reference for the tokenization.",
            "type": "string"
          },
          "dpan": {
            "description": "The dynamic pan assigned to the token by the network.",
            "type": [
              "string",
              "null"
            ]
          },
          "payment_account_reference_id": {
            "description": "The network's unique reference for the card that is tokenized.",
            "type": [
              "string",
              "null"
            ]
          },
          "tokenization_channel": {
            "description": "The channel through which the tokenization was made.",
            "enum": [
              "DIGITAL_WALLET",
              "MERCHANT"
            ],
            "type": "string"
          },
          "updated_at": {
            "description": "Latest date and time when the tokenization was updated. UTC time zone.",
            "format": "date-time",
            "type": "string"
          }
        },
        "required": [
          "account_token",
          "card_token",
          "created_at",
          "status",
          "token",
          "token_requestor_name",
          "token_unique_reference",
          "dpan",
          "tokenization_channel",
          "updated_at"
        ],
        "type": "object"
      },
      "address_match_result": {
        "title": "Address Match Result",
        "description": "Lithic's evaluation result comparing the transaction's address data with the cardholder KYC data if it exists. In the event Lithic does not have any Cardholder KYC data, or the transaction does not contain any address data, NOT_PRESENT will be returned",
        "type": "string",
        "enum": [
          "MATCH",
          "MATCH_ADDRESS_ONLY",
          "MATCH_ZIP_ONLY",
          "MISMATCH",
          "NOT_PRESENT"
        ]
      },
      "authentication": {
        "title": "3DS Authentication object",
        "type": "object",
        "description": "Represents a 3DS authentication",
        "properties": {
          "account_type": {
            "type": [
              "string",
              "null"
            ],
            "description": "Type of account/card that is being used for the transaction. Maps to EMV 3DS field `acctType`.",
            "enum": [
              "CREDIT",
              "DEBIT",
              "NOT_APPLICABLE",
              null
            ]
          },
          "additional_data": {
            "type": [
              "object",
              "null"
            ],
            "description": "Object containing additional data about the 3DS request that is beyond the EMV 3DS standard spec (e.g., specific fields that only certain card networks send but are not required across all 3DS requests).",
            "properties": {
              "network_decision": {
                "type": [
                  "string",
                  "null"
                ],
                "description": "Mastercard only: Indicates whether the network would have considered the authentication request to be low risk or not.",
                "enum": [
                  "LOW_RISK",
                  "NOT_LOW_RISK",
                  null
                ]
              },
              "network_risk_score": {
                "type": [
                  "integer",
                  "null"
                ],
                "description": "Mastercard only: Assessment by the network of the authentication risk level, with a higher value indicating a higher amount of risk. Permitted values: Integer between 0-950, in increments of 50."
              }
            },
            "required": []
          },
          "app": {
            "type": [
              "object",
              "null"
            ],
            "description": "Object containing data about the app used in the e-commerce transaction. Present if the channel is 'APP_BASED'.",
            "properties": {
              "device_info": {
                "type": [
                  "string",
                  "null"
                ],
                "description": "Raw device information - base64-encoded JSON object. Maps to EMV 3DS field `deviceInfo`."
              },
              "ip": {
                "type": [
                  "string",
                  "null"
                ],
                "description": "IP address of the device."
              },
              "platform": {
                "type": [
                  "string",
                  "null"
                ],
                "description": "Device platform: Android, iOS, Windows, etc."
              },
              "device": {
                "type": [
                  "string",
                  "null"
                ],
                "description": "Device model: e.g. \"Apple iPhone 16\"."
              },
              "os": {
                "type": [
                  "string",
                  "null"
                ],
                "description": "Operating System: e.g. \"Android 12\", \"iOS 17.1\"."
              },
              "locale": {
                "type": [
                  "string",
                  "null"
                ],
                "description": "Device locale: e.g. \"en-US\"."
              },
              "time_zone": {
                "type": [
                  "string",
                  "null"
                ],
                "description": "Time zone offset in minutes between UTC and device local time."
              },
              "screen_width": {
                "type": [
                  "integer",
                  "null"
                ],
                "description": "Screen width in pixels."
              },
              "screen_height": {
                "type": [
                  "integer",
                  "null"
                ],
                "description": "Screen height in pixels."
              },
              "latitude": {
                "type": [
                  "number",
                  "null"
                ],
                "description": "Latitude coordinate of current device location.",
                "minimum": -90,
                "maximum": 90
              },
              "longitude": {
                "type": [
                  "number",
                  "null"
                ],
                "description": "Longitude coordinate of current device location.",
                "minimum": -180,
                "maximum": 180
              }
            },
            "required": []
          },
          "authentication_request_type": {
            "type": [
              "string",
              "null"
            ],
            "description": "Type of authentication request - i.e., the type of transaction or interaction is causing the merchant to request an authentication. Maps to EMV 3DS field `threeDSRequestorAuthenticationInd`.",
            "enum": [
              "ADD_CARD",
              "BILLING_AGREEMENT",
              "DELAYED_SHIPMENT",
              "EMV_TOKEN_CARDHOLDER_VERIFICATION",
              "INSTALLMENT_TRANSACTION",
              "MAINTAIN_CARD",
              "PAYMENT_TRANSACTION",
              "RECURRING_TRANSACTION",
              "SPLIT_PAYMENT",
              "SPLIT_SHIPMENT",
              null
            ]
          },
          "authentication_result": {
            "type": [
              "string"
            ],
            "description": "Indicates the outcome of the 3DS authentication process.",
            "enum": [
              "DECLINE",
              "SUCCESS",
              "PENDING_CHALLENGE",
              "PENDING_DECISION"
            ]
          },
          "browser": {
            "type": [
              "object",
              "null"
            ],
            "description": "Object containing data about the browser used in the e-commerce transaction. Present if the channel is 'BROWSER'.",
            "properties": {
              "accept_header": {
                "type": [
                  "string",
                  "null"
                ],
                "description": "Content of the HTTP accept headers as sent from the cardholder's browser to the 3DS requestor (e.g., merchant or digital wallet)."
              },
              "ip": {
                "anyOf": [
                  {
                    "type": "string",
                    "format": "ipv4"
                  },
                  {
                    "type": "string",
                    "format": "ipv6"
                  },
                  {
                    "type": "null"
                  }
                ],
                "description": "IP address of the browser as returned by the HTTP headers to the 3DS requestor (e.g., merchant or digital wallet). Maps to EMV 3DS field `browserIP`."
              },
              "java_enabled": {
                "type": [
                  "boolean",
                  "null"
                ],
                "description": "Indicates whether the cardholder's browser has the ability to execute Java. Maps to EMV 3DS field `browserJavaEnabled`."
              },
              "javascript_enabled": {
                "type": [
                  "boolean",
                  "null"
                ],
                "description": "Indicates whether the cardholder's browser has the ability to execute JavaScript. Maps to EMV 3DS field `browserJavascriptEnabled`."
              },
              "language": {
                "type": [
                  "string",
                  "null"
                ],
                "description": "Language of the cardholder's browser as defined in IETF BCP47. Maps to EMV 3DS field `browserLanguage`."
              },
              "time_zone": {
                "type": [
                  "string",
                  "null"
                ],
                "description": "Time zone offset in minutes between UTC and browser local time. Maps to EMV 3DS field `browserTz`."
              },
              "user_agent": {
                "type": [
                  "string",
                  "null"
                ],
                "description": "Content of the HTTP user-agent header. Maps to EMV 3DS field `browserUserAgent`."
              }
            },
            "required": []
          },
          "card_expiry_check": {
            "type": "string",
            "description": "Indicates whether the expiration date provided by the cardholder during checkout matches Lithic's record of the card's expiration date.",
            "enum": [
              "MATCH",
              "MISMATCH",
              "NOT_PRESENT"
            ]
          },
          "card_token": {
            "type": "string",
            "description": "Globally unique identifier for the card on which the 3DS authentication has occurred. Permitted values: 36-digit version 4 UUID (including hyphens).",
            "format": "uuid"
          },
          "cardholder": {
            "type": "object",
            "description": "Object containing data about the cardholder provided during the transaction.",
            "properties": {
              "address_match": {
                "type": [
                  "boolean",
                  "null"
                ],
                "description": "Indicates whether the shipping address and billing address provided by the cardholder are the same. This value - and assessment of whether the addresses match - is provided directly in the 3DS request and is not determined by Lithic. Maps to EMV 3DS field `addrMatch`."
              },
              "address_on_file_match": {
                "$ref": "#/components/schemas/address_match_result"
              },
              "billing_address": {
                "type": "object",
                "description": "Object containing data on the billing address provided during the transaction.",
                "properties": {
                  "address1": {
                    "type": [
                      "string",
                      "null"
                    ],
                    "description": "First line of the street address provided by the cardholder."
                  },
                  "address2": {
                    "type": [
                      "string",
                      "null"
                    ],
                    "description": "Second line of the street address provided by the cardholder."
                  },
                  "address3": {
                    "type": [
                      "string",
                      "null"
                    ],
                    "description": "Third line of the street address provided by the cardholder."
                  },
                  "city": {
                    "type": [
                      "string",
                      "null"
                    ],
                    "description": "City of the address provided by the cardholder."
                  },
                  "country": {
                    "type": [
                      "string",
                      "null"
                    ],
                    "description": "Country of the address provided by the cardholder in ISO 3166-1 alpha-3 format (e.g. USA)",
                    "minLength": 3,
                    "maxLength": 3
                  },
                  "postal_code": {
                    "type": [
                      "string",
                      "null"
                    ],
                    "description": "Postal code (e.g., ZIP code) of the address provided by the cardholder"
                  }
                }
              },
              "email": {
                "type": [
                  "string",
                  "null"
                ],
                "description": "Email address that is either provided by the cardholder or is on file with the merchant in a 3RI request. Maps to EMV 3DS field `email`.",
                "maxLength": 254,
                "minLength": 1
              },
              "name": {
                "type": [
                  "string",
                  "null"
                ],
                "description": "Name of the cardholder. Maps to EMV 3DS field `cardholderName`.",
                "maxLength": 45,
                "minLength": 1
              },
              "phone_number_home": {
                "type": [
                  "string",
                  "null"
                ],
                "description": "Home phone number in E.164 format provided by the cardholder. Maps to EMV 3DS fields `homePhone.cc` and `homePhone.subscriber`.",
                "maxLength": 16,
                "minLength": 1
              },
              "phone_number_mobile": {
                "type": [
                  "string",
                  "null"
                ],
                "description": "Mobile/cell phone number in E.164 format provided by the cardholder. Maps to EMV 3DS fields `mobilePhone.cc` and `mobilePhone.subscriber`.",
                "maxLength": 16,
                "minLength": 1
              },
              "phone_number_work": {
                "type": [
                  "string",
                  "null"
                ],
                "description": "Work phone number in E.164 format provided by the cardholder. Maps to EMV 3DS fields `workPhone.cc` and `workPhone.subscriber`.",
                "maxLength": 16,
                "minLength": 1
              },
              "shipping_address": {
                "type": "object",
                "description": "Object containing data on the shipping address provided during the transaction.",
                "properties": {
                  "address1": {
                    "type": [
                      "string",
                      "null"
                    ],
                    "description": "First line of the street address provided by the cardholder."
                  },
                  "address2": {
                    "type": [
                      "string",
                      "null"
                    ],
                    "description": "Second line of the street address provided by the cardholder."
                  },
                  "address3": {
                    "type": [
                      "string",
                      "null"
                    ],
                    "description": "Third line of the street address provided by the cardholder."
                  },
                  "city": {
                    "type": [
                      "string",
                      "null"
                    ],
                    "description": "City of the address provided by the cardholder."
                  },
                  "country": {
                    "type": [
                      "string",
                      "null"
                    ],
                    "description": "Country of the address provided by the cardholder in ISO 3166-1 alpha-3 format (e.g. USA)",
                    "minLength": 3,
                    "maxLength": 3
                  },
                  "postal_code": {
                    "type": [
                      "string",
                      "null"
                    ],
                    "description": "Postal code (e.g., ZIP code) of the address provided by the cardholder"
                  }
                }
              }
            },
            "required": []
          },
          "challenge_metadata": {
            "type": [
              "object",
              "null"
            ],
            "description": "Metadata about the challenge method and delivery. Only present when a challenge is triggered.",
            "properties": {
              "method_type": {
                "type": "string",
                "enum": [
                  "SMS_OTP",
                  "OUT_OF_BAND"
                ],
                "description": "The type of challenge method used for authentication."
              },
              "phone_number": {
                "type": [
                  "string",
                  "null"
                ],
                "description": "The phone number used for delivering the OTP. Relevant only for SMS_OTP method."
              },
              "status": {
                "type": "string",
                "enum": [
                  "SUCCESS",
                  "PENDING",
                  "SMS_DELIVERY_FAILED",
                  "CARDHOLDER_TIMEOUT",
                  "CANCELED_VIA_CHALLENGE_UI",
                  "CANCELED_OOB",
                  "ATTEMPTS_EXCEEDED",
                  "ABORTED",
                  "ERROR"
                ],
                "description": "Indicates the status of the challenge\n\n* SUCCESS - Cardholder completed the challenge successfully\n* PENDING - Challenge was issued to the cardholder and was not completed yet\n* SMS_DELIVERY_FAILED - Lithic confirmed undeliverability of the SMS to the provided phone number. Relevant only for SMS_OTP method\n* CARDHOLDER_TIMEOUT - Cardholder failed to complete the challenge within the given challenge TTL\n* CANCELED_VIA_CHALLENGE_UI - Cardholder canceled the challenge by selecting \"cancel\" on the challenge UI\n* CANCELED_OOB - Cardholder canceled the challenge out of band\n* ATTEMPTS_EXCEEDED - Cardholder failed the challenge by either entering an incorrect OTP more than the allowed number of times or requesting a new OTP more than the allowed number of times\n* ABORTED - Merchant aborted authentication after a challenge was requested\n* ERROR - The challenge failed for a reason different than those documented"
              }
            },
            "required": [
              "method_type",
              "status"
            ]
          },
          "challenge_orchestrated_by": {
            "type": [
              "string",
              "null"
            ],
            "description": "Entity that orchestrates the challenge. This won't be set for authentications for which a decision has not yet been made (e.g. in-flight customer decisioning request).",
            "enum": [
              "LITHIC",
              "CUSTOMER",
              "NO_CHALLENGE",
              null
            ]
          },
          "channel": {
            "type": "string",
            "description": "Channel in which the authentication occurs. Maps to EMV 3DS field `deviceChannel`.",
            "enum": [
              "APP_BASED",
              "BROWSER",
              "THREE_DS_REQUESTOR_INITIATED"
            ]
          },
          "created": {
            "type": "string",
            "description": "Date and time when the authentication was created in Lithic's system. Permitted values: Date string in the ISO 8601 format yyyy-MM-dd'T'hh:mm:ssZ.",
            "format": "date-time"
          },
          "decision_made_by": {
            "type": [
              "string",
              "null"
            ],
            "description": "Entity that made the authentication decision. This won't be set for authentications for which a decision has not yet been made (e.g. in-flight customer decisioning request).",
            "enum": [
              "LITHIC_RULES",
              "LITHIC_DEFAULT",
              "CUSTOMER_RULES",
              "CUSTOMER_ENDPOINT",
              "NETWORK",
              "UNKNOWN",
              null
            ]
          },
          "merchant": {
            "type": "object",
            "description": "Object containing data about the merchant involved in the e-commerce transaction.",
            "properties": {
              "country": {
                "type": [
                  "string",
                  "null"
                ],
                "description": "Country code of the merchant requesting 3DS authentication. Maps to EMV 3DS field `merchantCountryCode`. Permitted values: ISO 3166-1 alpha-3 country code (e.g., USA). May not be present for non-payment authentications.",
                "minLength": 3,
                "maxLength": 3
              },
              "id": {
                "type": [
                  "string",
                  "null"
                ],
                "description": "Merchant identifier as assigned by the acquirer. Maps to EMV 3DS field `acquirerMerchantId`. May not be present for non-payment authentications."
              },
              "mcc": {
                "type": [
                  "string",
                  "null"
                ],
                "description": "Merchant category code assigned to the merchant that describes its business activity type. Maps to EMV 3DS field `mcc`. May not be present for non-payment authentications.",
                "minLength": 4,
                "maxLength": 4
              },
              "name": {
                "type": [
                  "string",
                  "null"
                ],
                "description": "Name of the merchant. Maps to EMV 3DS field `merchantName`. May not be present for non-payment authentications."
              },
              "risk_indicator": {
                "type": "object",
                "description": "Object containing additional data indicating additional risk factors related to the e-commerce transaction.",
                "properties": {
                  "delivery_email_address": {
                    "type": [
                      "string",
                      "null"
                    ],
                    "description": "In transactions with electronic delivery, email address to which merchandise is delivered. Maps to EMV 3DS field `deliveryEmailAddress`."
                  },
                  "delivery_time_frame": {
                    "type": [
                      "string",
                      "null"
                    ],
                    "description": "The delivery time frame for the merchandise. Maps to EMV 3DS field `deliveryTimeframe`.",
                    "enum": [
                      "ELECTRONIC_DELIVERY",
                      "OVERNIGHT_SHIPPING",
                      "SAME_DAY_SHIPPING",
                      "TWO_DAY_OR_MORE_SHIPPING",
                      null
                    ]
                  },
                  "gift_card_amount": {
                    "type": [
                      "integer",
                      "null"
                    ],
                    "description": "In prepaid or gift card purchase transactions, purchase amount total in major units (e.g., a purchase of USD $205.10 would be 205). Maps to EMV 3DS field `giftCardAmount`."
                  },
                  "gift_card_count": {
                    "type": [
                      "integer",
                      "null"
                    ],
                    "description": "In prepaid or gift card purchase transactions, count of individual prepaid or gift cards/codes purchased. Maps to EMV 3DS field `giftCardCount`."
                  },
                  "gift_card_currency": {
                    "type": [
                      "string",
                      "null"
                    ],
                    "description": "In prepaid or gift card purchase transactions, currency code of the gift card. Maps to EMV 3DS field `giftCardCurr`. Permitted values: ISO 4217 three-character currency code (e.g., USD).",
                    "minLength": 3,
                    "maxLength": 3
                  },
                  "order_availability": {
                    "type": [
                      "string",
                      "null"
                    ],
                    "description": "Indicates whether the purchase is for merchandise that is available now or at a future date. Maps to EMV 3DS field `preOrderPurchaseInd`.",
                    "enum": [
                      "FUTURE_AVAILABILITY",
                      "MERCHANDISE_AVAILABLE",
                      null
                    ]
                  },
                  "pre_order_available_date": {
                    "type": [
                      "string",
                      "null"
                    ],
                    "description": "In pre-order purchase transactions, the expected date that the merchandise will be available. Maps to EMV 3DS field `preOrderDate`. Permitted values: Date string in the ISO 8601 format yyyy-MM-dd'T'hh:mm:ssZ",
                    "format": "date-time"
                  },
                  "reorder_items": {
                    "type": [
                      "string",
                      "null"
                    ],
                    "description": "Indicates whether the cardholder is reordering previously purchased merchandise. Maps to EMV 3DS field `reorderItemsInd`.",
                    "enum": [
                      "FIRST_TIME_ORDERED",
                      "REORDERED",
                      null
                    ]
                  },
                  "shipping_method": {
                    "type": [
                      "string",
                      "null"
                    ],
                    "description": "Shipping method that the cardholder chose for the transaction. If purchase includes one or more item, this indicator is used for the physical goods; if the purchase only includes digital goods, this indicator is used to describe the most expensive item purchased. Maps to EMV 3DS field `shipIndicator`.",
                    "enum": [
                      "DIGITAL_GOODS",
                      "LOCKER_DELIVERY",
                      "OTHER",
                      "PICK_UP_AND_GO_DELIVERY",
                      "SHIP_TO_BILLING_ADDRESS",
                      "SHIP_TO_NON_BILLING_ADDRESS",
                      "SHIP_TO_OTHER_VERIFIED_ADDRESS",
                      "SHIP_TO_STORE",
                      "TRAVEL_AND_EVENT_TICKETS",
                      null
                    ]
                  }
                },
                "required": []
              }
            },
            "required": [
              "risk_indicator"
            ]
          },
          "message_category": {
            "type": "string",
            "description": "Either PAYMENT_AUTHENTICATION or NON_PAYMENT_AUTHENTICATION. For NON_PAYMENT_AUTHENTICATION, additional_data and transaction fields are not populated.",
            "enum": [
              "NON_PAYMENT_AUTHENTICATION",
              "PAYMENT_AUTHENTICATION"
            ]
          },
          "three_ds_requestor_challenge_indicator": {
            "type": "string",
            "description": "Indicates whether a challenge is requested for this transaction\n\n* `NO_PREFERENCE` - No Preference\n* `NO_CHALLENGE_REQUESTED` - No Challenge Requested\n* `CHALLENGE_PREFERENCE` - Challenge requested (3DS Requestor preference)\n* `CHALLENGE_MANDATE` - Challenge requested (Mandate)\n* `NO_CHALLENGE_RISK_ALREADY_ASSESSED` - No Challenge requested (Transactional risk analysis is already performed)\n* `DATA_SHARE_ONLY` - No Challenge requested (Data Share Only)\n* `OTHER` - Other indicators not captured by above. These are rarely used",
            "enum": [
              "NO_PREFERENCE",
              "NO_CHALLENGE_REQUESTED",
              "CHALLENGE_PREFERENCE",
              "CHALLENGE_MANDATE",
              "NO_CHALLENGE_RISK_ALREADY_ASSESSED",
              "DATA_SHARE_ONLY",
              "OTHER"
            ]
          },
          "three_ri_request_type": {
            "type": [
              "string",
              "null"
            ],
            "description": "Type of 3DS Requestor Initiated (3RI) request — i.e., a 3DS authentication that takes place at the initiation of the merchant rather than the cardholder. The most common example of this is where a merchant is authenticating before billing for a recurring transaction such as a pay TV subscription or a utility bill. Maps to EMV 3DS field `threeRIInd`.",
            "enum": [
              "ACCOUNT_VERIFICATION",
              "ADD_CARD",
              "BILLING_AGREEMENT",
              "CARD_SECURITY_CODE_STATUS_CHECK",
              "DELAYED_SHIPMENT",
              "DEVICE_BINDING_STATUS_CHECK",
              "INSTALLMENT_TRANSACTION",
              "MAIL_ORDER",
              "MAINTAIN_CARD_INFO",
              "OTHER_PAYMENT",
              "RECURRING_TRANSACTION",
              "SPLIT_PAYMENT",
              "SPLIT_SHIPMENT",
              "TELEPHONE_ORDER",
              "TOP_UP",
              "TRUST_LIST_STATUS_CHECK",
              null
            ]
          },
          "token": {
            "type": "string",
            "description": "Globally unique identifier for the 3DS authentication. Permitted values: 36-digit version 4 UUID (including hyphens).",
            "format": "uuid"
          },
          "transaction": {
            "type": [
              "object",
              "null"
            ],
            "description": "Object containing data about the e-commerce transaction for which the merchant is requesting authentication.",
            "properties": {
              "amount": {
                "type": "number",
                "description": "Amount of the purchase in minor units of currency with all punctuation removed. Maps to EMV 3DS field `purchaseAmount`."
              },
              "cardholder_amount": {
                "type": [
                  "number",
                  "null"
                ],
                "description": "Approximate amount of the purchase in minor units of cardholder currency. Derived from `amount` using a daily conversion rate."
              },
              "currency": {
                "type": "string",
                "description": "Currency of the purchase. Maps to EMV 3DS field `purchaseCurrency`. Permitted values: ISO 4217 three-character currency code (e.g., USD).",
                "minLength": 3,
                "maxLength": 3
              },
              "currency_exponent": {
                "type": "number",
                "description": "Minor units of currency, as specified in ISO 4217 currency exponent. Maps to EMV 3DS field `purchaseExponent`."
              },
              "date_time": {
                "type": "string",
                "description": "Date and time when the authentication was generated by the merchant/acquirer's 3DS server. Maps to EMV 3DS field `purchaseDate`. Permitted values: Date string in the ISO 8601 format yyyy-MM-dd'T'hh:mm:ssZ.",
                "format": "date-time"
              },
              "type": {
                "type": [
                  "string",
                  "null"
                ],
                "description": "Type of the transaction for which a 3DS authentication request is occurring. Maps to EMV 3DS field `transType`.",
                "enum": [
                  "ACCOUNT_FUNDING",
                  "CHECK_ACCEPTANCE",
                  "GOODS_SERVICE_PURCHASE",
                  "PREPAID_ACTIVATION_AND_LOAD",
                  "QUASI_CASH_TRANSACTION",
                  null
                ]
              }
            },
            "required": [
              "amount",
              "cardholder_amount",
              "currency",
              "currency_exponent",
              "date_time",
              "type"
            ]
          }
        },
        "required": [
          "account_type",
          "authentication_result",
          "card_expiry_check",
          "card_token",
          "cardholder",
          "channel",
          "created",
          "merchant",
          "message_category",
          "three_ds_requestor_challenge_indicator",
          "token"
        ]
      },
      "funding_event_settlement": {
        "title": "Funding Event Settlement",
        "type": "object",
        "properties": {
          "settled_gross_amount": {
            "type": "integer",
            "format": "int64"
          },
          "network_settlement_date": {
            "type": "string",
            "example": "2024-01-01",
            "format": "date"
          }
        },
        "required": [
          "settled_gross_amount",
          "network_settlement_date"
        ]
      },
      "funding_event_response": {
        "title": "Funding Event Response",
        "type": "object",
        "properties": {
          "token": {
            "description": "Unique token ID",
            "type": "string",
            "example": "b68b7424-aa69-4cbc-a946-30d90181b621",
            "format": "uuid"
          },
          "collection_tokens": {
            "description": "IDs of collections, further information can be gathered from the appropriate collection API based on collection_resource_type",
            "type": "array",
            "items": {
              "type": "string",
              "example": "b68b7424-aa69-4cbc-a946-30d90181b621",
              "format": "uuid"
            }
          },
          "previous_high_watermark": {
            "description": "Time of the previous high watermark",
            "type": "string",
            "example": "2024-01-01T00:00:00Z",
            "format": "date-time"
          },
          "high_watermark": {
            "description": "Time of the high watermark",
            "type": "string",
            "example": "2024-01-01T00:00:00Z",
            "format": "date-time"
          },
          "collection_resource_type": {
            "description": "Collection resource type",
            "type": "string",
            "example": "PAYMENT",
            "enum": [
              "BOOK_TRANSFER",
              "PAYMENT"
            ]
          },
          "network_settlement_summary": {
            "description": "Network settlement summary breakdown by network settlement date",
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/funding_event_settlement"
            }
          },
          "created": {
            "description": "Time of the creation",
            "type": "string",
            "example": "2024-01-01T00:00:00Z",
            "format": "date-time"
          },
          "updated": {
            "description": "Time of the update",
            "type": "string",
            "example": "2024-01-01T00:00:00Z",
            "format": "date-time"
          }
        },
        "required": [
          "token",
          "previous_high_watermark",
          "high_watermark",
          "collection_resource_type",
          "created",
          "updated",
          "network_settlement_summary",
          "collection_tokens"
        ]
      },
      "transaction-series": {
        "title": "Transaction Series",
        "description": "Contains identifiers for the transaction and specific event within being disputed; null if no transaction can be identified",
        "type": "object",
        "properties": {
          "type": {
            "description": "The type of transaction series associating the dispute and the original transaction. Always set to DISPUTE",
            "type": "string",
            "enum": [
              "DISPUTE"
            ]
          },
          "related_transaction_token": {
            "description": "Token of the original transaction being disputed, in UUID format",
            "type": "string",
            "format": "uuid"
          },
          "related_transaction_event_token": {
            "description": "Token of the specific event in the original transaction being disputed, in UUID format; null if no event can be identified",
            "oneOf": [
              {
                "type": "string",
                "format": "uuid"
              },
              {
                "type": "null"
              }
            ]
          }
        },
        "required": [
          "type",
          "related_transaction_token",
          "related_transaction_event_token"
        ]
      },
      "liability-allocation": {
        "title": "Liability Allocation",
        "description": "Current breakdown of how liability is allocated for the disputed amount",
        "type": "object",
        "properties": {
          "original_amount": {
            "description": "The initial amount disputed",
            "type": "integer"
          },
          "recovered_amount": {
            "description": "The amount that has been recovered from the merchant through the dispute process",
            "type": "integer"
          },
          "written_off_amount": {
            "description": "The amount the issuer has chosen to write off",
            "type": "integer"
          },
          "denied_amount": {
            "description": "The amount that has been denied to the cardholder",
            "type": "integer"
          },
          "remaining_amount": {
            "description": "Any disputed amount that is still outstanding, i.e. has not been recovered, written off, or denied",
            "type": "integer"
          }
        },
        "required": [
          "original_amount",
          "recovered_amount",
          "written_off_amount",
          "denied_amount",
          "remaining_amount"
        ]
      },
      "workflow-event-data": {
        "title": "Workflow Event Data",
        "description": "Details specific to workflow events",
        "type": "object",
        "properties": {
          "type": {
            "description": "Event type discriminator",
            "type": "string",
            "const": "WORKFLOW"
          },
          "stage": {
            "description": "Current stage of the dispute workflow",
            "type": "string",
            "enum": [
              "CLAIM"
            ]
          },
          "action": {
            "description": "Action taken in this stage",
            "type": "string",
            "enum": [
              "OPENED",
              "CLOSED",
              "REOPENED"
            ]
          },
          "reason": {
            "description": "Reason for the action",
            "type": [
              "string",
              "null"
            ]
          },
          "amount": {
            "description": "Amount in minor units",
            "type": [
              "integer",
              "null"
            ]
          },
          "disposition": {
            "description": "Dispute resolution outcome",
            "type": [
              "string",
              "null"
            ],
            "enum": [
              "WON",
              "LOST",
              "PARTIALLY_WON",
              "WITHDRAWN",
              "DENIED",
              null
            ]
          }
        },
        "required": [
          "type",
          "stage",
          "action",
          "reason",
          "amount",
          "disposition"
        ]
      },
      "financial-event-data": {
        "title": "Financial Event Data",
        "description": "Details specific to financial events",
        "type": "object",
        "properties": {
          "type": {
            "description": "Event type discriminator",
            "type": "string",
            "const": "FINANCIAL"
          },
          "stage": {
            "description": "Stage at which the financial event occurred",
            "type": "string",
            "enum": [
              "CHARGEBACK",
              "REPRESENTMENT",
              "PREARBITRATION",
              "ARBITRATION",
              "COLLABORATION"
            ]
          },
          "amount": {
            "description": "Amount in minor units",
            "type": "integer"
          },
          "polarity": {
            "description": "Direction of funds flow",
            "type": "string",
            "enum": [
              "CREDIT",
              "DEBIT"
            ]
          }
        },
        "required": [
          "type",
          "stage",
          "amount",
          "polarity"
        ]
      },
      "cardholder-liability-event-data": {
        "title": "Cardholder Liability Event Data",
        "description": "Details specific to cardholder liability events",
        "type": "object",
        "properties": {
          "type": {
            "description": "Event type discriminator",
            "type": "string",
            "const": "CARDHOLDER_LIABILITY"
          },
          "action": {
            "description": "Action taken regarding cardholder liability",
            "type": "string",
            "enum": [
              "PROVISIONAL_CREDIT_GRANTED",
              "PROVISIONAL_CREDIT_REVERSED",
              "WRITTEN_OFF"
            ]
          },
          "amount": {
            "description": "Amount in minor units",
            "type": "integer"
          },
          "reason": {
            "description": "Reason for the action",
            "type": "string"
          }
        },
        "required": [
          "type",
          "action",
          "amount",
          "reason"
        ]
      },
      "event": {
        "title": "Event",
        "description": "Event that occurred in the dispute lifecycle",
        "type": "object",
        "properties": {
          "token": {
            "description": "Unique identifier for the event, in UUID format",
            "type": "string",
            "format": "uuid"
          },
          "type": {
            "description": "Type of event",
            "type": "string",
            "enum": [
              "WORKFLOW",
              "FINANCIAL",
              "CARDHOLDER_LIABILITY"
            ]
          },
          "created": {
            "description": "When the event occurred",
            "type": "string",
            "format": "date-time"
          },
          "data": {
            "description": "Details specific to the event type",
            "oneOf": [
              {
                "$ref": "#/components/schemas/workflow-event-data"
              },
              {
                "$ref": "#/components/schemas/financial-event-data"
              },
              {
                "$ref": "#/components/schemas/cardholder-liability-event-data"
              }
            ],
            "discriminator": {
              "propertyName": "type"
            }
          }
        },
        "required": [
          "token",
          "type",
          "created",
          "data"
        ]
      },
      "dispute": {
        "title": "Dispute",
        "description": "The Dispute object tracks the progression of a dispute throughout its lifecycle.",
        "type": "object",
        "properties": {
          "case_id": {
            "description": "Identifier assigned by the network for this dispute.",
            "type": [
              "string",
              "null"
            ]
          },
          "token": {
            "description": "Token assigned by Lithic for the dispute, in UUID format.",
            "type": "string",
            "format": "uuid"
          },
          "card_token": {
            "description": "Token for the card used in the dispute, in UUID format.",
            "type": "string",
            "format": "uuid"
          },
          "account_token": {
            "description": "Token for the account associated with the dispute, in UUID format.",
            "type": "string",
            "format": "uuid"
          },
          "network": {
            "description": "Card network handling the dispute.",
            "type": "string",
            "enum": [
              "VISA",
              "MASTERCARD"
            ]
          },
          "currency": {
            "description": "Three-letter ISO 4217 currency code.",
            "type": "string",
            "pattern": "^[A-Z]{3}$"
          },
          "created": {
            "description": "When the dispute was created.",
            "type": "string",
            "format": "date-time"
          },
          "updated": {
            "description": "When the dispute was last updated.",
            "type": "string",
            "format": "date-time"
          },
          "merchant": {
            "$ref": "#/components/schemas/merchant"
          },
          "transaction_series": {
            "oneOf": [
              {
                "$ref": "#/components/schemas/transaction-series"
              },
              {
                "type": "null"
              }
            ]
          },
          "liability_allocation": {
            "$ref": "#/components/schemas/liability-allocation"
          },
          "status": {
            "description": "Current status of the dispute.",
            "type": [
              "string",
              "null"
            ],
            "enum": [
              "OPEN",
              "CLOSED",
              null
            ]
          },
          "disposition": {
            "description": "Dispute resolution outcome",
            "type": [
              "string",
              "null"
            ],
            "enum": [
              "WON",
              "LOST",
              "PARTIALLY_WON",
              "WITHDRAWN",
              "DENIED",
              null
            ]
          },
          "events": {
            "description": "Chronological list of events that have occurred in the dispute lifecycle",
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/event"
            }
          }
        },
        "required": [
          "case_id",
          "token",
          "card_token",
          "account_token",
          "network",
          "currency",
          "created",
          "updated",
          "merchant",
          "transaction_series",
          "liability_allocation",
          "status",
          "disposition",
          "events"
        ]
      },
      "account-holder-created": {
        "title": "Account Holder Created",
        "examples": [
          {
            "account_token": "00000000-0000-0000-0000-000000000001",
            "created": "2023-09-26 16:41:40.530987",
            "status": "ACCEPTED",
            "status_reason": [],
            "token": "00000000-0000-0000-0000-000000000001",
            "required_documents": []
          },
          {
            "account_token": "00000000-0000-0000-0000-000000000001",
            "created": "2023-09-26 16:41:40.530987",
            "status": "PENDING_REVIEW",
            "status_reason": [
              "PRIMARY_BUSINESS_ENTITY_ADDRESS_VERIFICATION_FAILURE"
            ],
            "token": "00000000-0000-0000-0000-000000000001",
            "required_documents": [
              {
                "entity_token": "83cf25ae-c14f-4d10-9fa2-0119f36c7286",
                "status_reasons": [
                  "PRIMARY_BUSINESS_ENTITY_ADDRESS_VERIFICATION_FAILURE"
                ],
                "valid_documents": [
                  "EIN_LETTER",
                  "TAX_RETURN",
                  "CERTIFICATE_OF_GOOD_STANDING",
                  "ARTICLES_OF_INCORPORATION",
                  "ARTICLES_OF_ORGANIZATION",
                  "CERTIFICATE_OF_FORMATION",
                  "BYLAWS",
                  "GOVERNMENT_BUSINESS_LICENSE",
                  "PARTNERSHIP_AGREEMENT",
                  "BANK_STATEMENT",
                  "UTILITY_BILL_STATEMENT"
                ]
              }
            ]
          }
        ],
        "properties": {
          "account_token": {
            "description": "The token of the account that was created.",
            "example": "00000000-0000-0000-0000-000000000001",
            "format": "uuid",
            "type": "string"
          },
          "created": {
            "description": "When the account_holder was created",
            "format": "date-time",
            "type": "string"
          },
          "status": {
            "description": "The status of the account_holder that was created.",
            "enum": [
              "ACCEPTED",
              "PENDING_REVIEW"
            ],
            "example": "ACCEPTED",
            "type": "string"
          },
          "status_reason": {
            "items": {
              "description": "If status is not ACCEPTED, status_reason provides the reasons an account_holder is REJECTED or PENDING_REVIEW.",
              "type": "string"
            },
            "type": "array"
          },
          "token": {
            "description": "The token of the account_holder that was created.",
            "example": "00000000-0000-0000-0000-000000000001",
            "format": "uuid",
            "type": "string"
          },
          "required_documents": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/required-document"
            }
          }
        },
        "type": "object"
      },
      "account-holder-updated": {
        "title": "Account Holder Updated",
        "oneOf": [
          {
            "title": "KYB Payload",
            "description": "KYB payload for an updated account holder.",
            "type": "object",
            "properties": {
              "token": {
                "description": "The token of the account_holder that was created.",
                "example": "00000000-0000-0000-0000-000000000001",
                "format": "uuid",
                "type": "string"
              },
              "update_request": {
                "type": "object",
                "description": "Original request to update the account holder.",
                "properties": {
                  "beneficial_owner_individuals": {
                    "description": "You must submit a list of all direct and indirect individuals with 25% or more ownership in the company. A maximum of 4 beneficial owners can be submitted. If no individual owns 25% of the company you do not need to send beneficial owner information.\nSee [FinCEN requirements](https://www.fincen.gov/sites/default/files/shared/CDD_Rev6.7_Sept_2017_Certificate.pdf) (Section I) for more background on individuals that should be included.",
                    "items": {
                      "$ref": "#/components/schemas/individual"
                    },
                    "minItems": 0,
                    "type": "array"
                  },
                  "business_entity": {
                    "description": "Information for business for which the account is being opened and KYB is being run.",
                    "$ref": "#/components/schemas/kyb-business-entity"
                  },
                  "control_person": {
                    "description": "An individual with significant responsibility for managing the legal entity (e.g., a Chief Executive Officer, Chief Financial Officer, Chief Operating Officer, Managing Member, General Partner, President, Vice President, or Treasurer). This can be an executive, or someone who will have program-wide access to the cards that Lithic will provide. In some cases, this individual could also be a beneficial owner listed above. See [FinCEN requirements](https://www.fincen.gov/sites/default/files/shared/CDD_Rev6.7_Sept_2017_Certificate.pdf) (Section II) for more background.",
                    "$ref": "#/components/schemas/individual"
                  }
                }
              },
              "external_id": {
                "description": "A user provided id that can be used to link an account holder with an external system",
                "type": "string"
              },
              "naics_code": {
                "description": "6-digit North American Industry Classification System (NAICS) code for the business. Only present if naics_code was included in the update request.",
                "example": "541512",
                "type": "string"
              },
              "nature_of_business": {
                "description": "Short description of the company's line of business (i.e., what does the company do?).",
                "example": "Software company selling solutions to the restaurant industry",
                "type": "string"
              },
              "website_url": {
                "description": "Company website URL.",
                "example": "www.mybusiness.com",
                "type": "string"
              }
            },
            "required": [
              "token",
              "update_request"
            ],
            "additionalProperties": false
          },
          {
            "title": "KYC Payload",
            "description": "KYC payload for an updated account holder.",
            "type": "object",
            "properties": {
              "token": {
                "description": "The token of the account_holder that was created.",
                "example": "00000000-0000-0000-0000-000000000001",
                "format": "uuid",
                "type": "string"
              },
              "update_request": {
                "type": "object",
                "description": "Original request to update the account holder.",
                "properties": {
                  "individual": {
                    "$ref": "#/components/schemas/individual",
                    "description": "Information on the individual for whom the account is being opened and KYC is being run."
                  }
                }
              },
              "external_id": {
                "description": "A user provided id that can be used to link an account holder with an external system",
                "type": "string"
              }
            },
            "required": [
              "token",
              "update_request"
            ],
            "additionalProperties": false
          },
          {
            "title": "Legacy Payload",
            "description": "Legacy payload for an updated account holder.",
            "type": "object",
            "properties": {
              "business_account_token": {
                "description": "If applicable, represents the business account token associated with the account_holder.",
                "example": "00000000-0000-0000-0000-000000000001",
                "format": "uuid",
                "type": [
                  "string",
                  "null"
                ]
              },
              "created": {
                "description": "When the account_holder updated event was created",
                "format": "date-time",
                "type": "string"
              },
              "email": {
                "description": "If updated, the newly updated email associated with the account_holder otherwise the existing email is provided.",
                "example": "johnny@lithic.com",
                "type": "string"
              },
              "external_id": {
                "description": "If applicable, represents the external_id associated with the account_holder.",
                "example": "00000000-0000-0000-0000-000000000001",
                "type": [
                  "string",
                  "null"
                ]
              },
              "first_name": {
                "description": "If applicable, represents the account_holder's first name.",
                "example": "Johnny",
                "type": "string"
              },
              "last_name": {
                "description": "If applicable, represents the account_holder's last name.",
                "example": "Appleseed",
                "type": "string"
              },
              "legal_business_name": {
                "description": "If applicable, represents the account_holder's business name.",
                "example": "Lithic",
                "type": "string"
              },
              "phone_number": {
                "description": "If updated, the newly updated phone_number associated with the account_holder otherwise the existing phone_number is provided.",
                "example": "+15555555555",
                "type": "string"
              },
              "token": {
                "description": "The token of the account_holder that was created.",
                "example": "00000000-0000-0000-0000-000000000001",
                "format": "uuid",
                "type": "string"
              }
            },
            "required": [
              "token"
            ]
          }
        ]
      },
      "account-holder-verification": {
        "title": "Account Holder Verification",
        "examples": [
          {
            "account_token": "00000000-0000-0000-0000-000000000001",
            "created": "2023-09-26 16:41:40.530938",
            "status": "ACCEPTED",
            "status_reasons": [],
            "token": "00000000-0000-0000-0000-000000000001"
          }
        ],
        "properties": {
          "account_token": {
            "description": "The token of the account being verified.",
            "example": "00000000-0000-0000-0000-000000000001",
            "format": "uuid",
            "type": "string"
          },
          "created": {
            "description": "When the account_holder verification status was updated",
            "format": "date-time",
            "type": "string"
          },
          "status": {
            "description": "The status of the account_holder that was created",
            "enum": [
              "ACCEPTED",
              "PENDING_REVIEW",
              "REJECTED"
            ],
            "example": "ACCEPTED",
            "type": "string"
          },
          "status_reasons": {
            "items": {
              "description": "If status is not ACCEPTED, status_reasons provides the reasons an account_holder was REJECTED or is PENDING_REVIEW.",
              "type": "string"
            },
            "type": "array"
          },
          "token": {
            "description": "The token of the account_holder being verified.",
            "example": "00000000-0000-0000-0000-000000000001",
            "format": "uuid",
            "type": "string"
          }
        },
        "type": "object"
      },
      "account-holder-document-updated": {
        "title": "Account Holder Document Updated",
        "examples": [
          {
            "account_holder_token": "2b52494a-ae73-4ab1-97e8-2dd1d51d18b0",
            "created": "2023-09-26 16:41:40.530987",
            "document_type": "EIN_LETTER",
            "entity_token": "c5f2d594-d957-4781-8877-fbea31f5944a",
            "required_document_uploads": [
              {
                "accepted_entity_status_reasons": [],
                "created": "2024-08-05 20:48:51.746833",
                "image_type": "FRONT",
                "rejected_entity_status_reasons": [],
                "status": "UPLOADED",
                "status_reasons": [],
                "token": "9e1d69a1-377b-463a-b991-01b3c81519b6",
                "updated": "2024-08-05 21:08:23.635573"
              },
              {
                "accepted_entity_status_reasons": [],
                "created": "2024-08-04 01:32:44.113765",
                "image_type": "FRONT",
                "rejected_entity_status_reasons": [
                  "PRIMARY_BUSINESS_ENTITY_ADDRESS_VERIFICATION_FAILURE"
                ],
                "status": "REJECTED",
                "status_reasons": [
                  "DOCUMENT_MISSING_REQUIRED_DATA"
                ],
                "token": "9e1d69a1-377b-463a-b991-01b3c81519b6",
                "updated": "2024-08-04 02:18:47.113773"
              }
            ],
            "token": "9175a05c-a9da-4082-8e14-9296427ebba7"
          }
        ],
        "properties": {
          "account_holder_token": {
            "description": "The token of the account_holder that the document belongs to",
            "example": "2b52494a-ae73-4ab1-97e8-2dd1d51d18b0",
            "format": "uuid",
            "type": "string"
          },
          "created": {
            "description": "When the account_holder was created",
            "format": "date-time",
            "type": "string"
          },
          "document_type": {
            "$ref": "#/components/schemas/document-type"
          },
          "entity_token": {
            "description": "The token of the entity that the document belongs to",
            "example": "c5f2d594-d957-4781-8877-fbea31f5944a",
            "format": "uuid",
            "type": "string"
          },
          "required_document_uploads": {
            "items": {
              "description": "A document upload that belongs to the overall account holder document",
              "properties": {
                "created": {
                  "description": "When the document upload was created",
                  "format": "date-time",
                  "type": "string"
                },
                "image_type": {
                  "description": "The type of image that was uploaded",
                  "enum": [
                    "FRONT",
                    "BACK"
                  ],
                  "type": "string"
                },
                "status": {
                  "description": "The status of the document upload",
                  "$ref": "#/components/schemas/document-upload-status"
                },
                "status_reasons": {
                  "items": {
                    "description": "If status is REJECTED, status_reasons provides the reasons the document was rejected.",
                    "type": "string"
                  },
                  "type": "array"
                },
                "accepted_entity_status_reasons": {
                  "items": {
                    "description": "A list of status reasons associated with a KYB account holder that have been satisfied by the document upload",
                    "type": "string"
                  },
                  "type": "array"
                },
                "rejected_entity_status_reasons": {
                  "items": {
                    "description": "A list of status reasons associated with a KYB account holder that have not been satisfied by the document upload",
                    "type": "string"
                  },
                  "type": "array"
                },
                "token": {
                  "description": "The token of the document upload",
                  "format": "uuid",
                  "type": "string"
                },
                "updated": {
                  "description": "When the document upload was last updated",
                  "format": "date-time",
                  "type": "string"
                }
              }
            },
            "type": "array"
          },
          "token": {
            "description": "The token of the account holder document",
            "example": "9175a05c-a9da-4082-8e14-9296427ebba7",
            "format": "uuid",
            "type": "string"
          }
        },
        "type": "object"
      },
      "asa_network_specific_data_mastercard": {
        "type": "object",
        "properties": {
          "transaction_type_identifier": {
            "oneOf": [
              {
                "type": "null",
                "description": "Transaction type identifier not available."
              },
              {
                "type": "string",
                "description": "Indicates the type of additional transaction purpose.",
                "minLength": 3,
                "maxLength": 3
              }
            ]
          },
          "ecommerce_security_level_indicator": {
            "oneOf": [
              {
                "type": "null",
                "description": "Electronic commerce security level indicator not available."
              },
              {
                "type": "string",
                "description": "Indicates the electronic commerce security level and UCAF collection.",
                "minLength": 3,
                "maxLength": 3
              }
            ]
          },
          "on_behalf_service_result": {
            "oneOf": [
              {
                "type": "null",
                "description": "On-behalf service result not available."
              },
              {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "service": {
                      "type": "string",
                      "description": "Indicates the service performed on the transaction.",
                      "minLength": 2,
                      "maxLength": 2
                    },
                    "result_1": {
                      "type": "string",
                      "description": "Indicates the results of the service processing.",
                      "minLength": 1,
                      "maxLength": 1
                    },
                    "result_2": {
                      "type": "string",
                      "description": "Identifies the results of the service processing.",
                      "minLength": 1,
                      "maxLength": 1
                    }
                  },
                  "required": [
                    "service",
                    "result_1",
                    "result_2"
                  ]
                },
                "description": "The On-behalf Service performed on the transaction and the results. Contains all applicable, on-behalf service results that were performed on a given transaction.",
                "maxItems": 10
              }
            ]
          }
        }
      },
      "asa_network_specific_data_visa": {
        "type": "object",
        "properties": {
          "business_application_identifier": {
            "oneOf": [
              {
                "type": "null",
                "description": "Business application identifier not available."
              },
              {
                "type": "string",
                "description": "Identifies the purpose or category of a transaction, used to classify and process transactions according to Visa’s rules.",
                "minLength": 2,
                "maxLength": 2
              }
            ]
          }
        }
      },
      "card-type": {
        "type": "string",
        "enum": [
          "SINGLE_USE",
          "MERCHANT_LOCKED",
          "UNLOCKED",
          "PHYSICAL",
          "DIGITAL_WALLET",
          "VIRTUAL"
        ]
      },
      "asa_request_card": {
        "description": "Card object in ASA",
        "type": "object",
        "properties": {
          "hostname": {
            "description": "Hostname of card’s locked merchant (will be empty if not applicable)",
            "type": "string"
          },
          "last_four": {
            "description": "Last four digits of the card number",
            "type": "string"
          },
          "memo": {
            "description": "Customizable name to identify the card. We recommend against using this field to store JSON data as it can cause unexpected behavior.",
            "type": "string"
          },
          "spend_limit": {
            "description": "Amount (in cents) to limit approved authorizations. Purchase requests above the spend limit will be declined (refunds and credits will be approved).\n\nNote that while spend limits are enforced based on authorized and settled volume on a card, they are not recommended to be used for balance or reconciliation-level accuracy. Spend limits also cannot block force posted charges (i.e., when a merchant sends a clearing message without a prior authorization).",
            "type": "integer",
            "format": "int64"
          },
          "spend_limit_duration": {
            "description": "Note that to support recurring monthly payments, which can occur on different day every month, the time window we consider for MONTHLY velocity starts 6 days after the current calendar date one month prior.",
            "type": "string",
            "enum": [
              "ANNUALLY",
              "FOREVER",
              "MONTHLY",
              "TRANSACTION"
            ]
          },
          "state": {
            "type": "string",
            "enum": [
              "CLOSED",
              "OPEN",
              "PAUSED",
              "PENDING_ACTIVATION",
              "PENDING_FULFILLMENT"
            ]
          },
          "type": {
            "$ref": "#/components/schemas/card-type"
          },
          "token": {
            "description": "Globally unique identifier for the card.",
            "type": "string",
            "format": "uuid"
          }
        }
      },
      "asa_request_pos_entry_mode": {
        "description": "POS > Entry Mode object in ASA",
        "type": "object",
        "properties": {
          "card": {
            "description": "Card Presence Indicator",
            "type": "string",
            "enum": [
              "PRESENT",
              "NOT_PRESENT",
              "UNKNOWN"
            ]
          },
          "cardholder": {
            "description": "Cardholder Presence Indicator",
            "type": "string",
            "enum": [
              "DEFERRED_BILLING",
              "ELECTRONIC_ORDER",
              "INSTALLMENT",
              "MAIL_ORDER",
              "NOT_PRESENT",
              "PRESENT",
              "REOCCURRING",
              "TELEPHONE_ORDER",
              "UNKNOWN"
            ]
          },
          "pan": {
            "description": "Method of entry for the PAN",
            "type": "string",
            "enum": [
              "AUTO_ENTRY",
              "BAR_CODE",
              "CONTACTLESS",
              "ECOMMERCE",
              "ERROR_KEYED",
              "ERROR_MAGNETIC_STRIPE",
              "ICC",
              "KEY_ENTERED",
              "MAGNETIC_STRIPE",
              "MANUAL",
              "OCR",
              "SECURE_CARDLESS",
              "UNSPECIFIED",
              "UNKNOWN",
              "CREDENTIAL_ON_FILE",
              "ECOMMERCE"
            ]
          },
          "pin_entered": {
            "type": "boolean",
            "description": "Indicates whether the cardholder entered the PIN. True if the PIN was entered."
          }
        }
      },
      "asa_pos_terminal": {
        "title": "Point of Sale Terminal",
        "type": "object",
        "properties": {
          "acceptor_terminal_id": {
            "description": "Uniquely identifies a terminal at the card acceptor location of acquiring institutions or merchant POS Systems. Left justified with trailing spaces.",
            "type": [
              "string",
              "null"
            ],
            "minLength": 8,
            "maxLength": 8,
            "pattern": "^[a-zA-Z0-9 ]*$"
          },
          "attended": {
            "description": "True if a clerk is present at the sale.",
            "type": "boolean"
          },
          "card_retention_capable": {
            "description": "True if the terminal is capable of retaining the card.",
            "type": "boolean"
          },
          "on_premise": {
            "description": "True if the sale was made at the place of business (vs. mobile).",
            "type": "boolean"
          },
          "operator": {
            "description": "The person that is designated to swipe the card",
            "enum": [
              "ADMINISTRATIVE",
              "CARDHOLDER",
              "CARD_ACCEPTOR",
              "UNKNOWN"
            ],
            "type": "string"
          },
          "partial_approval_capable": {
            "type": "boolean",
            "description": "True if the terminal is capable of partial approval. Partial approval is when part of a transaction is approved and another payment must be used for the remainder. Example scenario: A $40 transaction is attempted on a prepaid card with a $25 balance. If partial approval is enabled, $25 can be authorized, at which point the POS will prompt the user for an additional payment of $15."
          },
          "pin_capability": {
            "description": "Status of whether the POS is able to accept PINs",
            "enum": [
              "CAPABLE",
              "INOPERATIVE",
              "NOT_CAPABLE",
              "UNSPECIFIED"
            ],
            "type": "string"
          },
          "type": {
            "description": "POS Type",
            "enum": [
              "ADMINISTRATIVE",
              "ATM",
              "AUTHORIZATION",
              "COUPON_MACHINE",
              "DIAL_TERMINAL",
              "ECOMMERCE",
              "ECR",
              "FUEL_MACHINE",
              "HOME_TERMINAL",
              "MICR",
              "OFF_PREMISE",
              "PAYMENT",
              "PDA",
              "PHONE",
              "POINT",
              "POS_TERMINAL",
              "PUBLIC_UTILITY",
              "SELF_SERVICE",
              "TELEVISION",
              "TELLER",
              "TRAVELERS_CHECK_MACHINE",
              "VENDING",
              "VOICE",
              "UNKNOWN"
            ],
            "type": "string"
          }
        },
        "required": [
          "attended",
          "card_retention_capable",
          "on_premise",
          "operator",
          "partial_approval_capable",
          "pin_capability",
          "type"
        ]
      },
      "converted_amount": {
        "title": "Converted Amount",
        "type": "object",
        "properties": {
          "amount": {
            "description": "Amount in the smallest unit of the applicable currency (e.g., cents)",
            "type": "integer"
          },
          "conversion_rate": {
            "description": "Exchange rate used for currency conversion",
            "type": "string",
            "example": "1.000000"
          },
          "currency": {
            "$ref": "#/components/schemas/currency"
          }
        },
        "required": [
          "amount",
          "conversion_rate",
          "currency"
        ]
      },
      "amount": {
        "title": "Amount",
        "type": "object",
        "properties": {
          "amount": {
            "description": "Amount in the smallest unit of the applicable currency (e.g., cents)",
            "type": "integer"
          },
          "currency": {
            "$ref": "#/components/schemas/currency"
          }
        },
        "required": [
          "amount",
          "currency"
        ]
      },
      "asa_request_status": {
        "type": "string",
        "description": "The type of authorization request that this request is for. Note that `CREDIT_AUTHORIZATION` and `FINANCIAL_CREDIT_AUTHORIZATION` is only available to users with credit decisioning via ASA enabled.",
        "enum": [
          "AUTHORIZATION",
          "CREDIT_AUTHORIZATION",
          "FINANCIAL_AUTHORIZATION",
          "FINANCIAL_CREDIT_AUTHORIZATION",
          "BALANCE_INQUIRY"
        ]
      },
      "asa_request_fleet_info": {
        "title": "Fleet Info",
        "description": "Optional Object containing information if the Card is a part of a Fleet managed program",
        "type": [
          "object",
          "null"
        ],
        "properties": {
          "driver_number": {
            "oneOf": [
              {
                "type": "null",
                "description": "Driver Number was not provided as part of the transaction "
              },
              {
                "type": "string",
                "description": "Number representing the driver"
              }
            ]
          },
          "vehicle_number": {
            "oneOf": [
              {
                "type": "null",
                "description": "Vehicle Number was not provided as part of the transaction"
              },
              {
                "type": "string",
                "description": "Number associated with the vehicle"
              }
            ]
          },
          "fleet_restriction_code": {
            "type": "string",
            "description": "Code indicating which restrictions, if any, there are on purchase. This is configured at a program level and is a static configuration, and does not change on a request to request basis",
            "enum": [
              "NO_RESTRICTIONS",
              "FUEL_ONLY"
            ]
          },
          "fleet_prompt_code": {
            "type": "string",
            "description": "Code indicating what the driver was prompted to enter at time of purchase. This is configured at a program level and is a static configuration, and does not change on a request to request basis",
            "enum": [
              "NO_PROMPT",
              "VEHICLE_NUMBER",
              "DRIVER_NUMBER"
            ]
          }
        },
        "required": [
          "fleet_restriction_code",
          "fleet_prompt_code"
        ]
      },
      "asa_network_specific_data": {
        "title": "Network Specific Data",
        "description": "Contains raw data provided by the card network, including attributes that provide further context about the authorization. If populated by the network, data is organized by Lithic and passed through without further modification. Please consult the official network documentation for more details about these values and how to use them. This object is only available to certain programs- contact your Customer Success Manager to discuss enabling access.",
        "type": [
          "object",
          "null"
        ],
        "properties": {
          "mastercard": {
            "oneOf": [
              {
                "type": "null",
                "description": "There was no Mastercard-specific data available for this transaction."
              },
              {
                "$ref": "#/components/schemas/asa_network_specific_data_mastercard"
              }
            ]
          },
          "visa": {
            "oneOf": [
              {
                "type": "null",
                "description": "There was no Visa-specific data available for this transaction."
              },
              {
                "$ref": "#/components/schemas/asa_network_specific_data_visa"
              }
            ]
          }
        }
      },
      "asa-request": {
        "description": "The Auth Stream Access request payload that was sent to the ASA responder.",
        "type": "object",
        "properties": {
          "merchant": {
            "$ref": "#/components/schemas/merchant"
          },
          "avs": {
            "type": "object",
            "properties": {
              "address": {
                "description": "Cardholder address",
                "type": "string"
              },
              "zipcode": {
                "description": "Cardholder ZIP code",
                "type": "string"
              },
              "address_on_file_match": {
                "$ref": "#/components/schemas/address_match_result"
              }
            },
            "required": [
              "address_on_file_match",
              "address",
              "zipcode"
            ]
          },
          "card": {
            "$ref": "#/components/schemas/asa_request_card"
          },
          "cardholder_authentication": {
            "$ref": "#/components/schemas/cardholder_authentication"
          },
          "pos": {
            "type": "object",
            "properties": {
              "entry_mode": {
                "$ref": "#/components/schemas/asa_request_pos_entry_mode"
              },
              "terminal": {
                "$ref": "#/components/schemas/asa_pos_terminal"
              }
            }
          },
          "amount": {
            "type": "integer",
            "format": "int64",
            "deprecated": true,
            "description": "Deprecated, use `amounts`. Authorization amount of the transaction (in cents), including any acquirer fees. The contents of this field are identical to `authorization_amount`."
          },
          "acquirer_fee": {
            "type": "integer",
            "format": "int64",
            "description": "Fee (in cents) assessed by the merchant and paid for by the cardholder. Will be zero if no fee is assessed. Rebates may be transmitted as a negative value to indicate credited fees."
          },
          "authorization_amount": {
            "type": "integer",
            "format": "int64",
            "deprecated": true,
            "description": "Deprecated, use `amounts`. The base transaction amount (in cents) plus the acquirer fee field. This is the amount the issuer should authorize against unless the issuer is paying the acquirer fee on behalf of the cardholder."
          },
          "cardholder_currency": {
            "type": "string",
            "deprecated": true,
            "description": "Deprecated, use `amounts`. 3-character alphabetic ISO 4217 code for cardholder's billing currency."
          },
          "cash_amount": {
            "type": "integer",
            "format": "int64",
            "description": "The portion of the transaction requested as cash back by the cardholder, and does not include any acquirer fees. The amount field includes the purchase amount, the requested cash back amount, and any acquirer fees.\n\nIf no cash back was requested, the value of this field will be 0, and the field will always be present."
          },
          "cashback": {
            "type": "integer",
            "format": "int64",
            "description": "Deprecated, use `cash_amount`."
          },
          "token_info": {
            "$ref": "#/components/schemas/token_info"
          },
          "ttl": {
            "description": "Deprecated: approximate time-to-live for the authorization.",
            "type": "string",
            "format": "date-time"
          },
          "conversion_rate": {
            "deprecated": true,
            "description": "Deprecated, use `amounts`. If the transaction was requested in a currency other than the settlement currency, this field will be populated to indicate the rate used to translate the merchant_amount to the amount (i.e., `merchant_amount` x `conversion_rate` = `amount`). Note that the `merchant_amount` is in the local currency and the amount is in the settlement currency.",
            "type": "number"
          },
          "created": {
            "type": "string",
            "format": "date-time",
            "description": "Date and time when the transaction first occurred in UTC."
          },
          "merchant_amount": {
            "type": "integer",
            "format": "int64",
            "deprecated": true,
            "description": "Deprecated, use `amounts`. The amount that the merchant will receive, denominated in `merchant_currency` and in the smallest currency unit. Note the amount includes `acquirer_fee`, similar to `authorization_amount`. It will be different from `authorization_amount` if the merchant is taking payment in a different currency."
          },
          "merchant_currency": {
            "deprecated": true,
            "allOf": [
              {
                "$ref": "#/components/schemas/merchant_currency"
              }
            ],
            "description": "Deprecated, use `amounts`."
          },
          "network": {
            "type": "string",
            "description": "Card network of the authorization.",
            "enum": [
              "AMEX",
              "INTERLINK",
              "MAESTRO",
              "MASTERCARD",
              "UNKNOWN",
              "VISA"
            ]
          },
          "network_risk_score": {
            "$ref": "#/components/schemas/network_risk_score"
          },
          "settled_amount": {
            "type": "integer",
            "format": "int64",
            "deprecated": true,
            "description": "Deprecated, use `amounts`. Amount (in cents) of the transaction that has been settled, including any acquirer fees."
          },
          "amounts": {
            "description": "Structured amounts for this authorization. The `cardholder` and `merchant` amounts reflect the original network authorization values. For programs with hold adjustments enabled (e.g., automated fuel dispensers or tipping MCCs), the `hold` amount may exceed the `cardholder` and `merchant` amounts to account for anticipated final transaction amounts such as tips or fuel fill-ups",
            "type": "object",
            "properties": {
              "cardholder": {
                "$ref": "#/components/schemas/converted_amount"
              },
              "merchant": {
                "$ref": "#/components/schemas/amount"
              },
              "settlement": {
                "oneOf": [
                  {
                    "type": "null"
                  },
                  {
                    "$ref": "#/components/schemas/amount"
                  }
                ]
              },
              "hold": {
                "oneOf": [
                  {
                    "type": "null"
                  },
                  {
                    "$ref": "#/components/schemas/amount"
                  }
                ]
              }
            },
            "required": [
              "cardholder",
              "merchant",
              "settlement",
              "hold"
            ]
          },
          "status": {
            "$ref": "#/components/schemas/asa_request_status"
          },
          "token": {
            "description": "The provisional transaction group uuid associated with the authorization",
            "type": "string",
            "format": "uuid"
          },
          "event_token": {
            "description": "The event token associated with the authorization. This field is only set for programs enrolled into the beta.",
            "type": "string",
            "format": "uuid"
          },
          "fleet_info": {
            "$ref": "#/components/schemas/asa_request_fleet_info"
          },
          "network_specific_data": {
            "$ref": "#/components/schemas/asa_network_specific_data"
          },
          "account_type": {
            "$ref": "#/components/schemas/account_type"
          },
          "transaction_initiator": {
            "type": "string",
            "description": "The entity that initiated the transaction.",
            "enum": [
              "CARDHOLDER",
              "MERCHANT",
              "UNKNOWN"
            ]
          },
          "latest_challenge": {
            "description": "The latest Authorization Challenge that was issued to the cardholder for this merchant.",
            "type": "object",
            "properties": {
              "status": {
                "type": "string",
                "enum": [
                  "COMPLETED",
                  "PENDING",
                  "EXPIRED",
                  "ERROR"
                ],
                "description": "The status of the Authorization Challenge\n\n* `COMPLETED` - Challenge was successfully completed by the cardholder\n* `PENDING` - Challenge is still open\n* `EXPIRED` - Challenge has expired without being completed\n* `ERROR` - There was an error processing the challenge"
              },
              "phone_number": {
                "type": "string",
                "description": "The phone number used for sending Authorization Challenge SMS."
              },
              "completed_at": {
                "type": "string",
                "format": "date-time",
                "description": "The date and time when the Authorization Challenge was completed in UTC. Present only if the status is `COMPLETED`."
              }
            },
            "required": [
              "status",
              "phone_number"
            ]
          }
        },
        "required": [
          "acquirer_fee",
          "amount",
          "amounts",
          "authorization_amount",
          "avs",
          "card",
          "cardholder_currency",
          "cash_amount",
          "created",
          "merchant",
          "merchant_amount",
          "merchant_currency",
          "settled_amount",
          "status",
          "token",
          "transaction_initiator"
        ],
        "$defs": {
          "asa_request_status": {
            "type": "string",
            "description": "The type of authorization request that this request is for. Note that `CREDIT_AUTHORIZATION` and `FINANCIAL_CREDIT_AUTHORIZATION` is only available to users with credit decisioning via ASA enabled.",
            "enum": [
              "AUTHORIZATION",
              "CREDIT_AUTHORIZATION",
              "FINANCIAL_AUTHORIZATION",
              "FINANCIAL_CREDIT_AUTHORIZATION",
              "BALANCE_INQUIRY"
            ]
          },
          "asa_request_pos_entry_mode": {
            "description": "POS > Entry Mode object in ASA",
            "type": "object",
            "properties": {
              "card": {
                "description": "Card Presence Indicator",
                "type": "string",
                "enum": [
                  "PRESENT",
                  "NOT_PRESENT",
                  "UNKNOWN"
                ]
              },
              "cardholder": {
                "description": "Cardholder Presence Indicator",
                "type": "string",
                "enum": [
                  "DEFERRED_BILLING",
                  "ELECTRONIC_ORDER",
                  "INSTALLMENT",
                  "MAIL_ORDER",
                  "NOT_PRESENT",
                  "PRESENT",
                  "REOCCURRING",
                  "TELEPHONE_ORDER",
                  "UNKNOWN"
                ]
              },
              "pan": {
                "description": "Method of entry for the PAN",
                "type": "string",
                "enum": [
                  "AUTO_ENTRY",
                  "BAR_CODE",
                  "CONTACTLESS",
                  "ECOMMERCE",
                  "ERROR_KEYED",
                  "ERROR_MAGNETIC_STRIPE",
                  "ICC",
                  "KEY_ENTERED",
                  "MAGNETIC_STRIPE",
                  "MANUAL",
                  "OCR",
                  "SECURE_CARDLESS",
                  "UNSPECIFIED",
                  "UNKNOWN",
                  "CREDENTIAL_ON_FILE",
                  "ECOMMERCE"
                ]
              },
              "pin_entered": {
                "type": "boolean",
                "description": "Indicates whether the cardholder entered the PIN. True if the PIN was entered."
              }
            }
          },
          "asa_request_fleet_info": {
            "title": "Fleet Info",
            "description": "Optional Object containing information if the Card is a part of a Fleet managed program",
            "type": [
              "object",
              "null"
            ],
            "properties": {
              "driver_number": {
                "oneOf": [
                  {
                    "type": "null",
                    "description": "Driver Number was not provided as part of the transaction "
                  },
                  {
                    "type": "string",
                    "description": "Number representing the driver"
                  }
                ]
              },
              "vehicle_number": {
                "oneOf": [
                  {
                    "type": "null",
                    "description": "Vehicle Number was not provided as part of the transaction"
                  },
                  {
                    "type": "string",
                    "description": "Number associated with the vehicle"
                  }
                ]
              },
              "fleet_restriction_code": {
                "type": "string",
                "description": "Code indicating which restrictions, if any, there are on purchase. This is configured at a program level and is a static configuration, and does not change on a request to request basis",
                "enum": [
                  "NO_RESTRICTIONS",
                  "FUEL_ONLY"
                ]
              },
              "fleet_prompt_code": {
                "type": "string",
                "description": "Code indicating what the driver was prompted to enter at time of purchase. This is configured at a program level and is a static configuration, and does not change on a request to request basis",
                "enum": [
                  "NO_PROMPT",
                  "VEHICLE_NUMBER",
                  "DRIVER_NUMBER"
                ]
              }
            },
            "required": [
              "fleet_restriction_code",
              "fleet_prompt_code"
            ]
          },
          "asa_network_specific_data": {
            "title": "Network Specific Data",
            "description": "Contains raw data provided by the card network, including attributes that provide further context about the authorization. If populated by the network, data is organized by Lithic and passed through without further modification. Please consult the official network documentation for more details about these values and how to use them. This object is only available to certain programs- contact your Customer Success Manager to discuss enabling access.",
            "type": [
              "object",
              "null"
            ],
            "properties": {
              "mastercard": {
                "oneOf": [
                  {
                    "type": "null",
                    "description": "There was no Mastercard-specific data available for this transaction."
                  },
                  {
                    "$ref": "#/components/schemas/asa_network_specific_data_mastercard"
                  }
                ]
              },
              "visa": {
                "oneOf": [
                  {
                    "type": "null",
                    "description": "There was no Visa-specific data available for this transaction."
                  },
                  {
                    "$ref": "#/components/schemas/asa_network_specific_data_visa"
                  }
                ]
              }
            }
          },
          "asa_network_specific_data_mastercard": {
            "type": "object",
            "properties": {
              "transaction_type_identifier": {
                "oneOf": [
                  {
                    "type": "null",
                    "description": "Transaction type identifier not available."
                  },
                  {
                    "type": "string",
                    "description": "Indicates the type of additional transaction purpose.",
                    "minLength": 3,
                    "maxLength": 3
                  }
                ]
              },
              "ecommerce_security_level_indicator": {
                "oneOf": [
                  {
                    "type": "null",
                    "description": "Electronic commerce security level indicator not available."
                  },
                  {
                    "type": "string",
                    "description": "Indicates the electronic commerce security level and UCAF collection.",
                    "minLength": 3,
                    "maxLength": 3
                  }
                ]
              },
              "on_behalf_service_result": {
                "oneOf": [
                  {
                    "type": "null",
                    "description": "On-behalf service result not available."
                  },
                  {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "service": {
                          "type": "string",
                          "description": "Indicates the service performed on the transaction.",
                          "minLength": 2,
                          "maxLength": 2
                        },
                        "result_1": {
                          "type": "string",
                          "description": "Indicates the results of the service processing.",
                          "minLength": 1,
                          "maxLength": 1
                        },
                        "result_2": {
                          "type": "string",
                          "description": "Identifies the results of the service processing.",
                          "minLength": 1,
                          "maxLength": 1
                        }
                      },
                      "required": [
                        "service",
                        "result_1",
                        "result_2"
                      ]
                    },
                    "description": "The On-behalf Service performed on the transaction and the results. Contains all applicable, on-behalf service results that were performed on a given transaction.",
                    "maxItems": 10
                  }
                ]
              }
            }
          },
          "asa_network_specific_data_visa": {
            "type": "object",
            "properties": {
              "business_application_identifier": {
                "oneOf": [
                  {
                    "type": "null",
                    "description": "Business application identifier not available."
                  },
                  {
                    "type": "string",
                    "description": "Identifies the purpose or category of a transaction, used to classify and process transactions according to Visa’s rules.",
                    "minLength": 2,
                    "maxLength": 2
                  }
                ]
              }
            }
          },
          "asa_request_card": {
            "description": "Card object in ASA",
            "type": "object",
            "properties": {
              "hostname": {
                "description": "Hostname of card’s locked merchant (will be empty if not applicable)",
                "type": "string"
              },
              "last_four": {
                "description": "Last four digits of the card number",
                "type": "string"
              },
              "memo": {
                "description": "Customizable name to identify the card. We recommend against using this field to store JSON data as it can cause unexpected behavior.",
                "type": "string"
              },
              "spend_limit": {
                "description": "Amount (in cents) to limit approved authorizations. Purchase requests above the spend limit will be declined (refunds and credits will be approved).\n\nNote that while spend limits are enforced based on authorized and settled volume on a card, they are not recommended to be used for balance or reconciliation-level accuracy. Spend limits also cannot block force posted charges (i.e., when a merchant sends a clearing message without a prior authorization).",
                "type": "integer",
                "format": "int64"
              },
              "spend_limit_duration": {
                "description": "Note that to support recurring monthly payments, which can occur on different day every month, the time window we consider for MONTHLY velocity starts 6 days after the current calendar date one month prior.",
                "type": "string",
                "enum": [
                  "ANNUALLY",
                  "FOREVER",
                  "MONTHLY",
                  "TRANSACTION"
                ]
              },
              "state": {
                "type": "string",
                "enum": [
                  "CLOSED",
                  "OPEN",
                  "PAUSED",
                  "PENDING_ACTIVATION",
                  "PENDING_FULFILLMENT"
                ]
              },
              "type": {
                "$ref": "#/components/schemas/card-type"
              },
              "token": {
                "description": "Globally unique identifier for the card.",
                "type": "string",
                "format": "uuid"
              }
            }
          }
        }
      },
      "asa-response": {
        "description": "The Auth Stream Access response payload that an ASA responder may respond with in response to a request.",
        "type": "object",
        "properties": {
          "result": {
            "description": "Result of the Authorization decision. Provide `APPROVED` to accept the authorization. Any other response will decline the authorization. Result `CHALLENGE` is valid only for cardholder-initiated transactions. If a value not present in the enumeration is returned the transaction will be declined with the `CUSTOM_ASA_RESULT` detailed result.",
            "type": "string",
            "enum": [
              "APPROVED",
              "AVS_INVALID",
              "CARD_PAUSED",
              "INSUFFICIENT_FUNDS",
              "UNAUTHORIZED_MERCHANT",
              "VELOCITY_EXCEEDED",
              "DRIVER_NUMBER_INVALID",
              "VEHICLE_NUMBER_INVALID",
              "SUSPECTED_FRAUD",
              "CHALLENGE"
            ]
          },
          "token": {
            "type": "string",
            "description": "The transaction token from the ASA request.",
            "format": "uuid"
          },
          "approved_amount": {
            "type": "integer",
            "format": "int64",
            "description": "The amount approved for the transaction. Note that setting this implies a partial approval. This property should not be present if the intention is to fully approve the transaction. See: https://docs.lithic.com/docs/partial-approval#partial-approval"
          },
          "avs_result": {
            "description": "The ASA responder may return an address verification (AVS) match indicator for evaluation by the acquirer. The merchant can choose whether to proceed with the transaction in the case of an approval with AVS failure. When they do not, this typically appears as a subsequent AUTHORIZATION_REVERSAL event following the AUTHORIZATION. Note that AVS data submitted by merchants can be variable in quality, and we recommend card programs exercise adjust their decisioning logic accordingly.",
            "type": "string",
            "enum": [
              "FAIL",
              "MATCH",
              "MATCH_ADDRESS_ONLY",
              "MATCH_ZIP_ONLY"
            ]
          },
          "balance": {
            "description": "Respective available amount and settled amount values (in cents). These values can be used by merchants for authorization decisions as well as balance display at point of sale or ATM.",
            "type": "object",
            "properties": {
              "amount": {
                "oneOf": [
                  {
                    "type": "integer",
                    "format": "int64",
                    "description": "The balance held on the card."
                  },
                  {
                    "type": "null"
                  }
                ]
              },
              "available": {
                "oneOf": [
                  {
                    "type": "integer",
                    "format": "int64",
                    "description": "The balance available for the cardholder to spend. This is calculated as the settled amount minus any pending authorizations on the card."
                  },
                  {
                    "type": "null"
                  }
                ]
              }
            }
          },
          "challenge_phone_number": {
            "type": "string",
            "description": "The phone number to use for sending an Authorization Challenge SMS. Relevant only when the result is `CHALLENGE`. The expected format is E.164 without hyphens. For example, \"+15555555555\" for a US phone number."
          }
        },
        "required": [
          "result"
        ]
      },
      "device": {
        "type": "object",
        "properties": {
          "imei": {
            "description": "The IMEI number of the device being provisioned. For Amex, this field contains device ID instead as IMEI is not provided",
            "example": "123456789012345",
            "maxLength": 64,
            "type": [
              "string",
              "null"
            ]
          },
          "ip_address": {
            "description": "The IP address of the device initiating the request",
            "example": "1.1.1.1",
            "maxLength": 64,
            "type": [
              "string",
              "null"
            ]
          },
          "location": {
            "description": "Latitude and longitude where the device is located during the authorization attempt",
            "example": "37.3860517/-122.0838511",
            "maxLength": 64,
            "type": [
              "string",
              "null"
            ]
          }
        },
        "required": [
          "imei",
          "ip_address",
          "location"
        ]
      },
      "wallet-decisioning-info": {
        "type": "object",
        "properties": {
          "account_score": {
            "description": "Score given to the account by the Wallet Provider",
            "example": "100",
            "maxLength": 64,
            "type": [
              "string",
              "null"
            ]
          },
          "device_score": {
            "description": "Score given to the device by the Wallet Provider",
            "example": "100",
            "maxLength": 64,
            "type": [
              "string",
              "null"
            ]
          },
          "recommendation_reasons": {
            "description": "Reasons provided to the Wallet Provider on how the recommended decision was reached",
            "type": [
              "array",
              "null"
            ],
            "items": {
              "type": "string"
            }
          },
          "recommended_decision": {
            "description": "The decision recommended by the Wallet Provider",
            "example": "Decision1",
            "maxLength": 64,
            "type": [
              "string",
              "null"
            ]
          }
        },
        "required": [
          "account_score",
          "device_score",
          "recommended_decision"
        ]
      },
      "tokenization-request-base": {
        "description": "Base properties shared by both tokenization decisioning requests (with response) and without",
        "type": "object",
        "properties": {
          "account_token": {
            "description": "Unique identifier for the user tokenizing a card",
            "example": "00000000-0000-0000-0000-000000000002",
            "type": "string"
          },
          "card_token": {
            "description": "Unique identifier for the card being tokenized",
            "example": "00000000-0000-0000-0000-000000000001",
            "type": "string"
          },
          "created": {
            "description": "Indicate when the request was received from Mastercard or Visa",
            "format": "date-time",
            "type": "string"
          },
          "device": {
            "$ref": "#/components/schemas/device"
          },
          "issuer_decision": {
            "description": "Whether Lithic decisioned on the token, and if so, what the decision was. APPROVED/VERIFICATION_REQUIRED/DENIED.",
            "enum": [
              "APPROVED",
              "DENIED",
              "VERIFICATION_REQUIRED"
            ],
            "example": "APPROVED",
            "type": "string"
          },
          "tokenization_channel": {
            "description": "The channel through which the tokenization was made.",
            "enum": [
              "DIGITAL_WALLET",
              "MERCHANT"
            ],
            "example": "DIGITAL_WALLET",
            "type": "string"
          },
          "tokenization_source": {
            "description": "The source of the tokenization.",
            "enum": [
              "ACCOUNT_ON_FILE",
              "CONTACTLESS_TAP",
              "MANUAL_PROVISION",
              "PUSH_PROVISION",
              "TOKEN",
              "UNKNOWN"
            ],
            "example": "PUSH_PROVISION",
            "type": "string"
          },
          "tokenization_token": {
            "description": "Unique identifier for the digital wallet token attempt",
            "type": "string"
          },
          "wallet_decisioning_info": {
            "$ref": "#/components/schemas/wallet-decisioning-info"
          }
        },
        "required": [
          "account_token",
          "card_token",
          "created",
          "issuer_decision",
          "tokenization_channel",
          "tokenization_token",
          "wallet_decisioning_info"
        ]
      },
      "digital-wallet-token-metadata": {
        "description": "Contains the metadata for the digital wallet being tokenized.",
        "type": "object",
        "properties": {
          "payment_account_info": {
            "description": "Contains the information of the account responsible for the payment.",
            "type": "object",
            "properties": {
              "account_holder_data": {
                "description": "Additional information that can be used to identify the account holder, such as name, address, etc",
                "type": "object",
                "properties": {
                  "phone_number": {
                    "description": "The phone number, may contain country code along with phone number when countryDialInCode is not present",
                    "type": [
                      "string",
                      "null"
                    ],
                    "maxLength": 20
                  }
                }
              },
              "pan_unique_reference": {
                "description": "Reference to the PAN that is unique per Wallet Provider",
                "type": [
                  "string",
                  "null"
                ],
                "maxLength": 64
              },
              "payment_account_reference": {
                "description": "The unique account reference assigned to the PAN",
                "type": [
                  "string",
                  "null"
                ],
                "maxLength": 29
              },
              "token_unique_reference": {
                "description": "A unique reference assigned following the allocation of a token used to identify the token for the duration of its lifetime.",
                "type": [
                  "string",
                  "null"
                ],
                "maxLength": 64
              }
            },
            "required": [
              "account_holder_data"
            ]
          },
          "payment_app_instance_id": {
            "description": "The identifier of the Payment App instance within a device that will be provisioned with a token",
            "type": [
              "string",
              "null"
            ],
            "maxLength": 48
          },
          "status": {
            "description": "The current status of the digital wallet token. Pending or declined.",
            "type": "string"
          },
          "token_requestor_id": {
            "description": "The party that requested the digitization",
            "type": "string",
            "minLength": 11,
            "maxLength": 11
          },
          "token_requestor_name": {
            "description": "Human-readable name of the wallet that the token_requestor_id maps to.",
            "type": "string",
            "enum": [
              "AMAZON_ONE",
              "ANDROID_PAY",
              "APPLE_PAY",
              "FACEBOOK",
              "FITBIT_PAY",
              "GARMIN_PAY",
              "GOOGLE_PAY",
              "MICROSOFT_PAY",
              "NETFLIX",
              "SAMSUNG_PAY",
              "UNKNOWN",
              "VISA_CHECKOUT"
            ],
            "example": "APPLE_PAY"
          }
        },
        "required": [
          "payment_account_info",
          "status"
        ]
      },
      "tokenization-decisioning-request": {
        "description": "A webhook for tokenization decisioning sent to the customer's responder endpoint",
        "allOf": [
          {
            "$ref": "#/components/schemas/tokenization-request-base"
          },
          {
            "type": "object",
            "properties": {
              "digital_wallet_token_metadata": {
                "$ref": "#/components/schemas/digital-wallet-token-metadata"
              },
              "event_type": {
                "description": "The name of this event",
                "enum": [
                  "digital_wallet.tokenization_approval_request"
                ],
                "example": "digital_wallet.tokenization_approval_request",
                "type": "string"
              }
            },
            "required": [
              "digital_wallet_token_metadata",
              "event_type"
            ]
          }
        ],
        "examples": [
          {
            "account_token": "00000000-0000-0000-0000-000000000002",
            "card_token": "00000000-0000-0000-0000-000000000001",
            "created": "2023-09-18T12:34:56Z",
            "device": {
              "imei": "123456789012345",
              "ip_address": "1.1.1.1",
              "location": "37.3860517/-122.0838511"
            },
            "digital_wallet_token_metadata": {
              "payment_account_info": {
                "account_holder_data": {
                  "phone_number": "+15555555555"
                },
                "pan_unique_reference": "pan_unique_ref_1234567890123456789012345678",
                "payment_account_reference": "ref_1234567890123456789012",
                "token_unique_reference": "token_unique_ref_1234567890123456789012345678"
              },
              "payment_app_instance_id": "app_instance_123456789012345678901234567890",
              "status": "Pending",
              "token_requestor_id": "12345678901",
              "token_requestor_name": "APPLE_PAY"
            },
            "event_type": "digital_wallet.tokenization_approval_request",
            "issuer_decision": "APPROVED",
            "tokenization_channel": "DIGITAL_WALLET",
            "tokenization_source": "PUSH_PROVISION",
            "tokenization_token": "tok_1234567890abcdef",
            "wallet_decisioning_info": {
              "account_score": "100",
              "device_score": "100",
              "recommendation_reasons": [
                "Reason1"
              ],
              "recommended_decision": "Decision1"
            }
          }
        ]
      },
      "tokenization-decisioning-response": {
        "description": "The response payload that a Tokenization Decisioning responder may respond with in response to a request.",
        "type": "object",
        "properties": {
          "tokenization_decision": {
            "description": "The decision for tokenization",
            "type": "string",
            "enum": [
              "APPROVE",
              "AUTHENTICATE",
              "DECLINE"
            ],
            "example": "APPROVE"
          },
          "phone_number": {
            "description": "Phone number of the end user attempting a tokenization. Lithic must pass this to the card networks to pass to the wallets to display for the user as they select an authentication option in their digital wallet. Lithic will always default to using this value for authentication over the account holder information on file. E.164 format without hyphens. For example, \"+15555555555\" for a US phone number.",
            "type": "string",
            "example": "15555555555"
          },
          "email": {
            "description": "Email address of the end user attempting a tokenization to be used for authentication. Lithic must pass this to the card networks to pass to the wallets to display for the user as they select an authentication option in their digital wallet. Lithic will always default to using this value for authentication over the account holder information on file. Permitted values: Valid email address. For example, \"johnny@appleseed.com\".",
            "type": "string",
            "format": "email",
            "example": "test@example.com"
          },
          "mobile_application_name": {
            "description": "Name of the mobile application that the digital wallet will open for the end user to complete authentication. For example, \"Wells Fargo\".",
            "type": "string",
            "example": "Wells Fargo"
          }
        },
        "required": [
          "tokenization_decision",
          "phone_number",
          "email",
          "mobile_application_name"
        ],
        "examples": [
          {
            "tokenization_decision": "AUTHENTICATE",
            "phone_number": "+15555555555",
            "email": "test@example.com",
            "mobile_application_name": "Wells Fargo"
          }
        ]
      },
      "backtest-report": {
        "title": "Auth Rules Backtest Report",
        "description": "Webhook payload for the auth_rules.backtest_report.created event.",
        "allOf": [
          {
            "$ref": "#/components/schemas/backtest-results"
          }
        ]
      },
      "balance-updated": {
        "title": "Balance Updated",
        "examples": [
          {
            "data": [
              {
                "available_amount": 10000,
                "created": "2023-09-14T12:52:44Z",
                "currency": "USD",
                "last_transaction_event_token": "10265fe1-7058-451a-bfdf-db6f0ece177c",
                "last_transaction_token": "1e338050-295e-477b-884a-4f87d7d4b648",
                "pending_amount": 0,
                "token": "1e338050-295e-477b-884a-4f87d7d4b648",
                "total_amount": 10000,
                "type": "ISSUING",
                "updated": "2023-09-14T12:52:44Z"
              }
            ]
          }
        ],
        "properties": {
          "data": {
            "items": {
              "$ref": "#/components/schemas/financial-account-balance"
            },
            "type": "array"
          }
        },
        "required": [
          "data"
        ],
        "type": "object"
      },
      "book-transfer-transaction-created": {
        "title": "Book Transfer Transaction Created",
        "allOf": [
          {
            "$ref": "#/components/schemas/book-transfer-transaction"
          }
        ],
        "examples": [
          {
            "family": "TRANSFER",
            "category": "BALANCE_OR_FUNDING",
            "created": "2023-09-14T12:52:44Z",
            "currency": "USD",
            "events": [
              {
                "amount": 4103,
                "created": "2023-09-14T12:52:44Z",
                "result": "APPROVED",
                "token": "f274f723-b156-5b15-a96d-5ba8d5241b09",
                "type": "ACCOUNT_TO_ACCOUNT",
                "subtype": "CUSTOM",
                "detailed_results": [
                  "APPROVED"
                ],
                "memo": "Fund account"
              }
            ],
            "from_financial_account_token": "b05c313e-35db-4b47-a33b-7b268d72b1f5",
            "to_financial_account_token": "39ec6bf0-c101-520e-965a-a4fffce1d755",
            "pending_amount": 0,
            "result": "APPROVED",
            "settled_amount": 4103,
            "status": "SETTLED",
            "token": "147595d7-45f4-4c91-a950-3436d16847e5",
            "updated": "2023-09-14T12:52:44Z"
          }
        ]
      },
      "book-transfer-transaction-updated": {
        "title": "Book Transfer Transaction Updated",
        "allOf": [
          {
            "$ref": "#/components/schemas/book-transfer-transaction"
          }
        ],
        "examples": [
          {
            "family": "TRANSFER",
            "category": "BALANCE_OR_FUNDING",
            "created": "2023-09-14T12:52:44Z",
            "currency": "USD",
            "events": [
              {
                "amount": 4103,
                "created": "2023-09-14T12:52:44Z",
                "result": "APPROVED",
                "token": "f274f723-b156-5b15-a96d-5ba8d5241b09",
                "type": "ACCOUNT_TO_ACCOUNT",
                "subtype": "CUSTOM",
                "detailed_results": [
                  "APPROVED"
                ],
                "memo": "Fund account"
              },
              {
                "amount": -4103,
                "created": "2023-09-14T12:52:44Z",
                "result": "APPROVED",
                "token": "f274f723-b156-5b15-a96d-5ba8d5241b09",
                "type": "ACCOUNT_TO_ACCOUNT",
                "subtype": "CUSTOM",
                "detailed_results": [
                  "APPROVED"
                ],
                "memo": "Fund account"
              }
            ],
            "from_financial_account_token": "b05c313e-35db-4b47-a33b-7b268d72b1f5",
            "to_financial_account_token": "39ec6bf0-c101-520e-965a-a4fffce1d755",
            "pending_amount": 0,
            "result": "APPROVED",
            "settled_amount": 0,
            "status": "REVERSED",
            "token": "147595d7-45f4-4c91-a950-3436d16847e5",
            "updated": "2023-09-14T12:52:44Z"
          }
        ]
      },
      "card-created": {
        "title": "Card Created",
        "examples": [
          {
            "card_token": "00000000-0000-0000-0000-000000000001",
            "replacement_for": "00000000-0000-0000-0000-000000000000"
          }
        ],
        "properties": {
          "card_token": {
            "description": "The token of the card that was created.",
            "example": "00000000-0000-0000-0000-000000000001",
            "format": "uuid",
            "type": "string"
          },
          "replacement_for": {
            "description": "The token of the card that was replaced, if the new card is a replacement card.",
            "example": "00000000-0000-0000-0000-000000000000",
            "format": "uuid",
            "type": [
              "string",
              "null"
            ]
          }
        },
        "required": [
          "card_token"
        ],
        "type": "object"
      },
      "card-converted": {
        "title": "Card Converted",
        "examples": [
          {
            "card_token": "00000000-0000-0000-0000-000000000001"
          }
        ],
        "properties": {
          "card_token": {
            "description": "The token of the card that was created.",
            "example": "00000000-0000-0000-0000-000000000001",
            "format": "uuid",
            "type": "string"
          }
        },
        "required": [
          "card_token"
        ],
        "type": "object"
      },
      "card-renewed": {
        "title": "Card Renewed",
        "examples": [
          {
            "card_token": "00000000-0000-0000-0000-000000000001",
            "exp_month": "01",
            "exp_year": "2030",
            "previous_exp_month": "01",
            "previous_exp_year": "2024"
          }
        ],
        "properties": {
          "card_token": {
            "description": "The token of the card that was renewed.",
            "example": "00000000-0000-0000-0000-000000000001",
            "format": "uuid",
            "type": "string"
          },
          "exp_month": {
            "description": "The new expiration month of the card.",
            "example": "01",
            "type": "string"
          },
          "exp_year": {
            "description": "The new expiration year of the card.",
            "example": "2030",
            "type": "string"
          },
          "previous_exp_month": {
            "description": "The previous expiration month of the card.",
            "example": "01",
            "type": "string"
          },
          "previous_exp_year": {
            "description": "The previous expiration year of the card.",
            "example": "2024",
            "type": "string"
          }
        },
        "type": "object"
      },
      "card-reissued": {
        "title": "Card Reissued",
        "examples": [
          {
            "card_token": "00000000-0000-0000-0000-000000000001"
          }
        ],
        "properties": {
          "card_token": {
            "description": "The token of the card that was reissued.",
            "example": "00000000-0000-0000-0000-000000000001",
            "format": "uuid",
            "type": "string"
          }
        },
        "type": "object"
      },
      "card-shipped": {
        "title": "Card Shipped",
        "examples": [
          {
            "card_token": "00000000-0000-0000-0000-000000000001",
            "shipping_method": "USPS without tracking envelope",
            "tracking_number": "1Z9999999999999999",
            "bulk_order_token": null
          }
        ],
        "properties": {
          "card_token": {
            "description": "The token of the card that was shipped.",
            "example": "00000000-0000-0000-0000-000000000001",
            "format": "uuid",
            "type": "string"
          },
          "bulk_order_token": {
            "description": "The token of the bulk order associated with this card shipment, if applicable.",
            "example": "00000000-0000-0000-0000-000000000002",
            "format": "uuid",
            "type": [
              "string",
              "null"
            ]
          },
          "shipping_method": {
            "description": "The specific shipping method used to ship the card.",
            "enum": [
              "Ex-US expedited with tracking",
              "Ex-US standard with tracking",
              "Ex-US standard without tracking",
              "FedEx 2 days",
              "FedEx express",
              "FedEx overnight",
              "USPS priority",
              "USPS with tracking",
              "USPS without tracking envelope",
              "USPS without tracking envelope non-machine",
              "USPS without tracking flat"
            ],
            "example": "USPS without tracking envelope",
            "type": "string"
          },
          "tracking_number": {
            "description": "The tracking number of the shipment.",
            "example": "1Z9999999999999999",
            "type": [
              "string",
              "null"
            ]
          }
        },
        "required": [
          "card_token",
          "bulk_order_token",
          "shipping_method",
          "tracking_number"
        ],
        "type": "object"
      },
      "card-updated": {
        "title": "Card Updated",
        "examples": [
          {
            "previous_fields": {
              "state": "PAUSED"
            },
            "state": "OPEN",
            "card_token": "00000000-0000-0000-0000-000000000000"
          }
        ],
        "properties": {
          "previous_fields": {
            "description": "The previous values of the fields that were updated.",
            "example": {
              "state": "PAUSED"
            },
            "type": "object"
          },
          "state": {
            "description": "The current state of the card.",
            "example": "OPEN",
            "type": "string"
          },
          "card_token": {
            "description": "The token of the card that was updated.",
            "example": "00000000-0000-0000-0000-000000000000",
            "format": "uuid",
            "type": "string"
          }
        },
        "required": [
          "previous_fields",
          "state",
          "card_token"
        ],
        "type": "object"
      },
      "card-transaction-enhanced-data-created": {
        "title": "Card Transaction Enhanced Data Created",
        "allOf": [
          {
            "$ref": "#/components/schemas/enhanced-data"
          }
        ],
        "examples": [
          {
            "token": "fda41769-2a3f-5532-898f-0d2034f2da85",
            "transaction_token": "6b79924e-0f01-4bdf-9485-9f6da44b6be2",
            "event_token": "49bbd49c-dfe1-56db-86ad-98c7c2bd75e4",
            "common": {
              "customer_reference_number": null,
              "merchant_reference_number": null,
              "order_date": null,
              "line_items": [],
              "tax": {
                "merchant_tax_id": "521236050",
                "amount": null,
                "exempt": null
              }
            },
            "fleet": [
              {
                "service_type": "SELF_SERVICE",
                "driver_number": null,
                "vehicle_number": "012345",
                "odometer": 12345,
                "amount_totals": {
                  "gross_sale": 104,
                  "discount": null,
                  "net_sale": 104
                },
                "fuel": {
                  "quantity": "0.24300",
                  "type": "PREMIUM_SUPER",
                  "unit_of_measure": "GALLONS",
                  "unit_price": 4300
                }
              }
            ]
          }
        ]
      },
      "card-transaction-enhanced-data-updated": {
        "title": "Card Transaction Enhanced Data Updated",
        "allOf": [
          {
            "$ref": "#/components/schemas/enhanced-data"
          }
        ],
        "examples": [
          {
            "token": "fda41769-2a3f-5532-898f-0d2034f2da85",
            "transaction_token": "6b79924e-0f01-4bdf-9485-9f6da44b6be2",
            "event_token": "49bbd49c-dfe1-56db-86ad-98c7c2bd75e4",
            "common": {
              "customer_reference_number": null,
              "merchant_reference_number": null,
              "order_date": null,
              "line_items": [],
              "tax": {
                "merchant_tax_id": "521236050",
                "amount": null,
                "exempt": null
              }
            },
            "fleet": [
              {
                "service_type": "SELF_SERVICE",
                "driver_number": null,
                "vehicle_number": "012345",
                "odometer": 12345,
                "amount_totals": {
                  "gross_sale": 104,
                  "discount": null,
                  "net_sale": 104
                },
                "fuel": {
                  "quantity": "0.24300",
                  "type": "PREMIUM_SUPER",
                  "unit_of_measure": "GALLONS",
                  "unit_price": 4300
                }
              }
            ]
          }
        ]
      },
      "customer-tokenization-decision": {
        "description": "Contains the metadata for the customer tokenization decision.",
        "type": "object",
        "properties": {
          "latency": {
            "description": "Time in ms it took for the customer's URL to respond",
            "example": "100",
            "type": "string"
          },
          "outcome": {
            "description": "The outcome of the customer's decision",
            "enum": [
              "APPROVED",
              "DECLINED",
              "ERROR",
              "INVALID_RESPONSE",
              "REQUIRE_ADDITIONAL_AUTHENTICATION",
              "TIMEOUT"
            ],
            "example": "APPROVED",
            "type": "string"
          },
          "responder_url": {
            "description": "The customer's subscribed URL",
            "example": "https://example.com",
            "type": "string"
          },
          "response_code": {
            "description": "The response code that the customer provided",
            "example": "123456",
            "type": "string"
          }
        },
        "required": [
          "outcome",
          "responder_url"
        ]
      },
      "digital-wallet-tokenization-approval-request": {
        "description": "An event webhook (no responder) to inform that a Tokenization Request was decisioned on.",
        "allOf": [
          {
            "$ref": "#/components/schemas/tokenization-request-base"
          },
          {
            "type": "object",
            "properties": {
              "digital_wallet_token_metadata": {
                "$ref": "#/components/schemas/digital-wallet-token-metadata"
              },
              "customer_tokenization_decision": {
                "oneOf": [
                  {
                    "type": "null"
                  },
                  {
                    "$ref": "#/components/schemas/customer-tokenization-decision"
                  }
                ]
              },
              "event_type": {
                "description": "The name of this event",
                "enum": [
                  "digital_wallet.tokenization_approval_request"
                ],
                "example": "digital_wallet.tokenization_approval_request",
                "type": "string"
              },
              "tokenization_decline_reasons": {
                "description": "List of reasons why the tokenization was declined",
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/tokenization-decline-reason"
                }
              },
              "tokenization_tfa_reasons": {
                "description": "List of reasons why two-factor authentication was required",
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/tokenization-tfa-reason"
                }
              },
              "rule_results": {
                "description": "Results from rules that were evaluated for this tokenization",
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/tokenization-rule-result"
                }
              }
            },
            "required": [
              "customer_tokenization_decision",
              "digital_wallet_token_metadata",
              "event_type"
            ]
          }
        ],
        "examples": [
          {
            "account_token": "00000000-0000-0000-0000-000000000002",
            "card_token": "00000000-0000-0000-0000-000000000001",
            "created": "2023-09-18T12:34:56Z",
            "customer_tokenization_decision": {
              "latency": "100",
              "outcome": "APPROVED",
              "responder_url": "https://example.com",
              "response_code": "123456"
            },
            "device": {
              "imei": "123456789012345",
              "ip_address": "1.1.1.1",
              "location": "37.3860517/-122.0838511"
            },
            "digital_wallet_token_metadata": {
              "payment_account_info": {
                "account_holder_data": {
                  "phone_number": "+15555555555"
                },
                "pan_unique_reference": "pan_unique_ref_1234567890123456789012345678",
                "payment_account_reference": "ref_1234567890123456789012",
                "token_unique_reference": "token_unique_ref_1234567890123456789012345678"
              },
              "payment_app_instance_id": "app_instance_123456789012345678901234567890",
              "status": "Pending",
              "token_requestor_id": "12345678901",
              "token_requestor_name": "APPLE_PAY"
            },
            "event_type": "digital_wallet.tokenization_approval_request",
            "issuer_decision": "APPROVED",
            "tokenization_channel": "DIGITAL_WALLET",
            "tokenization_source": "PUSH_PROVISION",
            "tokenization_token": "tok_1234567890abcdef",
            "wallet_decisioning_info": {
              "account_score": "100",
              "device_score": "100",
              "recommendation_reasons": [
                "Reason1"
              ],
              "recommended_decision": "Decision1"
            },
            "tokenization_decline_reasons": [
              "ACCOUNT_SCORE_1"
            ],
            "tokenization_tfa_reasons": [],
            "rule_results": [
              {
                "auth_rule_token": "550e8400-e29b-41d4-a716-446655440003",
                "result": "DECLINED",
                "name": "CustomerAccountRule",
                "explanation": "Account risk too high"
              }
            ]
          }
        ]
      },
      "digital-wallet-tokenization-result": {
        "title": "Digital Wallet Tokenization Result",
        "examples": [
          {
            "account_token": "00000000-0000-0000-0000-000000000002",
            "card_token": "00000000-0000-0000-0000-000000000001",
            "created": "2020-01-01T00:00:00Z",
            "tokenization_result_details": {
              "issuer_decision": "APPROVED",
              "tokenization_decline_reasons": [
                "ACCOUNT_SCORE_1",
                "DEVICE_SCORE_1"
              ],
              "wallet_decision": "APPROVED"
            },
            "tokenization_token": "00000000-0000-0000-0000-000000000003"
          }
        ],
        "properties": {
          "account_token": {
            "description": "Account token",
            "example": "00000000-0000-0000-0000-000000000002",
            "type": "string"
          },
          "card_token": {
            "description": "Card token",
            "example": "00000000-0000-0000-0000-000000000001",
            "type": "string"
          },
          "created": {
            "description": "Created date",
            "example": "2020-01-01T00:00:00Z",
            "format": "date-time",
            "type": "string"
          },
          "tokenization_result_details": {
            "additionalProperties": false,
            "description": "The result of the tokenization request.",
            "properties": {
              "customer_decision": {
                "description": "The customer's tokenization decision if applicable.",
                "type": [
                  "string",
                  "null"
                ]
              },
              "issuer_decision": {
                "description": "Lithic's tokenization decision.",
                "type": "string"
              },
              "token_activated_date_time": {
                "description": "An RFC 3339 timestamp indicating when the tokenization succeeded.",
                "example": "2020-01-01T00:00:00Z",
                "format": "date-time",
                "type": [
                  "string",
                  "null"
                ]
              },
              "tokenization_decline_reasons": {
                "description": "List of reasons why the tokenization was declined",
                "example": [
                  "ACCOUNT_SCORE_1",
                  "DEVICE_SCORE_1"
                ],
                "items": {
                  "enum": [
                    "ACCOUNT_SCORE_1",
                    "ALL_WALLET_DECLINE_REASONS_PRESENT",
                    "CARD_EXPIRY_MONTH_MISMATCH",
                    "CARD_EXPIRY_YEAR_MISMATCH",
                    "CARD_INVALID_STATE",
                    "CUSTOMER_RED_PATH",
                    "CVC_MISMATCH",
                    "DEVICE_SCORE_1",
                    "GENERIC_DECLINE",
                    "INVALID_CUSTOMER_RESPONSE",
                    "NETWORK_FAILURE",
                    "WALLET_RECOMMENDED_DECISION_RED"
                  ],
                  "type": "string"
                },
                "type": "array"
              },
              "tokenization_tfa_reasons": {
                "description": "List of reasons why two-factor authentication was required",
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/tokenization-tfa-reason"
                }
              },
              "rule_results": {
                "description": "Results from rules that were evaluated for this tokenization",
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/tokenization-rule-result"
                }
              },
              "wallet_decision": {
                "description": "The wallet's recommended decision.",
                "example": "APPROVED",
                "type": [
                  "string",
                  "null"
                ]
              }
            },
            "required": [
              "issuer_decision",
              "tokenization_decline_reasons"
            ],
            "type": "object"
          },
          "tokenization_token": {
            "description": "Tokenization token",
            "example": "00000000-0000-0000-0000-000000000003",
            "type": "string"
          }
        },
        "required": [
          "account_token",
          "card_token",
          "created",
          "tokenization_result_details",
          "tokenization_token"
        ],
        "type": "object"
      },
      "digital-wallet-tokenization-two-factor-authentication-code": {
        "title": "Digital Wallet Tokenization Two Factor Authentication Code",
        "description": "Self Serve 2FA Code Schema",
        "examples": [
          {
            "account_token": "00000000-0000-0000-0000-000000000002",
            "activation_method": {
              "type": "TEXT_TO_CARDHOLDER_NUMBER",
              "value": "+15555555555"
            },
            "authentication_code": "123456",
            "card_token": "00000000-0000-0000-0000-000000000001",
            "created": "2020-01-01T00:00:00Z",
            "tokenization_token": "00000000-0000-0000-0000-000000000003"
          }
        ],
        "properties": {
          "account_token": {
            "description": "Unique identifier for the user tokenizing a card",
            "example": "00000000-0000-0000-0000-000000000002",
            "type": "string"
          },
          "activation_method": {
            "description": "",
            "properties": {
              "type": {
                "description": "The communication method that the user has selected to use to receive the authentication code.\nSupported Values: Sms = \"TEXT_TO_CARDHOLDER_NUMBER\". Email = \"EMAIL_TO_CARDHOLDER_ADDRESS\"",
                "enum": [
                  "EMAIL_TO_CARDHOLDER_ADDRESS",
                  "TEXT_TO_CARDHOLDER_NUMBER"
                ],
                "example": "TEXT_TO_CARDHOLDER_NUMBER",
                "type": "string"
              },
              "value": {
                "description": "The location where the user wants to receive the authentication code.\nThe format depends on the ActivationMethod.Type field. If Type is Email, the Value will be the email address. If the Type is Sms, the Value will be the phone number.",
                "example": "+15555555555",
                "type": "string"
              }
            },
            "required": [
              "type",
              "value"
            ],
            "type": "object"
          },
          "authentication_code": {
            "description": "Authentication code to provide to the user tokenizing a card.",
            "example": "123456",
            "type": "string"
          },
          "card_token": {
            "description": "Unique identifier for the card being tokenized",
            "example": "00000000-0000-0000-0000-000000000001",
            "type": "string"
          },
          "created": {
            "description": "Indicate when the request was received from Mastercard or Visa",
            "example": "2020-01-01T00:00:00Z",
            "format": "date-time",
            "title": "Created",
            "type": "string"
          },
          "tokenization_token": {
            "description": "Unique identifier for the tokenization",
            "example": "00000000-0000-0000-0000-000000000003",
            "type": "string"
          }
        },
        "required": [
          "account_token",
          "activation_method",
          "authentication_code",
          "card_token",
          "created",
          "tokenization_token"
        ],
        "type": "object"
      },
      "digital-wallet-tokenization-two-factor-authentication-code-sent": {
        "title": "Digital Wallet Tokenization Two Factor Authentication Code Sent",
        "description": "2FA Code Sent Schema",
        "examples": [
          {
            "account_token": "00000000-0000-0000-0000-000000000002",
            "activation_method": {
              "type": "TEXT_TO_CARDHOLDER_NUMBER",
              "value": "+15555555555"
            },
            "card_token": "00000000-0000-0000-0000-000000000001",
            "created": "2020-01-01T00:00:00Z",
            "tokenization_token": "00000000-0000-0000-0000-000000000003"
          }
        ],
        "properties": {
          "account_token": {
            "description": "Unique identifier for the user tokenizing a card",
            "example": "00000000-0000-0000-0000-000000000002",
            "type": "string"
          },
          "activation_method": {
            "description": "",
            "properties": {
              "type": {
                "description": "The communication method that the user has selected to use to receive the authentication code.\nSupported Values: Sms = \"TEXT_TO_CARDHOLDER_NUMBER\". Email = \"EMAIL_TO_CARDHOLDER_ADDRESS\"",
                "enum": [
                  "EMAIL_TO_CARDHOLDER_ADDRESS",
                  "TEXT_TO_CARDHOLDER_NUMBER"
                ],
                "example": "TEXT_TO_CARDHOLDER_NUMBER",
                "type": "string"
              },
              "value": {
                "description": "The location to which the authentication code was sent.\nThe format depends on the ActivationMethod.Type field. If Type is Email, the Value will be the email address. If the Type is Sms, the Value will be the phone number.",
                "example": "+15555555555",
                "type": "string"
              }
            },
            "required": [
              "type",
              "value"
            ],
            "type": "object"
          },
          "card_token": {
            "description": "Unique identifier for the card being tokenized",
            "example": "00000000-0000-0000-0000-000000000001",
            "type": "string"
          },
          "created": {
            "description": "Indicate when the request was received from Mastercard or Visa",
            "example": "2020-01-01T00:00:00Z",
            "format": "date-time",
            "title": "Created",
            "type": "string"
          },
          "tokenization_token": {
            "description": "Unique identifier for the tokenization",
            "example": "00000000-0000-0000-0000-000000000003",
            "type": "string"
          }
        },
        "required": [
          "account_token",
          "activation_method",
          "card_token",
          "created",
          "tokenization_token"
        ],
        "type": "object"
      },
      "digital-wallet-tokenization-updated": {
        "title": "Digital Wallet Tokenization Updated",
        "examples": [
          {
            "account_token": "00000000-0000-0000-0000-000000000002",
            "card_token": "00000000-0000-0000-0000-000000000001",
            "created": "2023-09-13T16:05:09.893241",
            "tokenization": {
              "account_token": "61c3acef-3c2c-4d61-9352-941397b92ca3",
              "card_token": "16a410c9-7f5c-43e9-8108-bb8a72c063f7",
              "tokenization_channel": "DIGITAL_WALLET",
              "created_at": "2023-09-13T15:30:11.948371",
              "events": [
                {
                  "created_at": "2023-09-13T16:05:09.893241",
                  "result": "TOKEN_ACTIVATED",
                  "token": "a690b617-d3d4-4976-82f6-901f817ad98a",
                  "type": "TOKENIZATION_UPDATED"
                },
                {
                  "created_at": "2023-09-13T16:01:13.643241",
                  "result": "APPROVED",
                  "token": "2b2a1038-45f3-42e4-98bb-e745be3f1de1",
                  "type": "TOKENIZATION_AUTHORIZATION"
                }
              ],
              "status": "ACTIVE",
              "token": "3e9a10da-11be-4a62-a510-d43548bfcec1",
              "token_requestor_name": "APPLE_PAY",
              "token_unique_reference": "DM4MMC0000332872ef1029f38fa0184b5c9260383da192b22",
              "dpan": "5489123487251234",
              "device_id": "ba6f05c312d4a5789b2e04f05c1f9d3b81GJ4AG1",
              "payment_account_reference_id": "50019T0AL7DEFGJ4AGGT8BQDOABCD",
              "updated_at": "2023-09-13T16:05:09.893241"
            }
          }
        ],
        "properties": {
          "account_token": {
            "description": "Account token",
            "example": "00000000-0000-0000-0000-000000000002",
            "type": "string"
          },
          "card_token": {
            "description": "Card token",
            "example": "00000000-0000-0000-0000-000000000001",
            "type": "string"
          },
          "created": {
            "description": "Created date",
            "example": "2020-01-01T00:00:00Z",
            "format": "date-time",
            "type": "string"
          },
          "tokenization": {
            "$ref": "#/components/schemas/tokenization"
          }
        },
        "required": [
          "account_token",
          "card_token",
          "created",
          "tokenization"
        ],
        "type": "object"
      },
      "dispute-updated": {
        "title": "Dispute Updated",
        "allOf": [
          {
            "$ref": "#/components/schemas/dispute-v1"
          }
        ],
        "examples": [
          {
            "amount": 200,
            "arbitration_date": null,
            "created": "2023-07-19T18:39:34.768Z",
            "customer_filed_date": "2023-07-20T09:00:00Z",
            "customer_note": "I didn't receive the goods.",
            "network_claim_ids": [
              "CLAIM-001"
            ],
            "network_filed_date": "2023-07-21T11:00:00Z",
            "network_reason_code": "4808",
            "prearbitration_date": null,
            "primary_claim_id": "CLAIM-001",
            "reason": "GOODS_SERVICES_NOT_RECEIVED",
            "representment_date": null,
            "resolution_date": null,
            "resolution_note": null,
            "resolution_reason": null,
            "status": "SUBMITTED",
            "token": "b24230fa-181e-4b31-9a5c-276747e619a0",
            "transaction_token": "12345624-aa69-4cbc-a946-30d90181b621"
          }
        ]
      },
      "dispute-evidence-upload-failed": {
        "title": "Dispute Evidence Upload Failed",
        "allOf": [
          {
            "$ref": "#/components/schemas/dispute-evidence"
          }
        ],
        "examples": [
          {
            "created": "2023-07-19T18:39:34.768Z",
            "dispute_token": "f7a74167-d6d5-4f7d-8501-36df11ba371b",
            "token": "48b8e42c-a645-44f6-8604-20c3127e9008",
            "upload_status": "REJECTED"
          }
        ]
      },
      "funding_events_created_webhook": {
        "title": "Funding Event Webhook",
        "type": "object",
        "allOf": [
          {
            "$ref": "#/components/schemas/funding_event_response"
          }
        ],
        "properties": {
          "event_type": {
            "type": "string",
            "enum": [
              "funding_event.created"
            ]
          }
        },
        "required": [
          "event_type"
        ]
      },
      "internal_adjustment_event": {
        "title": "Internal Adjustment Event",
        "type": "object",
        "properties": {
          "amount": {
            "type": "integer"
          },
          "type": {
            "type": "string",
            "enum": [
              "INTERNAL_ADJUSTMENT"
            ]
          },
          "result": {
            "$ref": "#/components/schemas/transaction_result"
          },
          "created": {
            "type": "string",
            "format": "date-time"
          },
          "token": {
            "type": "string",
            "format": "uuid"
          }
        },
        "required": [
          "amount",
          "type",
          "result",
          "created",
          "token"
        ]
      },
      "internal_adjustment_transaction": {
        "title": "Internal Adjustment Transaction",
        "type": "object",
        "properties": {
          "token": {
            "type": "string",
            "format": "uuid"
          },
          "result": {
            "$ref": "#/components/schemas/transaction_result"
          },
          "category": {
            "type": "string",
            "enum": [
              "INTERNAL"
            ]
          },
          "status": {
            "$ref": "#/components/schemas/transaction_status"
          },
          "settled_amount": {
            "type": "integer"
          },
          "pending_amount": {
            "type": "integer"
          },
          "currency": {
            "type": "string"
          },
          "events": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/internal_adjustment_event"
            }
          },
          "created": {
            "type": "string",
            "format": "date-time"
          },
          "updated": {
            "type": "string",
            "format": "date-time"
          },
          "descriptor": {
            "type": "string"
          }
        },
        "required": [
          "token",
          "result",
          "category",
          "status",
          "settled_amount",
          "pending_amount",
          "currency",
          "events",
          "created",
          "updated",
          "descriptor"
        ]
      },
      "payment-transaction-created": {
        "title": "Payment Transaction Created",
        "allOf": [
          {
            "$ref": "#/components/schemas/payment-transaction"
          }
        ],
        "examples": [
          {
            "category": "ACH",
            "family": "PAYMENT",
            "created": "2023-09-14T12:52:44Z",
            "currency": "USD",
            "descriptor": "custom description",
            "direction": "DEBIT",
            "events": [
              {
                "amount": 4103,
                "created": "2023-09-14T12:52:44Z",
                "result": "APPROVED",
                "token": "f274f723-b156-5b15-a96d-5ba8d5241b09",
                "type": "ACH_ORIGINATION_INITIATED"
              }
            ],
            "external_bank_account_token": "b05c313e-35db-4b47-a33b-7b268d72b1f5",
            "financial_account_token": "39ec6bf0-c101-520e-965a-a4fffce1d755",
            "related_account_tokens": null,
            "method": "ACH_NEXT_DAY",
            "method_attributes": {
              "retries": 0,
              "return_reason_code": null,
              "sec_code": "CCD"
            },
            "pending_amount": 4103,
            "result": "APPROVED",
            "settled_amount": 0,
            "source": "CUSTOMER",
            "status": "PENDING",
            "token": "147595d7-45f4-4c91-a950-3436d16847e5",
            "type": "ORIGINATION_DEBIT",
            "updated": "2023-09-14T12:52:44Z",
            "user_defined_id": null
          }
        ]
      },
      "payment-transaction-updated": {
        "title": "Payment Transaction Updated",
        "allOf": [
          {
            "$ref": "#/components/schemas/payment-transaction"
          }
        ],
        "examples": [
          {
            "category": "ACH",
            "family": "PAYMENT",
            "created": "2023-09-14T12:52:44Z",
            "currency": "USD",
            "descriptor": "custom description",
            "direction": "DEBIT",
            "events": [
              {
                "amount": 4103,
                "created": "2023-09-14T12:52:44Z",
                "result": "APPROVED",
                "token": "f274f723-b156-5b15-a96d-5ba8d5241b09",
                "type": "ACH_ORIGINATION_INITIATED"
              },
              {
                "amount": 4103,
                "created": "2023-09-14T12:52:46Z",
                "result": "APPROVED",
                "token": "95719c03-7eb8-560b-9843-39da92df5231",
                "type": "ACH_ORIGINATION_PROCESSED"
              },
              {
                "amount": 4103,
                "created": "2023-09-14T12:52:47Z",
                "result": "APPROVED",
                "token": "87fea0af-931f-5e80-a9cf-a243aa71b89d",
                "type": "ACH_ORIGINATION_RELEASED"
              }
            ],
            "external_bank_account_token": "b05c313e-35db-4b47-a33b-7b268d72b1f5",
            "financial_account_token": "39ec6bf0-c101-520e-965a-a4fffce1d755",
            "related_account_tokens": null,
            "method": "ACH_NEXT_DAY",
            "method_attributes": {
              "retries": 0,
              "return_reason_code": null,
              "sec_code": "CCD",
              "addenda": null
            },
            "pending_amount": 0,
            "result": "APPROVED",
            "settled_amount": 4103,
            "source": "CUSTOMER",
            "status": "SETTLED",
            "token": "147595d7-45f4-4c91-a950-3436d16847e5",
            "updated": "2023-09-14T12:52:47Z",
            "user_defined_id": null
          }
        ]
      },
      "statements_created_webhook": {
        "title": "Statement Webhook",
        "type": "object",
        "allOf": [
          {
            "$ref": "#/components/schemas/statement_response"
          }
        ],
        "properties": {
          "event_type": {
            "type": "string",
            "enum": [
              "statements.created"
            ]
          }
        },
        "required": [
          "event_type"
        ]
      },
      "challenge": {
        "title": "3DS Challenge object",
        "type": "object",
        "description": "Represents a challenge object for 3DS authentication",
        "properties": {
          "challenge_method_type": {
            "type": "string",
            "description": "The type of challenge method issued to the cardholder",
            "enum": [
              "OUT_OF_BAND"
            ]
          },
          "start_time": {
            "type": "string",
            "description": "ISO-8601 time at which the challenge has started",
            "format": "date-time"
          },
          "expiry_time": {
            "type": "string",
            "description": "ISO-8601 time at which the challenge expires",
            "format": "date-time"
          },
          "app_requestor_url": {
            "type": [
              "string",
              "null"
            ],
            "description": "Fully qualified app URL of the merchant app. This should be used to redirect the cardholder back to the merchant app after completing an app-based challenge. This URL will only be populated if the 3DS Requestor App is provided to the 3DS SDK.",
            "format": "uri"
          }
        },
        "required": [
          "challenge_method_type",
          "start_time",
          "expiry_time"
        ]
      },
      "challenge-event": {
        "title": "3DS Challenge webhook event",
        "type": "object",
        "description": "Represents a challenge event that is emitted after issuing a 3DS challenge",
        "properties": {
          "authentication_object": {
            "$ref": "#/components/schemas/authentication"
          },
          "challenge": {
            "$ref": "#/components/schemas/challenge"
          },
          "event_type": {
            "const": "three_ds_authentication.challenge"
          }
        },
        "required": [
          "authentication_object",
          "challenge",
          "event_type"
        ]
      },
      "tokenization-approval-request": {
        "description": "An event webhook (no responder) to inform that a Tokenization Request was decisioned on.",
        "allOf": [
          {
            "$ref": "#/components/schemas/tokenization-request-base"
          },
          {
            "type": "object",
            "properties": {
              "token_metadata": {
                "$ref": "#/components/schemas/digital-wallet-token-metadata"
              },
              "customer_tokenization_decision": {
                "oneOf": [
                  {
                    "type": "null"
                  },
                  {
                    "$ref": "#/components/schemas/customer-tokenization-decision"
                  }
                ]
              },
              "event_type": {
                "description": "The name of this event",
                "enum": [
                  "tokenization.approval_request"
                ],
                "example": "tokenization.approval_request",
                "type": "string"
              },
              "tokenization_decline_reasons": {
                "description": "List of reasons why the tokenization was declined",
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/tokenization-decline-reason"
                }
              },
              "tokenization_tfa_reasons": {
                "description": "List of reasons why two-factor authentication was required",
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/tokenization-tfa-reason"
                }
              },
              "rule_results": {
                "description": "Results from rules that were evaluated for this tokenization",
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/tokenization-rule-result"
                }
              }
            },
            "required": [
              "customer_tokenization_decision",
              "event_type",
              "token_metadata"
            ]
          }
        ],
        "examples": [
          {
            "account_token": "00000000-0000-0000-0000-000000000002",
            "card_token": "00000000-0000-0000-0000-000000000001",
            "created": "2023-09-18T12:34:56Z",
            "customer_tokenization_decision": {
              "latency": "100",
              "outcome": "APPROVED",
              "responder_url": "https://example.com",
              "response_code": "123456"
            },
            "device": {
              "imei": "123456789012345",
              "ip_address": "1.1.1.1",
              "location": "37.3860517/-122.0838511"
            },
            "token_metadata": {
              "payment_account_info": {
                "account_holder_data": {
                  "phone_number": "+15555555555"
                },
                "pan_unique_reference": "pan_unique_ref_1234567890123456789012345678",
                "payment_account_reference": "ref_1234567890123456789012",
                "token_unique_reference": "token_unique_ref_1234567890123456789012345678"
              },
              "payment_app_instance_id": "app_instance_123456789012345678901234567890",
              "status": "Pending",
              "token_requestor_id": "12345678901",
              "token_requestor_name": "APPLE_PAY"
            },
            "event_type": "tokenization.approval_request",
            "issuer_decision": "APPROVED",
            "tokenization_channel": "DIGITAL_WALLET",
            "tokenization_source": "PUSH_PROVISION",
            "tokenization_token": "tok_1234567890abcdef",
            "wallet_decisioning_info": {
              "account_score": "100",
              "device_score": "100",
              "recommendation_reasons": [
                "Reason1"
              ],
              "recommended_decision": "Decision1"
            },
            "tokenization_decline_reasons": [],
            "tokenization_tfa_reasons": [
              "WALLET_RECOMMENDED_TFA"
            ],
            "rule_results": [
              {
                "auth_rule_token": "550e8400-e29b-41d4-a716-446655440001",
                "result": "REQUIRE_TFA",
                "name": "CustomerRiskRule",
                "explanation": "High risk transaction detected"
              }
            ]
          }
        ]
      },
      "tokenization-result": {
        "title": "Tokenization Result",
        "examples": [
          {
            "account_token": "00000000-0000-0000-0000-000000000002",
            "card_token": "00000000-0000-0000-0000-000000000001",
            "created": "2020-01-01T00:00:00Z",
            "tokenization_result_details": {
              "issuer_decision": "APPROVED",
              "tokenization_decline_reasons": [
                "ACCOUNT_SCORE_1",
                "DEVICE_SCORE_1"
              ],
              "wallet_decision": "APPROVED"
            },
            "tokenization_token": "00000000-0000-0000-0000-000000000003"
          }
        ],
        "properties": {
          "account_token": {
            "description": "Account token",
            "example": "00000000-0000-0000-0000-000000000002",
            "type": "string"
          },
          "card_token": {
            "description": "Card token",
            "example": "00000000-0000-0000-0000-000000000001",
            "type": "string"
          },
          "created": {
            "description": "Created date",
            "example": "2020-01-01T00:00:00Z",
            "format": "date-time",
            "type": "string"
          },
          "tokenization_result_details": {
            "additionalProperties": false,
            "description": "The result of the tokenization request.",
            "properties": {
              "customer_decision": {
                "description": "The customer's tokenization decision if applicable.",
                "type": [
                  "string",
                  "null"
                ]
              },
              "issuer_decision": {
                "description": "Lithic's tokenization decision.",
                "type": "string"
              },
              "token_activated_date_time": {
                "description": "An RFC 3339 timestamp indicating when the tokenization succeeded.",
                "example": "2020-01-01T00:00:00Z",
                "format": "date-time",
                "type": [
                  "string",
                  "null"
                ]
              },
              "tokenization_decline_reasons": {
                "description": "List of reasons why the tokenization was declined",
                "example": [
                  "ACCOUNT_SCORE_1",
                  "DEVICE_SCORE_1"
                ],
                "items": {
                  "enum": [
                    "ACCOUNT_SCORE_1",
                    "ALL_WALLET_DECLINE_REASONS_PRESENT",
                    "CARD_EXPIRY_MONTH_MISMATCH",
                    "CARD_EXPIRY_YEAR_MISMATCH",
                    "CARD_INVALID_STATE",
                    "CUSTOMER_RED_PATH",
                    "CVC_MISMATCH",
                    "DEVICE_SCORE_1",
                    "GENERIC_DECLINE",
                    "INVALID_CUSTOMER_RESPONSE",
                    "NETWORK_FAILURE",
                    "WALLET_RECOMMENDED_DECISION_RED"
                  ],
                  "type": "string"
                },
                "type": "array"
              },
              "tokenization_tfa_reasons": {
                "description": "List of reasons why two-factor authentication was required",
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/tokenization-tfa-reason"
                }
              },
              "rule_results": {
                "description": "Results from rules that were evaluated for this tokenization",
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/tokenization-rule-result"
                }
              },
              "wallet_decision": {
                "description": "The wallet's recommended decision.",
                "example": "APPROVED",
                "type": [
                  "string",
                  "null"
                ]
              }
            },
            "required": [
              "issuer_decision",
              "tokenization_decline_reasons"
            ],
            "type": "object"
          },
          "tokenization_token": {
            "description": "Tokenization token",
            "example": "00000000-0000-0000-0000-000000000003",
            "type": "string"
          }
        },
        "required": [
          "account_token",
          "card_token",
          "created",
          "tokenization_result_details",
          "tokenization_token"
        ],
        "type": "object"
      },
      "tokenization-two-factor-authentication-code": {
        "title": "Tokenization Two Factor Authentication Code",
        "description": "Self Serve 2FA Code Schema",
        "examples": [
          {
            "account_token": "00000000-0000-0000-0000-000000000002",
            "activation_method": {
              "type": "TEXT_TO_CARDHOLDER_NUMBER",
              "value": "+15555555555"
            },
            "authentication_code": "123456",
            "card_token": "00000000-0000-0000-0000-000000000001",
            "created": "2020-01-01T00:00:00Z",
            "tokenization_token": "00000000-0000-0000-0000-000000000003"
          }
        ],
        "properties": {
          "account_token": {
            "description": "Unique identifier for the user tokenizing a card",
            "example": "00000000-0000-0000-0000-000000000002",
            "type": "string"
          },
          "activation_method": {
            "description": "",
            "properties": {
              "type": {
                "description": "The communication method that the user has selected to use to receive the authentication code.\nSupported Values: Sms = \"TEXT_TO_CARDHOLDER_NUMBER\". Email = \"EMAIL_TO_CARDHOLDER_ADDRESS\"",
                "enum": [
                  "EMAIL_TO_CARDHOLDER_ADDRESS",
                  "TEXT_TO_CARDHOLDER_NUMBER"
                ],
                "example": "TEXT_TO_CARDHOLDER_NUMBER",
                "type": "string"
              },
              "value": {
                "description": "The location where the user wants to receive the authentication code.\nThe format depends on the ActivationMethod.Type field. If Type is Email, the Value will be the email address. If the Type is Sms, the Value will be the phone number.",
                "example": "+15555555555",
                "type": "string"
              }
            },
            "required": [
              "type",
              "value"
            ],
            "type": "object"
          },
          "authentication_code": {
            "description": "Authentication code to provide to the user tokenizing a card.",
            "example": "123456",
            "type": "string"
          },
          "card_token": {
            "description": "Unique identifier for the card being tokenized",
            "example": "00000000-0000-0000-0000-000000000001",
            "type": "string"
          },
          "created": {
            "description": "Indicate when the request was received from Mastercard or Visa",
            "example": "2020-01-01T00:00:00Z",
            "format": "date-time",
            "title": "Created",
            "type": "string"
          },
          "tokenization_token": {
            "description": "Unique identifier for the tokenization",
            "example": "00000000-0000-0000-0000-000000000003",
            "type": "string"
          }
        },
        "required": [
          "account_token",
          "activation_method",
          "authentication_code",
          "card_token",
          "created",
          "tokenization_token"
        ],
        "type": "object"
      },
      "tokenization-two-factor-authentication-code-sent": {
        "title": "Tokenization Two Factor Authentication Code Sent",
        "description": "2FA Code Sent Schema",
        "examples": [
          {
            "account_token": "00000000-0000-0000-0000-000000000002",
            "activation_method": {
              "type": "TEXT_TO_CARDHOLDER_NUMBER",
              "value": "+15555555555"
            },
            "card_token": "00000000-0000-0000-0000-000000000001",
            "created": "2020-01-01T00:00:00Z",
            "tokenization_token": "00000000-0000-0000-0000-000000000003"
          }
        ],
        "properties": {
          "account_token": {
            "description": "Unique identifier for the user tokenizing a card",
            "example": "00000000-0000-0000-0000-000000000002",
            "type": "string"
          },
          "activation_method": {
            "description": "",
            "properties": {
              "type": {
                "description": "The communication method that the user has selected to use to receive the authentication code.\nSupported Values: Sms = \"TEXT_TO_CARDHOLDER_NUMBER\". Email = \"EMAIL_TO_CARDHOLDER_ADDRESS\"",
                "enum": [
                  "EMAIL_TO_CARDHOLDER_ADDRESS",
                  "TEXT_TO_CARDHOLDER_NUMBER"
                ],
                "example": "TEXT_TO_CARDHOLDER_NUMBER",
                "type": "string"
              },
              "value": {
                "description": "The location to which the authentication code was sent.\nThe format depends on the ActivationMethod.Type field. If Type is Email, the Value will be the email address. If the Type is Sms, the Value will be the phone number.",
                "example": "+15555555555",
                "type": "string"
              }
            },
            "required": [
              "type",
              "value"
            ],
            "type": "object"
          },
          "card_token": {
            "description": "Unique identifier for the card being tokenized",
            "example": "00000000-0000-0000-0000-000000000001",
            "type": "string"
          },
          "created": {
            "description": "Indicate when the request was received from Mastercard or Visa",
            "example": "2020-01-01T00:00:00Z",
            "format": "date-time",
            "title": "Created",
            "type": "string"
          },
          "tokenization_token": {
            "description": "Unique identifier for the tokenization",
            "example": "00000000-0000-0000-0000-000000000003",
            "type": "string"
          }
        },
        "required": [
          "account_token",
          "activation_method",
          "card_token",
          "created",
          "tokenization_token"
        ],
        "type": "object"
      },
      "tokenization-updated": {
        "title": "Tokenization Updated",
        "examples": [
          {
            "account_token": "00000000-0000-0000-0000-000000000002",
            "card_token": "00000000-0000-0000-0000-000000000001",
            "created": "2023-09-13T16:05:09.893241",
            "tokenization": {
              "account_token": "61c3acef-3c2c-4d61-9352-941397b92ca3",
              "card_token": "16a410c9-7f5c-43e9-8108-bb8a72c063f7",
              "tokenization_channel": "DIGITAL_WALLET",
              "created_at": "2023-09-13T15:30:11.948371",
              "events": [
                {
                  "created_at": "2023-09-13T16:05:09.893241",
                  "result": "TOKEN_ACTIVATED",
                  "token": "a690b617-d3d4-4976-82f6-901f817ad98a",
                  "type": "TOKENIZATION_UPDATED"
                },
                {
                  "created_at": "2023-09-13T16:01:13.643241",
                  "result": "APPROVED",
                  "token": "2b2a1038-45f3-42e4-98bb-e745be3f1de1",
                  "type": "TOKENIZATION_AUTHORIZATION"
                }
              ],
              "status": "ACTIVE",
              "token": "3e9a10da-11be-4a62-a510-d43548bfcec1",
              "token_requestor_name": "APPLE_PAY",
              "token_unique_reference": "DM4MMC0000332872ef1029f38fa0184b5c9260383da192b22",
              "dpan": "5489123487251234",
              "device_id": "ba6f05c312d4a5789b2e04f05c1f9d3b81GJ4AG1",
              "payment_account_reference_id": "50019T0AL7DEFGJ4AGGT8BQDOABCD",
              "updated_at": "2023-09-13T16:05:09.893241"
            }
          }
        ],
        "properties": {
          "account_token": {
            "description": "Account token",
            "example": "00000000-0000-0000-0000-000000000002",
            "type": "string"
          },
          "card_token": {
            "description": "Card token",
            "example": "00000000-0000-0000-0000-000000000001",
            "type": "string"
          },
          "created": {
            "description": "Created date",
            "example": "2020-01-01T00:00:00Z",
            "format": "date-time",
            "type": "string"
          },
          "tokenization": {
            "$ref": "#/components/schemas/tokenization"
          }
        },
        "required": [
          "account_token",
          "card_token",
          "created",
          "tokenization"
        ],
        "type": "object"
      },
      "three-ds-decisioning": {
        "title": "3DS Decision Response object",
        "type": "object",
        "description": "Information on whether the Authentication should be approved, declined or challenged.",
        "properties": {
          "three_ds_authentication_decision": {
            "type": "string",
            "description": "* `APPROVE` - Approve the 3DS Transaction and proceed to Authorization\n* `DECLINE` - Decline the 3DS Transaction ending the transaction\n* `CHALLENGE_REQUESTED` - Conditional Approval for the 3DS Transaction where a follow-up Challenge will be triggered to further authenticate the Cardholder",
            "enum": [
              "APPROVE",
              "DECLINE",
              "CHALLENGE_REQUESTED"
            ]
          },
          "oob_url": {
            "type": "string",
            "description": "URL which may be used in the presentation of a 3DS Challenge UI to the cardholder. This value will be used by the ACS as the OOB App URL. When applicable, this URL may be used for automatic app switching or rendered directly as an element in the Challenge UI.\nThis field is only used with CHALLENGE_REQUESTED decision and when customer orchestrates the 3DS challenge on their own."
          }
        },
        "required": [
          "three_ds_authentication_decision"
        ]
      }
    },
    "responses": {
      "NotFound": {
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/error"
            }
          }
        },
        "description": "The specified resource was not found."
      }
    }
  },
  "webhooks": {
    "account_holder.created": {
      "post": {
        "description": "Occurs when a new account_holder is created.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "properties": {
                      "event_type": {
                        "description": "The type of event that occurred.",
                        "const": "account_holder.created",
                        "example": "account_holder.created",
                        "type": "string"
                      }
                    },
                    "type": "object",
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/account-holder-created"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully"
          }
        },
        "summary": "account_holder.created",
        "tags": [
          "Event Types"
        ]
      }
    },
    "account_holder.updated": {
      "post": {
        "description": "Occurs when an account_holder is updated.",
        "requestBody": {
          "content": {
            "application/json": {
              "examples": {
                "kybExample": {
                  "summary": "KYB Payload Example",
                  "value": {
                    "event_type": "account_holder.updated",
                    "token": "00000000-0000-0000-0000-000000000001",
                    "update_request": {
                      "business_entity": {
                        "government_id": "111-23-1413",
                        "legal_business_name": "Acme, Inc.",
                        "phone_numbers": [
                          "+15555555555"
                        ],
                        "address": {
                          "address1": "123 Main St",
                          "city": "Anytown",
                          "country": "USA",
                          "state": "CA",
                          "postal_code": "61023"
                        }
                      },
                      "control_person": {
                        "address": {
                          "address1": "451 New Forest Way",
                          "city": "Springfield",
                          "country": "USA",
                          "state": "IL",
                          "postal_code": "68022"
                        }
                      }
                    },
                    "website_url": "https://www.mynewbusiness.com"
                  }
                },
                "kycExample": {
                  "summary": "KYC Payload Example",
                  "value": {
                    "event_type": "account_holder.updated",
                    "token": "00000000-0000-0000-0000-000000000001",
                    "update_request": {
                      "individual": {
                        "address": {
                          "address1": "451 New Forest Way",
                          "city": "Springfield",
                          "country": "USA",
                          "state": "IL",
                          "postal_code": "68022"
                        },
                        "phone_number": "+15555555555",
                        "first_name": "John",
                        "last_name": "Appleseed"
                      }
                    }
                  }
                },
                "legacyExample": {
                  "summary": "Legacy Payload Example",
                  "value": {
                    "event_type": "account_holder.updated",
                    "business_account_token": null,
                    "created": "2023-09-26 16:41:40.530938",
                    "email": "john@lithic.com",
                    "external_id": null,
                    "first_name": "John",
                    "last_name": "Appleseed",
                    "phone_number": "+15555555555",
                    "token": "00000000-0000-0000-0000-000000000001"
                  }
                }
              },
              "schema": {
                "allOf": [
                  {
                    "properties": {
                      "event_type": {
                        "description": "The type of event that occurred.",
                        "const": "account_holder.updated",
                        "example": "account_holder.updated",
                        "type": "string"
                      }
                    },
                    "type": "object",
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/account-holder-updated"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully"
          }
        },
        "summary": "account_holder.updated",
        "tags": [
          "Event Types"
        ]
      }
    },
    "account_holder.verification": {
      "post": {
        "description": "Occurs when an asynchronous account_holder's verification is completed.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "properties": {
                      "event_type": {
                        "description": "The type of event that occurred.",
                        "const": "account_holder.verification",
                        "example": "account_holder.verification",
                        "type": "string"
                      }
                    },
                    "type": "object",
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/account-holder-verification"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully"
          }
        },
        "summary": "account_holder.verification",
        "tags": [
          "Event Types"
        ]
      }
    },
    "account_holder_document.updated": {
      "post": {
        "description": "Occurs when an account holder's document upload status has been updated",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "properties": {
                      "event_type": {
                        "description": "The type of event that occurred.",
                        "const": "account_holder_document.updated",
                        "example": "account_holder_document.updated",
                        "type": "string"
                      }
                    },
                    "type": "object",
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/account-holder-document-updated"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully"
          }
        },
        "summary": "account_holder_document.updated",
        "tags": [
          "Event Types"
        ]
      }
    },
    "card_authorization.approval_request": {
      "post": {
        "description": "Auth Stream Access Request",
        "parameters": [
          {
            "$ref": "#/components/parameters/webhookId"
          },
          {
            "$ref": "#/components/parameters/webhookTimestamp"
          },
          {
            "$ref": "#/components/parameters/webhookSignature"
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "type": "object",
                    "properties": {
                      "event_type": {
                        "type": "string",
                        "const": "card_authorization.approval_request",
                        "example": "card_authorization.approval_request"
                      }
                    },
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/asa-request"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a HTTP 200 status to indicate that the ASA responder was able to handle the request.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/asa-response"
                }
              }
            }
          },
          "5XX": {
            "description": "Return a HTTP 5XX response to indicate processing failure. This will cause Lithic to immediately retry the request once."
          }
        },
        "summary": "Auth Stream Access Request",
        "tags": [
          "Auth Stream Access (ASA)"
        ]
      }
    },
    "tokenization-decisioning.request": {
      "post": {
        "description": "Tokenization Customer Decisioning Request",
        "parameters": [
          {
            "$ref": "#/components/parameters/webhookId"
          },
          {
            "$ref": "#/components/parameters/webhookTimestamp"
          },
          {
            "$ref": "#/components/parameters/webhookSignature"
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/tokenization-decisioning-request"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a HTTP 200 status to indicate that the Tokenization Responder was able to handle the request.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/tokenization-decisioning-response"
                }
              }
            }
          }
        },
        "summary": "Tokenization Decisioning Request",
        "tags": [
          "Tokenization"
        ]
      }
    },
    "auth_rules.backtest_report.created": {
      "post": {
        "description": "Auth Rules backtest report created.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "properties": {
                      "event_type": {
                        "description": "The type of event that occurred.",
                        "const": "auth_rules.backtest_report.created",
                        "example": "auth_rules.backtest_report.created",
                        "type": "string"
                      }
                    },
                    "type": "object",
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/backtest-report"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully"
          }
        },
        "summary": "auth_rules.backtest_report.created",
        "tags": [
          "Event Types"
        ]
      }
    },
    "balance.updated": {
      "post": {
        "description": "Financial Account Balance Update",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "properties": {
                      "event_type": {
                        "description": "The type of event that occurred.",
                        "const": "balance.updated",
                        "example": "balance.updated",
                        "type": "string"
                      }
                    },
                    "type": "object",
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/balance-updated"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully"
          }
        },
        "summary": "balance.updated",
        "tags": [
          "Event Types"
        ]
      }
    },
    "book_transfer_transaction.created": {
      "post": {
        "description": "Occurs when a book transfer transaction is created.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "properties": {
                      "event_type": {
                        "description": "The type of event that occurred.",
                        "const": "book_transfer_transaction.created",
                        "example": "book_transfer_transaction.created",
                        "type": "string"
                      }
                    },
                    "type": "object",
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/book-transfer-transaction-created"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully"
          }
        },
        "summary": "book_transfer_transaction.created",
        "tags": [
          "Event Types"
        ]
      }
    },
    "book_transfer_transaction.updated": {
      "post": {
        "description": "Occurs when a book transfer transaction is updated.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "properties": {
                      "event_type": {
                        "description": "The type of event that occurred.",
                        "const": "book_transfer_transaction.updated",
                        "example": "book_transfer_transaction.updated",
                        "type": "string"
                      }
                    },
                    "type": "object",
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/book-transfer-transaction-updated"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully"
          }
        },
        "summary": "book_transfer_transaction.updated",
        "tags": [
          "Event Types"
        ]
      }
    },
    "card.created": {
      "post": {
        "description": "Occurs when a new card is created.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "properties": {
                      "event_type": {
                        "description": "The type of event that occurred.",
                        "const": "card.created",
                        "example": "card.created",
                        "type": "string"
                      }
                    },
                    "type": "object",
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/card-created"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully"
          }
        },
        "summary": "card.created",
        "tags": [
          "Event Types"
        ]
      }
    },
    "card.converted": {
      "post": {
        "description": "Occurs when a card is converted from virtual to physical cards.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "properties": {
                      "event_type": {
                        "description": "The type of event that occurred.",
                        "const": "card.converted",
                        "example": "card.converted",
                        "type": "string"
                      }
                    },
                    "type": "object",
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/card-converted"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully"
          }
        },
        "summary": "card.converted",
        "tags": [
          "Event Types"
        ]
      }
    },
    "card.renewed": {
      "post": {
        "description": "Occurs when a card is renewed.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "properties": {
                      "event_type": {
                        "description": "The type of event that occurred.",
                        "const": "card.renewed",
                        "example": "card.renewed",
                        "type": "string"
                      }
                    },
                    "type": "object",
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/card-renewed"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully"
          }
        },
        "summary": "card.renewed",
        "tags": [
          "Event Types"
        ]
      }
    },
    "card.reissued": {
      "post": {
        "description": "Occurs when a card is reissued.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "properties": {
                      "event_type": {
                        "description": "The type of event that occurred.",
                        "const": "card.reissued",
                        "example": "card.reissued",
                        "type": "string"
                      }
                    },
                    "type": "object",
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/card-reissued"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully"
          }
        },
        "summary": "card.reissued",
        "tags": [
          "Event Types"
        ]
      }
    },
    "card.shipped": {
      "post": {
        "description": "Occurs when a card is shipped.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "properties": {
                      "event_type": {
                        "description": "The type of event that occurred.",
                        "const": "card.shipped",
                        "example": "card.shipped",
                        "type": "string"
                      }
                    },
                    "type": "object",
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/card-shipped"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully"
          }
        },
        "summary": "card.shipped",
        "tags": [
          "Event Types"
        ]
      }
    },
    "card.updated": {
      "post": {
        "description": "Occurs when a card is updated.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "properties": {
                      "event_type": {
                        "description": "The type of event that occurred.",
                        "const": "card.updated",
                        "example": "card.updated",
                        "type": "string"
                      }
                    },
                    "type": "object",
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/card-updated"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully"
          }
        },
        "summary": "card.updated",
        "tags": [
          "Event Types"
        ]
      }
    },
    "card_transaction.updated": {
      "post": {
        "description": "Occurs when a card transaction happens.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "properties": {
                      "event_type": {
                        "description": "The type of event that occurred.",
                        "const": "card_transaction.updated",
                        "example": "card_transaction.updated",
                        "type": "string"
                      }
                    },
                    "type": "object",
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/card_transaction"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully"
          }
        },
        "summary": "card_transaction.updated",
        "tags": [
          "Event Types"
        ]
      }
    },
    "card_transaction.enhanced_data.created": {
      "post": {
        "description": "Occurs when L2/L3 enhanced commercial data is processed for a transaction event.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "properties": {
                      "event_type": {
                        "description": "The type of event that occurred.",
                        "const": "card_transaction.enhanced_data.created",
                        "example": "card_transaction.enhanced_data.created",
                        "type": "string"
                      }
                    },
                    "type": "object",
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/card-transaction-enhanced-data-created"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully"
          }
        },
        "summary": "card_transaction.enhanced_data.created",
        "tags": [
          "Event Types"
        ]
      }
    },
    "card_transaction.enhanced_data.updated": {
      "post": {
        "description": "Occurs when L2/L3 enhanced commercial data is reprocessed for a transaction event.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "properties": {
                      "event_type": {
                        "description": "The type of event that occurred.",
                        "const": "card_transaction.enhanced_data.updated",
                        "example": "card_transaction.enhanced_data.updated",
                        "type": "string"
                      }
                    },
                    "type": "object",
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/card-transaction-enhanced-data-updated"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully"
          }
        },
        "summary": "card_transaction.enhanced_data.updated",
        "tags": [
          "Event Types"
        ]
      }
    },
    "digital_wallet.tokenization_approval_request": {
      "post": {
        "description": "Occurs when a tokenization approval request is made.  This event will be deprecated in the future. We recommend using `tokenization.approval_request` instead.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "properties": {
                      "event_type": {
                        "description": "The type of event that occurred.",
                        "const": "digital_wallet.tokenization_approval_request",
                        "example": "digital_wallet.tokenization_approval_request",
                        "type": "string"
                      }
                    },
                    "type": "object",
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/digital-wallet-tokenization-approval-request"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully"
          }
        },
        "summary": "digital_wallet.tokenization_approval_request",
        "tags": [
          "Event Types"
        ]
      }
    },
    "digital_wallet.tokenization_result": {
      "post": {
        "description": "Occurs when a tokenization request succeeded or failed.\n\nThis event will be deprecated in the future. We recommend using `tokenization.result` instead.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "properties": {
                      "event_type": {
                        "description": "The type of event that occurred.",
                        "const": "digital_wallet.tokenization_result",
                        "example": "digital_wallet.tokenization_result",
                        "type": "string"
                      }
                    },
                    "type": "object",
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/digital-wallet-tokenization-result"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully"
          }
        },
        "summary": "digital_wallet.tokenization_result",
        "tags": [
          "Event Types"
        ]
      }
    },
    "digital_wallet.tokenization_two_factor_authentication_code": {
      "post": {
        "description": "Occurs when a tokenization request 2FA code is sent to the Lithic customer for self serve delivery.\n\nThis event will be deprecated in the future. We recommend using `tokenization.two_factor_authentication_code` instead.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "properties": {
                      "event_type": {
                        "description": "The type of event that occurred.",
                        "const": "digital_wallet.tokenization_two_factor_authentication_code",
                        "example": "digital_wallet.tokenization_two_factor_authentication_code",
                        "type": "string"
                      }
                    },
                    "type": "object",
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/digital-wallet-tokenization-two-factor-authentication-code"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully"
          }
        },
        "summary": "digital_wallet.tokenization_two_factor_authentication_code",
        "tags": [
          "Event Types"
        ]
      }
    },
    "digital_wallet.tokenization_two_factor_authentication_code_sent": {
      "post": {
        "description": "Occurs when a tokenization request 2FA code is sent to our downstream messaging providers for delivery.\n\nThis event will be deprecated in the future. We recommend using `tokenization.two_factor_authentication_code_sent` instead.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "properties": {
                      "event_type": {
                        "description": "The type of event that occurred.",
                        "const": "digital_wallet.tokenization_two_factor_authentication_code_sent",
                        "example": "digital_wallet.tokenization_two_factor_authentication_code_sent",
                        "type": "string"
                      }
                    },
                    "type": "object",
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/digital-wallet-tokenization-two-factor-authentication-code-sent"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully"
          }
        },
        "summary": "digital_wallet.tokenization_two_factor_authentication_code_sent",
        "tags": [
          "Event Types"
        ]
      }
    },
    "digital_wallet.tokenization_updated": {
      "post": {
        "description": "Occurs when a tokenization's status has changed.\n\nThis event will be deprecated in the future. We recommend using `tokenization.updated` instead.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "properties": {
                      "event_type": {
                        "description": "The type of event that occurred.",
                        "const": "digital_wallet.tokenization_updated",
                        "example": "digital_wallet.tokenization_updated",
                        "type": "string"
                      }
                    },
                    "type": "object",
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/digital-wallet-tokenization-updated"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully"
          }
        },
        "summary": "digital_wallet.tokenization_updated",
        "tags": [
          "Event Types"
        ]
      }
    },
    "dispute.updated": {
      "post": {
        "description": "Occurs when a dispute is updated.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "properties": {
                      "event_type": {
                        "description": "The type of event that occurred.",
                        "const": "dispute.updated",
                        "example": "dispute.updated",
                        "type": "string"
                      }
                    },
                    "type": "object",
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/dispute-updated"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully"
          }
        },
        "summary": "dispute.updated",
        "tags": [
          "Event Types"
        ]
      }
    },
    "dispute_evidence.upload_failed": {
      "post": {
        "description": "Occurs when a dispute evidence upload fails.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "properties": {
                      "event_type": {
                        "description": "The type of event that occurred.",
                        "const": "dispute_evidence.upload_failed",
                        "example": "dispute_evidence.upload_failed",
                        "type": "string"
                      }
                    },
                    "type": "object",
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/dispute-evidence-upload-failed"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully"
          }
        },
        "summary": "dispute_evidence.upload_failed",
        "tags": [
          "Event Types"
        ]
      }
    },
    "external_bank_account.created": {
      "post": {
        "description": "Occurs when an external bank account is created.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "properties": {
                      "event_type": {
                        "description": "The type of event that occurred.",
                        "const": "external_bank_account.created",
                        "example": "external_bank_account.created",
                        "type": "string"
                      }
                    },
                    "type": "object",
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/bank_account_api_response"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully"
          }
        },
        "summary": "external_bank_account.created",
        "tags": [
          "Event Types"
        ]
      }
    },
    "external_bank_account.updated": {
      "post": {
        "description": "Occurs when an external bank account is updated.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "properties": {
                      "event_type": {
                        "description": "The type of event that occurred.",
                        "const": "external_bank_account.updated",
                        "example": "external_bank_account.updated",
                        "type": "string"
                      }
                    },
                    "type": "object",
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/bank_account_api_response"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully"
          }
        },
        "summary": "external_bank_account.updated",
        "tags": [
          "Event Types"
        ]
      }
    },
    "external_payment.created": {
      "post": {
        "description": "Occurs when an external payment is created.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "properties": {
                      "event_type": {
                        "description": "The type of event that occurred.",
                        "const": "external_payment.created",
                        "example": "external_payment.created",
                        "type": "string"
                      }
                    },
                    "type": "object",
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/external_payment_response"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully"
          }
        },
        "summary": "external_payment.created",
        "tags": [
          "Event Types"
        ]
      }
    },
    "external_payment.updated": {
      "post": {
        "description": "Occurs when an external payment is updated.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "properties": {
                      "event_type": {
                        "description": "The type of event that occurred.",
                        "const": "external_payment.updated",
                        "example": "external_payment.updated",
                        "type": "string"
                      }
                    },
                    "type": "object",
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/external_payment_response"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully"
          }
        },
        "summary": "external_payment.updated",
        "tags": [
          "Event Types"
        ]
      }
    },
    "financial_account.created": {
      "post": {
        "description": "Occurs when a financial account is created.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "properties": {
                      "event_type": {
                        "description": "The type of event that occurred.",
                        "const": "financial_account.created",
                        "example": "financial_account.created",
                        "type": "string"
                      }
                    },
                    "type": "object",
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/financial-account-response"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully"
          }
        },
        "summary": "financial_account.created",
        "tags": [
          "Event Types"
        ]
      }
    },
    "financial_account.updated": {
      "post": {
        "description": "Occurs when a financial account is updated.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "properties": {
                      "event_type": {
                        "description": "The type of event that occurred.",
                        "const": "financial_account.updated",
                        "example": "financial_account.updated",
                        "type": "string"
                      }
                    },
                    "type": "object",
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/financial-account-response"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully"
          }
        },
        "summary": "financial_account.updated",
        "tags": [
          "Event Types"
        ]
      }
    },
    "funding_event.created": {
      "post": {
        "description": "Occurs when a funding event is created.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "properties": {
                      "event_type": {
                        "description": "The type of event that occurred.",
                        "const": "funding_event.created",
                        "example": "funding_event.created",
                        "type": "string"
                      }
                    },
                    "type": "object",
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/funding_events_created_webhook"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully"
          }
        },
        "summary": "funding_event.created",
        "tags": [
          "Event Types"
        ]
      }
    },
    "loan_tape.created": {
      "post": {
        "description": "Occurs when a loan tape is created.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "properties": {
                      "event_type": {
                        "description": "The type of event that occurred.",
                        "const": "loan_tape.created",
                        "example": "loan_tape.created",
                        "type": "string"
                      }
                    },
                    "type": "object",
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/loan_tape_response"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully"
          }
        },
        "summary": "loan_tape.created",
        "tags": [
          "Event Types"
        ]
      }
    },
    "loan_tape.updated": {
      "post": {
        "description": "Occurs when a loan tape is updated.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "properties": {
                      "event_type": {
                        "description": "The type of event that occurred.",
                        "const": "loan_tape.updated",
                        "example": "loan_tape.updated",
                        "type": "string"
                      }
                    },
                    "type": "object",
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/loan_tape_response"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully"
          }
        },
        "summary": "loan_tape.updated",
        "tags": [
          "Event Types"
        ]
      }
    },
    "management_operation.created": {
      "post": {
        "description": "Occurs when an management operation is created.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "properties": {
                      "event_type": {
                        "description": "The type of event that occurred.",
                        "const": "management_operation.created",
                        "example": "management_operation.created",
                        "type": "string"
                      }
                    },
                    "type": "object",
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/management_operation_transaction"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully"
          }
        },
        "summary": "management_operation.created",
        "tags": [
          "Event Types"
        ]
      }
    },
    "management_operation.updated": {
      "post": {
        "description": "Occurs when an management operation is updated.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "properties": {
                      "event_type": {
                        "description": "The type of event that occurred.",
                        "const": "management_operation.updated",
                        "example": "management_operation.updated",
                        "type": "string"
                      }
                    },
                    "type": "object",
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/management_operation_transaction"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully"
          }
        },
        "summary": "management_operation.updated",
        "tags": [
          "Event Types"
        ]
      }
    },
    "internal_transaction.created": {
      "post": {
        "description": "Occurs when an internal adjustment is created.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "properties": {
                      "event_type": {
                        "description": "The type of event that occurred.",
                        "const": "internal_transaction.created",
                        "example": "internal_transaction.created",
                        "type": "string"
                      }
                    },
                    "type": "object",
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/internal_adjustment_transaction"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully"
          }
        },
        "summary": "internal_transaction.created",
        "tags": [
          "Event Types"
        ]
      }
    },
    "internal_transaction.updated": {
      "post": {
        "description": "Occurs when an internal adjustment is updated.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "properties": {
                      "event_type": {
                        "description": "The type of event that occurred.",
                        "const": "internal_transaction.updated",
                        "example": "internal_transaction.updated",
                        "type": "string"
                      }
                    },
                    "type": "object",
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/internal_adjustment_transaction"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully"
          }
        },
        "summary": "internal_transaction.updated",
        "tags": [
          "Event Types"
        ]
      }
    },
    "network_total.created": {
      "post": {
        "description": "Occurs when a network total is created.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "properties": {
                      "event_type": {
                        "description": "The type of event that occurred.",
                        "const": "network_total.created",
                        "example": "network_total.created",
                        "type": "string"
                      }
                    },
                    "type": "object",
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/network_total"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully"
          }
        },
        "summary": "network_total.created",
        "tags": [
          "Event Types"
        ]
      }
    },
    "network_total.updated": {
      "post": {
        "description": "Occurs when a network total is updated.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "properties": {
                      "event_type": {
                        "description": "The type of event that occurred.",
                        "const": "network_total.updated",
                        "example": "network_total.updated",
                        "type": "string"
                      }
                    },
                    "type": "object",
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/network_total"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully"
          }
        },
        "summary": "network_total.updated",
        "tags": [
          "Event Types"
        ]
      }
    },
    "payment_transaction.created": {
      "post": {
        "description": "Occurs when a payment transaction is created.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "properties": {
                      "event_type": {
                        "description": "The type of event that occurred.",
                        "const": "payment_transaction.created",
                        "example": "payment_transaction.created",
                        "type": "string"
                      }
                    },
                    "type": "object",
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/payment-transaction-created"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully"
          }
        },
        "summary": "payment_transaction.created",
        "tags": [
          "Event Types"
        ]
      }
    },
    "payment_transaction.updated": {
      "post": {
        "description": "Occurs when a payment transaction is updated.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "properties": {
                      "event_type": {
                        "description": "The type of event that occurred.",
                        "const": "payment_transaction.updated",
                        "example": "payment_transaction.updated",
                        "type": "string"
                      }
                    },
                    "type": "object",
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/payment-transaction-updated"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully"
          }
        },
        "summary": "payment_transaction.updated",
        "tags": [
          "Event Types"
        ]
      }
    },
    "settlement_report.updated": {
      "post": {
        "description": "Occurs when a settlement report is created or updated.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "properties": {
                      "event_type": {
                        "description": "The type of event that occurred.",
                        "const": "settlement_report.updated",
                        "example": "settlement_report.updated",
                        "type": "string"
                      }
                    },
                    "type": "object",
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/settlement-report"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully"
          }
        },
        "summary": "settlement_report.updated",
        "tags": [
          "Event Types"
        ]
      }
    },
    "statements.created": {
      "post": {
        "description": "Occurs when a statement has been created",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "properties": {
                      "event_type": {
                        "description": "The type of event that occurred.",
                        "const": "statements.created",
                        "example": "statements.created",
                        "type": "string"
                      }
                    },
                    "type": "object",
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/statements_created_webhook"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully"
          }
        },
        "summary": "statements.created",
        "tags": [
          "Event Types"
        ]
      }
    },
    "three_ds_authentication.created": {
      "post": {
        "description": "Occurs when a 3DS authentication is created.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "properties": {
                      "event_type": {
                        "description": "The type of event that occurred.",
                        "const": "three_ds_authentication.created",
                        "example": "three_ds_authentication.created",
                        "type": "string"
                      }
                    },
                    "type": "object",
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/authentication"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully"
          }
        },
        "summary": "three_ds_authentication.created",
        "tags": [
          "Event Types"
        ]
      }
    },
    "three_ds_authentication.updated": {
      "post": {
        "description": "Occurs when a 3DS authentication is updated (eg. challenge is completed).",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "properties": {
                      "event_type": {
                        "description": "The type of event that occurred.",
                        "const": "three_ds_authentication.updated",
                        "example": "three_ds_authentication.updated",
                        "type": "string"
                      }
                    },
                    "type": "object",
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/authentication"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully"
          }
        },
        "summary": "three_ds_authentication.updated",
        "tags": [
          "Event Types"
        ]
      }
    },
    "three_ds_authentication.challenge": {
      "post": {
        "description": "The `three_ds_authentication.challenge` event. Upon receiving this request, the Card Program should issue its own challenge to the cardholder. After a cardholder challenge is successfully completed, the Card Program needs to respond back to Lithic by call to [/v1/three_ds_decisioning/challenge_response](https://docs.lithic.com/reference/post_v1-three-ds-decisioning-challenge-response). Then the cardholder must navigate back to the merchant checkout flow to complete the transaction. Some merchants will include an `app_requestor_url` for app-based purchases; Lithic recommends triggering a redirect to that URL after the cardholder completes an app-based challenge.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "properties": {
                      "event_type": {
                        "description": "The type of event that occurred.",
                        "const": "three_ds_authentication.challenge",
                        "example": "three_ds_authentication.challenge",
                        "type": "string"
                      }
                    },
                    "type": "object",
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/challenge-event"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully"
          }
        },
        "summary": "three_ds_authentication.challenge",
        "tags": [
          "Event Types"
        ]
      }
    },
    "tokenization.approval_request": {
      "post": {
        "description": "Occurs when a tokenization approval request is made.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "properties": {
                      "event_type": {
                        "description": "The type of event that occurred.",
                        "const": "tokenization.approval_request",
                        "example": "tokenization.approval_request",
                        "type": "string"
                      }
                    },
                    "type": "object",
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/tokenization-approval-request"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully"
          }
        },
        "summary": "tokenization.approval_request",
        "tags": [
          "Event Types"
        ]
      }
    },
    "tokenization.result": {
      "post": {
        "description": "Occurs when a tokenization request succeeded or failed.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "properties": {
                      "event_type": {
                        "description": "The type of event that occurred.",
                        "const": "tokenization.result",
                        "example": "tokenization.result",
                        "type": "string"
                      }
                    },
                    "type": "object",
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/tokenization-result"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully"
          }
        },
        "summary": "tokenization.result",
        "tags": [
          "Event Types"
        ]
      }
    },
    "tokenization.two_factor_authentication_code": {
      "post": {
        "description": "Occurs when a tokenization request 2FA code is sent to the Lithic customer for self serve delivery.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "properties": {
                      "event_type": {
                        "description": "The type of event that occurred.",
                        "const": "tokenization.two_factor_authentication_code",
                        "example": "tokenization.two_factor_authentication_code",
                        "type": "string"
                      }
                    },
                    "type": "object",
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/tokenization-two-factor-authentication-code"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully"
          }
        },
        "summary": "tokenization.two_factor_authentication_code",
        "tags": [
          "Event Types"
        ]
      }
    },
    "tokenization.two_factor_authentication_code_sent": {
      "post": {
        "description": "Occurs when a tokenization request 2FA code is sent to our downstream messaging providers for delivery.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "properties": {
                      "event_type": {
                        "description": "The type of event that occurred.",
                        "const": "tokenization.two_factor_authentication_code_sent",
                        "example": "tokenization.two_factor_authentication_code_sent",
                        "type": "string"
                      }
                    },
                    "type": "object",
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/tokenization-two-factor-authentication-code-sent"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully"
          }
        },
        "summary": "tokenization.two_factor_authentication_code_sent",
        "tags": [
          "Event Types"
        ]
      }
    },
    "tokenization.updated": {
      "post": {
        "description": "Occurs when a tokenization's status has changed.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "properties": {
                      "event_type": {
                        "description": "The type of event that occurred.",
                        "const": "tokenization.updated",
                        "example": "tokenization.updated",
                        "type": "string"
                      }
                    },
                    "type": "object",
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/tokenization-updated"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully"
          }
        },
        "summary": "tokenization.updated",
        "tags": [
          "Event Types"
        ]
      }
    },
    "three_ds_authentication.approval_request": {
      "post": {
        "description": "Webhook for Card Programs to decision on 3DS Authentication Request. See https://docs.lithic.com/docs/3ds-decisioning for more details.",
        "summary": "3DS Decisioning Request",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "allOf": [
                  {
                    "type": "object",
                    "properties": {
                      "event_type": {
                        "type": "string",
                        "const": "three_ds_authentication.approval_request",
                        "example": "three_ds_authentication.approval_request"
                      }
                    },
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/authentication"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Information on whether the Request was Approved/Declined and if a Challenge should be created.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/three-ds-decisioning"
                }
              }
            }
          }
        },
        "tags": [
          "3DS"
        ]
      }
    },
    "dispute_transaction.created": {
      "post": {
        "description": "Occurs when a new dispute transaction is created",
        "requestBody": {
          "content": {
            "application/json": {
              "examples": {
                "disputeCreated": {
                  "summary": "Dispute Transaction Created Example",
                  "value": {
                    "event_type": "dispute_transaction.created",
                    "case_id": "ROL12345",
                    "token": "123e4567-e89b-12d3-a456-426614174000",
                    "card_token": "78ddee49-4558-4a79-80ce-339e12cc141c",
                    "account_token": "82d7c408-2bbb-4f63-889a-8a2a2b1601af",
                    "network": "VISA",
                    "currency": "USD",
                    "created": "2024-02-07T10:00:00Z",
                    "updated": "2024-02-07T10:00:00Z",
                    "merchant": {
                      "acceptor_id": "174030075991",
                      "acquiring_institution_id": "191231",
                      "descriptor": "COFFEE SHOP",
                      "mcc": "5812",
                      "city": "NEW YORK",
                      "state": "NY",
                      "country": "USA"
                    },
                    "transaction_series": {
                      "type": "DISPUTE",
                      "related_transaction_token": "98765432-e89b-12d3-a456-426614174000",
                      "related_transaction_event_token": "7063f2ae-e806-44dd-9b1f-07e5df61e9e2"
                    },
                    "liability_allocation": {
                      "original_amount": 100000,
                      "recovered_amount": 0,
                      "written_off_amount": 0,
                      "denied_amount": 0,
                      "remaining_amount": 100000
                    },
                    "disposition": null,
                    "status": "OPEN",
                    "events": [
                      {
                        "token": "7063f2ae-e806-44dd-9b1f-07e5df61e9e2",
                        "type": "WORKFLOW",
                        "created": "2024-02-07T10:00:00Z",
                        "data": {
                          "stage": "CLAIM",
                          "type": "WORKFLOW",
                          "action": "OPENED",
                          "reason": "Not Sent",
                          "amount": 100000,
                          "disposition": null
                        }
                      }
                    ]
                  }
                }
              },
              "schema": {
                "allOf": [
                  {
                    "properties": {
                      "event_type": {
                        "description": "The type of event that occurred.",
                        "const": "dispute_transaction.created",
                        "example": "dispute_transaction.created",
                        "type": "string"
                      }
                    },
                    "type": "object",
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/dispute"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully"
          }
        },
        "summary": "dispute_transaction.created",
        "tags": [
          "Event Types"
        ]
      }
    },
    "dispute_transaction.updated": {
      "post": {
        "description": "Occurs when a dispute transaction is updated",
        "requestBody": {
          "content": {
            "application/json": {
              "examples": {
                "disputeUpdated": {
                  "summary": "Dispute Transaction Updated Example",
                  "value": {
                    "event_type": "dispute_transaction.updated",
                    "case_id": "ROL12345",
                    "token": "123e4567-e89b-12d3-a456-426614174000",
                    "card_token": "78ddee49-4558-4a79-80ce-339e12cc141c",
                    "account_token": "82d7c408-2bbb-4f63-889a-8a2a2b1601af",
                    "network": "VISA",
                    "currency": "USD",
                    "created": "2024-02-07T10:00:00Z",
                    "updated": "2024-02-09T10:00:00Z",
                    "merchant": {
                      "acceptor_id": "174030075991",
                      "acquiring_institution_id": "191231",
                      "descriptor": "COFFEE SHOP",
                      "mcc": "5812",
                      "city": "NEW YORK",
                      "state": "NY",
                      "country": "USA"
                    },
                    "transaction_series": {
                      "type": "DISPUTE",
                      "related_transaction_token": "98765432-e89b-12d3-a456-426614174000",
                      "related_transaction_event_token": "7063f2ae-e806-44dd-9b1f-07e5df61e9e2"
                    },
                    "liability_allocation": {
                      "original_amount": 100000,
                      "recovered_amount": 100000,
                      "written_off_amount": 0,
                      "denied_amount": 0,
                      "remaining_amount": 0
                    },
                    "disposition": null,
                    "status": "OPEN",
                    "events": [
                      {
                        "token": "7063f2ae-e806-44dd-9b1f-07e5df61e9e2",
                        "type": "WORKFLOW",
                        "created": "2024-02-07T10:00:00Z",
                        "data": {
                          "stage": "CLAIM",
                          "type": "WORKFLOW",
                          "action": "OPENED",
                          "reason": "Not Sent",
                          "amount": 100000,
                          "disposition": null
                        }
                      },
                      {
                        "token": "5b4c53dd-f21d-40f6-bd16-37579b07d3d3",
                        "type": "CARDHOLDER_LIABILITY",
                        "created": "2024-02-07T10:30:00Z",
                        "data": {
                          "type": "CARDHOLDER_LIABILITY",
                          "action": "PROVISIONAL_CREDIT_GRANTED",
                          "amount": 100000,
                          "reason": "Provisional Credit"
                        }
                      },
                      {
                        "token": "23189e39-f3d3-4d14-bcdf-9c1c71135c17",
                        "type": "FINANCIAL",
                        "created": "2024-02-09T10:00:00Z",
                        "data": {
                          "stage": "CHARGEBACK",
                          "type": "FINANCIAL",
                          "amount": 100000,
                          "polarity": "CREDIT"
                        }
                      }
                    ]
                  }
                }
              },
              "schema": {
                "allOf": [
                  {
                    "properties": {
                      "event_type": {
                        "description": "The type of event that occurred.",
                        "const": "dispute_transaction.updated",
                        "example": "dispute_transaction.updated",
                        "type": "string"
                      }
                    },
                    "type": "object",
                    "required": [
                      "event_type"
                    ]
                  },
                  {
                    "$ref": "#/components/schemas/dispute"
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully"
          }
        },
        "summary": "dispute_transaction.updated",
        "tags": [
          "Event Types"
        ]
      }
    }
  },
  "security": [
    {
      "ApiKeyAuth": []
    }
  ]
}
```