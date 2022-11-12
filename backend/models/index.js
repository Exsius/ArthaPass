import { Sequelize, ValidationErrorItemType } from 'sequelize'
import userModel from './user.model.js'
import noteModel from './note.model.js'

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {dialect: 'mysql'})

export const User = userModel(Sequelize, sequelize) 
export const Note = noteModel(Sequelize, sequelize)

sequelize.sync()