# Simulating Tokenizations

Simulate digital wallet tokenizations in Sandbox.

Simulate a digital wallet tokenization from the payment network as if it came from a cardholder.

```
POST https://sandbox.lithic.com/v1/simulate/tokenization
```

#### Sample Request

```bash
{
    "pan": "5234561906388032",
    "cvv": "375",
    "expiration_date": "08/29",
    "tokenization_source": "APPLE_PAY"
    "account_score": 5,  # Optional defaults to 5. Expects (1-5)
    "device_score": 5,  # Optional defaults to 5. Expects (1-5)
    "wallet_recommended_decision": "APPROVED"  # Optional defaults to 'APPROVED'. Expects ('APPROVED', 'DECLINED', 'REQUIRE_ADDITIONAL_AUTHENTICATION')
}
```

#### Sample Response

```json
{
  "token": "21e1f6b3-610d-4df5-82a0-f5cd03ba2f61",
  "token_requestor_name": "APPLE_PAY",
  "account_token": "a91a62cd-0a4c-46d7-b799-6b0440b33de0",
  "card_token": "a0f05df0-5f2d-4db4-b2a9-c0f67c59cfbb",
  "token_unique_reference": "62a34597-80bc-499a-9e51-240ff62b41d6",
  "status": "APPROVED",
  "created_at": "2023-08-28T15:57:14.578051",
  "updated_at": "2023-08-28T15:57:14.578051"
}
```