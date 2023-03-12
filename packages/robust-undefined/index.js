/**
 * DIY a robust shared undefined constants with ESM.
 * Because undefined isn't neither a ReservedWord nor a Literal,
 * which is a IdentifierName that can be used as an Identifier.
 * Identifier undefined may shadow globalThis.undefined.
 */
const VOID$1 = globalThis.undefined || null?._ || (() => {})()
const [VOID$2] = []
const { VOID$3 } = {}

const VOID = void undefined

export { VOID as default, VOID, VOID$1, VOID$2, VOID$3 }
