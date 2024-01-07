const http = require("node:http");

const server = http.createServer((req, res) => {
  if (req.url === "/home" || req.url === "/") {
    res.write("<html>");
    res.write("<head><title>HOME</title></head>");
    res.write("<body><h2>Welcome Home</h2></body>");
    res.write("</html>");
    res.end();
  } else if (req.url === "/about") {
    res.write("<html>");
    res.write("<head><title>HOME</title></head>");
    res.write("<body><h2>Welcome to About Us page</h2></body>");
    res.write("</html>");
    res.end();
  } else if (req.url === "/node") {
    res.write("<html>");
    res.write("<head><title>HOME</title></head>");
    res.write("<body><h2> Welcome to my Node Js project</h2></body>");
    res.write("</html>");
    res.end();
  }
  res.end();
});

server.listen(3001);
