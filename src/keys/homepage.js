const Key = require("./base-key.js");

class Homepage extends Key {
  static fieldName = "homepage";

  validate(service) {
    let valid;

    switch(service) {
      case "npm":
      case "commonjs":
      default:
        valid = this.isString();
        break;
    }

    return valid;
  }
}

module.exports = Homepage;
