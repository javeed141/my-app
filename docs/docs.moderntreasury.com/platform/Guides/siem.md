# SIEM Integration

Modern Treasury provides detailed audit records that are essential for identifying security incidents, maintaining compliance, and tracking user activity. These audit records can be streamed in real-time to Security Information and Event Management (SIEM) or log management solutions. Audit records are enriched with context helpful for investigations.

# Audit Records

Audit records record all the actions performed by users and API keys across the dashboard and API, and by the Modern Treasury system. Audit records are available in the [Audit Trail](https://app.moderntreasury.com/settings/audit_records) page, but the SIEM integration provides a systematic way to stream the data real time into your log management system for security detection and log retention purposes.

The following is how the audit records look like in DataDog.

<Image align="center" alt="Example audit records in DataDog with SIEM Integration" border={false} caption="Example audit records in DataDog with SIEM Integration" src="https://files.readme.io/c9ac1e7-DataDog_Audit_Records.png" />

## Audit Record Format for SIEM

An audit record contains the following top level data fields:

```json
{
  "id",
  "record_type",
  "organization_id",
  "action_type",
  "actor_id",
  "actor_type",
  "entity_type",
  "entity_id",
  "event_name",
  "event_time",
  "ip_address",
  "source",
  "data"
}
```

# Supported Objects

We currently support sending audit records. Contact [support@moderntreasury.com](mailto:support@moderntreasury.com) if you are interested in adding additional signals.

# Setting it up

To learn more about activating this feature, reach out to [support@moderntreasury.com](mailto:support@moderntreasury.com).

Integrations typically require routing (e.g. an endpoint URL) and authentication (e.g. an API key) information for your destination.