# GraphQL vs. REST

Clients define the structure of responses vs. Server defines the structure of responses
- Access control may need to be implemented per-resolver
- Very easy to work across resources

Every request is a POST (* with some exceptions) vs. full GET/POST/PUT/DELETE semantics
 =Performance and caching will become a (API level, not CDN-level) problem

Top-level queries/mutations/subscriptions and resolvers vs. everything is a resource (in arbitrary nesting level)
 => Very easy to create business process specific operations (vs. trying to express every business op as PUT/POST)
 => Possible to listen to changes (via subscriptions) instead of a separate duct taped notification mechanism
- Strongly typed queries & responses vs. DIY validation mechanism
 => Reduces work to create a safe API
- GraphQL schema is the API defintion and the spec and documentation vs. separate schema language (e.g. Swagger)
 => Excellent tooling for prototyping