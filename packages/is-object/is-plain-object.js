const { toString } = Object.prototype

export default value => Reflect.apply(toString, value, []) === `[object Object]`
