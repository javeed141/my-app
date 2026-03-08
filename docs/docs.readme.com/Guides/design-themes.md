# Themes

All plans have access to customize their in the **Theme** settings. Open **Settings** in the top-left of the admin UI, then select **Theme** in the sidebar.

* Layout
* Branding (Logo, Favicon, and Colors)
* Header style

<PlanTable currentPlan="Free" />

<Callout icon="💁‍♂️" theme="default">
  **Note:** Additional customization options and services are available on Business and Enterprise plans.
</Callout>

***

## Layout

<Image align="center" width="400px" src="https://files.readme.io/3d30b1d7f55cd7e37def92bb05c5c4799bc0e1294169209626ff9a24181733cc-Launch_Week-20250628-1026262x.webp" />

You can choose between 3 layout options: Classic, Compact, and Modern. And there’s also an option to stretch the layout for larger screens. You’ll be able to preview the layout before saving.

On the **Page Settings** page, you can also add breadcrumbs, collapse categories, hide the table of contents, and more.

***

## Branding

### Logo

An option to upload a white logo is available when an alternative is needed for certain themes and header color settings.

**Format**

* SVG is preferred for the best quality.
* If your logo is too complex for an SVG, WEBP is a good alternative—use 2x of your desired logo size for clarity in high-resolution displays.
* GIFs are not supported.

**Dimensions**

* 24px height by default. In the Classic and Modern themes you can select a larger 40px height logo.

**Further Customization**

* Customers with access to Custom CSS can use our global classes and css variables to tweak their logo display further:

```css
.rm-Logo-img {
  --Header-logo-height: YOUR_CUSTOM_HEIGHT
}
```

***

## Header

<Image align="center" width="400px" src="https://files.readme.io/9c14d52d69809626037d9cb483cd2fb0619734f6ccc3c3428fd6380936a44b43-Launch_Week-20250628-1043112x.webp" />

You can choose between 4 layout options: Line, Solid Color, Gradient, and Overlay.

<Callout icon="💁‍♂️" theme="default">
  The Line header option now defaults to a tab display for links. Users with the older button display can switch. Once you switch, you will not be able to switch back.
</Callout>

**Further Customization**

* Customers with access to Custom CSS can use our global classes and css variables to tweak their header further:

```css
.rm-Header {
  --Header-background: YOUR_CUSTOM_VALUE /* defaults to your brand color */
  --Header-border-color: YOUR_CUSTOM_VALUE /* default: rgba(0, 0, 0, 0.1) */
  --Header-button-padding: YOUR_CUSTOM_VALUE /* default: 10px */

  /* Line theme only */
  --Header-tab-underline: YOUR_CUSTOM_VALUE /* defaults to your brand color */
}
```