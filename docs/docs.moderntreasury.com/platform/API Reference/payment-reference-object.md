# Payment References

A `payment_reference` object is a reference number assigned to a Payment Order or Return by the underlying financial institution. Because they are assigned by the bank, Payment Reference numbers are valuable when asking the bank about the status of a payment or tracking down issues.

<HTMLBlock>
  {`
  <table style="width: 100%; border-collapse: collapse;">
  <thead>
  <tr>
    <th style="border: 1px solid #ddd; padding: 8px;">Attribute</th>
    <th style="border: 1px solid #ddd; padding: 8px;">Description</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td style="border: 1px solid #ddd; padding: 8px;"><p><strong>id</strong><br><em>string</em></p>
  </td>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>Unique identifier for the payment reference object.</p>
  </td>
  </tr>
  <tr>
    <td style="border: 1px solid #ddd; padding: 8px;"><p><strong>object</strong><br><em>string</em></p>
  </td>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>Always <code>payment_reference</code>.</p>
  </td>
  </tr>
  <tr>
    <td style="border: 1px solid #ddd; padding: 8px;"><p><strong>reference_number</strong><br><em>string</em></p>
  </td>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>The actual reference number assigned by the bank.</p>
  </td>
  </tr>
  <tr>
    <td style="border: 1px solid #ddd; padding: 8px;"><p><strong>reference_number_type</strong><br><em>string</em></p>
  </td>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>The type of reference number. Refer to the table below for the list of currently supported reference number types.</p>
  </td>
  </tr>
  <tr>
    <td style="border: 1px solid #ddd; padding: 8px;"><p><strong>referenceable_id</strong><br><em>string</em></p>
  </td>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>ID of object the payment reference is assigned to.</p>
  </td>
  </tr>
  <tr>
    <td style="border: 1px solid #ddd; padding: 8px;"><strong>referenceable_type</strong><br><em>string</em></p>
  </td>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>Type of object (one of <code>payment_order</code>, <code>return</code>, <code>incoming_payment_detail</code>, <code>transaction</code> or <code>reversal</code>) the payment reference is assigned to.</p>
  </td>
  </tr>
  </tbody>
  </table>
  `}
</HTMLBlock>

```json Payment Reference Example
{
  "id": "361a3fd7-811d-48fa-8ccd-b9c0603410ec",
  "object": "payment_reference",
  "reference_number": "20181217L1B78H1C003304",
  "reference_number_type": "fedwire_imad",
  "referenceable_id" : "e5f92622-1492-4dbe-b2e2-5882519dc1f4",
  "referenceable_type" : "payment_order",
  "live_mode": true,
  "created_at": "2021-03-17T16:56:30Z",
  "updated_at": "2021-03-17T16:56:30Z"
}
```

| Reference Number Type                                 | Name                                                 | Description                                                                                                              |
| :---------------------------------------------------- | :--------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------- |
| `ach_original_trace_number`                           | ACH Original Trace Number                            | ACH Trace Number Modern Treasury transmits with an ACH payment (overwritten by bank).                                    |
| `ach_trace_number`                                    | ACH Trace Number                                     | ACH Trace Number transmitted on network by the originating bank.                                                         |
| `bankprov_payment_activity_date`                      | BankProv Payment Activity Date                       |                                                                                                                          |
| `bankprov_payment_id`                                 | BankProv Payment ID                                  |                                                                                                                          |
| `bnk_dev_prenotification_id`                          | Increase Prenotification ID                          |                                                                                                                          |
| `bnk_dev_transfer_id`                                 | Increase Transfer ID                                 |                                                                                                                          |
| `bofa_transaction_id`                                 | Bank of America Transaction ID                       |                                                                                                                          |
| `bofa_end_to_end_id`                                  | Bank of America End To End ID                        |                                                                                                                          |
| `check_number`                                        | Check Number                                         | This is assigned by Modern Treasury at the time of check creation, can be used for issuing stop payments/voiding checks. |
| `citibank_reference_number`                           | Citibank Reference Number                            |                                                                                                                          |
| `citibank_worldlink_clearing_system_reference_number` | Citibank Worldlink Clearing System Reference Number  |                                                                                                                          |
| `column_transfer_id`                                  | Column Transfer ID                                   |                                                                                                                          |
| `column_fx_quote_id`                                  | Column Foreign Exchange (FX) Quote ID                |                                                                                                                          |
| `column_reversal_pair_transfer_id`                    | Column Reversal Pair Transfer ID                     |                                                                                                                          |
| `cross_river_payment_id`                              | Cross River Payment ID                               |                                                                                                                          |
| `cross_river_transaction_id`                          | Cross River Transaction ID                           |                                                                                                                          |
| `currencycloud_conversion_id`                         | Currencycloud Conversion ID                          |                                                                                                                          |
| `currencycloud_payment_id`                            | Currencycloud Payment ID                             |                                                                                                                          |
| `dc_bank_transaction_id`                              | DC Bank Transaction ID                               |                                                                                                                          |
| `eft_trace_number`                                    | EFT Trace Number                                     |                                                                                                                          |
| `evolve_core_batch`                                   | Evolve Core Batch Identifier                         |                                                                                                                          |
| `evolve_core_file_key`                                | Evolve Core File Key Identifier                      |                                                                                                                          |
| `evolve_core_seq`                                     | Evolve Core Sequence Identifier                      |                                                                                                                          |
| `evolve_transaction_id`                               | Evolve Transaction ID                                |                                                                                                                          |
| `fedwire_imad`                                        | FedWire Input Message Accountability Data (IMAD)     |                                                                                                                          |
| `fedwire_omad`                                        | FedWire Output Message Accountability Data (OMAD)    |                                                                                                                          |
| `first_republic_internal_id`                          | First Republic Internal ID                           |                                                                                                                          |
| `goldman_sachs_collection_request_id`                 | Goldman Sachs Collection Request ID                  |                                                                                                                          |
| `goldman_sachs_end_to_end_id`                         | Goldman Sachs End To End ID                          |                                                                                                                          |
| `goldman_sachs_payment_request_id`                    | Goldman Sachs Payment Request ID                     |                                                                                                                          |
| `goldman_sachs_request_id`                            | Goldman Sachs Request ID                             |                                                                                                                          |
| `goldman_sachs_unique_payment_id`                     | Goldman Sachs Unique Payment ID                      |                                                                                                                          |
| `interac_message_id`                                  | Interac Message ID                                   |                                                                                                                          |
| `jpmc_ccn`                                            | JPMC CCN                                             |                                                                                                                          |
| `jpmc_clearing_system_reference`                      | JPMC Clearing System Reference                       |                                                                                                                          |
| `jpmc_customer_reference_id`                          | JPMC Customer Reference ID                           |                                                                                                                          |
| `jpmc_end_to_end_id`                                  | JPMC End to End ID                                   |                                                                                                                          |
| `jpmc_firm_root_id `                                  | JPMC Firm Root ID                                    |                                                                                                                          |
| `jpmc_p3_id`                                          | JPMC P3 ID                                           |                                                                                                                          |
| `jpmc_payment_batch_id`                               | JPMC Payment Batch ID                                |                                                                                                                          |
| `jpmc_payment_information_id`                         | JPMC Payment Information ID                          |                                                                                                                          |
| `jpmc_payment_returned_datetime`                      | JPMC Payment Returned Datetime                       |                                                                                                                          |
| `jpmc_transaction_id`                                 | JPMC Transaction ID( Deprecated)                     |                                                                                                                          |
| `lob_check_id`                                        | Lob Check ID                                         |                                                                                                                          |
| `other`                                               | Other                                                | Catch-all for payment reference numbers that can't be identified.                                                        |
| `partial_swift_mir`                                   | Partial SWIFT Message Input Reference (MIR)          | Same as `swift_mir` although the leading date is omitted.                                                                |
| `pnc_clearing_reference`                              | PNC Clearing Reference                               |                                                                                                                          |
| `pnc_instruction_id`                                  | PNC Instruction ID                                   |                                                                                                                          |
| `pnc_multipayment_id`                                 | PNC Multipayment ID                                  |                                                                                                                          |
| `pnc_payment_trace_id`                                | PNC Trace ID                                         |                                                                                                                          |
| `rtp_instruction_id`                                  | RTP Instruction ID                                   |                                                                                                                          |
| `signet_api_reference_id`                             | Signet Reference ID                                  |                                                                                                                          |
| `signet_confirmation_id`                              | Signet Confirmation ID                               |                                                                                                                          |
| `signet_request_id`                                   | Signet Request ID                                    |                                                                                                                          |
| `silvergate_payment_id`                               | Silvergate Payment ID (Deprecated)                   |                                                                                                                          |
| `svb_end_to_end_id`                                   | SVB End to End ID                                    |                                                                                                                          |
| `svb_payment_id`                                      | SVB Payment ID                                       |                                                                                                                          |
| `swift_mir`                                           | SWIFT Message Input Reference (MIR)                  |                                                                                                                          |
| `swift_uetr`                                          | SWIFT Unique End-to-end Transaction Reference (UETR) |                                                                                                                          |
| `umb_product_partner_account_number`                  | UMB Product Partner Account Number                   |                                                                                                                          |
| `usbank_payment_id`                                   | US Bank Payment ID                                   |                                                                                                                          |
| `wells_fargo_payment_id`                              | Wells Fargo Payment ID                               |                                                                                                                          |
| `wells_fargo_trace_number`                            | Wells Fargo Trace Number                             |                                                                                                                          |