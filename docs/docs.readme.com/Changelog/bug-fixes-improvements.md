# Bug Fixes & Improvements

### Improvements

* **API Reference**: More descriptive variable name in `api` code samples
* **API Reference**: Display min/max values for parameters more prominently
* **API Reference**: Improved styling of parameter objects with multiple levels of nesting
* **Guides**: Strip style tags when generating metadata for SEO
* **Project Dashboard**: Make searching for users by email case insensitive
* **Developer Dashboard**: Improved Demo experience if project doesn’t have any recent API logs

### 🐛 Bugs Eaten (by Owlbert)

* **Auth**: Fixed issue where updating end user SSO configuration incorrectly modified redirect URI
* **Guides**: Fixed issue where pages with empty HTML blocks caused page to error
* **Variables**: Fixed issue where variables were sometimes being saved in correctly in the editor
* **API Reference**: Fixed issue where certain Try It responses would cause page to error
* **API Reference**: Polymorphic objects with custom keywords will render correctly