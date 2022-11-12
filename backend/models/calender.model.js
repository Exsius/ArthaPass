const calender = (Sequelize, sequelize) => {
    return sequelize.define("calenders", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        date: {
            type: Sequelize.DATEONLY,
        },
    })
}

export default calender