module.exports = (sequelize, Sequelize) => {
    const Director = sequelize.define("director",{
        nombre: {
            type: Sequelize.STRING
        }
    });
    return Director;
}