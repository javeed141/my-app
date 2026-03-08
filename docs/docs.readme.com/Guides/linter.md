# Linter

An AI-powered way to check page content against your own style guide.

The Linter automates content validation by checking documentation against your company’s style guide and established writing standards. It streamlines the manual review process writers typically perform with external tools.

You can configure custom rules to enforce code formatting, word choice, and adherence to internal style and best practices. Whether your documentation includes custom HTML or extensive code samples, the linter ensures consistency across all your docs.

<PlanTable currentPlan="Startup" />

***

## Configure

You can add prompts to the Linter that are categorized as style guide, errors, or warnings.

By default, the Linter automatically detects broken links, so you do not need to define a rule for link validation.

<Image border={false} src="https://files.readme.io/6844539c6c370fbc5fe87fa2bab007e50aa4fb52673fa629d247d0836534c971-image.png" />

**Style Guide**: Write about what makes for great docs and the Linter will score your content. Example:

> Keep it short:
>
> Short text is always better. Short paragraphs are easier to read. Try to keep headings to one line. Two-line headings take up twice as much vertical space. Use short words in headings; if a customer uses larger fonts to improve accessibility, long words may break across lines.

<br />

> Clarity:
>
> Clear and concise text for easy scanning and readability. Get to the point so users can easily find what they need. Don’t use excessive words.

<br />

> Natural and human tone:
>
> Use everyday words that’s easy to understand. Less format but more professional than everyday conversation. Occasionally use a fun tone for celebratory moments but never for informational text. Be warm and supportive to users reading the docs.

<br />

**Errors**: Rules that can be checked objectively. Example:

> Capitalize ReadMe properly:
>
> Bad: Readme
>
> Good: ReadMe

<br />

> Wrap code elements in backticks (\`):
>
> Bad: Run npm install –g my–package
>
> Good: Run `npm install –g my–package`

<br />

> Flag placeholder text like TODO, FIXME, or Lorem ipsum
>
> Example: TODO: Add description and image to this feature

<br />

**Warnings**: To point out issues that may be subjective. Example:

> Hedging Language:
>
> Avoid using uncertain or overly cautious language. It undermines confidence and make your instructions less direct. Opt for clear, confident language.
>
> Bad: You might want to consider installing the latest version.
>
> Good: You can install the latest version to access new features.

<br />

> Weak writing:
>
> Avoid weak writing like ‘You can’ or ‘There is’. These phrases bury the action, make writing less direct, and often add unnecessary words. Strong docs are clear and action-oriented.
>
> Bad: You can configure the API by editing the settings file.
>
> Good: Configure the API by editing the settings file.

<br />

> Active voice:
>
> Refrain from using passive voice. Active voice is clearer, shorter, and tells the reader exactly who is doing what.
>
> Bad: The token is generated when the user logs in.
>
> Good: The system generates a token when the user logs in.

<br />

## Running the Linter

Once configured, running the Linter checks your page against your prompts. Issues can be fixed automatically using the Agent.

<Image align="center" border={false} width="350px" src="https://files.readme.io/02345a8505f8f89eaa3d97019252e3cfc3c9e16fdaed63ac7ed7b6df97b765f5-linter.png" />

<br />

## FAQ

<Accordion title="Where should I send feedback or questions?" icon="fa-messages-question">
  Email feedback or questions to [support@readme.io](mailto:support@readme.io)
</Accordion>

<Accordion title="What model does the Linter use?" icon="fa-wand-sparkles">
  At the moment we use GPT—though that may change as we adjust to balance quality and speed. In the future users will have the option to select models of their choice.
</Accordion>