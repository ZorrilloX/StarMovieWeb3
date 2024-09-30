module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/directores.controller");

    router.get("/", controller.mostrarDirectores);
    router.get("/lista", controller.listaDirectores);
    router.get("/create", controller.crearDirector);
    router.post("/create", controller.insertDirector);
    router.post("/:id/delete", controller.deleteDirector);
    router.get("/:id/edit", controller.editarDirector);
    router.post("/:id/edit", controller.actualizarDirector);

    app.use('/directores', router);
}