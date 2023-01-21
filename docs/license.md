Quick notes

A valid license has three modes:
  * mirror
  * array
  * string
  * object

When converting:
  * array -> object: The first value in the array is used to construct the object
  * array -> string: The first value in the array key `type` is used
  * object -> array: The object is item as the first instance in the array.
  * object -> string: The key `type` is used

Setting config for license key.

  * mirror: Uses whatever it was passed
  * object: Ensures to always set to an object
  * array: Ensures to always set to an array of objects
  * string: Ensures to always set to a string.
