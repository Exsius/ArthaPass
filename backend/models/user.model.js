const user = (Sequelize, sequelize) => {
    return sequelize.define("users", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        authority: {
            type: Sequelize.INTEGER,
        },
        username: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING,
        },
    })
}

export default user