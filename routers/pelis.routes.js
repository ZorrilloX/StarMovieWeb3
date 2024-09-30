module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/pelis.controller");

    router.get("/", controller.mostrarPelis);
    router.get("/lista", controller.listaPelis);
    router.get("/create", controller.crearPeli);
    router.post("/create", controller.insertPeli);
    router.post("/:id/delete", controller.deletePeli);
    router.get("/:id/edit", controller.editarPeli);
    router.post("/:id/edit", controller.actualizarPeli);

    app.use('/pelis', router);
}