# Originate an international wire with true remitter data at SVB

## Overview

This is a guide that details how to send an international wire on behalf of a third-party at SVB. Here is the guidance that SVB has provided:

> Silicon Valley Bank requires all clients who are originating international wire payments on behalf of a third-party to include specific information about the actual underlying payor (the “true remitter” of the payment). Including this “true remitter” information in the payment message allows SVB to identify, monitor, and better manage Anti-money Laundering (AML) risks tied to cross-border payments.

You can use the  `ultimate_originating_party_name` and `ultimate_originating_party_address` fields when creating a wire payment order to satisfy these requirements.

```curl
curl --request POST \
     --url https://app.moderntreasury.com/api/payment_orders \
     --header 'Accept: application/json' \
     --header 'Content-Type: application/json' \
     --data '{
               "type": "wire",
               "amount": 1000,
               "direction": "credit",
               "originating_account_id": "0f8e3719-3dfd-4613-9bbf-c0333781b59f",
               "receiving_account_id": "5acec2ef-987b-4260-aa97-b719eeb0a8d5" 
               "ultimate_originating_party_name": "Jane Doe",
               "ultimate_originating_party_address": {
                 "line1": "123 Main St",
                 "locality": "San Francisco",
                 "region": "CA",
                 "postal_code": "94107",
                 "country": "USA"
               }
             }'
```