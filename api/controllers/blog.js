"use strict";

const mongoose = require("mongoose");

module.exports.getArticle = (req, res, next) => {
  const blog = mongoose.model("blog");

  blog.find().then(items => {
    res.json({ articles: items });
  });
};

module.exports.createArticle = (req, res, next) => {
  //создаем новую запись блога и передаем в нее поля из формы
  const Model = mongoose.model("blog");

  if (!req.body.title || !req.body.text) {
    return res.json({ message: "Заполните все поля!" });
  }

  if (req.body.date) {
    var item = new Model({
      title: req.body.title,
      date: new Date(req.body.date),
      text: req.body.text
    });
  } else {
    var item = new Model({
      title: req.body.title,
      text: req.body.text
    });
  }

  //сохраняем запись в базе
  item
    .save()
    .then(item => {
      return res.status(201).json({ message: "Запись успешно добавлена" });
    })
    .catch(err => {
      res.status(400).json({
        message: `При добавление записи произошла ошибка`
      });
    });
};

module.exports.editArticle = (req, res, next) => {
  const id = req.params.id;
  let data = {
    title: req.body.title,
    date: new Date(req.body.date),
    body: req.body.text
  };

  const Model = mongoose.model("blog");

  Model.findByIdAndUpdate(id, { $set: data })
    .then(item => {
      // console.log(item);
      if (!!item) {
        res.status(200).json({ message: "Запись успешно обновлена" });
      } else {
        res.status(404).json({ message: "Запись в БД не обнаружена" });
      }
    })
    .catch(err => {
      res.status(400).json({
        message: `При обновлении записи произошла ошибка:  + ${err.message}`
      });
    });
};

module.exports.deleteArticle = (req, res, next) => {
  const id = req.params.id;
  const Model = mongoose.model("blog");

  Model.findByIdAndRemove(id)
    .then(item => {
      if (!!item) {
        res.status(200).json({ message: "Запись успешно удалена" });
      } else {
        res.status(404).json({ message: "Запись в БД не обнаружена" });
      }
    })
    .catch(err => {
      res.status(400).json({
        message: `При удалении записи произошла ошибка: ' + ${err.message}`
      });
    });
};
