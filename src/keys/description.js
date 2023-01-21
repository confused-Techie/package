// Testing function to use as specific key handler.
const InvalidPropertyError = require("../errors/invalid_property_error.js");

function description(value) {
  if (typeof value === "undefined") {
    // Get Property
    if (this.validate("description", this.normalizedPack.description)) {
      return this.normalizedPack.description;
    }

    if (this.validate("description", this.rawPack.description)) {
      return this.description(this.rawPack.description);
    }

    return undefined;
  }
  // Set Property
  if (this.validate("description", value)) {
    this.normalizedPack.description = value;
    return;
  }

  throw new InvalidPropertyError(`Description is not a valid type: ${typeof value}`);
  return;
}

module.exports = description;
