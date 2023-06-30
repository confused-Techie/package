/**
 * The License Key Class supports two forms of the `license` key:
 *    - standard: A standard string
 *    - object: A deprecated object style, with type and url
 * The beauty here, is that the Package class can have it's declared preference,
 * which controls how the data is returned to the user when requested,
 * converting either style into the other, depending on what the declared preference
 * is. Meanwhile, when setting the value, it will be converted into whatever the
 * existing style is.
 */

class License {
  static fieldName = "license";

  constructor(val, config) {
    this.value = val;
    this.config = config;

    this.style;

    if (typeof val === "object") {
      this.style = "licenseObject";
    } else if (typeof val === "string") {
      this.style = "standard";
    }

  }

  get field() {
    if (this.config.licenseStyle === "standard") {
      if (this.style === "standard") {
        return this.value;
      } else if (this.style === "object") {
        return this.value.type;
      }
    } else if (this.config.licenseStyle === "object") {
      if (this.style === "object") {
        return this.value;
      } else if (this.style === "standard") {
        return {
          type: this.value,
          url: `https://opensource.org/license/${this.value}/`
        };
        // TODO have a better method of finding the license URL
      }
    }
  }

  set field(val) {
    if (this.style === "standard") {
      if (typeof val === "string") {
        this.value = val;
      } else if (typeof val === "object") {
        this.value = val.type;
      }
    } else if (this.style === "object") {
      if (typeof val === "object") {
        this.value = val;
      } else if (typeof val === "string") {
        this.value = {
          type: val,
          url: `https://opensource.org/license/${val}/`
        };

      }
    }
  }

  validate(service) {
    let valid;

    switch(service) {
      case "commonjs":
        // commonjs does not support the license key at all
        valid = false;
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

module.exports = License;
