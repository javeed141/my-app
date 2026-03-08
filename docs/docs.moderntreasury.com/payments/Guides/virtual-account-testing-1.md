# Virtual Account Bank and Capability Support

Modern Treasury’s bank integrations are designed to enable the full functionality of Virtual Accounts provided by the bank. We offer two types of architectures to match the bank’s functionality.

If the bank supports balance reporting for each individual Virtual Account, you will use the [Internal Accounts API](https://docs.moderntreasury.com/payments/docs/creating-nested-internal-accounts) to create nested Internal Accounts. Otherwise, you will use the [Virtual Accounts API](https://docs.moderntreasury.com/payments/docs/creating-virtual-accounts).

|                                                                       | Internal Accounts API                                           | Virtual Accounts API                                                                                                      |
| :-------------------------------------------------------------------- | :-------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| Used if...                                                            | Your bank reports balances for each individual Virtual Account. | Your bank does NOT report balances for each individual Virtual Account, only a total balance for the linked bank account. |
| How each virtual account is linked                                    | Created as a nested account of the internal account.            | All are linked directly to the internal account.                                                                          |
| Originate payments                                                    | Yes                                                             | No                                                                                                                        |
| Receive payments                                                      | Yes                                                             | Yes                                                                                                                       |
| Can link to a [Counterparty](/platform/reference/counterparty-object) | Yes                                                             | Yes                                                                                                                       |

<Callout icon="📘" theme="info">
  You can always track and report the balance of any Virtual Account by linking it to a [Ledger](/ledgers/docs/link-a-ledger-account-to-a-virtual-account) on Modern Treasury.
</Callout>

## Supported Banks

See the table below for the banks we currently support for Virtual Accounts and the functionality provided at each.

<HTMLBlock>
  {`
  <table style="width: 100%; border-collapse: collapse;">
  <thead>
  <tr>
    <th style="border: 1px solid #ddd; padding: 8px;">Bank</th>
    <th style="border: 1px solid #ddd; padding: 8px;">Product Name at Bank</th>
    <th style="border: 1px solid #ddd; padding: 8px;">Payment Types supported</th>
    <th style="border: 1px solid #ddd; padding: 8px;">Balance reporting supported</th>
    <th style="border: 1px solid #ddd; padding: 8px;">Modern Treasury API</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>Goldman Sachs</p>
  </td>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>Virtual Accounts</p>
  </td>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>ACH<br>Fedwire<br>SWIFT wire</p>
  </td>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>Yes</p>
  </td>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>Nested Internal Account</p>
  </td>
  </tr>
  <tr>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>BankProv</p>
  </td>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>Ledger Account</p>
  </td>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>ACH<br>Fedwire</p>
  </td>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>Yes</p>
  </td>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>Nested Internal Account</p>
  </td>
  </tr>
  <tr>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>Cross River Bank</p>
  </td>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>Subledgers</p>
  </td>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>ACH<br>Fedwire</p>
  </td>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>Yes</p>
  </td>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>Nested Internal Account</p>
  </td>
  </tr>
  <tr>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>Evolve</p>
  </td>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>vAccounts</p>
  </td>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>ACH<br>Fedwire</p>
  </td>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>No</p>
  </td>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>Virtual Account</p>
  </td>
  </tr>
  <tr>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>Increase</p>
  </td>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>Account Numbers</p>
  </td>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>ACH<br>Fedwire</p>
  </td>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>No</p>
  </td>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>Virtual Account</p>
  </td>
  </tr>
  <tr>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>JP Morgan Chase</p>
  </td>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>Virtual reference number (VRN)</p>
  </td>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>ACH<br>Fedwire<br>SWIFT wire</p>
  </td>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>No</p>
  </td>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>Virtual Account</p>
  </td>
  </tr>
  <tr>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>Wells Fargo</p>
  </td>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>Perfect Receivables</p>
  </td>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>ACH<br>Fedwire<br>SWIFT wire</p>
  </td>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>No</p>
  </td>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>Virtual Account</p>
  </td>
  </tr>
  <tr>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>Silicon Valley Bank</p>
  </td>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>ACH Sub-Account</p>
  </td>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>ACH</p>
  </td>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>No</p>
  </td>
    <td style="border: 1px solid #ddd; padding: 8px;"><p>Virtual Account</p>
  </td>
  </tr>
  </tbody>
  </table>
  `}
</HTMLBlock>

<Callout icon="🚧" theme="warn">
  Don’t see your bank? We would love to understand your situation more. Email us at [sales@moderntreasury.com](mailto:sales@moderntreasury.com)
</Callout>