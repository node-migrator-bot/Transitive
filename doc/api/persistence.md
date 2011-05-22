## Persistence.

** Persistence & Domain Model, Not ORM **

Let's draw a distinction between your persistence layer and your domain model.  Your persistence layer is how you save your data in case of power failure, and your domain model is where you put your business logic (things like relationships, validations, state machines, et cetera.)  Many MVC frameworks combine persistence and the domain model, and they call it an ORM.  Transitive does not provide a traditional ORM.  For the domain model, there is a lightweight Model provided for conveinence, [Model.Basic](models.html#basic) but you are encouraged to build or use something more robust if it does not fit your needs.

*Transitive deals with moving datastructures around to interested parties.*

Modern applications use many different kinds of "databases" for different kinds of data -- RDBMS, Document Stores, Redis, HBase, and even using RESTful APIs to other services.  Each of these has different transactional semantics and unique features.  Transitive is mostly ambivelant about how you persist your data.  Transitive just reqiures that your perisistence layer emits events when things change. There is a least-common-denominator abstraction for load & save by id.  

You can use persistence layers that don't have this ability, but then you'll have to implement it in the application layer, which is pretty easy. [Guide: Implementing a Broadcasting Data store]() 

** Basic Models **

Basic Models Have:

  * Identity
  * Validation
  * Persistence

Basic Models *do not* have:

  * The ability to load related models
  * State Machines
  * Serialization
  * Presentation helpers
  * Integrations with external resources
  * Algorithms

The basic case is that you want to save and load stuff, maybe running it through a validation before you save.  That's what you get out-of-the-box with Transitive.   

### Broadcasting Data


