# Groups Mapping

Group mappings gives the ability for your members (external & internal) to be automatically provisioned permissions (readonly or admin), based on their groups attribute.

This feature is ideal for enterprise organizations with large numbers of members across various projects, and who need to be automatically channeled to certain projects with certain permissions.

Within the controls, you'll see three sections:

* Group Name - Which group is this member associated with in your SAML settings?
* Project - What ReadMe project do you want to provision the user to?
* Permission - What permission (readonly or admin) do you want to apply to this user?

For example, this is similar to saying, "I want my users with group attributes X, to have access to project Y, with permission Z"

### How to set it up

*First, it's important to note that you must have an IdP that is capable of groups. Otherwise, you don't really need to worry about this!*

1. You must have a SAML implementation in your ReadMe enterprise parent project.
2. Set the "Group Name" to a group that matches your group in your SAML application in your IdP. For instance, if you have a group named "contractors" and you want members in that group to have access to that project, set the "Group Name" to "contractors". Make sure the casing is correct!
3. Specify the projects you want to give them access to. If you want to give them access to all of the projects, set the project to the parent project.
4. Specify which permissions they will receive, either readonly or admin.

### Example setup in Okta

> 🚧 Groups mapping must be of type array
>
> We require that group implementations have a mapping type of array. Otherwise, the connection will error with a validation message!

Within the SAML Settings of your Okta application, in the group attributes statements section, set up the following mapping:

* key: groups
* filter value: MATCHES REGEX .+

<Image alt={1396} border={false} caption="If you have an Okta SAML connection, you must give us all of your groups. You can do so with the filter value set to &#x22;.+&#x22;" title="Screen Shot 2019-12-06 at 11.56.50 AM.png" src="https://files.readme.io/f86b180-Screen_Shot_2019-12-06_at_11.56.50_AM.png" />

<Image alt={2304} border={false} caption="Users will map to these groups (if they belong to them)!" title="Screen Shot 2019-12-06 at 11.56.36 AM.png" src="https://files.readme.io/668b97a-Screen_Shot_2019-12-06_at_11.56.36_AM.png" />

### Other notes on this feature

If you've overwritten a permission for a user, the overwrite will persist over the mapping. The overwrite always takes precedence! We check if a user already has permissions attached, if there is, then we don't overwrite it.

The mappings also provide a way to better navigate the Members section. If you have a large number of members in a project, then the mappings will collapse the users that already have those permissions into a single row item.