# Required Fields for Businesses

Listed below is the required information for onboarding a business. These details must be included in your legal entity creation request. For more information on the onboarding process please refer to our [guide for onboarding businesses](https://docs.moderntreasury.com/payments/docs/onboard-a-business).

## Required Fields for Businesses

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th style={{ textAlign: "left" }}>
        Required\
        Information
      </th>

      <th style={{ textAlign: "left" }}>
        Parameter
      </th>

      <th style={{ textAlign: "left" }}>
        Format
      </th>

      <th style={{ textAlign: "left" }}>
        Requirement
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td style={{ textAlign: "left" }}>
        Legal Business Name
      </td>

      <td style={{ textAlign: "left" }}>
        `business_name`
      </td>

      <td style={{ textAlign: "left" }}>
        String
      </td>

      <td style={{ textAlign: "left" }}>
        Required
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        Entity Structure
      </td>

      <td style={{ textAlign: "left" }}>
        `legal_structure`
      </td>

      <td style={{ textAlign: "left" }}>
        String

        Possible Values:\
        `corporation`, `llc`, `non_profit`, `partnership`, `sole_proprietorship`, `trust`
      </td>

      <td style={{ textAlign: "left" }}>
        Required
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        Email Address
      </td>

      <td style={{ textAlign: "left" }}>
        `email`
      </td>

      <td style={{ textAlign: "left" }}>
        String
      </td>

      <td style={{ textAlign: "left" }}>
        Required
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        Physical Address
      </td>

      <td style={{ textAlign: "left" }}>
        `addresses`
      </td>

      <td style={{ textAlign: "left" }}>
        Array of [Addresses](https://docs.moderntreasury.com/platform/reference/address-object) - P.O. boxes are not accepted
      </td>

      <td style={{ textAlign: "left" }}>
        Required
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        Country of Incorporation
      </td>

      <td style={{ textAlign: "left" }}>
        `country_of_incorporation`
      </td>

      <td style={{ textAlign: "left" }}>
        String
      </td>

      <td style={{ textAlign: "left" }}>
        Required
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        Operating Jurisdictions (Where the company does business)
      </td>

      <td style={{ textAlign: "left" }}>
        `operating_jurisdictions`
      </td>

      <td style={{ textAlign: "left" }}>
        Array of Strings
      </td>

      <td style={{ textAlign: "left" }}>
        Required
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        Phone Number
      </td>

      <td style={{ textAlign: "left" }}>
        `phone_numbers`
      </td>

      <td style={{ textAlign: "left" }}>
        Array of phone numbers in [E.164](https://en.wikipedia.org/wiki/E.164) format
      </td>

      <td style={{ textAlign: "left" }}>
        Required
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        Date of Incorporation - YYYY-MM-DD format
      </td>

      <td style={{ textAlign: "left" }}>
        `date_formed`
      </td>

      <td style={{ textAlign: "left" }}>
        String
      </td>

      <td style={{ textAlign: "left" }}>
        Required
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        Monthly Expected Transaction Volume Amount (USD)
      </td>

      <td style={{ textAlign: "left" }}>
        `expected_activity_volume`
      </td>

      <td style={{ textAlign: "left" }}>
        Integer
      </td>

      <td style={{ textAlign: "left" }}>
        Required
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        Purpose of the Account
      </td>

      <td style={{ textAlign: "left" }}>
        `intended_use`
      </td>

      <td style={{ textAlign: "left" }}>
        String
      </td>

      <td style={{ textAlign: "left" }}>
        Required
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        Source of Funds
      </td>

      <td style={{ textAlign: "left" }}>
        `wealth_and_employment_  
                                                                details.source_of_funds`
      </td>

      <td style={{ textAlign: "left" }}>
        String

        Possible Values:\
        `business_revenue`
        `investor_funding`,
        `debt_financing`,
        `sale_of_business_assets`,
        `sale_of_real_estate`,
        `retained_earnings_or_savings`,
        `intercompany_loan`
      </td>

      <td style={{ textAlign: "left" }}>
        Required
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        Employer\
        Identification\
        Number
      </td>

      <td style={{ textAlign: "left" }}>
        `identifications`
      </td>

      <td style={{ textAlign: "left" }}>
        [Identification](https://docs.moderntreasury.com/platform/reference/identifications) with `id_type` of `us_ein`
      </td>

      <td style={{ textAlign: "left" }}>
        Required
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        Proof of Address (utility bill, bank statement, lease, EIN letter, lease agreement)
      </td>

      <td style={{ textAlign: "left" }}>
        `documents`
      </td>

      <td style={{ textAlign: "left" }}>
        [Documents](https://docs.moderntreasury.com/platform/reference/document-object) with `document_type` of `proof_of_address`
      </td>

      <td style={{ textAlign: "left" }}>
        Required
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        Articles of Incorporation
      </td>

      <td style={{ textAlign: "left" }}>
        `documents`
      </td>

      <td style={{ textAlign: "left" }}>
        [Documents](https://docs.moderntreasury.com/platform/reference/document-object) with `document_type` of `articles_of_incorporation`
      </td>

      <td style={{ textAlign: "left" }}>
        Required
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        Legal/Ownership Structure Chart
      </td>

      <td style={{ textAlign: "left" }}>
        `documents`
      </td>

      <td style={{ textAlign: "left" }}>
        [Documents](https://docs.moderntreasury.com/platform/reference/document-object) with `document_type` of `corporate_structure`
      </td>

      <td style={{ textAlign: "left" }}>
        Required for businesses owned by a holding company
      </td>
    </tr>
  </tbody>
</Table>

## Required Fields for Beneficial Owner(s) and Control Person

<Table align={["left","left","left","left","left"]}>
  <thead>
    <tr>
      <th style={{ textAlign: "left" }}>
        Required Information
      </th>

      <th style={{ textAlign: "left" }}>
        Parameter
      </th>

      <th style={{ textAlign: "left" }}>
        Format
      </th>

      <th style={{ textAlign: "left" }}>
        Beneficial Owner
      </th>

      <th style={{ textAlign: "left" }}>
        Control Person
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td style={{ textAlign: "left" }}>
        First Name
      </td>

      <td style={{ textAlign: "left" }}>
        `first_name`
      </td>

      <td style={{ textAlign: "left" }}>
        String
      </td>

      <td style={{ textAlign: "left" }}>
        Required
      </td>

      <td style={{ textAlign: "left" }}>
        Required
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        Middle Name
      </td>

      <td style={{ textAlign: "left" }}>
        `middle_name`
      </td>

      <td style={{ textAlign: "left" }}>
        String
      </td>

      <td style={{ textAlign: "left" }}>
        Required
      </td>

      <td style={{ textAlign: "left" }}>
        Required
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        Last Name
      </td>

      <td style={{ textAlign: "left" }}>
        `last_name`
      </td>

      <td style={{ textAlign: "left" }}>
        String
      </td>

      <td style={{ textAlign: "left" }}>
        Required
      </td>

      <td style={{ textAlign: "left" }}>
        Required
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        Date of Birth
      </td>

      <td style={{ textAlign: "left" }}>
        `date_of_birth`
      </td>

      <td style={{ textAlign: "left" }}>
        String - YYYY-MM-DD format
      </td>

      <td style={{ textAlign: "left" }}>
        Required
      </td>

      <td style={{ textAlign: "left" }}>
        Required
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        Email Address
      </td>

      <td style={{ textAlign: "left" }}>
        `email`
      </td>

      <td style={{ textAlign: "left" }}>
        String
      </td>

      <td style={{ textAlign: "left" }}>
        Required
      </td>

      <td style={{ textAlign: "left" }}>
        Required
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        Physical Address
      </td>

      <td style={{ textAlign: "left" }}>
        `addresses`
      </td>

      <td style={{ textAlign: "left" }}>
        Array of [Addresses](https://docs.moderntreasury.com/platform/reference/address-object) - P.O. boxes are not accepted
      </td>

      <td style={{ textAlign: "left" }}>
        Required
      </td>

      <td style={{ textAlign: "left" }}>
        Required
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        Country of Citizenship
      </td>

      <td style={{ textAlign: "left" }}>
        `citizenship_country`
      </td>

      <td style={{ textAlign: "left" }}>
        String
      </td>

      <td style={{ textAlign: "left" }}>
        Required
      </td>

      <td style={{ textAlign: "left" }}>
        Required
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        Phone Number
      </td>

      <td style={{ textAlign: "left" }}>
        `phone_numbers`
      </td>

      <td style={{ textAlign: "left" }}>
        Array of phone numbers\
        in [E.164](https://en.wikipedia.org/wiki/E.164) format
      </td>

      <td style={{ textAlign: "left" }}>
        Required
      </td>

      <td style={{ textAlign: "left" }}>
        Required
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        Purpose of the Account
      </td>

      <td style={{ textAlign: "left" }}>
        `intended_use`
      </td>

      <td style={{ textAlign: "left" }}>
        String
      </td>

      <td style={{ textAlign: "left" }}>
        Required
      </td>

      <td style={{ textAlign: "left" }}>
        Required
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        Ownership %
      </td>

      <td style={{ textAlign: "left" }}>
        `ownership_percentage`
      </td>

      <td style={{ textAlign: "left" }}>
        String
      </td>

      <td style={{ textAlign: "left" }}>
        Required
      </td>

      <td style={{ textAlign: "left" }}>
        Optional
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        Social Security Number
      </td>

      <td style={{ textAlign: "left" }}>
        `identifications`
      </td>

      <td style={{ textAlign: "left" }}>
        [Identification](https://docs.moderntreasury.com/platform/reference/identifications) with `id_type` of `us_ssn`, `drivers_license`,  or `passport`
      </td>

      <td style={{ textAlign: "left" }}>
        Required for U.S. Individuals
      </td>

      <td style={{ textAlign: "left" }}>
        Required for U.S. Individuals
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        Government-issued identification\
        (i.e., Driver’s License, Passport)\*
      </td>

      <td style={{ textAlign: "left" }}>
        `identifications`
      </td>

      <td style={{ textAlign: "left" }}>
        [Identification](https://docs.moderntreasury.com/platform/reference/identifications) with `id_type` of `drivers_license` or `passport`
      </td>

      <td style={{ textAlign: "left" }}>
        Required:

        For U.S. individuals provide either driver's license or Passport.

        For non-U.S. individuals provide passport.
      </td>

      <td style={{ textAlign: "left" }}>
        Required:

        For U.S. individuals provide either driver's license or Passport.

        For non-U.S. individuals provide passport.
      </td>
    </tr>
  </tbody>
</Table>