# Redirect Scenarios

Learn how and when visitors to your project are redirected to other pages

# Redirecting non-existent pages and URLs

Admins can configure custom redirects for non-existent pages. For more information, see our docs for [Error Pages and Redirects](https://docs.readme.com/main/docs/error-pages). 

 

# External Link Pages

Pages can be set to an "External Link" type, essentially turning the page URL into a redirect to a specific link.

To set a page as an External Link, click on the Page dropdown at the top of a page, then select External Link.

<Image align="center" alt="Something or another idk" border={true} caption="The page type can be set from the dropdown menu above the page title" src="https://files.readme.io/ac59112-CleanShot_2024-01-24_at_14.24.31.gif" width="400px" />

> ⚠️
>
> External Link redirects will only work if the page is set to Public.

 

# Custom domain redirects

If a project has been configured with a [Custom Domain](https://docs.readme.com/main/docs/setting-up-custom-domain), we'll redirect visitors from the project's original `readme.io` subdomain to the custom domain.

For example, if a project at `cats.readme.io` has been configured with the custom domain `docs.cats.org`, any visitors who attempt to load `cats.readme.io` will be automatically redirected to the `docs.cats.org`.

 

# Versioned link redirects

When a visiting a project URL containing a [version](https://docs.readme.com/main/docs/versions) path, if that version path is the project's Main Version, we redirect the visitor to the non-versioned URL.

For example, when clicking on a link to `fish.readme.io/v10.0/docs/start`, and `v10.0` is the project's Main Version, the visitor is redirected to `fish.readme.io/docs/start`.

Versioned links for non-main versions are not redirected.