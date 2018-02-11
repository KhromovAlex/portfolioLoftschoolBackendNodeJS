var express = require("express");
var router = express.Router();

const ctrlHome = require("../controllers/homepage");
const ctrlAbout = require("../controllers/about");
const ctrlBlog = require("../controllers/blog");
const ctrlWorks = require("../controllers/works");

/* GET home page. */
router.get("/", ctrlHome.getIndex);
router.get("/about", ctrlAbout.getAbout);
router.get("/blog", ctrlBlog.getBlog);
router.get("/works", ctrlWorks.getWorks);

/* POST home page */
router.post("/works/contact", ctrlWorks.sendEmail);
router.post("/", ctrlHome.auth);

module.exports = router;
