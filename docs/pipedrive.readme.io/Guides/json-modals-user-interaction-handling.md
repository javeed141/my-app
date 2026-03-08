# User interaction handling

> 📘
>
> JSON modals were previously called embedded app actions.

Your JSON modal can encounter different scenarios when a user interacts with it. A modal should be able to show the following depending on the usage scenario:

* A success message on completion of an action
* An error message when data loading from the schema fails
* A Validation error message if input values are incorrect
* A global modal error if requests from modal to app fail

<hr />

## Displaying success message

<hr />

If the received data about the blocks is correct, the app should return the following structure to finish the user interaction flow and give a corresponding notice to the user.

* `snackbar` – shows message in the bottom left corner of the page
  * `message` – (string) additional message for the user
  * `type` – (string) value must be `“snackbar”`
  * `link` – (object) not required, but provides a way to add an external link to the success message
    * `label` – (string) label of the linked item
    * `value` – (string) value of the linked item in a URL format

**Example of a response from your app when showing success:**

**status code: 200**

```json
{
    "success": {
        "message": "Successfully done",
        "type": "snackbar",
        "link": {
            "label": "View item",
            "value": "https://marketplace.pipedrive.com"
        }
    }
}
```

<Image title="success message.png" alt={334} align="center" width="auto" src="https://files.readme.io/bd02474-success_message.png">
  Success message in a snackbar format
</Image>

<hr />

## Displaying error messages

<hr />

### Initial data loading

<hr />

Data loads after a user has clicked on a JSON modal and the modal is opened. First, the UI of the modal will show a spinner loading, during which the click will trigger a `GET` request to retrieve the data from the API endpoint set in Developer Hub for the JSON modal We also check if the user has the permissions to access the app and action. Afterward, the data will be fetched from your API and mapped it to the schema.

A global error message is displayed inside the modal if the request fails.

<Image title="Screenshot 2021-03-15 at 20.40.52.png" alt={728} align="center" width="80%" src="https://files.readme.io/e0051d8-Screenshot_2021-03-15_at_20.40.52.png">
  Initial data load error displayed in the modal
</Image>

Common reasons why the request may fail:

* The user who triggered the action doesn’t have permission to do so (the app is not installed)

* The response structure from the app’s API endpoint is invalid

* The response data structure doesn’t match with the app’s uploaded schema structure

* The request to the app’s API endpoint took more than 10 seconds to return a response

**Example of a failure response from Pipedrive**

For example, if a block with the `type` set as `#/definitions/element/text` has unknown property items, then the response from Pipedrive describes the error with paths to the wrong Block. See more about troubleshooting in [the structure validation section](https://pipedrive.readme.io/docs/app-extensions-json-modals#schema-structure-validation).

```json
{
    "success": false,
    "error": "The response from the server is not according to the structure",
    "data": {
        "errors": [
            {
                "keyword": "additionalProperties",
                "dataPath": "/data/blocks/text_item",
                "schemaPath": "#/additionalProperties",
                "params": {
                    "additionalProperty": "items"
                },
                "message": "should NOT have additional properties"
            }
        ],
        "response": {
            "data": {
                "blocks": {
                    "block_key_text": {
                        "items": []
                    }
                },
                "actions": {}
            }
        }
    }
}
```

**Unauthorized access screen**

When there has been an error in the app authorization, a “lost connection” message can be displayed, guiding the user to reinstall the app.

For this screen to be displayed in the modal, an **HTTP status code 401** must be sent with any response body on the initial data request. The green button, asking users to reinstall, will use the redirect URL defined in Developer Hub. By clicking it, users will be directed to the OAuth authorization page of the app.

<Image title="Screenshot 2021-03-15 at 20.40.43.png" alt={778} align="center" width="80%" src="https://files.readme.io/3caac7c-Screenshot_2021-03-15_at_20.40.43.png" />

<hr />

### User interface

<hr />

When the modal form's data has been successfully loaded from the app, and a user submits an action from the bottom action buttons, we make a `POST` request to send the data from the modal form to the app's API endpoint.

**Expected errors**

This error can be displayed inside the modal to any block requiring user input (input, select, datepicker, textarea, radio group, checkbox group blocks) when an app has received data inserted by a user and identified it as invalid. The error message will indicate to the user that the input is either wrong or formatted incorrectly.

<Image title="Frame 352.png" alt={699} align="center" width="auto" src="https://files.readme.io/a96ebad-Frame_352.png">
  The expected error displayed for incorrect contents in the input block
</Image>

The app needs to respond with the following structure to display the error messages. In the response, don’t include the `items` property in the blocks with dynamic content when sending the error message. Otherwise previously set item’s values will be overwritten.

Example of response structure with **input block error**:

```json
{
  "data": {
    "blocks": {
      "block_key_input_email": {
        "label": "Input label",
        "value": "Input content",
        "message": "info",
        "error": "error"
      }
    }
  }
}
```

**Expected errors -  global error**

If the app fails to handle a submitted request from the JSON modal but the cause of the failure is not connected to any of the inserted inputs, the app can respond with a custom error message.

<Image title="Frame 350 (2).png" alt={669} align="center" width="auto" src="https://files.readme.io/ad2979a-Frame_350_2.png">
  An expected error message displayed in the modal
</Image>

For that error, the modal must receive a response with the following structure. The `message` parameter must be in a string format and must have a helpful, contextual, and actionable error message that the users will understand to act upon.

**Response from the API endpoint**

```json
{
  "error": {
    "message": "Message body"
  }
}
```

<hr />

### Unexpected error

<hr />

When the app fails to handle the request with an unexpected error, and therefore any meaningful message can’t be displayed, then the default message will be shown in the modal.

<Image title="Frame 348 (3).png" alt={531} align="center" width="auto" src="https://files.readme.io/a802706-Frame_348_3.png">
  Unexpected error:\
  Something went wrong, please try again.
</Image>

Known reasons for this error appearing:

* The response from the app has an invalid structure. The structure doesn’t match with the Input or Global error structure described above
* The request to the app took more than 10 seconds
* The request to Pipedrive failed due to server error