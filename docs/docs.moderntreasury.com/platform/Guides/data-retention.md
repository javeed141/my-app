# Data Retention

Modern Treasury implements data retention policies for a subset of resources. These policies help ensure the performance of our platform and increase data security by guarding access to potentially sensitive information. Resources subject to these policies include Audit Records, Events, Request Logs, and Webhook Delivery Attempts.

Resources specified below created prior to the listed timelines will no longer be searchable in the UI or available via the API. They can be accessed by exporting a CSV from the resource page in the app.

| Resource                  | Duration | Export Page                                                          | Notes                                                                                                                           |
| ------------------------- | -------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Audit Records             | 4 months | [Audit Trail](https://app.moderntreasury.com/settings/audit_records) | The [Audit Trail](https://app.moderntreasury.com/settings/audit_records) page is only accessible to organization admins.        |
| Events                    | 4 months | [Events](https://app.moderntreasury.com/developers/events)           | Basic event data (e.g. event names, timestamps, resource types, and resource IDs) is available indefinitely via the UI and API. |
| Request Logs              | 1 month  | [Request Logs](https://app.moderntreasury.com/developers/logs)       |                                                                                                                                 |
| Webhook Delivery Attempts | 6 weeks  | **N/A**                                                              | Webhook Delivery Attempts older than 6 weeks cannot be exported.                                                                |
| Bulk Results              | 1 month  | **N/A**                                                              |                                                                                                                                 |