const { getQuery } = require('../build');

const input = `
query ($var1: Int, $var2: Int) {
  field(where: $var1, and: $var2) {
    x
    y
  }
}`;

const variables = {
  var1: 1
};

const output = "query ($var1: Int) { field (where: $var1) { x y } }";

test("int", () => {
  expect(getQuery(input, variables)).toBe(output);
});
