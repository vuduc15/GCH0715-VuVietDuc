var http = require('http');

//create a server object:
var server = http.createServer(function (req, res) {
    res.write('Hello World!'); //write a response to the client
    res.write('Vu Duc');
    res.end(); //end the response
})
const port = process.env.PORT || 5000;

server.listen(port);