module.exports = (sequelize, Sequelize) => {
    const Actor = sequelize.define("actor",{
        nombre: {
            type: Sequelize.STRING
        }
    });
    return Actor;
}