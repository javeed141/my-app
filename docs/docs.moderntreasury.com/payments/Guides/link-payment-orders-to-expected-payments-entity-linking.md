# Entity Linking Overview

### Early Access Feature

<Callout icon="📘" theme="info">
  Entity Links is currently an Early Access feature currently available for `Expected Payments` and `Payment Orders`.

  Any organization can use this feature. If you have any questions about how it works or if you have requests for feature enhancements please reach out to [product@moderntreasury.com](mailto:product@moderntreasury.com) or your customer success manager.
</Callout>

### Overview

In Modern Treasury, you can link related entities flexibly.

This is used for a variety of reasons:

* Enabling operational users to visualize and easily navigate to related items in Modern Treasury's dashboard
* Representing and showing a multi-step fund flow or end-to-end payment for audit and compliance workflows
* Representing the results of a multi-system reconciliation to identify any unreconciled items or exceptions

### Managing links

Each entity can be linked to `n` number of other entities.

To link two entities, you can use the `entity_links` [POST API](https://docs.moderntreasury.com/platform/reference/create-entity-link) to create a new link between these two entities.

You can also use the `/link` page in the Modern Treasury dashboard to manage link creation operationally.

<Image border={false} src="https://files.readme.io/160b19c3cf5cd2beb789d2b2757640d8d209f163034061a1aece3d75bea32a27-image.png" />

Alternatively, you can create links for a given Expected Payment in its detail page by going to actions -> create entity link.

<Image align="center" border={true} src="https://files.readme.io/9626244c4264c2b758e7526706bbf18a690fe70348c671d4b0314961b94c118b-image.png" className="border" />

You can unlink entities using the `entity_links` [DELETE API](https://docs.moderntreasury.com/platform/reference/delete-entity-link) or in the dashboard operationally.

<Image align="center" border={true} src="https://files.readme.io/05935f8dd97bd0372c5b35cb157c240da96f6ecda3f050caff4dbfa3265ee71d-image.png" className="border" />

### Visualizing links

Once entities are linked, you will be able to see all linked entities in the Modern Treasury dashboard under the **Linked Items** section. For each entity, you will see the type, amount, and status of that entity. You will also see the source of how that entity was linked. For example, a specific user, API key, or, in the future, an entity linking rule.

<Image align="center" border={true} src="https://files.readme.io/72dc76cdb9e6d5d9bb6cfa3a74555494d98582e231cf80c87bd529115e2d5287-image.png" className="border" />

You can also list entity links using the `entity_links` [GET API](https://docs.moderntreasury.com/platform/reference/list-entity-links) and filter on parameters such as `entity_link_type` or `entity_link_id`.

### Number of linked entities

As entities are linked, Modern Treasury will keep track of the number of linked entities. This information shows up as an **Linked Items** attribute for each linked entity and describes how many entities are linked to it. For example, in the screenshot above, this Expected Payment is linked to 5 entities.

The count of the number of linked entities can be useful for helping distinguish exception and success states. This is highly dependent on your business process and fund flows. For example, if you expect an entity to have 1 linked entity, you'll know there's an exception if the linked item count is not 1 – either 0 or 2+.

You can also filter by or see a custom column showing the **Linked Item** attribute when looking at an entity list.