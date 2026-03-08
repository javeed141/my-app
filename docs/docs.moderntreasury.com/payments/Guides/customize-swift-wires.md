# Executing a foreign exchange contract

When you send a SWIFT wire, the funds must be converted from your local bank account's currency to the recipient's. Many businesses want to lock in the conversion rate prior to initiating the transfer to get certainty and shield themselves from currency fluctuations.

If you can execute foreign exchange (FX) contracts with your bank, you may pass in a unique identifier for the contract to Modern Treasury when sending the wire. We currently only support this functionality at Wells Fargo

To pass in a FX contract ID, simply include a value in the `foreign_exchange_contract` field when creating the payment order.

```curl Request
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/payment_orders \
  -H 'Content-Type: application/json' \
  -d '{
    "type": "wire",
    "amount": 1000,
    "direction": "credit",
    "currency": "EUR",
    "foreign_exchange_contract": "123456",
    "originating_account_id": "0f8e3719-3dfd-4613-9bbf-c0333781b59f",
    "receiving_account_id": "5acec2ef-987b-4260-aa97-b719eeb0a8d5"
  }'
```