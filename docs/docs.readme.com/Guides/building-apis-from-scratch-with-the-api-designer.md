# Building APIs from Scratch with the API Designer

# Overview

No OpenAPI specification? No problem! ReadMe's API Designer lets you build your API reference directly in the platform with an intuitive visual interface – no YAML or JSON required.

In this guide, we'll walk through creating a Social Media API with endpoints for listing and creating posts. You'll see how easy it is to document your API even if you're starting from a blank slate.

## Creating Your API Definition

Let's start by setting up the basic structure for your API:

1. Navigate to **API Reference** in your ReadMe project
2. Click the **+ Add** button
3. Select **Start Building** under "Build an API definition from scratch"

<Image align="center" src="https://files.readme.io/f9e241f98e3e8ad91e999561f4e3b4dfe260a8e6a18662e23da840887977b6c7-CleanShot_2025-03-11_at_11.18.13.gif" />

4. Enter your API definition details:
   * **API Title**: Enter a descriptive name (e.g., "Social Media API")
   * **Target Host URL**: Your API's base URL (e.g., "[http://api.example.com](http://api.example.com)")
   * **Authentication Type**: Select your authentication method (None, API Key, Basic, or Bearer)

<Image align="center" src="https://files.readme.io/7a81519f9faf96f4af361d26c405792fe78488558a9c8e972d084d102dda098e-CleanShot_2025-03-11_at_11.21.07.gif" />

5. Click **Save** to create your API definition

Your new API definition will appear in the left navigation panel, ready for you to add endpoints.

## Creating Your First Endpoint (List Social Media Posts)

Let's create an endpoint to retrieve a list of social media posts:

1. In the left navigation, you'll see a default endpoint labeled `/new-endpoint`
2. Rename this to better reflect your API structure - let's call it "Posts"
3. You'll now see this category in your left navigation

<Image align="center" src="https://files.readme.io/fc908c66586d12aa0327f1bc17d60a045a23e550e82161ae4818a37eb91b3931-CleanShot_2025-03-11_at_11.29.12.gif" />

4. Create your GET endpoint for listing posts:
   * Click on the endpoint to edit it
   * Change the title to "List Social Media Posts"
   * Select the **GET** method from the dropdown menu
   * Set the path to `/posts`
   * Add a description explaining what the endpoint does (e.g., "Returns a paginated list of social media posts")

<Image align="center" src="https://files.readme.io/72e65717ef6534caa7b0d2a187deb7125b1466bc72a95a8fdcd7459267ae8b35-CleanShot_2025-03-11_at_11.31.27.gif" />

### Adding Query Parameters

Most list endpoints support pagination or filtering. Let's add some query parameters:

1. Locate the **Query Parameters** section and click the **+** button
2. Add parameters for pagination:
   * Add a `page` parameter of type `integer`
   * Add a `limit` parameter of type `integer`
   * Add any other filtering parameters (e.g., `category` as a `string`)
3. For each parameter:
   * Add a description
   * Set whether it's required
   * Provide a default value if applicable

<Image align="center" src="https://files.readme.io/c596d7f09014adbfb1166f81b10936c0427f6b0e4a4c1cc9f2983a51c55aaa55-CleanShot_2025-03-11_at_11.35.30.gif" />

<br />

## Creating Your Second Endpoint (Create a Social Media Post)

Now let's add an endpoint for creating new posts:

1. In the left navigation, click the **+ New Category** button if you need a new category, or use your existing "Posts" category
2. Click the + icon to add a new endpoint
3. Set up your POST endpoint:
   * Title: "Create New Post"
   * Method: Select **POST** from the dropdown
   * Path: `/posts`
   * Description: "Allows authenticated users to create new posts"

<Image align="center" src="https://files.readme.io/fa7c7a03010f8fdbc0bee4ff32db7a11e34f723f3640ed6e3f311234e93dd2bd-CleanShot_2025-03-11_at_11.52.25.gif" />

### Adding Request Body Parameters

For a POST endpoint, you'll need to define the request body:

1. Locate the **Request Body** section and click to expand it
2. Set the content type to `object`
3. Add the required fields:
   * Add a `content` field of type `string` and mark it as required
   * Add any additional fields your API accepts (e.g., `image_url`, `tags`)
4. For each field:
   * Add a clear description
   * Mark whether it's required
   * Provide any constraints (min/max length, pattern, etc.)

<Image align="center" src="https://files.readme.io/2a114a0bb8cfab72df455ea87638aa51d75a1ea3b931987fc18d1450f94cb08d-CleanShot_2025-03-11_at_11.57.21.gif" />

### Adding Request Code Samples

One of ReadMe's powerful features is automatic code sample generation:

1. Find the **Request Code** section on the right
2. ReadMe automatically generates code examples in multiple languages
3. You can also click "Write your own static samples" to add custom examples

<Image align="center" src="https://files.readme.io/646ce4e3467087d3d7b8396632e29af646bf02be9113054d0c63e69c14561a6c-CleanShot_2025-03-11_at_12.03.35.gif" />

<br />

## Testing Your API Documentation

After creating your endpoints:

1. Save your changes
2. Toggle to the "View" mode to see how your documentation looks to developers
3. Test the interactive features to ensure your examples work correctly

## Tips for Great API Documentation

* **Be thorough with descriptions**: Clearly explain what each endpoint does and why
* **Provide realistic examples**: Use example data that looks like real-world usage
* **Document error states**: Include examples of error responses and how to handle them
* **Use consistent naming**: Maintain a consistent style across all endpoints and parameters
* **Add "What's Next"**: Use the "What's Next" section to guide users on related endpoints they might need

By following this guide, you've created a well-documented API reference from scratch using ReadMe's API Designer. Your developers now have interactive, clear documentation that helps them integrate with your API quickly and easily.

Remember, you can always return to the API Designer to add endpoints, update parameters, or enhance your documentation as your API evolves.

<br />

## Currently Unsupported OpenAPI Features in the API Designer

We currently don't support all OpenAPI features in our API Designer. If you use any of these features in an endpoint you will be unable to edit them in our UI. However, these endpoints will still render properly in the documentation and can still be updated by editing the OpenAPI file directly.

<br />

| Unsupported OpenAPI Feature | Explanation                                                                                                                                                                               | OpenAPI Documentation                                                                                                                      |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Additional Properties       | The additionalProperties keyword is used within a schema to define whether properties not explicitly defined in the schema are allowed in objects, and if so, what their types should be. | [Dictionaries, HashMaps and Associative Arrays](https://swagger.io/docs/specification/v3_0/data-models/dictionaries/)                      |
| Callbacks/Webhooks          | OpenAPI has a feature to define endpoints that will make an API call once an event has completed.                                                                                         | [Callbacks](https://swagger.io/docs/specification/v3_0/callbacks/)                                                                         |
| References                  | Any endpoint that defines an object using a $ref.                                                                                                                                         | [Using Ref](https://swagger.io/docs/specification/v3_0/using-ref/)                                                                         |
| Common Parameters           | Endpoints where parameters are defined at the path level instead of the method, so the parameters are shared between all methods for that URL.                                            | [Describing Parameters](https://swagger.io/docs/specification/v3_0/describing-parameters/#common-parameters)                               |
| Links                       | Links are an OpenAPI feature that describes how the responses of one endpoint can be used as input for other operations.                                                                  | [Links](https://swagger.io/docs/specification/v3_0/links/)                                                                                 |
| Polymorphism                | Polymorphism lets you define a schema that can represent multiple types or models.                                                                                                        | [Inheritance and Polymorphism](https://swagger.io/docs/specification/v3_0/data-models/inheritance-and-polymorphism/?sbsearch=Polymorphism) |
| Server Variables            | Variables can be defined in the base path which can have a preset list of values the user can choose from.                                                                                | [API Server and Base Path](https://swagger.io/docs/specification/v3_0/api-host-and-base-path/?sbsearch=server%20variables)                 |
| Style                       | The Style keyword allows configuration on how multiple values should be passed to a parameter.                                                                                            | [Parameter Serialization](https://swagger.io/docs/specification/v3_0/serialization/?sbsearch=Styles)                                       |
| XML                         | Endpoints that accept or respond with XML data.                                                                                                                                           | [Representing XML](https://swagger.io/docs/specification/v3_0/data-models/representing-xml/?sbsearch=xml)                                  |