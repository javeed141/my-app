# Authentication & Access

Introducing the new authentication and access management experience live in Enterprise Group dashboards!

# 🎉 A New Way to Authenticate & Manage Projects

Over the last year we’ve been working hard to make our authentication and access management experiences for Enterprise Group Admins more intuitive and easier to set up and update. We're excited to share that these features are now live in your <Glossary>Enterprise Group</Glossary> dashboard! ✨

This new experience makes it simpler for an <Glossary>Enterprise Group Admin</Glossary> to manage user permissions and projects within their Enterprise group so that it’s clear who has access—and what type of access—to their Enterprise Group <Glossary>dashboard</Glossary>s, related child project dashboards, and/or related child project <Glossary>hub</Glossary>s, as well as makes it easier for teams to maintain, update, and share their project documentation overall.

* **Clearer user roles:** granting user permissions to your Enterprise Group and/or related projects is easier and more accurate with new, separate pages for Teammates, who manage your documentation, and End Users, who consume your documentation
* **Easier login configuration:** Enterprise Group Admins now have the ability to configure their preferred login methods for both Teammates and End Users, including SAML configuration
* **Simpler multi-project visibility and management:** routine enterprise activities, including inviting users to your documentation, and adding, editing, and managing the visibility of projects within an Enterprise group is now easier, and faster, to do at scale

<Image align="center" className="border" border={true} src="https://files.readme.io/8cf7a95-Enterprise_Overview_gif.gif" />

## 🗓 Rollout for Current Enterprise Customers

The new Enterprise experience is available to all new Enterprise customers as of February 14th, 2022, and began rolling out to current Enterprise customers as of March 16th, 2022. The full roll out to Enterprise customers will be staged over a few weeks. If you are reading this in or after April 2022, are an Enterprise customer, and do not see these changes live in your Enterprise dashboard, feel free to reach out to your Product Experience Manager and they’ll be able to help you get set up!

> 📘 Interested in ReadMe Enterprise?
>
> To learn more about ReadMe’s Enterprise plan and to set up a meeting to speak with one of our team members, please reach out to **[growth@readme.io](mailto:growth@readme.io)**. We’re happy to help!

## 🎉 What's New & Improved?

You may notice that the sidebar in your Enterprise Group dashboard is looking a little different. To make it easier to distinguish between user roles, the former, unified Members page in your dashboard is now two separate sections: **(1) Teammates** and **(2) End Users**. We’d previously heard from our Enterprise Group Admins and <Glossary>Enterprise Group Owner</Glossary>s that it could be confusing when trying to manage permission settings, especially within Enterprise Groups with multiple child projects, so we set out to improve that. We’ve also improved the experience of bulk inviting individuals to projects to clarify what permission levels Enterprise Admins and Owners can grant these individuals and more intuitively communicate what projects these individuals have access to within an Enterprise Group—whether some, all, or no access to child projects.

### A New Space for Teammates

Teammates refer to members of your team who manage (write, update) documentation for your projects and therefore may need access to the dashboard for either your Enterprise Group or certain projects related to your Enterprise Group.

In the top Settings section, you’ll configure how <Glossary>Teammates</Glossary> who you grant project or group access to will login. If you choose to enable, Domain Safelist allows you to simplify the login process for members of your team by setting a domain and allowing anyone with an email address at that domain to create a ReadMe account. This is also where you’ll configure SAML, if you choose to use it for authentication. Your Product Experience Manager can help with setting up SAML should you want support and, once configured, your URL details will appear here. You can choose to Enforce SSO which ensures that anyone with Teammates access will have to login via SAML in order to access your ReadMe projects or group. You can also default to an access type, which is great if, for example, you enable Domain Safelist.

> 📘 Have a Question About Login Configuration?
>
> We’re working on more in-depth documentation about each of the available login configuration methods! In the meantime, please reach out directly to your Product Experience Manager and they’ll gladly walk you through the configuration process step-by-step!

On the lower portion of the Teammates page is where you can quickly get a snapshot of all projects within your Enterprise Group, who has access to them, and what type of permission level each invited individual has. You can find, filter, and add Teammates and easily identify and change what type of access they have, either to some or all projects. There are three permission levels that you can assign Teammates:

* **Group Admin** - this role has Admin-level access to the Enterprise Group dashboard as well as the project-level dashboards of all related child projects
* **Group Viewer** - this role has the ability to view all child project hubs, but has no dashboard access—to child project dashboards or to your Enterprise Group dashboard
* **Custom** - you can customize permission levels for this role, for example granting a mix of Admin and Viewer permissions across your child projects, granting dashboard access to some or all child projects but not to the Enterprise Group dashboard, or granting hub-side viewing privileges to some child projects but not all

<Image align="center" className="border" border={true} src="https://files.readme.io/c357053-Auth_Teammates_Page.png" />

### Managing End Users with Ease

<Glossary>End Users</Glossary> are individuals who consume your documentation. They’ll only have hub-side access to your project’s private documentation. There are two pages within the End Users section: (1) End User Login and (2) End User Management.

The End User Login page is where—similar to the Teammates page—you can configure login access for how End Users will login to your ReadMe project, so that they can view your private documentation, as well as set a default access for what type of permission level they have. If you choose the ReadMe Login Method, that’s to allow invited End Users to login via ReadMe’s passwordless login flow. This option allows your End Users to login without having to set up a ReadMe account. This is a white label experience that you can visually customize so that it feels like End Users are logging in to your company’s documentation.

<Image align="center" className="border" border={true} src="https://files.readme.io/3e6c685-Auth_End_User_Login_Page.png" />

The End User Management page is where you’ll find a complete list of all End Users that have access to private documentation, across all of the projects within your Enterprise Group. You can manually invite an End User here and assign Viewer access (hub-side access) to some or all child projects.

<Image align="center" className="border" border={true} src="https://files.readme.io/9700e03-Auth_End_User_Management_Page.png" />

### A Faster Way to Manage Projects at Scale

The Projects page serves as a centralized place where you can see and manage all of the child projects related to your Enterprise Group. In addition to being able to view the hub side of any of your projects, you can set a child project to Public or Private from this page as well as reorder how your projects are listed here, head to any child project's dashboard, or remove this project from your Enterprise Group. Only Enterprise Group Admins will have access to these functionalities.

<Image align="center" className="border" border={true} src="https://files.readme.io/6b1cbb4-Auth_Projects_Page.png" />

## 📹 Want to See the New Changes in Action?

Here’s a live walk-through of the Enterprise authentication and access management experience!

<HTMLBlock>
  {`
  <div style="position: relative; padding-bottom: 62.5%; height: 0;"><iframe src="https://www.loom.com/embed/470ce293c5fb42d0b69597c9a8899e30" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>
  `}
</HTMLBlock>

## 👋 Have Questions? Need Help?

If you’re a current Enterprise customer, please reach out directly to your Product Experience Manager. Otherwise, feel free to reach out to our Support team, either via leaving an Intercom message on this page or emailing [support@readme.io](mailto:support@readme.io) 👍