# Legal Entities

A `legal_entity` is a person or business with distinct legal rights. Legal Entities can be associated with  [Counterparties](https://docs.moderntreasury.com/platform/reference/counterparty-object) and [Internal Accounts](https://docs.moderntreasury.com/platform/reference/internal-account-object).

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th style={{ textAlign: "left" }}>
        Attribute
      </th>

      <th style={{ textAlign: "left" }}>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td style={{ textAlign: "left" }}>
        **id**
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        Unique identifier for the Legal Entity.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **external\_id**
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        An optional user-defined unique identifier.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **legal\_entity\_type**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        Type of Legal Entity.

        One of: `individual` or `business`.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **risk\_rating**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        Risk rating of the Legal Entity.

        One of: `low`, `medium`, or `high`.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **prefix**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        Prefix of an `individual`.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **first\_name**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        Legal first name of an `individual`.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **middle\_name**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        Legal middle name of an `individual`.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **last\_name**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        Legal last name of an `individual`.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **suffix**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        Suffix of an `individual`.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **preferred\_name**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        Preferred name of an `individual`.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **citizenship\_country**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        Citizenship country of an `individual`.

        Country code conforms to [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) .
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **politically\_exposed\_person**\
        *boolean*
      </td>

      <td style={{ textAlign: "left" }}>
        Whether the `individual` is a politically exposed person.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **date\_of\_birth**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        Date of birth of an `individual`.

        Format: YYYY-MM-DD
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **date\_formed**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        Date of formation of a `business`.

        Format: YYYY-MM-DD
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **business\_name**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        Legal name of the `business`.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **doing\_business\_as\_names**\
        *array string*
      </td>

      <td style={{ textAlign: "left" }}>
        List of doing business as names for a `business`.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **legal\_structure**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        Legal structure of the `business`.

        One of `corporation`, `llc`, `non_profit`, `partnership`, `sole_proprietorship`, `trust`.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **bank\_settings**\
        *object*
      </td>

      <td style={{ textAlign: "left" }}>
        Additional bank-specific settings for a legal entity.

        See [bank-specific docs](https://docs.moderntreasury.com/payments/docs/share-legal-entity-data-with-banks) for available fields for this object.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **wealth\_and\_employment\_details**\
        *object*
      </td>

      <td style={{ textAlign: "left" }}>
        Wealth and employment details for an `individual`.

        See [bank-specific docs](https://docs.moderntreasury.com/payments/docs/share-legal-entity-data-with-banks)  for available fields for this object.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **identifications**\
        *array object*
      </td>

      <td style={{ textAlign: "left" }}>
        An array of [Identifications](https://docs.moderntreasury.com/platform/reference/identifications) used for Tax IDs, legal entity IDs and other identification numbers.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **phone\_numbers**\
        *array object*
      </td>

      <td style={{ textAlign: "left" }}>
        An array of phone numbers in [E.164 format](https://en.wikipedia.org/wiki/E.164).

        e.g. `[{phone_number: "+12061111111"}]`
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **email**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        Email address of the Legal Entity.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **addresses**\
        *array object*
      </td>

      <td style={{ textAlign: "left" }}>
        An array of Legal Entity Addresses.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **website**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        Website of the `business`.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **status**\
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        The activation status of the entity. One of `pending`, `active`, `suspended`, or `closed`.

        Note: Only applicable to legal entities created under a Modern Treasury Payment Accounts connection. All other legal entities will have a static `status` of `pending`.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **metadata**\
        *object*
      </td>

      <td style={{ textAlign: "left" }}>
        Additional data represented as key-value pairs. Both the key and value must be strings. See [Metadata](https://docs.moderntreasury.com/platform/reference/metadata).
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **live\_mode**\
        *boolean*
      </td>

      <td style={{ textAlign: "left" }}>
        This field will be true if this object was created with a production API key or false if created with a test API key.
      </td>
    </tr>
  </tbody>
</Table>

```json Individual Legal Entity Example
{
  "id": "8425ab9c-725f-4ef1-8102-a582926e753b",
  "object": "legal_entity",
  "live_mode": true,
  "legal_entity_type": "individual",
  "risk_rating": "low",
  "first_name": "Mauricio",
  "last_name": "Beer",
  "date_of_birth": "1980-06-07",
  "date_formed": null,
  "business_name": null,
  "doing_business_as_names": [],
  "legal_structure": null,
  "email": "avery.johns@parker.example",
  "website": null,
  "phone_numbers": [
    {
      "phone_number": "+12061111111"
    }
  ],
  "bank_settings": {
    "id": "03af94a0-7f32-46a5-ae29-2b5769d5843f",
    "object": "legal_entity_bank_setting",
    "live_mode": true,
    "backup_withholding_percentage": 10,
    "enable_backup_withholding": true,
    "privacy_opt_out": true,
    "regulation_o": true,
    "discarded_at": null,
    "created_at": "2024-02-05T17:33:51Z",
    "updated_at": "2024-02-05T17:33:51Z"
  },
  "wealth_and_employment_details": {
    "id": "03af94a0-7f32-46a5-ae29-2b5769d5843e",
    "object": "legal_entity_wealth_employment_detail",
    "live_mode": true,
    "employment_status": "employed",
    "occupation": "technology",
    "industry": "finance",
    "income_source": "salary",
    "income_state": "CA",
    "income_country": "US",
    "employer_name": "Modern Treasury",
    "employer_state": "CA",
    "employer_country": "US",
    "source_of_funds": "salary",
    "wealth_source": "salary",
    "annual_income": 100000
  },
  "addresses": [
    {
      "id": "03af94a0-7f32-46a5-ae29-2b5769d5843g",
      "object": "legal_entity_address",
      "live_mode": true,
      "address_types": [],
      "line1": "119 5th Ave",
      "line2": "Suite 600",
      "locality": "New York",
      "region": "NY",
      "postal_code": "10003",
      "country": "US",
      "primary": true,
      "discarded_at": null,
      "created_at": "2024-02-05T17:33:51Z",
      "updated_at": "2024-02-05T17:33:51Z"
    }
  ],
  "identifications": [
    {
      "id": "ae02f9c1-c5d1-4bfd-9712-8df10885defa",
      "object": "identification",
      "expiration_date": "2029-04-14",
      "live_mode": true,
      "id_type": "us_ssn",
      "issuing_country": "US",
      "issuing_region": null,
      "discarded_at": null,
      "created_at": "2024-02-05T17:42:33Z",
      "updated_at": "2024-02-05T17:42:33Z"
    }
  ],
  "metadata": {},
  "discarded_at": null,
  "created_at": "2024-02-05T17:42:33Z",
  "updated_at": "2024-02-05T17:42:33Z"
}
```

```json Business Legal Entity Example
{
  "id": "8555c38f-8906-4390-844e-1e9997009313",
  "object": "legal_entity",
  "live_mode": true,
  "legal_entity_type": "business",
  "risk_rating": "low",
  "first_name": null,
  "last_name": null,
  "date_of_birth": null,
  "date_formed": "2001-06-07",
  "business_name": "Business Name",
  "doing_business_as_names": ["DBA"],
  "legal_structure": ["corporation"],
  "email": "example@gmail.com",
  "website": "http://www.example.com",
  "phone_numbers": [
    {
      "phone_number": "+97213859098921" 
    }
  ],
  "addresses": [
    {
      "id": "03af94a0-7f32-46a5-ae29-2b5769d5843f",
      "object": "legal_entity_address",
      "live_mode": true,
      "address_types": [],
      "line1": "119 5th Ave",
      "line2": "Suite 600",
      "locality": "New York",
      "region": "NY",
      "postal_code": "10003",
      "country": "US",
      "primary": true,
      "discarded_at": null,
      "created_at": "2024-02-05T17:33:51Z",
      "updated_at": "2024-02-05T17:33:51Z"
    }
  ],
  "identifications": [
    {
      "id": "bc6b5ad1-1313-4d5e-b720-0deb99889832",
      "object": "identification",
      "live_mode": true,
      "id_type": "us_ein",
      "issuing_country": "US",
      "discarded_at": null,
      "created_at": "2024-02-05T17:33:51Z",
      "updated_at": "2024-02-05T17:33:51Z"
    }
  ],
  "metadata": {},
  "discarded_at": null,
  "created_at": "2024-02-05T17:33:51Z",
  "updated_at": "2024-02-05T17:33:51Z"
}
```