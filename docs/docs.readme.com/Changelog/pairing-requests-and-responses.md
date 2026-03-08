# Pairing Requests & Responses

<Image align="center" src="https://files.readme.io/88abeab-Request_Response_2.gif" />

We’ve added the ability to pair request examples with their respective responses when using the `code-samples` [extension](https://docs.readme.com/main/docs/openapi-extensions#corresponding-response-examples) and the new `correspondingExample` key. A new tab UI will render on endpoints with these examples to make them more discoverable. Example OAS snippet:

```yaml OAS File
post:
  ...
  responses:
    '200':
      content:
        application/json:
          examples:
            Cat:
              summary: An example of a cat
              value:
                name: Meredith Grey
                petType: cat
                color: white
                gender: female
                breed: Scottish Fold
  x-readme:
    code-samples:
    - name: Cat
      language: curl
      code: "curl --request POST \n     --url http://api.example.com/v2/pet \n        \    --header 'content-type: application/json' \n     --data '\n{\n  \"type\": \"cat\"\n}\n'"
      # corresponding example value needs to match example name
      correspondingExample: Cat
```

### 🪶 Other Improvements

* **Sidebar**: Subtle Increase to the indentation of nested sidebar items
* **Docs**: Updated copy icon throughout the docs
* **Discussions**: Improvements to spam prevention
* **Custom Pages**: Refactored to match the guides and reference editing experience

### 🐛 Bugs Eaten (by Owlbert)

* **Login**: Fixed an issue where users using passwordless login were unable to create a new password
* **API Reference**: Fixed an issue where the page could crash when timestamps for a request were invalid
* **API Reference**: Fixed an issue where lists in parameter descriptions had a different font-size than the rest of the description
* **API Reference**: Fixed an issue where parameters rendering `<select multiple />` would render poorly in dark mode
* **API Reference**: Fixed an issue where the table of contents was missing from reference pages
* **API Reference**: Fixed an issue where the request example menu could go missing
* **API Reference**: Fixed an issue preventing users from deleting API definitions
* **API Reference**: Fixed an issue where Try It would fail to use the correct authorization data in successive calls
* **Docs**: Fixed an issue where the page would crash when opening a blank page and the first nested page is an external link
* **Developer Dashboard**: Disabled API key dropdown if there’s only a single key
* **Developer Dashboard**: Fixed an issue where inspecting a log would cause the reference page to crash
* **Developer Dashboard**: Fixed an issue where users were unable to link to "Getting Started" or "Authentication" pages from the what’s next UI
* **Enterprise**: Fixed an issue on some projects where landing pages weren’t showing the full set of navigation links
* **Enterprise**: Fixed several issues where permissions weren’t being applied properly when using the "set all" action
* **Enterprise**: Fixed an issue granting access to docs when assigning permissions to users who haven’t yet created accounts
* **Staging**: Fixed an issue where you wouldn’t be able to access a staging page if you had previously viewed the page while logged out
* **Editor**: Fixed an issue where creating article links would move the cursor to the top of the page
* **Editor**: Fixed an issue where creating links could cause subsequent text to appear backwards and in a different color
* **Editor**: Fixed an issue where pages nested 3 levels deep weren’t appearing in the link menu
* **Import Docs**: Fixed an issue where importing docs that were previously exported would fail
* **Reusable Content**: Fixed an issue where sorting alphabetically was ignoring letter casing
* **Reusable Content**: Fixed an issue inserting reusable content when searching with only numbers
* **SEO**: Fixed an issue where some pages were not being indexed