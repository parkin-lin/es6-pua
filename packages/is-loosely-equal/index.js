const isUndefined = $ => typeof $ === 'undefined'
const isNumber = $ => typeof $ === 'number'
const isString = $ => typeof $ === 'string'
const isBigInt = $ => typeof $ === 'bigint'
const isBoolean = $ => typeof $ === 'boolean'
const isObject = $ => typeof $ === 'object' && $ !== null
const isSymbol = $ => typeof $ === 'symbol'

/**
 * The abstract operation IsLooselyEqual provides the semantics for the == operator.
 * isLooselyEqual(x, y) -> (x == y)
 * https://tc39.es/ecma262/#sec-islooselyequal
 * @param {*} x - An ECMAScript language value
 * @param {*} y - An ECMAScript language value
 * @returns {boolean} return the same result as looselyEqual operator's
 */
const isLooselyEqual = (x, y) => {
  if (typeof x === typeof y)
    return x === y

  if (x === null && isUndefined(y))
    return true
  if (isUndefined(x) && y === null)
    return true

  // handle document.all
  if ((isUndefined(x) && x instanceof Object)
    && (isUndefined(y) || y === null)
  ) return true

  if ((isUndefined(x) || x === null)
    && (isUndefined(y) && y instanceof Object)
  ) return true

  if (isNumber(x) && isString(y))
    return isLooselyEqual(x, +y)
  if (isNumber(y) && isString(x))
    return isLooselyEqual(+x, y)

  if (isBigInt(x) && isString(y)) {
    let n
    try {
      n = BigInt(y)
    }
    catch {
      return false
    }
    return isLooselyEqual(x, n)
  }

  if (isBigInt(y) && isString(x))
    return isLooselyEqual(y, x)

  if (isBoolean(x))
    return isLooselyEqual(+x, y)
  if (isBoolean(y))
    return isLooselyEqual(x, +y)

  if ((isString(x) || isNumber(x) || isBigInt(x) || isSymbol(x))
    && isObject(y)
  ) return isLooselyEqual(x, y.toString())

  if ((isString(y) || isNumber(y) || isBigInt(y) || isSymbol(y))
    && isObject(x)
  ) return isLooselyEqual(x.toString(), y)

  if ((isBigInt(x) && isNumber(y))
    || (isNumber(x) && isBigInt(y))
  ) {
    return (
      x !== Number.POSITIVE_INFINITY
      && x !== Number.NEGATIVE_INFINITY
      && y !== Number.POSITIVE_INFINITY
      && y !== Number.NEGATIVE_INFINITY
    ) && (Number(x) === Number(y))
  }

  return false
}

export { isLooselyEqual }
