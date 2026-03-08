# Journal Reports

A Journal Report is an accounting artifact that transforms financial activity such as bank [transactions](/reference/transaction-object) or [expected payments](/reference/expected-payment-object) into double-entry journal entries suitable for export to an ERP or general ledger system.
Each Journal Report aggregates source records (transactions or expected payments) and generates standardized journal entries with balanced debit and credit lines.

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
        Unique identifier for the journal report
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **name**
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        Name of the journal report
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **description**
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        Optional description
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **grouping\_field**
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        How source items are grouped: `by_date_and_internal_account` or `null`
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **source\_type**
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        Source of data: `transaction` or `expected_payment`
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **status**
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        One of `draft`, `ready`, `published`
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **accounting\_time\_zone**
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        Timezone for the journal report
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **entries\_count**
        *integer*
      </td>

      <td style={{ textAlign: "left" }}>
        Number of journal entries in this report
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
        The datetime the Journal Report was created.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **updated\_at**
        *datetime*
      </td>

      <td style={{ textAlign: "left" }}>
        The datetime the Journal Report was last updated.
      </td>
    </tr>
  </tbody>
</Table>

```json Journal Report Example
{
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "object": "journal_report",
    "live_mode": true,
    "name": "Q4 2025 Export",
    "description": "Sales transactions",
    "grouping_field": "by_date_and_internal_account",
    "source_type": "transaction",
    "status": "ready",
    "accounting_time_zone": "UTC",
    "entries_count": 150,
    "metadata": {"export_format": "quickbooks"},
    "created_at": "2025-01-15T10:30:00Z",
    "updated_at": "2025-01-15T10:30:00Z"
  }
```

<br />