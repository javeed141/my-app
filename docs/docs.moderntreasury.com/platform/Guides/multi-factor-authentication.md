# Enable Multi-Factor Authentication (MFA)

Modern Treasury supports Multi-Factor Authentication (MFA) for additional security. If you are logging into Modern Treasury via email & password only, you can set up Multi-Factor Authentication within the application.

> 📘 Enabling MFA
>
> MFA cannot be enabled at the organization level. Administrators must turn on MFA for users individually. This enables you to have a blend of authentication methods, which can be useful when you have users outside of your company (e.g. accountant or bookkeeper) accessing Modern Treasury.

## To turn on Multi-Factor Authentication for individual users

1. Navigate to "Settings > Users" from the dashboard sidebar
2. Search for the user by name or email and open their profile
3. From the 'Actions' dropdown menu, select 'Edit'
4. Check the *Require multi-factor authentication* box
5. Click 'Update User' to finish

After turning on MFA for a user, the next time the user logs in, they will enroll in a second factor. Then in subsequent logins, the user will be prompted to enter their 2FA at login.

<Image border={false} src="https://files.readme.io/5f8aaa3-image.png" />

**Time-based one-time password:** this will be a QR code that the user scans with their Google Authenticator, 1Password, or any variety of password or authenticator apps

<Image border={false} src="https://files.readme.io/aadba68-image.png" />

## To turn on Multi-Factor Authentication for an entire organization

> 📘 Note that once this setting is turned on, it cannot be turned off

> 📘 This process can take may take 10-15 minutes. Once in place, each user logging in will be prompted to enable their MFA. We recommend doing this at the weekend or after business hours

1. Navigate to "Settings > Organization - General" from the dashboard sidebar
2. Click on "MFA" from the top bar
3. From the 'Actions' dropdown menu, select 'Edit'
4. Check the *Enforce MFA for all users* box
5. Click 'Save Changes' to finish

<Image align="center" border={false} width="% " src="https://files.readme.io/d27ec0eed1f926a1a953ca17cd1000fa48d4278b4ef9c232e28d872ff63780be-2.png" />