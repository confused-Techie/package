const Key = require("./base-key.js");

class Description extends Key {
  static fieldName = "description";

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

module.exports = Description;
