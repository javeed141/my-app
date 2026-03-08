# Embeddable Account Collection

The embeddable Account Collection UI allows you to easily collect account details from end users with low development effort. Modern Treasury securely handles sensitive bank account information so that you do not have to. The form handles tasks like input validation and errors. Modern Treasury dynamically collects fields based on the payment type and geography, helping ensure that payments are successfully processed by banking partners.  Embeddable Account Collection can be used for stablecoin wallets by using the "Account Number" field.

<Image align="center" border={false} width="smart" src="https://files.readme.io/a49b14e-account-collection.gif" />

This guide describes how to embed this pre-built Account Collection UI in your application. The Account Collection UI currently supports domestic payments (e.g. ACH, wire and check) as well as international wires originating from the United States to the following countries:

* Australia
* Belgium
* Canada
* Chile
* China
* Colombia
* France
* Germany
* Hong Kong
* India
* Ireland
* Italy
* Mexico
* Netherlands
* Peru
* Spain
* United Kingdom

Please contact Support if you are interested in additional payment types and geographies.

## 1. Retrieve your API Key

**Dashboard**:  Go to your [API Keys page](https://app.moderntreasury.com/developers/api_keys).  There you will find your Organization ID and API keys. Your default Sandbox or Production keys have the appropriate permissions. If you make your own API key, ensure it has capabilities for the Account Collection Flows.

## 2. Create a Counterparty

**Server-side**: [Create a counterparty](https://docs.moderntreasury.com/reference/create-counterparty) for the end user whose bank account information you will be collecting.

```curl Create Counterparty Request
curl --request POST \
  -u ORGANIZATION_ID:API_KEY \
  --url https://app.moderntreasury.com/api/counterparties \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "John Johns"
  }'
```

The API request will return a [Counterparty](https://docs.moderntreasury.com/reference/counterparty-object) object, and the `id` will be used in the next step.

```json Create Counterparty Response
{
  "id":"37ba4454-dd33-4aa0-8906-0e2e4103e45c",
  "object": "counterparty",
  "name": "John Johns",
  "email": null,
  "send_remittance_advice": false,
  "metadata": {},
  "accounts": {},
  "live_mode": true,
  "created_at": "2019-11-09T00:11:07Z",
  "updated_at": "2019-11-09T00:11:07Z"
}
```

## 3. Create an Account Collection Flow

**Server-side**: [Create an Account Collection Flow](/platform/reference/create-account-collection-flow)

In addition to the `counterparty_id`, specify which `payment_types` you want the account to support.  Modern Treasury will customize the embedded form to collect fields commonly required for the payment types. If you encounter any issues, please reach out to [Support](mailto:support@moderntreasury.com).

```curl Request - Domestic ACH
curl --request POST \
	-u ORGANIZATION_ID:API_KEY \
	--url https://app.moderntreasury.com/api/account_collection_flows \
	-H 'Content-Type: application/json' \
	-d '{
		"counterparty_id": "37ba4454-dd33-4aa0-8906-0e2e4103e45c",
		"payment_types": ["ach"]
	}'
```

```curl Request - International Wire
curl --request POST \
	-u ORGANIZATION_ID:API_KEY \
	--url https://app.moderntreasury.com/api/account_collection_flows \
	-H 'Content-Type: application/json' \
	-d '{
		"counterparty_id": "37ba4454-dd33-4aa0-8906-0e2e4103e45c",
		"payment_types": ["wire"],
    		"receiving_countries": ["MEX"]
	}'
```

This API request will return an [Account Collection Flow](/platform/reference/account-collection-flow-object) object. The `client_token` will be used in future steps.

```json Response - Domestic ACH
{
  "id": "454e874b-ff1d-46e8-9d22-0464615cf1e0",
  "object": "account_collection_flow",
  "live_mode": true,
  "client_token": "ac-QVj2yTSt6qRNAzXQGKLHS9qfLF7Gs5JcCYHT5xztgjucGRbS6VfrJBpaNo5SrmfZ",
  "status": "pending",
  "payment_types": ["ach"],
  "receiving_countries": ["USA"],
  "counterparty_id": "c03581a8-c948-41a9-889a-e5228390fd80",
  "external_account_id": null,
  "created_at": "2023-02-18T03:23:48Z",
  "updated_at": "2023-02-18T03:23:48Z"
}
```

```json Response - International Wire
{
  "id": "454e874b-ff1d-46e8-9d22-0464615cf1e0",
  "object": "account_collection_flow",
  "live_mode": true,
  "client_token": "ac-QVj2yTSt6qRNAzXQGKLHS9qfLF7Gs5JcCYHT5xztgjucGRbS6VfrJBpaNo5SrmfZ",
  "status": "pending",
  "payment_types": ["wire"],
  "receiving_countries": ["MEX"],
  "counterparty_id": "c03581a8-c948-41a9-889a-e5228390fd80",
  "external_account_id": null,
  "created_at": "2023-02-18T03:23:48Z",
  "updated_at": "2023-02-18T03:23:48Z"
}
```

> 🚧 Only use API Keys server-side
>
> Please make sure you are creating `Counterparty` and `AccountCollectionFlow` objects from your backend servers.  API Keys are secret and should not be used directly in client-side applications.

## 4. Retrieve Publishable API Key

**Dashboard**: Go to your [Publishable API Keys](https://app.moderntreasury.com/developers/publishable_keys) page. There, you will find your Publishable API Keys. If you do not have one, create one.

## 5. Mount the Embeddable Flow

### **Add`modern-treasury-js`**

**Client-side**:  You first need to add [`modern-treasury-js`](/platform/reference/modern-treasury-js) to your application.  We recommend installing the library from NPM, but you can also directly install the script from our CDN.

```shell npm
npm install --save @modern-treasury/modern-treasury-js
```

```text yarn
yarn add @modern-treasury/modern-treasury-js
```

```html \\<script>
<script src="https://cdn.moderntreasury.com/js/v1/modern-treasury.js"></script>
```

### **Initialize`ModernTreasury`**

**Client-side**: Initialize `ModernTreasury` with your Publishable API Key from the previous step.

```typescript React
import { loadModernTreasury } from "@modern-treasury/modern-treasury-js";
 
const modernTreasury = await loadModernTreasury("publishable-test-MDAiy2...");
```

```javascript
const modernTreasury = ModernTreasury("publishable-test-MDAiy2...");
```

### **Create an Embeddable Flow**

**Client-side**: The next step is to create the `EmbeddableFlow`.  You must pass the `client_token` from the previous step.  While not required, we recommend defining an `onSuccess` callback to handle what happens after an end-user successfully completes the flow.  Similarly, we recommend defining an `onError` callback to handle any unexpected errors.  Visit [`createEmbeddableFlow`](/platform/reference/create-embeddable-flow) documentation for full details.

```typescript React
import { EmbeddableFlow } from "@modern-treasury/modern-treasury-js";    

const embeddableFlow: EmbeddableFlow = modernTreasury.createEmbeddableFlow({
  clientToken: "ac-test-rWbNg...",
  onSuccess: (result) => { /* Navigate to your next page */ },
  onError: (error) => { /* Handle errors */ }
});
```

```javascript Javascript
const embeddableFlow = modernTreasury.createEmbeddableFlow({
  clientToken: "ac-test-rWbNg...",
  onSuccess: (result) { /* Navigate to your next page*/ },
  onError: (error) => { /* Handle errors*/ }
});
```

#### **(*Optional*) Customize Appearance**

**Client-side**: You can customize the appearance of embeddable flows to match the look and feel of your application.  Check out our [`createEmbeddableFlow`](https://docs.moderntreasury.com/payments/reference/create-embeddable-flow#variables) documentation to see how to customize properties like colors and font.

#### **(*Optional*) Set Locale Preference**

**Client-side**: You can modify the language of the account collection flow. Visit the [`createEmbeddableFlow`](https://docs.moderntreasury.com/payments/reference/create-embeddable-flow#variables) documentation for more details.

### **Mount the Embeddable Flow**

**Client-side**: Now that you have an `EmbeddableFlow`, you need to add it to the DOM.  You can [`mount`](/platform/reference/mount-embeddable-flow) the flow to a valid CSS selector or a DOM element.  After successfully mounting,  the end-user will be able to start progressing through the flow.

```typescript React
embeddableFlow.mount("#put-iframe-here")
```

```javascript
embeddableFlow.mount("#put-iframe-here")
```

### **Summary**

After following all of these steps, you may have something that looks like this:

```typescript React
import React, { useEffect } from "react";
import { loadModernTreasury } from "@modern-treasury/modern-treasury-js";

function App() {
  useEffect(() => {
    const initModernTreasury = async () => {
      const modernTreasury = await loadModernTreasury("publishable-test-MDAiy2...");

      if (modernTreasury) {
        const embeddableFlow = modernTreasury.createEmbeddableFlow({
          clientToken: "ac-test-rWbNg...",
          onSuccess: (result) => { /* Handle Success */ },
          onError: (error) => { /* Handle Error */ }
        });

        embeddableFlow.mount("#put-iframe-here");
      }
    };

    void initModernTreasury();
  }, []);
  
  return (
    <div className="App">
      <div id="put-iframe-here" />
    </div>
  );
}
```

```html Vanilla JavaScript
<!-- To run this example locally you'll need to serve the page, this can be done by -->
<!-- running `python3 -m http.server 8081` in the same directory as the html file. -->

<!DOCTYPE html>
<html>
  <script src="https://cdn.moderntreasury.com/js/v1/modern-treasury.js"></script>
  <body>
    <h1>My Heading</h1>
    <div id="put-iframe-here"></div>
  </body>
  <script>
    // Initialize Modern Treasury library
    const mt = ModernTreasury("publishable-test-MDAiy2...");

    // Create the Embeddable Flow
    const embeddableFlow = mt.createEmbeddableFlow({
      clientToken: "ac-test-rWbNg...",
      onSuccess: (result) => { /* Handle Success */ },
      onError: (error) => { /* Handle Error */  },
    });
    
    // Mount the Embeddable Flow
    embeddableFlow.mount("#put-iframe-here")
  </script>
</html>
```

## 6. End-User Submits Account Details

**Client-side**: Once the flow is mounted, the end-user will follow the embedded Account Collection flow and submit their account details.  Once complete, we will create an `ExternalAccount` associated with the given `Counterparty`, save it to the `AccountCollectionFlow`, and move the `AccountCollectionFlow#status` to `completed`.  We will also call the `onSuccess` callback so that you can customize your success behavior and navigate to the next page.