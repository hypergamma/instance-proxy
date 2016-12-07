#!/bin/sh

function usage() {
	echo "./build_image.sh dockerfile_root"
}

if [[ $# -ne 1 ]];
then
    usage
    exit -1
fi

IMAGE_NAME=gamma-proxy
DOCKERFILE_ROOT=$1

if [[ $PRODUCTION_GAMMA = "production" ]];
then
    REGISTRY="52.187.69.164:5000"
    code_full_path=/mnt/function/$code_path
else
    REGISTRY="0.0.0.0:5000"
    code_full_path=/Users/miri/nginxroot/$code_path
fi

docker build -t $REGISTRY/$IMAGE_NAME .

if [[ $? -ne 0 ]];
then
    echo 'fail build docker image'
    exit -2
fi

docker push $REGISTRY/$IMAGE_NAME

