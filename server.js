//Install express server
const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 8080;
const server = require('http').Server(app);

app.use(express.static('./dist/traffic-citation.ui'));

server.listen(port, () =>
    console.log("App running on port " + port),
);

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: './dist/traffic-citation.ui'}),
);
