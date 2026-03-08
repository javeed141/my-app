# Bug Bounty Program

> 🚧 April 2025 Update:
>
> We will only accept submissions that use our Refactored ReadMe experience. This would include new projects made from January 2025 onward! Keep in mind we are still strict about out of scope vulnerabilities. If you discover something, please make sure it **does not** fall under our "Out of Scope Vulnerabilities" seen below--these submissions will be ignored. At this time, all reward levels are available.
>
> Happy hunting!

ReadMe looks forward to working with the security community to find vulnerabilities in order to keep our businesses and customers safe.

# Response Targets

ReadMe will make a best effort to meet the following SLAs for researchers participating in our program:

| Type of Response   | SLA in business days               |
| ------------------ | ---------------------------------- |
| First Response     | 2 days                             |
| Time to Triage     | 2 days                             |
| Time to Bounty     | 14 days                            |
| Time to Resolution | depends on severity and complexity |

We’ll try to keep you informed about our progress throughout the process.

# Disclosure Policy

* As this is a private program, please do not discuss this program or any vulnerabilities (even resolved ones) outside of the program without express consent from the organization.

# Program Rules

Please provide detailed reports with reproducible steps. If the report is not detailed enough to reproduce the issue, the issue will not be eligible for a reward.

* Submit one vulnerability per report, unless you need to chain vulnerabilities to provide impact.
* When duplicates occur, we only award the first report that was received (provided that it can be fully reproduced).
* Multiple vulnerabilities caused by one underlying issue will be awarded one bounty.
* Social engineering (e.g. phishing, vishing, smishing) is prohibited.
* Make a good faith effort to avoid privacy violations, destruction of data, and interruption or degradation of our service. Only interact with accounts you own or with explicit permission of the account holder.

# Test Plan

Set up a [free trial](https://dash.readme.com/signup) on ReadMe - with a free trial you will have access to everything available to a paid ReadMe project. If you wish to research vulnerabilities against an Enterprise or Open Source plan, contact us directly by emailing [security@readme.io](mailto:security@readme.io).

# Testing vulnerabilities

We ask that you only test vulnerabilities on your own test projects. Feel free to reach out to [security@readme.io](mailto:security@readme.io) if you need to extend a trial indefinitely for testing purposes. **Any testing against our main site or customer sites (without written consent) will result in banning from our program**.

# Out of scope vulnerabilities

When reporting vulnerabilities, please consider (1) attack scenario / exploitability, and (2) security impact of the bug. The following issues are considered out of scope:

* **Reflected & Stored cross-site scripting within your own project dashboard is out-of-scope.**
* Clickjacking on pages with no sensitive actions
* Cross-Site Request Forgery (CSRF) on unauthenticated forms or forms with no sensitive actions
* Attacks requiring MITM or physical access to a user's device
* Previously known vulnerable libraries without a working Proof of Concept.
* Comma Separated Values (CSV) injection without demonstrating a vulnerability
* Missing best practices in SSL/TLS configuration
* Any activity that could lead to the disruption of our service (DoS)
* Content spoofing and text injection issues without showing an attack vector/without being able to modify HTML/CSS
  * Also excluded from this are content spoofing and text injection issues from within a projects dashboard as we allow project owners to write JS on their projects
* Rate limiting or bruteforce issues on non-authentication endpoints
* Missing best practices in Content Security Policy
* Missing HttpOnly or Secure flags on cookies
* Missing email best practices (Invalid, incomplete or missing SPF/DKIM/DMARC records, etc.)
* Vulnerabilities only affecting users of outdated or unpatched browsers \[Less than 2 stable versions behind the latest released stable version]
* Software version disclosure / Banner identification issues / Descriptive error messages or headers (e.g. stack traces, application or server errors)
* Public Zero-day vulnerabilities that have had an official patch for less than 1 month will be awarded on a case by case basis
* Tabnabbing
* Open redirect - unless an additional security impact can be demonstrated
* Password or account policies, such as password complexity
* Issues that require unlikely user interaction

# Safe Harbor

Any activities conducted in a manner consistent with this policy will be considered authorized conduct and we will not initiate legal action against you. If legal action is initiated by a third party against you in connection with activities conducted under this policy, we will take steps to make it known that your actions were conducted in compliance with this policy.

Thank you for helping keep ReadMe and our users safe!

# Rewards

| Low        | Medium     | High         | Critical     |
| ---------- | ---------- | ------------ | ------------ |
| $250 (USD) | $500 (USD) | $1,000 (USD) | $3,000 (USD) |

# Scopes

## In Scope

| Type        | Link                                                                 | Description                                                                                                                                                                                                                                                   | Severity |
| ----------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| Domain      | metrics.readme.io                                                    | To use our Metrics API, you can find your API key in your ReadMe project configuration. Documentation for the Metrics API can be found at [https://docs.readme.com/main/reference/](https://docs.readme.com/main/reference/).                                 | Critical |
| Domain      | dash.readme.io                                                       | dash.readme.io and dash.readme.com are synonymous with each other so when testing use dash.readme.com in lieu of this domain.                                                                                                                                 | Critical |
| Domain      | dash.readme.com                                                      |                                                                                                                                                                                                                                                               | Critical |
| Domain      | readme.com                                                           | We’re not interested in vulnerabilities being reported on this asset because it’s a static site without access to any customer information.                                                                                                                   | Low      |
| Source code | [https://github.com/readmeio/rdme](https://github.com/readmeio/rdme) | rdme is a CLI frontend for our API that is installable via NPM. Any vulnerabilities that exist here would be upstream within our API. We’re not interested in receiving vulnerabilities on this repository, therefore the bounty eligibility is very minimal. | Low      |
| Other       | Hosted projects                                                      | This covers project documentation sites (for example docs.readme.com) that are powered by our platform.                                                                                                                                                       | Critical |

## Out of Scope

| Type   | Link                | Description                                                                                               |
| ------ | ------------------- | --------------------------------------------------------------------------------------------------------- |
| Domain | \*.readme.com       | Anything not explicitly listed as in scope, but is available on the readme.com domain.                    |
| Domain | feedback.readme.com | feedback.readme.com is where we accept feature requests from our customers. It is hosted by productboard. |
| Domain | preview\.readme.io  | preview\.readme.io is a demo site for our API Explorer code repository and is hosted on GitHub pages.     |