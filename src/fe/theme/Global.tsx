import React from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
const theme = createMuiTheme({
  overrides: {
    MuiCheckbox: {
      root: {
        margin: 0,
      },
    },
    MuiTable: {
      root: {
        '& a': {
          textDecoration: 'none',
        },
      },
    },
    MuiList: {
      padding: {
        paddingTop: 0,
      },
    },
    MuiTableCell: {
      root: {
        padding: 8,
      },
    },
  },
})

const Provider: React.FC = ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>

export default Provider
