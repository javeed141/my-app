# Building in Sandbox (Bring Your Own Bank)

Modern Treasury has a fully functional Sandbox environment that allows customers to test their payment flows in a simulated environment before moving to Production. Most Modern Treasury objects have a `live_mode` field is `true` for Production objects and `false` for Sandbox objects.

Payments in the Sandbox do not correspond to actual money movement. In this section you can learn about the different options for simulating workflows, including exceptions, for a "Bring Your Own Bank" Connection.

> 🚧 Sandbox timings vary from production.
>
> In order to make development and testing more efficient, unless otherwise stated sandbox behavior may behave different from real-life. For example, rather than wait a day for an ACH payment to settle, the Sandbox will settle the Payment Order within seconds, allowing for an end-to-end reconciliation workflow in seconds rather than hours to days.
>
> For Check payments there is a 5 minute delay to settle the Payment Order.

# Internal Accounts

Modern Treasury allows you to seed your organization with two fake banks, and then create accounts to support various Payment Order and Expected Payment workflows. To do this, you will first need to create a Gringotts Wizarding Bank (GWB) Connection or The Iron Bank of Braavos (IBB) Connection.

## Gringotts Wizarding Bank

Payment Orders which use Gringotts as the originating account will be relayed to the bank every minute and Transactions will be posted immediately thereafter. This differs from your production payments and bank data will vary on timing. ACH, wire, check, RTP, EFT, and book transfer payment types are simulated at Gringotts currently.

Expected Payments at Gringotts will always have a Transaction created for them. Our system uses the data in the Expected Payment to create a Transaction that looks as close as possible to the Expected Payment. The Transaction will be created in about 10 seconds and automatically reconciled to the Transaction. In production, the Transactions come in based on when we receive information from the bank. This can vary from every 15 minutes to every few hours depending on your bank and connectivity.

To create a Gringotts-style Connection, issue the following cURL request:

```curl
curl --request POST \
     --url 'https://app.moderntreasury.com/api/connections' \
     --header 'accept: application/json' \
     --user $ORGANIZATION_ID:$API_KEY \
     --header 'content-type: application/json' \
     --data '{"entity_id":"example1","nickname":"GWB"}'
```

Grab the `id` out of the response - you will need it when creating your Internal Accounts on this Connection.

## Iron Bank of Braavos

The Iron Bank does not process any Payment Orders.

Expected Payments created with an Internal Account associated to an Iron Bank of Braavos (IBB) Connection will only reconcile when you create a Transaction that reconciles based on the defined Reconciliation Rules.

To create an Iron Bank-style Connection, issue the following cURL request:

```curl


curl --request POST \
     --url 'https://app.moderntreasury.com/api/connections' \
     --header 'accept: application/json' \
     --user $ORGANIZATION_ID:$API_KEY  \
     --header 'content-type: application/json' \
     --data '{"entity_id":"example2","nickname":"IBB"}'
```

Grab the `id` out of the response - you will need it when creating your Internal Accounts on this Connection.

## Creating Internal Accounts on your GWB or IBB Connection

To create an Internal Account on your new Connection, issue the following cURL request:

```curl
curl --request POST \
     --url 'https://app.moderntreasury.com/api/internal_accounts' \
     --header 'accept: application/json' \
     --user $ORGANIZATION_ID:$API_KEY  \
     --header 'content-type: application/json' \
     -d '{
       "connection_id": "4424ca71-b01d-4f65-85aa-cb6678007402",
       "name": "My Cash",
       "party_name": "My Party",
       "currency": "USD"
}'
```

Grab the `id` out of the response - you will need it when creating a Payment Order to fund your Internal Account.

# Funding your Internal Account

First, follow the steps on creating a successful [Counterparty](https://docs.moderntreasury.com/payments/docs/test-counterparties) - you will need this Counterparty to fund your Account.

Next, follow the [steps](https://docs.moderntreasury.com/payments/docs/quickstart#4-fund-the-account) to create a Payment Order to fund your Internal Account. Congratulations, you now have money in your Sandbox Internal Account!

# Simulating Check Workflows

To simulate a *successful* Check Payment Order, send it to a Counterparty with an `account_number` of `123456789`.

To simulate a *failed* Check Payment Order, send it to a Counterparty with a specified address line of `1111 Azkaban Unit 321`.

If these Counterparties do not exist, you can create it within the Sandbox, either [through the API](https://docs.moderntreasury.com/platform/reference/create-counterparty) or within the web application.

For information on the lifecycle of a Payment Order, see [this reference](https://docs.moderntreasury.com/platform/reference/payment-orders).

# Simulating a Return

When creating a Payment Order through Gringotts, it is possible to set up the payment so that it will trigger a Return. Currently, you can trigger returns for ACH, Wires and EFT payment orders by sending them to their respective [Sandbox Counterparty](https://docs.moderntreasury.com/payments/docs/test-counterparties).

This is **different** from [originating a Return](https://docs.moderntreasury.com/payments/docs/originate-an-ach-return). By simulating a Return, you receive the Return rather than initiating it.

If you do not have any of the default Counterparties, you can create them following the instructions below or using [code snippets we have provided](https://docs.moderntreasury.com/payments/docs/test-counterparties).

To simulate ACH returns, you must create a Payment Order that is sent to a Counterparty who has an account number as `100XX` where `XX` is the [ACH return code](/payments/docs/ach-return-codes) you wish to trigger. For example, if the receiving account number is `10001`, you will receive an R01 return (Insufficient funds).

To simulate EFT returns, you must create a payment order that is sent to a Counterparty who has a bank account number as `101XX` where `XX` is the EFT return code you wish to trigger.

To simulate Wire returns, you can create a Payment Order to the same type of Counterparty as you would to simulate an ACH return. Therefore `100XX` pattern applies for Wire returns. **However** it is important to note that there is no concept of a Wire return code so simulated Wire returns will not have a code specified.

Simulated returns will be posted within minutes after the original Payment Orders have been sent to the bank. This mirrors how returns work in the real world, since your bank will mark the Payment Order as completed and any returns will come after the fact.

```curl Simulating an ACH Return
# Creates a Counterparty to simulate ACH/Wire returns with the return code `R01`

curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/counterparties \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "Kenner, Bach and Ledeen",
  "accounts": [
    {
      "account_type": "checking",
      "routing_details": [
        {
          "routing_number_type": "aba",
          "routing_number": "121141822"
        }
      ],
      "account_details": [
        {
          "account_number": "10001"
        }
      ]
    }
  ]}'

# Returns with an External Account with ID: 5acec2ef-987b-4260-aa97-b719eeb0a8d5
  
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/payment_orders \
  -H 'Content-Type: application/json' \
  -d '{
  "type": "ach",
  "amount": 1000,
  "direction": "credit",
  "currency": "USD",
  "originating_account_id": "0f8e3719-3dfd-4613-9bbf-c0333781b59f",
  "receiving_account_id": "5acec2ef-987b-4260-aa97-b719eeb0a8d5"
}'
```

For more on ACH Return codes, see [ACH Return/NOC Codes](https://docs.moderntreasury.com/payments/docs/ach-return-codes).

# Simulating Bank Transactions

[Transactions](/platform/reference/transaction-object) are imported statement transactions from the bank. Transactions are used in reconciliation for payment confirmation. From Modern Treasury's perspective, there are two types of Transactions on your bank statements, originated and unoriginated. Below you will find ways to create both types of Transactions and some related workflows you may want to test in your sandbox.

> 📘 Sandbox Banks
>
> As a reminder, Payment that use Gringotts Wizarding Bank as the originating bank will successfully run through end-to-end, whereas payments using Iron Bank of Braavos will fail to reach the bank. These allow you to test different states.

## Originated Payment Transactions

Originated payments are when you as a Modern Treasury customer are originating a debit or credit against a counterparty's account. In Modern Treasury, you accomplish these payments using [Payment Orders](/platform/reference/payment-order-object).

These transactions types can be generated by creating a [Payment Order](/platform/reference/payment-order-object) using any Gringotts Wizarding Bank account as the Internal Account. A few moments after creation of the Payment Order, Modern Treasury will automatically create a Transaction and reconcile the Payment Order to it.

## Unoriginated Payment Transactions

Unoriginated payments are when your bank accounts receive a debit or credit originated by a Counterparty (e.g. someone sends you money). These also appear as Transactions on your bank statement.

To create these types of Transactions, you can [Simulating an Incoming Payment Detail](https://docs.moderntreasury.com/payments/docs/simulating-an-incoming-payment-detail). A few moments after the creation of the IPD, Modern Treasury will automatically create a Transaction.

Unoriginated Transactions are not reconciled to a Payment Order. They can, however, be reconciled to Expected Payments, which you can also [simulate in your sandbox](https://docs.moderntreasury.com/payments/docs/simulate-unoriginated-payment-reconciliation).

# Simulate an Incoming Payment Detail into a Virtual Account

## Virtual Accounts

You may test the [Virtual Accounts](https://docs.moderntreasury.com/payments/docs/virtual-accounts) API in the sandbox. Virtual Accounts can be created in any Internal Account.

Virtual account numbers in the sandbox are dynamically generated. When creating a Virtual Account, you do not have to pass in the account number. So your API call would look like this.

```curl Creating a virtual account
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/virtual_accounts \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Funds on behalf of Alice Jones",
    "internal_account_id": "c743edb7-4059-496a-94b8-06fc081156fd"
  }'
```

## Incoming Payment Details

If you would like to simulate Incoming Payment Details to your virtual accounts, you can issue the following cURL request:

```curl Creating an IPD in an Virtual Account
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/simulations/incoming_payment_details/create_async \
  -H 'Content-Type: application/json' \
  -d '{
    "type": "wire",
    "direction": "credit",
    "amount": 2000,
    "internal_account_id": "0f8e3719-3dfd-4613-9bbf-c0333781b59f",
    "virtual_account_id": "4844bda1-eb57-4129-afb4-fc663a395ca0"
  }'
```

# Simulate Externally Originated Payment Reconciliation

[Expected Payments](/platform/reference/expected-payment-object) can be used to [automatically reconcile](https://docs.moderntreasury.com/payments/docs/managing-externally-originated-payments) and account for incoming, unoriginated payments. Combined with their [webhooks](/platform/reference/expected-payments), they enable you to automate workflows around incoming payments. Some example flows where you may use expected payments include: monitoring for when a wire is received in your account, monitoring for a debit (charge) against your account.

While there are exceptions to this guidance, Expected Payment reconciliation will typically use an Iron Bank of Braavos (IBB) Internal Account, and Payment Order testing will use a Gringotts Wizarding Bank (GWB) Internal Account.

## Iron Bank of Braavos (IBB) behavior for Expected Payments

Expected Payments created with an Internal Account associated to an Iron Bank of Braavos (IBB) Connection will only reconcile when you create a Transaction that reconciles based on the defined [Reconciliation Rules](https://docs.moderntreasury.com/payments/docs/defining-reconciliation-rules).

Use **IBB** Internal Accounts when you want to perform **reconciliation** testing, assuming:

* You have created custom Reconciliation Rules to evaluate.
* You have representative test Transactions to upload via API.
* You have a defined reconciliation testing protocol using our <Anchor label="sandbox reset" target="_blank" href="https://docs.moderntreasury.com/platform/docs/organizations-overview#resetting-your-sandbox">sandbox reset</Anchor> or using DELETE requests.

## Gringotts Wizard Bank (GWB) behavior for Expected Payments

A matching [Transaction](https://docs.moderntreasury.com/platform/reference/transaction-object) will automatically be created for any Expected Payment created with an Internal Account associated to a Gingotts Wizarding Bank (GWB) Connection. This Transaction will be automatically reconciled to the Expected Payment.

Use **GWB** Internal Accounts when you want to perform **integration** testing, including:

* connectivity testing (sending API requests and receiving responses)

* state machine testing (reading statuses)

* webhook testing (routing events and ingesting event data)