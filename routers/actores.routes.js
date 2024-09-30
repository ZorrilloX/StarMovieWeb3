module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/actores.controller");

    router.get("/", controller.mostrarActores);
    router.get("/lista", controller.listaActores);
    router.get("/create", controller.crearActor);
    router.post("/create", controller.insertActor);
    router.post("/:id/delete", controller.deleteActor);
    router.get("/:id/edit", controller.editarActor);
    router.post("/:id/edit", controller.actualizarActor);

    app.use('/actores', router);
}