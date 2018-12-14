# Events Driven Architecture

## Principles

### Principle #1: Design Events for the Right Level of Granularity

When designing your events, think about the burden you are placing on subscribers. If you design very fine-grained events — such as an event for every changed field within an API request — subscribers will be required to aggregate and process multiple events to get their desired results.

One recommendation is to start with a single event per action (e.g. created, updated, deleted, submitted, approved), per business event (e.g. savings account opened), or per external system event (e.g. alert received). This will allow your subscriber to easily determine what events are of interest and what events should be ignored.

### Principle #2: Group Related Event Data

During the initial design of an event, it may seem appropriate to flatten out the schema for your event payload, e.g.:
    
    firstName
    lastName
    email
    billingAddressLine1
    billingAddressLine2
    billingCity
    …

Over time, events may require additional details to be included, resulting in a very large structure that may confuse or overwhelm subscribers. In our example above, what if we need to add a mailing address alongside the billing address?

Instead of adding new fields with a mailingAddress prefix (e.g. mailingAddressLine1, mailingAddressLIne2,…), consider grouping related data together at the initial design phase to offer more evolvability. For example:
    
    contactDetails:
          firstName
          lastName
          email
    billingAddress:
          addressLine1
          addressLine2
          city
          …
    mailingAddress:
          addressLine1
          addressLine2
          city
          …

We can now add shippingAddress as a new grouping within our event payload, while allowing subscribers to easily process the address(es) they are interested in. As a bonus, the subscriber can optimize their code by defining an address data structure or object that can be used to process billing and mailing addresses, along with any additional addresses necessary in the future.

### Principle #3: Don’t Break Your Event Subscribers

Like APIs, events are contracts between an event producer and its subscribers. The needs of your subscribers will likely change over time, requiring modifications to your event payload schema. Apply the following rules to help ensure you don’t break your event subscribers:

1. It is acceptable to add new fields to a payload without breaking subscribers. Use the Principle #2 (above) to group related data.
2. Do not rename existing field names. Instead, add the new field alongside the previous one to correct any naming errors to provide better clarity to subscribers.
3. Do not delete fields, as your subscribers may be dependent on their existence.

If you cannot apply the rules above, then you likely need to define a new event on a new topic to address the need. Over time, you can attempt to guide subscribers to move to the new topic and remove the deprecated one. This, however, can be a big challenge so be prepared to support both for some time.

### Principle #4: Manage Your Event Dependencies

It is important to understand the kind of dependencies you are creating between event producers and subscribers. Evolvable event streams require producers to be unaware of their subscribers.

Events should emit information that any subscriber may need in a format that is understandable without intimate knowledge of the producing system. When events emit information for a specific, known subscriber, it results in tight coupling that produces fragile software.

This principle not only extends to the producer’s awareness of its downstream subscribers, but also to the event payload. Poor event payload design requires event producers to understand and translate internal data values, that may be in an internal format, into a more useful value that the subscriber can easily process.

For example, an event payload that has a field named customerStatus may internally store the values of N,A,I. While your team may know that these values stand for new, active, and inactive, not everyone will be aware of their meaning. Additionally, downstream subscribers shouldn’t be required to lookup those codes in some documentation. Instead, the customerStatus field should contain one of new, active, and inactive to clearly describe the status. While this requires a little extra development effort, subscribers are able to easily understand and process the event without extra heavy lifting or intimate knowledge of how your internal data is stored.

### Principle #5: Differentiate Between Private and Shared Event Streams

Not all events should be considered public and available to other teams. Some event streams, particularly those that support microservice communication and coordination, should remain private.

For example, background job progress events might be used within your system to keep other services updated on the internal progress of a background job. However, subscribers are only interested when a job has been completed or exited as a result of an error.

When designing event streams to support your APIs and microservices, share only the events necessary for downstream subscribers. This will allow your internal microservices to evolve independently from your subscribers. In some cases, it is often best to start with all private event streams, then migrate some of your private events to public events as you better understand stakeholder needs.

## References / Acknowledgements

- https://medium.com/capital-one-tech/5-principles-for-designing-evolvable-event-streams-f32e90dcbb79