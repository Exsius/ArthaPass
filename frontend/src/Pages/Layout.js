import { Outlet, useParams } from 'react-router-dom'

import { blueGrey, green, blue, amber } from '@mui/material/colors'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useAuth } from '../Context/UserContext.js'

import { Navbar } from '../Components/Navbar.js'

const theme = createTheme({
  palette: {
    // mode: 'dark',
    primary: {
      main: '#FFC100',
    },
    secondary: {
      main: '#84b59d',
    },
    secondarydark: {
      main: '#FFFFFF',
    },
    base: {
      main: '#32283e',
    },
    neutral: {
      main: '#FFFFFF',
    },
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
         borderRadius: '8px'
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
         borderRadius: '8px'
        },
      },
    },
    // MuiTableRow: {
    //   styleOverrides: {
    //     root: {
    //      borderStyle: 'none'
    //     },
    //   },
    // },
    MuiAccordion: {
      styleOverrides: {
        root: {
         borderRadius: '8px',
         position: 'static',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '8px'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '8px'
        }
      }
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          borderRadius: '8px'
        }
      }
    }
  },
})

const Layout = (props) => {

    const { setParams } = useAuth()
    const { token, id } = useParams()
    setParams(useParams())

    return (
        <>
        <ThemeProvider theme={theme}>
            <Navbar token={token}>
                <Outlet />
            </Navbar>
        </ThemeProvider>
        </>
    )
}

export default Layout