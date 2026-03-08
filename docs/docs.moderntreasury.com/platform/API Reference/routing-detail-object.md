# Routing Details

A `routing_detail` object represents the specific routing information required to transact with someone's bank account. A single bank account in the United States often has different instructions for ACH, domestic wires, and international wires. Using routing details we can encapsulate all these different routing instructions and assign them to a single [account](https://docs.moderntreasury.com/platform/reference/internal-account-object).

Modern Treasury validates routing numbers when creating a Routing Detail object to make sure they are acceptable.

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
        The ID of the routing detail.
      </td>
    </tr>

    <tr>
      <td>
        **payment\_type**\
        *string*
      </td>

      <td>
        If the routing detail is to be used for a specific payment type this field will be populated, otherwise `null`.
      </td>
    </tr>

    <tr>
      <td>
        **routing\_number**\
        *string*
      </td>

      <td>
        The routing number of the bank.
      </td>
    </tr>

    <tr>
      <td>
        **bank\_name**\
        *string*
      </td>

      <td>
        The name of the bank.
      </td>
    </tr>

    <tr>
      <td>
        **bank\_address**\
        *object*
      </td>

      <td>
        The address of the bank.
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
        **routing\_number\_type**\
        *string*
      </td>

      <td>
        One of\
        "aba", (USA)\
        "au\_bsb", (Australia)\
        "br\_codigo", (Brazil)\
        "ca\_cpa", (Canada)\
        "chips", (USA)\
        "cnaps", (China)\
        "dk\_interbank\_clearing\_code", (Denmark)\
        "gb\_sort\_code", (UK)\
        "hk\_interbank\_clearing\_code", (Hong Kong)\
        "hu\_interbank\_clearing\_code", (Hungary)\
        "id\_sknbi\_code", (Indonesia)\
        "il\_bank\_code", (Israel)\
        "in\_ifsc", (India)\
        "jp\_zengin\_code", (Japan)\
        "my\_branch\_code",(Malaysia)\
        "mx\_bank\_identifier", (Mexico)\
        "nz\_national\_clearing\_code", (New Zealand)\
        "pl\_national\_clearing\_code", (Poland)\
        "se\_bankgiro\_clearing\_code", (Sweden)\
        "sg\_interbank\_clearing\_code", (Singapore)\
        "swift", (International SWIFT BIC, SEPA)\
        "za\_national\_clearing\_code" (South Africa)
      </td>
    </tr>
  </tbody>
</Table>

```json Routing Details Example
{
  "id": "2e90da60-405c-44bc-8b33-2bdb9419afe3",
  "object": "routing_detail",
  "payment_type": null,
  "routing_number": "021000021",
  "routing_number_type": "aba",
  "bank_name": "Gringotts Wizarding Bank",
  "bank_address": {
    "id": "fcf5ebe1-b990-4684-880f-f69c277106bb",
    "object": "address",
    "line1": "6000 Universal Boulevard",
    "line2": null,
    "locality": "Orlando",
    "region": "FL",
    "postal_code": "32819",
    "country": "US"
  },
  "live_mode": true,
  "created_at": "2019-11-09T00:11:07Z",
  "updated_at": "2019-11-09T00:11:07Z"
}
```