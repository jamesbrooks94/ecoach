import React from 'react'
import { ApolloProvider } from 'react-apollo'
import ReactDOM from 'react-dom'
import { initialiseConfigContext } from './context/config'
import getClient from './utils/apollo/client'
import { initialiseAuthContext, AuthContext } from './context/auth'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { Router } from 'react-router-dom'
import history from './utils/history'
import { Routes } from './pages/Routes'
import { SnackbarProvider } from 'notistack'

const renderApp = async (config: any) => {
  initialiseConfigContext(config)
  await initialiseAuthContext()
  console.log(AuthContext)

  const client = await getClient()

  ReactDOM.render(
    <ApolloProvider client={client}>
      <Router history={history}>
        <SnackbarProvider
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          maxSnack={3}
        >
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Routes />
          </MuiPickersUtilsProvider>
        </SnackbarProvider>
      </Router>
    </ApolloProvider>,
    document.getElementById('root')
  )
}

export default renderApp
