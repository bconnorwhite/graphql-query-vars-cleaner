const { getQuery } = require('./build');

let query = `
query getSite($id: uuid!) {
  site(id: $id) {
    id
    latitude
    longitude
    pipes {
      premise_number
      meter {
        low_head {
          physical_number
          virtual_number
          register {
            number
            __typename
          }
          __typename
        }
        high_head {
          physical_number
          virtual_number
          register {
            number
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
}`;

let variables = { id: "abcd"};

console.log(getQuery(query, variables));
