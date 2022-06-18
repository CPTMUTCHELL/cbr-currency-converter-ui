#!/bin/bash
acc=cptmutchell

DOCKER_BUILDKIT=1 docker build -t ${acc}/"$1":"$2" -f "$3" .
docker push ${acc}/"$1":"$2"
docker rmi ${acc}/"$1":"$2"
