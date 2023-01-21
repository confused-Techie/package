const InvalidPropertyError = require("../errors/invalid_property_error.js");

function homepage(value) {
  if (typeof value === "undefined") {
    // Get Property
    if (typeof this.normalizedPack.homepage === "string") {
      return this.normalizedPack.homepage;
    }

    if (typeof this.rawPack.homepage === "string") {
      return this.homepage(this.rawPack.homepage);
    }

    return undefined;
  }
  // Set Property
  // TODO: Check if valid URL
  if (typeof value === "string") {
    this.normalizedPack = value;
    return;
  }

  throw new InvalidPropertyError(`Homepage is not a valid type: ${typeof value}`);
  return;
}

module.exports = homepage;
