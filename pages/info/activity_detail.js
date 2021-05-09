import {Info} from 'info-model.js';
var info = new Info();
var WxParse = require('../../wxParse/wxParse.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_collect:false,
    is_apply:false,

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(app.globalData.is_login == true){
      this._loadData(options.id);
    }else{
      wx.navigateTo({
        url: '../login/login',
      })
    }
  },
  onShow:function(){
    if(app.globalData.is_login == false){
      wx.switchTab({
        url: '../my/my',
      })
    }
  },
  _loadData:function(id){
    var that = this;
    info.getActivityData(id,(res)=>{
      if (res.collect != null) {
        var col = true
      }
      if (res.apply != null) {
        var apply = true
      }
      var  activity = res
      // WxParse.wxParse('activity_content', 'html', activity, that, 5);
      this.setData({
        'activity':res,
        is_collect : col,
        is_apply : apply
      });
    });
  },


  goToCollect: function (e) {
    var id = info.getDataSet(e, 'id')
    this.setData({
      is_collect:!this.data.is_collect
    })
    info.Collect(id,(res) => {

    })
  },
  goToApply:function(e){
    var id = info.getDataSet(e, 'id')
    wx.navigateTo({
      url: 'activity_apply?id='+id,
    })
  },
  



})