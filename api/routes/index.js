var express = require("express");
var router = express.Router();

const isAdmin = (req, res, next) => {
  // если в сессии текущего пользователя есть пометка о том, что он является
  // администратором
  if (req.session.isAdmin) {
    //то всё хорошо :)
    return next();
  }
  //если нет, то перебросить пользователя на главную страницу сайта
  res.redirect("/");
};

const ctrlBlog = require("../controllers/blog");
const ctrlUser = require("../controllers/user");
const ctrlAbout = require("../controllers/about");
const ctrlWorks = require("../controllers/works");

// works
router.get("/works", ctrlWorks.getSlide);
router.post("/works", ctrlWorks.createSlide);

// about
router.get("/", ctrlAbout.getSkills);
router.put("/", ctrlAbout.editSkills);

// blog
router.get("/blog", ctrlBlog.getArticle);
router.post("/blog", isAdmin, ctrlBlog.createArticle);
router.put("/blog:id", isAdmin, ctrlBlog.editArticle);
router.delete("/blog:id", isAdmin, ctrlBlog.deleteArticle);

router.post("/user", ctrlUser.isAuth);

module.exports = router;
