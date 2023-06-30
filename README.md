# package

### `package` is all about parsing a `package.json`.

The `package` module allows abstraction away from dealing directly with any `package.json` files you may encounter.

Instead of making your code worry about checking data types, checking for backwards compatible declarations, optional `object` or `string` declarations of `package.json` key value pairs, `package` can be used to instead worry about making your code work rather than how a user wrote their `package.json`.

The intent of `package` is to provide an easy interface to any possible value of a `package.json` across ecosystems, and platforms. Supporting the values you care about, providing validators to those special fields, and being able to translate each method of declaration for values.

---

As of the newest revisions, this package is still very off from being completed.

But essentially, the goal of `package` is to help read and understand a `package.json` while supporting some mutations.
Overall, though in most instances any changes to the underlying `package.json` will be as minimal as possible
