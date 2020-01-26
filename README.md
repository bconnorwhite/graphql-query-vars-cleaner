# graphql-query-vars-cleaner

Remove undefined variables from a GraphQL query

```
yarn add graphql-query-vars-cleaner
```

### API

#### getQuery(query: string, variables: {}) => string

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
