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
    my.getCommunityApplyList((res) => {
      this.setData({
        applyList: res,
      });
    });
  },
  
   adoptApply:function(e){
    var id = my.getDataSet(e, 'id')
    var that=this
    my.adoptCommunityApply(id, (res) => {
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
      that.onLoad();
    })
  },

  refuseApply:function(e){
    var id = my.getDataSet(e, 'id')
    var that=this
    my.refuseCommunityApply(id, (res) => {
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
      that.onLoad();
    })
  },

  deleteApply:function(e){
    var id = my.getDataSet(e, 'id')
    var that=this
    my.deleteCommunityApply(id, (res) => {
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
      that.onLoad();
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