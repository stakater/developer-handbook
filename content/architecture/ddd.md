# Domain Driven Design - DDD

Read following:

- [Definition of DDD](http://andriybuday.com/2010/01/ddd.html)
- [Authentication, Authorization and Bounded Contexts](http://richardwellum.com/2017/04/authentication-authorization-and-bounded-contexts/)
- [DDD - The Bounded Context Explained](http://blog.sapiensworks.com/post/2012/04/17/DDD-The-Bounded-Context-Explained.aspx)
- [What is DDD?](http://code.tutsplus.com/articles/domain-driven-design--net-25773)
- [Entities, Value Objects, Aggregates and Roots](http://lostechies.com/jimmybogard/2008/05/21/entities-value-objects-aggregates-and-roots/)
- [Aggregate & Aggregate Root](http://prnawa.wordpress.com/2012/02/18/aggregates-and-aggregate-roots-ddd/)
- [DDD - Clear Your Concepts Before You Start](http://www.codeproject.com/Articles/339725/Domain-Driven-Design-Clear-Your-Concepts-Before-Yo)
- [Services in DDD](http://gorodinski.com/blog/2012/04/14/services-in-domain-driven-design-ddd/)
- [DDD Architecture](http://dddsample.sourceforge.net/architecture.html)

## Subdomains & Bounded Contexts

Bounded Contexts and Subdomains exist at different levels.

A Subdomain is a portion of the problem space, it's a natural partitioning of the system, often reflecting the structure
of the organisation. So logistics and operations might be separated from invoicing & billing. Eric differentiates core,
supporting and generic subdomains according to their business relevance in the given scenario.

Bounded Contexts are portions of the solutions space. They're models. It would be a good thing to have them, reflect
the domains-subdomains partitioning ...but life isn't always that easy. And you might have bloated legacy domain
encompassing everything, or more context in the same subdomain (i.e. old legacy app the replacement app somebody is building).

To have a Bounded Context you need to have a model, and an explicit boundary around it. Exactly what's missing in many
data-driven application that use databases to share data.

Another - orthogonal - way to see it may be the following. Ubiquitous Language, the special condition where every term
has a single unambiguous definition, doesn't scale. The more you enlarge it, the more ambiguity creeps in. If you want
to achieve precise, unambiguous models, you need to make their boundaries explicit, and speak many little Ubiquitous
Languages, each one within a single Bounded Context, with a well defined purpose.

### Example # 1

Consider a company that has a few different departments:

- Software Development
- HR
- Accounting

Can you come up with a user model that can expressively represent all those areas of business? Think of what the User
entity could look like in each one. Perhaps it's split into three different entities:

- Developer
- Employee
- Payee

The effort to instantiate a user in each context is considerably different. Perhaps it's something like this:

```java
new Employee(ssn, name, joindate, dateofbirth, gender)
new Developer(Employee, workstation, credentials)
new Payee(Employee, role)
```

If you used a naive implementation and used a single user entity, it would end up being an anaemic data model full of
get and set methods, because you couldn't fully represent the user all over the place.

There are clear boundaries in the business, so it's useful to model them that way. A user logging in versus a user in a
payroll system versus a user playing a game are all very different, even if they are part of the same grand system.

### Example # 2

I can give you another example. Consider you have some ecommerce system. You would have products there, however products
will be part of at least two different domains:

- Product catalog, where you keep your product description and all attributes
- Inventory, where you have product stock level

If you have one bounded context for both domains, your solution can quickly become a big ball of mud because you will
start cross referencing it. At the end you will not have two domains anymore. Your product inventory will be spoiled
with product catalog references and vice versa. As the result of this you will not be able to change one domain without
touching another even you fully realize this is not required. Your models become dependent on each other and tightly
coupled, and dependent in a bad way - being dependent on implementation.

If you, however, have two bounded context, all changes you do in one domain will not affect the other as soon as you
keep your communication channels clear. It will mean you need to have data duplication but this is the least cost to
pay for loosely coupled component based application. Your domains can talk to each other using domain events. Even if
you do not plan to have SOA based application in the beginning you will be able to scale up to that level when you need
with relatively low effort since you just change the transport for your domain events, leaving the idea behind it intact.

Eric Evans gives an analogy of the old story, when several blind man describe an elephant from their perspective. Since
each man can only touch a part of the elephant, they describe it as a "tree", "wall", "snake", "rope". And each of those
man is right within their context. Bounded context is where ubiquitous language lives. Outside the context, these terms
might have completely different meaning but inside the context, the language is the same across multiple domains.

### Example # 3

First, a subdomain represents a delimited (partitioned) piece of the overall domain. A domain could be something like
"Scholarships Management". There will be several subdomains inside of that. You might consider something like:

- Identity and Access Management (generic subdomain)
- Student Application (core)
- Selection Process (core)
- Financing (core)
- Logging and Audit (supporting subdomain)

Subdomains represent partitions of the "problem space". They represent different logical areas of responsibility in an
application and they are completely dependent on the domain. Don't go on a witch-hunt expecting to find a bunch of these
either. I've seen plenty of people try to split a simple application into 5-6 subdomains. It doesn't make sense. You
have to make sense of the situation you're in and really get good at "reading the lay of the land". It takes practice.

Bounded context represents the ubiquitous language of (in a perfect world) a single sub-domain. This is where things get
sketchy, but for sake of example... while subdomain is definition of focused problem space, bounded context is the
application of a domain model that is formed by the UL as a solution to a particular subdomain. This is a little bit of
a general statement, but Bounded Context (as an applied domain model) can be thought of as "the solution" to the problem
presented by a sub-domain.

As I mentioned, a bounded context mapping one-to-one with a subdomain isn't always the case, but what's important is
that the identification of a bounded context occurs because you discover that the language your business uses changes
based on context. For example, when a student starts to complete an application for a scholarship, they think of
themselves as a "student". However, when they meet the requirements for some scholarship, they become a "candidate" in
the context of selection. The difference is subtle, but important. In addition, personnel in the "finances" context may
not even care that a student exists as a concept at all.

A Domain Model is a model of concepts from a particular domain or sub-domain that guarantee certain arbitrary business
rules or invariants are held consistent. It follows the Ubiquitous Language from your Domain / Sub-domains. This is
where Bounded Context comes in.

A Domain Model operates in a BoundedContext and reflects the Ubiquitous Language within that context. So, if your Domain
is simple, you may only have one Bounded Context. This is great! It means you get to finish the job early!

However, DO KNOW that this is an entirely iterative process driven by interaction with your domain experts (the business) and a sound BDD/TDD workflow. Start simple and build complexity "just-in-time" and when it makes sense!

## Services in DDD

Services come in 3 flavors: Domain Services, Application Services, and Infrastructure Services

- Domain Services: Encapsulates business logic that doesn't naturally fit within a domain object, and are NOT typical
CRUD operations - those would belong to a Repository.
- Application Services: Used by external consumers to talk to your system (think Web Services). If consumers need access
to CRUD operations, they would be exposed here.
- Infrastructure Services: Used to abstract technical concerns (e.g. MSMQ, Email Provider, etc)

Keeping Domain Services along with your Domain Objects is sensible - they are all focused on domain logic. And yes, you
can inject Repositories into your Services.

Application Services will typically use both Domain Services and Repositories to deal with external requests.

## When, where & how to determine the Id of an Entity?

Extracted [from](https://matthiasnoback.nl/2018/05/when-and-where-to-determine-the-id-of-an-entity/)

This is really an important question which pops very often:

Summary: Generate identity in the application service, but let the repository do the real work.

### Entity must have an identity before its persisted

Traditionally, all you need for an entity to have an ID is to designate one integer column in the database as the
primary key, and mark it as "auto-incrementing". So, once a new entity gets persisted as a record in the database
(using your favorite ORM), it will get an ID. That is, the entity has no identity until it has been persisted. Even
though this happens everywhere, and almost always; it's a bit weird, because:

- The application logic now relies on some external system to determine the identity of an entity we create.
- The entity will have no identity at first, meaning it can be created with an invalid (incomplete) state. This is
  not a desirable quality for an entity (for almost no object I'd say).

It's pretty annoying to have an entity without an identity, because you can't use its identity yet; you first have to
wait. When I'm working with entities, I always like to generate domain events (plain objects), which contain relevant
values or value objects. For example, when I create a Meetup entity (in fact, when I "schedule it"), I want to record an
 event about that. But at that point, I have no ID yet, so I actually can't even record that event.

The only thing I can do is record the event later, outside the Meetup entity, when we finally have the ID. But that
would be a bit sad, since we'd have to move the construction of the event object out of the entity, breaking up the
entity's originally excellent encapsulation.

So a better approach would be to generate the ID before creating the new entity, and to pass it in as a constructor argument.

### The ID generation process itself should happen outside of the entity

Besides, even though it's technically possible to generate a uuid inside an entity, it's something that conceptually
isn't right. The idea behind an ID is that it's unique for the kind of thing it identifies. The entity is only aware of
itself, and can never reach across its own object boundaries to find out if an ID it has generated is actually unique.
That's why, at least conceptually, generating an identity should not happen inside the entity, only outside of it.

### Let the repository generate the next identity

However, at this point we still have the issue of generating the uuid being an infrastructure concern. It should move
out of the application layer too. This is where you can use a handy suggestion I learned from Vaughn Vernon's book
"Implementing Domain-Driven Design": let the repository "hand out" a new identity whenever you need it.

e.g.

```java
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    // Note that if this is a SERIAL column, you need to find the sequence's name based on the table and column name, as follows:
    @Query(value = "SELECT nextval(pg_get_serial_sequence('my_table', 'id')) as new_id", nativeQuery = true)
    Long getNextIdentity();
   
}
```

The advantages of letting the repository generate the next identity are:

- There's a natural, conceptual relation: repositories manage the entities and their identities.
- You can easily change the way an ID is being generated because the process is now properly encapsulated. No scattered
calls to `Uuid::uuid4()`, but only calls to `Repository::nextIdentity()`.
- You can in fact still use an incremental ID if you like. You can use the database after all if it natively supports
sequences. Or you can implement your own sequence.
