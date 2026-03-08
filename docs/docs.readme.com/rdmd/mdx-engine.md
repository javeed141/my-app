# MDX in ReadMe

MDX combines the simplicity of Markdown with the power of JSX, allowing you to create rich, interactive documentation by integrating React components into your Markdown content. [Learn more about MDX](https://mdxjs.com/).

## MDX Versus Markdown

> 📘 Debugging MDX
>
> Just a quick reminder: the MDX format can be a bit strict, so you might encounter some compilation errors. If you run into any issues, feel free to use the [MDX playground](https://mdxjs.com/playground/) to troubleshoot them and ensure your syntax is on point.

MDX builds upon standard Markdown syntax, allowing you to seamlessly integrate JSX (JavaScript XML) into your content. Here's how MDX differs from regular Markdown:

### Components

In MDX, you can use React components directly in your Markdown:

```jsx
# My Heading

This is regular Markdown text.

<MyCustomComponent />

Back to Markdown again!
```

### JavaScript Expressions

MDX allows you to use JavaScript expressions within curly braces:

```jsx
# {frontmatter.title}

The current date is {new Date().toDateString()}
```

### HTML and Markdown Interoperability

MDX allows you to freely mix HTML, JSX, and Markdown:

```jsx
# Welcome

<div style={{ padding: '20px', backgroundColor: 'lightgrey' }}>
  This is a **Markdown** paragraph inside a <div>.
</div>
```

Remember, all standard Markdown syntax still works in MDX, so you can use it just like regular Markdown and gradually incorporate more advanced features as needed.

***

## New MDX Components

We’re excited to introduce three powerful MDX components that you can start using right away in your documentation. These components are designed to enhance the structure and interactivity of your content, making it more engaging and user-friendly. Let's take a look at each of these components:

### Tabs

Tabs allow you to organize content into separate, easily navigable sections:

<Image align="center" src="https://files.readme.io/dee511d8c6e122ee0c5aaa598c095997d1e36b181a379332f1608937533fe66f-Tabs_Gif.gif" />

### Accordion

Accordions help you present information in a collapsible format:

<Image align="center" src="https://files.readme.io/855dfaf61fe8062be00705f5f84bfb761ff7bf3c001c971b5fef381bf180e246-Accordion_GIF.gif" />

### Cards

Cards allow you to display content in a grid-like structure:

<Image align="center" src="https://files.readme.io/fcfd7c0632576e42a1ca145f22a0702bec6eaf8a144c4075795d4d0b7a0d974d-MDX_Cards.png" />

***

## Using Built-In Components

You can easily access our 3 built-in components by using the slash (/) command. Once you choose a component, the editor will automatically insert an editable example for you. In the example below, you can see how the **Tabs** component works.

<br />

<Image align="center" src="https://files.readme.io/86ead321fe8cbe02d13010abaf1b9143fd5034da408ed9e8565e0d3e55a3f794-MDX_slash_commands.gif" />

***

## Copying and Pasting JSX Components

When copying JSX from the documentation and pasting it into your own docs, make sure to paste it in raw mode. This ensures that the code will render as expected in production.

### JSX Tabs

```jsx JSX (Tabs)
<Tabs>
 <Tab title="First Tab">
  Welcome to the content that you can only see inside the first Tab.
 </Tab>
 <Tab title="Second Tab">
  Here's content that's only inside the second Tab.
 </Tab>
 <Tab title="Third Tab">
  Here's content that's only inside the third Tab.
 </Tab>
</Tabs>
```

***

### JSX Accordion

```jsx JSX (Accordion)
<Accordion title="My Accordion Title" icon="fa-info-circle" iconColor="#8470be">
  Lorem ipsum dolor sit amet, **consectetur adipiscing elit.** Ut enim
  ad minim veniam, quis nostrud exercitation ullamco. Excepteur sint
  occaecat cupidatat non proident!
</Accordion>
```

***

### JSX Cards

```jsx JSX (Cards)
<Cards columns={4}>
  <Card title="First Card" href="https://readme.com" icon="fa-home" target="_blank">
    Neque porro quisquam est qui dolorem ipsum quia
  </Card>
  <Card title="Second Card" icon="fa-user">
    *Lorem ipsum dolor sit amet, consectetur adipiscing elit*
  </Card>
  <Card title="Third Card" icon="fa-star">
    > Ut enim ad minim veniam, quis nostrud ullamco
  </Card>
  <Card title="Fourth Card" icon="fa-question">
    **Excepteur sint occaecat cupidatat non proident**
  </Card>
</Cards>
```

***

## Changes to Glossary Terms

With the switch to MDX, the format for creating glossary terms has changed. Previously, you'd use double angle brackets to create a glossary term:

```text
\<<glossary:term>>
```

Now, with MDX, you'll use a `<Glossary>` component to create glossary terms:

```jsx
<Glossary>term</Glossary>
```

***

## Future Release: Create Your Own Reusable MDX Components

In an upcoming release, we're excited to announce that you'll be able to create your own reusable MDX components:

1. **Custom Components**: Design and implement components tailored to your specific documentation needs.
2. **Consistency**: Ensure uniformity across your documentation by reusing your custom components.
3. **Efficiency**: Save time by creating components for frequently used content structures or styles.
4. **Advanced Interactivity**: Build complex, interactive elements that can be easily inserted into any MDX document.

Stay tuned for more information on this and other exciting features!

## Migration Plan

We’re migrating content to MDX to select users without disrupting your ongoing projects.

## FAQs

**Q**: Will my existing documentation be affected immediately?\
**A**: Your current documentation will continue to work with traditional Markdown and MDX.

**Q**: Are there any prerequisites for switching to MDX?\
**A**: Nope! MDX documents will be editable in a Markdown-like fashion by default.