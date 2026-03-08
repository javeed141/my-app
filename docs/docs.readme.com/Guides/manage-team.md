# Teammates and Roles

Control who can access admin controls and edit content.

Invite teammates to your project to collaborate on content and project settings. On Free, Startup, and Business plans, all teammates are Admins with access to all settings and content.

| Admin                | Owner                                         |
| :------------------- | :-------------------------------------------- |
| Settings and content | Admin access, billing, and deleting a project |

<Callout icon="💼" theme="default">
  **Note:** The Editor role is only available on the Enterprise plan.
</Callout>

***

## Managing Teammates

The Teammates page can be found from **Admin Settings** → **Manage Team**. On Enterprise projects, only **Group Admins** or the **Owner** can manage teammates from the Enterprise Dashboard.

All projects can have one Owner, and teammates based on their plan:

| Plan       | Number of Teammates                   |
| :--------- | :------------------------------------ |
| Free       | 5                                     |
| Startup    | 10                                    |
| Business   | 50                                    |
| Enterprise | [Contact Us](mailto:growth@readme.io) |

***

## Roles

### Owner

Owners have access to billing information for the project, can delete the project, and can remove Admins. By default, the creator of a project is its Owner. You can transfer ownership to another teammate from the Teammates page.

<Callout icon="💁‍♂️">
  Billing information is tied to the Owner and not projects. When transferring to a new Owner, you will have 14 days to add payment info to maintain access to the project.
</Callout>

If your project Owner is no longer able to manage your project, reach out to [support@readme.io](mailto:support@readme.io) from an email address associated with your organization.

### Admin

Admins have access to settings, content, and can invite other Admins or Editors—though they cannot remove other Admins. On Free, Startup, and Business plans, all teammates have Admin permissions.

***

## Enterprise Roles

Enterprise projects can add Teammates as an Admin, Editor, or Viewer.

|                 | Viewer                                                                                | Editor                                                                                | Admin                                                                                       |
| :-------------- | :------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------ |
| View Project    | <i className="fa-duotone fa-solid fa-circle-check" style={{color: 'var(--green)'}} /> | <i className="fa-duotone fa-solid fa-circle-check" style={{color: 'var(--green)'}} /> | <i className="fa-duotone fa-solid fa-circle-check" style={{color: 'var(--green)'}} />       |
| Edit Content    | <i className="fa-duotone fa-solid fa-square-x" style={{color: 'var(--red)'}} />       | <i className="fa-duotone fa-solid fa-circle-check" style={{color: 'var(--green)'}} /> | <i className="fa-duotone fa-solid fa-circle-check" style={{color: 'var(--green)'}} />       |
| Modify Settings | <i className="fa-duotone fa-solid fa-square-x" style={{color: 'var(--red)'}} />       | <i className="fa-duotone fa-solid fa-square-x" style={{color: 'var(--red)'}} />       | <i className="fa-duotone fa-solid fa-circle-check" style={{color: 'var(--green)'}} /><br /> |

The Editor role can edit any page, Reusable Content, Components, Glossary, and the Landing Page. They will not be able to edit any settings, like Custom CSS, Site Navigation, invite Teammates, or directly edit a version (they can make edits via a branch).

Viewers only have access to view docs, branches, and your staging environment.

### Project and Group Roles

You can give Teammates custom access to specific projects; for example, making them an Admin in one, and an Editor or Viewer in another.

Group Admins, Group Editors, and Group Viewers have access to all projects in your Enterprise group. Only Admins and Editors can access the Enterprise Dashboard. Group Viewers do not have access to the dashboard.

|                          | Project Role                                                                          | Group Role                                                                            |
| :----------------------- | :------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------ |
| Access All Projects      | <i className="fa-duotone fa-solid fa-square-x" style={{color: 'var(--red)'}} />       | <i className="fa-duotone fa-solid fa-circle-check" style={{color: 'var(--green)'}} /> |
| Access Specific Projects | <i className="fa-duotone fa-solid fa-circle-check" style={{color: 'var(--green)'}} /> | <i className="fa-duotone fa-solid fa-square-x" style={{color: 'var(--red)'}} />       |

<br />

<HTMLBlock>
  {`
  <style>
  table td {
  	text-align: center;
  }
  </style>
  `}
</HTMLBlock>