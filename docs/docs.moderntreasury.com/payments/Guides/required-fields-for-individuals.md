# Required Fields for Individuals

Listed below is the required information for onboarding an individual. These details must be included in your legal entity creation request. For more information on the onboarding process please refer to our [guide for onboarding individuals](https://docs.moderntreasury.com/payments/docs/onboard-an-individual).

<Table align={["left","left","left","left"]}>
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
        Requirement
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
        Physical Address (P.O. boxes are not accepted)
      </td>

      <td style={{ textAlign: "left" }}>
        `addresses`
      </td>

      <td style={{ textAlign: "left" }}>
        Array of [Addresses](https://docs.moderntreasury.com/platform/reference/address-object)
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
        Annual Income
      </td>

      <td style={{ textAlign: "left" }}>
        `wealth_and_employment_details.  
                                                                                annual_income`
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
        Wealth Source
      </td>

      <td style={{ textAlign: "left" }}>
        `wealth_and_employment_details.  
                                                                                wealth_source`
      </td>

      <td style={{ textAlign: "left" }}>
        String

        Possible values: `business_sale`, `family_support`, `government_benefits`, `inheritance`, `investments`, `other`, `rental_income`, `retirement`, `salary`, `self_employed`
      </td>

      <td style={{ textAlign: "left" }}>
        Required
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        Occupation
      </td>

      <td style={{ textAlign: "left" }}>
        `wealth_and_employment_details.  
                                                                                occupation`
      </td>

      <td style={{ textAlign: "left" }}>
        String

        Possible values: `consulting`, `executive`, `finance_accounting`, `food_services`, `government`, `healthcare`, `legal_services`, `manufacturing`, `other`, `sales`, `science_engineering`, \`technology
      </td>

      <td style={{ textAlign: "left" }}>
        Required
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
    </tr>
  </tbody>
</Table>