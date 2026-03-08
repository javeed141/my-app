# Upgrading to a Group Project

Enterprise lets you upgrade a single project to an Enterprise Group to gain access to additional features and easily support multiple projects!

These steps will help you migrate from one doc project to a group of doc projects. The group is unified by global search, a global landing page, and other features.

Note that these steps will NOT apply if you:

1. Are a new Enterprise customer with no preexisting ReadMe projects.
2. Are upgrading to Enterprise, but choose to keep your projects separate, rather than grouping them.

## Why Migrate to an Enterprise Group at All?

You might have some questions:

**Why would I want multiple doc projects?**

For example, so that you can version the docs separately for separate products, or so that you can handle different doc sets from a company acquisition. Each project comes with one Guides and one Reference section, so if you want each product to have their own Guides/Reference sections, we recommend having separate projects.

**Why would I want to migrate doc projects into one unified group?**

The biggest advantage, besides getting all your projects under a unified domain, is that you can then enjoy Enterprise perks that are otherwise unavailable, such as:

* Global search across all projects.
* Global landing page with global CSS/JS.
* OAuth 2 login for customers.
* SSO login for employees.
* Project metrics to analyze how customers use your docs.
* Audit logs for tracking changes to your docs.
* [Staging](https://docs.readme.com/ent/docs/publishing-content-with-staging) to better manage updates to your live docs.

And more!

> 🚧 This requires some support from us.
>
> Upgrading to an Enterprise group can be tricky business. We are here to help you through this journey. Please talk to your Product Experience Manager (PXM).

## Migration Overview

There will be several changes to manage in addition to understanding how the URLs will change and you will need to discuss the following high-level steps with your PXM:

* Process for setting up your new enterprise group.
* Timing of migrating your projects to minimize downtime.
* Reserving any new ReadMe subdomains you might want.

Your PXM can work with you to upgrade one of your existing documentation projects to become the group project. If you already have a live project, your PXM can create a new test Enterprise Group project for you, so you can test the process with a clone of your project, before you go live. This test enterprise group can give you time to build out a [global landing page](https://docs.readme.com/ent/docs/creating-a-global-landing-page).

1. In coordination with your PXM, remove your custom domain from your current ReadMe project.

> ❗ ️ Please inform your users of some downtime.
>
> Before removing the custom domain from the project, it's good idea to let your users know your docs will undergo maintenance. Your custom domain site will be unavailable to users during the migration.

2. Your PXM can now set up an enterprise group on your project or move the project to an existing enterprise group and then designate the admin as the owner at the enterprise level.

3. Add your custom domain to your enterprise group's dash.

4. When you create an enterprise group for an existing docs project, your URLs change. To minimize disruption to your users:
   * Author your redirects for the upcoming change in a text editor - [see below](https://docs.readme.com/ent/docs/upgrading-to-group-project#authoring-your-redirects-in-advance-of-migration). And update any existing redirects. Your CSM can work with on the redirect format and process.
   * After you have access to the group project, add the appropriate redirects to your group project's dash.
   * If you changed your custom domain, add any 301 redirects to your company's web server. For more information, see the following section, [How Will My URLs Change](https://docs.readme.com/ent/docs/upgrading-to-group-project#how-will-my-urls-change).

5. Add doc projects to your group project at dash.readme.io/group/`yourGroup`/settings, so these projects show up as links under your global landing page.

6. Move any integrations from the preexisting project to the group project at dash.readme.io/group/`yourGroup`/integrations. If you have multiple projects with multiple integrations, you'll have to pick the settings from one of those projects to be the new settings for your integrated projects.

7. If using [Custom OAuth](https://docs.readme.com/ent/docs/getting-started-with-custom-authentication) then set this up at the enterprise group level instead of in the project.

8. Decide whether to use the Global Landing page or redirect past it to your child project or to a self hosted landing page.

9. Now that you have an enterprise group with projects linked, reevaluate how users will navigate between your doc projects. You can change these settings at dash.readme.io/project/`yourProject`/v2.0/usability. Also, consider adding links in the project header as well

10. Click the Publish checkbox to launch your docs.

## How Will My URLs Change?

Say you're an existing ReadMe customer with a custom domain for one or more projects, and you are upgrading to a group for all your documentation projects. As part of the upgrade, your documentation URLs will change. At a very high level, the change will be as follows:

`childCustomDomain.com`/`docType` -> `groupCustomdomain.com`/`childSubdomain`/`docType`

Before you author redirects, here’s what you need to know about how your URLs will change. Hang in there; this will be quite detailed, but you'll need to understand all of it to make sure you don't break links to your existing docs:

The original ReadMe subdomain you created for your project was hidden when you set up your custom domain, but it will become visible in the slug of the URL once you have a group project. So, before you migrate, decide if you want to change the ReadMe subdomain to something that looks good in a public URL path.

To make this clear with an example, let's say your company, myPets, has one existing **cats** documentation project at a custom domain: `docs.mypets.com`.

You are upgrading to an enterprise group project for your existing **cats** documentation project, and will be adding additional projects for **dogs**, **birds**, and **other animals**. You want your new custom global docs domain to be: `developers.mypets.com`

Under the hood, you administer your `docs.mypets.com` site at: `dash.readme.io/project/project1pets`.\
If you don't change it before upgrading, your existing project will become available under: `developers.mypets.com/project1pets`

That's not very pretty. So, before upgrading your existing project, you change your existing ReadMe subdomain to: `cats`. In other words, you now administer your project at `dash.readme.io/project/cats`. You then add another ReadMe project with the subdomain: `dogs`

Note that changing the ReadMe subdomain will not affect your customers at all; they still see your documentation under your existing custom domain.

After the upgrade, your existing project will become available at `developers.mypets.com/cats`, and the new ReadMe project you add will be available at `developers.mypets.com/dogs`.

> 🚧 Subdomains Must Be Unique
>
> Keep in mind that the subdomain you choose must be unique across all of ReadMe's customers. Talk with your CSM about any new subdomains you want, so they can be reserved in advance of your upgrade.

For more information about how URL paths in ReadMe work, see [URL paths in Readme](https://docs.readme.com/main/docs/url-paths-in-readme).

## Authoring Your Redirects in Advance of Migration

There are various scenarios for authoring your redirects. In summary, here's what they'd look like for our myPets example company.

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        What action will you take?
      </th>

      <th>
        Any other circumstances?
      </th>

      <th>
        Example redirect
      </th>

      <th>
        Comment
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Change custom domain, say
        docs.myPets.com to developers.myPets.com.
      </td>

      <td>
        N/A
      </td>

      <td>
        Not configured in the enterprise group dash.
      </td>

      <td>
        You need to author 301 redirects for any changes you make to custom domains (as opposed to relative paths) in your own company web site server, as opposed to on the redirects page of your enterprise group.
      </td>
    </tr>

    <tr>
      <td>
        Add existing project to an enterprise group.
      </td>

      <td>
        Necessary in all circumstances (you must always redirect for subdomains).
      </td>

      <td>
        `/docs/(\S_) -> /cats/docs/$1`\
        `/reference/(\S_) -> /cats/reference/$1`, etc.
      </td>

      <td>
        In this example, you added a project called **cats** to an enterprise group. You need a redirect for every doc type in the **cats** project because the subdomain **cats** is now visible in the URL.
      </td>
    </tr>

    <tr>
      <td>
        Add existing project to an enterprise group.
      </td>

      <td>
        Existing project has page redirects.
      </td>

      <td>
        `cats/docs/care-and-feeding-of-cats` -> `cats/docs/cat-care`
      </td>

      <td>
        In this example, the **cats** project had an existing page redirect for cat care. You need to add it to the enterprise groups and prefix it with the **cats** subdomain.
      </td>
    </tr>

    <tr>
      <td>
        Add existing project to an enterprise.
      </td>

      <td>
        Existing project has several versions.
      </td>

      <td>
        `/(v\d\S_?)/(\S_) -> /cats/$1/$2`
      </td>

      <td>
        In this example, the **cats** project had several versions, v1, v2, and v3.\
        This redirect will catch all of them. The regex finds the following pattern: v\[digit]\[non-greedy match for non whitespaces]/\[greedy-match for non whitespaces].
      </td>
    </tr>

    <tr>
      <td>
        Add existing project to an enterprise.
      </td>

      <td>
        Existing project is localized with Transifex.
      </td>

      <td />

      <td>
        Talk with your CSM about how to handle translated URL redirects.
      </td>
    </tr>
  </tbody>
</Table>

The following sections give more details on the preceding table.

**Custom Domain Changes**\
In the preceding myPets example, your custom domain changes from `docs.myPets` to `developers.myPets`. You do the following:

1. Author 301 redirects for each of your document types that you will add to your company's web server (not in the project dashboard) to automatically push any traffic from your old custom domain to your new custom domain.

**Subdomain Redirect**

Let's say in the myPets customer example, you decide to keep your original project's custom domain, `docs.mypets.com`, rather than change it. In that case, you handle all redirects on your enterprise group's dash.  Under the hood, you administer `docs.mypets.com` at `dash.readme.io/project/cats`. When your CSM gives you a group project, `dash.readme.io/group/myPets-parent`, your ReadMe subdomain, cats, becomes exposed, and your existing project now is available at `docs.mypets.com/cats/docs` instead of `docs.mypets.com/docs`.

In your group project at `dash.readme.io/group/myPets-parent/errorpages`, author redirects for each of your document types with the following patterns (using regex):

```text
/docType/(\S*) -> /childSubdomain/docType/$1
/docType -> /childSubdomain/docType
```

For example, if you only had docs and API reference enabled on your cats project, you'd author:

```text
/docs/(\S*) -> /cats/docs/$1
/docs -> /cats/docs
/reference/(\S*) -> /cats/reference/$1
/reference -> /cats/reference
```

This will catch:

* Any pages under /docs/, for example, docs.mypets.com/docs/cat-habits.
* Any links to your top-level docs landing page, for example,  docs.mypets.com/docs.

In the preceding example redirect, (\S\*) and $1 are regular expressions that allow you to avoid authoring a redirect line for every single page in your documentation project when you migrate.

**Existing Project Has Page Redirects**\
Remove any redirects for individual pages that you had in the dash.readme.io/project/cats/errorpages, modify them, and copy them to your new group project. Let's say your CSM sets you up with a group project with the ReadMe subdomain: myPets-parent

You copy your page redirects into: dash.readme.io/group/myPets-parent/errorpages\
You prefix the page redirects with the project name. For example, if you had this page redirect in dash.readme.io/project/cats/errorpages:\
`docs/care-and-feeding-of-cats -> docs/cat-care`.\
Then, in dash.readme.io/group/myPets-parent/errorpages, you would change this to:\
`cats/docs/care-and-feeding-of-cats -> cats/docs/cat-care`

For more information see [Redirect Scenarios](https://docs.readme.com/main/docs/redirect-scenarios) and [Error Pages](https://docs.readme.com/main/docs/error-pages).