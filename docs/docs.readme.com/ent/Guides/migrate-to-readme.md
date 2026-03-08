# Migrating to ReadMe

This guide helps you bring your existing docs into ReadMe.

Migrating your documentation to ReadMe Enterprise is streamlined and secure. Whether you're transitioning from Docusaurus, GitBook, Mintlify, Nextra, Zendesk, or custom solutions, our enterprise platform provides the tools and support you need.

<Callout icon="🤝" theme="default">
  ReadMe offers Professional Services to help you migrate your content with dedicated support from our team. Please reach out to <Anchor label="growth@readme.io" target="_blank" href="mailto:growth@readme.io">[growth@readme.io](mailto:growth@readme.io)</Anchor> to schedule your migration consultation.
</Callout>

## Professional Services for Enterprise

ReadMe Enterprise includes comprehensive migration support:

* **Discovery session** to understand your documentation architecture
* **Content audit** to identify migration priorities and custom requirements
* **Automated migration** of bulk content with manual review
* **QA validation** to ensure content accuracy post-migration
* **Training sessions** for your team

## Self-Serve Migration

### Create a project

It’s easy to create your first ReadMe project:

1. [Sign Up](https://dash.readme.com/signup)  using your work email (recommended).
2. Create a project for your organization.

### Recommended setup

You can start with these steps or complete them at anytime while you’re importing content.

* Connect to GitHub or GitLab to [make it easy to import existing Markdown files](#add-your-content-from-git).
* Upload your logo and set your brand colors to personalize your docs.
* Set up a [custom domain](https://docs.readme.com/main/docs/setting-up-custom-domain).
* Invite [teammates](https://docs.readme.com/main/docs/manage-team).

For our enterprise plans, you can:

* Connect to your [SAML provider to manage teammates](https://docs.readme.com/ent/docs/setting-up-sso)
* Ensure doc quality and [collaboration through branches](https://docs.readme.com/main/docs/branches)
* Customize your docs using [custom CSS or JS](https://docs.readme.com/main/docs/custom-css-and-javascript)

### Add your content manually

If you’ve decided to start fresh, you can start adding content manually. It’s a good time to start new docs with intention, without any baggage or out-dated content.

If you have an OpenAPI Specification (OAS) file that defines your API, you can upload it by navigating to edit mode, and then API Reference. From there, you can provide a URL for import, or upload the file from your computer.

For all other content:

1. Navigate to edit mode in the top navigation bar to start editing your docs
2. Add new pages in the left-hand sidebar
3. Add content (you can paste Markdown)

### Add your content from Git

Once you’ve [connected your project to Git](https://docs.readme.com/main/docs/bi-directional-sync), you can upload Markdown files locally or from your Git provider. ReadMe can parse files organized like so:

```
📂 project
├── 📁 custom_blocks
├── 📁 custom_pages
├── 📁 docs
│   ├── 📂 category-folder
│   │   ├── 📄 page.mdx
│   │   └── 📃 _order.yaml
│   └── 📃 _order.yaml
├── 📁 recipes
└── 📁 reference
```

For your first import:

* `docs`: Contains your main documentation content, organized in categories.
* `reference`: Contains API reference documentation.

Markdown files use required frontmatter to store important information about your docs:

```
---
title: string # Title of the page
excerpt: string # Text displayed under title
deprecated: boolean # Mark page as deprecated
hidden: boolean # Visibility of page
category: string # Category page is organized in
metadata:
  title: string # SEO title
  description: string # SEO description
  keywords:
    - string
  robots: index | noindex # Whether this page should be indexed
  image: url

# For API Reference pages only
api:
  file: string # OAS file name ("hoot.json")
  operationId: string # Endpoint ID ("get_owls")
  webhook: boolean # If endpoint is a webhook
---
```

ReadMe will generate your `_order.yaml` files to control page order as you save changes on the platform.

***

<Callout icon="📘" theme="info">
  Reach out to [support@readme.io](mailto:support@readme.io) if you have any questions or need help!
</Callout>

Once your content is migrated; keep exploring ReadMe’s documentation features. You can run an AI-powered [Docs Audit](https://docs.readme.com/ent/docs/docs-audit) to check the quality of your docs, create step-by-step guides for users with [Recipes](https://docs.readme.com/ent/docs/recipes), see how developers are using your API with [My Developers Overview](https://docs.readme.com/ent/docs/my-developers) and more!

Migration is just the beginning. With ReadMe, you're setting yourself up for documentation success with tools that grow with your API.

***

### 🎉 What's Next?

Once your content is migrated, you'll have access to all of ReadMe's powerful features:

* Interactive API documentation
* Developer metrics and insights
* Customizable landing pages
* Bi-directional Git sync
* MDX support for dynamic content
* And much more!

Remember, migration is just the beginning. With ReadMe, you're setting yourself up for documentation success with tools that grow with your API.