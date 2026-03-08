# Transaction

A `transaction` object is created when a payment or payment-related event takes place on a card issued via the Lithic platform. Examples of events triggering the creation of a `transaction` object include a purchase authorization such as when a card is used to spend at a coffee shop, or a credit authorization such as when a merchant requests to issue a refund to the card.

The object is also updated whenever new events take place that modify the `transaction`. An example of this is when an outstanding purchase authorization is cleared by the merchant.

See [Card Transactions Guide](https://docs.lithic.com/docs/transaction-flow) for more details.

To see an example transaction object, refer to the [Get Transaction](https://docs.lithic.com/reference/gettransactionbytoken) response.