import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import routeConfig from './routeConfig/index'

export const Routes = withRouter(() => {
  return (
    <>
      <Switch>
        {Object.entries(routeConfig).map(([path, Component]) => (
          <Route key={path} exact path={path} component={Component as any} />
        ))}
      </Switch>
      {/* </ErrorBoundary> */}
    </>
  )
})
