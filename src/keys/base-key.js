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

  // Validation Helper Functions

  isBoolean() {
    return typeof this.value === "boolean";
  }

  isString() {
    return typeof this.value === "string";
  }

  isNumber() {
    return typeof this.value === "number";
  }

  isStringArray() {
    if (Array.isArray(this.value)) {
      let tmpRes = true;
      for (let i = 0; i < this.value.length; i++) {
        if (typeof this.value[i] !== "string") {
          tmpRes = false;
        }
      }
      return tmpRes;
    } else {
      return false;
    }
  }
  
}

module.exports = Key;
