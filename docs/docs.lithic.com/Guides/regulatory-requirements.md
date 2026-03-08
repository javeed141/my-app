# Regulatory Requirements

Determine which regulations apply to your program and how they impact your dispute process.

Federal regulations impose requirements on how you must handle certain types of disputes, particularly those involving consumer accounts.

## Which Regulation Applies to Your Program?

| Account Type            | Funding Source                          | Examples                                        | Applicable Regulation         |
| ----------------------- | --------------------------------------- | ----------------------------------------------- | ----------------------------- |
| **Consumer Prepaid**    | Cardholder's own funds loaded onto card | GPR prepaid cards, payroll cards, benefit cards | **Regulation E (EFTA)**       |
| **Consumer Debit**      | Cardholder's own funds in bank account  | Debit cards                                     | **Regulation E (EFTA)**       |
| **Consumer Credit**     | Borrowed funds (credit line)            | Credit cards, charge cards                      | **Regulation Z (TILA)**       |
| **Consumer BNPL**       | Borrowed funds (installment loan)       | Buy-now-pay-later, installment plans            | **Regulation Z (TILA)**       |
| **Commercial/Business** | Any                                     | Corporate cards, fleet cards                    | **None** (network rules only) |

Regulation E applies when disputing transactions using the consumer's own funds. Regulation Z applies when disputing transactions using borrowed funds.

## Regulation E Dispute Timelines

Please note that your program is responsible for sending required communications, issuing or reversing provisional credits, and fulfilling all other Regulation E requirements, unless otherwise configured during implementation.

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Timeframe
      </th>

      <th>
        Milestone
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **0-60 calendar days** after cardholder's bank statement containing error is transmitted
      </td>

      <td>
        The cardholder submits a dispute to the card program manager.
        Card program Customer Support Team completes dispute intake using their Lithic Dashboard.
      </td>
    </tr>

    <tr>
      <td>
        **0-10 business days** after dispute is submitted to Lithic for accounts open longer than 30 days
      </td>

      <td>
        Acknowledgment of receipt of dispute is transmitted to the cardholder. Though the timeframe is up to 10 days, communication is typically sent instantaneously.
      </td>
    </tr>

    <tr>
      <td>
        **0-10 business days** after dispute is submitted to Lithic for accounts open longer than 30 days
      </td>

      <td>
        The Dispute decision engine determines the following:
        • Chargeback eligibility
        • Write-off decision based on threshold set in the dispute configuration setup.
      </td>
    </tr>

    <tr>
      <td>
        **0-10 business days** after dispute is submitted to Lithic for accounts open longer than 30 days
      </td>

      <td>
        Provisional credit is issued.
      </td>
    </tr>

    <tr>
      <td>
        **0-20 business days** after dispute is submitted to Lithic on an account opened within the last 30 days or a transaction occurring at a foreign POS
      </td>

      <td>
        The Dispute decision engine determines the following:
        • Chargeback eligibility
        • Write-off decision based on threshold set in the dispute configuration setup.
      </td>
    </tr>

    <tr>
      <td>
        **0-45 calendar days** after dispute is submitted to Lithic for an unauthorized EFT
      </td>

      <td>
        If the investigation is not completed within 10 business days of receiving notice of error from the cardholder, then the investigation may be extended to 45 calendar days.
      </td>
    </tr>

    <tr>
      <td>
        **0-90 calendar days** after the dispute is submitted to Lithic
      </td>

      <td>
        Dispute is denied.
      </td>
    </tr>

    <tr>
      <td>
        **0-3 business days** after dispute is denied
      </td>

      <td>
        Notice of denial and provisional credit reversal is transmitted.
      </td>
    </tr>

    <tr>
      <td>
        **5+ business days** after notice of dispute denial is transmitted
      </td>

      <td>
        Provisional credit is reversed.
      </td>
    </tr>

    <tr>
      <td>
        **0-90 calendar days** after the dispute is submitted to Lithic for debit card transactions and remittances
      </td>

      <td>
        Dispute is won.
        Provisional credit is now a final credit.
      </td>
    </tr>

    <tr>
      <td>
        **0-3 business days** after dispute is won
      </td>

      <td>
        Notice of resolution is transmitted. This notice is typically transmitted instantaneously.
      </td>
    </tr>

    <tr>
      <td>
        **0-120 days** after the dispute is submitted to Lithic
      </td>

      <td>
        If the acquirer challenges the chargeback, the recovery attempt process can be extended to 120 days.
      </td>
    </tr>
  </tbody>
</Table>

## Regulation Z Dispute Timelines

Please note that your program is responsible for sending required communications, statement adjustments, and fulfilling all other Regulation Z requirements, unless otherwise configured during implementation.

<Table>
  <thead>
    <tr>
      <th>
        Timeframe
      </th>

      <th>
        Milestone
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **0-60 calendar days** after the creditor transmitted the first periodic statement containing the error
      </td>

      <td>
        The cardholder submits a dispute to the card program manager.
        Card program Customer Support Team completes dispute intake using their Lithic Dashboard.
      </td>
    </tr>

    <tr>
      <td>
        **0-30 calendar days** after dispute is submitted to Lithic
      </td>

      <td>
        Acknowledgment of receipt of dispute is transmitted to the cardholder. Though the timeframe is up to 30 days, communication is typically sent instantaneously.
      </td>
    </tr>

    <tr>
      <td>
        **0-10 calendar days** after dispute is submitted to Lithic
      </td>

      <td>
        The Dispute decision engine determines the following:
        • Chargeback eligibility
        • Write-off decision based on threshold set in the dispute configuration setup.
      </td>
    </tr>

    <tr>
      <td>
        **0-2 complete billing cycles (maximum 90 days)** after dispute is submitted to Lithic
      </td>

      <td>
        The following outcomes happen within this timeframe:
        • Investigation is completed
        • Chargeback is processed
        • Chargeback may be resolved
        • Funds may be recovered
      </td>
    </tr>

    <tr>
      <td>
        **0-2 complete billing cycles (maximum 90 days)** after dispute is submitted to Lithic
      </td>

      <td>
        Dispute is denied.
      </td>
    </tr>

    <tr>
      <td>
        **0-2 business days** after the dispute is denied
      </td>

      <td>
        Notice of denial and statement adjustment is sent.
      </td>
    </tr>

    <tr>
      <td>
        **0-90 calendar days** after the dispute is submitted to Lithic
      </td>

      <td>
        Dispute is won.
        Statement adjustment is permanent.
      </td>
    </tr>

    <tr>
      <td>
        **0-120 days** after the dispute is submitted to Lithic
      </td>

      <td>
        If the acquirer challenges the chargeback, the recovery attempt process can be extended to 120 days.
      </td>
    </tr>
  </tbody>
</Table>

## Non-Regulation Dispute Timelines

Please note that card network rules still apply.

<Table>
  <thead>
    <tr>
      <th>
        Timeframe
      </th>

      <th>
        Milestone
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **After the transaction settles** on the cardholder's account
      </td>

      <td>
        The cardholder must submit a dispute to the card program manager.
        Card program Customer Support Team completes dispute intake using their Lithic Dashboard.
      </td>
    </tr>

    <tr>
      <td>
        **0-5 days** after submitting a dispute to Lithic
      </td>

      <td>
        The Dispute decision engine determines the following:
        • Chargeback eligibility
        • Write-off decision based on threshold set in the dispute configuration setup.
      </td>
    </tr>

    <tr>
      <td>
        **0-120 days** after dispute is submitted to Lithic
      </td>

      <td>
        Below are all actions that happen within this timeframe:
        • Fraud investigation (if relevant)
        • Dispute is written off
        • Or dispute denied:
             ◦ No error occurred
             ◦ Outside chargeback timeframes
        • Or recovery attempted through chargeback process. If the acquirer challenges the chargeback, the recovery attempt process can be extended to 120 days. Dispute will eventually resolve as won or lost.
      </td>
    </tr>
  </tbody>
</Table>

<br />