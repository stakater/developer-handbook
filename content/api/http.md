# HTTP

## Must: Use HTTP Methods Correctly

Be compliant with the standardized HTTP method semantics summarized as follows:

### GET

GET requests are used to read a single resource or query set of resources.

- GET requests for individual resources will usually generate a 404 if the resource does not exist
- GET requests for collection resources may return either 200 (if the listing is empty) or 404 (if the list is missing)
- GET requests must NOT have request body payload

Note: GET requests on collection resources should provide a sufficient filter mechanism as well as pagination.

### POST

POST requests are idiomatically used to create single resources on a collection resource endpoint, but other semantics on
single resources endpoint are equally possible. The semantic for collection endpoints is best described as »please add the
enclosed representation to the collection resource identified by the URL«. The semantic for single resource endpoints is
best described as »please execute the given well specified request on the collection resource identified by the URL«.

- POST request should only be applied to collection resources, and normally not on single resource, as this has an undefined
semantic
- on successful POST requests, the server will create one or multiple new resources and provide their URI/URLs in the
response
- successful POST requests will usually generate 200 (if resources have been updated), 201 (if resources have been created),
and 202 (if the request was accepted but has not been finished yet)

More generally: POST should be used for scenarios that cannot be covered by the other methods sufficiently. For instance,
GET with complex (e.g. SQL like structured) query that needs to be passed as request body payload because of the URL-length
constraint. In such cases, make sure to document the fact that POST is used as a workaround.

Note: Resource IDs with respect to POST requests are created and maintained by server and returned with response payload.
Posting the same resource twice is by itself not required to be idempotent and may result in multiple resource instances.
Anyhow, if external URIs are present that can be used to identify duplicate requests, it is best practice to implement POST
in an idempotent way.

### PUT

PUT requests are used to update single resources or an entire collection resources. The semantic is best described as
»please put the enclosed representation at the resource mentioned by the URL«.

- PUT requests are usually applied to single resources, and not to collection resources, as this would imply replacing the
entire collection
- PUT requests are usually robust against non-existence of resources by implicitly creating before updating
- on successful PUT requests, the server will replace the entire resource addressed by the URL with the representation
passed in the payload
- successful PUT requests will usually generate 200 or 204 (if the resource was updated - with or without actual content
returned), and 201 (if the resource was created)

Note: Resource IDs with respect to PUT requests are maintained by the client and passed as a URL path segment. Putting the
same resource twice is required to be idempotent and to result in the same single resource instance. If PUT is applied for
creating a resource, only URIs should be allowed as resource IDs. If URIs are not available POST should be preferred.

### PATCH

PATCH request are only used for partial update of single resources, i.e. where only a specific subset of resource fields
should be replaced. The semantic is best described as »please change the resource identified by the URL according to my
change request«. The semantic of the change request is not defined in the HTTP standard and must be described in the API
specification by using suitable media types.

- PATCH requests are usually applied to single resources, and not on collection resources, as this would imply patching on
the entire collection
- PATCH requests are usually not robust against non-existence of resource instances
- on successful PATCH requests, the server will update parts of the resource addressed by the URL as defined by the change
request in the payload
- successful PATCH requests will usually generate 200 or 204 (if resources have been updated with or without updated content
returned)

Note: since implementing PATCH correctly is a bit tricky, we strongly suggest to choose one and only one of the following patterns per endpoint, unless forced by a backwards compatible change. In preference order:

1. use PUT with complete objects to update a resource as long as feasible (i.e. do not use PATCH at all).
1. use PATCH with partial objects to only update parts of a resource, when ever possible. (This is basically [JSON Merge Patch](https://tools.ietf.org/html/rfc7396),
a specialized media type `application/merge-patch+json` that is a partial resource representation.)
1. use PATCH with [JSON Patch](http://tools.ietf.org/html/rfc6902), a specialized media type `application/json-patch+json` that
includes instructions on how to change the resource.
1. use POST (with a proper description of what is happening) instead of PATCH if the request does not modify the resource in
a way defined by the semantics of the media type.

In practice JSON Merge Patch quickly turns out to be too limited, especially when trying to update single objects in large
collections (as part of the resource). In this cases JSON Patch can shown its full power while still showing readable patch
requests ([see also](http://erosb.github.io/post/json-patch-vs-merge-patch)).

### DELETE

DELETE request are used to delete resources. The semantic is best described as »please delete the resource identified by the URL«.

- DELETE requests are usually applied to single resources, not on collection resources, as this would imply deleting the entire collection
- successful DELETE request will usually generate 200 (if the deleted resource is returned) or 204 (if no content is returned)
- failed DELETE request will usually generate 404 (if the resource cannot be found) or 410 (if the resource was already deleted before)

### HEAD

HEAD requests are used retrieve to header information of single resources and resource collections.

- HEAD has exactly the same semantics as GET, but returns headers only, no body.

### OPTIONS

OPTIONS are used to inspect the available operations (HTTP methods) of a given endpoint.

- OPTIONS requests usually either return a comma separated list of methods (provided by an Allow:-Header) or as a structured list of link templates

Note: OPTIONS is rarely implemented, though it could be used to self-describe the full functionality of a resource.

## Must: Fulfill Safeness and Idempotency Properties

An operation can be:

- idempotent, i.e. operation will produce the same results if executed once or multiple times (note: this does not necessarily mean returning the same status code)
- safe, i.e. must not have side effects such as state changes

Method implementations must fulfill the following basic properties:

```txt
| HTTP method  | safe | idempotent |
| ------------- | ------------- | ------------- |
| OPTIONS  | YES  | YES  |
| HEAD  | YES  | YES  |
| GET  | YES  | YES  |
| PUT  | NO  | YES  |
| POST  | NO  | NO  |
| DELETE  | NO  | YES  |
| PATCH  | NO  | NO  |
```
