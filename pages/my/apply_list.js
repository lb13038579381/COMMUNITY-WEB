// pages/my/apply_list.js
import {My} from 'my-model.js';

var my = new My();
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
id:0,
applyList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //判断是否已经登录
    this.setData({
      id: options.id
    })
    my.getApplyList(this.data.id,(res) => {
      this.setData({
        applyList: res,
      });
    });
  },
  
   adoptApply:function(e){
    var id = my.getDataSet(e, 'id')
    var that=this
    my.adoptApply(id, (res) => {
        wx.showToast({
          title: res.msg,
          icon: 'success',
          duration: 2000 //持续的时间
        })
      
      setTimeout(() => {
        wx.navigateBack({
          delta: 1,
        })
      }, 2100)
      that._loadData();
    })
  },

  refuseApply:function(e){
    var id = my.getDataSet(e, 'id')
    var that=this
    my.refuseApply(id, (res) => {
        wx.showToast({
          title: res.msg,
          icon: 'success',
          duration: 2000 //持续的时间
        })

      setTimeout(() => {
        wx.navigateBack({
          delta: 1,
        })
      }, 2100)
      that._loadData();
    })
  },

  deleteApply:function(e){
    var id = my.getDataSet(e, 'id')
    var that=this
    my.refuseApply(id, (res) => {
        wx.showToast({
          title: res.msg,
          icon: 'success',
          duration: 2000 //持续的时间
        })

      setTimeout(() => {
        wx.navigateBack({
          delta: 1,
        })
      }, 2100)
      that._loadData();
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection =='left'){
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  },
})