module.exports = (sequelize, Sequelize) => {
    const Reparto = sequelize.define("reparto",{
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_peli:{
            type: Sequelize.INTEGER
        },
        id_actor:{
            type: Sequelize.INTEGER
        }
    });
    return Reparto;
};