# Counterparty Invitation Overview

A Counterparty Invitation is a branded experience you can use to easily collect counterparty and bank account details. The page is hosted at a unique URL on moderntreasury.com and can be initiated [in the dashboard](https://help.moderntreasury.com/hc/en-us/articles/360062457091-How-to-Collect-Counterparty-Account-Information) or  [using the API](https://docs.moderntreasury.com/payments/docs/collecting-bank-accounts).

Counterparty Invitations can be automatically sent by email to the counterparty's email address or you can generate the unique invitation URL using the API. You can then send the URL in an email yourself or redirect your user to the URL. You can also supply a redirect URL which will be used when the user has successfully completed the form.

You can listen to webhook events to respond when users complete counterparty invitations.

TAB-API

# Pre-Requisites

1. **Organization ID:** Found in your [developer settings](https://app.moderntreasury.com/developers)
2. **API Key:** Found in [API Keys](https://app.moderntreasury.com/developers/api_keys) in your developer settings
3. **Counterparty ID:** The ID of the counterparty to which to add an account

# 1. Send counterparty invite

Using the [Collect Account Details API](/platform/reference/collect-account-details), you can initiate a Counterparty invitation via API.

TAB-Dashboard

A Counterparty is an entity outside of your organization to send or receive money from. Upon creating your counterparty, you can send them an invitation so that they can provide their bank account details.

<Callout icon="🚧" theme="warn">
  Before sending an invitation you should know which country their bank account is in, so that you can request the correct information.
</Callout>

# Send a Counterparty Invitation

1. Login to Modern Treasury
2. Navigate to the [Counterparties](https://app.moderntreasury.com/counterparties) page
3. Search for and select the Counterparty you want to collect information from, or create a new one by clicking **Create New** in the top right corner
4. From the Counterparty's page, click the **Actions** dropdown menu and select **Send Invitation**
5. Select the information you need to collect
   1. *Keep in mind that bank accounts in different countries have different information, so you may need to resend an invitation if you don't ask for the correct fields initially*
6. Once you've set the desired fields, click **Invite** to send the invitation

After you complete this process the Counterparty will receive an email prompting them to input their account information. Once filled out, Modern Treasury will create an External Account associated with that Counterparty. From there, you can begin initiating Payment Orders with the Counterparty's bank account.

<Callout icon="📘" theme="info">
  Additionally, we highly recommend using Plaid or microdeposits to [verify the accounts](https://docs.moderntreasury.com/legacy/docs/verifying-bank-accounts) you are collecting to ensure accurate account information and to assist in avoiding returns, however, verifications are **not** required.
</Callout>