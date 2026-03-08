# Embedded Card UI - React Frontend

A minimal example for customers using React front end

This guide walks through implementing Lithic's Embedded Card UI in a React application.  This is an extension to the the [Embedded Card UI Guide](https://docs.lithic.com/docs/embedded-card-ui).

### Prerequisites

* A React application (created with Create React App or similar)
* A base64-encoded embed request and HMAC signature (generated from your server), please see [Creating a Request](https://docs.lithic.com/docs/embedded-card-ui#creating-a-request).

<br />

### Step 1: Create the Card Component

Create a new component called `LithicCard.jsx`:

```jsx
// Lithic Card Component
import React, { useEffect } from 'react';

const LithicCard = ({ embedRequest, hmac, onCopy }) => {
  const embedUrl = `https://sandbox.lithic.com/v1/embed/card?embed_request=${embedRequest}&hmac=${hmac}`;

  return (
    <div className="card-container">
      <iframe
        title="Lithic Card"
        id="card-iframe"
        allow="clipboard-write"
        width={600}
        height={300}
        src={embedUrl}
        style={{ border: 'none' }}
      />
    </div>
  );
};

export default LithicCard;
```

### Step 2: Using the Component

Use the component in your app:

```jsx
// App.js
import React from 'react';
import './App.css';
import LithicCard from './components/LithicCard.jsx';

function App() {
  // These values should come from your server
  const embedRequest = "BASE64_ENCODED_JSON"
  const hmac = "HMAC";

  const handleCopy = (element) => {
    console.log(`${element} was copied to clipboard`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Lithic Card Demo</h1>
      </header>
      <main className="App-main">
        <LithicCard 
          embedRequest={embedRequest}
          hmac={hmac}
          onCopy={handleCopy}
        />
      </main>
    </div>
  );
}

export default App;
```

```javascript
// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

```css
/* App.css */
.App {
    text-align: center;
  }
  
  .App-header {
    background-color: #282c34;
    padding: 20px;
    color: white;
  }
  
  .App-main {
    padding: 20px;
    display: flex;
    justify-content: center;
  }
  
  .card-container {
    margin: 20px;
    padding: 20px;
    border-radius: 8px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
```

### Implementation Details

Your embed request should include:

* `token`: The card token
* `expiration`: Expiration timestamp
* `css`: URL to your CSS file (optional)
* `account_token`: The account token for the card (optional)

Example embed request object structure:

```javascript
{
  "token": "your-card-token",
  "css": "https://your-domain.com/card-styles.css",
  "expiration": "2024-12-31T23:59:59Z"
}
```

### Testing Checklist

* Verify the iframe loads correctly
* Test copy functionality for PAN, expiry, and CVV
* Test with different embed requests
* Verify your CSS styling works as expected
* Test error handling scenarios