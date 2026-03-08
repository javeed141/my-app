# Card Accounts

Learn how to configure accounts in your card program to manage spend.

Account holders and (card) accounts currently have a 1:1 relationship. When an [account holder](https://docs.lithic.com/docs/account-holders) is successfully created, a account is also created.

# Account Configurations

**API Reference: [List accounts](https://docs.lithic.com/reference/getaccounts)**

Get details for all accounts. This endpoint can only be used for accounts that are managed by the program associated with the calling API key.

<br />

**API Reference: [Get account](https://docs.lithic.com/reference/getaccountbytoken)**

To get a default account's configuration, pass in `default` instead of an `account_token`.

<br />

**API Reference: [Update account](https://docs.lithic.com/reference/patchaccountbytoken)**

Update account configurations that impact transaction authorizations such as spend limits and account state. Only fields included in the request will be updated.

This endpoint can only be used for accounts that are managed by the program associated with the calling API key. Accounts that are in the `PAUSED` or `CLOSED` state will not be able to transact or create new cards.