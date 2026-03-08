# Payment Templates Overview

# What are Payment Templates?

Payment Templates allow finance and treasury teams to standardize how Payment Orders are created by defining preset values, required fields, and locked settings. This structure reduces manual errors, ensures compliance, and makes payment processing more efficient.

Manual payments are error-prone — teams often copy/paste details from internal forms, guides, or emails, leading to inconsistencies, missing fields, or incorrect payment instructions. Templates eliminate this by enforcing pre-configured, standardized settings, ensuring that every payment follows your policies and operational best practices.

# Why use Payment Templates?

Payment Templates help you

* **Reduce manual errors**: Prevent mistakes from inconsistent data entry.
* **Ensure compliance**: Enforce required fields, approvals, and policy adherence.
* **Accelerate approvals**: Approvers process payments faster with structured, predictable formats.
* **Support complex workflows**: Standardize FX transactions, charge bearer settings, metadata, and reconciliation processes.
* **Improve efficiency**: Automate payment creation instead of manually entering recurring details.

# Example Use Cases

* **Payroll Payments:** Ensure payroll payments always include correct tax identifiers, metadata, approval workflows, and funding sources.
* **FX Transactions:** Predefine charge bearer settings and lock fixed-to-variable or variable-to-fixed currency conversion models.
* **Vendor Payments:** Standardize descriptions and enforce including reconciliation metadata like invoice IDs.

# Key Features

### Configure and standardize fields on the Payment Order

You can customize which fields appear in a payment order, ensuring standardization and consistency for each payment use case.

* **Show or hide fields**: You can remove unnecessary fields from the Payment Order form, keeping the interface uncluttered and relevant to the specific use case. This reduces confusion and minimizes manual data entry errors.
* **Required vs. optional fields**: You can define which fields must be filled before submission. For example, compliance-related fields like tax identification numbers can be set as required, while memo fields can be optional.
* **Preset field values**: Some fields can be pre-filled based on company policies, standardizing data input. For instance, an FX payment template can default the charge bearer to `Shared` or set the default currency conversion method. You may also want to preset information like tax identification numbers and hide them on the Payment Order form to prevent employees from viewing it while creating the Payment Order.
* **Lock fields**: You can lock critical fields to ensure compliance and prevent unauthorized changes. A payroll payment template might lock the originating account and purpose code, ensuring that funds always come from the correct source and payments adhere to the bank's compliance requirements.

### Versioning

Payment Templates evolve over time. Versioning ensures updates don’t disrupt workflows while maintaining visibility into past configurations.

* Each template update creates a new version.
* Only the latest version can be used in a Payment Order.
* Past versions remain visible for reference but cannot be reactivated.
* Templates cannot be reverted to a prior version. A new update is required.

Every Payment Template has an audit trail to maintain a history of modifications for compliance tracking.

### Approval Rules for Payment Orders

Approval workflows can be configured based on the template used in a payment order.

* Approval rules can require specific approvers for payments made using certain templates.
* Example: Payroll payments require sign-off from Finance & Payroll teams.
* Approval logic can be configured under Settings > Payments > Approval Rules.

### Permission Controls

Payment Templates come with granular permission controls

* **CRUD Permissions**: Control who can create, edit, or delete templates in general.
* **Usage Permissions**: Restrict which users or teams can view a specific template, edit or delete it, and use it in a Payment Order.

These permissions can be assigned at both a global level (all templates) and a per-template level, allowing for flexibility in access control. Users without access to use a template will not see it in the Payment Order form.

<Callout icon="👉" theme="default">
  ### Payment Templates are only supported in the UI. To request API access, please reach out [support@moderntreasury.com](mailto:support@moderntreasury.com).
</Callout>