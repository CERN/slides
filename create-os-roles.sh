#!/bin/bash
set -e

# Takes the project name as a parameter and allows the default account to create and modify the docker registry of the Openshift project

project=$(oc project -q);
echo "Project: ${project}";
oc policy add-role-to-user admin "system:serviceaccount:${project}:default"
oc policy add-role-to-user view "system:serviceaccount:${project}:default"
echo "Successfully added registry viewer and editor roles to account default in project ${project}"
