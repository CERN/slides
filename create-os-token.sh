#!/bin/bash
# Set the user and token variables with the values provided by GitLab on creation of the Deploy Token.
args=("$@")

if [ $# -ne 2 ] ; then
    echo "usage: ./create-os-token.sh USER PASSWORD";
    exit 1;
fi

user=${args[0]}
token=${args[1]}


# Generate the secret (make sure to `oc login` into your Openshift project first)
auth=$(echo -n "${user}:${token}" | base64 -w 0)
dockercfg=$(echo "{\"auths\": {\"gitlab-registry.cern.ch\": {\"auth\": \"${auth}\"}, \"gitlab.cern.ch\": {\"auth\": \"${auth}\"}}}")

# To create the actual token:
oc create secret generic gitlab-registry-auth --from-literal=.dockerconfigjson="${dockercfg}"  --type=kubernetes.io/dockerconfigjson

oc secrets link default gitlab-registry-auth --for=pull
echo "Successfully created and linked user secret"
