const { getQuery } = require('../build');

const input = `
query ($var1: [String], $var2: [String!], $var3: String, $var4: Int, $var5: String, $var6: Int) {
  field(where: {
    a: $var1,
    b: $var2,
    and: [{
      c: $var3
    }, {
      d: $var4
    }],
    or: [{
      e: $var5
    }, {
      f: $var6
    }]
  }) {
    x
  }
}`;

const variables = {
  var1: ["test"],
  var2: ["a", "b"],
  var3: "c",
  var4: 4
};

const output = "query ($var1: [String], $var2: [String!], $var3: String, $var4: Int) { field (where: {a: $var1, b: $var2, and: [{c: $var3}, {d: $var4}]}) { x } }";

test("list", () => {
  expect(getQuery(input, variables)).toBe(output);
});
