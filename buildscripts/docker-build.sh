#!/bin/bash

cd $(dirname $0)/..

docker build -t safewallet2 .
docker run -ti -v $(pwd):/electronapp safewallet2 /bin/sh -c "npm run build"
