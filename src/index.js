const http = require("http");
const fs = require("fs");
const url = require("url");
const { join } = require("path");

const gif = fs.readFileSync(join(__dirname, "./test.gif"));

http
  .createServer(function (request, response) {
    const pathname = url.parse(request.url).pathname;
    if (pathname === "/base64") {
      response.writeHead(200, {
        "Content-Type": 'application/json; ',
        "Access-Control-Allow-Origin": "*"
      });
      
      response.end(
        JSON.stringify({
          base64: gif.toString('base64'),
        })
      );
    } else if (pathname === "/download") {
      response.writeHead(200, {
        "Content-Disposition": "attachment; filename=a.gif",
        "Content-Type": "image/gif; ",
      });
      response.end(gif);
    } else {
      response.write("Hello World");
      response.end();
    }
  })
  .listen(2345);

