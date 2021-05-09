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
    my.MyClubData((res)=>{
      this.setData({
        'myCommunity':res
      });
    });
  },

  goToApplyList: function (e) {
    var id = e.target.dataset.id;
      wx.navigateTo({
        url: '/pages/my/apply_list?id=' + id,
      })
  },
  OpenMsg:function(e){
    var id = my.getDataSet(e, 'id')
    var that = this
    wx.requestSubscribeMessage({ //获取下发权限
      tmplIds: ['Gzurs39t840Zxrb_Mh-r_4o1kykXVzYNbK-God9VFGc'], //此处写在后台获取的模板ID，可以写多个模板ID，看自己的需求
      success: (res) => {
        if (res['Gzurs39t840Zxrb_Mh-r_4o1kykXVzYNbK-God9VFGc'] == 'accept') { //accept--用户同意 reject--用户拒绝 ban--微信后台封禁,可不管
          my.OpenMsg(id, (res) => {
            that._loadData();
          })
        }else{
          wx.showToast({
            title: '请授权收到通知！',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })



  },

})