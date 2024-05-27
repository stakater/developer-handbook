# Storage

## Introduction

Kubernetes can consume storage solutions deployed either as:

### 1 - Internal Storage

a part of a cluster (internal storage) or 

Deploying a workload storage solution as a part of a cluster (internal storage) will limit access to the storage to workloads running inside the cluster. This will be more secure than deploying an external instance of the storage provider, but also limits who can consume the storage unless steps are taken to expose the storage outside the cluster.

### 2- External Storage

storage provided by an external service (external storage).

### Internal or External?

The use case will determine which you choose to deploy.

If your objective is to have a large storage solution which can be consumed by multiple Kubernetes clusters or non-Kubernetes workloads, then your solution should include an instance of the storage provider which is external to the k8s cluster and then integrate your k8s instance with that storage provider via storage classes.

If your objective is to have a secure storage solution which is only supporting a single k8s cluster, then you will want to deploy a storage provider inside the cluster and point your storage classes to the internal instance.

Another alternative is to have a single k8s cluster which implements an internal storage provider but exposes the API service outside the cluster. This could then be used as a storage provider for other k8s clusters.

## Storage Types

### 1 - Physical Storage

The physical storage which is used to back cloud storage technologies is important, especially in a Kubernetes environment. kuberetes primary branch nodes utilize an etcd database and in an HA environment, at least three different instances of etcd. etcd is a high IOPS (Input/Output Operations Per Second) application which writes a large volume of data to the disk. The performance of this database is critical to the performance of the cluster and the larger the cluster, the more data gets written

For this reason, it is critical that the storage backing the filesystems where the etcd database is written be the fastest storage technology available.

It should be noted that one need not necessarily implement NVMe drives to get the best performance. Spreading the IOPS across hundreds of spindles on mechanical drives (such as is done with IBM Elastic Storage Servers) can also be very fast.

Additionally, running NVMe drives with a slow virtual storage technology can render them no faster than a mechanical disk.

See the On-Premesis Storage Infrastructure below for more infrastruction on recommendations on how to properly configure physical storage infrastructure for maximum performance.

### 2 - Block Storage

Block storage technologies provide raw chunks of storage which usually must be formatted before they can be used.

One example of block storage would be a LUN/Volume created on a SAN storage device which can be mapped to a remote host and appears to that host as a physical disk.

Another example would be a Ceph RBD volume. Once created and mapped to a host, such a disk shows up on the filesystem like any other disk.

In both of these cases the block storage volume must be formatted with a filesystem before it can be used. This detail is hidden in the Ceph Kubernetes storage provider because the Ceph storage driver will put a filesystem on the block device prior to mounting to the container. It is still a block device, it has just been formatted prior to use.

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

## On-Premises Storage Infrastructure

### SAN (Storage Area Network) vs Converged Networking

There has been a significant amount of discussion around the topic of converged or hyper-converted networks. A converged network is one where data and storage network traffic are combined onto a single infrastructure. The topic is much more broad than this simple statement, but this is the aspect that is of most concern to the cloud storage topic.

Experience shows that a converged or hyper-conconverged infrastructure may or may not provide better performance based on a number of factors. We will not attempt to make a recommendation on whether a company should use SAN or a converged or hyper-converged infrastructure, but one thing that will be clear from doing benchmarking is that what is advertised to be better, faster technology may not be if it is not implemented in the right way.

Prior to choosing a storage technology it is highly recommended that proper performance testing be performed to ensure that the architecture to be implemented provides the performance that is desired and expected.

Experience shows that storage provider technologies which provide block storage over the data network (such as Ceph or Gluster) consume a significant number of CPU cycles serving up disk I/O over a network which is designed for traditional data.

SAN storage technologies are designed for disk I/O traffic and the performance of an 8GB SAN will greatly out-perform a 10GB data network in a converged environment.

### Storage Network Congestion in a Kubernetes Environment

Storage traffic patterns in a Kubernetes environment is significantly different than in a traditional physical or even virtual environment.

Historically, physical infrastructures were easy enough to understand because each physical machine was an endpoint and occupied one port on a SAN switch. Communication paths over the SAN are well known and constant.

The advent of virtual networks changed things a bit in that in a virtual environment you could now have many more volumes mapped to a single physical host. In an HPC (High Performance Computing) environment, a single physical node could have dozens or more virtual machines, each of which could have a volume served up over the SAN.

Ultimately, however, virtual machines do not move around very much and when they do, they move to other physical machines utilizing the same mount points which were setup ahead of time and do not change.

In the world of Kubernetes, however, workloads are moved around in the infrastructure and scale out and back with regularity. As workloads move to different worker nodes these volumes are moved around to various machines. This leads to a situation where storage traffic can become significantly unbalanced on the SAN and a single compute node could potentially have hundreds of endpoints depending on the number of containers running on the node.

SAN networks can become congested not only because of high traffic, but also because of a high number of endpoints behind a single SAN switch port. In an HPC environment where a single physical node could host dozens of virtual machines and each virtual machine could be hosting hundreds or even thousands of endpoints in a dynamically provisoined environment, network congestion can become a significant problem.

When the SAN network becomes congested, it can backup across the SAN infrastructure negatively impacting completely unrelated workloads.

In relatively small Kubernetes environments, this type of congestion is normally not a problem, however, large clusters with hundreds or thousands of worker nodes or an environment which is hosting dozens or hundreds of smaller clusters, significant network congestion can be a significant problem, especially when workload storage is being provided inside the cluster itself (vs externally hosted cloud storage).

## Kubernetes Storage Concepts

### Persistent Volumes and Persistent Volume Claims

In Kubernetes, the request for storage by an application is abstracted from the storage source. Other than some of the basic storage attributes discussed below the application does not typically know nor care where the storage comes from. Those details can be exposed to the application if needed for some reason, but typically, an application asks for the storage attributes it needs and the platform decides where it comes from.

The chunk of storage made available for the application to consume is called a Persistent Volume or PV.

When an application needs some persistent storage it creates a request called a Peristent Volume Claim or PVC. When presented with a PVC, the platform will find a PV that meets the need and then bind the PVC to the PV. Once a PV is bound, it is then unavailable to be bound to any other PVC unless it is a ReadWriteMany (discussed below) request which allows a single PV to be bound to many PVCs.

### Dynamic vs Static

A static PV is one which is created ahead of time by a system operator who would typically create a number of different PVs with different types of attributes to account for various types of PVCs that may want to consume them.

A dynamic PV, however, is one which is created on demand. With a dynamic storage provider, when an application creates a PVC request the storage provider will create a PV that meets all of the requirements of the PVC and the platform will bind it to the PVC on the fly. This precludes the need for manually creating a PV for any given storage request.

### Data Retention Modes

One of the requirements of a PV is its Data Retention Mode. This describes what happens to the data when the PVC which is bound to it is deleted - such as when an application is deleted from the cluster.

#### 1 - Retain

If the retention mode is set to retain the PV is not deleted and no data on the PV is deleted. This is typically used when an application is uninstalled to be replaced by a newer version and the data should be retained between installations. It could also be used to make sure that the data in the PV is backed up before being removed.

IMPORTANT: A PV with a retention mode set to retain is never removed by the system and must be manually removed when it is no longer needed. If this manual removal never happens and many applications are deployed this way, it could result in significant storage utilization growth over time. As a result, this retention mode should be used with caution.

#### 2 - Delete

A PV with a retention mode set to delete will cause the PV to be deleted when the PVC that is bound to it is deleted. This will result in the loss of any data which exists on the PV when it is deleted. This is typically only used with dynamically created PVs.

#### 3 - Recycle 

When a PV has a retention mode of recycle the platform will try to remove any data on the PV and put it back into the pool to be bound to another PVC at some future time.

WARNING: When a PV has a recycle retention mode the platform will execute an rm -rf / on the root of the PV. If the PV is an NFS volume and the path of the NFS mount is the root of the NFS server it will effectively wipe the NFS server. If the PV is a hostPath (a path on the local disk) and the path is set to /, the platform will wipe the entire local disk. Usage of this retention mode should be used with extreme caution and it is highly recommended that hostPath storage not be used with a Kubernetes cluster.

### Access Modes

Storage Access Modes define how a pod will use the PV. Note that the smallest unit of control in a Kubernetes environment is a pod. If a PV is mounted to a pod it is mounted to all containers in the pod.

#### 1 - ReadOnlyMany (ROX) 

Analogous to a CD-ROM. PVs with this access mode can be mounted read-only by any number of pods, but none can write to it. It can be useful for providing access to certification keys or common software or document repositories, etc.

#### 2 - ReadWriteOnce (RWO) 

Only one pod can mount the PV at a time, but that pod can read from and write to it.

#### 3 - ReadWriteMany (RWX) 

Many pods can mount the PV and all can read and write to it. This access mode is not supported by many storage providers because of the requirement to keep all writers in sync to prevent race conditions. Any application that utilizes RWX access mode PVs is responsible for managing coordinated writes to prevent data corruption or loss.

### Storage Classes

All Kubernetes storage is made available via storage providers and there are quite a few storage providers available: hostPath, NFS, Ceph, Gluster, vSphere, just to name a very few. Different storage providers will support different attributes for the PVs it controls. Before choosing a storage provider the attributes that are supported should be considered.

The way a storage provider is utilized is through a storage class. A storage class defines all the parameters needed by the storage provider to create a PV. The specific attributes needed for the storage class depends on the storage provider.

It is common for a storage class name to include information about the storage provider and storage other attributes of the storage provider. For instance, a platform could have a storage class named "ceph-fast" indicating that if a PVC requests a PV created by this storage class it will be provided by the ceph storage provider backed by high IOPS storage. An operator may want to be even more descriptive and name the storage class "ceph-tier0" or "ceph-flash".

Operators are advised to be caution using too much detail and creating too many different types of storage classes due to the risk of the developer not knowing what they all mean and chosing the wrong type using expensive storage when they only needed the the less expensive type. T-Shirt sizes (fast, medium, slow) seems to be a good way to label storage classes.

## Resilience, Performance, and Scalability

### Replication vs Distribution

Data resilience in a legacy environment is normally dependant upon replication. This means using data syncing technologies to replicate data between databases or storage devices.

This kind of resiliency plan, however, can be extremely expensive requiring duplicates of all the physical infrastructure used to keep these replicas.

As a result, many companies are willing to settle for backup technologies to keep offline copies of critical data. These backup storage technologies are typically much less expensive than the online replication technologies, but an outage could result in data loss between the time of the outage an the last time a backup was made.

Cloud Native technologies, however, handle resilience in a different way. Object storage technologies such is IBM's CleverSafe break the data up into chunks and store slices across multiple physical devices or even datacenters. With many nodes running in many environments in different geographys, data is secure and resilient so long as a quorum of nodes is up and available.

So, if the CleverSafe infrastructure is made up of 12 nodes, as many as 5 could faile with no data loss. If nodes are running in separate geographies or at least separate physical locations, the likelihood of losing more than half of the total nodes is extremely low.

It is highly recommended that applications utilize modern cloud native storage technologies to maximize resilience at minimal cost.

It should be noted that, whereas this type of technology provides for extreme availability and resilience, it does not protect against data corruption. If garbage is written to the database the database contains garbage and absent some additional procedures and planning, there is no way to reverse it.

This means that there still is a good use case for making regular backups of data. The important thing here, though, is that in a Kubernetes environment, application data can be backed up at the workload storage location vs backing up the entire cluster and everything on it, significantly reducing the amount of space needed for a proper backup.

CAUTION: When providing internal storage technologies within a Kubernetes cluster (e.g. Ceph or GlusterFS), the more bricks/OSDs you provide the more resilient your infrastructure is likely to be. Make sure to Use anti-affinity rules to make sure each of the nodes hosting this storage is running on separte physical nodes and each of the bricks/OSDs are backed by separate physical infrastructure.

If all nodes or a majority of nodes are running on a single physical host and that host fails, your storage techonogy will also fail due to a lack of enough backing storage to complete a transaction. This could lead to data loss or corruption.

### IOPS Considerations

As noted above, Kubernetes primary branch nodes running etcd require significantly higher IOPS than most other nodes. High IOPS storage is typically also much more expensive than lower IOPS storage. Since only the etcd database needs to be stored on high IOPS storage, that expensive storage utilization can be minimized by mounting only the path on the disk where the etcd database is stored from high IOPS storage and leaving the rest of the primary branch nodes backed by lower and less expensive IOPS storage.

Some time sensitive workloads will also need high IOPS storage. It is recommended to provide multiple storage classes at various tiers so the developer can choose the storage that best supports the requirements of the workload.

### Kubernetes Workload Scalability's affects on Storage

When creating an application architecture, some developers may consider using a ReadWriteMany persistent Volume (see kubenetes Storage Concepts below for more information on persistent volumes) when they need multiple micro services to have access to the same persistent storage data.

Caution should be used, however, because if using appliation auto-scaling in Kubernetes, when an application scales out each container in each pod with a ReadWriteMany persistent volume will have that persistent volume mounted. This could lead to storage network congestion negatively impacting not only the entire Kubernetes cluster, but also everything else running on the SAN infrastructure (see Storage Network Congestion in a Kubernetes Environment above).

A better architecture utilizes a micro service with an API to serve up data from a single ReadWriteOnly persistent volume which is then consumed by all workloads that need access to that data.

## Storage Migration

The migration has to take into consideration of both the Kubernetes Storage Provider and Storage consumer (database or application).

### Storage Provider

In general, Kubernetes supports quite a few storage providers including hostPath, NFS, Ceph, Gluster, vSphere, minio, Cloud-based storage (S3 etc.). And these providers can be deployed either as a part of a Kubernetes cluster (internal storage) or storage provided by an external service (external storage). For the migration, we’ll focus on the internal storage or in-cluster storage provider.

If you are using external storage provider, you just need to migrate the storage consumer and leave the external storage provider as-is.

If you are using internal storage provider, you need to setup the Openshift Storage nodes, either GlusterFS or Ceph, using the same/similar spec as in other cluster in terms of disk size, storage type, number of nodes. Then, proceed to storage consumer migration.

### Storage Consumer

Each client might have different storage consumption pattern, we’ll try to categorize them into the following:

- Container applications requires persistent Storage
- Kubernetes Statefulset application
- Databases running on Kubernetes such as MongoDB, MySQL, Cloudant etc.

We’ll assume that all these storage needs are implemented as Kubernetes recommended Persistent Volume (PV) and Persistent Volume Claims (PVC).

When it comes to migration, it really becomes a storage backup and restore discussion. Depends on the storage consumer type (database vs. custom application), it can be done with:

- Kubernetes PV backup and restore
- Using Application/Database native backup-restore tools
