# Teammates and Roles

Control who can access admin controls and edit content.

Invite teammates to your project to collaborate on content and project settings. On Free, Startup, and Business plans, all teammates are Admins with access to all settings and content. Read more on [non-Enterprise roles](https://docs.readme.com/main/docs/manage-team).

| Viewer                       | Editor       | Admin                |
| :--------------------------- | :----------- | :------------------- |
| View docs, branches, staging | Content only | Settings and content |

<Callout icon="💼" theme="default">
  **Note:** The Editor role is only available on the Enterprise plan.
</Callout>

***

## Managing Teammates

The Teammates page can be found on the legacy dashboard from your Enterprise Dashboard. Only **Group Admins** or the **Owner** can manage teammates.

|                 | Viewer                                                                                | Editor                                                                                | Admin                                                                                       |
| :-------------- | :------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------ |
| View Project    | <i className="fa-duotone fa-solid fa-circle-check" style={{color: 'var(--green)'}} /> | <i className="fa-duotone fa-solid fa-circle-check" style={{color: 'var(--green)'}} /> | <i className="fa-duotone fa-solid fa-circle-check" style={{color: 'var(--green)'}} />       |
| Edit Content    | <i className="fa-duotone fa-solid fa-square-x" style={{color: 'var(--red)'}} />       | <i className="fa-duotone fa-solid fa-circle-check" style={{color: 'var(--green)'}} /> | <i className="fa-duotone fa-solid fa-circle-check" style={{color: 'var(--green)'}} />       |
| Modify Settings | <i className="fa-duotone fa-solid fa-square-x" style={{color: 'var(--red)'}} />       | <i className="fa-duotone fa-solid fa-square-x" style={{color: 'var(--red)'}} />       | <i className="fa-duotone fa-solid fa-circle-check" style={{color: 'var(--green)'}} /><br /> |

### Owner

Owners can delete the project and remove Admins. If your project Owner is no longer able to manage your project, reach out to [support@readme.io](mailto:support@readme.io) or your assigned customer success manager for assistance.

### Admin

Admins have access to settings, content, and can invite other Admins or Editors—though they cannot remove other Admins.

### Editor

The Editor role can edit any page, Reusable Content, Components, Glossary, Versions, and the Landing Page. They will not be able to edit any settings, like Custom CSS, Site Navigation, or invite Teammates. An Editor may only edit a version directly if the project's merge access level is set to **Admins & Editors** at the group's **Projects** page. Otherwise, an Editor must make edits within a branch of a version.

### Viewers

Viewers only have access to view docs, branches, and your staging environment.

***

## Project and Group Roles

You can give Teammates custom access to specific projects; for example, making them an Admin in one, and an Editor or Viewer in another.

Group Admins, Group Editors, and Group Viewers have access to all projects in your Enterprise group. Only Admins and Editors can access the Enterprise Dashboard. Group Viewers do not have access to the dashboard.

|                          | Project Role                                                                          | Group Role                                                                            |
| :----------------------- | :------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------ |
| Access All Projects      | <i className="fa-duotone fa-solid fa-square-x" style={{color: 'var(--red)'}} />       | <i className="fa-duotone fa-solid fa-circle-check" style={{color: 'var(--green)'}} /> |
| Access Specific Projects | <i className="fa-duotone fa-solid fa-circle-check" style={{color: 'var(--green)'}} /> | <i className="fa-duotone fa-solid fa-square-x" style={{color: 'var(--red)'}} />       |

<HTMLBlock>
  {`
  <style>
  table td {
  	text-align: center;
  }
  </style>
  `}
</HTMLBlock>