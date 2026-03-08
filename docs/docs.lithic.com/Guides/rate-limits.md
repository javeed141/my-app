# Rate Limits

Learn about API rate limits.

The Lithic API enforces rate limiting on all endpoints with the exception of card embeds. Traffic that breach our limits will receive a 429 status code and will not be processed.

We group endpoints by resource (table provided below), and rate limits will be applied across endpoints belonging to a particular resource. We enforce rate limits separately for each HTTP method. For example, if you make a call to `GET /cards` and `GET /cards/{uuid}` within the same second, both calls will contribute to your consumed `GET /cards` requests per second (RPS) because they both belong to the cards resource and have the same HTTP method. However, a call to `GET /cards` and `POST /cards` will be evaluated separately because they are different HTTP methods even though they belong to the same resource. Similarly, `PATCH /cards` and `POST /cards` will be evaluated separately because they are different HTTP methods (even though they are both write operations).

In Production, the default rate limit for read operations is 30 RPS and for write operations is 5 RPS. In Sandbox, the default rate limit for read operations is 15 RPS and for write operations is 1 RPS.

The exceptions to these defaults are the `cards` resource with 15 RPS and 2 RPS for write operations in Production and Sandbox, respectively and the `transfers` resource with 5 RPS and 2 RPS for write operations in Production and Sandbox, respectively.

Account holder creation via the KYC advanced workflow may be subject to lower rate limits due to third-party vendors.

We will always include the response header `x-requests-remaining` which indicates how many RPS you have left in the given second. Should you be rate limited, you will also see the response header `retry-after: "1"` indicating the need to wait one second before retrying requests. Note that the Lithic SDKs natively support retries when the `retry-after` header is present.

*Lithic reserves the right to temporarily tighten these limits during high load or service interruptions. If higher RPS is needed for specific one-off operations (e.g. migrations), please contact [support@lithic.com](mailto:support@lithic.com)*

## Resource Groupings with Defaults

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Resource
      </th>

      <th>
        Endpoints
      </th>

      <th>
        Default Rate Limit Production
      </th>

      <th>
        Default Rate Limit Sandbox
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        accounts
      </td>

      <td>
        /accounts\*
      </td>

      <td>
        30 RPS read
        5 RPS write
      </td>

      <td>
        15 RPS read
        1 RPS write
      </td>
    </tr>

    <tr>
      <td>
        account\_holders
      </td>

      <td>
        /account\_holders\*
      </td>

      <td>
        30 RPS read
        5 RPS write
      </td>

      <td>
        15 RPS read
        1 RPS write
      </td>
    </tr>

    <tr>
      <td>
        auth\_rules
      </td>

      <td>
        /auth\_rules\*
      </td>

      <td>
        30 RPS read
        5 RPS write
      </td>

      <td>
        15 RPS read
        1 RPS write
      </td>
    </tr>

    <tr>
      <td>
        auth\_stream
      </td>

      <td>
        /auth\_stream\*
      </td>

      <td>
        30 RPS read
        5 RPS write
      </td>

      <td>
        15 RPS read
        1 RPS write
      </td>
    </tr>

    <tr>
      <td>
        cards
      </td>

      <td>
        /cards\* (excluding search by pan)
      </td>

      <td>
        30 RPS read
        **15 RPS write**
      </td>

      <td>
        15 RPS read
        **2 RPS write**
      </td>
    </tr>

    <tr>
      <td>
        card\_programs
      </td>

      <td>
        /card\_programs\*
      </td>

      <td>
        30 RPS read
        5 RPS write
      </td>

      <td>
        15 RPS read
        1 RPS write
      </td>
    </tr>

    <tr>
      <td>
        funding\_sources
      </td>

      <td>
        /funding\_sources\*
      </td>

      <td>
        30 RPS read
        5 RPS write
      </td>

      <td>
        15 RPS read
        1 RPS write
      </td>
    </tr>

    <tr>
      <td>
        responder\_endpoints
      </td>

      <td>
        /responder\_endpoints\*
      </td>

      <td>
        30 RPS read
        5 RPS write
      </td>

      <td>
        15 RPS read
        1 RPS write
      </td>
    </tr>

    <tr>
      <td>
        transactions
      </td>

      <td>
        /transactions\*
      </td>

      <td>
        30 RPS read
        5 RPS write
      </td>

      <td>
        15 RPS read
        1 RPS write
      </td>
    </tr>

    <tr>
      <td>
        external\_bank\_accounts
      </td>

      <td>
        /external\_bank\_accounts\*
      </td>

      <td>
        30 RPS read
        5 RPS write
      </td>

      <td>
        15 RPS read
        1 RPS write
      </td>
    </tr>

    <tr>
      <td>
        tokenization\_decisioning
      </td>

      <td>
        /tokenization\_decisioning\*
      </td>

      <td>
        30 RPS read
        5 RPS write
      </td>

      <td>
        15 RPS read
        1 RPS write
      </td>
    </tr>

    <tr>
      <td>
        tokenizations
      </td>

      <td>
        /tokenizations\*
      </td>

      <td>
        30 RPS read
        5 RPS write
      </td>

      <td>
        15 RPS read
        1 RPS write
      </td>
    </tr>

    <tr>
      <td>
        disputes
      </td>

      <td>
        /disputes\*
      </td>

      <td>
        30 RPS read
        5 RPS write
      </td>

      <td>
        15 RPS read
        1 RPS write
      </td>
    </tr>

    <tr>
      <td>
        balances
      </td>

      <td>
        /balances
        /financial\_accounts/\{uuid}/balances
        /aggregate\_balances
      </td>

      <td>
        30 RPS read
        5 RPS write
      </td>

      <td>
        15 RPS read
        1 RPS write
      </td>
    </tr>

    <tr>
      <td>
        card\_product
      </td>

      <td>
        /card\_product\*
      </td>

      <td>
        30 RPS read
        5 RPS write
      </td>

      <td>
        15 RPS read
        1 RPS write
      </td>
    </tr>

    <tr>
      <td>
        financial\_accounts
      </td>

      <td>
        /financial\_accounts\*
      </td>

      <td>
        30 RPS read
        5 RPS write
      </td>

      <td>
        15 RPS read
        1 RPS write
      </td>
    </tr>

    <tr>
      <td>
        financial\_transactions
      </td>

      <td>
        /financial\_accounts/\{uuid}/financial\_transactions

        /cards/\{uuid}/financial\_transactions
      </td>

      <td>
        30 RPS read
        5 RPS write
      </td>

      <td>
        15 RPS read
        1 RPS write
      </td>
    </tr>

    <tr>
      <td>
        payments
      </td>

      <td>
        /payments\*
      </td>

      <td>
        30 RPS read
        5 RPS write
      </td>

      <td>
        15 RPS read
        1 RPS write
      </td>
    </tr>

    <tr>
      <td>
        transfers
      </td>

      <td>
        /transfers\*
        /transfer\_configuration\_codes
      </td>

      <td>
        30 RPS read
        5 RPS write
      </td>

      <td>
        15 RPS read
        **2 RPS write**
      </td>
    </tr>

    <tr>
      <td>
        reports
      </td>

      <td>
        /reports\*
      </td>

      <td>
        30 RPS read
        5 RPS write
      </td>

      <td>
        15 RPS read
        1 RPS write
      </td>
    </tr>

    <tr>
      <td>
        statements
      </td>

      <td>
        /financial\_accounts/\{uuid}/statements\*
      </td>

      <td>
        30 RPS read
        5 RPS write
      </td>

      <td>
        15 RPS read
        1 RPS write
      </td>
    </tr>

    <tr>
      <td>
        events
      </td>

      <td>
        /events */event\_subscriptions*
      </td>

      <td>
        30 RPS read
        5 RPS write
      </td>

      <td>
        15 RPS read
        1 RPS write
      </td>
    </tr>

    <tr>
      <td>
        simulations (sandbox only)
      </td>

      <td>
        /three\_ds\_authentication/simulate
        /simulate\*
      </td>

      <td>
        N/A
      </td>

      <td>
        15 RPS read
        1 RPS write
      </td>
    </tr>
  </tbody>
</Table>

## Changelog

* May 20, 2024 - Enforcement begins
* May 13, 2024 - Initial public documentation released