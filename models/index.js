const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        dialect: "mysql",
    }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//declaracion de las entidades--------------------//
db.directores = require('./directores.model.js')(sequelize, Sequelize);
db.actores = require('./actores.model.js')(sequelize, Sequelize);
db.pelis = require('./pelis.model.js')(sequelize, Sequelize);
db.reparto = require('./reparto.model.js')(sequelize, Sequelize);


//declaraciones de relacion de tablas como 1 to N / N to N: -------------

// Relaciones
db.actores.hasMany(db.reparto, { foreignKey: 'id_actor' });
db.reparto.belongsTo(db.actores, { foreignKey: 'id_actor'});

db.pelis.hasMany(db.reparto, { foreignKey: 'id_peli' });
db.reparto.belongsTo(db.pelis, { foreignKey: 'id_peli' });

db.directores.hasMany(db.pelis, { foreignKey: 'id_director' });
db.pelis.belongsTo(db.directores, { foreignKey: 'id_director' });

//DECLARACION FINAL ----------------------------------------------------------------
module.exports = db;