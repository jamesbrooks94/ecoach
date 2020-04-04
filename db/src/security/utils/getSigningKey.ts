import { SigningKey, CertSigningKey, RsaSigningKey } from 'jwks-rsa'

const isCertSigningKey = (object: SigningKey): object is CertSigningKey => 'publicKey' in object
const isRsaSigningKey = (object: SigningKey): object is RsaSigningKey => 'rsaPublicKey' in object
export const getSigningKey = (key: SigningKey): string =>
  isCertSigningKey(key) ? key.publicKey : isRsaSigningKey(key) ? key.rsaPublicKey : ''
