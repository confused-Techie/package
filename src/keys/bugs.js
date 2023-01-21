const InvalidPropertyError = require("../errors/invalid_property_error.js");

function bugs(value) {
  if (typeof value === "undefined") {
    // Get Property
    // this.mode.bugs can be Default, Object, or String
    if (this.mode.bugs === "default" && typeof this.normalizedPack.bugs !== "undefined") {
      return this.normalizedPack.bugs;
    }

    if (typeof this.normalizedPack.bugs === this.mode.bugs) {
      return this.normalizedPack.bugs;
    }

    // Because Bugs has two modes, we will attempt to support either.
    if (typeof this.rawPack.bugs === "string") {
      switch(this.mode.bugs) {
        case "object":
          // we need to figure out if this is a URL or an email
        case "string":
        case "default":
        default:
          this.bugs = this.rawPack.bugs;
          return this.bugs;
      }
    }

    if (typeof this.rawPack.bugs === "object") {
      switch(this.mode.bugs) {
        case "string":
          // Since when Bugs are in string mode we can only define a URL,
          // we will throw away the email part of the object.
          if (typeof this.rawPack.bugs.url !== "undefined") {
            this.bugs = this.rawPack.bugs.url;
            return this.bugs;
          }
          return undefined;
        case "object":
        case "default":
        default:
          if (typeof this.rawPack.bugs.url !== "undefined" && typeof this.rawPack.bugs.email !== "undefined") {
            this.bugs = this.rawPack.bugs;
            return this.bugs;
          }
          return undefined;
      }
    }

    return undefined;
  }
  // Set Property
  if (this.mode.bugs === "object" || typeof value === "object") {
    if (typeof value.url !== "undefined" && typeof value.email !== "undefined") {
      this.normalizedPack.bugs = value;
      return;
    }
  }

  if (this.mode.bugs === "string" || typeof value === "string") {
    if (typeof value === "string") {
      // Also ensure it is a valid URL
      this.normalizedPack.bugs = value;
      return;
    }
  }

  throw new InvalidPropertyError(`Bugs value does't match ${this.mode.bugs} Bugs Mode`);
}

module.exports = bugs;
