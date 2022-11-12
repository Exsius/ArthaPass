
import { useEffect, useState } from "react"
import { Box } from "@mui/system"
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { Button, Card, CardActionArea, cardContentClasses, Divider, Icon, IconButton, InputBase, List, ListItem, ListItemButton, ListItemText, Modal, Paper, SpeedDial, SpeedDialAction, Stack, TextField, Typography } from "@mui/material"
import { LocalizationProvider } from "@mui/x-date-pickers"
import axios from 'axios'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import TextFieldsIcon from '@mui/icons-material/TextFields'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

const Dashboard = () => {

    const stubCalender = () => {
        return Array.apply(
            null, 
            Array(new Date(date.getYear(), date.getMonth() + 1, 0).getDate())
        )
    }

    const stubDaysArr = () => {
        const stubDaysInt = new Date(date.getFullYear(), date.getMonth(), 0).getDay() + 1
        if (stubDaysInt < 7) {
            return Array.apply(
                null, 
                Array(
                    new Date(date.getFullYear(), date.getMonth(), 0).getDay() + 1)
            )
        }
        return Array()
    }

    const weekdays = [
        'Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'
    ]

    const [date, setDate] = useState(new Date())
    const [notes, setNotes] = useState()
    const [cardOpen, setCardOpen] = useState(false)
    const [days, setDays] = useState(stubCalender)
    const [stubDays, setStubDays] = useState(stubDaysArr)

    const [cardId, setCardId] = useState()
    const [cardDate, setCardDate] = useState()
    const [cardTitle, setCardTitle] = useState()
    const [cardNotes, setCardNotes] = useState()

    useEffect(() => {
        if (!cardOpen) {
            axios.post('/api/getNotes', {
                date: date
            }).then((res) => {
                setNotes(res.data)
                days.forEach((element, index) => {
                    days[index] = null
                })
                res.data.forEach((element, index) => {
                    days.splice(new Date(element.date).getDate(), 1, element)
                });
                setStubDays(stubDaysArr)
            }).catch((err) => {
                console.log(err)
            })
        }
    }, [cardOpen])

    const handleDateChange = (date) => {
        setDate(date)
    }

    const handleDayOpen = (date) => {
        //date === new Date() ? setDate(new Date()) : setDate(date)
        handleCardOpen(date)
    }

    const handleCardClose = async () => {
        try {
            const options = {
                id: cardId,
                title: cardTitle,
                content: cardNotes,
                date: date,
            }
            await axios.post('/api/updateNote', options)
            days.splice(date.getDate()-1, 1, options)
            setCardOpen(false)
        } catch (err) {
            setCardOpen(false)
        }
    }

    const handleCardDelete = async () => {
        try {
            const options = {
                id: cardId,
            }
            await axios.post('/api/deleteNote', options)
            days.splice(date.getDate()-1, 1, null)
            setCardOpen(false)
        } catch (err) {
            setCardOpen(false)
        }
    }

    const handleCardOpen = (date) => {
        setCardOpen(true)
        setDate(date)
        if (days[date.getDate()-1]) {
            setCardTitle(days[date.getDate()-1].title)
            setCardNotes(days[date.getDate()-1].content)
            setCardId(days[date.getDate()-1].id)
        } else {
            setCardTitle('Title')
            setCardNotes([])
            setCardId()
        }
    }

    const handleCreateText = (props) => {
        setCardNotes([...cardNotes, { type: 'text', body: ''}])
    }

    const Note = (props) => {
        const [text, updateText] = useState()
        const [edit, setEdit] = useState(true)

        if (!edit) {
            return (
                <ListItem>
                    <ListItemText
                    primary={props.body}
                    secondary={props.body}
                    />
                    <IconButton>
                        <EditRoundedIcon />
                    </IconButton>
                </ListItem>
            )
        } else {
            return (
                <ListItem>
                    <TextField
                    multiline
                    fullWidth
                    onChange={(event) => {updateText(event)}}
                    />
                    <IconButton>
                        <EditRoundedIcon />
                    </IconButton>
                </ListItem>
            )
        }
    }

    const cardActions = [
        {
            name: "add text",
            icon: <TextFieldsIcon />
        },
    ]

    const EditableItem = (props) => {

        const [text, updateText] = useState(props.children)
        const [activeEdit, toggleActiveEdit] = useState(text ? false : true)

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
                    borderRadius: '5px',
                    width: '100%',
                }}
                >
                    <InputBase
                    multiline
                    autoFocus
                    value={text}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    sx={{
                        fontSize: (props.variant==='h4' && '2.125rem') || (props.variant==='h5' && '1.5rem'),
                        color: props.color,
                        width: '100%',
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
                        width: props.fullWidth ? '100%' : 'auto'
                    }}
                    >
                        <pre style={{ fontFamily: 'inherit', margin: 0 }}>
                            {text}
                        </pre>
                    </Typography>}
                    <IconButton
                    onClick={() => {toggleActiveEdit(!activeEdit)}}
                    >
                        <EditRoundedIcon />
                    </IconButton>
            </Box>
        )
    }

    return (
        <>
            <Modal
            open={cardOpen}
            onClose={handleCardClose}
            >
                <Box sx={{
                    width: '40vw',
                    height: '70vh',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    }}>
                    <Paper sx={{ p: 4, width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ display: 'flex', width: '100%' }}>
                            <Typography variant='h3' color='primary.main'>
                                {date.toLocaleString('default', { weekday: 'long' }) + '.'}
                            </Typography>
                            <Box sx={{ flexGrow: 1 }} />
                            <Button
                            onClick={handleCardDelete}
                            variant='outlined'
                            color='error'
                            >
                                <DeleteOutlineIcon />
                            </Button>
                        </Box>
                        <EditableItem
                        color='secondarydark.main'
                        variant='h4'
                        onBlur={setCardTitle}
                        >
                            {cardTitle}
                        </EditableItem>
                        <Typography variant='subtitle1'>
                            Notes:
                        </Typography>
                        <List>
                            {cardNotes && cardNotes.map((note, index) => (
                                <>
                                <EditableItem
                                color='secondarydark.main'
                                variant='subtitle1'
                                fullWidth
                                onBlur={(text) => {cardNotes.splice(index,1, { type: 'text', body: text })}}
                                >
                                    {note.body}
                                </EditableItem>
                                <Divider />
                                </>
                            ))}
                        </List>
                        <Box sx={{ flexGrow: 1 }} />
                        {/* <Button variant="outlined" startIcon={<CheckCircleOutlineIcon />}>
                        Update
                        </Button> */}
                        <SpeedDial
                        ariaLabel='Card add'
                        sx={{ position: 'absolute', bottom: -32, right: -32 }}
                        icon={<SpeedDialIcon />}
                        >
                            {cardActions.map((action) => (
                                <SpeedDialAction
                                    key={action.name}
                                    icon={action.icon}
                                    tooltipTitle={action.name}
                                    onClick={handleCreateText}
                                />
                            ))}
                        </SpeedDial>
                    </Paper>
                </Box>
            </Modal>
            <Paper
            sx={{ maxWidth: 900, mx: 'auto', my: 2, p: 2, backgroundColor: 'neutral.main' }}
            >
                <Stack spacing={3}>
                    <Box
                    sx={{ display: 'flex' }}
                    >
                        <Typography variant='h3' color='primary.main'>
                            {date.toLocaleString('default', { month: 'long' })}
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                            label='date'
                            inputFormat='MM/yyyy'
                            value={date}
                            disableFuture
                            onChange={handleDayOpen}
                            onMonthChange={handleDateChange}
                            renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Box>
                    <Box
                    sx={{ display: 'flex', gap: '5px', px: 10 }}
                    >
                        {weekdays.map((item) => (
                            <Typography
                            key={item}
                            sx={{ 
                                minWidth: 100,
                            }}
                            variant='subtitle1'
                            color='primary.main'
                            textAlign='center'
                            >
                                {item}
                            </Typography>
                        ))}
                    </Box>
                    <Box
                    sx={{ display: 'flex', flexWrap: 'wrap', gap: '5px', px: 10 }}
                    >
                        {stubDays.map((item, index) => (
                            <Box
                            key={index}
                            sx={{ 
                                minWidth: 100,
                                height: 100,
                            }}
                            />
                        ))}
                        {days.map((item, index) => (
                            <Card 
                            key={index}
                            sx={{ 
                                minWidth: 100,
                                height: 100,
                            }}
                            >
                                <CardActionArea
                                onClick={() => {handleCardOpen(new Date(date.getFullYear(), date.getMonth(), index + 1))}}
                                sx={{ 
                                    p: 1,
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start'
                                }}
                                >
                                    <Typography variant='subtitle1'>
                                        {index + 1}
                                    </Typography>
                                    <Typography variant='caption'>
                                        {
                                            item && (
                                            item.title.length > 12 ?
                                            (item.title).substring(0, 12) + '...' :
                                            item.title
                                            )
                                        }
                                    </Typography>
                                    <Box sx={{ flexGrow: 1 }} />
                                    <Box
                                    sx={{ display: 'flex', width: '100%' }}
                                    >
                                        <Box sx={{ flexGrow: 1 }} />
                                        <IconButton>
                                            <MoreHorizIcon />
                                        </IconButton>
                                    </Box>
                                </CardActionArea>
                            </Card>
                        ))}
                    </Box>
                </Stack>
            </Paper>
        </>
    )
}

export default Dashboard