# Quick Start - ACH Funding in Sandbox

How to fund your Lithic instance in sandbox

For customers using our Ledger product, you will need to "fund" your Lithic instance in Sandbox before you can move funds through the [Book Transfer](https://docs.lithic.com/docs/book-transfers) endpoints or send ACH credit originations through the Payments API.

<Callout icon="⏳" theme="default">
  Please note this feature is only available in sandbox to vetted customers currently going through our implementations stage. [Contact](https://www.lithic.com/about/contact) our sales team to learn more.
</Callout>

On this page you will learn how to:

* Simulate an ACH Debit Origination to fund your sandbox account
* Uploading and verifying your External Bank Account through simulated micro deposits
* Simulate actions to move through the ACH lifecycle

<br />

# Simulating an ACH Origination Debit

## Step 1 - Add an external bank account

Send a `POST` request to [Create external bank account](https://docs.lithic.com/docs/external-accounts-api#create-external-bank-account) with a verification method of `MICRO_DEPOSIT`:

```bash
curl https://sandbox.lithic.com/v1/external_bank_accounts \
	-X POST \
  -H "Authorization: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
	-d '
{
  "verification_method": "MICRO_DEPOSIT",
  "financial_account_token": "f2f74f63-d4b3-4f51-b40e-7156b45a1e56",
  "owner_type": "BUSINESS",
  "owner": "John Doe LLC",
  "type": "CHECKING",
  "routing_number": "021000021",
  "account_number": "123456789",
  "name": "Funding Account",
  "country": "USA",
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
  "financial_account_token": "f2f74f63-d4b3-4f51-b40e-7156b45a1e56",
  "currency": "USD",
  "country": "USA",
  "account_token": null,
  "created": "2023-06-23T20:01:53Z",
  "company_id": null
}
```

## Step 2 - Verify the external bank account

In Sandbox, the verification amounts will always be 19 and 89. Please send those amounts to Lithic to verify the bank account by sending a `POST` request to [Verify External Bank Account](https://docs.lithic.com/docs/external-accounts-api#verify-via-micro-deposit)

```bash
curl https://sandbox.lithic.com/v1/external_bank_accounts/a036e6b5-fd0f-49b2-b0c0-45d84214b189/micro_deposits \
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

## Step 3 - Simulate ACH Origination

To simulate an origination, use the `POST /v1/payments` endpoint to initiate an ACH origination. See Step 3 of the [Quick Start - ACH Originations](https://docs.lithic.com/docs/quick-start-ach-originations#step-3---originate-an-ach-debit-transaction) Guide for how to do this.

Next, you can use the Simulate Action endpoint that can be used to go through the origination lifecycle

<br />

## Step 4 - Advancing through the ACH Lifecycle

You can simulate any ACH lifecycle event using the `POST /v1/simulate/payments/{token}/action` endpoint. Please refer to the [ACH Payment Lifecycle](https://docs.lithic.com/docs/ach-payments-lifecycle) guide for supported lifecycles.

The token provided in the path should be the payment token of the payment generated from the simulate receipt or initiate origination call.

### Happy-path origination debit

**ACH Payment is reviewed and approved**

```jsx
curl https://sandbox.lithic.com/v1/simulate/payments/{token}/action \
  -H 'AUTHORIZATION: YOUR_API_KEY'
    -X POST \
  -H "Authorization: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
    -d '
{
	"event_type": "ACH_ORIGINATION_REVIEWED",
	"decline_reason": null,
	"return_reason_code": null
}
'
```

**ACH Payment is processed**

```jsx
curl https://sandbox.lithic.com/v1/simulate/payments/{token}/action \
  -H 'AUTHORIZATION: YOUR_API_KEY'
    -X POST \
  -H "Authorization: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
    -d '
{
	"event_type": "ACH_ORIGINATION_PROCESSED",
	"decline_reason": null,
	"return_reason_code": null
}
'
```

**ACH Payment settles**

```jsx
curl https://sandbox.lithic.com/v1/simulate/payments/{token}/action \
  -H 'AUTHORIZATION: YOUR_API_KEY'
    -X POST \
  -H "Authorization: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
    -d '
{
	"event_type": "ACH_ORIGINATION_SETTLED",
	"decline_reason": null,
	"return_reason_code": null
}
'
```

**ACH Payment is released**

```jsx
curl https://sandbox.lithic.com/v1/simulate/payments/{token}/action \
  -H 'AUTHORIZATION: YOUR_API_KEY'
    -X POST \
  -H "Authorization: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
    -d '
{
	"event_type": "ACH_ORIGINATION_RELEASED",
	"decline_reason": null,
	"return_reason_code": null
}
'
```

### Happy-path origination credit

**ACH Payment is reviewed and approved**

```jsx
curl https://sandbox.lithic.com/v1/simulate/payments/{token}/action \
  -H 'AUTHORIZATION: YOUR_API_KEY'
    -X POST \
  -H "Authorization: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
    -d '
{
	"event_type": "ACH_ORIGINATION_REVIEWED",
	"decline_reason": null,
	"return_reason_code": null
}
'
```

**ACH Payment is processed**

```jsx
curl https://sandbox.lithic.com/v1/simulate/payments/{token}/action \
  -H 'AUTHORIZATION: YOUR_API_KEY'
    -X POST \
  -H "Authorization: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
    -d '
{
	"event_type": "ACH_ORIGINATION_PROCESSED",
	"decline_reason": null,
	"return_reason_code": null
}
'
```

**ACH Payment settles**

```jsx
curl https://sandbox.lithic.com/v1/simulate/payments/{token}/action \
  -H 'AUTHORIZATION: YOUR_API_KEY'
    -X POST \
  -H "Authorization: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
    -d '
{
	"event_type": "ACH_ORIGINATION_SETTLED",
	"decline_reason": null,
	"return_reason_code": null
}
'
```

### Returned Origination

**ACH Payment is reviewed and approved**

```jsx
curl https://sandbox.lithic.com/v1/simulate/payments/{token}/action \
  -H 'AUTHORIZATION: YOUR_API_KEY'
    -X POST \
  -H "Authorization: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
    -d '
{
	"event_type": "ACH_ORIGINATION_REVIEWED",
	"decline_reason": null,
	"return_reason_code": null
}
'
```

**ACH Payment is processed**

```jsx
curl https://sandbox.lithic.com/v1/simulate/payments/{token}/action \
  -H 'AUTHORIZATION: YOUR_API_KEY'
    -X POST \
  -H "Authorization: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
    -d '
{
	"event_type": "ACH_ORIGINATION_PROCESSED",
	"decline_reason": null,
	"return_reason_code": null
}
'
```

**ACH Payment is returned**

```jsx
curl https://sandbox.lithic.com/v1/simulate/payments/{token}/action \
  -H 'AUTHORIZATION: YOUR_API_KEY'
    -X POST \
  -H "Authorization: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
    -d '
{
	"event_type": "ACH_ORIGINATION_RETURNED",
	"decline_reason": null,
	"return_reason_code": "R29"
}
'
```

### Settled Receipt

**ACH Payment settles**

```jsx
curl https://sandbox.lithic.com/v1/simulate/payments/{token}/action \
  -H 'AUTHORIZATION: YOUR_API_KEY'
    -X POST \
  -H "Authorization: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
    -d '
{
	"event_type": "ACH_RECEIPT_SETTLED",
	"decline_reason": null,
	"return_reason_code": null
}
'
```

### Returned Receipt

**Return for ACH Receipt is initiated**

```jsx
curl https://sandbox.lithic.com/v1/simulate/payments/{token}/action \
  -H 'AUTHORIZATION: YOUR_API_KEY'
    -X POST \
  -H "Authorization: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
    -d '
{
	"event_type": "ACH_RETURN_INITIATED",
	"decline_reason": null,
	"return_reason_code": null
}
'
```

**Return for ACH Receipt is processed**

```jsx
curl https://sandbox.lithic.com/v1/simulate/payments/{token}/action \
  -H 'AUTHORIZATION: YOUR_API_KEY'
    -X POST \
  -H "Authorization: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
    -d '
{
	"event_type": "ACH_RETURN_PROCESSED",
	"decline_reason": null,
	"return_reason_code": null
}
'
```

### ACH Payment is reviewed and declined

```jsx
curl https://sandbox.lithic.com/v1/simulate/payments/{token}/action \
  -H 'AUTHORIZATION: YOUR_API_KEY'
    -X POST \
  -H "Authorization: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
    -d '
{
	"event_type": "ACH_ORIGINATION_REVIEWED",
	"decline_reason": "PROGRAM_DAILY_LIMITS_EXCEEDED",
	"return_reason_code": null
}
'
```