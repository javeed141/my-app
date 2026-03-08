# Setting Up Microsoft Entra

# Setting up Microsoft Entra ID SAML SSO for ReadMe

The following link are instructions on Microsoft's site explain how to create an app on Entra and configure it to use SAML SSO

* <Anchor label="Enable SAML single sign-on for an enterprise application" target="_blank" href="https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/add-application-portal-setup-sso">Enable SAML single sign-on for an enterprise application</Anchor>

# Configuration Instructions for Non-Group SSO

This setup assumes you are **not** using groups in Entra to filter users to specific projects in ReadMe. Group mapping will be cover later in this document.

The following are instructions for configuring your SAML Entra app to work with ReadMe.

## 1. Create the Entra Enterprise Application

* In Entra ID → Enterprise applications, All application, new application.

<Image align="center" border={false} src="https://files.readme.io/ebb586be302a703c0a49f33f2412d6c00826a183f825aa9131c3ebe8082a4c7f-new_entra_app.png" />

* Name it something like ReadMe SSO.

<Image align="center" border={false} src="https://files.readme.io/e8fd128f4bf09932d0a5bfbee187a9f04d08120493882645487ab94b5f428023-create_your_own_app.png" />

* Click "Create" to create your app.
* Finally, make sure the app is set up as a SAML app by finding your app in all apps and clicking into it:

<Image align="center" border={false} src="https://files.readme.io/3535a05e57c7144d6b4a01571ae7d12b5d88538cf2f68163787c69b2d70679ed-find_app_in_all_apps.png" />

* Select Single Sign-on from the left side menu and select SAML as the option for your app:

<Image align="center" border={false} src="https://files.readme.io/2e9d96b2cf630a928ebb172f2632531b769e5cfbb5e69b51e62ea603b4c45007-select_saml.png" />

In step 2 we'll configure SAML to work with ReadMe.

## 2. Configure Basic SAML Settings

* Go to Teammates in your ReadMe group dashboard

<Image align="center" border={false} width="50% " src="https://files.readme.io/63e29a4580c8320f0b0db8ff0fad82ec901e7d3cabf45fac37f68fd97741129d-readme_teammates.png" />

* Select SAML from the Single Sign-On menu and then click the Configure link

<Image align="center" border={false} src="https://files.readme.io/93cdc5451484910ac9ada39e5b0a4ed691cabe872fbb2b24ce07a9156a213613-readme_sso_config_link.png" />

* Record your Identifier (Identity ID) value to be used in your Entra config:

<Image align="center" border={false} width="50% " src="https://files.readme.io/d4e2bf9ae0af68e172cab424b551747a4fb846629719343b0dd22681f12965d9-identity_ID.png" />

* Record your Single Sign-on URL to be used in your Entra config:

<Image align="center" border={false} width="50% " src="https://files.readme.io/86178659357cafc259cb3481a1c169e62bffc31943888d5c196ad111a9828471-SSO_URL.png" />

* Navigate back to your app in Entra and click Single Sign-on in the left nav and in the menu in the firs section click the edit icon.

<Image align="center" border={false} src="https://files.readme.io/339aeb3ad869d11e1559086de761d3f86ad977baafb40e9e797ded5bd30a31e6-Edit_basic_saml_config.png" />

* Now fill out the Basic SAML Config form and save your settings. Your ReadMe Identity ID goes in the first field and your ReadMe login url goes in second field, just like in the following image.

<Image align="center" border={false} src="https://files.readme.io/e035b7594923e3a07cbcf0ba6d319a704af866c5ead47fc582d1e038e5c6b0fc-entra_ID_URL_config.png" />

## 3. Configuring your CERT and Login URL

* While you are on this page in Entra (from the previous step), you should click to download your Certificate (Base64) and record your login URL to use on the ReadMe SSO config. See following image for details.

<Image align="center" border={false} src="https://files.readme.io/7c8079a73e29f6f912dd38bdf6611afd249ffc3342bd8c367a5f9cb9dd247c0b-dl_cert_and_login_url.png" />

* Now navigate back to your ReadMe SSO configuration page and in the Single Sign-on URL put the value you recorded from the step above.

<Image align="center" border={false} width="50% " src="https://files.readme.io/21f5523d5de0ee65bc866eb58efb30a42013fd27e3e736cff98d608e7431a462-readme_sso_signin_url.png" />

* Find the Certificate (Base64) you just downloaded and open it up in a plain text editor.
* Copy the value exactly as it is in the text file and paste it into the Public Key Certificate section of your ReadMe SSO config shown in the following image. Be sure to save all your changes!

<Image align="center" border={false} width="50% " src="https://files.readme.io/22b763151838f086fbabe3b3099a579fea15fd3348d38500514e697ca94f3bdc-readme_public_key.png" />

## 4. Attributes and Claims

* While you are in the ReadMe SSO config page make note of the values in the Attributes Statements section, noted in the following image. You will need these for the Attributes & Claims section in Entra.

<Image align="center" border={false} width="50% " src="https://files.readme.io/fb1fd8a5a0053d48663d1a2d5ddbec5d0d9a5a43c165104414f88a4693a1b510-sso_attributes.png" />

* Now navigate back to the Single sign-on setup in your Entra app. Locate the Attributes & Claims section and make sure it is configured just like this:

  <Image align="center" border={false} src="https://files.readme.io/5117d8c960fac5fc70b0ad47d8759beb28dbd57c13eabc3297be1bdaae7cc85d-attributes_and_claims.png" />
* You should at least have `email = user.mail`, `name = user.givenname`, `username = user.userprincipalname`. Save your changes.

## 5. Add Users To The Entra App

* Log back into your Entra app and click on the **Users and groups** link in the left nav. Then click on **Add user/group**

<Image align="center" border={false} src="https://files.readme.io/fcf87735f00f0ba7141faf3e3fc0d6c66d461ac8a037fb38773a45ddb542dd5b-entra_add_new_user.png" />

* Next select the users you want to give access to and save your entry.

<Image align="center" border={false} src="https://files.readme.io/5e06cef7ecec2e92c553da2d646c6702be8a7d5ec696243de741dd24888b055a-select_users.png" />

* You can now see the users listed in the **Users and groups** section of your app.

<Image align="center" border={false} src="https://files.readme.io/725e6e4a3f7bfa11b21ba86810add24a903ae6486e958ab59e09b8827acbdcfa-entra_users_added_to_app.png" />

* If you look closer at Owlberto you can see he is type User and Role user:

<Image align="center" border={false} src="https://files.readme.io/1afd67a67cc85b040b66d92bc4e46a27f377e8dc7aefe56bc49f3117197456fd-user_assigned_role.png" />

* Clicking into Owlberto you see his record and see that he has one application assigned to him.

<Image align="center" border={false} src="https://files.readme.io/77bc64ec64c77315304cd17f610d3533f8277ce32949053c54c6e02c71c8f8e0-user_record_overview.png" />

Now the end user can access the Entra App tile and click it to log into ReadMe.

<br />