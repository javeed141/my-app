# Working with labels

Within the Pipedrive web app, you can add visual labels to **Deals**, **Persons**, **Organizations**, and **Leads**. See [the visual](https://pipedrive.readme.io/docs/working-with-labels#updating-and-adding-labels) of how labels are displayed inside Pipedrive.

This guide will give you an overview of how to do the following things:

* [How to find the values for each label?](https://pipedrive.readme.io/docs/working-with-labels#finding-label-values)
* [How to update and add labels?](https://pipedrive.readme.io/docs/working-with-labels#updating-and-adding-labels)
* [How to assign labels to an entity?](https://pipedrive.readme.io/docs/working-with-labels#assigning-a-label-to-an-entity)

> 📘
>
> The Deal, Person and Organization labels are custom fields. Keep in mind that a custom field with the type of "Single option" and "Multiple options" can have a maximum of **10,000 options** per custom field.

<hr />

## Finding label values

<hr />

The best way to find a label’s values is to make a `GET` request.

For **Deals, Organizations, and Persons**, you can make a `GET` request to the label’s corresponding custom field endpoint (see the following table). To help you out with the request, see [updating custom fields' values](https://pipedrive.readme.io/docs/updating-custom-field-value#step-1-get-the-key-for-the-custom-field-named-appointed-manager) tutorial.

For **Leads**, you can make a `GET` request to the label’s designated endpoint - [`GET /leadLabels`](https://developers.pipedrive.com/docs/api/v1/LeadLabels#getLeadLabels).

When you first start working with labels, you should know that Pipedrive creates default values for Person and Organization labels and three default labels for the Lead entity. You can see the set labels from [here](https://pipedrive.readme.io/docs/working-with-labels#default-label-values-and-labels) or fetch them using the endpoints from the following table.

| Label type               | Endpoint                                                                                                           |
| :----------------------- | :----------------------------------------------------------------------------------------------------------------- |
| Labels for Deals         | [`GET /dealFields`](https://developers.pipedrive.com/docs/api/v1/DealFields#getDealFields)                         |
| Labels for Organizations | [`GET /organizationFields`](https://developers.pipedrive.com/docs/api/v1/OrganizationFields#getOrganizationFields) |
| Labels for Persons       | [`GET /personFields`](https://developers.pipedrive.com/docs/api/v1/PersonFields#getPersonFields)                   |
| Labels for Leads         | [`GET /leadLabels`](https://developers.pipedrive.com/docs/api/v1/LeadLabels#getLeadLabels)                         |

After making a request to fetch Deal/Organization/Person labels, you should find the **label field** from the response's payload and then look for the field ID of the title, the name ( `"name": "label"`), and the available options for the label property. Each label option has a label ID, color (if defined), and text which is displayed under the `label` parameter for Deals/Organizations/Persons. Try to store these as you'll need them when you'd like to update any of the labels.

For Lead labels, as you are using a designated endpoint, you should receive a list of data that shows all available labels and their descriptive parameters, for example, `name` and `color`.

### If the label has no values

If the label doesn't have any values by default (`options` or `data` parameter isn't displayed), you'll need to add them by [making a request to the corresponding update](https://pipedrive.readme.io/docs/working-with-labels#updating-and-adding-labels) (`PUT` for Deals/Organizations/Persons or `PATCH` for Leads) endpoint.

### Default label values and labels

Pipedrive creates default values for Person and Organization labels and three default labels for the Lead entity.

> 📘
>
> For Person and Organization labels, the default values are `color` and `label`.
>
> * The values for `color` and `label` may change depending on your language settings.
> * The label `id` is dynamic and not constant.
>
> For Lead labels, the default values are `name` and `color`. The label `id` is also dynamic and not constant.

Default values of Person labels (values of `color` and `label` are set by default):

```json
"options":[
   {
      "color":"green",
      "label":"Customer",
      "id":1 //id is dynamic
   },
   {
      "color":"red",
      "label":"Hot lead",
      "id":2
   },
   {
      "color":"yellow",
      "label":"Warm lead",
      "id":3
   },
   {
      "color":"blue",
      "label":"Cold lead",
      "id":4
   }
]
```

Default values for Organization labels (values of `color` and `label` are set by default):

```json
"options":[
   {
      "color":"green",
      "label":"Customer",
      "id":5 //id is dynamic
   },
   {
      "color":"red",
      "label":"Hot lead",
      "id":6
   },
   {
      "color":"yellow",
      "label":"Warm lead",
      "id":7
   },
   {
      "color":"blue",
      "label":"Cold lead",
      "id":8
   }
]
```

Default labels for Leads (values of `name` and `color` are set by default):

```json JSON
[
   {
      "id": "5e5faf00-b6e0-11ea-b5f6-45d1bda97e35",
      "name": "Hot",
      "color": "red",
      "add_time": "2020-06-25T12:35:36.000Z",
      "update_time": "2020-06-25T12:35:36.000Z"
   },
   {
      "id": "5e5faf01-b6e0-11ea-b5f6-45d1bda97e35",
      "name": "Cold",
      "color": "blue",
      "add_time": "2020-06-25T12:35:36.000Z",
      "update_time": "2020-06-25T12:35:36.000Z"
   },
   {
      "id": "5e5faf02-b6e0-11ea-b5f6-45d1bda97e35",
      "name": "Warm",
      "color": "yellow",
      "add_time": "2020-06-25T12:35:36.000Z",
      "update_time": "2020-06-25T12:35:36.000Z"
   }
]
```

<hr />

## Updating and adding labels

<hr />

<Image title="Deals, Organizations, & Persons Labels.png" alt={3126} align="center" width="80%" src="https://files.readme.io/057375b-Deals_Organizations__Persons_Labels.png">
  Labels for the Deal, Organization, and Person in the Deal's details view
</Image>

<Image title="Lead Labels.png" alt={3218} align="center" src="https://files.readme.io/d00b2e4-Lead_Labels.png">
  Label for a Lead displayed in the Lead's details view
</Image>

If you wish to change the default labels or add labels to the Deal/Organization/Person entity, you'll need to make a `PUT` request to one of the corresponding endpoints.\
For the Lead entity, you’ll need to use the `PATCH` request to change a label and the `POST` request to add a label.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Entity
      </th>

      <th>
        Endpoint
      </th>

      <th>
        Required parameters for updating a label
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Deal
      </td>

      <td>
        [`PUT /dealFields/{id}`](https://developers.pipedrive.com/docs/api/v1/DealFields#updateDealField)
      </td>

      <td>
        **id** (integer) - label field ID
      </td>
    </tr>

    <tr>
      <td>
        Organization
      </td>

      <td>
        [`PUT /organizationFields/{id}`](https://developers.pipedrive.com/docs/api/v1/OrganizationFields#updateOrganizationField)
      </td>

      <td>
        **id** (integer) - label field ID
      </td>
    </tr>

    <tr>
      <td>
        Person
      </td>

      <td>
        [`PUT /personFields/{id}`](https://developers.pipedrive.com/docs/api/v1/PersonFields#updatePersonField)
      </td>

      <td>
        **id** (integer) - label field ID
      </td>
    </tr>

    <tr>
      <td>
        Lead\
        (Updating a label)
      </td>

      <td>
        [`PATCH /leadLabels/{id}`](https://developers.pipedrive.com/docs/api/v1/LeadLabels#updateLeadLabel)
      </td>

      <td>
        **id** (string) - label field ID
      </td>
    </tr>

    <tr>
      <td>
        Lead\
        (Adding a label)
      </td>

      <td>
        [`POST /leadLabels`](https://developers.pipedrive.com/docs/api/v1/LeadLabels#addLeadLabel)
      </td>

      <td>
        **name** (string)\
        **color** (string)
      </td>
    </tr>
  </tbody>
</Table>

### Updating and adding label values for Deals, Organizations, and Persons

To update or add new labels, you'll need to send all the options for different labels in an array of objects. For example, if you want to update the label with `"id": 1`, you'll need to include all other labels, their data and then change what you want to change.

In this example, we changed the first label option from the Person entity to be purple and have the text of the label be `Interested party`.

```json
{
    "options": [
        {
            "color": "purple",
            "label": "Interested party",
            "id": 1
        },
        {
            "color": "red",
            "label": "Hot lead",
            "id": 2
        },
        {
            "color": "yellow",
            "label": "Warm lead",
            "id": 3
        },
        {
            "color": "blue",
            "label": "Cold lead",
            "id": 4
        }
    ]
}
```

To add only one new label, you'll still need to include all of the previously existing labels you wish to keep. In this example, we added a gray label with the text `Drafted` to the options of Person labels.

```json
{
   "options":[
      {
         "color":"green",
         "label":"Customer",
         "id":1
      },
      {
         "color":"red",
         "label":"Hot lead",
         "id":2
      },
      {
         "color":"yellow",
         "label":"Warm lead",
         "id":3
      },
      {
         "color":"blue",
         "label":"Cold lead",
         "id":4
      },
      {
         "label":"Drafted",
         "color":"gray"
      }
   ]
}
```

### Updating Lead labels

The difference between Lead labels and other entity labels is the passing of less information as you can update one label or one field in a label at a time. With Deal/Organization/Person labels, you have to send all the data surrounding all existing label options.

To update a Lead label, you’ll only need to send the ID of the specific label you want to update with the parameter of the field that needs changing. For example, if you want to update the label with `"id": 5e5faf00-b6e0-11ea-b5f6-45d1bda97e35`, you'll need to include this ID and the corresponding parameter (`name` and/or `color`) with the value that you want to change to.

In this example, we changed the text of the first label from the Lead entity to be `VIP` and kept the original label color `red`.

```json JSON
[{
      "id": "5e5faf00-b6e0-11ea-b5f6-45d1bda97e35",
      "name": "VIP",
      "color": "red",
	}
]
```

### Adding Lead labels

To add a Lead label, you’ll need to make a request to the [`POST /leadLabels`](https://developers.pipedrive.com/docs/api/v1/LeadLabels#addLeadLabel) endpoint and include the `name` and `color` parameters in the request body. Do take note that only a subset of colors can be used: green, blue, red, yellow, purple, and gray.

**Sample request body**
We added a Lead label with the name `Tentative` in the color `gray`.

```json JSON
{
   "name":"Tentative",
   "color":"gray"
}
```

```javascript node.js
const pipedrive = require('pipedrive');
const defaultClient = new pipedrive.ApiClient();

// Configure authorization by settings api key
// PIPEDRIVE_API_KEY is an environment variable that holds real api key
defaultClient.authentications.api_key.apiKey = process.env.PIPEDRIVE_API_KEY;

async function addLeadLabel() {
    try {
        console.log('Sending request...');

        const api = new pipedrive.LeadLabelsApi(defaultClient);

        const data = {
            name: 'Tentative',
            color: 'gray'
        }
        const response = await api.addLeadLabel(data);

        console.log('Lead label added successfully!', response);
    } catch (err) {
        const errorToLog = err.context?.body || err;

        console.log('Adding lead label failed', errorToLog);
    }
}


addLeadLabel();
```

<hr />

## Assigning a label to an entity

<hr />

There are two different ways of adding a label:

1. The ID of the label is already known, so you add them when you create an entity.
2. The label ID is not known, so you'll need to fetch the IDs first and then update the entity to have the label.

> 📘
>
> For Deals, Organizations, and Persons, the behavior and logic are similar in all three cases, so we'll continue using Deals as a sample entity.
>
> For Leads, the behavior and logic differ slightly, so we’ve explained it below.

### Adding a label when creating the Deal/Organization/Person entity

**Authentication**
First, you need to think about how you authenticate your request to our API. You can either use an API token (see the code snippet below) or [OAuth](https://pipedrive.readme.io/docs/marketplace-oauth-api#how-to-authenticate-the-requests). For more information about authenticating your requests, see our [authentication article](https://pipedrive.readme.io/docs/core-api-concepts-authentication). For more detailed guidance, check out the [creating a Deal](https://developers.pipedrive.com/tutorials/create-a-deal-pipedrive-api) tutorial.

**Sample Code**

```php
<?php

// Pipedrive sample API token
$api_token = '659c9fddb16335e48cc67114694b52074e812e03';
// Pipedrive sample company domain
$company_domain = 'efficient-company';
// URL for creating a deal
$url = 'https://' . $company_domain . '.pipedrive.com/api/v1/deals';

// Title of the Deal and the ID of the label that you want it to be assigned
$data = array(
    'title' => 'Slack deal',
    'label' => 10
);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['x-api-token: ' . $api_token]);

echo 'Sending request...' . PHP_EOL;

$output = curl_exec($ch);
curl_close($ch);

// Create an array from the data that is sent back from the API
// As the original content from server is in JSON format, you need to convert it to PHP array
$result = json_decode($output, true);

// Check if the data returned in the result is not empty
if (empty($result['data'])) {
    exit('Adding failed' . PHP_EOL);
}

// Check if Deal ID came back, if it did, print out success message
if (!empty($result['data']['id'])) {
    echo 'Deal added successfully! ' . PHP_EOL;
}
```

### Adding a label through updating the Deal/Organization/Person entity

First, fetch the label option's ID by making a `GET` request to [`GET /dealFields`](https://developers.pipedrive.com/docs/api/v1/DealFields#getDealFields). This is similar to the [finding the label values section](https://pipedrive.readme.io/docs/working-with-labels#finding-label-values).

Second, update a deal by making a `PUT` request to [`PUT /deals/{id}`](https://developers.pipedrive.com/docs/api/v1/Deals#updateDeal). There you'd need to add the label ID as a part of the data like this:

```json PHP
// The ID of the label you want the deal to have.
// IDs can be changed and fetched through corresponding custom field's endpoint e.g. dealFields
$data = array(
  'label' => 10
);
```

Check out [this tutorial about updating a deal](https://developers.pipedrive.com/tutorials/update-a-deal-pipedrive-api) for more detailed help on this request.

### Adding a label when creating the Lead entity

**Authentication**
Same as with the Deal/Organization/Person entity, you need to think about how you authenticate your request to our API. You can either use an API token (see the code snippet below) or [OAuth](https://pipedrive.readme.io/docs/marketplace-oauth-api#how-to-authenticate-the-requests). For more information about authenticating your requests, see our [authentication article](https://pipedrive.readme.io/docs/core-api-concepts-authentication).  For more detailed guidance, check out [Adding a Lead](https://developers.pipedrive.com/tutorials/adding-leads-to-pipedrive) tutorial.

Use the following URL when **adding a Lead**. Replace `COMPANYDOMAIN`  with your own value.

```text URL
https://{COMPANYDOMAIN}.pipedrive.com/api/v1/leads
```

**Request body**
The title is the only required field here. The `person_id` can also be replaced by the `organization_id`.

```json JSON
{
  "title": "Superman lead",
  "person_id": 33,
  "label_ids": [
                "5e5faf00-b6e0-11ea-b5f6-45d1bda97e35",
                "5e5faf01-b6e0-11ea-b5f6-45d1bda97e35"
  ]
}
```

```javascript node.js
const pipedrive = require('pipedrive');
const defaultClient = new pipedrive.ApiClient();

// Configure authorization by settings api key
// PIPEDRIVE_API_KEY is an environment variable that holds real api key
defaultClient.authentications.api_key.apiKey = process.env.PIPEDRIVE_API_KEY;

async function addLabel(name, color) {
    console.log('Adding label...')

    const api = new pipedrive.LeadLabelsApi(defaultClient);

    const label = await api.addLeadLabel({
        name,
        color
    })
    return label.data.id
}

async function addLead() {
    try {
        console.log('Sending request...');

        const api = new pipedrive.LeadsApi()
        const redLabel = await addLabel('Custom Label 1', 'red');
        const greenlabel = await addLabel('Custom Label 2', 'green');
        const data = {
            title: 'Superman lead',
            person_id: 1,
            label_ids: [ // label_ids takes an array of label ids that you can create with addLeadLabelApi
                redLabel,
                greenlabel
            ]
        }
        const response = await api.addLead(data);

        console.log('Added lead with labels', response)
    } catch (err) {
        const errorToLog = err.context?.body || err;

        console.log('Adding failed', errorToLog);
    }
}

addLead();
```

### Adding a label when updating the Lead entity

First, fetch the Lead’s ID by making a `GET` request to [`GET /leads`](https://developers.pipedrive.com/docs/api/v1/Leads#getLeads) endpoint and the label ID(s) by making a `GET` request to [`GET /leadLabels`](https://developers.pipedrive.com/docs/api/v1/LeadLabels#getLeadLabels) endpoint.  This is similar to the [finding the label values section](https://pipedrive.readme.io/docs/working-with-labels#finding-label-values).

Second, update a lead by making a `PATCH` request to [`PATCH/leads/{id}`](https://developers.pipedrive.com/docs/api/v1/Leads#updateLead). There, you’d need to add both the Lead ID and label’s ID(s).

Use the following URL when **updating a Lead**. Replace `COMPANYDOMAIN` and `LEADID` with your own values.

```text URL
https://{COMPANYDOMAIN}.pipedrive.com/api/v1/leads/{LEADID}
```

**Request body**

```json JSON
{
  "id": "151769a0-8e17-11eb-b241-67680ba8ab9e",
  "label_ids": [
                "503293e1-8636-11eb-b535-7bc3308b2163",
                "837050a0-8d78-11eb-802a-333d26037251"
  ]
}
```

```javascript node.js
const pipedrive = require('pipedrive');
const defaultClient = new pipedrive.ApiClient();

// Configure authorization by settings api key
// PIPEDRIVE_API_KEY is an environment variable that holds real api key
defaultClient.authentications.api_key.apiKey = process.env.PIPEDRIVE_API_KEY;

async function addLabelToLead() {
    try {
        console.log('Sending request...');

        const api = new pipedrive.LeadsApi(defaultClient);

        const LEAD_ID = 'ab5ded60-4188-11ec-a3a5-2f49d1d4a1c9';
        const data = {
            label_ids: ['9e1fbed0-5420-11ec-8528-e958c9fad8e7']
        }
        const response = await api.updateLead(LEAD_ID, data);

        console.log('Label has been successfully added to lead!', response);
    } catch (err) {
        const errorToLog = err.context?.body || err;

        console.log('Adding failed', errorToLog);
    }
}

addLabelToLead()
```