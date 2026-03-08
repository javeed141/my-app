# Simulating Account Holder Creation

Simulate various KYB pending or rejected statuses in sandbox.

# Basic KYB

To simulate creating an account holder in sandbox with the Basic KYB workflow (i.e., `POST /account_holders` calls with `workflow` = `KYB_BASIC`), you can call the `POST https://sandbox.lithic.com/v1/account_holders` endpoint with the following request body:

```json
{
    "workflow": "KYB_BASIC",
    "tos_timestamp": ..., // any valid input
    "business_entity": {
        "legal_business_name": ..., // any valid input
        "government_id": ..., // any valid input
        "address": {
            "address1": ..., // any valid input
            "city": ..., // any valid input
            "state": ..., // any valid input
            "postal_code": ..., // any valid input
            "country": ... // any valid input
        },
        "phone_numbers": [
            ... // any valid input
        ]
    },
    "website_url": ..., // any valid input
    "naics_code": ..., // any valid input
    "nature_of_business": ..., // any valid input
    "control_person": {
        "first_name": ..., // any valid input
        "last_name": ..., // any valid input
        "dob": ..., // any valid input
        "phone_number": ..., // any valid input
        "email": ..., // any valid input
        "government_id": ..., // any valid input
        "address": {
            "address1": ..., // any valid input
            "postal_code": ..., // any valid input
            "city": ..., // any valid input
            "state": ..., // any valid input
            "country": ... // any valid input
        }
    },
    "beneficial_owner_individuals": [
        {
            "first_name": ..., // any valid input
            "last_name": ..., // any valid input
            "dob": ..., // any valid input
            "phone_number": ..., // any valid input
            "email": ..., // any valid input
            "government_id": ..., // any valid input
            "address": {
                "address1": ..., // any valid input
                "postal_code": ..., // any valid input
                "city": ..., // any valid input
                "state": ..., // any valid input
                "country": ... // any valid input
            }
        }
    ]
}
```

Once your request is successfully submitted, a `PENDING_REVIEW` status will be returned with an empty `status_reasons` list. This will be followed by an asynchronous webhook containing the new status (as determined by the test case submitted). The webhook will be sent to the URL configured via the `POST https://sandbox.lithic.com/v1/webhooks/account_holders` endpoint.

#### Sample Request

```json
curl https://sandbox.lithic.com/v1/account_holders \
    -X POST \
    -H "Authorization: YOUR_API_KEY" \
    -H "Content-Type: application/json" \
    -d '
{
    "workflow": "KYB_BASIC",
    "tos_timestamp": "2022-01-13 00:00:00",
    "business_entity": {
        "legal_business_name": "KYB Simulator",
        "government_id": "000000001",
        "address": {
            "address1": "456 Main Street",
            "city": "New York",
            "state": "NY",
            "postal_code": "10128",
            "country": "USA"
        },
        "phone_numbers": ["+18665441234"]
    },
    "website_url": "newcoffeeshop.com",
    "naics_code": "522110",
    "nature_of_business": "Retail store selling coffee and other food items",
    "control_person": {
        "first_name": "Johnny",
        "last_name": "AppleSeed",
        "dob": "1990-06-28",
        "phone_number": "+18666552345",
        "email": "johnny@appleseed.com",
        "government_id": "000003333",
        "address": {
            "address1": "123 Main Street",
            "postal_code": "10128",
            "city": "New York",
            "state": "NY",
            "country": "USA"
        }
    },
    "beneficial_owner_individuals": [
        {
            "first_name": "Mary",
            "last_name": "AppleSeed",
            "dob": "1991-06-28",
            "phone_number": "+18667663456",
            "email": "mary@appleseed.com",
            "government_id": "000004444",
            "address": {
                "address1": "789 Main Street",
                "postal_code": "10128",
                "city": "New York",
                "state": "NY",
                "country": "USA"
            }
        }
    ]
}
'
```

#### Sample Response

```json
{
  "account_token": "528215b6-ba72-429b-96b3-af0a2ea4431b",
  "status": "PENDING_REVIEW",
  "status_reasons": [],
  "token": "575e7b36-958f-4651-af5d-ceea8c72024a",
  "created": "2026-02-12T18:07:06.701376",
  "required_documents": []
}
```

#### Sample Webhook

```json
{
  "event_type": "account_holder.verification",
  "account_token": "528215b6-ba72-429b-96b3-af0a2ea4431b",
  "created": "2020-07-15 17:48:48",
  "event_time": "2020-07-15T17:48:48Z",
  "status": "ACCEPTED",
  "token": "575e7b36-958f-4651-af5d-ceea8c72024a",
  "required_documents": []
}
```

#### Simulating Enrollment Events

The Basic KYB workflow uses an asynchronous process to verify business, control person, and beneficial owner entities. Sandbox simulates this behavior using the `/v1/simulate/account_holders/enrollment_review` endpoint ([See the API reference](https://docs.lithic.com/reference/simulateaccountholderenrollmentreview)).

To accept an account holder, use the following request body:

```json
{
    "account_holder_token": ..., // "token" from the initial request, required
    "status": "ACCEPTED"
}
```

To reject an account holder, use the following request body:

```json
{
    "account_holder_token": ..., // "token" from the initial request, required
    "status": "REJECTED",
    "status_reasons": [
        ... // status reasons from the list below
    ]
}
```

To require document uploads for an account holder, use the following request body:

```json
{
    "account_holder_token": ..., // "token" from the initial request, required
    "status": "PENDING_REVIEW",
    "status_reasons": [
        ... // status reasons from the list below
    ]
}
```

One or more values from the list below can be provided in `status_reasons`:

```json
"BENEFICIAL_OWNER_INDIVIDUAL_NAME_VERIFICATION_FAILURE"
"BENEFICIAL_OWNER_INDIVIDUAL_DOB_VERIFICATION_FAILURE"
"BENEFICIAL_OWNER_INDIVIDUAL_ID_VERIFICATION_FAILURE"
"BENEFICIAL_OWNER_INDIVIDUAL_BLOCKLIST_ALERT_FAILURE"
"CONTROL_PERSON_NAME_VERIFICATION_FAILURE"
"CONTROL_PERSON_DOB_VERIFICATION_FAILURE"
"CONTROL_PERSON_ID_VERIFICATION_FAILURE"
"CONTROL_PERSON_BLOCKLIST_ALERT_FAILURE"
"PRIMARY_BUSINESS_ENTITY_ADDRESS_VERIFICATION_FAILURE"
"PRIMARY_BUSINESS_ENTITY_ID_VERIFICATION_FAILURE"
"PRIMARY_BUSINESS_ENTITY_NAME_VERIFICATION_FAILURE"
"OTHER_VERIFICATION_FAILURE"
```

Once your simulation request processes successfully, the account holder's `status` and `status_reasons` will change. This will be followed by an asynchronous webhook containing the new status (as determined by the test case submitted) with the below example body. The webhook will be sent to the URL configured via the `POST https://sandbox.lithic.com/v1/webhooks/account_holders` endpoint.

```json
{
  "event_type": "account_holder.verification",
  "account_token": "528215b6-ba72-429b-96b3-af0a2ea4431b",
  "created": "2020-07-15 17:48:48",
  "event_time": "2020-07-15T17:48:48Z",
  "status": "ACCEPTED",
  "token": "575e7b36-958f-4651-af5d-ceea8c72024a",
  "required_documents": []
}
```

<br />