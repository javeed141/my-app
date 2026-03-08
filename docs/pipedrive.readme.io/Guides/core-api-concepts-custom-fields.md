# Custom fields

Custom fields allow you to add additional data to your Pipedrive account that isn't included by default. Each **deal**, **organization**, **person**, and **product** item can contain custom fields. We have [16 different field types](https://pipedrive.readme.io/docs/core-api-concepts-custom-fields#types-of-custom-fields) available, each with its own uses.

<hr />

## Creating a custom field

<hr />

See our [creating a new custom field](https://developers.pipedrive.com/tutorials/add-custom-field-pipedrive-api) tutorial to add a custom field programmatically.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Method
      </th>

      <th>
        URL
      </th>

      <th>
        Useful for
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `POST`
      </td>

      <td>
        [`/dealFields`](https://developers.pipedrive.com/docs/api/v1/DealFields#addDealField)
      </td>

      <td>
        Adding a new deal field.

        **NB!** Leads inherit all deals’ custom fields.
      </td>
    </tr>

    <tr>
      <td>
        `POST`
      </td>

      <td>
        [`/organizationFields`](https://developers.pipedrive.com/docs/api/v1/OrganizationFields#addOrganizationField)
      </td>

      <td>
        Adding a new organization field
      </td>
    </tr>

    <tr>
      <td>
        `POST`
      </td>

      <td>
        [`/personFields`](https://developers.pipedrive.com/docs/api/v1/PersonFields#addPersonField)
      </td>

      <td>
        Adding a new person field
      </td>
    </tr>

    <tr>
      <td>
        `POST`
      </td>

      <td>
        [`/productFields`](https://developers.pipedrive.com/docs/api/v1/ProductFields#addProductField)
      </td>

      <td>
        Adding a new product field
      </td>
    </tr>
  </tbody>
</Table>

> 📘
>
> Note that custom fields cannot be duplicated to multiple different Pipedrive accounts. You can add the custom fields with the same name and field type to different accounts but they'll have different values for `key` parameters referenced in our API.

<hr />

## Naming a custom field

<hr />

All custom fields are referenced as randomly generated 40-character hashes in the dataset, for example, `dcf558aac1ae4e8c4f849ba5e668430d8df9be12` - it may look like our office cat walked across the laptop, but this actually is a key for a custom field in our API dataset.

> 🚧
>
> These 40-character custom fields (for example, `dcf558aac1ae4e8c4f849ba5e668430d8df9be12`) are not shown in our API Reference as they **differ for each Pipedrive account**, but they can be seen in the API requests and responses as well as used in the requests when adding new items or updating existing ones.

You can’t rename the reference of the custom field (the field API key), but you can rename the `name` of a custom field that’s visible to the User.

Inside Pipedrive, you can find the API key of a field by going to *Settings > Data fields* and choosing the entity (deal/person/organization/product). When you hover over the row of a custom field, a three-dot menu appears on the right-hand side. From there, choose *Copy API key*.

<Image alt="Finding the API key of a custom field" align="center" width="75% " src="https://files.readme.io/2c7026f-Pipedrive_developer_documentation_-_finding_the_API_key_of_a_custom_field.png">
  Finding the API key of a custom field
</Image>

<hr />

## Referencing a custom field

<hr />

Here’s how you use an example key for a custom field in an example `POST` request to `/deals` (make sure you replace the example key with yours before making the request):

```php
<?php
$api_token = 'Your API token goes here';
 
$deal = array (
    'title' => 'New deal with a custom field',
    'value' => '500',
    'currency' => 'USD',
    'dcf558aac1ae4e8c4f849ba5e668430d8df9be12' => 'A new field value for an existing example custom field key'
);
 
$url = 'https://companydomain.pipedrive.com/api/v1/deals';
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $deal);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['x-api-token: ' . $api_token]);

$output = curl_exec($ch);
curl_close($ch);
 
$result = json_decode($output, true); // Check if an ID came back, if did print it out
 
if (!empty($result['data']['id'])) { echo 'Deal was added successfully!' . PHP_EOL; }
```

Each custom field type corresponds to a specific data format. To determine in which format you need to submit data into a custom field, make a `GET` request for the same kind of object and check the format of the value of that field. You can find the list of `field_type` in [the table](https://pipedrive.readme.io/docs/core-api-concepts-custom-fields#types-of-custom-fields) below.

<hr />

## Updating a custom field

<hr />

See our [updating custom fields’ values](https://developers.pipedrive.com/tutorials/update-custom-field-pipedrive-api) tutorial to update a custom field programmatically.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Method
      </th>

      <th>
        URL
      </th>

      <th>
        Useful for
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `PUT`
      </td>

      <td>
        [`/dealFields/{id}`](https://developers.pipedrive.com/docs/api/v1/DealFields#updateDealField)
      </td>

      <td>
        Updating a Deal field.

        **NB!** Leads inherit all deal's custom fields.
      </td>
    </tr>

    <tr>
      <td>
        `PUT`
      </td>

      <td>
        [`/organizationFields/{id}`](https://developers.pipedrive.com/docs/api/v1/OrganizationFields#updateOrganizationField)
      </td>

      <td>
        Updating an organization field
      </td>
    </tr>

    <tr>
      <td>
        `PUT`
      </td>

      <td>
        [`/personFields/{id}`](https://developers.pipedrive.com/docs/api/v1/PersonFields#updatePersonField)
      </td>

      <td>
        Updating a person field
      </td>
    </tr>

    <tr>
      <td>
        `PUT`
      </td>

      <td>
        [`/productFields/{id}`](https://developers.pipedrive.com/docs/api/v1/ProductFields#updateProductField)
      </td>

      <td>
        Updating a product field
      </td>
    </tr>
  </tbody>
</Table>

<br />

<hr />

## Deleting a custom field

<hr />

> 🚧
>
> We don't recommend deleting a custom field, because it might permanently remove all data. In case you do delete by mistake, there's a chance that you can get it back by [contacting](https://support.pipedrive.com/en/contact-us) our awesome support people.

See our [deleting a custom field](https://developers.pipedrive.com/tutorials/delete-custom-field-pipedrive-api) tutorial to delete a custom field programmatically.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Method
      </th>

      <th>
        URL
      </th>

      <th>
        Useful for
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `DELETE`
      </td>

      <td>
        [`/dealFields/{id}`](https://developers.pipedrive.com/docs/api/v1/DealFields#deleteDealField)
      </td>

      <td>
        Marking a deal field as deleted.

        **NB!** Leads inherit all deals' custom fields.
      </td>
    </tr>

    <tr>
      <td>
        `DELETE`
      </td>

      <td>
        [`/organizationFields/{id}`](https://developers.pipedrive.com/docs/api/v1/OrganizationFields#deleteOrganizationField)
      </td>

      <td>
        Marking an organization field as deleted
      </td>
    </tr>

    <tr>
      <td>
        `DELETE`
      </td>

      <td>
        [`/personFields/{id}`](https://developers.pipedrive.com/docs/api/v1/PersonFields#deletePersonField)
      </td>

      <td>
        Marking a person field as deleted
      </td>
    </tr>

    <tr>
      <td>
        `DELETE`
      </td>

      <td>
        [`/productFields/{id}`](https://developers.pipedrive.com/docs/api/v1/ProductFields#deleteProductField)
      </td>

      <td>
        Marking a product field as deleted
      </td>
    </tr>
  </tbody>
</Table>

After a custom field is deleted, it will no longer appear in API responses. All `POST` requests mentioning a custom field will ignore it.

<hr />

## Types of custom fields

<hr />

See below the 16 different types of custom fields available:

<Table align={["left","left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Type
      </th>

      <th>
        field\_type
      </th>

      <th>
        Description
      </th>

      <th>
        Useful for
      </th>

      <th>
        Additional info
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **Text**
      </td>

      <td>
        `varchar`
      </td>

      <td>
        The text field is used to store texts up to 255 characters
      </td>

      <td>
        Billing addresses, (short) comments, email addresses
      </td>

      <td />
    </tr>

    <tr>
      <td>
        **Autocomplete**
      </td>

      <td>
        `varchar_auto`
      </td>

      <td>
        The text field is used to store texts up to 255 characters and can autocomplete from the text previously inserted into this field
      </td>

      <td>
        Custom options (e.g., tagging), email addresses
      </td>

      <td />
    </tr>

    <tr>
      <td>
        **Large text**
      </td>

      <td>
        `text`
      </td>

      <td>
        The large text field is used to store texts longer than usual
      </td>

      <td>
        Comments, descriptions
      </td>

      <td />
    </tr>

    <tr>
      <td>
        **Numerical**
      </td>

      <td>
        `double`
      </td>

      <td>
        The numeric field is used to store data such as the amount of commission or other custom numerical data
      </td>

      <td>
        Commission, priority level
      </td>

      <td>
        The value should be numeric with a maximum precision (decimal places) of 16.

        If a number exceeds the maximum precision, it will stay without the full precision.
      </td>
    </tr>

    <tr>
      <td>
        **Monetary**
      </td>

      <td>
        `monetary`
      </td>

      <td>
        The monetary field is used to store data such as the amount of commission
      </td>

      <td>
        Commission, amounts
      </td>

      <td>
        The currency of the field will match the user’s default currency setting unless specified otherwise in the request.

        The format of the field is determined by the user’s locale.
      </td>
    </tr>

    <tr>
      <td>
        **Multiple options**
      </td>

      <td>
        `set`
      </td>

      <td>
        The multiple options field lets you predefine a list of values to choose from.

        Multiple option fields can have a max of 10,000 options per field.
      </td>

      <td>
        Industry type, competitors, region
      </td>

      <td />
    </tr>

    <tr>
      <td>
        **Single option**
      </td>

      <td>
        `enum`
      </td>

      <td>
        The single option field lets you predefine a list of values out of which one can be selected.

        Single option fields can have a max of 10,000 options per field.
      </td>

      <td>
        Lead type, category, industry
      </td>

      <td />
    </tr>

    <tr>
      <td>
        **User**
      </td>

      <td>
        `user`
      </td>

      <td>
        The user field can contain one user amongst users of your Pipedrive account
      </td>

      <td>
        Tech contacts, previous deal owners
      </td>

      <td />
    </tr>

    <tr>
      <td>
        **Organization**
      </td>

      <td>
        `org`
      </td>

      <td>
        The organization field can contain one organization out of all the organizations stored on your Pipedrive account
      </td>

      <td>
        Related parties, partner organizations
      </td>

      <td />
    </tr>

    <tr>
      <td>
        **Person**
      </td>

      <td>
        `people`
      </td>

      <td>
        The person field can contain one person out of all the people stored on your Pipedrive account
      </td>

      <td>
        Related parties, tech contacts
      </td>

      <td />
    </tr>

    <tr>
      <td>
        **Phone**
      </td>

      <td>
        `phone`
      </td>

      <td>
        A phone number field can contain a phone number (naturally) or a Skype Name with a click-to-call functionality
      </td>

      <td>
        Skype names, phone numbers
      </td>

      <td>
        No auto-formatting unless enabled from the User Interface (supports only the US phone format)
      </td>
    </tr>

    <tr>
      <td>
        **Time**
      </td>

      <td>
        `time`
      </td>

      <td>
        The time field is used to store times, picked from a handy inline time picker
      </td>

      <td>
        Delivery times, lunchtime
      </td>

      <td />
    </tr>

    <tr>
      <td>
        **Time range**
      </td>

      <td>
        `timerange`
      </td>

      <td>
        The time range field is used to store time ranges picked from a handy inline time picker
      </td>

      <td>
        Office hours, the best time to contact
      </td>

      <td />
    </tr>

    <tr>
      <td>
        **Date**
      </td>

      <td>
        `date`
      </td>

      <td>
        Date field is used to store dates picked from a handy inline calendar
      </td>

      <td>
        Delivery dates, deadlines
      </td>

      <td>
        The format of the field is determined by the user’s locale
      </td>
    </tr>

    <tr>
      <td>
        **Date range**
      </td>

      <td>
        `daterange`
      </td>

      <td>
        The date range field is used to store date ranges picked from a handy inline calendar
      </td>

      <td>
        Event dates, completion estimates
      </td>

      <td />
    </tr>

    <tr>
      <td>
        **Address**
      </td>

      <td>
        `address`
      </td>

      <td>
        Address field is used to store addresses
      </td>

      <td>
        Event places, office locations (when separate from business address)
      </td>

      <td>
        The address field can hold all parts of address components – including City, tate, Zip Code, and Country – so there’s no need to create separate address fields for each address component.

        You can use Google Maps autocomplete textfield to enter addresses and visualize them on a map. You’ll also be able to filter items based on specific address criteria.
      </td>
    </tr>
  </tbody>
</Table>

\**Doesn’t link the item with the user, person, or organization for statistics or any other form of ownership or relation, but can be used for filtering.*

<hr />

## How to find out if a field is a custom field

<hr />

The `edit_flag` parameter in the response body of an entity’s fields can be used to identify if the field is a custom field:

* `true` – a custom field
* `false` – Pipedrive default field

```json JSON
{
  id: 12499,
  key: '123456789',
  name: 'Date',
  order_nr: 47,
  field_type: 'date',
  json_column_flag: true,
  add_time: '2023-03-02 02:14:54',
  update_time: '2023-03-02 02:14:54',
  last_updated_by_user_id: 13053568,
  edit_flag: true,
  details_visible_flag: true,
  add_visible_flag: false,
  important_flag: true,
  bulk_edit_allowed: true,
  filtering_allowed: true,
  sortable_flag: true,
  mandatory_flag: false,
  active_flag: true,
  projects_detail_visible_flag: false,
  index_visible_flag: true,
  searchable_flag: false
},
```

<hr />

## Custom fields created by Contact Sync

<hr />

When a user first sets up Contact Sync, five new custom fields (Instant messenger, Postal address, Notes, Birthday, Job title) are created for the entire company. These fields are similar to the default Pipedrive fields as they have a field API key that follows the syntax of all default Pipedrive API keys (field name, with an underscore replacing each space), unlike [user-generated custom fields](https://pipedrive.readme.io/docs/core-api-concepts-custom-fields#naming-a-custom-field).

Here are the five custom fields created by Contact Sync:

| Field name        | Type       | Show in Add new dialog | Show in detail view | Field API key    | Additional info                                                                                                                                              |
| :---------------- | :--------- | :--------------------- | :------------------ | :--------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Instant messenger | Varchar    | *by default:* No       | *by default:* No    | `im`             | Although this is a text field, it accepts an array of objects. ([See example below](https://pipedrive.readme.io/docs/core-api-concepts-custom-fields#instant-messenger-field-and-labels)) |
| Postal address    | Address    | *by default:* No       | *by default:* No    | `postal_address` |                                                                                                                                                              |
| Notes             | Large Text | *by default:* No       | *by default:* No    | `notes`          |                                                                                                                                                              |
| Birthday          | Date       | *by default:* No       | *by default:* No    | `birthday`       |                                                                                                                                                              |
| Job title         | Text       | *by default:* No       | *by default:* No    | `job_title`      |                                                                                                                                                              |

You can also see these fields in the Pipedrive web app by going to *Settings > (Company) > Data fields > Person*. It’s not possible to add any other fields to Contact Sync.

#### Contact Sync and custom fields duplication

Contact Sync directly affects these five fields, as the data for these fields is updated every time the Contact Sync source is updated. As such, when using these fields, please note that they may be duplicated by users who create custom fields with the same name. This can cause issues where the field names match, but the API keys do not because one has a Pipedrive API key and the other has a [40-character hashed API key](https://pipedrive.readme.io/docs/core-api-concepts-custom-fields#naming-a-custom-field). Therefore, a user may have two fields with different information in them.

#### Instant messenger field and labels

The instant messenger field (field key `im`) is a text field that accepts an array of objects. Do note that multiple `labels `are available for the different instant messengers, for example, `Google`, `AIM`, `Yahoo`, `Skype`, etc.

Here is an example of what an array for this field could look like:

```json
[
  {
    "label": "google",
    "value": "person1@companyname.com",
    "primary": true
  },
  {
    "label": "aim",
    "value": "person1@companyname.com",
    "primary": false
  }
]
```