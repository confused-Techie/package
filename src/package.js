const keyClasses = [
  require("./keys/author.js"),
  require("./keys/description.js"),
  require("./keys/license.js"),
  require("./keys/name.js"),
  require("./keys/version.js"),
  require("./keys/bugs.js"),
  require("./keys/homepage.js"),
  require("./keys/main.js"),
  require("./keys/browser.js"),
  require("./keys/private.js"),
  require("./keys/os.js")
];

const NullKey = require("./keys/null-key.js");

// A simple reimaging of what this repo could look like.
// With a new found focus on simplicity.

class Package {
  constructor(opts = {}) {
    this.rawPack = opts.pack ?? {};

    this.service = opts.service ?? "npm";

    this.unmatchedKeys = [];
    this.duplicateKeys = [];

    this.knownFields = [];

    this.parse();
  }

  /**
   * @function parse
   * @memberof Package
   * @desc Uses the provided package.json, looping through each key to then check
   * if that key matches the `fieldName` of any keyClass. If it does, that keyClass
   * is added to our `this.` scope, as well as the name being added to
   * `this.knownFields`. The class is now available via the field name on the
   * Package class.
   */
  parse(pack) {
    let workingPack = pack ?? this.rawPack;

    let workingPackKeys = Object.keys(workingPack);

    for (let i = 0; i < workingPackKeys.length; i++) {
      let keyClass = findKeyClassForKey(workingPackKeys[i]);

      if (keyClass === -1) {
        this.unmatchedKeys.push(workingPackKeys[i]);
        continue;
      }

      if (this[keyClass.fieldName]) {
        this.duplicateKeys.push(workingPackKeys[i]);
        continue;
      }

      this[keyClass.fieldName] = new keyClass(workingPack[workingPackKeys[i]], this.getConfig());
      this.knownFields.push(keyClass.fieldName);
    }

  }

  /**
   * @function validate
   * @memberof Package
   * @desc Loops through all `knownFields` added to our instance of Package
   * and calls their unique validation functions providing our current
   * `this.service`. Allowing each to return a boolean true or false indicating
   * validity, or optionally a string.
   */
  validate(service) {
    let validationHistory = [];

    for (let i = 0; i < this.knownFields.length; i++) {
      let validationRes = this[this.knownFields].validate(this.service);

      if (typeof validationRes === "string") {
        validationHistory.push(validationRes);
      } else if (typeof validationres === "boolean") {
        if (!validationRes) {
          validationHistory.push(`${this.knownFields[i]} is not valid!`);
        }
      }
    }

    return validationHistory;
  }

  /**
   * @function getConfig
   * @memberof Package
   * @desc Used to provide the Package's current configuration to each key class.
   */
  getConfig() {
    return {
      service: this.service,
      licenseStyle: "standard"
    };
  }

  /**
   * @function getKey
   * @memberof Package
   * @desc Allows the retrevial of any given key object, to avoid the need of manually
   * checking for it's existance or validity.
   */
  getKey(keyName) {
    if (this.knownFields.includes(keyName)) {
      return this[keyName];
    } else {
      return new NullKey();
    }
  }

}

function findKeyClassForKey(key) {
  for (let i = 0; i < keyClasses.length; i++) {
    // Since we export the `fieldName` on each class,
    // that leaves the `.validateKey()` as just being redundent

    if (typeof keyClasses[i].fieldName === "string" && key === keyClasses[i].fieldName) {
      return keyClasses[i];
    } else if (Array.isArray(keyClasses[i].fieldName) && keyClasses[i].includes(key)) {
      // Here we allow the fieldName to be an array of strings if preffered
      return keyClasses[i];
    }
    //if (keyClasses[i].validateKey(key)) {
    //  return keyClasses[i];
    //}
  }

  return -1;
}

module.exports = Package;
