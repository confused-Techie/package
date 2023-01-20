const PackageJSON = require("../src/package.js");
const InvalidPropertyError = require("../src/errors/invalid_property_error.js");

describe("Tests Name Variations", () => {

  test("Generic Name is assigned properly", () => {
    let pack = new PackageJSON();
    let tmp = "test-package";

    pack.name(tmp);

    expect(pack.name()).toBe(tmp);
    expect(pack.normalizedPack.name).toBe(tmp);
  });

  test("Valid Name when using NPM", () => {
    let pack = new PackageJSON({ mode: { strict: true, service: "npm" }});
    let tmp = "test-package";

    pack.name(tmp);

    expect(pack.name()).toBe(tmp);
    expect(pack.normalizedPack.name).toBe(tmp);
  });

  test("Scopped Valid Name when using NPM", () => {
    let pack = new PackageJSON({ mode: { strict: true, service: "npm" }});
    let tmp = "@confused-techie/package";

    pack.name(tmp);

    expect(pack.name()).toBe(tmp);
    expect(pack.normalizedPack.name).toBe(tmp);
  });

  test("`_` Invalid Characters at start of name when using NPM", () => {
    let pack = new PackageJSON({ mode: { strict: true, service: "npm" }});
    let tmp = "_test-package";

    expect(() => {
      pack.name(tmp);
    }).toThrow(InvalidPropertyError);
  });

  test("`.` Invalid Characters at start of name when using NPM", () => {
    let pack = new PackageJSON({ mode: { strict: true, service: "npm" }});
    let tmp = ".test-package";

    expect(() => {
      pack.name(tmp);
    }).toThrow(InvalidPropertyError);
  });

  test("Invalid Length of name when using NPM", () => {
    let pack = new PackageJSON({ mode: { strict: true, service: "npm" }});
    // tmp is broken up to avoid line length limits.
    let tmp = "tttttttttttttttttttttttttttttttttttttttttttttttttt"; // 50 here
    tmp += "tttttttttttttttttttttttttttttttttttttttttttttttttt"; // 50 here
    tmp += "tttttttttttttttttttttttttttttttttttttttttttttttttt"; // 50 here
    tmp += "tttttttttttttttttttttttttttttttttttttttttttttttttt"; // 50 here
    tmp += "ttttttttttttttt"; // 15 here

    expect(() => {
      pack.name(tmp);
    }).toThrow(InvalidPropertyError);
  });

});

describe("Version Variations", () => {

  test("Generic Version", () => {
    let pack = new PackageJSON();
    let tmp = "1.0.0";

    pack.version(tmp);

    expect(pack.version()).toBe(tmp);
    expect(pack.normalizedPack.version).toBe(tmp);
  });

});

describe("Description Variations", () => {

  test("Generic Description", () => {
    let pack = new PackageJSON();
    let tmp = "This is my package!";

    pack.description(tmp);

    expect(pack.description()).toBe(tmp);
    expect(pack.normalizedPack.description).toBe(tmp);
  });

});

describe("Full `parse()` Tests - Passing", () => {

  const fixtures = [

  ];

  test.each([
    "test-package-1.json"
  ])("parse(%s)", (file) => {
    let data = require(`./fixtures/pass/${file}`);

    let pack = new PackageJSON();

    let end = pack.parse(data);
    console.log(end);
    console.log(data);
    expect(end).toStrictEqual(data);
    // Now lets check every key we provided to ensure it comes out as expected.
    //for (const key in data) {
    //  expect(end[key]).toBe(data[key]);
    //}

    // In the above, we provide a `package.json` from our `./fixtures` folder,
    // providing the whole JSON file to `pack.parse()` which will return the normalizedPack
    // at the end of the function.
    // Once receiving it we then loop through every original value and check that
    // it matches exactly as what's seen from the original package.
    // Since these are being tested from the `pass` folder we expect each to be
    // a valid package, and have no issues within.
  });

});
