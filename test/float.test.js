const { getQuery } = require('../build');

const input = `
query ($var1: Float) {
  field(where: {
    a: 30.4,
    b: {
      c: 12.3,
      d: $var1
    }
  }) {
    x
    y
  }
}`;

const variables = {
  var1: 1.2
};

const output = "query ($var1: Float) { field (where: {a: 30.4, b: {c: 12.3, d: $var1}}) { x y } }";

test("float", () => {
  expect(getQuery(input, variables)).toBe(output);
});
