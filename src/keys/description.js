// Testing function to use as specific key handler.
const InvalidPropertyError = require("../errors/invalid_property_error.js");

function description(value) {
  if (typeof value === "undefined") {
    // Get Property
    if (typeof this.normalizedPack.description === "string") {
      return this.normalizedPack.description;
    }

    if (typeof this.rawPack.description === "string") {
      return this.description(this.rawPack.description);
    }

    return undefined;
  }
  // Set Property
  if (typeof value === "string") {
    this.normalizedPack.description = value;
    return;
  }

  throw new InvalidPropertyError(`Description is not a valid type: ${typeof value}`);
  return;
};

module.exports = description;
