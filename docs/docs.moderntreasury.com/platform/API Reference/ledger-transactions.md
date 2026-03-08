# Ledger Transaction Webhooks

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th style={{ textAlign: "left" }}>
        Event
      </th>

      <th style={{ textAlign: "left" }}>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td style={{ textAlign: "left" }}>
        **posted**
      </td>

      <td style={{ textAlign: "left" }}>
        A ledger transaction has been posted automatically by Modern Treasury. The `status` is now `posted`. A ledger transaction may automatically post if it is [linked to another Modern Treasury object](https://docs.moderntreasury.com/platform/docs/linking-to-other-modern-treasury-objects).
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **created**
      </td>

      <td style={{ textAlign: "left" }}>
        A ledger transaction has been successfully created.

        Ledger transactions can be created via API, UI, or automatically by Modern Treasury. Automatic creation occurs as a result of auto-ledgering scenarios such as linked payment order returns or redrafts, or when funds enter a linked virtual account. See [linking ledger accounts to payment objects](https://docs.moderntreasury.com/ledgers/docs/link-ledger-accounts-to-payment-objects) and [linking ledger transactions to payments](https://docs.moderntreasury.com/ledgers/docs/linking-ledger-transaction-to-payment-objects) for more details.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **archived**
      </td>

      <td style={{ textAlign: "left" }}>
        A ledger transaction has been archived automatically by Modern Treasury. The `status` is now `archived`. A ledger transaction may automatically be archived if it is linked to another Modern Treasury object.
      </td>
    </tr>
  </tbody>
</Table>

```json Sample Ledger Transaction Webhook
{
  "event": "posted",
  "data": {
    "id": "f6d60e77-244e-4000-bc48-db72eb1089eb",
    "object": "ledger_transaction",
    "status": "posted",
    "metadata": {},
    "ledger_id": "34a26d9f-7b7e-42eb-9a71-41fddaaa3d3c",
    "live_mode": true,
    "posted_at": "2021-06-29T01:39:39Z",
    "created_at": "2021-05-26T15:58:58Z",
    "updated_at": "2021-06-29T01:39:39Z",
    "description": null,
    "external_id": "1234567",
    "ledgerable_id": null,
    "effective_date": "2021-05-25",
    "effective_at": "2021-05-25T00:00:00.000000Z",
    "ledger_entries": [
      {
        "id": "c7731f70-abe7-4863-9643-e0eeb70fc5f8",
        "amount": 800,
        "object": "ledger_entry",
        "direction": "debit",
        "live_mode": true,
        "created_at": "2021-05-26T15:58:58Z",
        "updated_at": "2021-05-26T15:58:58Z",
        "discarded_at": null,
        "ledger_account_id": "70cbdadd-819e-44a4-9217-9a3fff537218",
        "ledger_transaction_id": "f6d60e77-244e-4000-bc48-db72eb1089eb"
      },
      {
        "id": "d27c39f5-db6a-4744-935e-0f3210a3c138",
        "amount": 800,
        "object": "ledger_entry",
        "direction": "credit",
        "live_mode": true,
        "created_at": "2021-05-26T15:58:58Z",
        "updated_at": "2021-05-26T15:58:58Z",
        "discarded_at": null,
        "ledger_account_id": "a0bfdfbc-cf5b-454c-b205-465d87cf9fd7",
        "ledger_transaction_id": "f6d60e77-244e-4000-bc48-db72eb1089eb"
      }
    ],
    "ledgerable_type": null
  }
}
```