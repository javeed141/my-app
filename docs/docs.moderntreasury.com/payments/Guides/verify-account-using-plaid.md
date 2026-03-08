# Verify account using Plaid

Modern Treasury and Plaid have partnered to enable our mutual customers to use Plaid to authenticate and collect bank account details without ever touching sensitive data like bank account numbers.

To use Plaid with Modern Treasury, first follow the instructions on Plaid's [docs](https://plaid.com/docs/modern-treasury/). These will walk you through how to use Plaid to get a `processor_token` for your counterparty. Ultimately, you will get a response from Plaid that looks like what is below.

```json Sample Plaid Response
{
  "processor_token": "processor-sandbox-0asd1-a92nc",
  "request_id": "[Unique request ID]"
}
```

The `processor_token` corresponds to the user's bank account that was just connected with Plaid. The token can be passed to Modern Treasury when creating the external account on a counterparty. Modern Treasury will then pull the bank details from Plaid directly. If there is an error, the request will fail.

```curl Creating a Counterparty with a Plaid Processor Token
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/counterparties \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Jane Doe",
    "accounts": [
      {
        "plaid_processor_token": "processor-sandbox-0asd1-a92nc"
      }
    ]
  }'
```

This request will create a Counterparty with an External Account. The external account's banking information will have been automatically pulled from Plaid via their [Plaid Auth](https://plaid.com/docs/auth/) product. The External Account's verification status will be `verified`.

Once the Counterparty has been created, Payment Orders can be created that use the Counterparty's external account ID. To see how to do this, follow the instructions in our Payments quickstart tutorial under [Create a Counterparty](/payments/docs/quickstart?tab=API#3-create-a-counterparty).

## Using Plaid Identity

Plaid offers a product called [Identity](https://plaid.com/docs/identity/) that provides additional information about your user's connected bank accounts. Plaid Auth will only provide the minimum set of information required to pay a counterparty, which is their account number, routing number, and account type. Although this is generally all that is needed to initiate payments, it can be helpful to also have the identity information on a bank account. For example, address information are required for checks and wires. Through our integration with Plaid Identity, Modern Treasury can pull your counterparty's name and address associated with the bank account.

We do not enable Plaid Identity by default because this is an additional charge from Plaid. If you would like to leverage Plaid Identity, visit the [Integrations](https://app.moderntreasury.com/settings/integrations) page and enable the integration in your Plaid Settings section. Once it is turned on, Plaid Identity will automatically be used for all counterparties created with processor tokens.

## How to handle a Plaid item that needs to be refreshed

When you use Plaid to connect to your counterparty's bank accounts (which Plaid calls "items"), the connections may get into an invalid state. This could happen if a user changed their password or 2FA code, for example.

If you are only using Modern Treasury's Plaid integration to pull banking details from Plaid, there is nothing you have to do. Modern Treasury has already recorded the user's banking information as an `external_account`.

However, if you are using the [NSF protection feature](https://www.moderntreasury.com/journal/nsf-protection-for-ach-debits-with-plaid), you must refresh the connection to the item through Plaid. While the Plaid item connection is invalid, Modern Treasury will be unable to pull balances via Plaid and you may see the `nsf_deferment` or `nsf_plaid_error_but_processing` [webhooks](/platform/reference/payment-orders) on your payment order.

Another exception is if your bank is Chase. Since Chase uses tokenized account numbers (TAN) ([explained here](https://plaid.com/docs/api/products/auth/#auth-get-response-numbers-ach)), you should have a refreshing process in place. For more information, see the [Plaid docs](https://plaid.com/docs/link/oauth/#managing-consent-revocation).

When Plaid's connection to an item gets into an invalid state, Plaid will prompt you to refresh the link. The item will have entered the state `ITEM_LOGIN_REQUIRED` , and Plaid will notify you via a [webhook](https://plaid.com/docs/#item-webhooks). To refresh the connection, you can use Plaid Link in update mode to prompt the user to update authentication information, per the instructions [here](https://plaid.com/docs/#updating-items-via-link).

Once the user has reauthenticated their account, you will be able to use the original access and processor tokens again. Plaid does not require you to rotate these tokens when an item is reconnected as it is the same underlying item.

## Bank account type support

Our integration with Plaid supports pulling data for both US and non-US bank accounts, both in live and test mode. For reference, here is Plaid's [documentation](https://plaid.com/docs/auth/) about the types of auth data they provide. Specifically, we pull the following information.

**US bank accounts for ACH/wire**

* Account Number
* Routing Number
* Wire Routing Number (if present)

**Canadian bank accounts for EFT**

* Account Number
* Routing Number

**UK bank accounts for Bacs**

* Account Number
* Sort Code

**International bank accounts for SEPA and SWIFT wires**

* IBAN Number
* SWIFT Code