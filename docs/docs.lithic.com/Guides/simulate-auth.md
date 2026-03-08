# 2. Authorize a Transaction

Simulate authorizing a card at a retailer

## Postman

<a target="_blank" href="https://www.postman.com/lithic-global/lithic-api/request/49153688-c9cd12c4-cd90-4f3e-8430-063f3af98e61?tab=body" class="button-postman">▶ Run in Postman</a>

<Image align="center" border={false} src="https://d1jvjlrimvr0n9.cloudfront.net/stable/0a80738033093ea3_9edb1c9c70921f6a38ab5af81e4d95f1097472c2d63a65a61b355aacfeb235f8-simulate_auth.png" />

<br />

## Code

```shell cURL
curl --location 'https://sandbox.lithic.com/v1/simulate/authorize' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header 'Authorization: e65e2478-f516-4c9d-af36-7d1ebc5414fd' \
--data '{
  "amount": 3831,
  "descriptor": "COFFEE SHOP",
  "pan": "4111111187423657"
}'
```

This API simulates a card authorization at a merchant. You will be able to see this authorization in our Transaction API.

### Simulate an Authorization

When testing in the Sandbox. Lithic provides simulate operations that simulate real world workflows outside of the Lithic platform, so that you can test fully real world scenarios.

<Callout icon="⚠️" theme="warn">
  Simulation operations are only available in the Sandbox.
</Callout>

<br />