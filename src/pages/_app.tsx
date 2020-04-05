// import App from 'next/app'
import { Auth0Provider } from 'use-auth0-hooks'
import { initAuth0 } from '@auth0/nextjs-auth0'

const App = ({ Component, pageProps }) => {
  console.log(pageProps)
  return (
    <Auth0Provider
      domain={'sandrino-dev.auth0.com'}
      clientId={'9f6ClmBt37ZGCXNqToPbefKmzVBSOLa2'}
      redirectUri={'http://localhost:3000/'}
    >
      <Component {...pageProps} />
    </Auth0Provider>
  )
}

App.getInitialProps = async ({ Component, ctx }) => {
  console.log(Component)
  console.log(process.env.AUTH_DOMAIN)

  const auth0 = initAuth0({
    domain: process.env.AUTH_DOMAIN,
    clientId: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    scope: 'openid profile',
    redirectUri: 'http://localhost:3000/api/callback',
    postLogoutRedirectUri: 'http://localhost:3000/',
    session: {
      cookieSecret: 'some-very-very-very-very-very-very-very-very-long-secret',
      cookieLifetime: 60 * 60 * 8,
    },
  })
  console.log(auth0)
  return {
    pageProps: {
      auth0,
      env: {
        ...process.env,
      },
    },
  }
}

export default App
