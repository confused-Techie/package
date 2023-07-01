class Bugs {
  static fieldName = "bugs";

  constructor(val, config) {
    this.value = val;
    this.config = config;

    this.style;

    if (typeof val === "object") {
      this.style = "object";
    } else if (typeof val === "string") {
      this.style = "string";
    }
  }

  get field() {
    if (this.config.bugStyle === "standard") {
      if (this.style === "standard") {
        return this.value;
      } else if (this.style === "object") {
        return this.value.url;
      }
    } else if (this.config.bugStyle === "object") {
      if (this.style === "object") {
        return this.value;
      } else if (this.style === "string") {
        return {
          url: this.value,
          email: ""
        };
      }
    }
  }

  set field(val) {
    if (this.style === "standard") {
      if (typeof val === "string") {
        this.value = val;
      } else if (typeof val === "object") {
        this.value = val.url;
      }
    } else if (this.style === "object") {
      if (typeof val === "object") {
        this.value = val;
      } else if (typeof val === "string") {
        this.value = {
          url: val,
          email: ""
        };
      }
    }
  }

  validate(service) {
    let valid;

    switch(service) {
      case "commonjs":
        // commonjs only accepts a string value
        if (this.style === "object") {
          valid = false;
        } else {
          valid = typeof this.value === "string";
        }
        break;
      case "npm":
      default:
        if (this.style === "standard") {
          valid = typeof this.value === "string";
        } else if (this.style === "object") {
          valid = typeof this.value === "object";
        }
        break;
    }

    return valid;
  }
}

module.exports = Bugs;
