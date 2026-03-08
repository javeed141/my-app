# Setting fixed and variable currencies for FX

When sending a foreign currency, you may specify which side of the transaction has a fixed currency and which side will fluctuate based on market prices. You would set the `foreign_exchange_indicator` to either `variable_to_fixed` or `fixed_to_variable`

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
    "foreign_exchange_indicator": "variable_to_fixed",
    "originating_account_id": "0f8e3719-3dfd-4613-9bbf-c0333781b59f",
    "receiving_account_id": "5acec2ef-987b-4260-aa97-b719eeb0a8d5"
  }'
```