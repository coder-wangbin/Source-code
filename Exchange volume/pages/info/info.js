var a = getApp(), t = require("../../utils/config.js");

Page({
    data: {
        str: ""
    },
    onLoad: function(t) {
        var e = this;
        e.setData({
            navH: a.globalData.navHeight,
            id: t.id ? t.id : "",
            myrelease: t.myrelease ? t.myrelease : "",
            logid: t.logid ? t.logid : ""
        }), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: "#ffffff"
        }), e.shareotherfriend();
    },
    onReady: function() {},
    getinfo: function() {
        var a = this, e = {};
        e.id = a.data.id, e.uid = a.data.uid;
        var n = {
            url: t.config.getDetail,
            data: e
        };
        t.request(n, function(t) {
            if (a.setData({
                allobj: t.data,
                desc: t.data.desc
            }), a.data.desc.length > 40) {
                var e = a.data.desc.substr(0, 40) + "...";
                a.setData({
                    desc: e
                });
            }
        });
    },
    onShow: function() {
        var a = this;
        wx.login({
            success: function(e) {
                a.setData({
                    code: e.code
                });
                var n = {};
                n.code = a.data.code;
                var o = {
                    url: t.config.loginUrl,
                    data: n
                };
                t.request(o, function(t) {
                    a.setData({
                        uid: t.data.uid
                    }), a.getinfo();
                });
            }
        });
    },
    gotomoreabout: function(a) {
        "" == this.data.myrelease ? wx.navigateTo({
            url: "/pages/myrelease/myrelease?auth_uid=" + a.currentTarget.dataset.auth_uid
        }) : wx.navigateBack({
            delta: 1
        });
    },
    gotomoreaboutme: function() {
        "" == this.data.myrelease ? wx.navigateTo({
            url: "/pages/myrelease/myrelease?mine=mine"
        }) : wx.navigateBack({
            delta: 1
        });
    },
    shareotherfriend: function() {
        var a = this, e = {};
        e.id = a.data.id;
        var n = {
            url: t.config.getShareInfo,
            data: e
        };
        t.request(n, function(t) {
            a.setData({
                sharemessage: t.data
            });
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(a) {
        var t = this;
        return "button" === a.from && console.log(a), {
            title: t.data.sharemessage.string,
            path: "/pages/index/index"
        };
    },
    back: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    collect: function() {
        var a = this, e = {};
        e.fid = a.data.id, e.uid = a.data.uid;
        var n = {
            url: t.config.editCollection,
            data: e
        };
        t.request(n, function(t) {
            a.getinfo();
        });
    },
    sharefriend: function(a) {
        var t = a.target.dataset.src;
        wx.previewImage({
            current: t,
            urls: [ t ]
        });
    },
    copy: function() {
        wx.setClipboardData({
            data: this.data.allobj.phone,
            success: function(a) {}
        });
    }
});