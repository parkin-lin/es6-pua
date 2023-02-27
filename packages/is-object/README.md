# `isObject()`

## Best Practices

### Vue.js

- [isObject()](https://github.com/vuejs/core/blob/main/packages/shared/src/index.ts)
- [isPlainObject()](https://github.com/vuejs/core/blob/main/packages/shared/src/index.ts)

## Think Different

- [x] `Object.prototype.toString()`
- [x] `typeof`
- [ ] ~~`instanceof`~~
- [ ] ~~`Object.prototype.isPrototypeOf()`~~
- [ ] ~~`Object.prototype.getPrototypeOf()/__proto__`~~
- [ ] ~~`constructor`~~

## Edge Cases

- [x] `typeof null === 'object'`
- [x] `null` vs `undefined`
- [x] Naked Object
- [x] `Object.prototype`

## Read More

- [JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)
- [The structured clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm)

## Challenges

- [ ] `isPlainJSONObject()` (only support for JSONObject & JSONArray)
- [ ] `isStructuredObject()` (support for `structuredClone()`)
