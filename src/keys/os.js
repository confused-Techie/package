const Key = require("./base-key.js");

class os extends Key {
  static fieldName = "os";

  validate(service) {
    let valid;

    switch(service) {
      case "commonjs":
        // todo
      case "npm":
      default:
        valid = this.isStringArray();
    }
    return valid;
  }
}

module.exports = os;
