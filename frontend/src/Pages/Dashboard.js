import { Button, Chip, Icon, IconButton, List, ListItemButton, Paper, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import Divider from '@mui/material/Divider'


import { Panel } from '../Components/Panel.js'
import { useAuth } from '../Context/UserContext.js'

import AddCircleIcon from '@mui/icons-material/AddCircle';

const Dashboard = () => {

    const { userInfo } = useAuth()
    const [userProfile, setUserProfile] = useState()
    const [currPwdFilter, setCurrPwdFilter] = useState(0)

    const pwdFilters = [
        'all',
        'breached',
        'weak',
        'reused',
    ]

    const pwdAccounts = [
        {
            site: 'www.google.com',
            username: 'username',
            tags: [
                'tag1',
                'tag2',
                'tag3',
            ],
            lastUsed: 'ldsapdw',
            favicon: 'img',
            status: 'weak',
        },
        {
            site: 'www.google.com',
            username: 'username',
            tags: [
                'tag1',
                'tag2',
                'tag3',
            ],
            lastUsed: 'ldsapdw',
            favicon: 'img',
            status: 'reused',
        },
        {
            site: 'www.google.com',
            username: 'username',
            tags: [
                'tag1',
                'tag2',
                'tag3',
            ],
            lastUsed: 'ldsapdw',
            favicon: 'img',
            status: 'reused',
        },
        {
            site: 'www.google.com',
            username: 'username',
            tags: [
                'tag1',
                'tag2',
                'tag3',
            ],
            lastUsed: 'ldsapdw',
            favicon: 'img',
            status: 'reused',
        },
        {
            site: 'www.google.com',
            username: 'username',
            tags: [
                'tag1',
                'tag2',
                'tag3',
            ],
            lastUsed: 'ldsapdw',
            favicon: 'img',
            status: 'reused',
        },
        {
            site: 'www.google.com',
            username: 'username',
            tags: [
                'tag1',
                'tag2',
                'tag3',
            ],
            lastUsed: 'ldsapdw',
            favicon: 'img',
            status: 'breached',
        },
    ]

    useEffect(() => {
        setUserProfile(userInfo)
    }, [userInfo])

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
                <Stack>
                    <Typography>Password Health Score</Typography>
                </Stack>
                <Stack
                direction='row'
                spacing={3}
                >
                    <Stack
                    spacing={3}
                    >
                        <Box>
                            <Typography>Total</Typography>
                        </Box>
                        <Box>
                            <Typography>Weak</Typography>
                        </Box>
                    </Stack>
                    <Stack
                    spacing={3}
                    >
                        <Box>
                            <Typography>Reused</Typography>
                        </Box>
                        <Box>
                            <Typography>Breached</Typography>
                        </Box>
                    </Stack>
                </Stack>
                <Stack>
                    placeholder
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
                    <IconButton>
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
                height='374px'
                overflow='scroll'
                >
                    <List>
                        {pwdAccounts.map((account) => (
                            pwdFilters.indexOf(account.status) === currPwdFilter | currPwdFilter === 0 &&
                            <>
                                <ListItemButton>
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
                                            <Box>
                                                {account.favicon}
                                            </Box>
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
                                            {account.tags.map((tag) => (
                                                <Chip label={tag} variant='outlined' />
                                            ))}
                                        </Stack>
                                        <Typography>
                                            {account.lastUsed}
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