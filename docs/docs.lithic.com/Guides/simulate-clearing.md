# 4. Authorize a Transaction

<a target="_blank" href="https://www.postman.com/lithic-global/lithic-api/request/49153688-9d46fa63-b06b-43eb-a0f1-d8e02cdd8220?tab=body" class="button-postman">▶ Run in Postman</a>

<Image align="center" border={false} src="https://d1jvjlrimvr0n9.cloudfront.net/stable/658b38856c2403d2_2f75c7cf7d55cbf6aa7d7bdd640e4f4bc9f451f6b2a2365e5aef26fcf829afe0-clearing.png" />

Transactions which are authroized, will be settled by the card networks by default in the Live enviornment.

In the Sandbox this is simulated via our `/simulate/clearing` endpoint. This endpoint that will trigger the Settlement of a transaction.

## Code

```shell cURL
curl --location 'https://sandbox.lithic.com/v1/simulate/clearing' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header 'Authorization: e65e2478-f516-4c9d-af36-7d1ebc5414fd' \
--data '{
  "amount": 3831,
  "token": "408f63aa-fb26-408e-bcd1-ed3b620a29f8"
}'
```