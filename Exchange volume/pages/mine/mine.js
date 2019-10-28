var e = getApp(), a = require("../../utils/config.js");

Page({
    data: {
        concact: [ {
            id: 1,
            src: "/assets/btn_me_recommend.png"
        }, {
            id: 2,
            src: "/assets/btn_me_group.png"
        } ]
    },
    onLoad: function(a) {
        var t = this;
        getApp().editTabBar(), t.setData({
            navH: e.globalData.navHeight
        }), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: "#ffffff"
        }), wx.login({
            success: function(e) {
                t.setData({
                    code: e.code
                });
            }
        });
    },
    getmymessage: function() {
        var t = this, n = {};
        n.uid = t.data.uid;
        var o = {
            url: a.config.getUserInfomessage,
            data: n
        };
        a.request(o, function(a) {
            t.setData({
                mymessage: a.data
            }), e.globalData.tabbar.list[2].iCount = a.data.unread, t.setData({
                tabbar: e.globalData.tabbar
            });
        });
    },
    onReady: function() {},
    onShow: function() {
        var e = this;
        wx.getStorageInfo({
            success: function(a) {
                "userInfo" != a.keys[0] && e.setData({
                    iv: null,
                    navfont: "授权登录",
                    falg: !0
                });
            }
        }), wx.getStorage({
            key: "userInfo",
            success: function(a) {
                e.setData({
                    iv: a.data.iv,
                    navfont: "个人中心",
                    uid: a.data.uid
                }), e.getmymessage();
            }
        });
    },
    gotomymessage: function() {
        wx.navigateTo({
            url: "/pages/mymessage/mymessage"
        });
    },
    gotologs: function() {
        wx.navigateTo({
            url: "/pages/logs/logs"
        });
    },
    gotorelease: function() {
        wx.navigateTo({
            url: "/pages/myrelease/myrelease?mine=mine"
        });
    },
    gotoindex: function() {
        wx.reLaunch({
            url: "/pages/index/index"
        });
    },
    gotobindpone: function() {
        0 != this.data.mymessage.perfect ? wx.reLaunch({
            url: "/pages/phone/phone?mobile=" + this.data.mymessage.mobile
        }) : wx.showToast({
            title: "先完善个人信息~",
            icon: "loading",
            duration: 1500
        });
    },
    getUserInfo: function(e) {
        var a = this;
        console.log(e), null == a.data.iv && (e.detail.iv && a.login(e), "getUserInfo:fail auth deny" == e.detail.errMsg && wx.getSetting({
            success: function(t) {
                t.authSetting["scope.userInfo"] || wx.openSetting({
                    success: function(t) {
                        t.authSetting["scope.userInfo"] && e.detail.iv && a.login(e);
                    }
                });
            }
        }));
    },
    login: function(e) {
        var t = this, n = {};
        n.iv = e.detail.iv, n.encryptedData = e.detail.encryptedData, n.code = t.data.code;
        var o = {
            url: a.config.loginUrl,
            data: n
        };
        a.request(o, function(a) {
            wx.setStorage({
                key: "userInfo",
                data: {
                    iv: e.detail.iv,
                    uid: a.data.uid
                }
            }), t.setData({
                iv: e.detail.iv,
                uid: a.data.uid,
                navfont: "个人中心"
            }), t.getmymessage();
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