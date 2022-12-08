import { Box, IconButton, InputBase, Typography } from "@mui/material"
import { useState } from "react"

import EditRoundedIcon from '@mui/icons-material/EditRounded'

const EditableItem = (props) => {

    const [activeEdit, toggleActiveEdit] = useState(false)
    const [text, updateText] = useState(props.children)

    const handleChange = (event) => {
        updateText(event.target.value)
    }

    const handleClick = () => {
        toggleActiveEdit(!activeEdit)
    }

    const handleBlur = () => {
        toggleActiveEdit(!activeEdit)
        props.onBlur && props.onBlur(text)
    }

    return (
        <Box
        sx={{ display: 'flex' }}
        >
            {activeEdit ?
            <Box
            sx={{
                border: '2px solid',
                borderColor: 'primary.main',
                borderRadius: '12px',
                width: '100%',
            }}
            >
                <InputBase
                autoFocus
                value={text}
                onChange={handleChange}
                onBlur={handleBlur}
                sx={{
                    fontSize: (props.variant==='h4' && '2.125rem') || (props.variant==='h5' && '1.5rem'),
                    color: props.color,
                    width: 'auto',
                }}
                >
            </InputBase>
            </Box>
            :
            <Typography 
            onClick={handleClick} 
            variant={props.variant}
            sx={{
                py: 1,
                color: props.color,
            }}
            >
                {text}
            </Typography>}

            <IconButton
            onClick={() => {toggleActiveEdit(!activeEdit)}}
            >
                <EditRoundedIcon />
            </IconButton>
        </Box>
    )
}

export default EditableItem