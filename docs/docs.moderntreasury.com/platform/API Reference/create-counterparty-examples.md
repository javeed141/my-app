# Example Requests

These are sample payloads for Counterparty.

## Creating a simple Counterparty

The following request will create a counterparty with just a name and a single [account](https://docs.moderntreasury.com/platform/reference/internal-account-object).

```json
{
  "name": "Kenner, Bach & Ledeen",
  "accounts": [
    {
      "account_type": "checking",
      "routing_details": [
        {
          "routing_number_type": "aba",
          "routing_number": "026009593"
        }
      ],
      "account_details": [
        {
          "account_number": "123456789"
        }
      ]
    }
  ]
}
```

If your counterparty has two different routing numbers (e.g. separate wire/ACH routing instructions), multiple `routing_details` can be specified with different `payment_type` values.

```json
{
  "name": "Kenner, Bach & Ledeen",
  "accounts": [
    {
      "account_type": "checking",
      "routing_details": [
        {
          "routing_number_type": "aba",
          "routing_number": "026009593",
          "payment_type": "wire"
        },
        {
          "routing_number_type": "aba",
          "routing_number": "011400495",
          "payment_type": "ach"
        }
      ],
      "account_details": [
        {
          "account_number": "123456789"
        }
      ]
    }
  ]
}
```

If you are trying to wire money to a counterparty, you'll need an address, which you can include with their account information.

```json
{
  "name": "John Smith",
  "accounts": [
    {
      "account_type": "checking",
      "party_type": "individual",
      "routing_details": [
        {
          "routing_number_type": "aba",
          "routing_number": "026009593",
          "payment_type": "wire"
        }
      ],
      "account_details": [
        {
          "account_number": "123456789"
        }
      ],
      "party_address": {
	  	"line1": "3rd Floor",
	  	"locality": "Tampa",
	  	"region": "FL",
	  	"postal_code": "33610",
	  	"country": "USA"
	  }
    }
  ]
}
```

## Creating a Counterparty with an external stablecoin wallet address

To create a counterparty with an externally managed stablecoin wallet, simply define the address string as `account_number` and address type as `account_number_type`

```
{
 "name": "Acme Fireblocks Wallet",
 "accounts": [
        {
            "account_details": [
                {
                "account_number": "0x9bE868839163E128971Bb6AE045e172Fa806E805",
                "account_number_type": "ethereum_address"
                }
            ]
        }
    ]
}
```

## Creating a Counterparty with a Canadian routing number

To use a Canadian routing number, simply pass `ca_cpa` as the `routing_number_type` and use the [EFT format](https://en.wikipedia.org/wiki/Routing_number_%28Canada%29#Format) of the `routing_number`. The format is a leading zero followed by the 3 digit financial institution number followed followed by the 5 digit branch number. For the example, the routing number `000494480` is a leading `0` followed by `004` (TD Bank) followed by `94480` (a specific TD branch in Vancouver).

```json
{
  "name": "Kenner, Bach & Ledeen",
  "accounts": [
    {
      "account_type": "checking",
      "routing_details": [
        {
          "routing_number_type": "ca_cpa",
          "routing_number": "000494480",
        },
      ],
      "account_details": [
        {
          "account_number": "123456789"
        }
      ]
    }
  ]
}
```

## Creating a Counterparty with an Australian routing number

To use a Australian routing number, simply pass `au_bsb` as the `routing_number_type` and use the [BSB format](https://en.wikipedia.org/wiki/Bank_state_branch#Format) of the `routing_number`. The format is six digits long, comprising of a 2 digit financial institution number, a 1 digit code identifying which state the branch is in, and 3 digits denoting the branch address.

```json
{
  "name": "Kenner, Bach & Ledeen",
  "accounts": [
    {
      "account_type": "checking",
      "routing_details": [
        {
          "routing_number_type": "au_bsb",
          "routing_number": "062903",
        },
      ],
      "account_details": [
        {
          "account_number": "123456789"
        }
      ]
    }
  ]
}
```

## Creating a Counterparty with a Plaid token

To use a Plaid token, simply pass it into the `account` you are creating instead of `account_details` and `routing_details`

```json
{
  "name": "John Smith",
  "accounts": [
    {
      "plaid_processor_token": "processor-sandbox-91aafea8-c4d0-4477-b471-e1884989de3a"
    }
  ]
}
```

## Creating a Counterparty without an account

If you do not know your Counterparty's account information, you can still create a counterparty record and add an account later.

```json
{
  "name": "Kenner, Bach & Ledeen",
  "email": "kbl@example.com"
}
```

## Creating a Counterparty + Legal Entity

Legal Entity example requests can be found [here](https://docs.moderntreasury.com/platform/reference/legal-entity-example-request).

```json
{
  "name": "Counterparty Name",
  "legal_entity": {
    "legal_entity_type": "individual",
    "first_name": "First",
    "last_name": "Last",
    "date_of_birth": "2024-02-06",
    "email": "example@gmail.com",
    "phone_numbers": [
      {
        "phone_number": "+12061111111"
      }
    ],
    "addresses": [
      {
        "line1": "119 5th Ave",
        "line2": "Suite 600",
        "locality": "New York",
        "region": "NY",
        "postal_code": "10003",
        "country": "US"
      }
    ]
  }
}
```

## Creating a Counterparty + Associating an existing Legal Entity

```json JSON
{
  "name": "Counterparty Name",
  "legal_entity_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

## Updating a Counterparty + Associating a Legal Entity

```json
{
  "legal_entity_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
}
```