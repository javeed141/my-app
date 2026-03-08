# Sync with GitLab 

## How to Set Up Bi-Directional Sync with GitLab

### Prerequisites

* You will need a GitLab account.
* When syncing to a repository in an organization, you will need permission to create an **empty repository**.

<Image align="center" border={false} src="https://files.readme.io/d2a12db436be321b972fd817432f3754a13d61c0ecb915202862e58fb2252cc1-Screenshot_2025-10-31_at_1.43.41_PM.png" />

### Set Up

1. Navigate to **Settings** > **Git Connection** page.
2. Select GitLab.
3. If you haven’t already, create an empty repository in [GitLab](https://docs.gitlab.com/user/project/)—make sure to uncheck the option to create a README.
4. **Sync** with your provider and authenticate.
5. Create a personal access token with the `api` scope. You can delete this token after completing setup. ReadMe uses this token once during setup to create the webhook on your repository and it is not stored.
   1. For project access tokens, you will need the Maintainer role. However, this is not recommended as there’s a cap on the number of project access tokens created, depending on GitLab pricing.

<Image border={false} src="https://files.readme.io/b350ddb7403c7d0ffbaa7d4f8e4c5fc6ca0d92308c4c81bde90b2c2b146a1ed3-image.png" />

6. Add the access token to ReadMe and click on the webhook icon to create the webhooks we need to keep your content in sync with GitLab.

***

## Changing Repositories

If you need to connect your ReadMe project to a different repository, you must disconnect the original repository using the trash icon.

1. Within ReadMe, disconnect the project via the trash icon.
2. Within GitLab, create a new empty project.
3. Return to ReadMe and select the project you'd like to sync to.

***

## Protected Branches

All branch rules should allow the user (who is syncing to GitLab from ReadMe) to push.

<Image border={false} src="https://files.readme.io/5ab0dbdd08ca7f9fc31d8a6895ebb9a970819ea4f2c352c92307ab5886b14541-image.png" />

## FAQ

<Accordion title="What permissions are required when syncing with GitLab?" icon="fa-question-circle">
  ReadMe requests access to:

  * `read_api` for listing projects
  * `read_user` and `read_profile` to display user information
  * `read_repository` to sync content in GitLab to ReadMe
  * `write_repository` to sync content in ReadMe to GitLab
</Accordion>

<br />