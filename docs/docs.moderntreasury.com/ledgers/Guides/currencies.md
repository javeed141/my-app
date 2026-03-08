# Ledger Currencies

# Overview

You can use Ledgers to record user balances no matter what currency your users transact in.

Each [ledger account object](/platform/reference/ledger-account-object) can record transactions and balances in a single currency, which you can define upon creating the account. If your application uses multiple different currencies, you can use multiple accounts to track user balances, one for each currency.

# Using a Predefined Currency

When creating a Ledger Account, you can specify the currency of the account using the `currency` field. This field can accept any [ISO-4217 currency code](https://www.iso.org/iso-4217-currency-codes.html).

For example, I can create an account tracking my user balances in dollars:

```shell
curl --request POST \
     --url https://app.moderntreasury.com/api/ledger_accounts \
     --header 'Accept: application/json' \
     --header 'Content-Type: application/json' \
     --data '
{
     "name": "USD Account",
     "currency": "USD",
     "normal_balance": "credit",
     "ledger_id": "937011e5-7262-45af-9d05-9ff8b70acdaa"
}
'
```

When I create Ledger Transactions in this ledger, I need to specify the `amount` on [ledger entries](/platform/reference/ledger-entry-object) in the smallest unit of my currency for the ledger account being transacted on. In the case of dollars, this smallest unit is cents. A Ledger Entry with an `amount` of 1000 would represent $10.00.

# Using a Custom Currency

Many applications need to immutably record double-entry transactions in currencies not supported by ISO-4217, like rewards points. Ledger Accounts can record transactions in any custom currency including user credits, rewards points, air miles, or cryptocurrencies.

To create a Ledger Account with a custom currency, you can use a custom `currency` value and specify a `currency_exponent` when creating a Ledger Account object. `currency_exponent` cannot exceed 30.

For example, Ether (the cryptocurrency that powers the Ethereum network) has a smallest denomination of 1\*10^-18 Ether. You can create a new Ledger Account with a custom value for `currency` and a `currency_exponent` of 18.

```shell
curl --request POST \
     --url https://app.moderntreasury.com/api/ledger_accounts \
     --header 'Accept: application/json' \
     --header 'Content-Type: application/json' \
     --data '
{
     "name": "ETH Account",
     "currency": "ETH",
     "normal_balance": "credit",
     "ledger_id": "937011e5-7262-45af-9d05-9ff8b70acdaa",
     "currency_exponent": 18
}
'
```

Any subsequent entries written to this ledger account can now be denominated in Ether's smallest unit. A Ledger Entry with an amount of `3000000000000000000` would be recorded as 3 Ether.