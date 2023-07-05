const Key = require("./base-key.js");

class Keywords extends Key {
  static fieldName = "keywords";

  validate(service) {
    let valid;

    switch(service) {
      case "npm":
      case "commonjs":
      default:
        valid = this.isStringArray();
        break;
    }

    return valid;
  }
}

module.exports = Keywords;
