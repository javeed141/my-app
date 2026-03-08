# Subscriptions API migration guide

# Migration Guide

We’ve announced these updates for API endpoints:

* Added 4 new endpoints (supporting Installments API, learn more [here](https://developers.pipedrive.com/changelog/post/introducing-new-installment-api))
* Deprecated 9 endpoints (previously part of Subscription API, learn more [here](https://developers.pipedrive.com/changelog/post/removal-of-subscriptions-api-replaced-by-product-subscriptions-api))

If you’re using any of the deprecated endpoints, follow this guide to safely migrate to the new Revenue Management feature.

Post your questions and comments in the [Developers’ Community](https://devcommunity.pipedrive.com/).

## Endpoints affected by the changes

* `GET /v1/subscriptions/{id}`
* `GET /v1/subscriptions/find/{dealId}`
* `GET /v1/subscriptions/{id}/payments`
* `POST /v1/subscriptions/recurring`
* `POST /v1/subscriptions/installment`
* `PUT /v1/subscriptions/recurring/{id}`
* `PUT /v1/subscriptions/installment/{id}`
* `PUT /v1/subscriptions/recurring/{id}/cancel`
* `DELETE /v1/subscriptions/{id}`

## General feature changes

Moving Recurring Revenue to the Product Subscriptions feature allows users to configure, save subscriptions and payment schedules/installments as part of the add-product-to-deal workflow.

Using this solution, customers can:

* Configure products as recurring items (for example subscriptions or licenses);
* Include subscriptions in Products feature that are saved in the product list view and can be easily added to deals by salespeople;
* Add multiple subscriptions to a single deal;
* Add payment schedules/installments for project-based selling, compatible with the Products feature;
* Have a single, consolidated location to add products and payment schedules/installments to a deal. No more split between Products and Recurring Revenue, causing disconnects and conflicting deal value calculations;
* Use revenue forecasts to accurately predict all recurring and one-time revenue from products and payment schedules/installments. Users will also be able to track their product and subscription performance more effectively for their deals;

<Callout icon="📘" theme="info">
  **Note:** Recurring products are available for Advanced plan and higher.
</Callout>

### GET /v1/subscriptions/\{id}

This endpoint logic will no longer be supported. Use these endpoints instead:

* [GET /api/v2/deals/\{id}/products](https://developers.pipedrive.com/docs/api/v1/Deals#getDealProducts)
* [GET /api/v2/deals/\{id}/installments](https://developers.pipedrive.com/docs/api/v1/Deals#getInstallments)

### GET /v1/subscriptions/find/\{deal\_id}

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Deprecated endpoint
      </th>

      <th>
        New endpoint to use
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `GET /v1/subscriptions/find/{dealId}`
      </td>

      <td>
        Deal Product:\
        [GET /api/v2/deals/\{id}/products](https://developers.pipedrive.com/docs/api/v1/Deals#getDealProducts)

        Installment:\
        [GET /api/v2/deals/\{id}/installments](https://developers.pipedrive.com/docs/api/v1/Deals#getInstallments)
      </td>

      <td>
        Both endpoints should be used to fetch information regarding a given deal.

        * *Note*\*: Use the [GET /api/v2/deals/\{id}](https://developers.pipedrive.com/docs/api/v1/Deals#getDeal)  endpoint to fetch information for:
        * Deal MRR (Monthly Recurring Revenue)
        * ACV (Annual Contract Value)
        * ARR (Annual Recurring Revenue).
      </td>
    </tr>
  </tbody>
</Table>

### GET /v1/subscriptions/\{id}/payments

This endpoint logic will no longer be supported. Payments can be calculated from the client side, by fetching [installments](https://developers.pipedrive.com/docs/api/v1/Deals#getInstallments) and [products](https://developers.pipedrive.com/docs/api/v1/Deals#getDealProducts) added to a deal:

* Each installment is considered a payment
* Each recurring product’s payments will match the number of cycles set for it
* Each one-time product will be a payment

### POST /v1/subscriptions/recurring

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Deprecated endpoint
      </th>

      <th>
        New endpoint to use
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `POST /v1/subscriptions/recurring`
      </td>

      <td>
        [POST /api/v2/deals/\{id}/products](https://developers.pipedrive.com/docs/api/v1/Deals#addDealProduct)
      </td>

      <td>
        Use the Products Catalog to add products or services you’re selling.

        You can also use the [Products API](https://developers.pipedrive.com/docs/api/v1/Products)

        * *Note*\*: To add a product to a deal, you need to have a product added in the catalog to reference it in the deal.

        Each product can be added to a deal as a recurring product using:

        * `billing_frequency` different than one-time (previously `cadence_type`)

        * `billing_frequency_cycles` with the number of cycles needed (previously `cycles_count`). This field can be set as infinite by using `null` value. To define when the charging for the recurring product will start, you can set:

        * `billing_start_date` with the date of the first payment.**Note:** You won’t be able to add a product to a deal as a recurring product if the deal already includes installments. For additional payments, you can add products to a deal as one-time products and set up the `billing_start_date`
      </td>
    </tr>
  </tbody>
</Table>

### POST /v1/subscriptions/installment

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Deprecated endpoint
      </th>

      <th>
        New endpoint to use
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `POST /v1/subscriptions/installment`
      </td>

      <td>
        [POST /api/v2/deals/\{id}/installments](https://developers.pipedrive.com/docs/api/v1/Deals#postInstallment)
      </td>

      <td>
        Use the new endpoint to add installments one by one instead of adding a single installment with several payments at once. Each installment added like this will represent a payment.

        * *Note*\*: If the deal already has recurring products, adding installments won’t be possible.
      </td>
    </tr>
  </tbody>
</Table>

### PUT /v1/subscriptions/recurring/\{id}

| Deprecated endpoint                    | New endpoint to use                                                                                                                   | Description                                                                                                                  |
| :------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------- |
| `PUT /v1/subscriptions/recurring/{id}` | [PATCH /api/v2/deals/\{id}/products/\{product\_attachment\_id}](https://developers.pipedrive.com/docs/api/v1/Deals#updateDealProduct) | **Note**: You won’t be able to change a product, added to a deal, to be recurring if the deal already includes installments. |

### PUT /v1/subscriptions/installment/\{id}

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Deprecated endpoint
      </th>

      <th>
        New endpoint to use
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `PUT /v1/subscriptions/installment/{id}`
      </td>

      <td>
        [PATCH /api/v2/deals/\{id}/installment/\{installment\_id}](https://developers.pipedrive.com/docs/api/v1/Deals#updateInstallment)
      </td>

      <td>
        * *Note*\*: Updating installments in bulk isn’t supported. You’ll need to update installment by installment.

        Each installment represents a payment.
      </td>
    </tr>
  </tbody>
</Table>

### PUT /v1/subscriptions/recurring/\{id}/cancel

This endpoint logic will no longer be supported. The concept of canceling a subscription or installment doesn’t exist in the new Revenue Management feature.

Follow this logic to simulate the concept of canceling a subscription:

* Update the deal product subscription to have the billing end date match the subscription end date. This can be done by changing the field `billing_frequency_cycle`.
* Remove the relevant installments to have the last installment date `billing_date` match the subscription end date.

### DELETE /v1/subscriptions/\{id}

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Deprecated endpoint
      </th>

      <th>
        New endpoint to use
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `DELETE /v1/subscriptions/{id}`
      </td>

      <td>
        Deal Product:\
        [DELETE /api/v2/deals/\{id}/products/\{attachment\_id}](https://developers.pipedrive.com/docs/api/v1/Deals#deleteDealProduct)

        Installment:\
        [DELETE /api/v2/deals/\{id}/installments/\{installment\_id}](https://developers.pipedrive.com/docs/api/v1/Deals#deleteInstallment)
      </td>

      <td>
        Each entity will have its own Delete endpoint.

        Both paths are required to have `deal_id`.
      </td>
    </tr>
  </tbody>
</Table>