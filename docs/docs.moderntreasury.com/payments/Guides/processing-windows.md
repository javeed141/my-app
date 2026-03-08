# Processing Windows

Some payment rails you enable for your Modern Treasury accounts will not be real-time, meaning transactions sent via those rails will not be instantaneous. To send payments on these rails, banks require explicit processing cutoffs. Modern Treasury will automatically use these cutoffs to format and deliver your payments before the defined times.

A bank’s cutoff is the time by which payments must be present in their system so that they can process based on the various payment rail requirements. Cutoffs will vary by bank based on a number of factors, such as their technology and compliance requirements.

Modern Treasury’s processing cutoff is the time by which Modern Treasury will take any qualifying payment orders and deliver them to the bank. This is to guarantee your payments will always be delivered on time.

Typically, Modern Treasury will have two processing cutoffs ahead of a bank cutoffs. These processing cutoffs are typically 10 and 60 minutes before a given bank’s cutoff. **This gives you two processing windows before the bank cutoff.**

<Image align="center" border={false} src="https://files.readme.io/c551904630466df7844bdf2709c70794e514f6ff84b30d2170c2e2ecb1cd27ff-standard-processing-windows_2.svg" />

For example, if a bank’s final cutoff for the day is 5pm PT, then Modern Treasury will have a processing cutoff at both 4pm PT and 4:50pm PT. If you miss the 4pm PT window, you still have another processing window before the bank cutoff. This applies to all bank cutoff windows, regardless of time zone.

# How to view Processing Windows

You can view your current processing windows for a given account and payment rail by going to an individual account you have setup through [your organization’s Accounts dashboard](https://app.moderntreasury.com/accounts).

<Image align="center" border={false} src="https://files.readme.io/e42aa17ae7164ac050b30331d4583f938af8d4d50797d4b4b2cb21d3e3c93d58-Screenshot_2024-11-04_at_5.21.19_PM.png" />

## Modern Treasury Processing Cutoffs vs. Bank Cutoffs

Modern Treasury’s Processing Cutoffs are configured independently from the bank. When onboarding or making changes, Modern Treasury works with customers and their bank to understand their needs and make recommendations on how best to configure processing windows.

## Custom Processing Windows

Modern Treasury offers the ability to configure [Custom Processing Windows](https://www.moderntreasury.com/journal/add-custom-processing-windows), which enables you to send payments to the bank more frequently before the bank cutoff.

> 👍 To request a custom processing window, please contact [support@moderntreasury.com](mailto:support@moderntreasury.com).

Additional processing windows allow you to send high volumes of payments, align processing with business workflows, and better remediate issues identified in earlier windows.

## Additional Bank Cutoffs

Banks sometimes offer additional cutoff windows to customers. These cutoffs are determined between you and your bank. Banks may offer midday cutoffs for faster processing and reporting. They may also offer later cutoffs, enabling you to queue up payments to go out first thing the following day. Modern Treasury can support this by adding a Custom Processing Window.

## FAQ

### What factors should I consider when determining processing windows?

There are a few factors to consider when planning your processing windows:

1. Bank cutoffs (e.g. Do you want to take advantage of midday or late cutoff times?)
2. Payment volume (e.g. Does your daily volume exceed the recommended limit per processing window?)
3. Payment rail settlement times (e.g. Do you need an ACH transaction to complete same or next day?)

### How do I add a Custom Processing Window?

To add a processing window, please contact [support@moderntreasury.com](mailto:support@moderntreasury.com).

### How many payments can I process per processing window?

Payments per processing window should not exceed 50,000. If you anticipate payment volume exceeding this default, contact [support@moderntreasury.com](mailto:support@moderntreasury.com).

### What are the benefits of additional processing windows?

1. Enables you to process even more payments throughout the day
2. There are more opportunities to resolve issues that arise during earlier windows
3. Allows you to accurately map to your own systems and processes
4. While not guaranteed, some banks may initiate processing and settlement earlier than the next cutoff

### How do I view my current processing windows?

You can view your current processing windows for a given account and payment rail by visiting an individual internal account page.

### Do each of my internal accounts have independent processing windows?

Yes, processing windows vary per bank and per payment rail. Depending on when what is enabled for your internal account, the processing windows will vary for each internal account.

### Does Modern Treasury automatically add processing windows when my bank adds a new cutoff time for my use case?

No, Modern Treasury will not automatically add processing windows. You will need to contact [support@moderntreasury.com](mailto:support@moderntreasury.com) to coordinate the addition of new processing windows.

### What are the cutoffs at my bank?

You can find a list of bank timings and cutoffs for ACH payments [here](https://docs.moderntreasury.com/payments/docs/ach-timings).