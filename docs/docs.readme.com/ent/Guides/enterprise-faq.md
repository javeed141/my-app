# Enterprise FAQ

## What is a project?

A ReadMe project is the terminology we use to describe a developer hub. We offer three main types of projects: a regular project, a parent project, and a child project.

A parent project or enterprise group manages multiple projects under an enterprise dashboard and acts as a wrapper for the child projects offering a single custom domain and global landing page.

## What is the relationship between the parent project and the child projects?

* A parent project provides some functionality across the child pages. A parent project can:
  * Provide global CSS rules across all of your child's projects.
  * Provide global [third-party integrations](https://docs.readme.com/main/docs/integrations) settings across your child projects
  * Provide custom JS rules across all of your child's projects.
* A parent project will provide a global landing page to house the projects under a singular project.
* The custom domain will be set up in the parent project and each child project will show up as a subdomain in the URL after the custom domain.

> 📘 We now allow you to specify a different path for routing to your child project!
>
> Check out how to set this up [here](https://docs.readme.com/ent/docs/custom-domain-settings)

Here is an example of a parent enterprise group URL structure with three child projects:

* parent.readme.io/ ← Your global landing page
  * parent.readme.io/Child1/docs/getting-started ← Page URL with default version
  * parent.readme.io/Child2/v1.0/docs/getting-started ← Page URL with version specified
  * parent.readme.io/Child3/lang-ja/v1.0/docs/getting-started ← Page URL with specified language and version

## How can we set up an enterprise parent project?

Enterprise parent projects are provisioned by a ReadMe Admin and require an Enterprise plan. Contact [growth@readme.io](mailto:growth@readme.io) if you are interested!

## Does any of the parent settings overwrite the settings of the child?

The child settings will take precedence over the parent in most cases. In some cases, both of the settings are taken into account. For instance, if you have written custom CSS in the parent as well as the child, both of the custom CSS declarations will be taken into account.

## How does localization work in ReadMe?

Read through our localization integrations and support [here](https://docs.readme.com/ent/docs/language-support-and-localization).

## What are some terminology that we use?

* <Glossary>Hub</Glossary>
* <Glossary>Dash</Glossary>

## Where can we request more features?

You can submit a feature request [here](https://portal.productboard.com/readme/1-readme-product-portal/tabs/1-planned/tabs/4-candidate/) or you can reach out to your PXM directly!

## How can I contact support or report a bug?

Use the Intercom messenger widget located in the bottom right of your project to contact the ReadMe support team. The support team is available Monday - Friday from 9 am - 5 pm PST (UTC-8)