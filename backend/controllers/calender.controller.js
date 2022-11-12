import { Note } from '../models/index.js'
import { Op } from 'sequelize'

export const getNotesByDate = async (req, res) => {
    const date = new Date(req.body.date)
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1)

    try {
        res.status(200).send(await Note.findAll({
            where: {
                date: {
                    [Op.between]: [firstDay, lastDay]
                }
            }
        }))
    } catch {
        res.sendStatus(400)
    }
}

export const updateNote = async (req, res) => {
    const { id, title, content } = req.body
    if (id) {
        try {
            await Note.update({
                title: title,
                content: content
            }, {
                where: { id: id }
            })
            res.sendStatus(200)
        } catch (err) {
            res.sendStatus(400)
        }
    } else {
        createNote(req, res)
    }
}

export const deleteNote = async (req, res) => {
    const { id } = req.body
    try {
        await Note.update({
            date: null
        }, {
            where: { id: id }
        })
        res.sendStatus(200)
    } catch (err) {
        res.sendStatus(400)
    }
}

export const createNote = async (req, res) => {
    try {
        await Note.create({
            title: req.body.title,
            content: req.body.content,
            date: req.body.date,
        })
        res.sendStatus(201)
    } catch {
        res.sendStatus(400)
    }
}