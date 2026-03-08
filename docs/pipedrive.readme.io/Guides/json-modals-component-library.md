# Component library

> 📘 JSON modals were previously called embedded app actions.

Let’s get started on combining the schema for your modal. The main gist is that the JSON modal consists of a modal combined with components which are blocks and action buttons.

On this page, we’ll cover all block types, how to add the blocks and possible relationships between different blocks that can be used for JSON modals.

You can see what all block types and action buttons will look like when added to the modal in the following image.

<Image title="Frame 353 (5).png" alt={908} width="80%" src="https://files.readme.io/81c5bab-Frame_353_5.png">
  The structure of the modal
</Image>

<hr />

## Blocks

<hr />

Blocks are smaller UI elements that can be customized for your app and its use cases. The blocks are displayed inside the modal component, and each modal can have a maximum of **10 blocks**. In the limitation of 10, the primary and secondary action buttons and the modal header are not included.

To combine the modal from blocks and define its behavior, you’ll need to add a JSON schema to your JSON modal in [Developer Hub](https://app.pipedrive.com/developer-hub). For the whole schema structure, see [JSON modal](https://pipedrive.readme.io/docs/app-extensions-json-modals).

To add a block to the modal, first, you’ll need to add the appropriate block key and type. Block key should be unique to the block as it'll be used to map out all relationships between blocks and requests' data payloads. Block type needs to be added to the schema as `$ref` property from the list of available definitions:

* `#/definitions/element-text`
* `#/definitions/element-input`
* `#/definitions/element-select`
* `#/definitions/element-datepicker`
* `#/definitions/element-radio-group`
* `#/definitions/element-checkbox-group`
* `#/definitions/element-separator`
* `#/definitions/element-textarea`

This is how your modal will look like with just one input block defined where the block key is `"block_key_1"` and it is followed by the block type `"$ref": "#/definitions/element-input"`:

```json
{
    "type":"object",
    "properties":{
        "blocks":{
            "type":"object",
            "properties":{
                "block_key_1":{
                    "$ref":"#/definitions/element-input",
                    "options":{
                        "type":"text",
                        "placeholder":"Name",
                        "label":"Name",
                        "value":"John",
                        "allowClear":true,
                        "isRequired":true,
                        "visibleOn":{
                            "block_key_2":{
                                "equals":"task"
                            }
                        }
                    }
                }
            }
        }
    }
}
```

<hr />

### Commonly available options for the block

<hr />

### `visibleOn`

<hr />

This option allows the modal to change its appearance - layout and default values of blocks - depending on the choice a user has made with one block. `visibleOn` option is available for all blocks except the separator Block. `visibleOn` can control the visibility of a block depending on another item’s value or the visibility of a whole block.  `visibleOn` can be added to the options of a block, the item of a block and action buttons.

When `visibleOn` is added to be dependent on item values inside other blocks, it supports three rules: `not_empty`, `equals`, and `includes`. These rules have to be used with the block key, where the rule must be applied. For example, when `visibleOn` is added to an input block with the following criteria seen in the code sample below, the Input block will become visible only when the `"block_key_checkbox"` value is exactly equal to `"vanilla"`.

* `"block_key": "not_empty"` expects any value in a block, available for blocks requiring inputs
* `"block_key": {"equals": "on"}` expects a very specific value to be selected, available for blocks with toggle items
* `"block_key": {"includes": "example"}` expects text and inputs in block value to contain a certain text

```json
{
    "type":"object",
    "properties":{
        "blocks":{
            "type":"object",
            "properties":{
                "block_key_checkbox":{
                    "$ref":"#/definitions/element-checkbox-group",
                    "options":{
                        "label":"Flavors",
                        "value":[
                            "vanilla"
                        ],
                        "items":[
                            {
                                "value":"vanilla",
                                "label":"Vanilla"
                            },
                            {
                                "value":"chocolate",
                                "label":"Chocolate"
                            }
                        ]
                    }
                },
                "block_key_input":{
                    "$ref":"#/definitions/element-input",
                    "options":{
                        "type":"text",
                        "placeholder":"Insert size",
                        "label":"Cake size",
                        "value":"S",
                        "allowClear":true,
                        "isRequired":true,
                        "visibleOn":{
                            "block_key_checkbox":{
                                "equals":"vanilla"
                            }
                        }
                    }
                }
            }
        }
    }
}
```

`visibleOn` supports two extra rules for when there is a need to control the entire visibility of the entire block. These rules specify if the block should **never** be visible to the user or is **always** visible to the user. The\
block’s value will be sent on action data submission after clicking the action button.

`visibleOn: “never“` - the **never rule** can be used to hide a  lock from the modal:

```json
{
    "type":"object",
    "properties":{
        "blocks":{
            "type":"object",
            "properties":{
                "block_key_input":{
                    "$ref":"#/definitions/element-input",
                    "options":{
                        "label":"Hidden",
                        "value":"my hidden value",
                        "visibleOn":"never"
                    }
                }
            }
        }
    }
}
```

`visibleOn: “always“` - the **always rule** can be used if there is a need to reset previously set rules. In this sample, the input block will be displayed only when the radio block’s value equals `yes`.

```json
{
    "type":"object",
    "properties":{
        "blocks":{
            "type":"object",
            "properties":{
                "block_key_input":{
                    "$ref":"#/definitions/element-input",
                    "options":{
                        "label":"Visible",
                        "value":"some visiblity value",
                        "visibleOn":{
                            "block_key_radio":{
                                "equals":"yes"
                            }
                        }
                    }
                },
                "block_key_radio":{
                    "$ref":"#/definitions/element-radio-group",
                    "options":{
                        "label":"Wrap as a gift?",
                        "value":"wrapping",
                        "items":[
                            {
                                "value":"yes",
                                "label":"Yes"
                            },
                            {
                                "value":"no",
                                "label":"No"
                            }
                        ]
                    }
                }
            }
        }
    }
}
```

**Response from the API endpoint**

Allows overriding set values in the schema with the data in the response structure

```json
{
    "data":{
        "blocks":{
            "block_key_input":{
                "visibleOn":"always"
            }
        },
        "actions":{
            
        }
    }
}
```

<hr />

### `fetchOnChange`

<hr />

This option allows the modal to re-fetch data when the user has made a choice or an action. In general `fetchOnChange` is useful when a base value change needs to accommodate different values (or any other block options) in other blocks. The `fetchOnChange` option is available for all blocks, except **the text block** and **separator block** and can be added to the block together with other options.

In this example, when the date field’s value is changed, only one value for the delivery is provided.

```json
{
    "type":"object",
    "properties":{
        "blocks":{
            "type":"object",
            "properties":{
                "block_key_datepicker":{
                    "$ref":"#/definitions/element-datepicker",
                    "options":{
                        "label":"Delivery date",
                        "value":"2021-03-17",
                        "message":"Cakes will be ready by 12:00 on selected date",
                        "placeholder":"Date",
                        "allowClear":true,
                        "isRequired":true,
                        "fetchOnChange":true
                    }
                },
                "block_key_select":{
                    "$ref":"#/definitions/element-select",
                    "options":{
                        "label":"Delivery method",
                        "message":"Please, specify how the delivery will be done.",
                        "placeholder":"Select method",
                        "isRequired":true
                    }
                }
            }
        }
    }
}
```

**Response from the API endpoint**

The response sets what value of the select block will be available for the set date by changing the available item options. The response can also be the same as for the initial request.

```json
{
    "data":{
        "blocks":{
            "block_key_select":{
                "items":[
                    {
                        "label":"Standard",
                        "value":1
                    }
                ]
            }
        },
        "actions":{
            
        }
    }
}
```

After the user changes the value in the datepicker block, it will make the same request as the initial request to fetch data for action. And it will include additional query params:

* `form` serialized JSON with current form state
* `invoker` key of changed block

This is how the URL will look like when additional parameters are added:\
`https://example.org?resource=deal&view=details&...&form=%7B%22block?key?select%22%3A%22label%22%2C%22standard%22%3value%221%22%7D&invoker=datepicker`

<hr />

### Text

<hr />

The text block allows displaying contextual messages or explanations inside the modal.

<Image title="Frame 360 (1).png" alt={938} width="80%" src="https://files.readme.io/7ca1d4f-Frame_360_1.png" />

**Options for adding a text block**:

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Name
      </th>

      <th>
        Type
      </th>

      <th>
        Sample values
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `value`
      </td>

      <td>
        **REQUIRED**\
        string
      </td>

      <td>
        Thank you for using the cake ordering app!
      </td>
    </tr>

    <tr>
      <td>
        `markdown`
      </td>

      <td>
        boolean
      </td>

      <td>
        Supported markdown types:\
        `heading` (`# text`),\
        `paragraph`,\
        `strong` (`** text **`),\
        `link` (`[text](url)`),\
        `blockquote` ( `> text`),\
        `list` (`1. text`),\
        `bullets` (`-`)
      </td>
    </tr>

    <tr>
      <td>
        `visibleOn`
      </td>

      <td>
        array of objects
      </td>

      <td>
        See [common available options](https://pipedrive.readme.io/docs/json-modals-component-library#visibleon)
      </td>
    </tr>
  </tbody>
</Table>

> 📘 For the `heading` type, only one heading format is supported. All other formats will be displayed the same way.

**Example schema for text block**

```json JSON
{
    "type":"object",
    "properties":{
        "blocks":{
            "type":"object",
            "properties":{
                "block_key_text":{
                    "$ref":"#/definitions/element-text",
                    "options":{
                        "markdown":true,
                        "value":"# Contact info \n For any other info regarding **your order** contact us through our [website](https://cake-demo-app.vercel.app/).\nOur help desk is working: \n 1. Monday - Friday 9am-4pm \n 2. Saturdays 10am-2pm \n\nOur stores are in: \n - Siberia\n - Malibu beach \n > Enjoy your cake!"
                    }
                }
            }
        }
    }
}
```

<hr />

### Input

<hr />

Input is used to accept data from the user.

<Image title="Frame 361.png" alt={936} width="80%" src="https://files.readme.io/27f29f6-Frame_361.png">
  Input block with an error message
</Image>

<Image title="Frame 359 (1).png" alt={936} width="80%" src="https://files.readme.io/c394a6f-Frame_359_1.png">
  Input block with a set value
</Image>

**Options for adding an input block**:

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Name
      </th>

      <th>
        Type
      </th>

      <th>
        Description
      </th>

      <th>
        Sample values
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `label`
      </td>

      <td>
        **REQUIRED**\
        string
      </td>

      <td>
        Label is displayed above the input field. It should be used to specify what type of input is expected to be inserted by the user.
      </td>

      <td>
        Cake size
      </td>
    </tr>

    <tr>
      <td>
        `type`
      </td>

      <td>
        string
      </td>

      <td>
        The type of the input that should be added by the user
      </td>

      <td>
        Type needs to be one of `"text"`, `"email"`, `"number"`, `"password"`, `"search"`, `"url"`)

        `password` formats user input in a hidden bulleted list.

        `search` allows user to enter search queries into. These fields are functionally identical to text inputs, but are styled differently.

        `URL` requires a URL as the value of the input.
      </td>
    </tr>

    <tr>
      <td>
        `value`
      </td>

      <td>
        string
      </td>

      <td>
        The value displayed in the input box. Can be either set as a default value by the app or a new one added by the user.
      </td>

      <td>
        M
      </td>
    </tr>

    <tr>
      <td>
        `placeholder`
      </td>

      <td>
        string
      </td>

      <td>
        The placeholder text displayed when no input value has been added
      </td>

      <td>
        Insert size
      </td>
    </tr>

    <tr>
      <td>
        `message`
      </td>

      <td>
        string
      </td>

      <td>
        An additional message placed below the input in a text format
      </td>

      <td>
        Cake size can be either S, L or M.
      </td>
    </tr>

    <tr>
      <td>
        `allowClear`
      </td>

      <td>
        boolean
      </td>

      <td>
        Allows clearing the input. To clear the input field, the user will have to click the "x" at the end of the input box.
      </td>

      <td>
        `true`, `false`
      </td>
    </tr>

    <tr>
      <td>
        `isRequired`
      </td>

      <td>
        boolean
      </td>

      <td>
        Makes the field mandatory to be filled by the user
      </td>

      <td>
        `true`, `false`
      </td>
    </tr>

    <tr>
      <td>
        `visibleOn`
      </td>

      <td>
        array of objects
      </td>

      <td>
        See [common available options](https://pipedrive.readme.io/docs/json-modals-component-library#visibleon)
      </td>

      <td>
        See [common available options](https://pipedrive.readme.io/docs/json-modals-component-library#visibleon)
      </td>
    </tr>

    <tr>
      <td>
        `fetchOnChange`
      </td>

      <td>
        boolean
      </td>

      <td>
        See [common available options](https://pipedrive.readme.io/docs/json-modals-component-library#fetchonchange)
      </td>

      <td>
        See [common available options](https://pipedrive.readme.io/docs/json-modals-component-library#fetchonchange)
      </td>
    </tr>

    <tr>
      <td>
        `error`
      </td>

      <td>
        string
      </td>

      <td>
        See the [expected error page](https://pipedrive.readme.io/docs/json-modals-user-interaction-handling#user-interface)
      </td>

      <td>
        See the [expected error page](https://pipedrive.readme.io/docs/json-modals-user-interaction-handling#user-interface)
      </td>
    </tr>
  </tbody>
</Table>

Input block can also display an error message when the data inserted by the user doesn’t match set criteria. See the [expected error page](https://pipedrive.readme.io/docs/json-modals-user-interaction-handling#user-interface) on how to set this up.

**Example schema for the input block**

```json
{
    "type":"object",
    "properties":{
        "blocks":{
            "type":"object",
            "properties":{
                "block_key_input":{
                    "$ref":"#/definitions/element-input",
                    "options":{
                        "type":"text",
                        "placeholder":"Insert size",
                        "label":"Cake size",
                        "value":"M",
                        "message":"Cake size can be either S, M or L",
                        "allowClear":true,
                        "isRequired":true
                    }
                }
            }
        }
    }
}
```

<hr />

### Select

<hr />

The select block can be used to show the user multiple options from a dropdown list from which they can choose one item.

**Options for adding a select block**:

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Name
      </th>

      <th>
        Type
      </th>

      <th>
        Description
      </th>

      <th>
        Sample values
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `label`
      </td>

      <td>
        **REQUIRED**\
        string
      </td>

      <td>
        Label is displayed above the select block's options. It should be used to specify what the user is selecting.
      </td>

      <td>
        Delivery method
      </td>
    </tr>

    <tr>
      <td>
        `value`
      </td>

      <td>
        string/boolean/number or array of string/boolean/number
      </td>

      <td>
        Value can be used to set an already chosen default item or a value chosen by the user
      </td>

      <td>
        Dependent on the chosen type.
      </td>
    </tr>

    <tr>
      <td>
        `message`
      </td>

      <td>
        string
      </td>

      <td>
        An additional guiding message in a text format
      </td>

      <td>
        Please, specify how the delivery will be done.
      </td>
    </tr>

    <tr>
      <td>
        `placeholder`
      </td>

      <td>
        string
      </td>

      <td>
        The placeholder text displayed when no input value has been added
      </td>

      <td>
        Select method
      </td>
    </tr>

    <tr>
      <td>
        `allowClear`
      </td>

      <td>
        boolean
      </td>

      <td>
        Allows clearing the selected option. To clear the field, the user will have to click the "x" at the end of the input box.
      </td>

      <td>
        `true`, `false`
      </td>
    </tr>

    <tr>
      <td>
        `isRequired`
      </td>

      <td>
        boolean
      </td>

      <td>
        Makes the field mandatory to be filled by the user
      </td>

      <td>
        `true`, `false`
      </td>
    </tr>

    <tr>
      <td>
        `filter`
      </td>

      <td>
        boolean
      </td>

      <td>
        Allows to filter available items in the dropdown by term
      </td>

      <td>
        `true`, `false`
      </td>
    </tr>

    <tr>
      <td>
        `fetchOnChange`
      </td>

      <td>
        boolean
      </td>

      <td>
        See [common available options](https://pipedrive.readme.io/docs/json-modals-component-library#fetchonchange)
      </td>

      <td>
        See [common available options](https://pipedrive.readme.io/docs/json-modals-component-library#fetchonchange)
      </td>
    </tr>

    <tr>
      <td>
        `error`
      </td>

      <td>
        string
      </td>

      <td>
        See the [expected error page](https://pipedrive.readme.io/docs/json-modals-user-interaction-handling#user-interface)
      </td>

      <td>
        See the [expected error page](https://pipedrive.readme.io/docs/json-modals-user-interaction-handling#user-interface)
      </td>
    </tr>

    <tr>
      <td>
        `items`
      </td>

      <td>
        array of objects
      </td>

      <td>
        See the following table
      </td>

      <td>
        See the following table
      </td>
    </tr>
  </tbody>
</Table>

**Items structure**:\
The items element must contain the following four objects from which the first two are required. `visibleOn` can be added either to the item or block, depending on your use case.

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Name
      </th>

      <th>
        Type
      </th>

      <th>
        Description
      </th>

      <th>
        Sample values
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `label`
      </td>

      <td>
        **REQUIRED**\
        string
      </td>

      <td>
        The naming of the item.
      </td>

      <td>
        Standard
      </td>
    </tr>

    <tr>
      <td>
        `value`
      </td>

      <td>
        **REQUIRED**\
        string/boolean/number
      </td>

      <td>
        Uniquely set value for an item.
      </td>

      <td>
        Dependent on the chosen type.
      </td>
    </tr>

    <tr>
      <td>
        `isDisabled`
      </td>

      <td>
        boolean
      </td>

      <td>
        Disables the item from being selected.
      </td>

      <td>
        `true`, `false`
      </td>
    </tr>

    <tr>
      <td>
        `visibleOn`
      </td>

      <td>
        array of objects
      </td>

      <td>
        See [common available options](https://pipedrive.readme.io/docs/json-modals-component-library#visibleon)
      </td>

      <td>
        See [common available options](https://pipedrive.readme.io/docs/json-modals-component-library#visibleon)
      </td>
    </tr>
  </tbody>
</Table>

**Example schema for the select block**

```json
{
    "type":"object",
    "properties":{
        "blocks":{
            "type":"object",
            "properties":{
                "block_key_select":{
                    "$ref":"#/definitions/element-select",
                    "options":{
                        "label":"Delivery method",
                        "message":"Please, specify how the delivery will be done.",
                        "placeholder":"Select method",
                        "isRequired":true,
                        "items":[
                            {
                                "label":"Standard",
                                "value":1
                            },
                            {
                                "label":"Accelerated",
                                "value":2
                            }
                        ]
                    }
                }
            }
        }
    }
}
```

<hr />

### Datepicker

<hr />

Datepicker allows users to select a set date from the calendar view.

**Options for adding a datepicker block**:

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Name
      </th>

      <th>
        Type
      </th>

      <th>
        Discription
      </th>

      <th>
        Sample values
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `label`
      </td>

      <td>
        **REQUIRED**\
        string
      </td>

      <td>
        Label is displayed above the datepicker block. It should be used to specify what date should be selected.
      </td>

      <td>
        Delivery date
      </td>
    </tr>

    <tr>
      <td>
        `value`
      </td>

      <td>
        string
      </td>

      <td>
        The value of the datepicker. It can be sent as a default date or the one selected by the user.
      </td>

      <td>
        The format should be `YYYY-MM-DD`\
        Example: `2021-02-17`
      </td>
    </tr>

    <tr>
      <td>
        `message`
      </td>

      <td>
        string
      </td>

      <td>
        An additional guiding message in a text format
      </td>

      <td>
        Cakes will be ready by 12:00 on the selected date.
      </td>
    </tr>

    <tr>
      <td>
        `error`
      </td>

      <td>
        string
      </td>

      <td>
        An error message displayed under the datepicker box.  See [expected error handling](https://pipedrive.readme.io/docs/json-modals-user-interaction-handling#user-interface) on how to set it up.
      </td>

      <td>
        Please select a non-holiday date.
      </td>
    </tr>

    <tr>
      <td>
        `allowClear`
      </td>

      <td>
        boolean
      </td>

      <td>
        Allows clearing the selected date. To clear the box, the user will have to click the "x" at the end of the box.
      </td>

      <td>
        `true`, `false`
      </td>
    </tr>

    <tr>
      <td>
        `isRequired`
      </td>

      <td>
        boolean
      </td>

      <td>
        Makes the field mandatory to be filled by the user
      </td>

      <td>
        `true`, `false`
      </td>
    </tr>

    <tr>
      <td>
        `visibleOn`
      </td>

      <td>
        array of objects
      </td>

      <td>
        See [common available options](https://pipedrive.readme.io/docs/json-modals-component-library#visibleon)
      </td>

      <td>
        See [common available options](https://pipedrive.readme.io/docs/json-modals-component-library#visibleon)
      </td>
    </tr>

    <tr>
      <td>
        `fetchOnChange`
      </td>

      <td>
        boolean
      </td>

      <td>
        See [common available options](https://pipedrive.readme.io/docs/json-modals-component-library#fetchonchange)
      </td>

      <td>
        See [common available options](https://pipedrive.readme.io/docs/json-modals-component-library#fetchonchange)
      </td>
    </tr>
  </tbody>
</Table>

**Example schema for the datepicker block**

```json
{
    "type":"object",
    "properties":{
        "blocks":{
            "type":"object",
            "properties":{
                "block_key_datepicker":{
                    "$ref":"#/definitions/element-datepicker",
                    "options":{
                        "label":"Delivery date",
                        "value":"2021-02-17",
                        "message":"Cakes will be ready by 12:00 on selected date",
                        "placeholder":"Date",
                        "allowClear":true,
                        "isRequired":true
                    }
                }
            }
        }
    }
}
```

<hr />

### Radio group

<hr />

Allows selecting one item from a displayed bulleted list.

**Options for adding a radio group block**:

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Name
      </th>

      <th>
        Type
      </th>

      <th>
        Description
      </th>

      <th>
        Sample values
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `label`
      </td>

      <td>
        **REQUIRED**\
        string
      </td>

      <td>
        Label is displayed above the radio group block. It should be used to specify what should be selected by the user.
      </td>

      <td>
        Wrap as a gift?
      </td>
    </tr>

    <tr>
      <td>
        `value`
      </td>

      <td>
        string
      </td>

      <td>
        The value of the radio group
      </td>

      <td>
        yes
      </td>
    </tr>

    <tr>
      <td>
        `items`
      </td>

      <td>
        array of objects
      </td>

      <td>
        See the following table
      </td>

      <td>
        See the following table
      </td>
    </tr>

    <tr>
      <td>
        `isRequired`
      </td>

      <td>
        boolean
      </td>

      <td>
        Makes the field mandatory to be filled by the user
      </td>

      <td>
        `true`,`false`
      </td>
    </tr>

    <tr>
      <td>
        `message`
      </td>

      <td>
        string
      </td>

      <td>
        An additional guiding message in a text format
      </td>

      <td />
    </tr>

    <tr>
      <td>
        `error`
      </td>

      <td>
        string
      </td>

      <td>
        An error message displayed under the radio group box.  See [expected errors](https://pipedrive.readme.io/docs/json-modals-user-interaction-handling#user-interface) on how to set it up.
      </td>

      <td />
    </tr>

    <tr>
      <td>
        `fetchOnChange`
      </td>

      <td>
        boolean
      </td>

      <td>
        See [common available options](https://pipedrive.readme.io/docs/json-modals-component-library#fetchonchange)
      </td>

      <td>
        See [common available options](https://pipedrive.readme.io/docs/json-modals-component-library#fetchonchange)
      </td>
    </tr>
  </tbody>
</Table>

**Items structure**:

The items element must contain the following four objects from which the first two are required. `visibleOn` can be added either to the item or block, depending on your use case.

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Name
      </th>

      <th>
        Type
      </th>

      <th>
        Description
      </th>

      <th>
        Sample values
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `label`
      </td>

      <td>
        **REQUIRED**\
        string
      </td>

      <td>
        The naming of the item
      </td>

      <td>
        Yes, No
      </td>
    </tr>

    <tr>
      <td>
        `value`
      </td>

      <td>
        **REQUIRED**\
        string
      </td>

      <td>
        Uniquely set value for an item
      </td>

      <td>
        Dependent on the chosen type.
      </td>
    </tr>

    <tr>
      <td>
        `isDisabled`
      </td>

      <td>
        boolean
      </td>

      <td>
        Disables the item from being selected
      </td>

      <td>
        `true`, `false`
      </td>
    </tr>

    <tr>
      <td>
        `visibleOn`
      </td>

      <td>
        array of objects
      </td>

      <td>
        See [commonly available options](https://pipedrive.readme.io/docs/json-modals-component-library#visibleon)
      </td>

      <td>
        See [commonly available options](https://pipedrive.readme.io/docs/json-modals-component-library#visibleon)
      </td>
    </tr>
  </tbody>
</Table>

**Example schema for radio group block**

In this example, we have also shown how to add the `visibleOn` common option. In this case, the radio group block will not display the `maybe` option item to the user as they have previously selected the cake to be a vanilla cake, as the fictional store we use doesn’t offer gift wrapping for cakes made of vanilla (let’s go with this for the sake of the example, in the real world, it’d be awesome if all cakes could always be wrapped as gifts!).

```json
{
    "type":"object",
    "properties":{
        "blocks":{
            "type":"object",
            "properties":{
                "block_key_radio":{
                    "$ref":"#/definitions/element-radio-group",
                    "options":{
                        "label":"Wrap as a gift?",
                        "value":"wrapping",
                        "items":[
                            {
                                "value":"yes",
                                "label":"Yes"
                            },
                            {
                                "value":"no",
                                "label":"No"
                            },
                            {
                                "value":"hidden",
                                "label":"Maybe",
                                "visibleOn":{
                                    "block_key_checkbox":{
                                        "equals":"vanilla"
                                    }
                                }
                            }
                        ]
                    }
                }
            }
        }
    }
}
```

<hr />

### Checkbox group

<hr />

Blue checkboxes allow selecting items in a list view. All items or none can also be selected.

**Options for adding a checkbox group block**:

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Name
      </th>

      <th>
        Type
      </th>

      <th>
        Description
      </th>

      <th>
        Sample values
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `label`
      </td>

      <td>
        string
      </td>

      <td>
        The label is displayed above the checkbox group block. It should be used to specify what should be selected by the user.
      </td>

      <td>
        Flavors
      </td>
    </tr>

    <tr>
      <td>
        `value`
      </td>

      <td>
        array of string
      </td>

      <td>
        The value of the checkbox group
      </td>

      <td />
    </tr>

    <tr>
      <td>
        `items`
      </td>

      <td>
        array of objects
      </td>

      <td>
        See the following table
      </td>

      <td>
        See the following table
      </td>
    </tr>

    <tr>
      <td>
        `isRequired`
      </td>

      <td>
        boolean
      </td>

      <td>
        Makes the field mandatory to be filled by the user
      </td>

      <td>
        `true`, `false`
      </td>
    </tr>

    <tr>
      <td>
        `message`
      </td>

      <td>
        string
      </td>

      <td>
        An additional guiding message in a text format
      </td>

      <td />
    </tr>

    <tr>
      <td>
        `fetchOnChange`
      </td>

      <td>
        boolean
      </td>

      <td>
        See [common available options](https://pipedrive.readme.io/docs/json-modals-component-library#fetchonchange)
      </td>

      <td>
        See [common available options](https://pipedrive.readme.io/docs/json-modals-component-library#fetchonchange)
      </td>
    </tr>

    <tr>
      <td>
        `error`
      </td>

      <td>
        string
      </td>

      <td>
        See [expected errors](https://pipedrive.readme.io/docs/json-modals-user-interaction-handling#user-interface) on how to set it up
      </td>

      <td>
        See [expected errors](https://pipedrive.readme.io/docs/json-modals-user-interaction-handling#user-interface) on how to set it up
      </td>
    </tr>
  </tbody>
</Table>

**Items structure**:

The items element must contain the following four objects from which the first two are required. `visibleOn` can be added either to the item or block, depending on your use case.

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Name
      </th>

      <th>
        Type
      </th>

      <th>
        Description
      </th>

      <th>
        Sample values
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `label`
      </td>

      <td>
        **REQUIRED**\
        string
      </td>

      <td>
        The naming of the item
      </td>

      <td>
        Vanilla
      </td>
    </tr>

    <tr>
      <td>
        `value`
      </td>

      <td>
        **REQUIRED**\
        array of string
      </td>

      <td>
        Uniquely set value for an item
      </td>

      <td>
        Dependent on the chosen type.
      </td>
    </tr>

    <tr>
      <td>
        `isDisabled`
      </td>

      <td>
        boolean
      </td>

      <td>
        Disables the item from being selected
      </td>

      <td>
        `true`, `false`
      </td>
    </tr>

    <tr>
      <td>
        `visibleOn`
      </td>

      <td>
        array of objects
      </td>

      <td>
        See [commonly available options](https://pipedrive.readme.io/docs/json-modals-component-library#visibleon)
      </td>

      <td>
        See [commonly available options](https://pipedrive.readme.io/docs/json-modals-component-library#visibleon)
      </td>
    </tr>
  </tbody>
</Table>

**Example schema for the checkbox group block**

In this example, we provide three items to be selected in the checkbox group block. From those three, the possibility of choosing the chocolate-flavored cake is disabled. If the input, aka the cake size in this example, includes "L", the checkbox option item `hidden_option` value will be hidden.

```json
{
    "type":"object",
    "properties":{
        "blocks":{
            "type":"object",
            "properties":{
                "block_key_checkbox":{
                    "$ref":"#/definitions/element-checkbox-group",
                    "options":{
                        "label":"Flavors",
                        "value":[
                            "cranberry"
                        ],
                        "items":[
                            {
                                "value":"vanilla",
                                "label":"Vanilla"
                            },
                            {
                                "value":"chocolate",
                                "label":"Chocolate",
                                "isDisabled":true
                            },
                            {
                                "value":"cranberry",
                                "label":"Cranberry"
                            },
                            {
                                "value":"hidden_option",
                                "label":"Not visible",
                                "visibleOn":{
                                    "block_key_input":{
                                        "includes":"L"
                                    }
                                }
                            }
                        ]
                    }
                }
            }
        }
    }
}
```

<hr />

### Separator

<hr />

The separator block allows displaying a thin grey line between other blocks to visually separate the modal into sections.

For adding the separator block, add the following code to your schema (for a larger schema, start from the `"type"` parameter that is after the `"blocks"` parameter).

**Example schema for the separator block**

```json
{
    "type":"object",
    "properties":{
        "blocks":{
            "type":"object",
            "properties":{
                "block_key_separator":{
                    "$ref":"#/definitions/element-separator"
                }
            }
        }
    }
}
```

<hr />

### Textarea

<hr />

Allows adding a text area for larger comments and texts.

**Options for adding a textarea block**:

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Name
      </th>

      <th>
        Type
      </th>

      <th>
        Description
      </th>

      <th>
        Sample values
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `label`
      </td>

      <td>
        **REQUIRED**\
        string
      </td>

      <td>
        Label is displayed above the textarea box. It should be used to specify what type of input is expected to be inserted by the user.
      </td>

      <td>
        Additional instructions
      </td>
    </tr>

    <tr>
      <td>
        `value`
      </td>

      <td>
        string
      </td>

      <td>
        The value displayed in the textarea box
      </td>

      <td />
    </tr>

    <tr>
      <td>
        `placeholder`
      </td>

      <td>
        string
      </td>

      <td>
        The placeholder text displayed when no text has been added. This can be used to give a hint to users on what info they need to add
      </td>

      <td>
        Write "Happy birthday!" on the cake
      </td>
    </tr>

    <tr>
      <td>
        `message`
      </td>

      <td>
        string
      </td>

      <td>
        An additional message placed below the textarea  box in a text format
      </td>

      <td>
        What would you like to have on your cake?
      </td>
    </tr>

    <tr>
      <td>
        `resize`
      </td>

      <td>
        boolean
      </td>

      <td>
        Allows to resize the textarea field
      </td>

      <td>
        `true`, `false`
      </td>
    </tr>

    <tr>
      <td>
        `isRequired`
      </td>

      <td>
        boolean
      </td>

      <td>
        Makes the field mandatory to be filled by the user
      </td>

      <td>
        `true`, `false`
      </td>
    </tr>

    <tr>
      <td>
        `visibleOn`
      </td>

      <td>
        array of objects
      </td>

      <td>
        See [commonly available options](https://pipedrive.readme.io/docs/json-modals-component-library#visibleon)
      </td>

      <td>
        See [commonly available options](https://pipedrive.readme.io/docs/json-modals-component-library#visibleon)
      </td>
    </tr>

    <tr>
      <td>
        `fetchOnChange`
      </td>

      <td>
        boolean
      </td>

      <td>
        See [common available options](https://pipedrive.readme.io/docs/json-modals-component-library#fetchonchange)
      </td>

      <td>
        See [common available options](https://pipedrive.readme.io/docs/json-modals-component-library#fetchonchange)
      </td>
    </tr>

    <tr>
      <td>
        `error`
      </td>

      <td>
        string
      </td>

      <td>
        An error message displayed under the textarea. See **[expected errors](https://pipedrive.readme.io/docs/json-modals-user-interaction-handling#user-interface)  on how to set it up**.
      </td>

      <td>
        An error message displayed under the textarea. See **[expected errors](https://pipedrive.readme.io/docs/json-modals-user-interaction-handling#user-interface) on how to set it up**.
      </td>
    </tr>
  </tbody>
</Table>

**Example schema for the textarea block**

```json
{
    "type":"object",
    "properties":{
        "blocks":{
            "type":"object",
            "properties":{
                "block_key_textarea":{
                    "$ref":"#/definitions/element-textarea",
                    "options":{
                        "placeholder":"Write Happy birthday! on the cake",
                        "label":"Additional instructions",
                        "value":"Long text",
                        "message":"What would you like to have on your cake?",
                        "resize":true,
                        "isRequired":true
                    }
                }
            }
        }
    }
}
```

<hr />

## Action buttons

<hr />

Action buttons are displayed in the modal footer of a JSON modal. They are clickable and will trigger the modal's saving, resetting, or cancellations. Each modal has to have a minimum of one and a maximum of two action buttons. Available action buttons have two types – primary and secondary actions. The primary action will be displayed as a green UI button and the secondary as a grey UI button.

Adding an action button is similar to adding a block. First, you’ll need to add the action key and action type as a `$ref` property from the following two:

* `#/definitions/action-primary`
* `#/definitions/action-secondary`

<hr />

### Primary action button

<hr />

The primary action button will be activated once all required blocks are filled and, depending on the `handler` option will:

* send a `POST HTTP` request with form data that the user filled in the action modal as body payload  (`"handler": "request"`);
* open a new browser tab with data that the user filled in the JSON modal as serialized JSON in form of query parameters (`"handler": "open-url"`).

By default, the URL link will be used as the destination endpoint for all requests. However, it can also be overwritten with the URL option by uploading a schema.

**Options for primary action button**

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Name
      </th>

      <th>
        Type
      </th>

      <th>
        Description
      </th>

      <th>
        Sample values
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `label`
      </td>

      <td>
        **REQUIRED**\
        string
      </td>

      <td>
        Descriptive name of the action button, showcasing what will happen on button click
      </td>

      <td>
        e.g. submit or create in app"
      </td>
    </tr>

    <tr>
      <td>
        `handler`
      </td>

      <td>
        **REQUIRED**\
        string
      </td>

      <td>
        Option value will determine what the button will do when user clicks it
      </td>

      <td>
        one of `"request"`, `"open-url"`.
      </td>
    </tr>

    <tr>
      <td>
        `url`
      </td>

      <td>
        string
      </td>

      <td>
        Must be added only when `"handler": "open-url"` and there is a need to direct the user out of Pipedrive to see the outcome of the JSON modal inside the app.\
        If `"handler": "open-url"` is selected but `url` is not added to the schema, default URL for the app (the one added in Developer Hub for JSON modal) will be used.
      </td>

      <td>
        "[https://www.exampleURLtoapp.com"](https://www.exampleURLtoapp.com")
      </td>
    </tr>
  </tbody>
</Table>

**Example schemas for primary action button**

**Send POST HTTP request**

```json
{
    "type":"object",
    "properties":{
        "actions":{
            "type":"object",
            "properties":{
                "submit":{
                    "$ref":"#/definitions/action-primary",
                    "options":{
                        "label":"Submit",
                        "handler":"request"
                    }
                }
            }
        }
    }
}
```

**Open a new tab with action modal**

```json
{
    "type":"object",
    "properties":{
        "actions":{
            "type":"object",
            "properties":{
                "create":{
                    "$ref":"#/definitions/action-primary",
                    "options":{
                        "label":"Create in Asana",
                        "handler":"open-url"
                    }
                }
            }
        }
    }
}
```

**Open new tab with custom URL**

```json
{
    "type":"object",
    "properties":{
        "actions":{
            "type":"object",
            "properties":{
                "create":{
                    "$ref":"#/definitions/action-primary",
                    "options":{
                        "label":"Create in app",
                        "handler":"open-url",
                        "url":"https://www.exampleURLtoapp.com"
                    }
                }
            }
        }
    }
}
```

<hr />

### Secondary action button

<hr />

The secondary action button allows the user to either reset the modal's contents to the original ones defined in the schema (added in Developer Hub) or cancel and close the modal, therefore canceling the whole JSON modal.\
To add the secondary action button, you'll need to add the following options to the schema:

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Name
      </th>

      <th>
        Type
      </th>

      <th>
        Description
      </th>

      <th>
        Sample values
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `label`
      </td>

      <td>
        **REQUIRED**\
        string
      </td>

      <td>
        Descriptive name of the action button, showcasing what will happen on button click
      </td>

      <td>
        "Reset", "Cancel and Close"
      </td>
    </tr>

    <tr>
      <td>
        `handler`
      </td>

      <td>
        **REQUIRED**\
        string
      </td>

      <td>
        Option value will determine what the button will do when user clicks it
      </td>

      <td>
        One of "reset" or "cancel"
      </td>
    </tr>
  </tbody>
</Table>

**Reset form to an initial state**

```json
{
    "type":"object",
    "properties":{
        "actions":{
            "type":"object",
            "properties":{
                "action_reset":{
                    "$ref":"#/definitions/action-secondary",
                    "options":{
                        "label":"Reset",
                        "handler":"reset"
                    }
                }
            }
        }
    }
}
```

**Cancel and close modal**

When the user clicks this action, the modal will be closed, and the action canceled.

```json
{
    "type":"object",
    "properties":{
        "actions":{
            "type":"object",
            "properties":{
                "action_cancel":{
                    "$ref":"#/definitions/action-secondary",
                    "options":{
                        "label":"Cancel and close",
                        "handler":"cancel"
                    }
                }
            }
        }
    }
}
```