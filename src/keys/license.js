
function license(value) {
  if (typeof value === "undefined") {
    // Get Property
    if (typeof this.normalizedPack.license !== "undefined") {
      return this.normalizedPack.license;
    }

    if (typeof this.rawPack.license !== "undefined") {
      return this.license(this.rawPack.license);
    }

    return undefined;
  }
  // Set Property

  if (Array.isArray(value)) {
    if (licenseArrayValid(value)) {
      if (this.mode.strict) {
        // We need to ensure type
        switch(this.mode.license) {
          case "string": {
            // we need to convert from array of objects to string
            if (this.validate("license", value[0].type)) {
              this.normalizedPack.license = value[0].type;
              return this.normalizedPack.license;
            }
            throw new Error("Unable to convert from Array License to String License");
            return;
          }
          case "object": {
            // we need to convert from array to object
            if (this.validate("license.type", value[0].type) && this.validate("license.url", value[0].url)) {
              this.normalizedPack.license = {
                type: value[0].type,
                url: value[0].url
              };
              return this.normalizedPack.license;
            }
            // We can't set our type as expected.
            throw new Error("Unable to convert from Array License to Object License");
            return;
          }
          case "array": // No need to convert we already have array
          case "mirror": // Mirror source type
          default: {
            for (let i = 0; i < value.length; i++) {
              if (!this.validate("license.type", value[i].type || !this.validate("license.url", value[i].url))) {
                throw new Error("Array License contains invalid values");
                return;
              }
            }
            // We have looped the entire array and no failures. Set value
            this.normalizedPack.license = value;
            return this.normalizedPack.license;
          }
        }
      }
    }
    throw new Error("Array License is not valid!");
    return;
  }

  if (typeof value === "object") {
    if (licenseObjValid(value)) {
      if (this.mode.strict) {
        // We need to ensure type
        switch(this.mode.license) {
          case "string": {
            // we need to convert from Object to String
          }
          case "array": {
            // We need to convert from Object to Array
          }
          case "object": // No need to convert we already have object
          case "mirror": // Mirror intends to mirror whatever the source type is.
          default: {
            if (this.validate("license.type", value.type) && this.validate("license.url")) {
              this.normalizedPack.license = {
                type: value.type,
                url: value.url
              };
              return this.normalizedPack.license;
            }
          }
        }
      }

      // We don't care about type, but have a valid license object.
      if (this.validate("license.type", value.type) && this.validate("license.url")) {
        this.normalizedPack.license = {
          type: value.type,
          url: value.url
        };
      }
    }
    // invalid object passed.
    throw new Error("Object License is not valid!");
    return;
  }

  if (this.validate("license", value)) {
    this.normalizedPack.license = value;
    return;
  }

  throw new Error(`License is not valid: ${value}`);
  return;
}

function licenseObjValid(license) {
  if (typeof license === "object") {
    if (typeof license.type === "string" && typeof license.url === "string") {
      return true;
    }
    return false;
  }
  return false;
}

function licenseArrayValid(license) {
  if (Array.isArray(license)) {
    for (let i = 0; i < license.length; i++) {
      let tmp = licenseObjValid(license[i]);
      if (!tmp) {
        return tmp;
      }
    }
    return true;
  }
  return false;
}

module.exports = license;
