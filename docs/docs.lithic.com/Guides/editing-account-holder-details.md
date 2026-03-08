# Editing Account Holder Details

Lithic has expanded our capabilities to update information on existing account holders. In order to introduce new functionality while continuing support for our existing [Update Account Holder Information](https://docs.lithic.com/reference/patchaccountholder) endpoint we have two ways the information can be submitted.

> 📘 Both formats below will be supported for the time being, however all clients should update to the newest format for additional functionality.

## Legacy Format

This format only allows you to update the account holders `email` or `phone_number`. It also allows you to enroll a KYC Exempt account holder to a `business_account_token`.

```Text Request
{
  "business_account_token": "string",
  "email": "string",
  "phone_number": "string",
  }
```

```Text Response
{
  "business_account_token": "string",
  "email": "string",
  "phone_number": "string",
  "token": "string"
}
```

<br />

## Updated Format

This format will allow you to edit all fields for an individual account holder or business account holder, including the existing beneficial owners and control person.

To use this endpoint the associated `entity_token` **must** be presented in the request. You only need to submit data items you wish to update, for example if you need to update an individual's last name you would provide the individual's `entity_token` and the `last_name` field only.

For a business account holder you are able to update the business details, the beneficial owner details, and/or control person in one request by providing each `entity_token` and the associated fields you need to update.

If Lithic is performing KYC or KYB on the account holder we will resubmit the user's updated details to be re-screened. The account holder will then be approved or Lithic will return current failure reasons to remedy. The account holder can then provide documentation for review.

Currently, if Lithic is performing KYC or KYB (`KYB_BASIC`) and the account holder status is `APPROVED` their details are not able to be edited. If the account holder is `KYC_EXEMPT`, `KYC_BYO`, or `KYB_BYO` the information is able to be edited at any time during the account holder's lifecycle.

```Text Request
{
    "nature_of_business": "string",
    "website_url": "url",
    "beneficial_owner_individuals": [
        {
            "entity_token": "uuid",
            "address": object,
            "dob": "date",
            "email": "string",
            "first_name": "string",
            "government_id": "string",
            "last_name": "string",
            "phone_number": "string"
        },
        {
	          ...
        }
    ],
    "business_entity": {
        "entity_token": "uuid",
        "address": object,
        "dba_business_name": "string",
        "email": "string",
        "government_id": "string",
        "legal_business_name": "string"
        "parent_company": "string",
        "phone_numbers": [
            "string",
            ...
        ],
    },
    "control_person": {
        "entity_token": "uuid",
        "address": object,
        "dob": "date",
        "email": "email",
        "first_name": "string",
        "government_id": "string",
        "last_name": "string",
        "phone_number": "string"
    },
    "individual": {
        "entity_token": "uuid",
        "address": object,
        "dob": "date",
        "email": "email",
        "first_name": "string",
        "government_id": "string",
        "last_name": "string",
        "phone_number": "string"
    }
}
```