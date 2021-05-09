import {MyInfo} from 'myinfo-model.js';
var myInfo = new MyInfo();
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  goToDetail:function(e){
    var id = myInfo.getDataSet(e,'id')
    wx.navigateTo({
      url: '/pages/myinfo/myinfo_detail?id='+id,
    })
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


  _loadData:function(){
    myInfo.getMsgListData((res)=>{
      this.setData({
        'msgList':res
      });
    });
  }
})