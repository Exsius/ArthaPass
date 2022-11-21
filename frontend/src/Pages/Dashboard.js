import { Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
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
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4}>
                <Panel>
                    <Typography
                    variant='h4'
                    >
                        Profile
                    </Typography>
                    <Typography
                    variant='h6'
                    >
                        {userProfile?.fname}
                    </Typography>
                </Panel>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
                <Panel>
                    <h1>Users bar</h1>
                </Panel>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
                <Panel>
                    <h1>admin panel</h1>
                </Panel>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
                <Panel>
                    <h1>Metrics</h1>
                </Panel>
            </Grid>
        </Grid>
    )
}

export default Dashboard