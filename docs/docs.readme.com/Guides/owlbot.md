# Owlbot AI (Legacy)

Powered by OpenAI, Owlbot AI answers your users’ questions in a snap 🦉

> 📘 Update Owlbot AI to Ask AI
>
> Enable the new experience in the AI sidebar. See what's new in the [updated Ask AI](https://docs.readme.com/main/docs/ask-ai#/)!

<Image align="center" alt="Owlbot UI in the site navigation" border={true} caption="Owlbot AI answers a question about previewing your hub in dark mode 🌙" src="https://files.readme.io/8918312-owlbot_image_for_docs_page_1.5.png" />

When you enable Owlbot AI, users can ask questions about your product and instantly receive an answer, all directly within your developer hub ✨

Thanks to OpenAI’s models, Owlbot is trained on your documentation to respond with precise answers to your users’ questions. This can be anything from questions about the product or complete code snippets for making API calls.

Owlbot AI is embedded in your developer hub's search, and accessible on any page in your hub, allowing your users to get all of their questions answered in one centralized place. Based on the question or phrase a user types into the search bar, the answer returned will include relevant pages in your hub and/or an AI-generated response.

At the bottom of each answer, Owlbot links out to the docs that were used to answer the question, so the user can read more information about the topic. Users can also upvote or downvote the answer they've received, as well as copying the answer to their clipboard.

## Customize Owlbot AI

Every developer hub is different and it's important that Owlbot feels authentic to the tone of your team's docs! You can customize Owlbot's tone and more using the customization modal on the Owlbot AI page in your project's dashboard (or in your Enterprise Group if you're on our Enterprise plan :wink:). Navigate to the gear icon on the top right of the page and the customization modal will appear.

<Image align="center" border={true} src="https://files.readme.io/0a98543-customize_owlbot_modal.png" className="border" />

Here you can customize Owlbot's **tone**, choosing one of three default options or typing in a custom option. You can also choose from short (less than 100 words), medium (less than 200 words), or long (less than 300 words) **answer lengths**, and include any **forbidden words** that you don't want Owlbot to use. Just a note that code samples aren't factored into answer length limits!

Additionally, you can **customize the default answer** that Owlbot responds with when it's unable to generate a relevant answer from your docs.

<Image align="center" border={true} src="https://files.readme.io/e4db34f-customize_owlbot_-_enterprise_group.gif" className="border" />

> 📘 Customization Options Established at the Enterprise Group Level Apply to All Child Projects
>
> Individual Enterprise child projects do not have the option to customize Owlbot for that project specifically. Whatever customization options are set at the Group level apply to all corresponding child projects.

## Exporting Owlbot Responses

Looking to dig into Owlbot's responses further? Export Owlbot's responses into a CSV that you can share with the broader team!

<Image align="center" border={true} src="https://files.readme.io/2450179-export_owlbot_csv.gif" className="border" />

To export Owlbot's responses, navigate to your Owlbot AI page in your project's dashboard, select the desired date range for the export (day, week, month, quarter, year, or custom), and scroll down to the bottom of the page and select the **Export CSV** button next to the pagination widget.

From there, we'll process a CSV file that corresponds to the selected date range applied to the raw data in your table. All of the response details that appear on your Owlbot AI page will be included in the export we generate! The exporting process may take a bit of time depending on the amount of data you've chosen to export. As soon as your export is ready, though, it should immediately begin downloading in your browser.

## Owlbot API for asking questions programmatically

> ⚠️ Enterprise Only
>
> API Access for Owlbot is only available on our enterprise plan. To learn more send us an email at [growth@readme.io](mailto:growth@readme.io)!

To make requests to Owlbot via our API, you can make a POST request to the `/owlbot/ask` endpoint. The API key for making requests is located next to the[ customization options](https://docs.readme.com/main/docs/owlbot#/) in the enterprise dashboard.

Learn more about how to make an API call in our [Reference section](https://docs.readme.com/main/reference/askowlbot).

## Pricing and Availability

Owlbot AI is an additional $150/month per project on top of your ReadMe plan. For customers on our Enterprise plan with multiple projects, the cost is per child project, billed annually.

To enable Owlbot AI in your developer hub, head to the Owlbot AI page in your project dashboard's sidebar. For non-Enterprise projects, click the **Enable Owlbot AI** button and follow the steps from there. You can also enable Owlbot AI via the Upgrade Plan page in your project dashboard. If you're on an Enterprise project, head to the Owlbot AI page in your Enterprise Group dashboard and connect with our sales team to discuss enabling Owlbot AI for your hub!

<Image align="center" border={true} src="https://files.readme.io/ba703a4-enable_owlbot_in_dash.png" className="border" />

## Frequently Asked Questions

### Can I see what questions users are asking?

We log every question and answer so Project Admins can get a sense of what users are looking for and how well the prompts are being answered. Users can also choose to upvote or downvote a response based on their satisfaction, and that vote is logged as well. Currently we don’t have any way to provide feedback on the responses, but we are looking into adding this functionality.

### Will my data be used to train any of OpenAI’s models?

No, project data is only used to answer specific questions asked by users and is not used to train any of OpenAI's models. Questions and answers are stored by ReadMe for the admin UI, and OpenAI retains logs of API requests for 30 days. [More information about OpenAI's use of data can be found here](https://openai.com/security).

### How often is Owlbot's data updated? When I make a change in my docs, is it reflected immediately?

Currently Owlbot is updated with new content every two hours. During the beta we are tweaking this to get the best experience and are hoping to make this almost instant in the future.

### Are hidden pages used to generate answers? What about Enterprise projects with a mix of public and private content?

Hidden pages are never indexed by Owlbot. For non-Enterprise projects, this means that Owlbot will respond using content from non-hidden pages (i.e., pages that your users see in the sidebar).

For Enterprise projects, only content the user has access to is used to answer questions. If a user has access to only one enterprise project and not another, they will never see answers generated using content from the project they do not have access to (via End User permissioning).

### Which content from my documentation is used to answer?

Currently only content from the Guides and API Reference section of the main version of a project are used to answer questions asked to Owlbot. We are looking to add Discussions, Changelog posts, Custom Pages, and Recipes in the near future.

### Which OpenAI model is used?

We use a mix of GPT-4 and GPT-4-32k depending on the specific query being made.

### Is there a limit of the number of questions that can be asked per month?

Currently there is no limit. During the beta period, we may re-evaluate this depending on usage patterns.

### Can I enable it on only one of my Enterprise projects?

Owlbot can only be enabled on an entire Enterprise Group and applies to all child projects within that group. It cannot be enabled on a per-child project basis. If you're interested in enabling Owlbot AI for your Enterprise Group, reach out to your CSM or email [growth@readme.io](mailto:growth@readme.io)!