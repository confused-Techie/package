const Key = require("./base-key.js");

class Private {
  static fieldName = "private";

  validate(service) {
    let valid;

    switch(service) {
      case "commonjs":
        // TODO
      case "npm":
      default:
        valid = this.isBoolean();
        break;
    }

    return valid;
  }
}

module.exports = Private;
