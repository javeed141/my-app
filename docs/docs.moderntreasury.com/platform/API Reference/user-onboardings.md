# User Onboarding Webhooks

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th style={{ textAlign: "left" }}>
        Event
      </th>

      <th style={{ textAlign: "left" }}>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td style={{ textAlign: "left" }}>
        **Needs Approval**
      </td>

      <td style={{ textAlign: "left" }}>
        A User Onboarding session Needs Approval.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **Approved**
      </td>

      <td style={{ textAlign: "left" }}>
        A User Onboarding session has been Approved.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **Denied**
      </td>

      <td style={{ textAlign: "left" }}>
        A User Onboarding session has been Denied.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **Expired**
      </td>

      <td style={{ textAlign: "left" }}>
        A User Onboarding session is Expired.
      </td>
    </tr>
  </tbody>
</Table>

```json Sample User Onboarding approved webhook
{
  "event": "approved",
  "data": {
	  "id": "e640a26e-4289-4799-b991-e5a136b94428",
	  "object": "user_onboarding",
	  "live_mode": true,
	  "metadata": {"foo": "bar"},
	  "party_type": "individual",
	  "status": "approved",
    "verified_phone": null,
    "verified_email": null,
    "counterparty_id": "72d63b95-910f-41ae-a13c-5a9465c891a1",
    "external_account_id": "4c95964e-c9d4-4102-9183-2c8ae39e2c1d",
    "decision_id": "08d9b87d-67a2-4234-a6d0-e8fec11ebb4f",
    "created_at": "2022-05-16T05:14:02Z",
    "updated_at": "2022-05-16T05:14:02Z"
	}
}
```