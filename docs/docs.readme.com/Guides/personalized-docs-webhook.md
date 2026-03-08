# Set Up Personalized Docs

By telling ReadMe about the currently logged in user, the docs can show them their real API key, request history, and more!

## Setup

To personalize docs with information about the currently logged in user, ReadMe will make a request to your **Personalized Docs Webhook**, which is an endpoint that will need to be set up within an application that has secure access to user data. This endpoint will receive `POST` requests from ReadMe any time a user logs in, and will need to return a JSON object with information about the user, which will then be surfaced in the documentation.

There are 3 main steps to getting this set up that we will walk through in more detail:

1. Create an API endpoint that ReadMe will make a `POST` request to (i.e., a **Personalized Docs Webhook**)
2. Verify the request signature to ensure that it's a secure request from ReadMe
3. Fetch data for the user and send it back to ReadMe

We also have a video walkthrough of this process below:

<Embed url="https://www.youtube.com/watch?v=QGGhJVeBQmg" href="https://www.youtube.com/watch?v=QGGhJVeBQmg" typeOfEmbed="youtube" html="%3Ciframe%20class%3D%22embedly-embed%22%20src%3D%22%2F%2Fcdn.embedly.com%2Fwidgets%2Fmedia.html%3Fsrc%3Dhttps%253A%252F%252Fwww.youtube.com%252Fembed%252FQGGhJVeBQmg%253Ffeature%253Doembed%26display_name%3DYouTube%26url%3Dhttps%253A%252F%252Fwww.youtube.com%252Fwatch%253Fv%253DQGGhJVeBQmg%26image%3Dhttps%253A%252F%252Fi.ytimg.com%252Fvi%252FQGGhJVeBQmg%252Fhqdefault.jpg%26key%3D7788cb384c9f4d5dbbdbeffd9fe4b92f%26type%3Dtext%252Fhtml%26schema%3Dyoutube%22%20width%3D%22640%22%20height%3D%22480%22%20scrolling%3D%22no%22%20title%3D%22YouTube%20embed%22%20frameborder%3D%220%22%20allow%3D%22autoplay%3B%20fullscreen%22%20allowfullscreen%3D%22true%22%3E%3C%2Fiframe%3E" />

### 1. Create a Personalized Docs Webhook

ReadMe will make a `POST` request to your Personalized Docs Webhook. This is an endpoint that you configure in your project dashboard. This endpoint should bypass any standard authentication that you may have set up and should be able to accept requests from [dash.readme.com](https://dash.readme.com). We will send the email of the user that logged in as JSON in the request body.

**Example HTTP Request from ReadMe**

```http
POST /webhook HTTP/1.1
Content-Type: application/json
Host: yourapi.com
User-Agent: ReadMe
ReadMe-Signature: example-signature (see step 2)

{
  "email": "loggedinuser@site.com"
}
```

### 2. Verify the Request Signature

It's important to make sure all requests to this endpoint are coming from ReadMe so you're not sending sensitive user data to a bad actor. All requests from ReadMe have a signature header that can be used to make sure the request originated with ReadMe and wasn't modified in transit. We have packages in several major languages verify this header is valid.

> 👍 Secret Key
>
> You can find your project's secret key on the "Set Up API Keys" setting page in your project's Developer Dashboard section.

```javascript
// Verify the request signature to ensure it came from ReadMe.
const signature = req.headers['readme-signature'];
// Your project's secret key
const secret = '<<jwtSecret>>';

try {
  readme.verifyWebhook(req.body, signature, secret);
} catch (e) {
  // Handle invalid requests
  return res.status(401).json({ error: e.message });
}

// All good! Continue to the next step
```

```php
// Verify the request signature to ensure it came from ReadMe.
$signature = $request->headers->get('readme-signature', '');
// Your project's secret key
$secret = '<<jwtSecret>>';

try {
  \ReadMe\Webhooks::verify($request->input(), $signature, $secret);
} catch (\Exception $e) {
  // Handle invalid requests
  return response()->json([
    'error' => $e->getMessage()
  ], 401);
}

// All good! Continue to next step
```

```python
# Verify the request signature to ensure it came from ReadMe.
signature = request.headers.get("readme-signature", None)
# Your project's secret key
secret = '<<jwtSecret>>'

try:
  VerifyWebhook(request.get_json(), signature, secret)
  except Exception as error:
    return (
      {"error": str(error)},
      401,
      {"Content-Type": "application/json; charset=utf-8"},
    )
  
# All good! Continue to next step
```

```c#
// Verify the request signature to ensure it came from ReadMe.
var signature = context.Request.Headers["readme-signature"];
var body = await new StreamReader(context.Request.Body).ReadToEndAsync();
var secret = "<<jwtSecret>>"

try
{
  ReadMe.Webhook.Verify(body, signature, secret);
}
catch (Exception e)
{
  context.Response.StatusCode = StatusCodes.Status401Unauthorized;
  await context.Response.WriteAsJsonAsync(new
                                          {
                                            error = e.Message,
                                          });
  return;
}

// All good! Continue to next step
```

If the call to `verifyWebhook` succeeds then the request is verified, you can safely return any user data needed.

### 3. Fetch User and Respond With JSON

Once the request is verified to be from ReadMe, the next step is to fetch the necessary data for the user that has logged in. This step is going to vary depending on what your API looks like and how your data is stored. ReadMe will send the logged in user's email address in the `POST` body, which can be used to fetch the user's information from the database (or wherever their API key and other necessary info is stored).

The general flow will be as follows:

1. Get email address from `requestBody.email` (the specific way to access the email will vary depending on your server framework)
2. Fetch user from your database/backend
3. Return user data as JSON. These values should match the names in the API Specification. You can find a full reference of everything we expect [here](https://docs.readme.com/docs/passing-data-to-jwt). Example of common pieces of data that are good to return:
   1. API key or any required API authentication
   2. Server information (customer specific URL, subdomain, etc)

```javascript
// Fetch the user from the database and return their data for use with OpenAPI variables.
const user = await db.find({ email: req.body.email })
return res.json({
  // Add custom data to return in your webhook call here.
  apiKey: user.apiKey,
  subdomain: user.apiSubdomain,
});
```

```php
// Fetch the user from the database and return their data for use with OpenAPI variables.
$user = DB::table('users')->where('email', $request->input('email'))->limit(1)->get();
return response()->json([
  // Add custom data to return in your webhook call here.
  'apiKey' => $user->apiKey,
  'subdomain' => $user->apiSubdomain,
]);
```

```python
# Fetch the user from the database and return their data for use with OpenAPI variables.
user = User.objects.get(email__exact=request.values.get("email"))
return (
  {
    # Add custom data to return in your webhook call here.
    "apiKey": user.apiKey,
    "subdomain": user.apiSubdomain
  },
  200,
  {"Content-Type": "application/json; charset=utf-8"},
)
```

```c#
  // Fetch the user from the database and return their data for use with OpenAPI variables.
  // @todo Write your own query logic to fetch a user by `body["email"]`.

  await context.Response.WriteAsJsonAsync(new
  {
    // Add custom data to return in your webhook call here.
    apiKey = "api123",
  });
```

### Full Code Example

You can see a full working example in this Recipe.

<Recipe slug="setting-up-the-personalized-docs-webhook" title="Setting Up the Personalized Docs Webhook" />

## Configuring in ReadMe & Testing

When setting up your Developer Dashboard, you’ll be prompted to **Set Up API Keys** as part of the two-step onboarding process. There is a section titled Webhooks with instructions on how to deploy the Personalized Docs Webhook. In **step 3** you will be able to test the Personalized Docs Webhook you just created and, in **step 4**, you can save it to your project. Once everything is working, ReadMe will make the request to this endpoint every time a user logs into your ReadMe docs. To access Personalized Docs, in your project go to **Admin Settings > Personalized Docs**.

For customers on our Enterprise plan, you can configure your Personalized Docs Webhook in your Enterprise Group dashboard in the **Personalized Docs** page, located within the Group Settings section.

## FAQ

**I want to replace the default ReadMe login with my company's login instead, is that possible?**

This is possible but requires a little bit more work to configure! You can read all about using a custom login with ReadMe [here](https://docs.readme.com/docs/custom-login-page).

**I already have JWT set up, do I need to set up this endpoint as well to get all the functionality?**

Nope! You are still able to send user data via JWT. The same user data can be passed to ReadMe via JWT and it will continue to behave the same way in your documentation.

While there are no plans to deprecate JWT, we recommend the **Personalized Docs Webhook** approach detailed above because it is more secure and can handle more data in the user data payload than JWT can.

**Is there any way to know if my Personalized Docs Webhook endpoint fails? Will ReadMe stop firing events to it?**

There currently is no auto-retry functionality nor do we stop firing events for projects with the the Personalized Docs Webhook set up. If we do ever ship such changes, we'll make sure that all affected users will be notified well in advance.

For the best troubleshooting experience (for both you and your API end users), we recommend doing the following:

* Set up the Personalized Docs Webhook endpoint within the API that you're documenting in ReadMe (but don't worry about documenting this endpoint!)
* [Integrate the Metrics SDK](https://docs.readme.com/main/docs/sending-api-logs) into your API

By doing this, you can isolate and debug any issues with your API (and by extension, your Personalized Docs Webhook setup) within the [My Developers](https://docs.readme.com/main/docs/sending-api-logs) page of your dashboard.