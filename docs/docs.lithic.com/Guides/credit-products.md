# Credit Configurations

Configure Your Revolving or Charge Card Program

Lithic’s Credit Configurations give you a robust set of options to create a Charge or Revolving Credit Card program that perfectly fits your customers’ needs. You can work with your Lithic implementation specialist to understand best practices and get guidance in setting up your Credit Product, which stores the configurations.

After working to define the configuration with your implementation specialist, you will receive a Credit Product Configuration token. You can then [assign this token to Financial Accounts](https://docs.lithic.com/reference/patchaccountcreditconfiguration), in order to have the settings apply.

This guide walks through the configuration options available, and whether they apply for Charge and/or Revolving Credit Programs.

### 1. **Credit Limits**

*Configuration options available for **Charge** and **Revolving Credit***

* **Business-Level Limits**: Establish credit limits based on defined criteria, offering maximum control over total credit exposure.
* **Card-Level Limits**: Establish limits on the cards themselves by setting them on an account-level, which can be adjusted for specific purposes like spend control on [Lithic’s ASA apis](https://docs.lithic.com/docs/auth-stream-access-asa).

### 2. **Billing Cycles**

*Configuration options available for **Charge** and **Revolving Credit***

* **Fixed Billing Cycles**: Select a fixed monthly cycle that aligns with calendar dates (e.g., 25th of every month), offering predictability in billing and payment dates.
* **Rolling Billing Cycles**: Choose a rolling cycle that adjusts based on each customer’s account opening date (e.g., every 15 days), providing flexibility in individual billing timelines.
* **Auto Collections Enabled**: Select whether or not you want Lithic to automatically collect payment to settle balances

### 3. **Grace Period**

*Configuration options available for **Charge** and **Revolving Credit***

* **Configurable Grace Period**: Set a grace period (e.g., 15 days) post-billing, allowing users to settle their balances without incurring interest (Revolving Credit) or incurring a fee (Charge). This period can be adjusted to meet compliance or user-friendly standards. Grace period can be at most the length of the billing cycle.

### 4. **Interest Categories**

*Configuration options only apply for **Revolving Credit***

* **Purchase**: Define the standard interest rate for purchases.
* **Promotional**: Offer promotional interest rates for specific purchases or periods, which can help attract customers.
* **Cash Advance**: Configure a distinct rate for cash advances to manage higher-risk transactions.
* **Penalty**: Set penalty rates for delinquent accounts to mitigate risks associated with non-payment.
* **Balance Transfer**: Offer competitive rates for balance transfers, which attract users looking to consolidate debt.

### 5. **Tiers**

*Configuration options only apply for **Revolving Credit***

* **Tiered Structures**: Apply a different sets of of criteria, like interest rates and fees, to different segments of your customers based on their type of business or risk profile - all from within the same Credit Product Configuration

### 6. Automated **Fees**

*Configuration options available for **Charge** and **Revolving Credit***

* **Trigger Events**: Configure when fees are applied, such as for late payments or returned payments.
* **Maximum Occurrences**: Limit how frequently each fee type (e.g., returned payment) can be charged within a billing cycle.
* **Types of Fees**:
  * **Returned Payment Fee**: Configure the amount and the max number of fees that can be assessed when a payment is returned.
  * **Late Payment Fee**: Define the fee for a missed payment for every missed period, with the ability to cap the number of charges.
  * **FX Fee**: Apply a foreign transaction fee, as a percentage of the transaction amount, when customer spend in a foreign country.

### 7. **Payments**

*Configuration options only apply for **Revolving Credit***

* **Minimum Payment**: Set the minimum payment requirement per billing cycle, ensuring customers meet a base-level payment.
* **Statement Balance Payment**: Allow payment of the full statement balance to avoid accruing interest.
* **Pay Other Amount**: Offer customizable payment amounts beyond the minimum, giving customers flexibility in managing their balances.

### 8. **Rate Adjustments & Caps**

*Configuration options only apply for **Revolving Credit***

* **Prime Rate Linking**: Lithic exposes the ability for you to adjust certain interest rates (e.g., for purchase or cash advance categories) in alignment with changes in the prime rate, providing flexibility in dynamic interest rate environments.
* **Set Interest Caps**: Define maximum interest rates for all categories to stay compliant with regional regulations and ensure customer transparency.