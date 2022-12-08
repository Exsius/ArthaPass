import { Button, Stack, TextField, Typography } from "@mui/material"
import EditableItem from "../Components/EditableItem"

import { useState } from 'react'
import { Box } from "@mui/system"
import { createPassword } from "../Api/PasswordAPI"
import { useNavigate } from "react-router-dom"

const PasswordCreate = () => {

    const navigate = useNavigate()

    // const [siteValue, setSiteValue] = useState('')
    // const [usernameValue, setUsernameValue] = useState('')
    // const [passwordValue, setPasswordValue] = useState('')
    const [values, setValues] = useState({})
    const [favicon, setFavicon] = useState('')

    const changeValue = (e) => {
        const { value, name } = e.target
        setValues({...values, [name]: value})
    }

    const onBlurSite = () => {
        setFavicon(`${values.site}/favicon.ico`)
        console.log(favicon)
    }

    const submitPassword = async () => {
        try {
            const result = await createPassword(values.site, values.username, values.password)
            navigate('/')
        } catch {
            navigate('/')
        }
    }

    return(
        <Stack
        padding='32px 16px'
        spacing={6}
        >
            <Stack
            spacing={3}
            >
                {/* <EditableItem
                variant='subtitle1'
                >
                    New Password
                </EditableItem> */}
                <Stack
                direction='row'
                spacing={2}
                >
                    <Box
                    flexGrow={1}
                    >
                        <Typography>
                            Site:
                        </Typography>
                        <Stack
                        direction='row'
                        >
                            <Box
                                key={Date.now()}
                                component="img"
                                sx={{
                                height: '42px',
                                width: '42px',
                                pt: 1,
                                pr: 1,
                                }}
                                src={favicon}
                            />
                            <TextField
                            value={values.site}
                            name='site'
                            onChange={changeValue}
                            onBlur={onBlurSite}
                            fullWidth
                            />
                        </Stack>
                    </Box>
                    <Stack
                    spacing={2}
                    direction='row'
                    alignItems='stretch'
                    paddingTop='24px'
                    height='56px'
                    >
                        <Button
                        variant='contained'
                        disabled={values.password !== values.retypepassword}
                        onClick={submitPassword}
                        >
                            add
                        </Button>
                        <Button
                        variant='outlined'
                        onClick={() => {navigate('/')}}
                        >
                            close
                        </Button>
                    </Stack>
                </Stack>
                <Box
                flexGrow={1}
                >
                    <Typography>
                        Username:
                    </Typography>
                    <TextField
                    value={values.username}
                    name='username'
                    onChange={changeValue}
                    fullWidth
                    />
                </Box>
                <Box
                flexGrow={1}
                >
                    <Typography>
                        Password:
                    </Typography>
                    <TextField
                    value={values.password}
                    name='password'
                    type='password'
                    onChange={changeValue}
                    fullWidth
                    />
                </Box>
                <Box
                flexGrow={1}
                >
                    <Typography>
                        Retype Password:
                    </Typography>
                    <TextField
                    value={values.retypepassword}
                    name='retypepassword'
                    type='password'
                    onChange={changeValue}
                    fullWidth
                    />
                </Box>
            </Stack>
        </Stack>
    )
}

export default PasswordCreate