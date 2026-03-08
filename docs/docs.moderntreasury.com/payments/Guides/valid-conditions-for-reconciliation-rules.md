# Valid conditions for Reconciliation Rules

You can add a variety of conditions with different `fields`, `operators`, and `values` when creating Reconciliation Rules. The flexibility enables you to reconcile a variety of real-world behaviors accurately and automatically.

The table below lists the valid `operators` and `values` for each `field` type.

#### Transactions fields

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Operator(s)
      </th>

      <th>
        Value(s)
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        currency
      </td>

      <td>
        equals
      </td>

      <td>
        Valid ISO 4217 Currency Code,`expected_payment.currency`
      </td>
    </tr>

    <tr>
      <td>
        direction
      </td>

      <td>
        equals
      </td>

      <td>
        “credit”, “debit”, `expected_payment.direction`
      </td>
    </tr>

    <tr>
      <td>
        internal\_account\_id
      </td>

      <td>
        equals
      </td>

      <td>
        Valid Internal Account UUID, `expected_payment.internal_account_id`
      </td>
    </tr>

    <tr>
      <td>
        as\_of\_date
      </td>

      <td>
        less\_than\_or\_equals
      </td>

      <td>
        `expected_payment.date_upper_bound`
      </td>
    </tr>

    <tr>
      <td>
        as\_of\_date
      </td>

      <td>
        greater\_than\_or\_equals
      </td>

      <td>
        `expected_payment.date_lower_bound`
      </td>
    </tr>

    <tr>
      <td>
        type
      </td>

      <td>
        equals
      </td>

      <td>
        ach, wire, check, rtp, book, other\
        `expected_payment.type`
      </td>
    </tr>

    <tr>
      <td>
        vendor\_description
      </td>

      <td>
        equals, contains
      </td>

      <td>
        Constant String (e.g. “hello”), Expected Payment custom identifiers (e.g. expected\_payment.custom\_identifiers.key)
      </td>
    </tr>

    <tr>
      <td>
        details.path\_to.key (alphanumeric characters or underscores)
      </td>

      <td>
        equals
      </td>

      <td>
        Constant String (e.g. “hello”), custom identifiers (e.g. `expected_payment.custom_identifiers.[key]`)
      </td>
    </tr>
  </tbody>
</Table>

#### Incoming Payment Details fields

Incoming Payment Details fields can also be used in place of transaction fields. This reconciles the Expected Payment to the same transaction that is linked to the Incoming Payment Detail.

| Field                                                         | Operator(s) | Value(s)                                                                                              |
| ------------------------------------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------- |
| type                                                          | equals      | ach, book, check, eft, interac, rtp , sepa, wire, `expected_payment.type`                             |
| virtual\_account.counterparty\_id                             | equals      | Valid Counterparty UUID, `expected_payment.counterparty_id`                                           |
| data.lockbox\_number                                          | equals      | Constant String (e.g. “hello”), custom identifiers (e.g. `expected_payment.custom_identifiers.[key]`) |
| data.check\_number                                            | equals      | Constant String (e.g. “hello”), custom identifiers (e.g. `expected_payment.custom_identifiers.[key]`) |
| details.path\_to.key (alphanumeric characters or underscores) | equals      | Constant String (e.g. “hello”), custom identifiers (e.g. `expected_payment.custom_identifiers.[key]`) |

#### Expected Payment fields

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Operator(s)
      </th>

      <th>
        Value(s)
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        currency
      </td>

      <td>
        equals
      </td>

      <td>
        Valid ISO 4217 Currency Code, `transaction.currency`
      </td>
    </tr>

    <tr>
      <td>
        direction
      </td>

      <td>
        equals
      </td>

      <td>
        "credit", "debit", `transaction.direction`
      </td>
    </tr>

    <tr>
      <td>
        internal\_account\_id
      </td>

      <td>
        equals
      </td>

      <td>
        Valid Internal Account UUID, `transaction.internal_account_id`
      </td>
    </tr>

    <tr>
      <td>
        date\_upper\_bound
      </td>

      <td>
        greater\_than\_or\_equal
      </td>

      <td>
        `transaction.as_of_date`
      </td>
    </tr>

    <tr>
      <td>
        date\_lower\_bound
      </td>

      <td>
        less\_than\_or\_equal
      </td>

      <td>
        `transaction.as_of_date`
      </td>
    </tr>

    <tr>
      <td>
        type
      </td>

      <td>
        equals
      </td>

      <td>
        Any valid Payment Order type,\
        `transaction.type`
      </td>
    </tr>

    <tr>
      <td>
        counterparty\_id
      </td>

      <td>
        equals
      </td>

      <td>
        Valid Counterparty UUID, `transaction.incoming_payment_detail.virtual_account.counterparty_id`
      </td>
    </tr>

    <tr>
      <td>
        custom\_identifiers.key
      </td>

      <td>
        equals\
        contains
      </td>

      <td>
        Constant String (e.g. hello), `transaction.vendor_description`, `transaction.details.path_to.key`, `transaction.incoming_payment_detail.data.path_to.key`,\
        `transaction.paper_item.lockbox_number`, `transaction.paper_item.check_numb`

        Note: paths can only contain alphanumeric characters and underscores
      </td>
    </tr>
  </tbody>
</Table>