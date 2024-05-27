# Workflow Engine

A workflow engine is, basically, a software application designed to manage business processes. It differs from your everyday workflow application mostly because it uses a database server. This type of software manages and monitors the state of the activities in your everyday workflows while also determining which new activity you should transition to according to your pre-defined processes.

The state-and-task-based model tends to map to my mental model though.

Let me describe the highlights of a state-based workflow. In short, imagine a workflow revolving around the processing of something like a mortgage loan or a passport renewal. As the document moves 'around the office', it travels from state to state. Imagine if you are responsible for the document, and your boss asked you every few hours for a status update, and wanted a brief answer... you'd say things like "It is in data entry"... "We are checking the applicant's credentials now"... "we are awaiting quality review"... "We are done"... and so on. These are the states in a state-based workflow. We move from state to state via transitions - like "approve", "apply", kickback", "deny", and so on. these tend to be action verbs. Things like this are modeled all the time in software as a state machine.

The next part of a state/task-based workflow is the creation of tasks. A Task is a unit of work, typically with a due date and handling instructions, that connects a work item (the loan application or passport renewal, for instance), to a users "in box". Tasks can happen in parallel with each other or sequentially, and we can create tasks automatically when we enter states, create tasks manually as people realize work needs to get done, and require tasks be complete before we can move onto a new state. All of this kind of behavior is optional, and part of the workflow definition.

BPMN is mostly intended for long-running business tasks involving user interaction.

- variant 1) state machine attached to a resource (voucher, article, order, invoice).
- variant 2) state machine attached to a virtual resource named a task
- variant 3) workflow engine interpreting workflow definitions

Task Management, Workflow Engine, etc.

Lightweight state machines or workflow engines are not evil! They help you solve some coding problems well.

Use BPMN models to speak with your business stakeholders, make exactly these models executable and get the granularity right. Therefor also move aspects in code, which don’t belong in the graphical model. Speak with each other, and respect each other’s roles.

## Do I really need a BPM / Workflow Engine?

Now the reason you use such a tool, instead of creating your own finite state machine, is accommodating changes without altering persistence and supporting edge cases of workflow processes as I'll explain.

### Accommodating Changes Without Altering Persistence

Your typical, or perhaps better to call it "naive", finite state machine implementation features a set of database tables tightly coupled to the data managed and the process it flows through. There might be a way to keep past versions and track who took what action during the process as well. Where this runs into problems changes to data and process structure. Then those tightly coupled tables need to be altered to reflect the new structure and may not be backwardly compatible with the old.

A workflow engine overcomes this challenge in two ways, by using serialization to represent the data and process, and abstracting integration points, in particular security. The serialization aspect means data and process can move together through the system. This allows data instances of the same type to follow completely different processes to the point the process can altered at runtime, by adding a new state for instance. And none of this requires changing the underlying storage.

Integration points are means of injecting algorithms into the process and ties to authentication stores (i.e. users who must take action). Injected algorithms might include determinations of whether or not a state is completed, whereas authentication stores example is LDAP.

Now the tradeoff is difficult search. For instance, because data is serialized, it's usually not possible to query historical information - other than retrieve the records, deserialize and analyze using code.

### Edge Cases

The other aspect of a workflow tool is the experience embedded into its design and functionality that you will likely not consider rolling your own and may live to regret when you do need it. The two cases the come to my mind are timed tasks and parallel execution paths.

**Timed tasks** are assigning an actor responsibility for data after a certain duration has passed. For instance, say a press release is writ and submitted for approval, and then sits for a week without review. What you probably want your system to do is identify that lingering document and draw attention of the appropriate parties.

**Parallel execution paths** are uncommon in my experience (Content Management Systems), but are still a situation that arises often enough. It's the idea that a given piece of data is sent down two different paths of review or processing, only to be recombined at some later point. This type of problem requires having useful merging algorithms and the ability to represent the data multiply simultaneously. Weaving that into a homespun solution after the fact is much trickier than it may seem, especially if you want to keep track of historical data.

### Conclusion

If your system is not likely to change, rolling your own may be an easier solution, particularly if changes can break old information. But if you suspect you have a need for that type of durability or will experience some of these uncommon but thorny scenarios, a workflow tool provides a lot more flexibility and insurance that you won't paint yourself into a corner as the data and business processes change.

[Source](https://stackoverflow.com/a/4953433)

## When and why to use a workflow engine?

Requirements which are typically catered for by workflow engines, such as following some process, task allocation, escalations and notifications.

Do I Need a Workflow Engine?

Workflow engine suits your business if you:

- have large document circulation and are not able to quickly monitor heavy document flow;
- lose your documents in a daily workflow;
- want to free up the time spent on staff coordination and management and dedicate it to business development;
- want to increase management transparency and efficiency.

## How to implement a workflow engine?

As you can see, many advantages come from using a workflow engine. It is important to remember that a process can only enter the engine and be executed in this efficient way if it has been an improvement. BPM – Business Process Management – is all about that. Before the automation, these are the steps to take:

- Identify the processes: what are the processes to improve?
- Map the processes: understand the steps, participants, information and purpose.
- Model the processes: get rid of bottlenecks, wastage, duplicated actions and design the new and improved processes. See also this tool for process modeling and create your free account: HEFLO BPMN Modeling Tool.
- Execute the processes: carry out the processes in a new way, getting everybody aboard.
- Optimize the processes: check for what worked and did not work, for new improvement points and improve again.
- Automate the processes: now it is the time to make things automatic and use the best workflow engine available!

## Workflow engine benefits

- Workflow engines facilitate the flow of information, tasks, and events.
- Everybody has access to the information that needs to complete the action.
- It is easy to understand the whole process.
- The engine sets a time in which each task has to be completed, making the process faster.
- It is easy to identify where are the bottlenecks since we can clearly see in which task the process is.
- The workflow engine memorizes client’s data and history of the participants.
- It smartly allocates tasks, saving time in decision-making processes.

## Anti-pattern “No engine”

A quick word on another anti-pattern I referenced in the 7 sins of workflow: No engine. Because of the fear of the BPM monolith I saw a lot of microservice teams avoiding any BPM, workflow or orchestration engine. This is not going to work especially in distributes systems — like microservice architectures or many DDD applications — you need to solve a lot of problems around retrying, waiting, timeouts, failure handling or compensation (e.g. Saga-Pattern). An appropriate engine will be a big help! In “The flow” is for BPM what microservices are for SOA I showed how to use lightweight engines in a couple of lines of code — so it is really easy. Don’t miss this opportunity!

## UI Applications

One needs several web applications to demonstrate and leverage the functionality provided by a workflow engine:

- IDM UI: an Identity Management application that provides single sign-on authentication functionality for all the UI applications, and, for users with the IDM administrative privilege, it also provides functionality to manage users, groups and privileges.
- Modeler UI: an application that allows users with modeler privileges to model processes, forms, decision tables and application definitions.
- Task UI: a runtime task application that provides functionality to start process instances, edit task forms, complete tasks and query on tasks and process instances.
- Admin UI: an administrative application that allows users with admin privilege to query the BPMN, DMN, form and content engines and provides several options to change process instances, tasks, jobs and so on.

## Core Components

Any workflow engine is actually compose of following components:

- Process Runtime: The process engine to ensure fast, efficient and reliable process execution. The DMN and CMMN engines have the same architecture and experience applied to them. Drive the engines through their rich java and REST APIs, and let them drive your services through their rich integration.
- Process Design: Provides a web based process designer. With it you can quickly create open standard BPMN process models. The web designer also supports the creation of decision table (DMN), case management (CMMN) and form models, which can be combined with your process model to create complete process apps.
- Task and Admin Applications: A lightweight and extensible end user UI to provide an instant way of starting processes or working with tasks and forms. Use these applications out of the box, or customize and extend their components. Alternatively, use the rich set of APIs to build your own custom application UI. Both business user and administration applications are provided.

## References

- [Use cases of the Workflow Engine](https://stackoverflow.com/questions/2353564/use-cases-of-the-workflow-engine)
- [“The flow” is for BPM what microservices are for SOA](https://blog.bernd-ruecker.com/the-flow-is-for-bpm-what-microservices-are-for-soa-5225c7908bae)
- [Avoiding the “BPM monolith” when using bounded contexts](https://blog.bernd-ruecker.com/avoiding-the-bpm-monolith-when-using-bounded-contexts-d86be6308d8)
- [The 7 sins of workflow](https://blog.bernd-ruecker.com/the-7-sins-of-workflow-b3641736bf5c)
