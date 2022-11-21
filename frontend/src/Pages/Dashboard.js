import { Paper, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'

import { Panel } from '../Components/Panel.js'
import { useAuth } from '../Context/UserContext.js'

const Dashboard = () => {

    const { userInfo } = useAuth()
    const [userProfile, setUserProfile] = useState()

    useEffect(() => {
        setUserProfile(userInfo)
    }, [userInfo])

    return(
        <Box
        sx={{ backgroundColor: 'secondary.main', width: '100%', height: '100%' }}
        >
            <Paper
            sx={{ margin: '0px 24px 0px 24px', padding: '16px', height: '615px', borderRadius: '24px' }}
            >
                <Stack
                spacing={2}
                >
                    <Box
                    sx={{ backgroundColor: 'cyan', width: '100%', paddingBottom: '100%', borderRadius: '24px' }}
                    />
                    <Typography
                    
                    >
                        Place Titles
                    </Typography>
                </Stack>
            </Paper>
        </Box>
    )
}

export default Dashboard