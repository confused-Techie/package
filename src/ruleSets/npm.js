// Exports the set of Rules for NPM

module.exports = [
  {
    name: "npm.name.length",
    type: "problem",
    key: "name",
    path: "./rules/npm.name.length.js"
  },
  {
    name: "npm.name.startchar",
    type: "problem",
    key: "name",
    path: "./rules/npm.name.startchar.js"
  },
  {
    name: "npm.*.requiredkeys",
    type: "problem",
    key: "*",
    path: "./rules/npm.-.requiredkeys.js"
  }
];
