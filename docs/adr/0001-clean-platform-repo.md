# ADR 0001: Start A Clean Platform Repository

## Status

Accepted

## Context

The previous Mac repository and U disk repository both contain useful assets, but they also contain failed experiments, fake UI paths, unclear data boundaries, and unstable GIS+BIM attempts. Continuing to patch either repository makes the competition platform harder to reason about.

## Decision

Create a clean mainline repository for the stable competition platform. Treat the two previous repositories as asset pools, not as source-of-truth architecture.

## Consequences

- Platform architecture can be designed around the final user experience instead of around old file layout.
- Assets from previous repositories must pass review before migration.
- The first implementation target is a stable GIS+BIM-to-BIM-detail operational loop.
- Old outputs, raw data, large assets, and credentials stay out of this repository.
