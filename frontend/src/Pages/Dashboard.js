import { Avatar, Button, Chip, Icon, IconButton, LinearProgress, List, ListItemButton, Paper, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import Divider from '@mui/material/Divider'
import { useNavigate } from "react-router-dom"

import { getPasswordList } from '../Api/PasswordAPI.js'
import { scanUser } from '../Api/UserAPI.js'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

import { Panel } from '../Components/Panel.js'
import { useAuth } from '../Context/UserContext.js'

import AddCircleIcon from '@mui/icons-material/AddCircle';

const Dashboard = () => {

    ChartJS.register(ArcElement)

    const navigate = useNavigate()

    const { userInfo } = useAuth()
    const [userProfile, setUserProfile] = useState()
    const [currPwdFilter, setCurrPwdFilter] = useState(0)

    const [pwdFilters, setPwdFilters] = useState([
        'all',
        'breached',
        'weak',
        'exposed',
    ])

    const [pwdAccounts, setPwdAccounts] = useState([])


    const [breachedAccounts, setBreachedAccounts] = useState(0)
    const [weakAccounts, setWeakAccounts] = useState(0)
    const [exposedAccounts, setExposedAccounts] = useState(0)

    const [data, setData] = useState({
        labels: ['Red', 'Blue', 'Orange'],
        datasets: [
            {
            // data: [1, exposedAccounts, weakAccounts],
            data: [scanUser()],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
            },
        ],
    })
    
    // useState([
    //     {
    //         site: 'www.google.com',
    //         username: 'username',
    //         tags: [
    //             'tag1',
    //             'tag2',
    //             'tag3',
    //         ],
    //         lastUsed: 'ldsapdw',
    //         favicon: 'img',
    //         status: 'weak',
    //     },
    //     {
    //         site: 'www.google.com',
    //         username: 'username',
    //         tags: [
    //             'tag1',
    //             'tag2',
    //             'tag3',
    //         ],
    //         lastUsed: 'ldsapdw',
    //         favicon: 'img',
    //         status: 'reused',
    //     },
    //     {
    //         site: 'www.google.com',
    //         username: 'username',
    //         tags: [
    //             'tag1',
    //             'tag2',
    //             'tag3',
    //         ],
    //         lastUsed: 'ldsapdw',
    //         favicon: 'img',
    //         status: 'reused',
    //     },
    //     {
    //         site: 'www.google.com',
    //         username: 'username',
    //         tags: [
    //             'tag1',
    //             'tag2',
    //             'tag3',
    //         ],
    //         lastUsed: 'ldsapdw',
    //         favicon: 'img',
    //         status: 'reused',
    //     },
    //     {
    //         site: 'www.google.com',
    //         username: 'username',
    //         tags: [
    //             'tag1',
    //             'tag2',
    //             'tag3',
    //         ],
    //         lastUsed: 'ldsapdw',
    //         favicon: 'img',
    //         status: 'reused',
    //     },
    //     {
    //         site: 'www.google.com',
    //         username: 'username',
    //         tags: [
    //             'tag1',
    //             'tag2',
    //             'tag3',
    //         ],
    //         lastUsed: 'ldsapdw',
    //         favicon: 'img',
    //         status: 'breached',
    //     },
    // ])

    useEffect(() => {
        setUserProfile(userInfo)
        getPasswordList().then((result) => {
            setPwdAccounts(result)

            // setExposedAccounts(scanUser().reduce(
            //     (accumulator, currentValue) => accumulator + currentValue,
            // ))

            scanUser().then((result) => {
                setExposedAccounts(result.reduce(
                    (accumulator, currentValue) => accumulator + currentValue,
                ))
                setPwdAccounts(result.map((pwd, index) => {
                    let tags = []
                    if (result.at(index) > 0) {
                        tags = [...tags, 'exposed']
                    }
                    if (pwdAccounts[index] && pwdAccounts[index].strength < 0.35) {
                        tags = [...tags, 'weak']
                    }
                    return {...pwd, tags: tags}
                    // {...pwd, tags: pwd.tags.map((tag) => {
                    //     if (result.at(index) > 0) {
                    //         return `exposed`
                    //     } else if (pwdAccounts[index].strength < 0.35) {
                    //         return 'weak'
                    //     }
                    // })}
                    setData({
                        labels: ['Red', 'Blue', 'Orange'],
                        datasets: [
                            {
                            // data: [1, exposedAccounts, weakAccounts],
                            data: [breachedAccounts === 0 ? 1 : breachedAccounts, exposedAccounts === 0 ? 1 : exposedAccounts, weakAccounts === 0 ? 1 : weakAccounts],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 159, 64, 1)',
                            ],
                            borderWidth: 1,
                            },
                        ],
                    })
                }))
            })
            
        })
    }, [userInfo])

    const viewPassword = (id) => {
        navigate(`/password/${id}`)
    }

    const handleNewPassword = () => {
        navigate(`/new/`)
    }

    console.log((weakAccounts / pwdAccounts.length * 40) + (breachedAccounts / pwdAccounts.length * 60))

    return(
        <Stack
        paddingY='32px'
        spacing={3}
        >
            <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-around'
            >
                <Stack
                spacing={2}
                >
                    <Typography>Password Health Score</Typography>
                    <LinearProgress 
                        variant='determinate'
                        value={(pwdAccounts.filter(pw => pw.strength < 0.35).length / pwdAccounts.length * 40) + (breachedAccounts / pwdAccounts.length * 60)}
                        sx={{ height: '16px', borderRadius: '64px' }}
                    />
                    <Typography
                    variant='h3'
                    textAlign='center'
                    >
                        {!isNaN(Math.floor(pwdAccounts.filter(pw => pw.strength < 0.35).length / pwdAccounts.length * 40) + (breachedAccounts / pwdAccounts.length * 60)) ? Math.floor(pwdAccounts.filter(pw => pw.strength < 0.35).length / pwdAccounts.length * 40) + (breachedAccounts / pwdAccounts.length * 60) : 100} %
                    </Typography>
                </Stack>
                <Stack
                direction='row'
                spacing={3}
                >
                    <Stack
                    spacing={3}
                    >
                        <Box>
                            <Typography
                            variant='h6'
                            >
                                Total:
                            </Typography>
                            <Typography>{pwdAccounts.length} passwords</Typography>
                        </Box>
                        <Box>
                            <Typography
                            variant='h6'
                            >
                                Weak:
                            </Typography>
                            <Typography color='orange' >{pwdAccounts.filter(pw => pw.strength < 0.35).length} passwords</Typography>
                        </Box>
                    </Stack>
                    <Stack
                    spacing={3}
                    >
                        <Box>
                            <Typography
                            variant='h6'
                            >
                                Exposed:
                            </Typography>
                            <Typography color='blue' >{exposedAccounts} instances</Typography>
                        </Box>
                        <Box>
                            <Typography
                            variant='h6'
                            >
                                Breached:
                            </Typography>
                            <Typography color='red' >{breachedAccounts} passwords</Typography>
                        </Box>
                    </Stack>
                </Stack>
                <Stack
                direction='row'
                height='150px'
                width='150px'
                paddingRight='64px'
                spacing={3}
                >
                    <Pie data={data} />
                    <Stack
                    >
                        <Stack
                        spacing={1}
                        direction='row'
                        alignItems='center'
                        >
                            <Avatar sx={{ bgcolor: 'blue' }} />
                            <Typography>
                                Reused
                            </Typography>
                        </Stack>
                        <Stack
                        spacing={1}
                        direction='row'
                        alignItems='center'
                        >
                            <Avatar sx={{ bgcolor: 'orange' }} />
                            <Typography>
                                Weak
                            </Typography>
                        </Stack>
                        <Stack
                        spacing={1}
                        direction='row'
                        alignItems='center'
                        >
                            <Avatar sx={{ bgcolor: 'red' }} />
                            <Typography>
                                Breached
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
            <Divider />
            <Stack
            spacing={3}
            >
                <Stack
                direction='row'
                justifyContent='space-between'
                >
                    <IconButton
                    onClick={handleNewPassword}
                    >
                        <AddCircleIcon fontSize='large' color='primary' />
                    </IconButton>
                    <Stack
                    direction='row'
                    spacing={2}
                    >
                        {pwdFilters.map((filter, index) => (
                            <Button
                            variant={index === currPwdFilter ? 'contained' : 'text'}
                            onClick={() => {setCurrPwdFilter(index)}}
                            >
                                {filter}
                            </Button>
                        ))}
                    </Stack>
                </Stack>
                <Stack
                direction='row'
                justifyContent='space-between'
                >
                    <Typography>
                        Accounts
                    </Typography>
                    <Typography>
                        Tags
                    </Typography>
                    <Typography>
                        Last Used
                    </Typography>
                </Stack>
                <Box
                height='300px'
                overflow='scroll'
                >
                    <List>
                        {pwdAccounts.map((account) => (
                            (account.tags?.includes(pwdFilters.at(currPwdFilter)) || (currPwdFilter === 0)) &&
                            <>
                                <ListItemButton
                                onClick={() => {viewPassword(account.id)}}
                                key={account.id}
                                >
                                    <Stack
                                    direction='row'
                                    alignItems='center'
                                    justifyContent='space-between'
                                    sx={{ width: '100%' }}
                                    >
                                        <Stack
                                        direction='row'
                                        spacing={3}
                                        width='120px'
                                        >
                                            <Box
                                                component="img"
                                                sx={{
                                                height: '24px',
                                                width: '24px',
                                                pt: 1.5,
                                                }}
                                                src={`${account.site}/favicon.ico`}
                                            />
                                            <Stack>
                                                <Typography>
                                                    {account.site}
                                                </Typography>
                                                <Typography>
                                                    {account.username}
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                        <Stack
                                        direction='row'
                                        sx={{ width: '128px', flexWrap: 'wrap' }}
                                        >
                                            {account.tags?.map((tag) => (
                                                <Chip label={tag} variant='outlined' />
                                            ))}
                                        </Stack>
                                        <Typography>
                                            {new Date(account.updatedAt).toLocaleString()}
                                        </Typography>
                                    </Stack>
                                </ListItemButton>
                                <Divider />
                            </>
                        ))}
                    </List>
                </Box>
            </Stack>
        </Stack>
    )
}

export default Dashboard