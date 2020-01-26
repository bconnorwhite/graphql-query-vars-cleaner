const { getQuery } = require('./build');

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
