# Push to Warehouse

Push to Warehouse enables regular syncing of Modern Treasury data directly to your existing data warehouse or database.

This centralized data can power reporting, analytics, integrations, and other workflows. Any tools or reports built on top of your data warehouse can update automatically.

You do not need to dedicate significant engineering resources to ingest and store data. This is a major benefit versus polling Modern Treasury APIs or relying on Webhook Events. Should you migrate or add destinations, or simply want a clean copy of your data, you can easily trigger a full re-sync to your warehouse.

You can choose which objects are synced, helping you optimize storage and transmission costs in your warehouse. Data is delivered in normalized and properly typed tables, making analysis easier for your data team. The schema of the data is designed to follow API object schema, making it easy to use data in your warehouse and integration interchangeably.

> ⚠️ Be Aware
>
> Push to Warehouse is intended for reporting and analytics use cases.
>
> It should not be used for real-time or critical path operations, as syncs are periodically performed at the SQL level instead of continuously streamed. Modern Treasury's API-level SLAs do not apply to Push to Warehouse availability.

# Set Up

Push to Warehouse is included in select contracts. To learn about activating this feature, [contact sales](mailto:sales@moderntreasury.com).

## Supported Warehouses

Modern Treasury currently supports syncing data to the following destinations. Click on the links to see detailed guides about what you need to do for each type of destination.

* [Athena](https://docs.moderntreasury.com/platform/docs/push-to-warehouse-setup-athena)
* [Azure Blob Storage](https://docs.moderntreasury.com/platform/docs/push-to-warehouse-setup-abs)
  * [Azure SSH bastion server guide](https://docs.moderntreasury.com/platform/docs/push-to-warehouse-setup-ssh-bastion-server-azure)
* [BigQuery](https://docs.moderntreasury.com/platform/docs/push-to-warehouse-setup-bigquery)
* [ClickHouse](https://docs.moderntreasury.com/platform/docs/push-to-warehouse-setup-clickhouse)
* [Databricks](https://docs.moderntreasury.com/platform/docs/push-to-warehouse-setup-databricks)
* Firebolt
* [Google Cloud Storage](https://docs.moderntreasury.com/platform/docs/push-to-warehouse-setup-gcs)
* [MySQL](https://docs.moderntreasury.com/platform/docs/push-to-warehouse-setup-mysql)
* Postgres
  * [Generic guide](https://docs.moderntreasury.com/platform/docs/push-to-warehouse-setup-postgres-generic)
  * [RDS or Aurora guide](https://docs.moderntreasury.com/platform/docs/push-to-warehouse-setup-postgres-aws)
* [Redshift](https://docs.moderntreasury.com/platform/docs/push-to-warehouse-setup-redshift)
* [S3](https://docs.moderntreasury.com/platform/docs/push-to-warehouse-setup-s3)
  * [Staging bucket guide](https://docs.moderntreasury.com/platform/docs/push-to-warehouse-setup-s3-staging)
  * [AWS SSH bastion server guide](https://docs.moderntreasury.com/platform/docs/push-to-warehouse-setup-ssh-bastion-server-aws)
* SingleStore
* [Snowflake](https://docs.moderntreasury.com/platform/docs/push-to-warehouse-setup-snowflake)
* [SQL Server](https://docs.moderntreasury.com/platform/docs/push-to-warehouse-setup-sql-server)

If your data warehouse is not listed, please [contact support](mailto:support@moderntreasury.com) with your desired warehouse. New warehouses may be available upon request.

## Supported Objects

Modern Treasury by default will sync all your data, including Ledgers, Payments, and Webhook Events to your warehouse. [Contact support](mailto:support@moderntreasury.com) if you would like to select which objects you would like to receive.

> ⚠️ Production vs. Sandbox Records
>
> Data from both the Sandbox and Production environments for your organization is synced to the same tables. As with our web API, the `live_mode` column indicates the environment to which each record belongs.
>
> If you'd like to be able to query Production data and Sandbox data independently without having to explicitly filter by `live_mode`, or if you'd like to enforce access controls on a per-environment basis, consider defining environment-specific SQL views in your warehouse.

## IP Address

If your warehouse has an IP allow list, make sure to add our Push to Warehouse egress IP (`52.36.3.49`) to it .

# Technical Details

Push to Warehouse enables regular syncing of Modern treasury data to your existing data warehouse or database. Below lists the various methods of retrieving data from Modern Treasury and which kinds of use cases they excel at.

* Push to Warehouse: Ideal for powering asynchronous workflows like reporting and analytics.
* Webhook Events: Ideal for powering real-time and event-driven workflows like UI changes in your application or third-party integrations.
* Polling APIs: Ideal for powering periodic workflows or understanding the current status of objects.

## Timing

Data is synced either every hour or every day. Each data sync typically takes about 30 minutes, depending on your volume and data warehouse. Syncs will only update records that have changed since the previous sync.

## Data Format

### Data warehouses & databases (incl. Snowflake, BigQuery, Redshift, Databricks)

Data transferred to data warehouses and relational databases will be loaded as properly typed tables within a single schema.

For destinations other than BigQuery, a special `_transfer_status` table will be loaded in the created schema to record transfer metadata, namely, a `transfer_last_updated_at` timestamp for each table. In BigQuery, the last\_updated timestamp for a table is already accessible in the `__TABLES_SUMMARY__` metatable.

### Object storage (incl. AWS S3, Google Cloud Storage, Azure Blob Storage)

Data transferred to object storage destinations will be loaded as Apache Parquet files in Apache Hive style partitions. This means data will appear in the following folder structure:

`<bucket_name>/<folder_name>/<model_name>/dt=<transfer_date>/<file_part>_<transfer_timestamp>.parquet`

Where:

`<bucket_name>` and `<folder_name>` are provided during destination configuration.\
`<model_name>` is the name of the data model being transferred (this is equivalent to a table name in relational data destinations).\
`<transfer_date>` and `<transfer_timestamp>` are generated at transfer time and based on the transfer's start time. `<transfer_date>` is of the form `2006-01-01`, while `<transfer_timestamp>` is of the form `20060102150405`.\
`<file_part>` is a monotonically increasing integer for a given timestamp, and does not carry any special meaning.

> 📘 What are Apache Hive style partitions and Apache Parquet file format?
>
> * **Apache Hive style partitions** are compatible with most popular query engines, and should make data easily queryable and transportable.
> * **Apache Parquet file format** is an open source, column-oriented data file format that offers efficient data compression and data integrity.

## Schema

By design, the Push to Warehouse table schema aims to emulate the API schema as closely as possible. The columns for each table are the main fields from the API. Note that some attributes like `metadata` are stored in a single column; you can manage flattening of these columns using derived tables and views.

Each Push to Warehouse table includes a `raw_json` column, which contains a JSON-serialized representation of each object in precisely the same format that we use for API responses and Webhook payloads.

To view detailed descriptions of each object type, go [here](https://docs.moderntreasury.com/platform/docs/push-to-warehouse-schema).

## Schema Changes

Our Push to Warehouse schema continuously evolves as we add support for new product features and occasionally deprecate old ones.

To facilitate this evolution in a predictable and controlled manner, we apply all schema changes during a standing monthly maintenance window on the **third Tuesday of each month, from 5-7 PM Pacific Time**.

We relay details regarding the scope and impact of the set of changes that we intend to make during each maintenance window at least one week ahead of time, via maintenance notices on our Status Page.

> 📘 How to Subscribe to Push to Warehouse Maintenance Notices
>
> * Navigate to our Status Page at [status.moderntreasury.com](https://status.moderntreasury.com/).
> * Click the “Get Updates” button in the top right corner of the page, and select your preferred delivery mechanism for updates.
> * Depending on the delivery mechanism you select, you can optionally filter notifications by component type (e.g. you can opt to receive email, Slack, or Teams alerts for *only* our Push to Warehouse product).

In most cases, the changes we make during maintenance windows are not disruptive to customers, and often we make no changes at all. However, there are sometimes instances where we need to re-sync historical data (e.g. adding a new attribute that was previously not exposed) or pause regularly scheduled transfers to customer warehouses. We take care to specifically note when actions like this are necessary.

## Mutable Fields

There are some objects that have mutable fields, for example `effective_date` on Payment Orders. If a field is changed, these records will be resynced on the same sync frequency as newly created records. There is a `__version__` column on each table that indicates the last synced time for a given record.

## Sensitive information

Push to Warehouse respects the configuration of your organization, following your selection of [Data Privacy Controls](https://docs.moderntreasury.com/platform/docs/data-privacy-controls-1). Given that the Push to Warehouse schema matches the API object schemas, the integration will only sync data exposed via API.

> 🚧 Metadata
>
> Most objects in Modern Treasury support `metadata`, a free-form key-value pair data store. Metadata is useful for filtering and reporting, and it is synced to your warehouse. If you are storing sensitive information in metadata, please note that it will be synced to your warehouse in the format it was received.

If you enable Data Privacy Controls and data has already been synced to your warehouse, only newly created or updated records will be impacted. This will result in [controlled attributes](https://docs.moderntreasury.com/platform/docs/data-privacy-controls-1#data-privacy-controlled-attributes) being removed or redacted from your warehouse. If you want a full re-sync of data that respects the newly configured controls, please [contact support](mailto:support@moderntreasury.com).