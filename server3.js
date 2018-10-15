const http = require('http');
const fs = require('fs');

let server = http.createServer((req, res) => {
    fs.readFile(`template${req.url}`, (err, data) => {
        if (err) {
            res.writeHeader(404);
            res.write('Not Found');
        } else {
            res.write(data);
        }
        res.end();
    });
});

server.listen(3107);