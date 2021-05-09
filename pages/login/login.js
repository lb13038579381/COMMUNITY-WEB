const app = getApp();
import {
  Config
} from '../../utils/config.js';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    is_load: false
  },

  goToSecret: function () {
    wx.navigateTo({
      url: '../login/secret',
    })
  },

  doLogin: function (param) {
    this.setData({
      is_load: true
    })
    var that = this;
    var username = param.detail.value.username
    var password = param.detail.value.password
    wx.login({
      success: (res) => {
        wx.request({
          url: Config.restUrl + 'memberController/login',
          method: "POST",
          data: {
            username: username,
            password: password
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
          },
          success: function (res) {

            var code = res.data.statusCode;
            console.log(code)
            if(code == '101'){
              console.log(res)
              console.log(res.data.msg)
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 2000 //持续的时间
              })
            }
            if (code == '500') {
              wx.showToast({
                title: '服务器正忙，请稍后再试1！',
                icon: 'none',
                duration: 2000 //持续的时间
              })
            }
            if (code == '200') {
              app.globalData.is_login = true;
              app.globalData.memberId=res.data.memberId;
              console.log(app.globalData.memberId);
              wx.switchTab({
                url: '../my/my',
              })
            }
            // if (res.data.token != null) {
            //   app.globalData.is_login = true;
            //   wx.switchTab({
            //     url: '../my/my',
            //   })
            // } else {
            //   that.setData({
            //     'is_load': false,
            //   }) //处理异常
            //   wx.showToast({
            //     title: '服务器正忙，请稍后再试2！',
            //     icon: 'none',
            //     duration: 2000 //持续的时间
            //   })
            // }
          },
          fail: function (res) {
            console.log(res)
          },
        })
      },
    })
  }

})