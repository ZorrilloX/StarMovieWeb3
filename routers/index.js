//esta es la salida para exportar lo conjunto de modulos de esta carpeta
module.exports = app => {
    require('./directores.routes')(app);
    require('./actores.routes')(app);
    require('./pelis.routes')(app);
    require('./reparto.routes')(app);
    require('./dashboard.routes')(app);
}