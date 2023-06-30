const Key = require("./base-key.js");

class Keywords extends Key {
  static fieldName = "keywords";

  validate(service) {
    let valid;

    switch(service) {
      case "npm":
      case "commonjs":
      default:
        if (Array.isArray(this.value)) {
          valid = true;
          for (let i = 0; i < this.value.length; i++) {
            if (typeof this.value[i] !== "string") {
              valid = false;
            }
          }
        } else {
          valid = false;
        }
        break;
    }

    return valid;
  }
}

module.exports = Keywords;
