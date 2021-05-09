import {Base} from '../../utils/base.js';

class Index extends Base{
    constructor(){
        super();
    }


    getNewInfoData(callBack){
        var params = {
            url:'informationController/getLatestInformations',
            sCallBack:function(res){
                callBack&&callBack(res);
            }
        }
        this.request(params);
    }
}

export {Index};