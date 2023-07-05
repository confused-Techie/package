class NullKey {
  static fieldName = "null-key";

  constructor(val) {
    this.value = null;
  }

  get field() {
    return null;
  }

  set field(val) {
    this.value = null;
  }

  validate(service) {
    return false;
  }
}

module.exports = NullKey;
