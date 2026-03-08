# Invoice Notifications

Overview of invoice notification emails, the types of notifications, and the events that trigger them

You can enable notification emails for invoices to automatically keep interested parties up to date on the status of invoices. These notifications include:

* Emails to the invoice's counterparties when the invoice is first issued.
* Internal and external status change notifications sent to invoice notification subscribers and invoice counterparties.

To use invoice notifications, your organization needs to have email sending enabled. If you are not sure if email sending is enabled for your organization, contact [support](mailto:support@moderntreasury.com).

# Subscribing invoice notification groups

You can subscribe roles in your Modern Treasury organization to receive notification emails about invoices.

To subscribe the roles to Invoice notifications:

1. Confirm that email sending is enabled for your organization. (If you're not sure if it is enabled, contact support.)
2. Go to your organization's `Notifications` [settings page](https://app.moderntreasury.com/settings/notification_groups).
3. Subscribe roles by selecting them in the `Invoices` dropdown.

# Notification types

The following table shows which emails will be sent when an invoice's status changes when notifications are enabled.

| Invoice event (status)                                             | Invoice sender (internal) | Invoice notification subscribers (internal) | Receiving counterparty and additional emails (external) |
| :----------------------------------------------------------------- | :------------------------ | :------------------------------------------ | :------------------------------------------------------ |
| Invoice created (`draft`)                                          | :x:                       | :x:                                         | :x:                                                     |
| Invoice issued (`draft`→`unpaid`)                                  | :x:                       | :white\_check\_mark:                        | ✅                                                       |
| Invoice has a pending payment (`unpaid`→`payment_pending`)         | ✅                         | ✅                                           | ✅                                                       |
| Invoice payment failed (`payment_pending`→`unpaid`)                | ✅                         | ✅                                           | ✅                                                       |
| Invoice payment succeeded, paid in full (`payment_pending`→`paid`) | ✅                         | ✅                                           | ✅                                                       |
| Invoice voided (`voided`)                                          | ✅                         | ✅                                           | ✅                                                       |

* Note: The user that transitions an invoice to `unpaid` is the invoice sender and will receive these notification emails, regardless of who initially created the draft invoice. If the invoice is created with auto-advance, the invoice creator is the invoice sender.

# Internal notification email examples

The following are examples of what emails to internal recipients look like.

### Invoice issued

<Image align="center" border={true} width="500px" src="https://files.readme.io/c3c7bfc-Screenshot_2023-08-07_at_5.13.32_PM.png" className="border" />

### Invoice has a pending payment

<Image align="center" border={true} width="500px" src="https://files.readme.io/5604990-Screenshot_2023-08-07_at_5.15.51_PM.png" className="border" />

### Invoice's pending payment failed

<Image align="center" border={true} width="500px" src="https://files.readme.io/2febadf-Screenshot_2023-08-07_at_1.50.32_PM.png" className="border" />

### Invoice paid

<Image align="center" border={true} width="500px" src="https://files.readme.io/5417be8-Screenshot_2023-08-07_at_1.50.37_PM.png" className="border" />

### Invoice voided

<Image align="center" border={true} width="500px" src="https://files.readme.io/c1c5865-Screenshot_2023-08-07_at_1.51.47_PM.png" className="border" />

### Invoice Overdue

<Image align="center" border={false} width="500px" src="https://files.readme.io/fbded25-image.png" />

<br />

# External notification email examples

The following are examples of what emails to external recipients (i.e., invoice counterparties) look like.

### Invoice issued

<Image align="center" border={true} width="500px" src="https://files.readme.io/20481a7-Screenshot_2023-08-07_at_1.44.35_PM.png" className="border" />

### Invoice has a pending payment

<Image align="center" border={true} width="500px" src="https://files.readme.io/fb8b8e5-Screenshot_2023-08-07_at_1.43.44_PM.png" className="border" />

### Invoice's pending payment failed

<Image align="center" border={true} width="500px" src="https://files.readme.io/35284ca-Screenshot_2023-08-07_at_1.43.48_PM.png" className="border" />

### Invoice paid

<Image align="center" border={true} width="500px" src="https://files.readme.io/de92678-Screenshot_2023-08-07_at_1.43.31_PM.png" className="border" />

### Invoice voided

<Image align="center" border={false} width="00px" src="https://files.readme.io/f866b30-image.png" />

<Image align="center" border={false} width="500px" src="https://files.readme.io/fc5f141-image.png" />

### Invoice Overdue

<Image align="center" border={false} width="500px" src="https://files.readme.io/a265908-image.png" />