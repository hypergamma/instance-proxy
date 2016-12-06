module.exports = cache;

function cache(size) {
    this.cachelist = {};    // { "key": value }
    this.size = size;
}

cache.prototype.get = function(key) {
    return this.cachelist[key];
};

cache.prototype.set = function(key, value) {
    this.cachelist[key] = value;
};

cache.prototype.remove = function(key) {
    var value = this.get(key);

    if (!value) {
        delete this.cachelist[key];
    }
};
