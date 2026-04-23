# Error Pages

Choose what endusers see when they encounter a 404 in your project

> 📘 These features are only available on Business and Enterprise plans

## Custom Error Pages

You can choose what endusers see when they encounter a broken link in your project by going to your **Admin Settings > Error Pages**

<Image align="center" border={true} src="https://files.readme.io/9295ff71d12cac68600c8c4833d4c67a59e1afdd79904d780851c468b6045d6d-error_page.png" className="border" />

### 404 Page

By default, we serve a generic 404 page when an enduser encounters a broken link.

<Image align="center" alt={1374} border={true} caption="Our generic 404 page." title="Screenshot 2018-08-03 14.13.07.png" src="https://files.readme.io/9a27444-CleanShot_2024-01-23_at_15.53.422x.png" />

 

You can create a [Custom Page](https://docs.readme.com/main/docs/custom-page) and assign it as your project's 404 page.

<Image align="center" alt="A customized 404 page." border={false} caption="A customized 404 page." src="https://files.readme.io/1d759ee-CleanShot_2024-01-23_at_16.05.402x.png" />

 

Choose the desired Custom Page from the dropdown to assign it as the project's 404 page.

<Image align="center" border={true} src="https://files.readme.io/oCY9MXUSPOOz4DKyuHHg_Screen%20Shot%202016-05-02%20at%204.15.07%20PM.png" className="border" />

## Redirects

If an enduser attempts to open a URL in your project and no page exists for that URL, you can define a redirect for that specific URL instead, with some requirements and limitations:

* Redirects must originate from a relative path (everything after the project domain). For example `docs.example.com/owlbert` would be defined as `/owlbert`.
* The origin URL **cannot** be a hashed URL (i.e. `/owlbert#hoot`).
* The origin URL **cannot** be a page that already exists in your project.
* The target can URL can be a relative path within your project, or a fully qualified URL elsewhere on the internet.
* The redirect should be formatted as `oldurl -> newurl`, with one redirect defined per-line.
* Redirects are performed in the order they are written; if there are multiple matches for an origin URL, the first match is used.

Here are some example redirects:

```text
/docs/top-feature-requests -> /docs/feature-requests
/docs/getting-started -> /docs/get-started
/docs/ios-sdk -> https://github.com/company/ios-sdk

/old/(\S+) -> /new/$1
/([^/\s]+)/([^/\s]+) -> /docs/$2
```

 

### Regular Expressions

You can use [regular expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)! It uses JavaScript-style regexes, and must be a full match. To use a captured value on the redirect, use `$1` (or `$2`, `$3`, etc).

If you your URL includes symbols, remember to escape them using the backslash `\`.

If you want a catch-all, use `\S+` to represent "the rest of the path."

### Troubleshooting

* Browsers cache these redirects, so changes might not work immediately.
* Regexes must be a complete match, not a partial match. You can't use `^` or `$`, because they're appended automatically.
* Redirects are tested in order they're written, and the first match is used.
* Redirects are for 404 pages only, if the page exists, it will not redirect.