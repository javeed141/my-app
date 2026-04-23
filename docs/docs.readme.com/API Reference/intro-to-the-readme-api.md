# Intro to the ReadMe API

Control your docs programmatically with the ReadMe API

## Why use an API for your docs?

The ReadMe API is a great way to build workflows and integrations on top of your ReadMe documentation. While the possibilities are endless, here are a few example workflows that you could build using the ReadMe API:

* Automatically publishing documentation (e.g., updated API reference docs, a new changelog entry, etc.) whenever a new version of your API is released
* Creating short-lived ReadMe API keys for usage in CI environments
* Embedding a widget on your marketing page that searches your ReadMe docs

While the API and [`rdme`](https://docs.readme.com/main/docs/rdme) (the ReadMe CLI, which is powered by the ReadMe API) are uniquely suited for certain use cases, setting up bi-directional sync and being able to work with your documentation in GitHub may be the best approach, depending on your workflow. Check out [the bi-directional sync docs](https://docs.readme.com/main/docs/bi-directional-sync) to learn more.

## How do I authenticate?

To get your API key, see [Authentication](https://docs.readme.com/reference/authentication).

## How can I use this API from the command line or via GitHub Action?

See our docs on [`rdme`](https://docs.readme.com/main/docs/rdme), ReadMe's official CLI and GitHub Action!

## How do I paginate my results?

See [Limiting API results](https://docs.readme.com/main/reference/pagination).

## Endpoints Overview

### API Keys

Use these endpoints to manage all of your ReadMe API keys. You can create new keys, delete some, or update the labels on an existing one.

### API Reference

Use these endpoints to retrieve, update, or delete pages in your API Reference, not your knowledge base. For an example API reference section, see [ours](https://docs.readme.com/main/reference/getapis).

### APIs

Use these endpoints to create, retrieve, update, or delete the API definitions that power your API reference documentation. For more information about supported API specification formats, see [OpenAPI](https://docs.readme.com/main/docs/openapi).

### Branches

Use these branches to create, retrieve, update, or delete versions or branches within your ReadMe project. You can't version the different parts of your docs separately, you have to version your API reference and knowledge base together, unless you have multiple projects. Note that the changelog is versionless.

### Categories

Categories are the headings above groups of pages in the sidebar. For example, this page belongs under the **API Endpoints** category. There are endpoints available for creating, reading, updating, and deleting categories.

You can have just one level of categories and every doc and reference page must appear under one category. While you can't have subcategories, you can create an empty parent page and add a subpage to it to create a nested page hierarchy. See [this page](https://docs.readme.com/docs/openapi-categories-pages-subpages#category) for information on how categories work for OpenAPI files.

If you want to fetch all the pages in your knowledge base, you can use the [Get all categories](https://docs.readme.com/main/reference/getcategories-1) endpoint to fetch all your categories. Then for each category, use the [Get the pages within a category](https://docs.readme.com/main/reference/getcategorypages) endpoint.

### Changelog

Use these endpoints to retrieve, create, update, or delete changelog posts in your docs project. For an example of a changelog, see [ours](/changelog).

### Custom Pages

Use these endpoints as you would the API Reference or Guide endpoints, just for creating a custom page. For more information, see [What's a Custom Page?](https://docs.readme.com/main/page/custom-page)

### Guides

Use these endpoints to retrieve, create, update, or delete doc pages in your knowledge base, not your API reference.  For an example of a knowledge base, see [ours](https://docs.readme.com/main/docs).

### Images

Use these endpoints for uploading images for use throughout your docs project, either in page content, search engine metadata, or even your project logo.

### Recipes

Use these endpoints to retrieve, create, update, or delete recipes in your knowledge base.

### Search

Use these endpoints to search across all of your knowledge base.

![](https://files.readme.io/9705cdf-libraryowl-sm.png "libraryowl-sm.png")