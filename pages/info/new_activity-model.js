import {Base} from '../../utils/base.js';

class Clubs extends Base {
    constructor() {
        super();
    }
    // getSortData(callBack) {
    //     var params = {
    //         url: 'club/sort',
    //         sCallBack: function (res) {
    //             callBack && callBack(res);
    //         }
    //     }
    //     this.request(params);
    // }

    getCommunityList(memberId,callBack) {
      var params = {
          url: 'communityController/getCommunityListByStudentNumber?memberId='+memberId,
          sCallBack: function (res) {
              callBack && callBack(res);
          }
      }
      this.request(params);
  }
}

export {
    Clubs
};