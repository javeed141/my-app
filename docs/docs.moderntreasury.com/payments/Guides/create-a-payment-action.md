# Create a Payment Action

Payment Actions are a tool to trigger actions against a Payment Order or a payment that originates off platform. The overall behavior is similar to Payment Orders in that Payment Actions are an instruction that will be sent to the bank.

One of the main use cases for Payment Actions is Positive Pay for check payments. Using Payment Actions, you will be able to send Positive Pay commands to your bank to `issue` or `stop` check payments.

In order to send Payment Actions, the connection to your bank must be configured to support sending Payment Actions. Please reach out to [product@moderntreasury.com](mailto:product@moderntreasury.com) or your customer success manager for access.

Payment Actions can be created using either the Modern Treasury Dashboard or API.

# How to create a Payment Action using the Modern Treasury Dashboard

Payment Actions can either be created from a specific Payment Order or manually using a form. The following examples show how to create Positive Pay **Issue** and **Stop** Payment Actions, which only apply to **Check** Payments.

## Creating a Payment Action manually

1. Login to Modern Treasury
2. Navigate to the [Payments Overview](https://app.moderntreasury.com/payment_orders) page.
3. From the Create New dropdown menu, select Payment Action
4. Fill in the required fields.
   1. **Type**: Select **Issue** to inform the bank using Positive Pay that a check has been issued. Selecting **Stop** will inform the bank to not honor the check if it is cashed.
   2. **Internal Account**: Select the internal account that this action will be issued out of. The Connection associated with this account must be configured to support payment actions.
   3. **Amount**: Specify the amount of the check.
   4. **Currency**: Choose the currency that the amount is defined in.
   5. **Issue Date**: Select the date that check was issued.
   6. **Originating Account Number**: Include the originating account number.
   7. **Payee Name**: Include the name of the payee, or who the check was made out to.
5. If your bank requires other information to create a Positive Pay payment action, enter that information in the **Additional Details** section of the form. However, if these fields are required, we recommend creating the Payment Action directly from the Payment Order, which will automatically populate the required fields.
6. Once all information has been entered, click `Create Payment Action` to create the payment action.

## Creating a Stop Payment Action from a Payment Order

The following example describes how to issue a request to **Stop** a **Check** Payment Order.

> 📘 Note: Positive Pay payment actions can only be created from Payment Orders with a type of `check` and status of `sent`.

1. Login to Modern Treasury
2. Navigate to the [Payments Overview](https://app.moderntreasury.com/payment_orders) page.
3. Search for and select a **Check** Payment Order with a status of `sent`
4. From the **Actions** dropdown menu, **Select Stop Check Payment**. A modal will prompt for confirmation.
5. Select **Yes, stop this check** to confirm and submit your request. The Payment Action will be created and a request to stop the check will be sent to your bank.
6. If the bank processes the request successfully, the Payment Action will move to `acknowledged` and the associated Payment Order will be moved to `stopped`.

# How to create a Payment Action using the Modern Treasury API

For details on how to create payment actions using the Modern Treasury API, please refer to our [API Reference for Payment Actions](https://docs.moderntreasury.com/platform/reference/payment-actions).