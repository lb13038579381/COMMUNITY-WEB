const app = getApp();
import {
  Info
} from 'info-model.js';
var info = new Info();
Page({
  data: {
    TabCur: 0,
    empty_hotActList: false, //判断是否登录

    infoList: [],
    followList: [],
    collectList: [],
    isNewList: [],
    info_loadAll: false,
    follow_loadAll: false,
    activity_loadAll: false,
    isNew_loadAll: false,
    info_page: 1,
    follow_page: 1,
    activity_page: 1,
    isNew_page: 1,
    isDirector:false,
    scrollTop: 0,
  },

  onPageScroll: function (e) {
    var that = this;
    that.setData({
      scrollTop: e.scrollTop
    })
  },

  onLoad: function () {
    this._loadData();
  },



  _loadData: function () {
    this._getInfoList();
    this._getActList();
    this._getIsNewList();
    info.getHotActData((res) => {
      if (res.length == 0) {
        this.setData({
          empty_hotActList: true
        })
      }
      this.setData({
        'hotActList': res
      });
    });
    if (app.globalData.is_login == true) {
      this._getFollowList()
    } else {
      this.setData({
        empty_followList: true
      })
    }
  },

  onPullDownRefresh: function() {
    // Do something when pull down.
    info.getInfoListData(1, (res) => {
      // console.log(this.data.infoList)
        this.setData({
          infoList: res.data
        });
    });
    info.getFollowListData(1, (res) => {
        this.setData({
          followList: res.data
        });

    });
    info.getActListData(1, (res) => {
        this.setData({
          collectList: res.data
        });
    });
    info.getIsNewListData(1, (res) => {
        this.setData({
          isNewList: res.data
        });
    });
    wx.showNavigationBarLoading() //在标题栏中显示加载
    setTimeout(function () {
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 600); //毫秒设置延迟
  },


  _getInfoList: function () {
    info.getInfoListData(this.data.info_page, (res) => {
      var that = this
      // if (res.length > 0) {
        // this.data.infoList.push.apply(this.data.infoList, res.data)
        console.log('12312321'+res)
        this.setData({
          infoList: res.informationVoList,
          isDirector:res.isDirector
        });
      // } else {
      //   this.data.info_loadAll = true;
      //   this.setData({
      //     info_loadAll: this.data.info_loadAll
      //   })
      // }
    });
  },

  _getFollowList: function () {
    info.getFollowListData(this.data.follow_page, (res) => {
      // if (res.data.length > 0) {
        // this.data.followList.push.apply(this.data.followList, res.data)
        this.setData({
          followList: res
        });
      // } else {
      //   this.data.follow_loadAll = true;
      //   this.setData({
      //     follow_loadAll: this.data.follow_loadAll
      //   })
      // }
    });
  },


  _getActList: function () {
    info.getActListData(this.data.activity_page, (res) => {
      // if (res.data.length > 0) {
        // this.data.activityList.push.apply(this.data.activityList, res.data)
        this.setData({
          collectList: res
        });
      // } else {
      //   this.data.activity_loadAll = true;
      //   this.setData({
      //     activity_loadAll: this.data.activity_loadAll
      //   })
      // }
    });
  },

  _getIsNewList: function () {
    info.getIsNewListData(this.data.isNew_page, (res) => {
      if (res.data.length > 0) {
        this.data.isNewList.push.apply(this.data.isNewList, res.data)
        this.setData({
          isNewList: this.data.isNewList
        });
      } else {
        this.data.isNew_loadAll = true;
        this.setData({
          isNew_loadAll: this.data.isNew_loadAll
        })
      }
    });
  },

  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
    })
  },
  goToInfo: function (event) {
    var id = info.getDataSet(event, 'id');
    var type = info.getDataSet(event, 'type');
    if (type == 0) {
      wx.navigateTo({
        url: '../info/new_detail?id=' + id,
      })
    } else {
      wx.navigateTo({
        url: '../info/activity_detail?id=' + id,
      })
    }
  },
  goToMy: function () {
    wx.switchTab({
      url: '../my/my',
    })
  },
  goToNew: function () {
    var id = app.globalData.memberId;
      wx.navigateTo({
        url: '../info/new_activity?id=' + id,
      })
  },

  //滑动触底加载
  onReachBottom() {
    if (this.data.TabCur == 0) {
      if (!this.data.info_loadAll) {
        this.data.info_page++;
        this._getInfoList();
      }
    } else if (this.data.TabCur == 1) {
      if (!this.data.follow_loadAll) {
        this.data.follow_page++;
        this._getFollowList();
      }
    } else if (this.data.TabCur == 2) {
      if (!this.data.activity_loadAll) {
        this.data.activity_page++;
        this._getActList();
      }
    } else if (this.data.TabCur == 3) {
      if (!this.data.isNew_loadAll) {
        this.data.isNew_page++;
        this._getIsNewList();
      }
    }
  }
})