# Create Embeddable Flow

## `modernTreasury.createEmbeddableFlow(options?)`

Creates an `EmbeddableFlow` object that can be mounted in your application.  `createEmbeddableFlow` takes a single `options` object which can have the following properties:

* **`clientToken`** (string) **required**\
  A clientToken from a flow object ([`AccountCollectionFlow`](https://docs.moderntreasury.com/reference/account-collection-flow-object), [`PaymentFlow`](https://docs.moderntreasury.com/reference/payment-flow-object))
* [**`variables`**](#variables) (object) *optional*\
  Variables to customize the appearance of your embeddable.
* [**`locale`**](#locale) (string) *optional*\
  The language of the embeddable flow.
* [**`onSuccess`**](#onsuccess) (function) *optional*\
  A callback function for once the end-user successfully completes the flow.
* [**`onError`**](#onerror) (function) *optional*\
  A callback function for if there is an error that makes completing the flow impossible.

```typescript
import {
  EmbeddableFlow,
  EmbeddableFlowError, 
  EmbeddableFlowCreateOptions,
} from "@modern-treasury/modern-treasury-js";

const options: EmbeddableFlowCreateOptions = {
  clientToken: "ac-live-qGDcL...",
  onSuccess: (result: object) => console.log("Success: ", result),
  onError: (error: EmbeddableFlowError) => console.log("Error: ", error),
  variables: { colorPrimary: "blue" },
};

const embeddableFlow: EmbeddableFlow = modernTreasury.createEmbeddableFlow(options);
```

```javascript JavaScript
const options = {
  clientToken: "ac-live-qGDcL...",
  variables: { colorPrimary: "blue" },
  onError: (error) => console.log("Error: ", error),
  onSuccess: (result) => console.log("Success: ", result),
};

const embeddableFlow = modernTreasury.createEmbeddableFlow(options);
```

### `variables`

The *optional* `variables` object allow you to customize the appearance of the embeddable to match the look and feel of your application.  If not provided, Modern Treasury will choose sensible defaults.

The following variables are configurable:

| Name                | Description                                    | Values                                                                                                                                             |
| :------------------ | :--------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| **colorPrimary**    | The primary color used in the Embeddable Flow. | Any valid CSS color value.                                                                                                                         |
| **colorBackground** | The background color of the Embeddable Flow.   | Any valid CSS color value.                                                                                                                         |
| **fontFamily**      | The font to use in the Embeddable Flow.        | One of `DM San`, `Figtree`, `IBM Plex Sans`, `IBM Plex Serif`, `Inter`, `Literata`, `Lora`, `Newsreader`, `Poppins`, `Roboto Flex`, `Roboto Serif` |

```javascript
const appearanceVariables = {
  colorPrimary: "#fa8072",
  colorBackground: "red",
  fontFamily: "Roboto Serif",
};

const embeddableFlow = modernTreasury.createEmbeddableFlow({
  clientToken: clientToken,
  variables: appearanceVariables
});
```

### `locale`

The *optional* `locale` property allows you to choose the language of the embeddable flow. If this field is not provided, the locale will default to `auto` and will be inferred from the end user's browser language preferences.

Currently, only the [account collection flow](https://docs.moderntreasury.com/docs/embed-account-collection) supports localization to Spanish. If you are interested in support for additional languages or localization of other pre-built UIs, contact Support.

| Value    | Description                                                           |
| :------- | :-------------------------------------------------------------------- |
| `auto`   | Language preference is inferred from the end user's browser settings. |
| `en`     | English.                                                              |
| `es-419` | Latin American Spanish.                                               |

### `onSuccess`

The  *optional* `onSuccess` callback fires after the end-user successfully submits information and completes the flow.  The flow object will be in status `completed`.  This can be used to redirect or navigate to other pages after the end-user completes the flow.  While not required, we strongly recommend you always define this callback.

```typescript
const onSuccess = (result: object) => console.log("Result: ", result)

const embeddableFlow = modernTreasury.createEmbeddableFlow({
  clientToken: clientToken,
  onSuccess: onSuccess
});
```

```javascript
const onSuccess = (result) => console.log("Result: ", result)

const embeddableFlow = modernTreasury.createEmbeddableFlow({
  clientToken: clientToken,
  onSuccess: onSuccess
});
```

### `onError`

The *optional* `onError` callback fires if there is a terminal error and the end-user will not be able to complete this flow.  If not provided, the error will be logged to the browser console by default.

The function takes a single `error` argument.  The `error` object has two properties:

* **`code`** (string) **required**:  An error code
* **`message`** (string) **required**:  A detailed, human-readable error message.

```typescript
import { EmbeddableFlowError } from "@modern-treasury/modern-treasury-js";

const onError = (error: EmbeddableFlowError) => {
  console.log("Error Code: ", error.code)
  console.log("Error Message: ", error.message)
}

const embeddableFlow = modernTreasury.createEmbeddableFlow({
  clientToken: clientToken,
  onError: onError
});
```

```javascript
const onError = (error) => {
  console.log("Error Code: ", error.code)
  console.log("Error Message: ", error.message)
}

const embeddableFlow = modernTreasury.createEmbeddableFlow({
  clientToken: clientToken,
  onError: onError
});
```

This callback will often fire if there are issues with mounting the iframe.  Here are some common error codes:

| Error Code              | Reason                                                                                                                                                                        |
| :---------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `already_processed`     | The flow is already completed.  A flow can only be processed once.                                                                                                            |
| `disabled_key`          | The Publishable Key used to initialize Modern Treasury is disabled.                                                                                                           |
| `disabled_organization` | The organization associated with the Publishable Key is disabled.                                                                                                             |
| `expired_token`         | The client token is expired.  Please create a new flow object and use the new `client_token`.                                                                                 |
| `invalid_auth_scheme`   | Authentication does not match our standard format.  Please check your Publishable Key and client token are formatted correctly.                                               |
| `invalid_domain`        | The Publishable Key is not permitted to be used on this domain.  The domain of the page you are mounting the Embeddable Flow must be on the Publishable Key domain allowlist. |
| `key_not_found`         | The Publishable Key was not found.                                                                                                                                            |
| `live_mode_mismatch`    | The Publishable Key and `client_token` have a different `live_mode`.                                                                                                          |
| `token_not_found`       | No flow object with the given `client_token` was found.                                                                                                                       |