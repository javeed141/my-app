# Connecting a Legal Entity to an Internal Account

How to attribute an Internal Account to an individual or business for KYC / KYB processes

Modern Treasury supports programmatically creating Internal Accounts at a limited number of banks which allow users to specify who owns or is affiliated with the account being created. The supported banks include: Column, Cross River Bank, and Increase.

In these cases, Modern Treasury has extended the ability to attribute an Internal Account to a Legal Entity and its data that was shared with the bank via a Connection Legal Entity.

**Note: This is not supported in our sandbox environment**

# 1. Share Legal Entity Data with the Bank

First, you will need to create a Connection Legal Entity and Legal Entity pair, so that the bank has a record of the entity that will own the account. Our [**Share Legal Entity Data with Banks** guide](https://docs.moderntreasury.com/payments/docs/share-legal-entity-data-with-banks) provides an example of how to accomplish this. Make sure to save the resulting Legal Entity ID from the response.

# 2. Create an Internal Account

Now, create the Internal Account and pass in the ID of the Legal Entity created previously as `legal_entity_id`. This will attribute the resulting account created at the bank to the Legal Entity.

```curl Internal Account Request
curl --request POST \
  -u ORG_ID:API_KEY \
  --url https://app.moderntreasury.com/api/internal_accounts \
  -H 'Content-Type: application/json' \
  -d '{
    "connection_id": "e680b151-c8a2-4b36-aa6b-059f9f2a969c",
    "name": "My Entity Account",
    "party_name": "CRB Test",
    "currency": "USD",
    "legal_entity_id": "f6c1cd20-f8f9-4657-8e8d-dfc943af2eca",
    "party_address": {
        "line1": "13 W 7th St",
        "locality": "New York",
        "region": "New York",
        "postal_code": "10009",
        "country": "US"
    }
}'
```

# Workflow Support Exceptions

* Currently, Modern Treasury only supports specifying the owner of the Internal Account. If the Internal Account being created is not owned by the Legal Entity, it should not be passed in the request.
* Modern Treasury does not support connecting a Legal Entity to a bank account after the account has been opened.