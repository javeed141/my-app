# Create a new Payment Template

Payment Templates live in Settings > Payments > Templates. Here, you can create, manage, and update templates for different types of payments.

## How to Create a Payment Template

1. Navigate to Settings > Payments > Templates.
2. Click **Create Template**.
3. Enter the Template Name and Description.
4. Configure the following fields:
   1. Payment Direction
   2. Originating & Receiving Accounts
   3. Payment Method & FX Settings (Base & Target Currency, Charge Bearer, etc.)
   4. Additional Details (Bank Statement Description, Remittance Info, Internal Description)
   5. Metadata
   6. Ledger Transactions
   7. Line Items
5. Configurations include:
   1. Showing/hiding fields on the Payment Order form
   2. Marking fields as required or optional
   3. Pre-setting inputs
   4. Locking fields to prevent edits
6. Click **Save Template** – This will create Version 1 of the template.

<Callout icon="👉" theme="default">
  ### Field configurations will not be validated while creating a template. Validations are performed while creating a Payment Order, which could flag errors in configuration.
</Callout>

<Image alt="Create a unique template for each payment use case" align="center" border={true} src="https://files.readme.io/3b5a9db752e885be1686bb476fb162843112d49a9dc50440727d2c7988c6c015-image.png">
  Create a unique Payment Template for each payment use case
</Image>

<Image alt="Pre-set and lock fields to ensure compliance and make it easier for your users to create a Payment Order" align="center" border={true} src="https://files.readme.io/d3a2d39128689fdcf95fe4cad33f328a292253685e3d8e7abd4106da14446747-image.png">
  Pre-set and lock fields to ensure compliance and make it easier for your users to create a Payment Order
</Image>

<Image alt="Hide fields like Remittance Information if it includes sensitive content like taxpayer identifiers" align="center" border={true} src="https://files.readme.io/2d144837b59c06d6239cf545a485dcbd60ef7128007407733e54fed17902fd42-image.png">
  Hide fields like Remittance Information if it includes sensitive content like taxpayer identifiers
</Image>

<Image alt="Enforce addition of important metadata for internal audit and reconciliation" align="center" border={true} src="https://files.readme.io/57cd6cb76942ed08d0bd45584ad6b4344072a80068027b7540f2e75b93eebcda-image.png">
  Require addition of important metadata for internal audit and reconciliation
</Image>