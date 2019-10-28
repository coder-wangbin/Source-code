var a = getApp(), t = require("../../utils/config.js");

Page({
    data: {
        mobile: "",
        company: "",
        nickName: "",
        tel: ""
    },
    onLoad: function(t) {
        this.setData({
            navH: a.globalData.navHeight
        }), wx.setNavigationBarColor({
            frontColor: "#000000",
            backgroundColor: "#000000"
        });
    },
    onReady: function() {},
    onShow: function() {
        var a = this;
        wx.getStorage({
            key: "userInfo",
            success: function(t) {
                a.setData({
                    uid: t.data.uid
                }), a.getmymessage();
            }
        });
    },
    getmymessage: function() {
        var a = this, e = {};
        e.uid = a.data.uid;
        var i = {
            url: t.config.getUserInfomessage,
            data: e
        };
        t.request(i, function(t) {
            a.setData({
                mymessage: t.data,
                company: t.data.company,
                job: t.data.job,
                mobile: t.data.mobile,
                nickName: t.data.nickName,
                tel: t.data.mobile,
                backmobile: t.data.mobile
            });
        });
    },
    submitmobile: function(a) {
        var t = this, e = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
        t.setData({
            mobile: a.detail.value,
            tel: a.detail.value
        });
        var i = t.data.mobile;
        e.test(i) || wx.showToast({
            title: "手机号有误！",
            icon: "loading",
            duration: 1500
        });
    },
    submittel: function(a) {
        this.setData({
            tel: a.detail.value
        });
    },
    submitcompany: function(a) {
        this.setData({
            company: a.detail.value
        });
    },
    submitjob: function(a) {
        this.setData({
            job: a.detail.value
        });
    },
    submitname: function(a) {
        this.setData({
            nickName: a.detail.value
        });
    },
    back: function() {
        wx.reLaunch({
            url: "/pages/mine/mine"
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
    },
    submit: function() {
        var a = this;
        if ("" != a.data.nickName && "" != a.data.company && "" != a.data.mobile) if (/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/.test(a.data.mobile)) {
            a.setData({
                submitcomplete: !0
            });
            var e = {};
            e.uid = a.data.uid, e.nickName = a.data.nickName, e.mobile = a.data.mobile, e.company = a.data.company, 
            e.job = a.data.job;
            var i = {
                url: t.config.updateUserInfo,
                data: e
            };
            t.request(i, function(a) {
                1 == a.code && (wx.showToast({
                    title: "修改成功~",
                    icon: "success",
                    duration: 1500
                }), setTimeout(function() {
                    wx.redirectTo({
                        url: "/pages/mine/mine"
                    });
                }, 1500));
            });
        } else wx.showToast({
            title: "手机号有误！",
            icon: "loading",
            duration: 1500
        }); else wx.showModal({
            title: "提示",
            content: "您还没填写完内容哦~",
            showCancel: !1,
            success: function(a) {
                a.confirm || a.cancel;
            }
        });
    }
});