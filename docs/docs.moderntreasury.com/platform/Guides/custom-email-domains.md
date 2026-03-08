# Custom Email Domains

Modern Treasury can send emails to counterparties on your behalf, such as counterparty invitations. By default, these emails are sent from `new-account@moderntreasury-mail.com`. You can set custom email domains, which result in emails originating from `new-account@<yourcustomdomain>`.

# 1. Add a domain

Navigate to Settings > General > [Email](https://app.moderntreasury.com/settings/organization?section=Email). Enter the domain you want counterparty emails to send from.

# 2. Upload DNS records to your domain provider

When you add a new domain, Modern Treasury will generate unique DNS records that must be uploaded to your DNS provider for verification. Modern Treasury will email you with these records, which can also be found by clicking on the action menu for a domain.

How to add DNS records varies by host. Below are specific instructions for common providers.

| Provider   | Instruction Link                                                                                                                                                                                                                     |
| :--------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Route53    | [https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resource-record-sets-creating.html](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resource-record-sets-creating.html)                                         |
| Namecheap  | [https://www.namecheap.com/support/knowledgebase/article.aspx/434/2237/how-do-i-set-up-host-records-for-a-domain/](https://www.namecheap.com/support/knowledgebase/article.aspx/434/2237/how-do-i-set-up-host-records-for-a-domain/) |
| Cloudflare | [https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/)                                                           |
| GoDaddy    | [https://www.godaddy.com/help/add-a-cname-record-19236](https://www.godaddy.com/help/add-a-cname-record-19236)                                                                                                                       |

# 3. Set a Default

> 🚧 It can take up to 72 hours for DNS records to propagate.
>
> In the event Modern Treasury is unable to detect your DNS records after 72 hours, the status of your domain will be set to `Failed`. See the Troubleshooting section for tips.

Modern Treasury will send you email notification when your domain as been successfully verified.\
In [the Email tab](https://app.moderntreasury.com/settings/organization?section=Email) of Organization Settings, click on the action menu for your newly added domain, and select `Set as default`.

<Image align="center" border={false} width="80%" src="https://files.readme.io/406c841-Screenshot_2022-12-07_at_2.18.26_PM.png" />

You can always switch back to sending your customer emails from moderntreasury-mail.com. If you are no longer using a custom domain, you can remove it from the dashboard and also remove the unused DNS records from your domain.

# Optional: DMARC Authentication

> 🚧 DMARC Policy
>
> Work together with your IT department to set up a policy that works best for you. If your company already has a DMARC policy in place, work with your IT department to ensure that the `adkim` and `aspf` flags are set to relaxed mode.

It is recommended to set up Domain-based Message Authentication, Reporting & Conformance ([DMARC](https://dmarc.org/)) records for your domain to help prevent phishing attacks. Email providers use these records when handling emails that do not pass DKIM or SPF authentication. Each category of DNS records that you upload to your provider has a specific purpose.

| Classification                                                          | Type  | Reason                                                                                                                                                                         |
| :---------------------------------------------------------------------- | :---- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mail From Domain                                                        | CNAME | This record describes where the message originates from and helps conform to [Sender Policy Framework](https://dmarcian.com/what-is-spf/) (SPF) policy to pass authentication. |
| [DomainKeys Identified Mail](https://dmarcian.com/what-is-dkim/) (DKIM) | CNAME | These records allow the receiving email server to verify that the message was not altered during transit.                                                                      |

# Troubleshooting

* Check for typos on your DNS records. Every character is important! Modern Treasury provides copy buttons if you access the records via web application.
* Double check the `Type` of the DNS record is correct. All DNS records that Modern Treasury requires are `CNAME` records.
* Make sure your DNS records are published! You can use [online tools](https://www.digitalocean.com/community/tools/dns) to look up DNS records.
* Ensure that your DNS records are not proxied by your domain provider.
* On rare occasions, DNS records may take longer than 72 hours to propagate. If everything looks to be set up correctly, and the situation does not resolve itself in another 48 hours, please contact Support.

<br />