module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/reparto.controller");

    router.get("/:id/reparto", controller.mostrarReparto);
    router.get("/:id/reparto/create", controller.crearReparto);
    router.post("/:id/reparto/create", controller.insertReparto);
    router.post("/:id/reparto/:idActor/delete", controller.eliminarActorReparto);

    app.use('/pelis', router);
};
