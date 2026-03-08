# Slack

Get updates on your docs directly within Slack!

The ReadMe Slack App allows you to receive project notifications in your Slack workspace. This integration currently supports real-time notifications for:

* **[Suggested Edits](https://docs.readme.com/main/docs/suggested-edits)**: when someone suggests new edits to your project.
* **[Discussions/Support Forums](https://docs.readme.com/main/docs/managing-forum-support)**: when someone asks a question in your project's Discussion Forums.

## Setup and Configuration

To connect your ReadMe project to your Slack workspace, go to the **Integrations** section in the ReadMe <Glossary>dashboard</Glossary> (Configuration > Integrations), and click the **Add to Slack** button:

<Image align="center" width="auto" src="https://files.readme.io/29657d9-btn-add-to-slack_2x.png" />

You'll be redirected to a Slack authorization page where you can select which channel/DM in your workspace that you'd like to send notifications to.

Once you've authorized Slack, you will be redirected back to the ReadMe Integrations page, where you can configure your notifications by clicking **Manage Slack Integrations**.

A modal will pop up where you can configure which notifications you would like to receive. By default, all notifications are enabled.

<Image align="center" width="80%" src="https://files.readme.io/b012296-Screen_Shot_2021-09-29_at_1.56.17_PM.png" />

> 📘 Tip: Send different notifications to different channels
>
> You can add as many Slack integrations to your workspace as you think makes sense for your workflow, making it easy to send notifications to *#channel-1* for Suggested Edits, *#channel-2* for Discussion posts, *@owlbert* for everything, and so on. Just click the **Add to Slack** button for every new integration you wish to set up!

<div id="disabling-slack-notifications" />

## Pausing/Disabling The Slack Integration

If you no longer wish to receive ReadMe notifications in your Slack workspace (or if you just need a break), you can do one of the following:

1. If you'd like to temporarily pause incoming messages, navigate to the **Integrations** section of your project dashboard, click the **Manage Slack Integrations** link, which will open a modal where you can select/unselect the notifications you wish to receive.
   <div id="disable-for-channel" />
2. To disable incoming messages for a given channel, open the aforementioned **Manage Slack Integrations** modal and click the **Manage Configuration in Slack** link for the channel/DM you wish to disable. You'll be taken to [the Slack App configuration page](https://slack.com/apps/AQBR3NZUY). Select the **Configuration** tab—from here, you'll see a list of all the "incoming webhooks" (which is another term for the Slack integrations that allows us to send messages to your channel/DM you've configured. Click the "Revoke" button next to the webhook(s) you'd like to disable, which will [deactivate the corresponding Slack integration in our system](#deactivated-slack-integrations).
   <div id="disable-for-workspace" />
3. To remove the ReadMe Slack App from your entire workspace, navigate to the [aforementioned Slack App configuration page](https://slack.com/apps/AQBR3NZUY). Within the **Configuration** tab, you can remove the entire ReadMe Slack App by clicking the "Remove App" button at the bottom of the page. But be warned—revoking access for the entire app also revokes it for all members of your Slack workspace, so make sure everyone else is cool with it!

And of course—if you change your mind and want to set up the Slack App again, just follow the steps above on [setting up a new integration](#section-setup-and-configuration)!

> 📘 Why am I still seeing the settings for a Slack integration even though I've revoked it in Slack?
>
> Immediately upon revoking an incoming webhook on the Slack Authorizations page (if you followed option two above), you may still see it listed and active in the **Manage Slack Integrations** modal. Don't worry! We will no longer send you notifications to that channel/DM (seriously — we literally couldn't if we tried!). The next time we attempt to use the integration, Slack will inform us that access to the webhook has been revoked and we'll [mark it as deactivated](#deactivated-slack-integrations) within our system.

## Deactivated Slack Integrations

We may run into an error when attempting to send notifications to your Slack channel. This may happen for a variety of reasons, including (but not limited to):

* The permissions on the channel have since changed
* The channel has been archived or deleted
* You've disabled the Slack integration, either [just for a channel](#disable-for-workspace) or [for the entire workspace](#disable-for-workspace)
* Your organization has switched to carrier pigeons for internal communications and you've deleted your entire Slack workspace 🕊️

If we receive an error along these lines, we flag the integration as deactivated and stop sending messages to it. The next time you open up the **Manage Slack Integrations** modal in the dashboard, you'll see something like this:

![](https://files.readme.io/6d3926f-image.png "image.png")

If the deactivation appears to be expected, feel free to click "Remove Slack Integration" to remove it for good! We only keep in our system for your records. If you wish to reactivate the Slack integration again, we recommend that you clear out any deactivated integrations and click the "Add to Slack" button to set one up again—it only takes a few clicks!

If you need more information on the deactivation or believe this was in error, [feel free to contact us](mailto:support@readme.io)!