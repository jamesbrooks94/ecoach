import { useAuth } from 'use-auth0-hooks'
const Index = ({ ...page }) => {
  const { isAuthenticated, isLoading, accessToken, login, ...props } = useAuth({
    audience: 'https://api/tv-shows',
    scope: 'read:shows',
  })

  console.log(page, props)

  if (!isAuthenticated) {
    // props.logout({})
    return <div>You must first sign in.</div>
  }

  return <div>Hello World Next - Typescript - Express</div>
}

export default Index
