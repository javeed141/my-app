# Upgrade Guide

We're excited to introduce our new editing experience that brings powerful features including bi-directional Git syncing, MDX support, and a streamlined editing interface. **This guide explains what's new, how to upgrade your project on your own, and the upgrade process for Enterprise customers.**

## What's New

We've refactored every part of ReadMe to support the next generation of APIs, making it easier for people with all levels of technical skills to contribute. Check out the new features and don't miss the full feature list further down—we're just getting started.

<IconList title="AI Features" text="Whether your team wants help editing your docs or your end devs want to get to know your API better, it's all possible with our new AI Features—Agent, MCP Servers, Ask AI, Linter, and LLMs.txt." icon="fa-duotone fa-message-bot" href="https://docs.readme.com/main/docs/ai-overview" />

<IconList title="MDX Support" text="Enhance your docs with interactive components by combining the simplicity of Markdown with the power of JSX." icon="fa-duotone fa-code" href="https://docs.readme.com/main/docs/mdx" />

<IconList title="GitHub Syncing" text="Write documentation wherever works best for you, seamlessly syncing between ReadMe and your Git repositories." icon="fa-duotone fa-sync" href="https://docs.readme.com/main/docs/bi-directional-sync" />

<IconList title="Branches" text="Make changes and review them in a preview environment before publishing." icon="fa-duotone fa-code-branch" href="https://docs.readme.com/main/docs/branches#/" />

<br />

### See It In Action

Watch the video to get a firsthand look at how the new features work and feel!

<Embed typeOfEmbed="youtube" url="https://www.youtube.com/watch?v=Wwly83u-ALY" html="%3Ciframe%20class%3D%22embedly-embed%22%20src%3D%22%2F%2Fcdn.embedly.com%2Fwidgets%2Fmedia.html%3Fsrc%3Dhttps%253A%252F%252Fwww.youtube.com%252Fembed%252FWwly83u-ALY%253Ffeature%253Doembed%26display_name%3DYouTube%26url%3Dhttps%253A%252F%252Fwww.youtube.com%252Fwatch%253Fv%253DWwly83u-ALY%26image%3Dhttps%253A%252F%252Fi.ytimg.com%252Fvi%252FWwly83u-ALY%252Fhqdefault.jpg%26type%3Dtext%252Fhtml%26schema%3Dyoutube%22%20width%3D%22640%22%20height%3D%22480%22%20scrolling%3D%22no%22%20title%3D%22YouTube%20embed%22%20frameborder%3D%220%22%20allow%3D%22autoplay%3B%20fullscreen%3B%20encrypted-media%3B%20picture-in-picture%3B%22%20allowfullscreen%3D%22true%22%3E%3C%2Fiframe%3E" href="https://www.youtube.com/watch?v=Wwly83u-ALY" providerUrl="https://www.youtube.com/" providerName="YouTube" />

<br />

### Feature Compatibility

We're continuing to release new features for Refactored as we work toward full feature parity, and keep this table updated to notify you of all new updates and improvements. If a feature that you use isn't currently available on the Refactored experience, rest assured that it'll be available soon!

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th />

      <th>
        Legacy
      </th>

      <th>
        Refactored
      </th>

      <th>
        Additional information
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Layout Themes <span class="new">NEW</span>
      </td>

      <td>
        <i class="fa-duotone fa-solid fa-square-x" />
      </td>

      <td>
        <i class="fa-duotone fa-solid fa-circle-check" />
      </td>

      <td />
    </tr>

    <tr>
      <td>
        [GitHub syncing](https://docs.readme.com/main/docs/bi-directional-sync#/) <span class="new">NEW</span>
      </td>

      <td>
        <i class="fa-duotone fa-solid fa-square-x" />
      </td>

      <td>
        <i class="fa-duotone fa-solid fa-circle-check" />
      </td>

      <td />
    </tr>

    <tr>
      <td>
        [Branching](https://docs.readme.com/main/docs/branches) <span class="new">NEW</span>
      </td>

      <td>
        <i class="fa-duotone fa-solid fa-square-x" />
      </td>

      <td>
        <i class="fa-duotone fa-solid fa-circle-check" />
      </td>

      <td />
    </tr>

    <tr>
      <td>
        [Suggest Edits in GitHub](https://docs.readme.com/main/docs/suggest-in-github#/)
      </td>

      <td>
        <i class="fa-duotone fa-solid fa-square-x" />
      </td>

      <td>
        <i class="fa-duotone fa-solid fa-circle-check" />
      </td>

      <td>
        Requires

        [GitHub syncing](https://docs.readme.com/main/docs/bi-directional-sync#/)

        to a **public** repository
      </td>
    </tr>

    <tr>
      <td>
        [MDX Components ](tps://docs.readme.com/main/docs/mdx#/https://docs.readme.com/main/docs/mdx#/)  <span class="new">NEW</span>
      </td>

      <td>
        <i class="fa-duotone fa-solid fa-square-x" />
      </td>

      <td>
        <i class="fa-duotone fa-solid fa-circle-check" />
      </td>

      <td />
    </tr>

    <tr>
      <td>
        [Reusable Content](https://docs.readme.com/main/docs/reusable-content#/)
      </td>

      <td>
        <i class="fa-duotone fa-solid fa-circle-check" />
      </td>

      <td>
        <i class="fa-duotone fa-solid fa-circle-check" />
      </td>

      <td />
    </tr>

    <tr>
      <td>
        rdme\@10 <span class="new">NEW</span>
      </td>

      <td>
        <i class="fa-duotone fa-solid fa-square-x" />
      </td>

      <td>
        <i class="fa-duotone fa-solid fa-circle-check" />
      </td>

      <td>
        [Requires upgrade from rdme@9 and earlier](https://docs.readme.com/main/docs/upgrading-to-rdme10)
      </td>
    </tr>

    <tr>
      <td>
        [API Designer](https://docs.readme.com/main/docs/building-apis-from-scratch-with-the-api-designer#/)<br />(Manual API Definition)
      </td>

      <td>
        <i class="fa-duotone fa-solid fa-circle-check" />
      </td>

      <td>
        <i class="fa-duotone fa-solid fa-circle-check" />
      </td>

      <td>
        `$refs` and reusable object definitions are not supported
      </td>
    </tr>

    <tr>
      <td>
        API v2 <span class="new">NEW</span>
      </td>

      <td>
        <i class="fa-duotone fa-solid fa-square-x" />
      </td>

      <td>
        <i class="fa-duotone fa-solid fa-circle-check" />
      </td>

      <td>
        [Requires upgrade from API v1](https://docs.readme.com/main/reference/api-migration-guide)
      </td>
    </tr>

    <tr>
      <td>
        [OpenAPI/Swagger](https://docs.readme.com/main/docs/openapi-upload-and-management#/)
      </td>

      <td>
        <i class="fa-duotone fa-solid fa-circle-check" />
      </td>

      <td>
        <i class="fa-duotone fa-solid fa-circle-check" />
      </td>

      <td />
    </tr>

    <tr>
      <td>
        GraphQL
      </td>

      <td>
        <i class="fa-duotone fa-solid fa-circle-check" />
      </td>

      <td>
        <i class="fa-duotone fa-solid fa-circle-check" />
      </td>

      <td />
    </tr>

    <tr>
      <td>
        [Ask AI](https://docs.readme.com/main/docs/ask-ai/) <span class="new">NEW</span>
      </td>

      <td>
        <i class="fa-duotone fa-solid fa-circle-check" />
      </td>

      <td>
        <i class="fa-duotone fa-solid fa-circle-check" />
      </td>

      <td>
        Previously Owlbot AI. Now with new features!
      </td>
    </tr>

    <tr>
      <td>
        [Agent](https://docs.readme.com/main/docs/aiagent) <span class="new">NEW</span>
      </td>

      <td>
        <i class="fa-duotone fa-solid fa-square-x" />
      </td>

      <td>
        <i class="fa-duotone fa-solid fa-circle-check" />
      </td>

      <td />
    </tr>

    <tr>
      <td>
        [Linter](https://docs.readme.com/main/docs/linter) <span class="new">NEW</span>
      </td>

      <td>
        <i class="fa-duotone fa-solid fa-square-x" />
      </td>

      <td>
        <i class="fa-duotone fa-solid fa-circle-check" />
      </td>

      <td />
    </tr>

    <tr>
      <td>
        [LLMs](https://docs.readme.com/main/docs/LLMstxt) & [MCP](https://docs.readme.com/main/docs/mcp-servers#/) <span class="new">NEW</span>
      </td>

      <td>
        <i class="fa-duotone fa-solid fa-square-x" />
      </td>

      <td>
        <i class="fa-duotone fa-solid fa-circle-check" />
      </td>

      <td />
    </tr>

    <tr>
      <td>
        AWS Gateway Integration
      </td>

      <td>
        <i class="fa-duotone fa-solid fa-circle-check" />
      </td>

      <td>
        <i class="fa-duotone fa-solid fa-square-x" /> Not available<sup>1</sup>
      </td>

      <td />
    </tr>

    <tr>
      <td>
        Localize Integration
      </td>

      <td>
        <i class="fa-duotone fa-solid fa-circle-check" />
      </td>

      <td>
        <i class="fa-duotone fa-solid fa-circle-check" />
      </td>

      <td>
        This may require an update to your translations after upgrading
      </td>
    </tr>
  </tbody>
</Table>

<small><sup>1</sup> These features are not yet on the new ReadMe UI. Customers who rely on any of these functionalities should not upgrade.<br /><i class="fa-duotone fa-solid fa-traffic-cone" /> Features are actively being worked on and will be available in the new ReadMe UI soon.</small>

### Alternative Solutions

If you're currently using features that aren't supported in the new experience, our support team can help you transition to supported alternatives. Please reach out to our support team for assistance in planning your upgrade strategy.

### Enterprise Features

To view features specific to the Enterprise plan or if you‘re ready to upgrade your group, continue to “Enterprise Customers” below to read more.

***

## Upgrading On Your Own

If you're currently using any features listed below, your project is not quite ready to upgrade. While we're working to build these feature, you can join our waitlist from the upgrade page accessible through your project's home page.

* AWS Gateway Plugin
* Suggested Edits

If you're not using the features mentioned above, you may be eligible for immediate upgrade! To kick off the process, click on "Upgrade to the New Experience" and "Get Started" buttons from your project's Home page and follow the instructions on the next screens.

<Image align="center" border={false} caption="ReadMe Refactored upgrade banner" src="https://files.readme.io/7ea6b91d1200baf4ebbb8962120e818be24dde568e6b65e2b08fa6fa55785082-Screenshot_2025-05-16_at_4.12.05_PM.png" width="50% " />

### ⚠️ Before You Upgrade

A few things to prepare for:

* Most projects upgrade in around 10 minutes, but the process may take up to 2 hours depending on the size of your project.
* Your project dashboard will be temporarily disabled, but your docs will remain live and accessible during the entire process.
* This update contains breaking changes to our [CLI (rdme)](https://docs.readme.com/main/docs/upgrading-to-rdme10) and [API](https://docs.readme.com/main/reference/api-migration-guide).
* Suggested Edits is **not** supported on Refactored. You will lose access to viewing and merging any existing Suggested Edits.
* We are upgrading your content from Markdown to MDX which may cause the localization integration to treat the content as new, which will require re-translation.
* This is a non-reversible process. Once you upgrade to the new editing experience, you cannot revert to the previous version.
* Your entire project is being upgraded to a Git-backed system.
* You can contact [support@readme.io](mailto:support@readme.io) if you have any questions.

***

## Enterprise Customers

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th />

      <th>
        Legacy
      </th>

      <th>
        Refactored
      </th>

      <th>
        Additional information
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Global Reusable Content
      </td>

      <td>
        <i class="fa-duotone fa-solid fa-circle-check" />
      </td>

      <td>
        <i class="fa-duotone fa-solid fa-circle-check" />
      </td>

      <td />
    </tr>

    <tr>
      <td>
        Global Custom Components <span class="new">NEW</span>
      </td>

      <td>
        <i class="fa-duotone fa-solid fa-square-x" />
      </td>

      <td>
        <i class="fa-duotone fa-solid fa-circle-check" />
      </td>

      <td />
    </tr>

    <tr>
      <td>
        [Editor Role](https://docs.readme.com/ent/docs/user-roles#/) <span class="new">NEW</span>
      </td>

      <td>
        <i class="fa-duotone fa-solid fa-square-x" />
      </td>

      <td>
        <i class="fa-duotone fa-solid fa-circle-check" />
      </td>

      <td />
    </tr>

    <tr>
      <td>
        [Branching: Reviews](https://docs.readme.com/main/docs/branches?isFramePreview=true#reviewing-changes) <span class="new">NEW</span>
      </td>

      <td>
        <i class="fa-duotone fa-solid fa-square-x" />
      </td>

      <td>
        <i class="fa-duotone fa-solid fa-circle-check" />
      </td>

      <td>
        Review and compare your branch to production before merging
      </td>
    </tr>

    <tr>
      <td>
        [GitHub Enterprise Server (GHES)](https://docs.readme.com/ent/docs/connecting-github-enterprise-server#/)

        <span class="new">NEW</span>
      </td>

      <td>
        <i class="fa-duotone fa-solid fa-square-x" />
      </td>

      <td>
        <i class="fa-duotone fa-solid fa-circle-check" />
      </td>

      <td />
    </tr>

    <tr>
      <td>
        Staging
      </td>

      <td>
        <i class="fa-duotone fa-solid fa-circle-check" />
      </td>

      <td>
        <i class="fa-duotone fa-solid fa-square-x" />
      </td>

      <td>
        Check out our new [Branching](tps://docs.readme.com/main/docs/brancheshttps://docs.readme.com/main/docs/branches) feature instead
      </td>
    </tr>

    <tr>
      <td>
        Translations
      </td>

      <td>
        <i class="fa-duotone fa-solid fa-circle-check" />
      </td>

      <td>
        <i class="fa-duotone fa-solid fa-square-x" /> Not available<sup>1</sup>
      </td>

      <td />
    </tr>
  </tbody>
</Table>

<small><sup>1</sup> These features are not yet on the new ReadMe UI. Customers who rely on any of the legacy functionalities should not upgrade.<br /><i class="fa-duotone fa-solid fa-traffic-cone" /> Features are actively being worked on and will be available in the new ReadMe UI soon.</small>

### Upgrade Process

<Callout icon="🚧" theme="warn">
  **Important** Please review the “Feature Compatibility” and “Before You Upgrade” sections above, as some features may be unavailable or require an upgrade to APIv2 and `rdme@10`.
</Callout>

To ensure a smooth transition for all customers, we're gradually rolling out the new experience to enterprise customers. If you don't see the banner yet, your organization may not have access at this time. If the banner is visible, follow these steps to begin the upgrade process:

1. Check your eligibility in your **Group Dashboard** in the upgrade banner.
2. If you’re eligible, you’ll be prompted to **Schedule a Date** to upgrade your docs that works best for your team. If a call is required, it’s to ensure any necessary updates or changes to your workflow are addressed to ensure upgrade goes smoothly.
3. We will confirm the upgrade schedule with you before initiating any changes. You'll receive an estimated timeline along with all the necessary details for upgrading your Enterprise Group and its child projects.
4. After the confirmed time is set, we will go ahead and upgrade your Enterprise Group. During this time, you will be locked from your dashboard so changes do not occur during the upgrade, however your public docs site will remain entirely live and accessible to your customers.
5. Once the upgrade is complete, we’ll send a follow-up email once your Group has been successfully upgraded!

<Image align="center" border={false} caption="Enterprise upgrade banner" src="https://files.readme.io/11d5b6c6e33a72cab1fdfb891b0c0a473260ed106e86bb99e5b879b74945e611-Screenshot_2025-06-25_at_5.40.49_PM.png" />

***

## Need Help?

If you encounter any issues during or after upgrade:

* Review our [Refactored Upgrade FAQ](https://docs.readme.com/main/docs/migration-faq)
* Contact support through your dashboard
* Enterprise customers: Reach out to your CSM

<br />

<HTMLBlock>
  {`
  <style>
    td:nth-child(n+1) {
      font-size: 0.85em;
    }
    td .fa {
      font-size: 1rem;
    }
    .fa-circle-check {
      color: var(--green);
    }
    .fa-square-x {
      color: var(--red);
    }
    .fa-traffic-cone {
      color: var(--yellow40);
      font-size: .75em;
    }
    .new {
      background: rgba(var(--purple-rgb), 0.4);
      border-radius: 0.5em;
      color: var(--purple20);
      font-size: 8px;
      padding: 0.25em 0.4em;
      position: relative;
      top: -0.25em;
    }
    [data-color-mode="system"] {
    @media (prefers-color-scheme: dark) {
      .new {
        color: var(--purple100);
      }
    }
  	}
    [data-color-mode="dark"] {
      .new {
        color: var(--purple100);
      }
    }
    .soon {
      opacity: .5;
    }
  </style>
  `}
</HTMLBlock>