module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/dashboard.controller");

    router.get("/", controller.getPelis);
    router.get("/:id", controller.getPeliculaDetalle);
    router.get("/actor/:id", controller.getPersonaDetalle);
    router.get("/director/:id", controller.getPersonaDetalle);


    app.use('/StarMovie', router);
}