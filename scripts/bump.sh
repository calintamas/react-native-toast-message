#!/usr/bin/env bash
#
# Bumps the package version, creates the release commit and tag, and pushes
# both to the remote. Pushing the tag triggers the publish workflow.
#
# Usage:
#   yarn bump patch
#   yarn bump minor
#   yarn bump major
#   yarn bump 2.5.0   # or an explicit version
set -euo pipefail

RELEASE_TYPE="${1:-}"

if [ -z "$RELEASE_TYPE" ]; then
  echo "Error: missing release type."
  echo "Usage: yarn bump <patch|minor|major|version>"
  exit 1
fi

# npm version requires a clean working tree; bump, commit and tag in one step.
NEW_VERSION=$(npm version "$RELEASE_TYPE" -m "build: release v%s")

echo "Bumped to $NEW_VERSION"

echo "Pushing commit and tag..."
git push --follow-tags

echo "Done. Pushing $NEW_VERSION triggers the publish workflow."
