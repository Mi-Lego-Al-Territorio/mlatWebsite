#!/bin/bash

# get branch name passed as parameter
BRANCH_NAME=$1

if [ "$BRANCH_NAME" = "master" ];
then
    COMPLETE_DOMAIN=$BASE_DOMAIN
else 
    #change any non-url branch names
    SLUGIFIED_BRANCH_NAME=$(echo "$BRANCH_NAME" | iconv -t ascii//TRANSLIT | sed -r s/[^a-zA-Z0-9]+/-/g | sed -r s/^-+\|-+$//g | tr A-Z a-z)
    COMPLETE_DOMAIN=$SLUGIFIED_BRANCH_NAME--$BASE_DOMAIN
 fi

DEPLOY_URL=https://$COMPLETE_DOMAIN

curl -X POST --data-urlencode "payload={\"channel\": \"#site-ci\", \"username\": \"webhookbot\", \"text\": \"Next deploy at $DEPLOY_URL\", \"icon_emoji\": \":nerd_face:\"}" $SLACK_WEB_HOOK
