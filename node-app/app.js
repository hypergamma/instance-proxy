var express = require('express');
var proxyHandler = require("./handler/proxy");

var app = express();
var port = process.env.PORT || 3030;
global.target_port = process.env.PROXY_TARGET_PORT || 3000;

app.post("/function/:nuser/:nfunc", proxyHandler.handle);

app.listen(port);