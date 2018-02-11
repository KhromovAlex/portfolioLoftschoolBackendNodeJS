"use strict";
const axios = require("axios");
const mongoose = require("mongoose");

module.exports.getSkills = function(req, res, next) {
  const Model = mongoose.model("skill");
  Model.find().then(items => {
    res.json({ skills: items });
  });
};

module.exports.editSkills = function(req, res, next) {
  const Model = mongoose.model("skill");
  let models = [];

  req.body.skills
    .map(skill => ({
      name: skill.name,
      perc: skill.perc,
      type: skill.type
    }))
    .forEach(toSave => models.push(new Model(toSave)));

  if (models.filter(m => m.validateSync()).length) {
    return res.json({ msg: "Не удалось сохранить данные!" });
  }

  Model.remove({}).then(() => {
    Model.insertMany(models).then(() => {
      res.json({ msg: "Сохранено!" });
    });
  });
};
