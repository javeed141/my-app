# Tracking Disputes

Track dispute progress through the dashboard, API, and webhooks to provide timely cardholder updates and maintain accurate records.

## Tracking in the Dashboard

After submitting a dispute, you can monitor its status through the Lithic dashboard.

1. Navigate to **Disputes → View Managed Disputes**
2. Locate your dispute in the list (disputes are organized by Claim ID and date)
3. Click on the Claim ID to open a detailed view of the dispute
4. Depending on the dispute's current state, you can take these actions:
   1. **Withdraw Dispute**: Cancel an active dispute before resolution
   2. **Upload Evidence**: Add supporting documentation to strengthen the claim
   3. **Request to Reopen**: Submit a request to reconsider a closed dispute (only available if previous disposition was DENIED or WITHDRAWN)
   4. **View Communications**: Review all correspondence related to the dispute
   5. **View Investigation Details**: See chargeback eligibility analysis and resolution decision

Refer to the [Appendix](https://docs.lithic.com/docs/tracking-disputes#appendix-dispute-statuses-in-the-dashboard) for all dispute statuses and their definitions.

## Tracking via API

Lithic provides [API endpoints](https://docs.lithic.com/reference/getdisputesv2) for retrieving disputes. The dispute object that is returned includes:

* Dispute attributes (case\_id, status, disposition, network, currency, etc.)
* Key events in chronological order
* Current liability allocation
* Merchant information
* Reference to original transaction

See [here](https://docs.lithic.com/docs/understanding-the-api) for more details about the dispute object.

## Tracking via Webhooks

Your program can ingest webhooks sent by Lithic to track disputes programmatically and trigger downstream processes.

* Lithic emits a webhook of event type `[dispute_transaction.created](https://docs.lithic.com/reference/post_dispute-transaction-created)` when a new dispute is created.
* Lithic emits a webhook of event type `[dispute_transaction.updated](https://docs.lithic.com/reference/post_dispute-transaction-updated)` when an existing dispute is updated.

The webhook payload contains the same dispute object as what you receive from the API.

## Appendix: Dispute Statuses in the Dashboard

| Status                           | Definition                                                                                                                                                                                                                                                                        |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **New**                          | A new dispute has been created but processing has not begun.                                                                                                                                                                                                                      |
| **Open-AccountingException**     | An accounting exception has occurred at resolution.                                                                                                                                                                                                                               |
| **Open-CheckForMerchantCredit**  | When a dispute is submitted on the Mastercard network, the merchant can choose to either refund the cardholder or proceed with the chargeback process. Mastercard gives acquirers three calendar days to input the merchant's decision.                                           |
| **Open-Disposition**             | The investigator is determining if the dispute qualifies for the automated disputes flow or requires the manual process.                                                                                                                                                          |
| **Open-ProcessRecovery**         | During the manual dispute process, the investigator has confirmed that the transaction has chargeback rights and the charges are ready to be processed on the card network.                                                                                                       |
| **Open-ProvisionalCreditReview** | The investigator is in the process of determining if provisional credit will be issued.                                                                                                                                                                                           |
| **Open-ReviewDisputeResponse**   | A dispute has been declined or partially accepted in a chargeback attempt and requires review by an investigator.                                                                                                                                                                 |
| **Open-ReviewDocuments**         | Additional documentation was provided by the cardholder and is being reviewed by the investigator.                                                                                                                                                                                |
| **Open-ReviewPreArbResponse**    | A pre-arbitration response has been received and requires review by an investigator.                                                                                                                                                                                              |
| **Open-ReviewReject**            | A chargeback has been rejected and requires review by a user.                                                                                                                                                                                                                     |
| **Open-ReviewRepresentment**     | A Mastercard chargeback resulted in a representment by the merchant and requires review by the investigator.                                                                                                                                                                      |
| **Pending-AcquirerResponse**     | A dispute is awaiting a response to a chargeback.                                                                                                                                                                                                                                 |
| **Pending-ArbitrationResponse**  | A dispute is awaiting a response to an arbitration case filing on the Visa network.                                                                                                                                                                                               |
| **Pending-ArbResponse**          | A dispute is awaiting a response to an arbitration case filing on the Mastercard network.                                                                                                                                                                                         |
| **Pending-ChargebackResponse**   | A dispute is awaiting a response to a chargeback on the Mastercard network.                                                                                                                                                                                                       |
| **Pending-CustomerDocuments**    | A dispute is awaiting required documents from the claimant.                                                                                                                                                                                                                       |
| **Pending-CustomerResponse**     | A dispute is awaiting a response from the claimant.                                                                                                                                                                                                                               |
| **Pending-DenyDispute**          | A denial decision has been made, but processing is incomplete. For disputes where Reg Z applies, this is likely due to a wait for the debit of provisional credit. For disputes where Reg Z does not apply, this is a brief processing period that should resolve within minutes. |
| **Pending-DisputeResponse**      | A dispute is awaiting a response to a chargeback on the Visa network.                                                                                                                                                                                                             |
| **Pending-FinalProcessing**      | A pay or deny decision has been made and the dispute is awaiting final processing.                                                                                                                                                                                                |
| **Pending-FinalDisposition**     | A dispute which is pending resolution of other disputes within the claim prior to resolving.                                                                                                                                                                                      |
| **Pending-FraudReview**          | A dispute which was pended by a user in the pend flow to be reviewed for potential fraud.                                                                                                                                                                                         |
| **Pending-Investigation**        | A dispute assignment is required for investigators to conduct an investigation and complete a configurable list of investigation topics.                                                                                                                                          |
| **Pending-MerchantCreditReview** | A dispute has been pended by a number of days, as defined by the investigator, to await a merchant credit after a representment was received indicating a credit was expected.                                                                                                    |
| **Pending-PreArbResponse**       | A dispute is awaiting a response to a pre-arbitration case filing on the Mastercard network.                                                                                                                                                                                      |
| **Resolved-Denied**              | A dispute has been resolved as denied or a dispute was withdrawn, i.e. the cardholder was not made whole.                                                                                                                                                                         |
| **Resolved-Paid**                | A dispute has been resolved as paid, i.e. the cardholder was made whole.                                                                                                                                                                                                          |
| **Waiting-ChargebackRights**     | A dispute is being evaluated by the system to determine if recovery rights exist.                                                                                                                                                                                                 |

<br />