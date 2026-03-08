# Bulk Requests

A Bulk Request represents a request to asynchronously operate on a given resource in bulk. When creating a Bulk Request, Modern Treasury requires an `action_type`, a `resource_type` and an array of `resources`. Each item in `resources`  represents the input parameters for a single request to perform an `action_type` operation on `resource_type` resource.

For example, to create [Payment Orders](https://docs.moderntreasury.com/platform/reference/payment-order-object) in bulk, the `action_type` is `create`, the `resource_type` is `payment_order` and each item in the `resources` array has valid [create-payment-order-params](https://docs.moderntreasury.com/platform/reference/create-payment-order).

When processing a Bulk Request, Modern Treasury generates one [Bulk Result](https://docs.moderntreasury.com/platform/reference/bulk-results) for each row in the `resources` array. As each array item is processed, Modern Treasury moves the associated Bulk Result to either the `successful` or `failed` state, and increments summary result counts (`success_result_count`, `failed_result_count`) on the Bulk Request object accordingly. When all `resources` have been processed, Modern Treasury transitions the Bulk Request to the `completed` state.

Row-level processing results may be monitored or reviewed using the [List Bulk Results](https://docs.moderntreasury.com/platform/reference/list-bulk-results) API, by specifying the `request_type=bulk_request` and `requester_id=BULK_REQUEST_ID`.

Please be advised that certain parameters are not supported when using bulk requests for ledger transactions. Specifically, the following parameters cannot be included in bulk ledger transaction requests:
`ledger_entries.lock_version`, `ledger_entries.show_resulting_ledger_account_balances` , `ledger_entries.available_balance_amount` , `ledger_entries.posted_balance_amount`, `ledger_entries.pending_balance_amount`, `ledger_account_category_balance_locks`, `archive_on_balance_lock_failure`
These limitations are in place to ensure optimal performance when processing large volumes. For workflows requiring these parameters, we recommend using single API requests instead of bulk operations. For more information about synchronous and asynchronous processing of ledger entries see our [documentation on designing a ledger for concurrency](https://docs.moderntreasury.com/ledgers/docs/handle-concurrency)

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Attribute
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **id**
        *string*
      </td>

      <td>
        Unique identifier for the bulk request
      </td>
    </tr>

    <tr>
      <td>
        **action\_type**
        *string*
      </td>

      <td>
        The action to be performed with each item in the `resources` array.
        One of `create`, `update` or `delete`.
      </td>
    </tr>

    <tr>
      <td>
        **resource\_type**
        *string*
      </td>

      <td>
        The type of resource to being operated on. One of `payment_order`, `expected_payment`, `transaction`, `transaction_line_item`, `ledger_transaction` or `ledger_account`
      </td>
    </tr>

    <tr>
      <td>
        **status**
        *string*
      </td>

      <td>
        One of `pending`, `processing` or `completed`
      </td>
    </tr>

    <tr>
      <td>
        **total\_resource\_count**
        *int32*
      </td>

      <td>
        Total number of items in the `resources` array. Once a bulk request is `completed`, `success_result_count + failed_result_count` will be equal to `total_result_count`.
      </td>
    </tr>

    <tr>
      <td>
        **success\_result\_count**
        *int32*
      </td>

      <td>
        Total number of `successful` [bulk results](https://docs.moderntreasury.com/platform/reference/bulk-results) so far for this request
      </td>
    </tr>

    <tr>
      <td>
        **failed\_result\_count**
        *int32*
      </td>

      <td>
        Total number of `failed` [bulk results](https://docs.moderntreasury.com/platform/reference/bulk-results)  so far for this request
      </td>
    </tr>

    <tr>
      <td>
        **metadata**
        *object*
      </td>

      <td>
        Additional data represented as key-value pairs. Both the key and value must be strings. See [Metadata](https://docs.moderntreasury.com/platform/reference/metadata).
      </td>
    </tr>

    <tr>
      <td>
        **live\_mode**
        *boolean*
      </td>

      <td>
        This field will be `true` if this bulk request was created with a live API key or `false` if created with a sandbox API key.
      </td>
    </tr>
  </tbody>
</Table>

```json Bulk Request Example
{
  "id": "91c9117f-4855-419c-ad57-0801a58553d4",
  "object": "bulk_request",
  "live_mode": true,
  "action_type": "create",
  "resource_type": "payment_order",
  "status": "pending",
  "total_resource_count": 10,
  "success_result_count": 0,
  "failed_result_count": 0,
  "created_at": "2023-08-25T14:02:52Z",
  "updated_at": "2023-08-25T14:02:52Z"
}
```