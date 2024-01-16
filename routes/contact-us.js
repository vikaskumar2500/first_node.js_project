const express = require("express");

const router = express.Router();
const { getContact, postContact } = require("../controllers/contact-us");

router.get("/contact-us", getContact);
router.post("/contact-us", postContact);

module.exports = router;
