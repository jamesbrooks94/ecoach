import auth0 from 'auth0-js'
import history from '../history'
// import Logger from 'utils/logger'

let tokenRenewalTimeout: any = () => {}
let expiresAt = 0
let auth0Client: auth0.WebAuth
let accessToken: string

export const init = async (config: any) => {
  auth0Client = new auth0.WebAuth({
    domain: config.REACT_APP_AUTH_DOMAIN,
    clientID: config.REACT_APP_AUTH_CLIENT_ID,
    redirectUri: `${window.location.origin}/callback`,
    audience: config.REACT_APP_AUDIENCE,
    responseType: 'token id_token',
    scope: 'openid profile email',
  })
}

export const getAccessToken = () => accessToken
export const isAuthenticated = () => !!accessToken
export const login = () => auth0Client.authorize()

export const handleAuthCallback = () => {
  if (/access_token|id_token|error/.test(window.location.hash)) {
    history.replace((window.location as any).referrer || '/')
  }
}

export const checkSession = async () => {
  return new Promise((resolve, reject) => {
    auth0Client.checkSession({}, (err, result) => {
      if (err) {
        login()
        return reject(new Error('No session'))
      }
      expiresAt = Date.now() + result.expiresIn
      accessToken = result.accessToken
      scheduleRenewal()
      return resolve(accessToken)
    })
  })
}

export const logout = () => {
  localStorage.clear()
  clearTimeout(tokenRenewalTimeout)
  auth0Client.logout({
    returnTo: window.location.origin,
  })
}

const scheduleRenewal = () => {
  if (expiresAt) {
    const delay = expiresAt - Date.now()
    if (delay > 0) {
      tokenRenewalTimeout = setTimeout(checkSession, 60 * 60 * 1000)
    }
  }
}
