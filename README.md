<div align="center">
  <h1>graphql-query-vars-cleaner</h1>
  <a href="https://npmjs.com/package/graphql-query-vars-cleaner">
    <img alt="npm" src="https://img.shields.io/npm/v/graphql-query-vars-cleaner.svg">
  </a>
  <a href="https://github.com/bconnorwhite/graphql-query-vars-cleaner">
    <img alt="typescript" src="https://img.shields.io/github/languages/top/bconnorwhite/graphql-query-vars-cleaner.svg">
  </a>
  <a href="https://github.com/bconnorwhite/graphql-query-vars-cleaner">
    <img alt="GitHub stars" src="https://img.shields.io/github/stars/bconnorwhite/graphql-query-vars-cleaner?label=Stars%20Appreciated%21&style=social">
  </a>
  <a href="https://twitter.com/bconnorwhite">
    <img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/bconnorwhite.svg?label=%40bconnorwhite&style=social">
  </a>
</div>

<br />

> Remove undefined variables from GraphQL queries.

## Why?

Having a large number of undefined variables in a GraphQL can hurt performance on some backends.
For a query backing a table, you might have a filter and an order variable for each column.
Often it is easier to leave these variables as undefined, so instead graphql-query-vars-cleaner will filter out these undefined variables.

## Installation

```bash
yarn add graphql-query-vars-cleaner
```

```bash
npm install graphql-query-vars-cleaner
```

> Note:  
> GraphQL is a peer dependency. To run, also install graphql:  
> Yarn: `yarn add graphql`  
> NPM: `npm install graphql`  

## API

```js
import { getQuery } from "graphql-query-vars-cleaner";

const query = `
query ($var1: Int, $var2: Int) {
  field(where: $var1, and: $var2) {
    x
    y
  }
}`;

const variables = {
  var1: 1
};

console.log(getQuery(query, variables));

// Output:
// query ($var1: Int) { field (where: $var1) { x y } }

```

### Types
```ts
import { getQuery, Variables } from "graphql-query-vars-cleaner";

function getQuery(query: string, variables?: Variables): string

type Variables = {
  [name: string]: string | undefined;
}
```

<br />

<h2>Dependencies<img align="right" alt="dependencies" src="https://img.shields.io/david/bconnorwhite/graphql-query-vars-cleaner.svg"></h2>

- [graphql-tag](https://npmjs.com/package/graphql-tag): A JavaScript template literal tag that parses GraphQL queries
- [is-obj-empty](https://npmjs.com/package/is-obj-empty): Check if an object is empty
- [json-to-graphql-query](https://npmjs.com/package/json-to-graphql-query): This is a simple module that takes a JavaScript object and turns it into a GraphQL query to be sent to a GraphQL server.

<br />

<h2>Dev Dependencies<img align="right" alt="dev dependencies" src="https://img.shields.io/david/dev/bconnorwhite/graphql-query-vars-cleaner.svg"></h2>

- [@bconnorwhite/bob](https://npmjs.com/package/@bconnorwhite/bob): Bob builds and watches typescript projects.
- [graphql](https://npmjs.com/package/graphql): A Query Language and Runtime which can target any service.
- [jest](https://npmjs.com/package/jest): Delightful JavaScript Testing.

<br />

<h2>Peer Dependencies<img align="right" alt="peer dependencies" src="https://img.shields.io/david/peer/bconnorwhite/graphql-query-vars-cleaner"></h2>

- [graphql](https://npmjs.com/package/graphql): A Query Language and Runtime which can target any service.

<br />

<h2>License <img align="right" alt="license" src="https://img.shields.io/npm/l/graphql-query-vars-cleaner.svg"></h2>

[MIT](https://mit-license.org/)
