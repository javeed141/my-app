# KYC/KYB Status

Learn how to check the status of a KYC or KYB evaluation.

After a KYC or KYB evaluation is submitted, you can either request the status of the submission or listen for the status of your submission via webhook.

# Check KYC/KYB Status

This endpoint is used to check the status of a KYC or KYB evaluation.

# Create Webhook for KYC/KYB Status

You can create a webhook to be notified of updates to the status of any in-process KYC or KYB evaluation. Calling this endpoint with a different URL will re-register the new URL and rotate the HMAC token.

Two specific use cases where we recommend the use of webhook updates are:

* **KYC workflows**: In the case where documents need to be submitted for verification, a webhook will notify you once the document upload status changes, or an `ACCEPTED` or `REJECTED` status for the KYC evaluation is available
* **KYB workflows**: All Basic KYB workflows will initially return a `PENDING_REVIEW` status, and a webhook will notify you once an `ACCEPTED` or `REJECTED` status is available

| Webhook type (`type`)                                                                                                                                        | Potential `status` values returned                                                                                                                                                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `verification`: Webhook content relates to the verification status of a KYC or KYB evaluation (i.e., the account was successfully or unsuccessfully created) | **`ACCEPTED`**: Status of a verification has been updated from `PENDING_DOCUMENT` to `ACCEPTED` (KYC use case) or `PENDING` to `ACCEPTED` (KYB use case) <br /><br /> **`REJECTED`**: Status of a verification has been updated from `PENDING_DOCUMENT` to `REJECTED` (KYC use case) or `PENDING_UPLOAD` to `REJECTED` (KYB use case) |
| `document_upload_front` or `document_upload_back`: Webhook content relates to the upload status of the front or back image of an identity document           | **`FAILED`**: Uploaded document has failed                                                                                                                                                                                                                                                                                            |