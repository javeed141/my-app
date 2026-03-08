# Send payments to brokerage accounts

At some point, you may need to send Payment Orders to brokerages to allow your users or customers to withdraw funds into their external investment accounts.

Whether you can send payments to brokerage accounts varies per brokerage, so it is important to validate that your brokerage institutions can receive the payment types you intend to send.

After you've confirmed you are able to send payments to these accounts, the brokerage institution will provide account and routing details along with additional **for further credit to** (or for final credit to) information that allows you to denote the end-user's account information. Following their instructions, you can create an External Account in Modern Treasury. When you're ready to make a payment, the additional "further credit" details should be placed in the remittance information in the Payment Order you send to the External Account representing the investment account.

## **Brokerage Payment Walkthrough**

To understand how to implement this use-case, let's walk through a step-by-step process followed by an example where we will originate a Payment Order to a brokerage account managed by Fidelity.

1. Confirm with the investment or brokerage institution whether the account can receive payments and if so, what types of payments it is enabled for, like ACH, wire, etc.
2. After confirming the account is enabled for payments, ask for payment instructions from these institutions. Often, these instructions exist publicly, as in the two examples below.

   * Example for [Sending a Wire to Fidelity](https://www.fidelity.com/cash-management/information-needed-wire-to-fidelity-account)
   * Example for [Sending a Wire to Schwab](https://www.schwab.com/public/file/P-12116714/mkt25455intl.pdf)
   * For our example, let's follow the Fidelity information and attempt to send a wire to a user's brokerage account.

   ![](https://files.readme.io/89c5c0c-image.png)

   <br />
3. Make a Counterparty and External Account in Modern Treasury, following the information above.

   * In the user interface, creating the Counterparty with a correctly formatted External Account may look like:

     ![](https://files.readme.io/cc3d097-image.png)

     ### Notes on Fields:

     * **Name on Account** (`party_name` in the External Account): Here, make sure to include the given name of the investment institution that will be sent a Payment Order. In Fidelity's information above, this is "National Financial Services LLC." Note that brokerage institutions format their information differently - this information will likely be found under "Account Name" or "For credit to" fields that is provided.
     * **Counterparty Type** (`party_type` in the External Account): This is an optional field that determines the default SEC Code sent for ACH payments. You can leave this blank, but note that an ACH payment sent to this account will default to CCD.
     * **Account Type** (`account_type` in the Account Details): This is an optional field that denotes the type of account, which affects ACH Payments. You can leave this blank, but note that an ACH payment sent to this account will default to checking.
     * **Address:** This is an optional field when creating an External Account, but it is required for wires. Please include this information if it is available.
4. Send a Payment Order to the created Counterparty / External Account and include all additional further credit information under `Remittance Information`. While many formats are acceptable when including further credit information, we recommend separating field names and values by colons and separating fields by semi-colons, like `{field_name}:{value}; {field_name}: {value}`. For our example, the Remittance Information would look like `For the benefit of: John Doe; For final credit to: 123456789`, as seen below.

   ![](https://files.readme.io/78e1b92-image.png)

   <br />

## **How to Store Further Credit Information for Programmatic Retrieval Using Modern Treasury's API**

Using Modern Treasury's [metadata](https://docs.moderntreasury.com/reference/metadata), you can store any further credit information in the External Account object to make scalable decisions in your payments integration.

While there are numerous ways to structure this solution, we have superficially outlined one example path below:

1. In your application's user interface or API, collect account information from your users, allowing them to submit investment account information. You will need to dynamically accept different fields depending on the institution they invest with.
2. When creating a Counterparty with an External Account that is a Brokerage Account via Modern Treasury's API, you can include `metadata` key-value pairs for the **For further credit to** or **For credit to** or **For the benefit of** information that the user has provided. Following our John Doe example, the payload may look like: Here, it may be useful to include an `is_brokerage` field to enable future filtering and querying in Modern Treasury. Note that metadata values must be UTF Strings.

   ![](https://files.readme.io/a9c04b7-image.png)

   <br />
3. Later, when creating a Payment Order programmatically, you can retrieve this information from the specific External Account's metadata, concatenate the fields together, and map the result into the `remittance_information` field. Using the `is_brokerage` field, you can conditionally include `remittance_information` predictably in [Create Payment Order API](https://docs.moderntreasury.com/reference/create-payment-order) requests. Note that with the example screenshot above, you will need to transform the object keys into the correct format, like from "for\_final\_credit" to "For final credit to," when including those fields in the `remittance_information`. You can also choose to label the keys "For\_final\_credit\_to" and replace underscores when concatenating.

The `metadata` solution helps distinguish which external accounts are brokerages so that you can make better decisions in the code and add `remittance_information` when needed.

If you have any questions on the above, please reach out to your Account Manager or contact Support at [support@moderntreasury.com](mailto:support@moderntreasury.com).