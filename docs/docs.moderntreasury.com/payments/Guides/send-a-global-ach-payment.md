# Originate a Global ACH payment

## Overview

Let's assume you want to send money to a customer located in another country. You want to settle this payment cheaply, and you do not have a bank account domiciled in the country you are sending to. You can send a Global ACH payment by creating a `cross_border` type Payment Order from a bank account domiciled in the US to a supported foreign currency via the local clearing system for the target region/currency. Note that Global ACH does not support full-life cycle tracking of Returns and is credit only, unlike US ACH. In this guide, we will walk you through:

* How to choose the right clearing rail subtype and understand the fields required
* How to send a Global ACH payment

## Choosing the right `cross_border` subtype

Before sending a Global ACH, you must determine the country corridor for the payment you are planning on sending money to and it's corresponding local settlement system. This will depend on the desired settlement time of the currency and what our partner bank is capable of.

Note that depending on the region of the payment, you will need to include the appropriate purpose code along with the appropriate Counterparty address and External Account information to settle the payment. Here is a list of the regions currently supported and the information required to transact in them:

<Table align={["left","left","left","left","left","left","left"]}>
  <thead>
    <tr>
      <th style={{ textAlign: "left" }}>
        Local Settlement System
      </th>

      <th style={{ textAlign: "left" }}>
        Currency
      </th>

      <th style={{ textAlign: "left" }}>
        Receiving Region
      </th>

      <th style={{ textAlign: "left" }}>
        Subtype
      </th>

      <th style={{ textAlign: "left" }}>
        Receiving Account Type
      </th>

      <th style={{ textAlign: "left" }}>
        Receiving Routing Type
      </th>

      <th style={{ textAlign: "left" }}>
        Purpose Code
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td style={{ textAlign: "left" }}>
        AU BECS
      </td>

      <td style={{ textAlign: "left" }}>
        `AUD`
      </td>

      <td style={{ textAlign: "left" }}>
        Australia
      </td>

      <td style={{ textAlign: "left" }}>
        `au_becs`
      </td>

      <td style={{ textAlign: "left" }}>
        Local Account Number (`other`)
      </td>

      <td style={{ textAlign: "left" }}>
        AU BSB (`au_bsb`)

        *(Goldmans Sachs will require an additional Swift (`swift`) routing type)*
      </td>

      <td style={{ textAlign: "left" }}>
        *N/A*
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        CCEN
      </td>

      <td style={{ textAlign: "left" }}>
        `MXN`
      </td>

      <td style={{ textAlign: "left" }}>
        Mexico
      </td>

      <td style={{ textAlign: "left" }}>
        `mx_ccen`
      </td>

      <td style={{ textAlign: "left" }}>
        CLABE Number (`clabe`)
      </td>

      <td style={{ textAlign: "left" }}>
        *N/A*
      </td>

      <td style={{ textAlign: "left" }}>
        *N/A*
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        CHATS
      </td>

      <td style={{ textAlign: "left" }}>
        `HKD`
      </td>

      <td style={{ textAlign: "left" }}>
        Hong\
        Kong
      </td>

      <td style={{ textAlign: "left" }}>
        `chats`
      </td>

      <td style={{ textAlign: "left" }}>
        HK Number `hk_number` in the format `aaaaaa-xxx`)

        (Citi will also accept Local Account Number (`other`) without dashes)
      </td>

      <td style={{ textAlign: "left" }}>
        Hong Kong Interbank Clearing Code (`hk_interbank_clearing_code`)

        *(SVB will require an additional Swift (`swift`) routing type)*
      </td>

      <td style={{ textAlign: "left" }}>
        Varies by financial institution
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        Danish Interbank Clearing System
      </td>

      <td style={{ textAlign: "left" }}>
        `DKK`
      </td>

      <td style={{ textAlign: "left" }}>
        Denmark
      </td>

      <td style={{ textAlign: "left" }}>
        `dk_nets`
      </td>

      <td style={{ textAlign: "left" }}>
        Local Account Number (`other`)

        (SVB will require IBAN (`iban`))
      </td>

      <td style={{ textAlign: "left" }}>
        Danish Interbank Clearing Code (`dk_interbank_clearing_code`)

        *(SVB will alternatively require a SWIFT (`swift`))*
      </td>

      <td style={{ textAlign: "left" }}>
        Varies by financial institution
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        EFT
      </td>

      <td style={{ textAlign: "left" }}>
        `CAD`
      </td>

      <td style={{ textAlign: "left" }}>
        Canada
      </td>

      <td style={{ textAlign: "left" }}>
        `eft`
      </td>

      <td style={{ textAlign: "left" }}>
        Local Account Number (`other`)
      </td>

      <td style={{ textAlign: "left" }}>
        CPA Routing (`ca_cpa`)

        *(Goldmans Sachs will require an additional Swift (`swift`) routing type)*
      </td>

      <td style={{ textAlign: "left" }}>
        [CPA Codes](https://www.tdcommercialbanking.com/wbb/help/English/wbwEFTCPACodes.html)
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        ELIXIR
      </td>

      <td style={{ textAlign: "left" }}>
        `PLN`
      </td>

      <td style={{ textAlign: "left" }}>
        Poland
      </td>

      <td style={{ textAlign: "left" }}>
        `pl_elixir`
      </td>

      <td style={{ textAlign: "left" }}>
        IBAN (`iban`)
      </td>

      <td style={{ textAlign: "left" }}>
        * N/A\_ for Citi. SVB will require Swift (`swift`)
      </td>

      <td style={{ textAlign: "left" }}>
        *N/A*
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        GB BACS
      </td>

      <td style={{ textAlign: "left" }}>
        `GBP`
      </td>

      <td style={{ textAlign: "left" }}>
        United Kingdom
      </td>

      <td style={{ textAlign: "left" }}>
        `bacs`
      </td>

      <td style={{ textAlign: "left" }}>
        Local Account Number (`other`)
      </td>

      <td style={{ textAlign: "left" }}>
        GB Sort Code (`gb_sort_code`)

        *(Goldmans Sachs will require an additional Swift (`swift`) routing type)*
      </td>

      <td style={{ textAlign: "left" }}>
        *N/A*
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        GIRO
      </td>

      <td style={{ textAlign: "left" }}>
        `SGD`
      </td>

      <td style={{ textAlign: "left" }}>
        Singapore
      </td>

      <td style={{ textAlign: "left" }}>
        `sg_giro`
      </td>

      <td style={{ textAlign: "left" }}>
        Local Account Number (`other`)
      </td>

      <td style={{ textAlign: "left" }}>
        SWIFT (`swift`)
      </td>

      <td style={{ textAlign: "left" }}>
        Varies by financial institution
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        Hungarian Interbank Clearing System
      </td>

      <td style={{ textAlign: "left" }}>
        `HUF`
      </td>

      <td style={{ textAlign: "left" }}>
        Hungary
      </td>

      <td style={{ textAlign: "left" }}>
        `hu_ics`
      </td>

      <td style={{ textAlign: "left" }}>
        Local Account Number (`other`)
      </td>

      <td style={{ textAlign: "left" }}>
        Hungarian Interbank Clearing Code (`hu_interbank_clearing_code`)
      </td>

      <td style={{ textAlign: "left" }}>
        *N/A*
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        JP Zengin
      </td>

      <td style={{ textAlign: "left" }}>
        `JPY`
      </td>

      <td style={{ textAlign: "left" }}>
        Japan
      </td>

      <td style={{ textAlign: "left" }}>
        `zengin`
      </td>

      <td style={{ textAlign: "left" }}>
        Local Account Number (`other`)
      </td>

      <td style={{ textAlign: "left" }}>
        Zengin Code (`jp_zengin_code`)

        *(Goldmans Sachs will require an additional Swift (`swift`) routing type)*
      </td>

      <td style={{ textAlign: "left" }}>
        [ISO Purpose Codes](https://docs.moderntreasury.com/platform/docs/sending-a-global-ach#iso-purpose-codes) (Except for `ISGDDS`)
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        MASAV
      </td>

      <td style={{ textAlign: "left" }}>
        `ILS`
      </td>

      <td style={{ textAlign: "left" }}>
        Israel
      </td>

      <td style={{ textAlign: "left" }}>
        `masav`
      </td>

      <td style={{ textAlign: "left" }}>
        IBAN (`iban`)
      </td>

      <td style={{ textAlign: "left" }}>
        SWIFT (`swift`)
      </td>

      <td style={{ textAlign: "left" }} />
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        NEFT
      </td>

      <td style={{ textAlign: "left" }}>
        `INR`
      </td>

      <td style={{ textAlign: "left" }}>
        India
      </td>

      <td style={{ textAlign: "left" }}>
        `neft`
      </td>

      <td style={{ textAlign: "left" }}>
        Local Account Number (`other`)
      </td>

      <td style={{ textAlign: "left" }}>
        IFSC Code (`in_ifsc`)
      </td>

      <td style={{ textAlign: "left" }}>
        [FETERS Payment Receipt Codes](https://rbidocs.rbi.org.in/rdocs/notification/PDFs/ASAP840212FL.pdf)
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        NICS
      </td>

      <td style={{ textAlign: "left" }}>
        `NOK`
      </td>

      <td style={{ textAlign: "left" }}>
        Norway
      </td>

      <td style={{ textAlign: "left" }}>
        `nics`
      </td>

      <td style={{ textAlign: "left" }}>
        IBAN (`iban`)
      </td>

      <td style={{ textAlign: "left" }}>
        SWIFT (`swift`)
      </td>

      <td style={{ textAlign: "left" }}>
        *N/A*
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        NZ BECS
      </td>

      <td style={{ textAlign: "left" }}>
        `NZD`
      </td>

      <td style={{ textAlign: "left" }}>
        New Zealand
      </td>

      <td style={{ textAlign: "left" }}>
        `nz_becs`
      </td>

      <td style={{ textAlign: "left" }}>
        Local Account Number (`other`)
      </td>

      <td style={{ textAlign: "left" }}>
        New Zealand National Clearing Code (`nz_national_clearing_code`)

        *(Goldmans Sachs will require an additional Swift (`swift`) routing type)*
      </td>

      <td style={{ textAlign: "left" }}>
        *N/A*
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        SENT
      </td>

      <td style={{ textAlign: "left" }}>
        `RON`
      </td>

      <td style={{ textAlign: "left" }}>
        Romania
      </td>

      <td style={{ textAlign: "left" }}>
        `ro_sent`
      </td>

      <td style={{ textAlign: "left" }}>
        IBAN (`iban`)
      </td>

      <td style={{ textAlign: "left" }}>
        SWIFT (`swift`)
      </td>

      <td style={{ textAlign: "left" }}>
        *N/A*
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        SEPA
      </td>

      <td style={{ textAlign: "left" }}>
        `EUR`
      </td>

      <td style={{ textAlign: "left" }}>
        SEPA Zone (Europe)
      </td>

      <td style={{ textAlign: "left" }}>
        `sepa`
      </td>

      <td style={{ textAlign: "left" }}>
        IBAN (`iban`)
      </td>

      <td style={{ textAlign: "left" }}>
        SWIFT (`swift`)
      </td>

      <td style={{ textAlign: "left" }}>
        *N/A*
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        SIC
      </td>

      <td style={{ textAlign: "left" }}>
        `CHF`
      </td>

      <td style={{ textAlign: "left" }}>
        Switzerland
      </td>

      <td style={{ textAlign: "left" }}>
        `sic`
      </td>

      <td style={{ textAlign: "left" }}>
        IBAN (`iban`)
      </td>

      <td style={{ textAlign: "left" }}>
        SWIFT (`swift`)
      </td>

      <td style={{ textAlign: "left" }} />
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        SKBNI
      </td>

      <td style={{ textAlign: "left" }}>
        `IDR`
      </td>

      <td style={{ textAlign: "left" }}>
        Indonesia
      </td>

      <td style={{ textAlign: "left" }}>
        `sknbi`
      </td>

      <td style={{ textAlign: "left" }}>
        Local Account Number (`other`)
      </td>

      <td style={{ textAlign: "left" }}>
        Indonesian SKNBI Code (`id_sknbi_code`)
      </td>

      <td style={{ textAlign: "left" }}>
        *N/A*
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        Swedish Bankgirot
      </td>

      <td style={{ textAlign: "left" }}>
        `SEK`
      </td>

      <td style={{ textAlign: "left" }}>
        Sweden
      </td>

      <td style={{ textAlign: "left" }}>
        `se_bankgirot`
      </td>

      <td style={{ textAlign: "left" }}>
        IBAN(`iban`)
      </td>

      <td style={{ textAlign: "left" }}>
        Swedish Bankgiro Code (`se_bankgiro_clearing_code`)

        *(Goldmans Sachs will require an additional Swift (`swift`) routing type)*

        *(SVB will require just a Swift (`swift`) routing type)*
      </td>

      <td style={{ textAlign: "left" }}>
        *N/A*
      </td>
    </tr>
  </tbody>
</Table>

> 🚧 Minimum Amounts
>
> Contact your bank to understand the minimum amounts supported to transact within each `subtype`.

## Payments that require IDs

Some countries require taxpayer ID numbers as part of the payment instruction sent to the bank.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Country
      </th>

      <th>
        Currency
      </th>

      <th>
        Required IDs
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Brazil
      </td>

      <td>
        `BRL`
      </td>

      <td>
        For individuals - Brazilian CPF (`br_cpf`)\
        For businesses - Brazilian CNPJ (`br_cnpj`)
      </td>
    </tr>
  </tbody>
</Table>

You can create Legal Entities to store these international taxpayer IDs. Here is the [API guide](https://docs.moderntreasury.com/platform/reference/legal-entities).

## Choosing the right FX indicator

Note that `foreign_exchange_indicator` is necessary to specify in which currency you would like to denominate the transacted amount in. Learn more about it [here](https://www.moderntreasury.com/journal/add-fx-wire-support#2-foreign-exchange-identifier). Depending on your bank you may transact in one or both indicator types.

| Bank          | Fixed-to-Variable | Variable-to-Fixed |
| :------------ | :---------------- | :---------------- |
| SVB           | No                | Yes               |
| JPMC          | Yes               | Yes               |
| Goldman Sachs | Yes               | Yes               |

## Example: Sending CAD via an EFT Cross Border Payment

This example will demonstrate how to send CAD to your counterparty via a Global ACH payment. For this example, let's assume that your originating account is setup to send payments with the `cross_border` payment type.

In this example, we're using the `eft` subtype to delineate that the EFT settlement rail will be used to settle this payment. This is required for Global ACH payments that need to be settled in Canada. Note that because this payment is settling in Canada we must provide a [CPA Code](https://www.tdcommercialbanking.com/wbb/help/English/wbwEFTCPACodes.html) in the `purpose` field. This is the API call.

In this example we are sending C$20 from a USD account so will delineate `variable_to_fixed` as the `foreign_exchange_indicator`.

```curl Request
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/payment_orders \
  -H 'Content-Type: application/json' \
  -d '{
    "type": "cross_border",
    "subtype": "eft",
    "currency": "cad",
    "amount": 2000,
    "direction": "credit",
    "originating_account_id": "edefd193-c0bf-4d68-b123-d17eb21f500c",
    "receiving_account": {
      "party_name": "John Smith",
      "party_type": "individual",
      "party_address": {
        "line1": "200 Main Ave",
        "line2": "Suite 210",
        "locality": "Toronto",
        "region": "Ontario",
        "postal_code": "400054",
        "country": "CA"
      },
      "routing_details": [{
        "routing_number": "001000562",
        "routing_number_type": "ca_cpa"
      }],
      "account_details": [{
        "account_number": "0001007",
        "account_number_type": "other"
      }]
    },
    "foreign_exchange_indicator": "variable_to_fixed",
    "purpose": "350", 
  }'
```

```json Response
{
    "id": "2bb6a37b-9b8c-4e1f-8c6d-d3a89bb2f6d0",
    "object": "payment_order",
    "type": "cross_border",
    "amount": 2000,
    "direction": "credit",
    "originating_account_id": "edefd193-c0bf-4d68-b123-d17eb21f500c",
    "receiving_account": {
        "id": "836c2e60-4c84-4f37-9f46-c11dd13ed8cc",
        "object": "external_account",
        "live_mode": false,
        "account_type": "other",
        "party_name": "John Smith",
        "party_type": "individual",
        "party_address": {
            "id": "c3e1fd34-fbe1-4378-afd7-f8bd24e8f062",
            "object": "address",
            "live_mode": false,
            "line1": "200 Main Ave",
            "line2": "Suite 210",
            "locality": "Toronto",
            "region": "Ontario",
            "postal_code": "400054",
            "country": "CA",
            "created_at": "2023-03-04T00:20:30Z",
            "updated_at": "2023-03-04T00:20:30Z"
        },
        "account_details": [
            {
                "id": "09eb778b-cdac-4128-9b29-30e5cd942fe4",
                "object": "account_detail",
                "live_mode": false,
                "account_number_safe": "1007",
                "account_number_type": "other",
                "discarded_at": null,
                "created_at": "2023-03-04T00:20:30Z",
                "updated_at": "2023-03-04T00:20:30Z"
            }
        ],
        "routing_details": [
            {
                "id": "3071677c-f665-4f9f-9574-e473365529ae",
                "object": "routing_detail",
                "live_mode": false,
                "payment_type": null,
                "routing_number": "001000562",
                "routing_number_type": "ca_cpa",
                "bank_name": "CANADIAN IMPERIAL BANK OF COMMERCE",
                "bank_address": {
                    "id": "e786f831-f849-4ddc-a282-85f0cb9a8fb1",
                    "object": "address",
                    "live_mode": false,
                    "line1": "1015 KING ST. W.",
                    "line2": null,
                    "locality": "HAMILTON",
                    "region": "ON",
                    "postal_code": "L8S 1L3",
                    "country": "CA",
                    "created_at": "2023-03-04T00:20:23Z",
                    "updated_at": "2023-03-04T00:20:23Z"
                },
                "discarded_at": null,
                "created_at": "2023-03-04T00:20:30Z",
                "updated_at": "2023-03-04T00:20:30Z"
            }
        ],
        "name": null,
        "metadata": {},
        "verification_status": "unverified",
        "contact_details": [],
        "discarded_at": null,
        "created_at": "2023-03-04T00:20:30Z",
        "updated_at": "2023-03-04T00:20:30Z"
    },
    "receiving_account_id": "836c2e60-4c84-4f37-9f46-c11dd13ed8cc",
    "receiving_account_type": "external_account",
    "currency": "CAD",
    "effective_date": "2023-03-04",
    "priority": "normal",
    "description": null,
    "statement_descriptor": null,
    "remittance_information": null,
    "metadata": {},
    "status": "needs_approval",
    "counterparty_id": null,
    "charge_bearer": null,
    "foreign_exchange_indicator": "variable_to_fixed",
    "foreign_exchange_contract": null,
    "transaction_monitoring_enabled": false,
    "originating_party_name": null,
    "ultimate_originating_party_name": null,
    "ultimate_originating_party_identifier": null,
    "ultimate_receiving_party_name": null,
    "ultimate_receiving_party_identifier": null,
    "created_at": "2023-03-04T00:20:30Z",
    "updated_at": "2023-03-04T00:20:30Z",
}
```

If you have additional account numbers or routing numbers for the counterparty, you may create multiple [Account Details](/platform/reference/account-detail-object) or [Routing Details](/platform/reference/routing-detail-object) in the external account.

## Appendix

### ISO Purpose Codes

| Purpose of Payment Codes | Description                                                                    |
| :----------------------- | :----------------------------------------------------------------------------- |
| EPFAMT                   | Family maintenance                                                             |
| ISSCVE                   | Purchase/sale of services                                                      |
| ISSTDY                   | Payment of study/tuition costs                                                 |
| ISSALA                   | Payment of salary                                                              |
| ISCOMM                   | Transaction is payment of commission                                           |
| ISACCT                   | Transaction moves funds between 2 accounts of same account holder              |
| ISINVS                   | Transaction if for the payment of mutual funds, investment products and shares |
| ISISNM                   | Payment of installment                                                         |
| EPLIEX                   | Living expenses                                                                |
| ISAIRB                   | Payment for air transport related business                                     |
| ISBEXP                   | Business expenses                                                              |
| ISBLDM                   | Payment associated with building maintenance                                   |
| ISDIVD                   | Transaction is payment of dividends                                            |
| ISMDCS                   | Payment for medical services                                                   |
| ISRENT                   | Payment of rent                                                                |
| ISPENS                   | Pension payment                                                                |