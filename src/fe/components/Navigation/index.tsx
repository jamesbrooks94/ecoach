import React from 'react'
import { AppBar, Toolbar, Button, Container } from '@material-ui/core'
import { useAuthContext } from 'fe/context/auth'
import { Link } from 'react-router-dom'
import { logout } from 'fe/utils/auth0'
import urls from 'fe/urls'
const Navigation = () => {
  const x = useAuthContext()
  console.log(x)
  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Button component={Link} to={urls.root} color="inherit">
            E-Coach
          </Button>
          <Button component={Link} to={urls.lessons.list} color="inherit">
            Lessons
          </Button>
          <Button color="inherit" onClick={() => logout()}>
            Logout
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navigation
