# Custom OAuth Login

> 📘 Custom OAuth is an Enterprise Feature
>
> Contact [growth@readme.io](mailto:growth@readme.io) if you are interested!

To allow your users to log in using custom authentication, it's possible to write custom OAuth code, with the final redirect using a JWT url to pass the user information to ReadMe. For more information about custom logins, see [Log Your Users in with a Custom Login Flow](/main/docs/custom-login-page).

This can be done by running an OAuth bridge server from ReadMe or on your own infrastructure. Starter code can be viewed on [GitHub](https://github.com/readmeio/starter-jwt-bridge). For most OAuth implementations, editing config.js will be sufficient to get the OAuth bridge working. Documentation on the format for sending data via JWT can be found here:  [User Data in ReadMe](/main/docs/user-data-options).

For an example of setting up a simple OAuth server, view [Setting up GitHub OAuth](https://docs.readme.com/ent/docs/setting-up-github-oauth).

## User Session Expiration

You can set the number of minutes before the user will be required to reauthenticate under advanced options in **Variable Defaults**.

### Project Dashboard

Appearance > Site Navigation

![](https://files.readme.io/4928faa-Screen_Shot_2023-02-14_at_1.48.48_PM.png)

Click *View Advanced Options* dropdown:

![](https://files.readme.io/532d78a-Screen_Shot_2023-02-14_at_1.48.55_PM.png)

> 📘 User Session Expiration setting moves for Enterprise customers
>
> This setting moves from the Project dashboard to the Enterprise Group dashboard and applies across projects within the group.

### Enterprise Dashboard

End Users > Scroll down to *Advanced* section

<Image align="center" src="https://files.readme.io/328e402-Screen_Shot_2023-07-28_at_2.03.51_PM.png" />