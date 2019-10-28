function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var a = getApp(), e = require("../../utils/config.js");

Page({
    data: {
        classify: [ {
            target: 0,
            name: "全部",
            targetobj: "target0",
            targetp: "1"
        }, {
            target: 1,
            name: "买量",
            targetobj: "target1",
            targetp: "1"
        }, {
            target: 2,
            name: "卖量",
            targetobj: "target2",
            targetp: "1"
        }, {
            target: 3,
            name: "换量",
            targetobj: "target3",
            targetp: "1"
        }, {
            target: 4,
            name: "其他",
            targetobj: "target4",
            targetp: "1"
        } ],
        target: 0,
        search: "",
        p: 1,
        listobj: {}
    },
    onLoad: function(t) {
        var e = this;
        e.setData({
            navH: a.globalData.navHeight,
            targetobjall: "target0"
        }), wx.setNavigationBarColor({
            frontColor: "#000000",
            backgroundColor: "#000000"
        }), e.getHotlist();
    },
    getHotlist: function() {
        var t = this, a = {}, r = {
            url: e.config.getHotSearchWord,
            data: a
        };
        e.request(r, function(a) {
            t.setData({
                HotSearchWord: a.data.hot_search
            });
        });
    },
    onReady: function() {},
    gotoindex: function() {
        wx.redirectTo({
            url: "/pages/index/index"
        });
    },
    getlist: function() {
        var a = this;
        if ("" != a.data.search) {
            var r = {};
            r.p = 1, r.target = a.data.target, r.search = a.data.search;
            var n = {
                url: e.config.getList,
                data: r
            };
            e.request(n, function(e) {
                var r, n = "listobj.target" + a.data.target;
                a.setData((r = {}, t(r, n, e.data.data), t(r, "search_true", !0), r));
            });
        }
    },
    sumbitserch: function(t) {
        var a = this;
        a.setData({
            search: t.currentTarget.dataset.item
        }), a.getlist();
    },
    getinputvalue: function(t) {
        this.setData({
            search: t.detail.value,
            search_true: !1
        });
    },
    getinput: function(t) {
        var a = this;
        a.setData({
            search: a.data.search
        }), a.getlist();
    },
    getinputconfirm: function(t) {
        var a = this;
        a.setData({
            search: t.detail.value
        }), a.getlist();
    },
    worldOnReach1: function() {
        var a = this, r = {};
        r.p = parseInt(a.data.classify[a.data.target].targetp) + 1, r.target = a.data.target, 
        r.search = a.data.search;
        var n = {
            url: e.config.getList,
            data: r
        };
        e.request(n, function(e) {
            var n;
            if (!(a.data.p > e.data.last_page)) {
                var i = r.p, o = "classify[" + a.data.target + "].targetp", s = "listobj.target" + a.data.target;
                a.setData((n = {
                    p: i
                }, t(n, o, r.p), t(n, s, a.data.listobj[a.data.targetobjall].concat(e.data.data)), 
                t(n, "search_true", !0), n));
            }
        }, 1);
    },
    chooseclassify: function(t) {
        var a = this;
        a.setData({
            target: t.currentTarget.dataset.target,
            targetobjall: t.currentTarget.dataset.targetobj,
            p: 1
        }), a.getlist();
    },
    onShow: function() {},
    gotoinfo: function(t) {
        wx.navigateTo({
            url: "/pages/info/info?id=" + t.currentTarget.dataset.id + "&logid=" + t.currentTarget.dataset.uid
        });
    },
    onHide: function() {},
    onUnload: function() {},
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