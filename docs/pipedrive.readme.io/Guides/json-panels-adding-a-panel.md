# Adding a JSON panel

## Terminology

<hr />

**JSON panels** – An entrance point for an app’s data and interactivity inside Pipedrive in a panel format

**Object** – JSON panel object is a data entry point with multiple descriptive fields displayed inside a panel. A panel can contain multiple objects.

**Field** – Descriptive data field in a particular format within the object

**Global actions** – A green action button at the bottom of the JSON panel. It features one main [app action](https://pipedrive.readme.io/docs/app-extensions-actions) and a dropdown menu if there are multiple app actions and/or an external link.

<hr />

## How can I add a JSON panel in Developer Hub?

<hr />

You can add JSON panels to the Pipedrive UI either when [registering the app](https://pipedrive.readme.io/docs/marketplace-registering-the-app) or [updating the existing app](https://pipedrive.readme.io/docs/marketplace-updating-the-existing-app).

In [Developer Hub](https://app.pipedrive.com/developer-hub), click on your app’s name and go to the App extensions tab.

In the App extensions tab, click “Add JSON panel” in the JSON panel section to access the form. Fill in the JSON panel’s name and the rest of the relevant fields. Once you’re done, click “Save”.

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        <p>Field</p>
      </th>

      <th>
        <p>Description</p>
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        <p>Panel name (required)</p>
      </td>

      <td>
        <p>The name of the JSON panel. Descriptive, max 30 characters.</p><p>The name will appear in the Features section of your Marketplace app listing.</p>
      </td>
    </tr>

    <tr>
      <td>
        <p>Panel description</p>
      </td>

      <td>
        <p>To showcase the interactive features of your app, your panel’s name and description will appear in the Features section of your Marketplace app listing.</p><p>Use the description field to let users know what they can do within this panel.</p><p>Optional; max 150 characters.</p>
      </td>
    </tr>

    <tr>
      <td>
        <p>API endpoint (required)</p>
      </td>

      <td>
        <p>The URL of the endpoint which we'll use to fetch the data of the object properties</p>
      </td>
    </tr>

    <tr>
      <td>
        <p>HTTP Auth username and password (required)</p>
      </td>

      <td>
        <p>Our service will send the HTTP request with these credentials as the basic authentication header to protect your data. To protect your data, we strongly recommend using authenticated HTTPS requests. Note that we do not support self-signed certificates.</p>
      </td>
    </tr>

    <tr>
      <td>
        <p><a href="https://jwt.io/">JWT</a> secret</p>
      </td>

      <td>
        <p>JWT is required <strong>if</strong> HTTP Auth is not provided.</p>
      </td>
    </tr>

    <tr>
      <td>
        <p>JSON data structure (required)</p>
      </td>

      <td>
        <p>A JSON file that describes the structure of your JSON panel seen in the Pipedrive UI</p>
      </td>
    </tr>

    <tr>
      <td>
        <p>Panel locations (one required)</p>
      </td>

      <td>
        <p>Choose where the panel would be displayed: </p><ul><li>Deal details</li><li>Person details</li><li>Organization details</li></ul><p>Each app can have one JSON or custom panel in each location.</p>
      </td>
    </tr>
  </tbody>
</Table>

### JSON panel authentication

Your JSON panel **has to be authenticated** in one of two ways: basic authentication or [JWT](https://jwt.io/). It is also possible to configure both basic authentication and JWT as well.

### Panel actions

Panel actions can be added in the same section of Developer Hub where you add your JSON panels:  inside *Developer Hub > App extensions*.

Once you’ve added and saved your JSON panel, scroll down to the “My added extensions” section. You’ll find the JSON panel you’ve just added and a “+ Actions to this panel” button right below it. Find out how to add actions in panels [here](https://pipedrive.readme.io/docs/json-panels-actions-in-panels).

### JSON data structure

To create the JSON panel displayed in Pipedrive’s UI, you need to add it as a JSON file to Developer Hub with a JSON schema defining the JSON panel’s structure.

The JSON panel can have a maximum of **ten objects** which are titled by headers and contain a maximum of **twenty fields** (excluding the [header field](https://pipedrive.readme.io/docs/json-panels-adding-a-panel#header-field)), all of which should be defined in the JSON schema. You can also use the [single object JSON panel template](https://raw.githubusercontent.com/pipedrive/example-apps/master/json-samples/app-panel-single-object.json) or [multiple object JSON panel template](https://raw.githubusercontent.com/pipedrive/example-apps/master/json-samples/app-panel-multiple-object.json) for defining your JSON schema.

### Fields

In the JSON Schema, you can specify the fields that your JSON panel will contain. These fields should be added to JSON Schema as properties. We support the following types of field definitions:

> 📘 Keep in mind that if the data received from your API endpoint does **not** match the required data types, the whole app panel's data will not be displayed and the user will see an error message stating **"Something went wrong…"**.

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        <p>
          Object property
        </p>
      </th>

      <th>
        <p>
          Object property type
        </p>
      </th>

      <th>
        <p>
          Format requirements for the response
        </p>
      </th>

      <th>
        <p>
          Examples and explanations
        </p>
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        <p>Text</p>
      </td>

      <td>
        <p><code>$ref: "#/definitions/text"</code></p>
      </td>

      <td>
        <p><code>"markdown": true</code> needs to be added adding links with labels. More in <a href="doc:json-panels-adding-a-panel#text-in-api-response">text in API response</a>.</p>
      </td>

      <td>
        <p>Can contain links, emails, bold text, numbered lists and bulleted lists.<br />Links can be displayed with labels by using markdown. See  <a href="doc:json-panels-adding-a-panel#text-in-api-response">text in API response</a>.<br />Truncated after 255 characters.</p>
      </td>
    </tr>

    <tr>
      <td>
        <p>Numerical</p>
      </td>

      <td>
        <p><code>$ref: "#/definitions/numerical"</code></p>
      </td>

      <td />

      <td>
        <p>12.00<br />12,00</p>
      </td>
    </tr>

    <tr>
      <td>
        <p>Date</p>
      </td>

      <td>
        <p><code>$ref: "#/definitions/date"</code></p>
      </td>

      <td>
        <p>YYYY-MM-DD</p>
      </td>

      <td>
        <p>2018-11-23</p>
      </td>
    </tr>

    <tr>
      <td>
        <p>Time</p>
      </td>

      <td>
        <p><code>$ref: "#/definitions/time"</code></p>
      </td>

      <td>
        <p>hh:mm:ssZ</p>
      </td>

      <td>
        <p>20:20:39+02:00</p>
      </td>
    </tr>

    <tr>
      <td>
        <p>DateTime</p>
      </td>

      <td>
        <p><code>$ref: "#/definitions/date-time"</code></p>
      </td>

      <td>
        <p>YYYY-MM-DDThh:mm:ssZ</p>
      </td>

      <td>
        <p>2018-11-13T20:20:39+02:00</p>
      </td>
    </tr>

    <tr>
      <td>
        <p>Email</p>
      </td>

      <td>
        <p><code>$ref: "#/definitions/email"</code></p>
      </td>

      <td />

      <td>
        <p>[johndoe@gmail.com](mailto:johndoe@gmail.com)</p>
      </td>
    </tr>

    <tr>
      <td>
        <p>Link</p>
      </td>

      <td>
        <p><code>$ref: "#/definitions/link"</code></p>
      </td>

      <td>
        <p>See <a href="doc:json-panels-adding-a-panel#link-in-api-response">how link should be defined in your API response</a></p>
      </td>

      <td>
        <p><a href="https://www.pipedrive.com/">[https://www.pipedrive.com/](https://www.pipedrive.com/)</a></p>
      </td>
    </tr>

    <tr>
      <td>
        <p>Phone number</p>
      </td>

      <td>
        <p><code>$ref: "#/definitions/phone"</code></p>
      </td>

      <td />

      <td>
        <p>+3725000001</p>
      </td>
    </tr>

    <tr>
      <td>
        <p>Address</p>
      </td>

      <td>
        <p><code>$ref: "#/definitions/address"</code></p>
      </td>

      <td />

      <td>
        <p>460 Park Ave South, New York, NY 10016, USA</p>
      </td>
    </tr>

    <tr>
      <td>
        <p>Currency</p>
      </td>

      <td>
        <p><code>$ref: "#/definitions/currency"</code></p>
      </td>

      <td>
        <p>See <a href="doc:json-panels-adding-a-panel#currency-in-api-response">how currency should be defined in your API response</a></p>
      </td>

      <td>
        <p>USD 200,99</p>
      </td>
    </tr>

    <tr>
      <td>
        <p>Label</p>
      </td>

      <td>
        <p><code>$ref: "#/definitions/label"</code></p>
      </td>

      <td>
        <p>See <a href="doc:json-panels-adding-a-panel#label-in-api-response">how label should be defined in your API response</a>.<br />Available colors for the label:</p><ul><li>Green (#08A742)</li><li>Red (#F94839)</li><li>Blue (#317AE2)</li><li>Yellow (#FFCC00)</li><li>Purple (#721EA9)</li><li>Grey (#B9BABB)</li></ul>
      </td>

      <td>
        Label's text is truncated after 40 characters\
        Label's text should be in sentence case **e.g Potential client**
      </td>
    </tr>

    <tr>
      <td>
        Tags
      </td>

      <td>
        `$ref:"#/definitions/tags"`
      </td>

      <td>
        An array of strings representing tag labels need to be sent back in the API response. See more in [tags in API response](https://pipedrive.readme.io/docs/json-panels-adding-a-panel#tags-in-api-response).
      </td>

      <td>
        One, Two, Three
      </td>
    </tr>
  </tbody>
</Table>

In our JSON Schema, the `additionalProperties` keyword is set to `false` by default, so you can only send values to defined properties. If you send data that isn’t defined properly under `properties`, the panel won’t be rendered correctly, and the user will see an error. For more information regarding how we’ll display the property’s data, see [understanding JSON Schema](https://json-schema.org/understanding-json-schema/reference/string.html) and [additional properties](https://json-schema.org/understanding-json-schema/reference/object.html#properties).

### The ordering of fields

The set of properties will be rendered to the list of fields in the JSON panel according to how they are defined in the JSON Schema. The only exception is the `header` field, which will be excluded from the array and moved to the header of the app panel’s object. For example, if in `properties` the fields are defined in order of `id`, `header`, `name` and `email`, then the order visible in the UI’s app panel would start out with the app panel's object header and have name and email as fields.

### Text in API response

<Image title="b7b9549-App_panels_-_text_in_API_response_-_Pipedrive_Developer_Documentation.png" alt={1188} align="center" width="80%" src="https://files.readme.io/7d18908-b7b9549-App_panels_-_text_in_API_response_-_Pipedrive_Developer_Documentation.png">
  Visual of text object property
</Image>

Response example of text with markdown support. Value object only supports adding labels to links in markdown in the format shown in the sample below:

```json
{
  "note": {
    "markdown": true,
    "value": "Meeting next week to sign the [insurance contract](pipedrive.com).\n\n&nbsp;\n\n **Agenda**\n1. Agree on contract details\n\n **Links**\n - [Insurance company](https://www.pipedrive.com/en/features)"
  }
}
```

### Currency in API response

<Image title="779d933-App_extensions_-_currency_in_API_response_-_Pipedrive.png" alt={1202} align="center" width="80%" src="https://files.readme.io/1bfd2cb-779d933-App_extensions_-_currency_in_API_response_-_Pipedrive.png">
  Visual of currency object property
</Image>

`currency` object property should be defined as an object in the API response and values for `code` and `value` properties should be given. `code` is the [ISO-4217](https://www.iso.org/iso-4217-currency-codes.html) format currency code for non-custom currencies (custom currencies cannot be added or removed via the API, only admin users of the account can [configure them from the Pipedrive web app](https://support.pipedrive.com/en/article/how-can-i-create-a-custom-currency)). Overall, `code` is matched to the codes defined in Pipedrive and if the currency is already defined with a symbol, the symbol is shown instead of the currency code in the app panel.

```json
"delivery_cost": {
    "code": "USD",
    "value": 2000.00
}
```

### Label in API response

<Image title="c46df8c-App_extensions_-_label_in_API_response_-_Pipedrive.png" alt={1202} align="center" width="80%" src="https://files.readme.io/1f8add7-c46df8c-App_extensions_-_label_in_API_response_-_Pipedrive.png">
  Visual of label object property
</Image>

`label` object property should be defined as an object in the API response and values for color and label properties should be given. `label`'s colors can be `green`, `red`, `blue`, `yellow`, `purple`, `grey`. Label's text of the `label` object property can be 40 characters long before truncated.

```json
"label": {
    "color": "yellow",
    "label": "Assembling"
}
```

### Link in API response

`link` property can be defined in two ways.

1. A plain string with URL:

```json
"link": "https://www.pipedrive.com"
```

2. An object with the following data:

| Field                 | Description                                                                                                  |
| :-------------------- | :----------------------------------------------------------------------------------------------------------- |
| `label` (optional)    | The anchor text of the URL                                                                                   |
| `value` (required)    | The URL                                                                                                      |
| `external` (required) | A boolean value that defines whether the link will be opened in the same tab (`false`) or a new one (`true`) |

```json
"link": {
    "label": "Pipedrive",
    "value": "https://www.pipedrive.com",
    "external": false
}
```

### Tags in API response

<Image title="4ad8067-App_extensions_-_tags_in_API_response_-_Pipedrive.png" alt={1202} align="center" width="80%" src="https://files.readme.io/54afd76-4ad8067-App_extensions_-_tags_in_API_response_-_Pipedrive.png">
  Visual of tags
</Image>

Tag labels need to be sent in an array of strings format, where each string will represent one tag.\
Tags will be displayed in the app panel as separate unclickable labels.

```json
"tags": ["Cruise control", "Rain detector", "Lane assist"]
```

### Header field

For single object panels, the `header` is a separate optional field that defines the header of the app panel, e.g. "GTA 22 Blue Auto".

For multiple object panels, the header `field` is required as it’s the title of each object within the panel, e.g. "GTA 22 Blue Auto", “BNW X500”, “Dorche 911”. You can define the `header` field the same way you have defined all other fields:

```json
{
    "type": "array",
    "items": {
        "type": "object",
        "required": [
            "id"
        ],
        "properties": {
            "id": {
                "$ref": "#/definitions/numerical"
            },
            "header": {
                "$ref": "#/definitions/header"
            }
        }
    }
}
```

### External links

You can add two types of external links to a JSON panel – a link to **app settings** and an **external link** at the bottom of the global actions dropdown menu. As these links are added by extending the API response, the URLs and labels can be changed dynamically.

### App settings

<Image title="c838c78-App_extensions_-_external_link_app_settings_-_Pipedrive.png" alt={1338} align="center" width="80%" src="https://files.readme.io/5743bb0-c838c78-App_extensions_-_external_link_app_settings_-_Pipedrive.png">
  External link – app settings
</Image>

An external link to app settings is displayed under the actions menu on the top right-hand corner of the app panel. 

To add a link for app settings, you’d need to extend the API response by adding a settings object next to the data, as seen in the example code below. The settings object should contain the URL property of the link. 

```json
{
    "data": [ ... ],
    "settings": {
        "url": "https://google.com"
    }
}
```

### External link – global actions

The external link at the bottom of the global actions dropdown menu can be used to have an entrance link to your app right inside the JSON panel. You can add one `external_link` per JSON panel.

<Image title="d57d7e8-App_extensions_-_external_link_global_actions_-_Pipedrive.png" alt={1202} align="center" width="80%" src="https://files.readme.io/90b31aa-d57d7e8-App_extensions_-_external_link_global_actions_-_Pipedrive.png">
  External link – global actions
</Image>

To add an external link for your app to the JSON panel’s footer, you will need to extend the API response by adding an `external_link` object next to the data, as seen in the example code below. The `label` property should be descriptive text in **sentence case** that explains to the user what happens when the link is clicked. The `label` property will be fully visible in 40 characters. After that, it’ll be truncated.

```json
{
    "data": [ ... ],
    "external_link": {
        "url": "https://google.com",
        "label": "Update billing"
    }
}
```

Suppose your JSON panel has an app action(s) defined for [global actions](https://pipedrive.readme.io/docs/json-panels-actions-in-panels#global-actions). The external link will appear at the bottom of the global actions dropdown menu as the last action (see the image above).

If your JSON panel has no app actions defined for global actions, the external link will appear as a green button at the bottom of your app panel.

<Image title="App extensions - external link, no global actions - Pipedrive.png" alt={1202} align="center" width="80%" src="https://files.readme.io/6c70dfb-App_extensions_-_external_link_no_global_actions_-_Pipedrive.png">
  External link without global actions
</Image>

### Actions in panels

Once you have added a JSON file to Developer Hub with a JSON schema defining the JSON panel’s structure, you can add [various actions within the panel](https://pipedrive.readme.io/docs/json-panels-actions-in-panels).

App actions can be added for the entire panel/app, the object itself and individual fields.

<hr />

## Panel error handling

<hr />

<Image title="16d4c35-App_extensions_-_panel_error_handling_-_Pipedrive.png" alt={1202} align="center" width="80%" src="https://files.readme.io/6e5bc70-16d4c35-App_extensions_-_panel_error_handling_-_Pipedrive.png">
  Interactive JSON panel error state
</Image>

Your JSON panel can encounter different error scenarios when a user is using it. To show an interactive error state when an error happens, your app has to return a non-success status code (>`300`) with the following data:

| Field                 | Description                                                    |
| :-------------------- | :------------------------------------------------------------- |
| `title` (required)    | Descriptive, max 30 characters                                 |
| `subtitle` (optional) | A markdown field where you can add a longer message with links |
| `action` (optional)   | A call-to-action with URL and label fields                     |

```json
{
    "error": {
        "title": "Subscription expired",
        "subtitle": "Please [view your billing settings](https://pipedrive.com) or contact our customer support.",
        "action": {
            "url": "https://pipedrive.com",
            "label": "Renew subscription"
        }
    }
}
```

<hr />

## Templates

<hr />

### Example of multiple object panel

To have a JSON panel containing multiple objects, you can refer the objects in the form of an array, where the fields of the JSON panel are defined in `properties`. All labels of fields should be in sentence case. For easy access to the sample panel, use [this template](https://raw.githubusercontent.com/pipedrive/example-apps/master/json-samples/app-panel-multiple-object.json) for defining your JSON schema for multiple object JSON panel.

```json
{
  "type": "array",
  "items": {
    "type": "object",
    "required": [
      "id",
      "header"
    ],
    "properties": {
      "id": {
        "$ref": "#/definitions/numerical"
      },
      "header": {
        "$ref": "#/definitions/header"
      },
      "project": {
        "$ref": "#/definitions/text"
      },
      "manufacturer": {
        "$ref": "#/definitions/text"
      },
      "delivery_date": {
        "$ref": "#/definitions/date-time",
        "label": "Delivery date"
      },
      "status": {
        "$ref": "#/definitions/label"
      },
      "delivery_company": {
        "$ref": "#/definitions/text",
        "label": "Delivery company"
      },
      "tracking": {
        "$ref": "#/definitions/text"
      },
      "note": {
        "$ref": "#/definitions/text"
      },
      "extras": {
        "$ref": "#/definitions/tags"
      },
      "delivery_cost": {
        "$ref": "#/definitions/currency",
        "label": "Delivery cost"
      }
    }
  }
}
```

The URL you add to Developer Hub should respond with the data received from the API and be structured as in the following example. If there’s no data or the value `null` sent back in the response for one property, this property’s data will be displayed as empty.

<Image title="ad6ce06-App_panel_-_Pipedrive.png" alt={960} align="center" width="80%" src="https://files.readme.io/f3d189c-ad6ce06-App_panel_-_Pipedrive.png">
  Multiple object JSON panel example
</Image>

```json
{
    "data": [
        {
            "id": 1,
            "header": "GTA 22 Blue Auto",
            "project": "New cars",
            "manufacturer": "Molksvagen LLC",
            "delivery_date": "2021-08-31T07:00:00.000Z",
            "status": {
                "color": "yellow",
                "label": "ASSEMBLING"
            },
            "delivery_company": "Jungle Prime",
            "tracking": {
                "markdown": true,
                "value": "[Open tracking link](https://pipedrive.com)"
            },
            "note": {
                "markdown": true,
                "value": "Meeting next week to sign the [insurance contract](https://pipedrive.com)."
            },
            "extras": [
                "Cruise control",
                "Rain detector",
                "Lane assist"
            ],
            "delivery_cost": {
                "code": "USD",
                "value": 2000
            }
        },
        {
            "id": 2,
            "header": "BNW X500",
            "project": "New cars",
            "manufacturer": "Molksvagen LLC",
            "delivery_date": "2021-08-31T07:00:00.000Z",
            "status": {
                "color": "red",
                "label": "DELAYED"
            },
            "delivery_company": "Jungle Prime",
            "tracking": {
                "markdown": true,
                "value": "[Open tracking link](https://pipedrive.com)"
            },
            "note": {
                "markdown": true,
                "value": "Meeting next week to sign the [insurance contract](https://pipedrive.com)."
            },
            "extras": [
                "Cruise control",
                "Rain detector",
                "Lane assist"
            ],
            "delivery_cost": {
                "code": "USD",
                "value": 2000
            }
        },
        {
            "id": 3,
            "header": "Dorsche 911",
            "project": "New cars",
            "manufacturer": "Molksvagen LLC",
            "delivery_date": "2021-08-31T07:00:00.000Z",
            "status": {
                "color": "green",
                "label": "EN ROUTE"
            },
            "delivery_company": "Jungle Prime",
            "tracking": {
                "markdown": true,
                "value": "[Open tracking link](https://pipedrive.com)"
            },
            "note": {
                "markdown": true,
                "value": "Meeting next week to sign the [insurance contract](https://pipedrive.com)."
            },
            "extras": [
                "Cruise control",
                "Rain detector",
                "Lane assist"
            ],
            "delivery_cost": {
                "code": "USD",
                "value": 2000
            }
        }
    ],
    "external_link": {
        "url": "https://pipedrive.com",
        "label": "Account settings"
    },
    "settings": {
        "url": "https://pipedrive.com"
    }
}
```

The response should be empty when the JSON panel doesn’t have an entity tied to it on the app’s side. For example, when there’s no connection between a deal and a project on the app’s end, we'll only display an error message stating "Nothing to show" under the JSON panel’s name.

```json
{
  data: [
    ]
}
```

<Image title="bd49bce-App_extensions_-_no_data_-_Pipedrive.png" alt={1202} align="center" width="80%" src="https://files.readme.io/81c67b4-bd49bce-App_extensions_-_no_data_-_Pipedrive.png">
  Empty state error message
</Image>

### Example of single object JSON panel

The JSON panel can also consist of only one object (see the code below). You can click here for the sample [template](https://raw.githubusercontent.com/pipedrive/example-apps/master/json-samples/app-panel-single-object.json) for defining your JSON schema for a single object JSON panel.

```json
{
    "type": "object",
    "required": [
        "id",
        "header"
    ],
    "properties": {
        "id": {
            "$ref": "#/definitions/numerical"
        },
        "header": {
            "$ref": "#/definitions/header"
        },
        "project": {
            "$ref": "#/definitions/text"
        },
        "manufacturer": {
            "$ref": "#/definitions/text"
        },
        "delivery_date": {
            "$ref": "#/definitions/date-time",
            "label": "Delivery date"
        },
        "status": {
            "$ref": "#/definitions/label"
        },
        "delivery_company": {
            "$ref": "#/definitions/text",
            "label": "Delivery company"
        },
        "tracking": {
            "$ref": "#/definitions/text"
        },
        "note": {
            "$ref": "#/definitions/text"
        },
        "extras": {
            "$ref": "#/definitions/tags"
        },
        "delivery_cost": {
            "$ref": "#/definitions/currency",
            "label": "Delivery cost"
        }
    }
}
```

Example response:

```json
{
    "data": {
        "id": 1,
        "header": "GTA 22 Blue Auto",
        "project": "New cars",
        "manufacturer": "Molksvagen LLC",
        "delivery_date": "2021-08-31T07:00:00.000Z",
        "status": {
            "color": "yellow",
            "label": "ASSEMBLING"
        },
        "delivery_company": "Jungle Prime",
        "tracking": {
            "markdown": true,
            "value": "[Open tracking link](https://pipedrive.com)"
        },
        "note": {
            "markdown": true,
            "value": "Meeting next week to sign the [insurance contract](https://pipedrive.com)."
        },
        "extras": [
            "Cruise control",
            "Rain detector",
            "Lane assist"
        ],
        "delivery_cost": {
            "code": "USD",
            "value": 2000
        }
    }
}
```

Also, note that the response should be empty when the JSON panel doesn’t have an entity tied to it on the app’s side. For example, when there’s no connection between a deal and a project on the app’s end, we’ll only display an error message stating **“Nothing to show“** under the JSON panel’s name.

```json
{
  data: {
  }
}
```