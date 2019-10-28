function e(e) {
    for (var r = Object.keys(e).sort(), t = {}, n = 0; n < r.length; n++) t[r[n]] = e[r[n]];
    return t;
}

function r(r) {
    void 0 !== r.token && delete r.token;
    var n = e(r), o = "";
    for (var u in n) o += o ? "&" : "", o += u + "=" + n[u];
    return o += "!@#$%^&*", t.md5(o);
}

var t = require("md5.js");

module.exports.token = function(e) {
    if (void 0 !== e.token) return console.log("token已存在"), e;
    var t = r(e);
    return e.token = t, e;
};