
function genericDescription(value) {
  if (typeof value === "string") {
    return true;
  }
  return false;
}

module.exports = genericDescription;
