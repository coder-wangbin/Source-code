var i = getApp(), t = require("../../utils/config.js");

Page({
    data: {
        verification: "获取验证码",
        verificationtrue: "verificationtrue",
        verificationnum: ""
    },
    onLoad: function(t) {
        this.setData({
            navH: i.globalData.navHeight,
            mobile: t.mobile ? t.mobile : "15088136259"
        }), wx.setNavigationBarColor({
            frontColor: "#000000",
            backgroundColor: "#000000"
        });
    },
    onReady: function() {},
    onShow: function() {
        var i = this;
        wx.getStorage({
            key: "userInfo",
            success: function(t) {
                i.setData({
                    uid: t.data.uid
                });
            }
        });
    },
    back: function() {
        wx.reLaunch({
            url: "/pages/mine/mine"
        });
    },
    onHide: function() {},
    getverification: function() {
        var i = this, e = 61, a = setInterval(function() {
            e > 0 ? (e--, i.setData({
                verificationtrue: ""
            }), i.setData({
                verification: e + "s"
            })) : (clearInterval(a), i.setData({
                verificationtrue: "verificationtrue",
                verification: "获取验证码"
            }));
        }, 1e3), n = {};
        n.mobile = i.data.mobile;
        var o = {
            url: t.config.getVerificationCode,
            data: n
        };
        t.request(o, function(i) {});
    },
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: "你想要的卖量、换量资源，都在这里",
            path: "/pages/index/index",
            imageUrl: "/assets/shareimg.jpg"
        };
    },
    getnum: function(i) {
        var t = /^\d{6}$/;
        this.setData({
            verificationnum: i.detail.value
        }), i.detail.value.match(t) || wx.showToast({
            title: "验证码有误！",
            icon: "loading",
            duration: 1500
        });
    },
    submit: function() {
        var i = this, e = /^\d{6}$/;
        if ("" != i.data.verificationnum && i.data.verificationnum.match(e)) {
            i.setData({
                submitcomplete: !0
            });
            var a = {};
            a.mobile = i.data.mobile, a.uid = i.data.uid, a.code = i.data.verificationnum;
            var n = {
                url: t.config.checkVerificationCode,
                data: a
            };
            t.request(n, function(i) {
                1 == i.code && (wx.showToast({
                    title: "绑定成功~",
                    icon: "success",
                    duration: 1500
                }), setTimeout(function() {
                    wx.redirectTo({
                        url: "/pages/mine/mine"
                    });
                }, 1500));
            });
        } else wx.showModal({
            title: "提示",
            content: "请输入正确的验证码~",
            showCancel: !1,
            success: function(i) {
                i.confirm || i.cancel;
            }
        });
    }
});