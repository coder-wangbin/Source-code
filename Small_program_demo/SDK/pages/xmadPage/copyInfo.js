// pages/xmadPage/sell.js
Page({
  
  data: {
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 5000,
    duration: 1000,
    dataJson: [],
    formConfig: {},
    base: '',
    title: ''
  },

  onLoad: function (options) {
    this.setData({
      base: options.bs,
      title: options.title,
      'formConfig.uuid': options.ukey,
      'formConfig.ak': options.appkey,
      'formConfig.page_key': options.pagekey,
      'formConfig.curl': options.cu.replace(/!/gi, '=')
    })
    let dataJson = JSON.parse(options.xmadPage)
    // dataJson[4].data.config.orderInfo = {
    //   copy:  '一键复制公众号',
    //   operation:  '请复制关注公众号',
    //   wechatCount:  'shenhe12345',
    //   wechatTip:  '审核公众'
    // }
    this.setTitle()
    this.setData({
      dataJson
    })
  },

  onShow: function () {
  },
    // wx.createSelectorQuery()
    //   .select('.form-container')
    //   .boundingClientRect(function (res) {
    //     wx.pageScrollTo({
    //       scrollTop: res.top,
    //       duration: 300
    //     })
    //   })
    //   .exec()
  setTitle: function () {
    this.data.title && wx.setNavigationBarTitle({
      title: this.data.title
    })
  },

  copyPublicAddress: function () {
    let acount
    const _t = this
    _t.data.dataJson.forEach((item, inex, arr) => {
      switch (item.type) {
        case 'form':
          acount = item.data.config.orderInfo.wechatCount
      }
    })
    let retryTimes = 0;
    let sendLog = function () {
      wx.request({
        url: _t.data.base + "copyPublicAccount",
        data: {
          curl: _t.data.formConfig.curl
        },
        method: "post",
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
    wx.setClipboardData({
      data: acount,
      success: function (res) {
        // wx.getClipboardData({
        //   success(res) {
        //     wx.showModal({
        //       title: '去搜索公众号吧',
        //       content: res.data
        //     })
        //   }
        // })
      },
      fail: function () { },
      complete: function () { }
    })
  }
})
