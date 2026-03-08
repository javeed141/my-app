# Simulating Card Transactions

Simulate card transactions in Sandbox.

Because the sandbox environment is not connected to payment networks, it cannot receive card transactions. The sandbox environment has additional endpoints to simulate transaction events originating from a merchant acquirer.

Simulated transaction events will trigger transaction webhooks and will be returned in subsequent `GET /transactions` responses.

# Simulate Authorizations

API Reference: [Simulate authorization](https://docs.lithic.com/reference/postsimulateauthorize)

Simulate an authorization request from the payment network as if it came from a merchant acquirer.

```
POST https://sandbox.lithic.com/v1/simulate/authorize
```

#### Sample Request

```bash
curl https://sandbox.lithic.com/v1/simulate/authorize \
  -X POST \
  -H "Authorization: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"descriptor":"Sample Transaction","amount":3831,"pan":"4111111289144142", "merchant_acceptor_id": "OODKZAPJVN4YS7O"}'
```

#### Sample Response

```json
{
  "debugging_request_id": "d31645af-da9e-4952-b7dc-3ffb06618b39",
  "token": "fabd829d-7f7b-4432-a8f2-07ea4889aaac"
}
```

In the case of an error processing the authorization, a `422 Unprocessable Entity` response code will be returned with a description of the error.

```json
{
  "debugging_request_id": "9399c6b5-4e8d-4357-ae75-116eb4299fe8",
  "message": "Exceeds transaction limit"
}
```

# Simulate Voids

API Reference: [Simulate void transaction](https://docs.lithic.com/reference/postsimulatevoid)

Void an existing, uncleared (aka pending) authorization.

```
POST https://sandbox.lithic.com/v1/simulate/void
```

#### Sample Request

```bash
curl https://sandbox.lithic.com/v1/simulate/void \
  -X POST \
  -H "Authorization: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"amount":0,"token":"fabd829d-7f7b-4432-a8f2-07ea4889aaac"}'
```

#### Sample Response

```json
{
  "debugging_request_id": "3ec51ef1-b68d-4243-be6c-2204229b09cf"
}
```

# Simulate Clearings

API Reference: [Simulate clearing transaction](https://docs.lithic.com/reference/postsimulateclearing)

Clear an existing authorization. After this event, the transaction is no longer pending.

```
POST https://sandbox.lithic.com/v1/simulate/clearing
```

#### Sample Request

```bash
curl https://sandbox.lithic.com/v1/simulate/clearing \
  -X POST \
  -H "Authorization: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"amount":0,"token":"fabd829d-7f7b-4432-a8f2-07ea4889aaac"}'
```

#### Sample Response

```json
{
  "debugging_request_id": "58352315-cd15-407d-bdbc-6324784d959e"
}
```

# Simulate Returns

API Reference: [Simulate return](https://docs.lithic.com/reference/postsimulatereturn)

Return (aka refund) an amount back to a card. Returns are cleared immediately and do not spend time in a `PENDING` state.

```
POST https://sandbox.lithic.com/v1/simulate/return
```

#### Sample Request

```bash
curl https://sandbox.lithic.com/v1/simulate/return \
  -X POST \
  -H "Authorization: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"descriptor":"Sample Return","amount":2934,"pan":"4111111503827704"}'
```

#### Sample Response

```json
{
  "debugging_request_id": "66312f8a-78a3-4238-a87b-16d6cba78108",
  "token": "6b9b4635-5bd6-4409-88d1-d598ceb56156"
}
```

# Simulate Declines

You can simulate declines by simulating authorizations that should be declined.

#### Sample Decline Simulation with Spend Limits

1. [Create a card](https://docs.lithic.com/reference/postcards) with spend limit

```bash
curl https://sandbox.lithic.com/v1/card \
     -X POST \
     -H 'Accept: application/json' \
     -H 'Content-Type: application/json' \
     -H 'Authorization: YOUR_API_KEY \
     -H 'Content-Type: application/json' \
     -d '
{
     "type": "VIRTUAL",
     "spend_limit": 1000
}
'
```

2. Retrieve PAN from the response.
3. Simulate decline with an authorization over the spend limit.

```bash
curl https://sandbox.lithic.com/v1/simulate/authorize \
  -X POST \
  -H "Authorization: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"descriptor":"Sample Transaction","amount":2000,"pan":"CREATED_PAN"}'
```

4. You should see a response of the form:

```bash
{"message": "Transaction exceeds user-set transaction limit", "token": "d1f276ff-1a27-4d7b-a607-9485bf063b26", "debugging_request_id": "960db679-a242-49a5-ace7-cd2e6970569d"}
```