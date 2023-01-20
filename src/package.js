const InvalidPropertyError = require("./errors/invalid_property_error.js");
const description = require("./keys/description.js");

// Resources:
// * https://wiki.commonjs.org/wiki/Packages/1.0
// * https://docs.npmjs.com/cli/v9/configuring-npm/package-json

// Potentially this class will provide easy support for interacting with a package.json
// file. Bundling all the common methods of interaction here to avoid code duplication.
// As well as uneasy error handling.

// This Class seemingly would also be very helpful for the frontend, and is now being designed
// as possibly becoming it's own module, if proven useful.

// NOTES: opts.pack is the raw package that can be passed.
// Other modifiers can be provided as other opts
// Additionally: (This doesn't match currenlty) - The getters should simply locate
// the most likely location of the property that will contain the data requested.
// The setter itself should be in charge of validations, and error throwing.
// In the case where a getter cannot find anything relevant, -1 should be returned.
//
// Since inception the format of this has changed about a dozen times.
// But current methodology seems it may be advantagious to instead of hardcoding
// checks for validity, not just for having a valid NPM service name
// But even for checking the validity of the object structure
// We should attempt to adopt a model similar to ESLint.
// Rule based checks. Now some rules can be required, or otherwise considered
// baseline, these can be what specifies things like proper object structure.
// But otherwise then each service can essentially be a collection of rules.
// This would allow someone to easily extend the service by defining an additional
// custom rule, or even allow users to enable and disable the specific rules they
// deem fit. Otherwise if a service mode is enabled, then that will also enable
// a subset of the rules that relate.
// Adopting a model like this will allow the complexity within this specific function to be low
// and will stick to a more logical format now that this is it's own module.
// Expanding the codebase beyond a single file.
// Since rather than a user having to create an entire plugin for a service, customized
// rules can be created, which can then hopefully be easily importing into a
// project using this module.
// Lastly we could then set levels on rules. Such as error or warn. Allowing recommendations
// from services to come through, which up until now have been ignored.
// This likely does mean the return from any specific function will have to be
// more complex, but this complexity can be obscured behind the PackageJSON class
// itself or exposed to users.
// Or even better can be retreived as their own object. Such as `PackageJSON.warnings()`
// The above relevation of utilizing BaseRule patterns for implementing object
// lookups becomes even more obvious when finding that some entries within
// the `package.json` conflict across specifications. Meaning that mode will not only
// have a `service` that can enable rulesets it will also need a `spec`
// that will specify what to use for field lookups
// Last note that should be made before being forgotten, any additional
// values placed in the constructor as Class Variables, must ensure
// to not have any collisions with actual package keys.
// This should likely be circumvented by utilizing `__` in front of values.
// Or possibly something even more verbose. But the line between collision secure
// and ease to type will have to be found.
// Additionally, we could have the parse function check for protected values to avoid
// accidental overriding.
class PackageJSON {
  constructor(opts) {
    this.rawPack = opts?.pack ?? {};

    this.normalizedPack = {};
    // normalizedMode will contain certain modes and settings to enforce.
    this.mode = {
      strict: opts?.mode?.strict ?? false, // strict Boolean will enforce strict adherance to specified service
      service: opts?.mode?.service ?? "npm", // service is the intended service for the package.json
      spec: opts?.mode?.spec ?? "npm",
      bug: opts?.mode?.bug ?? "string", // The Bug Mode used. Either Object or String is valid. Default can be used to stick with what's currently used.
    };
  }

  // Below we will define the standard Values that are supported as Getters and
  // as Setters
  // Each getter will always first check the normalizedPack for it's needed value.
  // Which if doesn't exist will work to find it in the rawPack.
  // Once found it will be added to the normalizedPack. Setters themselves
  // will only ever effect the normalizedPack. Ensuring we never overwrite
  // any part of the rawPack, in case it's needed again.

  name(value) {
    if (typeof value === "undefined") {
      // Asking for the property.
      if (typeof this.normalizedPack.name === "string") {
        return this.normalizedPack.name;
      }

      if (typeof this.rawPack.name === "string") {
        return this.name(this.rawPack.name);
      }

      // If we have reached this point then we know we can't find this value.
      // At this point we will return `undefined`
      return undefined;
    }
    // setting the property.
    if (this.mode.strict && typeof this.mode.service !== "undefined") {
      let valid = this.validateName(this.mode.service, value);

      if (valid.overall) {
        this.normalizedPack.name = value;
        return;
      }

      throw new InvalidPropertyError(`Name is not valid for ${this.mode.service}: ${valid.invalid}`);
      return;
    }

    // No Strict declared
    this.normalizedPack.name = value;
    return;
  }

  version(value) {
    if (typeof value === "undefined") {
      // Get property
      if (typeof this.normalizedPack.version === "string") {
        return this.normalizedPack.version;
      }

      if (typeof this.rawPack.version === "string") {
        return this.version(this.rawPack.version);
      }

      return undefined;
    }
    // Set property
    if (typeof value === "string") {
      this.normalizedPack.version = value;
      return;
    }

    throw new InvalidPropertyError(`Version is not a valid type: ${typeof value}`);
    return;
  }

  descriptionOLD(value) {
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
  }

  keywords(value) {
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

  homepage(value) {
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

  bugs(value) {
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

  license(value) {
    if (typeof value === "undefined") {
      // Get Property
    }
    // Set Property
  }

  author(value) {
    if (typeof value === "undefined") {
      // Get Property
    }
    // Set Property
  }

  contributors(value) {
    if (typeof value === "undefined") {
      // Get Property
    }
    // Set Property
  }

  /**
   * === VALIDATORS ===
   */
   validateName(service, value) {
     switch(service) {
       case "npm": {
         // This will ensure the package name meets the criteria of NPMJS
         // https://docs.npmjs.com/cli/v9/configuring-npm/package-json#name
         let name = value ?? this.name;
         let validArray = [];
         let invalidArray = [];

         let length = {
           status: false,
           msg: "Length of Name"
         };
         let characters = {
           status: false,
           msg: "Allowed Characters"
         };

         if (name.length === 214 || name.length < 214) {
           length.status = true;
           validArray.push(length.msg);
         }

         if (!name.startsWith("_") && !name.startsWith(".")) {
           characters.status = true;
           validArray.push(characters.msg);
         }

         // Check for uppercase & URL safe

        if (!length.status) {
          invalidArray.push(length.msg);
        }

        if (!characters.status) {
          invalidArray.push(characters.msg);
        }

        return {
          overall: (length.status && characters.status) ? true : false,
          valid: validArray,
          invalid: invalidArray
        };

       }
       default: {
         // Since we found no explicit matching service, we will return fine.
         return {
           overall: true,
           valid: [],
           invalid: []
         };
       }
     }
   }

   /**
    * === METHODS ===
    */
    parse(pack) {
      // parse() accepts an optional `pack`, which can be used if PackageJSON was
      // instiatied without passing any package data. In which case will be assigned
      // here then have the whole file parsed, if left out the package data passed
      // during class creation will be used. Erroring out if none is provided in either.

      if (typeof pack !== undefined) {
        this.rawPack = pack;
      }

      if (typeof this.rawPack === undefined) {
        throw new Error("Raw PackageJSON Data never provided");
        return;
      }

      for (const key in this.rawPack) {

        if (typeof this[key] === "function") {
          // We know we support this specific item.
          this[key](this.rawPack[key]);
        }
        // There is no baked in support for this value. Append to normalizedPack
        this.normalizedPack[key] = this.rawPack[key];
      }

      return this.normalizedPack;
    }

}

// To assign our imported Keys functions, this must be done to the object prototype 
PackageJSON.prototype.description = description;

module.exports = PackageJSON;
