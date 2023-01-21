const InvalidPropertyError = require("../errors/invalid_property_error.js");

function name(value) {
  if (typeof value === "undefined") {
    // Asking for the property.
    if (this.validate("name", this.normalizedPack.name)) {
      return this.normalizedPack.name;
    }

    if (this.validate("name", this.rawPack.name)) {
      return this.name(this.rawPack.name);
    }

    // If we have reached this point then we know we can't find this value.
    // At this point we will return `undefined`
    return undefined;
  }
  // setting the property.
  if (this.validate("name", value)) {
    this.normalizedPack.name = value;
    return;
  }

  throw new InvalidPropertyError(`Name is not valid for ${this.mode.service}: ${value}`);
  return;
}

module.exports = name;
