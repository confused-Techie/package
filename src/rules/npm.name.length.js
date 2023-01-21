function npmNameLength(value) {
  if (value.length === 214 || value.length < 214) {
    return true;
  }
  return false;
}

module.exports = npmNameLength;
