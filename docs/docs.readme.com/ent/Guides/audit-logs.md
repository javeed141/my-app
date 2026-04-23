# Audit Logs

Audit logs show a record of project actions. You can find audit logs from the Enterprise dashboard from **Admin Settings** → **Your Enterprise Name** → **Audit Logs** (or directly at dash.readme.io/group/`YOURENTERPRISENAME`).

<Callout icon="☝️">
  Only Group Admins have access to this feature.
</Callout>

## Recorded actions

The following actions are logged:

* accept invite
* deny invite
* accept request
* edit project
* edit page: Note there are no log entries created for the actions of submitting an edit, or for merging that suggested edit
* edit member
* publish version
* add new page
* add new member
* create invitation
* add batch members
* create new version
* clone project
* delete page
* delete invitation
* edit member
* delete member
* delete project
* delete version
* delete api setting
* delete discussion
* delete category
* delete changelog
* delete custom page
* update version
* refresh sync:  Action available to admins who sync their API reference with an API specification via URL import in their project's dash.
* syncing content from an external repository: Action available only on ReadMe Refactored

## Filtering logs

You can filter your logs by the following criteria:

* timestamp: see logs from most recent or from least recent
* members: filter by email address. You can select one member at a time.
* project: You can select one child project at a time.
* version: You can select one project version at a time. Not that not all recorded actions have an associated project version. For example, a 'page edit' action has an associated project version, but an 'edit project' action lacks an associated project version.
* action: select from create, delete, and edit. All possible actions fall into one of these buckets. For example, you see "update version" events show up when you filter on "edit."

## Details on viewing page edit logs

The "Edit page" is a frequently logged event, so it's worth pointing out some subtleties:

Each time an admin saves an edit, the log adds an edit entry.   If you want to see what changes an admin made, you can follow the link in that log entry to the view the latest version of the page, then access the Doc History to find the edit that corresponds to the same timestamp as the audit log entry.\
Currently, ReadMe does not support creating log entries for when a user clicks  "Submit Suggested Edits" or when an admin merges a suggested edit. However, you can see a record of all merged edits in the project's dash at dash.readme.io/project/`yourProject`/suggested