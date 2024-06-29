#!/bin/bash

kubectl scale deployment mysql-deploy -n development --replicas=1 --kubeconfig ./config
kubectl scale deployment book-mgmt-api-deploy -n development --replicas=1 --kubeconfig ./config
