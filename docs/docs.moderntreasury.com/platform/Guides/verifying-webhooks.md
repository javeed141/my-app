# Verify a webhook event

To verify that a webhook was actually sent by Modern Treasury, every payload is signed with a signature that is passed through as the HTTP header.

> 🚧 Webhook Key
>
> Please [contact support](mailto:help@moderntreasury.com) if your webhook key is compromised or accidentally made public. We will rotate the key and coordinate the change with you.

## 1. Retrieve your webhook key

You can find your webhook key in your [Developer Settings](https://app.moderntreasury.com/developers/webhooks).

## 2. Generate signature

The signature is hex encoded and can be replicated by applying HMAC-SHA-256 to the body of the webhook with your webhook key.

```shell
echo -n "{...}" | openssl dgst -sha256 -hmac "WEBHOOK_KEY"
```

## 3. Confirm signature

Webhook signatures are sent in the `X-Signature` header.  You can verify that Modern Treasury sent the event by comparing the signatures.  If you feel your URL may be compromised, we recommend updating your Webhook URL. It is important not to parse the request body or manipulate the data before performing signature verification.

```javascript JavaScript
const express = require('express');
const { createHmac } = require('crypto');

const PORT = 3000;

const app = express();

app.use(
  express.json({
    verify: (req, res, buf) => {
      // Sign the raw body with secret key
      const hmac = createHmac('sha256', 'MY_WEBHOOK_KEY');
      
      // Read the raw body
      hmac.update(buf);
      if ( hmac.digest('hex') !== req.headers['X-Signature'] ) {
        throw new Error('Invalid signature!');
      }
    }
  })
);

app.post('/', (req, res) => {
  console.log(req.body);
  res.send('OK')
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

```

```ruby Ruby
require 'bundler/inline'

gemfile do
  source 'https://rubygems.org'
  gem 'rails', '~> 6.0'
end

require 'action_controller/railtie'
require 'logger'

Rails.logger = Logger.new(STDOUT)

class App < ::Rails::Application
  routes.append do
    root to: 'root#index'
  end
end

class RootController < ActionController::Base
  def index
    # Read the raw body
    body = request.body.read
    Rails.logger.info "body #{body}"
		
    # Sign the body with the secret key
    hash = OpenSSL::HMAC.hexdigest("SHA256", "MY_WEBHOOK_KEY", body)
    Rails.logger.info "signed hash #{hash}"

    render json: { body: body, hash: hash }
  end
end

App.initialize!

Rack::Server.start(app: App)

```

```python Python
from flask import Flask
from flask import request
import sys
import hmac
import hashlib

import hmac
import hashlib

app = Flask(__name__)

@app.route('/', methods = ['POST'])
def entry_point():
    # Read the raw body
    data = request.get_data()
    print(data, file=sys.stderr)
		
    # Sign the raw body with secret key
    digest = hmac.new(b'MY_WEBHOOK_KEY', msg=data, digestmod=hashlib.sha256).hexdigest()
    print(digest, file=sys.stderr)

    return { "body": data.decode('UTF-8'), "hash": digest }

if __name__ == '__main__':
    app.run(debug=True)

```