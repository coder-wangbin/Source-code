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
        p: 1,
        friendtoast: "",
        toast: "",
        classify: [ {
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
        selectcategorytoast: "",
        sort_true: "",
        select_item_category: [ {
            id: "1",
            item: "按更新时间",
            itemlist: "update_time"
        }, {
            id: "2",
            item: "按点击量",
            itemlist: "click_num"
        } ],
        listobj: {}
    },
    onLoad: function(t) {
        var r = this;
        getApp().editTabBar(), r.setData({
            navH: a.globalData.navHeight,
            target: t.target ? t.target : "1",
            targetobjall: t.target ? "target" + t.target : "target1"
        }), wx.setNavigationBarColor({
            frontColor: "#000000",
            backgroundColor: "#000000"
        });
        var o = {}, t = {
            url: e.config.getWX,
            data: o
        };
        e.request(t, function(t) {
            r.setData({
                weChat: t.data.wx,
                pyqsrc: t.data.img
            });
        });
        var o = {}, t = {
            url: e.config.getEdition,
            data: o
        };
        e.request(t, function(t) {
            r.setData({
                state: t.data.edition1
            });
        }), r.getindexlist();
    },
    onShow: function() {
        var t = this;
        wx.login({
            success: function(a) {
                t.setData({
                    code: a.code
                });
                var r = {};
                r.code = t.data.code;
                var o = {
                    url: e.config.loginUrl,
                    data: r
                };
                e.request(o, function(a) {
                    t.setData({
                        uid: a.data.uid
                    }), t.getmymessage();
                });
            }
        });
    },
    getmymessage: function() {
        var t = this, r = {};
        r.uid = t.data.uid;
        var o = {
            url: e.config.getUserInfomessage,
            data: r
        };
        e.request(o, function(e) {
            t.setData({
                mymessage: e.data
            }), a.globalData.tabbar.list[2].iCount = e.data.unread, t.setData({
                tabbar: a.globalData.tabbar
            });
        });
    },
    getindexlist: function() {
        var a = this, r = {};
        r.p = 1, r.target = a.data.target, r.order = a.data.categorygoal ? a.data.categorygoal : "";
        var o = {
            url: e.config.getList,
            data: r
        };
        e.request(o, function(e) {
            var r = "listobj.target" + a.data.target;
            a.setData(t({}, r, e.data.data));
        });
    },
    gotorelease: function() {
        wx.redirectTo({
            url: "/pages/release/release"
        });
    },
    selctcategory: function(a) {
        var e = this, r = "classify[" + (e.data.target - 1) + "].targetp";
        e.setData(t({
            categoryid: a.currentTarget.dataset.id,
            categorygoal: a.currentTarget.dataset.item,
            selectcategorytoast: "",
            sort_true: "",
            scrollTop: 0,
            p: 1
        }, r, 1)), e.getindexlist();
    },
    worldOnReach1: function() {
        var a = this, r = {};
        r.p = parseInt(a.data.classify[a.data.target - 1].targetp) + 1, r.target = a.data.target, 
        r.order = a.data.categorygoal ? a.data.categorygoal : "";
        var o = {
            url: e.config.getList,
            data: r
        };
        e.request(o, function(e) {
            var o;
            if (!(a.data.p > e.data.last_page)) {
                var s = r.p, i = "classify[" + (a.data.target - 1) + "].targetp", n = "listobj.target" + a.data.target;
                a.setData((o = {
                    p: s
                }, t(o, i, r.p), t(o, n, a.data.listobj[a.data.targetobjall].concat(e.data.data)), 
                o));
            }
        }, 1);
    },
    onShareAppMessage: function(t) {
        return {
            title: "你想要的卖量、换量资源，都在这里",
            path: "/pages/index/index",
            imageUrl: "/assets/shareimg.jpg"
        };
    },
    chooseclassify: function(t) {
        var a = this;
        a.setData({
            target: t.currentTarget.dataset.target,
            categoryid: "",
            targetobjall: t.currentTarget.dataset.targetobj,
            p: 1,
            categorygoal: ""
        }), a.data.listobj[a.data.targetobjall] || a.getindexlist();
    },
    gotosearch: function() {
        wx.redirectTo({
            url: "/pages/search/serach"
        });
    },
    poster: function() {
        this.setData({
            friendtoast: "friendtoast"
        });
    },
    gotoinfo: function(t) {
        wx.navigateTo({
            url: "/pages/info/info?id=" + t.currentTarget.dataset.id + "&target=" + this.data.target + "&logid=" + t.currentTarget.dataset.uid
        });
    },
    sharefriend: function(t) {
        var a = t.target.dataset.src;
        wx.previewImage({
            current: a,
            urls: [ a ]
        });
    },
    sharefriendother: function() {
        var t = this;
        wx.downloadFile({
            url: t.data.pyqsrc,
            success: function(a) {
                wx.saveImageToPhotosAlbum({
                    filePath: a.tempFilePath,
                    success: function(t) {
                        wx.showToast({
                            title: "保存成功",
                            icon: "success",
                            duration: 2e3
                        });
                    },
                    fail: function(t) {
                        console.log(t), "saveImageToPhotosAlbum:fail auth deny" === t.errMsg && (console.log("当初用户拒绝，再次发起授权"), 
                        wx.openSetting({
                            success: function(t) {
                                console.log(t), t.authSetting["scope.writePhotosAlbum"] ? console.log("获取权限成功，给出再次点击图片保存到相册的提示。") : console.log("获取权限失败，给出不给权限就无法正常使用的提示");
                            }
                        }));
                    },
                    complete: function(a) {
                        console.log(a), t.setData({
                            friendtoast: ""
                        });
                    }
                });
            }
        });
    },
    shareclose: function() {
        this.setData({
            friendtoast: ""
        });
    },
    sorttap: function() {
        var t = this;
        t.setData({
            sort_true: "sort_true",
            selectcategorytoast: "selectcategorytoast" == t.data.selectcategorytoast ? "" : "selectcategorytoast"
        });
    },
    formSubmit: function(t) {
        var a = this, r = {};
        r.uid = a.data.uid, r.formId = t.detail.formId;
        var o = {
            url: e.config.addFormId,
            data: r
        };
        e.request(o, function(t) {});
    },
    WeChattoast: function() {
        this.setData({
            toast: "toast"
        });
    },
    copy: function() {
        this.setData({
            toast: ""
        }), wx.setClipboardData({
            data: this.data.weChat,
            success: function(t) {}
        });
    },
    back: function() {
        this.setData({
            toast: ""
        });
    }
});