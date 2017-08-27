#!/bin/sh

# start server
PORT=4200

for i in "$@"
do
case $i in
    -p=*|--port=*)
    PORT="${i#*=}"
    shift # past argument=value
    ;;
    *)
            # unknown option
    ;;
esac
done

CURDIR=`pwd`

echo "Deleting ${CURDIR}/dist, ${CURDIR}/tmp to force a rebuild."
rm -rf ${CURDIR}/dist ${CURDIR}/tmp

echo "Running: ember serve --port=${PORT}"
ember serve --port=${PORT} -dev
