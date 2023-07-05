const { describe, it } = require("node:test");
const assert = require("node:assert");

const Key = require("../src/keys/base-key.js");

describe("assigns values correctly", () => {
  it("assigns value in constructor", () => {
    let key = new Key("test-value");
    assert.strictEqual(key.value, "test-value");
  });
  it("assigns value in setter", () => {
    let key = new Key();
    key.field = "test-value";
    assert.strictEqual(key.value, "test-value");
  });
  it("retreives value in getter", () => {
    let key = new Key("test-value");
    assert.strictEqual(key.field, "test-value");
  });
});
