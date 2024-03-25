const express = require("express");
const { LocalStorage } = require("node-localstorage");
const fs = require("fs");
const path = require("path");
const { p } = require("../path");

const router = express.Router();

localStorage = new LocalStorage("./scratch");

router.post("/login", (req, res, next) => {
  const { username } = req.body;
  console.log(username);
  localStorage.setItem("username", username);
  res.redirect("/");
});
router.get("/login", (req, res, next) => {
  res.render("login");
});

router.post("/", (req, res, next) => {
  const { message } = req.body;
  const username = localStorage.getItem("username");
  console.log(message, username);

  fs.readFile(path.join(p + "modals/chats.txt"), (e, data) => {
    if (e) {
      console.log(e);
    }
    fs.writeFile(
      path.join(p + "modals/chats.txt"),
      `${data || ""} ${username}:${message}`,
      (e) => console.log(e)
    );
  });

  res.redirect("/");
});
router.get("/", (req, res, next) => {
  fs.readFile(path.join(p + "modals/chats.txt"), (e, data) => {
    if (e) {
      console.log(e);
    }
    console.log(data);
    const d = Buffer.from(data, "utf-8").toString("utf-8");
    res.render("chat", {
      data: d,
    });
  });
});

module.exports = router;
