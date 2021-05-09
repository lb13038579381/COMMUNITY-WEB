import {
  Club
} from 'club-model.js';
var club = new Club();
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    communityList:[],
    id: 0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    if(app.globalData.is_login == false){
      wx.navigateTo({
        url: '../login/login',
      })
    }
  },


  chooseImg: function(e) {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        that.setData({
          photos: tempFilePaths
        })
      }
    })
  },
  uploadImg: function(e) {
    var that = this
    var name = e.detail.value.name
    var directorId = app.globalData.memberId
    var introduction = e.detail.value.introduction
    var remark = e.detail.value.remark
    
    wx.uploadFile({
      url: 'http://www.community.com:8080/communityController/newCommunityApply?name='+name+'&directorId='+directorId+'&introduction='+introduction+'&remark='+remark,//仅为示例，非真实的接口地址
      filePath: that.data.photos[0],
      name: 'file',
      success: function (res) {
        if (res.statusCode == 200) {
          wx.showToast({
            title: '申请成功',
            icon: 'success',
            duration: 2000 //持续的时间
          })
          wx.redirectTo({
            url: '/pages/my/my',
          })
        } else {
          wx.showToast({
            title: '申请失败，请稍后重试',
            icon: 'none',
            duration: 2000 //持续的时间
          })
        }
      }
    })
  }
})