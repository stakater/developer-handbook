# 12 Factor Apps

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
