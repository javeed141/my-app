# Translations

Support multi-language documentation for your global audience.

> 📘 ✨ Refactored Exclusive
>
> This feature is currently only available in the ReadMe Refactored experience. If you're using the Legacy platform, you'll need to upgrade to Refactored to access this functionality. Learn more about [ReadMe Refactored →](https://docs.readme.com/ent/docs/migration#)

Translations support your documentation in multiple languages, streamlining your workflow by allowing you to edit your original and translated docs on ReadMe.

## End-User View

End users can select their desired language to view your documentation in. Navigation, search, and all platform-provided content on the page are translated automatically.

<Image align="center" alt="Translations for end-users" border={false} src="https://files.readme.io/539ecbe94687ddac93016d6a38fd5d24f939ca9f5a30db2236af68aa7f1905b9-image.png" />

### Search

Content in each language is automatically indexed for search. When users perform a search, they see results limited to the language they currently have selected, ensuring that search results are consistent with the language they’re viewing across the documentation.

When users search across Enterprise projects within the same group, results are pulled from different versions depending on the project. The active project returns results from the version the user is currently viewing, while all other projects return results from their stable versions. Projects that do not have translations available in the selected language are excluded from search results.

***

## Configure

Enable your preferred languages in the **Group Dashboard**. Once enabled, they automatically become available across all child projects for you to manage.

Currently supported languages: English, German, Spanish, French, Italian, Japanese, Portuguese, and Chinese.

<Image align="center" alt="Enable translations" border={false} src="https://files.readme.io/539ecbe94687ddac93016d6a38fd5d24f939ca9f5a30db2236af68aa7f1905b9-image.png" />

## Supporting a New Language

After you enable your preferred languages in the Group Dashboard, your child project will have an updated Versions menu that supports the selected languages. Everything works the same as versions and branches do today, with a few differences:

* A language picker appears at the top of the Versions & Branches menu, allowing you to switch between selected languages.
* In non-default languages, version names are appended with their language code (for example,` -es` for Spanish).
* If a language has no versions, it does not appear to end users in the Hub language picker.
* You can fork from an existing version in any supported language.

<Image align="center" alt="New version creation" border={false} src="https://files.readme.io/e0a27b83b3ea7552c38aca5a4283c90bc49ab3582dc4bc811bce00e0579d0d6c-forking.png" />

<br />