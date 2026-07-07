#!/usr/bin/env bash
#
# Sets up the environment for running tests. Installs:
#   - dependencies
#   - react / react-native (peerDependencies)
set -euo pipefail

echo "Installing dependencies..."
yarn install --frozen-lockfile --prefer-offline

echo "Installing react and react-native..."
# TODO: bump versions
yarn add react@17.0.2
yarn add react-native@0.64.2

echo "Restoring yarn.lock and package.json..."
git checkout -- yarn.lock package.json

echo "Done."
