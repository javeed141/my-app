# Metadata Allow-List

Modern Treasury labels transactions from a set of pre-defined metadata keys. This helps users enforce consistency when applying metadata to their transactions. Categorization rules only apply valid metadata keys that have been defined by a user.

Metadata defined in this tab only applies to metadata added to transactions via categorization rules. It does not affect metadata defined via API or the UI.

Valid metadata keys can be created in [Settings / Categorization Rules / Metadata Keys](https://app.moderntreasury.com/settings/transaction_categorization/rules?section=Metadata%20Keys).

## Create a valid metadata key

New metadata keys need to be referenced in a categorization rule to be applied.

* **Importing values with a CSV:** Modern Treasury stores metadata as text. New values for a metadata key can be added via CSV import.  Please add a single value per row in the CSV file import. This list of allowed values is case-sensitive and will ignore duplicates. Please ensure that metadata values don't have unintended spaces or characters.
* **Editing keys:** The values associated with a metadata key can be edited at any point. If a metadata value is edited, the rules that reference that metadata value are updated automatically.
* **Removing keys:** Valid metadata keys can be added and removed at any point. If a removed metadata value is in use by a categorization rule, Modern Treasury will notify you prior to removal.