import { Sequelize, ValidationErrorItemType } from 'sequelize'

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {host: 'localhost', dialect: 'mysql'})

import userModel from './user_model.js'

export const user = userModel(Sequelize, sequelize) 

sequelize.sync()