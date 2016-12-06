module.exports.set = set;
module.exports.remove = remove;

var cache = global.cache;

/**
 * cache set handler
 * PUT /cache/:key
 * body = {
 *  "host": "hostname",
 *  "port": 8080
 * }
 * @param req
 * @param res
 */
function set(req, res) {
    var key = req.params.key;
    var value = req.body;
    var result = { message: "", code: 0 };

    // validation
    if (!key || !value) {
        result.message = "parameter invalid";
        result.code = -1;
    } else {
        cache.set(key, value);
        result.message = "success";
        result.code = 0;
    }

    res.json(result);
}


/**
 * cache remove handler
 * DELETE /cache/:key
 * @param req
 * @param res
 */
function remove(req, res) {
    var key = req.params.key;
    var result = { message: "", code: 0 };

    if (key) {
        result.message = "success";
        result.code = 0;
        cache.remove(key);
    } else {
        result.message = "invalid key";
        result.code = -1;
    }

    res.json(result);
}

