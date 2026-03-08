# GitHub Enterprise Server

## Accessing Git Connection Settings

To access GitHub Connection settings go to **Group dashboard** > **Group Settings** > **Git Connection**.

A new Git repository is required and must be completely empty—no commits or files (e.g., README.md)—before connecting to ReadMe. You can add or remove files after setup.

After selecting “authorize on GitHub” you will be required to authenticate on GitHub.

<Callout icon="🚧" theme="warn">
  When logged into GitHub as a non-repo owner on a public project, you will be prompted to fork the project to make edits.
</Callout>

<Image border={false} src="https://files.readme.io/0a7ce1a87be2794839f4d46aebc0d2de1e615905055eb43195477026cad76916-image.png" />

## Enabling GitHub Enterprise Server (GHES)

**Repository Requirements**

Syncing to your GitHub Enterprise Server (GHES) requires a new, empty repository, and each child project can only sync to one repository.

**Network Requirements**

We recommend your GHES server be accessible from the internet.

If your GHES server is behind a VPN, you must allow traffic from ReadMe’s IP addresses:

* 100.78.225.12
* 34.211.200.85
* 35.160.120.126
* 44.233.151.27
* 54.69.248.207
* 74.220.48.0/24
* 74.220.56.0/24

**Setup Requirements**

To setup GHES, a user with permission to create GitHub Apps needs to provide their hostname and organization name. The GitHub App will be installed to their organization.

Once the app is created, you will see your app info and a reset button (if you need to recreate a new one). You will then have to grant the app access to your organization and repositories:

<Image align="center" border={false} src="https://files.readme.io/d87cfce6f9bc0060f27461eae989fb270c1675bfbd6be91401feff7532f0b629-GitHub_Enterprise_Server-20250214-0959462x.png" />

After setup, you will see all of your projects in the group. You can also filter by name, first sync, last sync, and status. You will need to select which repository should map to your ReadMe project. Additional repos can be added via GitHub.

<Image align="center" border={false} src="https://files.readme.io/af75fe55017f1ed6f883b5bd95a56abd9ea214ff072dadd9fa950a0788d5a40b-image.png" />

## Managing and Disconnecting Projects

Once a ReadMe project is connected a GitHub repository, you can click on the Connected button to manage the connection or disconnect the connection.

<Image align="center" border={false} src="https://files.readme.io/43ec28c72e9d64788a53a316580da0bbbee77a6be5d0226f22b6b4cb9be2cfed-GHES.gif" />