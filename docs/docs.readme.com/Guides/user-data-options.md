# Custom Data in Your Docs

## Basic Format

> 📘 We Accept JSON!
>
> ReadMe's API, [OAuth](https://docs.readme.com/ent/docs/getting-started-with-custom-authentication#/), [JWT](https://jwt.io/), and [Personalized Docs Webhook](https://docs.readme.com/main/docs/personalized-docs-webhook) consume [JSON](https://www.json.org/json-en.html).

By sending a specific format, you can describe your user to ReadMe and embed information about them directly in your documentation. Any data that is passed can be used as a variable.

An example user object is defined below:

```json Single Project
{
  "name": "Owlbert",
  "email": "owlbert@readme.io",
  "apiKey": "12345",
  "parameters": {
    "x-readme-version": "1.0",
    "slug": "getting-started"
  }
}
```

```json Enterprise Multi-Project
{
  "name": "Owlbert",
  "email": "owlbert@readme.io",
  "isAdmin": true,
  "keys": [
    {
      "apiKey": "12345",
      "name": "Enterprise API Key"
    },
    {
      "apiKey": "678910",
      "name": "Personal API Key"
    }
  ],
  "allowedProjects": ["parent-project", "child-project"]
}
```

```json Enterprise Multi-Project with Unique Permissions
{
  "name": "Owlbert",
  "email": "owlbert@readme.io",
  "keys": [
    {
      "apiKey": "12345",
      "name": "Enterprise API Key"
    },
    {
      "apiKey": "678910",
      "name": "Personal API Key"
    }
  ],
  "allowedProjects": [
    { "subdomain": "child-project", "access": "readonly" },
    { "subdomain": "child-project-2", "access": "admin" }
  ]
}
```

## ReadMe-Specific Variables

While you can define any variable within your documentation, certain variables have specific meaning within ReadMe.

| Variable        | Use in ReadMe                                                                                                                                                                      | Default | Required? |
| :-------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ | :-------- |
| name            | Display name in upper right                                                                                                                                                        |         | Yes       |
| email           | Email associated with user, used in support forum among other places                                                                                                               |         | Yes       |
| isAdmin         | Adds links to the dash, and allows access to disabled sections                                                                                                                     | False   | No        |
| isReadOnly      | Allows user to access project with "Project Members Only" or "Site-wide password" access control turned on.                                                                        | False   | No        |
| apiKey          | Prefills API key for OAuth authentication in API Reference (this is not the ReadMe project API key!)                                                                               |         | No        |
| user            | Prefills Basic Auth username in the Authentication section of the API Reference                                                                                                    |         | No        |
| pass            | Prefills Basic Auth password in the Authentication section of the API Reference                                                                                                    |         | No        |
| allowedProjects | Array of strings (project `subdomain`) that you want to give target user access to. Or an array of objects with values `{ subdomain: "${Project Subdomain}", access: "readonly" }` |         | No        |
| parameters      | Object of parameters present in the API Reference section. Values for keys entered here will be treated as default parameters in the API Reference.                                |         | No        |

## Referencing Variables in Documentation

The data passed in can be used as variables in the documentation. Just wrap the variable name with `<<${variable}>>` to user's value, or the default if no value is set. For example, using the above payload, `<<name>>` will be replaced with "Owlbert" in your documentation.

## Defining Defaults in the API Reference

By adding the `parameters` object in the user object, you'll be able to pre-populate parameters on endpoints. Let's consider the following user object:

```json Parameter defaults in User Data object
{
  "name": "Marc Cuva",
  "email": "marc@readme.io",
  "parameters": {
    "x-readme-version": "1.0",
    "slug": "getting-started"
  }
}
```

When the logged-in user with the above user data payload visits an endpoint in the API Reference section that has parameters with the IDs `x-readme-version` or `slug` present, for example, our Get Doc [endpoint](https://docs.readme.com/reference/getdoc), the parameters will be pre-filled with the values defined.

> 🚧 Single Project Support
>
> Auto-populating parameters currently only works for single-project. It will not work if the `parameters` object is added within the `keys` array.

## Using Variables with your API

By setting specific variables in your user object, authentication fields will automatically use those values when a user logs in.

### OAuth and API Key Authentication

If `apiKey` is set in the passed in JSON object (like in the following example) and the API Reference section is using OAuth or API Key Authentication, the value will automatically be set.

```json
{
  "name": "Marc Cuva",
  "email": "marc@readme.io",
  "apiKey": "12345"
}
```

<Image border={false} src="https://files.readme.io/d3ded5e-Screen_Shot_2021-05-19_at_3.53.46_PM.png&#x22;" />

### Basic Auth

```json Single Project Example
{
  "name": "Marc Cuva",
  "email": "marc@readme.io",
  "isAdmin": true, // Optional
  "user": "user",
  "pass": "pass"
}
```

```json Multiple Project Example
{
  "name": "Marc Cuva",
  "email": "marc@readme.io",
  "isAdmin": true, // Optional
  "keys": [
    {
      "user": "Marc 1",
      "pass": "Pass 1",
      "name": "Marc's 1st Project"
    }, 
    {
      "user": "Marc 2",
      "pass": "Pass 2",
      "name": "Marc's 2nd Project"
    }
  ]
}
```

If the user object looks like this example, and the authentication is set to Basic Auth, the values will be automatically set the `user` and `pass`.

<Image border={false} src="https://files.readme.io/29df804-Screen_Shot_2021-05-19_at_3.54.06_PM.png&#x22;" />

### Multiple security schemes

As an alternative to the above, you can also pass in values to the user object that have the same name as your OAS Security Schemes. So for the following `securitySchemes`:

```json
{
  "oauth2Scheme": {
    "type": "oauth2"
  },
  "basicScheme": {
    "type": "http",
    "scheme": "basic"
  },
  "apiKeyScheme": {
    "type": "apiKey",
    "in": "query",
    "name": "apiKey"
  },
  "cookieApiKeyScheme": {
    "type": "apiKey",
    "in": "cookie",
    "name": "apiKey"
  }
}
```

You can pass in a user object like this:

```json
{
  "name": "Marc Cuva",
  "email": "marc@readme.io",
  "oauth2Scheme": "oauth-key",
  "basicScheme": {
    "user": "user",
    "pass": "pass",
  },
  "apiKeyScheme": "api-key",
  "cookieApiKeyScheme": "cookie-api-key"
}
```

And all of your security inputs will be prefilled.

### One User with Multiple Projects

In some cases one user will have multiple sets of data. For example, a user can be a part of several teams all with a unique API Key. To support this functionality, just pass an array into a `keys` object with all of the values specific to that project.

```json
{
  "name": "Marc Cuva",
  "email": "marc@readme.io",
  "isAdmin": true, // Optional
  "keys": [
    {
      "apiKey": "12345",
      "user": "Marc",
      "pass": "password",
      "key": "key1",
      "name": "Marc's 1st Project" // Required, used to select a project
    }, 
    {
      "apiKey": "678910",
      "user": "Marc2",
      "pass": "password2",
      "key": "key2",
      "name": "Marc's 2nd Project"
    }
  ]
}
```

When a variable that has multiple values is used in the documentation, for example \<\<key>>, the variable will have a dropdown allowing the user to pick which of the projects they want to be active. This dropdown affects all of the variables on your site, so switching the current project on one variable will make sure all of the other ones remain consistent.

<Image border={false} src="https://files.readme.io/2d445d3-Screenshot_2018-02-13_15.48.54.png&#x22;" />

## Using Variables in the GraphQL Explorer

By setting specific variables in your user object, the GraphQL Explorer section will automatically use those values when the user is logged in. See [GraphQL API Reference](https://docs.readme.com/docs/graphql) for more information about how you can get access to the beta.

### OAuth Authentication

If `graphql` is set in the passed in JSON object (like in the following example), we will prefill in a `Bearer` `Authentication` header.

```json
{
  "name": "Marc Cuva",
  "email": "marc@readme.io",
  "graphql": "dGhpcyBpcyBteSBiZWFyZXIgdG9rZW4="
}
```

<Image border={false} src="https://files.readme.io/079e08d-Screen_Shot_2022-11-15_at_3.50.01_PM.png" />

<br />

```json
{
  "name": "Marc Cuva",
  "email": "marc@readme.io",
  "graphql": "dGhpcyBpcyBteSBiZWFyZXIgdG9rZW4="
}
```

<Image border={false} src="https://files.readme.io/079e08d-Screen_Shot_2022-11-15_at_3.50.01_PM.png" />