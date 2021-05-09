import {My} from 'my-model.js';
var my = new My();

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    communityList:[],
    id: 0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //判断是否已经登录
  },

  submitFeedback: function (e) {
    var text = e.detail.value.text
    my.submitFeedback(text,
      (res) => {
        if (res.errorCode == 0) {
          wx.showToast({
            title: '反馈成功',
            icon: 'success',
            duration: 2000 //持续的时间
          })
        } else {
          wx.showToast({
            title: '系统异常，请稍后再试',
            icon: 'none',
            duration: 2000 //持续的时间
          })
        }
         
        setTimeout(() => {
          wx.navigateBack({
            delta: 1,
          })
        }, 2100)
      })
  }


})