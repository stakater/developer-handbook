# Storage

## Introduction

Kubernetes can consume storage solutions deployed either as:

### 1 - Internal Storage

a part of a cluster (internal storage) or 

Deploying a workload storage solution as a part of a cluster (internal storage) will limit access to the storage to workloads running inside the cluster. This will be more secure than deploying an external instance of the storage provider, but also limits who can consume the storage unless steps are taken to expose the storage outside the cluster.

### 2- External Storage

storage provided by an external service (external storage).

The use case will determine which you choose to deploy.

If your objective is to have a large storage solution which can be consumed by multiple kubernetes clusters or non-kubernetes workloads, then your solution should include an instance of the storage provider which is external to the k8s cluster and then integrate your k8s instance with that storage provider via storage classes.

If your objective is to have a secure storage solution which is only supporting a single k8s cluster, then you will want to deploy a storage provider inside the cluster and point your storage classes to the internal instance.

Another alternative is to have a single k8s cluster which implements an internal storage provider but exposes the API service outside the cluster. This could then be used as a storage provider for other k8s clusters.

## Storage Types

### 1 - Physical Storage

The physical storage which is used to back cloud storage technologies is important, especially in a kubernetes environment. kuberetes master nodes utilize an etcd database and in an HA environment, at least three different instances of etcd. etcd is a high IOPS (Input/Output Operations Per Second) application which writes a large volume of data to the disk. The performance of this database is critical to the performance of the cluster and the larger the cluster, the more data gets written

For this reason, it is critical that the storage backing the filesystems where the etcd database is written be the fastest storage technology available.

It should be noted that one need not necessarily implement NVMe drives to get the best performance. Spreading the IOPS across hundreds of spindles on mechanical drives (such as is done with IBM Elastic Storage Servers) can also be very fast.

Additionally, running NVMe drives with a slow virtual storage technology can render them no faster than a mechanical disk. For more information see Appendix A.

See the On-Premesis Storage Infrastructure below for more infrastruction on recommendations on how to properly configure physical storage infrastructure for maximum performance.

### 2 - Block Storage

Block storage technologies provide raw chunks of storage which usually must be formatted before they can be used.

One example of block storage would be a LUN/Volume created on a SAN storage device which can be mapped to a remote host and appears to that host as a physical disk.

Another example would be a Ceph RBD volume. Once created and mapped to a host, such a disk shows up on the filesystem like any other disk.

In both of these cases the block storage volume must be formatted with a filesystem before it can be used. This detail is hidden in the Ceph kubernetes storage provider because the Ceph storage driver will put a filesystem on the block device prior to mounting to the container. It is still a block device, it has just been formatted prior to use.

### 3 - File Storage

File storage is a storage device which is provided pre-formatted with a file system prior to making it available to be mounted.

Probaly the best example of this type of storage is NFS (Network File System). NFS filesytems are exported by an NFS server and have already been formatted before they are exported. Clients that mount these filesystems do not have to format the device prior to use.

Another good example of file storage would be CephFS.

### 4 - Object Storage

Object storage is simply a database which has some kind of an API which can be used for storing chunks of data, either formatted or unformatted. Object storage need not be mounted to a filesystem to be used, data is normally storage via REST API calls or SQL commands.

In cloud native applications, it is very common to deploy a separate module/pod/container which contains a database which can then be exposed to the application for object storage. In this case, the container hosting the object database will likely need file or block storage to hold the database files, but the application itself will consume the objec storage provided by the database.

In other cases, applications could consume object storage which is hosted somewhere out on the internet or on some legacy physical infrastructure.

Examples of object storage technologies would be Redis, CouchDB/Cloudant, minio, mongoDB, mariaDB, etc.

Example of hosted object storage technologies woudl be cloudant.com, redis.com, or an existing DB2 database hosted on legacy infrastructure in the enterprise.
