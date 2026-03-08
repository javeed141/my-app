# Specifying Child Path Names

You can customize the URL structure for parent projects so that the child project will be mapped to a particular value.

By default, your child projects will be mapped to the subdomain for the particular project. If your parent's subdomain is `parent-test` and the child project's subdomain is `child-test`, then a page URL would be mapped to potentially something like [`https://parent-test.readme.io/child-test`](https://parent-test.readme.io/child-test`).

If you customize the child pathname to, say, `custom-name`, then that URL above would change to [`https://parent-test.readme.io/custom-name`](https://parent-test.readme.io/custom-name). You can navigate to the parent project's custom domain view, and set the Child Path Names below.

<Image alt="Domain settings page in the Enterprise dashboard. In the Child Path Names section, `custom-name` is specified for the first project's child path." width="smart" src="https://files.readme.io/b03df6a-Screen_Shot_2022-11-23_at_1.08.50_PM.png">
  You can specify child paths in the "Manage Domain" settings.
</Image>

<Image title="Screen Shot 2021-05-11 at 3.31.30 PM.png" alt={2170} border={true} src="https://files.readme.io/6a35cad-Screen_Shot_2021-05-11_at_3.31.30_PM.png">
  This child project's subdomain is `blank-project-1`, but the URL shows `custom`
</Image>