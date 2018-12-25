# Workflow Engine

A workflow engine is, basically, a software application designed to manage business processes. It differs from your everyday workflow application mostly because it uses a database server. This type of software manages and monitors the state of the activities in your everyday workflows while also determining which new activity you should transition to according to your pre-defined processes.

The state-and-task-based model tends to map to my mental model though.

Let me describe the highlights of a state-based workflow. In short, imagine a workflow revolving around the processing of something like a mortgage loan or a passport renewal. As the document moves 'around the office', it travels from state to state. Imagine if you are responsible for the document, and your boss asked you every few hours for a status update, and wanted a brief answer... you'd say things like "It is in data entry"... "We are checking the applicant's credentials now"... "we are awaiting quality review"... "We are done"... and so on. These are the states in a state-based workflow. We move from state to state via transitions - like "approve", "apply", kickback", "deny", and so on. these tend to be action verbs. Things like this are modeled all the time in software as a state machine.

The next part of a state/task-based workflow is the creation of tasks. A Task is a unit of work, typically with a due date and handling instructions, that connects a work item (the loan application or passport renewal, for instance), to a users "in box". Tasks can happen in parallel with each other or sequentialy, and we can create tasks automatically when we enter states, create tasks manually as people realize work needs to get done, and require tasks be complete before we can move onto a new state. All of this kind of behavior is optional, and part of the workflow definition.

BPMN is mostly intended for long-running business tasks involving user interaction.

variant 1) state machine attached to a resource (voucher, article, order, invoice).
variant 2) state machine attached to a virtual resource named a task
variant 3) workflow engine interpreting workflow definitions

Task Management, Workflow Engine, etc.

Lightweight state machines or workflow engines are not evil! They help you solve some coding problems well.

Use BPMN models to speak with your business stakeholders, make exactly these models executable and get the granularity right. Therefor also move aspects in code, which don’t belong in the graphical model. Speak with each other, and respect each other’s roles. 
 
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

- https://stackoverflow.com/questions/2353564/use-cases-of-the-workflow-engine
- [“The flow” is for BPM what microservices are for SOA](https://blog.bernd-ruecker.com/the-flow-is-for-bpm-what-microservices-are-for-soa-5225c7908bae)
- [Avoiding the “BPM monolith” when using bounded contexts](https://blog.bernd-ruecker.com/avoiding-the-bpm-monolith-when-using-bounded-contexts-d86be6308d8)
- [The 7 sins of workflow](https://blog.bernd-ruecker.com/the-7-sins-of-workflow-b3641736bf5c)
