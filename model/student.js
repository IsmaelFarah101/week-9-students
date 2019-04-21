module.exports = (sequelize, DataTypes) => {
    let Student = sequelize.define('Student', {
        name: {type: DataTypes.STRING, allowNull: false},
        starID: {type : DataTypes.STRING, allowNull: false},
        present: {type: DataTypes.BOOLEAN, allowNull:false, defaultValue: false}
    })
    Student.sync({force:false}).then(() => {
        console.log("synced table")
    })
    return Student
}