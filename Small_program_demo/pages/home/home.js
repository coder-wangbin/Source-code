Page = require('../../utils/xmadx_sdk.js').xmad(Page).xmPage;
const app = getApp()
Page({
  data: {
    xmad: {
      adData: {},
      ad: {
        banner: 'xmdd4212d06d7867e2ad135bfc53a428',
        insert: 'xm32ade246cee4af6dc2b6ef12709d6f',
        fixed: 'xme19e984f63a1dd1801d6124f74d366'
      }
    },  
    isShowAD: 1,
    imgUrls: [
      'https://onegoods.nosdn.127.net/resupload/2016/9/18/4082e075e9ff72110bb1d73750be065b.jpg',
      'https://onegoods.nosdn.127.net/resupload/2016/9/20/01d732b0c46a38fc07bbc887dfe23af9.jpg',
      'https://onegoods.nosdn.127.net/resupload/2016/9/19/777e4b1711fb1b0283726cb0b197e8ba.jpg',
      'https://onegoods.nosdn.127.net/resupload/2016/9/20/f2f210633ca371ea6dc56a4b8916a15d.jpg',
      'https://onegoods.nosdn.127.net/resupload/2016/9/21/33c38d5283a862b2523fe2e085355cb2.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    windowWidth: 320,
    sortPanelTop: '0',
    sortPanelDist: '290',
    sortPanelPos: 'relative',
    noticeIdx: 0,
    notices: [{
        "clickUrl": "dbjsbridge://go?module=detail&gid=1032&period=192",
        "goods": "海购商品 It’S SKIN 伊思 完美活肤逆时空晶钻蜗牛BB霜 50毫升",
        "name": "奥特曼",
        "time": "2分钟前"
      },
      {
        "clickUrl": "dbjsbridge://go?module=detail&gid=1122&period=646",
        "goods": "海购商品 1箱20盒 |五木 梅紫苏味乌冬面 109克",
        "name": "磊磊",
        "time": "2分钟前"
      },
      {
        "clickUrl": "dbjsbridge://go?module=detail&gid=931&period=601",
        "goods": "宝马mini  儿童脚踏三轮车",
        "name": "最后",
        "time": "3分钟前"
      }
    ],
    "goodsList": [{
        "goods": {
          "buyUnit": 10,
          "desc": "唯一的不同，是处处不同",
          "id": 1093,
          "imgUrl": "http://res.126.net/p/dbqb/one/93/1093/a9cf9389428aa00af8508727427cb1c5.png",
          "name": "【预售】Apple iPhone6s Plus 128G 颜色随机",
          "tag": "ten"
        },
        "period": 211116272,
        "takeRate": 0.01,
        "takeChances": 70,
        "totalChances": 8090
      },
      {
        "goods": {
          "buyUnit": 1,
          "desc": "颜色随机",
          "id": 348,
          "imgUrl": "http://res.126.net/p/dbqb/one/98/348/b73494078d526fcb5ead4201ec29daef.png",
          "name": "Apple Watch Sport 38毫米 铝金属表壳 运动表带",
          "tag": ""
        },
        "period": 211116207,
        "takeRate": 0.19,
        "takeChances": 632,
        "totalChances": 3288
      },
      {
        "goods": {
          "buyUnit": 1,
          "desc": "配备 Retina 显示器",
          "id": 510,
          "imgUrl": "http://res.126.net/p/dbqb/one/112/112/b246c1f56b1b10de718d21a6aa7349ac.png",
          "name": "Apple MacBook Pro 15.4英寸笔记本",
          "tag": ""
        },
        "period": 211116244,
        "takeRate": 0.26,
        "takeChances": 3760,
        "totalChances": 14288
      },
      {
        "goods": {
          "buyUnit": 10,
          "desc": "超长续航 智能防盗",
          "id": 1168,
          "imgUrl": "http://res.126.net/p/dbqb/one/168/1168/6abc05894e903b9749166c224d739838.png",
          "name": "【预售】小牛电动N1电动踏板车 动力版 约11月20日发货",
          "tag": "ten"
        },
        "period": 211116256,
        "takeRate": 0.05,
        "takeChances": 300,
        "totalChances": 5990
      },
      {
        "goods": {
          "buyUnit": 1,
          "desc": "因工艺原因重量略有浮动",
          "id": 979,
          "imgUrl": "http://res.126.net/p/dbqb/one/229/979/defc72da941c4705fcdbb2a7ee03dbf1.png",
          "name": "周生生 黄金 足金旋转木马吊坠",
          "tag": ""
        },
        "period": 211116138,
        "takeRate": 0.17,
        "takeChances": 514,
        "totalChances": 2999
      },
      {
        "goods": {
          "buyUnit": 10,
          "desc": "颜色随机 支持专柜验货",
          "id": 673,
          "imgUrl": "http://res.126.net/p/dbqb/one/173/673/47c126b7bb39524d3d62151b2ef76629.png",
          "name": "Coach 蔻驰 抛光粒面皮革铆钉COACH CENTRAL手提包",
          "tag": "ten"
        },
        "period": 211115685,
        "takeRate": 0.13,
        "takeChances": 630,
        "totalChances": 4950
      },
      {
        "goods": {
          "buyUnit": 10,
          "desc": "颜色随机 美式奢侈生活风格的代表",
          "id": 943,
          "imgUrl": "http://res.126.net/p/dbqb/one/193/943/0994bfbd54c668fed6db160afd84eff4.png",
          "name": "MICHAEL KORS 迈克高仕 十字纹皮革钱包",
          "tag": "ten"
        },
        "period": 211114592,
        "takeRate": 0.45,
        "takeChances": 680,
        "totalChances": 1500
      },
      {
        "goods": {
          "buyUnit": 1,
          "desc": "吴晓波酿吴酒 一半清醒一半醉",
          "id": 1095,
          "imgUrl": "http://res.126.net/p/dbqb/one/95/1095/0176dd96dcc8b4188e6b2bbf85102304.png",
          "name": "【预售】吴酒 2016年贺年年酒 圣诞节开始派送",
          "tag": ""
        },
        "period": 211116226,
        "takeRate": 0.04,
        "takeChances": 7,
        "totalChances": 199
      },
      {
        "goods": {
          "buyUnit": 10,
          "desc": "珍贵绝伦",
          "id": 140,
          "imgUrl": "http://res.126.net/p/dbqb/one/140/140/ea7f0892ce49c332e2280513ee94a439.png",
          "name": "中国黄金 AU9999万足金50g薄片",
          "tag": "ten"
        },
        "period": 211116228,
        "takeRate": 0.95,
        "takeChances": 14200,
        "totalChances": 14990
      }, {
        "goods": {
          "buyUnit": 10,
          "desc": "唯一的不同，是处处不同",
          "id": 1093,
          "imgUrl": "http://res.126.net/p/dbqb/one/93/1093/a9cf9389428aa00af8508727427cb1c5.png",
          "name": "【预售】Apple iPhone6s Plus 128G 颜色随机",
          "tag": "ten"
        },
        "period": 211116272,
        "takeRate": 0.01,
        "takeChances": 70,
        "totalChances": 8090
      }
    ],
    animationNotice: {}
  },
  onLoad: function () {
    var me = this;
    var animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease-out',
    });
    me.animation = animation;
    wx.getSystemInfo({
      success: function (res) {
        me.setData({
          windowWidth: res.windowWidth
        })
      }
    });
  },
  bindViewTap() {
    // return false
    var config = [
      {
        type: 'button',
        data: '立即下单'
      },
      {
      "type": "form",
      "data": {
        "needs": {
          "area": true,
          "leave_msg": true
        },
        "config": {
          "title": "测试整体流程",
          "formTitle": "填写订单",
          goods: {
            name: '耳钉',
            price: '479.00',
            details: [
              {
                name: '颜色',
                values: [
                  {
                    label: '黑色',
                    checked: true
                  },
                  {
                    label: '白色',
                    checked: false
                  },
                  {
                    label: '红色',
                    checked: false
                  }]
              },
              {
                name: '长度',
                values: [{
                  label: '1cm',
                  checked: true
                },
                {
                  label: '1.5cm',
                  checked: false
                },
                {
                  label: '2cm',
                  checked: false
                }]
              }
            ]
          },
          "button1": "提交订单",
          "contactPhone": "13240384505"
        }
      }
    }, {
      "type": "imgs",
      "imgUrl": "http://aldpicsh-1252823355.cossh.myqcloud.com/ad_advertiser/15396908775298.jpg"
    }, {
      "type": "banner",
      "data": ["http://aldpicsh-1252823355.cossh.myqcloud.com/ad_advertiser/15396908152570.jpg", "http://aldpicsh-1252823355.cossh.myqcloud.com/ad_advertiser/15396908185302.jpg", "http://aldpicsh-1252823355.cossh.myqcloud.com/ad_advertiser/15396908209537.jpg", "http://aldpicsh-1252823355.cossh.myqcloud.com/ad_advertiser/15396908225448.jpg", "http://aldpicsh-1252823355.cossh.myqcloud.com/ad_advertiser/15396908267016.jpg", "http://aldpicsh-1252823355.cossh.myqcloud.com/ad_advertiser/15396908303575.jpg"]
    }]
    var strConfig = JSON.stringify(config)
    wx.navigateTo({
      url: `/pages/xmadPage/collect?xmadPage=${strConfig}&title=页面标题&pagekey=xmad991dd72933a3bae11bb2&appkey=xma51a1ead02ed70feaac3538366fa16&ukey=c11d163e161f4be906e3503a809c1e93&hasAuth=1&bs=http://172.81.208.169:9292/v1/api/&cu=FcxcDgf4i5miODgMJAxG14E99rMU/6ReNKdKgLpRBEDRE4SrBOuWyo5/7WLFotd4oZP20tBOPEzQVO9/7UyReh5NxALjavhciwg0qFKpTz3FefMJGJfkGxd68QrsF1yIJ2nIOzLaAnj5ptYgVXf3/wK6LMgBAKQaNVZU8+5uOlFObUfQsmBoieIOa5AMR4Q0WIteX1BMSDXb6hxFwhh2ap5FVzf45vYMne1NjNFQvZW3XPT/pr318bcBBNpvxnM+BsUz3FaotgXOqGJUCGpaTrwKScCfbp7Y1IL/Z+NTNOk!`,
      // url: `/pages/xmadPage/sell?xmadPage=${strConfig}&title=页面标题&pagekey=xmad991dd72933a3bae11bb2&appkey=xma51a1ead02ed70feaac3538366fa16&ukey=c11d163e161f4be906e3503a809c1e93&hasAuth=1&bs=http://172.81.208.169:9292/v1/api/&cu=FcxcDgf4i5miODgMJAxG14E99rMU/6ReNKdKgLpRBEDRE4SrBOuWyo5/7WLFotd4oZP20tBOPEzQVO9/7UyReh5NxALjavhciwg0qFKpTz3FefMJGJfkGxd68QrsF1yIJ2nIOzLaAnj5ptYgVXf3/wK6LMgBAKQaNVZU8+5uOlFObUfQsmBoieIOa5AMR4Q0WIteX1BMSDXb6hxFwhh2ap5FVzf45vYMne1NjNFQvZW3XPT/pr318bcBBNpvxnM+BsUz3FaotgXOqGJUCGpaTrwKScCfbp7Y1IL/Z+NTNOk!`,
      success: function () {
        console.log('跳转');
      },
      fail: function () {}
    });
  },
  startNotice: function () {
    var me = this;
    var notices = me.data.notices || [];
    if (notices.length == 0) {
      return;
    }

    var animation = me.animation;
    //animation.translateY( -12 ).opacity( 0 ).step();
    animation.translateY(0).opacity(1).step({
      duration: 0
    });
    me.setData({
      animationNotice: animation.export()
    });

    var noticeIdx = me.data.noticeIdx + 1;
    if (noticeIdx == notices.length) {
      noticeIdx = 0;
    }

    // 更换数据
    setTimeout(function () {
      me.setData({
        noticeIdx: noticeIdx
      });
    }, 400);

    // 启动下一次动画
    setTimeout(function () {
      me.startNotice();
    }, 5000);
  },
  onShow: function () {
    // wx.navigateTo({
    //   url: '/pages/xmadPage/copyInfo',
    // })
    this.startNotice();
  },
  onToTop: function (e) {
    if (e.detail.scrollTop >= 290) {
      this.setData({
        sortPanelPos: 'fixed'
      });
    } else {
      this.setData({
        sortPanelPos: 'relative'
      });
    }
    console.log(e.detail.scrollTop)
  }
})