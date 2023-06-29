const keyClasses = [
  require("./keys/author.js")
];

// A simple reimaging of what this repo could look like.
// With a new found focus on simplicity.

class Package {
  constructor(opts = {}) {
    this.rawPack = opts.pack ?? {};

    this.unmatchedKeys = [];
    this.duplicateKeys = [];

    this.parse();
  }

  parse(pack) {
    let workingPack = pack ?? this.rawPack;

    let workingPackKeys = Object.keys(workingPack);

    for (let i = 0; i < workingPackKeys.length; i++) {
      let keyClass = findKeyClassForKey(workingPackKeys[i]);

      if (keyClass === -1) {
        this.unmatchedKeys.push(workingPackKeys[i]);
        continue;
      }

      if (this[keyClass.fieldName]) {
        this.duplicateKeys.push(workingPackKeys[i]);
        continue;
      }

      this[keyClass.fieldName] = new keyClass(workingPack[workingPackKeys[i]]);
    }

  }

}

function findKeyClassForKey(key) {
  for (let i = 0; i < keyClasses.length; i++) {
    if (keyClasses[i].validateKey(key)) {
      return keyClasses[i];
    }
  }

  return -1;
}

module.exports = Package;
