# Built-in Components

ReadMe provides several powerful MDX components out of the box.

ReadMe provides several powerful MDX components out of the box and accessible directly from the slash menu. For community-built components, check out our [Marketplace](https://docs.readme.com/main/docs/building-custom-mdx-components?isFramePreview=true#marketplace) in the **Settings > Custom Components** page.

### Tabs

<Image align="center" src="https://files.readme.io/336b9b02322ea3f7e522edd2cac1328f65179ecab4c7124dadaa012d1453e8eb-Editing_Tab_MDX_Component_1.gif" />

Organize related content into easily navigable sections:

**Tabs Example**

<Tabs>
  <Tab title="First Tab">
    Welcome to the content that you can only see inside the first Tab.
  </Tab>

  <Tab title="Second Tab">
    Here's content that's only inside the second Tab.
  </Tab>

  <Tab title="Third Tab">
    Here's content that's only inside the third Tab.
  </Tab>
</Tabs>

***

### Accordion

<Image align="center" src="https://files.readme.io/a29c8744b62ec4b51e366e91a012533f9c6e21638db2c425358cec92a7058d7d-CleanShot_2024-11-08_at_20.10.29.gif" />

Present information in collapsible sections:

**Accordion Example**

<Accordion title="My Accordion Title" icon="fa-info-circle">
  Lorem ipsum dolor sit amet, **consectetur adipiscing elit.** Ut enim
  ad minim veniam, quis nostrud exercitation ullamco. Excepteur sint
  occaecat cupidatat non proident!
</Accordion>

***

### Cards

<Image align="center" src="https://files.readme.io/8702f98924ba19d8c0f1041e999fb6c3dc0dce5e15ead63e5e07f846fc4a28a8-CleanShot_2024-11-09_at_13.12.09.gif" />

Display content in a clean, grid-like format:

**Cards Example**

<Cards columns={3}>
  <Card title="First Card" href="https://readme.com" icon="fa-home" target="_blank">
    Neque porro quisquam est qui dolorem ipsum quia
  </Card>

  <Card title="Second Card" icon="fa-user">
    *Lorem ipsum dolor sit amet, consectetur adipiscing elit*
  </Card>

  <Card title="Third Card" icon="fa-star">
    > Ut enim ad minim veniam, quis nostrud ullamco
  </Card>
</Cards>

***

### Columns

Creates a multi-column layout where content is displayed side-by-side rather than stacked vertically.

<Columns layout="auto">
  <Column>
    Neque porro quisquam est qui dolorem ipsum quia
  </Column>

  <Column>
    *Lorem ipsum dolor sit amet, consectetur adipiscing elit*
  </Column>

  <Column>
    > Ut enim ad minim veniam, quis nostrud ullamco
  </Column>
</Columns>