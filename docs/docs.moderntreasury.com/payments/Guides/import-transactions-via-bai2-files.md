# Import Transactions via BAI2 Files

<br />

> 📘 Early Access Features
>
> This is an Early Access feature

Importing [BAI2 files](https://www.moderntreasury.com/learn/bai2) is a good option for customers who need to reconcile transactions from banks not currently serviced by our [current set of bank integrations](https://www.moderntreasury.com/integrations). With this feature, you can create Transactions and Balance Reports for your Internal Accounts. BAI2 files can be imported via API or UI.

BAI2 files are imported to a specific `connection`. This resource allows Modern Treasury to connect a given set of BAI2 files being imported and a given bank. Before uploading BAI2 files, ensure both `connection` and `internal_account` are created:

* In the sandbox, you can use pre-configured connections found on your Settings page, under the [Connections tab](https://app.moderntreasury.com/settings/organization?section=Connections) (only visible in sandbox mode). These are created via the [Internal Accounts API](https://docs.moderntreasury.com/platform/reference/create-internal-account) or the Internal Account Page in the sandbox.
* For use in production, please work with your onboarding team to ensure the appropriate Internal Accounts and Connections are created.

If you upload the same BAI2 file multiple times, Modern Treasury will try to deduplicate pending transactions on a transaction level to avoid importing duplicate transactions. We encourage you to use an [Idempotency Key](https://docs.moderntreasury.com/platform/reference/idempotent-requests) for each file you import via the API to dedupe on a file level.

> 🚧 Returns
>
> Returns are reported by banks in files separate from BAI2, so therefore Modern Treasury cannot create [Return objects](/platform/reference/return-object) when BAI2 files are manually imported. Note that this only applies to manually imported BAI2 files and not managed read or write connections to banks that support return reporting.
>
> You will see transactions for the resulting money movement (e.g. debits from your account) as reported by the bank on the BAI2. It is recommended to create [Expected Payments](https://docs.moderntreasury.com/payments/docs/expected-payments) with the appropriate metadata to reconcile these types of return transactions.

# Import via API

Having confirmed that the Internal Accounts and Connections are set up, make a **multipart/form-data** POST request to the `/documents` endpoint with the following parameters.

`documentable_id` should be set to the Connection ID provided to you by your onboarding team (or available in the sandbox). `document_type` can be either `bai2_previous_day` or `bai2_intraday`, depending on the type BAI2 file you are uploading.

```Text JavaScript
POST https://app.moderntreasury.com/api/documents
{
   "documentable_type": "connection",
   "documentable_id": "CONNECTION_ID",
   "document_type": "bai2_previous_day",
   "file": PATH_TO_YOUR_BAI2_FILE
}
```

This will return a [Document API resource](https://docs.moderntreasury.com/platform/reference/document-object):

```Text JavaScript
{
   "id": "b05dd054-6eea-4cdd-9096-cf3fa8eb6fb7",
   "object": "document",
   "source": "customer",
   "document_type": "bai2_previous_day",
   "documentable_id": "00ddb900-317f-4436-8b79-6329c924ef27",
   "documentable_type": "connection",
   "file": {
      "size": 1558074,
      "filename": "mybai2file.txt",
   },
   "document_details": [],
   "live_mode": true,
   "created_at": "2023-06-20T15:58:59Z",
   "updated_at": "2023-06-20T15:58:59Z"
}
```

The ingestion process will start after the upload request is complete and Transactions and Balance Reports will show up for the configured Internal Accounts.

# Import via UI

**Note**: Ensure you have the Admin role in the Modern Treasury permissions system and that the Internal Accounts and Connections are set up for user-provided transactions.

To begin, go to the Cash Management tab under "Accounts" and click the blue "Upload Banks Files" button at the top right.

<Image align="center" border={false} src="https://files.readme.io/72cf454-Screenshot_2024-06-10_at_5.50.44_PM.png" />

You will see a file upload page, shown below. Select one of the preconfigured connections from the dropdown list.

**Note**: If you do not see any connections within the dropdown, please work with your onboarding team to create these connections.

<Image align="center" border={false} src="https://files.readme.io/6f70ad1-Screenshot_2023-10-04_at_1.48.05_PM.png" />

You can then upload your file and select File Type in the next dropdown. Attach as many documents as you need at once then click "Create Documents".

<Image align="center" border={false} src="https://files.readme.io/c9295ca-Screenshot_2023-10-04_at_1.48.40_PM.png" />

The documents will be created immediately and processed asynchronously. After a few minutes, you will see the Transactions and Account Balance Reports updated for your Internal Accounts.