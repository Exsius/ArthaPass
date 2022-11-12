const note = (Sequelize, sequelize) => {
    return sequelize.define("notes", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: Sequelize.STRING,
        },
        date: {
            type: Sequelize.DATEONLY,
        },
        content: {
            type: Sequelize.JSON,
        }
    })
}

export default note