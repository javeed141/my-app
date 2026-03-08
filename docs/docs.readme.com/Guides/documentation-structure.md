# Documentation Structure

Learn about how we've structured our documentation for two-way syncing

## Project structure

Each ReadMe project will be equivalent to a GitHub repository. See the diagram below:

<Image align="center" border={false} src="https://files.readme.io/9d8bbdb33a9fa16ba65bfbcbd12f8afc3058554bd794da0a60eb77efd718f984-sync-architecture-svg.svg" />

## File Organization

The bi-directional sync feature offers a format that closely mirrors the well-organized ReadMe project structure. With folders neatly organizing your documentation and markdown files serving as individual pages, it creates a user-friendly experience that will feel instantly familiar to ReadMe users.

Your documentation follows this standardized structure:

```
📂 project
├── 📁 custom_blocks
├── 📁 custom_pages
├── 📁 docs
│   ├── 📂 category-folder
│   │   ├── 📄 page.md
│   │   └── 📃 _order.yaml
│   └── 📃 _order.yaml
├── 📁 recipes
└── 📁 reference
```

Each component serves a specific purpose:

* `custom_blocks`: Stores any custom blocks you’ve created.
* `custom_pages`: Stores any custom pages you’ve created.
* `docs`: Contains your main documentation content, organized in categories.
* `recipes`: Holds step-by-step tutorials and how-to guides.
* `reference`: Contains API reference documentation.
* `_order.yaml`: Manages the navigation structure for each section.

This organization mirrors your ReadMe project structure, making it easy to maintain consistency between your Git repository and ReadMe documentation.

## File Format

Documentation pages use Markdown with frontmatter:

```yaml
---
title: string # Title of the page
excerpt: string # Text displayed under title
deprecated: boolean # Mark page as deprecated
hidden: boolean # Visibility of page
icon: string # Font Awesome classes for icons ("fad fa-handwave")
category: string # Category page is organized in
metadata:
  title: string # SEO title
  description: string # SEO description
  keywords:
    - string
  robots: index | noindex # Whether this page should be indexed
  image: url

# Link pages
link:
  url: url
  new_tab: boolean

# API Reference pages
api:
  file: string # OAS file name ("hoot.json")
  operationId: string # Endpoint ID ("get_owls")
  webhook: boolean # If endpoint is a webhook
  
# Custom pages
fullscreen: boolean 

# Recipe
recipe:
  color: string
  icon: string
---

# Main Content

Your documentation content goes here…
```

## Guides Structure

Page order and navigation are controlled by `_order.yaml` files:

```yaml
- welcome-page
- getting-started
- advanced-topics
  - feature-one
  - feature-two
```

## API Reference Navigation Structure

**Code Example**

```yaml
- reference:
  - Owl Sanctuary API:
    - owls:
      - postowls
      - index
      - getsightings
      - getowlsid
      - getowls
    - habitats:
      - index
      - gethabitats
```

**Image Example**

<Image align="center" border={true} width="200px" src="https://files.readme.io/01a44118dd40ad4c0712bad476966b8a4461c473e39836aa369233b773da38b6-image_4.png" className="border" />

This is after uploading a sample OAS file, hoot.json. The above matches the following sidebar:

<Image align="center" border={true} width="200px" src="https://files.readme.io/d8588138519306b11d1305c5ec84d975281a5ee5d729ab4c4de43d3db7410a56-image.png" className="border" />