# Instant Micro-Deposits

Use instant micro-deposits at banks that support instant rails such as FedNow or RTP

Micro-deposit verification is a form of authenticating bank account ownership or access. Unlike ACH or EFT micro-deposits, Instant Micro-Deposits are received in a matter of seconds. This speed enables better end-user experience, reducing the verification time from days to minutes or even seconds.

To use Instant Micro-Deposits, you follow the same instructions to [verify account with micro-deposits](https://docs.moderntreasury.com/payments/docs/verify-account-with-micro-deposits) and just simply change the `payment_type` parameter to a real-time rail such as `rtp`.

Your user's bank must support the rail you specify. If your user's bank does not support the rail used, Modern Treasury offers the option to automatically to fall back on ubiquitously accepted rails such as ACH.

Modern Treasury will automatically create an ACH debit to recoup successfully credited micro-deposits.