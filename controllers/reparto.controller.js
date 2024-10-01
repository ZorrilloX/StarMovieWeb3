const db = require('../models');

exports.mostrarReparto = async function(req, res) {
    const idPeli = req.params.id;
    try {
        let peli = null;
        let reparto;
        if (idPeli >0) {// Si hay un ID de película, obtener esa película y su reparto
            peli = await db.pelis.findByPk(idPeli); 
            reparto = await db.reparto.findAll({
                where: { id_peli: idPeli }, 
                include: [{ model: db.actores }, { model: db.pelis }]
            });
        } else if(idPeli == 0) {// Si ID es 0 obtener todos los reparto
            reparto = await db.reparto.findAll({
                include: [{ model: db.actores }, { model: db.pelis }]
            });
        }
        res.render('reparto/list.ejs', { reparto, peli });
    } catch (error) {console.error(error); res.status(500).send('Error al obtener el reparto');}
};

exports.crearReparto = async function(req, res) {
    const peli = await db.pelis.findByPk(req.params.id);
    
    // Obtener los actores ya asignados al reparto de la película
    const actoresEnReparto = await db.reparto.findAll({
        where: { id_peli: req.params.id },
        include: [{ model: db.actores, attributes: ['id', 'nombre'] }]
    });

    const idsActoresEnReparto = actoresEnReparto.map(reparto => reparto.id_actor);

    // Obtener los actores que aún no están en el reparto
    const actoresDisponibles = await db.actores.findAll({
        where: {
            id: { [db.Sequelize.Op.notIn]: idsActoresEnReparto }
        }
    });

    // Extraer los actores ya asignados para mostrarlos en la lista
    const actoresSeleccionados = actoresEnReparto.map(reparto => ({
        id: reparto.actor.id,
        nombre: reparto.actor.nombre
    }));

    res.render('reparto/form.ejs', { peli, actoresDisponibles, actoresSeleccionados });
};
exports.insertReparto = async function(req, res) {
    const id_actores = req.body['id_actores[]']; 
    const peliculaId = req.params.id; 
    console.log(req.body); 
    try {
        const actoresExistentes = await db.reparto.findAll({
            where: { id_peli: peliculaId },
            attributes: ['id_actor'] 
        });

        const idsActoresExistentes = actoresExistentes.map(reparto => reparto.id_actor); // IDs ya en la BD

        // Iterar sobre los actores seleccionados y actualizar los registros en la tabla de reparto
        for (let i = 0; i < id_actores.length; i++) {
            const actorId = parseInt(id_actores[i]);

            if (i < idsActoresExistentes.length) {
                // Si el índice está dentro del rango, actualizar el registro existente
                await db.reparto.update(
                    { id_actor: actorId },
                    {
                        where: {
                            id_actor: idsActoresExistentes[i], // Actualizar el actor existente
                            id_peli: peliculaId
                        }
                    }
                );
            } else {
                // Si hay nuevos actores, añadirlos
                await db.reparto.create({
                    id_actor: actorId,
                    id_peli: peliculaId
                });
            }
        }

        res.redirect(`/pelis/${peliculaId}/reparto`);
    } catch (error) {
        console.error("Error al insertar el reparto:", error);
        res.status(500).json({ error: "Hubo un problema al asignar actores." });
    }
};

// Eliminar actor del reparto
exports.eliminarActorReparto = async function(req, res) {
    const idActor = req.params.idActor;
    const idPeli = req.params.id;
    await db.reparto.destroy({
        where: {
            id: idActor
        }
    });
    res.redirect(`/pelis/${idPeli}/reparto`);
};