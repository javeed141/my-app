# Use Multiple Currencies

In Ledgers, a single transaction can have entries in multiple currencies. This guide explains how to make the most of this feature.

Multi-currency transactions simplify maintaining a ledger in multiple currencies. This is implemented with the following design principles:

* `currency` is a property of `ledger account` objects. This means a single ledger can contain accounts of multiple currencies, as desired. Read [this guide](https://docs.moderntreasury.com/docs/guide-to-ledger-objects) for more on the taxonomy of objects in the Ledgers API.
* Debits and credits within a single currency need to match, as per our [guarantees](https://docs.moderntreasury.com/docs/ledgers-guarantees).

Transactions that feature multiple currencies have assured atomicity - full failure or success is guaranteed for a single transaction.

# Currency on Ledger Accounts

Multi-currency is enabled by each `ledger account` object having a currency. Upon object creation, Ledger Accounts must specify a `currency` property. This property must be an [ISO4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency or a currency/exponent combination indicating a [custom currency](https://docs.moderntreasury.com/docs/currencies). You cannot use a custom currency that matches an ISO4217 currency.

Here is an example:

```curl
curl --request POST \
     --url https://app.moderntreasury.com/api/ledger_accounts \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --data '
{
     "currency": "USD",
     "name": "Matt M.  Wallet Balance",
     "description": "Holds funds for Matt M.",
     "normal_balance": "credit",
     "ledger_id": "89c8bd30-e06a-4a79-b396-e6c7e13e7a12"
}'
```

This request would return the following JSON object. Notice that `currency` is returned inside the `balances` object:

```json
{
  "id": "f1c7e474-e6d5-4741-9f76-04510c8b6d7a",
  "object": "ledger_account",
  "name": "Matt M.  Wallet Balance",
  "ledger_id": "89c8bd30-e06a-4a79-b396-e6c7e13e7a12",
  "description": null,
  "lock_version": 0,
  "normal_balance": "credit",
  "balances": {
    "pending_balance": {
      "credits": 0,
      "debits": 0,
      "amount": 0,
      "currency": "USD",
      "currency_exponent": 2
    },
    "posted_balance": {
      "credits": 0,
      "debits": 0,
      "amount": 0,
      "currency": "USD",
      "currency_exponent": 2
    }
  },
  "metadata": {},
  "live_mode": true,
  "created_at": "2020-08-04T16:54:32Z",
  "updated_at": "2020-08-04T16:54:32Z"
}
```

Currency is a mandatory field. All balances within an account have the same currency.

[Account categories](https://docs.moderntreasury.com/docs/nesting-accounts) only support accounts of the same currency.

# Matching Debits and Credits for Each Currency

When creating a transaction, Ledgers will request that you ensure debits equal credits within each currency. In practice, this means you need at least two entries for each currency.

Let us use the example of a cross-border digital wallet app. A user in the US is sending $1,200 USD to a user in Japan, who will receive $170,841.00 JPY.

In this sample transaction call, we are referencing four accounts. On the US side:

* A USD-denominated user balance account that represents a wallet balance associated with a user in the United States. This is a credit normal account as it represents a liability. This account will get deducted (debited) by $1,200 in USD when the transfer is posted;
* A USD-denominated cash account that represents total funds held in the United States. This is a debit normal account as it represents an asset. This account will get deducted (credited) by $1,200 USD when the transfer is posted;

Finally, on the Japanese side:

* A JPY-denominated user balance account that also represents a wallet balance. This is also a credit normal account, though it will get increased (credited) by ¥170,841 JPY.
* A JPY-denominated cash account that represents funds held in Japan. This is also a debit normal account that will, however, get increased (debited) by ¥170,841 JPY.

Here is how we translate this in a call to the `ledger_transactions` endpoint:

```curl
curl --request POST \
     --url https://app.moderntreasury.com/api/ledger_transactions \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --data '
{
     "ledger_entries": [
          {
               "amount": 120000,
               "direction": "debit",
               "ledger_account_id": "68f09628-65c6-4b3e-bd17-206d4a551921" // US user balance gets deducted in USD
          },
          {
               "amount": 120000,
               "direction": "credit",
               "ledger_account_id": "be61380d3a3d8bb3569efc7907984714" // US cash account gets deducated in USD
          },
          {
               "amount": 170841,
               "direction": "credit",
               "ledger_account_id": "9445d752-6a7e-4b16-8f29-96df7105c437" // Japanese user balance gets increased in JPY
          },
          {
               "amount": 170841,
               "direction": "debit",
               "ledger_account_id": "c8ddd06c169ce24f1a1b225710269446" // Japanese cash account gets increased in JPY
          }
     ],
     "description": "USD to JPY User Transfer",
     "status": "pending",
     "effective_date": "2022-09-20",
     "metadata": {
     	"originating_currency": "USD",
        "receiving_currency": "JPY",
        "senderCountry": "United States",
        "receiverCountry": "Japan",
        "effective_FX": 142.3675
     }
}
'
```

Amounts are user-defined. Notice that Yen has a currency exponent of zero so the `amount` field is not represented in cents.

Finally, any additional entry - such as fees - would have to counterbalance other entries in the same currency.