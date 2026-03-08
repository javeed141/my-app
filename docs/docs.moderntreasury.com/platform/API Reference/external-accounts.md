# External Account Webhooks

| Event                            | Description                                                                                                                                                                   |
| :------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **verified**                     | The external account has been verified. The `verification_status` is now `verified`.                                                                                          |
| **failed\_verification**         | The external account's verification was failed. A new verification may be started. The `verification_status` is now `unverified`.                                             |
| **cancelled**                    | The verification of the external account was cancelled. The `verification_status` is now `unverified`.                                                                        |
| **expired**                      | The verification of the external account has expired. The `verification_status` is now `unverified`.                                                                          |
| **verification\_fallback\_used** | The initial micro-deposit payments failed, and have been resent using the `fallback_type` specified on the verification request.                                              |
| **created**                      | The external account has been created. This webhook event is only sent when a counterparty has filled out their account information through the counterparty collection flow. |
| **updated**                      | The external account has been updated.                                                                                                                                        |
| **approved**                     | The external account has been approved.                                                                                                                                       |
| **approval\_reverted**           | The external account approval has been reverted.                                                                                                                              |
| **denied**                       | The external account has been denied.                                                                                                                                         |

```json Sample Verified External Account Webhook
{
  "event": "verified",
  "data": {
    "id": "e4c52e6a-430b-4163-a821-0a5e56ba7d2a",
    "object": "external_account",
    "account_type": "checking",
    "party_name": "Bob Loblaw",
    "party_type": "business",
    "name": null,
    "party_address": {
      ...
    },
    "account_details": [
      { ... },
    ],
    "routing_details": [
      { ... },
    ],
    "created_at": "2019-11-21T22:51:04Z",
    "updated_at": "2019-12-12T23:25:22Z",
    "counterparty_id": "3885df97-de2d-4dd6-9115-7104bc28b44a",
    "intermediate_account_id": null,
    "verification_status": "verified"
  }
}
```