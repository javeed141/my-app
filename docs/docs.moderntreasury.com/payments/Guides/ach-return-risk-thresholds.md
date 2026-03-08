# ACH Return Risk Thresholds

# Overview

NACHA’s [ACH Network Risk and Enforcement Rule](https://www.nacha.org/rules/ach-network-risk-and-enforcement-topics) aims to continually work at ACH Network quality by reducing the number of Returns and associated financial and reputation costs. Our banking partners are responsible for monitoring these and will evaluate customers based on their own risk appetite as well as the Return Risk Thresholds established by NACHA.

# Risk Threshold Categories

These risk thresholds are broken out into three categories:

* **Unauthorized Debits -** `R05`, `R07`, `R10`, `R29`, and `R51` fall in this category (the return rate for these can be no higher than 0.5%).
* **Administrative Return Rate** `R02`, `R03`, and `R04` (the return rate can be no higher than 3.0%).
* **Overall Return Rate** - 15% or less

These rates can be calculated by Returns in each category divided by the total debits (Returns and Completed debits) over a 60-day period.

# Unauthorized Debit Returns - Best Practices

For unauthorized debits, you are working to handle the following return codes:

* `R05`: Unauthorized Debit to Consumer Account Using Corporate SEC Code
* `R07`: Authorization Revoked by Customer
* `R10`: Customer Advises Unauthorized, Improper, Ineligible, or Part of an Incomplete Transaction
* `R29`: Corporate Customer Advises Not Authorized
* `R51`: Notice not Provided/Signature not Authentic/Item Altered/Ineligible for Conversion

As these debits pose a higher risk and therefore, banks have a lower tolerance for the return activities, it is important to ensure you protect your business first with these Returns. Upon seeing one of the above codes, be sure to suspend any recurring Payment Orders that might be in the queue. Reach out to your customer as a second step in order to try to resolve the issue. Most times, resolution can be in the form of either a new bank account to debit or your customer would need to remove a block on transactions to move forward.

# Administrative Returns - Best Practices

For administrative debits, you are working to handle the following return codes:

* `R02`: Account Closed
* `R03`: No Account/Unable to Locate Account:
* `R04`: Invalid Account Number Structure

Not only are these Returns that are a bit easier to fix with your customer, but these are also the Returns that are good candidates for redrafting a Return. Working with your customer to collect new account information or to update the routing/account number you have on file is the best way to resolve these errors.