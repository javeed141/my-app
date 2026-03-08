# Journal Entries

A journal entry is an accounting record that represents a complete, balanced set of debits and credits for a specific financial event. Journal entries are the building blocks of double-entry bookkeeping and serve as the primary mechanism for recording transactions in your General Ledger (GL). Each journal entry contains one or more journal lines, where each line represents either a debit or credit to a specific account. The sum of all debits in a journal entry must equal the sum of all credits, ensuring the entry is balanced.

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th style={{ textAlign: "left" }}>
        Attribute
      </th>

      <th style={{ textAlign: "left" }}>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td style={{ textAlign: "left" }}>
        **id**
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        Unique identifier for the journal entry
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **memo**
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        Optional human-readable description
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **date**
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        Accounting date (determines accounting period)
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **journal\_report\_id**
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        ID of the parent journal report
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **internal\_account\_id**\
        **string**
      </td>

      <td style={{ textAlign: "left" }}>
        ID of the internal account
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **journal\_lines**
        *array*
      </td>

      <td style={{ textAlign: "left" }}>
        Line items (must balance to zero)
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **metadata**
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        Additional data represented as key-value pairs. Both the key and value must be strings. See [Metadata](https://docs.moderntreasury.com/platform/reference/metadata).
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **created\_at**
        *datetime*
      </td>

      <td style={{ textAlign: "left" }}>
        The datetime the journal entry was created.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **updated\_at**
        *datetime*
      </td>

      <td style={{ textAlign: "left" }}>
        The datetime the journal entry was last updated
      </td>
    </tr>
  </tbody>
</Table>

<br />

**Journal Line**

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
        **line\_number**
        *string*
      </td>

      <td>
        Sequence number
      </td>
    </tr>

    <tr>
      <td>
        **account\_code**
        *string*
      </td>

      <td>
        General ledger account code
      </td>
    </tr>

    <tr>
      <td>
        **direction**
        *string*
      </td>

      <td>
        Either debit or credit
      </td>
    </tr>

    <tr>
      <td>
        **amount**
        *integer*
      </td>

      <td>
        Amount in smallest currency unit (cents)
      </td>
    </tr>

    <tr>
      <td>
        **currency**
        *string*
      </td>

      <td>
        ISO 4217 three-letter currency code
      </td>
    </tr>

    <tr>
      <td>
        **memo**
        *string*
      </td>

      <td>
        Optional line-specific descriptio
      </td>
    </tr>
  </tbody>
</Table>

<br />

```json Journal Entry Example
{
    "id": "5a051efe-71b4-4b38-a201-2a81e0f9079b",
    "object": "journal_entry",
    "live_mode": true,
    "memo": "Payment processing fees",
    "journal_report_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "internal_account_id": "447ec7ae-be13-4717-985f-90f553fab5cc",
    "date": "2025-03-01",
    "journal_lines": [
      {
        "line_number": 1,
        "account_code": "1000",
        "amount": 100000,
        "direction": "credit",
        "currency": "USD",
        "memo": null
      },
      {
        "line_number": 2,
        "account_code": "5000",
        "amount": 100000,
        "direction": "debit",
        "currency": "USD",
        "memo": null
      }
    ],
    "metadata": {},
    "created_at": "2025-03-01T00:00:00Z",
    "updated_at": "2025-03-01T00:00:00Z"
  }
```

<br />