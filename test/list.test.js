const { getQuery } = require('../build');

const input = `
query ($var1: [String], $var2: [String!]) {
  field(where: {
    a: $var1,
    b: $var2
  }) {
    x
  }
}`;

const variables = {
  var1: ["test"],
  var2: ["a", "b"]
};

const output = "query ($var1: [String], $var2: [String!]) { field (where: {a: $var1, b: $var2}) { x } }";

test("object", () => {
  expect(getQuery(input, variables)).toBe(output);
});
