# Account Holders (Individuals)

Learn how to create an account holder object for individual end-users.

Account holders and accounts have a 1:1 relationship. When an account holder is successfully created, [an associated account](https://docs.lithic.com/docs/accounts) is also created.

Many programs require the account holder to go through a Know Your Customer (KYC) process to verify the identity of the individual. We support the following types of workflows for onboarding an individual:

* **`KYC_BYO`** allows an API user to bypass the Lithic KYC process and create an individual account (available only to users with KYC processes pre-approved by Lithic).  All PII data is required for auditing purposes.
* **`KYC_EXEMPT`** allows certain programs to enroll users as KYC-exempt. This includes programs whose account holders do not require any KYC or programs that wish to supplement business account holder objects with representations of individual cardholders. You can use the KYC-exempt workflow to create account holders. KYC-exempt allows an API user to pass in a smaller set of PII to create an account holder (available only to users approved by Lithic on a program by program basis).

# Create Individual Account Holders

The [Create an Individual or Business Account Holder](https://docs.lithic.com/reference/postaccountholders) endpoint is used to create an account holder and initiate the appropriate onboarding workflow.

If the program does not require KYC or the client is managing KYC outside of Lithic (`KYC_EXEMPT` or `KYC_BYO`) an associated `account_token` will be returned in the responses, which can then be used to issue cards.

<Callout icon="🚧" theme="warn">
  As a reminder, while using this endpoint is an important part of ensuring your card program is compliant with relevant government and banking regulations, you are responsible for all financial activity on api.lithic.com associated with your API key. This endpoint is intended to be used for KYC/KYB compliance purposes, and not as a comprehensive fraud solution.
</Callout>

## Potential Outcomes by Workflow Type

<Table>
  <thead>
    <tr>
      <th>
        Workflow
      </th>

      <th>
        Potential `status` values returned via this endpoint
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        KYC\_BYO
      </td>

      <td>
        * `ACCEPTED`: account holder creation was successful and both `account_holder_token` and `account_token` are returned
      </td>
    </tr>

    <tr>
      <td>
        KYC\_EXEMPT
      </td>

      <td>
        * `ACCEPTED`: account holder creation was successful and both `account_holder_token` and `account_token` are returned
      </td>
    </tr>
  </tbody>
</Table>

# Update Individual Account Holder

See [Edit Account Holder Details](https://docs.lithic.com/docs/editing-account-holder-details)

# Get Specific Account Holder

API Reference: [Get account holder](https://docs.lithic.com/reference/getaccountholder)

# Create Webhook Account Holders

We send three [types of events](https://docs.lithic.com/docs/types-of-events#event-types) related to accountholders via our [Events platform](https://docs.lithic.com/docs/events-api): `account_holder.created`, `account_holder.updated`, and `account_holder.verification`. You can also see examples of these three events in Sandbox using [Send Example Event Types](https://docs.lithic.com/reference/sendeventsubscriptionexample).