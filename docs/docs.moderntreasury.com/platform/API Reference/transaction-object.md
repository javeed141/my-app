# Transactions

A `transaction` is an individual entry of activity reported on statements from a vendor such as bank, or payment processor.

Throughout a given business day, there could be `pending` transactions which are notifications of activity that is not finalized. Pending transactions will have a `posted` value of `false` and are deleted when the posted transactions are imported, which could be at the end of day or early next morning. The posted transactions are the final record of activity for that given business day. The pending and posted transactions will have different IDs.

Given the immutability of posted transactions, none of attributes outside of `metadata` are editable.

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
        Unique identifier for the transaction.
      </td>
    </tr>

    <tr>
      <td>
        **amount**
        *int64*
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
        **direction**
        *string*
      </td>

      <td>
        Either `credit` or `debit`.
      </td>
    </tr>

    <tr>
      <td>
        **vendor\_description**
        *string*
      </td>

      <td>
        The transaction detail text that often appears on your statement and portal. It can contain remittance information or descriptions about the payment.

        This field may contain sensitive information and is not included in API responses by default. Learn more about changing your settings [here](https://docs.moderntreasury.com/reference/data-privacy-controls) .
      </td>
    </tr>

    <tr>
      <td>
        **vendor\_code**\
        *string*
      </td>

      <td>
        When applicable, the bank-given code that determines the transaction's category. For most banks this is the BAI2/BTRS transaction code.
      </td>
    </tr>

    <tr>
      <td>
        **vendor\_code\_type**\
        *string*
      </td>

      <td>
        The type of `vendor_code` being reported. Can be one of `bai2`, `bankprov`, `bnk_dev`, `cleartouch`, `column`,`currencycloud`, `cross_river`, `dc_bank`, `evolve`, `goldman_sachs`, `iso20022`, `jpmc`, `mx`, `plaid`, `signet`, `silvergate`, `swift`, `us_bank` or `user`.
      </td>
    </tr>

    <tr>
      <td>
        **vendor\_id**\
        *string*
      </td>

      <td>
        An identifier given to this transaction by the bank.
      </td>
    </tr>

    <tr>
      <td>
        **as\_of\_date**\
        *date*
      </td>

      <td>
        The date on which the transaction occurred.
      </td>
    </tr>

    <tr>
      <td>
        **as\_of\_time**\
        *string*
      </td>

      <td>
        The time on which the transaction occurred, formatted as `HH:MM:SS`. Depending on the granularity of the timestamp information received from the bank, it may be `null`.
      </td>
    </tr>

    <tr>
      <td>
        **as\_of\_timezone**\
        *string*
      </td>

      <td>
        The timezone in which the `as_of_time` is represented, as a [database TZ identifier](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). Can be `null` if the bank does not provide a time or timezone info.
      </td>
    </tr>

    <tr>
      <td>
        **internal\_account\_id**\
        *string*
      </td>

      <td>
        The ID of the account for this transaction.
      </td>
    </tr>

    <tr>
      <td>
        **metadata**\
        *object*
      </td>

      <td>
        Additional data represented as key-value pairs. Both the key and value must be strings. See [Metadata](https://docs.moderntreasury.com/platform/reference/metadata)
      </td>
    </tr>

    <tr>
      <td>
        **custom\_identifiers**\
        *object*
      </td>

      <td>
        Additional data to be used with reconciliation rules to further enhance custom matching. Similar to the `custom_identifiers` field in expected payments [example](https://docs.moderntreasury.com/platform/reference/create-expected-payment-examples).
      </td>
    </tr>

    <tr>
      <td>
        **posted**\
        *boolean*
      </td>

      <td>
        This field will be true if the transaction has posted to the account.
      </td>
    </tr>

    <tr>
      <td>
        **vendor\_customer\_id**\
        *string*
      </td>

      <td>
        An identifier given to this transaction by the bank, often `null`.
      </td>
    </tr>

    <tr>
      <td>
        **reconciled**\
        *boolean*
      </td>

      <td>
        This field will be true if a transaction is reconciled by the Modern Treasury system. This means that it has transaction line items that sum up to the transaction's amount.
      </td>
    </tr>

    <tr>
      <td>
        **details**\
        *object*
      </td>

      <td>
        This field contains additional information that the bank provided about the transaction. This is structured data.

        Attributes passed through the `details` field will vary based on your banking partner.

        This field may contain personally identifiable information (PII) and is not included in API responses by default. Learn more about changing your settings in [Data Privacy Controls](https://docs.moderntreasury.com/platform/reference/data-privacy-controls).
      </td>
    </tr>

    <tr>
      <td>
        **live\_mode**\
        *boolean*
      </td>

      <td>
        This field will be true if this object exists in the live environment or false if it exists in the test environment.
      </td>
    </tr>

    <tr>
      <td>
        **type**\
        *string*
      </td>

      <td>
        See [Transaction Types](https://docs.moderntreasury.com/platform/reference/payment-order-object).
      </td>
    </tr>
  </tbody>
</Table>

```json Transaction Example
{
  "id": "7fb6c79f-5100-4929-8622-a62c247187d8",
  "amount": 20000,
  "currency": "USD",
  "direction": "debit",
  "vendor_code": "495",
  "vendor_id": null,
  "as_of_date": "2018-11-07",
  "as_of_time": "12:34:56,
  "as_of_timezone": "America/Los_Angeles",
  "internal_account_id": "dcac4afe-41b5-4963-a1e5-9abc06e99c00",
  "metadata": {},
  "custom_identifiers":{
    "buyer_email_address": "jennifer.dough@email.com",
    "payment_id": "abc123"
  },
  "posted": true,
  "vendor_customer_id": null,
  "reconciled": false,
  "live_mode": true,
  "type": "ach",
  "created_at": "2019-11-09T00:11:07Z",
  "updated_at": "2019-11-09T00:11:07Z"
}
```