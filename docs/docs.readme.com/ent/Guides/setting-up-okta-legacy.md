# Setting Up Okta (legacy)

> ❗️ This is a legacy implementation
>
> See our new implementation [here](https://docs.readme.com/docs/setting-up-okta)

### Benefits

Setting up Okta and ReadMe allows members in your organization to authenticate with Okta and access various projects under ReadMe. In addition, you can set up ***Read Only*** members, which are limited to fewer privileges.

### Required information

If you haven't already, please fill out the form in this [link](https://readme2.typeform.com/to/YzPgCF). Shoot us an email and once we've reviewed the information, we'll make some changes on our end to register it with our service.

### Setting up Okta

1. As an admin in your Okta organization, add an application
2. In the search input box, enter "Custom" and add the application shown below
3. View the "Sign On" in the application settings, and follow the instructions under "View Setup Instructions". The documentation in "View Setup Instructions" will give you all the credentials required to fill in the Typeform form.

<Image title="Screen Shot 2018-06-14 at 5.50.03 PM.png" alt={1119} src="https://files.readme.io/474e260-Screen_Shot_2018-06-14_at_5.50.03_PM.png">
  Search for "ReadMe SAML"
</Image>

![1077](https://files.readme.io/bc74b40-Screen_Shot_2018-06-14_at_5.50.32_PM.png "Screen Shot 2018-06-14 at 5.50.32 PM.png")

<Image title="Screen Shot 2018-06-14 at 5.51.07 PM.png" alt={1075} src="https://files.readme.io/b9a3323-Screen_Shot_2018-06-14_at_5.51.07_PM.png">
  "View Setup Instructions"
</Image>

[How to configure SAML 2.0 for ReadMe SAML applications](https://saml-doc.okta.com/SAML_Docs/How-to-Configure-SAML-2.0-for-ReadMe.html)

You'll still be able to create readonly users when following this step. Follow these steps to assign a user as readonly.

<Image title="Screen Shot 2018-06-14 at 6.42.43 PM.png" alt={1061} src="https://files.readme.io/30aac7d-Screen_Shot_2018-06-14_at_6.42.43_PM.png">
  Assign users as readonly by setting the value to true
</Image>

1. Assign a user to the application
2. Set the value for "Readonly" to "true"

### Setting up Okta (with groups + read only integration)

1. In general, "Add an application"
2. Click "Create New App"
3. For the "Sign-On Method" option, choose the "SAML 2.0" option
4. Enter your company name

![1552](https://files.readme.io/d29f7e0-Screen_Shot_2018-06-15_at_9.12.45_AM.png "Screen Shot 2018-06-15 at 9.12.45 AM.png")

5. Set "Single sign on URL" and "Audience URI" of "SAML Settings" to "[https://sso.readme.io/okta/login/callback/\{YOUR\_COMPANY\_NAME}"](https://sso.readme.io/okta/login/callback/\{YOUR_COMPANY_NAME}")

![2172](https://files.readme.io/2066fd3-Screen_Shot_2018-06-15_at_9.15.48_AM.png "Screen Shot 2018-06-15 at 9.15.48 AM.png")

6. Set these attributes under the "Attribute settings". The readonly value can be any value that matches your definition of a readonly user. For instance, it can be ***isMemberOfGroupName("Read Only")***. For more information on the features for determining readonly users, check out Okta's [expression language documentation](https://developer.okta.com/reference/okta_expression_language/)

![1588](https://files.readme.io/13938fc-Screen_Shot_2018-06-15_at_9.15.24_AM.png "Screen Shot 2018-06-15 at 9.15.24 AM.png")

7. Finish creating your application
8. Navigate to the "Sign On" settings of your application and use the "View Setup Instructions" of the application to fill out this [form](https://readme.typeform.com/to/ht8llf). Refer to [this](https://saml-doc.okta.com/SAML_Docs/How-to-Configure-SAML-2.0-for-ReadMe.html) documentation created by the Okta devs for further help.
9. Once you fill out this form, shoot us a message and we'll set up the dependencies to finalize your Okta configuration!