const { getQuery } = require('../build');

const input = `
mutation ($var1: Boolean, $var2: Boolean) {
  field(where: $var1, and: $var2) {
    x
    y
  }
}`;

const variables = {
  var1: true
};

const output = "mutation ($var1: Boolean) { field (where: $var1) { x y } }";

test("mutation", () => {
  expect(getQuery(input, variables)).toBe(output);
});
