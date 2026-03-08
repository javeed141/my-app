# Quick Start - ACH Originations

This guide will walk you through the process of initiating an ACH origination from a **program's financial account** to an external bank account. This process supports use cases such as:

* Funding a prepay card program
* Disbursements to suppliers, contractors, etc.

You will learn how to upload and verify your external bank account through micro deposits, initiate an ACH debit and credit origination from your program's operating financial account, and track your Lithic account's balance.

# Step 1 - Add an external bank account

Send a `POST` request to [Create external bank account](https://docs.lithic.com/docs/external-accounts-api#create-external-bank-account):

```bash
curl https://api.lithic.com/v1/external_bank_accounts \
	-X POST \
  -H "Authorization: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
	-d '
{
  "verification_method": "MICRO_DEPOSIT",
  "owner_type": "BUSINESS",
  "owner": "John Doe LLC",
  "type": "CHECKING",
  "routing_number": "021000021",
  "account_number": "123456789",
  "name": "Funding Account",
  "country": "US",
  "currency": "USD"
}
'
```

Below is a sample response:

```json
{
  "token": "a036e6b5-fd0f-49b2-b0c0-45d84214b189",
  "type": "CHECKING",
  "verification_method": "MICRO_DEPOSIT",
  "owner_type": "BUSINESS",
  "owner": "John Doe LLC",
  "state": "ENABLED",
  "verification_state": "PENDING",
  "routing_number": "021000021",
  "last_four": "6789",
  "name": "John Doe Payables",
  "currency": "USD",
  "country": "US",
  "account_token": null,
  "created": "2023-06-23T20:01:53Z",
  "company_id": null
}
```

# Step 2 - Verify the external bank account

Because the External Bank Account object was created with a verification method of `MICRO_DEPOSIT`, Lithic will now send two small dollar deposits to the bank account ending in `6789`. Your users should see these amounts reflected in this bank account and enter those amounts in your application. Then, you should send those entered amounts to Lithic to verify the bank account by sending a `POST` request to [Verify External Bank Account](https://docs.lithic.com/docs/external-accounts-api#verify-via-micro-deposit)

> ℹ️
>
> If you are testing in sandbox, please enter the micro deposit amounts of 19 and 89.

```bash
curl https://api.lithic.com/v1/external_bank_accounts/a036e6b5-fd0f-49b2-b0c0-45d84214b189/micro_deposits \
  -H 'AUTHORIZATION: YOUR_API_KEY'
    -X POST \
  -H "Authorization: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
    -d '
{
  "micro_deposits": ["19", "89"]
}
'
```

Below is a sample response. Note that the `verification_state` of the external bank account has switched from `PENDING` to `ENABLED`:

```json
{
  "token": "a036e6b5-fd0f-49b2-b0c0-45d84214b189",
  "type": "CHECKING",
  "verification_method": "MICRO_DEPOSIT",
  "owner_type": "BUSINESS",
  "owner": "John Doe LLC",
  "state": "ENABLED",
  "verification_state": "ENABLED",
  "routing_number": "021000021",
  "last_four": "6789",
  "name": "John Doe Payables",
  "currency": "USD",
  "country": "USA",
  "account_token": null,
  "created": "2023-06-23T20:01:53Z",
  "company_id": null
}
```

# Step 3 - Originate an ACH debit transaction

When your API key is first provisioned and your program is configured by Lithic, a default account and your program’s `ISSUING`, `RESERVE`, `OPERATING` financial accounts are created.

For this walkthrough, let's assume you want to disperse payment to John Doe LLC. Because these funds are not intended for use by a card program, you will be managing your funds out of your program's `OPERATING` financial account.

You will first originate an ACH debit transaction to pull funds from your external bank account to prefund your program's `OPERATING` financial account. Assume the External Bank Account token `a036e6b5-fd0f-49b2-b0c0-45d84214b189` represents your external bank account.

Retrieve the `financial_account_token` of your program's `OPERATING` financial account by sending a `GET` request to [List Financial Accounts](https://docs.lithic.com/docs/financial-accounts):

```bash
curl https://api.lithic.com/v1/financial_accounts \
  -H "Authorization: YOUR_API_KEY"
```

Below is a sample response

```json
{
  "data": [
    {
      "token": "a722fcdc-f65b-5356-a684-6b0b85b562e5",
      "created": "2023-02-10T20:56:12Z",
      "updated": "2023-02-10T20:56:12Z",
      "type": "OPERATING",
      "routing_number": "021115084",
      "account_number": "19692645025634"
    },
    {
      "token": "2f356338-bbd4-569c-827f-3b9dceac2bb9",
      "created": "2023-02-10T20:56:12Z",
      "updated": "2023-02-10T20:56:12Z",
      "type": "RESERVE",
      "routing_number": "021115084",
      "account_number": "19692820433598"
    },
    {
      "token": "a1eadb25-12c8-5cd4-a43d-4284cc764263",
      "created": "2023-02-10T20:56:12Z",
      "updated": "2023-02-10T20:56:12Z",
      "type": "ISSUING",
      "routing_number": "021115084",
      "account_number": "19692192858585"
    }
  ],
  "has_more": false
}
```

Send a `POST` request to [Create Payment](https://docs.lithic.com/docs/payments-api#create-payment) with `type` = `COLLECTION` to indicate ACH Debit:

```bash

curl https://api.lithic.com/v1/payments \
	-X POST \
  -H "Authorization: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
	-d '
{
  "type": "COLLECTION",
  "method_attributes": {
    "sec_code": "CCD"
  },
  "method": "ACH_NEXT_DAY",
  "financial_account_token": "a722fcdc-f65b-5356-a684-6b0b85b562e5",
  "external_bank_account_token": "a036e6b5-fd0f-49b2-b0c0-45d84214b189",
  "amount": 10000,
  "memo": "Prefunding"
}
'

```

Below is a sample response:

```json
{
  "category": "ACH",
  "status": "PENDING",
  "result": "APPROVED",
  "method_attributes": {
    "sec_code": "CCD"
  },
  "financial_account_token": "a722fcdc-f65b-5356-a684-6b0b85b562e5",
  "external_bank_account_token": "a036e6b5-fd0f-49b2-b0c0-45d84214b189",
  "direction": "DEBIT",
  "source": "CUSTOMER",
  "method": "ACH_NEXT_DAY",
  "token": "656346c4-920c-4d8c-b4d1-41b4fab6c8ab",
  "settled_amount": 0,
  "pending_amount": 10000,
  "currency": "USD",
  "events": [
    {
      "amount": 10000,
      "created": "2023-06-23T22:07:47.087Z",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "token": "595ded29-bd6a-4ed6-bf67-9aa693a70522",
      "type": "ACH_ORIGINATION_INITIATED"
    },
    {
      "amount": 10000,
      "created": "2023-06-23T22:07:47.087Z",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "token": "5ed0ef54-3923-40d7-9f65-3ac5fe1fa07a",
      "type": "ACH_ORIGINATION_REVIEWED"
    },
    {
      "amount": 10000,
      "created": "2023-06-23T22:07:47.087Z",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "token": "8d1f3ab8-46d1-412d-b3dd-730c8f238478",
      "type": "ACH_ORIGINATION_PROCESSED"
    },
    {
      "amount": 10000,
      "created": "2023-06-23T22:07:47.087Z",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "token": "280305f9-7fdf-4571-8bfd-08ecd83a5ede",
      "type": "ACH_ORIGINATION_SETTLED"
    }
  ],
  "descriptor": "Prefunding",
  "user_defined_id": null,
  "created": "2023-06-23T22:07:47Z",
  "updated": "2023-06-23T22:07:47Z",
  "balance": {
    "financial_account_type": "OPERATING",
    "financial_account_token": "a722fcdc-f65b-5356-a684-6b0b85b562e5",
    "currency": "USD",
    "available_amount": 0,
    "pending_amount": 10000,
    "total_amount": 10000,
    "created": "2023-02-10T20:56:12Z",
    "updated": "2023-06-23T22:07:47Z",
    "last_transaction_token": "656346c4-920c-4d8c-b4d1-41b4fab6c8ab",
    "last_transaction_event_token": "3de1c04b-59fb-53d3-a3bb-cd436e1c361d"
  },
  "debugging_request_id": "90167630-488f-414b-88c4-9d4f912c6e8f"
}
```

The ACH transaction now has four events:

* `ACH_ORIGINATION_INITIATED` to indicate that Lithic has received the instructions
* `ACH_ORIGINATION_REVIEWED` to indicate that any reviews conducted by Lithic are completed
* `ACH_ORIGINATION_PROCESSED` to indicate that Lithic has successfully submitted the transaction to the ACH network. Lithic uploads to the ACH network on an hourly basis except weekends and holidays when ACH is not processed
* `ACH_ORIGINATION_SETTLED` to indicate that Lithic has received the funds from the financial institution to which the ACH debit origination was created

By default, Lithic will hold ACH debit originations in pending for two business days due to the risk of ACH returns. On business day two, Lithic will release the funds from hold and move them from the pending balance to the available balance. In sandbox, you can simulate this release by sending a `POST` request to [Simulate payment release](https://docs.lithic.com/docs/payments-api#simulate-payment-release)

```bash
curl https://sandbox.lithic.com/v1/simulate/payments/release\
  -X POST \
  -H "Authorization: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
	-d '
{
  "payment_token": "656346c4-920c-4d8c-b4d1-41b4fab6c8ab"
}
'
```

Below is a sample response:

```json
{
  "debugging_request_id": "74f2c0ee-8ecd-4e7a-947c-51cef3dab661",
  "result": "APPROVED",
  "transaction_event_token": "2a652ffd-cfa2-53c7-997b-26e7ad579995"
}
```

This will generate an `ACH_ORIGINATION_RELEASED` event. To verify that the funds have settled, send a `GET` for `payment_token` `656346c4-920c-4d8c-b4d1-41b4fab6c8ab` to [Get Payment](https://docs.lithic.com/docs/payments-api#get-payment-by-token):

```bash
curl https://api.lithic.com/v1/payments/656346c4-920c-4d8c-b4d1-41b4fab6c8ab\
  -H 'AUTHORIZATION: YOUR_API_KEY'
```

In the below sample response, you can see the additional `ACH_ORIGINATION_RELEASED` event and the updated settled amount of $100.

```json
{
  "category": "ACH",
  "status": "SETTLED",
  "result": "APPROVED",
  "method_attributes": {
    "sec_code": "PPD"
  },
  "financial_account_token": "a722fcdc-f65b-5356-a684-6b0b85b562e5",
  "external_bank_account_token": "a036e6b5-fd0f-49b2-b0c0-45d84214b189",
  "direction": "DEBIT",
  "source": "CUSTOMER",
  "method": "ACH_NEXT_DAY",
  "token": "656346c4-920c-4d8c-b4d1-41b4fab6c8ab",
  "settled_amount": 10000,
  "pending_amount": 0,
  "currency": "USD",
  "events": [
    {
      "amount": 10000,
      "created": "2023-06-23T22:07:47.087Z",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "token": "595ded29-bd6a-4ed6-bf67-9aa693a70522",
      "type": "ACH_ORIGINATION_INITIATED"
    },
    {
      "amount": 10000,
      "created": "2023-06-23T22:07:47.087Z",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "token": "5ed0ef54-3923-40d7-9f65-3ac5fe1fa07a",
      "type": "ACH_ORIGINATION_REVIEWED"
    },
    {
      "amount": 10000,
      "created": "2023-06-23T22:07:47.087Z",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "token": "8d1f3ab8-46d1-412d-b3dd-730c8f238478",
      "type": "ACH_ORIGINATION_PROCESSED"
    },
    {
      "amount": 10000,
      "created": "2023-06-23T22:07:47.087Z",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "token": "280305f9-7fdf-4571-8bfd-08ecd83a5ede",
      "type": "ACH_ORIGINATION_SETTLED"
    },
    {
      "amount": 10000,
      "created": "2023-06-25T22:07:47.087Z",
      "result": "APPROVED",
      "detailed_results": ["APPROVED"],
      "token": "461fda88-8ec3-4eab-944c-ef4a899d2f89",
      "type": "ACH_ORIGINATION_RELEASED"
    }
  ],
  "descriptor": "Prefunding",
  "user_defined_id": null,
  "created": "2023-06-23T22:07:47Z",
  "updated": "2023-06-24T00:05:53Z"
}
```

# Step 4 - Originate an ACH credit transaction

Once the $100 has been released to pending, you can now send a $50 payment to John Doe LLC via ACH credit origination. Send a `POST` request to [Create Payment](https://docs.lithic.com/docs/payments-api#create-payment)

```bash

curl https://api.lithic.com/v1/payments \
	-X POST \
  -H "Authorization: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
	-d '
{
  "type": "PAYMENT",
  "method_attributes": {
    "sec_code": "CCD"
  },
  "method": "ACH_NEXT_DAY",
  "financial_account_token": "a722fcdc-f65b-5356-a684-6b0b85b562e5",
  "external_bank_account_token": "a036e6b5-fd0f-49b2-b0c0-45d84214b189",
  "amount": 5000,
  "memo": "Invoice 123"
}
'

```

Below is a sample response:

```json
{
  "category": "ACH",
  "status": "PENDING",
  "result": "APPROVED",
  "method_attributes": {
    "sec_code": "CCD"
  },
  "financial_account_token": "a722fcdc-f65b-5356-a684-6b0b85b562e5",
  "external_bank_account_token": "a036e6b5-fd0f-49b2-b0c0-45d84214b189",
  "direction": "CREDIT",
  "source": "CUSTOMER",
  "method": "ACH_NEXT_DAY",
  "token": "fcae7062-01db-42b4-8d6b-ad61341ac1d8",
  "settled_amount": 0,
  "pending_amount": -5000,
  "currency": "USD",
  "events": [
    {
      "amount": -5000,
      "type": "ACH_ORIGINATION_PENDING",
      "result": "APPROVED",
      "created": "2023-06-24T00:14:43Z",
      "token": "3443f2d2-c299-5883-82f7-77c34ccde676"
    }
  ],
  "descriptor": "Invoice 123",
  "user_defined_id": null,
  "created": "2023-06-24T00:14:43Z",
  "updated": "2023-06-24T00:14:43Z",
  "balance": {
    "financial_account_type": "OPERATING",
    "financial_account_token": "a722fcdc-f65b-5356-a684-6b0b85b562e5",
    "currency": "USD",
    "available_amount": 5000,
    "pending_amount": 5000,
    "total_amount": 5000,
    "created": "2023-02-10T20:56:12Z",
    "updated": "2023-06-24T00:14:43Z",
    "last_transaction_token": "fcae7062-01db-42b4-8d6b-ad61341ac1d8",
    "last_transaction_event_token": "3443f2d2-c299-5883-82f7-77c34ccde676"
  },
  "debugging_request_id": "5ba32f6e-bf0a-435d-b4d4-356003997f21"
}
```

In the live environment, ACH credit originations are generally released by Lithic immediately once we've successfully submitted to the ACH network. We do not hold because a credit origination is rarely returned.

In the sandbox environment, you will have to simulate a release similar to debit originations. A successful release would add an `ACH_ORIGINATION_RELEASED` event to the Payments object:

```json
{
  "category": "ACH",
  "status": "SETTLED",
  "result": "APPROVED",
  "method_attributes": {
    "sec_code": "CCD"
  },
  "financial_account_token": "a722fcdc-f65b-5356-a684-6b0b85b562e5",
  "external_bank_account_token": "a036e6b5-fd0f-49b2-b0c0-45d84214b189",
  "direction": "CREDIT",
  "source": "CUSTOMER",
  "method": "ACH_NEXT_DAY",
  "token": "fcae7062-01db-42b4-8d6b-ad61341ac1d8",
  "settled_amount": -5000,
  "pending_amount": 0,
  "currency": "USD",
  "events": [
    {
      "amount": -5000,
      "type": "ACH_ORIGINATION_PENDING",
      "result": "APPROVED",
      "created": "2023-06-24T00:14:43Z",
      "token": "3443f2d2-c299-5883-82f7-77c34ccde676"
    },
    {
      "amount": -5000,
      "type": "ACH_ORIGINATION_RELEASED",
      "result": "APPROVED",
      "created": "2023-06-24T00:30:52Z",
      "token": "524c1e61-f7b5-52c3-a497-72c6cf3803d0"
    }
  ],
  "descriptor": "Invoice 123",
  "user_defined_id": null,
  "created": "2023-06-24T00:14:43Z",
  "updated": "2023-06-24T00:30:52Z"
}
```

If you tried to pay John Doe LLC before the $100 was released into the available balance, you would have received a response similar to the below:

```json
{
  "category": "ACH",
  "status": "DECLINED",
  "result": "DECLINED",
  "method_attributes": {
    "sec_code": "CCD"
  },
  "financial_account_token": "a722fcdc-f65b-5356-a684-6b0b85b562e5",
  "external_bank_account_token": "a036e6b5-fd0f-49b2-b0c0-45d84214b189",
  "direction": "CREDIT",
  "source": "CUSTOMER",
  "method": "ACH_NEXT_DAY",
  "token": "2815894c-2f01-47e2-b0bf-c943cf9f0369",
  "settled_amount": 0,
  "pending_amount": 0,
  "currency": "USD",
  "events": [
    {
      "amount": -5000,
      "type": "ACH_INSUFFICIENT_FUNDS",
      "result": "DECLINED",
      "created": "2023-06-23T22:17:55Z",
      "token": "2ee7b1a3-6ee6-5e35-bbac-4ec355491944"
    }
  ],
  "descriptor": "Invoice 123",
  "user_defined_id": null,
  "created": "2023-06-23T22:17:55Z",
  "updated": "2023-06-23T22:17:55Z",
  "balance": {
    "financial_account_type": "OPERATING",
    "financial_account_token": "a722fcdc-f65b-5356-a684-6b0b85b562e5",
    "currency": "USD",
    "available_amount": 0,
    "pending_amount": 10000,
    "total_amount": 10000,
    "created": "2023-02-10T20:56:12Z",
    "updated": "2023-06-23T22:17:55Z",
    "last_transaction_token": "656346c4-920c-4d8c-b4d1-41b4fab6c8ab",
    "last_transaction_event_token": "3de1c04b-59fb-53d3-a3bb-cd436e1c361d"
  },
  "debugging_request_id": "f651113b-670b-45a9-bbcf-1cd386b6fabe"
}
```