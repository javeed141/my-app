# Create Payment Orders in Bulk

Within Modern Treasury, you have the option to create individual Payment Orders or create Payment Orders in bulk with CSV uploads.

> 🚧 Case-sensitive values
>
> Values are case-sensitive and should match the guidance shown below.

> 🚧 Record limit
>
> You can upload a maximum of 1,000 Payment Orders with one CSV.

# Create Payment Orders in bulk

1. Login to Modern Treasury.
2. Navigate to the [Payment Orders](https://app.moderntreasury.com/payment_orders) page.
3. From the **Create New** dropdown menu, select **Bulk Payment Order** to go to the bulk import page.

   <Image align="center" border={false} src="https://files.readme.io/f3fa099-Screenshot_2024-04-15_at_1.59.30_PM.png" />

   * From here, you can click the **Download Template CSV** button to obtain a template CSV that includes all possible header fields. See the "Bulk Counterparty CSV Guidance" section in this guide for more information about each column.
4. If you have a file ready, click **Import Payment Orders** to open the import modal.
5. Click **Upload file** in the modal and select the CSV you wish to upload.

   <Image align="center" border={false} width="350px" src="https://files.readme.io/948d116-Screenshot_2024-04-15_at_1.24.36_PM.png" />
6. Once uploaded, the tool maps your columns to the accepted fields needed to create the Payment Orders. Verify the mapped columns and click **Continue**.

   <Image align="center" border={false} src="https://files.readme.io/0e5094f-Screenshot_2024-04-15_at_2.01.12_PM.png" />
7. The tool will identify any cells that need to be reviewed by highlighting them in red. Make your edits as necessary.

   <Image align="center" border={false} width="300px" src="https://files.readme.io/732541b-Screenshot_2024-04-15_at_1.18.19_PM.png" />
8. Once you are ready to submit, click on the **Submit uploaded data** button in the top right.

   1. If there are no errors, you will see a success modal. Click on **View Bulk Import** to open a new tab to the resulting bulk import.

      <Image align="center" border={false} width="350px" src="https://files.readme.io/72dd7ed-Screenshot_2024-04-15_at_1.27.20_PM.png" />
   2. If there are data errors, you will see a submission failure message:

      <Image align="center" border={false} width="350px" src="https://files.readme.io/2cbcd89-Screenshot_2024-04-15_at_2.04.31_PM.png" />

      The tool will highlight any cells with remaining errors in red along with an error message. Make your corrections and re-attempt the upload as necessary.

# Bulk Payment Order CSV Guidance

## Payment Order Attributes

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Attribute
      </th>

      <th>
        Required
      </th>

      <th>
        Data Type
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `originating_account_id`
      </td>

      <td>
        Yes
      </td>

      <td>
        `string`
      </td>

      <td>
        The ID of one of your organization's originating accounts.

        This attribute can be located underneath the on the Payment Order upload screen. Your internal account will always be the originating account.
      </td>
    </tr>

    <tr>
      <td>
        `type`
      </td>

      <td>
        Yes
      </td>

      <td>
        `string`
      </td>

      <td>
        Designates the payment type you would like to request for the payment orders (e.g. `ach`, `wire`, `book`, etc). **Case sensitive.**
      </td>
    </tr>

    <tr>
      <td>
        `subtype`
      </td>

      <td>
        No
      </td>

      <td>
        `string`
      </td>

      <td>
        An additional layer of classification for the type of payment order you are doing. This attribute is only used for `ach` payment orders currently.

        For `ach` payment orders, the subtype represents the SEC code. We currently support `CCD`, `PPD`, `IAT`, `CTX`, `WEB`, `CIE`, and `TEL`.

        When Modern Treasury initiates an ACH payment on your behalf, the SEC Code is set automatically. When the receiving account's `party_type` is `individual`, the `PPD` code is used. When `party_type` is business or isn't set, `CCD` is used.
      </td>
    </tr>

    <tr>
      <td>
        `priority`
      </td>

      <td>
        No
        Default: `normal`
      </td>

      <td>
        `string`
      </td>

      <td>
        `high` priority is only available for `ach`, `eft`, and `check` payment types. For ACH and EFT payments, `high` represents a same-day transfer. For check payments, `high` can mean an overnight check rather than standard mail. For all other payment types, `high` priority payments are treated the same as `normal` priority payments.
      </td>
    </tr>

    <tr>
      <td>
        `process_after`
      </td>

      <td>
        No
      </td>

      <td>
        `string`

        * *Format*\*: ISO 8601 timestamp
      </td>

      <td>
        If present, Modern Treasury will not process the payment until after this time. If `process_after` is past the cutoff for `effective_date`, `process_after` will take precedence and `effective_date` will automatically update to reflect the earliest possible sending date after `process_after`.
      </td>
    </tr>

    <tr>
      <td>
        `purpose`
      </td>

      <td>
        No
      </td>

      <td>
        `string`
      </td>

      <td>
        This attribute means different things depending on the payment type:

        For `wire`, this is usually the purpose which is transmitted via the `InstrForDbtrAgt` attribute in the ISO20022 file.

        For CurrencyCloud, this is the `payment.purpose_code` attribute.

        For `eft`, this attribute is the 3 digit [CPA Code](https://www.tdcommercialbanking.com/wbb/help/English/wbwEFTCPACodes.html) that will be attached to the payment.
      </td>
    </tr>

    <tr>
      <td>
        `amount`
      </td>

      <td>
        Yes or `dollar_amount`
      </td>

      <td>
        `integer`

        * *Format:* \*cents
      </td>

      <td>
        This attribute needs to be filled in if you want to designate the value in cents. Examples:

        `10` = $0.10
        `1000` = $10.00
        `1234` = $12.34

        If you use this attribute, do not use the `dollar_amount` attribute.
      </td>
    </tr>

    <tr>
      <td>
        `dollar_amount`
      </td>

      <td>
        Yes or `amount`
      </td>

      <td>
        ```
        float(2)

        ```

        * *Format:*\* dollars without symbol
      </td>

      <td>
        This attribute needs to be filled in if you want to designate the value in cents. Examples:

        `10` = $0.10
        `10.00` = $10.00
        `1234` = $12.34

        If you use this attribute, do not use the `amount` attribute.
      </td>
    </tr>

    <tr>
      <td>
        `direction`
      </td>

      <td>
        Yes
      </td>

      <td>
        `string`
      </td>

      <td>
        A `credit` moves money from your account to someone else's. A `debit` pulls money from someone else's account to your own.
        **Case sensitive.**

        * *Note:*\* `wire` and `check` payment types will always be `credit`.
      </td>
    </tr>

    <tr>
      <td>
        `effective_date`
      </td>

      <td>
        No
      </td>

      <td>
        `string`

        * *Format:* \*`YYYY-MM-DD`
      </td>

      <td>
        The effective date is the date transactions are to be posted to the counterparty's account. If you wish to future date a payment order, you will want to fill in this attribute. If this attribute is not filled, it will default to the next business date.
      </td>
    </tr>

    <tr>
      <td>
        `description`
      </td>

      <td>
        No
      </td>

      <td>
        `string`
      </td>

      <td>
        This attribute is solely for internal use anything included within this attribute will not be visible to the Counterparty.
      </td>
    </tr>

    <tr>
      <td>
        `statement_descriptor`
      </td>

      <td>
        No
      </td>

      <td>
        `string`
      </td>

      <td>
        The bank statement description should be used for your Counterparties to see more detail within their bank statement. This oftentimes defaults to including your company name, but there is room to include at least 10 more characters.
      </td>
    </tr>

    <tr>
      <td>
        `remittance_information`
      </td>

      <td>
        No
      </td>

      <td>
        `string`
      </td>

      <td>
        Remittance information is typically another attribute that can be utilized to describe the money that is being sent.
        For ACH, this field will be passed through on an addenda record and can include up to 80 characters.

        If this field is left blank then an addenda record would not be created.

        For wire payments the field will be passed through as the `Originator to Beneficiary Information`and can include up to 140 characters.
      </td>
    </tr>

    <tr>
      <td>
        `metadata`
      </td>

      <td>
        No
      </td>

      <td>
        `string`
      </td>

      <td>
        Additional data represented as key-value pairs separated by a | (pipe character).

        Note: do not include special characters, outside of : and |
      </td>
    </tr>

    <tr>
      <td>
        `charge_bearer`
      </td>

      <td>
        No
      </td>

      <td>
        `string`
      </td>

      <td>
        The party that will pay the fees for the payment order. Only applies to wire payment orders.

        The values correspond to the [SWIFT 71A values](https://www.sepaforcorporates.com/swift-for-corporates/payment-fees-the-difference-between-ben-our-and-sha/) as follows:

        Shared: SHA (SHAred)
        Sender: OUR
        Receiver: BEN (BENeficiary)
      </td>
    </tr>

    <tr>
      <td>
        `foreign_exchange_contract`
      </td>

      <td>
        No
      </td>

      <td>
        `string`
      </td>

      <td>
        If present, indicates a specific foreign exchange contract number that has been generated by your financial institution.
      </td>
    </tr>

    <tr>
      <td>
        `foreign_exchange_indicator`
      </td>

      <td>
        No
      </td>

      <td>
        `string`
      </td>

      <td>
        Indicates the type of FX transfer to initiate if the payment order currency matches the originating account currency.
      </td>
    </tr>
  </tbody>
</Table>

## Counterparty Attributes

The following attributes referring to counterparties will be dependent on whether a counterparty has or has not already been created within Modern Treasury.

### If the Counterparty exists in Modern Treasury

| Attribute                 | Required | Data Type | Description                                            |
| :------------------------ | :------- | :-------- | :----------------------------------------------------- |
| `counterparty_account_id` | Yes      | `string`  | Supports both Internal Accounts and External Accounts. |

### If the Counterparty does not exist in Modern Treasury

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Attribute
      </th>

      <th>
        Required
      </th>

      <th>
        Data Type
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `counterparty_name`
      </td>

      <td>
        Yes
      </td>

      <td>
        `string`
      </td>

      <td>
        Supports both Internal Accounts and External Accounts.
      </td>
    </tr>

    <tr>
      <td>
        `counterparty_routing_number`
      </td>

      <td>
        Yes
      </td>

      <td>
        `string`
      </td>

      <td>
        Routing number of the counterparty.
      </td>
    </tr>

    <tr>
      <td>
        `counterparty_routing_type`
      </td>

      <td>
        Yes
      </td>

      <td>
        `string`
      </td>

      <td>
        Either `aba`, `swift` or `ca_cpa`.
        **Case sensitive.**
      </td>
    </tr>

    <tr>
      <td>
        `counterparty_account_number`
      </td>

      <td>
        Yes
      </td>

      <td>
        `integer`
      </td>

      <td>
        Account number of the counterparty.
      </td>
    </tr>

    <tr>
      <td>
        `counterparty_account_number_type`
      </td>

      <td>
        No if domestic Payment Order
      </td>

      <td>
        `string`
      </td>

      <td>
        Supports `iban` and `clabe`. Otherwise `null` if the bank account number is in a generic format.
        **Case sensitive.**
      </td>
    </tr>

    <tr>
      <td>
        `counterparty_account_type`
      </td>

      <td>
        No
      </td>

      <td>
        `string`
      </td>

      <td>
        Can be checking, savings or other.
      </td>
    </tr>

    <tr>
      <td>
        `counterparty_party_type`
      </td>

      <td>
        No
      </td>

      <td>
        `string`
      </td>

      <td>
        Either individual or business.
      </td>
    </tr>

    <tr>
      <td>
        `counterparty_address_line_1`
      </td>

      <td>
        No
      </td>

      <td>
        `string`
      </td>

      <td>
        Street address of the Counterparty.

        **Required for Wire Payment Orders.**
      </td>
    </tr>

    <tr>
      <td>
        `counterparty_address_line_2`
      </td>

      <td>
        No
      </td>

      <td>
        `string`
      </td>

      <td>
        Street address extended of the Counterparty.

        **Required for Wire Payment Orders.**
      </td>
    </tr>

    <tr>
      <td>
        `counterparty_address_locality`
      </td>

      <td>
        No
      </td>

      <td>
        `string`
      </td>

      <td>
        City of the Counterparty.

        **Required for Wire Payment Orders.**
      </td>
    </tr>

    <tr>
      <td>
        `counterparty_address_region`
      </td>

      <td>
        No
      </td>

      <td>
        `string`
      </td>

      <td>
        State of the Counterparty.

        **Required for Wire Payment Orders.**
      </td>
    </tr>

    <tr>
      <td>
        `counterparty_address_postal_code`
      </td>

      <td>
        No
      </td>

      <td>
        `string`
      </td>

      <td>
        Postal/region code of the Counterparty.

        **Required for Wire Payment Orders.**
      </td>
    </tr>

    <tr>
      <td>
        `counterparty_address_country`
      </td>

      <td>
        No
      </td>

      <td>
        `string`
      </td>

      <td>
        Country of the Counterparty.

        **Required for Wire Payment Orders.**
      </td>
    </tr>
  </tbody>
</Table>

## Continuous Accounting Attributes

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Attribute
      </th>

      <th>
        Required
      </th>

      <th>
        Data Type
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `accounting_class_id`
      </td>

      <td>
        No
      </td>

      <td>
        `string`
      </td>

      <td>
        These IDs can be found in your [organization settings](https://app.moderntreasury.com/settings/organization) page.
        You should only use `accounting_class_id` or `accounting_class_name` (not both).
      </td>
    </tr>

    <tr>
      <td>
        `accounting_class_name`
      </td>

      <td>
        No
      </td>

      <td>
        `string`
      </td>

      <td>
        These names can be found in your [organization settings](https://app.moderntreasury.com/settings/organization) page.
        You should only use `accounting_class_id` or `accounting_class_name` (not both).
      </td>
    </tr>

    <tr>
      <td>
        `accounting_account_id`
      </td>

      <td>
        No
      </td>

      <td>
        `string`
      </td>

      <td>
        These IDs can be found in your [organization settings](https://app.moderntreasury.com/settings/organization) page.
        You should only use `accounting_account_id` or `accounting_account_name` (not both).
      </td>
    </tr>

    <tr>
      <td>
        `accounting_account_name`
      </td>

      <td>
        No
      </td>

      <td>
        `string`
      </td>

      <td>
        These names can be found in your [organization settings](https://app.moderntreasury.com/settings/organization) page.
        You should only use `accounting_account_id` or `accounting_account_name` (not both).
      </td>
    </tr>
  </tbody>
</Table>