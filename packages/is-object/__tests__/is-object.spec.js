import { expect, it, suite } from 'vitest'
import { isObject } from '../../is-object'

suite('isObject()', () => {
  it('Naked Object is an object', () => {
    expect(isObject(Object.create(null))).toBe(true)
  })

  it('Object.prototype is an object', () => {
    expect(isObject(Object.prototype)).toBe(true)
  })

  it('[] is an object', () => {
    expect(isObject([])).toBe(true)
  })

  it('Set is an object', () => {
    expect(isObject((new Set))).toBe(true)
  })

  it('Function is an object', () => {
    expect(isObject(() => {})).toBe(true)
  })
})
