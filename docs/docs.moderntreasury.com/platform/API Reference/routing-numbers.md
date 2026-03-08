# Routing Numbers

Modern Treasury validates routing numbers when creating a [Routing Detail](https://docs.moderntreasury.com/platform/reference/routing-detail-object) object to make sure they are valid. This API endpoint can be used to perform the same validation without creating a routing detail, as well as additional validations around sanctions screening.

Some common use cases for this endpoint are:

* You want to validate a routing number the user has entered prior to creating an external account for them.
* You want to do a real-time validation of the routing number that the user is entering in your user interface.
* You want to display the name of the bank that corresponds to the routing number in your user interface.
* You need to validate that the routing number the user provides works for the type of payment you are doing. For example, not all ABA routing numbers work for both ACH and wire payments.
* You want to check that a routing number is not on a sanctions watchlist so that you do not make payments to sanctioned banks.

You may use this endpoint to validate a variety of types of routing numbers. Refer to the `routing_number_type` row below to see which routing number types you may validate.

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
        **routing\_number**
        *string*
      </td>

      <td>
        The routing number that is being validated.
      </td>
    </tr>

    <tr>
      <td>
        **routing\_number\_type**\
        *string*
      </td>

      <td>
        The type of the routing number. Routing number types are listed at [Routing Details](https://docs.moderntreasury.com/platform/reference/routing-detail-object)
      </td>
    </tr>

    <tr>
      <td>
        **supported\_payment\_types**\
        *array*
      </td>

      <td>
        An array of payment types that are supported for this routing number.

        Payment Types include `fednow` along with those listed at [Payment Orders](https://docs.moderntreasury.com/platform/reference/payment-order-object)
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
        **sanctions**\
        *object*
      </td>

      <td>
        For `SWIFT` routing numbers, returns an object of key-value pairs where the keys are institutions, and the values are booleans representing if those institutions have sanctioned the routing number. Institutions include the European Union (`eu_con`), Her Majesty's Treasury (`uk_hmt`), the Office of Foreign Assets Control (`us_ofac`, and the United Nations (`un`).

        For other routing number types, an empty `{}` will be returned.
      </td>
    </tr>
  </tbody>
</Table>

```json Sample ABA Routing Number Validation
{
  "routing_number": "021000021",
  "routing_number_type": "aba",
  "supported_payment_types": ["ach", "wire"],
  "bank_name": "Varo Bank, National Association",
  "bank_address": { 
    "object": "address",
    "line1": "6000 Universal Boulevard",
    "line2": null,
    "locality": "Orlando",
    "region": "FL",
    "postal_code": "32819",
    "country": "US"
  },
  "sanctions": {}  
}
```

```json Sample SWIFT Routing Number Validation
{
  "routing_number": "GRINUST0XXX",
  "routing_number_type": "swift",
  "supported_payment_types": ["ach", "wire", "rtp"],
  "bank_name": "Gringotts Wizarding Bank",
  "bank_address": { 
    "object": "address",
    "line1": "DIAGON ALLEY",
    "line2": null,
    "locality": "LONDON",
    "region": "ENGLAND",
    "postal_code": "W90 3UG",
    "country": "GB"
  },
  "sanctions": {
    "eu_con":false,
    "uk_hmt":false,
    "us_ofac":false,
    "un":false
  }  
}
```

### Instant Payments Eligibility and Routing

Modern Treasury enables you to validate the eligibility of a routing number for instant payments via FedNow and Real-Time Payments (RTP). When performing this validation, Modern Treasury returns `fednow` and `rtp` in the `supported_payment_types` array if the routing number is eligible for each respective network. This feature allows you to assess the coverage of instant payment eligibility among your counterparties.

```json Sample Instant Payments Routing Number Validation
{
  "routing_number": "021000021",
  "routing_number_type": "aba",
  "supported_payment_types": ["ach", "wire", "rtp", "fednow"],
  "bank_name": "Varo Bank, National Association",
  "bank_address": { 
    "object": "address",
    "line1": "6000 Universal Boulevard",
    "line2": null,
    "locality": "Orlando",
    "region": "FL",
    "postal_code": "32819",
    "country": "US"
  },
  "sanctions": {}  
}
```

### Instant Payments `payment_type` Behavior

While Modern Treasury identifies network eligibility, it’s important to note that most banks do not allow customers to explicitly select a specific instant payment network. Instead, banks route the payment automatically between FedNow and RTP based on factors like cost and availability.

As a result, the [Payment Order API](https://docs.moderntreasury.com/platform/reference/payment-order-object) only accepts `rtp` as the value for the `payment_type` parameter when creating an instant payment. If a routing number’s `supported_payment_types` includes either `fednow` or `rtp`, you can initiate an instant payment by creating a Payment Order with `payment_type` set to `rtp`. This ensures that the bank will determine the appropriate network to use based on their routing logic.