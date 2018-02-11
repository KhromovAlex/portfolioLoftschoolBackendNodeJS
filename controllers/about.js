"use strict";

const apiConfig = require("../config/config.json");
const axios = require("axios");
const pathApi = "/api/";

module.exports.getAbout = function(req, res, next) {
  axios
    .get(apiConfig.api.server + pathApi)
    .then(response => {
      res.render("pages/about", response.data);
    })
    .catch(err => {
      console.log(err);
    });
};
