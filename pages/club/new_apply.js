import {
  Club
} from 'club-model.js';
var club = new Club();
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    communityId:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //判断是否已经登录
    this.setData({
      communityId: options.communityId
    })
  },

  submitApply: function (e) {
    var communityId = this.data.communityId
    var remark = e.detail.value.remark
    club.Apply(communityId, remark,
      (res) => {
        if (res.errorCode == 1) {
          wx.showToast({
            title: '提交申请成功',
            icon: 'success',
            duration: 2000 //持续的时间
          })
        }else if(res.errorCode == 2) {
          wx.showToast({
            title: '请勿重复申请',
            icon: 'fail',
            duration: 2000 //持续的时间
          })
        }else if(res.errorCode == -1) {
          wx.showToast({
            title: '未知异常',
            icon: 'fail',
            duration: 2000 //持续的时间
          })
        }
        setTimeout(() => {
          wx.navigateBack({
            delta: 1,
          })
        }, 2100)
      })
  },


  // check()方法
  check: function (data, reg, errMsg) {
    if (!reg.test(data)) {
      wx.showToast({
        title: errMsg,
        icon: 'none',
        duration: 1500
      })
      this.setData({
        loadModal: false
      })
      return false
    }
    return true
  },


})