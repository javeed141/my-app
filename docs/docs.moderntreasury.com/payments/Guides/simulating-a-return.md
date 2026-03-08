# Simulate a Return

## Overview

When creating a Payment Order in Modern Treasury's Sandbox, it is possible to set up the payment so that it will trigger a Return. Currently, you can trigger Returns for ACH and Wire Payment Orders by sending them to a specific [Sandbox Counterparty](https://docs.moderntreasury.com/payments/docs/test-counterparties).

## Simulating Returns for ACH and Wire

To simulate an ACH return, you must create a Payment Order that is sent to a Counterparty who has an account number as `100XX` where `XX` is the [ACH return code](/payments/docs/ach-return-codes) you wish to trigger. For example, if the receiving account number is `10001`, you will receive an R01 return (Insufficient funds).

To simulate a Wire return, you can create a Payment Order to the same type of Counterparty as you would to simulate an ACH return. Therefore `100XX` pattern applies for Wire returns. **However** it is important to note that there is no concept of a Wire return code so simulated Wire returns will not have a return code specified.

Payment Orders are relayed through the Modern Treasury PSP regularly in Sandbox, and simulated Returns will be posted within minutes after the original Payment Orders have been sent. The [Payment Order lifecycle](https://docs.moderntreasury.com/platform/reference/payment-order-object#payment-order-statuses) is simulated in the Sandbox but mirrors how the lifecycle for Payment Orders and Returns work in the real world.

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