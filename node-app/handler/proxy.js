var redis = require("redis");
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({});

module.exports.handle = function(req, res) {
    req.url = "/"; // url rewrite

    // function_username_functionname
    var host = "function_" + req.params.nuser + "_" + req.params.nfunc;

    console.log("proxy to ==> " + host);
    proxy.web(req, res, { target: 'http://' + host + ":" + global.target_port });
};