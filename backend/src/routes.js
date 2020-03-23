const express = require("express");

const route = express.Router();

route.get("/", (req, res) => {
  return res.json({ message: "Hello OmniStack11" }).send();
});

module.exports = route;
