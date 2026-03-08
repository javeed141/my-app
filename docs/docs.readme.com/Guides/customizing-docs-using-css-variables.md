# Customizing Docs Using CSS Variables

## Customization Options

There are two ways to customize your docs. We recommend using CSS variables; it's the easiest and safest way to add customization to your docs.

If you want to change your header background, you can set the CSS variable like so:

```css
.App {
  --Header-background: #fff;
}
```

The other option is to write custom CSS. We'll expose global class names for you to use as selectors (prefixed with `rm`):

```css
.rm-Header {
  background: #fff;
}
```

> 📘 :root vs body
>
> Our CSS vars are targeted on the `:root` selector and load in after yours, so use the `body` selector to ensure your variables take priority!

***

## Changing Your Typeface

You can change the typeface throughout your docs through the `--font-family` variable.

```css Custom CSS
.App {
  --font-family: 'Your Typeface';
}

```

If you’re using a service like Google Fonts, you'll need to include the `<link />` elements in your Custom HTML.

***

## Header

Some variables vary depending on the primary color of your header background (set in the Appearance page, if it's dark or light). You can base your CSS variable overrides on light or dark by doing:

```cs
.ThemeContext_dark {
  --Header-button-color: #fff;
}
```

### CSS Variables

| Name                         | Default Value                  | Description                                                                                      |
| :--------------------------- | :----------------------------- | :----------------------------------------------------------------------------------------------- |
| `--Header-background`        | `var(--color-primary)`         | `--color-primary` is your header background from the Appearance page of the dash.                |
| `--Header-border-color`      | `rgba(0, 0, 0, 0.1)`           |                                                                                                  |
| `--Header-border-width`      | `1px`                          |                                                                                                  |
| `--Header-button-color`      |                                | Color of button text in the header.                                                              |
| `--Header-button-hover`      |                                | Color of the button text when it's hovered over.                                                 |
| `--Header-button-active`     |                                | Color of of the button text when it is selected.                                                 |
| `--Header-button-focus`      |                                |                                                                                                  |
| `--Header-jumpTo-background` | `var(--color-primary-inverse)` |                                                                                                  |
| `--Header-jumpTo-color`      | `var(--color-primary)`         |                                                                                                  |
| `--Header-tab-padding`       | `5px 2px`                      | Amount of padding within each navigation tab (available with the Line header option).            |
| `--Header-tab-underline`     | `var(--color-primary)`         | Color of the tab underline when using tabbed navigation (available with the Line header option). |

### Global Classes

![](https://files.readme.io/fd2d896-An_Introduction_to_ReadMe-20220323-115038.png)

1. `.rm-Header`
2. `.rm-Logo`
3. `.rm-Header-top-link`
4. `.rm-Header-bottom-link`
5. `.rm-SearchToggle`
6. `.rm-Header-top-link_login`

Not pictured:

* `.rm-JumpTo`
* `.rm-Logo-img`

***

## Sidebar

### Global Classes

![](https://files.readme.io/861a758-Safari_-_An_Introduction_to_ReadMe_-_2021-10-27_at_09.55_AM.png "Safari - An Introduction to ReadMe - 2021-10-27 at 09.55 AM.png")

1. `.rm-Sidebar`
2. `.rm-Sidebar-link `
3. `.rm-Sidebar-wrapper` (wraps both heading and list)
4. `.rm-Sidebar-heading` (just the heading)
5. `.rm-Sidebar-list` (just the list)

### CSS Variables

| Name                       | Default Value        | Description                                  |
| :------------------------- | :------------------- | :------------------------------------------- |
| `--Sidebar-border-color`   | `rgba(0, 0, 0, 0.1)` |                                              |
| `--Sidebar-indent`         | `15px`               | Indentation space of subpages                |
| `--Sidebar-link-padding-y` | `5px`                | Vertical padding of each item in the sidebar |

***

## Article

### Global Classes

![](https://files.readme.io/93ce267-Safari_-_Get_changelogs_-_2021-05-25_at_01.42_PM.png "Safari - Get changelogs - 2021-05-25 at 01.42 PM.png")

1. `.rm-APISectionHeader` (this selector is used in the Playground and will affect those too)
2. `.rm-APILogInfo`
3. `.rm-APILogsTable`
4. `.rm-ParamContainer `
5. `.rm-ParamInput` or `.rm-ParamSelect`
6. `.rm-APIResponseSchemaPicker`

Not pictured:

* `.rm-Pagination` (the wrapper for the Previous / Next Page navigation buttons located at the bottom of page)

## Playground

### CSS Variables

| Name                          | Default Value                                          | Description                                                                                                              |
| :---------------------------- | :----------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------- |
| `--tryit-background`          | `var(--color-primary, #118cfd)`                        | Background color of the Try It button. `--color-primary` is your header background from the Appearance page of the dash. |
| `--tryit-background-hover`    | `var(--color-primary-darken-10, #0272d9)`              |                                                                                                                          |
| `--tryit-background-active`   | `var(--color-primary-darken-20, #0158a7)`              |                                                                                                                          |
| `--tryit-background-focus`    | `var(--color-primary-alpha-25, rgba(17,140,253,0.25))` |                                                                                                                          |
| `--tryit-background-disabled` | `var(--color-primary-darken-20, #0158a7)`              |                                                                                                                          |
| `--tryit-border-radius`       | `var(--border-radius-lg)`                              | `--border-radius-lg` defaults to 7.5px.                                                                                  |
| `--tryit-color`               | `var(--color-primary-inverse)`                         |                                                                                                                          |
| `--tryit-spinner-color`       | `var(--color-primary-inverse)`                         |                                                                                                                          |

### Global Classes

![](https://files.readme.io/561e588-Safari_-_Get_metadata_-_2021-05-25_at_01.15_PM.png "Safari - Get metadata - 2021-05-25 at 01.15 PM.png")

Language Picker:

1. `.rm-LanguageButton`
2. `.rm-LanguageButton-more`
3. `.rm-APISectionHeader` (this selector is used in the Article and will affect those too)
4. `.rm-PlaygroundRequest`
5. `.rm-TryIt`
6. `.rm-PlaygroundResponse`

***

## Global Variables

| Name                      | Default Value                                                                                                                       |
| :------------------------ | :---------------------------------------------------------------------------------------------------------------------------------- |
| `--border-radius`         | `5px`                                                                                                                               |
| `--border-radius-lg`      | `calc(var(--border-radius) * 1.5)`                                                                                                  |
| `--box-shadow-menu-light` | `0 5px 10px rgba(0,0,0,.05), 0 2px 6px rgba(0,0,0,.025), 0 1px 3px rgba(0,0,0,.025)`                                                |
| `--box-shadow-pill`       | `inset 0 1px 1px 0 rgba(255,255,255,.2), inset 0 -1px 2px 0 rgba(0,0,0,.2), 0 1px 2px 0 rgba(0,0,0,0.05)`                           |
| `--box-shadow-tooltip`    | `0 1px 2px rgba(0,0,0,.05), inset 0 -1px 2px rgba(0,0,0,.2), inset 0 1px 1px rgba(255,255,255,.2)`                                  |
| `--font-family`           | `-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif` |
| `--font-family-mono`      | `"SF Mono", SFMono-Regular, ui-monospace, "DejaVu Sans Mono", Menlo, Consolas, monospace`                                           |
| `--font-weight`           | `500`                                                                                                                               |
| `--font-weight-bold`      | `600`                                                                                                                               |
| `--transition-fast`       | `.15s`                                                                                                                              |
| `--transition-slow`       | `.3s`                                                                                                                               |
| `--transition-timing`     | `cubic-bezier(.16,1,.3,1)`                                                                                                          |

## ReadMe Markdown

We also have several variables that are specific to [ReadMe Markdown (RDMD)](https://rdmd.readme.io), which is the Markdown engine that renders all of ReadMe's Markdown content. You can read about these variables and other tips for [customizing RDMD](https://rdmd.readme.io/docs/custom-css).