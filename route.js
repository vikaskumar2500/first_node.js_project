const fs = require("fs");

const requestHandler = (req, res) => {
  // creating form
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    const data = fs.readFileSync("./message.txt", "utf8");
    res.setHeader("Content-Type", "text/html");
    res.write(`
      <html>
        <body>
          <form action='/message' method='POST' >
            <input id='message' name='message'/>
            <button type='submit'>Sumbit</button>
          </form>
          <div>${data}</div>
        </body>
      </html>
    `);
    return res.end();
  } else if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    return req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      // console.log('pasebody', parseBody);  // key=value
      const message = parseBody.split("=")[1];

      const file = fs.writeFile("message.txt", message, (error) => {
        console.log("error", error);
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
      console.log("file", file);
    });
  }
  res.write(`
    <html>
      <body>
        <div>Loading...</div>
      </body>
    </html>
  `);
  res.end();
};

module.exports = {
  handler: requestHandler,
  someText: "Test only",
};
