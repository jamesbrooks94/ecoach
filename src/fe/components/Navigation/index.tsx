import React from 'react'
import { AppBar, Toolbar, Button, Container } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { logout } from 'fe/utils/auth0'
import urls from 'fe/urls'
import { useAuthContext } from 'fe/context/auth'
import { GET_CURRENT_TENANT } from 'fe/queries/application'
import { useQuery } from 'fe/utils/apollo'

const Navigation = () => {
  const { tenant } = useAuthContext()
  const {
    data: {
      application: { name },
    },
  } = useQuery(GET_CURRENT_TENANT, { variables: { tenant } }) as any
  console.log(name)
  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Button component={Link} to={urls.root} color="inherit">
            E-Coach - {name}
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
