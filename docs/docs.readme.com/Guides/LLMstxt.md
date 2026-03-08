# LLMs.txt

Control how AI language models interpret your API documentation

## Overview

With our new [LLMs.txt](https://llmstxt.org/) feature, you can teach AI models how to properly understand and represent your API documentation. This allows you to provide the context that AI assistants like ChatGPT or Claude need to accurately answer questions about your API without hallucinating (making things up). Setting it up takes literally seconds – just flip a toggle and we'll generate the configuration file automatically. Behind the scenes, we're creating metadata that helps AI systems understand your documentation's structure, terminology, and most up-to-date information. LLMs.txt is available on all plans.

The result? Developers get accurate answers about your API even when they're asking AI tools instead of reading your docs directly. It's documentation that works everywhere your developers do!

## Benefits

* **Accuracy**: Helps AI models represent your documentation correctly
* **Consistency**: Ensures proper terminology and version information
* **Relevance**: Guides AI models to the most up-to-date information
* **Zero Maintenance**: Automatically generated based on your existing documentation

## How It Works

LLMs.txt works as a configuration file at the root of your documentation site that AI language models can access and interpret. This file functions as a technical guide that instructs AI systems on how to properly read and reference your content.

When enabled, ReadMe automatically generates this configuration file based on your existing documentation structure. The file contains metadata about:

* The organization of your documentation (guides, API reference, recipes, etc.)
* Version information to ensure AI models reference the most current documentation
* Important terminology specific to your API
* Hierarchical structure of your content

AI models that support LLMs.txt will check for this file before generating responses about your API. When they find it, they'll use the instructions to provide more accurate information, reducing the chances of outdated references or incorrect terminology.

For example, if you've recently renamed endpoints or changed parameter requirements, LLMs.txt helps ensure AI assistants don't provide outdated information to developers using your API.

## Getting Started

Enable LLMs.txt in just a few clicks to help AI models accurately represent your API documentation.

#### ReadMe Refactored

For projects using the ReadMe Refactored interface:

1. Navigate to your project hub.
2. Click the **AI Settings (✨ Sparkle Icon)** in the top right menu.
3. Toggle **Enable LLMs.txt** to ON.
4. Click **Save**.

#### ReadMe Legacy

1. Go to **Configuration** > **AI Settings**.
2. Toggle **Enable LLMs.txt** to ON.
3. Click **Save**.