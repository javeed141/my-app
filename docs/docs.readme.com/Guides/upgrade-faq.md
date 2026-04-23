# Upgrade FAQ

### What you need to know:

> ❗️ Breaking changes
>
> After upgrading, you will not be able to make changes to your docs via `rdme` (our CLI tool) or Github Actions integration until you upgrade to `rdme@10`. Any integrations built with our API will also require updating to APIv2.

* For `rdme` CLI / Github Actions see [Upgrading your ReadMe CLI to rdme@10](https://docs.readme.com/main/docs/upgrading-to-rdme10)
* For API integrations see [API v1 → v2 Upgrade Guide](https://docs.readme.com/main/reference/api-upgrade-guide)

## General Questions

**❓ Q: How long is the upgrading process?**
A: The upgrade process takes up to 2 hours (though often much less) depending on how much content is being upgraded. If the process takes longer than 2 hours, please reach out to [support@readme.io](mailto:support@readme.io). You will not be able to edit your docs during this time. They will remain public and accessible to customers.

**❓ Q: Will my existing documentation be affected?**
A: No, your existing documentation will remain accessible throughout the upgrade process. Once upgraded, all your content will be preserved in the new experience.

**❓ Q: Can I revert back to the old experience after upgrading?**
A: No, the upgrade to the new ReadMe Refactored experience is a one-way process. Once upgraded, you'll have access to new features like MDX components and in-docs editing.

**❓ Q: Will my team need to learn new tools or processes?**
A: The new experience is designed to be intuitive and user-friendly. While it introduces new features like MDX components, the core editing experience will feel familiar.

## Feature-Specific Questions

**❓ Q: What features are available in Refactored?**
A: Check out what's available and coming soon in our feature table [here](https://docs.readme.com/main/docs/upgrade-to-readme-refactored#feature-compatibility). If a feature that you use isn't currently available on the Refactored experience, rest assured that it'll be available soon!

**❓ Q: What happens to my existing Markdown content?**
A: While most of your Markdown content will render the same way in the new MDX-powered editor, there may be some minor updates to your existing content required. We'll automatically convert your content during the upgrade, but we recommend reviewing your docs afterward to ensure everything appears as expected.

**❓ Q: How does bi-directional Git syncing work?**
A: Bi-directional Git syncing allows you to sync your documentation between ReadMe and GitHub. After the upgrade, you can set up syncing to maintain your docs in either platform.

**❓ Q: Will my API documentation still work?**
A: Yes, your API documentation will continue to work. If you're using API v1, you'll need to upgrade your connection or enable bi-directional syncing to continue updating your docs.

## Getting Help

Need additional support or have questions not covered here? We're here to help:

* Contact support
* Enterprise customers: Reach out to your Customer Success Manager
* Check our documentation and changelog for the latest updates and guides