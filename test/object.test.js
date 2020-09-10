const { getQuery } = require('../build');

const input = `
query ($var1: String, $var2: String) {
  field(where: {
    a: $var1,
    b: $var2
  }) {
    w {
      x
    }
    y {
      z
    }
  }
}`;

const variables = {
  var1: "test"
};

const output = "query ($var1: String) { field (where: {a: $var1}) { w { x } y { z } } }";

test("object", () => {
  expect(getQuery(input, variables)).toBe(output);
});
