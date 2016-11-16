var express = require('express');
var app = express();
var path = require('path');

app.use(express.static('./public'));

app.get('/', function(req, res) {
    console.log(__dirname);
    res.sendFile(path.join(__dirname + '/public/Views/index.html'));
});

app.listen(5555);