# Payment Actions

> 📘 Early Access Feature
>
> Payment Actions is currently an Early Access feature. Please reach out to [product@moderntreasury.com](mailto:product@moderntreasury.com) or your customer success manager for access.

A `payment_action` is an object that represents additional actions or instructions that should be sent to the bank regarding a specific payment (e.g. a `payment_order`) that is distinct from the payment initiation instruction.

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Attribute
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **id**
        *string*
      </td>

      <td>
        Unique identifier for the payment order
      </td>
    </tr>

    <tr>
      <td>
        **live\_mode**
        *boolean*
      </td>

      <td>
        This field will be true if this object was created with a production API key or false if created with a test API key.
      </td>
    </tr>

    <tr>
      <td>
        **actionable\_id**
        *string*
      </td>

      <td>
        The id of the payment to action on. Optional, but if present, the `actionable_type` must also be present.
      </td>
    </tr>

    <tr>
      <td>
        **actionable\_type**
        *string*
      </td>

      <td>
        The type of the payment being actioned on. One of `payment_order`, `expected_payment`. Optional, but if present, the `actionable_id` must also be present.
      </td>
    </tr>

    <tr>
      <td>
        **type**
        *string*
      </td>

      <td>
        The type of action decision for this specific payment action. The possible actions are determined based on the of the actionable.
      </td>
    </tr>

    <tr>
      <td>
        **status**
        *string*
      </td>

      <td>
        The status of the payment action.
        One of `pending` , `processable`, `processing`,`sent`,`acknowledged`  `failed`, `cancelled`
      </td>
    </tr>

    <tr>
      <td>
        **details**
        *object*
      </td>

      <td>
        The `action` specific attributes of the payment action.
      </td>
    </tr>
  </tbody>
</Table>

<br />

# Payment Action Types for each Payment Types

*currently we only support positive pay actions for`check` type payments*

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Payment Type
      </th>

      <th>
        Possible Action

        Types
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `check`
      </td>

      <td>
        `stop`
      </td>

      <td>
        Send a payment action notification to `stop` the corresponding check payment.
      </td>
    </tr>

    <tr>
      <td />

      <td>
        `issue`
      </td>

      <td>
        Send a payment action notification to `issue` the corresponding check payment (also known as Positive Pay). This is a notification to the bank that the corresponding check has been printed outside of the bank and should be honored.
      </td>
    </tr>
  </tbody>
</Table>

<br />

# Payment Action State Machine

The diagram below describes the changes and dependencies of the payment action state machine.

When the Payment Action is associated to an `actionable` of type `payment_order`, the payment action state is dependent on the state of the Payment Order. For other `actionable` types, such as `expected_payment`, the payment action state is not dependent on the state of the EP.

The following abbreviations are used to make rendering the diagram easier:`pa` is `payment_action` and `po` is `payment_order`. `actionable` refers to a type of payment that payment actions can be run on, specifically a `payment_order`.

# Actionable State Matrix

![](https://files.readme.io/ee82d0b0028d0216c3d183e001365603dc44affad1e7600aa22ba7a112858403-image.png)

<br />

The following describes the states of a payment action alongside the possible states for the corresponding actionable

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Payment Action Status
      </th>

      <th>
        Payment Order Status
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `pending`
      </td>

      <td>
        `pending`,
        `needs_approval`,
        `approved`
        `processing`
      </td>
    </tr>

    <tr>
      <td>
        `processable`
      </td>

      <td>
        `sent`
      </td>
    </tr>

    <tr>
      <td>
        `processing`
      </td>

      <td>
        `sent`
      </td>
    </tr>

    <tr>
      <td>
        `sent`
      </td>

      <td>
        `sent`
      </td>
    </tr>

    <tr>
      <td>
        `acknowledged`
      </td>

      <td>
        `stopped`
        `completed`
      </td>
    </tr>

    <tr>
      <td>
        `failed`
      </td>

      <td>
        `sent`,
        `completed`
      </td>
    </tr>

    <tr>
      <td>
        `cancelled`
      </td>

      <td>
        `failed`,
        `cancelled`
      </td>
    </tr>
  </tbody>
</Table>