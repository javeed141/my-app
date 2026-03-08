# ReadMe Micro

Keep track of your team’s internal APIs and microservices with ReadMe’s auto-generated documentation solution.

# Say Hello to ReadMe Micro 👋

While it’s common to have a public API — or a few! — that your company shares with the world, it’s also possible (and even likely) to have internal APIs and other services that help teams within your organization get their work done better and faster.

Unlike externally accessible APIs, internal APIs often fall through the organizational cracks — documentation can be seen as a hassle, and creating a full developer hub in the way that you would for an external API feels like overkill. Alternatively, if you don’t have a hub for internal APIs, it’s hard operationally for other engineering teams within your organization to discover them, learn how they work, and incorporate them into their team’s workflow. As a result, teams end up duplicating work instead of finding and using APIs that already exist.

That’s where ReadMe Micro comes to the rescue! ReadMe Micro is an auto-generated documentation solution for internal APIs and other internal services that helps your team keep track of things — your developers can write the API, and we’ll take care of the rest, including updating the API documentation so that your developers don’t have to!

<Image align="center" className="border" border={true} src="https://paper-attachments.dropboxusercontent.com/s_99C1DFE4B5D9AA1FC9C8EFD6A03738E28A4E8AE99F3A1282BAEBE9F63939A73A_1691603886181_ReadMe+Micro+Homepage.png" />

# Getting Started with ReadMe Micro

Think of ReadMe Micro as a developer hub for your engineering team. It’s a central place to discover and start using all of your company’s internal APIs and other services! To get started, you’ll connect either your GitHub or Bitbucket account with ReadMe Micro — wherever the repositories that include the OAS files that you’ll want to connect are stored. You can do this from the ReadMe Micro [homepage](https://micro.readme.com/).

You can also locate the [ReadMe Micro app](https://github.com/marketplace/readme-micro/) in the GitHub Marketplace, and install it for your GitHub organization from there.

<Image align="center" className="border" border={true} src="https://paper-attachments.dropboxusercontent.com/s_99C1DFE4B5D9AA1FC9C8EFD6A03738E28A4E8AE99F3A1282BAEBE9F63939A73A_1691605919108_Micro+app+in+GH+marketplace.png" />

# Setting Up ReadMe Micro for Your Organization

> 📘 These are the setup steps for GitHub!
>
> If you're using ReadMe Micro by connecting it via your Bitbucket account, the setup flow will vary slightly but the core steps will be the same!

## Step 1: Adding Your Organization

ReadMe Micro connects with GitHub and Bitbucket at the organizational level. You can link multiple organizations but you’ll need to complete this setup flow once per organization. Please also note that ReadMe Micro is priced at the organization level so if you have multiple connected orgs you’ll be charged separately for each.

<Image align="center" className="border" border={true} src="https://paper-attachments.dropboxusercontent.com/s_99C1DFE4B5D9AA1FC9C8EFD6A03738E28A4E8AE99F3A1282BAEBE9F63939A73A_1691606953658_install+micro+at+org+level.png" />

You’ll first see a screen that asks where you’d like to install ReadMe Micro. Choose the organization you’d like to connect to begin the configuration process!

Once you’ve chosen the organization where you’d like to install ReadMe Micro, you’ll be prompted to connect all of your organization’s repositories or just select ones. We recommend that you only connect the select repositories that are used for internal APIs and other internal services. An OAS file is also required to sync a repository with ReadMe Micro.

<Image align="center" className="border" border={true} src="https://paper-attachments.dropboxusercontent.com/s_99C1DFE4B5D9AA1FC9C8EFD6A03738E28A4E8AE99F3A1282BAEBE9F63939A73A_1691608464564_micro+-+choosing+micro+v+select+repos.png" />

Once you make a selection and press the **Install** button you’ll then be taken to your ReadMe Micro page where you’ll see your synced organization. To complete the setup process, click the **Set Up** button.

<Image align="center" className="border" border={true} src="https://paper-attachments.dropboxusercontent.com/s_99C1DFE4B5D9AA1FC9C8EFD6A03738E28A4E8AE99F3A1282BAEBE9F63939A73A_1691608652532_micro+-+setting+up+your+org+in+micro.png" />

As a final step, you’ll need to add the README\_MICRO\_SECRET to your GitHub org. Once you’ve done that you’re finished setting up your organization and can move onto the setup process for your repositories!

<Image align="center" className="border" border={true} src="https://paper-attachments.dropboxusercontent.com/s_99C1DFE4B5D9AA1FC9C8EFD6A03738E28A4E8AE99F3A1282BAEBE9F63939A73A_1691608760117_micro+-+adding+org+secret.png" />

> 🚧 If your synced organization is a free organization then organization secrets cannot be accessed in private repositories!
>
> Repositories within free organizations that you want to connect with ReadMe Micro must be set to public in order for ReadMe Micro to successfully sync!

## Step 2: Setting Up Your Repositories

Once you’ve connected your organization, you’ll be taken to the main page for your org within ReadMe Micro. Under the **Repositories** section you’ll either see all repositories or only the ones you’ve selected to connect, based on your choice in the previous setup step.

<Image align="center" className="border" border={true} src="https://paper-attachments.dropboxusercontent.com/s_99C1DFE4B5D9AA1FC9C8EFD6A03738E28A4E8AE99F3A1282BAEBE9F63939A73A_1691608841494_Micro+-+Repositories+to+Set+Up.png" />

Click the **Set Up** button to begin the onboarding process for each repository. You only need to do this once per repo!

**:warning:In order to successfully set up your repo:**

* Your APIs need to contain an [OpenAPI Specification (OAS)](https://github.com/OAI/OpenAPI-Specification) in JSON or YAML format
* ReadMe Micro supports the following: Swagger compatible [versions 1 & 2](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md), OpenAPI compatible versions 2.0+, 3.0, and [3.1](https://spec.openapis.org/oas/v3.1.0.html#openapi-specification)
* The API must be REST-based

ReadMe Micro will automatically detect OAS files in the repo that you are trying to sync by checking your project for any .json, .yaml, and .yml files.

<Image align="center" className="border" border={true} src="https://paper-attachments.dropboxusercontent.com/s_99C1DFE4B5D9AA1FC9C8EFD6A03738E28A4E8AE99F3A1282BAEBE9F63939A73A_1691609576592_Micro-+initial+github+action+setup+.png" />

<Image align="center" className="border" border={true} src="https://paper-attachments.dropboxusercontent.com/s_99C1DFE4B5D9AA1FC9C8EFD6A03738E28A4E8AE99F3A1282BAEBE9F63939A73A_1691609584263_Micro+-+Completed+Setup+for+Repo.png" />

<Image align="center" className="border" border={true} src="https://paper-attachments.dropboxusercontent.com/s_99C1DFE4B5D9AA1FC9C8EFD6A03738E28A4E8AE99F3A1282BAEBE9F63939A73A_1691610978197_Micro_Repo+with+full+endpoints++changelog.png" />

Once you’ve completed the setup steps, you’ll see the auto-generated documentation solution (see above image) brought to you by ReadMe Micro! Read on to learn more about the other features that ReadMe Micro offers :tada:

# ReadMe Micro Features

Now that you’ve completed all of the necessary setup steps, let’s get acquainted with the features and benefits of ReadMe Micro ✨

### Unlimited Repos, Unlimited Users

Sync as many repositories as makes sense, per organization. For each connected repo, ReadMe auto-magically creates an API Reference, including auto-generated code samples 🪄

We support multiple OAS files per repo, too! You can copy and paste code samples from each endpoint page to make it easier for developers within your organization to start using these internal APIs. Plus, version history is accessible via a dropdown menu, which allows users to keep track of changes made to the endpoint over time.

There’s also no limit on the number of invited users, though ReadMe Micro is priced on a per-user basis, which is something to keep in mind as you’re adding users to your ReadMe Micro org. Once your repos are synced in ReadMe Micro, engineering teams across your company can use ReadMe Micro to find, search for, and bookmark internal APIs. Now teams have all of the info they need to start using your APIs quickly, and don't have to worry about manually updating files!

<Image align="center" className="border" border={true} src="https://paper-attachments.dropboxusercontent.com/s_99C1DFE4B5D9AA1FC9C8EFD6A03738E28A4E8AE99F3A1282BAEBE9F63939A73A_1691616046061_GHM+-+Micro+versioning+close+up.png" />

### Auto-Generated Changelogs

Changelogs are auto-generated per repository — any changes made to the synced OAS file(s) are instantly visible at-a-glance in ReadMe Micro!

<Image align="center" className="border" border={true} src="https://paper-attachments.dropboxusercontent.com/s_99C1DFE4B5D9AA1FC9C8EFD6A03738E28A4E8AE99F3A1282BAEBE9F63939A73A_1691616249585_Micro_Repo+with+full+endpoints++changelog.png" />

### Standardization with Governance

We’ve added governance to ReadMe Micro in the form of linting. There are various API Lint Rules that you can select for the OAS files that live in the repositories you’re syncing to Micro. When you’re syncing an OAS file, you choose which Spectral configuration options you want to enable When a file is synced, the file will be linted.

*Why is this helpful?* 🤔\
Linting API files is sort of like a grammar check for your OAS file—it reviews the spec and makes sure that the rules/configuration options that you’ve selected are followed. It checks that the OAS file includes all of the fields you’ve selected (see image below) and that the API conforms properly!

<Image align="center" className="border" border={true} src="https://files.readme.io/f357358-linting_image.png" />

### Add More Details with a Markdown File

Want to provide more details for developers in your org who may be interested in using your internal API? Upload Markdown files to include more instructions and helpful tips for each synced repo.

<Image align="center" className="border" border={true} src="https://paper-attachments.dropboxusercontent.com/s_99C1DFE4B5D9AA1FC9C8EFD6A03738E28A4E8AE99F3A1282BAEBE9F63939A73A_1691616811149_Micro_Repo-add+markdown+file.png" />

<Image align="center" className="border" border={true} src="https://files.readme.io/6750444-Github_listing_-_Micro_shot_4.png" />

### Bookmark APIs

Bookmark APIs that you frequently reference so that they stay pinned to the top of your Micro homepage and you don’t have to go searching for them!

<Image align="center" className="border" border={true} src="https://paper-attachments.dropboxusercontent.com/s_99C1DFE4B5D9AA1FC9C8EFD6A03738E28A4E8AE99F3A1282BAEBE9F63939A73A_1691617119442_Micro-Org+view+with+repos++bookmarked+apis.png" />

### Search Your Repos

Use the search functionality to locate repositories within your organization! Add topics to repositories to search by topic in addition to repo name. You can also use the sorting functionality to see your repos listed by name or last synced.

<Image align="center" className="border" border={true} src="https://paper-attachments.dropboxusercontent.com/s_99C1DFE4B5D9AA1FC9C8EFD6A03738E28A4E8AE99F3A1282BAEBE9F63939A73A_1691617824026_micro+-+searching+by+topic.png" />

### Pull Requests

See upcoming changes to your synced APIs via comments made on open pull requests! If subsequent edits are made, ReadMe Micro will update that comment with any new information we have. The Preview link navigates to the latest version of the API with a banner alerting you that you're viewing a newer version of the API. Note: this feature is only available in GitHub at the moment!

<Image align="center" className="border" border={true} src="https://files.readme.io/f9b6f9d-image_19.png" />

<Image align="center" className="border" border={true} src="https://files.readme.io/4afbff6-image_20.png" />

# ReadMe Micro Pricing

Try out ReadMe Micro for free! Get started with a 30 day free trial and use this time to sync your organization and repos, and invite other users to start playing around. Once your trial is over you’ll be transitioned onto our Pro plan for $10/month per user to keep getting access to all of the features that ReadMe Micro offers! You can also choose to pay annually and the cost per user will be $9/month.

# Have Questions? Need Support?

Use the Intercom widget in the righthand corner of any ReadMe Micro page to send a message to our Support team!

<Image align="center" className="border" border={true} src="https://paper-attachments.dropboxusercontent.com/s_99C1DFE4B5D9AA1FC9C8EFD6A03738E28A4E8AE99F3A1282BAEBE9F63939A73A_1691619650711_readme+micro+-+support.png" />