#!/bin/bash 

# this script will run every night with github action
# it is for moving automatically the events from future to past
# it will redeploy the site only if there is an event on yesterday

# get yesterday timestamp
YESTERDAY=$(date -d "-1 days" +'%Y%m%d')

# get the files of the events
EVENT_FILES=content/eventi/*.md

OUTPUT=$(grep -oP 'date: \d{4}\-\d{2}\-\d{2}' $EVENT_FILES)

i=0;
for o in $OUTPUT
do
    isEven=$((i%2))
    # take only odd values because they correspond to string ones
    if [ $isEven -eq 1 ]
    then
        eventDate=$(echo $o | tr -d '-')
        if [ "$eventDate" -eq "$YESTERDAY" ]
        then
            echo yesterday event found, deploying...
            # curl -X POST -d {} $DEPLOY_WEB_HOOK
            echo finished deploying
        fi
    fi
    i=$((i+1))
done

exit 0
