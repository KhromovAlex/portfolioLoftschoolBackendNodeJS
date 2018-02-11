"use strict";

const apiConfig = require("../config/config.json");
const axios = require("axios");

module.exports.getBlog = function(req, res, next) {
  const pathApi = "/api/blog";

  axios
    .get(apiConfig.api.server + pathApi)
    .then(response => {
      res.render("pages/blog", response.data);
    })
    .catch(err => {
      console.log(err);
    });
};
