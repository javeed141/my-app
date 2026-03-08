# Push to Warehouse Schema

The Push to Warehouse table schema aims to emulate the API schema as closely as possible. Our [API Reference](https://docs.moderntreasury.com/platform/reference/payment-order-object) includes detailed descriptions of each object type and its constituent fields.

Each Push to Warehouse table includes a `raw_json` column, which contains a JSON-serialized representation of each object in precisely the same format that we use for API responses and Webhook payloads. The remainder of the columns for each table (with the exception of the `__version__`  metadata attribute) are produced by "flattening" the raw JSON values as a convenience measure. Note that the specified data types are based on the input data type and may differ from your warehouse output type.

## [balance\_reports](https://docs.moderntreasury.com/platform/reference/balance-report-object)

| Column Name           | Type        | Notes                                                                                                                                                                                                                                                                                                                                                           |
| --------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `__version__`         | `timestamp` |                                                                                                                                                                                                                                                                                                                                                                 |
| `as_of_date`          | `date`      |                                                                                                                                                                                                                                                                                                                                                                 |
| `as_of_datetime`      | `timestamp` | **Deprecated - prefer `as_of_date` and `as_of_time`**. Represents the bank-reported effective datetime for the Balance Report. Due to a known bug, this value is currently expressed as a UTC timestamp. A value of "2024-09-01T01:00:00Z" should be understood to indicate that the Balance was effective as of "2024-09-01 01:00:00" in the bank's time zone. |
| `as_of_time`          | `string`    |                                                                                                                                                                                                                                                                                                                                                                 |
| `balance_report_type` | `string`    |                                                                                                                                                                                                                                                                                                                                                                 |
| `created_at`          | `timestamp` |                                                                                                                                                                                                                                                                                                                                                                 |
| `id`                  | `string`    |                                                                                                                                                                                                                                                                                                                                                                 |
| `internal_account_id` | `string`    |                                                                                                                                                                                                                                                                                                                                                                 |
| `live_mode`           | `boolean`   |                                                                                                                                                                                                                                                                                                                                                                 |
| `organization_id`     | `string`    |                                                                                                                                                                                                                                                                                                                                                                 |
| `raw_json`            | `json`      |                                                                                                                                                                                                                                                                                                                                                                 |
| `updated_at`          | `timestamp` |                                                                                                                                                                                                                                                                                                                                                                 |

## [connections](https://docs.moderntreasury.com/platform/reference/connections)

| Column Name          | Type        | Notes |
| -------------------- | ----------- | ----- |
| `__version__`        | `timestamp` |       |
| `created_at`         | `timestamp` |       |
| `discarded_at`       | `timestamp` |       |
| `id`                 | `string`    |       |
| `live_mode`          | `boolean`   |       |
| `organization_id`    | `string`    |       |
| `raw_json`           | `json`      |       |
| `updated_at`         | `timestamp` |       |
| `vendor_customer_id` | `string`    |       |
| `vendor_id`          | `string`    |       |
| `vendor_name`        | `string`    |       |

## [counterparties](https://docs.moderntreasury.com/platform/reference/counterparty-object)

| Column Name              | Type        | Notes |
| ------------------------ | ----------- | ----- |
| `__version__`            | `timestamp` |       |
| `created_at`             | `timestamp` |       |
| `discarded_at`           | `timestamp` |       |
| `email`                  | `string`    |       |
| `id`                     | `string`    |       |
| `live_mode`              | `boolean`   |       |
| `metadata_json`          | `json`      |       |
| `name`                   | `string`    |       |
| `organization_id`        | `string`    |       |
| `raw_json`               | `json`      |       |
| `send_remittance_advice` | `boolean`   |       |
| `updated_at`             | `timestamp` |       |
| `verification_status`    | `string`    |       |
| `external_id`            | `string`    |       |

## [events](https://docs.moderntreasury.com/platform/reference/events)

| Column Name       | Type        | Notes |
| ----------------- | ----------- | ----- |
| `__version__`     | `timestamp` |       |
| `data`            | `json`      |       |
| `event`           | `string`    |       |
| `event_time`      | `timestamp` |       |
| `id`              | `string`    |       |
| `live_mode`       | `boolean`   |       |
| `organization_id` | `string`    |       |
| `resource`        | `string`    |       |
| `resource_id`     | `string`    |       |

## [expected\_payments](https://docs.moderntreasury.com/platform/reference/expected-payment-object)

| Column Name              | Type        | Notes |
| ------------------------ | ----------- | ----- |
| `__version__`            | `timestamp` |       |
| `counterparty_id`        | `string`    |       |
| `created_at`             | `timestamp` |       |
| `currency`               | `string`    |       |
| `description`            | `string`    |       |
| `direction`              | `string`    |       |
| `id`                     | `string`    |       |
| `internal_account_id`    | `string`    |       |
| `ledger_transaction_id`  | `string`    |       |
| `live_mode`              | `boolean`   |       |
| `organization_id`        | `string`    |       |
| `raw_json`               | `json`      |       |
| `reconciliation_method`  | `string`    |       |
| `remittance_information` | `string`    |       |
| `statement_descriptor`   | `string`    |       |
| `status`                 | `string`    |       |
| `updated_at`             | `timestamp` |       |
| `external_id`            | `string`    |       |

## [external\_accounts](https://docs.moderntreasury.com/platform/reference/external-account-object)

| Column Name           | Type        | Notes |
| --------------------- | ----------- | ----- |
| `__version__`         | `timestamp` |       |
| `account_type`        | `string`    |       |
| `counterparty_id`     | `string`    |       |
| `created_at`          | `timestamp` |       |
| `discarded_at`        | `timestamp` |       |
| `id`                  | `string`    |       |
| `live_mode`           | `boolean`   |       |
| `name`                | `string`    |       |
| `organization_id`     | `string`    |       |
| `party_name`          | `string`    |       |
| `party_type`          | `string`    |       |
| `raw_json`            | `json`      |       |
| `updated_at`          | `timestamp` |       |
| `verification_status` | `string`    |       |
| `external_id`         | `string`    |       |

## [holds](https://docs.moderntreasury.com/platform/reference/holds/)

| Column Name       | Type        | Notes |
| :---------------- | :---------- | :---- |
| `__version__`     | `timestamp` |       |
| `id`              | `string`    |       |
| `live_mode`       | `boolean`   |       |
| `status`          | `string`    |       |
| `organization_id` | `string`    |       |
| `target_type`     | `string`    |       |
| `target_id`       | `string`    |       |
| `reason`          | `string`    |       |
| `resolution`      | `string`    |       |
| `resolved_at`     | `timestamp` |       |
| `created_at`      | `timestamp` |       |
| `updated_at`      | `timestamp` |       |
| `metadata_json`   | `json`      |       |

## [incoming\_payment\_details](https://docs.moderntreasury.com/platform/reference/incoming-payment-detail-object)

| Column Name                  | Type        | Notes                                                                                     |
| ---------------------------- | ----------- | ----------------------------------------------------------------------------------------- |
| `__version__`                | `timestamp` |                                                                                           |
| `amount`                     | `bigint`    |                                                                                           |
| `as_of_date`                 | `date`      |                                                                                           |
| `created_at`                 | `timestamp` |                                                                                           |
| `currency`                   | `string`    |                                                                                           |
| `data`                       | `json`      |                                                                                           |
| `direction`                  | `string`    |                                                                                           |
| `id`                         | `string`    |                                                                                           |
| `internal_account_id`        | `string`    |                                                                                           |
| `ledger_transaction_id`      | `string`    |                                                                                           |
| `live_mode`                  | `boolean`   |                                                                                           |
| `organization_id`            | `string`    |                                                                                           |
| `raw_json`                   | `json`      |                                                                                           |
| `status`                     | `string`    |                                                                                           |
| `updated_at`                 | `timestamp` |                                                                                           |
| `vendor_id`                  | `string`    |                                                                                           |
| `virtual_account_id`         | `string`    |                                                                                           |
| `reconciliation_status_text` | `string`    | Do not use `reconciliation_status` - if you are, please drop it from your data warehouse. |

## [internal\_accounts](https://docs.moderntreasury.com/platform/reference/internal-account-object)

| Column Name         | Type        | Notes |
| ------------------- | ----------- | ----- |
| `__version__`       | `timestamp` |       |
| `account_type`      | `string`    |       |
| `counterparty_id`   | `string`    |       |
| `created_at`        | `timestamp` |       |
| `currency`          | `string`    |       |
| `id`                | `string`    |       |
| `live_mode`         | `boolean`   |       |
| `name`              | `string`    |       |
| `organization_id`   | `string`    |       |
| `parent_account_id` | `string`    |       |
| `party_name`        | `string`    |       |
| `party_type`        | `string`    |       |
| `raw_json`          | `json`      |       |
| `updated_at`        | `timestamp` |       |

## [invoice\_line\_items](https://docs.moderntreasury.com/platform/reference/invoice-line-items)

| Column Name       | Type        | Notes |
| ----------------- | ----------- | ----- |
| `__version__`     | `timestamp` |       |
| `amount`          | `decimal`   |       |
| `created_at`      | `timestamp` |       |
| `description`     | `string`    |       |
| `direction`       | `string`    |       |
| `id`              | `string`    |       |
| `invoice_id`      | `string`    |       |
| `live_mode`       | `boolean`   |       |
| `name`            | `string`    |       |
| `organization_id` | `string`    |       |
| `quantity`        | `decimal`   |       |
| `raw_json`        | `json`      |       |
| `unit_amount`     | `decimal`   |       |
| `updated_at`      | `timestamp` |       |

## [invoices](https://docs.moderntreasury.com/platform/reference/invoices)

| Column Name                    | Type        | Notes |
| ------------------------------ | ----------- | ----- |
| `__version__`                  | `timestamp` |       |
| `counterparty_id`              | `string`    |       |
| `created_at`                   | `timestamp` |       |
| `currency`                     | `string`    |       |
| `description`                  | `string`    |       |
| `due_date`                     | `timestamp` |       |
| `id`                           | `string`    |       |
| `live_mode`                    | `boolean`   |       |
| `notification_email_addresses` | `string`    |       |
| `notifications_enabled`        | `boolean`   |       |
| `number`                       | `string`    |       |
| `organization_id`              | `string`    |       |
| `originating_account_id`       | `string`    |       |
| `payment_effective_date`       | `date`      |       |
| `payment_method`               | `string`    |       |
| `payment_type`                 | `string`    |       |
| `raw_json`                     | `json`      |       |
| `receiving_account_id`         | `string`    |       |
| `status`                       | `string`    |       |
| `total_amount`                 | `decimal`   |       |
| `updated_at`                   | `timestamp` |       |

## ledger\_account\_categories

| Column Name         | Type        | Notes |
| ------------------- | ----------- | ----- |
| `__version__`       | `timestamp` |       |
| `created_at`        | `timestamp` |       |
| `currency`          | `string`    |       |
| `currency_exponent` | `integer`   |       |
| `description`       | `string`    |       |
| `discarded_at`      | `timestamp` |       |
| `external_id`       | `string`    |       |
| `id`                | `string`    |       |
| `ledger_id`         | `string`    |       |
| `live_mode`         | `boolean`   |       |
| `metadata_json`     | `json`      |       |
| `name`              | `string`    |       |
| `normal_balance`    | `string`    |       |
| `organization_id`   | `string`    |       |
| `updated_at`        | `timestamp` |       |

## ledger\_account\_parent\_categorizations

| Column Name                  | Type        | Notes |
| ---------------------------- | ----------- | ----- |
| `created_at`                 | `timestamp` |       |
| `depth`                      | `integer`   |       |
| `id`                         | `string`    |       |
| `ledger_account_category_id` | `string`    |       |
| `ledger_account_id`          | `string`    |       |
| `ledger_id`                  | `string`    |       |
| `live_mode`                  | `boolean`   |       |
| `organization_id`            | `string`    |       |
| `updated_at`                 | `timestamp` |       |

## [ledger\_account\_settlements](https://docs.moderntreasury.com/platform/reference/ledger-account-settlements)

| Column Name                  | Type        | Notes |
| ---------------------------- | ----------- | ----- |
| `__version__`                | `timestamp` |       |
| `amount`                     | `decimal`   |       |
| `contra_ledger_account_id`   | `string`    |       |
| `created_at`                 | `timestamp` |       |
| `currency`                   | `string`    |       |
| `currency_exponent`          | `integer`   |       |
| `description`                | `string`    |       |
| `effective_at_upper_bound`   | `timestamp` |       |
| `id`                         | `string`    |       |
| `ledger_id`                  | `string`    |       |
| `ledger_transaction_id`      | `string`    |       |
| `live_mode`                  | `boolean`   |       |
| `metadata_json`              | `json`      |       |
| `organization_id`            | `string`    |       |
| `settled_ledger_account_id`  | `string`    |       |
| `settlement_entry_direction` | `string`    |       |
| `status`                     | `string`    |       |
| `updated_at`                 | `timestamp` |       |

## [ledger\_accounts](https://docs.moderntreasury.com/platform/reference/ledger-account-object)

| Column Name         | Type        | Notes |
| ------------------- | ----------- | ----- |
| `__version__`       | `timestamp` |       |
| `created_at`        | `timestamp` |       |
| `currency`          | `string`    |       |
| `currency_exponent` | `integer`   |       |
| `description`       | `string`    |       |
| `discarded_at`      | `timestamp` |       |
| `external_id`       | `string`    |       |
| `id`                | `string`    |       |
| `ledger_id`         | `string`    |       |
| `live_mode`         | `boolean`   |       |
| `metadata_json`     | `json`      |       |
| `name`              | `string`    |       |
| `normal_balance`    | `string`    |       |
| `organization_id`   | `string`    |       |
| `updated_at`        | `timestamp` |       |

## [ledger\_entries](https://docs.moderntreasury.com/platform/reference/ledger-entry-object)

| Column Name                   | Type        | Notes                                                                                                                                   |
| ----------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `__version__`                 | `timestamp` |                                                                                                                                         |
| `amount_decimal`              | `decimal`   | As in our API, Ledger Entry amounts are reported as integers denominated in the currency's smallest unit (e.g. cents for USD accounts). |
| `created_at`                  | `timestamp` |                                                                                                                                         |
| `direction`                   | `string`    |                                                                                                                                         |
| `discarded_at`                | `timestamp` |                                                                                                                                         |
| `discarded_at_lock_version`   | `bigint`    |                                                                                                                                         |
| `effective_at`                | `timestamp` |                                                                                                                                         |
| `id`                          | `string`    |                                                                                                                                         |
| `ledger_account_id`           | `string`    |                                                                                                                                         |
| `ledger_account_lock_version` | `bigint`    |                                                                                                                                         |
| `ledger_account_payout_id`    | `string`    |                                                                                                                                         |
| `ledger_transaction_id`       | `string`    |                                                                                                                                         |
| `live_mode`                   | `boolean`   |                                                                                                                                         |
| `metadata_json`               | `json`      |                                                                                                                                         |
| `organization_id`             | `string`    |                                                                                                                                         |
| `pending_credits`             | `decimal`   |                                                                                                                                         |
| `pending_debits`              | `decimal`   |                                                                                                                                         |
| `posted_credits`              | `decimal`   |                                                                                                                                         |
| `posted_debits`               | `decimal`   |                                                                                                                                         |
| `status`                      | `string`    |                                                                                                                                         |
| `updated_at`                  | `timestamp` |                                                                                                                                         |

## [ledger\_transactions](https://docs.moderntreasury.com/platform/reference/ledger-transaction-object)

| Column Name                      | Type        | Notes                                                                                                                        |
| -------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `__version__`                    | `timestamp` |                                                                                                                              |
| `created_at`                     | `timestamp` |                                                                                                                              |
| `description`                    | `string`    |                                                                                                                              |
| `effective_at`                   | `timestamp` |                                                                                                                              |
| `effective_date`                 | `date`      | **Deprecated - prefer `effective_at`**. Represents the time at which the ledger transaction happened for reporting purposes. |
| `external_id`                    | `string`    |                                                                                                                              |
| `id`                             | `string`    |                                                                                                                              |
| `ledger_id`                      | `string`    |                                                                                                                              |
| `ledgerable_id`                  | `string`    |                                                                                                                              |
| `ledgerable_type`                | `string`    |                                                                                                                              |
| `live_mode`                      | `boolean`   |                                                                                                                              |
| `metadata_json`                  | `json`      |                                                                                                                              |
| `organization_id`                | `string`    |                                                                                                                              |
| `posted_at`                      | `timestamp` |                                                                                                                              |
| `reverses_ledger_transaction_id` | `string`    |                                                                                                                              |
| `status`                         | `string`    |                                                                                                                              |
| `updated_at`                     | `timestamp` |                                                                                                                              |
| `archived_reason`                | `string`    |                                                                                                                              |

## [ledgers](https://docs.moderntreasury.com/platform/reference/ledger-object)

| Column Name       | Type        | Notes |
| ----------------- | ----------- | ----- |
| `created_at`      | `timestamp` |       |
| `currency`        | `string`    |       |
| `description`     | `string`    |       |
| `discarded_at`    | `timestamp` |       |
| `id`              | `string`    |       |
| `live_mode`       | `boolean`   |       |
| `metadata_json`   | `json`      |       |
| `name`            | `string`    |       |
| `organization_id` | `string`    |       |
| `updated_at`      | `timestamp` |       |

## [line\_items](https://docs.moderntreasury.com/platform/reference/line-item-object)

| Column Name              | Type        | Notes |
| ------------------------ | ----------- | ----- |
| `__version__`            | `timestamp` |       |
| `accounting_category_id` | `string`    |       |
| `amount`                 | `bigint`    |       |
| `created_at`             | `timestamp` |       |
| `description`            | `string`    |       |
| `id`                     | `string`    |       |
| `itemizable_id`          | `string`    |       |
| `itemizable_type`        | `string`    |       |
| `live_mode`              | `boolean`   |       |
| `organization_id`        | `string`    |       |
| `raw_json`               | `json`      |       |
| `updated_at`             | `timestamp` |       |

## [payment\_orders](https://docs.moderntreasury.com/platform/reference/payment-order-object)

| Column Name                             | Type        | Notes |
| :-------------------------------------- | :---------- | :---- |
| `__version__`                           | `timestamp` |       |
| `accounting_category_id`                | `string`    |       |
| `amount`                                | `bigint`    |       |
| `charge_bearer`                         | `string`    |       |
| `counterparty_id`                       | `string`    |       |
| `created_at`                            | `timestamp` |       |
| `currency`                              | `string`    |       |
| `description`                           | `string`    |       |
| `direction`                             | `string`    |       |
| `effective_date`                        | `date`      |       |
| `expires_at`                            | `timestamp` |       |
| `external_id`                           | `string`    |       |
| `foreign_exchange_contract`             | `string`    |       |
| `foreign_exchange_indicator`            | `string`    |       |
| `id`                                    | `string`    |       |
| `ledger_transaction_id`                 | `string`    |       |
| `live_mode`                             | `boolean`   |       |
| `nsf_protected`                         | `boolean`   |       |
| `organization_id`                       | `string`    |       |
| `originating_account_id`                | `string`    |       |
| `originating_party_name`                | `string`    |       |
| `priority`                              | `string`    |       |
| `purpose`                               | `string`    |       |
| `raw_json`                              | `json`      |       |
| `receiving_account_id`                  | `string`    |       |
| `receiving_account_type`                | `string`    |       |
| `remittance_information`                | `string`    |       |
| `send_remittance_advice`                | `boolean`   |       |
| `statement_descriptor`                  | `string`    |       |
| `status`                                | `string`    |       |
| `transaction_monitoring_enabled`        | `boolean`   |       |
| `type`                                  | `string`    |       |
| `ultimate_originating_party_identifier` | `string`    |       |
| `ultimate_originating_party_name`       | `string`    |       |
| `ultimate_receiving_party_identifier`   | `string`    |       |
| `ultimate_receiving_party_name`         | `string`    |       |
| `updated_at`                            | `timestamp` |       |
| `reconciliation_status`                 | `string`    |       |

## [payment\_references](https://docs.moderntreasury.com/platform/reference/payment-reference-object)

| Column Name             | Type        | Notes |
| ----------------------- | ----------- | ----- |
| `__version__`           | `timestamp` |       |
| `created_at`            | `timestamp` |       |
| `id`                    | `string`    |       |
| `live_mode`             | `boolean`   |       |
| `organization_id`       | `string`    |       |
| `raw_json`              | `json`      |       |
| `reference_number`      | `string`    |       |
| `reference_number_type` | `string`    |       |
| `referenceable_id`      | `string`    |       |
| `referenceable_type`    | `string`    |       |
| `updated_at`            | `timestamp` |       |

## [returns](https://docs.moderntreasury.com/platform/reference/return-object)

| Column Name              | Type        | Notes |
| :----------------------- | :---------- | :---- |
| `__version__`            | `timestamp` |       |
| `additional_information` | `string`    |       |
| `amount`                 | `bigint`    |       |
| `code`                   | `string`    |       |
| `created_at`             | `timestamp` |       |
| `currency`               | `string`    |       |
| `date_of_death`          | `date`      |       |
| `discarded_at`           | `timestamp` |       |
| `failure_reason`         | `string`    |       |
| `id`                     | `string`    |       |
| `internal_account_id`    | `string`    |       |
| `ledger_transaction_id`  | `string`    |       |
| `live_mode`              | `boolean`   |       |
| `organization_id`        | `string`    |       |
| `raw_json`               | `json`      |       |
| `reason`                 | `string`    |       |
| `returnable_id`          | `string`    |       |
| `returnable_type`        | `string`    |       |
| `role`                   | `string`    |       |
| `status`                 | `string`    |       |
| `updated_at`             | `timestamp` |       |
| `reconciliation_status`  | `string`    |       |

## [reversals](https://docs.moderntreasury.com/platform/reference/reversals)

| Column Name             | Type        | Notes |
| :---------------------- | :---------- | :---- |
| `__version__`           | `timestamp` |       |
| `created_at`            | `timestamp` |       |
| `id`                    | `string`    |       |
| `live_mode`             | `boolean`   |       |
| `organization_id`       | `string`    |       |
| `payment_order_id`      | `string`    |       |
| `raw_json`              | `json`      |       |
| `reason`                | `string`    |       |
| `status`                | `string`    |       |
| `updated_at`            | `timestamp` |       |
| `reconciliation_status` | `string`    |       |

## [transaction\_line\_items](https://docs.moderntreasury.com/platform/reference/transaction-line-item-object)

| Column Name                  | Type        | Notes |
| ---------------------------- | ----------- | ----- |
| `__version__`                | `timestamp` |       |
| `amount`                     | `bigint`    |       |
| `counterparty_id`            | `string`    |       |
| `created_at`                 | `timestamp` |       |
| `description`                | `string`    |       |
| `discarded_at`               | `timestamp` |       |
| `expected_payment_id`        | `string`    |       |
| `id`                         | `string`    |       |
| `live_mode`                  | `boolean`   |       |
| `organization_id`            | `string`    |       |
| `reconciliation_group_id`    | `string`    |       |
| `transactable_id`            | `string`    |       |
| `transactable_type`          | `string`    |       |
| `transaction_id`             | `string`    |       |
| `transaction_line_item_type` | `string`    |       |
| `updated_at`                 | `timestamp` |       |

## [transactions](https://docs.moderntreasury.com/platform/reference/transaction-object)

| Column Name           | Type        | Notes                                                                                                                                                                                                                                                                                                                                                            |
| --------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `__version__`         | `timestamp` |                                                                                                                                                                                                                                                                                                                                                                  |
| `amount`              | `bigint`    |                                                                                                                                                                                                                                                                                                                                                                  |
| `as_of_date`          | `date`      |                                                                                                                                                                                                                                                                                                                                                                  |
| `as_of_datetime`      | `timestamp` | **Deprecated - prefer `as_of_date` and `as_of_time`**. Represents the bank-reported effective datetime for the Transaction. Due to a known bug, this value is currently expressed as a UTC timestamp. A value of "2024-09-01T01:00:00Z" should be understood to indicate that the Transaction was effective as of "2024-09-01 01:00:00" in the bank's time zone. |
| `as_of_time`          | `string`    |                                                                                                                                                                                                                                                                                                                                                                  |
| `created_at`          | `timestamp` |                                                                                                                                                                                                                                                                                                                                                                  |
| `currency`            | `string`    |                                                                                                                                                                                                                                                                                                                                                                  |
| `details`             | `json`      |                                                                                                                                                                                                                                                                                                                                                                  |
| `direction`           | `string`    |                                                                                                                                                                                                                                                                                                                                                                  |
| `discarded_at`        | `timestamp` |                                                                                                                                                                                                                                                                                                                                                                  |
| `id`                  | `string`    |                                                                                                                                                                                                                                                                                                                                                                  |
| `internal_account_id` | `string`    |                                                                                                                                                                                                                                                                                                                                                                  |
| `live_mode`           | `boolean`   |                                                                                                                                                                                                                                                                                                                                                                  |
| `organization_id`     | `string`    |                                                                                                                                                                                                                                                                                                                                                                  |
| `posted`              | `boolean`   |                                                                                                                                                                                                                                                                                                                                                                  |
| `raw_json`            | `json`      |                                                                                                                                                                                                                                                                                                                                                                  |
| `reconciled`          | `boolean`   |                                                                                                                                                                                                                                                                                                                                                                  |
| `updated_at`          | `timestamp` |                                                                                                                                                                                                                                                                                                                                                                  |
| `vendor_code`         | `string`    |                                                                                                                                                                                                                                                                                                                                                                  |
| `vendor_code_type`    | `string`    |                                                                                                                                                                                                                                                                                                                                                                  |
| `vendor_customer_id`  | `string`    |                                                                                                                                                                                                                                                                                                                                                                  |
| `vendor_description`  | `string`    |                                                                                                                                                                                                                                                                                                                                                                  |
| `vendor_id`           | `string`    |                                                                                                                                                                                                                                                                                                                                                                  |

## [virtual\_accounts](https://docs.moderntreasury.com/platform/reference/virtual-account-object)

| Column Name                | Type        | Notes |
| -------------------------- | ----------- | ----- |
| `__version__`              | `timestamp` |       |
| `counterparty_id`          | `string`    |       |
| `created_at`               | `timestamp` |       |
| `credit_ledger_account_id` | `string`    |       |
| `debit_ledger_account_id`  | `string`    |       |
| `description`              | `string`    |       |
| `discarded_at`             | `timestamp` |       |
| `id`                       | `string`    |       |
| `internal_account_id`      | `string`    |       |
| `live_mode`                | `boolean`   |       |
| `metadata_json`            | `json`      |       |
| `name`                     | `string`    |       |
| `organization_id`          | `string`    |       |
| `raw_json`                 | `json`      |       |
| `updated_at`               | `timestamp` |       |