const semver = require("semver");
const Key = require("./base-key.js");

class Version extends Key {
  static fieldName = "version";

  validate(service) {
    let valid;

    switch(service) {
      case "commonjs":
      case "npm":
      default:
        if (typeof this.value === "string" && semver.valid(this.value) !== null) {
          valid = true;
        } else {
          valid = false;
        }
        break;
    }

    return valid;
  }
}

module.exports = Version;
