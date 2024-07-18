const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

const port = 3000;

const requestHandler = (req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        let filePath = path.join(__dirname, 'index.html');

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });
    } else if (req.method === 'POST' && req.url === '/test.php') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const postData = querystring.parse(body);
            const username = postData.username;

            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(`La username ${username}`);
        });
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not Found');
    }
};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }

    console.log(`server is listening on ${port}`);
});
