# Legal Entities at Cross River Bank

Details about Legal Entity support at Cross River Bank

Modern Treasury integrates with Cross River Bank's [Customer Management](https://docs.crossriver.com/apis/customer-management) APIs. This guide describes capabilities and limitations of sending Legal Entity data to Cross River Bank.

**Note: This is not supported in our sandbox environment**

# Required Fields

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Type
      </th>

      <th>
        Notes
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **Risk Rating**
      </td>

      <td>
        One of: `low`, `medium`, `high`.

        Maps to `risk_rating` on Legal Entity. Default value: `low` will be sent to Cross River if not set.
      </td>
    </tr>

    <tr>
      <td>
        **Address Classification**
      </td>

      <td>
        Maps from the first value of `address_types` on Legal Entity Address. Maps to CRB Address Classification as follows:\
        `residential` -> `Residential`\
        `business` -> `Business`\
        `po_box` -> `PoBox`\
        `other` -> `Other`\
        `mailing` -> `Other`

        Currently these values at CRB are not supported: `Rural`, `Military`.
      </td>
    </tr>

    <tr>
      <td>
        **Address Type**
      </td>

      <td>
        Maps from the first value of `address_types` on Legal Entity Address. Maps to CRB Address Type as follows:\
        `residential` -> `Home`\
        `business` -> `Work`\
        `po_box` -> `Other`\
        `other` -> `Other`\
        `mailing` -> `Other`
      </td>
    </tr>
  </tbody>
</Table>

<br />

# Other Supported Fields

Modern Treasury supports additional fields through the `bank_settings` and `wealth_and_employment_details` fields on the [Legal Entity](https://docs.moderntreasury.com/platform/reference/legal-entities) model.

`bank_settings`

| Field Name                      | Description                                                                                                                                                                                                                                                                                  |
| :------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `enable_backup_withholding`     | Whether backup withholding is enabled. See more here - [https://www.irs.gov/businesses/small-businesses-self-employed/backup-withholding](https://www.irs.gov/businesses/small-businesses-self-employed/backup-withholding)                                                                  |
| `backup_withholding_percentage` | The percentage of backup withholding to apply to the legal entity.                                                                                                                                                                                                                           |
| `privacy_opt_out`               | Cross River Bank specific setting to opt out of privacy policy.                                                                                                                                                                                                                              |
| `regulation_o`                  | It covers, among other types of insider loans, extensions of credit by a member bank to an executive officer, director, or principal shareholder of the member bank; a bank holding company of which the member bank is a subsidiary; and any other subsidiary of that bank holding company. |

<br />

`wealth_and_employment_details`

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Field Name
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `employment_status`
      </td>

      <td>
        The employment status of the individual.

        Possible values: `employed`, `retired`, `self_employed`, `student`, `unemployed`
      </td>
    </tr>

    <tr>
      <td>
        `occupation`
      </td>

      <td>
        The occupation of the individual's employment.

        Possible values: `consulting`, `executive`, `finance_accounting`, `food_services`, `government`, `healthcare`, `legal_services`, `manufacturing`, `other`, `sales`, `science_engineering`, `technology`
      </td>
    </tr>

    <tr>
      <td>
        `industry`
      </td>

      <td>
        The industry of the individual's employment.

        Possible values: `accounting`, `agriculture`, `automotive`, `chemical_manufacturing`, `construction`, `educational_medical`, `food_service`, `finance`, `gasoline`, `health_stores`, `laundry`, `maintenance`, `manufacturing`, `merchant_wholesale`, `mining`, `performing_arts`, `professional_non_legal`, `public_administration`, `publishing`, `real_estate`, `recreation_gambling`, `religious_charity`, `rental_services`, `retail_clothing`, `retail_electronics`, `retail_food`, `retail_furnishing`, `retail_home`, `retail_non_store`, `retail_sporting`, `transportation`, `travel`, `utilities`
      </td>
    </tr>

    <tr>
      <td>
        `income_source`
      </td>

      <td>
        The source of the individual's income.

        Possible values: `family_support`, `government_benefits`, `inheritance`, `investments`, `rental_income`, `retirement`, `salary`, `self_employed`
      </td>
    </tr>

    <tr>
      <td>
        `income_state`
      </td>

      <td>
        The state in which the individual's income is earned.
      </td>
    </tr>

    <tr>
      <td>
        `income_country`
      </td>

      <td>
        The ISO 3166-1 alpha-2 country code in which the individual's income is earned.
      </td>
    </tr>

    <tr>
      <td>
        `employer_name`
      </td>

      <td>
        The name of the employer.
      </td>
    </tr>

    <tr>
      <td>
        `employer_state`
      </td>

      <td>
        The state in which the employer is located.
      </td>
    </tr>

    <tr>
      <td>
        `employer_country`
      </td>

      <td>
        The ISO 3166-1 alpha-2 country code in which the employer is located.
      </td>
    </tr>

    <tr>
      <td>
        `source_of_funds`
      </td>

      <td>
        The source of the individual's funds.

        Possible values: `alimony`, `annuity`, `business_owner`, `general_employee`, `government_benefits`, `homemaker`, `inheritance_gift`, `investment`, `legal_settlement`, `lottery`, `real_estate`, `retired`, `retirement`, `salary`, `self_employed`, `senior_executive`, `trust_income`
      </td>
    </tr>

    <tr>
      <td>
        `wealth_source`
      </td>

      <td>
        The source of the individual's wealth.

        Possible values: `business_sale`, `family_support`, `government_benefits`, `inheritance`, `investments`, `other`, `rental_income`, `retirement`, `salary`, `self_employed`
      </td>
    </tr>

    <tr>
      <td>
        `annual_income`
      </td>

      <td>
        The annual income of the individual.
      </td>
    </tr>
  </tbody>
</Table>

# Field Support Exceptions

Modern Treasury supports accepting most required and conditional fields by Cross River Bank, with the exception of the following fields:

## Individuals

| Type                | Fields Not Supported                |
| :------------------ | :---------------------------------- |
| **Identifications** | ITIN, Driver's License, and ID card |

## Businesses

| Type                | Fields Not Supported                                                             |
| :------------------ | :------------------------------------------------------------------------------- |
| **Identifications** | VAT                                                                              |
| **Classification**  | Fields used to classify a business, such as NAICS code or merchant category code |

# Workflow Support Exceptions

| Type       | Notes                                                                                                                                                                                                                            |
| :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Status** | Modern Treasury does not support passing back information about various statuses at Cross River Bank, including the status, OFAC, pepScan, and internalList fields. These fields may be set during customer onboarding or later. |