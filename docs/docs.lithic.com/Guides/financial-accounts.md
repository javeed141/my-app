# Financial Accounts

Learn how Lithic's Financial Accounts are created, and what they store

Financial Accounts are the core object for customers using Lithic's ledger, tracking balances and storing the critical information as a bank account would. Our program and accounts at Lithic each have their own balances and history of financial transactions (e.g., card transactions, ACH funding) that contributed to that balance.

### Accounts vs Financial Accounts

An important distinction in Lithic's offering is the difference between `accounts` and `financial_accounts`. These are separate objects, with their own unique identifiers, that work in different ways:

* Accounts can be thought of like user buckets. They store information like address, phone number, and card details for any program using Lithic for card processing. Accounts which are not using Lithic's Ledger **will not** have any corresponding Financial Accounts.
* Financial Accounts can be thought of like bank accounts. They track balances, move money, and store information and configurations needed to properly ledger a program. Accounts which use Lithic's ledger **will** have corresponding Financial Accounts

### Financial Account Types

There are three types of financial accounts:

* `ISSUING`: Issuing Financial Accounts are used to track card spend. When you create a card for an `account_holder`, the card spend is tracked on the balance of the `ISSUING` account. Issuing accounts can also be affected by other payment rails, such as Payments, Book Transfers, and Management Operations.
  * `ISSUING` accounts can be Prepaid or Credit. Prepaid meaning they draw down from a cash balance, and Credit meaning they run a balance which must be paid off. See [balances](https://docs.lithic.com/docs/balances) to learn more
* `OPERATING`: Operating Financial Accounts are used for cash movements not involving cards. This can be Payments, Book Transfers, and Management Operations
* `RESERVE`: represents balance and financial transaction history for your reserve funds

### Program Level Financial Accounts

When your program is first created, it is by default given a `OPERATING` and a `RESERVE` Financial Account.

* The `OPERATING` account is used to store and track funds owned by you (**not** by your customers). Funds in the `OPERATING` account can be moved as needed for your treasury operations
* The `RESERVE` account is used to store a lump sum of funds required by Lithic and your bank sponsor, based on your risk assessment.

To view your Program Level Financial Accounts, simply call [List Financial Accounts](https://docs.lithic.com/reference/getfinancialaccounts) with no parameters when your program is created.

### Creating Financial Accounts for your Account Holders

When Lithic implementation onboards your program, we will configure a number of values to ensure your customer Financial Accounts are set up properly.

When your program is fully configured, Financial Accounts will be automatically created when you Create an Account Holder. You can then use the `account_token` in the response to to view the automatically created Financial Accounts. See the API flow below:

Request to [Create an Account Holder](https://docs.lithic.com/reference/postaccountholders):

```curl
curl --request POST \
     --url https://sandbox.lithic.com/v1/account_holders \
     --header 'Authorization: 650f3056-4c1e-4302-b1a6-f89f1756c189' \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --data '
{
  "individual": {
    "address": {
      "address1": "123 Drury Ln",
      "city": "New York",
      "country": "USA",
      "postal_code": "10012",
      "state": "NY"
    },
    "dob": "1997-04-17",
    "email": "muffinman97@gmail.com",
    "first_name": "Isa",
    "government_id": "110-45-9373",
    "last_name": "Baker",
    "phone_number": "+16084439054"
  },
  "workflow": "KYC_BASIC",
  "tos_timestamp": "2022-03-08T08:00:00Z"
}
'
```

Response:

```json
{
  "account_token": "a068212c-175d-433e-b943-e2af23a03235",
  "status": "ACCEPTED",
  "status_reasons": [],
  "token": "29ef2359-6f62-4aea-8c62-cc16f49cd444",
  "created": "2025-12-29T21:01:51.345899"
}
```

<br />

Now, taking the account\_token from above, we can determine the Financial Accounts generated for our Account\_Holder by calling [List Financial Accounts](https://docs.lithic.com/reference/getfinancialaccounts):

```curl
curl --request GET \
     --url 'https://sandbox.lithic.com/v1/financial_accounts?account_token=a068212c-175d-433e-b943-e2af23a03235' \
     --header 'Authorization: 650f3056-4c1e-4302-b1a6-f89f1756c189' \
     --header 'accept: application/json'
```

We can now see the corresponding Financial Accounts in the response:

```json
{
  "data": [
    {
      "token": "a0d9d119-cda7-58ae-bb03-03d63fedff79",
      "created": "2025-12-29T21:01:51Z",
      "updated": "2025-12-29T21:01:51Z",
      "type": "ISSUING",
      "routing_number": null,
      "account_number": null,
      "nickname": null,
      "account_token": "a068212c-175d-433e-b943-e2af23a03235",
      "status": "OPEN",
      "substatus": null,
      "is_for_benefit_of": true,
      "credit_configuration": {
        "credit_limit": null,
        "external_bank_account_token": null,
        "credit_product_token": null,
        "tier": null,
        "auto_collection_configuration": {
          "auto_collection_enabled": false
        }
      }
    },
    {
      "token": "0a1b467e-83b0-5de4-91f2-5069ac23e57f",
      "created": "2025-12-29T21:01:51Z",
      "updated": "2025-12-29T21:01:51Z",
      "type": "OPERATING",
      "routing_number": null,
      "account_number": null,
      "nickname": null,
      "account_token": "a068212c-175d-433e-b943-e2af23a03235",
      "status": "OPEN",
      "substatus": null,
      "is_for_benefit_of": true,
      "credit_configuration": {
        "credit_limit": null,
        "external_bank_account_token": null,
        "credit_product_token": null,
        "tier": null,
        "auto_collection_configuration": {
          "auto_collection_enabled": false
        }
      }
    }
  ],
  "has_more": false
}
```

<br />

Now that we know how to create Financial Accounts, let's talk about the data that makes them up:

# Financial Account Schema

|                      |                                                                                                                                                                                       |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token                | Globally unique identifier for the financial account                                                                                                                                  |
| created              | Date and time for when the financial account was first created                                                                                                                        |
| updated              | Date and time for when the financial account was last updated                                                                                                                         |
| type                 | `ISSUING`, `OPERATING`,`RESERVE` as described above                                                                                                                                   |
| routing\_number      | If the account is **routable**, meaning it is able to directly receive ACH and Wire payments, this value will be populated with the applicable bank routing number.                   |
| account\_number      | If the account is **routable**, meaning it is able to directly receive ACH and Wire payments, this value will be populated with the applicable account number.                        |
| nickname             | An optional value which can be set to identify an account at a glance                                                                                                                 |
| account\_token       | Globally unique identifier for the Lithic account which corresponds to this Financial Account. Accounts and Financial Accounts are separate objects (see section above).              |
| status               | Indicates the current operational state of a Financial Account, representing its availability for transactions and readiness to be used                                               |
| substatus            | Greater detail into the current operational state of a Financial Account. Used more frequently in ISSUING accounts for [Credit programs](https://docs.lithic.com/docs/quick-start-commercial-revolving-credit) |
| credit configuration | See [Credit programs](https://docs.lithic.com/docs/quick-start-commercial-revolving-credit) for more detail                                                                                                    |

<br />