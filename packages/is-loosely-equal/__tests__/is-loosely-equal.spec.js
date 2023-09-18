// @vitest-environment jsdom
import { expect, it, suite } from 'vitest'
import { isLooselyEqual } from '../index'

suite('7.2.14 IsLooselyEqual(x,y)', () => {
  suite('1. If Type(x) is Type(y), then return IsStrictlyEqual(x, y).', () => {
    it.each([
      { x: Number.NaN, y: Number.NaN },
      { x: 347, y: 347 },
      { x: null, y: null },
      { x: null, y: Object.create(null) },
      { x: void 0, y: void 0 },
      { x: true, y: true },
      { x: true, y: false },
      { x: '', y: '' },
      { x: '', y: 'hello world' },
      { x: Symbol.for(''), y: Symbol.for('') },
      { x: Symbol(''), y: Symbol('') },
      { x: 0n, y: 0n },
      { x: 0n, y: 996n },
      { x: Object.create(null), y: Object.create(null) },
      { x: globalThis.Object, y: globalThis.Object },
    ])('%#. If Type($x) is Type($y), then return IsStrictlyEqual($x, $y).', ({ x, y }) => {
      expect(isLooselyEqual(x, y)).toBe(x == y)
      expect(isLooselyEqual(x, y)).toBe(x === y)
    })
  })

  it('2. If x is null and y is undefined, return true.', () => {
    const [x, y] = [null]

    expect(isLooselyEqual(x, y)).toBe(x == y)
    expect(isLooselyEqual(x, y)).toBe(true)
  })

  it('3. If x is undefined and y is null, return true.', () => {
    const [y, x] = [null]

    expect(isLooselyEqual(x, y)).toBe(x == y)
    expect(isLooselyEqual(x, y)).toBe(true)
  })

  suite.skip('4. NOTE: This step is replaced in section B.3.6.2.', () => {
    it.each([
      { x: document.all, y: void 0 },
      { x: document.all, y: null },
    ])('a-%#. If x is an Object, x has an [[IsHTMLDDA]] internal slot, and y is $y, return true.', ({ x, y }) => {
      expect(isLooselyEqual(x, y)).toBe(x == y)
      expect(isLooselyEqual(x, y)).toBe(true)
    })

    it.each([
      { x: void 0, y: document.all },
      { x: null, y: document.all },
    ])('b-%#. If x is $x, y is an Object, and y has an [[IsHTMLDDA]] internal slot, return true.', ({ x, y }) => {
      expect(isLooselyEqual(x, y)).toBe(x == y)
      expect(isLooselyEqual(x, y)).toBe(true)
    })
  })

  suite('5. If x is a Number and y is a String, return IsLooselyEqual(x, ToNumber(y)).', () => {
    it.each([
      { x: 347, y: '996' },
      { x: 996, y: '996' },
    ])('%#. If x is a $x and y is a $y, return IsLooselyEqual($x, ToNumber($y)).', ({ x, y }) => {
      expect(isLooselyEqual(x, y)).toBe(x == y)
      expect(isLooselyEqual(x, y)).toBe(isLooselyEqual(x, +y))
    })
  })

  suite('6. If x is a String and y is a Number, return IsLooselyEqual(ToNumber(x), y).', () => {
    it.each([
      { y: 347, x: '996' },
      { y: 996, x: '996' },
    ])('%#. If x is a $x and y is a $y, return IsLooselyEqual(ToNumber($x), $y).', ({ x, y }) => {
      expect(isLooselyEqual(x, y)).toBe(x == y)
      expect(isLooselyEqual(x, y)).toBe(isLooselyEqual(+x, y))
    })
  })

  suite('7. If x is a BigInt and y is a String, then a. Let n be StringToBigInt(y).', () => {
    it('b. If n is undefined, return false.', () => {
      const [x, y] = [996n, '996n']

      expect(isLooselyEqual(x, y)).toBe(x == y)
      expect(isLooselyEqual(x, y)).toBe(false)
    })

    it.each([
      { x: 996n, y: '347' },
      { x: 996n, y: '996' },
    ])('c-%#. Return IsLooselyEqual($x, n).', ({ x, y }) => {
      const n = BigInt(y)

      expect(isLooselyEqual(x, n)).toBe(x == n)
      expect(isLooselyEqual(x, y)).toBe(isLooselyEqual(x, n))
    })
  })

  suite('8. If x is a String and y is a BigInt, return IsLooselyEqual(y, x).', () => {
    it.each([
      { y: 996n, x: '347' },
      { y: 996n, x: '996' },
      { y: 996n, x: '996n' },
    ])('8-%#. If x is a $x and y is a $y, return IsLooselyEqual(%y, x).', ({ x, y }) => {
      expect(isLooselyEqual(x, y)).toBe(x == y)
      expect(isLooselyEqual(x, y)).toBe(isLooselyEqual(y, x))
    })
  })

  suite('9. If x is a Boolean, return IsLooselyEqual(ToNumber(x), y).', () => {
    it.each([
      { x: true, y: 996 },
      { x: true, y: 0 },
      { x: false, y: 996 },
      { x: false, y: 0 },
    ])('9-%#. If x is $x, return IsLooselyEqual(ToNumber($x), $y).', ({ x, y }) => {
      expect(isLooselyEqual(x, y)).toBe(x == y)
      expect(isLooselyEqual(x, y)).toBe(isLooselyEqual(+x, y))
    })
  })

  suite('10. If y is a Boolean, return IsLooselyEqual(x, ToNumber(y)).', () => {
    it.each([
      { y: true, x: 996 },
      { y: true, x: 0 },
      { y: false, x: 996 },
      { y: false, x: 0 },
    ])('10. If y is $y, return IsLooselyEqual($x, ToNumber($y)).', ({ x, y }) => {
      expect(isLooselyEqual(x, y)).toBe(x == y)
      expect(isLooselyEqual(x, y)).toBe(isLooselyEqual(x, +y))
    })
  })

  suite('11. If x is either a String, a Number, a BigInt, or a Symbol and y is an Object, return IsLooselyEqual(x, ToPrimitive(y)).', () => {
    it.each([
      { y: [], x: 0 },
      { y: [], x: 347 },
      { y: [], x: 0n },
      { y: [], x: 996n },
      { y: [], x: '' },
      { y: [], x: '347' },
      { y: [], x: Symbol('') },
    ])('11-%#. If x is $x and y is $y, return IsLooselyEqual($x, ToPrimitive($y)).', ({ x, y }) => {
      expect(isLooselyEqual(x, y)).toBe(x == y)
      expect(isLooselyEqual(x, y)).toBe(isLooselyEqual(x, y.toString()))
    })
  })

  suite('12. If x is an Object and y is either a String, a Number, a BigInt, or a Symbol, return IsLooselyEqual(ToPrimitive(x), y).', () => {
    it.each([
      { x: [], y: 0 },
      { x: [], y: 347 },
      { x: [], y: 0n },
      { x: [], y: 996n },
      { x: [], y: '' },
      { x: [], y: '347' },
      { x: [], y: Symbol('') },
    ])('12-%#. If x is $x and y is $y, return IsLooselyEqual(ToPrimitive($x), $y).', ({ x, y }) => {
      expect(isLooselyEqual(x, y)).toBe(x == y)
      expect(isLooselyEqual(x, y)).toBe(isLooselyEqual(x.toString(), y))
    })
  })

  suite('13. If x is a BigInt and y is a Number, or if x is a Number and y is a BigInt, then', () => {
    suite('a. If x is not finite or y is not finite, return false.', () => {
      it.each([
        { x: 996n, y: Number.NEGATIVE_INFINITY },
        { x: 996n, y: Number.POSITIVE_INFINITY },
        { y: 996n, x: Number.POSITIVE_INFINITY },
        { y: 996n, x: Number.NEGATIVE_INFINITY },
      ])('a-%#. If x is $x and y is $y, return false.', ({ x, y }) => {
        expect(isLooselyEqual(x, y)).toBe(x == y)
        expect(isLooselyEqual(x, y)).toBe(false)
      })
    })

    suite('b. If ℝ(x) = ℝ(y), return true; otherwise return false.', () => {
      it.each([
        { x: 996n, y: 996 },
        { x: 996n, y: 347 },
        { y: 996n, x: 996 },
        { y: 996n, x: 347 },
      ])('b-%#. If ℝ($x) = ℝ($y), return true; otherwise return false.', ({ x, y }) => {
        expect(isLooselyEqual(x, y)).toBe(x == y)
      })
    })
  })

  suite('14. Return false.', () => {
    suite('If x is a Nullish and y is a Non-Nullish, or if x is a Non-Nullish and y is a Nullish, return false.', () => {
      it.each([
        { x: void 0, y: 0 },
        { x: void 0, y: 0n },
        { x: void 0, y: '' },
        { x: void 0, y: Symbol('') },
        { x: void 0, y: Object.create(null) },
        { x: null, y: 0 },
        { x: null, y: 0n },
        { x: null, y: '' },
        { x: null, y: Symbol('') },
        { y: void 0, x: 0 },
        { y: void 0, x: 0n },
        { y: void 0, x: '' },
        { y: void 0, x: Symbol('') },
        { y: void 0, x: Object.create(null) },
        { y: null, x: 0 },
        { y: null, x: 0n },
        { y: null, x: '' },
        { y: null, x: Symbol('') },
      ])('%#. If x is $x and y is $y, return false.', ({ x, y }) => {
        expect(isLooselyEqual(x, y)).toBe(x == y)
        expect(isLooselyEqual(x, y)).toBe(false)
      })
    })

    suite('If x is either a String, a Number, a BigInt and y is a Symbol, or if x is a Symbol and y is either a String, a Number, a BigInt, return false.', () => {
      it.each([
        { y: Symbol(''), x: 347 },
        { y: Symbol(''), x: '' },
        { y: Symbol(''), x: 996n },
        { x: Symbol(''), y: 347 },
        { x: Symbol(''), y: '' },
        { x: Symbol(''), y: 996n },
      ])('%#. If x is $x and y is $y, return false.', ({ x, y }) => {
        expect(isLooselyEqual(x, y)).toBe(x == y)
        expect(isLooselyEqual(x, y)).toBe(false)
      })
    })
  })
})
