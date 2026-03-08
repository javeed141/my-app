# Timestamps

All records returned by our API have a set of timestamps attached for reference. You'll see two fields: `created_at` and `updated_at`. The created timestamp is the datetime that the record was created. The updated timestamp is the datetime of the last update to that record.

These timestamps adhere to the [ISO 8601 standard](https://en.wikipedia.org/wiki/ISO_8601). For example - November 9, 2019 at 0:11:07 UTC would be represented as "2019-11-09T00:11:07Z".