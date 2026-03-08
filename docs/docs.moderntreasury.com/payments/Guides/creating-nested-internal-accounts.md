# Creating Nested Internal Accounts

Check to make sure your bank provides balances for Virtual Accounts in our [Virtual Accounts Overview](https://docs.moderntreasury.com/payments/docs/virtual-accounts).

<Callout icon="📘" theme="info">
  In this guide, you will be creating nested Internal Accounts to reflect your bank’s virtual accounts product.
</Callout>

## Prerequisites

To create nested Internal Accounts, you need to have two things:

1. An onboarded parent Internal Account at Modern Treasury. This will be the physical bank account that you will nest accounts under.
2. A `connection_id` value. This represents the bank connection we have set up for you. We will provide you this field.

Please contact your support representative if you do not have one or both of these details.

You will be using the [Create Internal Account](/platform/reference/create-internal-account) endpoint, except you will be specifying a parent Internal Account to nest under.

## Create a nested Internal Account

Before you create a nested internal account, please find the parent internal account you’d like to nest these accounts under. Once you’ve found the parent internal account, you can grab the `id` of the account and use it in the following requests.

```curl Create a Nested Internal Account
curl --request POST \
  --u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/internal_accounts \
  --header 'Content-Type: application/json' \
  --data '{
            "connection_id": "<connection id>",
            "name": "<nickname for account>",
            "party_name": "<legal name for account>",
            "currency": "<ISO currency code ie. USD>",
            "parent_account_id": "<parent account id>"
          }'
```

## Create a nested Internal Account with a Counterparty

Our API also supports linking this account to a [Counterparty](/platform/reference/create-counterparty) . This may be helpful if you are holding funds on behalf of someone, or if you want to link a set of transactions to a Counterparty.

```curl
curl --request POST \
  --u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/internal_accounts \
  --header 'Content-Type: application/json' \
  --data '{
            "connection_id": "<connection id>",
            "name": "<nickname for account>",
            "party_name": "<legal name for account>",
            "currency": "<ISO currency code ie. USD>",
            "parent_account_id": "<parent account id>",
            "counterparty_id": "<counterparty id>"
          }'
```