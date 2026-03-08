# ACH Auth Rules [BETA]

Set configurable rules to control how you receive ACH Payments using ACH Auth Rules endpoints.

ACH Auth Rules allow you to control which ACH payments are received by your Financial Accounts. You can create rules for ACH Debit Receipts (pull payments) or ACH Credit Receipts (push payments), with conditions based on:

* Company name of the originator
* Company ID of the originator
* Transaction amount
* SEC code
* Timestamp of when the payment is received
* Memo field

You can combine multiple conditions in a single rule. Rules can apply to your entire program or to specific accounts.

# Key Concepts

**Default behavior:** All ACH Debit Receipts are returned by default. You must create `APPROVE` rules to accept them. This prevents unauthorized debits from debiting funds from your accounts.

**Rule actions:** Every rule must specify an action type. Use `APPROVE` to accept matching payments, or `RETURN` to reject them. RETURN rules require a NACHA return code- your program must be approved for any return codes you plan to use. See [ACH at Lithic](https://docs.lithic.com/docs/ach-overview) for more details about supported return codes.

**Draft and promote workflow:** Rules are created in an `INACTIVE` state. You must call the promote endpoint to activate them. This allows you to review rule configurations before they affect live transactions on your program.

**Rule precedence:** A single ACH payment can trigger multiple rules. If both `APPROVE` and `RETURN` rules match, Lithic applies the stricter action and returns the payment.

# Sample Flows

The examples below show two approaches for handling ACH Debit Receipts in a digital banking or bill payment use case.

<Callout icon="📘" theme="info">
  **Note:** These code samples are for reference only. Check the [Auth Rules API specification](https://docs.lithic.com/reference/post_v2-auth-rules) for current request and response schemas.
</Callout>

## Flow 1: Selectively Approve ACH Debit Receipts

This approach maintains the default program behavior of returning ACH Debit Receipts and approves specific billers per account.

### Step 1: Create an account-level approval rule

Since ACH Debit Receipts are returned by default, you'll need to create a rule to allow a specific biller to debit a specific account. This example approves debits from originator ID `5330903621` for account `29c98870-1e7e-489c-b4c8-40d1cab0b6c3`:

```curl
curl --request POST \
  --url https://sandbox.lithic.com/v2/auth_rules \
  --header 'Authorization: YOUR_API_KEY' \
  --header 'Content-Type: application/json' \
  --data '{
    "name": "Approve Electric Company debits",
    "account_tokens": ["29c98870-1e7e-489c-b4c8-40d1cab0b6c3"],
    "type": "CONDITIONAL_ACTION",
    "parameters": {
      "action": {
        "type": "APPROVE"
      },
      "conditions": [
        {
          "attribute": "COMPANY_ID",
          "operation": "IS_ONE_OF",
          "value": ["5330903621"]
        }
      ]
    },
    "event_stream": "ACH_DEBIT_RECEIPT"
  }'
```

The response includes the rule token and shows the rule in `INACTIVE` state with the configuration in `draft_version`:

```json
{
  "token": "120b126f-9ad9-4c7f-a305-91fc30a4c210",
  "state": "INACTIVE",
  "program_level": false,
  "account_tokens": ["29c98870-1e7e-489c-b4c8-40d1cab0b6c3"],
  "type": "CONDITIONAL_ACTION",
  "current_version": null,
  "draft_version": {
    "version": 1,
    "parameters": {
      "action": {
        "type": "APPROVE"
      },
      "conditions": [
        {
          "attribute": "COMPANY_ID",
          "operation": "IS_ONE_OF",
          "value": ["5330903621"]
        }
      ]
    }
  },
  "name": "Approve Electric Company debits",
  "event_stream": "ACH_DEBIT_RECEIPT"
}
```

### Step 2: Promote the rule

Activate the rule by calling the [promote endpoint](https://docs.lithic.com/reference/post_v2-auth-rules-auth-rule-token-promote) with the rule token `120b126f-9ad9-4c7f-a305-91fc30a4c210`:

```curl
curl --request POST \
  --url https://sandbox.lithic.com/v2/auth_rules/120b126f-9ad9-4c7f-a305-91fc30a4c210/promote \
  --header 'Authorization: YOUR_API_KEY'
```

The rule is now `ACTIVE`. The configuration moves from `draft_version` to `current_version`, and incoming payments from this originator will be approved for the specified account.

## Flow 2: Approve All Debits, Then Selectively Return

This approach approves all ACH Debit Receipts at the program level, then creates stop payments as needed.

### Step 1: Create a program-level approval rule

Create a rule with empty conditions to approve all ACH Debit Receipts across the program:

```curl
curl --request POST \
  --url https://sandbox.lithic.com/v2/auth_rules \
  --header 'Authorization: YOUR_API_KEY' \
  --header 'Content-Type: application/json' \
  --data '{
    "name": "Approve all ACH Debit Receipts",
    "program_level": true,
    "type": "CONDITIONAL_ACTION",
    "parameters": {
      "action": {
        "type": "APPROVE"
      },
      "conditions": []
    },
    "event_stream": "ACH_DEBIT_RECEIPT"
  }'
```

ACH Auth Rules perform their configured action when all rule conditions are satisfied. By configuring a rule with no rule conditions, all ACH Debits will inherently satisfy all conditions.

### Step 2: Promote the program-level rule

Activate the rule using its token `249599db-48fc-4a79-8304-bdad6260f4b9`:

```curl
curl --request POST \
  --url https://sandbox.lithic.com/v2/auth_rules/249599db-48fc-4a79-8304-bdad6260f4b9/promote \
  --header 'Authorization: YOUR_API_KEY'
```

All Debit Receipts will now be approved program-wide.

### Step 3: Create a stop payment

When an end-user requests to stop payments from a specific originator, create an account-level RETURN rule. This example blocks originator `4830903615` for account `29c98870-1e7e-489c-b4c8-40d1cab0b6c3`, using return code `R07` to indicate the user has revoked authorization:

```curl
curl --request POST \
  --url https://sandbox.lithic.com/v2/auth_rules \
  --header 'Authorization: YOUR_API_KEY' \
  --header 'Content-Type: application/json' \
  --data '{
    "name": "Stop payment - Gym membership",
    "account_tokens": ["29c98870-1e7e-489c-b4c8-40d1cab0b6c3"],
    "type": "CONDITIONAL_ACTION",
    "parameters": {
      "action": {
        "type": "RETURN",
        "code": "R07"
      },
      "conditions": [
        {
          "attribute": "COMPANY_ID",
          "operation": "IS_ONE_OF",
          "value": ["4830903615"]
        }
      ]
    },
    "event_stream": "ACH_DEBIT_RECEIPT"
  }'
```

### Step 4: Promote the stop payment rule

Activate the rule using its token `76a015a9-6e46-491e-b0a2-90581ab7cf4a`:

```curl
curl --request POST \
  --url https://sandbox.lithic.com/v2/auth_rules/76a015a9-6e46-491e-b0a2-90581ab7cf4a/promote \
  --header 'Authorization: YOUR_API_KEY'
```

The account-level RETURN rule now overrides the program-level APPROVE rule for this specific originator. Payments from other billers continue to be approved.

# Further Reading

* [Auth Rules API Reference](https://docs.lithic.com/reference/post_v2-auth-rules) - Full API specification including all condition attributes, operations, and return codes
* [Authorization Rules](https://docs.lithic.com/docs/authorization-rules-v2) - Overview of Lithic's auth rules engine for card transactions. ACH Auth Rules utilize the same lifecycle.
* [ACH at Lithic](https://docs.lithic.com/docs/ach-overview) - General ACH product documentation