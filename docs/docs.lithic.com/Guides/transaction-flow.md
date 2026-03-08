# Transaction Flow

Learn about the most common transaction sequences you can expect to see on the Lithic platform.

# Basic Transaction Flow Overview

Many transactions follow a basic flow consisting of an initial authorization and a subsequent clearing message to settle funds:

<Image align="left" width="500px" src="https://d1jvjlrimvr0n9.cloudfront.net/stable/ac12fbe611d302c9_e451732-Example_Flow__Authorization__Clearing2x.png" />

1. Network transmits an ISO-8583 Message Type Identifier (MTI) 0100 message (i.e., an authorization request) to Lithic.
2. Lithic converts the ISO-8583 message to transaction model JSON and sends an ASA request to the user.
3. The user responds with HTTP 200 ASA JSON response body with result `APPROVED`. \**HTTP 200 & ASA response required.*
4. Lithic converts the ASA response body to an ISO-8583 response and returns it to the network.
5. Merchant/acquirer initiates completion of the transaction and Lithic receives an ISO-8583 MTI 0220 message (i.e., financial advice) from the network. \**This message typically arrives between 0-7 days after the previous response.*
6. Lithic processes the ISO-8583 message and responds with an approved response back to the network.
7. Lithic converts the ISO-8583 message to a JSON transaction model with status `SETTLED` and sends a Clearing message to the user. Step 6 & 7 are processed concurrently.
8. The user responds with HTTP response code 200 to acknowledge. \**HTTP 200 required.*

# Detailed Transaction Flow Guide

While many transactions will follow the above flow, more complicated sequences may occur. At each step in the transaction lifecycle, Lithic will send the user a webhook containing information about the transaction (see [Webhooks](https://docs.lithic.com/docs/introduction) for information about the different types of webhooks sent). There are eight message types that can initiate a transaction, which is denoted by a unique transaction token. Across these eight messages, the user can receive a webhook via two entry points:

* Authorization stream access (ASA) endpoint
* Transaction webhook endpoint

> 🚧 Note:
>
> The flows depicted in this guide represent those most commonly experienced under normal operating circumstances. Rare network-specific exceptions can occur, so the flows described here should not be considered exhaustive.
>
> Example payloads below display a subset of relevant fields but not are exhaustive.

See below for a list of expected transaction flows:

![](https://d1jvjlrimvr0n9.cloudfront.net/stable/cf8371dd71d301e2_97c470081585cf85950190ca61fa90fa91ce4e99e4c5ddb576c7ad5eb4d4bed1-image.png)

Since merchant behavior can be non-standard, it is possible for transactions to deviate from the outlined flows. Such transactions are rare and potentially subject to review if the merchant behavior violates network rules.

> 📘 Ledger Integration
>
> If you’re using Lithic to integrate with a third party or internal ledger, you’ll need to be able to react and respond to the messages detailed in this guide. Your system should have the ability to keep track of available customer balances, place holds on authorized funds, and internally transfer cleared amounts to an account used for daily settlement. This can be done in one of three ways:
>
> * Integrate with a third party wallet provider
> * Pool your customer funds, and use a third party core system for ledger accounting
> * Pool your customer funds, and build a ledgering system internally
>
> When Lithic sends a request to your ASA endpoint, base your approval decision on the available balance to spend (total balance minus any pending or settled transactions).
>
> When Lithic sends a transaction webhook to your endpoint, the `amounts` in the transaction inform how you should update your ledger. For a debit transaction, the `amounts.hold.amount` advises the hold, or temporary reduction, you should place on the available balance. For any transaction, the `amounts.settlement.amount` dictates how much has actually settled in the settlement currency and should be posted as the final amount against the balance.

# Message Types Originating with an ASA Request

For new transactions that require approval, Lithic will send an ASA request to the user's configured endpoint. These requests can be one of five types, as represented by the `status` field in the ASA request:

## 1: Authorization

An initial authorization request through the ASA endpoint is the typical “happy path” of a dual-message system (DMS) transaction.

*Example ASA request:*

```json JSON (ASA request)
{
  "status": "AUTHORIZATION",
  "amount": 900,
  "acquirer_fee": 100,
  "authorization_amount": 1000,
  "settled_amount": 0,
  "events": [],
  ...
}
```

*To simulate the above example, call the [simulate authorization](https://docs.lithic.com/reference/postsimulateauthorize) endpoint with `status` of `AUTHORIZATION`.*

In this example, the cardholder has initiated a $9 DMS transaction, on which a $1 acquirer fee has been levied. The `events` array will always be empty for authorization requests.

At this point, the user has three options: approve the authorization, decline the authorization, or approve the authorization up to a specific amount (see [Partial Approval](https://docs.lithic.com/docs/partial-approval) for more information). To do this, the user will respond to the ASA request using result `APPROVED` to accept the authorization, or decline with the appropriate reason.

Once the response is sent to Lithic, the user will receive a transaction webhook notifying them of the result of the authorization.

If the authorization is declined, a transaction webhook will be sent notifying the user of the decline. In this situation, the payload of the message will look like the following.

*Example transaction webhook:*

```json JSON (transaction webhook)
{
  "status": "DECLINED",
  "acquirer_fee": 100,
  "amounts": {
    "hold": {
      "amount": 0,
      "currency": "USD"
    },
    "merchant": {
      "amount": 0,
      "currency": "USD"
    },
    "cardholder": {
      "amount": 0,
      "currency": "USD",
      "conversion_rate": "1.000000"
    },
    "settlement": {
      "amount": 0,
      "currency": "USD"
    }
  },
  "events": [
    {
      "type": "AUTHORIZATION",
      "result": "UNAUTHORIZED_MERCHANT",
      "amounts": {
        "settlement": null,
        "cardholder": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "DEBIT",
      "detailed_results": [
        "MERCHANT_LOCKED_CARD_ATTEMPTED_ELSEWHERE"
      ]
    }
  ],
  ...
}
```

*To simulate the above example, call the [simulate authorization](https://docs.lithic.com/reference/postsimulateauthorize) endpoint with `status` of `AUTHORIZATION`, then decline the ASA request.*

The `acquirer_fee` is included in all amounts at the transaction level and the event level.

This decline can happen in two situations.

* **Expected decline:** The first is when the user responds to the ASA request with any result other than `APPROVED`. In this case, the result field in the response will contain the decline result used by the user.
* **Unexpected decline**: The second is when the user responds to the ASA request with result `APPROVED`, but returns an error, exceeds the allotted response time, or returns a malformed response. These declines will be treated in the same manner as a decline performed by the user indicated via the ASA response. Once an authorization has been declined, no further related messages are expected related to the transaction.

In the case of an approved authorization, the user will receive a message at the transaction webhook endpoint with the following information.

*Example transaction webhook:*

```json JSON (transaction webhook)
{
  "status": "PENDING",
  "acquirer_fee": 100,
  "amounts": {
    "hold": {
      "amount": -1000,
      "currency": "USD"
    },
    "merchant": {
      "amount": 0,
      "currency": "USD"
    },
    "cardholder": {
      "amount": 0,
      "currency": "USD",
      "conversion_rate": "1.000000"
    },
    "settlement": {
      "amount": 0,
      "currency": "USD"
    }
  },
  "events": [
    {
      "type": "AUTHORIZATION",
      "result": "APPROVED",
      "amounts": {
        "settlement": null,
        "cardholder": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "DEBIT",
      "detailed_results": [
        "APPROVED"
      ]
    }
  ],
  ...
}
```

*To simulate the above example, call the [simulate authorization](https://docs.lithic.com/reference/postsimulateauthorize) endpoint with `status` of `AUTHORIZATION`, then accept the ASA request.*

Since the transaction is now in a pending state, the user should wait for additional messages to arrive from the network and Lithic. There are four possible message types that can occur after the initial authorization (shown in the `events.type` field): `CLEARING`, `AUTHORIZATION_REVERSAL`, `AUTHORIZATION_EXPIRY` and `AUTHORIZATION_ADVICE`.

### Authorization > Clearing

Continuing along the DMS “happy path,” after an authorization is approved, the user may receive a Clearing message at the transaction webhook endpoint.

*Example transaction webhook:*

```json JSON (transaction webhook)
{
  "status": "SETTLED",
  "acquirer_fee": 0,
  "amounts": {
    "hold": {
      "amount": 0,
      "currency": "USD"
    },
    "merchant": {
      "amount": -1000,
      "currency": "USD"
    },
    "cardholder": {
      "amount": -1000,
      "currency": "USD",
      "conversion_rate": "1.000000"
    },
    "settlement": {
      "amount": -1000,
      "currency": "USD"
    }
  },
  "events": [
    {
      "type": "AUTHORIZATION",
      "result": "APPROVED",
      "amounts": {
        "settlement": null,
        "cardholder": {
          "amount": 1000,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "DEBIT",
      "detailed_results": [
        "APPROVED"
      ],
    },
    {
      "type": "CLEARING",
      "result": "APPROVED",
      "amounts": {
        "settlement": {
          "amount": 1000,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "cardholder": {
          "amount": 1000,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "DEBIT",
      "detailed_results": [
        "APPROVED"
      ],
    }
  ],
  ...
}
```

*To simulate the above example, call the [simulate authorization](https://docs.lithic.com/reference/postsimulateauthorize) endpoint with `status` of `AUTHORIZATION`, accept the ASA request, then call the [simulate clearing transaction](https://docs.lithic.com/reference/postsimulateclearing) endpoint with the transaction token generated from the authorization.*

When a Clearing message arrives on a previously authorized transaction, there are three situations that can arise:

1. The Clearing message amount is greater than the authorization amount. This most often occurs in the case of a tip at a restaurant or bar.
2. The Clearing message amount equals the authorization amount. This characterizes the majority of transactions.
3. The Clearing message amount is less than the authorization amount. This most often occurs as part of a “multiple completion,” in which a merchant fulfills a transaction multiple times (e.g., a merchant ships two packages separately from a single online order and sends a clearing for each package).

In all of the above cases, the status of the transaction will be `SETTLED`. Additional Clearing, Authorization Reversal, and Authorization Expiry messages may occur on a `SETTLED` transaction. See [Multiple Completion](https://docs.lithic.com/docs/transaction-flow#multiple-completion) for information about these situations.

### Authorization > Authorization Reversal

When the merchant elects to cancel a transaction before it has been settled, the user will receive an Authorization Reversal message at the transaction webhook endpoint. Different outcomes arise based on the reversed amount. The first and most common is that the reversed amount matches the authorization amount. In this case, the status will be `VOIDED` and all amounts in `amounts` are zero.

*Example transaction webhook:*

```json JSON (transaction webhook)
{
  "status": "VOIDED",
  "acquirer_fee": 0,
  "amounts": {
    "hold": {
      "amount": 0,
      "currency": "USD"
    },
    "merchant": {
      "amount": 0,
      "currency": "USD"
    },
    "cardholder": {
      "amount": 0,
      "currency": "USD",
      "conversion_rate": "1.000000"
    },
    "settlement": {
      "amount": 0,
      "currency": "USD"
    }
  },
  "events": [
    {
      "type": "AUTHORIZATION",
      "result": "APPROVED",
      "amounts": {
        "settlement": null,
        "cardholder": {
          "amount": 1000,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "DEBIT",
      "detailed_results": [
        "APPROVED"
      ],
    },
    {
      "type": "AUTHORIZATION_REVERSAL",
      "result": "APPROVED",
      "amounts": {
        "settlement": null,
        "cardholder": {
          "amount": 1000,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "CREDIT",
      "detailed_results": [
        "APPROVED"
      ]
    }
  ],
  ...
}
```

*To simulate the above example, call the [simulate authorization](https://docs.lithic.com/reference/postsimulateauthorize) endpoint with `status` of `AUTHORIZATION`, accept the ASA request, then call the [simulate void transaction](https://docs.lithic.com/reference/postsimulatevoid) endpoint with `type` of `AUTHORIZATION_REVERSAL` and the transaction token generated from the authorization.*

The other possible case is that the reversed amount is less than the authorized amount.

*Example transaction webhook:*

```json JSON (transaction webhook)
{
  "status": "PENDING",
  "acquirer_fee": 0,
  "amounts": {
    "hold": {
      "amount": -100,
      "currency": "USD"
    },
    "merchant": {
      "amount": 0,
      "currency": "USD"
    },
    "cardholder": {
      "amount": 0,
      "currency": "USD",
      "conversion_rate": "1.000000"
    },
    "settlement": {
      "amount": 0,
      "currency": "USD"
    }
  },
  "events": [
    {
      "type": "AUTHORIZATION",
      "result": "APPROVED",
      "amounts": {
        "settlement": null,
        "cardholder": {
          "amount": 1000,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "DEBIT",
      "detailed_results": [
        "APPROVED"
      ]
    },
    {
      "type": "AUTHORIZATION_REVERSAL",
      "result": "APPROVED",
      "amounts": {
        "settlement": null,
        "cardholder": {
          "amount": 900,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 900,
          "currency": "USD"
        }
      },
      "effective_polarity": "CREDIT",
      "detailed_results": [
        "APPROVED"
      ]
    }
  ],
  ...
}
```

*To simulate the above example, call the [simulate authorization](https://docs.lithic.com/reference/postsimulateauthorize) endpoint with `status` of `AUTHORIZATION`, accept the ASA request, then call the [simulate void transaction](https://docs.lithic.com/reference/postsimulatevoid) endpoint with `type` of `AUTHORIZATION_REVERSAL`, the transaction token generated from the authorization, and an `amount` of less than the original `amount` authorized.*

In this situation, the `amounts.hold.amount` will equal the difference between the originally authorized and reversed amounts, and the status will remain `PENDING` until another message arrives to either clear or reverse the remaining authorized amount.

It is also possible for the reversed amount to be greater than the authorized amount when:

* the transaction is in a foreign currency. If the foreign exchange rate has changed since the initial authorization, then the amount on the Authorization Reversal message could be greater or less than the amount on the original Authorization message.
* the merchant makes an error and enters an incorrect reversal amount. This is a rare occurrence as the networks generally have checks to prevent over-reversals.

In either case, if there is an over-reversal, Lithic will cap the `amounts.hold.amount` to $0.

After an Authorization Reversal event, subsequent Clearing, Authorization Reversal, and Authorization Expiry events can occur on the transaction. See [Multiple Completion](https://docs.lithic.com/docs/transaction-flow#multiple-completion) for more information.

An uncommon sequence that can appear is an Authorization Reversal followed by an Authorization Advice. This typically occurs when there is a timeout (e.g., user's ASA responder took too long to respond, Lithic platform takes too long to process the authorization). When this occurs, the final Authorization Advice event can effectively be ignored as no additional events are expected to take place after the reversal.

*Example transaction webhook:*

```json JSON (transaction webhook)
{
  "status": "DECLINED",
  "acquirer_fee": 0,
  "amounts": {
    "hold": {
      "amount": 0,
      "currency": "USD"
    },
    "merchant": {
      "amount": 0,
      "currency": "USD"
    },
    "cardholder": {
      "amount": 0,
      "currency": "USD",
      "conversion_rate": "1.000000"
    },
    "settlement": {
      "amount": 0,
      "currency": "USD"
    }
  },
  "events": [
    {
      "type": "AUTHORIZATION",
      "result": "APPROVED",
      "amounts": {
        "settlement": null,
        "cardholder": {
          "amount": 1000,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "DEBIT",
      "detailed_results": [
        "APPROVED"
      ]
    },
    {
      "type": "AUTHORIZATION_REVERSAL",
      "result": "APPROVED",
      "amounts": {
        "settlement": null,
        "cardholder": {
          "amount": 1000,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "CREDIT",
      "detailed_results": [
        "APPROVED"
      ]
    },
    {
      "type": "AUTHORIZATION_ADVICE",
      "result": "DECLINED",
      "amounts": {
        "settlement": null,
        "cardholder": {
          "amount": 1000,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "DEBIT",
      "detailed_results": [
        "DECLINED"
      ]
    }
  ],
  ...
}
```

### Authorization > Authorization Expiry

Each authorization has an authorization validity window set by the card network that indicates how long the merchant has to clear (or settle) the transaction. Once this window passes, holds placed on cardholder funds due to this authorization should be lifted, so that the cardholder can use these funds for other transactions.

Lithic uses a set of rules – informed by the networks' guidelines on authorization validity windows as well as our customers' needs for timely access to their available funds – to identify authorizations that are not expected to settle further. For each of these authorizations, Lithic releases any pending amount that has not yet been cleared back to the cardholder's available balance. This action is called "expiring" the authorization. Typically, authorizations that expire do so in full, meaning no clearing occurred at all.

*Example transaction webhook:*

```json JSON (transaction webhook)
{
  "status": "EXPIRED",
  "acquirer_fee": 0,
  "amounts": {
    "hold": {
      "amount": 0,
      "currency": "USD"
    },
    "merchant": {
      "amount": 0,
      "currency": "USD"
    },
    "cardholder": {
      "amount": 0,
      "currency": "USD",
      "conversion_rate": "1.000000"
    },
    "settlement": {
      "amount": 0,
      "currency": "USD"
    }
  },
  "events": [
    {
      "type": "AUTHORIZATION",
      "result": "APPROVED",
      "amounts": {
        "settlement": null,
        "cardholder": {
          "amount": 1000,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "DEBIT",
      "detailed_results": [
        "APPROVED"
      ]
    },
    {
      "type": "AUTHORIZATION_EXPIRY",
      "result": "APPROVED",
      "amounts": {
        "settlement": null,
        "cardholder": {
          "amount": 1000,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "CREDIT",
      "detailed_results": [
        "APPROVED"
      ]
    }
  ],
  ...
}
```

*To simulate the above example, call the [simulate authorization](https://docs.lithic.com/reference/postsimulateauthorize) endpoint with `status` of `AUTHORIZATION`, accept the ASA request, then call the [simulate void transaction](https://docs.lithic.com/reference/postsimulatevoid) endpoint with `type` of `AUTHORIZATION_EXPIRY` and the transaction token generated from the authorization.*

Once Lithic expires an authorization, additional events pertaining to the authorization may still occur, such as a merchant sending an authorization reversal.

At times, a merchant may clear a transaction *after* Lithic has expired the authorization. When this occurs, a `CLEARING` event will follow the `AUTHORIZATION_EXPIRY`. Lithic cannot reject this clearing event because the rules Lithic follows to expire an authorization are independent of the merchant's own timing with clearing a transaction.

It is possible for an authorization to be partially cleared prior to expiring. See [Multiple Completion](https://docs.lithic.com/docs/transaction-flow#multiple-completion) for more information.

### Authorization > Authorization Advice

After an approved authorization, a message of type `AUTHORIZATION_ADVICE` may be delivered via the transaction webhook. Authorization Advice messages update the authorized amount of previous authorizations without clearing any funds.

A typical situation where an Authorization Advice message is sent is when a cardholder makes a gasoline purchase; an initial authorization is sent before the gas is pumped, then updated to the true amount afterwards. An example Authorization Advice message can be found below.

*Example transaction webhook:*

```json JSON (transaction webhook)
{
  "status": "PENDING",
  "acquirer_fee": 0,
  "amounts": {
    "hold": {
      "amount": -2000,
      "currency": "USD"
    },
    "merchant": {
      "amount": 0,
      "currency": "USD"
    },
    "cardholder": {
      "amount": 0,
      "currency": "USD",
      "conversion_rate": "1.000000"
    },
    "settlement": {
      "amount": 0,
      "currency": "USD"
    }
  },
  "events": [
    {
      "type": "AUTHORIZATION",
      "result": "APPROVED",
      "amounts": {
        "settlement": null,
        "cardholder": {
          "amount": 1000,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "DEBIT",
      "detailed_results": [
        "APPROVED"
      ]
    },
    {
      "type": "AUTHORIZATION_ADVICE",
      "result": "APPROVED",
      "amounts": {
        "settlement": null,
        "cardholder": {
          "amount": 2000,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 2000,
          "currency": "USD"
        }
      },
      "effective_polarity": "DEBIT",
      "detailed_results": [
        "APPROVED"
      ]
    }
  ],
  ...
}
```

*To simulate the above example, call the [simulate authorization](https://docs.lithic.com/reference/postsimulateauthorize) endpoint with `status` of `AUTHORIZATION`, accept the ASA request, then call the [simulate authorization advice](https://docs.lithic.com/reference/postsimulateauthorizationadvice) with a new amount and the transaction token generated from the authorization.*

In this example, an Authorization Advice has augmented the authorization amount from $10 to $20.

After an Authorization Advice message, a subsequent message will clear, reverse, or expire the authorized amount. An example of each is below.

*Example transaction webhooks:*

```json JSON (transaction webhook)
{
  "status": "SETTLED",
  "acquirer_fee": 0,
  "amounts": {
    "hold": {
      "amount": 0,
      "currency": "USD"
    },
    "merchant": {
      "amount": -2000,
      "currency": "USD"
    },
    "cardholder": {
      "amount": -2000,
      "currency": "USD",
      "conversion_rate": "1.000000"
    },
    "settlement": {
      "amount": -2000,
      "currency": "USD"
    }
  },
  "events": [
    {
      "type": "AUTHORIZATION",
      "result": "APPROVED",
      "amounts": {
        "settlement": null,
        "cardholder": {
          "amount": 1000,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "DEBIT",
      "detailed_results": ["APPROVED"]
    },
    {
      "type": "AUTHORIZATION_ADVICE",
      "result": "APPROVED",
      "amounts": {
        "settlement": null,
        "cardholder": {
          "amount": 2000,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 2000,
          "currency": "USD"
        }
      },
      "effective_polarity": "DEBIT",
      "detailed_results": ["APPROVED"]
    },
    {
      "type": "CLEARING",
      "result": "APPROVED",
      "amounts": {
        "settlement": {
          "amount": 2000,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "cardholder": {
          "amount": 2000,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 2000,
          "currency": "USD"
        }
      },
      "effective_polarity": "DEBIT",
      "detailed_results": ["APPROVED"]
    }
  ]
}
```

*To simulate the above example, call the [simulate authorization](https://docs.lithic.com/reference/postsimulateauthorize) endpoint with `status` of `AUTHORIZATION`, accept the ASA request, call the [simulate authorization advice](https://docs.lithic.com/reference/postsimulateauthorizationadvice) endpoint with a new amount and the transaction token generated from the authorization, then call the [simulate clearing transaction](https://docs.lithic.com/reference/postsimulateclearing) endpoint with the same transaction token.*

```json JSON (transaction webhook)
{
  "status": "VOIDED",
  "acquirer_fee": 0,
  "amounts": {
    "hold": {
      "amount": 0,
      "currency": "USD"
    },
    "merchant": {
      "amount": 0,
      "currency": "USD"
    },
    "cardholder": {
      "amount": 0,
      "currency": "USD",
      "conversion_rate": "1.000000"
    },
    "settlement": {
      "amount": 0,
      "currency": "USD"
    }
  },
  "events": [
    {
      "type": "AUTHORIZATION",
      "result": "APPROVED",
      "amounts": {
        "settlement": null,
        "cardholder": {
          "amount": 1000,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "DEBIT",
      "detailed_results": [
        "APPROVED"
      ]
    },
    {
      "type": "AUTHORIZATION_ADVICE",
      "result": "APPROVED",
      "amounts": {
        "settlement": null,
        "cardholder": {
          "amount": 2000,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 2000,
          "currency": "USD"
        }
      },
      "effective_polarity": "DEBIT",
      "detailed_results": [
        "APPROVED"
      ]
    },
    {
      "type": "AUTHORIZATION_REVERSAL",
      "result": "APPROVED",
      "amounts": {
        "settlement": null,
        "cardholder": {
          "amount": 2000,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 2000,
          "currency": "USD"
        }
      },
      "effective_polarity": "CREDIT",
      "detailed_results": [
        "APPROVED"
      ]
    }
  ],
  ...
}
```

*To simulate the above example, call the [simulate authorization](https://docs.lithic.com/reference/postsimulateauthorize) endpoint with `status` of `AUTHORIZATION`, accept the ASA request, call the [simulate authorization advice](https://docs.lithic.com/reference/postsimulateauthorizationadvice) endpoint with a new amount and the transaction token generated from the authorization, then call the [simulate void transaction](https://docs.lithic.com/reference/postsimulatevoid) endpoint with `type` of `AUTHORIZATION_REVERSAL` and the transaction token generated from the authorization.*

```json JSON (transaction webhook)
{
  "status": "EXPIRED",
  "acquirer_fee": 0,
  "amounts": {
    "hold": {
      "amount": 0,
      "currency": "USD"
    },
    "merchant": {
      "amount": 0,
      "currency": "USD"
    },
    "cardholder": {
      "amount": 0,
      "currency": "USD",
      "conversion_rate": "1.000000"
    },
    "settlement": {
      "amount": 0,
      "currency": "USD"
    }
  },
  "events": [
    {
      "type": "AUTHORIZATION",
      "result": "APPROVED",
      "amounts": {
        "settlement": null,
        "cardholder": {
          "amount": 1000,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "DEBIT",
      "detailed_results": [
        "APPROVED"
      ]
    },
    {
      "type": "AUTHORIZATION_ADVICE",
      "result": "APPROVED",
      "amounts": {
        "settlement": null,
        "cardholder": {
          "amount": 2000,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 2000,
          "currency": "USD"
        }
      },
      "effective_polarity": "DEBIT",
      "detailed_results": [
        "APPROVED"
      ]
    },
    {
      "type": "AUTHORIZATION_EXPIRY",
      "result": "APPROVED",
      "amounts": {
        "settlement": null,
        "cardholder": {
          "amount": 2000,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 2000,
          "currency": "USD"
        }
      },
      "effective_polarity": "CREDIT",
      "detailed_results": [
        "APPROVED"
      ]
    }
  ],
  ...
}
```

*To simulate the above example, call the [simulate authorization](https://docs.lithic.com/reference/postsimulateauthorize) endpoint with `status` of `AUTHORIZATION`, accept the ASA request, call the [simulate authorization advice](https://docs.lithic.com/reference/postsimulateauthorizationadvice) endpoint with a new amount and the transaction token generated from the authorization, then call the [simulate void transaction](https://docs.lithic.com/reference/postsimulatevoid) endpoint with `type` of `AUTHORIZATION_EXPIRY` and the transaction token generated from the authorization.*

Only a single clearing, authorization reversal, or authorization expiry is expected to follow an Authorization Advice.

An Authorization Advice can also occur when the networks “stand-in” to respond to an authorization request on behalf of Lithic and its customers. This can occur when Lithic does not respond to the authorization request in time, resulting in a time-out.

For most Lithic customers, the networks will stand-in to decline an authorization by emitting an Authorization Advice message with status of `DECLINED`.

*Example transaction webhook:*

```json JSON (transaction webhook)
{
  "status": "DECLINED",
  "acquirer_fee": 0,
  "amounts": {
    "hold": {
      "amount": 0,
      "currency": "USD"
    },
    "merchant": {
      "amount": 0,
      "currency": "USD"
    },
    "cardholder": {
      "amount": 0,
      "currency": "USD",
      "conversion_rate": "1.000000"
    },
    "settlement": {
      "amount": 0,
      "currency": "USD"
    }
  },
  "events": [
    {
      "type": "AUTHORIZATION",
      "result": "APPROVED",
      "amounts": {
        "settlement": null,
        "cardholder": {
          "amount": 1000,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "DEBIT",
      "detailed_results": [
        "APPROVED"
      ]
    },
    {
      "type": "AUTHORIZATION_ADVICE",
      "result": "DECLINED",
      "amounts": {
        "settlement": null,
        "cardholder": {
          "amount": 1000,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "DEBIT",
      "detailed_results": [
        "DECLINED"
      ]
    }
  ],
  ...
}
```

No further messages are expected from Lithic after an Authorization Advice decline.

Certain Enterprise customers can customize their stand-in behavior so that the networks approve rather than decline on their behalf. A customer who does this should be prepared for the following scenario:

* The customer responds to an ASA request with a decline
* Lithic times out and does not pass that response to the networks in time
* The networks then generate an authorization advice approval on the customer's behalf, based on pre-configured stand-in behavior

Please reach out to your Lithic Implementation or Customer Success Manager to understand if this applies to you.

*Example transaction webhook:*

```json JSON
{
  "status": "APPROVED",
  "acquirer_fee": 0,
  "amounts": {
    "hold": {
      "amount": -1000,
      "currency": "USD"
    },
    "merchant": {
      "amount": 0,
      "currency": "USD"
    },
    "cardholder": {
      "amount": 0,
      "currency": "USD",
      "conversion_rate": "1.000000"
    },
    "settlement": {
      "amount": 0,
      "currency": "USD"
    }
  },
  "events": [
    {
      "type": "AUTHORIZATION",
      "result": "UNKNOWN_HOST_TIMEOUT",
      "amounts": {
        "settlement": null,
        "cardholder": {
          "amount": 1000,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "amount": 1000,
      "effective_polarity": "DEBIT",
      "detailed_results": [
        "LITHIC_SYSTEM_ERROR"
      ]
    },
    {
      "type": "AUTHORIZATION_ADVICE",
      "result": "APPROVED",
      "amounts": {
        "settlement": null,
        "cardholder": {
          "amount": 1000,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "DEBIT",
      "detailed_results": [
        "APPROVED"
      ]
    }
  ],
  ...
}
```

### Multiple Completion

Once a transaction has been partially cleared, there can be any permutation of Clearing, Return, Authorization Reversal, and Authorization Expiry messages on this same transaction.

*Example transaction webhook:*

```json JSON (transaction webhook)
{
  "status": "SETTLED",
  "acquirer_fee": 0,
  "amounts": {
    "hold": {
      "amount": 0,
      "currency": "USD"
    },
    "merchant": {
      "amount": -900,
      "currency": "USD"
    },
    "cardholder": {
      "amount": -900,
      "currency": "USD",
      "conversion_rate": "1.000000"
    },
    "settlement": {
      "amount": -900,
      "currency": "USD"
    }
  },
  "events": [
    {
      "type": "AUTHORIZATION",
      "result": "APPROVED",
      "amounts": {
        "settlement": null,
        "cardholder": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "DEBIT",
      "detailed_results": [
        "APPROVED"
      ]
    },
    {
      "type": "CLEARING",
      "result": "APPROVED",
      "amounts": {
        "settlement": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "cardholder": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 800,
          "currency": "USD"
        }
      },
      "effective_polarity": "DEBIT",
      "detailed_results": [
        "APPROVED"
      ]
    },
    {
      "type": "AUTHORIZATION_REVERSAL",
      "result": "APPROVED",
      "amounts": {
        "settlement": null,
        "cardholder": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 100,
          "currency": "USD"
        }
      },
      "effective_polarity": "CREDIT",
      "detailed_results": [
        "APPROVED"
      ]
    },
    {
      "type": "CLEARING",
      "result": "APPROVED",
      "amounts": {
        "settlement": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "cardholder": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 100,
          "currency": "USD"
        }
      },
      "effective_polarity": "DEBIT",
      "detailed_results": [
        "APPROVED"
      ]
    }
  ],
  ...
}
```

In the above example, an initial $10 authorization is accepted. Of that $10, $8 is cleared, $1 is reversed, and another $1 is cleared, leading to a final settled amount of $9.

If a transaction's pending amount exceeds its settled amount in magnitude (i.e., `|amounts.hold.amount|` > `|amounts.settlement.amount|`) when its authorization validity window passes, Lithic will initiate an Authorization Expiry message to release the remaining authorized amount. A typical authorization validity window is 7 days from the initial authorization but can be longer for certain types of transactions (e.g., auto rentals, hotel reservations). Sometimes, the merchant may explicitly signal to Lithic that it will not send any further clearings on that transaction, so Lithic will expire the remaining authorization amount that same day.

*Example transaction webhook:*

```json JSON (transaction webhook)
{
  "status": "SETTLED",
  "acquirer_fee": 0,
  "amounts": {
    "hold": {
      "amount": 0,
      "currency": "USD"
    },
    "merchant": {
      "amount": -800,
      "currency": "USD"
    },
    "cardholder": {
      "amount": -800,
      "currency": "USD",
      "conversion_rate": "1.000000"
    },
    "settlement": {
      "amount": -800,
      "currency": "USD"
    }
  },
  "events": [
    {
      "type": "AUTHORIZATION",
      "result": "APPROVED",
      "amounts": {
        "settlement": null,
        "cardholder": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "DEBIT",
      "detailed_results": [
        "APPROVED"
      ]
    },
    {
      "type": "CLEARING",
      "result": "APPROVED",
      "amounts": {
        "settlement": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "cardholder": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 700,
          "currency": "USD"
        }
      },
      "effective_polarity": "DEBIT",
      "detailed_results": [
        "APPROVED"
      ]
    },
    {
      "type": "CLEARING",
      "result": "APPROVED",
      "amounts": {
        "settlement": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "cardholder": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 100,
          "currency": "USD"
        }
      },
      "effective_polarity": "DEBIT",
      "detailed_results": [
        "APPROVED"
      ]
    },
    {
      "type": "AUTHORIZATION_EXPIRY",
      "result": "APPROVED",
      "amounts": {
        "settlement": null,
        "cardholder": {
          "amount": 200,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 200,
          "currency": "USD"
        }
      },
      "effective_polarity": "CREDIT",
      "detailed_results": [
        "APPROVED"
      ]
    }
  ],
  ...
}
```

In the above example, an initial $10 authorization is approved. $7 is cleared, another $1 is cleared, and the remaining $2 is expired. The final settled amount is $8. The $2 that expired returns to the cardholder's spendable balance.

Once a transaction has been partially or fully cleared, a financial reversal – a return on a purchase, or a return reversal on a return – may occur in the same transaction or in a new standalone transaction. For instance, if the above transaction is refunded, the user might observe a subsequent standalone transaction like so:

```json JSON (transaction webhook)
{
  "status": "SETTLED",
  "acquirer_fee": 0,
  "amounts": {
    "hold": {
      "amount": 0,
      "currency": "USD"
    },
    "merchant": {
      "amount": 800,
      "currency": "USD"
    },
    "cardholder": {
      "amount": 800,
      "currency": "USD",
      "conversion_rate": "1.000000"
    },
    "settlement": {
      "amount": 800,
      "currency": "USD"
    }
  },
  "events": [
    {
      "type": "RETURN",
      "result": "APPROVED",
      "amounts": {
        "settlement": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "cardholder": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 800,
          "currency": "USD"
        }
      },
      "effective_polarity": "CREDIT",
      "detailed_results": [
        "APPROVED"
      ]
    }
  ],
  ...
}
```

For transactions in foreign currencies, it is possible that a full return in the local currency results in a Return amount that differs from the Clearing amount in the settlement currency. For example:

* A transaction in France clears for €10 in the local currency, Euro. The foreign exchange rate of Euro to USD is 0.80. This results in a Clearing message for $8 in the settlement currency, USD.
* A week later, the transaction is refunded for the full €10 in the local currency, Euro. However, the foreign exchange rate from Euro to USD has since changed to 1.
* This results in a Return message for $10 in the settlement currency of USD. The Return message materializes in a new transaction.
* Accounting for both transactions, the cardholder receives a net credit of $2 due to the fluctuation of the foreign exchange rate.

*Example transaction webhooks:*

```json json
{
  "status": "SETTLED",
  "acquirer_fee": 0,
  "amounts": {
    "hold": {
      "amount": 0,
      "currency": "USD"
    },
    "merchant": {
      "amount": -1000,
      "currency": "EUR"
    },
    "cardholder": {
      "amount": -800,
      "currency": "USD",
      "conversion_rate": "0.800000"
    },
    "settlement": {
      "amount": -800,
      "currency": "USD"
    }
  },
  "events": [
    {
      "type": "AUTHORIZATION",
      "result": "APPROVED",
      "amounts": {
        "settlement": null,
        "cardholder": {
          "amount": 800,
          "currency": "USD",
          "conversion_rate": "0.800000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "EUR"
        }
      },
      "effective_polarity": "DEBIT",
      "detailed_results": [
        "APPROVED"
      ]
    },
    {
      "type": "CLEARING",
      "result": "APPROVED",
      "amounts": {
        "settlement": {
          "amount": 800,
          "currency": "USD",
          "conversion_rate": "0.800000"
        },
        "cardholder": {
          "amount": 800,
          "currency": "USD",
          "conversion_rate": "0.800000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "EUR"
        }
      },
      "effective_polarity": "DEBIT",
      "detailed_results": [
        "APPROVED"
      ]
    }
  ],
  ...
}
```

```json json
{
  "status": "SETTLED",
  "acquirer_fee": 0,
  "amounts": {
    "hold": {
      "amount": 0,
      "currency": "USD"
    },
    "merchant": {
      "amount": 1000,
      "currency": "EUR"
    },
    "cardholder": {
      "amount": 1000,
      "currency": "USD",
      "conversion_rate": "1.000000"
    },
    "settlement": {
      "amount": 1000,
      "currency": "USD"
    }
  },
  "events": [
    {
      "type": "RETURN",
      "result": "APPROVED",
      "amounts": {
        "settlement": {
          "amount": 1000,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "cardholder": {
          "amount": 1000,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "EUR"
        }
      },
      "effective_polarity": "CREDIT",
      "detailed_results": [
        "APPROVED"
      ]
    }
  ],
  ...
}
```

## 2: Financial Authorization

Financial Authorization requests are single-event transactions with no subsequent clearings. These are considered “single message system” (SMS) requests, wherein authorization and clearing are combined into a single message. Approving an SMS transaction triggers immediate financial impact, but the merchant can still reverse the transaction and its financial impact.

*Example ASA request:*

```json JSON (ASA request)
{
  "status": "FINANCIAL_AUTHORIZATION",
  "amount": 1000,
  "acquirer_fee": 0,
  "authorization_amount": 1000,
  "settled_amount": 0,
  "events": []
}
```

*To simulate the above example, call the [simulate authorization](https://docs.lithic.com/reference/postsimulateauthorize) endpoint with `status` of `FINANCIAL_AUTHORIZATION`.*

In the above example, the cardholder has initiated a $10 SMS transaction. The events array will always be empty for ASA requests.

If the user responds to a Financial Authorization with a decline, a message will be sent to the transaction webhook endpoint with the following information.

*Example transaction webhook:*

```json JSON (transaction webhook)
{
  "status": "DECLINED",
  "acquirer_fee": 0,
  "amounts": {
    "hold": {
      "amount": 0,
      "currency": "USD"
    },
    "merchant": {
      "amount": 0,
      "currency": "USD"
    },
    "cardholder": {
      "amount": 0,
      "currency": "USD",
      "conversion_rate": "1.000000"
    },
    "settlement": {
      "amount": 0,
      "currency": "USD"
    }
  },
  "events": [
    {
      "type": "FINANCIAL_AUTHORIZATION",
      "result": "DECLINED",
      "amounts": {
        "settlement": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "cardholder": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "DEBIT",
      "detailed_results": [
        "DECLINED"
      ]
    }
  ],
  ...
}
```

*To simulate the above example, call the [simulate authorization](https://docs.lithic.com/reference/postsimulateauthorize) endpoint with `status` of `FINANCIAL_AUTHORIZATION`, then decline the ASA request.*

The `result` field will contain the decline reason returned by the user in response to the ASA request (e.g., `UNAUTHORIZED_MERCHANT`). No further messages are expected from Lithic after a decline.

If instead the user approves the ASA request, a confirmation will be sent to the transaction webhook endpoint.

*Example transaction webhook:*

```json JSON (transaction webhook)
{
  "status": "SETTLED",
  "acquirer_fee": 0,
  "amounts": {
    "hold": {
      "amount": 0,
      "currency": "USD"
    },
    "merchant": {
      "amount": -1000,
      "currency": "USD"
    },
    "cardholder": {
      "amount": -1000,
      "currency": "USD",
      "conversion_rate": "1.000000"
    },
    "settlement": {
      "amount": -1000,
      "currency": "USD"
    }
  },
  "events": [
    {
      "type": "FINANCIAL_AUTHORIZATION",
      "result": "APPROVED",
      "amounts": {
        "settlement": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "cardholder": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "DEBIT",
      "detailed_results": [
        "APPROVED"
      ]
    }
  ],
  ...
}
```

*To simulate the above example, call the [simulate authorization](https://docs.lithic.com/reference/postsimulateauthorize) endpoint with `status` of `FINANCIAL_AUTHORIZATION`, then accept the ASA request.*

At this point, the transaction is considered settled and no further Clearing messages are expected on this transaction.

A Financial Authorization can be returned. Such returns can either be associated with the original transaction (and appear as a new event under the original authorization) or materialize in a new transaction. An example of the former can be found below.

*Example transaction webhook:*

```json JSON (transaction webhook)
{
  "status": "VOIDED",
  "acquirer_fee": 0,
  "amounts": {
    "hold": {
      "amount": 0,
      "currency": "USD"
    },
    "merchant": {
      "amount": 0,
      "currency": "USD"
    },
    "cardholder": {
      "amount": 0,
      "currency": "USD",
      "conversion_rate": "1.000000"
    },
    "settlement": {
      "amount": 0,
      "currency": "USD"
    }
  },
  "events": [
    {
      "type": "FINANCIAL_AUTHORIZATION",
      "result": "APPROVED",
      "amounts": {
        "settlement": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "cardholder": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "DEBIT",
      "detailed_results": [
        "APPROVED"
      ]
    },
    {
      "type": "RETURN",
      "result": "APPROVED",
      "amounts": {
        "settlement": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "cardholder": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "CREDIT",
      "detailed_results": [
        "APPROVED"
      ]
    }
  ],
  ...
}
```

*Simulating a linked return on a cleared transaction in Sandbox is not currently supported.*

No additional messages are expected from Lithic after a Financial Authorization has been returned.

As with Authorizations, the network can “stand-in” to respond on behalf of Lithic and its customers. This can occur when Lithic does not respond to a financial authorization request in time, resulting in a time-out.

For most Lithic customers, the networks will stand-in to decline a financial authorization by emitting a Clearing message with status of `DECLINED`.

*Example transaction webhook:*

```json JSON (transaction webhook)
{
  "status": "DECLINED",
  "acquirer_fee": 0,
  "amounts": {
    "hold": {
      "amount": 0,
      "currency": "USD"
    },
    "merchant": {
      "amount": 0,
      "currency": "USD"
    },
    "cardholder": {
      "amount": 0,
      "currency": "USD",
      "conversion_rate": "1.000000"
    },
    "settlement": {
      "amount": 0,
      "currency": "USD"
    }
  },
  "events": [
    {
      "type": "FINANCIAL_AUTHORIZATION",
      "result": "APPROVED",
      "amounts": {
        "settlement": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "cardholder": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "DEBIT",
      "detailed_results": [
        "APPROVED"
      ]
    },
    {
      "type": "CLEARING",
      "result": "DECLINED",
      "amounts": {
        "settlement": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "cardholder": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "DEBIT",
      "detailed_results": [
        "DECLINED"
      ]
    }
  ],
  ...
}
```

No further messages are expected from Lithic after this clearing.

## 3: Balance Inquiry

A Balance Inquiry is a $0 authorization that includes a request for the balance held on the card. The most common situation where a Balance Inquiry is sent is when a user requests the card’s balance at an ATM.

*Example ASA request:*

```json JSON (ASA request)
{
  "status": "BALANCE_INQUIRY",
  "amount": 0,
  "acquirer_fee": 0,
  "authorization_amount": 0,
  "settled_amount": 0,
  "events": []
}
```

*To simulate the above example, call the [simulate authorization](https://docs.lithic.com/reference/postsimulateauthorize) endpoint with `status` of `BALANCE_INQUIRY`.*

The user should respond to the balance inquiry with either an approval or a decline. Balance Inquiries should generally be approved unless the user has a reason for not disclosing the balance. The user should either respond to the ASA request using result `APPROVED` and include relevant information in the `balance` fields, or decline with the appropriate reason.

When a Balance Inquiry is declined, the user can expect a message at the transaction webhook endpoint.

*Example transaction webhook:*

```json JSON (transaction webhook)
{
  "status": "DECLINED",
  "acquirer_fee": 0,
  "amounts": {
    "hold": {
      "amount": 0,
      "currency": "USD"
    },
    "merchant": {
      "amount": 0,
      "currency": "USD"
    },
    "cardholder": {
      "amount": 0,
      "currency": "USD",
      "conversion_rate": "1.000000"
    },
    "settlement": {
      "amount": 0,
      "currency": "USD"
    }
  },
  "events": [
    {
      "type": "BALANCE_INQUIRY",
      "result": "UNAUTHORIZED_MERCHANT",
      "amounts": {
        "settlement": null,
        "cardholder": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 0,
          "currency": "USD"
        }
      },
      "effective_polarity": "DEBIT",
      "detailed_results": [
        "MERCHANT_LOCKED_CARD_ATTEMPTED_ELSEWHERE"
      ]
    }
  ],
  ...
}
```

*To simulate the above example, call the [simulate authorization](https://docs.lithic.com/reference/postsimulateauthorize) endpoint with `status` of `BALANCE_INQUIRY`, then decline the ASA request.*

The `result` field will contain the decline reason returned by the user in response to the ASA request (e.g., `UNAUTHORIZED_MERCHANT`).

When a Balance Inquiry is approved, the user will receive a message at the transaction webhook endpoint confirming the approval.

*Example transaction webhook:*

```json JSON (transaction webhook)
{
  "status": "SETTLED",
  "acquirer_fee": 0,
  "amounts": {
    "hold": {
      "amount": 0,
      "currency": "USD"
    },
    "merchant": {
      "amount": 0,
      "currency": "USD"
    },
    "cardholder": {
      "amount": 0,
      "currency": "USD",
      "conversion_rate": "1.000000"
    },
    "settlement": {
      "amount": 0,
      "currency": "USD"
    }
  },
  "events": [
    {
      "type": "BALANCE_INQUIRY",
      "result": "APPROVED",
      "amounts": {
        "settlement": null,
        "cardholder": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 0,
          "currency": "USD"
        }
      },
      "effective_polarity": "DEBIT",
      "detailed_results": [
        "APPROVED"
      ]
    }
  ],
  ...
}
```

*To simulate the above example, call the [simulate authorization](https://docs.lithic.com/reference/postsimulateauthorize) endpoint with `status` of `BALANCE_INQUIRY`, then accept the ASA request.*

Regardless of approval or decline, no further messages are expected from Lithic related to the transaction.

## 4: Credit Authorization

> ⚠️ Note
>
> For Program Managed customers, Lithic will approve or decline credit authorizations in accordance with network guidance. These authorization requests will not be sent via ASA and the customer will be informed of the decision via transaction webhooks. Gateway processing customers may be eligible to decision on credit authorizations via ASA- please contact your Customer Success Manager to learn more.

Certain credits and refunds occur in dual message form, meaning that the merchant sends a credit authorization request, followed by another message to settle credited funds. Only eligible Processor Gateway customers will receive these messages via ASA. Lithic's default behavior for all other customers is to approve network mandated credit authorizations on their behalf and notify them via transaction webhook that the credit was authorized.

When credit authorizations that do not route through ASA are processed using Lithic's default decisioning, Lithic follows the networks' guidance in approving credit authorizations as long as the program and account are active. Lithic does not check card state when accepting credit authorizations by default.

*Example ASA request (eligible programs only):*

```json JSON (ASA request)
{
  "status": "CREDIT_AUTHORIZATION",
  "amount": -1000,
  "acquirer_fee": 0,
  "authorization_amount": -1000,
  "settled_amount": 0,
  "events": []
}
```

*To simulate the above example, call the [simulate authorization](https://docs.lithic.com/reference/postsimulateauthorize) endpoint with `status` of `CREDIT_AUTHORIZATION`.*

The user should respond to the Credit Authorization with either an approval using result `APPROVED` or a decline code. Credit Authorizations should not be declined except in the case of a closed account or suspected return fraud.

If a decline occurs, the user will receive a message at the transaction webhook endpoint confirming the decline.

*Example transaction webhook:*

```json JSON (transaction webhook)
{
  "status": "DECLINED",
  "acquirer_fee": 0,
  "amounts": {
    "hold": {
      "amount": 0,
      "currency": "USD"
    },
    "merchant": {
      "amount": 0,
      "currency": "USD"
    },
    "cardholder": {
      "amount": 0,
      "currency": "USD",
      "conversion_rate": "1.000000"
    },
    "settlement": {
      "amount": 0,
      "currency": "USD"
    }
  },
  "events": [
    {
      "type": "CREDIT_AUTHORIZATION",
      "result": "CARD_CLOSED",
      "amounts": {
        "settlement": null,
        "cardholder": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "CREDIT",
      "detailed_results": [
        "CARD_CLOSED"
      ]
    }
  ],
  ...
}
```

*To simulate the above example, call the [simulate authorization](https://docs.lithic.com/reference/postsimulateauthorize) endpoint with `status` of `CREDIT_AUTHORIZATION`, then decline the ASA request.*

No further messages are expected from Lithic after a declined Credit Authorization.

If the transaction is approved, the user will receive a message at the transaction webhook endpoint confirming the approval.

*Example transaction webhook:*

```json JSON (transaction webhook)
{
  "status": "PENDING",
  "acquirer_fee": 0,
  "amounts": {
    "hold": {
      "amount": 1000,
      "currency": "USD"
    },
    "merchant": {
      "amount": 0,
      "currency": "USD"
    },
    "cardholder": {
      "amount": 0,
      "currency": "USD",
      "conversion_rate": "1.000000"
    },
    "settlement": {
      "amount": 0,
      "currency": "USD"
    }
  },
  "events": [
    {
      "type": "CREDIT_AUTHORIZATION",
      "result": "APPROVED",
      "amounts": {
        "settlement": null,
        "cardholder": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "CREDIT",
      "detailed_results": [
        "APPROVED"
      ]
    }
  ],
  ...
}
```

*To simulate the above example, call the [simulate authorization](https://docs.lithic.com/reference/postsimulateauthorize) endpoint with `status` of `CREDIT_AUTHORIZATION`, then accept the ASA request.*

After a Credit Authorization approval, the user can expect another event to either settle, reverse, or expire the credit. In the case of a reversed credit, the following message will be received at the transaction webhook endpoint.

*Example transaction webhook:*

```json JSON (transaction webhook)
{
  "status": "VOIDED",
  "acquirer_fee": 0,
  "amounts": {
    "hold": {
      "amount": 0,
      "currency": "USD"
    },
    "merchant": {
      "amount": 0,
      "currency": "USD"
    },
    "cardholder": {
      "amount": 0,
      "currency": "USD",
      "conversion_rate": "1.000000"
    },
    "settlement": {
      "amount": 0,
      "currency": "USD"
    }
  },
  "events": [
    {
      "type": "CREDIT_AUTHORIZATION",
      "result": "APPROVED",
      "amounts": {
        "settlement": null,
        "cardholder": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "CREDIT",
      "detailed_results": [
        "APPROVED"
      ]
    },
    {
      "type": "AUTHORIZATION_REVERSAL",
      "result": "APPROVED",
      "amounts": {
        "settlement": null,
        "cardholder": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "DEBIT",
      "detailed_results": [
        "APPROVED"
      ]
    }
  ],
  ...
}
```

*To simulate the above example, call the [simulate authorization](https://docs.lithic.com/reference/postsimulateauthorize) endpoint with `status` of `CREDIT_AUTHORIZATION`, accept the ASA request, then call the [simulate void transaction](https://docs.lithic.com/reference/postsimulatevoid) endpoint with `type` of `AUTHORIZATION_REVERSAL` and the transaction token generated from the authorization.*

No further messages are expected from Lithic after a credit authorization reversal.

If instead the credit is settled, the user will receive a Return event at the transaction webhook endpoint.

*Example transaction webhook:*

```json JSON (transaction webhook)
{
  "status": "SETTLED",
  "acquirer_fee": 0,
  "amounts": {
    "hold": {
      "amount": 0,
      "currency": "USD"
    },
    "merchant": {
      "amount": 1000,
      "currency": "USD"
    },
    "cardholder": {
      "amount": 1000,
      "currency": "USD",
      "conversion_rate": "1.000000"
    },
    "settlement": {
      "amount": 1000,
      "currency": "USD"
    }
  },
  "events": [
    {
      "type": "CREDIT_AUTHORIZATION",
      "result": "APPROVED",
      "amounts": {
        "settlement": null,
        "cardholder": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "CREDIT",
      "detailed_results": [
        "APPROVED"
      ]
    },
    {
      "type": "RETURN",
      "result": "APPROVED",
      "amounts": {
        "settlement": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "cardholder": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "CREDIT",
      "detailed_results": [
        "APPROVED"
      ]
    }
  ],
  ...
}
```

*To simulate the above example, call the [simulate authorization](https://docs.lithic.com/reference/postsimulateauthorize) endpoint with `status` of `CREDIT_AUTHORIZATION`, accept the ASA request, then call the [simulate clearing transaction](https://docs.lithic.com/reference/postsimulateclearing) endpoint with the transaction token generated from the authorization.*

If the credit authorization was not settled in time, the Lithic platform will expire the authorization to indicate that the credit was not completed and the credits should not be pushed to the cardholder.

*Example transaction webhook:*

```json JSON (transaction webhook)
{
  "status": "EXPIRED",
  "acquirer_fee": 0,
  "amounts": {
    "hold": {
      "amount": 0,
      "currency": "USD"
    },
    "merchant": {
      "amount": 0,
      "currency": "USD"
    },
    "cardholder": {
      "amount": 0,
      "currency": "USD",
      "conversion_rate": "1.000000"
    },
    "settlement": {
      "amount": 0,
      "currency": "USD"
    }
  },
  "events": [
    {
      "type": "CREDIT_AUTHORIZATION",
      "result": "APPROVED",
      "amounts": {
        "settlement": null,
        "cardholder": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "CREDIT",
      "detailed_results": [
        "APPROVED"
      ]
    },
    {
      "type": "AUTHORIZATION_EXPIRY",
      "result": "APPROVED",
      "amounts": {
        "settlement": null,
        "cardholder": {
          "amount": 1000,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "DEBIT",
      "detailed_results": [
        "APPROVED"
      ]
    }
  ],
  ...
}
```

*To simulate the above example, call the [simulate authorization](https://docs.lithic.com/reference/postsimulateauthorize) endpoint with `status` of `CREDIT_AUTHORIZATION`, accept the ASA request, then call the [simulate void transaction](https://docs.lithic.com/reference/postsimulatevoid) endpoint with type of `AUTHORIZATION_EXPIRY` and the transaction token generated from the authorization.*

Credits can also be reversed once settled.

*Example transaction webhook:*

```json JSON (transaction webhook)
{
  "status": "VOIDED",
  "acquirer_fee": 0,
  "amounts": {
    "hold": {
      "amount": 0,
      "currency": "USD"
    },
    "merchant": {
      "amount": 0,
      "currency": "USD"
    },
    "cardholder": {
      "amount": 0,
      "currency": "USD",
      "conversion_rate": "1.000000"
    },
    "settlement": {
      "amount": 0,
      "currency": "USD"
    }
  },
  "events": [
    {
      "type": "CREDIT_AUTHORIZATION",
      "result": "APPROVED",
      "amounts": {
        "settlement": null,
        "cardholder": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "CREDIT",
      "detailed_results": [
        "APPROVED"
      ]
    },
    {
      "type": "RETURN",
      "result": "APPROVED",
      "amounts": {
        "settlement": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "cardholder": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "CREDIT",
      "detailed_results": [
        "APPROVED"
      ]
    },
    {
      "type": "RETURN_REVERSAL",
      "result": "APPROVED",
      "amounts": {
        "settlement": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "cardholder": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "DEBIT",
      "detailed_results": [
        "APPROVED"
      ]
    }
  ],
  ...
}
```

*To simulate the above example, call the [simulate authorization](https://docs.lithic.com/reference/postsimulateauthorize) endpoint with `status` of `CREDIT_AUTHORIZATION`, and accept the ASA request. Then call the [simulate clearing transaction](https://docs.lithic.com/reference/postsimulateclearing) endpoint with the transaction token generated from the authorization. Finally, call the [simulate return reversal](https://docs.lithic.com/reference/postsimulatereturnreversal) endpoint with the same transaction token.*

No further messages are expected from Lithic after the reversal.

It is possible for a decline to occur based on an upstream switch during initial authorization (e.g., Lithic receives the user's ASA response, but there is a timeout between Lithic and the network). In that case, a Credit Authorization Advice message is sent with status `DECLINED`.

```json JSON (transaction webhook)
{
  "status": "DECLINED",
  "acquirer_fee": 0,
  "amounts": {
    "hold": {
      "amount": 0,
      "currency": "USD"
    },
    "merchant": {
      "amount": 0,
      "currency": "USD"
    },
    "cardholder": {
      "amount": 0,
      "currency": "USD",
      "conversion_rate": "1.000000"
    },
    "settlement": {
      "amount": 0,
      "currency": "USD"
    }
  },
  "events": [
    {
      "type": "CREDIT_AUTHORIZATION",
      "result": "APPROVED",
      "amounts": {
        "settlement": null,
        "cardholder": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "CREDIT",
      "detailed_results": [
        "APPROVED"
      ]
    },
    {
      "type": "CREDIT_AUTHORIZATION_ADVICE",
      "result": "DECLINED",
      "amounts": {
        "settlement": null,
        "cardholder": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "CREDIT",
      "detailed_results": [
      	"DECLINED
      ]
    }
  ],
  ...
}
```

No further messages are expected from Lithic after a Credit Authorization Advice decline.

## 5: Financial Credit Authorization

> ⚠️ Note
>
> For Program Managed customers, Lithic will approve or decline credit authorizations in accordance with network guidance. These authorization requests will not be sent via ASA and the customer will be informed of the decision via transaction webhooks. Processor Gateway customers may be eligible to decision on credit authorizations via ASA- please contact your Customer Success Manager to learn more.

Financial Credit Authorization requests are similar to Credit Authorizations, but are single message credits with no subsequent clearing.

Only eligible Processor Gateway customers will receive these messages via ASA. Lithic's default behavior for all other customers is to approve network mandated financial credit authorizations on their behalf and notify them via transaction webhook that the credit was authorized.

When financial credit authorizations that do not route through ASA are processed using Lithic's default decisioning, Lithic follows the networks' guidance in approving financial credit authorizations as long as the program and account are active. Lithic does not check card state when accepting credit authorizations by default.

*Example ASA request:*

```json JSON (ASA request)
{
  "status": "FINANCIAL_CREDIT_AUTHORIZATION",
  "amount": -1000,
  "acquirer_fee": 0,
  "authorization_amount": -1000,
  "settled_amount": 0,
  "events": []
}
```

*To simulate the above example, call the [simulate authorization](https://docs.lithic.com/reference/postsimulateauthorize) endpoint with `status` of `FINANCIAL_CREDIT_AUTHORIZATION`.*

The user should respond to the request with either an approval using result `APPROVED` or a decline code. Similar to Credit Authorizations, Financial Credit Authorizations should not be declined except in the case of a closed account or suspected return fraud.

After a decline, the user will receive a message at the transaction webhook endpoint confirming the decline.

*Example transaction webhook:*

```json JSON (transaction webhook)
{
  "status": "DECLINED",
  "amount": -1000,
  "acquirer_fee": 0,
  "authorization_amount": -1000,
  "settled_amount": 0,
  "events": [
    {
      "amount": -1000,
      "type": "FINANCIAL_CREDIT_AUTHORIZATION",
      "result": "CARD_CLOSED"
    }
  ]
}
```

*To simulate the above example, call the [simulate authorization](https://docs.lithic.com/reference/postsimulateauthorize) endpoint with `status` of `FINANCIAL_CREDIT_AUTHORIZATION`, and decline the ASA request.*

No further messages are expected after a declined Financial Credit Authorization.

If the transaction is approved, the user will receive a message at the transaction webhook endpoint confirming the approval.

*Example transaction webhook:*

```json JSON (transaction webhook)
{
  "status": "SETTLED",
  "acquirer_fee": 0,
  "amounts": {
    "hold": {
      "amount": 0,
      "currency": "USD"
    },
    "merchant": {
      "amount": 1000,
      "currency": "USD"
    },
    "cardholder": {
      "amount": 1000,
      "currency": "USD",
      "conversion_rate": "1.000000"
    },
    "settlement": {
      "amount": 1000,
      "currency": "USD"
    }
  },
  "events": [
    {
      "type": "FINANCIAL_CREDIT_AUTHORIZATION",
      "result": "APPROVED",
      "amounts": {
        "settlement": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "cardholder": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "CREDIT",
      "detailed_results": [
        "APPROVED"
      ]
    }
  ],
  ...
}
```

*To simulate the above example, call the [simulate authorization](https://docs.lithic.com/reference/postsimulateauthorize) endpoint with `status` of `FINANCIAL_CREDIT_AUTHORIZATION`, and accept the ASA request.*

Similar to other credits, financial credits can be reversed.

*Example transaction webhook:*

```json JSON (transaction webhook)
{
  "status": "VOIDED",
  "acquirer_fee": 0,
  "amounts": {
    "hold": {
      "amount": 0,
      "currency": "USD"
    },
    "merchant": {
      "amount": 0,
      "currency": "USD"
    },
    "cardholder": {
      "amount": 0,
      "currency": "USD",
      "conversion_rate": "1.000000"
    },
    "settlement": {
      "amount": 0,
      "currency": "USD"
    }
  },
  "events": [
    {
      "type": "FINANCIAL_CREDIT_AUTHORIZATION",
      "result": "APPROVED",
      "amounts": {
        "settlement": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "cardholder": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "CREDIT",
      "detailed_results": [
        "APPROVED"
      ]
    },
    {
      "type": "RETURN_REVERSAL",
      "result": "APPROVED",
      "amounts": {
        "settlement": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "cardholder": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "DEBIT",
      "detailed_results": [
        "APPROVED"
      ]
    }
  ],
  ...
}
```

*To simulate the above example, call the [simulate authorization](https://docs.lithic.com/reference/postsimulateauthorize) endpoint with `status` of `FINANCIAL_CREDIT_AUTHORIZATION`, and accept the ASA request. Then call the [simulate return reversal](https://docs.lithic.com/reference/postsimulatereturnreversal) endpoint with the same transaction token.*

No further messages are expected from Lithic after the reversal.

# Message Types Originating with a Transaction Webhook

If a transaction webhook arrives standalone at the user's endpoint (i.e., with no prior authorization or existing transaction token), it will be one of three types as designated by the `events[*].type` field in the webhook body:

## 6: Authorization

If the user receives an Authorization message at the transaction webhook endpoint without a prior ASA request, this signifies that there was a decline due to a check performed by Lithic before the ASA request was sent. Example reasons for these declines include:

* Transaction attempted on a paused card
* Card spend limit exceeded
* Authorization rule triggered

*Example transaction webhook:*

```json JSON (transaction webhook)
{
  "status": "DECLINED",
  "acquirer_fee": 0,
  "amounts": {
    "hold": {
      "amount": 0,
      "currency": "USD"
    },
    "merchant": {
      "amount": 0,
      "currency": "USD"
    },
    "cardholder": {
      "amount": 0,
      "currency": "USD",
      "conversion_rate": "1.000000"
    },
    "settlement": {
      "amount": 0,
      "currency": "USD"
    }
  },
  "events": [
    {
      "type": "AUTHORIZATION",
	 		"result": "CARD_PAUSED",
      "amounts": {
        "settlement": null,
        "cardholder": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "DEBIT",
      "detailed_results": [
        "CARD_PAUSED"
      ]
    }
  ],
  ...
}
```

*Simulating a pre-declined authorization in Sandbox is not yet available.*

Declines due to Lithic’s checks can be treated the same as declines of the ASA request by the user. No further messages related to the transaction are expected. Authorization messages signifying approvals should never be received without a prior ASA request.

## 7: Clearing

When a Clearing message occurs but there is no previously authorized transaction, funds will immediately be designated as settled. This is known as a “Force Post.”

*Example transaction webhook:*

```json JSON (transaction webhook)
{
  "status": "SETTLED",
  "acquirer_fee": 0,
  "amounts": {
    "hold": {
      "amount": 0,
      "currency": "USD"
    },
    "merchant": {
      "amount": -1000,
      "currency": "USD"
    },
    "cardholder": {
      "amount": -1000,
      "currency": "USD",
      "conversion_rate": "1.000000"
    },
    "settlement": {
      "amount": -1000,
      "currency": "USD"
    }
  },
  "events": [
    {
      "type": "CLEARING",
      "result": "APPROVED",
      "amounts": {
        "settlement": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "cardholder": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "DEBIT",
      "detailed_results": [
        "APPROVED"
      ]
    }
  ],
  ...
}
```

*Simulating an unlinked clearing (aka force post) in Sandbox is not currently supported.*

Force Posts pose some risk to card programs in that they allow a transaction to potentially settle for an amount above the cardholder's balance, without affording the user an opportunity to decline. Force Posts can be indicative of bad merchant behavior and, when the user’s balance is exceeded, may be subject to chargeback. No further messages are expected from Lithic after a Force Post.

## 8: Return

When a return is initiated on a settled transaction, the return oftentimes cannot be mapped to the original transaction. For this reason, many returns will appear in a standalone transaction. It is possible to build a system to match these returns to the original transaction using a combination of transaction amount and merchant information, but such systems can be unreliable and risk over-crediting the user.

*Example transaction webhook:*

```json JSON (transaction webhook)
{
  "status": "SETTLED",
  "acquirer_fee": 0,
  "amounts": {
    "hold": {
      "amount": 0,
      "currency": "USD"
    },
    "merchant": {
      "amount": 1000,
      "currency": "USD"
    },
    "cardholder": {
      "amount": 1000,
      "currency": "USD",
      "conversion_rate": "1.000000"
    },
    "settlement": {
      "amount": 1000,
      "currency": "USD"
    }
  },
  "events": [
    {
      "type": "RETURN",
      "result": "APPROVED",
      "amounts": {
        "settlement": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "cardholder": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "CREDIT",
      "detailed_results": [
        "APPROVED"
      ]
    }
  ],
  ...
}
```

*To simulate the above example, call the [simulate return](https://docs.lithic.com/reference/postsimulatereturn) endpoint.*

In some cases, Lithic may mark a return transaction with a status of `DECLINED `and result of `ORIGINAL_NOT_FOUND`. This typically results from a prior financial authorization being missed, so you should ignore the return event to avoid over-crediting the cardholder.

## 9: Authorization Advice

Typically, transactions begin with an `AUTHORIZATION` event, and subsequent `AUTHORIZATION_ADVICE` events modify the original authorization amount (e.g., fuel station authorizes for $1, then sends an authorization advice for the final amount of gas pumped). However, it is possible for transactions to begin with an `AUTHORIZATION_ADVICE` event. For these transactions, users can expect the same subsequent events that they would for transactions beginning with `AUTHORIZATION` followed by `AUTHORIZATION_ADVICE` (see [this section](https://docs.lithic.com/docs/transaction-flow#authorization--authorization-advice) of this page for more). Two known cases where this can occur are:

* Card is used at an offline point-of-sale system (e.g., buying food on a plane where the POS is not running online authorizations), and the transaction is sent through as authorization advice
* Merchant sends an adjustment due to a POS error; while some merchants will send this through as a Force Post (more detail [here](https://docs.lithic.com/docs/transaction-flow#7-clearing)), others will send this as an authorization advice and follow up with a clearing

Because the issuer does not get to decision on any authorization, these transactions may be subject to chargeback.

*Example transaction webhook:*

```json JSON (transaction webhook)
{
  "status": "PENDING",
  "acquirer_fee": 0,
  "amounts": {
    "hold": {
      "amount": -1000,
      "currency": "USD"
    },
    "merchant": {
      "amount": 0,
      "currency": "USD"
    },
    "cardholder": {
      "amount": 0,
      "currency": "USD",
      "conversion_rate": "1.000000"
    },
    "settlement": {
      "amount": 0,
      "currency": "USD"
    }
  },
  "events": [
    {
      "type": "AUTHORIZATION_ADVICE",
      "result": "APPROVED",
      "amounts": {
        "settlement": null,
        "cardholder": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "DEBIT",
      "detailed_results": [
        "APPROVED"
      ]
    }
  ],
  ...
}
```

Transactions can also begin with a declined `AUTHORIZATION_ADVICE` event. This typically occurs when a party upstream of Lithic – either acquirer or card network – has already declined the authorization.

```json JSON (transaction webhook)
{
  "status": "DECLINED",
  "acquirer_fee": 0,
  "amounts": {
    "hold": {
      "amount": 0,
      "currency": "USD"
    },
    "merchant": {
      "amount": 0,
      "currency": "USD"
    },
    "cardholder": {
      "amount": 0,
      "currency": "USD",
      "conversion_rate": "1.000000"
    },
    "settlement": {
      "amount": 0,
      "currency": "USD"
    }
  },
  "events": [
    {
      "type": "AUTHORIZATION_ADVICE",
      "result": "INCORRECT_PIN",
      "amounts": {
        "settlement": null,
        "cardholder": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "DEBIT",
      "detailed_results": [
        "CARD_PIN_INCORRECT"
      ]
    }
  ],
  ...
}
```

No further events are expected on transactions that reach this state.

## 10: Credit Authorization Advice

While Lithic's default behavior upon receiving a Credit Authorization from the network is to accept it, at times a user may receive a Credit Authorization Advice message that has already been accepted upstream of Lithic. For example, when there is a timeout between Lithic and the network during a credit authorization request, the network may "stand-in" and approve the credit on Lithic's (and its user's) behalf. In this case, a Credit Authorization Advice message is sent with status `PENDING`.

*Example transaction webhook:*

```json JSON (transaction webhook)
{
  "status": "PENDING",
  "acquirer_fee": 0,
  "amounts": {
    "hold": {
      "amount": 1000,
      "currency": "USD"
    },
    "merchant": {
      "amount": 0,
      "currency": "USD"
    },
    "cardholder": {
      "amount": 0,
      "currency": "USD",
      "conversion_rate": "1.000000"
    },
    "settlement": {
      "amount": 0,
      "currency": "USD"
    }
  },
  "events": [
    {
      "type": "CREDIT_AUTHORIZATION_ADVICE",
      "result": "APPROVED",
      "amounts": {
        "settlement": null,
        "cardholder": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "CREDIT",
      "detailed_results": [
        "APPROVED"
      ]
    }
  ],
  ...
}
```

*To simulate the above example, call the [simulate credit authorization advice](https://docs.lithic.com/reference/postsimulatecreditauthorizationadvice) endpoint.*

As with a Credit Authorization, the user can expect another event to either settle or void the credit authorization advice. If a reversed credit authorization advice, the following message will be received at the transaction webhook endpoint.

*Example transaction webhook:*

```json JSON (transaction webhook)
{
  "status": "VOIDED",
  "acquirer_fee": 0,
  "amounts": {
    "hold": {
      "amount": 0,
      "currency": "USD"
    },
    "merchant": {
      "amount": 0,
      "currency": "USD"
    },
    "cardholder": {
      "amount": 0,
      "currency": "USD",
      "conversion_rate": "1.000000"
    },
    "settlement": {
      "amount": 0,
      "currency": "USD"
    }
  },
  "events": [
    {
      "type": "CREDIT_AUTHORIZATION_ADVICE",
      "result": "APPROVED",
      "amounts": {
        "settlement": null,
        "cardholder": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "CREDIT",
      "detailed_results": [
        "APPROVED"
      ]
    },
    {
      "type": "AUTHORIZATION_REVERSAL",
      "result": "APPROVED",
      "amounts": {
        "settlement": null,
        "cardholder": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "DEBIT",
      "detailed_results": [
        "APPROVED"
      ]
    }
  ],
  ...
}
```

*To simulate the above example, call the [simulate credit authorization advice](https://docs.lithic.com/reference/postsimulatecreditauthorizationadvice) endpoint, then call the [simulate void transaction](https://docs.lithic.com/reference/postsimulatevoid) endpoint with `type` of `AUTHORIZATION_REVERSAL` and the transaction token generated from the credit authorization advice.*

No further messages are expected from Lithic after a reversed credit authorization.

If instead the credit is settled, the user will receive a Return event at the transaction webhook endpoint.

*Example transaction webhook:*

```json JSON (transaction webhook)
{
  "status": "SETTLED",
  "acquirer_fee": 0,
  "amounts": {
    "hold": {
      "amount": 0,
      "currency": "USD"
    },
    "merchant": {
      "amount": 1000,
      "currency": "USD"
    },
    "cardholder": {
      "amount": 1000,
      "currency": "USD",
      "conversion_rate": "1.000000"
    },
    "settlement": {
      "amount": 1000,
      "currency": "USD"
    }
  },
  "events": [
    {
      "type": "CREDIT_AUTHORIZATION_ADVICE",
      "result": "APPROVED",
      "amounts": {
        "settlement": null,
        "cardholder": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "CREDIT",
      "detailed_results": [
        "APPROVED"
      ]
    },
    {
      "type": "RETURN",
      "result": "APPROVED",
      "amounts": {
        "settlement": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "cardholder": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "CREDIT",
      "detailed_results": [
        "APPROVED"
      ]
    }
  ],
  ...
}
```

*To simulate the above example, call the [simulate credit authorization advice](https://docs.lithic.com/reference/postsimulatecreditauthorizationadvice) endpoint, then call the [simulate clearing](https://docs.lithic.com/reference/postsimulateclearing) endpoint with the transaction token generated from the credit authorization advice.*

Credits can be reversed once settled.

*Example transaction webhook:*

```json JSON (transaction webhook)
{
  "status": "VOIDED",
  "acquirer_fee": 0,
  "amounts": {
    "hold": {
      "amount": 0,
      "currency": "USD"
    },
    "merchant": {
      "amount": 0,
      "currency": "USD"
    },
    "cardholder": {
      "amount": 0,
      "currency": "USD",
      "conversion_rate": "1.000000"
    },
    "settlement": {
      "amount": 0,
      "currency": "USD"
    }
  },
  "events": [
    {
      "type": "CREDIT_AUTHORIZATION_ADVICE",
      "result": "APPROVED",
      "amounts": {
        "settlement": null,
        "cardholder": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "CREDIT",
      "detailed_results": [
        "APPROVED"
      ]
    },
    {
      "type": "RETURN",
      "result": "APPROVED",
      "amounts": {
        "settlement": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "cardholder": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "CREDIT",
      "detailed_results": [
        "APPROVED"
      ]
    },
    {
      "type": "RETURN_REVERSAL",
      "result": "APPROVED",
      "amounts": {
        "settlement": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "cardholder": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "DEBIT",
      "detailed_results": [
        "APPROVED"
      ]
    }
  ],
  ...
}
```

*To simulate the above example, call the [simulate credit authorization advice](https://docs.lithic.com/reference/postsimulatecreditauthorizationadvice) endpoint. Then call the [simulate clearing transaction](https://docs.lithic.com/reference/postsimulateclearing) endpoint with the transaction token generated from the credit authorization advice. Finally, call the [simulate return reversal](https://docs.lithic.com/reference/postsimulatereturnreversal) endpoint with the same transaction token.*

No further messages are expected from Lithic after the reversal.

Similar to transactions that begin with authorization advice messages, transactions can also begin with a declined `CREDIT_AUTHORIZATION_ADVICE` event. This most often occurs when a party upstream of Lithic – either acquirer or card network – has already declined the credit authorization.

```json JSON (transaction webhook)
{
  "status": "DECLINED",
  "acquirer_fee": 0,
  "amounts": {
    "hold": {
      "amount": 0,
      "currency": "USD"
    },
    "merchant": {
      "amount": 0,
      "currency": "USD"
    },
    "cardholder": {
      "amount": 0,
      "currency": "USD",
      "conversion_rate": "1.000000"
    },
    "settlement": {
      "amount": 0,
      "currency": "USD"
    }
  },
  "events": [
    {
      "type": "CREDIT_AUTHORIZATION_ADVICE",
      "result": "INCORRECT_PIN",
      "amounts": {
        "settlement": null,
        "cardholder": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "CREDIT",
      "detailed_results": [
        "CARD_PIN_INCORRECT"
      ]
    }
  ],
  ...
}
```

No further events are expected on transactions that reach this state.

## 11: Authorization Reversal

Occasionally, a transaction object is created with a standalone authorization reversal event. This usually takes place when a cardholder initiates a return on a settled purchase (see [this standard sequence](https://docs.lithic.com/docs/transaction-flow#authorization--clearing)), and the merchant attempts to reverse the authorization (as they would with an outstanding, uncleared authorization) instead of initiating a standard credit authorization flow. The merchant may do this by accident or because it is unaware that its acquirer has already cleared the authorization.

When the above occurs, since the Lithic platform will not be able to locate an outstanding authorization tied to the card on which a refund is taking place, it will not link the authorization reversal event to the original transaction, and will instead surface the event in its own transaction with a declined status. This webhook will serve as a notification that this event has taken place on your card program, but no action is needed as no money movement has transpired. The event will typically contain the `ORIGINAL_NOT_FOUND` result type to indicate that the merchant submitted a reversal but the Lithic platform did not locate a corresponding authorization to reverse.

*Example transaction webhook:*

```json JSON (transaction webhook)
{
  "status": "DECLINED",
  "acquirer_fee": 0,
  "amounts": {
    "hold": {
      "amount": 0,
      "currency": "USD"
    },
    "merchant": {
      "amount": 0,
      "currency": "USD"
    },
    "cardholder": {
      "amount": 0,
      "currency": "USD",
      "conversion_rate": "1.000000"
    },
    "settlement": {
      "amount": 0,
      "currency": "USD"
    }
  },
  "events": [
    {
      "type": "AUTHORIZATION_REVERSAL",
      "result": "ORIGINAL_NOT_FOUND",
      "amounts": {
        "settlement": null,
        "cardholder": {
          "amount": 0,
          "currency": "USD",
          "conversion_rate": "1.000000"
        },
        "merchant": {
          "amount": 1000,
          "currency": "USD"
        }
      },
      "effective_polarity": "CREDIT",
      "detailed_results": [
        "REVERSAL_UNMATCHED"
      ]
    }
  ],
  ...
}
```

The typical next step to ensure that the cardholder will receive the credit is that the merchant and acquirer will send the refund through as a [credit authorization](https://docs.lithic.com/docs/transaction-flow#4-credit-authorization-only-available-for-customer-decisioning-via-asa-on-certain-programs-sent-via-webhooks-on-all-programs), [financial credit authorization](https://docs.lithic.com/docs/transaction-flow#5-financial-credit-authorization-only-available-for-customer-decisioning-via-asa-on-certain-programs-sent-via-webhooks-on-all-programs), or [force posted return](https://docs.lithic.com/docs/transaction-flow#8-return). Credit should not be extended to the end cardholder until one of the above sequences occur and the transaction is in a `SETTLED` status (as indication that money has moved).