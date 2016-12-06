var httpProxy = require('http-proxy');
var express = require('express');
var redis = require("redis");
var conf = require("./redis.json");

var proxy = httpProxy.createProxyServer({});

var app = express();
var port = process.env.PROXY_PORT || 3030;

app.post("/function/:nuser/:nfunc", function(req, res) {
    var key = req.params.nuser + ":" + req.params.nfunc;
    var client = redis.createClient(conf);
    var err_result = { message: "cannot resolve endpoint information", code: -1 };

    client.get(key, function(err, result) {
        result = JSON.parse(result);

        var host = result != null ? result.host : null;
        var port = result != null ? result.port : -1;

        if (!host || port == -1) {
            res.json(err_result);
            return;
        }

        // url rewrite
        req.url = "/";
        proxy.web(req, res, { target: 'http://' + host + ":" + port });
    });

    client.on('error', function(err) {
        err_result.error = err;
        res.json(err_result);
        return;
    });
});

app.listen(port);