# Custom Login Page

## Why Log Your Customers Into Your Docs?

Logging users into your ReadMe docs allows you to show custom, personalized, interactive information to each user, drastically improving their experience using your documentation. You can:

* Automatically show each user their own API Keys in the API Reference and elsewhere in the docs. To demonstrate: in our docs, we use the  <span>\<</span>\<keys:id>> variable to show your ReadMe API Key, like this:

<Image title="Selection_010.png" alt="API key in docs" align="center" width="smart" src="https://files.readme.io/19312a1-Selection_010.png">
  API key in docs
</Image>

* Provide users with working code samples they can just copy and paste. No separate trip to grab an API key required!
* Create interactive API documentation—users can call the API directly from the API Reference.
* Login is a prerequiste for some neat  [Developer Metrics](https://docs.readme.com/main/docs/developer-dashboard) features, for example, showing the user the history of their API calls directly in the documentation.

## JWT Setup

Setting this up is easy if:

* you're a developer
* your company already has a method for logging in your customers that you can build on. (hint: if your customers authenticate in order to use your API, then you've got a log in method).

The flow is simple:

1. User clicks the Login link in ReadMe and is directed to a Login page on your site.
2. User logs in (or is already logged in).
3. Your site creates a JWT redirect URL with the user's information.
4. User is redirected to your documentation and logged into ReadMe!

## Node.js Demo

This guide will go into setup details below, but if you would prefer to jump straight into an example, we have a GitHub repo in Node.js to play around with:

[readmeio/readme-custom-login-demo](https://github.com/readmeio/readme-custom-login-demo).

## Redirect Users from ReadMe to Custom Login URL

The first step of the JWT login flow is that the user clicks the Login link in ReadMe and is redirected to a Login page on your site, rather than ReadMe's native login flow.

Under the **Settings > Custom Login** section of your project's dash, you can add a URL that users will be directed to via the login button in your documentation. (For an example of a custom login page, check out our [Node.js demo project](https://github.com/readmeio/readme-custom-login-demo/blob/master/views/index.jade).)

<Image title="custom-login.png" alt="custom login redirect" align="center" src="https://files.readme.io/76aac10-custom-login.png">
  custom login redirect
</Image>

## JWT Redirect

Once you have sent your user over to your company's site via the Custom Login page redirect, you log them in with your company's existing login method. Then, you'll need to send their credentials (including their API key if you want interactive API docs) back to ReadMe. We support that you send those credentials back using [JWT](http://jwt.io), and there are packages to help in almost every language!

The following example is in Node.js. It takes info about a user you already signed in via your company's method, and returns credentials for the user that you can send to ReadMe via the `auth_token` query string.

```javascript
const sign = require('jsonwebtoken').sign;

exports.readmeLogin = function(req, res) {
  // The user credentials that you want to send back to ReadMe 
  const user = {
    name: '<userName>',
    email: '<userEmail>',
    
    // This is what makes your interactive API docs! 
    // In this example we use OAS Security variables:
    apiKey: { user: '<userLoginName>', pass: '<userPassword>' },
     // You can pass in any information here and use it in your documentation!
     // Full list of data that has special meaning in our API Reference: 
     // https://docs.readme.com/docs/passing-data-to-jwt

    // This is only necessary for new end users to access your projects! 
    // Otherwise they will get a 'Protected Page' warning.
    allowedProjects: ['child-project-1', 'child-project-2'],
    version: 1, // Required, if omitted things can break unexpectedly
  };
  //create a signed token out of the user credentials
  const auth_token = sign(user, '<readmeJwtSecret>');
  const readmeUrl = '<https://yourDomain>';
 
  //create the complete URL containing the signed token that you'll send back to ReadMe
  return `${readmeUrl}?auth_token=${auth_token}`;
};
```

Note that the preceding code sample only covers the steps *between* logging in your user via your company's existing method, and sending the user credentials back to ReadMe via JWT. For the code sample's context, see our [Node.js demo](https://github.com/readmeio/readme-custom-login-demo/).

| Code snippet                                    | Comment                                                                                                                                                                                                                                      |
| :---------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<userName>`                                    | Provide the user information from your logged-in customer                                                                                                                                                                                    |
| `<userEmail>`                                   | Provide the user information from your logged-in customer.                                                                                                                                                                                   |
| `apiKey`                                        | This is what makes your interactive API docs! If you pass this information, it is displayed in working code examples that the user can call right the API Reference. [User Data in ReadMe](https://docs.readme.com/docs/passing-data-to-jwt) |
| `<readmeJwtSecret>`                             | You can find your JWT secret in your project's dashboard by going to your **Project Dashboard > Configuration > Custom Login**                                                                                                               |
| `<https://yourDomain>`                          | the base URL of your docs project, something like `<https://MyDocsSite`>.                                                                                                                                                                    |
| `return ${readmeUrl}?auth_token=${auth_token};` | this returns a URL with the JWT  token that you send to ReadMe as your user's credentials,  for example something like `<https://MyDocsSite/?auth_token=[JWT_ENCRYPTED_TOKEN]`>.                                                             |

After ReadMe receives the JWT-signed credentials for your user (`auth_token`) in the above Node.js example), ReadMe uses these credentials to:

* Log the user into ReadMe
* Populate the API docs with the  API key contained in the JWT-signed credentials, so the user can experience interactive API docs.