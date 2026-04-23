# Broken Link Checker

<Image align="center" border={false} src="https://files.readme.io/b1d83529b0f47154daa6f4c4965d7b09425d4ad197ad0bd7029a55ca5ef6ae65-broken-links.webp" />

Running a Docs Audit will now automatically check your documentation for broken links, ensuring your users never hit a dead end.

<br />

***

### New Features & Improvements

**Admin**

* Added an option to set the default visibility for new pages to either Public or Hidden

**Docs**

* Added support for polymorphism within `additionalProperties`
* Added OAS support for `parameter.content`

**Editor**

* Added additional `<Card />` variant and now wraps responsively

**Review**

* Teammates with the Viewer role can now view branches, see diffs, and check linter results

<br />

### Bugs Eaten (by Owlbert) 🐛

**Admin**

* Fixed an issue with custom domains when downgrading to a plan that doesn’t support them
* Fixed a display bug where custom head HTML could incorrectly appear in the admin UI
* Fixed an issue where cancelling navigation when there are changes could result in lost changes
* Fixed an issue where Ask AI settings changes would not appear in audit logs
* Fixed an issue where uploading API definitions would fail in Linux browsers

**API Designer**

* Fixed a validation error where defining a tag in multiple places would incorrectly trigger an invalid OAS error

**Docs**

* Fixed an issue where navigating between sections could cause custom footers to briefly jump to the top of the page
* Fixed an issue with incorrect URLs in the llms.txt file for certain Enterprise projects
* Fixed an issue with navigating to page anchors
* Fixed a header spacing issue for projects without Ask AI enabled
* Fixed a rendering issue with nested discriminators
* Fixed an issue where Changelog RSS feeds were appearing out of order
* Fixed an issue where exact match searches were not correctly highlighting the match in results

**Editor**

* Fixed an issue where links in Reusable Content were being rewritten
* Fixed a bug where saving to a branch with MDX errors could cause content loss

<br />