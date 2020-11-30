# Writing GraphQL Queries

This sections introduces you to querying GraphQL APIs through a few popular APIs.

## Basic Queries

Task: Find who are the top GitHub contributors in Wunderdog? The solution should involve a list of members in Wunderdog organisation, with the number of total contributions they have.

Your task:
1. Generate personal Bearer token in GitHub (add grant read access, also to user organisations)
1. Explore GitHub GraphQL API, both through docs in the web, GraphQL schema introspection and autocompletion.
1. Write an actual query

Sample: What are the GitHub projects of Wunderdog?

```graphql
query {
  organization(login: "wunderdogsw") {
    name

    repositories(first: 100) {
      nodes {
        name
        description
        url
      }
    }
  }
}
```

<details>
  <summary>Solution</summary>

  ```graphql
  query {
    organization(login: "wunderdogsw") {
      name

      repositories(first: 100) {
        nodes {
          name
          description
          url
        }
      }
    }  
  }
  ```
</details>

## References

* [GitHub API docs](https://docs.github.com/en/free-pro-team@latest/graphql/guides/using-the-explorer)
* [GitHub token settings](https://github.com/settings/tokens)