module.exports = function npmNameStartChar(value) {
  if (!value.startsWith("_") && !value.startsWith(".")) {
    return true;
  }
  return false;
}
