/* eslint-disable no-shadow-restricted-names */
import { suite, it, expect } from 'vitest'
import VOID from '../index'

suite('Magic undefined', () => {
  it('Magic undefined', () => {
    const [OOPS, undefined = OOPS, cat = undefined] = ['OOPS!']

    expect(undefined).toBe(OOPS)

    expect(cat).toBe(undefined)
    expect(cat).not.toBeUndefined()
  })
})

suite('robust undefined', () => {
  it('should be undefined', () => {
    expect(VOID).toBeUndefined()
  })

  it('globalThis.undefined', () => {
    expect(VOID).toBeUndefined()
    expect(VOID === globalThis.undefined).toBe(true)
  })
})
