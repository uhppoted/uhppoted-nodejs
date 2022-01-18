## v0.7.2

- [x] Throw error on `getEvent` for overwritten event
- [x] Throw error on `getEvent` for non-existent event
- [x] Add missing event error to internationalisation
- [x] Add overwritten event error to internationalisation
- [x] Downgrade NodeJS version to 14.18.3

### TODO

1. Remote control
2. Device by name

## NOTES

1. `workflow_dispatch` is broken in _github_ workflows when the workflows are in multiple
    branches (https://github.community/t/workflow-dispatch-workflow-not-showing-in-actions-tab/130088/27)