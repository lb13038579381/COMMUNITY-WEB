import {Base} from '../../utils/base.js';
const app = getApp();
class Info extends Base {
    constructor() {
        super();
    }
    //获取某个活动的数据
    getActivityData(id, callBack) {
        var memberId = app.globalData.memberId;
        var params = {
            url: 'informationController/getInformationById?id=' + id+'&memberId='+memberId,
            sCallBack: function (res) {
                callBack && callBack(res);
            }
        }
        this.request(params);
    }

    //获取某篇新闻的数据
    getNewData(id, callBack) {
        var params = {
            url: '/new/' + id,
            sCallBack: function (res) {
                callBack && callBack(res);
            }
        }
        this.request(params);
    }

    //获取火热报名中的活动数据
    getHotActData(callBack) {
        var params = {
            url: 'informationController/hot',
            sCallBack: function (res) {
                callBack && callBack(res);
            }
        }
        this.request(params);
    }

    //收藏
    Collect(id, callBack) {
        var memberId = app.globalData.memberId;
        var params = {
            url: 'informationController/collect?memberId='+memberId+'&informationId='+id,
            sCallBack: function (res) {
                callBack && callBack(res);
            }
        }
        this.request(params);
    }

    //申请报名活动
    Apply(id,phone,remark,callBack) {
        var memberId = app.globalData.memberId;
        var params = {
            url: 'informationController/addApply',
            type: 'POST',
            data:{
                memberId:memberId,
                informationId:id,
                phoneNumber:phone,
                remark:remark,
            },
            sCallBack: function (res) {
                callBack && callBack(res);
            },
            eCallBack:function(res){
                callBack && callBack(res);
            }
        }
        this.request(params);
    }
    NewActivity(title,text,address,startTime,endTime,time,people,communityId,memberId,
        callBack) {
        var params = {
            url: 'informationController/newActivity?title='+title+'&text='+text+'&address='+address+'&startTime='+startTime+'&endTime='+endTime+'&time='+time+'&people='+people+'&communityId='+communityId+'&memberId='+memberId,
            // data:{
            //     title:title,
            //     text:text,
            //     address:address,
            //     startTime:startTime,
            //     endTime:endTime,
            //     time:time,
            //     people:people,
            //     communityId:communityId,
            //     memberId:memberId
            // },
            // header: {
            //     'content-type': 'application/x-www-form-urlencoded',
            //   },
            sCallBack: function (res) {
                callBack && callBack(res);
            },
            eCallBack:function(res){
                callBack && callBack(res);
            }
        }
        this.request(params);
    }

    //获取动态列表
    getInfoListData(pageIndex,callBack) {
        var memberId = app.globalData.memberId;
        var params = {
            url: 'informationController/all',
            type:'GET',
            data:{
                memberId:memberId,
                page:pageIndex
            },
            sCallBack: function (res) {
                console.log(res)
                callBack && callBack(res);
            }
        }
        this.request(params);
    }

    //获取关注的社团对应活动列表
    getFollowListData(pageIndex,callBack) {
        var memberId = app.globalData.memberId;
        var params = {
            url: 'informationController/myFollow',
            type:'GET',
            data:{
                memberId:memberId,
                page:pageIndex
            },
            sCallBack: function (res) {
                callBack && callBack(res);
            }
        }
        this.request(params);
    }

    //获取只有活动列表
    getActListData(pageIndex,callBack) {
        var memberId = app.globalData.memberId;
        var params = {
            url: 'informationController/collectList',
            type:'GET',
            data:{
                memberId:memberId,
                page:pageIndex
            },
            sCallBack: function (res) {
                callBack && callBack(res);
            }
        }
        this.request(params);
    }
    //获取招新活动列表
    getIsNewListData(pageIndex,callBack) {
        var params = {
            url: 'info/isnew',
            type:'GET',
            data:{
                page:pageIndex
            },
            sCallBack: function (res) {
                callBack && callBack(res);
            }
        }
        this.request(params);
    }
}

export {
    Info
};