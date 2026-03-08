# MDX

Writing docs in ReadMe is done in [Markdown eXtended](https://mdxjs.com) (MDX), which is based on the [CommonMark specification](https://commonmark.org). Unlike pure Markdown, MDX uses a slightly different syntax called [Javascript XML](https://react.dev/learn/writing-markup-with-jsx) (JSX). There are some slight differences when writing MDX compared to Markdown if you’re attempting to write HTML.

## Markdown vs MDX

All pages in ReadMe use MDX to offer you the ability to write reusable and interactive components. Generally, it shouldn’t make a difference when writing Markdown—unless you’re writing HTML. It *looks* like HTML, but is stricter. The most common issue is that you cannot have self-closing tags in JSX:

<Columns layout="auto">
  <Column>
    <i className="fa-duotone fa-solid fa-square-x" /> Invalid

    ```
    <br>
    <img>
    <hr>
    ```
  </Column>

  <Column>
    <i className="fa-duotone fa-solid fa-circle-check" /> Valid

    ```
    <br />
    <img />
    <hr />
    ```
  </Column>
</Columns>

All JSX-style tags must be explicitly closed, including self-closing tags.

<Columns layout="auto">
  <Column>
    <i className="fa-duotone fa-solid fa-square-x" /> Invalid

    ```
    <p>Content
    <ul>
      <li>1
      <li>2
      <li>3
    </ul>
    ```
  </Column>

  <Column>
    <i className="fa-duotone fa-solid fa-circle-check" /> Valid

    ```
    <p>Content</p>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
    </ul>
    ```
  </Column>
</Columns>

Most attributes will need to be camelCase—except `data-` and `aria-`. Inline styles will need to be an object `{}` and those properties also must be camelCase when written in JSX (does not apply if you’re writing CSS in a `<style />` tag.

<Columns layout="auto">
  <Column>
    <i className="fa-duotone fa-solid fa-square-x" /> Invalid

    ```
    <img 
      aria-label="my label" 
      class="my-class" 
      style="
        margin-left: auto; 
        margin-right: auto;
      "
    >
    ```
  </Column>

  <Column>
    <i className="fa-duotone fa-solid fa-circle-check" /> Valid

    ```
    <img 
      aria-label="my label" 
      className="my-class" 
      style={{ 
        marginLeft: 'auto', 
        marginRight: 'auto' 
      }}
    />
    ```
  </Column>
</Columns>

<HTMLBlock>
  {`
  <style>
    .fa-square-x {
      color: var(--red);
    }

    .fa-circle-check {
      color: var(--green);
    }
  </style>
  `}
</HTMLBlock>

<Callout icon="📘" theme="info">
  **Tip:** If you're running into other quirks or errors when working with MDX, check out [Troubleshoot MDX Errors](https://docs.readme.com/main/docs/rendering-errors-invalid-mdx) for more common issues.
</Callout>

## Writing JSX

<Image align="center" border={false} src="https://files.readme.io/a29c8744b62ec4b51e366e91a012533f9c6e21638db2c425358cec92a7058d7d-CleanShot_2024-11-08_at_20.10.29.gif" />

When editing your docs, you can write dynamic components in JSX, in a few ways:

1. **On the page:** Write your JSX in plain text. The editor will automatically parse your syntax and highlight your JSX.

2. **[Reusing Components](https://docs.readme.com/main/docs/building-custom-mdx-components/):** To write a component you can reuse in any page, open your **Settings** and navigate to the **Custom Components** page. Once you write your first component, you can reuse them on any page: `<ExampleComponent />`

3. **[Out-of-the-box](https://docs.readme.com/main/docs/built-in-components/):** Our editor makes it easy to use components we’ve built into ReadMe. You can find them by opening the command menu by typing `/` in the editor. Under the **Component** section, you can choose the `Tabs`, `Accordion`, `Columns`, or `Cards` components.

4. **Public Components:** We also maintain a [component marketplace](https://github.com/readmeio/marketplace) where anyone can submit a component.

<br />