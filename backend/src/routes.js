const express = require("express");

const route = express.Router();

const OngsController = require("./controllers/OngsControllers");
const IncidentsController = require("./controllers/IncidentController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");

route.get("/sessions", SessionController.create);

route.post("/ongs", OngsController.store);
route.get("/ongs", OngsController.index);
route.get("/incident", IncidentsController.index);
route.post("/incident", IncidentsController.store);
route.delete("/incident/:id", IncidentsController.delete);
route.get("/profile", ProfileController.index);

module.exports = route;
