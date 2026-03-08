# Troubleshoot MDX Errors

During the migration process, ReadMe attempts to automatically convert your Markdown to MDX. Some content is unable to be converted faithfully and may fail to render.

When that happens, you’ll see errors that look like the image below if you have invalid MDX and our parser is unable to render your page. Your customers will not see pages with errors in your doc’s navigation and will not be able to access the page’s content.

<Image align="center" border={false} width="400px" src="https://files.readme.io/0fa2d61ff0b24cb05b837173b1bdaa77afca753ec9ef01d42bf373c9cfacb210-kevin_DM_-_ReadMe_-_Slack-20241121-1206382x_1.png" />

If you have HTML that is not compatible with JSX<sup>[1](#1)                                                            </sup> (the syntax MDX is written in), you’ll need to rewrite some HTML. JSX is written similarly to HTML, but with some key differences.

<Callout icon="📣" theme="default">
  You can continue to write HTML in the HTML block. Any HTML outside the block, will need to be converted to JSX.
</Callout>

## Closing Tags

JSX requires that every tag be closed explicitly. The most common issue when converting Markdown to MDX is updating any self-closing tags for void elements<sup>[2](#2)                                                            </sup>. Here are a few of the most common examples:

<Columns layout="fixed">
  <Column>
    <i className="fa-duotone fa-solid fa-square-x" /> Markdown (HTML)

    ```
    <br>
    <img>
    <hr>
    ```
  </Column>

  <Column>
    <i className="fa-duotone fa-solid fa-circle-check" />> MDX (JSX)

    ```
    <br />
    <img />
    <hr />
    ```
  </Column>
</Columns>

All JSX-style tags must be explicitly closed, including self-closing tags.

<Columns layout="fixed">
  <Column>
    <i className="fa-duotone fa-solid fa-square-x" /> Markdown (HTML)

    ```
    <p>Content
    <ul>
      <li>1
      <li>2
      <li>3
     </ul>
    <option>Small owl
    <option>Large owl

    ```
  </Column>

  <Column>
    <i className="fa-duotone fa-solid fa-circle-check" /> MDX (JSX)

    ```
    <p>Content</p>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
    </ul>
    <option>Small owl</option>
    <option>Large owl</option>
    ```
  </Column>
</Columns>

## Attributes

Most attributes will need to be camelCase<sup>[3](#3)                                                             </sup>—*except* `data-` and `aria-`. Inline styles will need to be an object `{}` and those properties also must be camelCase when written in JSX (does not apply if you’re writing CSS in a `<style />` tag.

<Columns layout="fixed">
  <Column>
    <i className="fa-duotone fa-solid fa-square-x" /> Markdown (HTML)

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
    <i className="fa-duotone fa-solid fa-circle-check" /> MDX (JSX)

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

## Comments

JSX also has a different syntax for comments. Any HTML comments will be escaped and displayed as paragraph text in your docs. ReadMe will continue to strip comment content from your markup.

<Columns layout="fixed">
  <Column>
    <i className="fa-duotone fa-solid fa-square-x" /> Markdown (HTML)

    ```
    <!-- Comment -->
    ```
  </Column>

  <Column>
    <i className="fa-duotone fa-solid fa-circle-check" /> MDX (JSX)

    ```
    {/* Comment */}
    ```
  </Column>
</Columns>

## Variables

Our variable syntax has changed, and will instead use a JavaScript object syntax for using variables.

<Columns layout="fixed">
  <Column>
    <i className="fa-duotone fa-solid fa-square-x" /> Markdown (HTML)

    ```
    <<variable>>
    ```
  </Column>

  <Column>
    <i className="fa-duotone fa-solid fa-circle-check" /> MDX (JSX)

    ```
    {example.variable}
    ```
  </Column>
</Columns>

## Invalid HTML

Writing invalid HTML in your markup won’t render in your docs, and cause render errors in MDX. They can be escaped to appear as plain text (written as `/<world>`) or need to be removed.

<Columns layout="auto">
  <Column>
    <i className="fa-duotone fa-solid fa-square-x" /> Invalid

    ```
    Hello <world>!
    ```
  </Column>
</Columns>

<Callout icon="📘" theme="info">
  **Tip:** You can use an [online converter](https://transform.tools/html-to-jsx) to convert HTML to JSX. And you can always reach out to [support@readme.io](mailto:support@readme.io) if you need help or have questions.
</Callout>

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

***

<span class="footnote" id="1">\[1] JavaScript Syntax eXtension lets you write HTML-like markup in JavaScript</span>

<br />

<span class="footnote" id="2">\[2] Void elements are HTML elements that cannot have any child nodes [**MDN** List of void elements](https://developer.mozilla.org/en-US/docs/Glossary/Void_element)                                                           </span>

<br />

<span class="footnote" id="3">\[3] Camel case is a way of writing phrases without spaces or punctuation. The first word starts with lower case, and subsequent ones in uppercase. For example: `backgroundColor` and `strokeWidth` </span>

<br />

<HTMLBlock>
  {`
  <!-- footnote CSS -->
  <style>
    :target {
      background: var(--yellow90);
    }
    
    .footnote {
      font-size: 0.9em;
      
      a {
        color: var(--color-text-minimum);
      }
    }
  </style>
  `}
</HTMLBlock>

<HTMLBlock>
  {`
  <!-- style guide CSS -->
  <style>
    .migrating-column {
      border: 1px solid var(--color-border-default);
      border-radius: var(--border-radius);
      display: flex;
      justify-content: center;
      
      + .migrating-column {
        margin-top: 1em;
      }
      
      section {
        flex: 1 1 50%;
        overflow: hidden;
        
        + section {
          border-left: 1px solid var(--color-border-default);
        }
      }
      
      pre {
        background: transparent;
        border: 0;
        border-radius: 0;
        font-size: 0.8em;
        margin: 0;
        overflow: auto;
        padding: 15px;
        
        + pre {
          border-top: 1px solid var(--color-border-default);
        }
      }
      
      header {
        align-items: center;
        border-bottom: 1px solid var(--color-border-default);
        display: flex;
        font-size: 15px;
        font-weight: var(--font-weight-bold);
        gap: 0.5em;
        padding: 1em;
      }
      
      .fa-handshake {
        color: var(--yellow);
      }

      .fa-circle-check {
        color: var(--green);
      }

      .fa-hexagon-exclamation {
        color: var(--red);
      }
    }
  </style>
  `}
</HTMLBlock>