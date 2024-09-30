const db = require('../models');
const { manejarImagen } = require('../utils/manejoImagenes');
const { formatDate } = require('../utils/date.utils');

exports.mostrarPelis = function(req,res){
    db.pelis.findAll().then(pelis => {
        res.send(pelis)
    })
}
exports.listaPelis = async function(req,res){
    await db.pelis.findAll({
        include: [db.directores]
    }).then(pelis => {
        res.render('pelis/list.ejs', {pelis: pelis, formatDate: formatDate});
    });
}



exports.crearPeli = async function(req, res){
    const directores = await db.directores.findAll();
    res.render('pelis/form.ejs', {peli: null, directores})
}
exports.insertPeli = async function(req, res){
    const peli = await db.pelis.create({
        nombre: req.body.nombre,
        sinopsis: req.body.sinopsis,
        fecha_lanzamiento: req.body.fecha_lanzamiento,
        trailer_youtube: req.body.trailer_youtube,
        calificacion_rotten_tomatoes: req.body.calificacion_rotten_tomatoes,
        id_director: req.body.id_director
    });
    
    try { //INSERTAR IMAGEN
        await manejarImagen(req,false,peli.id,'portadas');
        res.redirect('/pelis/lista');
    } catch (error){ console.log(error); res.send('Error al subir la imagen, en controller');}
    
}



exports.deletePeli = async function (req, res){
    const id = req.params.id;
    await db.reparto.destroy({
        where: {
            id_peli: id
        }
    });
    await db.pelis.destroy({
        where: {
            id: id
        }
    });
    try { // ELIMINAR IMAGEN SI EXISTE
        await manejarImagen(req,true,id,'portadas'); 
    } catch (error) { console.log(error); res.send('error al eliminar la imagen')}

    res.redirect('/pelis/lista');
}


exports.editarPeli = async function (req, res) {
    const id = req.params.id;
    const directores = await db.directores.findAll();
    const peli = await db.pelis.findByPk(id);

    // Asegúrate de formatear la fecha antes de pasarla a la vista
    peli.fecha_lanzamiento = formatDate(peli.fecha_lanzamiento);

    res.render('pelis/form.ejs', {peli: peli, directores});
}

exports.actualizarPeli = async function (req, res) {
    const id = req.params.id;
    const peli = await db.pelis.findByPk(id);

    peli.nombre = req.body.nombre;
    peli.sinopsis = req.body.sinopsis;
    peli.fecha_lanzamiento = req.body.fecha_lanzamiento;
    peli.trailer_youtube = req.body.trailer_youtube;
    peli.calificacion_rotten_tomatoes = req.body.calificacion_rotten_tomatoes;
    peli.id_director = req.body.id_director;

    await peli.save();
    try { //ACTUALIZAR IMAGEN
        await manejarImagen(req, false, id,'portadas');
    } catch (error) { console.log(error); res.send('Error al subir la imagen, en controller'); }

    res.redirect('/pelis/lista');
}