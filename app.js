var express = require('express');

var cache = require("./module/cache");
global.cache = new cache();

global.redis_config = require("./redis.json");

var proxyHandler = require("./handler/proxy");
var cacheHandler = require("./handler/cache");

var app = express();
var port = process.env.PROXY_PORT || 3030;

app.post("/function/:nuser/:nfunc", proxyHandler.handle);

app.put("/cache/:key", cacheHandler.set);
app.delete("/cache/:key", cacheHandler.remove);

app.listen(port);