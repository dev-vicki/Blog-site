const http = require('http');

const server = http.createServer((req, res) => {
  // console.log('request made');
  console.log(req.url, req.method);

  // set header content type
  res.setHeader('content-type', 'text/html');

  res.write('<head><link rel="StyleSheet" href="#"</head>');
  res.write('<p>hello, ninjas</p>');
  res.write('<p>wassup? ninjas</p>');
  res.end();
});

server.listen(3000, 'localhost', () => {
  console.log('listening for request on port 3000');
}); 