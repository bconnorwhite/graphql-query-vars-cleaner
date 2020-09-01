const { getQuery } = require('../build');

const input = `
query ($var1: Enum, $var2: Enum) {
  field(where: $var1, and: $var2) {
    x
    y
  }
}`;

const variables = {
  var1: "test"
};

const output = "query ($var1: Enum) { field (where: $var1) { x y } }";

test("enum", () => {
  expect(getQuery(input, variables)).toBe(output);
});
