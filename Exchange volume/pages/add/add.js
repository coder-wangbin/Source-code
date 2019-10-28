function a(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

var t = getApp(), e = require("../../utils/config.js"), i = [];

Page({
    data: {
        buyData: [ {
            id: "1",
            item: "CPA",
            check: !1
        }, {
            id: "2",
            item: "CPS",
            check: !1
        }, {
            id: "3",
            item: "CPC",
            check: !1
        }, {
            id: "4",
            item: "UV",
            check: !1
        }, {
            id: "5",
            item: "其他",
            check: !1
        } ],
        seale: [ {
            id: "1",
            item: "1000以下"
        }, {
            id: "2",
            item: "1000~10000"
        }, {
            id: "3",
            item: "10000~50000"
        }, {
            id: "4",
            item: "5万以上"
        } ],
        account: [ {
            id: "1",
            item: "日结"
        }, {
            id: "2",
            item: "周结"
        }, {
            id: "3",
            item: "月结"
        } ],
        select_item_category: [ {
            id: "1",
            item: "小程序"
        }, {
            id: "2",
            item: "小游戏"
        }, {
            id: "3",
            item: "游戏盒子"
        } ],
        categorygoal: "小程序",
        selectcategorytoast: "",
        toast4: ""
    },
    onLoad: function(a) {
        var i = this;
        wx.getSystemInfo({
            success: function(a) {
                console.log(a.SDKVersion);
            }
        }), i.setData({
            navH: t.globalData.navHeight,
            id: a.id ? a.id : "",
            release: a.release ? a.release : ""
        }), "" == i.data.id && (i.setData({
            touxiangicon: "/assets/img_plus.png",
            erweimaicon: "/assets/img_plus.png",
            name: "",
            intruduce: "",
            sealeid: 1,
            accountid: 1,
            categoryid: 1,
            buydayau: "",
            allpelnum: "",
            describe_text: "",
            otherimgarr: [],
            topid: a.topid ? a.topid : ""
        }), i.data.buyData[0].check = !0, i.setData({
            buyData: i.data.buyData
        }), i.gettopitem()), wx.setNavigationBarColor({
            frontColor: "#000000",
            backgroundColor: "#000000"
        }), wx.login({
            success: function(a) {
                i.setData({
                    code: a.code
                });
                var t = {};
                t.code = i.data.code;
                var o = {
                    url: e.config.loginUrl,
                    data: t
                };
                e.request(o, function(a) {
                    i.setData({
                        uid: a.data.uid
                    }), i.getmymessage(), "" != i.data.id && i.getinfo();
                });
            }
        });
    },
    getinfo: function() {
        var t = this, o = {};
        o.id = t.data.id, o.uid = t.data.uid;
        var s = {
            url: e.config.getDetail,
            data: o
        };
        e.request(s, function(e) {
            t.setData({
                topid: e.data.new_target,
                touxiangicon: e.data.icon,
                erweimaicon: e.data.qcode,
                name: e.data.name,
                intruduce: e.data.desc,
                categoryid: e.data.new_target,
                sealeid: e.data.scale,
                accountid: e.data.settlement_type,
                describe_text: e.data.describe_text,
                otherimgarr: "" == e.data.images ? [] : e.data.images,
                buydayau: e.data.dau,
                allpelnum: e.data.all_users
            }), console.log(t.data.otherimgarr), i = "" == e.data.images ? [] : e.data.images, 
            t.gettopitem();
            for (var o = 0; o < t.data.buyData.length; o++) for (var s = 0; s < e.data.buy_type.length; s++) if (t.data.buyData[o].item == e.data.buy_type[s]) {
                var d = "buyData[" + o + "].check";
                t.setData(a({}, d, !t.data.buyData[o].check));
            }
        });
    },
    gettopitem: function() {
        var a = this;
        if (1 == a.data.topid && a.setData({
            topitem: "买量"
        }), 2 == a.data.topid) {
            a.setData({
                topitem: "卖量"
            });
            var t = {};
            t.id = 4, t.item = "群", a.data.select_item_category.push(t), a.setData({
                select_item_category: a.data.select_item_category
            });
        }
        3 == a.data.topid && a.setData({
            topitem: "换量"
        }), 4 == a.data.topid && a.setData({
            topitem: "其他"
        });
    },
    getmymessage: function() {
        var a = this, t = {};
        t.uid = a.data.uid;
        var i = {
            url: e.config.getUserInfomessage,
            data: t
        };
        e.request(i, function(t) {
            0 == t.data.perfect && a.setData({
                toast3: "toast3"
            });
        });
    },
    onReady: function() {},
    onShow: function() {},
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
    back: function() {
        "" == this.data.release ? wx.redirectTo({
            url: "/pages/release/release"
        }) : wx.redirectTo({
            url: "/pages/myrelease/myrelease?mine=mine"
        });
    },
    choosebuy: function(t) {
        var e = this, i = "buyData[" + (t.currentTarget.dataset.id - 1) + "].check";
        e.setData(a({}, i, !e.data.buyData[t.currentTarget.dataset.id - 1].check));
    },
    chooseseale: function(a) {
        this.setData({
            sealeid: a.currentTarget.dataset.id
        });
    },
    chooseaccount: function(a) {
        this.setData({
            accountid: a.currentTarget.dataset.id
        });
    },
    seletopcategory: function() {
        this.setData({
            selectcategorytoast: "" == this.data.selectcategorytoast ? "selectcategorytoast" : ""
        });
    },
    selctcategory: function(a) {
        this.setData({
            categoryid: a.currentTarget.dataset.id,
            categorygoal: a.currentTarget.dataset.item,
            selectcategorytoast: ""
        });
    },
    upload: function() {
        var a = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                var e = t.tempFilePaths;
                a.setData({
                    touxiangicon: e,
                    touxiangiconbase64: wx.getFileSystemManager().readFileSync(t.tempFilePaths[0], "base64")
                });
            }
        });
    },
    uploadotherimg: function(a) {
        var t = this;
        wx.chooseImage({
            count: 5 - t.data.otherimgarr.length,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                for (var e = a.tempFilePaths, o = t.data.otherimgarr, s = 0; s < e.length; s++) o.push(e[s]), 
                i.push(wx.getFileSystemManager().readFileSync(a.tempFilePaths[s], "base64"));
                t.setData({
                    otherimgarr: o
                });
            }
        });
    },
    delotherimg: function(a) {
        var t = this, e = t.data.otherimgarr;
        e.splice(a.currentTarget.dataset.id, 1), t.setData({
            otherimgarr: e,
            objbasearr: i.splice(a.currentTarget.dataset.id, 1)
        });
    },
    bindTextAreaBlur: function(a) {
        this.setData({
            describe_text: a.detail.value
        });
    },
    uploaderwema: function() {
        var a = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                var e = t.tempFilePaths;
                a.setData({
                    erweimaicon: e,
                    erweimaiconbase64: wx.getFileSystemManager().readFileSync(t.tempFilePaths[0], "base64")
                });
            }
        });
    },
    submitname: function(a) {
        var t = this;
        t.setData({
            name: a.detail.value
        }), t.data.name.length > 50 && wx.showToast({
            title: "最多输入五十个字",
            icon: "loading",
            duration: 1500
        });
    },
    submitintruduce: function(a) {
        var t = this;
        t.setData({
            intruduce: a.detail.value
        }), t.data.name.intruduce > 100 && wx.showToast({
            title: "最多输入一百个字",
            icon: "loading",
            duration: 1500
        });
    },
    sumitbuydayau: function(a) {
        this.setData({
            buydayau: a.detail.value
        }), /^\d+(\.\d{1,4})?$/.test(a.detail.value) || wx.showToast({
            title: "最多四位小数",
            icon: "loading",
            duration: 1500
        });
    },
    sumitallpelnum: function(a) {
        this.setData({
            allpelnum: a.detail.value
        }), /^\d+(\.\d{1,4})?$/.test(a.detail.value) || wx.showToast({
            title: "最多四位小数",
            icon: "loading",
            duration: 1500
        });
    },
    submit: function() {
        var a = this;
        if (4 != a.data.topid) if ("" != a.data.name && "/assets/img_plus.png" != a.data.touxiangicon && "/assets/img_plus.png" != a.data.erweimaicon) if (a.data.name.length > 50) wx.showToast({
            title: "最多输入五十个字",
            icon: "loading",
            duration: 1500
        }); else if (a.data.name.intruduce > 100) wx.showToast({
            title: "最多输入一百个字",
            icon: "loading",
            duration: 1500
        }); else {
            if (1 == a.data.topid) {
                var t = [];
                for (var o in a.data.buyData) if (a.data.buyData[o].check) {
                    t.push(a.data.buyData[o].item);
                    var s = t.join(",");
                }
                if (0 == t.length) return void wx.showModal({
                    title: "提示",
                    content: "您还没填写完内容哦~",
                    showCancel: !1,
                    success: function(a) {
                        a.confirm || a.cancel;
                    }
                });
                if ("" == a.data.id && a.setData({
                    submitcomplete: !0
                }), "" != a.data.id && a.setData({
                    toast4: "toast4"
                }), wx.showLoading({
                    title: "提交中...",
                    duration: 3e3
                }), (c = {}).auth_uid = a.data.uid, c.target = a.data.topid, c.name = a.data.name, 
                c.type = a.data.categoryid, c.scale = a.data.sealeid, c.settlement_type = a.data.accountid, 
                c.buy_type = s, "" != a.data.intruduce && (c.desc = a.data.intruduce), "" == a.data.id) {
                    c.icon = a.data.touxiangiconbase64, c.qcode = a.data.erweimaiconbase64;
                    var d = {
                        url: e.config.addFlow,
                        data: c
                    }, n = e.request(d, function(t) {
                        1 == t.code && (wx.hideLoading(), a.setData({
                            toast1: "toast1",
                            haveResponse: !0
                        }));
                    });
                    setTimeout(function() {
                        a.data.haveResponse || (a.setData({
                            toast2: "toast2"
                        }), n.abort());
                    }, 3e3);
                }
                if ("" != a.data.id && a.data.toast4_sure) {
                    c.id = a.data.id, a.data.touxiangiconbase64 && "" != a.data.touxiangiconbase64 && (c.icon = a.data.touxiangiconbase64), 
                    a.data.erweimaiconbase64 && "" != a.data.erweimaiconbase64 && (c.qcode = a.data.erweimaiconbase64);
                    var d = {
                        url: e.config.updateFlow,
                        data: c
                    }, n = e.request(d, function(t) {
                        1 == t.code && (wx.showToast({
                            title: "修改成功~",
                            icon: "success",
                            duration: 2e3
                        }), a.setData({
                            toast4: ""
                        }), setTimeout(function() {
                            wx.redirectTo({
                                url: "/pages/myrelease/myrelease?mine=mine"
                            });
                        }, 1500), wx.hideLoading());
                    });
                }
            }
            if (2 == a.data.topid) {
                if ("" == a.data.id && a.setData({
                    submitcomplete: !0
                }), "" != a.data.id && a.setData({
                    toast4: "toast4"
                }), wx.showLoading({
                    title: "提交中...",
                    duration: 3e3
                }), (c = {}).auth_uid = a.data.uid, c.target = a.data.topid, c.name = a.data.name, 
                c.type = a.data.categoryid, c.scale = a.data.sealeid, c.settlement_type = a.data.accountid, 
                "" != a.data.intruduce && (c.desc = a.data.intruduce), "" == a.data.id) {
                    c.icon = a.data.touxiangiconbase64, c.qcode = a.data.erweimaiconbase64;
                    var d = {
                        url: e.config.addFlow,
                        data: c
                    }, n = e.request(d, function(t) {
                        1 == t.code && (wx.hideLoading(), a.setData({
                            toast1: "toast1",
                            haveResponse: !0
                        }));
                    });
                    setTimeout(function() {
                        a.data.haveResponse || (a.setData({
                            toast2: "toast2"
                        }), n.abort());
                    }, 3e3);
                }
                if ("" != a.data.id && a.data.toast4_sure) {
                    c.id = a.data.id, a.data.touxiangiconbase64 && "" != a.data.touxiangiconbase64 && (c.icon = a.data.touxiangiconbase64), 
                    a.data.erweimaiconbase64 && "" != a.data.erweimaiconbase64 && (c.qcode = a.data.erweimaiconbase64);
                    var d = {
                        url: e.config.updateFlow,
                        data: c
                    }, n = e.request(d, function(t) {
                        1 == t.code && (wx.showToast({
                            title: "修改成功~",
                            icon: "success",
                            duration: 2e3
                        }), a.setData({
                            toast4: ""
                        }), setTimeout(function() {
                            wx.redirectTo({
                                url: "/pages/myrelease/myrelease?mine=mine"
                            });
                        }, 1500), wx.hideLoading());
                    });
                }
            }
            if (3 == a.data.topid) {
                if ("" == a.data.buydayau || "" == a.data.allpelnum) return void wx.showModal({
                    title: "提示",
                    content: "您还没填写完内容哦~",
                    showCancel: !1,
                    success: function(a) {
                        a.confirm || a.cancel;
                    }
                });
                if (!/^\d+(\.\d{1,4})?$/.test(a.data.buydayau)) return void wx.showToast({
                    title: "日活填写有误",
                    icon: "loading",
                    duration: 1500
                });
                if (!/^\d+(\.\d{1,4})?$/.test(a.data.allpelnum)) return void wx.showToast({
                    title: "累计用户有误",
                    icon: "loading",
                    duration: 1500
                });
                "" == a.data.id && a.setData({
                    submitcomplete: !0
                }), "" != a.data.id && a.setData({
                    toast4: "toast4"
                }), wx.showLoading({
                    title: "提交中...",
                    duration: 3e3
                });
                var c = {};
                if (c.auth_uid = a.data.uid, c.target = a.data.topid, c.name = a.data.name, c.type = a.data.categoryid, 
                "" != a.data.intruduce && (c.desc = a.data.intruduce), c.dau = a.data.buydayau, 
                c.all_users = a.data.allpelnum, "" == a.data.id) {
                    c.icon = a.data.touxiangiconbase64, c.qcode = a.data.erweimaiconbase64;
                    var d = {
                        url: e.config.addFlow,
                        data: c
                    }, n = e.request(d, function(t) {
                        1 == t.code && (wx.hideLoading(), a.setData({
                            toast1: "toast1",
                            haveResponse: !0
                        }));
                    });
                    setTimeout(function() {
                        a.data.haveResponse || (a.setData({
                            toast2: "toast2"
                        }), n.abort());
                    }, 3e3);
                }
                if ("" != a.data.id && a.data.toast4_sure) {
                    c.id = a.data.id, a.data.touxiangiconbase64 && "" != a.data.touxiangiconbase64 && (c.icon = a.data.touxiangiconbase64), 
                    a.data.erweimaiconbase64 && "" != a.data.erweimaiconbase64 && (c.qcode = a.data.erweimaiconbase64);
                    var d = {
                        url: e.config.updateFlow,
                        data: c
                    }, n = e.request(d, function(t) {
                        1 == t.code && (wx.showToast({
                            title: "修改成功~",
                            icon: "success",
                            duration: 2e3
                        }), a.setData({
                            toast4: ""
                        }), setTimeout(function() {
                            wx.redirectTo({
                                url: "/pages/myrelease/myrelease?mine=mine"
                            });
                        }, 1500), wx.hideLoading());
                    });
                }
            }
        } else wx.showModal({
            title: "提示",
            content: "您还没填写完内容哦~",
            showCancel: !1,
            success: function(a) {
                a.confirm || a.cancel;
            }
        }); else {
            if ("" == a.data.describe_text) return void wx.showModal({
                title: "提示",
                content: "您还没填写完内容哦~",
                showCancel: !1,
                success: function(a) {
                    a.confirm || a.cancel;
                }
            });
            if ("" == a.data.id && a.setData({
                submitcomplete: !0
            }), "" != a.data.id && a.setData({
                toast4: "toast4"
            }), (c = {}).auth_uid = a.data.uid, c.target = a.data.topid, c.describe_text = a.data.describe_text, 
            i && 0 != i.length && (c.desc_images = i), "" == a.data.id) {
                var d = {
                    url: e.config.addFlow,
                    data: c
                }, n = e.request(d, function(t) {
                    1 == t.code && (wx.hideLoading(), a.setData({
                        toast1: "toast1",
                        haveResponse: !0
                    }));
                });
                setTimeout(function() {
                    a.data.haveResponse || (a.setData({
                        toast2: "toast2"
                    }), n.abort());
                }, 3e3);
            }
            if ("" != a.data.id && a.data.toast4_sure) {
                c.id = a.data.id;
                var d = {
                    url: e.config.updateFlow,
                    data: c
                }, n = e.request(d, function(t) {
                    1 == t.code && (wx.showToast({
                        title: "修改成功~",
                        icon: "success",
                        duration: 2e3
                    }), a.setData({
                        toast4: ""
                    }), setTimeout(function() {
                        wx.redirectTo({
                            url: "/pages/myrelease/myrelease?mine=mine"
                        });
                    }, 1500), wx.hideLoading());
                });
            }
        }
    },
    formSubmit: function(a) {
        var t = this, i = {};
        i.uid = t.data.uid, i.formId = a.detail.formId;
        var o = {
            url: e.config.addFormId,
            data: i
        };
        e.request(o, function(a) {});
    },
    know: function() {
        this.setData({
            toast1: ""
        }), wx.reLaunch({
            url: "/pages/index/index?target=" + this.data.topid
        });
    },
    failknow: function() {
        this.setData({
            toast2: "",
            submitcomplete: !1
        });
    },
    gotomine: function() {
        wx.reLaunch({
            url: "/pages/mine/mine"
        });
    },
    cancel: function() {
        this.setData({
            toast4: ""
        });
    },
    sure: function() {
        var a = this;
        a.setData({
            toast4_sure: !0
        }), a.submit();
    }
});