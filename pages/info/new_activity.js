import {
  Info
} from 'info-model.js';
import {
  Clubs
} from 'new_activity-model.js';
var info = new Info();
var clubs = new Clubs();
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    communityList:[],
    id: 0,
    photos: ""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function (options) {
  //   //判断是否已经登录

  // },
  onLoad:function(options){
    
    if(app.globalData.is_login == false){
      wx.switchTab({
        url: '../clubs/clubs',
      })
    }
    this.setData({
      id: options.id
    })
  },
  submitApply: function (e) {
    this.setData({
      loadModal: true
    })
      this.ToApply(e);
    
  },

  ToApply: function (e) {
    var title = e.detail.value.title
    var text = e.detail.value.text
    var address = e.detail.value.address
    var startTime = e.detail.value.startTime
    var endTime = e.detail.value.endTime
    var time = e.detail.value.time
    var people = e.detail.value.people
    var communityId = this.data.id
    var memberId = app.globalData.memberId
    var that = this

    info.NewActivity(title,text,address,startTime,endTime,time,people,communityId,memberId,
      (res) => {
        this.setData({
          loadModal: false
        })
        if (res.errorCode == 0) {
          wx.showToast({
            title: '创建成功',
            icon: 'success',
            duration: 2000 //持续的时间
          })
        } else {
          wx.showToast({
            title: '创建失败，请检查输入格式是否有误',
            icon: 'none',
            duration: 2000 //持续的时间
          })
        }
         
        setTimeout(() => {
          wx.navigateBack({
            delta: 1,
          })
        }, 2100)
      })
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
        console.log(that.data.photos)
      }
    })
  },
  uploadImg: function(e) {
    var that = this
    var title = e.detail.value.title
    var text = e.detail.value.text
    var address = e.detail.value.address
    var startTime = e.detail.value.startTime
    var endTime = e.detail.value.endTime
    var time = e.detail.value.time
    var people = e.detail.value.people
    var communityId = this.data.id
    var memberId = app.globalData.memberId
    wx.uploadFile({
      url: 'http://www.community.com:8080/informationController/newActivity?title='+title+'&text='+text+'&address='+address+'&startTime='+startTime+'&endTime='+endTime+'&time='+time+'&people='+people+'&communityId='+communityId+'&memberId='+memberId, //仅为示例，非真实的接口地址
      filePath: that.data.photos[0],
      name: 'file',
      // formData: {
      //   title:title,
      //   text:text,
      //   address:address,
      //   startTime:startTime,
      //   endTime:endTime,
      //   time:time,
      //   people:people,
      //   communityId:communityId,
      //   memberId:memberId
      // },
      
      success: function (res) {
        if (res.statusCode == 200) {
          wx.showToast({
            title: '创建成功',
            icon: 'success',
            duration: 2000 //持续的时间
          })
        } else {
          wx.showToast({
            title: '创建失败，请检查输入格式是否有误',
            icon: 'none',
            duration: 2000 //持续的时间
          })
        }
         
        setTimeout(() => {
          wx.navigateBack({
            delta: 1,
          })
        }, 2100)
      }
    })
  }
  


})