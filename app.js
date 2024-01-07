const http = require("http");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/add-product", (req, res) => {
  res.send(`
    <form action='/add-product' method="POST">
      <input id='product' name='product' type='text'/>
      <input id='id' name='id' type='number'/>
      <button type='submit'>Submit</button>
    </form>
  `);
  console.log('body', req.body);
});


app.use((req, res) => {
  console.log("I am in the next middleware");
  res.send("<div>Hello world</div>");
});

// const server = http.createServer(app);

// server.listen(3001);
app.listen(3001);
