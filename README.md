# graphql-query-vars-cleaner
![dependencies](https://img.shields.io/david/bconnorwhite/graphql-query-vars-cleaner)
![minzipped size](https://img.shields.io/bundlephobia/minzip/graphql-query-vars-cleaner)
![typescript](https://img.shields.io/github/languages/top/bconnorwhite/graphql-query-vars-cleaner)
![npm](https://img.shields.io/npm/v/graphql-query-vars-cleaner)

Remove undefined variables from GraphQL queries

```
yarn add graphql-query-vars-cleaner
```

## API

```ts
getQuery(query: string, variables: {}) => string
```

```js
const { getQuery } = require('graphql-query-vars-cleaner');

let query = `
query ($var1: Int, $var2: Int) {
  field(where: $var1, and: $var2) {
    x
    y
  }
}`;

let variables = {
  var1: 1
};

console.log(getQuery(query, variables));
//query ($var1: Int) { field (where: $var1) { x y } }

```
