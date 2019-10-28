function n(n) {
    function u() {}
    getApp();
    var c = n.data, s = [ {
        iCount: 1,
        sIconUrl: o("note"),
        sTitle: "note"
    }, {
        iCount: 98,
        sIconUrl: o("home"),
        sTitle: "home"
    }, {
        iCount: 0,
        sIconUrl: o("safari"),
        sTitle: "safari"
    } ];
    c.jhDataForTabbar = i || s;
    var d = {
        onLoad: n.onLoad || u,
        onReady: n.onReady || u,
        onShow: n.onShow || u,
        onHide: n.onHide || u,
        onUnload: n.onUnload || u,
        onPullDownRefresh: n.onPullDownRefresh || u,
        onReachBottom: n.onReachBottom || u
    }, f = {
        data: c,
        onLoad: function() {
            d.onLoad.bind(this)(), t = this;
        },
        onReady: function() {
            d.onReady.bind(this)();
        },
        onShow: function() {
            d.onShow.bind(this)();
        },
        onHide: function() {
            d.onHide.bind(this)();
        },
        onUnload: function() {
            d.onUnload.bind(this)();
        },
        onPullDownRefresh: function() {
            d.onPullDownRefresh.bind(this)();
        },
        onReachBottom: function() {
            d.onReachBottom.bind(this)();
        },
        onTabbarItemTap: function(n) {
            var o = n.currentTarget.dataset.key, t = {};
            this.data.jhDataForTabbar.forEach(function(n) {
                n.sTitle === o && (t = n);
            }), r.tap.length > 0 ? r.tap.forEach(function(n) {
                n({
                    key: o,
                    data: t,
                    eventKey: o
                });
            }) : a({
                key: o
            });
        }
    };
    for (var l in n) void 0 === f[l] && (f[l] = n[l]);
    Page(f), e = !0;
}

function o(n, o) {
    return void 0 === o ? [ "../template/img/", n, ".png" ].join("") : [ "../template/img/", n, "-", o, ".png" ].join("");
}

function a(n) {
    var o = n.key, a = t.data.jhDataForTabbar.map(function(n) {
        var a = n.iCount, t = n.sIconUrl, e = n.sTitle;
        return e === o && ++a, {
            iCount: a,
            sIconUrl: t,
            sTitle: e
        };
    });
    t.setData({
        jhDataForTabbar: a
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.init = n, exports.setTabbarData = function(o) {
    return !1 === e ? i = o : t.setData({
        jhDataForTabbar: o
    }), n;
};

var t = void 0, e = !1, i = void 0, r = {
    tap: []
}, u = {
    addListener: function(n) {
        return "function" != typeof n ? (console.warn("Tabbar can only handle function. Tabbar.addListener() receive a non-function param."), 
        !1) : (r.tap.push(n), !0);
    },
    removeListener: function(n) {
        if ("function" != typeof n) return console.warn("Tabbar can only handle function. Tabbar.addListener() receive a non-function param."), 
        !1;
        var o = [];
        return r.tap.forEach(function(a) {
            a !== n && o.push(a);
        }), r.tap = o, !0;
    },
    removeAll: function() {
        r.tap = [];
    }
};

module.exports.Tabbar = u;