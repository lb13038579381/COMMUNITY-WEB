import {
    Base
} from '../../utils/base.js';
const app = getApp();
class My extends Base {
    
    constructor() {
        super();
    }

    MyInfoData(callBack) {
        var memberId = app.globalData.memberId;
        var params = {
            url: 'memberController/myInfo?memberId='+memberId,
            sCallBack: function (res) {
                callBack && callBack(res);
            }
        }
        this.request(params);
    }


    MyClubData(callBack) {
        var memberId = app.globalData.memberId;
        var params = {
            url: 'communityController/myCommunity?memberId='+memberId,
            sCallBack: function (res) {
                callBack && callBack(res);
            }
        }
        this.request(params);
    }
    MyFollowData(callBack) {
        var memberId = app.globalData.memberId;
        var params = {
            url: 'memberController/myFollowers?memberId=' + memberId,
            sCallBack: function (res) {
                callBack && callBack(res);
            }
        }
        this.request(params);
    }
    MyCollectData(callBack) {
        var memberId = app.globalData.memberId;
        var params = {
            url: 'informationController/myCollect?memberId='+memberId,
            sCallBack: function (res) {
                callBack && callBack(res);
            },
        }
        this.request(params);
    }

    MyApplyData(callBack) {
        var memberId = app.globalData.memberId;
        var params = {
            url: 'informationController/myApply?memberId='+memberId,
            sCallBack: function (res) {
                callBack && callBack(res);
            },
        }
        this.request(params);
    }

    MyCommunityApplyData(callBack) {
        var memberId = app.globalData.memberId;
        var params = {
            url: 'communityController/myApply?memberId='+memberId,
            sCallBack: function (res) {
                callBack && callBack(res);
            },
        }
        this.request(params);
    }

    CancelFollow(id, callBack) {
        var memberId = app.globalData.memberId;
        var params = {
            url: 'memberController/cancelFollow/?memberId='+memberId+'&communityId='+id,
            type: 'POST',
            sCallBack: function (res) {
                callBack && callBack(res);
            }
        }
        this.request(params);
    }
    
    getCommunityApplyList(callBack) {
        var params = {
            url: 'communityController/newCommunityApplyList',
            sCallBack: function (res) {
                callBack && callBack(res);
            }
        }
        this.request(params);
    }
    getApplyList(id,callBack) {
        var params = {
            url: 'communityController/applyList?communityId='+id,
            type: 'POST',
            // data:{
            //     communityId:id,
            // },
            sCallBack: function (res) {
                callBack && callBack(res);
            }
        }
        this.request(params);
    }
    adoptApply(id,callBack) {
        var params = {
            url: 'communityController/adoptApply?id='+id,
            // data:{
            //     id:id,
            // },
            type: 'POST',
            sCallBack: function (res) {
                callBack && callBack(res);
            }
        }
        this.request(params);
    }
    refuseApply(id,callBack) {
        var params = {
            url: 'communityController/refuseApply?id='+id,
            type: 'POST',
            // data:{
            //     id:id,
            // },
            sCallBack: function (res) {
                callBack && callBack(res);
            }
        }
        this.request(params);
    }
    deleteApply(id,callBack) {
        var params = {
            url: 'communityController/deleteApply?id='+id,
            // data:{
            //     id:id,
            // },
            type: 'POST',
            sCallBack: function (res) {
                callBack && callBack(res);
            }
        }
        this.request(params);
    }
    getFeedbackList(callBack) {
        var params = {
            url: 'feedbackController/feedbackList',
            type: 'POST',
            // data:{
            //     communityId:id,
            // },
            sCallBack: function (res) {
                callBack && callBack(res);
            }
        }
        this.request(params);
    }
    deleteFeedback(id,callBack) {
        var params = {
            url: 'feedbackController/deleteFeedback?id='+id,
            // data:{
            //     id:id,
            // },
            type: 'POST',
            sCallBack: function (res) {
                callBack && callBack(res);
            }
        }
        this.request(params);
    }
    
    adoptCommunityApply(id,callBack) {
        var params = {
            url: 'communityController/adoptCommunityApply?id='+id,
            // data:{
            //     id:id,
            // },
            type: 'POST',
            sCallBack: function (res) {
                callBack && callBack(res);
            }
        }
        this.request(params);
    }
    refuseCommunityApply(id,callBack) {
        var params = {
            url: 'communityController/refuseCommunityApply?id='+id,
            type: 'POST',
            // data:{
            //     id:id,
            // },
            sCallBack: function (res) {
                callBack && callBack(res);
            }
        }
        this.request(params);
    }
    deleteCommunityApply(id,callBack) {
        var params = {
            url: 'communityController/deleteCommunityApply?id='+id,
            // data:{
            //     id:id,
            // },
            type: 'POST',
            sCallBack: function (res) {
                callBack && callBack(res);
            }
        }
        this.request(params);
    }


    
    Follow(id, callBack) {
        var params = {
            url: 'follow/' + id,
            type: 'POST',
            sCallBack: function (res) {
                callBack && callBack(res);
            }
        }
        this.request(params);
    }
    submitFeedback(text,callBack) {
        var params={
            url:'communityController/submitFeedback?text='+text,
            type:'get',
            sCallBack: function (res) {
                callBack && callBack(res);
            }
        }
        this.request(params);
    }

    OpenMsg(id, callBack) {
        var params = {
            url: 'openmsg/' + id,
            sCallBack: function (res) {
                callBack && callBack(res);
            }
        }
        this.request(params);
    }

    LoginOut(callBack) {
        var params = {
            url: 'login/loginout',
            sCallBack: function (res) {
                callBack && callBack(res);
            },
        }
        this.request(params);
    }

}

export {
    My
};