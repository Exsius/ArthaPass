import { Link } from 'react-router-dom';
import { useAuth } from '../Context/UserContext.js';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const Navbar = () => {

    const { user } = useAuth()

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static'>
                <Toolbar>
                    <Button
                    startIcon={<CalendarMonthIcon />}
                    color='inherit'
                    component={Link}
                    to='/'
                    >
                        Calender
                    </Button>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button
                    color='inherit'
                    component={Link}
                    to={user ? '/logout' : '/login'}
                    >
                        {user ? 'Logout' : 'Login'}
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar