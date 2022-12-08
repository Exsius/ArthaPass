const password = (Sequelize, sequelize) => {
    return sequelize.define("passwords", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: Sequelize.INTEGER,
        },
        site: {
            type: Sequelize.STRING,
        },
        username: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING,
        },
        strength: {
            type: Sequelize.DOUBLE,
        },
        status: {
            type: Sequelize.STRING,
        },
        history: {
            type: Sequelize.JSON,
        },
    })
}

export default password