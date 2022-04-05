export default (Sequelize, DataTypes) => {
    return Sequelize.define('reward', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        total_reward: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    })
}
