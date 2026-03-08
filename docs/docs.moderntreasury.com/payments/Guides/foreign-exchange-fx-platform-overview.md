# Managing FX

The Modern Treasury Foreign Exchange (FX) platform helps you manage currency exchange rates for global payments.

The FX Platform is designed to provide value through a suite of capabilities:

* **Direct Bank Rates:** Access FX rates directly from your banks so you can negotiate favorable rates without any intermediaries. Modern Treasury does not charge an additional markup or fees.
* **Spot and Forward FX Quotes:** Request both spot and forward-dated FX quotes across a wide range of currency pairs for comprehensive planning and execution.
* **Unified FX Management Interface:** Use a single API and dashboard interface to manage FX quotes and initiate FX payments across various bank partners.
* **Multi-Bank Support:** Partner with multiple banks to access FX and cross-border payments for 100+ currency pairs and build redundancy into your FX workflows.
* **Track FX Rates On Transactions:** Automatically track and audit FX rates on every transaction to simplify accounting and reporting processes.

# Glossary

The table below provides some definitions for objects discussed in the following guides.

| Term                   | API Object               | Definition                                                                                                                                                                                                                                                                                                                                    |
| :--------------------- | :----------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Foreign Exchange Rate  | `foreign_exchange_rate`  | This object is how Modern Treasury represents exchange rate information between two currencies. The rate itself is not a resource that can be queried for, but will serialized as part of the object it applies to. See the [Foreign Exchange Rate](https://docs.moderntreasury.com/platform/reference/foreign-exchange-rates) API reference. |
| Foreign Exchange Quote | `foreign_exchange_quote` | The object is the mechanism for generating an exchange rate between two currencies. A quote is an exchange rate that is valid until a certain date. See the [Foreign Exchange Quote](https://docs.moderntreasury.com/platform/reference/foreign-exchange-quotes) API reference.                                                               |
| Payment Order          | `payment_order`          | A `payment_order` is an instruction to move money to or from your bank account via various payment types. See the [Payment Order](https://docs.moderntreasury.com/platform/reference/payment-order-object) API reference.                                                                                                                     |
| Transaction            | `transaction`            | A `transaction` is an individual entry as it would appear in an external financial institution's (e.g., bank, processor, etc.) portal or statement. See the [Transaction](https://docs.moderntreasury.com/platform/reference/transaction-object)  API reference.                                                                              |