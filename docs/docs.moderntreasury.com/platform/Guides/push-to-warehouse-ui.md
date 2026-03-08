# Push to Warehouse UI

The [Push to Warehouse UI](https://app.moderntreasury.com/settings/push_to_warehouse/destinations) offers additional visibility into your push to warehouse integration. To access the UI, navigate to the `Push to Warehouse` section in Settings. From there, you can review your warehouse configuration as well as recent transfer details for up to 2 weeks.

## Transfer Statuses

| Status            | Description                                                                                                                                                                    |
| :---------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Pending`         | The transfer is enqueued but has not started.                                                                                                                                  |
| `Running`         | The transfer is currently in progress.                                                                                                                                         |
| `Partial Failure` | One or more resources completely failed to sync. Note that partial syncing is not supported for individual resources, so each resource will either succeed or fail completely. |
| `Error`           | The transfer failed, and no rows were transferred.                                                                                                                             |
| `Success`         | The transfer completed successfully without any errors.                                                                                                                        |