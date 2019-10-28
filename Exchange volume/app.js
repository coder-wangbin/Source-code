App({
    onLaunch: function(e) {
        var t = this;
        wx.getSystemInfo({
            success: function(e) {
                t.globalData.navHeight = e.statusBarHeight + 46;
            },
            fail: function(e) {
                console.log(e);
            }
        }), wx.getSetting({
            success: function(e) {
                e.authSetting["scope.userInfo"] && wx.getUserInfo({
                    success: function(e) {
                        t.globalData.userInfo = e.userInfo, t.userInfoReadyCallback && t.userInfoReadyCallback(e);
                    }
                });
            }
        });
        var a = wx.getUpdateManager();
        a.onCheckForUpdate(function(e) {
            console.log(e.hasUpdate);
        }), a.onUpdateReady(function() {
            wx.showModal({
                title: "更新提示",
                content: "新版本已经准备好，是否重启应用？",
                success: function(e) {
                    e.confirm && a.applyUpdate();
                }
            });
        }), a.onUpdateFailed(function() {
            wx.showModal({
                title: "更新提示",
                content: "新版本下载失败",
                showCancel: !1
            });
        });
    },
    onShow: function(e) {
        var t = this;
        1044 == e.scene && (t.globalData.shareTicket = e.shareTicket);
    },
    globalData: {
        userInfo: null,
        tabbar: {
            selectedColor: "rgb(210,26,18)",
            color: "rgb(77,77,77)",
            backgroundColor: "white",
            borderStyle: "#e1e1e6",
            list: [ {
                pagePath: "/pages/index/index",
                text: "首页",
                iconPath: "/assets/icn_home_02.png",
                selectedIconPath: "/assets/icn_home_01.png"
            }, {
                pagePath: "/pages/release/release",
                text: "发布",
                iconPath: "/assets/icn_join_02.png",
                selectedIconPath: "/assets/icn_join_01.png"
            }, {
                pagePath: "/pages/mine/mine",
                text: "我的",
                iconPath: "/assets/icn_me_02.png",
                selectedIconPath: "/assets/icn_me_01.png",
                iCount: 0
            } ],
            position: "bottom"
        }
    },
    editTabBar: function() {
        var e = this.globalData.tabbar, t = getCurrentPages(), a = t[t.length - 1], n = a.__route__;
        0 != n.indexOf("/") && (n = "/" + n);
        for (var s in e.list) e.list[s].selected = !1, e.list[s].pagePath == n && (e.list[s].selected = !0);
        a.setData({
            tabbar: e
        });
    }
});