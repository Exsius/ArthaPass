import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper'

export const Panel = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.neutral.main,
    ...theme.typography.body2,
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
}));