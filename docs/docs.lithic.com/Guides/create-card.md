# 1. Create a Card

Create your first card using our Create Card API

## Postman

<a target="_blank" href="https://www.postman.com/lithic-global/lithic-api/request/49153688-4965b3cb-3744-489f-8709-266a01db3008?tab=body" class="button-postman">▶ Run in Postman</a>

<Image align="center" border={false} src="https://d1jvjlrimvr0n9.cloudfront.net/stable/5f9ee418bc6f6abe_0454439d36b1f8f5fd8a1530deaf090cbb46b6b16adb56dbd64ad6b5bea7a07e-create_card.png" />

## Code

```shell cURL
curl --request POST \
     --url https://sandbox.lithic.com/v1/cards \
     --header "Accept: application/json" \
     --header "Authorization: {Sandbox API key}" \
     --header "Content-Type: application/json" \
     --data '
{
     "type": "VIRTUAL"
}'
```

```typescript Typescript (Lithic Library)
/*
const lithic = new Lithic({
  apiKey: "{Sandbox API key}", // or "Production API key"
  environment: "sandbox", // or "production". Defaults to "production"
});
*/

const card_params: Lithic.CardCreateParams = {
  type: "VIRTUAL",
};
const card = await lithic.cards.create(card_params);
```

```python Python (Lithic Library)
'''
lithic = Lithic(
  api_key="{Sandbox API key}",  # or "Production API key"
  environment="sandbox",  # or "production". Defaults to "production"
)
'''

card = lithic.cards.create({
    "type": "VIRTUAL",
})
```

Cards can serve a variety of functions, from paying a merchant online to transacting in-person at a store.

**With Lithic, you can create cards in a single request and use them immediately.**

*For more information on cards, check out our in-depth guide: [Cards](https://docs.lithic.com/docs/cards)*

<br />