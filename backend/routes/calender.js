import { checkAuth } from '../middleware/auth.middleware.js'
import { getNotesByDate, createNote, updateNote, deleteNote } from '../controllers/calender.controller.js'

const calender = (express, router) => {
    router.post(
        '/getNotes',
        checkAuth,
        getNotesByDate
    )
    router.post(
        '/createNote',
        checkAuth,
        createNote
    ),
    router.post(
        '/updateNote',
        checkAuth,
        updateNote
    )
    router.post(
        '/deleteNote',
        checkAuth,
        deleteNote
    )
}

export default calender