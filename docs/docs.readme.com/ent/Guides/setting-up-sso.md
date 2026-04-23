# Single Sign-On (SSO)

> 🚧 Single-Sign-On is an Enterprise Feature
>
> Contact [growth@readme.io](mailto:growth@readme.io) if you are interested!

ReadMe supports most SAML 2.0 based SSO providers including:

* Active Directory / LDAP
* ADFS
* G Suite
* IP Address Authentication
* Office 365
* OpenID Connect
* PingFederate
* SAMLP Identity Provider
* Sharepoint Apps
* Microsoft Azure AD
* JumpCloud

### Implementation Workflow

1. Navigate to the **Teammates** setting in your Enterprise Group dashboard
2. Choose "SAML" from the Single Sign-On dropdown and then the "Configure" option will appear
3. Within the configuration, you'll need to add a few things into your IDP:

   * [ ] IDP Configuration
   * [ ] Attribute Statements
   * [ ] Group Attr. Statements

<Image className="border" width="500px" border={true} src="https://files.readme.io/7c1996c-image.png" />

> 🚧 Make sure the Single Sign-On URL & Entity ID includes your Enterprise Group name with "-teammates" at the end! This is your connection name.

### Logging in after your connection is set up

\~\~Once users log in to ReadMe via the proper login URL `<https://dash.readme.com/login/sso/[connection-name]`> they will see all projects associated with the Enterprise account but will only get access to a project after they are added as a user under the members page by an existing Admin. \~\~

### Our permissions system and SAML

By default, every member that signs in with SAML does not have access to the projects (either parent project or child project). The members that do, can log in, and request access for the project.

> 🚧 Please Note!
>
> Just because a user has access to SAML, does not mean they have access to a ReadMe project.

There are two ways you can approve a user through our permission system:

1. As an administrator, you can approve/reject requests for permission to access that project. So as Teammates/End Users log into your authentication service, they can request access.
2. After you have set up your SAML connection, you can add new Teammates by selecting the "**Invite**" option.

<Image className="border" width="5000px" border={true} src="https://files.readme.io/0a31203-image.png" />

A user can also request access to a project and an Admin can accept or decline that request. In the Teammates page, the admins can also specify whether a new user should be a Group Admin, Group Viewer, Project Admin, or Project Viewer.

> 📘 This is the doc for the new auth experience!
>
> If you want to gain access to some new SSO features. Please contact your Product Experience Manager.