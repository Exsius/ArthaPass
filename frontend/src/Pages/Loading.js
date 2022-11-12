import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

const Loading = () => {
    return (
        <Box
        sx={{ width: '100vw', height: '85vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <CircularProgress />
        </Box>
    )
}

export default Loading