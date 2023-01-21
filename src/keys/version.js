const InvalidPropertyError = require("../errors/invalid_property_error.js");

function version(value) {
  if (typeof value === "undefined") {
    // Get property
    if (this.validate("version", this.normalizedPack.version)) {
      return this.normalizedPack.version;
    }

    if (this.validate("version", this.rawPack.version)) {
      return this.version(this.rawPack.version);
    }

    return undefined;
  }
  // Set property
  if (this.validate("version", value)) {
    this.normalizedPack.version = value;
    return;
  }

  throw new InvalidPropertyError(`Version is not a valid type: ${typeof value}`);
  return;
}

module.exports = version;
