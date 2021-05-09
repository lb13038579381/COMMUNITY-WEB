import {Config} from '../utils/config.js';
import { Token } from './token.js';
class Base {
    constructor() {
        this.baseRequestUrl = Config.restUrl;
    }
    //当noRefech为true时，不做未授权重试机制
    request(params,noRefetch) {
        var that = this;
        var url = this.baseRequestUrl + params.url;
        if (!params.type) {
            params.type = 'GET';
        }
        wx.request({
            url: url,
            header: {
                'content-type': 'application/json',
                'token': wx.getStorageSync('token')
            },
            method: params.type,
            data: params.data,
            success: function (res) {
                var code = res.statusCode.toString();
                var startChar = code.charAt(0);
                if (startChar == '2'){
                    params.sCallBack && params.sCallBack(res.data);
                }
                else{
                    if(code == '401'){
                        if(!noRefetch){
                            that._refetch(params);
                        }
                    }else if(code == '403'){
                        params.eCallBack && params.eCallBack(res.data);  
                    }
                    console.log(noRefetch);
                    if(noRefetch){
                        params.eCallBack && params.eCallBack(res.data);  
                    }
                }
            },
            fail: function (err) {
                console.log(err)
            }
        })
    }

    _refetch(params){
        var token = new Token();
        token.getTokenFromServer((token)=>{
            this.request(params,true);
        });
    }

    getDataSet(event,key){
        return event.currentTarget.dataset[key];
    }
}
export {Base};