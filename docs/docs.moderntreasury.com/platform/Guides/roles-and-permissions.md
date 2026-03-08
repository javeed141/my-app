# Roles and Permissions

Modern Treasury offers role-based access controls (RBAC), which enable you to define multiple roles and assign one or more to each user. Within each role, you can specify granular permissions granting view or edit access to various objects and workflows within the platform. Roles are also used for other workflows such as approvals and notifications.

# System Objects

Modern Treasury’s RBAC system relies on a hierarchy of objects to connect users to permissions.

## Permission

Permissions are the lowest level building block that authorize actions on specific resources.

## Permission Set

A collection of Permissions that can either be defined by the user or by Modern Treasury via our Standard Permission Sets, these are the building blocks of roles, they can contain up to 15 permissions. A Permission Set must contain at least 1 permission. All roles are made up of Permission Sets.

## Role

A collection of Permission Sets, must contain at least one Permission Set and can contain as many as 10. Roles can be created by the user or by Modern Treasury via our Standard Roles. Roles can contain a mix of both standard and custom Permission Sets. Roles are assigned to groups to connect permissions to users.

## Group

A collection of users that are synced either via SCIM from an IDP or invited directly from the MT application. Groups must have at least 1 role assigned. If SCIM is not enabled, organizations have a default `Administrators` group that cannot be edited and must have at least one member.