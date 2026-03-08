# Webhooks v2 migration guide

Webhooks v2 is now open for use! This guide will give you an overview of the changes you need to make to switch from version 1 (v1) to version 2 (v2).

> 🚧 Webhooks v2 is here to eventually replace webhooks v1. Please consider migration as soon as convenient.

You can find out more about version 1 of webhooks [here](https://pipedrive.readme.io/docs/guide-for-webhooks) and version 2 [here](https://pipedrive.readme.io/docs/guide-for-webhooks-v2).

If you have any questions or need help, feel free to post to our [Dev Community](https://devcommunity.pipedrive.com/).

<hr />

## About webhooks v2

<hr />

Webhooks v2 brings **added reliability and stability** by **reducing duplicate and missing webhook triggers** and **delays** and giving you **better debugging** capabilities. In addition, you can now **create`lead` webhooks**.

<hr />

## Critical things to note

<hr />

1. For added reliability and stability, please use webhooks v2
2. Webhooks v2 and v1 will continue to run in parallel for the time being
3. As there are significant differences in webhooks v2’s payload, please closely review v2’s [changes](https://pipedrive.readme.io/docs/webhooks-v2-migration-guide#general-changes-in-webhooks-v2), [format](https://pipedrive.readme.io/docs/webhooks-v2-migration-guide#webhooks-v2-format) and [examples](https://pipedrive.readme.io/docs/webhooks-v2-migration-guide#webhooks-v2-examples) and modify your code accordingly
4. Should a field no longer be available in webhook v2’s payload, please query it from our API
5. You don’t have to implement deduplication in webhooks v2 as one edit or update to the object will only trigger one `change` webhook in v2.
6. The `merged` event action from v1 is unavailable in v2 due to a behavior change. In v2, you’ll receive two webhooks  – one for the `deleted` object and another for the `changed` object.
   1. The `deleted` object event `meta` block will contain a `merged_to_id: string` with an ID reference to the object it was merged into.
   2. The `changed` object event `meta` block will contain a `merged_from_id: string` with an ID reference to the object that was merged from.

<hr />

## General changes in webhooks v2

<hr />

Renamed fields and objects

* `Retry` is now `attempt`
* `Current` object is now `data` object

Fields that have been moved

* `Attempt` (previously `retry`) is now inside the `meta` object
* Custom fields are now located in a separate `custom_fields` object that is inside the `data` (previously `current`) object

Structure changes

* The old `current` object had a structure close to the responses you get from our API. The new `data` object now contains only crucial information about the entity and related/connected entities (if their`id`s are provided).
* Custom fields is now initialized as an object. All custom field attributes will be located inside the `custom_fields` object.
* The `previous` object now only contains fields whose values have changed
* `permitted_user_ids` now contains an array of strings instead of integers

### Changes to the `meta` object

Removed fields

* `timestamp_micro`
* `trans_pending`
* `pipedrive_service_name`
* `matches_filters`
* `send_activity_notifications`
* `activity_notifications_language`

Updated field values

* `action` field values that have been changed:
  * `added` is now `create`
  * `updated` and `merged` have been combined and are now `change`
  * `deleted` is now `delete`

Updated field names

* `v` is now `version`
* `is_bulk_update` is now `is_bulk_edit`
* `object` is now `entity`
* `retry` (which was not in the `meta` object previously) is now `attempt`
  * `attempt` values can be `1 - 4` (previously in v1, `retry` values were  `0 - 3`)

New fields in V2

* `correlation_id`
* `entity_id`
* `type`
* `webhook_owner_id`
* `merged_to_id` - a string value that is only present for delete events that were done as part of a merge action.
* `merged_from_id` - a string value that is only present for change events that were done as part of a merge action.

<hr />

## Webhooks v2 format

<hr />

**Keep in mind that**

* There are significant differences in webhooks v2’s payload so please closely review it
* Should a field no longer be available in webhook v2’s payload, please query it from our API
* You no longer have to implement deduplication in webhooks v2 as one edit or update to the object will only trigger one `change` webhook in v2

```json V2
{
    "meta": {
        "action": "create",
        "entity": "deal",
        "company_id": "xxxxx",
        "correlation_id": "xxxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        "entity_id": "xxx",
        "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        "is_bulk_edit": false,
        "timestamp": "2023-01-01T00:00:00.000Z",
        "type": "general",
        "user_id": "xxxxx",
        "version": "2.0",
        "webhook_id": "xxx",
      	"webhook_owner_id": "xxxxxx",
      	"change_source": "app",
        "attempt": 1,
        "host": "company.pipedrive.com"
    },
    "data": ( the object data as of this update ),
    "previous": ( the previous data of the object fields that have been changed )
 }
```

```json V1
{
    "v": 1,
    "matches_filters": {
      "current": [],
      "previous": []
    },
    "meta": {
      "v": 1,
      "action": "added",
      "object": "deal",
      "change_source": "app",
      "id": xxx,
      "company_id": xxxxx,
      "user_id": xxxxx,
      "host": "company.pipedrive.com",
      "timestamp": 1523440213,
      "timestamp_micro": 1523440213384700,
      "permitted_user_ids": [],
      "trans_pending": false,
      "is_bulk_update": false,
      "pipedrive_service_name": false,
      "matches_filters": {
        "current": [],
        "previous": []
      },
      "webhook_id": xxx
    },
    "retry": 0,
    "current": (the object data as of this update),
    "previous": (the object data prior to this update),
    "event": "event name"
  }
```

### Custom fields format in webhooks v2

All custom fields are located inside the `custom_fields` object. Here are the examples of custom fields types and their payloads:

**Text**

```json
"custom_field_hash": {  
    "type": "varchar",  
    "value": "This is a custom text field."  
}
```

**Long text**

```json
"custom_field_hash": {  
    "type": "text",  
    "value": "This is a custom text field with details about a particular Pipedrive entity."  
}
```

**Autocomplete**

```json
"custom_field_hash": {  
    "type": "varchar_auto",  
    "value": "Hello there"  
} 
```

**Numeric**

```json
"custom_field_hash": {  
    "type": "double",  
    "value": 123  
}
```

**Monetary**

```json
"custom_field_hash": {  
    "currency": "EUR",  
    "type": "monetary",  
    "value": 200  
}
```

**Person**

```json
"custom_field_hash": {  
    "id": 17818,  
    "type": "people"  
}
```

**Organization**

```json
"custom_field_hash": {  
    "id": 1,  
    "type": "org"  
}
```

**User**

```json
"custom_field_hash": {  
    "id": 13075973,  
    "type": "user"  
}
```

**Phone**

```json
"custom_field_hash": {  
    "type": "phone",  
    "value": "1234-5678"  
}
```

**Time**

```json
"custom_field_hash": {  
    "timezone_id": 310,  
    "type": "time",  
    "value": "00:45:00"  
}
```

**Time range**

```json
"custom_field_hash": {  
    "timezone_id": 310,  
    "from": "00:00:00",  
    "until": "01:15:00",  
    "type": "timerange"  
}
```

**Date**

```json
"custom_field_hash": {  
    "type": "date",  
    "value": "2023-06-27"  
}
```

**Date range**

```json
"custom_field_hash": {  
    "from": "2023-06-06",  
    "until": "2023-06-14",  
    "type": "daterange"  
}
```

**Address**

```json
"custom_field_hash": {  
    "country": "Estonia",  
    "formatted_address": "Mustamäe tee 3a, 10616 Tallinn, Estonia",  
    "locality": "Tallinn",  
    "sublocality": "Kristiine",  
    "type": "address",  
    "subpremise": "",  
    "route": "Mustamäe tee",  
    "street_number": "3a",  
    "admin_area_level_1": "Harju maakond",  
    "admin_area_level_2": "",  
    "postal_code": "10616",  
    "value": "Mustamäe tee 3a, Tallinn, Estonia"  
}
```

**Single option**

```json
"custom_field_hash": {  
    "id": 17,  
    "type": "enum"  
}
```

**Multiple options**

```json
"custom_field_hash": {  
    "values": [  
        { "id": 13 },  
        { "id": 14 }  
    ],  
    "type": "set"  
}
```

For single option and multiple options custom fields, only the `id` is included. To get the values, please

* Make an API call to the relevant entity’s Fields endpoint – [`GET/dealFields`](https://developers.pipedrive.com/docs/api/v1/DealFields#getDealFields), [`GET/personFields`](https://developers.pipedrive.com/docs/api/v1/PersonFields#getPersonFields), [`GET/organizationFields`](https://developers.pipedrive.com/docs/api/v1/OrganizationFields#getOrganizationFields), [`GET/productFields`](https://developers.pipedrive.com/docs/api/v1/ProductFields#getProductFields), [`GET/activityFields`](https://developers.pipedrive.com/docs/api/v1/ActivityFields#getActivityFields), [`GET/noteFields`](https://developers.pipedrive.com/docs/api/v1/NoteFields#getNoteFields)
* Find the response of the single option or multiple options custom field you are looking for
* Cache the response for `id` to `value` mapping

<hr />

## Webhooks v2 examples

<hr />

## Activity

```json Create activity
{
    "data": {
        "active_flag": true,
        "add_time": "2022-11-24T15:25:44Z",
        "busy_flag": null,
        "custom_fields": {},
        "deal_id": 10,
        "done": false,
        "due_date": "2022-11-24",
        "due_time": null,
        "duration": null,
        "id": 2,
        "lead_id": null,
        "location": null,
        "org_id": null,
        "owner_id": 12415231,
        "person_id": 10,
        "public_description": "",
        "subject": "Call with friends",
        "type": "meeting",
        "update_time": "2022-11-24T15:25:44Z",
        "update_user_id": null
    },
    "previous": null,
    "meta": {
        "action": "create",
        "company_id": "8087566",
        "correlation_id": "a5ad2ea2-1279-413a-9ba6-34671edf5fe3",
        "entity_id": "2",
        "entity": "activity",
        "id": "bbba59e9-1d1f-4794-9472-72540d421386",
        "is_bulk_edit": false,
        "timestamp": "2022-11-24T15:25:44.461Z",
        "type": "general",
        "user_id": "12415231",
        "version": "2.0",
        "webhook_id": "4710827",
        "webhook_owner_id": "12094821",
      	"change_source": "app",
        "attempt": 1,
        "host": "pd-us.pipedrive.com"
    }
}
```

```json Update activity
{
    "data": {
        "active_flag": true,
        "add_time": "2022-11-24T15:25:44Z",
        "busy_flag": null,
        "custom_fields": {},
        "deal_id": 10,
        "done": false,
        "due_date": "2022-11-24",
        "due_time": {
            "timezone_id": null,
            "value": ""
        },
        "duration": {
            "timezone_id": null,
            "value": ""
        },
        "id": 2,
        "lead_id": null,
        "location": null,
        "org_id": null,
        "owner_id": 12415231,
        "person_id": 10,
        "public_description": "",
        "subject": "Call with friends and family",
        "type": "meeting",
        "update_time": "2022-11-24T15:28:13Z",
        "update_user_id": null
    },
    "previous": {
        "subject": "Call with friends",
        "update_time": "2022-11-24T15:26:57Z"
    },
    "meta": {
        "action": "change",
        "company_id": "8087566",
        "correlation_id": "030c898c-3b97-48b7-983b-054681d07f9a",
        "entity_id": "2",
        "entity": "activity",
        "id": "7a40ac1f-debd-4d22-b8d6-d9a687a96ec4",
        "is_bulk_edit": false,
        "timestamp": "2022-11-24T15:28:13.375Z",
        "type": "general",
        "user_id": "12415231",
        "version": "2.0",
        "webhook_id": "4710827",
        "webhook_owner_id": "12094821",
      	"change_source": "app",
        "attempt": 1,
        "host": "pd-us.pipedrive.com"
    }
}
```

```json Delete activity
{
    "data": null,
    "previous": {
        "active_flag": true,
        "add_time": "2022-11-24T15:25:44Z",
        "busy_flag": null,
        "custom_fields": {},
        "deal_id": 10,
        "done": false,
        "due_date": "2022-11-24",
        "due_time": {
            "timezone_id": null,
            "value": ""
        },
        "duration": {
            "timezone_id": null,
            "value": ""
        },
        "id": 2,
        "lead_id": null,
        "location": null,
        "org_id": null,
        "owner_id": 12415231,
        "person_id": 10,
        "public_description": "",
        "subject": "Call with friends",
        "type": "meeting",
        "update_time": "2022-11-24T15:28:13Z"
    },
    "meta": {
        "action": "delete",
        "company_id": "8087566",
        "correlation_id": "60f15fdc-5b18-4bf1-a50a-e1da445c0a31",
        "entity_id": "2",
        "entity": "activity",
        "id": "df8b0894-c23e-40ac-a49f-07a4c8e66213",
        "is_bulk_edit": false,
        "timestamp": "2022-11-24T15:29:10.654Z",
        "type": "general",
        "user_id": "12415231",
        "version": "2.0",
        "webhook_id": "4710827",
        "webhook_owner_id": "12094821",
      	"change_source": "app",
        "attempt": 1,
        "host": "pd-us.pipedrive.com"
    }
}
```

## Deal

```json Create deal
{
    "data": {
        "add_time": "2022-11-24T13:18:55Z",
        "channel": null,
        "channel_id": null,
        "close_time": null,
        "creator_user_id": 12415231,
        "currency": "EUR",
        "custom_fields": {},
        "expected_close_date": null,
        "first_won_time": null,
        "id": 8,
        "label_ids": [],
        "lost_reason": null,
        "lost_time": null,
        "org_id": 1,
        "origin": "ManuallyCreated",
        "origin_id": null,
        "owner_id": 12415231,
        "person_id": 8,
        "pipeline_id": 1,
        "probability": null,
        "stage_change_time": null,
        "stage_id": 2,
        "status": "open",
        "title": "Sample Org deal",
        "update_time": null,
        "value": 100,
        "visible_to": "3",
        "won_time": null
    },
    "previous": null,
    "meta": {
        "action": "create",
        "company_id": "8087566",
        "correlation_id": "4095519f-02cb-44bc-bd2f-551d5383f202",
        "entity_id": "8",
        "entity": "deal",
        "id": "71825ee0-0054-4267-b5fd-d28b7a414212",
        "is_bulk_edit": false,
        "timestamp": "2022-11-24T13:18:56.089Z",
        "type": "general",
        "user_id": "12415231",
        "version": "2.0",
        "webhook_id": "4710827",
        "webhook_owner_id": "12094821",
      	"change_source": "app",
        "attempt": 1,
        "host": "pd-us.pipedrive.com"
    }
}
```

```json Update deal
{
    "data": {
        "add_time": "2022-11-24T13:18:55Z",
        "channel": null,
        "channel_id": null,
        "close_time": null,
        "creator_user_id": 12415231,
        "currency": "EUR",
        "custom_fields": {
            "3d0fa3429dfa2d3dec265b4fc5dc8258ab66cdf3": {
                "country": "Estonia",
                "formatted_address": "Tallinn, Estonia",
                "locality": "Tallinn",
                "sublocality": "",
                "type": "address",
                "subpremise": "",
                "route": "",
                "street_number": "",
                "admin_area_level_1": "Harju County",
                "admin_area_level_2": "",
                "postal_code": "",
                "value": "Tallinn, Estonia"
            }
        },
        "expected_close_date": null,
        "first_won_time": null,
        "id": 8,
        "label_ids": [
            24,
            25
        ],
        "lost_reason": null,
        "lost_time": null,
        "org_id": 1,
        "origin": "ManuallyCreated",
        "origin_id": null,
        "owner_id": 12415231,
        "person_id": 8,
        "pipeline_id": 1,
        "probability": null,
        "stage_change_time": null,
        "stage_id": 2,
        "status": "open",
        "title": "Sample Org deal",
        "update_time": "2022-11-24T15:11:55Z",
        "value": 100,
        "visible_to": "3",
        "won_time": null
    },
    "previous": {
        "custom_fields": {
            "3d0fa3429dfa2d3dec265b4fc5dc8258ab66cdf3": null
        }
    },
    "meta": {
        "action": "change",
        "company_id": "8087566",
        "correlation_id": "121e5331-7ec6-4af8-9994-0e52fb489044",
        "entity_id": "8",
        "entity": "deal",
        "id": "df47d877-b58c-4886-91cd-1aa83e1d7366",
        "is_bulk_edit": false,
        "timestamp": "2022-11-24T15:11:55.724Z",
        "type": "general",
        "user_id": "12415231",
        "version": "2.0",
        "webhook_id": "4710827",
        "webhook_owner_id": "12094821",
      	"change_source": "app",
        "attempt": 1,
        "host": "pd-us.pipedrive.com"
    }
}
```

```json Delete deal
{
    "data": null,
    "previous": {
        "add_time": "2022-11-24T13:18:55Z",
        "channel": null,
        "channel_id": null,
        "close_time": null,
        "creator_user_id": 12415231,
        "currency": "EUR",
        "custom_fields": {
            "3d0fa3429dfa2d3dec265b4fc5dc8258ab66cdf3": {
                "country": "Estonia",
                "formatted_address": "Tallinn, Estonia",
                "locality": "Tallinn",
                "sublocality": "",
                "type": "address",
                "subpremise": "",
                "route": "",
                "street_number": "",
                "admin_area_level_1": "Harju County",
                "admin_area_level_2": "",
                "postal_code": "",
                "value": "Tallinn, Estonia"
            }
        },
        "expected_close_date": null,
        "first_won_time": null,
        "id": 8,
        "label_ids": [
            24,
            25
        ],
        "lost_reason": null,
        "lost_time": null,
        "org_id": 1,
        "origin": "ManuallyCreated",
        "origin_id": null,
        "owner_id": 12415231,
        "person_id": 8,
        "pipeline_id": 1,
        "probability": null,
        "stage_change_time": null,
        "stage_id": 2,
        "status": "open",
        "title": "Sample Org deal",
        "update_time": "2022-11-24T15:16:03Z",
        "value": 100,
        "visible_to": "3",
        "won_time": null
    },
    "meta": {
        "action": "delete",
        "company_id": "8087566",
        "correlation_id": "59713ec6-03bf-42ad-a044-5f0403c1e5bb",
        "entity_id": "8",
        "entity": "deal",
        "id": "a66e9392-fe41-4425-9bef-a1d32bf2df8c",
        "is_bulk_edit": false,
        "timestamp": "2022-11-24T15:16:53.335Z",
        "type": "general",
        "user_id": "12415231",
        "version": "2.0",
        "webhook_id": "4710827",
        "webhook_owner_id": "12094821",
      	"change_source": "app",
        "attempt": 1,
        "host": "pd-us.pipedrive.com"
    }
}
```

## Lead

```json Create lead
{
    "data": {
        "add_time": "2022-11-24T15:35:58.675Z",
        "channel": null,
        "channel_id": null,
        "creator_id": 12415231,
        "custom_fields": {},
        "expected_close_date": null,
        "id": "b1810230-6c0d-11ed-9826-a53d0eb706a5",
        "is_archived": false,
        "label_ids": [
            "134b4de7-dcbc-46ae-b8f2-2eb328eebfe8",
            "4a5149be-a279-4be3-b62d-48eef2be5824"
        ],
        "next_activity_id": null,
        "organization_id": 2,
        "origin": "ManuallyCreated",
        "origin_id": null,
        "owner_id": 12415231,
        "person_id": 11,
        "source_name": "Manually created",
        "title": "Lead Org lead",
        "update_time": "2022-11-24T15:35:58.675Z",
        "was_seen": true,
        "value": {
            "amount": 300,
            "currency": "EUR"
        }
    },
    "previous": null,
    "meta": {
        "action": "create",
        "company_id": "8087566",
        "correlation_id": "fe0b3d07-c24f-4701-a3a1-9e0ed681d4d0",
        "entity_id": "b1810230-6c0d-11ed-9826-a53d0eb706a5",
        "entity": "lead",
        "id": "b18fa830-6c0d-11ed-9826-a53d0eb706a5",
        "is_bulk_edit": false,
        "timestamp": "2022-11-24T15:35:58.772Z",
        "type": "general",
        "user_id": "12415231",
        "version": "2.0",
        "webhook_id": "4710827",
        "webhook_owner_id": "12094821",
      	"change_source": "app",
        "attempt": 1,
        "host": "pd-us.pipedrive.com"
    }
}
```

```json Update lead
{
    "data": {
        "add_time": "2022-11-24T15:35:58.675Z",
        "channel": null,
        "channel_id": null,
        "creator_id": 12415231,
        "custom_fields": {},
        "expected_close_date": null,
        "id": "b1810230-6c0d-11ed-9826-a53d0eb706a5",
        "is_archived": false,
        "label_ids": [
            "134b4de7-dcbc-46ae-b8f2-2eb328eebfe8",
            "4a5149be-a279-4be3-b62d-48eef2be5824"
        ],
        "next_activity_id": null,
        "organization_id": 2,
        "origin": "ManuallyCreated",
        "origin_id": null,
        "owner_id": 12415231,
        "person_id": 11,
        "source_name": "Manually created",
        "title": "Lead Org lead",
        "update_time": "2022-11-24T15:37:20.386Z",
        "was_seen": true,
        "value": {
            "amount": 500,
            "currency": "EUR"
        }
    },
    "previous": {
        "is_archived": true,
        "next_activity_id": null,
        "update_time": "2022-11-24T15:35:58.675Z",
        "value": {
            "amount": 300,
            "currency": "EUR"
        }
    },
    "meta": {
        "action": "change",
        "company_id": "8087566",
        "correlation_id": "98178c1e-766b-4e39-80e5-3fada2f15841",
        "entity_id": "b1810230-6c0d-11ed-9826-a53d0eb706a5",
        "entity": "lead",
        "id": "e235ba60-6c0d-11ed-a825-71d0cf99387b",
        "is_bulk_edit": false,
        "timestamp": "2022-11-24T15:37:20.391Z",
        "type": "general",
        "user_id": "12415231",
        "version": "2.0",
        "webhook_id": "4710827",
        "webhook_owner_id": "12094821",
      	"change_source": "app",
        "attempt": 1,
        "host": "pd-us.pipedrive.com"
    }
}
```

```json Delete lead
{
    "data": null,
    "previous": {
        "add_time": "2022-11-24T15:35:58.675Z",
        "channel": null,
        "channel_id": null,
        "creator_id": 12415231,
        "custom_fields": {},
        "expected_close_date": null,
        "id": "b1810230-6c0d-11ed-9826-a53d0eb706a5",
        "is_archived": false,
        "label_ids": [
            "134b4de7-dcbc-46ae-b8f2-2eb328eebfe8",
            "4a5149be-a279-4be3-b62d-48eef2be5824"
        ],
        "next_activity_id": null,
        "organization_id": 2,
        "origin": "ManuallyCreated",
        "origin_id": null,
        "owner_id": 12415231,
        "person_id": 11,
        "source_name": "Manually created",
        "title": "Lead Org lead",
        "update_time": "2022-11-24T15:37:20.386Z",
        "was_seen": true,
        "value": {
            "amount": 500,
            "currency": "EUR"
        }
    },
    "meta": {
        "action": "delete",
        "company_id": "8087566",
        "correlation_id": "06385f7b-1720-441a-ab48-03d871c09c1a",
        "entity_id": "b1810230-6c0d-11ed-9826-a53d0eb706a5",
        "entity": "lead",
        "id": "f6902590-6c0d-11ed-b671-e5d3563ddafd",
        "is_bulk_edit": false,
        "timestamp": "2022-11-24T15:37:54.538Z",
        "type": "general",
        "user_id": "12415231",
        "version": "2.0",
        "webhook_id": "4710827",
        "webhook_owner_id": "12094821",
      	"change_source": "app",
        "attempt": 1,
        "host": "pd-us.pipedrive.com"
    }
}
```

## Note

```json Create note
{
    "data": {
        "id": 1,
        "user_id": 12415231,
        "deal_id": 10,
        "person_id": 10,
        "org_id": null,
        "lead_id": null,
        "project_id": null,
        "active_flag": true,
        "content": "Deal note",
        "add_time": "2022-11-25T15:41:34Z",
        "update_time": "2022-11-25T15:41:34Z",
        "pinned_to_deal_flag": false,
        "pinned_to_person_flag": false,
        "pinned_to_organization_flag": false
    },
    "previous": null,
    "meta": {
        "action": "create",
        "company_id": "8087566",
        "correlation_id": "e6d8583b-57a7-4d84-b261-f71b00bb368e",
        "entity_id": "1",
        "entity": "note",
        "id": "388e79ee-ad16-437a-b07b-229b9c81645d",
        "is_bulk_edit": false,
        "timestamp": "2022-11-25T15:41:34.303Z",
        "type": "general",
        "user_id": "12415231",
        "version": "2.0",
        "webhook_id": "4718068",
        "webhook_owner_id": "12094821",
      	"change_source": "app",
        "attempt": 1,
        "host": "pd-us.pipedrive.com"
    }
}
```

```json Update note
{
    "data": {
        "id": 1,
        "user_id": 12415231,
        "deal_id": 10,
        "person_id": 10,
        "org_id": null,
        "lead_id": null,
        "project_id": null,
        "active_flag": true,
        "content": "Deal note (updated)",
        "add_time": "2022-11-25T15:41:34Z",
        "update_time": "2022-11-25T15:45:11Z",
        "pinned_to_deal_flag": false,
        "pinned_to_person_flag": false,
        "pinned_to_organization_flag": false
    },
    "previous": {
        "content": "Deal note",
        "update_time": "2022-11-25T15:41:34Z"
    },
    "meta": {
        "action": "change",
        "company_id": "8087566",
        "correlation_id": "08399fb2-5d1b-4528-ae43-5336e57b8ac0",
        "entity_id": "1",
        "entity": "note",
        "id": "69eee76f-d7db-47cf-8b75-5182446e7672",
        "is_bulk_edit": false,
        "timestamp": "2022-11-25T15:45:11.730Z",
        "type": "general",
        "user_id": "12415231",
        "version": "2.0",
        "webhook_id": "4718068",
        "webhook_owner_id": "12094821",
      	"change_source": "app",
        "attempt": 1,
        "host": "pd-us.pipedrive.com"
    }
}
```

```json Delete note
{
    "data": null,
    "previous": {
        "id": 1,
        "user_id": 12415231,
        "deal_id": 10,
        "person_id": 10,
        "org_id": null,
        "lead_id": null,
        "project_id": null,
        "active_flag": false,
        "content": "Deal note (updated)",
        "add_time": "2022-11-25T15:41:34Z",
        "update_time": "2022-11-25T15:46:16Z",
        "pinned_to_deal_flag": false,
        "pinned_to_person_flag": false,
        "pinned_to_organization_flag": false
    },
    "meta": {
        "action": "delete",
        "company_id": "8087566",
        "correlation_id": "eac97a72-63ec-4d60-ab3d-964b43c4ec77",
        "entity_id": "1",
        "entity": "note",
        "id": "bf4d011a-c103-4cca-af3a-259d0ebbfc28",
        "is_bulk_edit": false,
        "timestamp": "2022-11-25T15:46:16.826Z",
        "type": "general",
        "user_id": "12415231",
        "version": "2.0",
        "webhook_id": "4718068",
        "webhook_owner_id": "12094821",
      	"change_source": "app",
        "attempt": 1,
        "host": "pd-us.pipedrive.com"
    }
}
```

## Organization

```json Create organization
{
    "data": {
        "add_time": "2022-11-24T13:18:55Z",
        "address": null,
        "country_code": null,
        "custom_fields": {},
        "id": 1,
        "label": null,
        "name": "Sample Org",
        "owner_id": 12415231,
        "picture_id": null,
        "update_time": "2022-11-24T13:18:55Z",
        "visible_to": "3"
    },
    "previous": null,
    "meta": {
        "action": "create",
        "company_id": "8087566",
        "correlation_id": "73366894-6a37-409d-9b52-b542b4e7a55e",
        "entity_id": "1",
        "entity": "organization",
        "id": "ece7b901-5898-4c80-986a-6b7feeabebe4",
        "is_bulk_edit": false,
        "timestamp": "2022-11-24T13:18:55.315Z",
        "type": "general",
        "user_id": "12415231",
        "version": "2.0",
        "webhook_id": "4710827",
        "webhook_owner_id": "12094821",
      	"change_source": "app",
        "attempt": 1,
        "host": "pd-us.pipedrive.com"
    }
}
```

```json Update organization
{
    "data": {
        "add_time": "2022-11-24T13:18:55Z",
        "address": null,
        "country_code": null,
        "custom_fields": {
            "bdd479c3cfdb9c50bae4fa4929ae944980da55d7": {
                "type": "double",
                "value": 978
            }
        },
        "id": 1,
        "label": null,
        "name": "Sample Org",
        "owner_id": 12415231,
        "picture_id": null,
        "update_time": "2022-11-24T15:21:23Z",
        "visible_to": "3"
    },
    "previous": {
        "custom_fields": {
            "bdd479c3cfdb9c50bae4fa4929ae944980da55d7": null
        }
    },
    "meta": {
        "action": "change",
        "company_id": "8087566",
        "correlation_id": "40659b32-1677-4ec5-b83c-1852670aa19f",
        "entity_id": "1",
        "entity": "organization",
        "id": "ea17c64f-ec7e-4e47-a321-5d84b7735fef",
        "is_bulk_edit": false,
        "timestamp": "2022-11-24T15:21:23.152Z",
        "type": "general",
        "user_id": "12415231",
        "version": "2.0",
        "webhook_id": "4710827",
        "webhook_owner_id": "12094821",
      	"change_source": "app",
        "attempt": 1,
        "host": "pd-us.pipedrive.com"
    }
}
```

```json Delete organization
{
    "data": null,
    "previous": {
        "add_time": "2022-11-24T13:18:55Z",
        "address": null,
        "country_code": null,
        "custom_fields": {
            "bdd479c3cfdb9c50bae4fa4929ae944980da55d7": {
                "type": "double",
                "value": 978
            }
        },
        "id": 1,
        "label": null,
        "name": "Sample Org",
        "owner_id": 12415231,
        "picture_id": null,
        "update_time": "2022-11-24T15:21:23Z",
        "visible_to": "3"
    },
    "meta": {
        "action": "delete",
        "company_id": "8087566",
        "correlation_id": "ec6f1fb5-d507-444d-8a31-496df6f95fa4",
        "entity_id": "1",
        "entity": "organization",
        "id": "ae06c983-cc11-496f-86aa-45cc24f60695",
        "is_bulk_edit": false,
        "timestamp": "2022-11-24T15:22:17.705Z",
        "type": "general",
        "user_id": "12415231",
        "version": "2.0",
        "webhook_id": "4710827",
        "webhook_owner_id": "12094821",
      	"change_source": "app",
        "attempt": 1,
        "host": "pd-us.pipedrive.com"
    }
}
```

## Person

```json Create person
{
    "data": {
        "add_time": "2022-11-24T13:18:55Z",
        "custom_fields": {},
        "emails": [],
        "first_name": "Sample",
        "id": 8,
        "label": null,
        "last_name": null,
        "name": "Sample",
        "org_id": 1,
        "owner_id": 12415231,
        "phones": [],
        "update_time": "2022-11-24T13:18:55Z",
        "visible_to": "3"
    },
    "previous": null,
    "meta": {
        "action": "create",
        "company_id": "8087566",
        "correlation_id": "f6c826fe-f335-4447-a51f-40789ad4ca5e",
        "entity_id": "8",
        "entity": "person",
        "id": "5359a602-6d1b-4562-a385-ccaa762bd722",
        "is_bulk_edit": false,
        "timestamp": "2022-11-24T13:18:55.665Z",
        "type": "general",
        "user_id": "12415231",
        "version": "2.0",
        "webhook_id": "4710827",
        "webhook_owner_id": "12094821",
      	"change_source": "app",
        "attempt": 1,
        "host": "pd-us.pipedrive.com"
    }
}
```

```json Update person
{    
    "data": {
        "add_time": "2022-11-24T13:18:55Z",
        "custom_fields": {},
        "emails": [],
        "first_name": "Sample Person",
        "id": 8,
        "label": null,
        "last_name": null,
        "name": "Sample Person",
        "org_id": 1,
        "owner_id": 12415231,
        "phones": [],
        "update_time": "2022-11-24T15:18:35Z",
        "visible_to": "3"
     },
     "previous": {
        "first_name": "Sample",
        "name": "Sample"
     },
     "meta": {
        "action": "change",
        "company_id": "8087566",
        "correlation_id": "43cb94f3-bbbd-406c-ae19-ddeec349d896",
        "entity_id": "8",
        "entity": "person",
        "id": "7c812ffd-8f50-45ea-a597-b8fcba2da9c0",
        "is_bulk_edit": false,
        "timestamp": "2022-11-24T15:18:35.616Z",
        "type": "general",
        "user_id": "12415231",
        "version": "2.0",
        "webhook_id": "4710827",
        "webhook_owner_id": "12094821",
      	"change_source": "app",
        "attempt": 1,
        "host": "pd-us.pipedrive.com"
     }
}
```

```json Delete person
{
    "data": null,
    "previous": {
        "add_time": "2022-11-24T13:18:55Z",
        "custom_fields": {},
        "emails": [],
        "first_name": "Sample Person",
        "id": 8,
        "label": null,
        "last_name": null,
        "name": "Sample Person",
        "org_id": 1,
        "owner_id": 12415231,
        "phones": [],
        "update_time": "2022-11-24T15:18:35Z",
        "visible_to": "3"
    },
    "meta": {
        "action": "delete",
        "company_id": "8087566",
        "correlation_id": "98f9c1fc-37a4-4520-ba6f-81ea52440a69",
        "entity_id": "8",
        "entity": "person",
        "id": "0c73badd-ba9e-43dd-ab86-687b9797f46b",
        "is_bulk_edit": false,
        "timestamp": "2022-11-24T15:19:45.149Z",
        "type": "general",
        "user_id": "12415231",
        "version": "2.0",
        "webhook_id": "4710827",
        "webhook_owner_id": "12094821",
      	"change_source": "app",
        "attempt": 1,
        "host": "pd-us.pipedrive.com"
    }
}
```

## Pipeline

```json Create pipeline
{
    "data": {
        "id": 9,
        "name": "Sample pipeline",
        "url_title": "Sample-pipeline",
        "order_nr": 4,
        "active_flag": true,
        "deal_probability": true,
        "add_time": "2024-09-02T10:19:21Z",
        "update_time": "2024-09-02T10:19:21Z"
    },
    "previous": null,
    "meta": {
        "action": "create",
        "company_id": "12345",
        "correlation_id": "123e266b-023e-4284-a4c7-16bed33b0710",
        "entity_id": "9",
        "entity": "pipeline",
        "id": "91d3c39c-f979-42b1-95fd-1729d4723637",
        "is_bulk_edit": false,
        "timestamp": "2024-09-02T10:19:21.200Z",
        "type": "general",
        "user_id": "123456",
        "version": "2.0",
        "webhook_id": "111",
        "webhook_owner_id": "123456",
      	"change_source": "app",
        "attempt": 1,
        "host": "companyname.pipedrive.com"
    }
}
```

```json Update pipeline
{
    "data": {
        "id": 9,
        "name": "Sample pipeline",
        "url_title": "Sample-pipeline",
        "order_nr": 4,
        "active_flag": true,
        "deal_probability": false,
        "add_time": "2024-09-02T10:19:21Z",
        "update_time": "2024-09-02T10:28:29Z"
    },
    "previous": {
        "deal_probability": true,
        "update_time": "2024-09-02T10:19:21Z"
    },
    "meta": {
        "action": "change",
        "company_id": "12345",
        "correlation_id": "4f48326b-f937-453d-8181-8270551f60d4",
        "entity_id": "9",
        "entity": "pipeline",
        "id": "5c005fea-d653-4bed-a843-a9df3faf0421",
        "is_bulk_edit": false,
        "timestamp": "2024-09-02T10:28:29.173Z",
        "type": "general",
        "user_id": "123456",
        "version": "2.0",
        "webhook_id": "111",
        "webhook_owner_id": "123456",
      	"change_source": "app",
        "attempt": 1,
        "host": "companyname.pipedrive.com"
    }
}
```

```json Delete pipeline
{
    "data": null,
    "previous": {
        "id": 9,
        "name": "Sample pipeline",
        "url_title": "Sample-pipeline",
        "order_nr": 4,
        "active_flag": true,
        "deal_probability": false,
        "add_time": "2024-09-02T10:19:21Z",
        "update_time": "2024-09-02T10:28:29Z"
    },
    "meta": {
        "action": "delete",
        "company_id": "12345",
        "correlation_id": "dc059b64-f1f0-4724-af71-5637f948a827",
        "entity_id": "9",
        "entity": "pipeline",
        "id": "9afccbc7-84f0-407f-a550-3531c906fafd",
        "is_bulk_edit": false,
        "timestamp": "2024-09-02T10:29:52.599Z",
        "type": "general",
        "user_id": "123456",
        "version": "2.0",
        "webhook_id": "111",
        "webhook_owner_id": "123456",
      	"change_source": "app",
        "attempt": 1,
        "host": "companyname.pipedrive.com"
    }
}
```

## Product

```json Create product
{
    "data": {
        "add_time": "2022-11-24T15:31:36Z",
        "category": "18",
        "code": "OR-0001",
        "custom_fields": {},
        "description": null,
        "id": 1,
        "name": "Oranges",
        "owner_id": 123456,
        "selectable": true,
        "tax": 2,
        "unit": null,
        "update_time": "2022-11-24T15:31:36Z",
        "visible_to": "3",
        "prices": [
            {
                "cost": 123,
                "notes": "",
                "price": 234,
                "product_id": 1,
                "currency": "EUR",
                "direct_cost": 111
            }
        ]
    },
    "previous": null,
    "meta": {
        "action": "create",
        "company_id": "12345",
        "correlation_id": "66a63085-6404-45d8-a40d-97ff0a304bc6",
        "entity_id": "1",
        "entity": "product",
        "id": "cc8709d0-2e5b-42d7-a509-cbfb1e5b5f15",
        "is_bulk_edit": false,
        "timestamp": "2022-11-24T15:31:36.613Z",
        "type": "general",
        "user_id": "123456",
        "version": "2.0",
        "webhook_id": "111",
        "webhook_owner_id": "123456",
      	"change_source": "app",
        "attempt": 1,
        "host": "companyname.pipedrive.com"
    }
}
```

```json Update product
{
    "data": {
        "add_time": "2022-11-24T15:31:36Z",
        "category": "18",
        "code": "OR-0001",
        "custom_fields": {},
        "description": "Basket of oranges",
        "id": 1,
        "name": "Oranges",
        "owner_id": 123456,
        "selectable": true,
        "tax": 2,
        "unit": null,
        "update_time": "2022-11-24T15:32:46Z",
        "visible_to": "3",
        "prices": [
            {
                "cost": 123,
                "notes": "",
                "price": 234,
                "product_id": 1,
                "currency": "EUR",
                "direct_cost": 111
            }
        ]
    },
    "previous": {
        "description": null,
        "update_time": "2022-11-24T15:31:36Z"
    },
    "meta": {
        "action": "change",
        "company_id": "12345",
        "correlation_id": "6184369f-3815-4159-aad2-867f96fad29a",
        "entity_id": "1",
        "entity": "product",
        "id": "ff511fee-8b3a-4c9c-a745-5ec1505df422",
        "is_bulk_edit": false,
        "timestamp": "2022-11-24T15:32:46.360Z",
        "type": "general",
        "user_id": "123456",
        "version": "2.0",
        "webhook_id": "111",
        "webhook_owner_id": "123456",
      	"change_source": "app",
        "attempt": 1,
        "host": "companyname.pipedrive.com"
    }
}
```

```json Delete product
{
    "data": null,
    "previous": {
        "add_time": "2022-11-24T15:31:36Z",
        "category": "18",
        "code": "OR-0001",
        "custom_fields": {},
        "description": "Basket of oranges",
        "id": 1,
        "name": "Oranges",
        "owner_id": 123456,
        "selectable": true,
        "tax": 2,
        "unit": null,
        "update_time": "2022-11-24T15:32:46Z",
        "visible_to": "3",
        "prices": [
            {
                "cost": 123,
                "notes": "",
                "price": 234,
                "product_id": 1,
                "currency": "EUR",
                "direct_cost": 111
            }
        ]
    },
    "meta": {
        "action": "delete",
        "company_id": "12345",
        "correlation_id": "116dcc72-c51f-4932-bc15-cd6d0fd874c8",
        "entity_id": "1",
        "entity": "product",
        "id": "df48a524-dcfe-41cd-8299-0f0890051204",
        "is_bulk_edit": false,
        "timestamp": "2022-11-24T15:33:34.755Z",
        "type": "general",
        "user_id": "123456",
        "version": "2.0",
        "webhook_id": "111",
        "webhook_owner_id": "123456",
      	"change_source": "app",
        "attempt": 1,
        "host": "companyname.pipedrive.com"
    }
}
```

## Stage

```json Create stage
{
    "data": {
        "id": 48,
        "name": "Sample Stage",
        "active_flag": true,
        "rotten_days": null,
        "order_nr": 6,
        "deal_probability": 100,
        "rotten_flag": false,
        "add_time": "2024-09-02T10:35:49Z",
        "pipeline_id": 1,
        "update_time": "2024-09-02T10:35:49Z"
    },
    "previous": null,
    "meta": {
        "action": "create",
        "company_id": "12345",
        "correlation_id": "32f27c72-927f-4488-b625-8a32a15637b3",
        "entity_id": "48",
        "entity": "stage",
        "id": "43884250-51ce-4447-bb66-525617183150",
        "is_bulk_edit": false,
        "timestamp": "2024-09-02T10:35:49.419Z",
        "type": "general",
        "user_id": "123456",
        "version": "2.0",
        "webhook_id": "111",
        "webhook_owner_id": "123456",
      	"change_source": "app",
        "attempt": 1,
        "host": "companyname.pipedrive.com"
    }
}
```

```json Update stage
{
    "data": {
        "id": 48,
        "name": "Sample Stage",
        "active_flag": true,
        "rotten_days": 1,
        "order_nr": 6,
        "deal_probability": 100,
        "rotten_flag": true,
        "add_time": "2024-09-02T10:35:49Z",
        "pipeline_id": 1,
        "update_time": "2024-09-02T10:36:49Z"
    },
    "previous": {
        "rotten_days": null,
        "rotten_flag": false,
        "update_time": "2024-09-02T10:35:49Z"
    },
    "meta": {
        "action": "change",
        "company_id": "12345",
        "correlation_id": "f37b711f-9a75-4fb1-b94e-cc9bcfda261e",
        "entity_id": "48",
        "entity": "stage",
        "id": "92750b0c-0f50-48d2-bd01-2ff876c2d75e",
        "is_bulk_edit": false,
        "timestamp": "2024-09-02T10:36:49.193Z",
        "type": "general",
        "user_id": "123456",
        "version": "2.0",
        "webhook_id": "111",
        "webhook_owner_id": "123456",
      	"change_source": "app",
        "attempt": 1,
        "host": "companyname.pipedrive.com"
    }
}
```

```json Delete stage
{
    "data": null,
    "previous": {
        "id": 48,
        "name": "Sample Stage",
        "active_flag": true,
        "rotten_days": 1,
        "order_nr": 6,
        "deal_probability": 100,
        "rotten_flag": true,
        "add_time": "2024-09-02T10:35:49Z",
        "pipeline_id": 1,
        "update_time": "2024-09-02T10:36:49Z"
    },
    "meta": {
        "action": "delete",
        "company_id": "12345",
        "correlation_id": "5b8786d0-70f3-41d2-8874-1f4ececf89bd",
        "entity_id": "48",
        "entity": "stage",
        "id": "e4a9b8c4-af1e-4e26-a84e-a47d72266c13",
        "is_bulk_edit": false,
        "timestamp": "2024-09-02T10:37:51.404Z",
        "type": "general",
        "user_id": "123456",
        "version": "2.0",
        "webhook_id": "111",
        "webhook_owner_id": "123456",
      	"change_source": "app",
        "attempt": 1,
        "host": "companyname.pipedrive.com"
    }
}
```

## User

```json Create user
{
    "data": {
        "id": "16943176",
        "default_currency": "USD",
        "name": "sample@mailforspam.com",
        "email": "sample@mailforspam.com",
        "phone": null,
        "locale": "et_EE",
        "lang": "en-GB",
        "active_flag": true,
        "last_login": null,
        "timezone_name": "Europe/Helsinki",
        "icon_url": null,
        "created": "2022-11-24 15:39:48",
        "modified": "2022-11-24 15:39:48",
        "access": null
    },
    "previous": null,
    "meta": {
        "action": "create",
        "company_id": "8087566",
        "correlation_id": "6f1c7cea-6fa5-46b0-b13a-d9c61acecb26",
        "entity_id": "16943176",
        "entity": "user",
        "id": "16943176",
        "is_bulk_edit": false,
        "timestamp": 1669304389,
        "type": "general",
        "user_id": "12415231",
        "version": "2.0",
        "webhook_id": "4710827",
        "webhook_owner_id": "12094821",
      	"change_source": "app",
        "attempt": 1,
        "host": "pd-us.pipedrive.com"
    }
}
```

```json Update user
{
    "data": {
        "id": "12415231",
        "default_currency": "USD",
        "name": "Sample person",
        "email": "sample@mailforspam.com",
        "phone": "+3721111",
        "locale": "et_EE",
        "lang": "en-US",
        "active_flag": true,
        "last_login": "2022-11-24 13:14:07",
        "timezone_name": "Europe/Helsinki",
        "icon_url": null,
        "created": "2021-06-29 14:12:51",
        "modified": "2022-11-24 15:42:22",
        "access": null
    },
    "previous": {
        "lang": "en-GB",
        "modified": "2022-11-24 13:14:07"
    },
    "meta": {
        "action": "change",
        "company_id": "8087566",
        "correlation_id": "9ab5f99c-3c16-4e2c-8ef3-1c80c4327d98",
        "entity_id": "12415231",
        "entity": "user",
        "id": "12415231",
        "is_bulk_edit": false,
        "timestamp": 1669304542,
        "type": "general",
        "user_id": "12415231",
        "version": "2.0",
        "webhook_id": "4710827",
        "webhook_owner_id": "12094821",
      	"change_source": "app",
        "attempt": 1,
        "host": "pd-us.pipedrive.com"
    }
}
```

```json Delete user
{
    "data": {
        "id": "15702024",
        "default_currency": "USD",
        "name": "Sample person",
        "email": "sample@mailforspam.com",
        "phone": null,
        "locale": "et_EE",
        "lang": "en-US",
        "active_flag": false,
        "last_login": "2022-06-29 07:53:43",
        "timezone_name": "Europe/Helsinki",
        "icon_url": null,
        "created": "2022-06-29 07:53:01",
        "modified": "2022-06-29 07:53:43",
        "access": null
    },
    "previous": {
        "active_flag": true
    },
    "meta": {
        "action": "change",
        "company_id": "8087566",
        "correlation_id": "2056dbca-8141-4408-a64c-596c2fdd0777",
        "entity_id": "15702024",
        "entity": "user",
        "id": "15702024",
        "is_bulk_edit": false,
        "timestamp": 1669304802,
        "type": "general",
        "user_id": "12415231",
        "version": "2.0",
        "webhook_id": "4710827",
        "webhook_owner_id": "12094821",
      	"change_source": "app",
        "attempt": 1,
        "host": "pd-us.pipedrive.com"
    }
}
```