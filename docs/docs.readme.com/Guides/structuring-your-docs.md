# Structuring Your Documentation

# Overview

Great API documentation isn't just about what you write—it's about how you organize it. In this guide, we'll help you craft a documentation architecture that makes your API both discoverable and easy to use. Consider this your blueprint for building a documentation experience that scales with your product and anticipates your developers' needs.

## The Architecture of Great Docs 🗺️

Think about the last time you found yourself in unfamiliar documentation. What made it easy (or difficult) to navigate? The best documentation architecture acts as a map that guides developers exactly where they need to go, regardless of their experience level.

In ReadMe, we provide flexible building blocks that let you create an intuitive structure:

* **Categories**: Top-level sections for broad topics
* **Guides**: Individual documentation pages
* **Sections**: Content divisions within a single page
* **Custom Pages**: Special-purpose pages outside the standard docs format

But the real magic isn't in these building blocks—it's in how you arrange them to support different developer journeys.

### Understanding the Developer Journey

Effective documentation architecture maps to how developers actually use your product:

1. **Discovery**: "What does this API do and is it right for my needs?"
2. **Evaluation**: "How difficult will it be to implement? What are the limitations?"
3. **First Implementation**: "How do I authenticate? What's the quickest path to a working example?"
4. **Troubleshooting**: "Why am I getting this error? How do I fix it?"
5. **Advanced Usage**: "How do I optimize performance? What are the best practices?"

Your documentation structure should provide clear pathways for each of these journeys, rather than forcing developers to piece together information scattered across different sections.

## Planning Your Documentation Structure 📝

Before diving into creating individual guides, take time to map out your overall documentation. Here are some proven architectural patterns for API documentation:

### The Getting Started Path 🚀

This pattern prioritizes a smooth onboarding experience:

```
Getting Started/
├── Quick Start Guide
├── Authentication
├── Core Concepts
└── First API Call
```

### The Use Case Model 🧩

This pattern organizes documentation around common developer scenarios:

```
Use Cases/
├── User Management/
│   ├── Creating Users
│   ├── Authentication
│   └── User Permissions
├── Data Processing/
│   ├── Uploading Files
│   ├── Processing Jobs
│   └── Retrieving Results
└── Analytics/
    ├── Generating Reports
    └── Real-time Metrics
```

### The Product-Oriented Structure 🏢

For complex APIs with multiple products or services:

```
Products/
├── Authentication Service/
│   ├── Overview
│   ├── Authentication Methods
│   └── Token Management
├── User Service/
│   ├── Overview
│   ├── User Operations
│   └── Groups & Permissions
└── Billing Service/
    ├── Overview
    ├── Payment Methods
    └── Subscription Management
```

## Choosing the Right Structure for Your API 🧠

There's no one-size-fits-all approach to documentation architecture. Consider these factors when deciding which structure works best for your API:

### API Complexity

* **Simple APIs** (1-10 endpoints): A straightforward guide-based structure with minimal categories often works best
* **Medium APIs** (10-50 endpoints): Consider organizing by resource type or common use cases
* **Complex APIs** (50+ endpoints): A multi-layered approach with product divisions and use case subcategories

### Developer Diversity

* **Single persona**: If all your developers have similar technical backgrounds and goals, a linear path works well
* **Multiple personas**: If you serve both frontend developers and backend engineers, consider parallel paths through your documentation

### Implementation Model

* **Quick integration APIs**: Prioritize getting started and authentication guides
* **Platform APIs**: Emphasize conceptual understanding before implementation details
* **Infrastructure APIs**: Focus on architectural patterns and operational considerations

## How Different Content Types Work Together 🧩

Great documentation architecture isn't just about organizing guides—it's about creating a cohesive system across all content types:

### Guides vs. API Reference vs. Recipes

Each content type serves a different purpose in your documentation architecture:

* **Guides**: Explain concepts, provide context, and teach developers how your API works
* **API Reference**: Offer comprehensive details about endpoints, parameters, and responses
* **Recipes**: Show complete, real-world examples for specific use cases
* **Changelog**: Communicate what's changed and how it impacts developers

Your architecture should make it clear when to use each type:

> 🧠 Best Practice
>
> Place your most common developer journeys front and center in your navigation. If most developers start by authenticating and setting up webhooks, make those guides prominent in your structure.

## Cross-linking for Connected Documentation 🔄

Even the best documentation structure can't anticipate every developer journey. That's why strategic cross-linking is essential:

* **Concept → Reference**: Link from conceptual explanations to relevant API endpoints
* **Reference → Guides**: Link from API endpoints to guides that explain how to use them
* **Errors → Troubleshooting**: Link from error codes to troubleshooting guides
* **Basic → Advanced**: Create clear paths from introductory content to advanced topics

In ReadMe, use the `/link` command in the editor to create these connections seamlessly.

## Testing Your Documentation Structure 🧪

How do you know if your documentation structure works? Test it with real developers:

### Simple Testing Methods

1. **Card sorting**: Ask developers to organize your documentation topics into categories
2. **Path completion**: Give developers a scenario and see if they can find the right documentation
3. **First-click testing**: See where developers click first when trying to accomplish a task

### Metrics to Watch

Once your documentation is live, pay attention to these signals:

* **Search queries**: What are developers searching for but not finding?
* **Navigation paths**: Do developers follow expected paths or jump around?
* **Time on page**: Do developers spend appropriate time on pages or bounce quickly?

## Scaling Your Documentation Architecture 📈

As your API grows, your documentation architecture needs to evolve:

### Versioning Strategy

When planning your structure, consider how you'll handle multiple API versions:

* **Separate versions**: Complete documentation sets for each API version
* **Inline versioning**: Notes within guides about version differences
* **Combined approach**: Core concepts shared across versions, with version-specific implementation details

### Multi-product Documentation

If your company offers multiple APIs or products, consider:

* **Unified navigation**: A single entry point with clear paths to different products
* **Shared concepts**: Common authentication and getting started guides
* **Product-specific details**: Dedicated sections for product-specific implementation

## Next Steps

Now that you understand the principles of documentation architecture:

1. **Map your developer journeys** before creating individual guides
2. **Choose a structural pattern** that matches your API complexity
3. **Create a content plan** that identifies what guides you'll need
4. Check out our guide on [Creating and Managing Guides](creating-and-managing-guides) to start building your content

Remember, great documentation architecture isn't about following rigid rules—it's about creating an intuitive experience that makes your API a joy to use!