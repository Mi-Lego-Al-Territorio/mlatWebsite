#!/bin/bash 

# this script will run every night with github action
# it is for moving automatically the events from future to past
# it will redeploy the site only if there is an event on yesterday

# get yesterday timestamp
YESTERDAY=$(date -d "-1 days" +'%Y%m%d')

# get the files of the events
EVENT_FILES=content/eventi/*.md

# for each event check if one is of yesterday
for f in $EVENT_FILES
do
    f=$(basename -- "$f")
    f=${f%.md}
    if [ "$f" = "index" ]
    # if name equal index do nothing
    then
    :
    # if one event is of yesterday trigger redeploy
    elif [ "$f" -eq "$YESTERDAY" ]
    then
        echo yesterday event found, deploying...
        curl -X POST -d {} $DEPLOY_WEB_HOOK
        echo finished deploying
    fi
done

exit 0
