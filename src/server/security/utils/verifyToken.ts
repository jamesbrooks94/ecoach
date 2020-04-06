import { verify } from 'jsonwebtoken'

export const verifyToken = (token: string, jwksKey: string) =>
  new Promise((resolve, reject) => {
    verify(token, jwksKey, { complete: true }, err => {
      if (err) {
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
