const Key = require("./base-key.js");

class Name extends Key {
  static fieldName = "name";

  validate(service) {
    let valid;

    let npmNameReg = /[^a-zA-Z-@_\/\.0-9]/g;
    let commonjsNameReg = /[^a-z0-9-_\/\.]/g;

    switch(service) {
      case "commonjs":
        if (typeof this.value !== "string") {
          valid = false;
        } else if (this.value.match(/[A-Z]/g) !== null) {
          valid = false;
        } else if (this.value.match(commonjsNameReg) !== null) {
          valid = false;
        } else {
          valid = true;
        }
        break;
      case "npm":
      default:
        if (typeof this.value !== "string") {
          valid = false;
        } else if (this.value.length > 214) {
          valid = false;
        } else if (this.value[0] === "." || this.value[0] === "_") {
          valid = false;
        } else if (this.value.match(npmNameReg) !== null) {
          valid = false;
        } else {
          valid = true;
        }
        break;
    }

    return valid;
  }

}

module.exports = Name;
