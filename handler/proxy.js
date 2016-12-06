var redis = require("redis");
var httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer({});
var config = global.redis_config;
var cache = global.cache;

module.exports.handle = function(req, res) {

    var callProxy = function(req, res, host, port) {
        proxy.web(req, res, { target: 'http://' + host + ":" + port });
    }

    var key = req.params.nuser + ":" + req.params.nfunc;
    req.url = "/"; // url rewrite

    // first, check cache
    var result = cache.get(key);
    if (!result) {
        // cache miss
        var client = redis.createClient(config);
        var err_result = { message: "cannot resolve endpoint information", code: -1 };

        client.get(key, function(err, result) {
            result = JSON.parse(result);

            var host = result != null ? result.host : null;
            var port = result != null ? result.port : -1;

            if (!host || port == -1) {
                res.json(err_result);
                return;
            }

            // cache set
            console.log("cache miss");
            cache.set(key, result);
            callProxy(req, res, host, port);
        });

        client.on('error', function(err) {
            err_result.error = err;
            res.json(err_result);

            return;
        });

    } else {
        // cache hit!
        var host = result.host;
        var port = result.port;

        console.log("cache hit");

        callProxy(req, res, host, port);
    }

};