# Ask AI

An AI assistant for your documentation, delivering answers to your users‘ questions—powered by OpenAI. (Previously Owlbot AI)

Your users can get instant answers about your product with Ask AI. The assistant uses your selected model, trained on your documentation, to deliver accurate, context-aware responses. It includes direct links to your docs, allowing users to explore topics in more detail.

***

## End-User Preview

When your users interact with Ask AI, it’ll open the Assistant with your custom example questions and receive responses based on your configurations from the Admin panel. Responses will only reference any public pages. For Enterprise groups with public and private projects, Ask AI will provide info based on the users’ permission to view a project.

<Image align="center" border={false} width="750px" src="https://files.readme.io/93bba5b92a2c954d7aa1b5847d3648837ac31668b9861e35479e7a906596b3ab-user_gif.gif" />

## Configure

Customize the AI assistant’s tone, answer length, and forbidden to fit your branding. Set example questions for your end-users to see and select an available model that fits your needs.

<Image align="center" border={false} src="https://files.readme.io/afc7f66444d7c8186118082c46a34ed5a8af5bbdfdb65cc9af97f8fba3969724-Ask_AI.png" />

### Enterprise Groups

All configurations mentioned above are available for Enterprise projects in your Group Dashboard. Customizations at the group level will apply across all corresponding child projects.

## Analytics

Dig into user questions, responses, and feedback to understand what your users are looking for—and how effectively the assistant is performing. You can view all analytics in the **Ask AI dashboard** under **Settings**. To share insights with your team, export the data as a CSV with custom date ranges (available only on Enterprise plans). The export process may take some time depending on the data volume, but when ready, the download will immediately begin in your browser.

<Image align="center" border={false} width="650px" src="https://files.readme.io/27af66805d9c4eb18c468750023284c9682c2734dd2422bb650d7408b98a4787-analytics.png" />

<br />

## FAQ

<Accordion title="What happens to my data?" icon="fa-chart-simple">
  Ask AI is powered by OpenAI’s APIs and the Markdown content along with API definitions are sent to them to generate answers to user questions.
  While OpenAI retains logs of these API requests for 30 days, no data is used to train their AI models.
</Accordion>

<Accordion title="Does Ask AI reference hidden pages?" icon="fa-user-ninja">
  No, hidden pages are never indexed by Ask AI.
  For Enterprise groups, only project content the user has access to is used to answer questions.
</Accordion>

<Accordion title="How quickly are changes added to Ask AI’s models?" icon="fa-swap">
  Currently, new content is updated every 2 hours though this may change as we continue to develop Ask AI.
</Accordion>

<Accordion title="What tools are offered to monitor responses?" icon="fa-monitor-waveform">
  Logs for every question and answer are available in the admin dashboard. See [Analytics](https://docs.readme.com/maindocs/ask-ai#analytics) above.
</Accordion>

<Accordion title="How can I try Ask AI?" icon="fa-sparkles">
  You can test Ask AI on ReadMe’s docs or on your own docs as a trial.
</Accordion>

<Accordion title="I’m using the previous Ask AI experience. Where can I find these settings?" icon="fa-robot">
  You can upgrade to the new experience from the configuration panel in the Ask AI panel. Upgrading is permanent and cannot be done.
</Accordion>