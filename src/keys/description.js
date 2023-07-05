const Key = require("./base-key.js");

class Description extends Key {
  static fieldName = "description";

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

module.exports = Description;
