# How to Model Workflows in REST APIs?

RESTful Web Services are awesome for performing basic CRUD operations on database tables, but they get even more exciting when you realize that they can also be used for modeling workflows and other advanced stuff.

There are three options:

1. Use an Attribute for the Workflow’s State
2. Use Hyperlinks for Workflow Transitions
3. Use a Subresource for Workflow Transitions

## So which one should I pick?

So we came to the unavoidable question: What approach is the best one?

As always, it depends on the context, but here are some quick guidelines:

| Approach | When |
| --- | --- |
| State Attribute | When there are no restrictions on the transitions. You can go from any state to any state at any time. The states are basically nothing more than a list of values. |
| Transition Links | There are limits to which states you can go to depending on the current state. |
| Transition Subresource | The workflow is configurable by users, so states and transitions among them are not fixed, but can be changed at runtime. |


## Reference

Read following for more details:

- https://www.kennethlange.com/how-to-model-workflows-in-rest-apis/