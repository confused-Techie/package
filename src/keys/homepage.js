const Key = require("./base-key.js");

class Homepage extends Key {
  static fieldName = "homepage";

  validate(service) {
    let valid;

    switch(service) {
      case "npm":
      case "commonjs":
      default:
        valid = typeof this.value === "string";
        break;
    }

    return valid;
  }
}

module.exports = Homepage;
