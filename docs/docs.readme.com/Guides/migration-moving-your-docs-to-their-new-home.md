# Migrating to ReadMe

This guide helps you bring your existing docs into ReadMe through a few options, depending on your needs.

<Grid columns="3" gap="20px" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
  <CoolCard header="Start Fresh" href="#add-your-content-manually" icon="fa-duotone fa-solid fa-file-circle-plus" text="Give your docs a new beginning and build your docs with intention" />

  <CoolCard header="Importing via GitHub" href="#add-your-content-from-git" icon="fa-duotone fa-solid fa-arrows-rotate" text="Sync with a Git repo to quickly import Markdown content" />

  <CoolCard header="Professional Services" href="mailto:growth@readme.io" icon="fa-duotone fa-solid fa-square-envelope" text="Reach out to sales for a hands off approach to importing docs" />
</Grid>

<br />

***

<br />

## Create a project

It’s easy to create your first ReadMe project:

1. [Sign Up](https://dash.readme.com/signup)  using your work email (recommended).
2. Create a project for your organization.

## Recommended setup

ReadMe makes it easy to setup starting from our Startup plan. You can start with these steps or complete them at anytime while you’re importing content.

* Connect to GitHub or GitLab to [make it easy to import existing Markdown files](#add-your-content-from-git).
* Upload your logo and set your brand colors to personalize your docs.
* Set up a [custom domain](https://docs.readme.com/main/docs/setting-up-custom-domain).
* Invite [teammates](https://docs.readme.com/main/docs/manage-team).

Consider our Business or Enterprise plans if:

* You need to connect to your [SAML provider to manage teammates](https://docs.readme.com/ent/docs/setting-up-sso).
* You want to ensure doc quality and [collaboration through branches](https://docs.readme.com/main/docs/branches).
* You want to customize your docs using [custom CSS or JS](https://docs.readme.com/main/docs/custom-css-and-javascript).

## Add your content manually

If you’ve decided to start fresh, you can start adding content manually. It’s a good time to start new docs with intention, without any baggage or out-dated content.

If you have an OpenAPI Specification (OAS) file that defines your API, you can upload it by navigating to edit mode, and then API Reference. From there, you can provide a URL for import, or upload the file from your computer.

For all other content:

1. Navigate to edit mode in the top navigation bar to start editing your docs
2. Add new pages in the left-hand sidebar
3. Add content (you can paste Markdown)

## Add your content from Git

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

<br />

***

<br />

<Callout icon="📘" theme="info">
  Reach out to [support@readme.io](mailto:support@readme.io) if you have any questions or need help!
</Callout>

Once your content is migrated; keep exploring ReadMe’s documentation features. You can run an AI-powered [Docs Audit](https://docs.readme.com/main/docs/docs-audit) to check the quality of your docs, create step-by-step guides for users with [Recipes](https://docs.readme.com/main/docs/recipes), see how developers are using your API with [My Developers Overview](https://docs.readme.com/main/docs/my-developers) and more!

Migration is just the beginning. With ReadMe, you're setting yourself up for documentation success with tools that grow with your API.