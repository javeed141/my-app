# Setting Up Okta

### Benefits

Setting up Okta and ReadMe allows members in your organization to authenticate with Okta and access various projects under ReadMe.

> 📘 Make sure you have your ReadMe IDP info ready! [Here's how to find it!](https://docs.readme.com/ent/docs/setting-up-sso)

### Setting up Okta

1. Go to applications within your admin dashboard in Okta. It's important that you are in the classic UI.
2. Select "Create New App" (Do not use the ReadMe pre-built app). Make sure this is a custom app and not the default "ReadMe" Okta app.
3. Choose SAML 2.0 for the sign in method.
4. Refer back to the SAML configurations on the Teammates page regarding Single Sign On URL. Set the Single Sign On URL to the one specific under the IDP Configuration section. It should look something like this: [https://readmeio.auth0.com/login/callback?connection=parentsubdomain-1](https://readmeio.auth0.com/login/callback?connection=parentsubdomain-1)
5. Do the same thing for Audience URI. It should look something like this: urn:auth0:readmeio:parentsubdomain-1
6. Set the attribute statements as specified below:

| Name     | Name format (optional) | Value          |
| :------- | :--------------------- | :------------- |
| name     | Unspecified            | user.firstName |
| username | Unspecified            | user.login     |
| email    | Unspecified            | user.email     |

7. Set the groups mapping as specified below (if you are using this feature). You can read more about group mappings [here](https://docs.readme.com/ent/docs/groups-mapping).

| Name   | Name format (optional) | Filter                |
| :----- | :--------------------- | :-------------------- |
| groups | Unspecified            | **Matches regex:** .+ |

8. Create the app!
9. View the "Sign On" tab in the application settings, and follow the instructions under "View Setup Instructions". The documentation in "View Setup Instructions" will give you all the credentials required to complete the ReadMe side.
10. Input the appropriate details into the ReadMe configuration.

> 📘 Make sure you are on the Classic UI
>
> The screenshots below are taken from our Okta dev console test account, but all settings are the same as the Classic UI.

<Image title="Screen Shot 2021-07-08 at 3.45.17 PM.png" alt="Click &#x22;Create New App&#x22;" src="https://files.readme.io/6dec57d-Screen_Shot_2021-07-08_at_3.45.17_PM.png">
  Click "Create New App"
</Image>

<Image title="Screen Shot 2021-07-08 at 3.48.31 PM.png" alt="Set up your Single Sign-On URL & Audience URI" src="https://files.readme.io/1b56d70-Screen_Shot_2021-07-08_at_3.48.31_PM.png">
  Set up your Single Sign-On URL & Audience URI
</Image>

<Image title="Screen Shot 2021-07-08 at 3.00.27 PM.png" alt="&#x22;View Setup Instructions&#x22;" src="https://files.readme.io/3dbcfb5-Screen_Shot_2021-07-08_at_3.00.27_PM.png">
  "View Setup Instructions"
</Image>