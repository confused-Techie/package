const Key = require("./base-key.js");

class Browser extends Key {
  static fieldName = "browser";

  validate(service) {
    let valid;

    switch(service) {
      case "commonjs":
        // TODO
      case "npm":
        valid = this.isString();
        break;
    }

    return valid;
  }
}

module.exports = Browser;
