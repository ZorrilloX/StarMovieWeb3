const db = require('../models');
const { manejarImagen } = require('../utils/manejoImagenes'); 
exports.mostrarDirectores = function(req,res){
    db.directores.findAll().then(directores => {
        res.send(directores)
    })
}
exports.listaDirectores = function(req, res){
    db.directores.findAll().then(directores => {
        res.render('directores/list.ejs', {directores: directores})
    })
}



exports.crearDirector = function(req, res){
    res.render('directores/form.ejs', {director: null})
}
exports.insertDirector = async function(req, res){
    const director = await db.directores.create({
        nombre: req.body.nombre
    });
    
    try { //INSERTAR IMAGEN
        await manejarImagen(req,false,director.id,'directores');
        res.redirect('/directores/lista');
    } catch (error){ console.log(error); res.send('Error al subir la imagen, en controller');}
    
}




exports.deleteDirector = async function(req, res) {
    const id = req.params.id;
    await db.directores.destroy({
        where: {
            id: id
        }
    });
    try { // ELIMINAR IMAGEN SI EXISTE
        await manejarImagen(req,true,id,'directores'); 
    } catch (error) { console.log(error); res.send('error al eliminar la imagen')}

    res.redirect('/directores/lista');
}




exports.editarDirector = async function(req, res){
    const id = req.params.id;
    const director = await db.directores.findByPk(id);
    res.render('directores/form.ejs',{director: director})
}
exports.actualizarDirector = async function(req, res) {
    const id = req.params.id;
    const director = await db.directores.findByPk(id);

    director.nombre = req.body.nombre;
    await director.save();

    try { //ACTUALIZAR IMAGEN
        await manejarImagen(req, false, director.id,'directores');
    } catch (error) { console.log(error); res.send('Error al subir la imagen, en controller'); }

    res.redirect('/directores/lista');
}