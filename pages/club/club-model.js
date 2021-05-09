import {
    Base
} from '../../utils/base.js';
const app = getApp();
class Club extends Base {
    constructor() {
        super();
    }
    // getClubData(id, callBack) {
    //     var params = {
    //         url: 'club/' + id,
    //         sCallBack: function (res) {
    //             callBack && callBack(res);
    //         }
    //     }
    //     this.request(params);
    // }

    getClubData(id, callBack) {
        var memberId = app.globalData.memberId;
        var params = {
            url: 'communityController/getById?communityId=' + id+'&memberId='+memberId,
            sCallBack: function (res) {
                callBack && callBack(res);
            }
        }
        this.request(params);
    }

    getClubInfoData(id,pageIndex, callBack) {
        var memberId = app.globalData.memberId
        var params = {
            url: 'informationController/communityInformations',
            type:'GET',
            data:{
                communityId:id,
                memberId:memberId,
                page:pageIndex
            },
            sCallBack: function (res) {
                callBack && callBack(res);
            }
        }
        this.request(params);
    }


    Follow(id, callBack) {
        var memberId = app.globalData.memberId;
        var params = {
            url: 'memberController/follow?memberId='+memberId+'&communityId='+id,
            type: 'POST',
            sCallBack: function (res) {
                callBack && callBack(res);
            }
        }
        this.request(params);
    }


    Apply(communityId,remark,callBack) {
        var memberId = app.globalData.memberId;
        var params = {
            url: 'communityController/addApply',
            type: 'POST',
            data:{
                memberId:memberId,
                communityId:communityId,
                apply:remark,
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


}

export {
    Club
};