Component({
    properties: {
        adData: Object
    },
    attached: function () {
        this.setData({
            adID: this.dataset.id
        })
    },
    methods: {
      cancelJump(baseURL, curl) {
          if (!curl) {
            return
          }
          wx.request({
            url: baseURL + 'v1/api/cancelclk',
            // 点击上报
            data: {
              curl
            },
            method: 'POST'
          })
        },
        adLoad() {
            this.triggerEvent('adload')
        },
        clickAd(e) {
            this.triggerEvent('click')
        },
        complete() {
          // console.log('complete')
          // this.triggerEvent('close')
        },
        navSuc(e) {
          // console.log('success')
        },
        close() {
          this.triggerEvent('close')
        },
        navFail(e) {
          console.log('errMsg:', e.detail.errMsg)
          let { errMsg } = e.detail
          let { adData, adID } = this.data
          // 未绑定广告主appid
          if (errMsg.indexOf('not in navigateToMiniProgramAppIdList')!==-1) {
            wx.request({
              url: adData.baseURL + 'v1/api/skipfail',
              data: {
                // 广告主appid
                appid: adData[adID].appid[1],
                // 媒体主appkey
                appkey: adData[adID].ak
              },
              method: 'GET'
            })
          } else if (errMsg.indexOf('cancel') !== -1) {
            let obj = this.data.adData[this.data.adID]
            obj ? this.cancelJump(adData.baseURL, obj.curl) : (setTimeout(() => {
              this.cancelJump(adData.baseURL, obj ? obj.curl : '')
            }, 3000))
          } else if (errMsg.indexOf('fail to open') !== -1) {
            // 跳转到了广告主，但打开小程序失败，例如“该小程序尚未发布”
            // wx.request({
            //   url: adData.baseURL + 'v1/api/skipfail',
            //   data: {
            //     // 广告主appid
            //     appid: adData[adID].appid[1],
            //     // 媒体主appkey
            //     appkey: adData[adID].ak
            //   },
            //   method: 'GET'
            // })
          } else {
            // 其它
            // wx.request({
            //   url: adData.baseURL + 'v1/api/skipfail',
            //   data: {
            //     // 广告主appid
            //     appid: adData[adID].appid[1],
            //     // 媒体主appkey
            //     appkey: adData[adID].ak
            //   },
            //   method: 'GET'
            // })
          }
          // console.log(e)
        }
    }
});