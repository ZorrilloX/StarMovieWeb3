const db = require('../models');
// Ruta para la página principal de películas (ordenadas por puntuación)
exports.getPelis = async function(req, res) {
    //obtener por orden de su calificacion de rotten tomatoes a la lista de peliculas y nombre de directores:
    const peliculas = await db.pelis.findAll({
        order: [['calificacion_rotten_tomatoes', 'DESC']],
        include: [{ model: db.directores }]
    });
    //res.send(peliculas);
    res.render('dashboard.ejs', { peliculas: peliculas });
}

exports.getPeliculaDetalle = async function(req, res) {
    //obtenemos la lista de atributos de una pelicula con su id, tambien conseguimos todo el reparto de actores la tabla reparto y el nombre del director
    const pelicula = await db.pelis.findByPk(req.params.id, {
        include: [
            { model: db.directores },
            {
                model: db.reparto,
                include: [{ model: db.actores }]
            }
        ]
    });
    //res.send(pelicula);
    res.render('peliDetalle.ejs', { pelicula: pelicula });
}

exports.getPersonaDetalle = async function(req, res) {
    const personaId = req.params.id;
    let persona = null;
    let esDirector = false;

    if (req.path.includes('actor')) { // Verificar si la URL es para actores o directores
        persona = await db.actores.findByPk(personaId, {
            include: [{
                model: db.reparto,
                include: [{ model: db.pelis }]
            }]
        });
    } else if (req.path.includes('director')) {
        persona = await db.directores.findByPk(personaId, {
            include: [{ model: db.pelis }]
        });
        esDirector = true; // Marcar que es un director
    }
    if (!persona) {
        return res.status(404).send('Persona no encontrada');
    }
    //res.send(persona);
    res.render('personaDetalle.ejs', { persona, esDirector });
};
