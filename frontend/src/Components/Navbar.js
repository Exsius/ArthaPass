import React, { useEffect, useState } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../Context/UserContext.js'

import AppBar from '@mui/material/AppBar'
import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import Menu from '@mui/material/Menu'
import { BottomNavigation, BottomNavigationAction, MenuItem, Modal, Paper, Backdrop, Stack, Slide, Snackbar, Alert, LinearProgress, Avatar } from '@mui/material'

import userAPI, { changeOrganization } from '../Api/UserAPI.js'

import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded'
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded'
import BackupTableRoundedIcon from '@mui/icons-material/BackupTableRounded'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import GroupRoundedIcon from '@mui/icons-material/GroupRounded'
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded'
import ImportExportRoundedIcon from '@mui/icons-material/UnfoldMoreRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded'
import UndoRoundedIcon from '@mui/icons-material/UndoRounded'
import RedoRoundedIcon from '@mui/icons-material/RedoRounded'
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded'
import SaveRoundedIcon from '@mui/icons-material/SaveRounded'
import PublishRoundedIcon from '@mui/icons-material/PublishRounded'

export const Navbar = (props) => {

    const navigate = useNavigate()

    const { window } = props
    const [pageTitle, setPageTitle] = useState()
    const [loggedin, setLoggedin] = useState(null)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [drawerWidth, setDrawerWidth] = useState(0)
    const [anchorEl, setAnchorEl] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const [activeMenu, setActiveMenu] = useState()
    const [activeModal, setActiveModal] = useState()
    const [progress, setProgress] = React.useState()
    const [addUsersList, updateAddUsersList] = useState([])
    const [delUsersList, updateDelUsersList] = useState([])
    const [joinToken, setJoinToken] = useState(props.token)
    const [paramId, setParamId] = useState(props.paramId)

    const { logout, user, userInfo, setUserInfo, activeSnackbar, setActiveSnackbar, navbarAction, setNavbarAction, organizationInfo, setOrganizationInfo } = useAuth()

    const handleLogout = async () => {
        if (loggedin) {
            await logout()
            setJoinToken()
            handleMenuClose()
            navigate('/')
            setOrganizationInfo({})
            setUserInfo({})
        }
    }

    useEffect(() => {
        if (user) {
            userAPI(user).then((result) => {
                setUserInfo(result)
            })
            setLoggedin(true)
            setDrawerWidth(240)
        } else {
            setLoggedin(false)
            setDrawerWidth(0)
        }
    }, [user])

    useEffect(() => {
        if (activeSnackbar) {
            setProgress(100)
        }
    }, [activeSnackbar])
    
    useEffect(() => {
        if (progress) {
            const timer = setInterval(() => {
                setProgress((prevProgress) => (prevProgress - 25))
            }, 800)
    
            if (progress <= 0) {
                clearInterval(timer)
            }
    
            return () => {
            clearInterval(timer)
            }
        }
    }, [progress])

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    const handleDrawerClose = () => {
        setMobileOpen(false)
    }

    const handleGoBack = () => {
        navigate(-1)
    }

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMenuClose = (event) => {
        setAnchorEl(null)
    }

    const handleModalToggle = () => {
        setOpenModal(!openModal)
    }

    const handleSnackbar = (message) => {
        setActiveSnackbar(message)
    }

    const handleRefreshUserInfo = async () => {
        const newUserInfo = await userAPI(user)
        setUserInfo(newUserInfo)
    }

    const menuItems = {
        'account': [
            // {
            //     oname: 'My Profile',
            //     icon: <AccountCircleRoundedIcon color="inherit" />,
            //     onClick: handleMenuClose,
            // },
            {
                oname: 'My Account',
                icon: <AccountCircleRoundedIcon color="inherit" />,
                onClick: () => {navigate('/account'); (mobileOpen && handleDrawerToggle());  handleMenuClose();},
            },
            {
                oname: 'Logout',
                icon: <LogoutRoundedIcon color="inherit" />,
                onClick: () => { handleLogout(); (mobileOpen && handleDrawerToggle()) },
            },
        ],
    }

    const mobileComponents = [
        (
            <IconButton
                size="large"
                edge="start"
                color="secondarydark"
                aria-label="open drawer"
                hidden={mobileOpen}
                onClick={handleDrawerToggle}
                sx={{ 
                    mr: 2, 
                    display: { sm: 'none', display: !loggedin ? 'none' : 'undefined', },
                }}
            >
                <MenuIcon />
            </IconButton>
        ),
        (
            <IconButton
                size="large"
                edge="start"
                color="secondarydark"
                aria-label="go back"
                hidden={mobileOpen}
                onClick={handleGoBack}
                sx={{ 
                    mr: 2, 
                    display: { md: 'none', display: !loggedin ? 'none' : 'undefined', },
                }}
            >
                <ArrowBackIosNewRoundedIcon />
            </IconButton>
        )
    ]
    
    const pageTitles = {
        '/dashboard': {
            name: 'My Dashboard',
            mobileComponents: mobileComponents[0],
            headComponents: (
                <Typography
                variant="h5"
                sx={{
                    color: "secondarydark.main",
                    mx: 1,
                    my: 'auto'
                }}
                >
                    {pageTitle}
                </Typography>
            ),
            navlinks: [
                {
                    name: "Dashboard",
                    link: "/dashboard",
                    icon: <DashboardRoundedIcon color="inherit" />
                },
            ],
            tailComponents: [
                <IconButton
                size="large"
                onClick={(event) => {setActiveMenu('account'); handleMenuOpen(event)}}
                >
                    <Avatar
                        alt='profile picture'
                        src={userInfo.pfp}
                    />
                </IconButton>
            ]
        },
    }
    const location = useLocation()
    let currentLocation = pageTitles[location.pathname] && pageTitles[location.pathname].name
    if (currentLocation === false) currentLocation = ""
    useEffect(() => {
        document.title = `arthapass: ${currentLocation}` ?? 'arthapass'
        setPageTitle(currentLocation)
    }, [currentLocation])

    const drawerItems = [
        {
            name: "Dashboard",
            icon: <HomeRoundedIcon color="secondarydark" />,
            link: "/",
        },
    ]

    const drawer = (
        <div>
            <Box sx={{ display: 'flex', flexDirection: 'column', height:"100vh"}}>
                <Toolbar sx={{ pb: 1.5 }}>
                    <Box
                        component="img"
                        sx={{
                        height: 'auto',
                        width: '85%',
                        pt: 1.5,
                        }}
                        alt='arthapass Logo'
                        src='/arthapassbanner.png'
                    />
                    {/* <Typography
                    variant="h4"
                    >
                    arthapass
                    </Typography> */}
                </Toolbar>
                {drawerItems.map((item, index) => (
                    <div key={item.name}>
                        <List>
                            <ListItemButton onClick={handleDrawerClose} component={Link} to={item.link}>
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.name} />
                            </ListItemButton>
                        </List>
                        {/* {([0,2].includes(index)) && <Divider sx={{ borderBottomWidth: 3 }} /> } */}
                    </div>
                ))}
                <Box
                sx={{ flexGrow: 1 }}>
                </Box>
                <Divider sx={{ borderBottomWidth: 3, }} />
                <List>
                    <ListItemButton onClick={(event) => {setActiveMenu('account'); handleMenuOpen(event)}}>
                        <ListItemIcon>
                            <Avatar
                                alt='profile picture'
                                src={userInfo.pfp}
                            />
                        </ListItemIcon>
                        <ListItemText primary={`${userInfo.fname} ${userInfo.lname}`} />
                    </ListItemButton>
                </List>
            </Box>
        </div>
    )

    const headerNav = (
        <>
            {pageTitles[location.pathname] && pageTitles[location.pathname].navlinks.map((item, index) => (
                <Button
                key={item.name}
                size="small" 
                variant={item.variant} 
                color="inherit" 
                startIcon={item.icon} 
                component={Link} 
                to={item.link}
                onClick={item.onClick}
                sx={{mx: 1}}
                >
                    {item.name}
                </Button>
            ))}
        </>
    )

    const container = window !== undefined ? () => window().document.body : undefined

    return(
        <div>
            <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{  
                style: {  
                  width: 208,
                  maxHeight: 250,
                },
            }}
            >
                {activeMenu && menuItems[activeMenu].map((item, index) => (
                    <div key={item.name}>
                        <MenuItem onClick={item.onClick}>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText>{item.oname}</ListItemText>
                        </MenuItem>
                        {(index === menuItems[activeMenu].length - 2) && <Divider />}
                    </div>
                ))}
            </Menu>
            <Box sx={{ display: 'flex' }}>
                <AppBar
                // color="secondary"
                color='transparent'
                position="fixed"
                elevation={0}
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
                >
                    <Toolbar>
                        <Typography
                        hidden={loggedin}
                        variant="h4"
                        color="secondarydark.main"
                        >
                        arthapass
                        </Typography>
                        {pageTitles[location.pathname] && pageTitles[location.pathname].mobileComponents}
                        <Typography
                        color='secondarydark.main'
                        variant='h5'
                        sx={{ 
                            position: 'absolute',
                            left: '50%',
                            transform: 'translate(-50%)',
                            display: { md: 'none', display: !loggedin ? 'none' : 'undefined', },
                        }}
                        >
                            {pageTitles[location.pathname] && pageTitles[location.pathname].name}
                        </Typography>
                        <Box
                        sx={{ 
                            display: { xs: 'none', md: 'flex' },
                            width: '100%',
                            color: "secondarydark.main"
                        }}
                        >
                            {pageTitles[location.pathname] && pageTitles[location.pathname].headComponents}
                            {pageTitles[location.pathname] && pageTitles[location.pathname].navlinks.map((item, index) => (
                                (item.name !== 'add user') ?
                                <Button 
                                key={item.name}
                                size="small" 
                                variant={item.variant} 
                                color="inherit" 
                                startIcon={item.icon}
                                onClick={item.onClick}
                                component={Link} 
                                to={item.link} 
                                sx={{mx: 1}}>
                                    {item.name}
                                </Button>
                                :
                                (organizationInfo.users && organizationInfo.users.find(myUser => myUser.id === user.user_id).userOrganization.authorizationLevel < 2) &&
                                <Button 
                                key={item.name}
                                size="small" 
                                variant={item.variant} 
                                color="inherit" 
                                startIcon={item.icon}
                                onClick={item.onClick}
                                component={Link} 
                                to={item.link} 
                                sx={{mx: 1}}>
                                    {item.name}
                                </Button>
                            ))}
                            <Box sx={{ flexGrow: 1, }} />
                            {pageTitles[location.pathname] && pageTitles[location.pathname].tailComponents}
                        </Box>
                        {/* <IconButton
                        size="large"
                        onClick={(event) => {setActiveMenu('account'); handleMenuOpen(event)}}
                        >
                            <AccountCircleRoundedIcon />
                        </IconButton> */}
                    </Toolbar>
                </AppBar>
                <Paper 
                elevation={3}
                sx={{ 
                    position: 'fixed',
                    top: 'auto', 
                    bottom: { xs: '0px', sm: '12px' },
                    width: { xs: '100%', sm: `calc(100vw - ${drawerWidth}px - 16px)` },
                    ml: { sm: `${drawerWidth}px` },
                    display: { xs: loggedin ? 'block' : 'none', md: 'none', },
                    alignItems: 'center',
                    borderRadius: { sm: '0px 0px 24px 24px' },
                    zIndex: 1
                    }}
                >
                    <BottomNavigation
                        sx={{ borderRadius: '0px 0px 24px 24px', }}
                        showLabels
                        value=''
                    >
                        {pageTitles[location.pathname] && pageTitles[location.pathname].navlinks.map((item, index) => (
                            (item.name !== 'add user') ?
                            <BottomNavigationAction key={item.name} label={item.name} icon={item.icon} onClick={item.onClick} />
                            :
                            (organizationInfo.users && organizationInfo.users.find(myUser => myUser.id === user.user_id).userOrganization.authorizationLevel < 2) &&
                            <BottomNavigationAction key={item.name} label={item.name} icon={item.icon} onClick={item.onClick} />
                        ))}
                    </BottomNavigation>
                </Paper>
                <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                >
                    <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth,
                        backgroundColor: "secondary.main",
                        color: "secondarydark.main" },
                    }}
                    >
                    {drawer}
                    </Drawer>
                        <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            border: 'none',
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth,
                            backgroundColor: "transparent",
                            height: '100vh',
                            border: 'none',
                            color: "secondarydark.main", },
                        }}
                        open
                        >
                        {drawer}
                        </Drawer>
                </Box>
                <Box
                sx={{
                    flexGrow: 1, 
                    py: { xs: 1, sm: 2, md: 6 },
                    px: { xs: 0, sm: 1, md: 3 },
                    width: { sm: `calc(100% - ${drawerWidth}px)`, },
                    mt: '64px',
                    mr: { sm: loggedin && '16px' },
                    height: loggedin ? { xs: 'calc(100vh -  136px)', sm: 'calc(100vh - 164px)', md: 'calc(100vh - 192px)' } : 'calc(100vh - 160px)',
                    borderRadius: { sm: '12px 12px 0px 0px', md: '12px' },
                    backgroundImage: 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)',
                    //backgroundColor: 'neutral.main',
                    overflow: 'scroll',
                }}
                backgroundColor='neutral.main'
                >
                    {props.children}
                </Box>
                <Snackbar
                open={activeSnackbar}
                autoHideDuration={4000}
                onClose={() => {setActiveSnackbar()}}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                    <Box>
                        <Alert
                        sx={{ width: '400px' }}
                        severity={activeSnackbar && activeSnackbar.severity}
                        fullWidth
                        >
                            <Typography
                            variant='caption'
                            >
                                {activeSnackbar && activeSnackbar.message}
                            </Typography>
                            <LinearProgress
                            variant='determinate'
                            value={progress}
                            sx={{ width: '360px' }}
                            />
                        </Alert>
                    </Box>
                </Snackbar>
            </Box>
        </div>
    )
}