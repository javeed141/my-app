# Virtual Account Webhooks

| Event       | Description                          |
| :---------- | :----------------------------------- |
| **created** | The Virtual Account has been created |
| **updated** | The Virtual Account has been updated |
| **deleted** | The Virtual Account has been deleted |

```json
{
  "event": "updated",
  "data": {
    "id": "527c26ce-65a0-48f5-89c7-e9e5feebf889",
    "name": "Virtual Account for Bob Loblaw",
    "object": "virtual_account",
    "metadata": {
      "key": "value"
    },
    "live_mode": true,
    "created_at": "2022-11-21T21:55:25Z",
    "updated_at": "2023-03-20T18:53:39Z",
    "description": "Bob Loblaw's Personal Account",
    "discarded_at": null,
    "account_details": [
      { ... },
    ],
    "counterparty_id": "c6279d43-23c4-45c8-a3fc-d2960c9c3c04",
    "routing_details": [
      { ... },
    ],
    "internal_account_id": "a459e83f-46e6-4c45-9ccc-0416a8de0380",
    "debit_ledger_account_id": "f09d3d69-2df9-46be-bfd0-d77e89631b8d",
    "credit_ledger_account_id": "e387c58c-c045-43da-849e-636ad588d3d6"
  }
}
```