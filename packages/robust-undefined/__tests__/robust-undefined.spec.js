import { suite, it, expect } from 'vitest'
import VOID from '../index'

suite('robust undefined', () => {
  it('should be undefined', () => {
    expect(VOID).toBeUndefined()
  })
})
