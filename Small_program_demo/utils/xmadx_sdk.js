// ct: 1.banner广告  2.插屏广告  3.悬浮窗广告
// at: 1.H5 2.预览图 3.小程序 4.小程序直投 5.内置小程序广告 6.商品售卖 7.复制信息
// 入口方法： xmApp  xmPage
let xmad = (miniProLife, at) => {
  var version = "1.5.1";
  try {
    // 开发者使用wepy框架开发小程序时有些地方需要单独处理
    var wepy = miniProLife === "wepy";
  } catch (e) { }
  try {
    // 判断是否有别的sdk修改了App  如果有则使用修改后的App方法
    let life = miniProLife.prototype.constructor.name;
    if (life) {
      var ohterApp, ohterPage;
      at === "App" ? (ohterApp = miniProLife) : (ohterPage = miniProLife);
    }
  } catch (e) { }

  var conf = require("./xmadx_conf.js");
  var utilMd5 = require("./xmadx_MD5.js");
  let ENV = 1; // 1为测试环境，0为线上环境
  // 存放所有的广告位数据
  var devData = {};
  if (!conf.app_key || conf.app_key.length !== 32) {
    console.warn("小盟提示：配置错误，请在xmadx_conf.js中正确配置您的app_key。");
    // 如果没有配置app_key,优雅返回
    let xmApp = function (arg) {
      ohterApp ? ohterApp(arg) : App(arg);
    };

    let xmPage = function (arg) {
      ohterPage ? ohterPage(arg) : Page(arg);
    };
    return { xmApp, xmPage };
  }

  var reqData = {
    ak: conf.app_key.replace(/(^\s*)|(\s*$)/g, ""),
    v: version,
    asid: "", // 广告位id
    reqid: "", // timestamp，app_key, uuid，asid md5加密
    pb: "", // 设备品牌
    pm: "", // 设备型号
    sv: "", // 设备系统版本
    pv: "", // 客户端平台
    nt: "", // 网络类型
    ww: 0, // 屏幕大小 - 宽0alm
    wh: 0, // 屏幕大小 - 高
    pr: 0, // 设备像素比
    long: 0, // 经度
    lat: 0, // 纬度
    wvv: "", // 微信版本
    wv: "", // 客户端基础库版本
    lang: "", // 微信设置
    wsr: {}, // 微信Launch传递过来的参数
    pp: "", // 页面路径
    uuid: "", // 用户UUID
    drop: {
      hasCollect: !1, // 是否包含收集页面
      hasSell: !1, // 是否包含售卖页面
      hasCopy: !1
    },
    user_info: {} // 用户信息
  };

  // 是否已经缓存好用户信息
  var info_is_ok = 0;
  // 生成 uuid
  var getUuid = function () {
    let uuid;
    try {
      uuid = wx.getStorageSync("xmaduuid");
      if (uuid) return uuid;
    } catch (e) { }
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    uuid = s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
    try {
      wx.setStorageSync("xmaduuid", uuid);
    } catch (e) { }
    return uuid;
  };

  var sellPath = 'pages/xmadPage/sell';
  var collectPath = 'pages/xmadPage/collect';
  var copyPath = 'pages/xmadPage/copyInfo';

  // 判断app.json是否添加收订广告页
  var getSubInfo = function () {
    var hasSellFile = !1
    var hasCollectFile = !1
    var hasCopyFile = !1
    try {
      var pages = __wxConfig.pages
      hasSellFile = pages.some(p => p === sellPath)
      hasCollectFile = pages.some(p => p === collectPath)
      hasCopyFile = pages.some(p => p === hasCopyFile)
    } catch (e) { }
    reqData.drop.hasSell = hasSellFile
    reqData.drop.hasCollect = hasCollectFile
    reqData.drop.hasCopy = hasCopyFile
  };

  // 缓存用不上，可考虑延迟加载广告，在获取信息之后 2018年10月30日 by tgf
  // 获取各种信息并加入请求体 异步
  var getUserDetail = function (callback) {
    var done = [];
    function cb() {
      if (done.length === 4) {
        // 用户信息已缓存
        info_is_ok = 1;
        callback && callback();
      }
    }
    // 1.获取用户信息
    var getUserInfo = function () {
      wx.getSetting({
        success: function (res) {
          if (res.authSetting["scope.userInfo"]) {
            wx.getUserInfo({
              withCredentials: false,
              success: function (res) {
                reqData["user_info"] = res.userInfo;
              },
              complete: function () {
                done.push("ok1");
                cb();
              }
            });
          } else {
            done.push("ok1");
            cb();
          }
        },
        fail: function () {
          done.push("ok1");
          cb();
        }
      });
    };
    // 2.获取设备信息
    var getSystemInfo = function () {
      wx.getSystemInfo({
        success: function (res) {
          reqData["wv"] =
            typeof res["SDKVersion"] === "undefined"
              ? "1.0.0"
              : res["SDKVersion"];
          reqData["pb"] = res["brand"];
          reqData["pm"] = res["model"];
          reqData["pr"] = res["pixelRatio"];
          reqData["ww"] = res["screenWidth"];
          reqData["wh"] = res["screenHeight"];
          reqData["lang"] = res["language"];
          reqData["wvv"] = res["version"];
          reqData["sv"] = res["system"];
          reqData["pv"] = res["platform"];
        },
        complete: function () {
          done.push("ok2");
          cb();
        }
      });
    };
    // 3.获取地理位置
    var getLocation = function () {
      wx.getSetting({
        success: function (res) {
          if (res.authSetting["scope.userLocation"]) {
            wx.getLocation({
              type: "wgs84",
              success: function (res) {
                reqData.long = res.latitude;
                reqData.lat = res.longitude;
              },
              complete: function () {
                done.push("ok3");
                cb();
              }
            });
          } else {
            done.push("ok3");
            cb();
          }
        },
        fail: function () {
          done.push("ok3");
          cb();
        }
      });
    };
    // 4.获取网络信息
    var getNetworkType = function () {
      wx.getNetworkType({
        success: function (res) {
          reqData["nt"] = res["networkType"];
        },
        complete: function () {
          done.push("ok4");
          cb();
        }
      });
    };
    getUserInfo();
    getSystemInfo();
    getLocation();
    getNetworkType();
  };

  // 广告类型ct: 1.banner广告  2.插屏广告  3.悬浮窗广告
  var getCtType = function (ct) {
    switch (ct) {
      case 1: {
        // banner
        return {
          dTag: 'xm_banner',
          dClass: 'banner_style'
        }
      }
      case 2: {
        // 插屏
        return {
          dTag: 'xm_insert',
          dClass: 'screen_style'
        }
      }
      case 3: {
        // 悬浮窗
        return {
          dTag: 'xm_fixed',
          dClass: 'fixed_style'
        }
      }
      default: {
        return
      }
    }
  };

  // 请求广告
  var getAdFunc = function (position, app, id, boole) {
    if (!id) {
      return
    }
    // id为''或者位数不是32位
    if (id.length != 32) {
      return console.warn(`广告位ID应为长度为32位，请检查您在js中'xmad'的配置--${id}`)
    }
    session_log(id, ["engine", "v1/api/ad"], function (res) {
      // wxml是否配置正确
      if (res.data.code == 200) {
        // 拿到相应的广告位数据
        var retData = res.data.data;
        devData[id] = retData;
        // 控制广告显示隐藏
        devData[id]["hasshow"] = true;
        devData[id].id = id;
        // 是否已经进行曝光上报了
        devData[id].push = 0;

        var ctType = getCtType(retData.ct)
        if (ctType) {
          // 填充到页面 区分wepy和原生
          devData[id].style = ADstyle[ctType.dClass];
          let tempXmad = app.data.xmad;
          // devData.ENV = ENV
          tempXmad.adData = devData;
          wepy ? app.xmapply(devData) : app.setData({ xmad: tempXmad });
          xmad.adData
        }
      } else if (res.data.code == 202) {
        // 未查询到广告位信息
        // code: "202";msg:"广告位不属于该小程序"
        // code: "202";msg: "未匹配到广告!"
        // let pos
        // switch (position) {
        //   case 'banner':
        //     pos = 'banner';
        //     break;
        //   case 'insert':
        //     pos = '插屏';
        //     break;
        //   case 'fixed':
        //     pos = '悬浮窗';
        //     break;
        //   default :
        //     break;
        // }
        console.warn(`${position}广告位ID${id}未匹配到广告`);
        const tempXmad = app.data.xmad;
        if (!tempXmad.empty) {
          tempXmad.empty = {}
        }
        if (position == 'banner' && boole) {
          if (!tempXmad.empty[position]) {
            tempXmad.empty[position] = []
          }
          tempXmad.empty[position].push({
            id: id,
            reason: res.data.msg
          })
        } else {
          tempXmad.empty[position] = {
            id: id,
            reason: res.data.msg
          }
        }

        app.setData({ xmad: tempXmad });
        // const message = res.data.msg
        // if (message == '广告位不属于该小程序') {
        //   console.warn(`广告位ID不属于该小程序，请检查您在js中'xmad'的配置--${id}`)
        // } else if (message == '未匹配到广告') {
        //   const pos = position == 'insert' ? '插屏' : 'fixed' ? '悬浮窗' : 'banner'
        //   console.warn(`${pos}广告位ID${id}未匹配到广告`)
        // 告知项：1.位置banner、插屏、悬浮窗；2.广告位id
        // let tempXmad = app.data.xmad;
        // tempXmad.have = false
        // }
      }
    });
  };

  // 请求中继判断用户信息是否已缓存好
  var session_log = function (data, url, callback, method) {
    if (info_is_ok === 0) {
      getUserDetail(function () {
        wx_request(data, callback, url, method);
      });
    } else {
      wx_request(data, callback, url, method);
    }
  };

  // 封装微信请求方法
  var wx_request = function (data, callback, url, method) {
    var method = method ? "get" : "post";
    let baseURL = ENV
      ? "http://172.81.208.169:9292/"
      : "https://" + url[0] + ".xmadx.net/";
    reqData.asid = data;
    reqData.uuid = reqData.uuid || getUuid();
    if (url[0] != "log") {
      var reqMD5 =
        Date.now() + reqData["ak"] + reqData["uuid"] + reqData["asid"];
      reqData["reqid"] = utilMd5.hexMD5(reqMD5);
    }
    var retryTimes = 0;
    var sendLog = function () {
      wx.request({
        url: baseURL + url[1],
        data: reqData,
        header: {
          // Remote_Addr: "192.168.1.1"
        },
        method: method,
        success: function (res) {
          callback(res);
        },
        fail: function () {
          if (retryTimes < 2) {
            retryTimes++;
            reqData["retryTimes"] = retryTimes;
            setTimeout(() => {
              sendLog();
            }, 1000);
          }
        }
      });
    };
    sendLog();
  };

  // APP生命周期：onLaunch
  var appLaunch = function (options) {
    reqData.uuid = getUuid();
    // wx.login({
    //   success: function(res){
    //     var postData = {
    //       jscode: encodeURIComponent(res.code),
    //       uuid: reqData.uuid,
    //       appkey: reqData.ak
    //     }
    //     let baseURL = ENV
    //       ? "http://172.81.208.169:9292/"
    //       : "https://engine.xmadx.net/";
    //     wx.request({
    //       url: baseURL + 'v1/api/init',
    //       method: 'post',
    //       data: postData
    //     })
    //   },
    //   fail: function(){}
    // })
    wx.setStorageSync("xmwsr", options);
  };

  // Page生命周期：pageOnload阶段：1.获取当前页面路径并加入请求体。2.获取开发者在当前页面设置的广告，请求并渲染
  var pageOnLoad = function () {
    getSubInfo();
    // 接受小程序options
    reqData.wsr = wx.getStorageSync("xmwsr");
    // 将当前页面路径加入请求数据
    reqData.pp = this.route;
    // 请求广告
    var adData
    try {
      adData = this.data.xmad.ad
    } catch (e) { }
    if (adData) {
      var _self = this
      for (var i in adData) {
        i === 'banner' && 'Array' === Object.prototype.toString.call(adData[i]).split(' ')[1].slice(0, -1)
          ? adData[i].forEach(id => {
            getAdFunc(i, _self, id, 1)
          })
          : getAdFunc(i, _self, adData[i])
      }
    }
  };

  // Page生命周期：pageOnShow阶段：如果连接中存在xmadH5url参数则认为是webviewH5广告页
  var pageOnShow = function () {
    // 如果检测到链接中有xmadH5url则设置对应H5链接
    var url = this.options.xmadH5url;
    if (url) {
      url = url.replace("|", "?").replace("$", "=");
      this.setData({
        xmadURL: url
      });
    }
  };

  // 上报请求
  var rlog = (body, life) => {
    let method = method ? "get" : "post";
    let baseURL = ENV
      ? "http://172.81.208.169:9292/"
      : "https://log.xmadx.net/";
    let data = {};
    /imp/.test(life) ? (data.iurl = body) : (data.curl = body);
    let retryTimes = 0;
    let sendLog = function () {
      wx.request({
        url: baseURL + life,
        data: data,
        method: method ? "post" : "get",
        success: function () { },
        fail: function () {
          if (retryTimes < 2) {
            retryTimes++;
            data["retryTimes"] = retryTimes;
            setTimeout(() => {
              sendLog();
            }, 1000);
          }
        }
      });
    };
    sendLog();
  };

  // 广告显示 -> 曝光上报
  var adImgLoad = function (event) {
    var adid = event.currentTarget.dataset.id
    var currentAd = devData[adid]
    // 是否已曝光
    if (currentAd.push === 0) {
      var iurlId = currentAd['iurl'].split('?')[1]
      var _self = this
      var ob = wx.createIntersectionObserver(_self, {
        thresholds: [0.2], // 广告出现20%时上报
        selectAll: true
      });
      // banner位需要判断是否展示在可视区域
      if (currentAd.ct === 1) {
        ob.relativeToViewport().observe(".xm_banner", function (res) {
          if (res.intersectionRatio > 0.2) {
            var xmad = _self.data.xmad
            xmad.adData[adid].push = 1
            xmad.adData.baseURL = ENV == 1 ? 'http://172.81.208.169:9292/' : 'https://log.xmadx.net/'
            _self.setData({
              xmad: xmad
            });
            // 后3个参数是假的，迷惑想要作弊的开发者。。。
            rlog(iurlId, "v1/api/imp", ["log", "imp"], function (res) { }, "get");
            // 取消监听
            ob.disconnect();
          }
        });
      } else {
        var xmad = this.data.xmad
        xmad.adData.ENV = ENV
        xmad.adData[adid].push = 1
        xmad.adData.baseURL = ENV == 1 ? 'http://172.81.208.169:9292/' : 'https://log.xmadx.net/'
        this.setData({
          xmad: xmad
        })
        // 其他广告位直接曝光
        rlog(iurlId, "v1/api/imp", ["log", "imp"], function (res) { }, "get");
      }
    }
  }

  // 关闭广告事件
  var xmadClose = function (event) {
    var id = event.currentTarget.dataset.id;
    var tm_data = this.data.xmad;
    tm_data.adData[id]["hasshow"] = false;
    this.setData({
      xmad: tm_data
    });
  };

  // 点击广告事件 -> 点击上报
  var appoIntView = function (event) {
    var adid = event.currentTarget.dataset.id;
    var curlId = devData[adid]["curl"].replace(/cst=/gi, "cst=" + Date.now());
    curlId = curlId.split("?")[1];
    // 如果广告类型是H5，则跳转到xmadH5页面
    var adType = devData[adid].at;
    switch (adType) {
      case 1: {
        // 跳至H5页面
        let base = conf.h5_path || wepy ? "/pages/xmadH5" : "/pages/xmadH5/xmadH5";
        let url = devData[adid].h5link.replace("?", "|").replace("=", "$");
        if (url) {
          wx.navigateTo({
            url: base + "?xmadH5url=" + url,
            success: function () {
              rlog(curlId, "v1/api/clk", ["log", "imp"], function (res) { }, "get");
            },
            fail: function () {
              console.warn("小盟提示：跳转H5广告失败，请在xmadx_conf.js中正确配置h5_path字段。");
            }
          });
        }
        break;
      }
      case 2: {
        // 打开预览图形式
        if (!event.currentTarget.dataset.adImgUrl) {
          event.currentTarget.dataset.adImgUrl = devData[adid].appimg;
        }
        wx.previewImage({
          current: event.currentTarget.dataset.adImgUrl, // 当前显示图片的http链接
          urls: [event.currentTarget.dataset.adImgUrl], // 需要预览的图片http链接列表
          success: function () {
            // 点击上报
            rlog(curlId, "v1/api/clk", ["log", "imp"], function (res) { }, "get");
          }
        });
        break;
      }
      case 3:
      case 4: {
        // 直投形式
        // 小程序直投形式
        rlog(curlId, "v1/api/clk", ["log", "imp"], function (res) { }, "get");
        break;
      }
      case 5:
      case 6:
      case 7: {
        // 收订收集
        // 收订售卖
        // 收订复制
        var page = devData[adid].page
        var ak = reqData.ak
        var ukey = reqData.uuid
        var hasAuth = devData[adid].isAccredit
        var curl = devData[adid].curl.split("?")[1].replace(/=/gi, "!")
        var baseURL = ENV ? "http://172.81.208.169:9292/v1/api/" : "https://engine.xmadx.net/v1/api/";
        var basePath
        if (page.purpose == 1) {
          basePath = collectPath
        }
        if (page.purpose == 2) {
          basePath = sellPath
        }
        if (page.purpose == 3) {
          basePath = copyPath
        }
        if (basePath) {
          wx.navigateTo({
            url: `/${basePath}?xmadPage=${page.config}&title=${page.title}&pagekey=${page.page_key}&appkey=${ak}&ukey=${ukey}&hasAuth=${hasAuth}&bs=${baseURL}&cu=${curl}`,
            success: function () {
              rlog(curlId, "v1/api/clk", ["log", "imp"], function () { }, "get");
            },
            fail: function (e) {
              console.warn(e, "小盟提示：跳转失败，请检查内置广告页是否配置正确。");
            }
          })
        }
        break;
      }
      default: {
        console.error(`SDK错误：跳转类型at为：${adType} ，不是约定的类型。无法进行跳转、点击上报，联系GO工程师！！！`);
        break;
      }
    }
  };

  // 添加app，page钩子
  // wepy方法需要先执行
  var addHook = function (obj, method, callBack) {
    var oldMethod = obj[method]
    obj[method] = function (arg) {
      oldMethod && oldMethod.call(this, arg)
      callBack.call(this, arg)
    }
  };

  var xmApp = function (arg) {
    addHook(arg, "onLaunch", appLaunch);
    ohterApp ? ohterApp(arg) : App(arg);
  };

  var xmPage = function (arg) {
    addHook(arg, "onLoad", pageOnLoad);
    addHook(arg, "onShow", pageOnShow);
    addHook(arg, "xmadClose", xmadClose);
    addHook(arg, "adImgLoad", adImgLoad);
    addHook(arg, "appoIntView", appoIntView);
    ohterPage ? ohterPage(arg) : Page(arg);
  };

  // 添加广告样式
  var ADstyle = {
    banner_style: {
      wrap: "position: relative; display: flex; width: 100%; overflow: hidden",
      img: "width: 100%; margin: 0 auto;",
      icon:
        "position: absolute; left: 2rpx; bottom: 2rpx; width: 76rpx !important; height: 24rpx !important; line-height: 24rpx; background: rgba(0, 0, 0, .2); font-size: 16rpx; color: #fff; text-align: center; border-radius: 16rpx;",
      nav:
        "position: absolute; top: 0; right: 0; left: 0; bottom: 0; margin: 0; background: none;"
    },
    // 插屏
    screen_style: {
      wrap:
        "position: fixed; width: 100%; height: 100%; left: 0; top: 0; background: rgba(0, 0, 0, .3); z-index: 9999;",
      content:
        "position: relative; display: flex; width: 600rpx !important; overflow: hidden; left: calc(50% - 300rpx); top: calc(50% - 250rpx)",
      img: "width: 100%;",
      close:
        "position: absolute; top: 0; right: 0; width: 34rpx !important; height: 34rpx !important; padding: 10rpx; z-index: 2",
      nav:
        "position: absolute; top: 0; right: 0; left: 0; bottom: 0; margin: 0; background: none;",
      icon:
        "position: absolute; left: 2rpx; bottom: 2rpx; width: 76rpx !important; height: 24rpx !important; line-height: 24rpx; background: rgba(0, 0, 0, .2); font-size: 16rpx; color: #fff; text-align: center; border-radius: 16rpx;"
    },
    // 悬浮窗
    fixed_style: {
      wrap: "position: fixed; display: flex; width: 120rpx !important; right: 60rpx; bottom: 60rpx; z-index: 9998;",
      img: "width: 100%;",
      nav: "position: absolute; top: 0; right: 0; left: 0; bottom: 0; margin: 0; background: none;"
    }
  };
  return { xmApp, xmPage };
};
exports.xmad = xmad;
