function e(e) {
    for (var t = Object.keys(e).sort(), o = {}, r = 0; r < t.length; r++) o[t[r]] = e[t[r]];
    return o;
}

function t(t) {
    t = e(t);
    var o = "";
    for (var r in t) "" != o && (o += "&"), o += r + "=" + t[r];
    return t.token = n.md5(o + "!@#$%^&*"), t;
}

function o(e) {}

function r(e, t, o) {
    wx.showModal({
        title: "温馨提示",
        content: e,
        showCancel: o || !1,
        success: function(e) {
            e.confirm && "function" == typeof t && t();
        }
    });
}

var n = require("md5.js"), i = "https://newbox.0e3.cn/buy_sell", a = {
    loginUrl: i + "/user/applogin",
    addFormId: i + "/user/addFormId",
    addFlow: i + "/flow/addFlowNew",
    getWX: i + "/other/getWX",
    getList: i + "/flow/getListNew",
    getDetail: i + "/flow/getDetailNew",
    editCollection: i + "/collection/editCollection",
    collection: i + "/collection/getList",
    getEdition: i + "/other/getEdition",
    test: i + "/other/test",
    getUserInfomessage: i + "/user/getUserInfo",
    getVerificationCode: i + "/other/getVerificationCode",
    checkVerificationCode: i + "/other/checkVerificationCode",
    updateFlow: i + "/flow/updateFlow",
    deleteFlow: i + "/flow/deleteFlow",
    updateUserInfo: i + "/user/updateUserInfo",
    getHotSearchWord: i + "/other/getHotSearchWord",
    getListByUid: i + "/flow/getListByUid",
    getShareInfo: i + "/other/getShareInfo"
};

module.exports = {
    request: function(e, n, i) {
        var a = t(e.data);
        return o(), wx.request({
            url: e.url,
            data: a,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                if (200 != e.statusCode) return !1;
                "string" == typeof e.data && (e.data = JSON.parse(e.data.trim()));
                var t = e;
                0 == t.state ? r(t.data.errmsg) : n(t.data);
            },
            fail: function(e) {
                o(e.errMsg);
            },
            complete: function() {
                wx.hideLoading();
            }
        });
    },
    log: o,
    config: a,
    totip: r,
    md5: n,
    trim: function(e) {
        return e.replace(/(^\s*)|(\s*$)/g, "");
    },
    checkData: t
};