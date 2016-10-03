let http = require('http');
let employeeService = require('./lib/employees');
let responder = require('./lib/responseGenerator');
let staticFile = responder.staticFile('/public');

http.createServer((req, res) => {
  // a parsed url to work with in case there are parameters
  let _url;

  // in case the client uses lowercase for methods.
  req.method = req.method.toUpperCase();
  console.log(`${req.method} ${req.url}`);
  if (req.method !== 'GET') {
    res.writeHead(501, {
      'Content-Type': 'text/plain'
    });
    return res.end(`${req.method} is not supported by this server`);
  }

  if (_url = /^\/employees$/i.exec(req.url)) {
    // return a list of employees
    employeeService.getEmployees((error, data) => {
      if (error) {
        responder.send500(error, res);
      }
      return responder.sendJson(data, res);
    });
  } else if (_url = /^\/employees\/(\d+)$/i.exec(req.url)) {
    // find the employee by the id in the route
    employeeService.getEmployee(_url[1], (error, data) => {
      if (error) {
        return responder.send500(error, res);
      }
      if (!data) {
        return responder.send404(res);
      }
      responder.sendJson(data, res);
    });
  } else {
    // try to send the static file if it exists, if not send 404
    res.writeHead(200);
    res.end('static file maybe');
  }
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337');
