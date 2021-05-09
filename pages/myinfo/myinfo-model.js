import {Base} from '../../utils/base.js';

class MyInfo extends Base {
    constructor(){
        super();
    }

    getMsgListData(callBack) {
        var params = {
            url: 'msg/list',
            sCallBack: function (res) {
                callBack && callBack(res);
            }
        }
        this.request(params);
    }

    getMsgData(id,callBack) {
        var params = {
            url: 'msg/'+id,
            sCallBack: function (res) {
                callBack && callBack(res);
            }
        }
        this.request(params);
    }

    IsRead(id, callBack) {
        var params = {
            url: 'read/' + id,
            sCallBack: function (res) {
                callBack && callBack(res);
            }
        }
        this.request(params);
    }

}
export {
    MyInfo
};