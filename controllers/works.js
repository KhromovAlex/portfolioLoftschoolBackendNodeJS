const nodemailer = require("nodemailer");
const config = require("../config/config.json");
const mongoose = require("mongoose");
const axios = require('axios');

module.exports.getWorks = function(req, res, next) {
  axios
    .get(config.api.server + "/api/works")
    .then(response => {
      res.render("pages/works", response.data); 
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports.sendEmail = function(req, res) {
  if (!req.body.username || !req.body.email || !req.body.text) {
    return res.json({ msgMail: "Все поля нужно заполнить!" });
  }
  const transporter = nodemailer.createTransport(config.mail.smtp);
  const mailOptions = {
    from: config.mail.smtp.auth.user,
    to: config.mail.smtp.auth.user,
    sender: req.body.email,
    subject: config.mail.subject,
    text:
      req.body.text.trim().slice(0, 500) +
      `\n Отправлено с: <${req.body.email}>`
  };

  //отправляем почту
  transporter.sendMail(mailOptions, function(error, info) {
    //если есть ошибки при отправке - сообщаем об этом
    if (error) {
      return res.json({
        msgMail: "При отправке письма произошла ошибка" + error.message
      });
    }
    res.json({ msgMail: "Письмо успешно отправлено" });
  });
};
