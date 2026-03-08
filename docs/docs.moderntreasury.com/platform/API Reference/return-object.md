# Returns

A `return` represents a rejection of a single payment order. This can occur for a variety of reasons and often results in your originating bank returning your funds as well as issuing a notification with additional details. These additional details result in a `return` being generated in the Modern Treasury system.

You can also create a return against a simulated incoming payment detail to mimic the return flow inside of sandbox.

Note that sometimes, banks will process a `return` prior to recording a transaction. This is why both `transaction_id` and `transaction_line_item_id` below may be null.

Related Guides:

* [Originating an ACH return](https://docs.moderntreasury.com/platform/docs/originating-an-ach-return)
* [Originating a wire return](https://docs.moderntreasury.com/payments/docs/originate-a-wire-return)

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Attribute
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **id**
        *string*
      </td>

      <td>
        Unique identifier for the return.
      </td>
    </tr>

    <tr>
      <td>
        **amount**
        *int32*
      </td>

      <td>
        Value in specified currency's smallest unit. e.g. $10 would be represented as 1000.
      </td>
    </tr>

    <tr>
      <td>
        **currency**
        *string*
      </td>

      <td>
        Currency that this transaction is denominated in.
      </td>
    </tr>

    <tr>
      <td>
        **type**
        *string*
      </td>

      <td>
        The type of return. Can be one of: `ach`, `ach_noc`, `au_becs`, `bacs`, `book`, `check`, `cross_border`, `eft`, `interac`, `manual`, `paper_item`,  `sepa`, `wire`.
      </td>
    </tr>

    <tr>
      <td>
        **status**
        *string*
      </td>

      <td>
        The current status of the return. See the [webhooks section](https://docs.moderntreasury.com/platform/reference/returns) for more on the different statuses.
      </td>
    </tr>

    <tr>
      <td>
        **reconciliation\_status**
        *string*
      </td>

      <td>
        The current reconciliation status. One of `unreconciled`,`tentatively_reconciled`, `reconciled`
      </td>
    </tr>

    <tr>
      <td>
        **code**
        *string*
      </td>

      <td>
        The return code. For `ach` returns, see [ACH Return Reason Codes](https://docs.moderntreasury.com/payments/docs/ach-return-codes).
      </td>
    </tr>

    <tr>
      <td>
        **reason**
        *string*
      </td>

      <td>
        Often the bank will provide an explanation for the return, which is a short human readable string.
      </td>
    </tr>

    <tr>
      <td>
        **role**
        *string*
      </td>

      <td>
        The role of the return, can be `originating` or `receiving`
      </td>
    </tr>

    <tr>
      <td>
        **data**
        *object*
      </td>

      <td>
        The raw data from the return file that we get from the bank.

        This field may contain sensitive information and is not included in API responses by default. Learn more about changing your settings [here](https://docs.moderntreasury.com/reference/data-privacy-controls) .
      </td>
    </tr>

    <tr>
      <td>
        **transaction\_line\_item\_id**
        *string*
      </td>

      <td>
        The ID of the relevant [Transaction Line Item](https://docs.moderntreasury.com/platform/reference/transaction-line-item-object) or `null`.
      </td>
    </tr>

    <tr>
      <td>
        **transaction\_id**
        *string*
      </td>

      <td>
        The ID of the relevant [Transaction](https://docs.moderntreasury.com/platform/reference/transaction-object) or `null`.
      </td>
    </tr>

    <tr>
      <td>
        **returnable\_id**
        *string*
      </td>

      <td>
        The ID of the object being returned or `null`.
      </td>
    </tr>

    <tr>
      <td>
        **returnable\_type**
        *string*
      </td>

      <td>
        The type of object being returned or `null`.
      </td>
    </tr>

    <tr>
      <td>
        **current\_return**
        *object*
      </td>

      <td>
        If the return's status is `returned`, this will include the return object that is returning this return.
      </td>
    </tr>

    <tr>
      <td>
        **live\_mode**
        *boolean*
      </td>

      <td>
        This field will be true if this object exists in the live environment or false if it exists in the test environment.
      </td>
    </tr>

    <tr>
      <td>
        **additional\_information**
        *string*
      </td>

      <td>
        This field may contain sensitive information and is not included in API responses by default. Learn more about changing your settings [here](https://docs.moderntreasury.com/reference/data-privacy-controls).

        Some returns include additional information from the bank. If the banks include it, this string will be present.
      </td>
    </tr>

    <tr>
      <td>
        **reference\_numbers**
        *array*
      </td>

      <td>
        An array of [Payment Reference](https://docs.moderntreasury.com/platform/reference/payment-references) objects.
      </td>
    </tr>

    <tr>
      <td>
        **internal\_account\_id**
        *string*
      </td>

      <td>
        The ID of the relevant Internal Account.
      </td>
    </tr>

    <tr>
      <td>
        **date\_of\_death**
        *date*
      </td>

      <td>
        If the return code is `R14` or `R15` this is the date the deceased counterparty passed away.
      </td>
    </tr>

    <tr>
      <td>
        **ledger\_transaction\_id**
        *string*
      </td>

      <td>
        The ID of the ledger transaction linked to the return. See [Linking to other Modern Treasury objects](https://docs.moderntreasury.com/platform/docs/linking-to-other-modern-treasury-objects).
      </td>
    </tr>

    <tr>
      <td>
        **corrections**
        *object*
      </td>

      <td>
        This field is only applicable for ACH NOC returns.

        An object holding all of the updated correct account information received from the bank that should replace the items originally used. Fields include `account_number`, `company_id`, `company_name`, `individual_identification_number`, `routing_number`, and `transaction_code`.
      </td>
    </tr>
  </tbody>
</Table>

```json Return Example
{
    "id": "de1d44ba-c904-4598-a62c-fe0b4fd75ac7",
    "object": "return",
    "live_mode": true,
    "status": "pending",
		"reconcilation_status": "reconciled"
    "returnable_id": "744ac1c4-365a-4df9-b6d9-730e07df115a",
    "returnable_type": "payment_order",
    "transaction_line_item_id": "3768a9ad-98c0-4b77-a5f4-4e203af16e0f",
    "transaction_id": "2159755e-5600-47c2-935a-df9a83a31c07",
    "internal_account_id": "3cce4311-c57e-4e38-aff9-58dd9409a67f",
    "type": "ach",
    "amount": 20000,
    "currency": "USD",
    "code": "R01",
    "failure_reason": null,
    "reason": "Insufficient Funds",
    "role": "receiving",
    "data": {},
    "date_of_death": null,
    "current_return": null,
    "reference_numbers": [],
    "ledger_transaction_id": null,
    "created_at": "2023-04-19T16:53:06Z",
    "updated_at": "2023-04-19T16:53:06Z",
    "corrections": null
}
```