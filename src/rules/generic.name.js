module.exports = function genericName(value) {
  if (typeof value === "string") {
    return true;
  }
  return false;
}
