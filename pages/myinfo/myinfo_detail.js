const app = getApp()
import {
  MyInfo
} from 'myinfo-model.js';
var myInfo = new MyInfo();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_read: false
  },

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



  _loadData: function (id) {
    myInfo.getMsgData(id, (res) => {
      if (res.is_read != 1) {
        var read = true
      } else {
        var read = false
      }
      this.setData({
        'msg': res,
        is_read: read
      });
    });
  },
  IsRead: function (e) {
    var id = myInfo.getDataSet(e, 'id')
    var type = myInfo.getDataSet(e, 'type')
    var that = this
    if (type == 0) {
      wx.requestSubscribeMessage({
        tmplIds: ['Gzurs39t840Zxrb_Mh-r_4o1kykXVzYNbK-God9VFGc'],
        success: (res) => {
          if (res['Gzurs39t840Zxrb_Mh-r_4o1kykXVzYNbK-God9VFGc'] == 'accept') {
            myInfo.IsRead(id, (res) => {
              that.setData({
                is_read: !that.data.is_read
              })
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
    } else {
      myInfo.IsRead(id, (res) => {
        this.setData({
          is_read: !this.data.is_read
        })
      })
    }

  }

})