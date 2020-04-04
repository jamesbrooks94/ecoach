import { decode } from 'jsonwebtoken'

export const getTokenInfo = (token: string): { kid: string; uid: string } => {
  const decodedToken = decode(token, { complete: true })
  const kid: string =
    decodedToken &&
    typeof decodedToken === 'object' &&
    decodedToken.header &&
    decodedToken.header.kid
      ? decodedToken.header.kid
      : ''
  const uid: string =
    decodedToken &&
    typeof decodedToken === 'object' &&
    decodedToken.payload &&
    decodedToken.payload.sub
      ? decodedToken.payload.sub
      : ''

  return { kid, uid }
}
