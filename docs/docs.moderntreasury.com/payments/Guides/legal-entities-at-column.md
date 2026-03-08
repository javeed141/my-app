# Legal Entities at Column

Details about Legal Entity support at Column

Modern Treasury integrates with Column's [Entity](https://column.com/docs/api/#entity/object) API. This guide describes capabilities and limitations of sending Legal Entity data to Column.

**Note: This is not supported in our sandbox environment**

# Field Support Exceptions

Modern Treasury supports accepting most required fields by Column, with the exception of the following fields:

## Individuals

| Type                | Fields Not Supported                                                                                                                   |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------- |
| **Identifications** | Currently driver's licenses and national IDs are not supported; these are other options in addition to passports, for non-US citizens. |

## Businesses

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Type
      </th>

      <th>
        Fields Not Supported
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **Identifications**
      </td>

      <td>
        Currently registration IDs are not supported; these are used for non-US businesses.
      </td>
    </tr>

    <tr>
      <td>
        **Structure**
      </td>

      <td>
        Modern Treasury has a field for partnership, and column has fields for limited partnership and general partnership. Column has fields for professional association, government, and other, which Modern Treasury currently does not support.

        MT `legal_structure` mapping to Column's `legal_type`:\
        `corporation` -> `corporation`\
        `llc` ->  `llc`\
        `partnership` -> `general-partnership`\
        `sole_proprietorship` -> `sole-proprietorship`\
        `trust` -> `trust`\
        `non_profit` -> `non-profit`
      </td>
    </tr>
  </tbody>
</Table>

# Workflow Support Exceptions

| Type          | Notes                                                                                                                                                                                        |
| :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Status**    | Modern Treasury currently supports only some, but not all, statuses from Column. In particular, Modern Treasury does not support the status of manual review or passing back review reasons. |
| **Documents** | Modern Treasury does not currently support submissions of documents to Column.                                                                                                               |

# Other Exceptions

Modern Treasury does not currently support creating root entities in Column. You can do this using Column's APIs or in their dashboard.