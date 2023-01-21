module.exports = function genericVersion(value) {
  if (typeof value === "string") {
    return true;
  }
  return false;
}
