#!/bin/bash

cd $(dirname $0)/..

docker build -t safewallet .
docker run -ti -v $(pwd):/electronapp safewallet /bin/sh -c "npm run build"
