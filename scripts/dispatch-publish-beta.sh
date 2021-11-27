#!/usr/bin/env bash

# Run this script to trigger the "Publish a new beta version" workflow
# 
# To trigger the "Repository Dispatch Event", you need to authenticate to Github with a personal access token
# https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line#creating-a-token

## Before running, configure the following params:
# Github repo
REPO=calintamas/react-native-toast-message
# Github username of the user triggering the workflow
USERNAME=calintamas
# Branch from which the workflow will run
BRANCH=\"v2.1.0\"

PAYLOAD="{\"ref\": $BRANCH}"

curl https://api.github.com/repos/$REPO/dispatches \
  -XPOST \
  -u $USERNAME \
  -H "Content-Type: application/json" \
  -d "{\"event_type\": \"publish-beta\", \"client_payload\": $PAYLOAD}"
