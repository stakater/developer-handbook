# Application Architecture for Kubernetes

## Introduction

Designing and running applications with scalability, portability, and robustness in mind can be challenging, especially as system complexity grows. The architecture of an application or system significantly impacts how it must be run, what it expects from its environment, and how closely coupled it is to related components. Following certain patterns during the design phase and adhering to certain operational practices can help counter some of the most common problems that applications face when running in highly distributed environments.

While software design patterns and development methodologies can produce applications with the right scaling characteristics, the infrastructure and environment influence the deployed system's operation. Technologies like Docker and Kubernetes help teams package software and then distribute, deploy, and scale on platforms of distributed computers. Learning how to best harness the power of these tools can help you manage applications with greater flexibility, control, and responsiveness.

In this guide, we will discuss some of the principles and patterns you may wish to adopt to help you scale and manage your workloads on Kubernetes. While Kubernetes can run many types of workloads, choices you make can affect the ease of operation and the possibilities available on deployment. How you architect and build your applications, package your services within containers, and configure life cycle management and behavior within Kubernetes can each influence your experience.

## Designing for Application Scalability

When producing software, many requirements affect the patterns and architecture you choose to employ. With Kubernetes, one of the most important factors is the ability to scale horizontally, adjusting the number of identical copies of your application to distribute load and increase availability. This is an alternative to vertical scaling, which attempts to manipulate the same factors by deploying on machines with greater or fewer resources.

In particular, microservices is a software design pattern that works well for scalable deployments on clusters. Developers create small applications that communicate over the network through well-defined REST APIs instead of larger compound programs that communicate through internal programming mechanisms. Decomposing monolithic applications into discrete single-purpose components makes it possible to scale each function independently. Much of the complexity and composition that would normally exist at the application level is transferred to the operational realm where it can be managed by platforms like Kubernetes.

Beyond specific software patterns, cloud native applications are designed with a few additional considerations in mind. Cloud native applications are programs that follow a microservices architecture pattern with built-in resiliency, observability, and administrative features to adapt to the environment provided by clustered platforms in the cloud.

For example, cloud native applications are constructed with health reporting metrics to enable the platform to manage life cycle events if an instance becomes unhealthy. They produce (and make available for export) robust telemetry data to alert operators to problems and allow them to make informed decisions. Applications are designed to handle regular restarts and failures, changes in backend availability, and high load without corrupting data or becoming unresponsive.

### Following 12 Factor Application Philosophy

One popular methodology that can help you focus on the characteristics that matter most when creating cloud-ready web apps is the Twelve-Factor App philosophy. Written to help developers and operations teams understand the core qualities shared by web services designed to run in the cloud, the principles apply very well to software that will live in a clustered environment like Kubernetes. While monolithic applications can benefit from following these recommendations, microservices architectures designed around these principles work particularly well.

A quick summary of the Twelve Factors are:

- **Codebase**: Manage all code in version control systems (like Git or Mercurial). The codebase comprehensively dictates what is deployed.
- **Dependencies**: Dependencies should be managed entirely and explicitly by the codebase, either vendored (stored with the code) or version pinned in a format that a package manager can install from.
- **Config**: Separate configuration parameters from the application and define them in the deployment environment instead of baking them into the application itself.
- **Backing services**: Local and remote services are both abstracted as network-accessible resources with connection details set in configuration.
- **Build, release, run**: The build stage of your application should be completely separate from your application release and operations processes. The build stage creates a deployment artifact from source code, the release stage combines the artifact and configuration, and the run stage executes the release.
- **Processes**: Applications are implemented as processes that should not rely on storing state locally. State should be offloaded to a backing service as described in the fourth factor.
- **Port binding**: Applications should natively bind to a port and listen for connections. Routing and request forwarding should be handled externally.
- **Concurrency**: Applications should rely on scaling through the process model. Running multiple copies of an application concurrently, potentially across multiple servers, allows scaling without adjusting application code.
- **Disposability**: Processes should be able to start quickly and stop gracefully without serious side effects.
- **Dev/prod parity**: Your testing, staging, and production environments should match closely and be kept in sync. Differences between environments are opportunities for incompatibilities and untested configurations to appear.
- **Logs**: Applications should stream logs to standard output so external services can decide how to best handle them.
- **Admin processes**: One-off administration processes should be run against specific releases and shipped with the main process code.

By adhering to the guidelines provided by the Twelve Factors, you can create and run applications using a model that fits the Kubernetes execution environment. The Twelve Factors encourage developers to focus on their application's primary responsibility, consider the operating conditions and interfaces between components, and use inputs, outputs, and standard process management features to run predictably in Kubernetes.

## Containerizing Application Components

Kubernetes uses containers to run isolated, packaged applications across its cluster nodes. To run on Kubernetes, your applications must be encapsulated in one or more container images and executed using a container runtime like Docker. While containerizing your components is a requirement for Kubernetes, it also helps reinforce many of the principles from the twelve factor app methodology discussed above, allowing easy scaling and management.

For instance, containers provide isolation between the application environment and the external host system, support a networked, service-oriented approach to inter-application communication, and typically take configuration through environmental variables and expose logs written to standard error and standard out. Containers themselves encourage process-based concurrency and help maintain dev/prod parity by being independently scalable and bundling the process's runtime environment. These characteristics make it possible to package your applications so that they run smoothly on Kubernetes.

### Guidelines on Optimizing Containers

The flexibility of container technology allows many different ways of encapsulating an application. However, some methods work better in a Kubernetes environment than others.

Most best practices on containerizing your applications have to do with image building, where you define how your software will be set up and run from within a container. In general, keeping image sizes small provides a number of benefits. Size-optimized images can reduce the time and resources required to start up a new container on a cluster by keeping footprint manageable and reusing existing layers between image updates.

A good first step when creating container images is to do your best to separate your build steps from the final image that will be run in production. Building software generally requires extra tooling, takes additional time, and produces artifacts that might be inconsistent from container to container or unnecessary to the final runtime environment depending on the environment. One way to cleanly separate the build process from the runtime environment is to use Docker multi-stage builds. Multi-stage build configurations allow you to specify one base image to use during your build process and define another to use at runtime. This makes it possible to build software using an image with all of the build tools installed and copy the resulting artifacts to a slim, streamlined image that will be used each time afterwards.

With this type of functionality available, it is usually a good idea to build production images on top of a minimal parent image. If you wish to completely avoid the bloat found in "distro"-style parent layers like `ubuntu:16.04` (which includes a rather complete `Ubuntu` 16.04 environment), you could build your images with scratch — Docker's most minimal base image — as the parent. However, the scratch base layer doesn't provide access to many core tools and will often break assumptions about the environment that some software holds. As an alternative, the Alpine Linux alpine image has gained popularity by being a solid, minimal base environment that provides a tiny, but fully featured Linux distribution.

For interpreted languages like Python or Ruby, the paradigm shifts slightly since there is no compilation stage and the interpreter must be available to run the code in production. However, since slim images are still ideal, many language-specific, optimized images built on top of Alpine Linux are available on Docker Hub. The benefits of using a smaller image for interpreted languages are similar to those for compiled languages: Kubernetes will be able to quickly pull all of the necessary container images onto new nodes to begin doing meaningful work.

## Deciding on Scope for Containers and Pods

While your applications must be containerized to run on a Kubernetes cluster, pods are the smallest unit of abstraction that Kubernetes can manage directly. A pod is a Kubernetes object composed of one or more closely coupled containers. Containers in a pod share a life cycle and are managed together as a single unit. For example, the containers are always scheduled on the same node, are started or stopped in unison, and share resources like filesystems and IP space.

At first, it can be difficult to discover the best way to divide your applications into containers and pods. This makes it important to understand how Kubernetes handles these components and what each layer of abstraction provides for your systems. A few considerations can help you identify some natural points of encapsulation for your application with each of these abstractions.

One way to determine an effective scope for your containers is to look for natural development boundaries. If your systems operate using a microservices architecture, well-designed containers are frequently built to represent discrete units of functionality that can often be used in a variety of contexts. This level of abstraction allows your team to release changes to container images and then deploy this new functionality to any environment where those images are used. Applications can be built by composing individual containers that each fulfill a given function but may not accomplish an entire process alone.

In contrast to the above, pods are usually constructed by thinking about which parts of your system might benefit most from independent management. Since Kubernetes uses pods as its smallest user-facing abstraction, these are the most primitive units that the Kubernetes tools and API can directly interact with and control. You can start, stop, and restart pods, or use higher level objects built upon pods to introduce replication and life cycle management features. Kubernetes doesn't allow you to manage the containers within a pod independently, so you should not group containers together that might benefit from separate administration.

Because many of Kubernetes' features and abstractions deal with pods directly, it makes sense to bundle items that should scale together in a single pod and to separate those that should scale independently. For example, separating your web servers from your application servers in different pods allows you to scale each layer independently as needed. However, bundling a web server and a database adaptor into the same pod can make sense if the adaptor provides essential functionality that the web server needs to work properly.

### Enhancing Pod Functionality by Bundling Supporting Containers

With this in mind, what types of containers should be bundled in a single pod? Generally, a primary container is responsible for fulfilling the core functions of the pod, but additional containers may be defined that modify or extend the primary container or help it connect to a unique deployment environment.

For instance, in a web server pod, an `Nginx` container might listen for requests and serve content while an associated container updates static files when a repository changes. It may be tempting to package both of these components within a single container, but there are significant benefits to implementing them as separate containers. Both the web server container and the repository puller can be used independently in different contexts. They can be maintained by different teams and can each be developed to generalize their behavior to work with different companion containers.

Brendan Burns and David Oppenheimer identified three primary patterns for bundling supporting containers in their paper on design patterns for container-based distributed systems. These represent some of the most common use cases for packaging containers together in a pod:

- **Sidecar**: In this pattern, the secondary container extends and enhances the primary container's core functionality. This pattern involves executing non-standard or utility functions in a separate container. For example, a container that forwards logs or watches for updated configuration values can augment the functionality of a pod without significantly changing its primary focus.
- **Ambassador**: The ambassador pattern uses a supplemental container to abstract remote resources for the main container. The primary container connects directly to the ambassador container which in turn connects to and abstracts pools of potentially complex external resources, like a distributed Redis cluster. The primary container does not have to know or care about the actual deployment environment to connect to external services.
- **Adaptor**: The adaptor pattern is used to translate the primary container's data, protocols, or interfaces to align with the standards expected by outside parties. Adaptor containers enable uniform access to centralized services even when the applications they serve may only natively support incompatible interfaces.

## Extracting Configuration into ConfigMaps and Secrets

While application configuration can be baked into container images, it's best to make your components configurable at runtime to support deployment in multiple contexts and allow more flexible administration. To manage runtime configuration parameters, Kubernetes offers two objects called ConfigMaps and Secrets.

ConfigMaps are a mechanism used to store data that can be exposed to pods and other objects at runtime. Data stored within ConfigMaps can be presented as environment variables or mounted as files in the pod. By designing your applications to read from these locations, you can inject the configuration at runtime using ConfigMaps and modify the behavior of your components without having to rebuild the container image.

Secrets are a similar Kubernetes object type used to securely store sensitive data and selectively allow pods and other components access as needed. Secrets are a convenient way of passing sensitive material to applications without storing them as plain text in easily accessible locations in your normal configuration. Functionally, they work in much the same way as ConfigMaps, so applications can consume data from ConfigMaps and Secrets using the same mechanisms.

ConfigMaps and Secrets help you avoid putting configuration directly in Kubernetes object definitions. You can map the configuration key instead of the value, allowing you to update configuration on the fly by modifying the ConfigMap or Secret. This gives you the opportunity to alter the active runtime behavior of pods and other Kubernetes objects without modifying the Kubernetes definitions of the resources.

## Implementing Readiness and Liveness Probes

Kubernetes includes a great deal of out-of-the-box functionality for managing component life cycles and ensuring that your applications are always healthy and available. However, to take advantage of these features, Kubernetes has to understand how it should monitor and interpret your application's health. To do so, Kubernetes allows you to define liveness and readiness probes.

Liveness probes allow Kubernetes to determine whether an application within a container is alive and actively running. Kubernetes can periodically run commands within the container to check basic application behavior or can send HTTP or TCP network requests to a designated location to determine if the process is available and able to respond as expected. If a liveness probe fails, Kubernetes restarts the container to attempt to reestablish functionality within the pod.

Readiness probes are a similar tool used to determine whether a pod is ready to serve traffic. Applications within a container may need to perform initialization procedures before they are ready to accept client requests or they may need to reload upon being notified of a new configuration. When a readiness probe fails, instead of restarting the container, Kubernetes stops sending requests to the pod temporarily. This allows the pod to complete its initialization or maintenance routines without impacting the health of the group as a whole.

By combining liveness and readiness probes, you can instruct Kubernetes to automatically restart pods or remove them from backend groups. Configuring your infrastructure to take advantage of these capabilities allows Kubernetes to manage the availability and health of your applications without additional operations work.

## Using Deployments to Manage Scale and Availability

Earlier, when discussing some pod design fundamentals, we also mentioned that other Kubernetes objects build on these primitives to provide more advanced functionality. A deployment, one such compound object, is probably the most commonly defined and manipulated Kubernetes object.

Deployments are compound objects that build on other Kubernetes primitives to add additional capabilities. They add life cycle management capabilities to intermediary objects called `replicasets`, like the ability to perform rolling updates, rollback to earlier versions, and transition between states. These `replicasets` allow you to define pod templates to spin up and manage multiple copies of a single pod design. This helps you easily scale out your infrastructure, manage availability requirements, and automatically restart pods in the event of failure.

These additional features provide an administrative framework and self-healing capabilities to the relatively simple pod abstraction. While pods are the units that ultimately run the workloads you define, they are not the units that you should usually be provisioning and managing. Instead, think of pods as a building block that can run applications robustly when provisioned through higher-level objects like deployments.

## Creating Services and Ingress Rules to Manage Access to Application Layers

Deployments allow you to provision and manage sets of interchangeable pods to scale out your applications and meet user demands. However, routing traffic to the provisioned pods is a separate concern. As pods are swapped out as part of rolling updates, restarted, or moved due to host failures, the network addresses previously associated with the running group will change. Kubernetes services allow you to manage this complexity by maintaining routing information for dynamic pools of pods and controlling access to various layers of your infrastructure.

In Kubernetes, services are specific mechanisms that control how traffic gets routed to sets of pods. Whether forwarding traffic from external clients or managing connections between several internal components, services allow you to control how traffic should flow. Kubernetes will then update and maintain all of the information needed to forward connections to the relevant pods, even as the environment shifts and the networking landscape changes.

### Accessing Services Internally

To effectively use services, you first must determine the intended consumers for each group of pods. If your service will only be used by other applications deployed within your Kubernetes cluster, the clusterIP service type allows you to connect to a set of pods using a stable IP address that is only possible to route from within the cluster. Any object deployed on the cluster can communicate with the group of replicated pods by sending traffic directly to the service's IP address. This is the simplest service type, which works well for internal application layers.

An optional DNS addon enables Kubernetes to provide DNS names for services. This allows pods and other objects to communicate with services by name instead of by IP address. This mechanism does not change service usage significantly, but name-based identifiers can make it simpler to hook up components or define interactions without knowing the service IP address ahead of time.

### Exposing Services for Public Consumption

If the interface should be publicly accessible, your best option is usually the load balancer service type. This uses your specific cloud provider's API to provision a load balancer, which serves traffic to the service pods through a publicly exposed IP address. This allows you to route external requests to the pods in your service, offering a controlled network channel to your internal cluster network.

Since the load balancer service type creates a load balancer for every service, it can potentially become expensive to expose Kubernetes services publicly using this method. To help alleviate this, Kubernetes ingress objects can be used to describe how to route different types of requests to different services based on a predetermined set of rules. For instance, requests for "example.com" might go to service A, while requests for "sammytheshark.com" might be routed to service B. Ingress objects provide a way of describing how to logically route a mixed stream of requests to their target services based on predefined patterns.

Ingress rules must be interpreted by an ingress controller — typically some sort of load balance, like `Nginx` — deployed within the cluster as a pod, which implements the ingress rules and forwards traffic to Kubernetes services accordingly. Currently, the ingress object type is in beta, but there are several working implementations that can be used to minimize the number of external load balancers that cluster owners are required to run.

## Using Declarative Syntax to Manage Kubernetes State

Kubernetes offers quite a lot of flexibility in defining and controlling the resources deployed to your cluster. Using tools like kubectl, you can imperatively define ad-hoc objects to immediately deploy to your cluster. While this can be useful for quickly deploying resources when learning Kubernetes, there are drawbacks to this approach that make it undesirable for long-term production administration.

One of the major problems with imperative management is that it does not leave any record of the changes you've deployed to your cluster. This makes it difficult or impossible to recover in the event of failures or to track operational changes as they're applied to your systems.

Fortunately, Kubernetes provides an alternative declarative syntax that allows you to fully define resources within text files and then use kubectl to apply the configuration or change. Storing these configuration files in a version control repository is a simple way to monitor changes and integrate with the review processes used for other parts of your organization. File-based management also makes it simple to adapt existing patterns to new resources by copying and editing existing definitions. Storing your Kubernetes object definitions in versioned directories allows you to maintain a snapshot of your desired cluster state at each point in time. This can be invaluable during recovery operations, migrations, or when tracking down the root cause of unintended changes introduced to your system.

## Conclusion

Managing the infrastructure that will run your applications and learning how to best leverage the features offered by modern orchestrations environments can be daunting. However, many of the benefits offered by systems like Kubernetes and technologies like containers become more clear when your development and operations practices align with the concepts the tooling is built around. System architecture using the patterns Kubernetes excels at and understanding how certain features can alleviate some of the challenges associated with highly complex deployments can help improve your experience running on the platform.

## References

- [`Architecting Applications for Kubernetes`](https://www.digitalocean.com/community/tutorials/architecting-applications-for-kubernetes)
