import {My} from 'my-model.js';
var my = new My();
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  onLoad: function () {
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
  goToClub:function(e){
    var id = e.target.dataset.id
    wx.navigateTo({
      url: '../club/club?id='+id,
    })
  },
  _loadData:function(){
    my.MyCommunityApplyData((res)=>{
      this.setData({
        'myCommunityApply':res
      });
    });
  },
})