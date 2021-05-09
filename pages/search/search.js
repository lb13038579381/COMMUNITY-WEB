import {
    Search
  } from 'search-model.js';
  var search = new Search();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        words:'',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var words = options.words
        this.setData({
            words:words
        })
        this._loadData(words);
    },
    _loadData: function (words) {
        search.getSearchData(words,(res) => {
            console.log(res)
          this.setData({
            'communityList': res
          });
        });
      },
      toSearch:function(e){
        var words = e.detail.value.search_words;
        this._loadData(words);
      },
      goToClub: function (event) {
        var id = search.getDataSet(event, 'id');
        wx.navigateTo({
          url: '../club/club?id=' + id,
        })
      },
})