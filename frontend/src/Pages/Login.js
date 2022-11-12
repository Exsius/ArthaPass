import { useNavigate } from 'react-router-dom'
import { Alert, Button, Grow, Paper, Stack, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useState } from "react"
import { useAuth } from '../Context/UserContext.js'

const Login = () => {

    const navigate = useNavigate()

    const { login, register } = useAuth()

    const [error, setError] = useState()

    const handleLogin = async (event) => {
        event.preventDefault()
        const { username, password } = document.forms[0]
        try {
            await login(username.value, password.value)
            navigate('/')
        } catch (err) {
            setError(err)
        }
    }

    return (
        <>
            <Grow 
            in={error}
            >
                <Alert severity="error" sx={{ my: 2, mx: 'auto', maxWidth: 385 }}>{error}</Alert>
            </Grow>
            <Paper
            sx={{ maxWidth: 350, mx: 'auto', my: 2, p: 4 }}
            >
                <AccountCircleIcon
                color='primary'
                fontSize='large'
                sx={{ width: '100%' }}
                />
                <Typography 
                variant='h6'
                color='primary.main'
                sx={{ pb: 3, width: '100%', textAlign: 'center' }}
                >
                    LOGIN
                </Typography>
                <form onSubmit={handleLogin}>
                    <Stack spacing={3}>
                        <TextField
                            required
                            id="outlined-required"
                            name="username"
                            label="Email"
                            type="email"
                            fullWidth
                        />
                        <TextField
                            required
                            id="outlined-required"
                            name="password"
                            label="Password"
                            type="password"
                            fullWidth
                        />
                        <Button 
                        type='submit'
                        variant='contained'
                        fullWidth
                        >
                            LOGIN
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </>
    )
}

export default Login