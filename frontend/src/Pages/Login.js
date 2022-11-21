import { useState, useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/UserContext.js';

import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grow from '@mui/material/Grow';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';
import isEmail from 'validator/lib/isEmail';

import LockIcon from '@mui/icons-material/LockRounded';
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded';

import { Panel } from '../Components/Panel.js';

function TabPanel(props) {
    const { children, value, index, ...other } = props

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        >
            {value === index && (
                <div>{children}</div>
            )}
        </div>
    )
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
}

const Login = () => {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [tab, changeTab] = useState(0)
    const [error, setError] = useState(false)
    const [errormsg, updateErrormsg] = useState("undefined")

    const { login, register } = useAuth()

    useEffect(() => {
        if (error) { setError(false) }
    }, [tab])

    const handleLogin = async (event) => {
        event.preventDefault()
        setLoading(true)
        setError(false)
        const { username, password } = document.forms[0]

        if (isEmail(username.value)) {
            const result = await login(username.value, password.value)
            if (result) {
                setLoading(false)
                updateErrormsg(result)
                setError(true)
            } else {
                navigate('/dashboard')
            }
        } else {
            setLoading(false)
            updateErrormsg("Email is not a valid email.")
            setError(true)
        }

    }

    const handleRegister = async (event) => {

        setError(false)
        setLoading(true)
        event.preventDefault()
        const { fname, lname, username, password, rpassword } = document.forms[0]

        if (password.value === rpassword.value) {
            if (isEmail(username.value)) {

                const result = await register(fname, lname, username, password)

                if (result.success) {
                    changeTab(0)
                    setLoading(false)
                } else if (result.error) {
                    setLoading(false)
                    updateErrormsg(result.error)
                    setError(true)
                }
            } else {
                setLoading(false)
                updateErrormsg("Email is not valid email.")
                setError(true)
            }

        } else {
            setLoading(false)
            updateErrormsg("password and repeated password does not match.")
            setError(true)
        }

    }

    return(
        <div>
            <TabPanel value={tab} index={0}>
                <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
                >
                    <Box sx={{width: 300}}>
                        <Grow 
                        in={error}
                        >
                            <Alert severity="error" sx={{mb: 2}}>{errormsg}</Alert>
                        </Grow>
                        <Grow
                            in={tab === 0}
                        >
                            <Panel>
                                <form onSubmit={handleLogin}>
                                    <Stack
                                    direction="column"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    spacing={2}
                                    >
                                        <LockIcon fontSize="large" />
                                        <Typography variant="h4" gutterBottom component="div">Login</Typography>
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
                                        id="outlined-password-input"
                                        name="password"
                                        label="Password"
                                        type="password"
                                        autoComplete="current-password"
                                        fullWidth
                                        />
                                    </Stack>
                                    <Button variant="text" size="small" sx={{px:0}}>Forgot Password?</Button>
                                    <FormControlLabel control={<Checkbox />} label="Remember Me" />
                                    <LoadingButton 
                                    fullWidth 
                                    type="submit" 
                                    variant="contained"
                                    loading={loading}
                                    >
                                        Login
                                    </LoadingButton>
                                    <Divider sx={{my: 2}}>
                                        <Chip label="OR" />
                                    </Divider>
                                    <Button variant="text" onClick={() => {changeTab(1)}} fullWidth size="small" sx={{px:0, mx:0}}>Create an Account.</Button>
                                </form>
                            </Panel>
                        </Grow>
                    </Box>
                </Stack>
            </TabPanel>
            <TabPanel value={tab} index={1}>
                <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
                >
                    <Box sx={{width: 300}}>
                        <Grow 
                        in={error}
                        {...((tab === 0) ? { timeout: 1000 } : {})}
                        >
                            <Alert severity="error" sx={{mb: 2}}>{errormsg}</Alert>
                        </Grow>
                        <Grow
                        in={tab === 1}
                        >
                            <Panel>
                                <form onSubmit={handleRegister}>
                                    <Stack
                                    direction="column"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    spacing={2}
                                    >
                                        <AppRegistrationRoundedIcon fontSize="large" />
                                        <Typography variant="h4" gutterBottom component="div">Register</Typography>
                                        <TextField
                                        required
                                        id="outlined-required"
                                        name="fname"
                                        label="First Name"
                                        fullWidth
                                        />
                                        <TextField
                                        required
                                        id="outlined-required"
                                        name="lname"
                                        label="Last Name"
                                        fullWidth
                                        />
                                        <TextField
                                        required
                                        id="outlined-required"
                                        name="username"
                                        label="Email"
                                        fullWidth
                                        />
                                        <TextField
                                        required
                                        id="outlined-password-input"
                                        name="password"
                                        label="Password"
                                        type="password"
                                        fullWidth
                                        />
                                        <TextField
                                        required
                                        id="outlined-password-input"
                                        name="rpassword"
                                        label="Repeat Password"
                                        type="password"
                                        fullWidth
                                        />
                                    </Stack>
                                    <LoadingButton 
                                    fullWidth 
                                    type="submit" 
                                    variant="contained"
                                    loading={loading}
                                    sx={{mt: 2}}
                                    >
                                        Register
                                    </LoadingButton>
                                    <Divider sx={{my: 2}}>
                                        <Chip label="OR" />
                                    </Divider>
                                    <Button variant="text" onClick={() => {changeTab(0)}} fullWidth size="small" sx={{px:0, mx:0}}>Login.</Button>
                                </form>
                            </Panel>
                        </Grow>
                    </Box>
                </Stack>
            </TabPanel>
        </div>
    )
}

export default Login