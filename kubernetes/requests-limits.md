# Kubernetes Requests & Limits

## The Basics

### Excursion on compressible and non-compressible resources

CPU is considered a “compressible” resource while memory is “non-compressible”.
Compressible means that pods can work with less of the resource although they would like to use more of it. For example, if you deploy a pod with a request of 1 CPU and no limit, it can use more than that if available. But when other pods on the same node get busy, they will have to share the available CPUs and might get throttled back to their request. However, they won’t be evicted and can still do their job.

For memory on the other hand, when a pod has a resource request for memory but no limit, it also might use more RAM than requested. However, when resources get low, it can’t be throttled back to use only the requested amount of memory and free up the rest. There is a possiblity that Kubernetes will evict such pods. Therefor it is crucial to always set a memory resource limit and take care that your microservice will never exceed that limit.

### Requests is a guarantee, Limits is an obligation

There is a subtle change of semantics when we go from requests to limits. For the application developer, requests is a guarantee offered by Kubernetes that any pod scheduled will have at least the minumum amount of memory. limits is an obligation to stay under the maximum amount of memory, which will be enforced by the kernel.

In other words: containers can’t rely on being able to grow from their initial requests capacity to the maximum allowance set in limits.

## The Tradeoffs

## Determining the right values

## Solution

### Development Tier

### Production Tier

## References

- https://sysdig.com/blog/kubernetes-limits-requests/

CPU limit directly affects startup times.

