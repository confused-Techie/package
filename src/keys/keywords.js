const InvalidPropertyError = require("../errors/invalid_property_error.js");

function keywords(value) {
  if (typeof value === "undefined") {
    // Get Property
    if (Array.isArray(this.normalizedPack.keywords)) {
      return this.normalizedPack.keywords;
    }

    if (Array.isArray(this.rawPack.keywords)) {
      return this.keywords(this.rawPack.keywords);
    }

    return undefined;
  }
  // Set Property
  if (Array.isArray(value)) {
    this.normalizedPack.keywords = value;
    return;
  }

  throw new Error(`Keywords is not a valid type: ${typeof value}`);
  return;
}

module.exports = keywords;
