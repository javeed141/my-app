# Balances Used in Account Reconciliation

Account reconciliation allows you to compare two balances from the same point in time: a Ledger Account balance and an Internal Account balance. This allows you to ensure your application ledger balances are in sync with the cash balances reported by the bank.

## Balances used for internal accounts

Modern Treasury computes and displays the balance for each date according to the bank’s timetable in order to ensure the two accounts are being compared in the same timezone and at the same time.

The Ledgers view of an Internal Account displays balances for each date for which the bank has reported a balance. Each row with a date represents the balances at the beginning of that day, as defined by the bank in the bank’s timezone.

<Image align="center" border={false} src="https://files.readme.io/1eccfb5-balance_recon.png" />

The bank balance within a row is populated from the bank Balance Report. A `balance_report` is a collection of balances at a specific point in time for an [internal account](https://docs.moderntreasury.com/platform/reference/internal-account-object). `intraday` Balance Reports come throughout the business day and indicate the intra-business-day activity within the account. `previous_day` reports come after the end of the business day and will often indicate the final opening and closing balances.

The Account Reconciliation table populates rows using the following balance types, in descending priority:

* The `opening_ledger` balance reported for the day via a `real_time` Balance Report
* The `opening_ledger` balance reported for the day via an `intraday` Balance Report
* The `closing_ledger` balance reported for the previous day via a `previous_day` Balance Report
* The `closing_ledger` balance reported for the previous day via an `intraday` Balance Report

## Balances used for ledger accounts

Balance variances in the dashboard are computed by comparing the bank balances above with the corresponding Ledger Account's `posted_balance`.  The posted balance is used as it represents the reconciled funds in the ledger.

Ledger Account balances populated in the table are calculated to line up with the bank-reported timespans. For each day reported by the bank, the Ledger Account balance represents the balance at midnight at the end of the previous day, according to the bank’s timezone.