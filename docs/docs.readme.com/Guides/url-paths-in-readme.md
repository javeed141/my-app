# URL Paths in ReadMe

## Single-Project URL Structure

If you have only one documentation project, your URL path follows this pattern:

`yourCustomDomain.com`/`projectVersion`/`docType`/`pageSlug`

For example, something like\
`developers.myPets.com/v1.0/reference/get-cat-by-id`

See the following notes for more information about these URL path elements.

## Enterprise URL Structure

If you are an Enterprise customer who unified multiple documentation projects under one custom domain, your URL paths follow this pattern:

`yourCustomDomain.com`/`yourProjectSubdomain`/`language`/`projectVersion`/`docType`/`pageSlug`

For example, something like:

`docs.mycars.com/germancars/lang-de/v2.0/docs/volkswagen-maintenance/`

## URL Element Descriptions

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Path Element
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `yourCustomDomain.com`
      </td>

      <td>
        Can be any custom domain with any domain extension, for example, .com, .org, .dev, etc.
      </td>
    </tr>

    <tr>
      <td>
        `yourProjectSubdomain`
      </td>

      <td>
        The unique ReadMe subdomain of your documentation project. For example, if you have a project that you administer at dash.myProject1.readme.io, the subdomain is myProject1. ReadMe subdomains must be unique across all customers' projects. If you upgrade an existing project to a parent project, then the subdomain becomes visible as part of the public URL path at myCustomDomain.com/myProject1/docs.
      </td>
    </tr>

    <tr>
      <td>
        `projectVersion` (Optional)
      </td>

      <td>
        If omitted, displays the most recent doc version. If the default version is entered, the user will be redirected to a URL without the version path.
      </td>
    </tr>

    <tr>
      <td>
        `docType`
      </td>

      <td>
        * /docs: general documentation
        * /reference: API reference
        * /changelog: release notes
        * /discuss: community discussion space
        * /page: custom pages
        * /error: for describing API errors. Each error page is also available under a /docs URL path.
      </td>
    </tr>

    <tr>
      <td>
        `language` (Optional)
      </td>

      <td>
        for localized doc sets. Language is always prefixed with `lang-`. For example, `lang-de` for German. If omitted, displays English.
      </td>
    </tr>
  </tbody>
</Table>