# OpenAPI Upload and Management

Learn how to upload and manage your OAS files. 

# Overview

Creating a comprehensive API reference starts with your OpenAPI Specification (OAS). ReadMe makes it simple to transform your existing OAS file into beautiful, interactive documentation that your developers will actually enjoy using.

## Getting Started: Adding Your API Specification

To add your API specification to ReadMe:

1. Navigate to your project and click on **API Reference** from the editor UI
2. You'll see three options for creating your API reference:
   * **Upload File** (.yaml or .json)
   * **Import from URL**
   * **Build an API definition from scratch**

### Option 1: Upload Your OAS File

If you already have an OpenAPI specification file in YAML or JSON format:

1. Click **Upload File**
2. Select your .yaml or .json file
3. ReadMe will parse your specification and generate your API reference automatically

### Option 2: Import from URL

If your OAS file is hosted online:

1. Click **Import from URL**
2. Enter the URL where your specification is hosted
3. Click **Import**
4. ReadMe will fetch and parse your specification

### Option 3: Build from Scratch

Don't have an OAS file yet? No problem!

1. Click **Start Building** in the "Build an API definition from scratch" section
2. Use our intuitive API Designer (formerly called manual editor) to create your API specification
3. Add endpoints, parameters, response codes, and examples without writing any YAML or JSON

## Managing Your API Definitions

After successfully adding your specification, you'll see it in the left navigation panel. Here's how to manage it:

### Viewing Your API Definitions

1. Click on **API Definitions** to see a list of all your uploaded specifications
2. Each definition shows:
   * Name of your API
   * Last update timestamp
   * Import method (File Upload, URL, etc.)

### Adding Additional API Definitions

Need to add another API or version?

1. Click the **+ Add** button in the top right of the API Definitions page
2. Choose your preferred import method again (Upload, URL, or Build)

### Managing Editing Permissions

To prevent accidental changes to your specification:

1. Click the **Gear icon** next to the Add button
2. Toggle the **Allow Editing** switch off
3. This is useful when you manage your OAS file externally and want to prevent changes within ReadMe

### Editing Your API Definition

To make changes to your specification:

1. Find your API definition in the list
2. Click the **Ellipses** (three dots) menu
3. Choose from these options:
   * **Edit Definition**: Make changes to your API configuration
   * **View OAS**: Open your raw OpenAPI Specification in a new tab
   * **Replace OAS**: Upload a new version of your specification
   * **Delete**: Remove this API definition

### Editing API Settings

When editing your API definition, you can configure:

1. **API Title**: The display name of your API
2. **Target Host URL**: The base URL for making API calls
3. **Authentication Type**: Configure how developers will authenticate with your API
   * None
   * API Key
   * Basic
   * Bearer

## Best Practices

* **Keep it updated**: Whenever your API changes, update your specification to ensure your documentation stays accurate
* **Use detailed descriptions**: Take advantage of the description fields in your OAS file to provide context
* **Include examples**: Add request and response examples to help developers understand your API
* **Disable editing** if you manage your specification externally to prevent conflicting changes
* **Use versioning** for major API changes to help developers migrate smoothly

By following these steps, you'll create a professional, interactive API reference that helps developers succeed with your API.