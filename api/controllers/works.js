"use strict";
const axios = require("axios");
const mongoose = require("mongoose");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const config = require("../../config/config");

module.exports.getSlide = (req, res, next) => {
  const Model = mongoose.model("slide");
  Model.find().then(item => {
    res.status(200).json({slides: item});
  });
};

module.exports.createSlide = (req, res, next) => {
  let form = new formidable.IncomingForm();
  let upload = config.upload.images;
  let fileName;

  if (!fs.existsSync(upload)) {
    fs.mkdirSync(upload);
  }

  form.uploadDir = path.join(process.cwd(), upload);

  form.parse(req, function(err, fields, files) {
    if (err) {
      return res.json({ msg: "Не удалось загрузить картинку" });
    }

    if (!fields.name || !fields.tech || !files.picture) {
      if (files.picture) {
        fs.unlink(files.picture.path);
      }
      return res.json({ msg: "Заполните все поля!!!" });
    }

    fileName = path.join(upload, files.picture.name);

    fs.rename(files.picture.path, fileName, function(err) {
      if (err) {
        console.log(err);
        fs.unlink(fileName);
        fs.rename(files.picture.path, fileName);
      }

      const Model = mongoose.model("slide");
      let dir = fileName.substr(fileName.indexOf("\\"));
      const item = new Model({
        name: fields.name,
        tech: fields.tech,
        picture: dir
      });

      item
        .save()
        .then(slide =>
          res.status(201).json({ msg: "Проект успешно добавлен!" })
        )
        .catch(e => res.status(400).json({ message: e.message, error: e }));
    });
  });
};
