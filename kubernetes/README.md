# Intro

Containers are the new big thing in managing application placement on physical machines. Kubernetes provides:
- Service discovery & load balancing
- Orchestrated Storage
- Automated rollouts & rollbacks
- Bin packing
- Self-healing
- Configuration management

## Basic K8s components
Many things go into Kubernetes to keep it running (in depth explanation here) but we’re only concerned with what we need to know to deploy a hello world app in Kubernetes.

Kuberentes breaks down the software running on it into objects.
### Pod

The basic component which houses one container (or more, but usually one). A pod configuration in Kubernetes represent a single working application, along with its environment variables, open ports, etc..
### Deployment

The deployment object refers usually to a group of pods, defining how many pods to run for a specific image, which node to place pods. Pods’ specifications are usually also defined within deployments.
### Service

Connecting to pods within and outside the cluster requires the service object. This defines variables like a pods IP address, internal & external DNS resolution, TLS and other networking needs.

When used with a deployment, the service configurations apply to all pods defined under that deployment. A request targeting a service on the cluster can be routed to pods according to the cluster’s ingress-controller.

# The Tutorial

This part will guide you through:
- Setting up a local Kubernetes playground, or optionally:
- Where to find free credits to cloud hosted kubernetes
- How to setup and connect to kubernetes on Google Cloud Platform
- Creating and publish a Docker image that runs a “helloworld” server
- Creating and deploying that application on the Kubernetes cluster you’ve created 
Note: There will be a lot more work to do this on Windows, so either run a VM running Ubuntu or something, or use a Mac


## Installing kubectl
https://kubernetes.io/docs/tasks/tools/install-kubectl/

Kubectl is a command-line interface (CLI) to communicate with the kubernetes API.

## Installing Minikube
https://kubernetes.io/docs/tasks/tools/install-minikube/

Minikube is a convenient application that does all the required setup to start a single-node Kubernetes cluster, all in one simple `minikube start` command

## Minikube tutorial
https://kubernetes.io/docs/tutorials/hello-minikube/

## GCloud tutorial
https://cloud.google.com/kubernetes-engine/docs/tutorials/hello-app
