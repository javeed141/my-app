# Identifications

An `identification` contains fields necessary for an ID. No need to give any dashes `-`, periods `.` or any other separations, just give the digits/characters itself.

Note: The first two letters of `id_type` are the ISO2 country code.

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Attribute
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **id**
        *string*
      </td>

      <td>
        Unique identifier for the Identification.
      </td>
    </tr>

    <tr>
      <td>
        **expiration\_date**\
        *date*
      </td>

      <td>
        The date when the identification is no longer considered valid by the issuing authority.
      </td>
    </tr>

    <tr>
      <td>
        **live\_mode**\
        *boolean*
      </td>

      <td>
        This field will be true if this object was created with a production API key or false if created with a test API key.
      </td>
    </tr>

    <tr>
      <td>
        **id\_type**\
        *string*
      </td>

      <td>
        The type of identification. Pick from the table based on use case.
      </td>
    </tr>

    <tr>
      <td>
        **id\_number**\
        *string*
      </td>

      <td>
        ID numbers are sensitive information and are not included in API responses.
      </td>
    </tr>

    <tr>
      <td>
        **issuing\_country**\
        *string*
      </td>

      <td>
        Country code conforms to [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).

        Not needed for ID types with a country code prepended.
      </td>
    </tr>

    <tr>
      <td>
        **issuing\_region**\
        *string*
      </td>

      <td>
        The region in which the identification was issued.
      </td>
    </tr>

    <tr>
      <td>
        **document\_ids**\
        *array*
      </td>

      <td>
        A list of document IDs for documents associated with a given Identification.
      </td>
    </tr>
  </tbody>
</Table>

Here's the types we support:

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        `id_type`
      </th>

      <th>
        Description
      </th>

      <th>
        Legal

        Entity

        Type
      </th>

      <th>
        Format
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `ar_cuil`
      </td>

      <td>
        Código Único de Identificación Laboral
      </td>

      <td>
        `individual`
      </td>

      <td>
        11 digits
      </td>
    </tr>

    <tr>
      <td>
        `ar_cuit`
      </td>

      <td>
        Clave Unica de Identificacion Tributaria
      </td>

      <td>
        `business`
      </td>

      <td>
        11 digits
      </td>
    </tr>

    <tr>
      <td>
        `br_cnpj`
      </td>

      <td>
        Cadastro Nacional de Pessoas Jurídicas
      </td>

      <td>
        `business`
      </td>

      <td>
        14 digits
      </td>
    </tr>

    <tr>
      <td>
        `br_cpf`
      </td>

      <td>
        Cadastro de Pessoas Físicas
      </td>

      <td>
        `individual`
      </td>

      <td>
        11 digits
      </td>
    </tr>

    <tr>
      <td>
        `cl_run`
      </td>

      <td>
        Rol Único Nacional
      </td>

      <td>
        `individual`
      </td>

      <td>
        8-9 digits
      </td>
    </tr>

    <tr>
      <td>
        `cl_rut`
      </td>

      <td>
        Rol Único Tributario
      </td>

      <td>
        `individual` or\
        `business`
      </td>

      <td>
        8-9 digits
      </td>
    </tr>

    <tr>
      <td>
        `co_nit`
      </td>

      <td>
        Number of Tax Identification
      </td>

      <td>
        `business`
      </td>

      <td>
        10 digits
      </td>
    </tr>

    <tr>
      <td>
        `co_cedulas`
      </td>

      <td>
        Cédulas
      </td>

      <td>
        `individual`
      </td>

      <td>
        7-11 digits
      </td>
    </tr>

    <tr>
      <td>
        `drivers_license`
      </td>

      <td>
        Government-issued motor vehicle permit
      </td>

      <td>
        `individual`
      </td>

      <td />
    </tr>

    <tr>
      <td>
        `hn_id`
      </td>

      <td>
        Tarjeta de Identidad
      </td>

      <td>
        `individual`
      </td>

      <td>
        13 digits
      </td>
    </tr>

    <tr>
      <td>
        `hn_rtn`
      </td>

      <td>
        Registro Tributario Nacional
      </td>

      <td>
        `business`
      </td>

      <td>
        14 digits
      </td>
    </tr>

    <tr>
      <td>
        `in_lei`
      </td>

      <td>
        Legal Entity Identifier
      </td>

      <td>
        `business`
      </td>

      <td>
        20 chars
      </td>
    </tr>

    <tr>
      <td>
        `kr_brn`
      </td>

      <td>
        Business Registration Number
      </td>

      <td>
        `business`
      </td>

      <td>
        10 digits
      </td>
    </tr>

    <tr>
      <td>
        `kr_crn`
      </td>

      <td>
        Corporate Registration Number
      </td>

      <td>
        `business`
      </td>

      <td>
        13 digits
      </td>
    </tr>

    <tr>
      <td>
        `kr_rrn`
      </td>

      <td>
        Resident Registration Number
      </td>

      <td>
        `individual`
      </td>

      <td>
        13 digits
      </td>
    </tr>

    <tr>
      <td>
        `passport`
      </td>

      <td>
        International Passport Number
      </td>

      <td>
        `individual`
      </td>

      <td />
    </tr>

    <tr>
      <td>
        `sa_vat`
      </td>

      <td>
        Value Added Tax ID
      </td>

      <td>
        `business`
      </td>

      <td>
        15 digits
      </td>
    </tr>

    <tr>
      <td>
        `sa_tin`
      </td>

      <td>
        Tax Identification Number
      </td>

      <td>
        `individual`
      </td>

      <td>
        10-12 digits
      </td>
    </tr>

    <tr>
      <td>
        `us_ein`
      </td>

      <td>
        Employer Identification Number
      </td>

      <td>
        `business`
      </td>

      <td>
        9 digits
      </td>
    </tr>

    <tr>
      <td>
        `us_itin`
      </td>

      <td>
        Individual Taxpayer Identification Number
      </td>

      <td>
        `individual`
      </td>

      <td>
        9 digits
      </td>
    </tr>

    <tr>
      <td>
        `us_ssn`
      </td>

      <td>
        Social Security Number
      </td>

      <td>
        `individual`
      </td>

      <td>
        9 digits
      </td>
    </tr>

    <tr>
      <td>
        `vn_tin`
      </td>

      <td>
        Tax Identification Number
      </td>

      <td>
        `individual` or\
        `business`
      </td>

      <td>
        10/13 digits
      </td>
    </tr>
  </tbody>
</Table>

```json Identification Example
{
  "id": "c9bf2462-3a3e-41c5-b5ed-6149fbefd011",
  "object": "identification",
  "live_mode": true,
  "id_type": "us_ein",
  "issuing_country": "US",
  "issuing_region": null,
  "expiration_date": "2029-04-14",
  "discarded_at": null,
  "created_at": "2023-08-31T21:39:32.610Z",
  "updated_at": "2023-08-31T21:39:32.610Z"
}
```