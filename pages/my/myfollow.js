import {My} from 'my-model.js';
var my = new My();
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  onLoad: function (options) {
    if(app.globalData.is_login == true){
      this._loadData();
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

  _loadData:function(){
    my.MyFollowData((res)=>{
      this.setData({
        'myFollow':res
      });
    });
  },

  goToClub:function(e){
    var id = e.target.dataset.id
    wx.navigateTo({
      url: '../club/club?id='+id,
    })
  },

  
  cancelFollow:function(e){
    var id = my.getDataSet(e, 'id')
    var that = this
    my.CancelFollow(id, (res) => {
      that._loadData();
    })
  },

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