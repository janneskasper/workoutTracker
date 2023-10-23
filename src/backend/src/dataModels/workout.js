const {Sequelize, DataTypes} = require("sequelize")
const db = require("../config/database")

const Workout = db.define("workout_t", {
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        allowNull: false
    }
})

module.exports = Workout