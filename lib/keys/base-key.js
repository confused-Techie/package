class Key {
  constructor(val) {
    this.value = val;
  }

  get field() {
    return this.value;
  }

  set field(val) {
    this.value = val;
  }
}

module.exports = Key;
