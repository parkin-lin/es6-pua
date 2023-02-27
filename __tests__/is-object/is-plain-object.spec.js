import { suite, it, expect } from 'vitest'
import { isPlainObject } from '@/is-object'

suite('isPlainObject()', () => {
  it('Naked Object is a plain object', () => {
    expect(isPlainObject(Object.create(null))).toBe(true)
  })

  it('Object.prototype is a plain object', () => {
    expect(isPlainObject(Object.prototype)).toBe(true)
  })

  it('[] is a not plain object', () => {
    expect(isPlainObject([])).toBe(false)
  })

  it('Set is a not plain object', () => {
    expect(isPlainObject(new Set())).toBe(false)
  })

  it('Function is not a plain object', () => {
    expect(isPlainObject(() => {})).toBe(false)
  })
})
