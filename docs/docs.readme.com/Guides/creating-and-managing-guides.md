# Creating and Managing Guides

# Overview

Let's dive into the nuts and bolts of organizing your documentation in ReadMe. From creating new guides to managing content over time, this guide will show you how to build and maintain a well-structured knowledge base that helps developers find exactly what they need, when they need it.

### Why Guides Matter

Guides are the backbone of your developer documentation. While your API reference tells developers what's possible, guides show them how to be successful. Great guides:

* Guide developers from novice to expert
* Provide context that API references can't capture
* Answer the "why" alongside the "how"
* Solve real-world problems developers encounter

## Creating Your First Guide

### Creating Categories 📂

Categories help you organize your documentation into logical sections, working like chapters in your API's story. Each category creates a natural break in your documentation's narrative, making it easier for developers to follow along.

1. Navigate to your documentation hub and toggle into **Edit Mode**.
2. Click the **+ NEW CATEGORY** button in the sidebar navigation.
3. Enter a name for your category (e.g., "Getting Started" or "Advanced Topics")
4. Click **Enter** to save.

> 📘 User Experience
>
> Think about your developer's journey when naming categories. What would make the most sense to someone exploring your API for the first time? Consider organizing categories by skill level (beginner to advanced) or by use case.

### Creating a Guide Page 📝

Now that you've got your categories set up, let's add some pages:

1. In **Edit** mode, hover over a category and click the **+** button
2. Fill in the essential details:
   * **Title**: Make it clear and descriptive
   * **Slug**: This will be the URL path (automatically generated, but you can customize it)
   * **Hidden**: Toggle this on if you want to work on the guide before making it public
3. Click **Save** to create your new guide

### Using the Editor UI ✏️

<Image align="center" src="https://files.readme.io/53c229bb50f36b2a6398894e5de72e9909397911c2deba6c77e629733e714a99-Editing_UI_-_view_to_edit_toggle.gif" />

With ReadMe's editing UI, you'll create and edit content directly on your hub. This means what you see is exactly what your developers will see.

1. After creating your page, you'll be in the editor automatically
2. Use the formatting toolbar for basic text styling
3. Type `/` to access the command menu for inserting:
   * Code blocks
   * Callouts
   * Images
   * And more!
4. Toggle between **Edit** and **View** modes to see exactly how your content will appear to developers

<Image align="center" src="https://files.readme.io/a106664539184b9eebb366fd2c51ed5ba10ca5c1224c0ce52a209dd8c08ac143-CleanShot_2024-11-08_at_20.24.59.gif" />

> 📘 Complete control of your Markdown
>
> ReadMe's Raw Mode lets you add new content and edit existing content directly in Markdown. Just open the three-dot menu next to the visibility settings and choose **Raw Mode**.

## Structuring Effective Guides

### The Anatomy of a Great Guide

Successful guides follow a consistent structure that helps developers quickly understand and apply information:

1. **Clear Introduction**: What problem does this guide solve?
2. **Prerequisites**: What should developers know or have before starting?
3. **Step-by-Step Instructions**: Break down complex processes into manageable steps
4. **Code Examples**: Show, don't just tell
5. **Troubleshooting**: Address common issues and their solutions
6. **Next Steps**: Where should developers go after completing this guide?

### Writing for Developers

When writing guides, remember that developers want to solve problems quickly:

* **Be concise**: Get to the point and avoid unnecessary explanations
* **Use code examples liberally**: Developers often understand code faster than prose
* **Highlight important information**: Use callouts for warnings, tips, and important notes
* **Break up text**: Use headings, lists, and short paragraphs to improve readability
* **Use real-world examples**: Show code that solves actual problems

> 📘 Keep it Real
>
> Use authentic code examples that demonstrate realistic implementations. If you're showing authentication, use a complete example with error handling. If you're demonstrating data retrieval, show how to process and use that data in a practical way. Real-world examples help developers bridge the gap between documentation and implementation.

```javascript
// Good example - with meaningful comments and clear variable names
const apiKey = 'your_api_key_here';

// Initialize the client with your API key
const client = new ReadMeAPI(apiKey);

// Fetch user data and handle potential errors
try {
  const userData = await client.getUser(userId);
  console.log(`Found user: ${userData.name}`);
} catch (error) {
  console.error(`Error fetching user: ${error.message}`);
}
```

## Enhancing Guides with MDX

ReadMe now supports MDX (Markdown + JSX), giving you the power to create interactive documentation with reusable components.

### Basic MDX Components

Here's an example of our built-in MDX tab components you can use to enhance your guides:

<Tabs>
  <Tab title="Node.js">
    ```javascript
    const client = new ReadMeAPI(apiKey);
    ```
  </Tab>

  <Tab title="Python">
    ```python
    client = ReadMeAPI(api_key)
    ```
  </Tab>

  <Tab title="Ruby">
    ```ruby
    client = ReadMeAPI.new(api_key)
    ```
  </Tab>
</Tabs>

### Creating Reusable Content

For content you'll use across multiple guides, [create reusable content blocks](https://docs.readme.com/main/docs/reusable-content)

1. Navigate to **Content Settings** in the editing UI
2. Select **Reusable Content**
3. Create blocks for common elements like:
   * API authentication steps
   * Environment setup instructions
   * Standard code patterns
4. Insert them into any guide with the `/` command

## Organizing Your Documentation

### Creating a Documentation Strategy

Before diving into individual guides, consider your overall documentation structure:

1. **Map the developer journey**: What path do developers take from first sign-up to advanced usage?
2. **Identify knowledge gaps**: Where do developers typically get stuck?
3. **Create progressive learning paths**: How can each guide build on previous knowledge?

### Guide Types to Consider

Different guides serve different purposes:

* **Getting Started**: Onboarding new developers
* **Tutorials**: Step-by-step instructions for specific tasks
* **Conceptual Guides**: Explaining complex ideas or architecture
* **How-To Guides**: Focused instructions for specific features
* **Troubleshooting**: Solutions to common problems

## Maintaining Guides Over Time

### Keeping Content Fresh

Documentation requires regular maintenance:

1. Schedule regular review cycles (quarterly works well)
2. Update guides, and your changelog, when features change
3. Watch for user feedback that indicates confusion
4. Monitor analytics to see which guides need improvement

### Versioning Considerations

If your API has multiple versions:

1. Use ReadMe's versioning feature to maintain separate documentation sets
2. Clearly mark version-specific information
3. Consider using callouts to highlight differences between versions

## Collaborating with Git Integration

With ReadMe's [bi-directional Git sync](https://docs.readme.com/main/docs/bi-directional-sync), you can now collaborate on documentation using familiar Git workflows:

1. Connect your ReadMe project to GitHub/GitLab
2. Edit documentation files directly in your repository
3. Changes sync automatically to your ReadMe project
4. Use pull requests and reviews for documentation changes

## Measuring Success

### Using Analytics

ReadMe provides insights into how developers use your documentation:

1. Monitor page views to identify popular guides
2. Track search queries to find missing information
3. Use this data to prioritize documentation improvements

### Gathering Feedback

Create feedback loops to continuously improve:

1. Enable discussions on guides
2. Regularly review questions and comments
3. Update guides based on common questions

## Next Steps

Now that you know how to create and manage guides in ReadMe, try:

* Creating your first category and guide
* Experimenting with MDX components
* Setting up a documentation review process
* Connecting your documentation to GitHub for collaborative editing

Need more help? Check out our other resources:

* [MDX Documentation](https://docs.readme.com/main/docs/mdx)
* [Bi-Directional Sync Setup](https://docs.readme.com/main/docs/bi-directional-sync)