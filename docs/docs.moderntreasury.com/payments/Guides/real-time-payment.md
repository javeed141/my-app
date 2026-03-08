# Real-Time Payment (RTP)

Modern Treasury supports sending real-time payments. We leverage The Clearing House's Real-Time Payment's network as well as the Federal Reserve's FedNow system. We abstract the underlying network and provide one payment type for real-time payments, `rtp`.

| Send | Send Reversible | Pull  | Pull Reversible |
| :--- | :-------------- | :---- | :-------------- |
| Yes  | No              | Yes\* | No              |

Currently, RTPs are always sent immediately after creation, so it is not possible to schedule one to settle in the future. Any RTPs with a future-dated `effective_date` are invalid and will fail to persist.

\*Pulls over the RTP network are called Request for Payment (RFP). Unlike an ACH debit, this request must be approved by the receiving party in order for funds to move. The result of an accepted RFP is an RTP credit from the receiving party to the originator of the RFP.