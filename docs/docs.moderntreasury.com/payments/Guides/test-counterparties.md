# Counterparties

You may create Counterparties in your Sandbox with the same data you would use in Production. All routing details on External Accounts are run through the exact same validations that are run in Production.

Modern Treasury's Sandbox also recognizes *specific* Counterparty `account_number` values that you can use to simulate successful and failure payment workflows. The table below specifies the behavior that will occur when specifying a particular `account_number` (note that the Counterparty Name is irrelevant here - you may provide any name you wish).

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Account Number
      </th>

      <th>
        Effect
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `123456789`
      </td>

      <td>
        Will result in successful ACH, Wire and RTP payment orders.
      </td>
    </tr>

    <tr>
      <td>
        `100XX`\
        (e.g. `10001`)
      </td>

      <td>
        Will result in an ACH return with code RXX.

        **Note**: the last two digits are the specific return code you would like to simulate (e.g. `10001` will simulate an Insufficient Funds R01 return; `10003` will simulate an R03).
      </td>
    </tr>

    <tr>
      <td>
        `11111111X...X`\
        (e.g.`1111111110`)
      </td>

      <td>
        Will fail ACH, Wire, and RTP payment orders.
      </td>
    </tr>
  </tbody>
</Table>

<br />

To use these behaviors:

* Create a Counterparty in Sandbox using either the Modern Treasury UI or the Create Counterparty API (remember to use your Sandbox API key when making API requests)
* Set the `account_number` to one of the values above

See the example Create Counterparty API requests below for reference. Once created, Payment Orders sent to these Counterparties will follow the appropriate simulated success or failure lifecycle, giving you a reliable way to test your workflows.

```curl Successful Payments Counterparty
curl --request POST \
  -u $ORGANIZATION_ID:$API_KEY \
  --url https://app.moderntreasury.com/api/counterparties \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Harry Potter",
    "accounts": [
      {
        "account_type": "checking",
        "party_address": {
            "line1": "7 Hogsmeade Ave.",
            "locality": "San Francisco",
            "region": "California",
            "postal_code": "94108",
            "country": "US",
            "live_mode": false
        },
        "routing_details": [
          {
            "routing_number_type": "aba",
            "routing_number": "121141822"
          }
        ],
        "account_details": [
          {
            "account_number": "123456789"
          }
        ]
      }
    ]
  }'
```

```curl ACH/Wire Returns Counterparty
curl --request POST \
  -u $ORGANIZATION_ID:$API_KEY \
  --url https://app.moderntreasury.com/api/counterparties \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Voldemort (ACH/Wire Return) - R01 Insufficient Funds",
    "accounts": [
      {
        "account_type": "checking",
        "routing_details": [
          {
            "routing_number_type": "aba",
            "routing_number": "121141822"
          }
        ],
        "account_details": [
          {
            "account_number": "10001"
          }
        ]
      }
    ]
  }'
```

```curl Payment Failure Counterparty
curl --request POST \
  -u $ORGANIZATION_ID:$API_KEY \
  --url https://app.moderntreasury.com/api/counterparties \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Lucius (General Failure)",
    "accounts": [
      {
        "account_type": "checking",
        "routing_details": [
          {
            "routing_number_type": "aba",
            "routing_number": "121141822"
          }
        ],
        "account_details": [
          {
            "account_number": "1111111110"
          }
        ]
      }
    ]
  }'
```