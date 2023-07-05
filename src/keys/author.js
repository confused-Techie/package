const Key = require("./base-key.js");

class Author extends Key {

  static fieldName = "author";

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

module.exports = Author;
