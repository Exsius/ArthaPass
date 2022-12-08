import { Alert, Avatar, Box, Button, Grow, Icon, IconButton, Modal, Paper, Stack, TextField, Typography } from "@mui/material"

import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'

import { useAuth } from '../Context/UserContext.js'
import { useEffect, useState } from "react"
import userAPI, { updateUserInfo, changePassword, updateProfilePic } from "../Api/UserAPI.js"

const AccountSettings = (props) => {

    const { user, userInfo, setActiveSnackbar, setUserInfo } = useAuth()
    const [accountInfo, setAccountInfo] = useState({})
    const [profilePic, setProfilePic] = useState({})
    const [updateButton, setUpdateButton] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [errorMsg, setErrorMsg] = useState()
    
    useEffect(() => {
        setAccountInfo(userInfo)
        setProfilePic({ url: userInfo.pfp })
    }, [userInfo])

    const handleChangeProfilePic = (event) => {
        event.preventDefault()
        if (!event.target.files) {
            return
        }

        const file = event.target.files[0]

        console.log(file)

        setUpdateButton(true)

        const formData = new FormData()
        formData.append(
            'profilePic',
            file,
            file.name
        )

        setProfilePic({ url: URL.createObjectURL(file), formData: formData })
    }

    const handleChange = (event) => {
        if (event.target.name === 'fname') {
            setAccountInfo({ ...accountInfo, fname: event.target.value })
        } else if (event.target.name === 'lname') {
            setAccountInfo({ ...accountInfo, lname: event.target.value })
        } else if (event.target.name === 'apikey') {
            setAccountInfo({ ...accountInfo, apikey: event.target.value })
        }
        setUpdateButton(true)
    }

    const handleToggleModal = () => {
        setOpenModal(!openModal)
    }

    const handleChangePassword = (event) => {
        event.preventDefault()
        setErrorMsg()
        const { oldPassword, newPassword, repeatPassword } = document.forms[0]
        if (newPassword.value === repeatPassword.value) {
            changePassword(oldPassword.value, newPassword.value).then((result) => {
                if (result.data.success) { 
                    setOpenModal(false)
                    setActiveSnackbar({ severity: 'success', message: 'User password was changed successfully' })
                } else if (result.data.error) {
                    setErrorMsg(result.data.error)
                }
            })
        } else {
            setErrorMsg('new password does not match repeat password')
        }
    }

    const handleSubmit = async (event) => {
        await updateUserInfo(accountInfo)
        if (profilePic.formData) {
            await updateProfilePic(profilePic.formData)
        }
        setUserInfo(await userAPI())
        setActiveSnackbar({ severity: 'success', message: 'User account settings have been updated' })
        setUpdateButton(false)
    }

    return (
        <>
            <Modal
            open={openModal}
            onClose={handleToggleModal}
            >
                <form onSubmit={handleChangePassword}>
                    <Box
                    sx={{ maxWidth: '400px', height: 'auto', mx: 'auto', my: '25vh' }}
                    >          
                        <Grow
                        in={errorMsg}
                        >
                            <Alert severity='error' sx={{ mx: 'auto', mb: 1, width: '80%' }}>{errorMsg}</Alert>
                        </Grow>
                        <Paper
                        sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                        >
                            <Typography
                            variant='h4'
                            color='primary'
                            >
                                Change Your password
                            </Typography>
                            <Box
                            sx={{ display: 'flex', flexDirection: 'column', gap: 3, py: 4, width: '80%' }}
                            >
                                <TextField
                                    required
                                    onChange={handleChange}
                                    id="outlined-required"
                                    type='password'
                                    label='Current Password'
                                    name="oldPassword"
                                    fullWidth
                                />
                                <TextField
                                    required
                                    onChange={handleChange}
                                    id="outlined-required"
                                    type='password'
                                    label='New Password'
                                    name="newPassword"
                                    fullWidth
                                />
                                <TextField
                                    required
                                    onChange={handleChange}
                                    id="outlined-required"
                                    type='password'
                                    label='Repeat Password'
                                    name="repeatPassword"
                                    fullWidth
                                />
                                <Button
                                variant='contained'
                                type='submit'
                                >
                                    Change password
                                </Button>
                            </Box>
                        </Paper>
                    </Box>
                </form>
            </Modal>
            <Box
            sx={{ maxWidth: '600px', m: 'auto' }}
            >
                <Box
                sx={{ display: 'flex', gap: 1, flexDirection: 'column', alignItems: 'center', width: '100%' }}
                >
                    <SettingsRoundedIcon
                    color='base'
                    fontSize="large"
                    />
                    <Typography
                    variant='h4'
                    color='base.main'
                    >
                        My Account settings
                    </Typography>
                    <Box sx={{ width: '80%' }}>
                        <Stack spacing={3}>
                            <IconButton
                            sx={{ 
                                width: '200px', 
                                height: '200px', 
                                mx: 'auto',
                            }}
                            component='label'
                            >
                                <input
                                accept='image/*'
                                type='file'
                                hidden
                                onChange={handleChangeProfilePic}
                                />
                                <Typography
                                sx={{
                                    backgroundColor: 'primary.main',
                                    color: 'white',
                                    width: '200px',
                                    height: '200px',
                                    position: 'absolute',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '100%'
                                }}
                                >Change Profile image</Typography>
                                <Avatar
                                    alt='profile picture'
                                    sx={{ 
                                        width: '201px',
                                        height: '201px',
                                        mx: 'auto',
                                        WebkitFilter: 'opacity(100%)',
                                        boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
                                        ':hover': {
                                            // WebkitFilter: 'opacity(30%)',
                                            WebkitFilter: 'blur(5px)',
                                            WebkitTransition: 'all 0.3s ease',
                                            opacity: 0.4,
                                        }
                                    }}
                                    src={profilePic.url}
                                />
                            </IconButton>
                            <Box>
                                <Typography variant='body1'>
                                    First Name
                                </Typography>
                                <TextField
                                    required
                                    onChange={handleChange}
                                    value={accountInfo.fname}
                                    id="outlined-required"
                                    name="fname"
                                    fullWidth
                                />
                            </Box>
                            <Box>
                                <Typography 
                                variant='body1'
                                >
                                    Last Name
                                </Typography>
                                <TextField
                                    required
                                    onChange={handleChange}
                                    value={accountInfo.lname}
                                    id="outlined-required"
                                    name="lname"
                                    fullWidth
                                />
                            </Box>
                            <Box>
                                <Typography 
                                variant='body1'
                                >
                                    Password
                                </Typography>
                                <Box sx={{ display: 'flex' }}>
                                    <TextField
                                        sx={{ flexGrow: 1 }}
                                        required
                                        id="outlined-required"
                                        value='helloWorld'
                                        name="password"
                                        type="password"
                                    />
                                    <Button 
                                    variant='outlined'
                                    sx={{ height: '56px' }}
                                    onClick={handleToggleModal}
                                    >
                                        Change password
                                    </Button>
                                </Box>
                            </Box>
                            <Box>
                                <Typography 
                                variant='body1'
                                >
                                    Email
                                </Typography>
                                <TextField
                                    required
                                    id="outlined-required"
                                    name="email"
                                    value={userInfo.email}
                                    fullWidth
                                />
                            </Box>
                            <Box>
                                <Typography 
                                variant='body1'
                                >
                                    Enzoic API key
                                </Typography>
                                <TextField
                                    required
                                    id="outlined-required"
                                    name="apikey"
                                    onChange={handleChange}
                                    value={accountInfo.apikey}
                                    fullWidth
                                />
                            </Box>
                            <Grow in={updateButton}>
                                <Button
                                onClick={handleSubmit}
                                variant='contained'
                                >
                                    Update
                                </Button>
                            </Grow>
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default AccountSettings