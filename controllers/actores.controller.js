const db = require('../models');
const { manejarImagen } = require('../utils/manejoImagenes');

exports.mostrarActores = function(req,res){
    db.actores.findAll().then(actores => {
        res.send(actores)
    })
}
exports.listaActores = function(req, res){
    db.actores.findAll().then(actores => {
        res.render('actores/list.ejs', {actores: actores})
    })
}



exports.crearActor = function(req, res){
    res.render('actores/form.ejs', {actor: null})
}
exports.insertActor = async function(req, res){
    const actor = await db.actores.create({
        nombre: req.body.nombre
    });
    
    try { //INSERTAR IMAGEN
        await manejarImagen(req,false,actor.id,'actores');
        res.redirect('/actores/lista');
    } catch (error){ console.log(error); res.send('Error al subir la imagen, en controller');}
    
}




exports.deleteActor = async function(req, res) {
    const id = req.params.id;
    await db.reparto.destroy({
        where: {
            id_actor: id
        }
    });
    await db.actores.destroy({
        where: {
            id: id
        }
    });
    try { // ELIMINAR IMAGEN SI EXISTE
        await manejarImagen(req,true,id,'actores'); 
    } catch (error) { console.log(error); res.send('error al eliminar la imagen')}

    res.redirect('/actores/lista');
}




exports.editarActor = async function(req, res){
    const id = req.params.id;
    const actor = await db.actores.findByPk(id);
    res.render('actores/form.ejs',{actor: actor})
}
exports.actualizarActor = async function(req, res) {
    const id = req.params.id;
    const actor = await db.actores.findByPk(id);

    actor.nombre = req.body.nombre;
    await actor.save();

    try { //ACTUALIZAR IMAGEN
        await manejarImagen(req, false, actor.id,'actores');
    } catch (error) { console.log(error); res.send('Error al subir la imagen, en controller'); }

    res.redirect('/actores/lista');
}