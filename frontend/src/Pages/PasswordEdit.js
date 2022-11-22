import { Button, Divider, LinearProgress, Stack, Typography } from "@mui/material"
import { Box } from "@mui/system"


const PasswordEdit = () => {

    const passwordInfo = {
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
                    <Box>
                        {passwordInfo.favicon}
                    </Box>
                    <Stack>
                        <Typography>
                            {passwordInfo.site}
                        </Typography>
                        <Typography>
                            {passwordInfo.username}
                        </Typography>
                    </Stack>
                </Stack>
                <Box>
                    {passwordInfo.status}
                </Box>
                <Button
                variant='contained'
                >
                    edit
                </Button>
            </Stack>
            <Stack>
                <Typography>
                    Password Strength: {passwordInfo.strength}
                </Typography>
                <Box
                width='240px'
                >
                    <LinearProgress 
                    variant='determinate'
                    value={passwordInfo.strength*100}
                    sx={{ height: '16px', borderRadius: '64px' }}
                    />
                </Box>
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
                {passwordInfo.history.map((record, index) => (
                    <Stack
                    direction='row'
                    justifyContent='space-between'
                    spacing={1}
                    backgroundColor={index % 2 === 1 && '#00000026'}
                    padding={2}
                    >
                        <Typography>
                            {record.date}
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