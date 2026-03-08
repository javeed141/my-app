# Custom CSS and JavaScript

Only select plans include access to Custom CSS and JavaScript. See the table below for details:.

|                       | Free                                          | Startup                                       | Business                                          | Enterprise                                        |
| :-------------------- | :-------------------------------------------- | :-------------------------------------------- | :------------------------------------------------ | :------------------------------------------------ |
| **Custom CSS**        | <i class="fa-duotone fa-solid fa-square-x" /> | <i class="fa-duotone fa-solid fa-square-x" /> | <i class="fa-duotone fa-solid fa-circle-check" /> | <i class="fa-duotone fa-solid fa-circle-check" /> |
| **Custom JavaScript** | <i class="fa-duotone fa-solid fa-square-x" /> | <i class="fa-duotone fa-solid fa-square-x" /> | <i class="fa-duotone fa-solid fa-square-x" />     | <i class="fa-duotone fa-solid fa-circle-check" /> |

<HTMLBlock>
  {`
  <style>
    td:nth-child(n+1) {
      font-size: 0.85em;
    }
    td .fa {
      font-size: 1rem;
    }
    .fa-circle-check {
      color: var(--green);
    }
    .fa-square-x {
      color: var(--red);
    }
  </style>
  `}
</HTMLBlock>

***

## Adding CSS/JS

Add custom CSS or JavaScript to control the look and behavior of your docs. Use the side-by-side preview to see your changes in real time as you edit.

<Image align="center" caption="Admin Settings → Custom CSS, JS, HTML" src="https://files.readme.io/cbf7f36ec4d8286b8672df736e322ce30375273a3550280f763fd3ac2c78a5b1-custom_css.png" />

> 🚧 Selectors
>
> Use `.rm-` prefixed selectors. Hashed selectors change constantly and **should not** be relied on as selectors (ie. `Header-bottom2eLKOFXMEmh5`).

## Custom Stylesheet

<Callout icon="📘" theme="info">
  You should limit your changes to minor tweaks. Additionally, stylesheets aren't versioned; all versions use the same stylesheet.
</Callout>

## Custom Javascript

Your Javascript will be included at the bottom of the page.

<details>
  <summary><b>Global Variables</b></summary>

  ReadMe exposes certain global variables to help you customize the user experience of your hub:

  * **`RM_ReferenceSidebarScrollTopOffset`**\
    Pixel offset for the scroll-to-active-item sidebar logic in continuous <Glossary>Reference</Glossary> sections.
</details>

## Custom Include Tags

**Header HTML**

Any html here will be included in the head tag, which is good for things like meta tags and loading external CSS or JS.

**Footer HTML**\
​\
This will go right before the `</body>` tag. Good for things like analytics and tracking.

## Toggling Custom Javascript and CSS

Add the `?disableCustomCss=true&disableCustomJs=true` query params to the end of any URL.