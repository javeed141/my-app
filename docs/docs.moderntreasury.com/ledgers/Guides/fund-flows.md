# Fund Flows

Fund Flows are a reporting and observability tool that allow you to review the ledger impact of related Ledger Transactions that represent your end-end payment flows. Fund Flows are available in the Ledgers UI under the ‘Fund Flows’ section.

# Overview

A Fund Flow represents a group of Ledger Transactions that share a common metadata key:value pair. The Fund Flow groupings are dynamically created from existing metadata on your Ledger Transactions. For example, if you have multiple Ledger Transactions that represent an end-end payment that all have a metadata tag of `{"payment_id": "123"}` those Ledger Transactions will be grouped into the same Fund Flow.

# Reviewing Fund Flows

The Fund Flow UI has a dropdown containing all unique metadata tags across your Ledger Transactions, use this dropdown to select the grouping key for your Fund Flows. For example, if you wish to review the Ledger Transactions from the above example you will select `payment_id` from the dropdown list.

After you have selected your desired grouping mechanism your Fund Flows will be loaded and reviewable. To find a specific Fund Flow, use the Metadata Value filter to search for the desired metadata value.

The Fund Flow ‘Status’ column will be:

* `posted`- all associated Ledger Transactions have a posted status
* `pending`- one or more Ledger Transactions have a pending status
* `archived` - all Ledger Transactions have an archived status

# Visualizing Fund Flows

From the list of Fund Flows you can click into any individual row to visualize the Ledger impact of the related Ledger Transactions. Upon clicking into a Fund Flow you will be presented with a T-Account view of your related Ledger Transactions, providing a visualization of the Ledger impact.

Each row in the T-Account UI represents an individual Ledger Transaction, while each column represents the Ledger Accounts that were written to, with the corresponding Ledger Entries presented as either ‘debits’ or ‘credits’. Ledger Transactions are ordered by `effective_at`, while the Ledger Account columns are ordered alphabetically.

<Image align="center" border={false} src="https://files.readme.io/1c44c6165944e4b6c7942373e7b1c3a8caa76f6699b2a97858152b71350a868d-ModernBoxOffice.png" />