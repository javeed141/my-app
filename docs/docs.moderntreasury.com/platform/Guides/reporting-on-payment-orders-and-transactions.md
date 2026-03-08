# Report on Payment Orders and Transactions

How to connect Payment Orders and Transactions reports.

## Overview

Modern Treasury will automatically connect Payment Orders to your bank statement Transactions. You may need to export data that connects these two data sources. This guide will describe how to do that using Modern Treasury's Reporting and export features.

One common use case is reporting on bank-reported data on your statement. This information could include FX rates, remittance information, and RDFI information.

One nuance to this data is that sometimes banks batch payments, which means that a single transaction on your statement may represent multiple payments you originated.

| Report Type           | Definition                                                                                      |
| :-------------------- | :---------------------------------------------------------------------------------------------- |
| Payment Order         | Payment instructions sent to your bank to initiate a debit, credit, or transfer of funds.       |
| Transaction           | Transactions are individual line items on your bank statement.                                  |
| Transaction Line Item | Transaction Line Items connect a Transaction to one or more payment objects in Modern Treasury. |

## Guide

1. ### Create Payment Orders Report

Navigate to **Reporting**, and select the Payment Order report type from the dropdown menu in the top right. Apply any filters and create the report. Once created, you can export the report by clicking the **Export CSV** button.

You may want to apply a filter to the status of the Payment Order, as only `Completed` Payment Orders will be matched to your bank statement.

2. ### Transactions Report

Create and download a Transactions type report. You may want to apply date filters here for the time period you care about.

3. ### Create Transaction Line Items Report

Create and download a Transaction Line Items type report. You may want to apply date filters here for the time period you care about. You may also want to filter based on the Transactable Type, which in most cases will be Payment Orders. This will help you narrow down the payments you have originated

4. ### Connect Payment Orders to Transaction Line Items

To connect these reports, we will reference the Payment Orders "**id**" column to the Transaction Line Items "**transactable\_id**" column. Note that only Transaction Line Items with "**transactable\_type**" equal to "**Payment Order**" will be found in Payment Order reports.

5. ### Connect Transaction Line Items to Transactions

We will reference the Transaction Line Items "**transaction\_id**" column to the Transactions "**id**" column.

## Result

With these three reports connected, you can analyze transactions and their associated payment(s). This will enable you to report on things like the ultimate FX rate reported by the bank in the Transaction per originated Payment Order.