# OpenAPI Support

# What Is OpenAPI (Formerly Known As Swagger)?

From [the OpenAPI Specification repository](https://github.com/OAI/OpenAPI-Specification):

> The **OpenAPI Specification (OAS)** is a community-driven open specification within the [OpenAPI Initiative](https://www.openapis.org)... \[that] defines a standard, programming language-agnostic interface description for [REST APIs](https://en.wikipedia.org/wiki/Representational_state_transfer).
>
> Use cases for machine-readable API definition documents include, but are not limited to: interactive documentation; code generation for documentation, clients, and servers; and automation of test cases.
>
> The OpenAPI Specification does not require rewriting existing APIs. It does not require binding any software to a service — the service being described may not even be owned by the creator of its description.

The OpenAPI Specification was developed privately for several years under the name **Swagger**. Back when it was known as **Swagger 2.0**, the specification was donated to the OpenAPI Initiative and became an open standard in 2015. Version 3.0.0 was released under the name **OpenAPI Specification 3.0.0**.

You can read about the revision history [here](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#appendix-a-revision-history) and read about the differences between Swagger v2.0 and OAS v3.0 [**on our blog**](https://blog.readme.com/an-example-filled-guide-to-swagger-3-2/).

To see our most up-to-date support for the OpenAPI Specification (including our support for OAS v3.1), see [our compatibility chart](https://docs.readme.com/main/docs/openapi-compatibility-chart).

<br />

# The API Reference

The API Reference section of your docs will generate reference guides based on your API definition that include working code examples and the ability to make authenticated API requests directly within the documentation.

> 👍 Got a Postman Collection? We support that too!
>
> In addition to [OpenAPI](https://spec.openapis.org/oas/v3.1.0.html) and [Swagger](https://swagger.io/specification/v2/), you can also import [Postman Collections](https://schema.postman.com/). Postman Collections are converted to OpenAPI using [`postman-to-openapi`](https://github.com/readmeio/postman-to-openapi) prior to any validation and rendering in ReadMe.

## Supported File Types

You can import the following file types into ReadMe (either JSON or YAML):

* [OpenAPI](https://spec.openapis.org/oas/v3.1.0.html) v3.0.x/v3.1

* [Swagger](https://swagger.io/specification/v2/) v2.0

* [Postman Collections](https://schema.postman.com/) v2.0/v2.1
  * Anytime a Postman collection is imported, it's converted to OpenAPI using [`postman-to-openapi`](https://github.com/joolfe/postman-to-openapi) — check out [their docs](https://joolfe.github.io/postman-to-openapi/) to better understand how the conversion works!

# Adding Markdown Content

You can add additional Markdown content to each individual file that is imported. These changes will remain even after you re-sync as long as you do not change the `operationId` or remove the import.

> ❗ ️Adding Additional Markdown Content
>
> If you add additional Markdown content, be aware that it will be tied to the `operationId` of that specific imported API definition. If the `operationId`, or file, is removed, your additional content will also be removed.

# SDK-Generated Code

SDK-Generated Code allows you to show `api` as an option in the Node language library to your end developers who are visiting your developer hub's API reference.

<Image align="center" border={true} src="https://files.readme.io/ba9061c-Simple_Mode-enable.png" className="border" />

If you'd like to enable it, head to the **Admin Settings > API Reference**, and check the box for **Use SDK-generated code for requests**. If you'd like to disable this feature, uncheck the box.

<Image align="center" border={true} src="https://files.readme.io/1ccfc0498ed3a04acd8cc2e5ad1c67706e765cfe1e95dd0a512581482bc16004-SDK_generated_code.png" className="border" />

# Default Handling

When enabled, any `default` values defined in your API spec will be used to populate your request data in the API Explorer on page load, regardless of the parameter being marked as `required`. For example, this operation will populate the petName field in the API Explorer with "Buster" even though it is not marked as `required`:

```json
{
  "/pet": {
    "get": {
      "summary": "Find pet by Name",
      "description": "Returns a single pet",
      "operationId": "getPetByName",
      "parameters": [
        {
          "name": "petName",
          "in": "body",
          "description": "Name of pet to return",
          "required": false,
          "schema": {
            "type": "string",
            "default": "Buster",
            "example": "Apollo"
          }
        }
      ]
    }
  }
}
```

<Image align="center" alt="With **Default Handling** enabled, the `default` value &#x22;Buster&#x22; is used to populate the API Explorer form and the auto-generated code sample, even when the parameter isn't marked as `required`." border={false} caption="With **Default Handling** enabled, the `default` value &#x22;Buster&#x22; is used to populate the API Explorer form and the auto-generated code sample, even when the parameter isn't marked as `required`." src="https://files.readme.io/43ef680-CleanShot_2023-07-26_at_14.11.30.png" />

When disabled, `default` values will only be used to populate the form field and code sample if the parameter is marked as `required`. If the operation has an `example` value or `examples` object defined, we'll use that value as a *placeholder* in the API Explorer form, but it will not populate the code sample.

For example, using the same operation as above, the petName field in the API Explorer will contain a placeholder example value "Apollo", but the code sample will not be pre-filled:

<Image align="center" alt="With **Default Handling** disabled, the `example` value &#x22;Apollo&#x22; is used as a **placeholder** in the API Explorer form." border={false} caption="With **Default Handling** disabled, the `example` value &#x22;Apollo&#x22; is used as a **placeholder** in the API Explorer form. Note that the code sample is not populated." src="https://files.readme.io/d4051e9-CleanShot_2023-07-26_at_14.26.22.png" />

If the parameter is not marked as `required`, then the enduser must explicitly select the `default` value from the dropdown when the field is active:

<Image align="center" alt="The `default` value must be selected from the dropdown" border={false} caption="The `default` value must be selected from the dropdown." src="https://files.readme.io/de04ee8-CleanShot_2023-07-26_at_14.38.33.png" />

To configure the **Default Handling** setting, go to your Project Dashboard > Appearance > API Reference Configuration.

# Raw JSON Editor

> 📘 Enterprise Only
>
> The raw JSON editor setting is only available to enterprise customers. Contact us at [growth@readme.io](mailto:growth@readme.io) if you're interested in a demo!

For most APIs, the forms on API reference pages are the most intuitive way to enter in body parameters for API requests. In the [petstore](https://petstore.swagger.io/) example below, the following form data:

<Image align="center" border={false} src="https://files.readme.io/f071cd2-CleanShot_2023-11-27_at_17.15.532x.png" />

...will yield JSON that looks like this:

```json
{ "complete": false, "id": 123 }
```

However, your API users may prefer to write their request body JSON by hand. That's where enabling the **Raw JSON Editor** setting may be useful. When enabled, your users will have the ability to edit their request body via a raw JSON editor.

For endpoints that support JSON request bodies, you can click the "JSON Editor" icon below your code sample (see annotation #1 below) and a raw JSON editor will appear. It will validate your JSON input and update your code sample as you type.

<Image align="center" border={false} src="https://files.readme.io/388d735-CleanShot_2023-11-27_at_17.10.192x.png" />

To configure this setting, go to your Project Dashboard > Appearance > API Reference Configuration.