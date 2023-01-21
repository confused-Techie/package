const InvalidPropertyError = require("./errors/invalid_property_error.js");
const description = require("./keys/description.js");
const name = require("./keys/name.js");
const version = require("./keys/version.js");
const keywords = require("./keys/keywords.js");
const homepage = require("./keys/homepage.js");
const bugs = require("./keys/bugs.js");
const license = require("./keys/license.js");
const author = require("./keys/author.js");
const contributors = require("./keys/contributors.js");

// Import RuleSets
const genericRuleSet = require("./ruleSets/generic.js");
const npmRuleSet = require("./ruleSets/npm.js");

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

// If strict is set, with a specific key mode, then that mode will be forced.
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
      license: opts?.mode?.license ?? "mirror", // Mirror, Object, String, Array
      rules: [],
    };

    let localRuleSets = [];

    // Now assign the ruleset
    switch(this.mode.service) {
      // We will look for the service in use, and assign the relevant ruleSet
      case "npm":
        localRuleSets.push(genericRuleSet);
        localRuleSets.push(npmRuleSet);
        break;
      default:
        break;
    }

    for (let ruleSet = 0; ruleSet < localRuleSets.length; ruleSet++) {
      for (let rule = 0; rule < localRuleSets[ruleSet].length; rule++) {
        // Custom ignores would occur here.
        this.mode.rules.push(localRuleSets[ruleSet][rule]);
      }
    }

  }

  // Below we will define the standard Values that are supported as Getters and
  // as Setters
  // Each getter will always first check the normalizedPack for it's needed value.
  // Which if doesn't exist will work to find it in the rawPack.
  // Once found it will be added to the normalizedPack. Setters themselves
  // will only ever effect the normalizedPack. Ensuring we never overwrite
  // any part of the rawPack, in case it's needed again.

  /**
   * === VALIDATORS ===
   */

   validate(key, value) {
     for (let i = 0; i < this.mode.rules.length; i++) {
       if (this.mode.rules[i].key === key) {
         let test = require(this.mode.rules[i].path)(value);
         if (!test) {
           return false;
         }
       }
     }
     return true;
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

      // Now prior to returning, lets check our package rules
      if (this.validate("*", this.normalizedPack)) {
        return this.normalizedPack;
      }
      throw new Error("Invalid Package.json");
      return;
    }

}

// To assign our imported Keys functions, this must be done to the object prototype
PackageJSON.prototype.name = name;
PackageJSON.prototype.description = description;
PackageJSON.prototype.version = version;
PackageJSON.prototype.keywords = keywords;
PackageJSON.prototype.homepage = homepage;
PackageJSON.prototype.bugs = bugs;
//PackageJSON.prototype.license = license;
//PackageJSON.prototype.author = author;
//PackageJSON.prototype.contributors = contributors;

module.exports = PackageJSON;
