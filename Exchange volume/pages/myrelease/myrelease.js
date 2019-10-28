var t = getApp(), a = require("../../utils/config.js");

Page({
    data: {
        p: 1,
        toast: ""
    },
    onLoad: function(a) {
        var e = this;
        e.setData({
            navH: t.globalData.navHeight,
            auth_uid: a.auth_uid ? a.auth_uid : "",
            mine: a.mine ? a.mine : ""
        }), "" != e.data.mine ? wx.getStorage({
            key: "userInfo",
            success: function(t) {
                e.setData({
                    navfont: "我的发布",
                    auth_uid: t.data.uid
                }), e.getmylist();
            }
        }) : (e.setData({
            navfont: "他的发布"
        }), e.getmylist()), wx.setNavigationBarColor({
            frontColor: "#000000",
            backgroundColor: "#000000"
        });
    },
    getmylist: function() {
        var t = this, e = {};
        if (e.auth_uid = t.data.auth_uid, e.p = 1, "" == t.data.mine) i = {
            url: a.config.getList,
            data: e
        };
        if ("" != t.data.mine) var i = {
            url: a.config.getListByUid,
            data: e
        };
        a.request(i, function(a) {
            t.setData({
                list: a.data.data
            });
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    gotoinfo: function(t) {
        wx.navigateTo({
            url: "/pages/info/info?id=" + t.currentTarget.dataset.id + "&logid=" + t.currentTarget.dataset.uid + "&myrelease=myrelease"
        });
    },
    gotoadd: function() {
        wx.redirectTo({
            url: "/pages/release/release"
        });
    },
    worldOnReach1: function() {
        var t = this, e = {};
        if (e.p = t.data.p + 1, e.auth_uid = t.data.auth_uid, "" == t.data.mine) i = {
            url: a.config.getList,
            data: e
        };
        if ("" != t.data.mine) var i = {
            url: a.config.getListByUid,
            data: e
        };
        a.request(i, function(a) {
            if (!(t.data.p > a.data.last_page)) {
                var e = Number(t.data.p) + 1;
                t.setData({
                    p: e,
                    list: t.data.list.concat(a.data.data)
                });
            }
        }, 1);
    },
    onUnload: function() {},
    back: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    del: function(t) {
        this.setData({
            toast: "toast",
            id: t.currentTarget.dataset.id
        });
    },
    cancel: function() {
        this.setData({
            toast: ""
        });
    },
    sure: function(t) {
        var e = this;
        e.setData({
            toast: ""
        });
        var i = {};
        i.id = e.data.id, i.uid = e.data.auth_uid;
        var n = {
            url: a.config.deleteFlow,
            data: i
        };
        a.request(n, function(t) {
            e.getmylist();
        });
    },
    edit: function(t) {
        wx.redirectTo({
            url: "/pages/add/add?id=" + t.currentTarget.dataset.id + "&release=release"
        });
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: "你想要的卖量、换量资源，都在这里",
            path: "/pages/index/index",
            imageUrl: "/assets/shareimg.jpg"
        };
    }
});