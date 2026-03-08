# Stablecoins

Stablecoin money movement is available using the same core Modern Treasury primitives available to move money via traditional rails. We abstract away the underlying custody, liquidity and blockchain infrastructure to offer this rail without the "crypto" headache.

| Send | Send Reversible | Pull | Pull Reversible |
| :--- | :-------------- | :--- | :-------------- |
| Yes  | No              | No   | N/A             |

## Getting Started with Stablecoin Accounts

> 📘 Stablecoin Accounts
>
> A Stablecoin account is simply another type of [Internal Account](https://docs.moderntreasury.com/payments/reference/internal-account-object).  Just like any other payment rail, they will primarily be used in coordination with a [Payment Order](https://docs.moderntreasury.com/platform/reference/payment-order-object) and a [Counterparty](https://docs.moderntreasury.com/platform/reference/counterparty-object).

Before you create a Payment Order, you must have a stablecoin-enabled Internal Account created.  See below for a sample Request to create a Stablecoin Internal Account.  Note: you will need a valid `legal_entity_id`.

```curl Example Stablecoin Internal Account Creation Request
curl --request POST \
     -u ORGANIZATION_ID:API_KEY \
     --url https://app.moderntreasury.com/api/internal_accounts \
     -H 'content-type: application/json' \
     -d '{
       "name": "Aragorn Stablecoin Account",
       "party_name": "Aragorn",
       "currency": "USDC",
       "legal_entity_id": "5d95643d-1127-4a7c-9ef5-ad21a1d007c6"
     }'
```

## Supported Stablecoins & Blockchain Networks

Please see below for our current stablecoin & network support.

| Stablecoin           | Ethereum | Solana | Base | Polygon PoS | Arbitrum One | Stellar |
| :------------------- | :------- | :----- | :--- | :---------- | :----------- | :------ |
| Pax Dollar (USDP)    | Yes      | Yes    | -    | -           | -            | -       |
| Global Dollar (USDG) | Yes      | Yes    | -    | -           | -            | -       |
| USD Coin (USDC)      | Yes      | Yes    | Yes  | Yes         | -            | -       |
| PayPal USD (PYUSD)   | Yes      | Yes    | -    | -           | Yes          | Yes     |
| USDT (Coming Soon)   | Yes      | -      | -    | -           | -            |         |

<br />