var a = getApp(), t = require("../../utils/config.js");

Page({
    data: {
        classify: [ {
            id: "1",
            src: "/assets/btn_category_01.png"
        }, {
            id: "2",
            src: "/assets/btn_category_02.png"
        }, {
            id: "3",
            src: "/assets/btn_category_03.png"
        }, {
            id: "4",
            src: "/assets/btn_category_04.png"
        } ]
    },
    onLoad: function(t) {
        var e = this;
        getApp().editTabBar(), e.setData({
            navH: a.globalData.navHeight
        }), wx.setNavigationBarColor({
            frontColor: "#000000",
            backgroundColor: "#000000"
        });
    },
    onReady: function() {},
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
                    }), a.getmymessage();
                });
            }
        });
    },
    gotoadd: function(a) {
        wx.reLaunch({
            url: "/pages/add/add?topid=" + a.currentTarget.dataset.id
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    getmymessage: function() {
        var e = this, n = {};
        n.uid = e.data.uid;
        var o = {
            url: t.config.getUserInfomessage,
            data: n
        };
        t.request(o, function(t) {
            e.setData({
                mymessage: t.data
            }), a.globalData.tabbar.list[2].iCount = t.data.unread, e.setData({
                tabbar: a.globalData.tabbar
            });
        });
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: "你想要的卖量、换量资源，都在这里",
            path: "/pages/index/index",
            imageUrl: "/assets/shareimg.jpg"
        };
    }
});