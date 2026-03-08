# Balances

Learn how Lithic tracks balances in different kinds of accounts

Balances represent the monetary amounts held in or owed on a Financial Account at a given point in time. At Lithic, this reflects available funds, pending transactions, and any restrictions or holds that maybe placed on the Financial Account.

## Accessing Balances

Balances can be accessed by calling [Get Balance](https://docs.lithic.com/reference/getbalance) for a single financial account, or [List Balances](https://docs.lithic.com/reference/getbalances) to view the balance of multiple Financial Accounts. For example:

Get Balance request with financial account `dd1057be-664c-5e52-9e21-b1a8d83a7aac`:

```curl
curl --request GET \
     --url https://sandbox.lithic.com/v1/financial_accounts/dd1057be-664c-5e52-9e21-b1a8d83a7aac/balances \
     --header 'Authorization: 650f3056-4c1e-4302-b1a6-f89f1756c189' \
     --header 'accept: application/json'
```

<br />

Get Balance response:

```json
{
  "type": "ISSUING",
  "token": "dd1057be-664c-5e52-9e21-b1a8d83a7aac",
  "currency": "USD",
  "available_amount": 10000,
  "pending_amount": 2005,
  "total_amount": 12005,
  "created": "2025-06-12T21:51:31Z",
  "updated": "2025-11-21T21:21:35Z",
  "last_transaction_token": "ad1057be-664c-5e52-9e21-b1a8d83a7aac",
  "last_transaction_event_token": "5914237a-ac6d-5c6d-ac46-3f5bfb329db5"
}
```

All updates to your Financial Account Balances also can be subscribed to via the [balance.updated webhook](https://docs.lithic.com/reference/post_balance-updated)

## Prepaid vs Credit Balances

Lithic tracks balances differently in **Prepaid** Financial Accounts vs **Credit** Financial Accounts

**Prepaid** Financial Accounts hold a positive (+) balance, and indicate an amount **stored**:

* Credit Financial Accounts start at 0 and **must be funded** to unlock spend
* Funds spent out of a Prepaid Financial Account, via card spend or an outgoing payment, **reduce** the balance
* Funds added to a Prepaid Financial Account, via a chargeback or incoming payment, **increase** the balance
* Prepaid Financial Accounts which hold a negative balance have been overdrawn

**Credit** Financial Accounts also hold a positive (+) balance, but indicate an amount **owed**:

* Credit Financial Accounts start at 0 balance but **do not need to be funded** to unlock spend
* When funds spent out of a Credit Financial Account via card spend **increase** the balance
* Funds added to a Credit Financial Account, via a chargeback or incoming repayment, **reduce** the balance

## Balance Layers

Lithic has three layers of balances that are affected by transactions and financial events: `available_amount`, `pending_amount`, and `total_amount`. These layers and their meaning are dependent on whether the account is Prepaid or Credit

### Prepaid Balance Layers

* **available amount**: The amount of funds stored in the Financial Account that you can spend or transfer
* **pending amount**: The amount of funds stored in the Financial Account that are set aside for transactions and holds that are in process. Funds from the pending balance cannot be accessed for spend or other use cases. This amount will be negative.
* **total amount**: The sum of available and pending balances. This is the amount that will be stored if all pending transactions and holds settle.

<br />

### Credit Balance Layers

* **available amount**: This is the amount that will be owed if all pending transactions and holds settle.
* **pending amount**: The amount of funds owed on the Financial Account that has been spent or transferred, but is still in process. This amount will be negative.
* **total amount**: The sum of available and pending balances. The amount of funds owed on the Financial Account that have been fully spent or transferred, and settled.

See an example [here](https://docs.lithic.com/docs/quick-start-commercial-revolving-credit#5-transact) of how negative balances get updated on Credit Financial Accounts via card spend