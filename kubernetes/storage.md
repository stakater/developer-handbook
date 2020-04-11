# Storage

## Introduction

Kubernetes can consume storage solutions deployed either as:

### Internal Storage

1) a part of a cluster (internal storage) or 

Deploying a workload storage solution as a part of a cluster (internal storage) will limit access to the storage to workloads running inside the cluster. This will be more secure than deploying an external instance of the storage provider, but also limits who can consume the storage unless steps are taken to expose the storage outside the cluster.

### External Storage

2) storage provided by an external service (external storage).

The use case will determine which you choose to deploy.

If your objective is to have a large storage solution which can be consumed by multiple kubernetes clusters or non-kubernetes workloads, then your solution should include an instance of the storage provider which is external to the k8s cluster and then integrate your k8s instance with that storage provider via storage classes.

If your objective is to have a secure storage solution which is only supporting a single k8s cluster, then you will want to deploy a storage provider inside the cluster and point your storage classes to the internal instance.

Another alternative is to have a single k8s cluster which implements an internal storage provider but exposes the API service outside the cluster. This could then be used as a storage provider for other k8s clusters.
