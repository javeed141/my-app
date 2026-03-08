# Manage Categorization Rules

### Rule Ordering

Rules are applied in the order they are presented in the UI, from top to bottom.

#### Writing new keys

When two or more rules apply different metadata values for *different* keys, the system will simply add new key-value pairs to the transaction. This is true regardless of rules that apply at creation or reconciliation.

For instance, if a rule with evaluation order 1 applies `type: fees`, and a rule with evaluation order 2 applies `country: US`, the transaction will be tagged with both `type` and `country` metadata keys.

#### Conflicts

For rules that apply at creation, when two or more rules apply different metadata values for the *same* key, the rule earlier in evaluation order (or nearest to the top) prevails.

For example, if a rule that applies at creation with evaluation order 1 applies metadata `payment category: payout` to a transaction, and a second rule with evaluation order 2 applies metadata`payment category: disbursement` to the same transaction, the value `payout` prevails.

#### Overwriting

Rules that apply at reconciliation do, however, overwrite prior metadata. When two or more rules apply different metadata values for the same key, the rule later in evaluation order (or nearest to the bottom) prevails.

Returning to the example above, let's say a rule that applies at creation with evaluation order 1 applies metadata `payment category: payout`. If a second rule with evaluation order 2 applies `payment category: fee` **at reconciliation**, `fee` will prevail.

This feature is useful in case reconcilation allows you to more accurately tag a transaction. This can be the case when the reconciled Expected Payment or Payment Order fields include valuable information for tagging in fields such as counterparty.

### Processing Times

Most transactions are tagged within a few seconds after creation or reconciliation. For rules that run at reconciliation, if your rule applies metadata to a transaction with a very high number of reconciled Expected Payments (1m+), this operation can take a few hours.

### Activating Rules

Categorization rules automatically start applying metadata when activated. Deactivating a rule stops metadata from being applied while that rule is inactive, but it does not remove previously applied metadata.