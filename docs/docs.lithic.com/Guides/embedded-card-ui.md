# Embedded Card UI

Learn how to embed card PANs and CVV codes.

> 📘 Quick Start Guide
>
> Our ["View Card PANs & CVVs" Quick Start Guide](/docs/quick-start-card-ui) explains everything you need to implement a simple Embedded Card UI in under 5 minutes.

Handling full card PANs and CVV codes requires that you comply with the [Payment Card Industry Data Security Standards (PCI DSS)](https://www.pcisecuritystandards.org/). Some clients choose to reduce their compliance obligations by using our embedded card UI solution documented below.

In this setup, PANs and CVV codes are presented to the end-user via a card UI that we provide, optionally styled in the customer's branding using a specified CSS stylesheet.

A user's browser makes the request directly to api.lithic.com, so card PANs and CVVs never touch the API customer's servers while full card data is displayed to their end-users.

The response contains an HTML document. This means that the URL for the request can be inserted straight into the `src` attribute of an iframe.

<Callout icon="❗" theme="error">
  You should compute the request payload on the server-side. You can render it (or the whole iframe) on the server or make an ajax call from your front-end code, but **do not embed your API key into front-end code, as doing so introduces a serious security vulnerability**.
</Callout>

API Reference: [Embedded card UI](https://docs.lithic.com/reference/getembedcard)

```
GET https://api.lithic.com/v1/embed/card
```

# Requests

```curl
curl https://api.lithic.com/v1/embed/card?embed_request=eyJjc3Mi..&hmac=u...
```

|                |                                                                                                      |
| -------------- | ---------------------------------------------------------------------------------------------------- |
| embed\_request | A base64 encoded JSON string of an [Embed Request](https://docs.lithic.com/reference/getembedcard) to specify which card to load   |
| hmac           | SHA2 [HMAC](https://en.wikipedia.org/wiki/HMAC) of the embed\_request JSON string with base64 digest |

## Embed Request Schema

```json
{
  "token": String,
  "css": String,
  "account_token": String,
  "expiration": String
}
```

|                           |                                                                                                                                                                                              |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| account\_token (optional) | Globally unique identifier for the [account](https://docs.lithic.com/docs/accounts) that the card to be displayed is associated with. <br /> *String. Permitted values: 36-digit version 4 UUID (including hyphens).* |
| css                       | A publicly available URI, so the white-labeled card element can be styled with the client's branding                                                                                         |
| expiration (optional)     | An RFC 3339 timestamp for when the request should expire.                                                                                                                                    |
| token                     | Globally unique identifier for the card to be displayed                                                                                                                                      |

For the `expiration` parameter, if no timezone is specified, UTC will be used. If payload does not contain an expiration, the request will never expire.

<Callout icon="🚧" theme="warn">
  Using an `expiration` reduces the risk of a [replay attack](https://en.wikipedia.org/wiki/Replay_attack). Without supplying the `expiration`, in the event that a malicious user gets a copy of your request in transit, they will be able to obtain the response data indefinitely.
</Callout>

# Response

The endpoint returns an HTML document similar to the one below. It is up to the API client to provide CSS styles for these elements in the Embed Request. You can always rely on the `card`, `pan`, `expiry`, `cvv`, and `alert` ids, as well as the `pan-separator` class. You shouldn't make any other assumptions about the structure of the document as it could change at any time.

Note that using the default style sheet there is no visual indication that copying is happening on-click, and you may need to add on-click styling yourself.

```html
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="{{ css_uri }}" />
    <style>
      #alert {
        display: none;
      }
    </style>
    <script type="text/javascript">
      var timeout;

      function clearAlertDelay() {
        clearTimeout(timeout);
        var messageDiv = document.getElementById("alert");
        timeout = window.setTimeout(function () {
          messageDiv.className = "empty";
          messageDiv.innerText = "";
        }, 1200);
      }

      function copySuccess(divId) {
        var messageDiv = document.getElementById("alert");
        messageDiv.innerText = divId + " copied to clipboard";
        messageDiv.className = "success";
        console.log("Copying to clipboard was successful!");
        clearAlertDelay();

        // Only included if target_origin is in the embed request
        window.parent.postMessage(
          { copyElt: divId, isCopied: true },
          "{{ target_origin }}",
        );
      }

      function copyFailed(divId) {
        var messageDiv = document.getElementById("alert");
        messageDiv.innerText = "error copying " + divId;
        messageDiv.className = "error";
        console.error("Copying to clipboard failed");
        clearAlertDelay();

        // Only included if target_origin is in the embed request
        window.parent.postMessage(
          { copyElt: divId, isCopied: false },
          "{{ target_origin }}",
        );
      }

      function copyToClip(divId) {
        var messageDiv = document.getElementById("alert");
        var copyEl = document.getElementById(divId);
        var copyText = copyEl.textContent;
        navigator.clipboard
          .writeText(copyText)
          .then(function () {
            copySuccess(divId);
            clearAlertDelay();
          })
          .catch(function (err) {
            try {
              var copied = false;
              if (document.createRange) {
                range = document.createRange();
                range.selectNode(copyEl);
                select = window.getSelection();
                select.removeAllRanges();
                select.addRange(range);
                copied = document.execCommand("copy");
                select.removeAllRanges();
              } else {
                range = document.body.createTextRange();
                range.moveToElementText(copyEl);
                range.select();
                copied = document.execCommand("copy");
              }

              if (copied) {
                copySuccess(divId);
              } else {
                copyFailed(divId);
              }
            } catch (err) {
              copyFailed(divId);
            }
            clearAlertDelay();
          });
      }
    </script>
  </head>
  <body>
    <div id="card" class="card">
      <div id="pan" class="pan" onclick="copyToClip('pan')">
        9999<span class="pan-separator"></span>9999<span
          class="pan-separator"
        ></span
        >9999<span class="pan-separator"></span>9999
      </div>
      <div id="expiry" class="expiry">
        <span id="month" class="month" onclick="copyToClip('month')">08</span>
        <span id="separator" class="separator">/</span>
        <span id="year" class="year" onclick="copyToClip('year')">27</span>
      </div>
      <div id="cvv" class="cvv" onclick="copyToClip('cvv')">574</div>
      <div id="alert" class="alert empty"></div>
    </div>
  </body>
</html>
```

# Creating a Request

While you can write your own HMAC code, we already implemented it in [our easy-to-use libraries](/docs/api-libraries). Our libraries are kept up-to-date, provide types, and simplify some of the more complex parts of the API.

If you want to implement it yourself, here are some example implementations for creating an embed request and HMAC.

```python
import base64
import hashlib
import hmac
import json

import requests  # pip install requests


def to_json_str(json_object):
    return json.dumps(json_object, sort_keys=True, separators=(',', ':'))


def hmac_signature(key, msg):
    hmac_buffer = hmac.new(
        key=bytes(key, 'utf-8'),
        msg=bytes(msg, 'utf-8'),
        digestmod=hashlib.sha256
    )
    return base64.b64encode(hmac_buffer.digest()).decode('utf-8')


def embed_request_query_params(api_key, card_uuid, expiration, css_url, target_origin):
    embed_request_dict = {
        # Globally unique identifier for the card to display
        "token" : card_uuid,
    }

    if css_url:
        # Stylesheet URL to style the card element
        embed_request_dict["css"] = css_url

    if expiration:
        # Expiration to make request invalid
        embed_request_dict["expiration"] = expiration

    if target_origin:
        # Only required if you want to post the element clicked to the parent iframe
        embed_request_dict["target_origin"] = target_origin

    embed_request_json = to_json_str(embed_request_dict)

    embed_request = base64.b64encode(bytes(embed_request_json, 'utf-8')).decode('utf-8')
    embed_request_hmac = hmac_signature(api_key, embed_request_json)

    return {
        "embed_request": embed_request,
        "hmac": embed_request_hmac,
    }


def get_embed_html(api_key, card_uuid, expiration=None, css_url=None, target_origin=None):
    url = "https://api.lithic.com/v1/embed/card"

    headers = {
        "Accept": "text/html",
    }

    params = embed_request_query_params(api_key, card_uuid, expiration, css_url, target_origin)

    response = requests.request("GET", url, params=params, headers=headers)
    response.raise_for_status()

    return response.text

```

```rust
/** Crates:
base64 = "0.13.0"
reqwest = { version = "0.11", features = ["json"] }
tokio = { version = "1", features = ["full"] }
serde = { version = "1.0", features = ["derive"] }
serde_json = "1"
sha2 = "0.10"
hmac = "0.12.1"
*/

use base64;
use hmac::{Hmac, Mac};
use reqwest;
use serde::Serialize;
use serde_json;
use sha2::Sha256;
use std::env;

fn sort_alphabetically<T: Serialize, S: serde::Serializer>(
    value: &T,
    serializer: S,
) -> Result<S::Ok, S::Error> {
    let value = serde_json::to_value(value).map_err(serde::ser::Error::custom)?;
    value.serialize(serializer)
}

#[derive(Serialize)]
struct SortAlphabetically<T: Serialize>(#[serde(serialize_with = "sort_alphabetically")] T);

#[derive(Serialize)]
struct EmbedRequestParams<'a> {
    token: &'a str,
    css: &'a str,
    account_token: &'a str,
    target_origin: &'a str,
}

fn hmac_signature(key: &str, msg: &str) -> String {
    type HmacSha256 = Hmac<Sha256>;

    let mut mac = HmacSha256::new_from_slice(key.as_bytes()).unwrap();
    mac.update(&msg.as_bytes());

    let code_bytes = mac.finalize().into_bytes();

    return base64::encode(&code_bytes.to_vec());
}

fn embed_request_query(
    api_key: &str,
    card_token: &str,
    css_url: &str,
    account_token: &str,
    target_origin: &str,
) -> (String, String) {
    let params = EmbedRequestParams {
        token: card_token,
        css: css_url,
        account_token: account_token,
        target_origin: target_origin,
    };

    // Embed request params must be sorted alphabetically
    let embed_request_json = serde_json::to_string(&SortAlphabetically(&params)).unwrap();

    let embed_request = base64::encode(&embed_request_json);

  	// Generate HMAC digest
    let hmac = hmac_signature(&api_key, &embed_request_json);

    return (embed_request, hmac);
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let args: Vec<String> = env::args().collect();

    let api_key = &args[1];
    let card_token = &args[2];
    let css_url = &args[3];
    let account_token = &args[4];
    let target_origin = &args[5];

    let client = reqwest::Client::new();

  	// Generate query parameters by encoding and signing embed request
    let (embed_request, hmac) = embed_request_query(
        api_key,
        card_token,
        css_url,
        account_token,
        target_origin,
    );

  	// Get HTML
    let resp = client
        .get("https://api.lithic.com/v1/embed/card")
        .query(&[("embed_request", &embed_request), ("hmac", &hmac)])
        .header("Authorization", format!("{}", api_key))
        .send()
        .await?
        .text()
        .await?;

    println!("{}", resp);

    Ok(())
}
```

# Styling Your Card

As mentioned above, you can provide your own CSS URL in the request to style your card. Below is an example CSS stylesheet for formatting your card, including a visual indication that copying is happening on-click.

```css
.card {
  display: grid;
  grid-template-rows: 2fr 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "header header"
    "pan pan"
    "expiry cvv";
  box-sizing: border-box;
  padding: 20px;
  width: 280px;
  height: 180px;
  background: white
    url("https://lithic-web.s3.us-west-1.amazonaws.com/lithic-logo/lithic-logo.svg")
    top 28px left 28px no-repeat;
  border-radius: 12px;
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.1),
    0 6px 12px rgba(0, 0, 0, 0.1);
  font:
    14px/1.2 system-ui,
    sans-serif;
  cursor: default;
}

.pan,
.expiry,
.cvv {
  grid-area: pan;
  height: fit-content;
  width: fit-content;
  padding: 8px;
  border-radius: 8px;
  font-weight: bold;
  letter-spacing: 0.1em;
  transition: background 250ms;
}

.expiry {
  letter-spacing: 0;
  grid-area: expiry;
}

.cvv {
  letter-spacing: 0;
  grid-area: cvv;
}

.expiry:before,
.cvv:before {
  content: "Valid";
  margin-right: 0.5em;
  opacity: 0.5;
  font-weight: normal;
}

.cvv:before {
  content: "CVV";
}

div[onclick^="copyToClip"]:hover {
  background: rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
```

<div align="center">
  <img src="https://files.readme.io/08995bbbe6bd4ad5b8d513eb0bc327da6f6174cf2b409443622cc7bf47ebc63e-view-card-pans-and-cvvs.png" alt="Example card rendering with logo" />

  <p><em>Example card rendering with logo</em></p>
</div>

# Putting It All Together

To quickly test your card out locally, you can serve your CSS stylesheet and the generated HTML in a directory.

First, generate HTML of the rendered card and save it in a directory called `LithicDemo`:

```python
API_KEY = "YOUR_API_KEY"
CARD_TOKEN = "EXAMPLE_CARD_TOKEN"
CSS_URL = "http://localhost:8080/your_card_style.css"

html = get_embed_html(API_KEY, CARD_TOKEN, CSS_URL)

# Write your HTML to a directory called "LithicDemo"
with open("path/to/LithicDemo/card.html", "w") as f:
    f.write(html)
```

Serve the assets in `LithicDemo`:

```bash
$ cd LithicDemo/  # directory containing your stylesheet and card.html
$ python -m  http.server 8080  # serve the directory locally on port 8080
```

Now go to `http://localhost:8080/card.html` to view your card.

As mentioned above, in your customer-facing application, you should embed the html as an iframe. Make sure to allow `clipboard-write` if you want users to be able to copy the card details.

If you supply `target_origin` in the embed request, you can also capture click events in the parent iframe by adding an event listener.

```html
<html>
  <head></head>

  <body>
    <iframe
      id="card-iframe"
      allow="clipboard-write"
      width="600"
      height="300"
      src="http://localhost:8080/output.html"
    >
    </iframe>
    <script>
      window.addEventListener(
        "message",
        function (e) {
          console.log("event", e);
          if (e.origin !== "http://localhost:8080") return;

          if (e.data.isCopied === true) {
            alert(e.data.copyElt + " copied!");
          }
        },
        false,
      );
    </script>
  </body>
</html>
```