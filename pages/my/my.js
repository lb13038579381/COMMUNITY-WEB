const app = getApp();
import {My} from 'my-model.js';
var my = new My();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    is_read:false
  },

  goToMyClub: function (e) {
    wx.navigateTo({
      url: '/pages/my/myclub',
    })
  },

  goToMyInfo: function (e) {
    wx.navigateTo({
      url: '/pages/myinfo/myinfo',
    })
  },

  goToMyApply: function (e) {
    wx.navigateTo({
      url: '/pages/my/myapply',
    })
  },

  goToMyCommunityApply: function (e) {
    wx.navigateTo({
      url: '/pages/my/mycommunityapply',
    })
  },

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      'is_login': app.globalData.is_login,
    });
    if(app.globalData.is_login == true){
      this._loadData();
    }else{
      wx.showToast({
        title: '请登录！',
        icon: 'none',
        duration: 2000 //持续的时间
      })
    }
  },

  _loadData:function(){
    my.MyInfoData((res) => {
      if(res.is_read != 0){
        this.setData({
          is_read:true
        })
      }else{
        this.setData({
          is_read:false
        })
      }
      this.setData({
        'myInfo': res
      });
    });
  },
  onShow: function () {
    this.setData({
      'is_login': app.globalData.is_login,
    })
    if(app.globalData.is_login == true){
      this._loadData();
    }
  },

  Logout:function(){
    app.globalData.is_login = false;
    var that = this
    my.LoginOut((res)=>{
      console.log(res)
      if(res.errorCode == 0){
        wx.clearStorage({
          success:(res)=>{
            wx.showToast({
              title: '解绑成功！',
              icon: 'none',
              duration: 2000 //持续的时间
            })
            that.setData({
              is_read:false
            })
            setTimeout((res)=>{
              that.onLoad()
            },2000)
          }
        })
      }else{
        wx.showToast({
          title: '解绑失败！',
          icon: 'none',
          duration: 2000 //持续的时间
        })
      }
    })

  }
})