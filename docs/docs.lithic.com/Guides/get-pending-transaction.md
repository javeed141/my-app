# 3. View Transaction

<a target="_blank" href="https://www.postman.com/lithic-global/lithic-api/request/49153688-89412399-7748-4799-b0b3-d71aae84e2ae" class="button-postman">▶ Run in Postman</a>

Our API makes it easy to query for transactions. You can looks up a transaction and see it's status with our transaction API

```shell cURL
curl --request GET \
     --url https://sandbox.lithic.com/v1/transactions?card_token={Card Token}\
     --header "Accept: application/json" \
     --header "Authorization: { Sandbox API key }"
```

```typescript Typescript (Lithic Library)
/*
const lithic = new Lithic({
  apiKey: "{Sandbox API key}", // or "Production API key"
  environment: "sandbox", // or "production". Defaults to "production"
});
*/

const transaction_params: TransactionListParams = {
  card_token: "{Card Token}", // only retrieve transactions for this card
};
const transactions = await lithic.transactions.list(transaction_params);
```

```python Python 3.7 (Lithic Library)
'''
lithic = Lithic(
  api_key="{Sandbox API key}",  # or "Production API key"
  environment="sandbox",  # or "production". Defaults to "production"
)
'''

transactions = lithic.transactions.list({
	"card_token": "{Card Token}" # only retrieve transactions for this card
})
```

*For more information on transactions, check out our in-depth guide:[Transactions](https://docs.lithic.com/docs/transactions)*