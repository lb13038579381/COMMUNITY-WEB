import {Base} from '../../utils/base.js';

class Search extends Base{
    constructor(){
        super();
    }
    getSearchData(words,callBack){
        var params = {
            url:'communityController/getCommunityByName',
            method:'POST',
            data:{
                words:words
            },
                      
            header: {
            'content-type': 'application/x-www-form-urlencoded',
          },
            sCallBack:function(res){
                callBack&&callBack(res);
            }
        }
        this.request(params);
    }
}

export {Search};