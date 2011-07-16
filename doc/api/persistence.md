## Persistence.

Let's draw a distinction between your persistence layer and your domain model.  Your persistence layer is how you save your data in case of power failure, and your domain model is where you put your business logic (things like relationships, validations, state machines, et cetera.)  Many MVC frameworks combine persistence layer and the domain model, and they call it the Model. Transitive doesn't give you this.

Instead, Transitive focuses on percolating updates from your persistence layer out to the browsers that care.

You might even use Transitive in front of an API developed in another language (or many languages if you are developing with a SOA.)

**Transitive deals with moving datastructures around to interested parties.**

Modern applications use many different kinds of "databases" for different kinds of data -- RDBMS, Document Stores, Redis, HBase, and even RESTful APIs to other services.  Each of these has different transactional semantics and unique features.  Transitive is mostly ambivalent about how you persist your data.  The realtime features of Transitive simply require that your persistence layer publishes events when things change.

For convenience, there is a least-common-denominator abstraction for load & save by id, add/remove from a set, and `tail`.  Implementations for in-memory and Redis are supported and are intended to serve as examples. I fully expect to augment them with optimistic locking.

For now, you are encouraged and expected to write your own domain model and persistence layer. Eventually, I assume that a prominent effort will become the "mainstream" Model layer for Transitive.  

** Example Persistence **

Example Persistence has:

  * Identity - a universal resource identifier, or otherwise unique id.
  * Persistence - the ability to save and restore.

Example Persistence *does not* have:

  * Authorization
  * Validation
  * Relationships
  * State Machines
  * Presentation helpers
  * Transactions
  * Iterators
  * A kitchen sink.

The basic case is that you want to save and load stuff. That's what the example persistence layer gives you. **Please** create and share your own ideas and libraries.

## Broadcasting Data

Simply:

  When data changes, publish an event on a channel where the channel name is the id of the item that has changed.

*What about collections?*

In Transitive, each collection has a unique id as well.  So if a collection changes, publish an event to a channel that has the id of that collection.

**Guidelines for ids:**

Two extremes: using purely random ids and using full URIs for ids.  Either would work, but purely random ids make debugging harder and full URIs contain the scheme (http/https), domain and query parameters.  I suggest that you follow a simple URI-style scheme "/users/3e9Dv8j93h391jW1X09_o2".  

For collections, you can either give them a top-level representation, "/booklists/9" or possibly nest them if they are always accessed through a single parent object, "/users/3e9Dv8j93h391jW1X09_o2/booklist". 

## newId(length=22)

Returns `length` random chars from the base64uri character set: (a-zA-Z0-9 _ and -). 22 is the default because it provides 16 bytes of random information, similar to a UUID.