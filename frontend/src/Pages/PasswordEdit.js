import { Button, Divider, LinearProgress, Stack, Typography } from "@mui/material"
import { Box } from "@mui/system"
import LoadingButton from '@mui/lab/LoadingButton'

import { useEffect, useState } from 'react'
import { Navigate, useParams } from "react-router-dom"
import { getPassword, scanPassword } from "../Api/PasswordAPI.js"

import { useAuth } from '../Context/UserContext.js'

const PasswordEdit = (props) => {

    const { userInfo } = useAuth()

    const { id } = useParams()
    // const [passwordInfo, setPasswordInfo] = useState({})
    const [passwordInfo, setPasswordInfo] = useState({
        site: 'www.google.com',
        username: 'username',
        tags: [
            'tag1',
            'tag2',
            'tag3',
        ],
        lastUsed: 'ldsapdw',
        favicon: 'img',
        status: 'test',
        strength: 0.6,
        history: [
            {
                date: 'ldwapl',
                time: '3422',
                action: 'login'
            },
            {
                date: 'ldwapl',
                time: '3422',
                action: 'login'
            },
            {
                date: 'ldwapl',
                time: '3422',
                action: 'login'
            },
        ],
    })

    useEffect(() => {
        getPassword(id).then((result) => {
            setPasswordInfo(result)
        })
        // scanPassword(id)
    }, [userInfo])

    const handleScanPassword = async () => {
        console.log('tesdt')
        await scanPassword(id)
        window.location.reload()
    }
    
    return(
        <Stack
        padding='32px 16px'
        spacing={6}
        >
            <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            >
                <Stack
                spacing={2}
                direction='row'
                >
                    <Box
                        component="img"
                        sx={{
                        height: '52px',
                        width: '52px',
                        pt: 1,
                        }}
                        src={`${passwordInfo.site}/favicon.ico`}
                    />
                    <Stack>
                        <Stack
                        direction='row'
                        spacing={2}
                        alignItems='flex-end'
                        >
                            <Typography
                            variant='h6'
                            >
                                Site:
                            </Typography>
                            <Typography
                            variant='subtitle1'
                            >
                                {passwordInfo.site}
                            </Typography>
                        </Stack>
                        <Stack
                        direction='row'
                        spacing={2}
                        alignItems='flex-end'
                        >
                            <Typography
                            variant='h6'
                            >
                                Username:
                            </Typography>
                            <Typography
                            variant='subtitle1'
                            >
                                {passwordInfo.username}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
                <Box>
                    {passwordInfo.status}
                </Box>
                <Button
                variant='outlined'
                // loading={false}
                onClick={handleScanPassword}
                >
                    edit
                </Button>
            </Stack>
            <Stack
            direction='row'
            justifyContent='space-between'
            >
                <Stack>
                    <Stack
                    direction='row'
                    spacing={2}
                    alignItems='flex-end'
                    >
                        <Typography
                        variant='subtitle1'
                        >
                            Password Strength:
                        </Typography>
                        <Typography
                        variant='h6'
                        >
                            {passwordInfo.strength > 1 ? 100 : passwordInfo.strength*100}%
                        </Typography>
                    </Stack>
                    <Box
                    width='240px'
                    >
                        <LinearProgress 
                        variant='determinate'
                        value={passwordInfo.strength > 1 ? 100 : passwordInfo.strength*100}
                        sx={{ height: '16px', borderRadius: '64px' }}
                        />
                    </Box>
                </Stack>
                <Button
                variant='contained'
                >
                    scan
                </Button>
            </Stack>
            <Stack
            spacing={2}
            >
                <Stack
                direction='row'
                justifyContent='space-between'
                >
                    <Typography>
                        History
                    </Typography>
                    <Typography>
                        Action
                    </Typography>
                </Stack>
                <Divider />
                {eval(passwordInfo.history)?.map((record, index) => (
                    <Stack
                    direction='row'
                    justifyContent='space-between'
                    spacing={1}
                    backgroundColor={index % 2 === 1 && '#00000026'}
                    padding={2}
                    >
                        <Typography>
                            {new Date(record.date).toLocaleString()}
                        </Typography>
                        <Typography>
                            {record.action}
                        </Typography>
                    </Stack>
                ))}
            </Stack>
        </Stack>
    )
}

export default PasswordEdit