# Incoming Payment Details

An `incoming_payment_detail` represents a payment where your bank is the RDFI (receiving bank) and your account is the receiving account, as opposed to a payment you originate via a Payment Order. The incoming payment detail will be reconciled to a [transaction](https://docs.moderntreasury.com/platform/reference/transaction-object) when the payment arrives in your bank account. These are typically used for more advanced use cases, such as [return](https://docs.moderntreasury.com/platform/reference/return-object) initiation or inbound payment attribution using [virtual accounts](https://docs.moderntreasury.com/platform/reference/virtual-account-object).

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
        Unique identifier for the incoming payment detail
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **type**
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        One of: `ach`, `au_becs`, `bacs`, `book`, `check`, `eft`, `interac`, `neft`, `nz_becs`, `rtp`, `sepa`, `signet`, `wire`.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **amount**
        *int32*
      </td>

      <td style={{ textAlign: "left" }}>
        Value in specified currency's smallest unit. e.g. $10 would be represented as `1000`.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **currency**
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        The currency of the incoming payment detail.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **direction**
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        One of `credit`, `debit`
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **as\_of\_date**
        *date*
      </td>

      <td style={{ textAlign: "left" }}>
        The date on which the corresponding transaction will occur.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **internal\_account\_id**
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        The ID of the [Internal Account](https://docs.moderntreasury.com/platform/reference/internal-account-object) for the incoming payment detail. This is always present.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **virtual\_account\_id**
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        If the incoming payment detail is in a virtual account, the ID of the [Virtual Account](https://docs.moderntreasury.com/platform/reference/virtual-account-object).
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **virtual\_account**
        *object*
      </td>

      <td style={{ textAlign: "left" }}>
        If the incoming payment detail is in a virtual account, the serialized virtual account object.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **transaction\_line\_item\_id**
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        The ID of the reconciled [Transaction Line Item](https://docs.moderntreasury.com/platform/reference/transaction-line-item-object) or `null`.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **transaction\_id**
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        The ID of the reconciled [Transaction](https://docs.moderntreasury.com/platform/reference/transaction-object) or `null`.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **ledger\_transaction\_id**
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        The ID of the ledger transaction linked to the incoming payment detail or `null`.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **data**
        *object*
      </td>

      <td style={{ textAlign: "left" }}>
        The raw data from the payment pre-notification file that we get from the bank.

        This field may contain sensitive information and is not included in API responses by default. Learn more about changing your settings [here](https://docs.moderntreasury.com/reference/data-privacy-controls).
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **status**
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        The current status of the incoming payment detail. One of `pending`, `completed`, or `returned`.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **metadata**
        *object*
      </td>

      <td style={{ textAlign: "left" }}>
        Additional data represented as key-value pairs. Both the key and value must be strings. See [Metadata](https://docs.moderntreasury.com/platform/reference/metadata).
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **reconciliation\_status**
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        The current reconciliation status. One of `unreconciled`, `tenatively_reconciled`, or `reconciled`.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **live\_mode**
        *boolean*
      </td>

      <td style={{ textAlign: "left" }}>
        This field will be true if this object exists in the live environment or false if it exists in the test environment.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **originating\_account\_number\_safe**
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        The last 4 digits of the originating account\_number for the incoming payment detail.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **originating\_account\_number\_type**
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        The type of the originating account number for the incoming payment detail.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **originating\_routing\_number**
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        The routing number of the originating account for the incoming payment detail.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **originating\_routing\_number\_type**
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        The type of the originating routing number for the incoming payment detail.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **vendor\_id**
        *string*
      </td>

      <td style={{ textAlign: "left" }}>
        An identifier given to this payment detail by the bank.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **created\_at**
        *datetime*
      </td>

      <td style={{ textAlign: "left" }}>
        The time at which the incoming payment detail was created.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **updated\_at**
        *datetime*
      </td>

      <td style={{ textAlign: "left" }}>
        The time at which the incoming payment detail was last updated.
      </td>
    </tr>
  </tbody>
</Table>

```json Incoming Payment Detail Example
{
  "id": "4844bda1-eb57-4129-afb4-fc663a395ca0",
  "object": "incoming_payment_detail",
  "internal_account_id": "487b9a5c-6737-43ea-b11c-593f39226b92",
  "virtual_account_id": null,
  "virtual_account": null,
  "transaction_line_item_id": null,
  "transaction_id": null,
  "type": "ach",
  "data": { // This field may contain PII and is not included in API responses by default
    "batch_header_record": {
      "batch_number": "999",
      "company_name": "moderntreasury.com",
      "settlement_date": 17,
      "service_class_code": "200",
      "effective_entry_date": "2019-01-30",
      "company_identification": "9999999999",
      "originator_status_code": "1",
      "company_descriptive_date": "",
      "company_entry_description": "moderntreasury.co",
      "standard_entry_class_code": "CCD",
      "company_discretionary_data": "",
      "originating_dfi_identification": "99999999"
    },
    "detail_record": {
      "amount": 10000,
      "trace_number": "999999999999999",
      "transaction_code": "27",
      "dfi_account_number": "99999",
      "discretionary_data": "",
      "identification_number": "moderntreasury.com",
      "receiving_company_name": "EXAMPLE INC",
      "addenda_record_indicator": true
    },
    "payment_related_information": "Lorem Ipsum",
  },
  "amount": 10000,
  "currency": "USD",
  "direction": "debit",
  "status": "pending",
	"reconciliation_status": "unreconciled",
  "metadata": {},
  "as_of_date": "2020-10-17",
  "live_mode": true,
  "created_at": "2020-10-15T04:23:11Z",
  "updated_at": "2020-10-15T04:23:11Z"
}
```

## Example objects

Here are some sample bodies for what an incoming payment detail would look like, depending on the type of payment.

```json Example for ACH
{
  "id": "4844bda1-eb57-4129-afb4-fc663a395ca0",
  "object": "incoming_payment_detail",
  "internal_account_id": "487b9a5c-6737-43ea-b11c-593f39226b92",
  "virtual_account_id": null,
  "virtual_account": null,
  "transaction_line_item_id": null,
  "transaction_id": null,
  "type": "ach",
  "data": { // This field may contain PII and is not included in API responses by default
    "batch_header_record": {
      "batch_number": "999",
      "company_name": "moderntreasury.com",
      "settlement_date": 17,
      "service_class_code": "200",
      "effective_entry_date": "2019-01-30",
      "company_identification": "9999999999",
      "originator_status_code": "1",
      "company_descriptive_date": "",
      "company_entry_description": "moderntreasury.co",
      "standard_entry_class_code": "CCD",
      "company_discretionary_data": "",
      "originating_dfi_identification": "99999999"
    },
    "detail_record": {
      "amount": 10000,
      "trace_number": "999999999999999",
      "transaction_code": "27",
      "dfi_account_number": "99999",
      "discretionary_data": "",
      "identification_number": "moderntreasury.com",
      "receiving_company_name": "EXAMPLE INC",
      "addenda_record_indicator": true
    },
    "payment_related_information": "Lorem Ipsum",
  },
  "amount": 10000,
  "currency": "USD",
  "direction": "debit",
  "status": "pending",
	"reconciliation_status": "unreconciled",
  "metadata": {},
  "as_of_date": "2020-10-17",
  "live_mode": true,
  "created_at": "2020-10-15T04:23:11Z",
  "updated_at": "2020-10-15T04:23:11Z"
}
```

```json Example for IAT ACH
{
  "id": "4844bda1-eb57-4129-afb4-fc663a395ca0",
  "object": "incoming_payment_detail",
  "internal_account_id": "487b9a5c-6737-43ea-b11c-593f39226b92",
  "virtual_account_id": null,
  "virtual_account": null,
  "transaction_line_item_id": null,
  "transaction_id": null,
  "type": "ach",
  "data": { // This field may contain PII and is not included in API responses by default
    "batch_header_record": {
      "service_class_code": "200",
      "standard_entry_class_code": "IAT",
      "company_entry_description": "EXAMPLE",
      "effective_entry_date": "2020-10-22",
      "settlement_date": 296,
      "originator_status_code": "1",
      "originating_dfi_identification": "098765431",
      "batch_number": "487",
      "iat_indicator": "",
      "foreign_exchange_indicator": "FF",
      "foreign_exchange_reference_indicator": "3",
      "foreign_exchange_reference": "",
      "iso_destination_country_code": "US",
      "originator_identification": "1234567890",
      "iso_originating_currency_code": "USD",
      "iso_destination_currency_code": "USD"
    },
    "detail_record": {
      "transaction_code": "22",
      "amount": 10000,
      "addenda_record_indicator": true,
      "trace_number": "999999999999999",
      "number_of_addenda_records": 10,
      "dfi_account_number": "99999",
      "gateway_operator_ofac_screening_indicator": "",
      "secondary_ofac_screening_indicator": "0"
    },
    "addenda_record": {
       "transaction_type_code": "MIS",
       "foreign_payment_amount": 0,
       "foreign_trace_number": "",
       "receiving_name": "EXAMPLE INC",
       "originator_name": "Jane Doe",
       "originator_street_address": "123 Main St",
       "originator_locality_and_region": "San Francisco*CA\\",
       "originator_country_and_postal_code": "US*94109\\",
       "originating_dfi_name": "Wells Fargo",
       "originating_dfi_identification_number_qualifier": "01",
       "originating_dfi_identification": "99999999",
       "originating_dfi_branch_country_code": "US",
       "receiving_dfi_name": "SILICON VALLEY BANK",
       "receiving_dfi_identification_number_qualifier": "01",
       "receiving_dfi_identification": "99999999",
       "receiving_dfi_branch_country_code": "US",
       "receiver_identification_number": "99999999",
       "receiver_street_address": "123 Main Street",
       "receiver_locality_and_region": "San Francisco*CA\\",
       "receiver_country_and_postal_code": "US*94107\\"
    },
    "payment_related_information": "Lorem Ipsum",
    "foreign_corresponent_bank_records": [
      {
        "foreign_correspondent_bank_name": "AS LHV Pank",
        "foreign_correspondent_bank_identification_number_qualifier": "02",
        "foreign_correspondent_bank_identification_number": "LHVBXX00",
        "foreign_correspondent_bank_branch_country_code": "EE"
      }
    ]
  },
  "amount": 10000,
  "currency": "USD",
  "direction": "debit",
  "status": "pending",
	"reconciliation_status": "unreconciled",
  "metadata": {},
  "as_of_date": "2020-10-17",
  "live_mode": true,
  "created_at": "2020-10-15T04:23:11Z",
  "updated_at": "2020-10-15T04:23:11Z"
}
```

```json Example for wires at Increase
{
  "id": "0f8e3719-3dfd-4613-9bbf-c0333781b59f",
  "data": { // This field may contain PII and is not included in API responses by default
    "imad": "20210121L1B77D1C001602",
    "omad": "20210121GMQFMP0100602801210908",
    "reference": "20210210840500",
    "sender_aba": "121140399",
    "wire_amount": 10000,
    "currency_code": "USD",
    "originator_id": "1234567",
    "account_number": "987654321",
    "beneficiary_id": "987654321",
    "payment_method": "Fed",
    "originator_name": "BERKSHIRE HATHAWAY.",
    "beneficiary_name": "BERKSHIRE HATHAWAY.",
    "transaction_date": "2021-01-21",
    "reference_for_bank": "",
    "beneficiary_id_code": "D",
    "originator_address_1": "1 Main St",
    "originator_address_2": "10TH FLOOR",
    "originator_address_3": "SAN FRANCISCO, CA  94104",
    "wire_sequence_number": "45137763",
    "beneficiary_address_1": "2 Main St.",
    "beneficiary_address_2": "UNIT 12",
    "beneficiary_address_3": "US",
    "business_function_code": "CTR",
    "transaction_description": "I",
    "bank_to_bank_information": "",
    "originator_to_beneficiary_information": "16E1042F27E540E5                   /ROC/16E1042F27E540E5/OBI GOES HERE"
  },
  "type": "wire",
  "amount": 10000,
  "object": "incoming_payment_detail",
  "status": "pending",
	"reconciliation_status": "unreconciled",
  "currency": "USD",
  "metadata": {},
  "direction": "credit",
  "live_mode": true,
  "as_of_date": "2021-01-21",
  "created_at": "2021-01-21T17:05:39Z",
  "updated_at": "2021-01-21T17:05:39Z",
  "transaction_id": "00dea47c-2011-480d-ab02-44cfea7b2890",
  "virtual_account_id": null,
  "virtual_account": null,
  "internal_account_id": "07d61aca-e5ba-4008-b00d-cfca8d7c5290",
  "transaction_line_item_id": "9dde4e56-30a9-452e-a196-e0858c4dced5"
}
```

```json Example for wires at Wells Fargo
{
  "id": "9f4e35df-87d7-469e-ba1b-4d67ce10ce11",
  "data": { // This field may contain PII and is not included in API responses by default
    "wire_reference": "010203040506",
    "fed_reference": "0003",
    "ogb": "MAIN BANK POST OFFICE BOX 101 ANYTOWN, CALIFORNIA 94567-1234",
    "org": "ACME FURNITURE 12345 PARKSIDE AVE. ANYTOWN , CA, 94567",
    "obi": "GROUP NO 21212 3",
    "bnf": "33300000222210000 ABC"
  },
  "type": "wire",
  "amount": 20000,
  "object": "incoming_payment_detail",
  "status": "completed",
	"reconciliation_status": "reconciled",
  "currency": "USD",
  "metadata": {},
  "direction": "credit",
  "live_mode": true,
  "as_of_date": "2021-06-27",
  "created_at": "2021-06-27T15:59:40Z",
  "updated_at": "2021-06-27T15:59:40Z",
  "transaction_id": "02464daf-84ac-416d-b0c3-8c95d8ac7b8e",
  "virtual_account_id": null,
  "virtual_account": null,
  "internal_account_id": "168f0508-c47c-4b61-9852-213112f14ddb",
  "transaction_line_item_id": "f7572374-bbec-495f-84e7-f2278df74bef"
}
```

```Text Example for incoming lockbox payments
{
  "id": "ad5e5509-0777-49d3-ac6e-25d7b46cffe8",
  "data": {  // This field may contain PII and is not included in API responses by default
    "lockbox_number": "24869",
    "deposit_date": "10/25/2018",
    "check_number": "3077786220",
    "remitter_name": "MODERN TREASURY",
    "memo_field": "TEST"
  },
  "object": "incoming_payment_detail",
  "live_mode": true,
  "internal_account_id": "0039eb61-b3d2-49af-9f39-dddf7077ad98",
  "virtual_account_id": null,
  "virtual_account": null,
  "transaction_line_item_id": "b6652435-df85-4e79-9cb0-c01af5e37b93",
  "transaction_id": "07612f5a-24d6-4b28-8a34-70d4377abcf4",
  "ledger_transaction_id": null,
  "type": "check",
  "amount": 115124,
  "currency": "USD",
  "direction": "credit",
  "status": "completed",
  "metadata": {},
  "as_of_date": "2018-10-25",
  "vendor_id": null,
  "created_at": "2023-10-04T17:38:10Z",
  "updated_at": "2023-11-01T22:28:15Z"
}
```