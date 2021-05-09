const app = getApp()
import {
  Clubs
} from 'clubs-model.js';
var clubs = new Clubs();
Page({
  data: {
    // StatusBar: app.globalData.StatusBar,
    // CustomBar: app.globalData.CustomBar,
    // Custom: app.globalData.Custom,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    list: [],
    load: true,
    clubList: [],
    clubListAll:[],
  },
  onLoad() {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    this._loadData();
  },
  onReady() {
    wx.hideLoading()
  },

  _loadData: function () {
  //  clubs.getSortData((res) => {
  //     this.setData({
  //       // 'sort':res,
  //       list: res,
  //       listCur: res[0]
  //     });
  //   });
    clubs.getClubListData((res) => {
      this.setData({
        communityList: res,
        clubListAll:res
      });
    });
  },

  search:function(e){
    var search_words = e.detail.value.search_words;
    wx.navigateTo({
      url: '../search/search?words='+search_words,
    })
  },
  goToClub: function (event) {
    var id = clubs.getDataSet(event, 'id');
    wx.navigateTo({
      url: '../club/club?id=' + id,
    })
  },

  tabSelect(e) {
    var clubList = [];
    if(e.currentTarget.dataset.sort == 0){
      clubList = this.data.clubListAll;
    }else{
      for(var i=0;i<this.data.clubListAll.length;i++){
        if(this.data.clubListAll[i].sort_id == e.currentTarget.dataset.sort){
          clubList.push(this.data.clubListAll[i]);
        }
      }
    }

    this.setData({
      communityList:clubList,
      TabCur: e.currentTarget.dataset.id,
    })
  },

})