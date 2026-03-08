# Legal Entities at Increase

Details about Legal Entity support at Increase

Modern Treasury integrates with Increase's [Entity](https://increase.com/documentation/api#entities) API. This guide describes capabilities and limitations of sending Legal Entity data to Increase.

**Note: This is supported in our sandbox environment**

# General Requirements

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Requirement
      </th>

      <th>
        Notes
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **Name**
      </td>

      <td>
        Depending on the type of `LegalEntity`, this could either be:

        * `business_name`
        * `first_name` and `last_name`
        * `joint_name`
      </td>
    </tr>

    <tr>
      <td>
        **Address**
      </td>

      <td>
        All types of `LegalEntities` created at Increase require a valid address.
      </td>
    </tr>

    <tr>
      <td>
        **Identification**
      </td>

      <td>
        Business and  individual `LegalEntities` require at least one valid form of Identification.

        For businesses, the identification must be of type: `us_ein`; however, any type is accepted for individuals.
      </td>
    </tr>
  </tbody>
</Table>

# Specific Requirements by Legal Entity `type`

In addition to the general requirements listed above, a Legal Entity may also require other certain data dependent on its `type`.

## Business

| Requirement                                     | Description                                                                                                                                                                                                                              |
| :---------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| At least one beneficial owner or control person | There must be at least one Legal Entity Association of type `beneficial_owner` or `control_person` where the business Legal Entity being created is the `parent_legal_entity` and an individual Legal Entity is the `child_legal_entity` |

## Joint

| Requirement                                       | Description                                                                                                                                                                                                                               |
| :------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| At least two beneficial owners or control persons | There must be at least two Legal Entity Associations of type `beneficial_owner` or `control_person` where the business Legal Entity being created is the `parent_legal_entity` and an individual Legal Entity is the `child_legal_entity` |

## Individual

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Requirement
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Date of birth
      </td>

      <td>
        This would be populated in the `date_of_birth` field
      </td>
    </tr>

    <tr>
      <td>
        A photo of the identification
      </td>

      <td>
        If creating a Legal Entity with an identification that does not have `type: us_ssn` or `type: us_itin`, a valid photo of the front of the identification's document must be also be uploaded.

        This is described in more detail below in the **Uploading an Identification File** section
      </td>
    </tr>
  </tbody>
</Table>

# Uploading a File to Increase

If an individual Legal Entity does not have a `us_ssn` or `us_itin` identification, a valid photo of the front of the identification must be uploaded prior to creating the Legal Entity at Increase. Although Modern Treasury supports creating a Legal Entity inline when creating a Connection Legal Entity, so that it may be done in one API call, the process of sharing Legal Entity data with a banking partner becomes three distinct calls when having to upload a document for the identification.

## 1. Create a Legal Entity

Create a Legal Entity as usual with the identification of choice. Our [**Create a Legal Entity** page](https://dash.readme.com/project/moderntreasury-payments/v1.1/docs/create-a-legal-entity) has examples of requests.

Save the IDs of the Legal Entity object and its Identification object returned in the response as they will be needed in the future.

## 2. Upload a Document for that Legal Entity's Identification

Make sure to pass in the the ID of the Identification from the Legal Entity response as `documentable_id`, and the `documentable_type` must be `"identification"`. Here is an example request:

```curl Document Request
curl --request POST \
  -u ORG_ID:API_KEY \
  --url https://app.moderntreasury.com/api/documents \
  --header 'Content-Type: multipart/form-data'
  --form 'documentable_id="identification_id_from_earlier"'
  --form 'documentable_type="identification"'
  --form 'document_type="identification_document"'
  --form '@file=@/Users/path/to/file'
```

```json Document Example
{
  "id": "b05dd054-6eea-4cdd-9096-cf3fa8eb6fb7",
  "object": "document",
  "source": "customer",
  "document_type": "identification_document",
  "documentable_id": "00ddb900-317f-4436-8b79-6329c924ef27",
  "documentable_type": "identification",
  "file": {
    "size": 1558074,
    "filename": "passport_photo.pdf",
    "content_type": "application/pdf"
  },
  "document_details": [],
  "live_mode": true,
  "created_at": "2025-02-10T15:58:59Z",
  "updated_at": "2025-02-10T15:58:59Z"
}
```

## 3. Create the Connection Legal Entity using the previously created Legal Entity ID

```curl Request with Legal Entity ID
curl --request POST \
  -u ORG_ID:API_KEY \
  --url https://app.moderntreasury.com/api/connection_legal_entities \
  -H 'content-type: application/json' \
  -d '{
    "connection_id": "73140ffe-fbde-4514-b985-f96c0e336192",
    "legal_entity_id": "5d95643d-1127-4a7c-9ef5-ad21a1d007c6"
  }'
```

This will also upload the identification document to Increase and complete all the requirements needed to create a Legal Entity there.

# Field Support Exceptions

Modern Treasury supports accepting most fields supported at Increase to create Legal Entities with the exception of the following:

| Field                      |
| :------------------------- |
| `description`              |
| `supplemental_documents`   |
| `third_party_verification` |

# Workflow Support Exceptions

| Type                       | Notes                                                                                                                     |
| :------------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| **Type of Legal Entities** | Modern Treasury currently does not support creating an Increase Entity of `type: government_authority` or  `type: trust`. |
| **Updates**                | Modern Treasury currently does not support updates of entity information at Increase.                                     |