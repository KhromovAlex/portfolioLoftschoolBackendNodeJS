"use strict";

const axios = require("axios");
const apiConfig = require("../config/config");

module.exports.getIndex = (req, res, next) => {
    
  res.render("pages/index", {msg: req.query.msg});
};

module.exports.auth = (req, res, next) => {
  console.log(req.body)
  if (!req.body.login || !req.body.password) {
    return res.redirect('/?msg=Все поля обязательны к заполнению!#auth');
  }
  if ( !req.body.radioAuth || !req.body.checkAuth || req.body.radioAuth !== 'yes' || req.body.checkAuth !== 'yes' ) {
    return res.redirect('/?msg=Роботам тут не место!#auth');
  }
  const pathApi = "/api/user";
  axios
    .post(apiConfig.api.server + pathApi, {
      login: req.body.login,
      password: req.body.password
    })
    .then(Response => {
      req.session.isAdmin = true;
      res.redirect("/admin");      
    })
    .catch(err => {
      res.redirect('/?msg=Ошибка!#auth');
    });
};
