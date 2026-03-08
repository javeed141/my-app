# Backfill counterparties with CSVs

Within Modern Treasury, you have the option to create Counterparties in bulk with CSV uploads. This is typically used to backfill counterparty data in Modern Treasury, such as when moving from another platform.

> 🚧 Record limit
>
> You can upload a maximum of 1,000 Counterparties with one CSV.

# Create Counterparties in bulk

1. Login to Modern Treasury.
2. Navigate to the [Counterparties Overview](https://app.moderntreasury.com/counterparties) page.
3. From the **Create New** dropdown menu, select **Bulk Counterparty** to go to the bulk import page.

   <Image align="center" border={false} src="https://files.readme.io/5595872-Screenshot_2024-04-15_at_3.32.16_PM.png" />

   * From here, you can click the **Download Template CSV** button to obtain a template CSV that includes all possible header fields. See the "Bulk Counterparty CSV Guidance" section in this guide for more information about each column.
4. If you have a file ready, click **Import Counterparties** to open the import modal.
5. Click **Upload file** in the modal and select the CSV you wish to upload.

<Image align="center" border={false} width="350px" src="https://files.readme.io/948d116-Screenshot_2024-04-15_at_1.24.36_PM.png" />

6. Once uploaded, the tool maps your columns to the accepted fields needed to create the Counterparties. Verify the mapped columns and click **Continue**.

   <Image align="center" border={false} src="https://files.readme.io/a455254-Screenshot_2024-04-15_at_3.54.43_PM.png" />
7. The tool will identify any cells that need to be reviewed by highlighting them in red. Make your edits as necessary.

   <Image align="center" border={false} width="350px" src="https://files.readme.io/822c1bd-Screenshot_2024-04-15_at_3.55.03_PM.png" />
8. Once you are ready to submit, click on the **Submit uploaded data** button in the top right.

   1. If there are no errors, you will see a success modal. Click on **View Bulk Import** to open a new tab to the resulting bulk import.

      <Image align="center" border={false} width="350px" src="https://files.readme.io/1f43e71-Screenshot_2024-04-15_at_1.27.20_PM.png" />
   2. If there are data errors, you will see a submission failure message:

      <Image align="center" border={false} width="350px" src="https://files.readme.io/9425b2f-Screenshot_2024-04-15_at_3.55.55_PM.png" />

      The tool will highlight any cells with remaining errors in red along with an error message. Make your corrections and re-attempt the upload as necessary.

# Bulk Counterparty CSV Guidance

## Counterparty Attributes

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
        `name`
      </td>

      <td>
        Yes
      </td>

      <td>
        `string`
      </td>

      <td>
        The legal name that is attached to the Counterparty’s bank account.
      </td>
    </tr>

    <tr>
      <td>
        `email`
      </td>

      <td>
        No
      </td>

      <td>
        `string`
      </td>

      <td>
        The counterparty's email address.
      </td>
    </tr>

    <tr>
      <td>
        `account_number`
      </td>

      <td>
        No
      </td>

      <td>
        `string`
      </td>

      <td>
        The last four digits of the account number for the bank account.
      </td>
    </tr>

    <tr>
      <td>
        `account_number_type`
      </td>

      <td>
        No
      </td>

      <td>
        `string`
      </td>

      <td>
        See [Account Details](https://docs.moderntreasury.com/platform/reference/account-detail-object)  for list of account number types..
      </td>
    </tr>

    <tr>
      <td>
        `routing_number`
      </td>

      <td>
        No
      </td>

      <td>
        `string`
      </td>

      <td>
        The routing number of the bank.
      </td>
    </tr>

    <tr>
      <td>
        `routing_number_type`
      </td>

      <td>
        No
      </td>

      <td>
        `string`
      </td>

      <td>
        See [Routing Details](https://docs.moderntreasury.com/platform/reference/routing-detail-object) for the list of routing number types.
      </td>
    </tr>

    <tr>
      <td>
        `routing_number_2`
      </td>

      <td>
        No
      </td>

      <td>
        `string`
      </td>

      <td>
        The second routing number.

        There are some types of international bank accounts that require two routing numbers: one SWIFT code and one local routing number (e.g. `au_bsb`, `in_ifsc`, `ca_cpa`, etc.)
      </td>
    </tr>

    <tr>
      <td>
        `routing_number_type_2`
      </td>

      <td>
        No
      </td>

      <td>
        `string`
      </td>

      <td>
        The type of the second routing number.
      </td>
    </tr>

    <tr>
      <td>
        `account_type`
      </td>

      <td>
        No
      </td>

      <td>
        `string`
      </td>

      <td>
        See [Internal Accounts](https://docs.moderntreasury.com/platform/reference/internal-account-object)  for possible account types.
      </td>
    </tr>

    <tr>
      <td>
        `party_type`
      </td>

      <td>
        No
      </td>

      <td>
        `string`
      </td>

      <td>
        Either `business` or `individual`.
      </td>
    </tr>

    <tr>
      <td>
        `address_line_1`
      </td>

      <td>
        No
      </td>

      <td>
        `string`
      </td>

      <td>
        Street address of the Counterparty.\
        **Required for wires.**
      </td>
    </tr>

    <tr>
      <td>
        `address_line_2`
      </td>

      <td>
        No
      </td>

      <td>
        `string`
      </td>

      <td>
        Apartment, suite, or unit number of the Counterparty.\
        **Required for wires.**
      </td>
    </tr>

    <tr>
      <td>
        `address_locality`
      </td>

      <td>
        No
      </td>

      <td>
        `string`
      </td>

      <td>
        City of the Counterparty.\
        **Required for wires.**
      </td>
    </tr>

    <tr>
      <td>
        `address_region`
      </td>

      <td>
        No
      </td>

      <td>
        `string`
      </td>

      <td>
        State of the Counterparty.\
        **Required for wires.**
      </td>
    </tr>

    <tr>
      <td>
        `address_postal_code`
      </td>

      <td>
        No
      </td>

      <td>
        `string`
      </td>

      <td>
        Postal/region code of the Counterparty's address.\
        **Required for wires.**
      </td>
    </tr>

    <tr>
      <td>
        `address_country`
      </td>

      <td>
        No
      </td>

      <td>
        `string`
      </td>

      <td>
        Country of the Counterparty.\
        **Required for wires.**
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
        Additional data represented as key-value pairs separated by a | (pipe character).\
        Note: do not include special characters outside of ":" and "|"
      </td>
    </tr>

    <tr>
      <td>
        `send_remittance_advice`
      </td>

      <td>
        No
      </td>

      <td>
        `boolean`
      </td>

      <td>
        If `true`, Modern Treasury will send an email to the Counterparty whenever an associated payment order is sent to the bank.
      </td>
    </tr>
  </tbody>
</Table>