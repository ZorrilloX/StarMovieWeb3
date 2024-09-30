module.exports = (sequelize, Sequelize) => {
    const Peli = sequelize.define("pelis",{
        nombre: {
            type: Sequelize.STRING
        },
        sinopsis: {
            type: Sequelize.TEXT
        },
        fecha_lanzamiento: {
            type: Sequelize.DATE
        },
        trailer_youtube: {
            type: Sequelize.STRING
        },
        calificacion_rotten_tomatoes:{
            type: Sequelize.INTEGER,
            validate: {
                min: 1,
                max: 100
            }
        },
        id_director:{
            type: Sequelize.INTEGER,
            References: {
                model: 'directores',
                key: 'id'
            }
        }
    });
    return Peli;
}