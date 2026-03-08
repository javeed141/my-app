# Payment Orders

A `payment_order` is an instruction to move money to or from your account via payment types such as ACH, wire, RTP, stablecoin, and check. The payment order includes statuses that update you over the lifecycle of the payment.

Related Guides:

* [Initiate an ACH payment](/payments/docs/initiate-an-ach-credit)
* [Send an ACH prenote](/payments/docs/send-an-ach-prenote)
* [Initiate a Canadian EFT payment](/payments/docs/originate-a-canadian-eft-payment)
* [Send a wire transfer](/payments/docs/initiate-a-wire-transfer)
* [Sending a SWIFT wire](/payments/docs/send-a-swift-wire)
* [Sending a payout over local rails](/payments/docs/send-a-payout-over-local-rails)
* [Sending a stablecoin transfer](/payments/docs/sending-a-stablecoin-payment)

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
        Unique identifier for the payment order
      </td>
    </tr>

    <tr>
      <td>
        **type**
        *string*
      </td>

      <td>
        One of
        `ach`,  (US ACH)

        `au_becs`,  (Australian BECS)

        `bacs`, (UK BACS)

        `book`, (Book)

        `chats`, (Hong Kong CHATS)

        `check`, (Check)

        `dk_nets` (Denmark Local Clearing)

        `eft`, (Canada EFT)

        `gb_fps`, (UK FPS)

        `hu_ics` ,  (Hungary Local Clearing)

        `interac`, (Canada)

        `masav`,  (Israel MASAV)

        `mx_ccen`,  (Mexico Local Clearing)

        `neft`, (India NEFT)

        `nics`, (Norway NICS)

        `nz_becs`, (New Zealand BECS)

        `pl_elixir`, (Poland Local Clearing)

        `provexchange`, (ProvXchange)

        `ro_sent`, (Romania Local Clearing)

        `rtp`, (Real Time Payment)

        `sepa`, (Europe SEPA)

        `se_bankgirot`, (Sweden Bankgirot)

        `sg_giro`, (Singapore GIRO)

        `sic`, (Switzerland Interbank Clearing)

        `sknbi`, (Indonesia SKNBI)

        `stablecoin`(onchain transfer in USDG, USDC, USDP, etc)

        `cross_border`, (Cross Border Local Clearing)

        `wire`, (Domestic and International Wire)

        `zengin` (Japan Local Clearing).
      </td>
    </tr>

    <tr>
      <td>
        **subtype**
        *string*
      </td>

      <td>
        An additional layer of classification for the type of payment order you are doing. This field is only used for `ach`, `bacs` and `cross_border` and `stablecoin`payment orders currently.

        For `ach`  payment orders, the `subtype`  represents the SEC code. We currently support `CCD`, `PPD`, `IAT`, `CTX`, `WEB`, `CIE`, and `TEL`.

        For `bacs` this are AUDDIS Reason codes.

        For `cross_border`, pass in the intended local payment system in the receiving country from the list of types from above.

        For `stablecoin`, pass in the intended blockchain network.  See [here](https://docs.moderntreasury.com/payments/stablecoins) for a list supported networks.
      </td>
    </tr>

    <tr>
      <td>
        **amount**
        *int64*
      </td>

      <td>
        Value in specified currency's smallest unit. e.g. $10 (US Dollar) would be represented as `1000`, while ¥10 (Japanese Yen) would be represented as `10`.

        For RTP, the maximum amount allowed by the network is $10,000,000.
      </td>
    </tr>

    <tr>
      <td>
        **direction**
        *string*
      </td>

      <td>
        One of `credit`, `debit`

        Describes the direction money is flowing in the transaction. A `credit` moves money from your account to someone else's. A `debit` pulls money from someone else's account to your own.

        Note that rtp and check payments will always be `credit`.
      </td>
    </tr>

    <tr>
      <td>
        **status**
        *string*
      </td>

      <td>
        The current status of the payment order. See the [status section](#payment-order-statuses) for details.
      </td>
    </tr>

    <tr>
      <td>
        **reconciliation\_status**
        *string*
      </td>

      <td>
        The current reconciliation status. One of `unreconciled`, `tenatively_reconciled`, or `reconciled`.
      </td>
    </tr>

    <tr>
      <td>
        **priority**
        *string*
      </td>

      <td>
        Either `normal` or `high`.

        `high` priority is only available for `ach`, `eft`, and `check` payment types.

        For ACH and EFT payments, `high` represents a same-day transfer. For check payments, `high` can mean an overnight check rather than standard mail. For all other payment types, `high` priority payments are treated the same as `normal` priority payments.
      </td>
    </tr>

    <tr>
      <td>
        **originating\_account\_id**
        *string*
      </td>

      <td>
        The ID of one of your organization's [internal accounts](https://docs.moderntreasury.com/platform/reference/internal-account-object)
      </td>
    </tr>

    <tr>
      <td>
        **receiving\_account\_id**
        *string*
      </td>

      <td>
        The receiving account ID. Can be an [external account](https://docs.moderntreasury.com/platform/reference/external-account-object) or [internal account](https://docs.moderntreasury.com/platform/reference/internal-account-object)
      </td>
    </tr>

    <tr>
      <td>
        **receiving\_account\_type**
        *string*
      </td>

      <td>
        The receiving account type. Can be one of `external_account` or `internal_account`.
      </td>
    </tr>

    <tr>
      <td>
        **ledger\_transaction\_id**
        *string*
      </td>

      <td>
        The ID of the ledger transaction linked to the payment order. See [Linking to other Modern Treasury objects](/ledgers/docs/link-ledger-accounts-to-payment-objects) .
      </td>
    </tr>

    <tr>
      <td>
        **currency**
        *string*
      </td>

      <td>
        Must conform to ISO 4217. Defaults to the currency of the originating account.
      </td>
    </tr>

    <tr>
      <td>
        **description**
        *string*
      </td>

      <td>
        An optional description for internal use.
      </td>
    </tr>

    <tr>
      <td>
        **effective\_date**
        *date*
      </td>

      <td>
        Date transactions are to be posted to the participants’ account. Defaults to the current business day or the next business day if the current day is a bank holiday or weekend.

        Format: yyyy-mm-dd
      </td>
    </tr>

    <tr>
      <td>
        **process\_after**
        *date*
      </td>

      <td>
        If present, Modern Treasury will not [process](https://docs.moderntreasury.com/platform/reference/payment-orders) the payment until after this time. If `process_after` is past the [cutoff](https://docs.moderntreasury.com/platform/reference/ach-timings) for `effective_date`, `process_after` will take precedence and `effective_date` will automatically update to reflect the earliest possible sending date after `process_after`.

        Format: [ISO8601 timestamp](https://docs.moderntreasury.com/platform/reference/timestamps)
      </td>
    </tr>

    <tr>
      <td>
        **statement\_descriptor**
        *string*
      </td>

      <td>
        An optional descriptor which will appear in the receiver's statement. For `check` payments this field will be used as the memo line. For `ach` the maximum length is 10 characters. Note that for ACH payments, the name on your bank account will be included automatically by the bank, so you can use the characters for other useful information. For `eft` the maximum length is 15 characters.
      </td>
    </tr>

    <tr>
      <td>
        **remittance\_information**
        *string*
      </td>

      <td>
        For `ach`, this field will be passed through on an addenda record. For `wire` payments the field will be passed through as the "Originator to Beneficiary Information", also known as OBI or Fedwire tag 6000.

        Character limits vary by bank and rail. Typical limits are 80 characters for `ach` payments, and 140 characters for `wire` payments.
      </td>
    </tr>

    <tr>
      <td>
        **purpose**
        *string*
      </td>

      <td>
        For `wire`, this is usually the purpose which is transmitted via the "InstrForDbtrAgt" field in the ISO20022 file. If you are using Currencycloud, this is the `payment.purpose_code` field.
        For `eft`, this field is the 3 digit [CPA Code](https://www.tdcommercialbanking.com/wbb/help/English/wbwEFTCPACodes.html) that will be attached to the payment.
      </td>
    </tr>

    <tr>
      <td>
        **metadata**
        *object*
      </td>

      <td>
        Additional data represented as key-value pairs. Both the key and value must be strings. See [Metadata](https://docs.moderntreasury.com/platform/reference/metadata).
      </td>
    </tr>

    <tr>
      <td>
        **counterparty\_id**
        *string*
      </td>

      <td>
        If the payment order is tied to a specific [Counterparty](https://docs.moderntreasury.com/platform/reference/counterparty-object) , their id will appear, otherwise `null`.
      </td>
    </tr>

    <tr>
      <td>
        **transaction\_ids**
        *array*
      </td>

      <td>
        The IDs of all the transactions associated to this payment order. Usually, you will only have a single transaction ID. However, if a payment order initially results in a Return, but gets redrafted and is later successfully completed, it can have many transactions.
      </td>
    </tr>

    <tr>
      <td>
        **current\_return**
        *object*
      </td>

      <td>
        If the payment order's status is `returned`, this will include the [return](https://docs.moderntreasury.com/platform/reference/return-object) object's data.
      </td>
    </tr>

    <tr>
      <td>
        **current\_hold**
        *object*
      </td>

      <td>
        If the payment order's status is `held`, this will include the [Hold](https://docs.moderntreasury.com/platform/reference/hold-object) object's data.
      </td>
    </tr>

    <tr>
      <td>
        **charge\_bearer**
        *string*
      </td>

      <td>
        The party that will pay the fees for the payment order. Read [Charge Bearer](https://docs.moderntreasury.com/payments/docs/charge-bearer) to learn more about possible values and how they get serialized
      </td>
    </tr>

    <tr>
      <td>
        **foreign\_exchange\_indicator**
        *string*
      </td>

      <td>
        Indicates the type of FX transfer to initiate, can be either `variable_to_fixed`, `fixed_to_variable`, or `null` if the payment order currency matches the originating account currency.
      </td>
    </tr>

    <tr>
      <td>
        **foreign\_exchange\_contract**
        *string*
      </td>

      <td>
        If present, indicates a specific foreign exchange contract number that has been generated by your financial institution.
      </td>
    </tr>

    <tr>
      <td>
        **originating\_party\_name**
        *string*
      </td>

      <td>
        If present, this will replace your default company name on receiver's bank statement. This field can only be used for ACH payments currently.
        For ACH, only the first 16 characters of this string will be used. Any additional characters will be truncated.
      </td>
    </tr>

    <tr>
      <td>
        **ultimate\_originating\_account\_id**
        *string*
      </td>

      <td>
        The account ID to which the origination of this  payment should be attributed to. Can be a [virtual account](https://docs.moderntreasury.com/platform/reference/virtual-account-object) or [internal account](https://docs.moderntreasury.com/platform/reference/internal-account-object). The originating account must be the parent account of the ultimate originating account.
      </td>
    </tr>

    <tr>
      <td>
        **ultimate\_originating\_account\_type**
        *string*
      </td>

      <td>
        The ultimate originating account type. Can be one of `virtual_account` or `internal_account`.
      </td>
    </tr>

    <tr>
      <td>
        **ultimate\_originating\_party\_identifier**
        *string*
      </td>

      <td>
        Identifier of the ultimate originator of the payment order.
      </td>
    </tr>

    <tr>
      <td>
        **ultimate\_originating\_party\_name**
        *string*
      </td>

      <td>
        Name of the ultimate originator of the payment order.
      </td>
    </tr>

    <tr>
      <td>
        **ultimate\_receiving\_party\_identifier**
        *string*
      </td>

      <td>
        Identifier of the ultimate funds recipient.
      </td>
    </tr>

    <tr>
      <td>
        **ultimate\_receiving\_party\_name**
        *string*
      </td>

      <td>
        Name of the ultimate funds recipient.
      </td>
    </tr>

    <tr>
      <td>
        **live\_mode**
        *boolean*
      </td>

      <td>
        This field will be true if this object was created with a production API key or false if created with a test API key.
      </td>
    </tr>

    <tr>
      <td>
        **nsf\_protected**
        *boolean*
      </td>

      <td>
        A boolean to determine if NSF Protection is enabled for this payment order. NSF Protection is a feature that only works for external accounts that are created with Plaid processor tokens. Also note that you must turn on the setting for this feature in your organization settings page.
      </td>
    </tr>

    <tr>
      <td>
        **reference\_numbers**
        *array*
      </td>

      <td>
        An array of [Payment Reference](https://docs.moderntreasury.com/platform/reference/payment-references) objects.
      </td>
    </tr>

    <tr>
      <td>
        **vendor\_failure\_reason**
        *string*
      </td>

      <td>
        This field will be populated if a vendor (e.g. Currencycloud) failure occurs. Logic shouldn't be built on its value as it is free-form.
      </td>
    </tr>

    <tr>
      <td>
        **vendor\_attributes**
        *object*
      </td>

      <td>
        Additional vendor specific fields for this payment. Data must be represented as key-value pairs. Please contact

        [support@moderntreasury.com](mailto:support@moderntreasury.com)

        for a list of supported attributes.
      </td>
    </tr>

    <tr>
      <td>
        **send\_remittance\_advice**
        *boolean*
      </td>

      <td>
        Send an email to the counterparty when the payment order is sent to the bank. If `null`, `send_remittance_advice` on the [Counterparty](https://docs.moderntreasury.com/platform/reference/counterparty-object) is used.
      </td>
    </tr>

    <tr>
      <td>
        **expires\_at**
        *datetime*
      </td>

      <td>
        The datetime that a RFP type payment expires, `null` for non RFP payments
      </td>
    </tr>

    <tr>
      <td>
        **external\_id**
        *string*
      </td>

      <td>
        An optional user-defined 180 character unique identifier
      </td>
    </tr>
  </tbody>
</Table>

```json Payment Order Example
{
  "id": "c5f4009c-bdd6-4cc1-84b2-17974ac9e77a",
  "type": "ach",
  "amount": 20000,
  "direction": "credit",
  "originating_account_id": "0f8e3719-3dfd-4613-9bbf-c0333781b59f",
  "receiving_account_id": "5acec2ef-987b-4260-aa97-b719eeb0a8d5",
  "receiving_account_type": "external_account",
  "currency": "USD",
  "effective_date": "2018-11-08",
  "process_after": null,
  "priority": "normal",
  "description": "Repellendus deleniti atque quod.",
  "statement_descriptor": "Rerum del.",
  "remittance_information": "Accusamus tempore molestiae laboriosam.",
  "metadata": {},
  "status": "approved",
  "counterparty_id": "37ba4454-dd33-4aa0-8906-0e2e4103e45c",
  "send_remittance_advice": true,
  "transactions_ids": [],
  "current_return": null,
  "charge_bearer": null,
  "foreign_exchange_indicator": null,
  "foreign_exchange_contract": null,
  "subtype": null,
  "purpose": null,
  "nsf_protected": false,
  "originating_party_name": "Acme Company",
  "ultimate_originating_account_id": "388d37b2-3b15-48a8-8765-609241476a27",
  "ultimate_originating_account_type": "virtual_account",
  "ultimate_originating_party_name": "Jane Doe",
  "ultimate_originating_party_identifier": "A1823N",
  "ultimate_receiving_party_name": "Jane Doe",
  "ultimate_receiving_party_identifier": "A1823N",
  "live_mode": true,
  "created_at": "2019-11-09T00:11:07Z",
  "updated_at": "2019-11-09T00:11:07Z",
  "vendor_attributes": null,
  "external_id": null
}
```

# Payment Order Statuses

The `status`field represents the current state of a payment order. [Webhook events](https://docs.moderntreasury.com/platform/reference/payment-orders) can be configured to listen for changes in state.

<Image align="center" border={true} width="auto" src="https://files.readme.io/24c86e401c9c677a0034c351fe2035facb78ebd7d86e4261b123661a22f1dec8-Payment_State_Oct_2025.png" className="border" />

<HTMLBlock>
  {`
  <table style="width: 100%; border-collapse: collapse;">
  <thead>
  <tr>
    <th style="border: 1px solid #ddd; padding: 8px;">Status</th>
    <th style="border: 1px solid #ddd; padding: 8px;">Description</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td style="border: 1px solid #ddd; padding: 8px;"><p><strong><code>needs_approval</code></strong></p>
  </td>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>The payment order needs at least one approval before it can be sent to the bank. Note that if the <code>effective_date</code> on the payment order has been passed but the payment order isn&#39;t approved yet, it will be sent to the bank at the earliest time after it is approved.</p>
  </td>
  </tr>
  <tr>
    <td style="border: 1px solid #ddd; padding: 8px;"><p><strong><code>approved</code></strong></p>
  </td>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>The payment order has been approved and will be sent to the bank.</p>
  </td>
  </tr>
  <tr>
    <td style="border: 1px solid #ddd; padding: 8px;"><p><strong><code>processing</code></strong></p>
  </td>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>This is a very short state where Modern Treasury is preparing the payment order to be sent to the bank. Once it begins processing, it cannot be edited anymore.</p>
  </td>
  </tr>
  <tr>
    <td style="border: 1px solid #ddd; padding: 8px;"><p><strong><code>sent</code></strong></p>
  </td>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>The payment order has been sent to the bank. It may remain in this state for up to a few days, depending on the type of payment.</p>
  </td>
  </tr>
  <tr>
    <td style="border: 1px solid #ddd; padding: 8px;"><p><strong><code>completed</code></strong></p>
  </td>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>A payment order has been completed. The bank has accepted and executed the payment instruction, and the transaction has been posted to the customer’s ledger, indicating that funds have been accepted or released.<br>Note however, that some payment types are not final. For an ACH, you may still get a return later.</p>
  </td>
  </tr>
  <tr>
    <td style="border: 1px solid #ddd; padding: 8px;"><p><strong><code>returned</code></strong></p>
  </td>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>The payment order has been returned. There is typically an associated <code>Return</code> object with more information.</p>
  </td>
  </tr>
  <tr>
    <td style="border: 1px solid #ddd; padding: 8px;"><p><strong><code>reversed</code></strong></p>
  </td>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>The payment order has been reversed. There is typically an associated <code>Reversal</code> object with more information.</p>
  </td>
  </tr>
  <tr>
    <td style="border: 1px solid #ddd; padding: 8px;"><p><strong><code>failed</code></strong></p>
  </td>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>This status is rare but may happen if there is an error at the bank. It can also happen when using the asynchronous create API endpoint, if the parameters are invalid.<br>Note that the lifecycle diagram below only shows an arrow to the failed state down the asynchronous create path.<br>If a failure is associated with a vendor (e.g. Currencycloud), a <code>vendor_failure_reason</code> may be provided.</p>
  </td>
  </tr>
  <tr>
    <td style="border: 1px solid #ddd; padding: 8px;"><p><strong><code>denied</code></strong></p>
  </td>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>The payment order has been denied. This is a terminal state. This state is reached if a payment order in <code>needs_approval</code> was denied by an approver.</p>
  </td>
  </tr>
  <tr>
    <td style="border: 1px solid #ddd; padding: 8px;"><p><strong><code>cancelled</code></strong></p>
  </td>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>The payment order was cancelled. This is a terminal state.</p>
  </td>
  <tr>
    <td style="border: 1px solid #ddd; padding: 8px;"><p><strong><code>held</code></strong></p>
  </td>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>The payment order has been placed on hold for compliance reasons.</p>
  </td>
  </tr>
  </tbody>
  </table>
  `}
</HTMLBlock>