const { getQuery } = require('../build');

const input = `
query ($var1: String, $var2: String) {
  field(where: $var1, and: $var2) {
    x
    y
  }
}`;

const variables = {
  var1: "test"
};

const output = "query ($var1: String) { field (where: $var1) { x y } }";

test("string", () => {
  expect(getQuery(input, variables)).toBe(output);
});
