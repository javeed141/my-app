# Connection Legal Entity Webhooks

| Event       | Description                                                                            |
| :---------- | :------------------------------------------------------------------------------------- |
| **created** | A connection legal entity has been created at MT and is getting created at the vendor. |

```json Sample Created Connection Legal Entity Webhook
{
  "event": "created",
  "data": {
    "id": "42e79631-195e-40d4-963f-e86b2facbc19",
    "object": "connection_legal_entity",
    "status": "processing",
    "live_mode": true,
    "vendor_id": null,
    "created_at": "2024-08-29T20:13:46Z",
    "updated_at": "2024-08-29T20:13:46Z",
    "discarded_at": null,
    "connection_id": "03a6a7a7-8f3d-4e5e-b55d-a16e4571cdd8",
    "legal_entity_id": "7d885cb7-6cad-42ab-ae01-d61bb90b4780"
  }
}
```