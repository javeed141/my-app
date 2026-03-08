# Scopes and permission explanations

Every time you create an app for the Pipedrive Marketplace, you'll need to determine what kind of user-related data you need access to. We use scopes for that.

**Scopes** are used to limit an app's access to user-related data and they'll let you specify exactly what kind of access you need.

On the other hand, it's also important for the user to know exactly what the app can and cannot do with the data in their Pipedrive account. Once a user permits access to their data, each scope will define the endpoints the app has access to.

<Callout icon="🚧" theme="warn">
  The user has the option to **either accept or deny all scopes**. Because of this, it's a good idea to **build apps that only request scopes that are absolutely necessary** for your particular use case.
</Callout>

<Callout icon="📘" theme="info">
  If you need to **change the scopes** of an already existing app, be sure to read more about how it can affect your app's users [here](https://pipedrive.readme.io/docs/marketplace-updating-the-existing-app#changing-the-scopes).
</Callout>

<hr />

## List of scopes

<hr />

Here's our mapping of API endpoints to access scopes:

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Scope
      </th>

      <th>
        Name in Developer Hub with description
      </th>

      <th>
        Endpoints grouped under this scope
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        base
      </td>

      <td>
        **Access to basic information**
        Read the settings of the authorized user and currencies in an account.
        :warning: *This is the default permission that is always enabled for all apps.*
      </td>

      <td>
        GET /users/me\
        GET /userConnections\
        GET /userSettings\
        GET /currencies
      </td>
    </tr>

    <tr>
      <td>
        deals:read
      </td>

      <td>
        **Deals: Read only**
        Read most of the data about deals and related entities - deal fields, products, followers, participants; all notes, files, filters, pipelines, stages, and statistics. Does not include access to activities (except the last and next activity related to a deal).
      </td>

      <td>
        GET /deals/products\
        GET /deals/search\
        GET /deals/timeline\
        GET /deals/timeline/archived\
        GET /deals/\{id}\
        GET /deals\
        GET /deals/collection\
        GET /deals/archived\
        GET /dealFields\
        GET /dealFields/\{id} (API v1)\
        GET /dealFields/\{fieldCode} (API v2)\
        GET /deals/\{id}/files\
        GET /deals/\{id}/participantsChangelog\
        GET /persons/\{id}/deals\
        GET /pipelines/\{id}/deals\
        GET /pipelines/\{id}/conversion\_statistics\
        GET /pipelines/\{id}/movement\_statistics\
        GET /products/\{id}/deals\
        GET /notes\
        GET /notes/\{id}\
        GET /notes/\{id}/comments\
        GET /notes/\{id}/comments/\{commentId}\
        GET /noteFields\
        GET /deals/\{id}/followers\
        GET /deals/\{id}/followers/changelog\
        GET /deals/\{id}/permittedUsers\
        GET /files\
        GET /files/\{id}\
        GET /files/\{id}/download\
        GET /deals/\{id}/participants\
        GET /stages\
        GET /stages/\{id}\
        GET /stages/\{id}/deals\
        GET /pipelines\
        GET /pipelines/\{id}\
        GET /filters\
        GET /filters/\{id}\
        GET /filters/helpers\
        GET /organizations/\{id}/deals\
        GET /deals/summary\
        GET /deals/summary/archived\
        GET /subscriptions/\{id}\
        GET /subscriptions/find/\{id}\
        GET /subscriptions/\{id}/payments\
        GET /deals/\{id}/discounts\
        GET /deals/\{id}/discounts/\{id}\
        GET /deals/\{id}/convert/status/\{conversion\_id}\
        GET /deals/installments
      </td>
    </tr>

    <tr>
      <td>
        deals:full
      </td>

      <td>
        **Deals: Full access**
        Create, read, update and delete deals, its participants and followers; all files, notes, and filters. It also includes read access to deal fields, pipelines, stages, and statistics. Does not include access to activities (except the last and next activity related to a deal).
      </td>

      <td>
        POST /deals\
        POST /deals/\{id}/duplicate\
        PUT /deals/\{id}\
        PUT /deals/\{id}/merge\
        PATCH /deals/\{id}\
        DELETE /deals/\{id}\
        POST /files/remote\
        POST /files/remoteLink\
        POST /deals/\{id}/followers\
        POST /deals/\{id}/products\
        POST /deals/\{id}/products/bulk\
        DELETE /deals/\{id}/products\
        DELETE /deals/\{id}/products/\{product\_attachment\_id}\
        PUT /deals/\{id}/products/\{product\_attachment\_id}\
        PATCH /deals/\{id}/products/\{product\_attachment\_id}\
        POST /notes\
        PUT /notes/\{id}\
        DELETE /notes/\{id}\
        POST /files\
        POST /notes/\{id}/comments\
        PUT /notes/\{id}/comments/\{commentId}\
        DELETE /notes/\{id}/comments/\{commentId}\
        POST /files\
        PUT /files/\{id}\
        DELETE /files/\{id}\
        POST /deals/\{id}/participants\
        POST /filters\
        PUT /filters/\{id}\
        DELETE /filters\
        DELETE /filters/\{id}\
        GET /deals/collection\
        GET /deals/products\
        GET /deals/search\
        GET /deals/summary\
        GET /deals/summary/archived\
        GET /deals/timeline\
        GET /deals/timeline/archived\
        GET /deals/\{id}\
        GET /deals\
        GET /deals/archived\
        GET /dealFields\
        GET /dealFields/\{id} (API v1)\
        GET /dealFields/\{fieldCode} (API v2)\
        GET /deals/\{id}/files\
        GET /deals/\{id}/participantsChangelog\
        GET /persons/\{id}/deals\
        GET /pipelines/\{id}/deals\
        GET /pipelines/\{id}/conversion\_statistics\
        GET /pipelines/\{id}/movement\_statistics\
        GET /products/\{id}/deals\
        GET /notes\
        GET /notes/\{id}\
        GET /notes/\{id}/comments\
        GET /notes/\{id}/comments/\{commentId}\
        GET /noteFields\
        GET /deals/\{id}/followers\
        GET /deals/\{id}/followers/changelog\
        GET /deals/\{id}/permittedUsers\
        GET /files\
        GET /files/\{id}\
        GET /files/\{id}/download\
        GET /deals/\{id}/participants\
        GET /stages\
        GET /stages/\{id}\
        GET /stages/\{id}/deals\
        GET /pipelines\
        GET /pipelines/\{id}\
        GET /filters\
        GET /filters/\{id}\
        GET /filters/helpers\
        GET /organizations/\{id}/deals\
        GET /subscriptions/\{id}\
        GET /subscriptions/find/\{id}\
        GET /subscriptions/\{id}/payments\
        GET /deals/\{id}/discounts\
        GET /deals/\{id}/discounts/\{id}\
        POST /deals/\{id}/discounts\
        PATCH /deals/\{id}/discounts/\{id}\
        DELETE /deals/\{id}/discounts/\{id}\
        DELETE /subscriptions/\{id}\
        POST /subscriptions/installment\
        POST /subscriptions/recurring\
        PUT /subscriptions/installment/\{id}\
        PUT /subscriptions/recurring/\{id}\
        PUT /subscriptions/recurring/\{id}/cancel\
        DELETE /deals/\{id}/followers/\{id}\
        DELETE /deals/\{id}/participants/\{id}\
        POST /deals/\{id}/convert/lead\
        GET /deals/\{id}/convert/status/\{conversion\_id}\
        GET /deals/installments\
        POST /deals/\{id}/installments\
        PATCH /deals/\{id}/installments/\{installment\_id}\
        DELETE /deals\{id}/installments\{installment\_id}
      </td>
    </tr>

    <tr>
      <td>
        mail:read
      </td>

      <td>
        **Mail: Read only**
        Read mail threads and messages.
      </td>

      <td>
        GET /deals/\{id}/mailMessages\
        GET /mailbox/mailMessages/\{id}\
        GET /mailbox/mailThreads\
        GET /mailbox/mailThreads/\{id}\
        GET /mailbox/mailThreads/\{id}/mailMessages\
        GET /persons/\{id}/mailMessages\
        GET /organizations/\{id}/mailMessages
      </td>
    </tr>

    <tr>
      <td>
        mail:full
      </td>

      <td>
        **Mail: Full access**
        Read, update and delete mail threads. Also grants read access to mail messages.
      </td>

      <td>
        PUT /mailbox/mailThreads/\{id}\
        DELETE /mailbox/mailThreads/\{id}\
        GET /deals/\{id}/mailMessages\
        GET /mailbox/mailMessages/\{id}\
        GET /mailbox/mailConnections\
        GET /mailbox/mailThreads\
        GET /mailbox/mailThreads/\{id}\
        GET /mailbox/mailThreads/\{id}/mailMessages\
        GET /persons/\{id}/mailMessages\
        GET /organizations/\{id}/mailMessages
      </td>
    </tr>

    <tr>
      <td>
        activities:read
      </td>

      <td>
        **Activities: Read only**
        Read activities, its fields and types; all files and filters.
      </td>

      <td>
        GET /activities\
        GET /activities/collection\
        GET /activities/\{id}\
        GET /activityFields\
        GET /activityFields/\{fieldCode}\
        GET /activityTypes\
        GET /deals/\{id}/activities\
        GET /persons/\{id}/activities\
        GET /files\
        GET /files/\{id}\
        GET /files/\{id}/download\
        GET /filters\
        GET /filters/\{id}\
        GET /filters/helpers\
        GET /organizations/\{id}/activities\
        GET /users/\{id}/activities
      </td>
    </tr>

    <tr>
      <td>
        activities:full
      </td>

      <td>
        **Activities: Full access**
        Create, read, update and delete activities and all files and filters. Also includes read access to activity fields and types.
      </td>

      <td>
        POST /activities\
        PUT /activities/\{id}\
        PATCH /activities/\{id}\
        DELETE /activities/\{id}\
        POST /files/remote\
        POST /files/remoteLink\
        POST /files\
        PUT /files/\{id}\
        DELETE /files/\{id}\
        POST /filters\
        PUT /filters/\{id}\
        DELETE /filters\
        DELETE /filters/\{id}\
        GET /activities\
        GET /activities/collection\
        GET /activities/\{id}\
        GET /activityFields\
        GET /activityFields\{fieldCode}\
        GET /activityTypes\
        GET /deals/\{id}/activities\
        GET /persons/\{id}/activities\
        GET /files\
        GET /files/\{id}\
        GET /files/\{id}/download\
        GET /filters\
        GET /filters/\{id}\
        GET /filters/helpers\
        GET /organizations/\{id}/activities\
        GET /users/\{id}/activities
      </td>
    </tr>

    <tr>
      <td>
        contacts:read
      </td>

      <td>
        **Contacts: Read only**
        Read the data about persons and organizations, their related fields and followers; also all notes, files, filters.
      </td>

      <td>
        GET /deals/\{id}/persons\
        GET /persons/search\
        GET /persons/\{id}\
        GET /persons/\{id}/files\
        GET /persons/\{id}/products\
        GET /persons\
        GET /persons/collection\
        GET /personFields\
        GET /personFields/\{id} (API v1)\
        GET /personFields/\{fieldCode} (API v2)\
        GET /persons/\{id}/followers\
        GET /persons/\{id}/followers/changelog\
        GET /persons/\{id}/permittedUsers\
        GET /organizationFields\
        GET /organizationFields/\{id} (API v1)\
        GET /organizationFields/\{fieldCode} (API v2)\
        GET /organizations/\{id}/files\
        GET /organizations/\{id}/persons\
        GET /organizations/search\
        GET /organizations/\{id}\
        GET /organizations\
        GET /organizations/collection\
        GET /organizationRelationships\
        GET /organizationRelationships/\{id}\
        GET /organizations/\{id}/followers\
        GET /organizations/\{id}/followers/changelog\
        GET /organizations/\{id}/permittedUsers\
        GET /notes\
        GET /notes/\{id}\
        GET /notes/\{id}/comments\
        GET /notes/\{id}/comments/\{commentId}\
        GET /noteFields\
        GET /files\
        GET /files/\{id}\
        GET /files/\{id}/download\
        GET /filters\
        GET /filters/\{id}\
        GET /filters/helpers
      </td>
    </tr>

    <tr>
      <td>
        contacts:full
      </td>

      <td>
        **Contacts: Full access**
        Create, read, update and delete persons and organizations and their followers; all notes, files, filters. Also grants read access to contacts-related fields.
      </td>

      <td>
        POST /persons\
        POST /persons/\{id}/picture\
        PUT /persons/\{id}\
        PATCH /persons/\{id}\
        PUT /persons/\{id}/merge\
        DELETE /persons/\{id}\
        DELETE /persons/\{id}/picture\
        POST /persons/\{id}/followers\
        DELETE /persons/\{id}/followers/\{follower\_id}\
        POST /files/remote\
        POST /files/remoteLink\
        POST /organizations\
        PUT /organizations/\{id}\
        PATCH /organizations/\{id}\
        PUT /organizations/\{id}/merge\
        DELETE /organizations/\{id}\
        POST /organizationRelationships\
        PUT /organizationRelationships/\{id}\
        DELETE /organizationRelationships/\{id}\
        POST /organizations/\{id}/followers\
        DELETE /organizations/\{id}/followers/\{follower\_id}\
        POST /notes\
        PUT /notes/\{id}\
        DELETE /notes/\{id}\
        POST /files\
        PUT /files/\{id}\
        DELETE /files/\{id}\
        POST /filters\
        PUT /filters/\{id}\
        DELETE /filters\
        DELETE /filters/\{id}\
        GET /deals/\{id}/persons\
        GET /persons/search\
        GET /persons/\{id}\
        GET /persons/\{id}/files\
        GET /persons/\{id}/products\
        GET /persons\
        GET /persons/collection\
        GET /personFields\
        GET /personFields/\{id} (API v1)\
        GET /personFields/\{fieldCode} (API v2)\
        GET /persons/\{id}/followers\
        GET /persons/\{id}/followers/changelog\
        GET /persons/\{id}/permittedUsers\
        GET /organizationFields\
        GET /organizationFields/\{id} (API v1)\
        GET /organizationFields/\{fieldCode} (API v2)\
        GET /organizations/\{id}/files\
        GET /organizations/\{id}/persons\
        GET /organizations/search\
        GET /organizations/\{id}\
        GET /organizations\
        GET /organizations/collection\
        GET /organizationRelationships\
        GET /organizationRelationships/\{id}\
        GET /organizations/\{id}/followers\
        GET /organizations/\{id}/followers/changelog\
        GET /organizations/\{id}/permittedUsers\
        GET /notes\
        GET /notes/\{id}\
        GET /notes/\{id}/comments\
        GET /notes/\{id}/comments/\{commentId}\
        GET /noteFields\
        GET /files\
        GET /files/\{id}\
        GET /files/\{id}/download\
        GET /filters\
        GET /filters/\{id}\
        GET /filters/helpers
      </td>
    </tr>

    <tr>
      <td>
        products:read
      </td>

      <td>
        **Products: Read only**
        Read products, its fields, files, followers and products connected to a deal.
      </td>

      <td>
        GET /deals/\{id}/products\
        GET /products\
        GET /products/search\
        GET /products/\{id}\
        GET /products/\{id}/files\
        GET /products/\{id}/images\
        GET /productFields\
        GET /productFields/\{id} (API v1)\
        GET /productFields/\{fieldCode} (API v2)\
        GET /products/\{id}/followers\
        GET /products/\{id}/followers/changelog\
        GET /products/\{id}/permittedUsers\
        GET /products/\{id}/variations
      </td>
    </tr>

    <tr>
      <td>
        products:full
      </td>

      <td>
        **Products: Full access**
        Create, read, update and delete products and its fields; add products to deals.
      </td>

      <td>
        POST /products\
        PUT /products/\{id}\
        PATCH /products/\{id}\
        PUT /products/\{id}/images\
        POST /productFields\
        PUT /productFields/\{id}\
        PATCH /products/\{id}/variations/\{id}\
        POST /products/\{id}/followers\
        POST /products/\{id}/images\
        POST /products/\{id}/variations\
        POST /deals/\{id}/products\
        POST /deals/\{id}/products/bulk\
        PATCH /deals/\{id}/products/\{product\_attachment\_id}\
        GET /deals/\{id}/products\
        GET /products\
        GET /products/search\
        GET /products/\{id}\
        GET /products/\{id}/files\
        GET /products/\{id}/images\
        GET /productFields\
        GET /productFields/\{id} (API v1)\
        GET /productFields/\{fieldCode} (API v2)\
        GET /products/\{id}/followers\
        GET /products/\{id}/followers/changelog\
        GET /products/\{id}/permittedUsers\
        GET /products/\{id}/variations\
        DELETE /products/\{id}\
        DELETE /products/\{id}/images\
        DELETE /productFields\
        DELETE /productFields/\{id} (API v1)\
        DELETE /productFields/\{fieldCode} (API v2)\
        PATCH /productFields/\{fieldCode}\
        POST /productFields/\{fieldCode}/options\
        PATCH /productFields/\{fieldCode}/options\
        DELETE /productFields/\{fieldCode}/options\
        DELETE /deals/\{id}/products/\{product\_attachment\_id}\
        DELETE /deals/\{id}/products\
        DELETE /products/\{id}/followers/\{follower\_id}\
        DELETE /products/\{id}/variations/\{id}
      </td>
    </tr>

    <tr>
      <td>
        deal-fields:full
      </td>

      <td>
        **Deal fields: Full access**
        Create, read, update and delete deal fields.
      </td>

      <td>
        GET /dealFields\
        GET /dealFields/\{id} (API v1)\
        GET /dealFields/\{fieldCode} (API v2)\
        POST /dealFields\
        PUT /dealFields/\{id}\
        PATCH /dealFields/\{fieldCode}\
        DELETE /dealFields\
        DELETE /dealFields/\{id} (API v1)\
        DELETE /dealFields/\{fieldCode} (API v2)\
        POST /dealFields/\{fieldCode}/options\
        PATCH /dealFields/\{fieldCode}/options\
        DELETE /dealFields/\{fieldCode}/options
      </td>
    </tr>

    <tr>
      <td>
        product-fields:full
      </td>

      <td>
        **Product fields: Full access**
        Create, read, update and delete product fields
      </td>

      <td>
        GET /productFields\
        GET /productFields/\{id} (API v1)\
        GET /productFields/\{fieldCode} (API v2)\
        POST /productFields\
        PUT /productFields/\{id}\
        PATCH /productFields/\{fieldCode}\
        DELETE /productFields\
        DELETE /productFields/\{id} (API v1)\
        DELETE /productFields/\{fieldCode} (API v2)\
        POST /productFields/\{fieldCode}/options\
        PATCH /productFields/\{fieldCode}/options\
        DELETE /productFields/\{fieldCode}/options
      </td>
    </tr>

    <tr>
      <td>
        contact-fields:full
      </td>

      <td>
        **Contact fields: Full access**
        Create, read, update and delete person and organization fields.
      </td>

      <td>
        GET /personFields\
        GET /personFields/\{id} (API v1)\
        GET /personFields/\{fieldCode} (API v2)\
        POST /personFields\
        PUT /personFields/\{id}\
        PATCH /personFields/\{fieldCode}\
        DELETE /personFields\
        DELETE /personFields/\{id} (API v1)\
        DELETE /personFields/\{fieldCode} (API v2)\
        POST /personFields/\{fieldCode}/options\
        PATCH /personFields/\{fieldCode}/options\
        DELETE /personFields/\{fieldCode}/options\
        GET /organizationFields\
        GET /organizationFields/\{id} (API v1)\
        GET /organizationFields/\{fieldCode} (API v2)\
        POST /organizationFields\
        PUT /organizationFields/\{id}\
        PATCH /organizationFields/\{fieldCode}\
        DELETE /organizationFields\
        DELETE /organizationFields/\{id} (API v1)\
        DELETE /organizationFields/\{fieldCode} (API v2)\
        POST /organizationFields/\{fieldCode}/options\
        PATCH /organizationFields/\{fieldCode}/options\
        DELETE /organizationFields/\{fieldCode}/options
      </td>
    </tr>

    <tr>
      <td>
        users:read
      </td>

      <td>
        **Read users data**
        Read data about users (people with access to a Pipedrive account), their permissions, roles and followers.
      </td>

      <td>
        GET /users\
        GET /users/\{id}\
        GET /users/find\
        GET /users/\{id}/followers\
        GET /users/\{id}/roleSettings\
        GET /users/\{id}/permissions\
        GET /legacyTeams\
        GET /legacyTeams/\{id}\
        GET /legacyTeams/\{id}/users\
        GET /legacyTeams/users/\{id}\
        GET /users/\{id}/roleAssignments\
        GET /billing/subscriptions/addons
      </td>
    </tr>

    <tr>
      <td>
        recents:read
      </td>

      <td>
        **See recent account activity**
        Read all recent changes occurred in an account. Includes data about activities, activity types, deals, files, filters, notes, persons, organizations, pipelines, stages, products and users.
      </td>

      <td>
        GET /recents\
        GET /deals/\{id}/flow\
        GET /persons/\{id}/flow\
        GET /organizations/\{id}/flow\
        GET /deals/\{id}/changelog\
        GET /persons/\{id}/changelog\
        GET /organizations/\{id}/changelog
      </td>
    </tr>

    <tr>
      <td>
        search:read
      </td>

      <td>
        **Search for all data**
        Search across the account for deals, persons, organizations, files and products, and see details about the returned results.
      </td>

      <td>
        GET /recents\
        GET /deals/search\
        GET /leads/search\
        GET /products/search\
        GET /persons/search\
        GET /organizations/search\
        GET /itemSearch\
        GET /itemSearch/field
      </td>
    </tr>

    <tr>
      <td>
        admin
      </td>

      <td>
        **Administer account**
        Allows to do many things that an administrator can do in a Pipedrive company account - create, read, update and delete pipelines and its stages; deal, person and organization fields; activity types; users and permissions, etc. It also allows the app to create webhooks and fetch and delete webhooks that are created by the app.

        **Before requesting this scope, see [below](https://pipedrive.readme.io/docs/marketplace-scopes-and-permissions-explanations#permission-set-effect-on-admin-scope) how it can effect non-admin users.**
      </td>

      <td>
        POST /stages\
        PUT /stages/\{id}\
        PATCH /stages/\{id}\
        DELETE /stages/\{id}\
        POST /pipelines\
        PUT /pipelines/\{id}\
        PATCH /pipelines/\{id}\
        DELETE /pipelines/\{id}\
        GET /webhooks\
        POST /webhooks\
        DELETE /webhooks/\{id}\
        POST /users\
        PUT /users/\{id}\
        POST /dealFields\
        PUT /dealFields/\{id}\
        DELETE /dealFields\
        DELETE /dealFields/\{id} (API v1)\
        DELETE /dealFields/\{fieldCode} (API v2)\
        PATCH /dealFields/\{fieldCode}\
        POST /dealFields/\{fieldCode}/options\
        PATCH /dealFields/\{fieldCode}/options\
        DELETE /dealFields/\{fieldCode}/options\
        POST /activityTypes\
        PUT /activityTypes/\{id}\
        DELETE /activityTypes/\{id}\
        POST /personFields\
        PUT /personFields/\{id}\
        DELETE /personFields\
        DELETE /personFields/\{id} (API v1)\
        DELETE /personFields/\{fieldCode} (API v2)\
        PATCH /personFields/\{fieldCode}\
        POST /personFields/\{fieldCode}/options\
        PATCH /personFields/\{fieldCode}/options\
        DELETE /personFields/\{fieldCode}/options\
        POST /organizationFields\
        PUT /organizationFields/\{id}\
        DELETE /organizationFields\
        DELETE /organizationFields/\{id} (API v1)\
        DELETE /organizationFields/\{fieldCode} (API v2)\
        PATCH /organizationFields/\{fieldCode}\
        POST /organizationFields/\{fieldCode}/options\
        PATCH /organizationFields/\{fieldCode}/options\
        DELETE /organizationFields/\{fieldCode}/options\
        GET /stages\
        GET /stages/\{id}\
        GET /pipelines\
        GET /pipelines/\{id}\
        GET /dealFields\
        GET /dealFields/\{id} (API v1)\
        GET /dealFields/\{fieldCode} (API v2)\
        GET /activityTypes\
        GET /personFields\
        GET /personFields/\{id} (API v1)\
        GET /personFields/\{fieldCode} (API v2)\
        GET /organizationFields\
        GET /organizationFields/\{id} (API v1)\
        GET /organizationFields/\{fieldCode} (API v2)\
        POST /legacyTeams\
        PUT /legacyTeams/\{id}\
        POST /legacyTeams/\{id}/users\
        DELETE /legacyTeams/\{id}/users\
        GET /permissionSets\
        GET /permissionSets/\{id}\
        GET /permissionSets/\{id}/assignments\
        GET /roles\
        GET /roles/\{id}\
        GET /roles/\{id}/assignments\
        GET /roles/\{id}/settings\
        GET /roles/\{id}/pipelines\
        POST /roles\
        POST /roles/\{id}/assignments\
        POST /roles/\{id}/settings\
        PUT /roles/\{id}\
        PUT /roles/\{id}/pipelines\
        DELETE /roles/\{id}\
        DELETE /roles/\{id}/assignments
      </td>
    </tr>

    <tr>
      <td>
        leads:read
      </td>

      <td>
        **Leads: Read only**
        Read data about leads and lead labels.
      </td>

      <td>
        GET /leads\
        GET /leads/archived\
        GET /leads/\{id}\
        GET /leads/\{id}/permittedUsers\
        GET /leadSources\
        GET /leadLabels\
        GET /leads/search\
        GET /leads/\{id}/convert/status/\{conversion\_id}
      </td>
    </tr>

    <tr>
      <td>
        leads:full
      </td>

      <td>
        **Leads: Full access**
        Create, read, update and delete leads and lead labels.
      </td>

      <td>
        POST /leads\
        GET /leads\
        GET /leads/archived\
        GET /leads/search\
        GET /leads/\{id}\
        GET /leads/\{id}/permittedUsers\
        PATCH /leads/\{id}\
        DELETE /leads/\{id}\
        GET /leadSources\
        POST /leadLabels\
        GET /leadLabels\
        PATCH /leadLabels/\{id}\
        DELETE /leadLabels/\{id}\
        POST /leads/\{id}/convert/deal\
        GET /leads/\{id}/convert/status/\{conversion\_id}
      </td>
    </tr>

    <tr>
      <td>
        phone-integration
      </td>

      <td>
        **Call logs**
        Enables advanced call integration features like logging call duration and other metadata, and play call recordings inside Pipedrive.
      </td>

      <td>
        POST /callLogs\
        DELETE /callLogs/\{id}\
        POST /callLogs/\{id}/recordings\
        GET /callLogs\
        GET /callLogs/\{id}
      </td>
    </tr>

    <tr>
      <td>
        goals:read
      </td>

      <td>
        **Goals: Read only**
        Read data on all goals.
      </td>

      <td>
        GET /goals/count/by-\{goalAssignee}\
        GET /goals/find\
        GET /goals/find-intervals/custom\
        GET /goals/find-intervals/\{period}\
        GET /goals/\{id}/results
      </td>
    </tr>

    <tr>
      <td>
        goals:full
      </td>

      <td>
        **Goals: Full access**
        Create, read, update and delete goals.
      </td>

      <td>
        GET /goals/count/by-\{goalAssignee}\
        GET /goals/find\
        GET /goals/find-intervals/custom\
        GET /goals/find-intervals/\{period}\
        GET /goals/\{id}/results\
        POST /goals\
        PUT /goals/\{id}\
        DELETE /goals/\{id}
      </td>
    </tr>

    <tr>
      <td>
        video-calls
      </td>

      <td>
        **Video calls integration**
        Allows application to register as a video call integration provider and create conference links
      </td>

      <td>
        POST /meetings/user-provider-links\
        DELETE /meetings/user-provider-links/\{id}
      </td>
    </tr>

    <tr>
      <td>
        messengers-integration
      </td>

      <td>
        **Messaging integration**
        Allows application to register as a messengers integration provider and allows them to deliver incoming messages and their statuses
      </td>

      <td>
        POST /channels\
        POST /channels/messages/receive\
        DELETE /channels/\{id}\
        DELETE /channels/\{channel-id}/conversations/\{conversation-id}
      </td>
    </tr>

    <tr>
      <td>
        projects:read
      </td>

      <td>
        **Projects: Read only**
        Read data about projects and its related data, project templates and tasks.
      </td>

      <td>
        GET /projects\
        GET /projects/\{id}\
        GET /projects/boards\
        GET /projects/boards/\{id}\
        GET /projects/phases\
        GET /projects/phases/\{id}\
        GET /projects/\{id}/plan\
        GET /projects/\{id}/activities\
        GET /projects/\{id}/tasks\
        GET /projects/\{id}/groups\
        GET /tasks\
        GET /tasks/\{id}\
        GET /projectTemplates\
        GET /projectTemplates/\{id}
      </td>
    </tr>

    <tr>
      <td>
        projects:full
      </td>

      <td>
        **Projects: Full access**
        Create, read, update and delete projects and tasks. Gives access to read project-related data, including boards, phases, groups and project templates, as well as access to read and update project plan items.
      </td>

      <td>
        GET /projects\
        GET /projects/\{id}\
        GET /projects/boards\
        GET /projects/boards/\{id}\
        GET /projects/phases\
        GET /projects/phases/\{id}\
        GET /projects/\{id}/plan\
        GET /projects/\{id}/activities\
        GET /projects/\{id}/tasks\
        GET /projects/\{id}/groups\
        GET /tasks\
        GET /tasks/\{id}\
        GET /projectTemplates\
        GET /projectTemplates/\{id}\
        POST /projects\
        PUT /projects/\{id}\
        DELETE /projects/\{id}\
        POST /projects/\{id}/archive\
        PUT /projects/\{id}/plan/activities/\{id}\
        PUT /projects/\{id}/plan/tasks/\{id}\
        POST /tasks\
        PUT /tasks/\{id}\
        DELETE /tasks/\{id}
      </td>
    </tr>

    <tr>
      <td>
        webhooks:read
      </td>

      <td>
        **Webhooks: Read only**
        Read data about webhooks created by the app.
      </td>

      <td>
        GET /webhooks
      </td>
    </tr>

    <tr>
      <td>
        webhooks:full
      </td>

      <td>
        **Webhooks: Full access**
        Create, read and delete webhooks.
      </td>

      <td>
        GET /webhooks\
        POST /webhooks\
        DELETE /webhooks/\{id}
      </td>
    </tr>
  </tbody>
</Table>

<hr />

## Permission set effect on admin scope

<hr />

The admin scope requires the user who is installing an app (from the Pipedrive's Marketplace), to have admin rights within the company. As the Marketplace doesn't restrict non-admin users from installing apps, your app will need to be able to handle users without admin rights installing the app, when the admin scope is required.

When your app requests admin scope access, the app will need to check if it can complete all of the required functionalities/actions through a non-admin user or whether those actions would require the permissions of an Admin. If the request fails, check to see if the user is a non-admin user and/or falls under a certain permission set or a visibility group. You can check that through the [`GET /users/{id}/permissions`](https://developers.pipedrive.com/docs/api/v1/Users#getUserPermissions) endpoint. For additional information about user restrictions, you can see the list role settings - [`GET /users/{id}/roleSettings`](https://developers.pipedrive.com/docs/api/v1/Users#getUserRoleSettings) and the list user role assignments - [`GET /users/{id}/roleAssignments`](https://developers.pipedrive.com/docs/api/v1/Users#getUserRoleAssignments).

If an admin has installed the app before any regular user, your app may work correctly for non-admin users. Example use-case:

*Your app needs to create activities with a custom activity type. An admin user of a company has installed the app and the custom activity type has been created for their company. Now, when a regular user who's a part of the same company installs the app, your app will be able to create the activities with before created activity type.*

Affected use-cases can include your **app creating, editing or deleting activity types, stages and pipelines as well as custom fields**.