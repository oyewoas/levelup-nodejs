
const cities = require('./fetchCities')



const handleRequest = (request, response) => {
    // This is where the magic happens
    const { method, url, headers, httpVersion, body } = request;
    // console.log(`HTTP Method is: ${method}`);
    // console.log(`Path is: ${url}`)
    // console.log(headers);
    // console.log(`HTTP Request Version is: ${httpVersion}`);

    if (
        request.method === 'GET' && 
        request.url === '/'
    ) {
        response.end('Hello World')

    }

    if (
        request.method === 'POST' && 
        request.headers['content-type'] === 'application/json' && 
        request.url === '/cities'
    ) {
        let body = '';
        request
            .on('data', chunk => {
                body += chunk.toString();
            })
            .on('end', () => {
                body = JSON.parse(body);
                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');

                const responseBody = { headers, method, url, body };

                response.write(JSON.stringify(responseBody));
                response.end();
            });
    }
     if (
        request.method === 'GET' &&
        request.url === '/cities'
        ) {
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');

            response.write(JSON.stringify(cities));
            response.end();
    } else {
        response.end();
    }
}

module.exports = handleRequest;
