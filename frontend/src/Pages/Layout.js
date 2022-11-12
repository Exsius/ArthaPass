import { Outlet } from 'react-router-dom'

import { blueGrey } from '@mui/material/colors'
import { ThemeProvider, createTheme } from '@mui/material/styles'

import Navbar from '../Components/Navbar.js'
import { Toolbar } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: {
      main: blueGrey[500],
    },
    secondary: {
      main: blueGrey[700],
    },
    secondarydark: {
      main: blueGrey[900],
    },
    base: {
      main: blueGrey[200],
    },
    neutral: {
      main: "#ffff"
    }
  },
})

const Layout = () => {
    return (
        <>
        <ThemeProvider theme={theme}>
            <Navbar />
            <Outlet />
        </ThemeProvider>
        </>
    )
}

export default Layout