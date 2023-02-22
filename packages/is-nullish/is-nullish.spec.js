import { suite, it, expect } from 'vitest'
import isNullish from './index'

suite('isNullish() API', () => {
  it('null is nullish', () => {
    expect(isNullish(null)).toBe(true)
  })

  it('undefined is nullish', () => {
    expect(isNullish()).toBe(true)
  })

  it('Falsy is not nullish', () => {
    expect(isNullish(0)).toBe(false)
  })
})
