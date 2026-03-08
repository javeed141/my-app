# Account Holders (Businesses/KYB)

Learn how to create an account holder object for businesses.  

Account holders and accounts have a 1:1 relationship. When an account holder is successfully created, [an associated account](https://docs.lithic.com/docs/accounts) is also created.

Lithic supports different workflows to allow for clients providing their own KYB (Know Your Business) or using Lithic's KYB services.

* `KYB_BASIC` \[beta] offers identity verification provided by Lithic. The business account and associated UBOs will be validated automatically and results will be returned through webhooks. Results needing more information will go to`PENDING_REVIEW` and will go through the below process.
* `KYB_DELEGATED` allows customers not using Lithic's KYB services or program management to be able to create business accounts with minimal required fields since verification is completed outside of Lithic's services.
* `KYB_BYO` \[deprecated] allows Program Managed clients an option to provide their own KYB verification, but requires all fields to be populated for audit purposes (available only to users with KYB processes pre-approved by Lithic).

If there are authorized users of a business account, the authorized users should be created using our [KYC-exempt workflow](https://docs.lithic.com/docs/account-holders-kyc#additional-fields-for-kyc-exempt-workflow). When creating the `KYC_EXEMPT` account holder the `business_account_token` should be populated to link the authorized user to the main business account holder.

# Create Business Account Holders for Lithic Managed KYB

This endpoint runs the entered business's information (i.e., account holder) through Know Your Business (KYB) checks, and creates an account holder object.

For program managed clients creating a new business account holder you’ll need to pass in `KYB_BASIC` for the `workflow` along with information for the `business_entity`, a description of the `nature_of_business`, the `control_person`, and the `beneficial_owner_individuals `if applicable. A `control_person` is always required. `beneficial_owner_individuals` is required to be submitted for any person that owns more than 25% of the company. If no one owns more than 25%, submitting`beneficial_owner_indviduals`is not required. Lithic will run the information and an associated `account_holder_token` and `account_token` are returned in the response, which can then be used to issue cards once the workflow indicates an `ACCEPTED` status.

If further verification is required Lithic will return a `status` of `PENDING_REVIEW` in the response; you will then be required to upload front and/or back scans of the required documents for review. Lithic will review the documents and the application result will be provided in the `account_holder.verification` event. To be notified of events see [Create Webhook for KYC/KYB Status](https://docs.lithic.com/docs/account-holders-kyb#create-webhook-for-kyckyb-status).

<Callout icon="🚧" theme="warn">
  As a reminder, while using this endpoint is an important part of ensuring your card program is compliant with relevant government and banking regulations, you are responsible for all financial activity on api.lithic.com associated with your API key. This endpoint is intended to be used for KYC/KYB compliance purposes, and not as a comprehensive fraud solution.
</Callout>

## KYB Workflow Details

1. Lithic client submits the required information with `KYB_BASIC` workflow via [Create an Individual or Business Account Holder](https://docs.lithic.com/reference/postaccountholders) endpoint
2. Lithic responds with ACCEPTED or PENDING\_REVIEW status for the account holder.
   1. `ACCEPTED` - KYB is complete and cards may be issued
   2. `PENDING_REVIEW` - Either the Business Entity, Beneficial Owner, and/or Control Person needs additional information.
3. For applications `PENDING_REVIEW` clients must submit the required documents. Use the [Get Account Holder ](https://docs.lithic.com/reference/getaccountholder)endpoint to return the `required_documents` for the account holder. Once the documents are ready for upload call the [Initiate Account Holder Document Upload ](https://docs.lithic.com/reference/postaccountholderdocuments)endpoint. Lithic will return URLs to be used to upload the documents.
4. Lithic will review the documentation and return an `APPROVE`, `REJECT`, or `PARTIAL_APPROVAL` for the failure reasons. An `account_holder_document.updated` event will be sent with the updated status. To be notified of events see [Create Webhook for KYC/KYB Status](https://docs.lithic.com/docs/account-holders-kyb#create-webhook-for-kyckyb-status).
5. If a document was rejected, you will be able to either upload the same type of document again (e.g. the document was blurry) or upload a new document that also satisfies the `status_reason` (e.g. the driver's license is expired so a passport could be used instead). Use the [Initiate Account Holder Document Upload](https://docs.lithic.com/reference/postaccountholderdocuments) endpoint to upload a new document type otherwise use the [Get Account Holder Document Upload ](https://docs.lithic.com/reference/getaccountholderdocumentbytoken)endpoint to generate a new upload link for the specified document.
6. Lithic will review the documentation and `APPROVE` or `REJECT` the document. An `account_holder_document.updated` event will be sent with the updated status. To be notified of events see [Create Webhook for KYC/KYB Status](https://docs.lithic.com/docs/account-holders-kyb#create-webhook-for-kyckyb-status).

   1. If further information is needed after the documentation is uploaded the Lithic compliance team will reach out via email or Slack with further details.

   ![](https://d1jvjlrimvr0n9.cloudfront.net/stable/0526698308d6eb0a_a734f69b280ef217b09d74ac0d0160c51cdd9b074e255a6d61be2f5d705bede4-image.png)

   **Expected Response Times:**

* Steps 1 + 2 - Customer makes call with required business data and PII, and receives a pending review status for the account holder: Up to 30 seconds
* Steps 3 + 4 - Customer uploads documentation then subsequently receives a webhook containing final status for the account holder: Up to 48 business hours.
* Steps 5 + 6 - Additional document upload and review will take additional time.

## KYB Failure and Required Documents

When a KYB evaluation fails, one or more of the following reasons will be returned in the response.

The following table provides the `status_reasons` for the failure along with the `required_documents` that can be used for validation. If an entity has failed for multiple reasons one document upload can satisfy multiple `status_reasons` as long as the document is listed for each reason i.e. you do not need to upload a document multiple times for different `status_reasons`.

If able, Lithic will merge `required_documents` into a subset of documents that satisfies all failures for a given entity. While the document subset is provided for ease of use, you are still able to upload documents that are not provided in the subset given the list below.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Failure Reason (`status_reasons`)
      </th>

      <th>
        Requires one of the following `required_documents`

        (\*Refers to the preferred document )
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        ```
        PRIMARY_BUSINESS_ENTITY_
        ID_VERIFICATION_FAILURE
        ```
      </td>

      <td>
        `EIN_LETTER`\*
        `TAX_RETURN`
        `SS4_FORM`
      </td>

      <td>
        The government-issued identification of the primary business entity provided could not be verified.
      </td>
    </tr>

    <tr>
      <td>
        ```
        PRIMARY_BUSINESS_ENTITY_
        ADDRESS_VERIFICATION_FAILURE
        ```
      </td>

      <td>
        `EIN_LETTER`
        `TAX_RETURN`
        `BANK_STATEMENT`
        `CERTIFICATE_OF_GOOD_STANDING`
        `ARTICLES_OF_INCORPORTATION`
        `ARTICLES_OF_ORGANIZATION`
        `CERTIFICATE_OF_FORMATION`
        `OPERATING_AGREEMENT`
        `BYLAWS`
        `GOVERNMENT_BUSINESS_LICENSE`
        `PARTNERSHIP_AGREEMENT`
        `BANK_STATEMENT  `*`UTILITY_BILL_STATEMENT`*
      </td>

      <td>
        The address of the primary business entity provided could not be verified.
      </td>
    </tr>

    <tr>
      <td>
        ```
        PRIMARY_BUSINESS_ENTITY_NAME_
        VERIFICATION_FAILURE
        ```
      </td>

      <td>
        `EIN_LETTER`
        `TAX_RETURN`
        `CERTIFICATE_OF_GOOD_STANDING`*`ARTICLES_OF_INCORPORTATION`*
        `ARTICLES_OF_ORGANIZATION`*`CERTIFICATE_OF_FORMATION`*
        `OPERATING_AGREEMENT`
        `BYLAWS`
        `GOVERNMENT_BUSINESS_LICENSE` `PARTNERSHIP_AGREEMENT`
      </td>

      <td>
        The name of the primary business entity provided could not be verified.
      </td>
    </tr>

    <tr>
      <td>
        `PRIMARY_BUSINESS_ENTITY_ SOS_FILING_INACTIVE`
      </td>

      <td>
        `CERTIFICATE_OF_GOOD_STANDING`\*
      </td>

      <td>
        The business entity is not active with the Secretary of State.
      </td>
    </tr>

    <tr>
      <td>
        ```
        PRIMARY_BUSINESS_ENTITY_
        SOS_NOT_MATCHED
        ```
      </td>

      <td>
        `CERTIFICATE_OF_GOOD_STANDING`\*
      </td>

      <td>
        The name of the  business entity provided could not be matched with the Secretary of State.
      </td>
    </tr>

    <tr>
      <td>
        ```
        PRIMARY_BUSINESS_ENTITY_
        CMRA_FAILURE
        ```
      </td>

      <td>
        Documentation cannot be provided to override a CMRA failure.  The user will need to be resubmitted with a corrected address.
      </td>

      <td>
        The business address is listed at a Commercial Mail Receiving Agency.
      </td>
    </tr>

    <tr>
      <td>
        ```
        PRIMARY_BUSINESS_ENTITY_
        WATCHLIST_FAILURE
        ```
      </td>

      <td>
        Lithic will auto review any blocklist hits.  If possible they will be cleared without further documentation.  A direct response will continue to be blocked.
      </td>

      <td>
        The business was found on a government's watchlist.
      </td>
    </tr>

    <tr>
      <td>
        ```
        PRIMARY_BUSINESS_ENTITY_
        REGISTERED_AGENT_FAILURE
        ```
      </td>

      <td>
        Documentation cannot be provided to override a registered agent failure.
      </td>

      <td>
        The business was found to be registered using a registered agent service.
      </td>
    </tr>

    <tr>
      <td>
        ```
        CONTROL_PERSON_NAME_VERIFICATION_
        FAILURE
        ```
      </td>

      <td>
        `DRIVERS_LICENSE`*`PASSPORT`*
        `PASSPORT_CARD`
      </td>

      <td>
        The control person's name provided could not be verified.
      </td>
    </tr>

    <tr>
      <td>
        ```
        BENEFICIAL_OWNER_INDIVIDUAL_NAME_
        VERIFICATION_FAILURE
        ```
      </td>

      <td>
        `DRIVERS_LICENSE`*`PASSPORT`*
        `PASSPORT_CARD`
      </td>

      <td>
        One or more of the business owner individual's name(s) provided could not be verified.
      </td>
    </tr>

    <tr>
      <td>
        ```
        CONTROL_PERSON_DOB_VERIFICATION_
        FAILURE
        ```
      </td>

      <td>
        `DRIVERS_LICENSE`*`PASSPORT`*
        `PASSPORT_CARD`
      </td>

      <td>
        The control person's date of birth provided could not be verified.
      </td>
    </tr>

    <tr>
      <td>
        ```
        BENEFICIAL_OWNER_INDIVIDUAL_DOB_
        VERIFICATION_FAILURE
        ```
      </td>

      <td>
        `DRIVERS_LICENSE`*`PASSPORT`*
        `PASSPORT_CARD`
      </td>

      <td>
        One or more of the beneficial owner individual's date of birth provided could not be verified.
      </td>
    </tr>

    <tr>
      <td>
        ```
        CONTROL_PERSON_ID_VERIFICATION_
        FAILURE
        ```
      </td>

      <td>
        `SSN_CARD`
        `ITIN_LETTER`\*
      </td>

      <td>
        The control person's government-issued identification number provided could not be matched.
      </td>
    </tr>

    <tr>
      <td>
        ```
        BENEFICIAL_OWNER_INDIVIDUAL_ID_
        VERIFICATION_FAILURE
        ```
      </td>

      <td>
        `SSN_CARD`
        `ITIN_LETTER`\*
      </td>

      <td>
        One or more of the business owner individual's government-issued identification number(s) provided could not be matched.
      </td>
    </tr>

    <tr>
      <td>
        `CONTROL_PERSON_ADDRESS_ VERIFICATION_FAILURE`
      </td>

      <td>
        `DRIVERS_LICENSE` \*
        `BANK_STATEMENT`
        `UTILITY_BILL_STATEMENT`
      </td>

      <td>
        The control person's provided address could not be matched.
      </td>
    </tr>

    <tr>
      <td>
        `BENEFICIAL_OWNER_INDIVIDUAL_ ID_ADDRESS_VERIFICATION_FAILURE`
      </td>

      <td>
        `DRIVERS_LICENSE` \*
        `BANK_STATEMENT`
        `UTILITY_BILL_STATEMENT`
      </td>

      <td>
        One or more of the business owner individual's provided address could not be matched.
      </td>
    </tr>

    <tr>
      <td>
        ```
        CONTROL_PERSON_BLOCKLIST_ALERT_
        FAILURE
        ```
      </td>

      <td>
        Lithic will auto review any blocklist hits.  If possible they will be cleared without further documentation.  A direct response will continue to be blocked.
      </td>

      <td>
        The control person appeared on one or more government watch lists.
      </td>
    </tr>

    <tr>
      <td>
        ```
        BENEFICIAL_OWNER_INDIVIDUAL_
        BLOCKLIST_ALERT_FAILURE
        ```
      </td>

      <td>
        Lithic will auto review any blocklist hits.  If possible they will be cleared without further documentation.  A direct response will continue to be blocked.
      </td>

      <td>
        One or more of the beneficial owner individual's appear on one or more government watch lists.
      </td>
    </tr>

    <tr>
      <td>
        `OTHER_VERIFICATION_FAILURE`
      </td>

      <td>
        Lithic will reach out directly with next steps.
      </td>

      <td>
        The business entity could not be verified for other reasons.
      </td>
    </tr>
  </tbody>
</Table>

### Required Documents List

The following provides a description of the allowed document types to satisfy the `required_documents`.

| Valid Document                 | Required Image Types | Document Description                                                                                                                                                                                                                                                                                                      |
| :----------------------------- | :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `DRIVERS_LICENSE`              | `FRONT` `BACK`       | An individuals valid driver’s license that can be used to verify the identity of an individual                                                                                                                                                                                                                            |
| `PASSPORT`                     | `FRONT` `BACK`       | An individual’s valid passport that can be used to verify the identity of an individual.                                                                                                                                                                                                                                  |
| `PASSPORT_CARD`                | `FRONT` `BACK`       | An individuals valid passport card that can be used to verify the identity of an individual.                                                                                                                                                                                                                              |
| `EIN_LETTER`                   | `FRONT`              | Document that displays the Employer Identification Number (EIN), given by the IRS, and business name. The submitted address must be present.                                                                                                                                                                              |
| `TAX_RETURN`                   | `FRONT`              | Tax document that displays the EIN, business name, and address name. The submitted address must be present.                                                                                                                                                                                                               |
| `OPERATING_AGREEMENT`          | `FRONT`              | Document that displays a variety of business related information, most important of which are the business name and business address. The submitted address must be present and the document must be signed.                                                                                                              |
| `CERTIFICATE_OF_FORMATION`     | `FRONT`              | Document that a business files with the state to form the business entity. The submitted address must be present.                                                                                                                                                                                                         |
| `CERTIFICATE_OF_GOOD_STANDING` | `FRONT`              | A certificate of good standing is a document issued by a state that verifies a business is legally permitted to operate in that state. It's also known as a certificate of existence or certificate of status, and may have a state-specific name. The submitted address must be present and the document must be signed. |
| `ARTICLES_OF_INCORPORATION`    | `FRONT`              | Articles of incorporation are a set of formal documents filed with a government body to legally document the creation of a corporation. The submitted address must be present and the document must be signed.                                                                                                            |
| `ARTICLES_OF_ORGANIZATION`     | `FRONT`              | Articles of organization are part of a formal legal document used to establish a limited liability company (LLC) at the state level. The submitted address must be present.                                                                                                                                               |
| `BYLAWS`                       | `FRONT`              | The rules that govern your corporation's operations and create an organizational structure for your company. The submitted address must be present and the document must be signed.                                                                                                                                       |
| `GOVERNMENT_BUSINESS_LICENSE`  | `FRONT`              | Government-issued business license.                                                                                                                                                                                                                                                                                       |
| `PARTNERSHIP_AGREEMENT`        | `FRONT`              | A partnership agreement is a legal document that dictates how a small for-profit business will operate under two or more people. The document must be signed.                                                                                                                                                             |
| `SS4_FORM`                     | `FRONT`              | IRS Application for Employer Identification Number form.                                                                                                                                                                                                                                                                  |
| `BANK_STATEMENT`               | `FRONT`              | Most recent bank statement.                                                                                                                                                                                                                                                                                               |
| `UTILITY_BILL_STATEMENT`       | `FRONT`              | Recent utility bill dated within 30 days. The the submitted address must be present on the utility bill.                                                                                                                                                                                                                  |
| `SSN_CARD`                     | `FRONT`              | A Social Security (SSN) card is a card that contains a person's Social Security number (SSN), which is a unique nine-digit number.                                                                                                                                                                                        |
| `ITIN_LETTER`                  | `FRONT`              | An Individual Taxpayer Identification Number (ITIN) is a tax processing number issued to nonresident Aliens (NRA)                                                                                                                                                                                                         |

## Document Review Process

### Document Upload Statuses

After an account is created and is in a `PENDING` status you can call the [Get Account Holder Document Uploads](https://docs.lithic.com/reference/getaccountholderdocuments) endpoint to return the status and URLs for all documents in review or the [Get Account Holder Document Upload Status ](https://docs.lithic.com/reference/getaccountholderdocumentbytoken)endpoint to return the status of a specific document.

An `ACCEPTED` document status means the evidence is satisfied and it will no longer be included in the list of `required_documents`, it does not mean the Business has been approved.

Note that the upload URLs expire after 7 days. If an upload URL expires, you can refresh the URLs by retrieving the document upload from the [Get Account Holder Document Uploads](https://docs.lithic.com/reference/getaccountholderdocuments) endpoint.

| Document Upload Statuses | Definition                                                                                                            |
| :----------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| `PENDING_UPLOAD`         | Account holder is in a PENDING status and needs additional documentation to proceed.                                  |
| `UPLOADED`               | Lithic received documents by API and the account holder is in the review process.                                     |
| `ACCEPTED`               | Lithic accepted the uploaded documents, cards can be ordered on the account.                                          |
| `REJECTED`               | Lithic rejected the uploaded documents, cards cannot be ordered on the account.                                       |
| `PARTIAL_APPROVAL`       | Lithic has reviewed the uploaded documents, and only a subset of status reasons are satisfied by the document upload. |

### Document review failure reasons

The following reasons can be returned in the `account_holder.verification` event and can be used to decide what action is needed for the additional document upload.

| Failure Reason                         | Description                                                                                                                                  |
| :------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| `DOCUMENT_MISSING_REQUIRED_DATA`       | A document did not contain the relevant information to satisfy the failure                                                                   |
| `DOCUMENT_UPLOAD_TOO_BLURRY`           | A document was too blurry                                                                                                                    |
| `FILE_SIZE_TOO_LARGE`                  | The document file size was larger than the maximum size of **15mb**                                                                          |
| `INVALID_DOCUMENT_TYPE`                | The document upload did not match the expected document type. For instance, a `TAX_RETURN` was uploaded for a document of type `EIN_LETTER`. |
| `INVALID_ENTITY`                       | The document upload was uploaded for the wrong entity.                                                                                       |
| `DOCUMENT_EXPIRED`                     | The document upload was expired. For instance, if a `DRIVERS_LICENSE` uploaded is expired.                                                   |
| `DOCUMENT_ISSUED_GREATER_THAN_30_DAYS` | The document upload, initially expected to be issued less than 30 days, has exceeded the maximum allowable time of 30 days.                  |
| `DOCUMENT_TYPE_NOT_SUPPORTED`          | The document uploaded is not supported for verification of the entity status reasons.                                                        |
| `UNKNOWN_FAILURE_REASON`               | The document uploaded was `REJECTED` for an unknown failure reason. A new document upload should be initiated.                               |
| `INVALID_DOCUMENT_UPLOAD`              | \**Deprecated*, the document upload was invalid                                                                                              |
| `UNKNOWN_ERROR`                        | \**Deprecated*, the document uploaded was `REJECTED` for an unknown failure reason. A new document upload should be initiated.               |

## Adding and Removing Beneficial Owner Individuals

It is possible to add and deactivate beneficial owner individuals after a KYB application has been created using the [Create new beneficial owner or replace the existing control person entity](https://docs.lithic.com/reference/postaccountholderentities) and [Deactivate a beneficial owner individual](https://docs.lithic.com/reference/deleteaccountholderentity) endpoints. This allows the KYB application to change over time and accurately reflect the current state of the business. Deactivated beneficial owner individuals not returned with the account holder.

## Replacing the Control Person

It is also possible to replace the control person after a KYB application has been created using the same [Create new beneficial owner or replace the existing control person entity](https://docs.lithic.com/reference/postaccountholderentities) endpoint. When a new control person is added, the existing control person is automatically deactivated. Deactivated control persons not returned with the account holder.

## Create Webhook for KYC/KYB Status

You can create a webhook to be notified of updates to the status of any in-process KYC or KYB evaluation. We send three [types of events](https://docs.lithic.com/docs/types-of-events#event-types) related to accountholders via our [Events platform](https://docs.lithic.com/docs/events-api): `account_holder.created`, `account_holder.updated`, and `account_holder.verification`. You can also see examples of these three events in Sandbox using [Send Example Event Types](https://docs.lithic.com/reference/sendeventsubscriptionexample).

### Events that will include `status`,`status_reasons`, and `required_documents`

* `account_holder.created`
* `account_holder.verification`

## Simulating the KYB Flow

1. Create an [Account Holder ](https://docs.lithic.com/reference/postaccountholders). See [Simulating Account Holder Creation](https://docs.lithic.com/docs/simulating-account-holder-creation) page for details on creating an account in a `PENDING_REVIEW` status so the follow simulations can be completed.
2. Use the [Get Account Holder ](https://docs.lithic.com/reference/getaccountholder)endpoint to return the `required_documents` for the account holder. Once the documents are ready for upload call the [Initiate Account Holder Document Upload ](https://docs.lithic.com/reference/postaccountholderdocuments)endpoint. Lithic will return URLs to be used to upload the documents.
3. To simulate a document review call the [Simulate an account holder document upload's review](https://docs.lithic.com/reference/simulateaccountholderenrollmentdocumentreview) API. This will simulate the step of Lithic reviewing the documents submitted per enitity.
4. Then use the [Simulate an account holder's enrollment review](https://docs.lithic.com/reference/simulateaccountholderenrollmentreview) to pass in `ACCEPTED` or `REJECTED`. This will simulate the step of Lithic approving or rejecting the **overall** status of the Account Holder.