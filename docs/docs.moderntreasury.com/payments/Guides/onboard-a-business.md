# Onboard a Business

This guide walks through how to onboard a business to Modern Treasury. You will create a [legal entity](https://docs.moderntreasury.com/payments/reference/legal-entities).

The steps below detail the fields and API requests required to onboard a business by creating Legal Entities for the business and its associated legal entities, and the linked account.

# Collect Required Information for Business UBO Legal Entities

To determine the information required for onboarding a business please review the [required fields for businesses](https://docs.moderntreasury.com/payments/docs/required-fields-for-businesses) guide. This information can be collected via your application or platform processes and must be submitted to Modern Treasury via API, in a single request as detailed below.

## Beneficial Owner(s) and Control Person

When creating a legal entity for a business, you will need to include information about the business as well as the beneficial owners and control persons.

A beneficial owner is defined as any person(s) or entity with 25% ownership of the business. Beneficial owners are commonly individuals but can also be businesses with large ownership stakes such as a holding company or investment firm.

A control person is defined as an individual that has the power to direct the management, policies, and operations of a company. This is commonly a president, CEO, or other high ranking executive at a corporation. Every business being onboarded is required to designate a control person. This person may also be a beneficial owner but does not need to be.

When submitting a business legal entity the beneficial owner(s) and designated control person will be represented as their own legal entities and will be related to the parent business through [Legal Entity Associations](https://docs.moderntreasury.com/payments/reference/legal-entity-associations) .

Required information for the beneficial owners and control person are available in the [required fields for businesses guide](https://docs.moderntreasury.com/payments/docs/required-fields-for-businesses#required-fields-for-beneficial-owners-and-control-person).

# Creating the Legal Entity Object

To submit the business for verification you will send a single legal entity creation request that includes all required information for onboarding, including all beneficial owner(s) and control person(s). Once the legal entity request is processed it will be submitted for verification.

The below instructions walk through how to structure the embedded objects within the legal entity and create the request.

## Required Documents for Businesses

Businesses are required to submit the following documents for review:

* Articles of Incorporation
* Proof of Address
* Legal/Ownership Structure Chart (Only required for businesses owned by a holding company)

These documents will be structured in a `documents` array within the legal entity body. Each document object requires a `document_type ` that will is representative of the document the object represents. See below for the required values to be provided for each document:

| Document                        | document\_type              |
| :------------------------------ | :-------------------------- |
| Articles of Incorporation       | `articles_of_incorporation` |
| Proof of Address                | `proof_of_address`          |
| Legal/Ownership Structure Chart | `corporate_structure`       |

To properly structure each document, you will provide the document in a base64 encoded format while also providing a name for the provided document. See below for an example document structure:

```json Passport Identification
{
    "documents": [
    {
       "document_type": "<document type based on the document being provided",
       "file_data": "<base64 encoded bytes>",
       "filename": "<file name of document>"
    }
  ]
 }
```

## Required Identifications for Businesses

When submitting a business for verification it is required to include an identification number in the form of either an EIN or TIN. The following fields and provided values are required when submitting and EIN or TIN:

```json SSN Identification
{
   "id_number": "<id number provided by the customer>",
   "id_type": "us_ein",
   "issuing_country": "US"
 }
```

## Required Wealth and Employment Details for Businesses

Submitting a business for verification requires including details on the business's source of funds for the account. This value will be structured in a `wealth_and_employment_details` object and has a dedicated list of possible values:

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Field Name
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `source_of_funds`
      </td>

      <td>
        The source of the business's funds.

        Possible Values:\
        `business_revenue`
        `investor_funding`,
        `debt_financing`,
        `sale_of_business_assets`,
        `sale_of_real_estate`,
        `retained_earnings_or_savings`,
        `intercompany_loan`
      </td>
    </tr>
  </tbody>
</Table>

See below for an example of how to structure the object and corresponding fields:

```json Wealth and Employment Details
"wealth_and_emplyoment_details":
{
    "source_of_funds": "<provided source of funds>",
}
```

## Required Identifications for Control Persons and Beneficial Owners

Control persons and beneficial owners are required to submit an identification number in the form of a social security number for U.S. individuals or a passport number for non-U.S. individuals. Additionally, Control persons and beneficial owners are required to provide a government identification in the form of either a driver's license (U.S. only) or a passport.

These submission details will be structured as identification objects and embedded within the legal entity payload. The below examples detail how to structure each identification object.

### Social Security Number

The following fields and provided values are required when submitting an SSN

```json SSN Identification
{
   "id_number": "<provided SSN from customer>",
   "id_type": "us_ssn",
   "issuing_country": "US"
 }
```

### Driver's License

Submitting a driver's license requires including supporting documents representing images of the front and back of the license. To include the images within the identification you will structure [document](https://docs.moderntreasury.com/platform/reference/document-object) objects within the identification's `documents`array.

The following fields and provided values are required when submitting a driver's license for the control person and beneficial owner(s):

```json Driver's License identificaiton
{
      "id_number": "<driver's license number>",
      "id_type": "drivers_license",
      "issuing_country": "US",
      "documents":[
       {
          "document_type": "identification_front",
          "file_data": "<base64 encoded bytes representing front of license>",
          "filename": "<file name of image>"
        },
        {
          "document_type": "identification_back",
          "file_data": "<base64 encoded bytes representing back of license>",
          "filename": "<file name of image>"
        }
      ]
}
```

### Passport

Submitting a passport identification requires a supporting document representing an image of the passport data page. This image must be included within the identification's `documents`array.

The following fields and provided values are required when submitting a passport for the control person and beneficial owner(s):

```json Passport Identification
{
    "id_number": "<passport number>",
    "id_type": "passport",
    "issuing_country": "<2-letter issuing country code of passport>",
    "documents": [
    {
       "document_type": "passport",
       "file_data": "<base64 encoded bytes representing image of passport data page>",
       "filename": "<file name of image>"
    }
  ]
 }
```

## Creating the Business Legal Entity with Associated Legal Entities

To submit the business for verification you will send a single legal entity creation request that includes all required information for both the business and related entities.

To properly structure the request create a top level parent Legal Entity representing the top level business, and embed the related control person and beneficial owner(s) as [Legal Entity Associations](https://docs.moderntreasury.com/payments/reference/legal-entity-associations) represented as child legal entities within the same request. Once the legal entity request is processed it will be submitted for verification.

The below example models how to create a top level Legal Entity with a separate control person and beneficial owner. To scale this request to your needs you can add additional beneficial owners.

```curl Business Legal Entity with Beneficial Owner and Control Person
curl --request POST \
     --url https://app.moderntreasury.com/api/legal_entities \
     --header 'content-type: application/json' \
     --data '
{
   "legal_entity_type": "business",
    "date_formed": "1800-01-01",
    "business_name": "Hogwarts",
    "legal_structure": "corporation",
    "phone_numbers": [
      {
        "phone_number": "+11111111111"
      }
    ],
    "email": "hogwarts@wizardy.com",
    "website": "http://www.hogwarts.com",
    "intended_use": "Payment operations and treasury management",
    "expected_activity_volume": 1000000000,
    "country_of_incorporation": "US",
    "operating_jurisdictions": [
        "US"
    ],
    "wealth_and_emplyoment_details":
    {
        "source_of_funds": "business_revenue"
    },
    "documents":[
     {
        "document_type": "articles_of_incorporation",
        "file_data": "VGhpcyBpcyBhIHRlc3QgZmlsZQ==\n",
        "filename": "articles_of_incorporation.pdf"
     },
     {
        "document_type": "corporate_structure",
        "file_data": "VGhpcyBpcyBhIHRlc3QgZmlsZQ==\n",
        "filename": "legal_structure.pdf"
     },     
    ],
    "addresses": [
      {
        "primary": true,
        "line1": "119 5th Ave",
        "line2": "Suite 600",
        "locality": "New York",
        "region": "NY",
        "postal_code": "10011",
        "country": "US"
      }
    ],
    "identifications": [
      {
        "id_type": "us_ein",
        "issuing_country": "US",
        "id_number": "123456789",
        "documents": [
        {
            "document_type": "ein_letter",
            "file_data": "VGhpcyBpcyBhIHRlc3QgZmlsZQ==\n",
            "filename": "ein.pdf"
        }   
        ]
      }
      ],
      "legal_entity_associations": [{
         "relationship_types": ["control_person"],
          "child_legal_entity": {
            "legal_entity_type": "individual",
            "first_name": "Harry",
            "middle_name": "James",
            "last_name": "Potter",
            "date_of_birth": "1990-02-06",
            "email": "harry.potter@hogwarts.com",
            "phone_numbers": [
                { "phone_number": "+11111111111"}
                ],
            "addresses": [
            {
                "line1": "119 5th Ave",
                "line2": "Suite 600",
                "locality": "New York",
                "region": "NY",
                "postal_code": "10003",
                "country": "US",
                "address_types": ["residential"],
                "primary": true
            }
            ],
            "identifications": [
            {
                "id_number": "111244444",
                "id_type": "us_ssn",
                "issuing_country": "US"
            },
            "identifications": [
            {
                "id_number": "111111111",
                "id_type": "passport",
                "issuing_country": "US",
                "documents": [
                {
                   "document_type": "passport",
                   "file_data": "VGhpcyBpcyBhIHRlc3QgZmlsZQ==\n",
                   "filename": "passport.pdf"
                 }
                 ]
            }]}},
            {
            "relationship_types": ["beneficial_owner"],
            "child_legal_entity": {
            "legal_entity_type": "individual",
            "first_name": "Albus",
            "middle_name": "Percival",
            "last_name": "Dumbledore",
            "date_of_birth": "1881-07-01",
            "email": "dumbledore@hogwarts.com",
            "phone_numbers": [
                { "phone_number": "+11111111111"}
                ],
            "addresses": [
            {
                "line1": "119 5th Ave",
                "line2": "Suite 600",
                "locality": "New York",
                "region": "NY",
                "postal_code": "10003",
                "country": "US",
                "address_types": ["residential"],
                "primary": true
            }
            ],
            "identifications": [
            {
                "id_number": "111222333",
                "id_type": "us_ssn",
                "issuing_country": "US"
            },
            {
                "id_number": "DL123456789",
                "id_type": "drivers_license",
                "issuing_country": "US",
                "documents":[
                {
                    "document_type": "identification_front",
                    "file_data": "VGhpcyBpcyBhIHRlc3QgZmlsZQ==\n",
                    "filename": "license_front.pdf"
                },
                {
                    "document_type": "identification_back",
                    "file_data": "VGhpcyBpcyBhIHRlc3QgZmlsZQ==\n",
                    "filename": "license_back.pdf"
                }
                ]  
            }
          ]
        }  
      }
}'
```

# Monitor the Legal Entity's Status

After successful creation, the legal entity will be submitted to Modern Treasury for review. During review the legal entity will have a `status` or `pending`. After successful verification the legal entity's `status` will be updated to `active` representing that the legal entity can be utilized to create an account and move money.

To programmatically action on the `status` field we recommend subscribing to [legal entity webhooks](https://docs.moderntreasury.com/platform/reference/legal-entity-webhooks) for each status update event (`activated`, `suspended`, `closed`). Upon legal entity approval you will receive an `activated` webhook. If the legal entity is denied after review you will receive a `closed`webhook. Modern Treasury performs recurring reviews of all legal entity's and as such if an `active` legal entity is flagged for investigation the `status` will be changed to `suspended`and a `suspended` webhook event will be emitted.

See below for example webhook payloads for legal entity status updates:

```json Sample Activated Legal Entity Webhook
{
  "event": "activated",
  "data": {
    "status": "active",
    "id": "7d885cb7-6cad-42ab-ae01-d61bb90b4780",
    "legal_entity_type": "individual",
    "first_name": "Harry",
    "middle_name": "James",
    "last_name": "Potter",
    "date_of_birth": "1990-02-06",
    "email": "harry.potter@hogwarts.com",
    "phone_numbers": [
      { "phone_number": "+11111111111"}
    ],
    "intended_use": "Savings account",
    "expected_activity_volume": 1000,
    "wealth_and_emplyoment_details":
    {
       "occupation": "science_engineering",
       "wealth_source": "salary",
       "annual_income": 50000
     }
     "addresses": [
      {
        "line1": "119 5th Ave",
        "line2": "Suite 600",
        "locality": "New York",
        "region": "NY",
        "postal_code": "10003",
        "country": "US",
        "address_types": ["residential"],
        "primary": true
      }
    ],
    "identifications": [
      {
          "id_number": "<passport number>",
          "id_type": "passport",
         "issuing_country": "<issuing country of passport>",
         "documents": [
         {
           "document_type": "passport",
           "file_data": "<base64 encoded bytes representing image of passport data page>",
           "filename": "<file name of image>"
         }
       ]
      }
    ]
  }
```

```json Sample Closed Legal Entity Webhook
{
  "event": "closed",
  "data": {
    "status": "closed",
    "id": "7d885cb7-6cad-42ab-ae01-d61bb90b4780",
    "legal_entity_type": "individual",
    "first_name": "Harry",
    "middle_name": "James",
    "last_name": "Potter",
    "date_of_birth": "1990-02-06",
    "email": "harry.potter@hogwarts.com",
    "phone_numbers": [
      { "phone_number": "+11111111111"}
    ],
    "intended_use": "Savings account",
    "expected_activity_volume": 1000,
    "wealth_and_emplyoment_details":
    {
       "occupation": "science_engineering",
       "wealth_source": "salary",
       "annual_income": 50000
    },
     "addresses": [
      {
        "line1": "119 5th Ave",
        "line2": "Suite 600",
        "locality": "New York",
        "region": "NY",
        "postal_code": "10003",
        "country": "US",
        "address_types": ["residential"],
        "primary": true
      }
    ],
    "identifications": [
      {
          "id_number": "<passport number>",
          "id_type": "passport",
         "issuing_country": "<issuing country of passport>",
         "documents": [
         {
           "document_type": "passport",
           "file_data": "<base64 encoded bytes representing image of passport data page>",
           "filename": "<file name of image>"
         }
       ]
      }
    ]
  }
```

```json Sample Suspended Legal Entity Webhook
{
  "event": "suspended",
  "data": {
    "status": "suspended",
    "id": "7d885cb7-6cad-42ab-ae01-d61bb90b4780",
    "legal_entity_type": "individual",
    "first_name": "Harry",
    "middle_name": "James",
    "last_name": "Potter",
    "date_of_birth": "1990-02-06",
    "email": "harry.potter@hogwarts.com",
    "phone_numbers": [
      { "phone_number": "+11111111111"}
    ],
    "intended_use": "Savings account",
    "expected_activity_volume": 1000,
    "wealth_and_emplyoment_details":
    {
       "occupation": "science_engineering",
       "wealth_source": "salary",
       "annual_income": 50000
    },
     "addresses": [
      {
        "line1": "119 5th Ave",
        "line2": "Suite 600",
        "locality": "New York",
        "region": "NY",
        "postal_code": "10003",
        "country": "US",
        "address_types": ["residential"],
        "primary": true
      }
    ],
    "identifications": [
      {
          "id_number": "<passport number>",
          "id_type": "passport",
         "issuing_country": "<issuing country of passport>",
         "documents": [
         {
           "document_type": "passport",
           "file_data": "<base64 encoded bytes representing image of passport data page>",
           "filename": "<file name of image>"
         }
       ]
      }
    ]
  }
```

# Open an Account for the Business

After legal entity activation you can open an account and move money on behalf of your individual customer. This is done by creating an [Internal Account](https://docs.moderntreasury.com/payments/reference/internal-account-object) and including the `legal_entity_id` as a part of the payload. After account creation your customer will be able to transact directly out of their dedicated account.

See below for an example request to create the account:

### Creating an account for the legal entity

You will then create an account for your customer so that they can transact out of a dedicated account. You can do this by creating an [Internal Account](https://docs.moderntreasury.com/payments/reference/internal-account-object) and including the legal entity ID as a part of the payload. Here is a sample request. Note that you will also need a [connection ID](https://docs.moderntreasury.com/payments/reference/list-connections).

```curl Internal Account Creation
curl --request POST \
     -u ORGANIZATION_ID:API_KEY \
     --url https://app.moderntreasury.com/api/internal_accounts \
     -H 'content-type: application/json' \
     -d '{
       "name": "Hogwarts",
       "party_name": "Hogwarts",
       "currency": "USD",
       "legal_entity_id": "7d885cb7-6cad-42ab-ae01-d61bb90b4780"
     }'
```