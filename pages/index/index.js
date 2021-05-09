import {
  Index
} from 'index-model.js';
var index = new Index();

Page({
  data: {},

  onLoad: function () {
    this._loadData();
  },

  _loadData: function () {
    index.getNewInfoData((res) => {
      this.setData({
        'infoList': res
      });
    });

  },

  goToClub: function (event) {
    var id = index.getDataSet(event, 'id');
    wx.navigateTo({
      url: '../club/club?id=' + id,
    })
  },

  Info:function(){
    wx.switchTab({
      url: '../info/info',
    })
  },

  goToInfo: function (event) {
    var id = index.getDataSet(event, 'id');

      wx.navigateTo({
        url: '../info/activity_detail?id=' + id,
      })
  }


})