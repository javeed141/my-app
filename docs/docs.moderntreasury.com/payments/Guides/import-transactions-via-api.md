# Import Transactions via API

<br />

> 📘 Early Access Features
>
> This is an Early Access feature

Importing data via API is a good option for customers who need to reconcile transactions from banks not currently serviced by our [current set of bank integrations](https://www.moderntreasury.com/integrations). Visit the [Transactions API reference page](https://docs.moderntreasury.com/platform/reference/create-transaction) and [Balance Reports API reference page](https://docs.moderntreasury.com/platform/reference/create-balance-report) for more information.

### Bank Transaction Codes

To create transactions that mimic bank payment types and directions from a `bai2` file, provide `vendor_code` and `vendor_code_type` per this table:

| Payment Type | Direction | Vendor Code | Vendor Code Type |
| :----------- | :-------- | :---------- | :--------------- |
| ACH          | credit    | 169         | bai2             |
| ACH          | debit     | 469         | bai2             |
| Wire         | credit    | 195         | bai2             |
| Wire         | debit     | 495         | bai2             |
| Check        | credit    | 115         | bai2             |
| RTP          | credit    | 158         | bai2             |
| RTP          | debit     | 458         | bai2             |