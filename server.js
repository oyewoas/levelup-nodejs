// A NodeJs Server
const http = require('http');
const handleRequest = require('./reqHandler');
const port = 5000;

const server = http.createServer(handleRequest);

server.listen(port, (err) => {
    if (err) {
        console.error(err);
    }

    console.log(`Our server is listening for connections on port: ${port}`);
})