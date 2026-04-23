# Managing Projects

As an Enterprise customer, your plan includes access to your Enterprise Group—also known as a parent group—as well as related projects—referred to as child projects.

The parent Enterprise Group manages multiple child projects under an Enterprise dashboard and acts as a wrapper for the child projects offering a single custom domain and global landing page.

## What is the relationship between the parent group and the child projects?

A parent Enterprise Group provides some functionality across the child pages.

**A parent Enterprise Group can:**

* Provide global CSS rules across all of your child projects
* Provide global third-party integrations settings across your child projects
* Provide custom JavaScript across all of your child projects
* Provide a global landing page to house the child projects under

The custom domain will be set up in the parent Enterprise Group and each child project will show up as a subdomain in the URL after the custom domain.

### URL Structure

Here is an example of a parent enterprise group URL structure with three child projects:

* parent.readme.io/ \<- Your global landing page
  * parent.readme.io/Child1/docs/getting-started \<- Page URL with default version
  * parent.readme.io/Child2/v1.0/docs/getting-started \<- Page URL with version specified
  * parent.readme.io/Child3/lang-ja/v1.0/docs/getting-started \<- Page URL with specified language and version

> 📘 Looking for More Guidance on Managing Enterprise Projects?
>
> Head to the subpages within this section to learn more about upgrading to a group project, adding and removing child projects, and specifying child path names.