# Kubernetes Requests & Limits

## The Basics

### Requests

Pods will get the amount of memory/CPU they request. The requests specification is used at pod placement time: Kubernetes will look for a node that has both enough CPU and memory according to the requests configuration. If they exceed their memory request, they could be killed if another pod happens to need this memory. Pods are only ever killed when using less memory than requested if critical system or high priority workloads need the memory.

### Limits

Limits are enforced at runtime. If a container exceeds the limits, Kubernetes will try to stop it. For CPU, it will simply curb the usage so a container typically can't exceed its limit capacity ; it won't be killed, just won't be able to use more CPU. Pods will be CPU throttled when they exceed their CPU limit. If no limit is set, then the pods can use excess memory and CPU when available. If a container exceeds its memory limits, it would be terminated.

### Compressible Resources

CPU is considered a “compressible” resource while memory is “non-compressible”.

Compressible means we can squeeze more out of it. Pods can work with less of the resource although they would like to use more of it. For example, if you deploy a pod with a request of 1 CPU and no limit, it can use more than that if available. But when other pods on the same node get busy, they will have to share the available CPUs and might get throttled back to their request. However, they won’t be evicted and can still do their job.

For memory on the other hand, when a pod has a resource request for memory but no limit, it also might use more RAM than requested. However, when resources get low, it can’t be throttled back to use only the requested amount of memory and free up the rest. There is a possiblity that Kubernetes will evict such pods. Therefore it is crucial to always set a memory resource limit and take care that your microservice will never exceed that limit.

Similarly, even if you set limits CPU & memory on a pod, and pod reaches the limit CPU, the container will not get killed, rather it will be CPU throttled causing slowness. But if it reaches the memory limit, kubelet will kill the container stating OOMKilled(Out of memory killed)

### Requests is a guarantee, Limits is an obligation

There is a subtle change of semantics when we go from requests to limits. For the application developer, requests is a guarantee offered by Kubernetes that any pod scheduled will have at least the minumum amount of memory. limits is an obligation to stay under the maximum amount of memory, which will be enforced by the kernel.

In other words: containers can’t rely on being able to grow from their initial requests capacity to the maximum allowance set in limits.

## The Tradeoffs

## Solution

### Development Tier

### Production Tier

## References

- https://sysdig.com/blog/kubernetes-limits-requests/

CPU limit directly affects startup times.

- https://medium.com/better-programming/the-kubernetes-quality-of-service-conundrum-eebbbb5f89cf
- http://blog.kubecost.com/blog/requests-and-limits/
- https://gravitational.com/blog/kubernetes-resource-planning/