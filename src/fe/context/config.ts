import React from 'react'

export let ConfigContext: any

export const initStubConfigContext = () => {
  ConfigContext = React.createContext({
    REACT_APP_FILE_BUCKET: '/',
    REACT_APP_POLL_INTERVAL_SECONDS: 120,
  })
}

export const initialiseConfigContext = async (config: any) => {
  ConfigContext = React.createContext({ ...config })

  return ConfigContext
}
