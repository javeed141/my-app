# Account Details

An `account_detail` object represents all account numbers related to a specific bank account or stablecoin wallets. Often bank accounts will only have a single number but having multiple is more common outside the United States. For example in some countries, the IBAN is used for international routing but domestic payments will use a separate unformatted account number. Modern Treasury allows you to provide both account numbers and our software will choose the correct one in all cases.

<br />

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
        **account\_number\_safe**
        *string*
      </td>

      <td>
        The last four digits of the account number for the bank account.
      </td>
    </tr>

    <tr>
      <td>
        **account\_number**\
        *string*
      </td>

      <td>
        Bank account numbers are sensitive information and are not included in API responses by default. Modern Treasury advises using the `account_number_safe` field instead. Learn more about changing your settings [here](https://docs.moderntreasury.com/reference/data-privacy-controls).  In some cases, this may be a stablecoin wallet address.
      </td>
    </tr>

    <tr>
      <td>
        **account\_number\_type**\
        *string*
      </td>

      <td>
        One of the below `account_number_type` values.

        Use `other` if the bank account number is in a generic format.
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
  </tbody>
</Table>

<br />

Here are the Account Number Types we support at MT. Make sure you're using the right `account_number_type` based on the locations of the both accounts and what's needed by the `payment_type`.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        `account_number_type`
      </th>

      <th>
        Country
      </th>

      <th>
        Format
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `au_number`
      </td>

      <td>
        Australia
      </td>

      <td>
        12-15 digits\
        First 3 - Bank Code\
        Next 3 - Branch Code\
        Last 6-9 - Account Number
      </td>
    </tr>

    <tr>
      <td>
        `clabe`
      </td>

      <td>
        Mexico
      </td>

      <td>
        18 digits\
        First 3 - Bank Code\
        Next 3 - Branch Code\
        Next 11 - Account number\
        Last 1 - Control Digit
      </td>
    </tr>

    <tr>
      <td>
        `hk_number`
      </td>

      <td>
        Hong Kong
      </td>

      <td>
        XXXXXX-YYY\
        X is the base account number\
        5-6 digits long\
        Y is the account suffix\
        1-3 digits long

        Note: Only use this when you have a suffix,\
        otherwise use `other`
      </td>
    </tr>

    <tr>
      <td>
        `iban`
      </td>

      <td>
        Any (IBAN)
      </td>

      <td>
        Upto 34 letters depending on country\
        First 2 - ISO 2 letter country code\
        Next 2 - Check Digits\
        Rest - Basic Bank Account Number\
        (BBAN)
      </td>
    </tr>

    <tr>
      <td>
        `id_number`
      </td>

      <td>
        Indonesia
      </td>

      <td>
        6-16 Digits
      </td>
    </tr>

    <tr>
      <td>
        `nz_number`
      </td>

      <td>
        New Zealand
      </td>

      <td>
        15-16 Digits\
        (Combined Routing\&Account Number)\
        First 2 - Bank Code\
        Next 4 - Branch Code\
        Next 7 - Account Number\
        Rest - Account Number Suffix
      </td>
    </tr>

    <tr>
      <td>
        `other`
      </td>

      <td>
        Any (Generic)
      </td>

      <td>
        Only Digits
      </td>
    </tr>

    <tr>
      <td>
        `pan`
      </td>

      <td>
        Any (Cards)
      </td>

      <td>
        12-19 Digits\
        Generally 16 Digits
      </td>
    </tr>

    <tr>
      <td>
        `sg_number`
      </td>

      <td>
        Singapore
      </td>

      <td>
        6-34 Digits
      </td>
    </tr>

    <tr>
      <td>
        `wallet_address`
      </td>

      <td>
        Any (Wallet)
      </td>

      <td>
        Wallet Provider Specific Format
      </td>
    </tr>
  </tbody>
</Table>

```json Account Details Example
{
  "id": "f3552822-38f5-4dd5-aa10-a5a2fce00ed6",
  "object": "account_detail",
  "account_number_safe": "0934",
  "account_number_type": "other",
  "live_mode": true,
  "created_at": "2019-11-09T00:11:07Z",
  "updated_at": "2019-11-09T00:11:07Z"
}
```