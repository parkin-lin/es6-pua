import { expect, it, suite } from 'vitest'
import { isJSONObject } from '../../is-object'

suite('isJSONObject()', () => {
  it('Naked Object is a JSON object', () => {
    expect(isJSONObject(Object.create(null))).toBe(true)
  })

  it('Object.prototype is a JSON object', () => {
    expect(isJSONObject(Object.prototype)).toBe(true)
  })

  it('[] is a JSON object', () => {
    expect(isJSONObject([])).toBe(true)
  })

  it('Set is a JSON-compliant object', () => {
    expect(isJSONObject((new Set))).toBe(true)
  })

  it('Function is not a JSON-compliant object', () => {
    expect(isJSONObject(() => {})).toBe(false)
  })
})
