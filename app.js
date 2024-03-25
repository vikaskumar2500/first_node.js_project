const express = require("express");
const router = require("./routes/main");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;


// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(cookieParser())

// set engine
app.set("views", "./views");
app.set("view engine", "ejs");

// make static folder
app.use(express.static(path.join(__dirname, "public")));

app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
