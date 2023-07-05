const Key = require("./base-key.js");

class Main extends Key {
  static fieldName = "main";

  validate(service) {
    let valid;

    switch(service) {
      case "commonjs":
        // TODO
      case "npm":
        valid = typeof this.value === "string";
        break;
    }

    return valid;
  }
}

module.exports = Main;
