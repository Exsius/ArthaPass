import { Typography } from "@mui/material"
import { Box } from "@mui/system"

const NoPage = () => {
    return (
        <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 550 }}
        >
            <Typography variant="h4" color='primary.main'>
                Page does not exist.
            </Typography>
        </Box>
    )
}

export default NoPage