//Install express server
const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 8080;
const server = require('http').Server(app);

app.use(express.static(__dirname, 'dist', {index: false}));

server.listen(port, () => 
    console.log("App running on port " + port),
);

app.get('/*', (req, res) => 
    res.sendFile(path.join(__dirname, 'src', 'index.html')),
);

