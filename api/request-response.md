# Request & Response Classes

Here is the naming convention for API request (command) and response (query) classes to follow:

e.g.

- Request/Command: ApiCreateVehicleRequest or ApiCreateVehicleCommand or CreateVehicleCommand
- Response: ApiVehicle or ApiVehicleResponse

Why separate classes; why not just ONE jumbo class:

- You want to modify the model object or the request object independent of each other.
- Separation of concerns. Your request class ApiCreateVehicleRequest may contain all kinds of interface/protocol 
related annotations and members (e.g. validation annotations that the JAX-RS implementation knows how to enforce). 
These interface-related annotations should not be in the model object.
- From an OO perspective ApiCreateVehicleRequest is not a Vehicle (not IS_A) nor does it contain a vehicle.

Now to the question asked... What should be the relationship between the requests and response classes?

Request classes should extend from request classes and not extend nor contain response classes, and vice versa. Usually 
you have a very basic BaseRequest class, extended by something like CreateRequest, UpdateRequest, etc... where 
properties common to all create requests are in CreateRequest which is then extended by more specific request classes 
such as CreateVehicleRequest...

Similarly, but parallel to it, the is the Response class hierarchy.

[Reference](https://stackoverflow.com/a/48450483)