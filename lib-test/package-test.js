const { describe, it } = require("node:test");
const assert = require("node:assert");

const Package = require("../lib/package.js");

describe("simple test", () => {
  it("does things", () => {
    let pack = new Package({ pack: { author: "confused-Techie", description: "Hello world" }});

    //console.log(pack);
    assert.strictEqual(pack.author.field, "confused-Techie");
    pack.author.field = "Daeraxa";
    assert.strictEqual(pack.author.field, "Daeraxa");
    assert.strictEqual(pack.description.field, "Hello world");
  });
});
