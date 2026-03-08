# Onboard an Individual

This guide walks through how to onboard an individual to Modern Treasury. You will create a [legal entity](https://docs.moderntreasury.com/payments/reference/legal-entities).

For each legal entity created there will be required [identifications](https://docs.moderntreasury.com/platform/reference/identifications) and related [documents](https://docs.moderntreasury.com/platform/reference/document-object) that must be included for the legal entity to be processed and verified.

The steps below detail how to onboard an individual by creating the representative legal entity and linked account.

# Collect Required Information for Individual Onboarding

To determine the information required for onboarding an individual please review the [required fields for individuals ](https://docs.moderntreasury.com/payments/docs/required-fields-for-individuals) guide. This information can be collected via your application or platform processes and must be submitted to Modern Treasury via API, in a single request as detailed below.

# Creating the Individual's Legal Entity

To submit the individual for verification you will send a single legal entity creation request that includes all required information for onboarding. Once the legal entity request is processed it will be submitted for verification.

The below instructions walk through how to structure the embedded objects within the legal entity and create the request.

## Required Identifications for Individuals

Individuals are required to submit an identification number in the form of a social security number for U.S. individuals or a passport number for non-U.S. individuals. Additionally, individuals are required to provide a government identification in the form of either a driver's license (U.S. only) or a passport.

These submission details will be structured as identification objects and embedded within the legal entity payload. The below examples detail how to structure each identification object.

### Social Security Number

The following fields and provided values are required when submitting a social security number for your individual customer:

```json SSN Identification
{
   "id_number": "<provided SSN from customer>",
   "id_type": "us_ssn",
   "issuing_country": "US"
 }
```

### Driver's License

Submitting a driver's license requires including supporting documents representing images of the front and back of the license. To include the images within the identification you will structure [document](https://docs.moderntreasury.com/platform/reference/document-object) objects within the identification's `documents`array.

The following fields and provided values are required when submitting a driver's license for your individual customer:

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

The following fields and provided values are required when submitting a passport for your individual customer:

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

## Required Wealth and Employment Details for Individuals

Submitting an individual for verification requires including wealth and employment information for the individual. These values are structured in a `wealth_and_employment_details` object. The required fields for wealth and employment details have specified possible values:

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
        `occupation`
      </td>

      <td>
        The occupation of the individual's employment.

        Possible values: `consulting`, `executive`, `finance_accounting`, `food_services`, `government`, `healthcare`, `legal_services`, `manufacturing`, `other`, `sales`, `science_engineering`, `technology`
      </td>
    </tr>

    <tr>
      <td>
        `wealth_source`
      </td>

      <td>
        The source of the individual's wealth.

        Possible values: `business_sale`, `family_support`, `government_benefits`, `inheritance`, `investments`, `other`, `rental_income`, `retirement`, `salary`, `self_employed`
      </td>
    </tr>

    <tr>
      <td>
        `annual_income`
      </td>

      <td>
        The annual income of the individual.
      </td>
    </tr>
  </tbody>
</Table>

See below for an example of how to structure the object and corresponding fields:

```json Wealth and Employment Details
"wealth_and_emplyoment_details":
{
    "occupation": "<provided occupation of individual>",
    "wealth_source": "<provided wealth source of individual>",
    "annual_income": <provided annual income (USD) of individual>
}
```

## Creating the Individual's Legal Entity

To submit the individual for verification you will send a single legal entity creation request that includes all required information for onboarding. Once the legal entity request is processed it will be submitted for verification.

The below examples model how to create the legal entity request by utilizing a passport or SSN and driver's license for the identification:

```curl Legal Entity with SSN and Driver's License
curl --request POST \
     --url https://app.moderntreasury.com/api/legal_entities \
     --header 'content-type: application/json' \
     --data '
'{
    "legal_entity_type": "individual",
    "first_name": "Harry",
    "middle_name": "James",
    "last_name": "Potter",
    "date_of_birth": "1990-02-06",
    "email": "harry.potter@hogwarts.com",
    "phone_numbers": [
      { "phone_number": "+12125551234"}
    ],
x    "expected_activity_volume": 1000,
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
             "file_data": "<base64 encoded bytes representing front of license>",
             "filename": "license_front.pdf"
           },
           {
             "document_type": "identification_back",
             "file_data": "<base64 encoded bytes representing back of license>",
             "filename": "license_back.pdf"
           }
         ]
       }
    ]
  }'
'
```

```curl Legal Entity with Passport
curl --request POST \
     --url https://app.moderntreasury.com/api/legal_entities \
     --header 'content-type: application/json' \
     --data '
'{
    "legal_entity_type": "individual",
    "first_name": "Harry",
    "middle_name": "James",
    "last_name": "Potter",
    "date_of_birth": "1990-02-06",
    "email": "harry.potter@hogwarts.com",
    "phone_numbers": [
      { "phone_number": "+11111111111"}
    ]
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
  }'
'
```

# Monitor the Legal Entity's Status

After successful creation, the legal entity will be submitted to Modern Treasury for review. During review the legal entity will have a `status` of `pending`. After successful verification the legal entity's `status` will be updated to `active` representing that the legal entity can be utilized to create an account and move money.

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
      { "phone_number": "+12125551234"}
    ],
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

# Open an Account for the Individual

After legal entity activation you can open an account and move money on behalf of your individual customer. This is done by creating an [Internal Account](https://docs.moderntreasury.com/payments/reference/internal-account-object) and including the `legal_entity_id` as a part of the payload. After account creation your customer will be able to transact directly out of their dedicated account.

See below for an example request to create the account:

```curl Internal Account Creation
curl --request POST \
     -u ORGANIZATION_ID:API_KEY \
     --url https://app.moderntreasury.com/api/internal_accounts \
     -H 'content-type: application/json' \
     -d '{
       "name": "Harry Potter Payment Account",
       "party_name": "Harry Potter",
       "currency": "USD",
       "legal_entity_id": "7d885cb7-6cad-42ab-ae01-d61bb90b4780"
     }'
```