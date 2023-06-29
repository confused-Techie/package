class Author {
  static validateKey(key) {
    if (key === "author") {
      return true;
    } else {
      return false;
    }
  }

  static fieldName = "author";

  constructor(val) {
    this.value = val;
  }

  get field() {
    return this.value;
  }

  set field(val) {
    this.value = val;
  }

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

module.exports = Author;
