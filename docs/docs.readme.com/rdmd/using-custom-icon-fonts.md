# Custom Callout Icons

<div id="my-theme">
  Emojis are already a *pretty* good starting point as default icon options go! There are a *lot* of emojis, which are supported across nearly all platforms. But what if we're going for a different look, or need to match our docs to a branding kit? Icons are a big part of setting the "tone" for your site! With a touch of Custom CSS, we should be able to get the callout's 📷 emoji to display as an icon font glyph!

  ```css Custom CSS
  .callout[theme=📷] {
    --emoji: unset;
    --icon: "\f083"; /* copied front FontAwesome */
    --icon-color: #c50a50;
  }
  ```

  ```Markdown Syntax
  > 📷 Cool pix!
  >
  > Vitae reprehenderit at aliquid error voluptates eum dignissimos.
  ```

  This works like a charm:

  > 📸 Cool pix!
  >
  > Vitae reprehenderit at aliquid error voluptates eum dignissimos.

  <details>
    <summary>Custom Icon Font</summary>

    <hr />

    The custom icon font defaults to `FontAwesome`, but you can use any font family available on the page by setting the `--icon-font` variable!

    ```css
    .callout[theme=📷] {
      --icon-font-family: FontAwesome; /* copied from https://fontawesome.com/v4.7.0/icon/camera-retro */
    }
    ```

    > 🚧 Custom Icon Limitations
    >
    > Callout icon customizations only support icon font families.
  </details>

  <hr />

  <HTMLBlock>
    {`
    <style>  
      #my-theme .callout[theme=📸] {
        --emoji: unset;
        --icon: "";
      }
      #my-theme .callout[theme=📷],
      #my-theme .callout[theme=📸] {
        --icon-color: #c50a50;
        --border: var(--icon-color);
        --title: var(--icon-color);
      }
      details, summary {
        outline: none;
      }
    </style>
    `}
  </HTMLBlock>
</div>