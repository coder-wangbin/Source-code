var t = getApp(), a = require("../../utils/config.js");

Page({
    data: {
        p: 1,
        friendtoast: "",
        toast1: "",
        toast: ""
    },
    onLoad: function(n) {
        var o = this;
        getApp().editTabBar(), o.setData({
            navH: t.globalData.navHeight
        }), wx.setNavigationBarColor({
            frontColor: "#000000",
            backgroundColor: "#000000"
        }), wx.login({
            success: function(t) {
                o.setData({
                    code: t.code
                });
                var n = {};
                n.code = o.data.code;
                var i = {
                    url: a.config.loginUrl,
                    data: n
                };
                a.request(i, function(t) {
                    o.setData({
                        uid: t.data.uid
                    }), o.getlog();
                });
            }
        });
    },
    getlog: function() {
        var t = this, n = {};
        t.setData({
            p: 1
        }), n.p = t.data.p, n.uid = t.data.uid;
        var o = {
            url: a.config.collection,
            data: n
        };
        a.request(o, function(a) {
            t.setData({
                list: a.data.data
            });
        });
    },
    onReady: function() {},
    onShow: function() {},
    back: function() {
        wx.reLaunch({
            url: "/pages/mine/mine"
        });
    },
    sure: function(t) {
        var n = this;
        n.setData({
            toast: ""
        });
        var o = {};
        o.fid = n.data.id, o.uid = n.data.uid;
        var i = {
            url: a.config.editCollection,
            data: o
        };
        a.request(i, function(t) {
            n.getlog();
        });
    },
    cancel: function() {
        this.setData({
            toast: ""
        });
    },
    deletelog: function(t) {
        this.setData({
            toast: "toast",
            id: t.currentTarget.dataset.id
        });
    },
    worldOnReach1: function() {
        var t = this, n = {};
        n.p = t.data.p + 1, n.uid = t.data.uid;
        var o = {
            url: a.config.collection,
            data: n
        };
        a.request(o, function(a) {
            if (!(t.data.p > a.data.last_page)) {
                var n = Number(t.data.p) + 1;
                t.setData({
                    p: n,
                    list: t.data.list.concat(a.data.data)
                });
            }
        }, 1);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    gotoinfo: function(t) {
        wx.navigateTo({
            url: "/pages/info/info?id=" + t.currentTarget.dataset.id + "&logid=" + t.currentTarget.dataset.uid
        });
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: "你想要的卖量、换量资源，都在这里",
            path: "/pages/index/index",
            imageUrl: "/assets/shareimg.jpg"
        };
    },
    formSubmit: function(t) {
        var n = this, o = {};
        o.uid = n.data.uid, o.formId = t.detail.formId;
        var i = {
            url: a.config.addFormId,
            data: o
        };
        a.request(i, function(t) {});
    },
    gotoadd: function() {
        wx.reLaunch({
            url: "/pages/index/index"
        });
    }
});